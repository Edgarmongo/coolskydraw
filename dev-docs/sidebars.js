/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    {
      type: "category",
      label: "Introduction",
      link: {
        type: "doc",
        id: "introduction/get-started",
      },
      items: ["introduction/development", "introduction/contributing"],
    },
    {
      type: "category",
      label: "Codebase",
      items: ["codebase/json-schema", "codebase/frames"],
    },
    {
      type: "category",
      label: "@coolskydraw/coolskydraw",
      collapsed: false,
      items: [
        "@coolskydraw/coolskydraw/installation",
        "@coolskydraw/coolskydraw/integration",
        "@coolskydraw/coolskydraw/customizing-styles",
        {
          type: "category",
          label: "API",
          link: {
            type: "doc",
            id: "@coolskydraw/coolskydraw/api/api-intro",
          },
          items: [
            {
              type: "category",
              label: "Props",
              link: {
                type: "doc",
                id: "@coolskydraw/coolskydraw/api/props/props",
              },
              items: [
                "@coolskydraw/coolskydraw/api/props/initialdata",
                "@coolskydraw/coolskydraw/api/props/coolskydraw-api",
                "@coolskydraw/coolskydraw/api/props/render-props",
                "@coolskydraw/coolskydraw/api/props/ui-options",
              ],
            },
            {
              type: "category",
              label: "Children Components",
              link: {
                type: "doc",
                id: "@coolskydraw/coolskydraw/api/children-components/children-components-intro",
              },
              items: [
                "@coolskydraw/coolskydraw/api/children-components/main-menu",
                "@coolskydraw/coolskydraw/api/children-components/welcome-screen",
                "@coolskydraw/coolskydraw/api/children-components/sidebar",
                "@coolskydraw/coolskydraw/api/children-components/footer",
                "@coolskydraw/coolskydraw/api/children-components/live-collaboration-trigger",
              ],
            },
            {
              type: "category",
              label: "Utils",
              link: {
                type: "doc",
                id: "@coolskydraw/coolskydraw/api/utils/utils-intro",
              },
              items: [
                "@coolskydraw/coolskydraw/api/utils/export",
                "@coolskydraw/coolskydraw/api/utils/restore",
              ],
            },
            "@coolskydraw/coolskydraw/api/constants",
            "@coolskydraw/coolskydraw/api/coolskydraw-element-skeleton",
          ],
        },
        "@coolskydraw/coolskydraw/faq",
        "@coolskydraw/coolskydraw/development",
      ],
    },
    {
      type: "category",
      label: "@excalidraw/mermaid-to-excalidraw",
      link: {
        type: "doc",
        id: "@excalidraw/mermaid-to-excalidraw/installation",
      },
      items: [
        "@excalidraw/mermaid-to-excalidraw/api",
        "@excalidraw/mermaid-to-excalidraw/development",
        {
          type: "category",
          label: "Codebase",
          link: {
            type: "doc",
            id: "@excalidraw/mermaid-to-excalidraw/codebase/codebase",
          },
          items: [
            {
              type: "category",
              label: "How Parser works under the hood?",
              link: {
                type: "doc",
                id: "@excalidraw/mermaid-to-excalidraw/codebase/parser/parser",
              },
              items: [
                "@excalidraw/mermaid-to-excalidraw/codebase/parser/flowchart",
              ],
            },
            "@excalidraw/mermaid-to-excalidraw/codebase/new-diagram-type",
          ],
        },
      ],
    },
  ],
};

module.exports = sidebars;
