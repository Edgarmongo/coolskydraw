import { validateLibraryUrl } from "./library";

describe("validateLibraryUrl", () => {
  it("should validate hostname & pathname", () => {
    // valid hostnames
    // -------------------------------------------------------------------------
    expect(
      validateLibraryUrl("https://www.coolskyai.com", ["coolskyai.com"]),
    ).toBe(true);
    expect(
      validateLibraryUrl("https://coolskyai.com", ["coolskyai.com"]),
    ).toBe(true);
    expect(
      validateLibraryUrl("https://library.coolskyai.com", ["coolskyai.com"]),
    ).toBe(true);
    expect(
      validateLibraryUrl("https://library.coolskyai.com", [
        "library.coolskyai.com",
      ]),
    ).toBe(true);
    expect(
      validateLibraryUrl("https://coolskyai.com/", ["coolskyai.com/"]),
    ).toBe(true);
    expect(
      validateLibraryUrl("https://coolskyai.com", ["coolskyai.com/"]),
    ).toBe(true);
    expect(
      validateLibraryUrl("https://coolskyai.com/", ["coolskyai.com"]),
    ).toBe(true);

    // valid pathnames
    // -------------------------------------------------------------------------
    expect(
      validateLibraryUrl("https://coolskyai.com/path", ["coolskyai.com"]),
    ).toBe(true);
    expect(
      validateLibraryUrl("https://coolskyai.com/path/", ["coolskyai.com"]),
    ).toBe(true);
    expect(
      validateLibraryUrl("https://coolskyai.com/specific/path", [
        "coolskyai.com/specific/path",
      ]),
    ).toBe(true);
    expect(
      validateLibraryUrl("https://coolskyai.com/specific/path/", [
        "coolskyai.com/specific/path",
      ]),
    ).toBe(true);
    expect(
      validateLibraryUrl("https://coolskyai.com/specific/path", [
        "coolskyai.com/specific/path/",
      ]),
    ).toBe(true);
    expect(
      validateLibraryUrl("https://coolskyai.com/specific/path/other", [
        "coolskyai.com/specific/path",
      ]),
    ).toBe(true);

    // invalid hostnames
    // -------------------------------------------------------------------------
    expect(() =>
      validateLibraryUrl("https://xcoolskyai.com", ["coolskyai.com"]),
    ).toThrow();
    expect(() =>
      validateLibraryUrl("https://x-coolskyai.com", ["coolskyai.com"]),
    ).toThrow();
    expect(() =>
      validateLibraryUrl("https://coolskyai.comx", ["coolskyai.com"]),
    ).toThrow();
    expect(() =>
      validateLibraryUrl("https://coolskyai.comx", ["coolskyai.com"]),
    ).toThrow();
    expect(() =>
      validateLibraryUrl("https://coolskyai.com.mx", ["coolskyai.com"]),
    ).toThrow();
    // protocol must be https
    expect(() =>
      validateLibraryUrl("http://coolskyai.com.mx", ["coolskyai.com"]),
    ).toThrow();

    // invalid pathnames
    // -------------------------------------------------------------------------
    expect(() =>
      validateLibraryUrl("https://coolskyai.com/specific/other/path", [
        "coolskyai.com/specific/path",
      ]),
    ).toThrow();
    expect(() =>
      validateLibraryUrl("https://coolskyai.com/specific/paths", [
        "coolskyai.com/specific/path",
      ]),
    ).toThrow();
    expect(() =>
      validateLibraryUrl("https://coolskyai.com/specific/path-s", [
        "coolskyai.com/specific/path",
      ]),
    ).toThrow();
    expect(() =>
      validateLibraryUrl("https://coolskyai.com/some/specific/path", [
        "coolskyai.com/specific/path",
      ]),
    ).toThrow();
  });
});
