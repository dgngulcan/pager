figma.showUI(__html__, { visible: true, width: 400, height: 450 });

figma.ui.onmessage = msg => {
  if (msg.type === 'add-pages') {
    var currentIndex = msg.startIndex

    figma
      .currentPage
      .findAll(node => node.type === "TEXT" && node.characters === "{pageLabel}")
      .forEach(function (node) {
        if (node.type === "TEXT") {
          var newText = msg.suffix + currentIndex + msg.postfix

          figma.loadFontAsync(node.fontName)
            .then(function () {
              node.characters = newText
            }, function () {

            })

          currentIndex = currentIndex + 1
        }
      })
  }

  figma.closePlugin();
};
