// propzy/background.ts
chrome.action.onClicked.addListener(async ({ id: tabId }) => {
  if (!tabId) return

  // inject our scraper into the active tab (Bayut page)
  await chrome.scripting.executeScript({
    target: { tabId },
    files: ["/contents/listing-scan.ts"]
  })

  // toast notification
  chrome.notifications.create({
    type: "basic",
    iconUrl: "icon.png", // uses the icon in assets/
    title: "Propzy",
    message: "Listing saved to Supabase!"
  })
})
