import { locales, defaultLocale, localeNames } from "@/i18n/routing";
import { LOCALE_KEY } from "@/lib/prefs-shared";

/**
 * "/" — picks the locale: explicit choice saved on the device first, then the browser languages.
 * Works offline (static file + inline script, no server).
 */
const script = `(function(){var L=${JSON.stringify(locales)},d=${JSON.stringify(defaultLocale)},c=null;try{c=localStorage.getItem(${JSON.stringify(LOCALE_KEY)})}catch(e){}if(L.indexOf(c)<0){c=null;var n=navigator.languages||[navigator.language];for(var i=0;i<n.length&&!c;i++){var p=String(n[i]).slice(0,2).toLowerCase();if(L.indexOf(p)>=0)c=p}}location.replace("/"+(c||d)+"/")})();`;

export default function RootPage() {
  return (
    <html lang="fr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Omra Companion — رفيق العمرة</title>
        <script dangerouslySetInnerHTML={{ __html: script }} />
      </head>
      <body style={{ fontFamily: "system-ui, sans-serif", background: "#FAF7EF", color: "#17231E", padding: 24 }}>
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
