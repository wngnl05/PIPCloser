chrome.runtime.onMessage.addListener(async function (req, sender, sendResponse) {
    if(req.type=="PIPOpen"){

        const video = document.querySelector("video");

        if (video) {
            video.addEventListener('click', async () => {
                try { await video.requestPictureInPicture() } 
                catch (error) { console.log("PIP 요청 실패", error) }
            });
            video.click();
        }

    }
});