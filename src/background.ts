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
        file: "src/content_script.js"
    });
});

chrome.commands.onCommand.addListener(function(command) {
    if (command === "CopyWithURL") {
        chrome.tabs.executeScript(null, {
            file: "src/content_script.js"
        });
    }
});

function formatTimeStampedTextAndUrl(text: String, sourceURL: String) {
    let indentationSpace = "    ";
    // let timeStampGeneration = require('build/timestampGeneration.js');
    let timestamp = composeTimeStamp(new Date());
    return text + "  \n" + indentationSpace + "[" + timeStamp + "]" + ", source:  \n" + indentationSpace + sourceURL;
}

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

/**
 * Return a timestamp with the format "m/d/yy h:MM TT"
 * @type {String}
 */
function timeStamp() {
    // Create a date object with the current time
    var now = new Date();
    var date = [now.getMonth() + 1, now.getDate(), now.getFullYear()];
    var time = [now.getHours(), now.getMinutes()];

    var suffix = (time[0] < 12) ? "AM" : "PM";

    // Convert hour from military time
    time[0] = (time[0] < 13) ? time[0] : time[0] - 12;

    // If hour is 0, set it to '00'
    time[0] = time[0] || '00';

    // If minutes are less than 10, add a zero
    if (time[1] < 10) {
        time[1] = "0" + time[1];
    }

    return date.join("/") + " " + time.join(":") + " " + suffix;
}

function testIfTimestampGenerationWorks() {
    let timestamp: String = formatTimeStampedTextAndUrl("Selected text sample", "http://sample.com")
    console.log(timestamp)
    setTimeout(testIfTimestampGenerationWorks, 1000 * 10);
}

function polling() {
    console.log('polling');
    setTimeout(polling, 1000 * 10);
}

// polling();

