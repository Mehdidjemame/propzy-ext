export const PORTALS = {
  bayut: {
    match: /bayut\.com/,
    card: "div[data-testid='listing-card'], article",
    price: '[aria-label="Price"], [data-testid="price"]',
    beds:  '[aria-label="Beds"]',
    baths: '[aria-label="Baths"]',
    size:  '[aria-label="Area"], [data-testid="area"]'
  },

  dubizzle: {
  match: /dubizzle\.com/,

  // wrapper card
  card: 'div[class^="property-lpv-card-"]',

  // inner fields  (from the probe)
  price: '[data-testid="listing-price"]',          // e.g. “3,800,000”
  beds : '[data-testid="listing-bedrooms"]',       // label span (“beds”)
  baths: '[data-testid="listing-bathrooms"]',      // label span (“baths”)
  size : '[data-testid="listing-size"]',           // label span (“sqft”)
  title: '[data-testid="subheading-text"], h2'
  },


  propertyfinder: {
    match : /propertyfinder\.ae/,
    card  : 'li[data-testid^="list-item"]',     // lower-case confirmed
    price : '[data-testid$="price"]',
    beds  : '[data-testid$="bedroom"]',
    baths : '[data-testid$="bathroom"]',
    size  : '[data-testid$="area"]',
    title : 'h2, h3'
  }
} as const
