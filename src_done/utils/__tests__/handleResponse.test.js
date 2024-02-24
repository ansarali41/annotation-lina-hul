import { fetchResponse } from "../handleResponse";
import * as f from "../handleStorageConfig";
import * as firebase from "../firebase";

describe("fetchResponse, assetsStorageType is local and responsesStorageType is download", () => {
  test("should return null if ParticipantInfo is not found in localStorage", async () => {
    // mock test data
    f.getConfig = jest.fn().mockReturnValue({
      assetsStorageType: "local",
      responsesStorageType: "download",
    });
    jest.spyOn(Storage.prototype, "getItem").mockReturnValue(null);

    const result = await fetchResponse("testId");
    expect(result).toBeNull();
  });

  test("should return null if ParticipantInfo is found in localStorage but ParticipantId is not the same", async () => {
    // mock test data
    f.getConfig = jest.fn().mockReturnValue({
      assetsStorageType: "local",
      responsesStorageType: "download",
    });
    jest.spyOn(Storage.prototype, "getItem").mockReturnValue(
      JSON.stringify({
        ParticipantId: "testId2",
      })
    );

    const result = await fetchResponse("testId");
    expect(result).toBeNull();
  });

  test("should return the response object if all the needed items are found in localStorage, containing CaseOrder, ParticipantInfo, SessionInfo and ValidCaseFiles", async () => {
    // mock test data
    f.getConfig = jest.fn().mockReturnValue({
      assetsStorageType: "local",
      responsesStorageType: "download",
    });
    // mock these items in localStorage one by one
    const mockResponse = [
      {
        ParticipantId: "testId",
      },
      {
        ParticipantId: "testId",
      },
      {
        ParticipantId: "testId",
      },
      [],
      {},
      [],
    ];
    mockResponse.map((item) => {
      jest.spyOn(Storage.prototype, "getItem").mockReturnValueOnce(JSON.stringify(item));
    });

    const result = await fetchResponse("testId");
    const expected = {
      CaseOrder: [],
      ParticipantInfo: { ParticipantId: "testId" },
      SessionInfo: {},
      ValidCaseFiles: [],
    };
    expect(result).toEqual(expected);
  });

  test("should return null if one of the needed items is missing in localStorage", async () => {
    // mock test data
    f.getConfig = jest.fn().mockReturnValue({
      assetsStorageType: "local",
      responsesStorageType: "download",
    });
    // mock these items in localStorage one by one
    const mockResponse = [
      {
        ParticipantId: "testId",
      },
      {
        ParticipantId: "testId",
      },
      {
        ParticipantId: "testId",
      },
      [],
      {},
    ];
    mockResponse.map((item) => {
      jest.spyOn(Storage.prototype, "getItem").mockReturnValueOnce(JSON.stringify(item));
    });

    const result = await fetchResponse("testId");
    expect(result).toBeNull();
  });
});

describe("fetchResponse, assetsStorageType is local and responsesStorageType is firebase", () => {
  test("should return null if ParticipantId.json is not found in firebase", async () => {
    f.getConfig = jest.fn().mockReturnValue({
      assetsStorageType: "local",
      responsesStorageType: "firebase",
    });
    firebase.getStorageReference = jest.fn().mockReturnValue({
      child: jest.fn().mockReturnValue({
        getDownloadURL: jest.fn().mockReturnValue(Promise.resolve({})),
      }),
    });
    global.fetch = () =>
      Promise.resolve({
        json: () => Promise.resolve([]),
      });

    const result = await fetchResponse("testId");
    expect(result).toBeNull();
  });

  test("should return the response object if all the needed items are found in firebase, containing CaseOrder, ParticipantInfo, SessionInfo and ValidCaseFiles", async () => {
    f.getConfig = jest.fn().mockReturnValue({
      assetsStorageType: "local",
      responsesStorageType: "firebase",
    });
    firebase.getStorageReference = jest.fn().mockReturnValue({
      child: jest.fn().mockReturnValue({
        getDownloadURL: jest.fn().mockReturnValue(Promise.resolve({})),
      }),
    });
    const mockResponse = {
      CaseOrder: [],
      ParticipantInfo: { ParticipantId: "testId" },
      SessionInfo: {},
      ValidCaseFiles: [],
    };
    global.fetch = () =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      });

    const result = await fetchResponse("testId");
    expect(result).toEqual(mockResponse);
  });

  test("should return null if ValidCaseFiles is missing in firebase", async () => {
    f.getConfig = jest.fn().mockReturnValue({
      assetsStorageType: "local",
      responsesStorageType: "firebase",
    });
    firebase.getStorageReference = jest.fn().mockReturnValue({
      child: jest.fn().mockReturnValue({
        getDownloadURL: jest.fn().mockReturnValue(Promise.resolve({})),
      }),
    });
    const mockResponse = {
      CaseOrder: [],
      ParticipantInfo: { ParticipantId: "testId" },
      SessionInfo: {},
    };
    global.fetch = () =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      });

    const result = await fetchResponse("testId");
    expect(result).toBeNull();
  });
});

