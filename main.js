
async function getCurrentTab() {
  let queryOptions = {url: 'https://meet.google.com/*'};
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

chrome.runtime.onInstalled.addListener(async () => {
  setInterval(async () => {
    const tab = await getCurrentTab();

    if (tab?.audible) {
      console.log('hoorayy');
    }
  }, 1000);
});
