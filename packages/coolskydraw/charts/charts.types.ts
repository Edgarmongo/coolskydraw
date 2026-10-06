import type { NonDeletedCoolskydrawElement } from "@coolskydraw/element/types";

export type ChartElements = readonly NonDeletedCoolskydrawElement[];

export interface Spreadsheet {
  title: string | null;
  labels: string[] | null;
  series: SpreadsheetSeries[];
}

export interface SpreadsheetSeries {
  title: string | null;
  values: number[];
}

export type ParseSpreadsheetResult =
  | { ok: false; reason: string }
  | { ok: true; data: Spreadsheet };