describe("fetchResponse, assetsStorageType is firebase and responsesStorageType is download", () => {
  test("should return null if ParticipantInfo is not found in localStorage", async () => {
    // mock test data
    f.getConfig = jest.fn().mockReturnValue({
      assetsStorageType: "firebase",
      responsesStorageType: "download",
    });
    jest.spyOn(Storage.prototype, "getItem").mockReturnValue(null);

    const result = await fetchResponse("testId");
    expect(result).toBeNull();
  });

  test("should return null if ParticipantInfo is found in localStorage but ParticipantId is not the same", async () => {
    // mock test data
    f.getConfig = jest.fn().mockReturnValue({
      assetsStorageType: "firebase",
      responsesStorageType: "download",
    });
    jest.spyOn(Storage.prototype, "getItem").mockReturnValue(
      JSON.stringify({
        ParticipantId: "testId2",
      })
    );

    const result = await fetchResponse("testId");
    expect(result).toBeNull();
  });

  test("should return the response object if all the needed items are found in localStorage, containing CaseOrder, ParticipantInfo and SessionInfo", async () => {
    // mock test data
    f.getConfig = jest.fn().mockReturnValue({
      assetsStorageType: "firebase",
      responsesStorageType: "download",
    });
    // mock these items in localStorage one by one
    const mockResponse = [
      {
        ParticipantId: "testId",
      },
      {
        ParticipantId: "testId",
      },
      {
        ParticipantId: "testId",
      },
      [],
      {},
    ];
    mockResponse.map((item) => {
      jest.spyOn(Storage.prototype, "getItem").mockReturnValueOnce(JSON.stringify(item));
    });

    const result = await fetchResponse("testId");
    const expected = {
      CaseOrder: [],
      ParticipantInfo: { ParticipantId: "testId" },
      SessionInfo: {},
    };
    expect(result).toEqual(expected);
  });

  test("should return null if one of the needed items is missing in localStorage", async () => {
    // mock test data
    f.getConfig = jest.fn().mockReturnValue({
      assetsStorageType: "firebase",
      responsesStorageType: "download",
    });
    // mock these items in localStorage one by one
    const mockResponse = [
      {
        ParticipantId: "testId",
      },
      {
        ParticipantId: "testId",
      },
      {
        ParticipantId: "testId",
      },
      [],
    ];
    mockResponse.map((item) => {
      jest.spyOn(Storage.prototype, "getItem").mockReturnValueOnce(JSON.stringify(item));
    });

    const result = await fetchResponse("testId");
    expect(result).toBeNull();
  });
});

describe("fetchResponse, assetsStorageType is firebase and responsesStorageType is firebase", () => {
  test("should return null if ParticipantId.json is not found in firebase", async () => {
    f.getConfig = jest.fn().mockReturnValue({
      assetsStorageType: "firebase",
      responsesStorageType: "firebase",
    });
    firebase.getStorageReference = jest.fn().mockReturnValue({
      child: jest.fn().mockReturnValue({
        getDownloadURL: jest.fn().mockReturnValue(Promise.resolve({})),
      }),
    });
    global.fetch = () =>
      Promise.resolve({
        json: () => Promise.resolve([]),
      });

    const result = await fetchResponse("testId");
    expect(result).toBeNull();
  });

  test("should return the response object if all the needed items are found in firebase, containing CaseOrder, ParticipantInfo and SessionInfo", async () => {
    f.getConfig = jest.fn().mockReturnValue({
      assetsStorageType: "firebase",
      responsesStorageType: "firebase",
    });
    firebase.getStorageReference = jest.fn().mockReturnValue({
      child: jest.fn().mockReturnValue({
        getDownloadURL: jest.fn().mockReturnValue(Promise.resolve({})),
      }),
    });
    const mockResponse = {
      CaseOrder: [],
      ParticipantInfo: { ParticipantId: "testId" },
      SessionInfo: {},
    };
    global.fetch = () =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      });

    const result = await fetchResponse("testId");
    expect(result).toEqual(mockResponse);
  });

  test("should return null if one of the needed items is missing in firebase", async () => {
    f.getConfig = jest.fn().mockReturnValue({
      assetsStorageType: "firebase",
      responsesStorageType: "firebase",
    });
    firebase.getStorageReference = jest.fn().mockReturnValue({
      child: jest.fn().mockReturnValue({
        getDownloadURL: jest.fn().mockReturnValue(Promise.resolve({})),
      }),
    });
    const mockResponse = {
      CaseOrder: [],
      ParticipantInfo: { ParticipantId: "testId" },
    };
    global.fetch = () =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      });

    const result = await fetchResponse("testId");
    expect(result).toBeNull();
  });
});
