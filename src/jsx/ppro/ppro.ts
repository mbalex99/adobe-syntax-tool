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
import {
  fillMogrtText,
  forEachChild,
  forEachClip,
  forEachVideoTrack,
} from "./ppro-utils";

export const qeDomFunction = () => {
  if (typeof qe === "undefined") {
    app.enableQE();
  }
  if (qe) {
    qe.name;
    qe.project.getVideoEffectByName("test");
  }
};

export const helloWorld = () => {
  alert("Hello from Premiere Pro.");
};

export const getSelectedTextLayers = () => {
  const activeSequence = app.project.activeSequence;
  if (!activeSequence) {
    return [];
  }
  const videoTracks = activeSequence.videoTracks;

  var mogrtClip: TrackItem | null = null;
  for (var i = 0; i < videoTracks.numTracks; i++) {
    var track = videoTracks[i];
    for (var j = 0; j < track.clips.numItems; j++) {
      var clip = track.clips[j];
      if (clip.isSelected()) {
        mogrtClip = clip
        break;
      }
    }
  }
};
