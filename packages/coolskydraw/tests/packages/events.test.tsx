import React from "react";
import { vi } from "vitest";

import { resolvablePromise } from "@coolskydraw/common";

import { Coolskydraw, CaptureUpdateAction } from "../../index";
import { API } from "../helpers/api";
import { Pointer } from "../helpers/ui";
import { render, unmountComponent } from "../test-utils";

import type { CoolskydrawImperativeAPI } from "../../types";

describe("event callbacks", () => {
  const h = window.h;

  let coolskydrawAPI: CoolskydrawImperativeAPI;

  const mouse = new Pointer("mouse");

  beforeEach(async () => {
    const coolskydrawAPIPromise = resolvablePromise<CoolskydrawImperativeAPI>();
    await render(
      <Coolskydraw
        onCoolskydrawAPI={(api) => coolskydrawAPIPromise.resolve(api as any)}
      />,
    );
    coolskydrawAPI = await coolskydrawAPIPromise;
  });

  it("should resolve editor:mount/editor:initialize when subscribed before mount", async () => {
    unmountComponent();

    const lifecyclePromise = resolvablePromise<{
      api: CoolskydrawImperativeAPI;
      mount: Promise<{
        coolskydrawAPI: CoolskydrawImperativeAPI;
        container: HTMLDivElement | null;
      }>;
      initialize: Promise<CoolskydrawImperativeAPI>;
    }>();

    await render(
      <Coolskydraw
        onCoolskydrawAPI={(api) => {
          if (api) {
            lifecyclePromise.resolve({
              api,
              mount: api.onEvent("editor:mount"),
              initialize: api.onEvent("editor:initialize"),
            });
          }
        }}
      />,
    );

    const { api, mount, initialize } = await lifecyclePromise;
    await expect(mount).resolves.toEqual({
      coolskydrawAPI: api,
      container: expect.any(HTMLDivElement),
    });
    await expect(initialize).resolves.toBe(api);
  });

  it("should replay editor:mount/editor:initialize to late subscribers", async () => {
    const onMount = vi.fn();
    const onInitialize = vi.fn();

    coolskydrawAPI.onEvent("editor:mount", onMount);
    coolskydrawAPI.onEvent("editor:initialize", onInitialize);

    await Promise.resolve();

    expect(onMount).toHaveBeenCalledTimes(1);
    expect(onMount).toHaveBeenCalledWith({
      coolskydrawAPI,
      container: expect.any(HTMLDivElement),
    });
    expect(onInitialize).toHaveBeenCalledTimes(1);
    expect(onInitialize).toHaveBeenCalledWith(coolskydrawAPI);

    await expect(coolskydrawAPI.onEvent("editor:mount")).resolves.toEqual({
      coolskydrawAPI,
      container: expect.any(HTMLDivElement),
    });
    await expect(coolskydrawAPI.onEvent("editor:initialize")).resolves.toBe(
      coolskydrawAPI,
    );
  });

  it("should call onMount before onInitialize props", async () => {
    unmountComponent();

    const calls: string[] = [];

    await render(
      <Coolskydraw
        onMount={({ coolskydrawAPI, container }) => {
          expect(coolskydrawAPI).toBeDefined();
          expect(container).toBeInstanceOf(HTMLDivElement);
          calls.push("mount");
        }}
        onInitialize={() => {
          calls.push("initialize");
        }}
      />,
    );

    expect(calls).toEqual(["mount", "initialize"]);
  });

  it("should trigger onChange on render", async () => {
    const onChange = vi.fn();

    const origBackgroundColor = h.state.viewBackgroundColor;
    coolskydrawAPI.onChange(onChange);
    API.updateScene({
      appState: { viewBackgroundColor: "red" },
      captureUpdate: CaptureUpdateAction.IMMEDIATELY,
    });
    expect(onChange).toHaveBeenCalledWith(
      // elements
      [],
      // appState
      expect.objectContaining({
        viewBackgroundColor: "red",
      }),
      // files
      {},
    );
    expect(onChange.mock?.lastCall?.[1].viewBackgroundColor).not.toBe(
      origBackgroundColor,
    );
  });

  it("should trigger onPointerDown/onPointerUp on canvas pointerDown/pointerUp", async () => {
    const onPointerDown = vi.fn();
    const onPointerUp = vi.fn();

    coolskydrawAPI.onPointerDown(onPointerDown);
    coolskydrawAPI.onPointerUp(onPointerUp);

    mouse.downAt(100);
    expect(onPointerDown).toHaveBeenCalledTimes(1);
    expect(onPointerUp).not.toHaveBeenCalled();
    mouse.up();
    expect(onPointerDown).toHaveBeenCalledTimes(1);
    expect(onPointerUp).toHaveBeenCalledTimes(1);
  });
});
