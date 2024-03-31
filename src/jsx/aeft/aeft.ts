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
  alert("Hello from After Effects!");
  app.project.activeItem;
};

/**
 * This will grab an array of all the selected layers but only the Text layers
 * It will return an array of the selected text layers with their id and source text
 * @returns {Array<{id: number, sourceTextString: string}>}
 */
export const getSelectedTextLayers = () => {
  const selectedLayers = (app.project.activeItem as CompItem | null)?.selectedLayers || [];
  var textLayers: TextLayer[] = []
  for (var i = 0; i < selectedLayers.length; i++) {
    var layer = selectedLayers[i]
    if (layer instanceof TextLayer) {
      textLayers.push(layer)
    }
  }
  var result: {id: number, sourceTextString: string}[] = []
  for (var i = 0; i < textLayers.length; i++) {
    var thisTextLayer: TextLayer = textLayers[i]
    result.push({
      id: thisTextLayer.index,
      sourceTextString: thisTextLayer.sourceText.value.text
    })
  }
  return result
};


export const colorizeTextLayer = (textLayerId: number, colors: { characterStart: number; characterEnd: number; color: [number, number, number] }[]) => {
  const textLayer = (app.project.activeItem as CompItem | null)?.layer(textLayerId) as TextLayer | null;
  if (textLayer) {
    const textProp = textLayer.sourceText;
    const textDocument = textProp.value;
    for (const characterRangeColor of colors) {   
      //@ts-ignore
      const characterRange = textDocument.characterRange(characterRangeColor.characterStart, characterRangeColor.characterEnd);
      if (characterRange) {
        characterRange.fillColor = [characterRangeColor.color[0] / 255, characterRangeColor.color[1] / 255, characterRangeColor.color[2] / 255]
      }
    }
    textProp.setValue(textDocument);
  }
}

export const replaceTextLayer = (textLayerId: number, newText: string) => {
  const textLayer = (app.project.activeItem as CompItem | null)?.layer(textLayerId) as TextLayer | null;
  if (textLayer) {
    const textProp = textLayer.sourceText;
    const textDocument = textProp.value;
    textDocument.text = newText;
    textProp.setValue(textDocument);
  }
}