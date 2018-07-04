import userBrowser from '../utils/useBrowser';
import AutoRefresh from './AutoRefresh';
import Image from './Image';
import Options from './Options';
userBrowser();

const autoRefresh = new AutoRefresh();
const image = new Image();
const options = new Options();

// window.x = autoRefresh;

browser.tabs.onRemoved.addListener(tabId => {
  autoRefresh.delete(tabId);
});
// Please keep in mind that sendResponse cannot wait for Promise
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (!request.job) {
    return;
  }
  // console.log(request.job);
  const job = request.job;

  if (job === 'updateAutoRefresh') {
    const { tabId, interval, active, startAt } = request;
    const autoRefreshStatus = autoRefresh.update(tabId, active, interval, startAt, true);
    console.log(autoRefreshStatus);
    sendResponse(autoRefreshStatus);
  }
  else if (job === 'getCurrentTabAutoRefreshStatus') {
    const { tabId } = request;
    const autoRefreshStatus = autoRefresh.getStatus(tabId);
    console.log(autoRefreshStatus);
    sendResponse(autoRefreshStatus);
  } else if (job === "imageSearchBegin") {
    console.log("???");
    browser.tabs.create({ url:"/searchResult.html" });
  }
});

document.addEventListener('DOMContentLoaded', async () => {
  await options.init();
  await image.init();
});

