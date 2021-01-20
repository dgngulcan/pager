figma.showUI(__html__, { visible: true, width: 400, height: 450 });
figma.ui.onmessage = msg => {
    if (msg.type === 'add-pages') {
        addPageNumbers(msg);
    }
    figma.closePlugin();
};
function addPageNumbers(message) {
    var currentIndex = message.startIndex;
    figma
        .currentPage
        .findAll(node => node.type === "TEXT")
        .filter(node => node.characters === "{p#}")
        .forEach(function (node) {
        var newText = message.prefix + currentIndex + message.suffix;
        figma.loadFontAsync(node.fontName)
            .then(function () {
            node.characters = newText;
        }, function () {
        });
        currentIndex++;
    });
}
;
