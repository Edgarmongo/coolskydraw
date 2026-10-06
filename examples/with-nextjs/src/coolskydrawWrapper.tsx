"use client";
import * as coolskydrawLib from "@coolskydraw/coolskydraw";
import { Coolskydraw } from "@coolskydraw/coolskydraw";

import "@coolskydraw/coolskydraw/index.css";

import App from "../../with-script-in-browser/components/ExampleApp";

const CoolskydrawWrapper: React.FC = () => {
  return (
    <>
      <App
        appTitle={"Coolskydraw with Nextjs Example"}
        useCustom={(api: any, args?: any[]) => {}}
        coolskydrawLib={coolskydrawLib}
      >
        <Coolskydraw />
      </App>
    </>
  );
};

export default CoolskydrawWrapper;
