import * as f from "../loadLocalAssets";
import * as fetchConfig from "../handleConfigVars";

describe("getFileNameGroup", () => {
  test("should return an array of strings", async () => {
    // mock fileExists to return true
    f.fileExists = jest.fn().mockResolvedValue(true);
    // some test data
    const fileNameArrayArray = [
      ["image-case1.png", "image-case1.gif", "image-case1.jpg", "image-case1.jpeg"],
      ["image-case1-a.png", "image-case1-a.gif", "image-case1-a.jpg", "image-case1-a.jpeg"],
      ["image-case1-b.png", "image-case1-b.gif", "image-case1-b.jpg", "image-case1-b.jpeg"],
    ];

    const result = await f.getFileNameGroup(fileNameArrayArray, "image");

    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBe(3);
    expect(result.every((item) => typeof item === "string")).toBe(true);
  });
});

describe("validateCase", () => {
  test("should return an array of strings", async () => {
    // mock fileExists to return true
    f.fileExists = jest.fn().mockResolvedValue(true);

    const result = await f.validateCase("image-case1");

    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBe(4);
    expect(result.every((item) => typeof item === "string")).toBe(true);
  });
});

describe("fetchCases", () => {
  test("should return an array of strings", async () => {
    // mock fileExists to return true
    f.fileExists = jest.fn().mockResolvedValue(true);

    // mock fetchConfigVariable to return some test data
    fetchConfig.fetchConfigVariable = jest.fn().mockReturnValue({
      caseOrder: {
        cases: ["image-case1", "image-case2", "image-case3"],
        shuffle: "",
      },
    });

    const result = await f.fetchCases();

    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBe(3);
    expect(result.every((item) => typeof item === "string")).toBe(true);
  });

  test("should preserve the order of input array when shuffle is not set", async () => {
    // mock fileExists to return true
    f.fileExists = jest.fn().mockResolvedValue(true);

    // mock fetchConfigVariable to return some test data
    fetchConfig.fetchConfigVariable = jest.fn().mockReturnValue({
      caseOrder: {
        cases: ["audio-case1", "video-case2", "image-case3"],
      },
    });

    const result = await f.fetchCases();

    expect(result).toEqual(["audio-case1", "video-case2", "image-case3"]);
  });

  test("should return the array in categorized order when shuffle is categorized", async () => {
    // mock fileExists to return true
    f.fileExists = jest.fn().mockResolvedValue(true);

    // mock fetchConfigVariable to return some test data
    fetchConfig.fetchConfigVariable = jest.fn().mockReturnValue({
      caseOrder: {
        cases: ["image-case1", "audio-case2", "video-case3", "hybrid-case4"],
        shuffle: "categorized",
      },
    });

    const result = await f.fetchCases();

    expect(result).toEqual(["image-case1", "hybrid-case4", "video-case3", "audio-case2"]);
  });

  test("should skip the case if its name does not start with a supported case type", async () => {
    // mock fileExists to return true
    f.fileExists = jest.fn().mockResolvedValue(true);

    // mock fetchConfigVariable to return some test data
    fetchConfig.fetchConfigVariable = jest.fn().mockReturnValue({
      caseOrder: {
        cases: ["audio-case1", "case2", "-case3", "vid-case4"],
      },
    });

    const result = await f.fetchCases();

    expect(result).toEqual(["audio-case1"]);
  });
});
