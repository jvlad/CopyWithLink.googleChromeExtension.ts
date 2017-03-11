import composeTimeStamp from "./timestamp"

chrome.runtime.onMessage.addListener(
    function(request, sender) {
        var textWithUrl = formatTimeStampedTextAndUrl(request.selectedText, sender.tab.url);
        copyToClipboard(textWithUrl);
    }
);

chrome.browserAction.onClicked.addListener(function() {
    // No tabs or host permissions needed
    chrome.tabs.executeScript(null, {
        file: "js/content_script.js"
    });
});

// chrome.commands.onCommand.addListener(function(command) {
//     if (command === "CopyWithURL") {
//         chrome.tabs.executeScript(null, {
//             file: "src/content_script.js"
//         });
//     }
// });

function createTextContainer(copyBlockId) {
    var copyBlock = document.createElement("textarea");
    copyBlock.setAttribute("id", copyBlockId);
    var backgroundBody = document.querySelector("body");
    var backgroundBodyLastElementChild = document.querySelector("body").lastElementChild;
    backgroundBody.insertBefore(copyBlock, backgroundBodyLastElementChild);
    return copyBlock;
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

function formatTimeStampedTextAndUrl(text: String, sourceURL: String) {
    let indentationSpace = "    ";
    let timestamp = composeTimeStamp(new Date());
    
    let formattedResult = (
        text + "  \n" 
        + indentationSpace 
        + "[" + timestamp + "]" 
        + ", source:  \n" 
        + indentationSpace + sourceURL);
    console.log(formattedResult);
    return formattedResult;
}

function testIfTimestampGenerationWorks() {
    let timestamp: String = formatTimeStampedTextAndUrl("Selected text sample", "http://sample.com")
    setTimeout(testIfTimestampGenerationWorks, 1000 * 10);
}

function polling() {
    console.log('polling');
    setTimeout(polling, 1000 * 10);
}

