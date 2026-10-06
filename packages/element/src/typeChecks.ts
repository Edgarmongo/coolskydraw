import { ROUNDNESS, assertNever } from "@coolskydraw/common";

import { pointsEqual } from "@coolskydraw/math";

import type { ElementOrToolType } from "@coolskydraw/coolskydraw/types";

import type { MarkNonNullable } from "@coolskydraw/common/utility-types";

import type {
  CoolskydrawElement,
  CoolskydrawTextElement,
  CoolskydrawEmbeddableElement,
  CoolskydrawLinearElement,
  CoolskydrawBindableElement,
  CoolskydrawFreeDrawElement,
  InitializedCoolskydrawImageElement,
  CoolskydrawImageElement,
  CoolskydrawTextElementWithContainer,
  CoolskydrawTextContainer,
  CoolskydrawFrameElement,
  RoundnessType,
  CoolskydrawFrameLikeElement,
  CoolskydrawElementType,
  CoolskydrawIframeElement,
  CoolskydrawIframeLikeElement,
  CoolskydrawMagicFrameElement,
  CoolskydrawArrowElement,
  CoolskydrawElbowArrowElement,
  CoolskydrawLineElement,
  CoolskydrawFlowchartNodeElement,
  CoolskydrawLinearElementSubType,
  CoolskydrawStickyNoteElement,
} from "./types";

export const isInitializedImageElement = <T extends CoolskydrawElement>(
  element: T | null,
): element is T & InitializedCoolskydrawImageElement => {
  return !!element && element.type === "image" && !!element.fileId;
};

export const isImageElement = <T extends CoolskydrawElement>(
  element: T | null,
): element is T & CoolskydrawImageElement => {
  return !!element && element.type === "image";
};

export const isEmbeddableElement = <T extends CoolskydrawElement>(
  element: T | null | undefined,
): element is T & CoolskydrawEmbeddableElement => {
  return !!element && element.type === "embeddable";
};

export const isIframeElement = <T extends CoolskydrawElement>(
  element: T | null,
): element is T & CoolskydrawIframeElement => {
  return !!element && element.type === "iframe";
};

export const isIframeLikeElement = <T extends CoolskydrawElement>(
  element: T | null,
): element is T & CoolskydrawIframeLikeElement => {
  return (
    !!element && (element.type === "iframe" || element.type === "embeddable")
  );
};

export const isTextElement = <T extends CoolskydrawElement>(
  element: T | null,
): element is T & CoolskydrawTextElement => {
  return element != null && element.type === "text";
};

export const isStickyNoteElement = <T extends CoolskydrawElement>(
  element: T | null | undefined,
): element is T & CoolskydrawStickyNoteElement => {
  return element != null && element.type === "stickynote";
};

export const isFrameElement = <T extends CoolskydrawElement>(
  element: T | null,
): element is T & CoolskydrawFrameElement => {
  return element != null && element.type === "frame";
};

export const isMagicFrameElement = <T extends CoolskydrawElement>(
  element: T | null,
): element is T & CoolskydrawMagicFrameElement => {
  return element != null && element.type === "magicframe";
};

export const isFrameLikeElement = <T extends CoolskydrawElement>(
  element: T | null,
): element is T & CoolskydrawFrameLikeElement => {
  return (
    element != null &&
    (element.type === "frame" || element.type === "magicframe")
  );
};

export const isFreeDrawElement = <T extends CoolskydrawElement>(
  element?: T | null,
): element is T & CoolskydrawFreeDrawElement => {
  return element != null && isFreeDrawElementType(element.type);
};

export const isFreeDrawElementType = (
  elementType: CoolskydrawElementType,
): boolean => {
  return elementType === "freedraw";
};

export const isLinearElement = <T extends CoolskydrawElement>(
  element?: T | null,
): element is T & CoolskydrawLinearElement => {
  return element != null && isLinearElementType(element.type);
};

export const isLineElement = <T extends CoolskydrawElement>(
  element?: T | null,
): element is T & CoolskydrawLineElement => {
  return element != null && element.type === "line";
};

