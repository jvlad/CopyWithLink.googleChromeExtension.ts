(function () {
    var selectedText = grabTextWithSourceURL();
    if (selectedText) {
        sendSelectedTextToBackgroundPage(selectedText);
    }
})();

function sendSelectedTextToBackgroundPage(selectedText: String) {
        chrome.runtime.sendMessage(
            { selectedText: selectedText }
            );
}

function grabTextWithSourceURL() {
    var selectedText;
    if (window.getSelection) {
        selectedText = window.getSelection().toString();
    }
    return selectedText;
}