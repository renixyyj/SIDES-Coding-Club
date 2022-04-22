
function show(platform, enabled) {
    console.log(`showing ${platform} ${enabled}`);
    document.body.classList.add(`platform-${platform}`);

    if (typeof enabled === "boolean") {
        document.body.classList.toggle(`state-on`, enabled);
        document.body.classList.toggle(`state-off`, !enabled);
    } else {
        document.body.classList.remove(`state-on`);
        document.body.classList.remove(`state-off`);
    }
}

function openPreferences() {
    webkit.messageHandlers.hpapp.postMessage("open-preferences");
    console.log("open prefs");
}

document.querySelector("button.open-preferences").addEventListener("click", openPreferences);
