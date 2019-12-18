chrome.browserAction.onClicked.addListener(function(){
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, {type: 'grabAllPicktures'});
    });
})

chrome.runtime.onMessage.addListener(request =>{
    if(request.type = 'downloadImage'){
        const image = request.image;
        chrome.downloads.download({url: image.link, filename: image.name, conflictAction: 'overwrite'});
    }
})

