import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CaseImage from "../caseImage";
import { AppContext } from "../../context/appContext";
import userEvent from "@testing-library/user-event";

// This customRender is necessary to correctly render the App dependent on AppContext
const customRender = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <AppContext.Provider value={providerProps}>{ui}</AppContext.Provider>,
    renderOptions
  );
};
let providerProps;
beforeEach(() => {
  // set the providerProps for the customRender
  providerProps = {
    disableNextButton: [],
    setDisableNextButton: jest.fn(),
    firebaseConfig: [],
    rootDirectory: [],
    clientUid: [],
    casesCount: [],
    REACT_APP_general: [],
    setCasesCount: jest.fn(),
    getCasesCount: [],
    currentDemonstrationPageIndex: [],
    setCurrentDemonstrationPageIndex: [],
  };
});

// mock the useLocation hook
jest.mock("react-router-dom", () => ({
  useLocation: jest.fn(),
}));

// mock fetch
const unmockedFetch = global.fetch;

beforeAll(() => {
  global.fetch = () =>
    Promise.resolve({
      json: () => Promise.resolve([]),
    });
});

afterAll(() => {
  global.fetch = unmockedFetch;
});

// mock firebase functions used in caseImage
jest.mock("../../utils/firebase", () => ({
  getFirebaseApp: jest.fn(),
  listFiles: jest.fn(),
  getAssetDownloadUrl: jest.fn(),
  fetchJsonAttributeValue: jest.fn(),
}));

test("clicking the 'View Details' button in the caseImage page (case 1) shows a pop-up", async () => {
  // mock localStorage.getItem
  const CaseOrder = [
    "image-xai",
    "hybrid-soccer",
    "video-countdown",
    "audio-ogg",
    "audio-flac",
    "audio-wma",
    "audio-aiff",
  ];
  Storage.prototype.getItem = jest.fn().mockReturnValue(JSON.stringify(CaseOrder));

  // the value copied from config.json
  const REACT_APP_caseImage = {
    caseImageColumnLeft: { label: "Case" },
    caseImageColumnMiddle: {
      title: "Answer Options",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce neque odio, tempus quis sapien id, accumsan aliquam nunc. Proin tincidunt, felis nec iaculis rutrum, ex quam condimentum ante, id sagittis elit odio sed risus.",
      leftSectionTitle: "Option A",
      leftSectionButtonlabel: "View details",
      leftSectionTextWithIconsLabel: "Viewed",
      rightSectionTitle: "Option B",
      rightSectionButtonlabel: "View details",
      rightSectionTextWithIconsLabel: "Viewed",
      popupA: {
        mainTitle: "Sample Title for Popup A",
        leftImageTitle: "Original",
        rightImageTitle: "Option A",
        descriptionTitle: "Description",
        descriptionText:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce neque odio, tempus quis sapien id, accumsan aliquam nunc. Proin tincidunt, felis nec iaculis rutrum, ex quam condimentum ante, id sagittis elit odio sed risus.",
      },
      popupB: {
        mainTitle: "Sample Title for Popup B",
        leftImageTitle: "Original",
        rightImageTitle: "Option B",
        descriptionTitle: "Description",
        descriptionText:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce neque odio, tempus quis sapien id, accumsan aliquam nunc. Proin tincidunt, felis nec iaculis rutrum, ex quam condimentum ante, id sagittis elit odio sed risus.",
        gallerySubstring: "similar",
      },
    },
    caseImageColumnRight: {
      title: "Your Answer",
      text: "Please click on one of the thumbnails (option A or B) to place it on top. Do not drag and drop the image. The top image is your preferred option for this case.",
    },
  };

  // this is the first case in current setting, hense caseId="1"
  customRender(<CaseImage caseId="1" REACT_APP_caseImage={REACT_APP_caseImage} />, {
    providerProps,
  });

  const [buttonA, buttonB] = screen.getAllByText(/View details/);
  expect(buttonA).toBeInTheDocument();
  expect(buttonB).toBeInTheDocument();
  expect(screen.queryByText("Sample Title for Popup A")).not.toBeInTheDocument();

  const user = userEvent.setup();
  await user.click(buttonA);
  expect(screen.getByText("Sample Title for Popup A")).toBeInTheDocument();

  // when this test is run, console shows complaints about FirebaseStorageError, but that is not relevant to this test.
});
