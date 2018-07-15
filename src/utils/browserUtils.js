export const sendMessage = (content) => {
  return new Promise((resolve) => {
    browser.runtime.sendMessage(content, response =>{
      resolve(response);
    })
  })
};

export const getCurrentTab = () => {
  return new Promise(resolve => {
    browser.tabs.query({ 'active': true, 'lastFocusedWindow': true }, tabs => {
      if (tabs[0]) {
        resolve(tabs[0]);
      }
      else {
        resolve(null);
      }
    });
  });
};

export const createNewTab = (url) =>{
  return new Promise(resolve =>{
    browser.tabs.create({url,active:true}, async tab => {
      browser.tabs.onUpdated.addListener(function listener (tabId, info) {
          if (info.status === 'complete' && tabId === tab.id) {
              chrome.tabs.onUpdated.removeListener(listener);
              resolve();
          }
      });
    });
  })
}