export const isArrowElement = <T extends CoolskydrawElement>(
  element?: T | null,
): element is T & CoolskydrawArrowElement => {
  return element != null && element.type === "arrow";
};

export const isElbowArrow = <T extends CoolskydrawElement>(
  element?: T,
): element is T & CoolskydrawElbowArrowElement => {
  return isArrowElement(element) && element.elbowed;
};

/**
 * sharp or curved arrow, but not elbow
 */
export const isSimpleArrow = <T extends CoolskydrawElement>(
  element?: T,
): element is T & CoolskydrawArrowElement => {
  return isArrowElement(element) && !element.elbowed;
};

export const isSharpArrow = <T extends CoolskydrawElement>(
  element?: T,
): element is T & CoolskydrawArrowElement => {
  return isArrowElement(element) && !element.elbowed && !element.roundness;
};

export const isCurvedArrow = <T extends CoolskydrawElement>(
  element?: T,
): element is T & CoolskydrawArrowElement => {
  return (
    isArrowElement(element) && !element.elbowed && element.roundness !== null
  );
};

export const isLinearElementType = (
  elementType: ElementOrToolType,
): boolean => {
  return (
    elementType === "arrow" || elementType === "line" // || elementType === "freedraw"
  );
};

export const isBindingElement = <T extends CoolskydrawElement>(
  element?: T | null,
  includeLocked = true,
): element is T & CoolskydrawArrowElement => {
  return (
    element != null &&
    (!element.locked || includeLocked === true) &&
    isBindingElementType(element.type)
  );
};

export const isBindingElementType = (
  elementType: ElementOrToolType,
): boolean => {
  return elementType === "arrow";
};

export const isBindableElement = <T extends CoolskydrawElement>(
  element: T | null | undefined,
  includeLocked = true,
): element is T & CoolskydrawBindableElement => {
  return (
    element != null &&
    (!element.locked || includeLocked === true) &&
    (element.type === "rectangle" ||
      element.type === "stickynote" ||
      element.type === "diamond" ||
      element.type === "ellipse" ||
      element.type === "image" ||
      element.type === "iframe" ||
      element.type === "embeddable" ||
      element.type === "frame" ||
      element.type === "magicframe" ||
      (element.type === "text" && !element.containerId))
  );
};

export const isRectanguloidElement = <T extends CoolskydrawElement>(
  element?: T | null,
): element is T & CoolskydrawBindableElement => {
  return (
    element != null &&
    (element.type === "rectangle" ||
      element.type === "stickynote" ||
      element.type === "diamond" ||
      element.type === "image" ||
      element.type === "iframe" ||
      element.type === "embeddable" ||
      element.type === "frame" ||
      element.type === "magicframe" ||
      (element.type === "text" && !element.containerId))
  );
};

// TODO: Remove this when proper distance calculation is introduced
// @see binding.ts:distanceToBindableElement()
export const isRectangularElement = <T extends CoolskydrawElement>(
  element?: T | null,
): element is T & CoolskydrawBindableElement => {
  return (
    element != null &&
    (element.type === "rectangle" ||
      element.type === "stickynote" ||
      element.type === "image" ||
      element.type === "text" ||
      element.type === "iframe" ||
      element.type === "embeddable" ||
      element.type === "frame" ||
      element.type === "magicframe" ||
      element.type === "freedraw")
  );
};

export const isTextBindableContainer = <T extends CoolskydrawElement>(
  element: T | null,
  includeLocked = true,
): element is T & CoolskydrawTextContainer => {
  return (
    element != null &&
    (!element.locked || includeLocked === true) &&
    (element.type === "rectangle" ||
      element.type === "stickynote" ||
      element.type === "diamond" ||
      element.type === "ellipse" ||
      isArrowElement(element))
  );
};

export const isCoolskydrawElement = (
  element: any,
): element is CoolskydrawElement => {
  const type: CoolskydrawElementType | undefined = element?.type;
  if (!type) {
    return false;
  }
  switch (type) {
    case "text":
    case "diamond":
    case "rectangle":
    case "stickynote":
    case "iframe":
    case "embeddable":
    case "ellipse":
    case "arrow":
    case "freedraw":
    case "line":
    case "frame":
    case "magicframe":
    case "image":
    case "selection": {
      return true;
    }
    default: {
      assertNever(type, null);
      return false;
    }
  }
};

