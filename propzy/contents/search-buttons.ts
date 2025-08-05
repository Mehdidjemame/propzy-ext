import type { PlasmoCSConfig } from "plasmo"
import { PORTALS } from "./portal-selectors"
import { supabase } from "~supabase-client"

/* ---------- content-script config ---------- */
export const config: PlasmoCSConfig = {
  matches: [
    "https://*.bayut.com/*for-sale/*",
    "https://*.dubizzle.com/en/property-for-sale/*",
    "https://*.propertyfinder.ae/en/search*"
  ],
  run_at: "document_idle"
}

/* util → keep only digits, commas, dots */
const num = (t = "") => (t.match(/[\d,.]+/) || [""])[0]

/* safe grab helper */
const safeGrab = (card: HTMLElement, sel?: string) =>
  sel ? (card.querySelector(sel)?.textContent || "").trim() : ""

/* -------- inject / refresh buttons -------- */
const injectButtons = () => {
  const portal = Object.values(PORTALS).find(p => p.match.test(window.location.hostname))
  if (!portal) return

  if (portal.match.test("propertyfinder.ae")) {
    const isBuy = new URLSearchParams(window.location.search).get("c") === "1"
    if (!isBuy) return
  }

  document.querySelectorAll<HTMLElement>(portal.card).forEach(card => {
    if (card.dataset.propzy) return
    card.dataset.propzy = "1"

    const btn = document.createElement("button")
    btn.textContent = "💾 Save to Propzy"
    btn.style.cssText =
      "display:block;margin:6px auto 10px auto;padding:6px 10px;" +
      "font-size:13px;background:#006aff;color:#fff;border:none;border-radius:4px;" +
      "cursor:pointer;width:90%;max-width:180px"

    btn.onclick = async () => {
      let price = num(safeGrab(card, portal.price))
      let beds  = num(safeGrab(card, portal.beds))
      let baths = num(safeGrab(card, portal.baths))
      let size  = num(safeGrab(card, portal.size))
      let locText = safeGrab(card, portal.location) || "(no location)" // renamed

      const text = card.innerText
      if (!price) price = (text.match(/AED\s*([\d,]+)/i) || [, ""])[1]
      if (!beds)  beds  = (text.match(/(\d+)\s*bed/i)     || [, ""])[1]
      if (!baths) baths = (text.match(/(\d+)\s*bath/i)    || [, ""])[1]
      if (!size)  size  = (text.match(/([\d,]+)\s*sq/i)   || [, ""])[1]

      const fallbackTitle = safeGrab(card, "h2,h3")
      const titleSelector = portal.title ?? ""
      const title = safeGrab(card, titleSelector) || fallbackTitle || "(no title)"

      const data = {
        price,
        beds,
        baths,
        size,
        location: locText, // now safe
        title,
        url: card.querySelector("a")?.href ?? window.location.href,
        portal: window.location.hostname.split(".").at(-2) || ""
      }

      try {
        await supabase.from("listings").upsert(data)
        btn.textContent = "✅ Saved!"
        btn.style.background = "#28a745"
      } catch {
        btn.textContent = "⚠️ Retry"
        btn.style.background = "#e55353"
      }
    }

    card.insertAdjacentElement("afterend", btn)
  })
}

injectButtons()
new MutationObserver(injectButtons).observe(document.body, {
  childList: true,
  subtree: true
})
