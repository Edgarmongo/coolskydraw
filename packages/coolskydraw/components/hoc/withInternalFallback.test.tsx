import React from "react";

import { Coolskydraw, MainMenu } from "../../index";
import { render, queryAllByTestId } from "../../tests/test-utils";

describe("Test internal component fallback rendering", () => {
  it("should render only one menu per coolskydraw instance (custom menu first scenario)", async () => {
    const { container } = await render(
      <div>
        <Coolskydraw>
          <MainMenu>test</MainMenu>
        </Coolskydraw>
        <Coolskydraw />
      </div>,
    );

    expect(queryAllByTestId(container, "main-menu-trigger")?.length).toBe(2);

    const excalContainers = container.querySelectorAll<HTMLDivElement>(
      ".coolskydraw-container",
    );

    expect(
      queryAllByTestId(excalContainers[0], "main-menu-trigger")?.length,
    ).toBe(1);
    expect(
      queryAllByTestId(excalContainers[1], "main-menu-trigger")?.length,
    ).toBe(1);
  });

  it("should render only one menu per coolskydraw instance (default menu first scenario)", async () => {
    const { container } = await render(
      <div>
        <Coolskydraw />
        <Coolskydraw>
          <MainMenu>test</MainMenu>
        </Coolskydraw>
      </div>,
    );

    expect(queryAllByTestId(container, "main-menu-trigger")?.length).toBe(2);

    const excalContainers = container.querySelectorAll<HTMLDivElement>(
      ".coolskydraw-container",
    );

    expect(
      queryAllByTestId(excalContainers[0], "main-menu-trigger")?.length,
    ).toBe(1);
    expect(
      queryAllByTestId(excalContainers[1], "main-menu-trigger")?.length,
    ).toBe(1);
  });

  it("should render only one menu per coolskydraw instance (two custom menus scenario)", async () => {
    const { container } = await render(
      <div>
        <Coolskydraw>
          <MainMenu>test</MainMenu>
        </Coolskydraw>
        <Coolskydraw>
          <MainMenu>test</MainMenu>
        </Coolskydraw>
      </div>,
    );

    expect(queryAllByTestId(container, "main-menu-trigger")?.length).toBe(2);

    const excalContainers = container.querySelectorAll<HTMLDivElement>(
      ".coolskydraw-container",
    );

    expect(
      queryAllByTestId(excalContainers[0], "main-menu-trigger")?.length,
    ).toBe(1);
    expect(
      queryAllByTestId(excalContainers[1], "main-menu-trigger")?.length,
    ).toBe(1);
  });

  it("should render only one menu per coolskydraw instance (two default menus scenario)", async () => {
    const { container } = await render(
      <div>
        <Coolskydraw />
        <Coolskydraw />
      </div>,
    );

    expect(queryAllByTestId(container, "main-menu-trigger")?.length).toBe(2);

    const excalContainers = container.querySelectorAll<HTMLDivElement>(
      ".coolskydraw-container",
    );

    expect(
      queryAllByTestId(excalContainers[0], "main-menu-trigger")?.length,
    ).toBe(1);
    expect(
      queryAllByTestId(excalContainers[1], "main-menu-trigger")?.length,
    ).toBe(1);
  });
});