export const isFlowchartNodeElement = <T extends CoolskydrawElement>(
  element: T,
): element is T & CoolskydrawFlowchartNodeElement => {
  return (
    element.type === "rectangle" ||
    element.type === "stickynote" ||
    element.type === "ellipse" ||
    element.type === "diamond"
  );
};

export const hasBoundTextElement = <T extends CoolskydrawElement>(
  element: T | null,
): element is T &
  MarkNonNullable<CoolskydrawBindableElement, "boundElements"> => {
  return (
    isTextBindableContainer(element) &&
    !!element.boundElements?.some(({ type }) => type === "text")
  );
};

export const isBoundToContainer = <T extends CoolskydrawElement>(
  element: T | null,
): element is T & CoolskydrawTextElementWithContainer => {
  return (
    element !== null &&
    "containerId" in element &&
    element.containerId !== null &&
    isTextElement(element)
  );
};

export const isArrowBoundToElement = (element: CoolskydrawArrowElement) => {
  return !!element.startBinding || !!element.endBinding;
};

export const isUsingAdaptiveRadius = (type: string) =>
  type === "rectangle" ||
  type === "embeddable" ||
  type === "iframe" ||
  type === "image";

export const isUsingProportionalRadius = (type: string) =>
  type === "line" ||
  type === "arrow" ||
  type === "diamond" ||
  type === "stickynote";

export const canApplyRoundnessTypeToElement = (
  roundnessType: RoundnessType,
  element: CoolskydrawElement,
) => {
  if (
    (roundnessType === ROUNDNESS.ADAPTIVE_RADIUS ||
      // if legacy roundness, it can be applied to elements that currently
      // use adaptive radius
      roundnessType === ROUNDNESS.LEGACY) &&
    isUsingAdaptiveRadius(element.type)
  ) {
    return true;
  }
  if (
    roundnessType === ROUNDNESS.PROPORTIONAL_RADIUS &&
    isUsingProportionalRadius(element.type)
  ) {
    return true;
  }

  return false;
};

export const getDefaultRoundnessTypeForElement = (
  element: CoolskydrawElement,
) => {
  if (isUsingProportionalRadius(element.type)) {
    return {
      type: ROUNDNESS.PROPORTIONAL_RADIUS,
    };
  }

  if (isUsingAdaptiveRadius(element.type)) {
    return {
      type: ROUNDNESS.ADAPTIVE_RADIUS,
    };
  }

  return null;
};

export const getLinearElementSubType = (
  element: CoolskydrawLinearElement,
): CoolskydrawLinearElementSubType => {
  if (isSharpArrow(element)) {
    return "sharpArrow";
  }
  if (isCurvedArrow(element)) {
    return "curvedArrow";
  }
  if (isElbowArrow(element)) {
    return "elbowArrow";
  }
  return "line";
};

/**
 * Checks if current element points meet all the conditions for polygon=true
 * (this isn't a element type check, for that use isLineElement).
 *
 * If you want to check if points *can* be turned into a polygon, use
 *  canBecomePolygon(points).
 */
export const isValidPolygon = (
  points: CoolskydrawLineElement["points"],
): boolean => {
  return points.length > 3 && pointsEqual(points[0], points[points.length - 1]);
};

export const canBecomePolygon = (
  points: CoolskydrawLineElement["points"],
): boolean => {
  return (
    points.length > 3 ||
    // 3-point polygons can't have all points in a single line
    (points.length === 3 && !pointsEqual(points[0], points[points.length - 1]))
  );
};

export const isEligibleFrameChildType = (type: ElementOrToolType) => {
  switch (type) {
    case "rectangle":
    case "stickynote":
    case "diamond":
    case "ellipse":
    case "arrow":
    case "line":
    case "freedraw":
    case "text":
    case "image":
    case "frame":
    case "embeddable": {
      return true;
    }
    default: {
      return false;
    }
  }
};
