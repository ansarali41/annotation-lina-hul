# Huldra Changelog

All notable changes to the `dev` branch will be documented in this file, per release.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0-30] - 2023-07-31

### Changed

- Refactor `survey.jsx` ([#78](https://github.com/simulamet-host/huldra-internal/issues/78))
- Clean up page routing ([#125](https://github.com/simulamet-host/huldra-internal/issues/125))
- Change default values of `caseImageViewDetailsMandatory` and `caseHybridViewDetailsMandatory` to false ([#129](https://github.com/simulamet-host/huldra-internal/issues/129))
- Update assets ([#285](https://github.com/simulamet-host/huldra-internal/issues/285))


## [2.0.0-29] - 2023-07-24

### Added

- Add configuration parameter to conditionally display feedback form ([#99](https://github.com/simulamet-host/huldra-internal/issues/99))
- Add support for `.env` file with nested configuration parameters to override `config.json` ([#114](https://github.com/simulamet-host/huldra-internal/issues/114))
- Add support for using local responses folder ([#123](https://github.com/simulamet-host/huldra-internal/issues/123))
- Add uniform logging utility ([#147](https://github.com/simulamet-host/huldra-internal/issues/147))
- Add new case page type `caseText` ([#153](https://github.com/simulamet-host/huldra-internal/issues/153))

### Changed

- Update documentation with information on assets and outputs ([#54](https://github.com/simulamet-host/huldra-internal/issues/54))
- Handle fields to be written to the output dynamically ([#79](https://github.com/simulamet-host/huldra-internal/issues/79))
- Update documentation with information on GitHub actions ([#237](https://github.com/simulamet-host/huldra-internal/issues/237))
- Store the actual valid case list for each participant ID ([#264](https://github.com/simulamet-host/huldra-internal/issues/264))

### Fixed

- Fix "Other" box in the registration page ([#149](https://github.com/simulamet-host/huldra-internal/issues/149))
- Resolve security vulnerabilities using Dependabot ([#232](https://github.com/simulamet-host/huldra-internal/issues/232))
     - Bump tough-cookie from 4.1.2 to 4.1.3
     - Bump webpack from 5.74.0 to 5.88.2
     - Bump semver from 6.3.0 to 6.3.1
     - Bump loader-utils from 2.0.3 to 2.0.4
     - Bump ua-parser-js from 1.0.32 to 1.0.35
     - Bump json5 from 1.0.1 to 1.0.2
     - Bump word-wrap from 1.2.3 to 1.2.4


## [2.0.0-28] - 2023-07-18

### Added

- Create GitHub action for automatic linting and formatting ([#211](https://github.com/simulamet-host/huldra-internal/issues/211))
- Create GitHub action for automatic building ([#234](https://github.com/simulamet-host/huldra-internal/issues/234))

### Changed

- Update documentation with information on testing ([#231](https://github.com/simulamet-host/huldra-internal/issues/231))
- Update `DEVELOPMENT-GUIDELINES.md`([#236](https://github.com/simulamet-host/huldra-internal/issues/236))

### Fixed

- Remove any personal info from the codebase ([#239](https://github.com/simulamet-host/huldra-internal/issues/239)

## [2.0.0-27] - 2023-07-10

### Added

- Integrate linter, formatter, and pre-commit hook ([#23](https://github.com/simulamet-host/huldra-internal/issues/23), [#172](https://github.com/simulamet-host/huldra-internal/issues/172), [#201](https://github.com/simulamet-host/huldra-internal/issues/201)) and relevant documentation ([#5](https://github.com/simulamet-host/huldra-internal/issues/5)) <!--- i.e., update `DEVELOPMENT-GUIDELINES.md` with information on lint rules -->
- Add support for using local gallery files ([#132](https://github.com/simulamet-host/huldra-internal/issues/132))

### Changed

- Merge shared configuration parameters into `REACT_APP_general` ([#166](https://github.com/simulamet-host/huldra-internal/issues/166))
- Preserve aspect ratio while resizing images ([#83](https://github.com/simulamet-host/huldra-internal/issues/83))

<!---
### Fixed
- Fix textbox grayout issue in registration page ([#149](https://github.com/simulamet-host/huldra-internal/issues/149)
-->

### Removed

- Remove unnecessary imports ([#73](https://github.com/simulamet-host/huldra-internal/issues/73), [#181](https://github.com/simulamet-host/huldra-internal/issues/181))
- Remove `TODO` blocks ([#74](https://github.com/simulamet-host/huldra-internal/issues/74))

## [2.0.0-26] - 2023-06-26

### Added

<!--- [1.0.0] - 2021-04-08 -->

- Implement Firebase service ([#114](https://github.com/malekhammou/host-xai/issues/114))
- Add session metadata to output JSON ([#80](https://github.com/malekhammou/host-xai/issues/80))
- Add information icons to registration page ([#81](https://github.com/malekhammou/host-xai/issues/81))
- Add new feedback questions ([#65](https://github.com/malekhammou/host-xai/issues/65))
- Add case summary JSON ([#48](https://github.com/malekhammou/host-xai/issues/48), [#63](https://github.com/malekhammou/host-xai/issues/63))
- Add contact information ([#82](https://github.com/malekhammou/host-xai/issues/82))
- Write app version to output JSON ([#43](https://github.com/malekhammou/host-xai/issues/43))
- Display warning ([#54](https://github.com/malekhammou/host-xai/issues/54))
- Randomize case order ([#60](https://github.com/malekhammou/host-xai/issues/60))
- Add keyboard shortcut ([#64](https://github.com/malekhammou/host-xai/issues/64))
- Add initial internal version for the HOST-XAI application

<!--- 2022-10-10 -->

- Create separate styling for Home page ([#6](https://github.com/simulamet-host/huldra-internal/issues/6))
- Create new folders for separate css files - assets/css
- Create common.css file for common css
- Create home.css file for homepage css

<!--- 2022-10-11 -->

- Create separate styling for Background page ([#10](https://github.com/simulamet-host/huldra-internal/issues/10))

<!--- 2022-10-13 -->

- Create separate styling for Demonstration page ([#10](https://github.com/simulamet-host/huldra-internal/issues/10))
- Create a seperate styling sheet for all the styling in the end.jsx component
- Create a seperate styling sheet for all the styling in the warning.jsx component

<!--- 2022-10-27 -->

- Create summaryAndFeedback.css for all the styling in summaryAndFeedback.jsx, summary.jsx, and feedbackForm.jsx

### Changed

<!--- [1.0.0] - 2021-04-08 -->

- Update output JSON ([#91](https://github.com/malekhammou/host-xai/issues/91))
- Update registration page ([#92](https://github.com/malekhammou/host-xai/issues/92))
- Update message about mandatory fields ([#100](https://github.com/malekhammou/host-xai/issues/100))
- Update image extension handling ([#103](https://github.com/malekhammou/host-xai/issues/103))
- Update input validation logic ([#106](https://github.com/malekhammou/host-xai/issues/106))
- Update case counting logic ([#107](https://github.com/malekhammou/host-xai/issues/107))
- Update keyboard shortcuts ([#112](https://github.com/malekhammou/host-xai/issues/112))
- Update text ([#83](https://github.com/malekhammou/host-xai/issues/83))
- Update button in registration page ([#86](https://github.com/malekhammou/host-xai/issues/86))
- Update case page design ([#89](https://github.com/malekhammou/host-xai/issues/89))
- Update selected cases ([#48](https://github.com/malekhammou/host-xai/issues/48), [#73](https://github.com/malekhammou/host-xai/issues/73))
- Update text ([#49](https://github.com/malekhammou/host-xai/issues/49))
- Randomize case order (cont.) ([#61](https://github.com/malekhammou/host-xai/issues/61))
- Update output JSON ([#62](https://github.com/malekhammou/host-xai/issues/62))
- Update feedback form ([#65](https://github.com/malekhammou/host-xai/issues/65), [#66](https://github.com/malekhammou/host-xai/issues/66))
- Update registration page ([#67](https://github.com/malekhammou/host-xai/issues/67), [#79](https://github.com/malekhammou/host-xai/issues/79))
- Improve storage bucket operations ([#72](https://github.com/malekhammou/host-xai/issues/72), [#76](https://github.com/malekhammou/host-xai/issues/76))
- Update summary and feedback page ([#75](https://github.com/malekhammou/host-xai/issues/75))
- Improve page load time ([#78](https://github.com/malekhammou/host-xai/issues/78)))
- Update explanation pages ([#47](https://github.com/malekhammou/host-xai/issues/47))
- Update text ([#49](https://github.com/malekhammou/host-xai/issues/49))
- Update summary and feedback page ([#52](https://github.com/malekhammou/host-xai/issues/52))
- Update homepage ([#53](https://github.com/malekhammou/host-xai/issues/53))
- Update local storage clearing rules ([#55](https://github.com/malekhammou/host-xai/issues/55), [#59](https://github.com/malekhammou/host-xai/issues/59))
- Update warnings ([#57](https://github.com/malekhammou/host-xai/issues/57))

<!--- 2022-10-10 -->

- Move homepage css from app.css file to home.css
- Move few common css file from app.css file to common.css
- Update homepage add new css link, update class name

<!--- 2022-10-11 -->

- Refactor background.jsx for updating style
- Refactor genericBackgroundSection.jsx for updating style
- Refactor genericBackgroundSubSection.jsx for updating style
- Refactor config.json for updating style
- Move background, genericBackgroundSection, genericBackgroundSubSection pages css from app.css to background.css file
- Move few css from app.css to common.css those are used in multiple files

<!--- 2022-10-13 -->

- Move demonstration css from app.css file to demonstration.css
- end.jsx now imports all styling from end.css
- warning.jsx now imports all styling from warning.css

<!--- 2022-10-27 -->

- summaryAndFeedback.jsx, and its children summary.jsx and feedbackForm.jsx now imports all styling from summaryAndFeedback.css
- Change all ID to classes
- Change class names to follow global styling rules

### Fixed

<!--- [1.0.0] - 2021-04-08 -->

- Fix tooltip bug ([#100](https://github.com/malekhammou/host-xai/issues/100))
- Fix ranking state bug ([#100](https://github.com/malekhammou/host-xai/issues/100))
- Fix unique key prop warning ([#102](https://github.com/malekhammou/host-xai/issues/102))
- Fix HTML nesting errors ([#104](https://github.com/malekhammou/host-xai/issues/104))
- Fix memory leak error ([#105](https://github.com/malekhammou/host-xai/issues/105))
- Fix case count flickering ([#107](https://github.com/malekhammou/host-xai/issues/107))
- Fix missing case description ([#111](https://github.com/malekhammou/host-xai/issues/111))
- Fix logo icon error ([#113](https://github.com/malekhammou/host-xai/issues/113))
- Fix ForwardRef warning ([#115](https://github.com/malekhammou/host-xai/issues/115))
- Fix 404 errors ([#121](https://github.com/malekhammou/host-xai/issues/121))
- Fix infinite loop in background page ([#84](https://github.com/malekhammou/host-xai/issues/84))
- Fix recursive field in output JSON ([#87](https://github.com/malekhammou/host-xai/issues/87))
- Fix wrong path in homepage ([#88](https://github.com/malekhammou/host-xai/issues/88))
- Fix feedback form validation ([#70](https://github.com/malekhammou/host-xai/issues/70))
- Fix overlap in case page ([#71](https://github.com/malekhammou/host-xai/issues/71))

### Removed

<!--- [1.0.0] - 2021-04-08 -->

- Remove redundant toast code blocks ([#100](https://github.com/malekhammou/host-xai/issues/100))
- Remove unused function ([#100](https://github.com/malekhammou/host-xai/issues/100))
- Remove similar images section ([#101](https://github.com/malekhammou/host-xai/issues/101))
- Remove hardcoded URLs ([#108](https://github.com/malekhammou/host-xai/issues/108))
- Remove credentials from codebase ([#110](https://github.com/malekhammou/host-xai/issues/110))
- Remove clipboard use and toast notification in registration page ([#86](https://github.com/malekhammou/host-xai/issues/86))
- Remove descriptions for unused pathological findings ([#68](https://github.com/malekhammou/host-xai/issues/68))
- Remove GitHub icon from footer ([#58](https://github.com/malekhammou/host-xai/issues/58))
