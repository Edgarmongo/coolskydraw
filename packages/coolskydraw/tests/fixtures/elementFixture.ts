import { DEFAULT_FONT_FAMILY } from "@coolskydraw/common";

import type { Radians } from "@coolskydraw/math";

import type { CoolskydrawElement } from "@coolskydraw/element/types";

const elementBase: Omit<CoolskydrawElement, "type"> = {
  id: "vWrqOAfkind2qcm7LDAGZ",
  x: 414,
  y: 237,
  width: 214,
  height: 214,
  angle: 0 as Radians,
  strokeColor: "#000000",
  backgroundColor: "#15aabf",
  fillStyle: "hachure",
  strokeWidth: 1,
  strokeStyle: "solid",
  roughness: 1,
  opacity: 100,
  groupIds: [],
  frameId: null,
  roundness: null,
  index: null,
  seed: 1041657908,
  version: 120,
  versionNonce: 1188004276,
  isDeleted: false,
  boundElements: null,
  updated: 1,
  created: null,
  link: null,
  locked: false,
};

export const rectangleFixture: CoolskydrawElement = {
  ...elementBase,
  type: "rectangle",
};
export const embeddableFixture: CoolskydrawElement = {
  ...elementBase,
  type: "embeddable",
};
export const ellipseFixture: CoolskydrawElement = {
  ...elementBase,
  type: "ellipse",
};
export const diamondFixture: CoolskydrawElement = {
  ...elementBase,
  type: "diamond",
};
export const rectangleWithLinkFixture: CoolskydrawElement = {
  ...elementBase,
  type: "rectangle",
  link: "coolskyai.com",
};

export const textFixture: CoolskydrawElement = {
  ...elementBase,
  type: "text",
  fontSize: 20,
  baseFontSize: null,
  fontFamily: DEFAULT_FONT_FAMILY,
  strokeColor: "#1e1e1e",
  text: "original text",
  originalText: "original text",
  textAlign: "left",
  verticalAlign: "top",
  containerId: null,
  lineHeight: 1.25 as any,
  autoResize: false,
};
