import { supabase } from "~supabase-client"

// small helper to fetch and trim text
const grab = (sel: string) =>
  (document.querySelector(sel) as HTMLElement)?.innerText?.trim() ?? null

// ------- selectors tuned for a Bayut listing page -------
const data = {
  price: grab("[aria-label='Price']"),        // "AED 1,550,000"
  beds:  grab("[aria-label='Beds']"),         // "2 Beds"
  baths: grab("[aria-label='Baths']"),        // "3 Baths"
  size:  grab("[aria-label='Area']"),         // "1,278 sqft"
  title: document.querySelector("h1")?.textContent?.trim() ?? null,
  url:   location.href,
  portal: location.hostname.split(".")[0]     // "bayut", "dubizzle", ...
}

// ---- send to Supabase ----
await supabase
  .from("listings")
  .insert(data)
  .throwOnError()
