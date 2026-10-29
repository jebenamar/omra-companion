import { localeNames, locales } from "@/i18n/routing";

export default function RootNotFound() {
  return (
    <html lang="fr">
      <body style={{ fontFamily: "system-ui, sans-serif", background: "#FAF7EF", color: "#17231E", padding: 24 }}>
        <h1>404</h1>
        <ul>
          {locales.map((l) => (
            <li key={l}>
              <a href={`/${l}/`} lang={l}>
                {localeNames[l]}
              </a>
            </li>
          ))}
        </ul>
      </body>
    </html>
  );
}
