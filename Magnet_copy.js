// ==UserScript==
// @name         Magnet Links Finder & Copier
// @namespace    http://srsman.com/
// @version      1
// @description  Find all magnet links on a page and copy them to the clipboard with one click.
// @match        http://*/*
// @match        https://*/*
// @grant        GM_setClipboard
// ==/UserScript==

(function() {
    'use strict';

    // Find all magnet links on the page
    var magnetLinks = [];
    var links = document.querySelectorAll("a[href*='magnet:']");
    for (var i = 0; i < links.length; i++) {
        magnetLinks.push(links[i].href);
    }

    // Look for magnet links in other types of elements
    var nodes = document.evaluate("//*[contains(text(), 'magnet:')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var j = 0; j < nodes.snapshotLength; j++) {
        var node = nodes.snapshotItem(j);
        if (node.nodeName === "A") {
            magnetLinks.push(node.href);
        } else {
            magnetLinks.push(node.textContent.trim());
        }
    }

    // Remove duplicates
    magnetLinks = magnetLinks.filter(function(elem, pos) {
        return magnetLinks.indexOf(elem) === pos;
    });

    // Simplify the magnet link URLs
    for (var k = 0; k < magnetLinks.length; k++) {
        magnetLinks[k] = magnetLinks[k].replace(/&amp;/g, '&');
    }

    // Add a button to copy the magnet links to the clipboard
    var button = document.createElement("button");
    button.innerHTML = "Copy Magnet Links";
    button.style.position = "fixed";
    button.style.top = "20px";
    button.style.left = "20px";
    button.style.zIndex = "9999";
    button.addEventListener("click", function() {
        var magnetLinksText = magnetLinks.join('\n');
        GM_setClipboard(magnetLinksText);
        alert("Successfully copied " + magnetLinks.length + " magnet links to the clipboard!");
    });
    document.body.appendChild(button);

})();



