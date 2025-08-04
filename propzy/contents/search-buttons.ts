/* ---------- Property Finder branch ---------- */
if (portal.match.test("propertyfinder.ae")) {
  // helper to keep only digits / commas / dots
  const num = (t = "") => (t.match(/[\d,.]+/) || [""])[0];

  /* 1️⃣ selector-first extraction (confirmed in DevTools) */
  price = num(grab('[data-testid$="price"]'));
  beds  = num(grab('[data-testid$="bedroom"]'));
  baths = num(grab('[data-testid$="bathroom"]'));
  size  = num(grab('[data-testid$="area"]'));

  /* 2️⃣ fallback → use previous regex/line logic if any field missing */
  const txt   = card.innerText;
  const lines = txt.split("\n").map(l => l.trim()).filter(Boolean);

  // PRICE fallback
  if (!price) {
    for (const p of [
      /AED\s*([\d,]+)/i,
      /([\d,]+)\s*AED/i,
      /Price:?\s*AED?\s*([\d,]+)/i,
      /([\d,]{6,})/,
      /([1-9]\d{5,})/
    ]) {
      const m = txt.match(p);
      if (m?.[1]) { price = m[1].replace(/,/g, ""); break; }
    }
  }

  // SIZE fallback
  if (!size) {
    for (const s of [
      /([\d,]+)\s*sq\.?\s*ft/i,
      /([\d,]+)\s*sqft/i,
      /Size:?\s*([\d,]+)/i
    ]) {
      const m = txt.match(s);
      if (m?.[1]) { size = m[1].replace(/,/g, ""); break; }
    }
  }

  // BEDS & BATHS fallback via line offsets
  if (!beds || !baths) {
    const sizeIdx = lines.findIndex(l => /sq\s*ft/i.test(l));
    if (sizeIdx >= 2) {
      beds  = beds  || lines[sizeIdx - 2];
      baths = baths || lines[sizeIdx - 1];
    }
  }

  console.log("PF FINAL RESULT:", { price, beds, baths, size });
}
/* -------------------------------------------- */
