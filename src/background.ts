import composeTimeStamp from "./timestamp"

chrome.runtime.onMessage.addListener(
    function(request, sender) {
        var textWithUrl = formatTimeStampedTextAndUrl(request.selectedText, sender.tab.url);
        copyToClipboard(textWithUrl);
    }
);

function formatTimeStampedTextAndUrl(text: String, sourceURL: String) {
    let newLineLiteral: String = "  \n    ";
    let quotationLeadingMark: String = "'";
    let quotationTrailingMark: String = "'";
    let timestamp = composeTimeStamp(new Date());
    let formattedResult =
        "" + quotationLeadingMark + text + quotationTrailingMark
        + newLineLiteral + timestamp
        + newLineLiteral + sourceURL;
    return formattedResult;
}

function copyToClipboard(text) {
    var copyBlock;
    var copyBlockId = "text-to-copy";

    if (document.getElementById(copyBlockId)) {
        copyBlock = document.getElementById(copyBlockId);
    } else {
        copyBlock = createTextContainer(copyBlockId);
    }

    copyBlock.value = text;
    copyBlock.focus();
    copyBlock.select();
    document.execCommand('Copy');
}

chrome.browserAction.onClicked.addListener(function() {
    chrome.tabs.executeScript(null, {
        file: "js/content_script.js"
    });
});

chrome.commands.onCommand.addListener(function(command) {
    if (command === "CopyWithURL") {
        chrome.tabs.executeScript(null, {
            file: "js/content_script.js"
        });
    }
});

function createTextContainer(copyBlockId) {
    var copyBlock = document.createElement("textarea");
    copyBlock.setAttribute("id", copyBlockId);
    var backgroundBody = document.querySelector("body");
    var backgroundBodyLastElementChild = document.querySelector("body").lastElementChild;
    backgroundBody.insertBefore(copyBlock, backgroundBodyLastElementChild);
    return copyBlock;
}