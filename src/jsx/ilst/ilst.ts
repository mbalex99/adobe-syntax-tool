import {
  helloVoid,
  helloError,
  helloStr,
  helloNum,
  helloArrayStr,
  helloObj,
} from "../utils/samples";
export { helloError, helloStr, helloNum, helloArrayStr, helloObj, helloVoid };
import { dispatchTS } from "../utils/utils";

export const helloWorld = () => {
  alert("Hello from Illustrator");
  app.activeDocument.path;
};

/**
 * This will grab an array of all the selected layers but only the Text layers
 * It will return an array of the selected text layers with their id and source text
 * @returns {Array<{id: number, sourceTextString: string}>}
 */
export const getSelectedTextLayers = () => {
  const selectedLayers = app.activeDocument.selection || [];
  var textLayers: TextFrame[] = [];
  for (var i = 0; i < selectedLayers.length; i++) {
    var layer = selectedLayers[i];
    if (layer instanceof TextFrame) {
      textLayers.push(layer);
    }
  }
  var result: { id: number | string; sourceTextString: string }[] = [];
  for (var i = 0; i < textLayers.length; i++) {
    var thisTextLayer: TextFrame = textLayers[i];
    result.push({
      id: thisTextLayer.name,
      sourceTextString: thisTextLayer.contents,
    });
  }
  return result;
};

export const colorizeTextLayer = (
  textLayerId: number | string,
  colors: {
    characterStart: number;
    characterEnd: number;
    color: [number, number, number];
  }[]
) => {
  alert("colorizeTextLayer");
  const textFrame = app.activeDocument.textFrames.getByName(
    textLayerId as string
  );
  if (textFrame) {
    for (const color of colors) {
      const rgbColor = new RGBColor();
      rgbColor.red = color.color[0];
      rgbColor.green = color.color[1];
      rgbColor.blue = color.color[2];
      for (let i = color.characterStart; i < color.characterEnd; i++) {
        textFrame.textRange.characters[i].characterAttributes.fillColor = rgbColor;
      }
    }
  }
};
