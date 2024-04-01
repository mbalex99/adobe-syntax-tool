import { useEffect, useState } from "react";
import { os, path } from "../lib/cep/node";
import {
  csi,
  evalES,
  evalFile,
  openLinkInBrowser,
  subscribeBackgroundColor,
  evalTS,
} from "../lib/utils/bolt";


import {
  codeToTokens,
  bundledLanguagesInfo,
  bundledThemesInfo,
  BundledLanguage,
} from "shiki";

import ThemeSelector from "./components/ThemeSelector";
import LanguageSelector from "./components/LanguageSelector";
import ErrorAlert from "./components/ErrorAlert";

function hexToRgb(hex: string): [number, number, number] {
  // Remove any leading '#' from the hex string
  hex = hex.replace(/^#/, "");

  // Extract the red, green, and blue components from the hex string
  let red: number, green: number, blue: number;
  if (hex.length === 6) {
    red = parseInt(hex.substring(0, 2), 16);
    green = parseInt(hex.substring(2, 4), 16);
    blue = parseInt(hex.substring(4, 6), 16);
  } else if (hex.length === 8) {
    red = parseInt(hex.substring(2, 4), 16);
    green = parseInt(hex.substring(4, 6), 16);
    blue = parseInt(hex.substring(6, 8), 16);
  } else {
    throw new Error("Invalid hex color format");
  }

  // Return the RGB value as an array
  return [red, green, blue];
}

// Example usage:
const hexColor = "#FFA500"; // Orange color
const rgbValue = hexToRgb(hexColor);
console.log(rgbValue); // Output: [255, 165, 0]

const Main = () => {
  const [bgColor, setBgColor] = useState("#282c34");

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [selectedLanguage, setSelectedLanguage] = useState(
    bundledLanguagesInfo.find((t) => t.id === "javascript") ||
      bundledLanguagesInfo[0]
  );
  const [selectedTheme, setSelectedTheme] = useState(
    bundledThemesInfo.find((t) => t.id === "vitesse-dark") ||
      bundledThemesInfo[0]
  );

  //* Demonstration of Traditional string eval-based ExtendScript Interaction
  const jsxTest = () => {
    console.log(evalES(`helloWorld("${csi.getApplicationID()}")`));
  };

  //* Demonstration of End-to-End Type-safe ExtendScript Interaction
  const jsxTestTS = () => {
    evalTS("helloStr", "test").then((res) => {
      console.log(res);
    });
    evalTS("helloNum", 1000).then((res) => {
      console.log(typeof res, res);
    });
    evalTS("helloArrayStr", ["ddddd", "aaaaaa", "zzzzzzz"]).then((res) => {
      console.log(typeof res, res);
    });
    evalTS("helloObj", { height: 90, width: 100 }).then((res) => {
      console.log(typeof res, res);
      console.log(res.x);
      console.log(res.y);
    });
    evalTS("helloVoid").then(() => {
      console.log("function returning void complete");
    });
    evalTS("helloError", "test").catch((e) => {
      console.log("there was an error", e);
    });
  };

  const nodeTest = () => {
    alert(
      `Node.js ${process.version}\nPlatform: ${
        os.platform
      }\nFolder: ${path.basename(window.cep_node.global.__dirname)}`
    );
  };

  const syntaxHighlightText = async () => {
    const result: { id: number | string; sourceTextString: string }[] =
      await evalTS("getSelectedTextLayers");

    if (result.length === 0) {
      setErrorMessage("No text layers selected");
      return;
    }
    for (const layer of result) {
      try {
        const sourceTextString: string = layer.sourceTextString;
        const tokenResult = await codeToTokens(sourceTextString, {
          lang: selectedLanguage.id as BundledLanguage,
          theme: selectedTheme.id,
        });
        const characterRangeColors: {
          characterStart: number;
          characterEnd: number;
          color: [number, number, number];
        }[] = [];
        tokenResult.tokens.forEach((token) => {
          token.forEach((themedToken) => {
            const offset = themedToken.offset;
            const color = themedToken.color || "#FFFFFF";
            const rgbValue = hexToRgb(color);
            characterRangeColors.push({
              characterStart: offset,
              characterEnd: offset + themedToken.content.length,
              color: rgbValue,
            });
          });
        });
        await evalTS("colorizeTextLayer", layer.id, characterRangeColors);
      } catch (e) {
        setErrorMessage(JSON.stringify(e, null, 2));
      }
    }
  };

  useEffect(() => {
    if (window.cep) {
      subscribeBackgroundColor(setBgColor);
    }
  }, []);

  return (
    <div className="app p-3" style={{ backgroundColor: bgColor }}>
      <div className="flex flex-col space-y-3">
        <span className="text-gray-400 font-bold">Syntax Highlight</span>
        <div>
          {errorMessage && (
            <ErrorAlert onClose={() => setErrorMessage(null)}>
              {errorMessage}
            </ErrorAlert>
          )}
          <ThemeSelector
            themeId={selectedTheme.id}
            onChange={(themeId) => {
              setSelectedTheme(
                bundledThemesInfo.find((t) => t.id === themeId) ||
                  bundledThemesInfo[0]
              );
            }}
          />
        </div>
        <div>
          <LanguageSelector
            languageId={selectedLanguage.id}
            onChange={(languageId) => {
              setSelectedLanguage(
                bundledLanguagesInfo.find((t) => t.id === languageId) ||
                  bundledLanguagesInfo[0]
              );
            }}
          />
        </div>
        <button
          type="button"
          onClick={syntaxHighlightText}
          className="rounded bg-blue-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Syntax Highlight Code
        </button>
        <span className="text-xs text-gray-400">
          This will highlight the code in the selected text layers. It's powered
          by{" "}
          <a
            target="_blank"
            className="text-blue-400 hover:underline cursor-pointer"
            onClick={() =>
              openLinkInBrowser(`https://github.com/shikijs/shiki`)
            }
          >
            Shiki JavaScript Syntax Highlighter.
          </a>
        </span>
      </div>
    </div>
  );
};

export default Main;
