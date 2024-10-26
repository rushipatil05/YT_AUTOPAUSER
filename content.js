chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "pauseVideo") {
        let video = document.querySelector('video');
        if (video && !video.paused) {
            video.pause();
        }
    }
});
