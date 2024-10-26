chrome.tabs.onActivated.addListener(async (activeInfo) => {
    let tabs = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    let currentTab = tabs[0];

    if (currentTab.url.includes("youtube.com/watch")) 
    {
        chrome.scripting.executeScript({
            target: {tabId: currentTab.id},
            function: resumeYouTubeVideo
        });
    } 
    else 
    {
        chrome.tabs.query({url: "*://www.youtube.com/*"}, (tabs) => {
            tabs.forEach((tab) => {
                chrome.scripting.executeScript({
                    target: {tabId: tab.id},
                    function: pauseYouTubeVideo
                });
            });
        });
    }
});

function pauseYouTubeVideo() {
    let video = document.querySelector('video');
    if (video && !video.paused) {
        video.pause();
    }
}

function resumeYouTubeVideo() {
    let video = document.querySelector('video');
    if (video && video.paused) {
        video.play();
    }
}
