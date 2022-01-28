const state = {
  lastTime: new Date().getTime(),
  now: () => new Date().getTime()
};

async function getGoogleMeetTab() {
  let queryOptions = {url: 'https://meet.google.com/*'};
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

async function listenForAwkwardSilence() {
  const tab = await getGoogleMeetTab();

  console.log(state, tab?.audible);

  if (!tab?.audible) {
    if(state.now() - state.lastTime > 7 * 1000){
      await sendNewRandomTopic();

      state.lastTime = new Date().getTime();
    }
  } else {
    state.lastTime = new Date().getTime();
  }
}

async function sendNewRandomTopic() {
  await console.log('send a message via slack api');
}

chrome.runtime.onInstalled.addListener(async () => {
  setInterval(listenForAwkwardSilence, 1000);
});
