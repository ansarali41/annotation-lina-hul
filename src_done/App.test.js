import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import { BrowserRouter as Router, MemoryRouter } from "react-router-dom";
import { AppContext } from "./context/appContext";
import userEvent from "@testing-library/user-event";

test("App renders the warning page if window.innerWidth < 1200", () => {
  window.innerWidth = 1199;
  render(<App />, { wrapper: Router });

  const element = screen.getByText(/Please view this page on a device with a screen resolution/);
  expect(element).toBeInTheDocument();
});

// This customRender is necessary to correctly render the App dependent on AppContext
const customRender = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <AppContext.Provider value={providerProps}>{ui}</AppContext.Provider>,
    renderOptions
  );
};

describe("if window.innerWidth = 1200", () => {
  let providerProps;

  beforeEach(() => {
    window.innerWidth = 1200;

    // set the providerProps for the customRender
    providerProps = {
      disableNextButton: [],
      setDisableNextButton: [],
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

  test("App homepage: renders with correct title", () => {
    customRender(<App />, { wrapper: Router, providerProps });

    const element = screen.getByText(/Huldra: Sample Title/);
    expect(element).toBeInTheDocument();
  });

  test("App renders all pages and navigation works", async () => {
    customRender(<App />, { wrapper: Router, providerProps });
    const user = userEvent.setup();

    // verify page content for default route /survey/home
    const element = screen.getByRole("button", { name: "Get participant ID" });
    expect(element).toBeInTheDocument();

    // verify navigation to /survey/registration works and page renders correctly
    // adding `await` in front of `waitFor` causes warning messages. putting `user.click` out of `waitFor` block causes error messages. don't know why
    waitFor(() => {
      user.click(element);
      expect(screen.getByText(/Name/)).toBeInTheDocument();
      expect(screen.getByText(/E-mail address/)).toBeInTheDocument();

      const buttonStartSurvey = screen.getByRole("button", {
        name: "Start Survey",
      });
      expect(buttonStartSurvey).toBeInTheDocument();
    });

    // verify navigation to /survey/background works and page renders correctly
    waitFor(() => {
      user.click(buttonStartSurvey);
      expect(screen.getByText(/Background/)).toBeInTheDocument();

      const buttonNextOnBackground = screen.getByRole("button", {
        name: "Next",
      });
      expect(buttonNextOnBackground).toBeInTheDocument();
    });

    // verify navigation to /survey/demonstration works and page renders correctly
    waitFor(() => {
      user.click(buttonNextOnBackground);
      expect(
        screen.getByText(/You can have a demonstration page with a single image/)
      ).toBeInTheDocument();

      const buttonNextOnDemeonstration = screen.getByRole("button", {
        name: "Next",
      });
      expect(buttonNextOnDemeonstration).toBeInTheDocument();
    });

    // verify navigation to /survey/demonstration (same route but a second page) works and page renders correctly
    waitFor(() => {
      user.click(buttonNextOnDemeonstration);
      expect(
        screen.getByText(
          /You can have a demonstration page with a single video player (custom size)/
        )
      ).toBeInTheDocument();

      const buttonNextOnDemeonstration2 = screen.getByRole("button", {
        name: "Next",
      });
      expect(buttonNextOnDemeonstration2).toBeInTheDocument();
    });

    // verify navigation to /survey/demonstration (same route but a third page) works and page renders correctly
    waitFor(() => {
      user.click(buttonNextOnBackground2);
      expect(
        screen.getByText(
          /You can have a demonstration page with a single audio player (custom size)/
        )
      ).toBeInTheDocument();

      const buttonNextOnDemeonstration3 = screen.getByRole("button", {
        name: "Next",
      });
      expect(buttonNextOnDemeonstration3).toBeInTheDocument();
    });

    // verify navigation to /survey/case1 works and page renders correctly
    waitFor(() => {
      user.click(buttonNextOnBackground3);
      expect(screen.getByText(/Case 1\/7/)).toBeInTheDocument();

      const buttonNextOnCase1 = screen.getByRole("button", { name: "Next" });
      expect(buttonNextOnCase1).toBeInTheDocument();
    });

    // verify navigation to /survey/case2 works and page renders correctly
    waitFor(() => {
      user.click(buttonNextOnCase1);
      expect(screen.getByText(/Case 2\/7/)).toBeInTheDocument();

      const buttonNextOnCase2 = screen.getByRole("button", { name: "Next" });
      expect(buttonNextOnCase2).toBeInTheDocument();
    });

    // verify navigation to /survey/case3 works and page renders correctly
    waitFor(() => {
      user.click(buttonNextOnCase2);
      expect(screen.getByText(/Case 3\/7/)).toBeInTheDocument();

      const buttonNextOnCase3 = screen.getByRole("button", { name: "Next" });
      expect(buttonNextOnCase3).toBeInTheDocument();
    });

    // verify navigation to /survey/case4 works and page renders correctly
    waitFor(() => {
      user.click(buttonNextOnCase3);
      expect(screen.getByText(/Case 4\/7/)).toBeInTheDocument();

      const buttonNextOnCase4 = screen.getByRole("button", { name: "Next" });
      expect(buttonNextOnCase4).toBeInTheDocument();
    });

    // verify navigation to /survey/case5 works and page renders correctly
    waitFor(() => {
      user.click(buttonNextOnCase4);
      expect(screen.getByText(/Case 5\/7/)).toBeInTheDocument();

      const buttonNextOnCase5 = screen.getByRole("button", { name: "Next" });
      expect(buttonNextOnCase5).toBeInTheDocument();
    });

    // verify navigation to /survey/case6 works and page renders correctly
    waitFor(() => {
      user.click(buttonNextOnCase5);
      expect(screen.getByText(/Case 6\/7/)).toBeInTheDocument();

      const buttonNextOnCase6 = screen.getByRole("button", { name: "Next" });
      expect(buttonNextOnCase6).toBeInTheDocument();
    });

    // verify navigation to /survey/case7 works and page renders correctly
    waitFor(() => {
      user.click(buttonNextOnCase6);
      expect(screen.getByText(/Case 7\/7/)).toBeInTheDocument();

      const buttonNextOnCase7 = screen.getByRole("button", { name: "Next" });
      expect(buttonNextOnCase7).toBeInTheDocument();
    });

    // verify navigation to /survey/summary-and-feedback works and page renders correctly
    waitFor(() => {
      user.click(buttonNextOnCase7);
      expect(screen.getByText(/Summary of cases/)).toBeInTheDocument();
      expect(screen.getByText(/Overall feedback/)).toBeInTheDocument();

      const buttonEndSurvey = screen.getByRole("button", {
        name: "End Survey",
      });
      expect(buttonEndSurvey).toBeInTheDocument();
    });

    // verify navigation to /survey/end works and page renders correctly
    waitFor(() => {
      user.click(buttonEndSurvey);
      expect(screen.getByText(/Thank you for participating in our survey!/)).toBeInTheDocument();
    });
  });
});
