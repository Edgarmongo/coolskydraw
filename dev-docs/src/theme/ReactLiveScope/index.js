import React from "react";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import initialData from "@site/src/initialData";
import { useColorMode } from "@docusaurus/theme-common";

import "@coolskydraw/coolskydraw/index.css";

let CoolskydrawComp = {};
if (ExecutionEnvironment.canUseDOM) {
  CoolskydrawComp = require("@coolskydraw/coolskydraw");
}
const Coolskydraw = React.forwardRef((props, ref) => {
  if (!window.COOLSKYDRAW_ASSET_PATH) {
    window.COOLSKYDRAW_ASSET_PATH =
      "https://esm.sh/@coolskydraw/coolskydraw@0.18.0/dist/prod/";
  }

  const { colorMode } = useColorMode();
  return <CoolskydrawComp.Coolskydraw theme={colorMode} {...props} ref={ref} />;
});
// Add react-live imports you need here
const CoolskydrawScope = {
  React,
  ...React,
  Coolskydraw,
  Footer: CoolskydrawComp.Footer,
  useDevice: CoolskydrawComp.useDevice,
  MainMenu: CoolskydrawComp.MainMenu,
  WelcomeScreen: CoolskydrawComp.WelcomeScreen,
  LiveCollaborationTrigger: CoolskydrawComp.LiveCollaborationTrigger,
  Sidebar: CoolskydrawComp.Sidebar,
  exportToCanvas: CoolskydrawComp.exportToCanvas,
  initialData,
  useI18n: CoolskydrawComp.useI18n,
  convertToCoolskydrawElements: CoolskydrawComp.convertToCoolskydrawElements,
  CaptureUpdateAction: CoolskydrawComp.CaptureUpdateAction,
};

export default CoolskydrawScope;
