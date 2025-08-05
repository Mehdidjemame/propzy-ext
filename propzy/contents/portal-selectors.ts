export const PORTALS = {
  bayut: {
    match: /bayut\.com/,
    card: "div[data-testid='listing-card'], article",
    price: '[aria-label="Price"], [data-testid="price"]',
    beds:  '[aria-label="Beds"]',
    baths: '[aria-label="Baths"]',
    size:  '[aria-label="Area"], [data-testid="area"]',
    location: '[aria-label="Location"], [data-testid="location"]',
    title: 'h2, h3' // ✅ Added title selector
  },

  dubizzle: {
    match: /dubizzle\.com/,
    card: 'div[class^="property-lpv-card-"]',
    price: '[data-testid="listing-price"]',
    beds : '[data-testid="listing-bedrooms"]',
    baths: '[data-testid="listing-bathrooms"]',
    size : '[data-testid="listing-size"]',
    location: '[data-testid="listing-location"]',
    title: '[data-testid="subheading-text"], h2'
  },

  propertyfinder: {
    match : /propertyfinder\.ae/,
    card  : 'li[data-testid^="list-item"]',
    price : '[data-testid$="price"]',
    beds  : '[data-testid$="bedroom"]',
    baths : '[data-testid$="bathroom"]',
    size  : '[data-testid$="area"]',
    location: '[data-testid="property-card-location"]',
    title : 'h2, h3'
  }
} as const
