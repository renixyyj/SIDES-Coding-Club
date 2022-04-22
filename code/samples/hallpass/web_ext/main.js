/**
 * HallPass Chrome Extension
 * 
 * Copyright © 2021 Finer Engineering Inc. All rights reserved.
 * Created Dec 8, 2021
 * 
 * @author CJF
 * 
 */
(function () {
    setTimeout(start, 10000);
})()

async function start () {
    
    console.log("START")
    const URL = 'https://hp.renix.net'; //'https://hp.renix.net';
    const config = await chrome.storage.sync.get(['user', 'host']);
    const user = config.user || 'undefined';
    const host = config.host || 'undefined';
    const build = 1;
    var current_id = null;
    var current_tab = null;
   // chrome.idle.setDetectionInterval(30);

    debounce = (() => {
        let last_bounce = 0;
        return (callback, timeout) => {
            last_cb = callback;
            if (new Date().getTime() - timeout > last_bounce) {
                last_bounce = Date.now()
                callback();
            }
        }
    })()

    const logWindowChange = async function (winId) {
        const tabs = await chrome.tabs.query({ active: true }).then(t =>
            t.filter(tab => tab.windowId === winId)
        )
        if (winId === chrome.windows.WINDOW_ID_NONE)
            sendLog('OTHER');

        else if (tabs.length) {
            current_tab = tabs[0].id;
            const data = formatTabData(tabs[0]);
            sendLog('WINDOW', data);
        }
    }

    //chrome.runtime.onSuspend.addListener(() => sendLog("SUSPEND"));

    chrome.runtime.onInstalled.addListener((reason) => {
        console.log("Installed", reason);
        sendLog("ON INSTALL");
    })

    /* window selected */
    chrome.windows.onFocusChanged.addListener(logWindowChange);

    /* tab selected */
    chrome.tabs.onActivated.addListener(async tab => {
        current_tab = tab.tabId;
        const data = formatTabData(await getTabInfo(tab.tabId))
        sendLog("TAB", data);
    })

    /* tab url updated */
    chrome.tabs.onUpdated.addListener(async updated => {
        // not sure if a tab can be updated if not current, let's see...
        if (updated !== current_tab) {
            console.log("updated !== current_tab")
        }
        debounce(async () => {
            setTimeout(async () => {
                const data = formatTabData(await getTabInfo(updated));
                sendLog("UPDATE", data);
            }, 5500)
        }, 5000);
    })

    /* tab closed */
    chrome.tabs.onRemoved.addListener(async removed => {
        if (removed === current_tab) {
            current_tab = null;
            sendPut();
        }
    })

    /* IDLE
    chrome.idle.onStateChanged.addListener(async state => {
        if (state === 'idle') {
            current_tab = null;
            sendLog("IDLE");
        }
        else {
            sendPut();
            const active = await chrome.windows.getLastFocused();
            if (active.focused)
                logWindowChange(active.id);
        }
    }) */

    chrome.runtime.onStartup.addListener(() => {
        console.log("STARTUP")
        sendLog("START")
    })

    const getTabInfo = (tab) => {
        return chrome.tabs.get(tab) /*.then(info => {
            if (info.status === 'complete')
                return info;
            return null;
        })*/
    }


    /* ------------------ HELPERS -------------------- */
    const formatTabData = (tab) => {
        return {
            incognito: tab.incognito,
            url: tab.url.substr(0, 250),
            title: tab.title.substr(0, 250),
            audio: tab.audible
        }
    }

    const sendPut = async () => {
        if (current_id)
            await fetch(URL + '/api/log/' + current_id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json'
                }
            }).catch(() => { });
    }

    const sendLog = async (type, data) => {
        const info = {
            ...data,
            type: type,
            build: build,
            user: user,
            host: host,
        }

        sendPut();

        current_id = await fetch(URL + '/api/log', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        })
            .catch(() => { })
            .then(r => {
                if (r.ok)
                    return r.json();
            });
    }

}
