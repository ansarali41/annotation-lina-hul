import getConfig from "../handleStorageConfig";
import * as fetchConfig from "../handleConfigVars";

describe("handleStorageConfig", () => {
  test("should return an object with the properties 'assetsStorageType' and 'responsesStorageType' as strings", () => {
    const result = getConfig();

    expect(typeof result).toBe("object");
    expect(result).toHaveProperty("assetsStorageType");
    expect(result).toHaveProperty("responsesStorageType");
    expect(typeof result.assetsStorageType).toBe("string");
    expect(typeof result.responsesStorageType).toBe("string");
  });

  test("should return an object with the properties 'assetsStorageType' and 'responsesStorageType', and the values should be 'local' and 'download' respectively when the config is not defined", () => {
    fetchConfig.fetchConfigVariable = jest.fn().mockReturnValue(undefined);

    const result = getConfig();

    expect(typeof result).toBe("object");
    expect(result).toHaveProperty("assetsStorageType");
    expect(result).toHaveProperty("responsesStorageType");
    expect(result.assetsStorageType).toBe("local");
    expect(result.responsesStorageType).toBe("download");
  });

  test("should return an object with the properties 'assetsStorageType' and 'responsesStorageType', and the values should be 'local' and 'download' respectively when the config is defined but the storage property is not defined", () => {
    fetchConfig.fetchConfigVariable = jest.fn().mockReturnValue({});

    const result = getConfig();

    expect(typeof result).toBe("object");
    expect(result).toHaveProperty("assetsStorageType");
    expect(result).toHaveProperty("responsesStorageType");
    expect(result.assetsStorageType).toBe("local");
    expect(result.responsesStorageType).toBe("download");
  });

  test("should return an object with the properties 'assetsStorageType' and 'responsesStorageType', and the values should be 'local' and 'download' respectively when the storage property is defined but the two child properties are not defined", () => {
    fetchConfig.fetchConfigVariable = jest.fn().mockReturnValue({ storage: {} });

    const result = getConfig();

    expect(typeof result).toBe("object");
    expect(result).toHaveProperty("assetsStorageType");
    expect(result).toHaveProperty("responsesStorageType");
    expect(result.assetsStorageType).toBe("local");
    expect(result.responsesStorageType).toBe("download");
  });

  test("should return an object with the properties 'assetsStorageType' and 'responsesStorageType', and the values should be 'firebase' and 'download' respectively when storage.assetsStorageType is 'firebase' and storage.responsesStorageType is not defined", () => {
    fetchConfig.fetchConfigVariable = jest.fn().mockReturnValue({
      storage: { assetsStorageType: "firebase" },
    });

    const result = getConfig();

    expect(typeof result).toBe("object");
    expect(result).toHaveProperty("assetsStorageType");
    expect(result).toHaveProperty("responsesStorageType");
    expect(result.assetsStorageType).toBe("firebase");
    expect(result.responsesStorageType).toBe("download");
  });

  test("should return an object with the properties 'assetsStorageType' and 'responsesStorageType', and the values should be 'local' and 'download' respectively when the config is defined but the child properties are not string 'firebase'", () => {
    fetchConfig.fetchConfigVariable = jest.fn().mockReturnValue({
      storage: { assetsStorageType: "invalid string", responsesStorageType: ["not a string"] },
    });

    const result = getConfig();

    expect(typeof result).toBe("object");
    expect(result).toHaveProperty("assetsStorageType");
    expect(result).toHaveProperty("responsesStorageType");
    expect(result.assetsStorageType).toBe("local");
    expect(result.responsesStorageType).toBe("download");
  });

  test("should return an object with the properties 'assetsStorageType' and 'responsesStorageType', and the values should be 'local' and 'firebase' respectively when storage.assetsStorageType is not string 'firebase' and storage.responsesStorageType is 'firebase'", () => {
    fetchConfig.fetchConfigVariable = jest.fn().mockReturnValue({
      storage: { assetsStorageType: 1, responsesStorageType: "firebase" },
    });

    const result = getConfig();

    expect(typeof result).toBe("object");
    expect(result).toHaveProperty("assetsStorageType");
    expect(result).toHaveProperty("responsesStorageType");
    expect(result.assetsStorageType).toBe("local");
    expect(result.responsesStorageType).toBe("firebase");
  });

  test("should return an object with the properties 'assetsStorageType' and 'responsesStorageType', and the values should both be 'firebase' and 'firebase' when both properties are 'firebase'", () => {
    fetchConfig.fetchConfigVariable = jest.fn().mockReturnValue({
      storage: { assetsStorageType: "firebase", responsesStorageType: "firebase" },
    });

    const result = getConfig();

    expect(typeof result).toBe("object");
    expect(result).toHaveProperty("assetsStorageType");
    expect(result).toHaveProperty("responsesStorageType");
    expect(result.assetsStorageType).toBe("firebase");
    expect(result.responsesStorageType).toBe("firebase");
  });
});
