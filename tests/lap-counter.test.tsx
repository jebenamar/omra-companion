import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NextIntlClientProvider } from "next-intl";
import { LapCounter } from "@/components/umrah/lap-counter";
import { getDb, loadCounter } from "@/lib/db";
import fr from "@/messages/fr.json";
import ar from "@/messages/ar.json";

function renderCounter(kind: "tawaf" | "sai", locale: "fr" | "ar" = "fr") {
  return render(
    <NextIntlClientProvider locale={locale} messages={locale === "fr" ? fr : ar}>
      <LapCounter kind={kind} />
    </NextIntlClientProvider>,
  );
}

beforeEach(async () => {
  await getDb().counters.clear();
});
afterEach(cleanup);

describe("LapCounter", () => {
  it("counts Tawaf circuits and saves them to IndexedDB", async () => {
    const user = userEvent.setup();
    renderCounter("tawaf");
    const button = await screen.findByRole("button", { name: /Valider le tour/ });
    await waitFor(() => expect(button).toBeEnabled());
    await user.click(button);
    await user.click(button);
    expect(screen.getByText("Tour 3 sur 7")).toBeInTheDocument();
    await waitFor(async () => expect((await loadCounter("tawaf")).laps).toHaveLength(2));
  });

  it("restores the saved count after a reload, in another language", async () => {
    await getDb().counters.put({ id: "tawaf", laps: [1, 2, 3], updatedAt: 1 });
    renderCounter("tawaf", "ar");
    expect(await screen.findByText("الشوط 4 من 7")).toBeInTheDocument();
  });

  it("shows the next Sa'i leg and stops at 7", async () => {
    const user = userEvent.setup();
    renderCounter("sai");
    const button = await screen.findByRole("button", { name: /Valider le trajet/ });
    await waitFor(() => expect(button).toBeEnabled());
    expect(screen.getByTestId("sai-leg")).toHaveTextContent(/As-Safa.*Al-Marwa/);
    await user.click(button);
    expect(screen.getByTestId("sai-leg")).toHaveTextContent(/Al-Marwa.*As-Safa/);
    for (let i = 0; i < 8; i++) if (!button.hasAttribute("disabled")) await user.click(button);
    expect(button).toBeDisabled();
    expect(screen.getByText(/Sept trajets validés/)).toBeInTheDocument();
  });

  it("undo removes the last lap; reset asks for confirmation", async () => {
    const user = userEvent.setup();
    await getDb().counters.put({ id: "tawaf", laps: [1, 2], updatedAt: 1 });
    renderCounter("tawaf");
    await screen.findByText("Tour 3 sur 7");
    await user.click(screen.getByRole("button", { name: /Annuler le dernier/ }));
    expect(screen.getByText("Tour 2 sur 7")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Réinitialiser" }));
    // Nothing is reset until the dialog is confirmed.
    expect(screen.getByText("Tour 2 sur 7")).toBeInTheDocument();
  });
});
