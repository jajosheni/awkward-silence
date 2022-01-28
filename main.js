const state = {
  lastTime: new Date().getTime(),
  now: () => new Date().getTime()
};

async function getGoogleMeetTab() {
  let queryOptions = {url: 'https://meet.google.com/*'};
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

async function randomizeTopics() {
  const tab = await getGoogleMeetTab();

  console.log(state, tab?.audible);

  if (!tab?.audible) {
    if(state.now() - state.lastTime > 10 * 1000){
      console.log('muted for 10 seconds, resetting timers');
      state.lastTime = new Date().getTime();
    }
  } else {
    state.lastTime = new Date().getTime();
  }
}

chrome.runtime.onInstalled.addListener(async () => {
  setInterval(randomizeTopics, 1000);
});
