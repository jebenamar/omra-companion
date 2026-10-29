// Shared between server and client (no "use client"): storage keys and the pre-paint boot script.

export const PREFS_KEY = "omra.prefs";
export const LOCALE_KEY = "omra.locale";

/**
 * Inline script executed before paint: applies theme/contrast/size and remembers the locale.
 * Kept dependency-free and tiny on purpose.
 */
export function prefsBootScript(locale: string): string {
  return `(function(){try{var p=JSON.parse(localStorage.getItem(${JSON.stringify(PREFS_KEY)})||"{}");var r=document.documentElement;var d=p.theme==="dark"||((!p.theme||p.theme==="system")&&matchMedia("(prefers-color-scheme: dark)").matches);r.dataset.theme=d?"dark":"light";r.dataset.contrast=p.highContrast?"high":"normal";if(p.arabicScale)r.style.setProperty("--arabic-scale",String(p.arabicScale));localStorage.setItem(${JSON.stringify(LOCALE_KEY)},${JSON.stringify(locale)});}catch(e){}})();`;
}
