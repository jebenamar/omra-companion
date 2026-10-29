import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export default async function LocaleNotFound() {
  const t = await getTranslations("errors");
  return (
    <div className="space-y-4 py-10 text-center">
      <h1 className="text-2xl font-extrabold">{t("notFoundTitle")}</h1>
      <p className="text-muted">{t("notFoundBody")}</p>
      <Button asChild>
        <Link href="/">{t("backHome")}</Link>
      </Button>
    </div>
  );
}
