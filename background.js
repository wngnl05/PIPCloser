let PIPTabId = null;

chrome.commands.onCommand.addListener(async (command) => {
    if (command === "PIPCloser") {

        // PIP 종료하기
        let PIPStatus = "open"; // close & open
        const tabs = await chrome.tabs.query({});
        for (const tab of tabs) {
            try{
                // chrome:// URL 탭은 건너뜁니다.
                if (!tab.id || tab.url.startsWith("chrome://")) continue;

                // 현재 탭에서 PIP 종료 시도
                const [result] = await chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    func: () => {
                        if (document.pictureInPictureElement) { document.exitPictureInPicture(); return true; }
                        else { return false }
                    },
                });

                if (result.result) {
                    PIPStatus = "close";
                    PIPTabId = tab.id;
                    break;
                }
            }
            catch(error){
                console.log("활성화 되지 않은 탭입니다", error)
            }
        }

        // // 종료된 PIP 다시 열기
        // if (PIPTabId && PIPStatus=="close") {
        //     try { chrome.tabs.sendMessage(PIPTabId, { type: "PIPOpen" }) }
        //     catch(error){ console.log("활성활할 PIP이 없거나 탭이 닫혔습니다.", error) }
        // }

    }
});
