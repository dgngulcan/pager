figma.showUI(__html__, { visible: true, width: 400, height: 450 });

figma.ui.onmessage = msg => {
  if (msg.type === 'add-pages') {
    addPageNumbers(msg)
  }
};

async function addPageNumbers(message) {
  var frames = figma
    .currentPage
    .findAll(node => node.type === "TEXT")
    .filter(node => node.characters === "{p#}")

    if(message.reversed){
      frames = frames.reverse()
    }

    var currentIndex = message.startIndex
    frames.forEach(function (node) {
     var newText = message.prefix + currentIndex + message.suffix

    figma
      .loadFontAsync(node.fontName)
      .then(function () { node.characters = newText},function () {})

      currentIndex++
    })
};