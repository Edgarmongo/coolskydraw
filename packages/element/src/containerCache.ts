import type { CoolskydrawTextContainer } from "./types";

export const originalContainerCache: {
  [id: CoolskydrawTextContainer["id"]]:
    | {
        height: CoolskydrawTextContainer["height"];
      }
    | undefined;
} = {};

export const updateOriginalContainerCache = (
  id: CoolskydrawTextContainer["id"],
  height: CoolskydrawTextContainer["height"],
) => {
  const data =
    originalContainerCache[id] || (originalContainerCache[id] = { height });
  data.height = height;
  return data;
};

export const resetOriginalContainerCache = (
  id: CoolskydrawTextContainer["id"],
) => {
  if (originalContainerCache[id]) {
    delete originalContainerCache[id];
  }
};

export const getOriginalContainerHeightFromCache = (
  id: CoolskydrawTextContainer["id"],
) => {
  return originalContainerCache[id]?.height ?? null;
};
