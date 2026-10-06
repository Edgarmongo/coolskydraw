import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@coolskydraw/coolskydraw/index.css";

import type * as TCoolskydraw from "@coolskydraw/coolskydraw";

import App from "./components/ExampleApp";

declare global {
  interface Window {
    CoolskydrawLib: typeof TCoolskydraw;
  }
}

const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);
const { Coolskydraw } = window.CoolskydrawLib;
root.render(
  <StrictMode>
    <App
      appTitle={"Coolskydraw Example"}
      useCustom={(api: any, args?: any[]) => {}}
      coolskydrawLib={window.CoolskydrawLib}
    >
      <Coolskydraw />
    </App>
  </StrictMode>,
);
