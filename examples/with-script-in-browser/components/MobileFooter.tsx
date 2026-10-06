import React from "react";

import type * as TCoolskydraw from "@coolskydraw/coolskydraw";
import type { CoolskydrawImperativeAPI } from "@coolskydraw/coolskydraw/types";

import CustomFooter from "./CustomFooter";

const MobileFooter = ({
  coolskydrawAPI,
  coolskydrawLib,
}: {
  coolskydrawAPI: CoolskydrawImperativeAPI;
  coolskydrawLib: typeof TCoolskydraw;
}) => {
  const { useEditorInterface, Footer } = coolskydrawLib;

  const editorInterface = useEditorInterface();
  if (editorInterface.formFactor === "phone") {
    return (
      <Footer>
        <CustomFooter
          coolskydrawAPI={coolskydrawAPI}
          coolskydrawLib={coolskydrawLib}
        />
      </Footer>
    );
  }
  return null;
};
export default MobileFooter;
