import * as f from "../handleConfigVars";

// mock configuration from config.json
jest.mock("../../config.json", () => ({
  REACT_APP_FIREBASE_ROOT_DIRECTORY: "/dev",
  REACT_APP_test: "some-random-string",
  REACT_APP_background: [
    {
      sectionTitle: "Background",
      sectionText: "some text",
      sectionClassName: "background-section",
      sectionTitleClassName: "background-section-title",
      sectionTextClassName: "background-text-content",
      sectionContent: [],
    },
    {
      sectionTitle: "Sample Section Title",
      sectionText: "some text",
      sectionClassName: "background-section",
      sectionTitleClassName: "background-section-title",
      sectionTextClassName: "background-text-content",
      sectionContent: [
        {
          title: "Sample Subsection Title",
          text: "some text",
          className: "background-single-block",
          imagePath: "/gallery/image-sample.png",
          imageClassName: "explanation-background-image",
          imageAlternativeText: "sample-image",
          descriptionClassName: "background-single-block-description-content",
          titleClassName: "background-single-block-description-label",
          textClassName: "background-text-content",
        },
      ],
    },
  ],
  REACT_APP_general: {
    appName: "Huldra",
    allowRevisitingAnswers: true,
    allowProceedingWithoutAnswering: false,
    caseOrder: {
      cases: ["image-test", "image-flower"],
      shuffle: "",
    },
  },
}));

describe("fetchConfigVariable", () => {
  test("should return a string when reading REACT_APP_FIREBASE_ROOT_DIRECTORY", () => {
    const result = f.fetchConfigVariable("REACT_APP_FIREBASE_ROOT_DIRECTORY");

    expect(typeof result).toBe("string");
  });

  test("should return an array when reading REACT_APP_background, and the elements of the array are objects", () => {
    const result = f.fetchConfigVariable("REACT_APP_background");

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((item) => typeof item === "object")).toBe(true);
  });

  test("should return an object when reading REACT_APP_general, and the object should contain a property 'appName' which is 'Huldra'", () => {
    const result = f.fetchConfigVariable("REACT_APP_general");

    expect(typeof result).toBe("object");
    expect(result.appName).toBe("Huldra");
  });
});

describe("fetchConfigVariablesBatch", () => {
  test("should return an object with the same keys as the input array", () => {
    const result = f.fetchConfigVariablesBatch([
      "REACT_APP_FIREBASE_ROOT_DIRECTORY",
      "REACT_APP_background",
      "REACT_APP_general",
    ]);

    expect(typeof result).toBe("object");
    expect(result).toHaveProperty("REACT_APP_FIREBASE_ROOT_DIRECTORY");
    expect(result).toHaveProperty("REACT_APP_background");
    expect(result).toHaveProperty("REACT_APP_general");
  });
});

describe("mocking process.env", () => {
  // first make a copy of the original process.env object, and then reset it after each test case
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterEach(() => {
    process.env = OLD_ENV;
  });

  test("should return the value of the environment variable when it exists and it not a JSON string", () => {
    // mock the environment variable
    process.env.REACT_APP_FIREBASE_ROOT_DIRECTORY = "root";

    const result = f.fetchConfigVariable("REACT_APP_FIREBASE_ROOT_DIRECTORY");

    expect(result).toBe("root");
  });

  test("should return the value from config.json when the environment variable does not exist", () => {
    const result = f.fetchConfigVariable("REACT_APP_test");

    expect(result).toBe("some-random-string");
  });

  test("should return the value of the environment variable as an object when it exists and is a valid JSON string", () => {
    // mock the environment variable
    process.env.REACT_APP_general = JSON.stringify({
      appName: "Huldra2",
    });

    const result = f.fetchConfigVariable("REACT_APP_general");

    expect(typeof result).toBe("object");
    expect(result.appName).toBe("Huldra2");
  });

  test("should return the value of the environment variable as an object when it exists and is a valid JSON string, and completely overwrite the corresponding value in config.json", () => {
    // mock the environment variable
    process.env.REACT_APP_general = JSON.stringify({
      appName: "Huldra2",
      header: {
        labelBackground: "Background2",
      },
    });

    const result = f.fetchConfigVariable("REACT_APP_general");

    expect(typeof result).toBe("object");
    expect(result.appName).toBe("Huldra2");
    expect(result.header.labelBackground).toBe("Background2");
    expect(result.allowRevisitingAnswers).toBe(undefined);
    expect(result.allowProceedingWithoutAnswering).toBe(undefined);
    expect(result.caseOrder).toBe(undefined);
  });
});
