# Huldra: A Framework for Collecting Crowdsourced Feedback on Multimedia Assets

Collecting crowdsourced feedback to evaluate, rank, or score multimedia content can be cumbersome and time consuming. Most of the existing survey tools are complicated, hard to customize, or tailored for a specific asset type. In this repository, we present an open source framework called Huldra, designed explicitly to address the challenges associated with user studies involving crowdsourced feedback collection. The web-based framework is built in a modular and configurable fashion to allow for the easy adjustment of the user interface (UI) and the multimedia content, while providing integrations with reliable and stable backend solutions to facilitate the collection and analysis of responses.
Our proposed framework can be used as an online survey tool by researchers working on different topics such as Machine Learning (ML), audio, image, and video quality assessment, Quality of Experience (QoE), and require user studies for the benchmarking of various types of multimedia content.

Example use-cases of Huldra include [HOST-XAI](https://host-xai.herokuapp.com), a survey for the collection of feedback from medical experts about how they perceive different eXplainable Artificial Intelligence (XAI) methods demonstrated on images from the gastrointestinal (GI) tract, and [HOST-ATS](https://host-ats.herokuapp.com), a survey for the collection of feedback from the general public about how they perceive alternative thumbnails for a given soccer video clip, both of which use customized versions of Huldra.

## Quick Start

This section describes how to deploy Huldra from scratch and run entirely on your local computer.

1. You need to have [Node.js](https://nodejs.org/) installed on your computer.
2. Clone or download the source code of Huldra.
3. Inside the folder of the source (where `package.json` is located), run `npm install`.

- [Optional] Configuration parameters can be specified in `src/config.json`. The codebase already includes an example configuration by default, but you can update it according to your needs. See [Configuration](#configuration) below for details.
- [Optional] Assets can be updated in the `public/gallery` folder. The codebase already includes some examples there by default, but you can replace them with your own assets. See [Assets](#assets) below for details.
- [Optional] By default, the participant responses will be stored locally, but you can change this. See [Responses](#responses) below for details.

4. Run `npm start` and wait a little while. Then you should see your browser opens Huldra at http://localhost:3000/. Enjoy!

## Detailed Information

This section provides detailed information about Huldra.

- [Configuration](#configuration)
- [Storage](#storage)
- [Assets](#assets)
- [Responses](#responses)
- [Deployment](#deployment)

<!--
<details>
  <summary>Click to see/hide details</summary>
  -->

### Configuration

You can customize your instance by changing configuration parameters using the `.env` file or the `src/config.json` file.
Configuration parameters specified as environment variables in `.env` take precedence over those specified in `config.json`.

Note that the `.env` file is not included in the repository.

<!-- It's only necessary if you want to put your assets or participant responses in Firebase. See [Assets](#assets) and [Responses](#responses) sections below for more information. -->

When you deploy to a server such as Heroku, you can upload a `.env` file or specify configuration parameters through the Heroku interface (see [Deployment](#deployment) for more information), which take precedence over `config.json`. This can be useful if you want to customize your instance without changing any code.

See [CONFIGURATION-PARAMETERS.md](/docs/CONFIGURATION-PARAMETERS.md) for more information about the configuration parameters.

#### Overriding Configuration Parameters with `.env`

The `.env` file can be used to override the values in `config.json`.
Each top level key in `config.json` corresponds to an environment variable in `.env`.
The value of the environment variable should be a JSON string with the same structure as the corresponding value in `config.json`, written in a single line, without outer quotes.

For example, the following `config.json`:

```json
{
  "REACT_APP_warning": {
    "warningMessage": "Please view this page on a device with a screen resolution of at least 1200 x 800.",
    "title": "Huldra"
  }
}
```

can be overridden with the following `.env`:

```dotenv
REACT_APP_warning={"warningMessage": "Please view this page on a device with a screen resolution of at least 1200 x 800.","title": "This is reading from .env"}
```

Here is another example with two top level keys in `config.json`:

```json
{
  "REACT_APP_warning": {
    "warningMessage": "Please view this page on a device with a screen resolution of at least 1200 x 800.",
    "title": "Huldra"
  },
  "REACT_APP_home": {
    "title": "Huldra: Sample Title",
    "introText": "This is a sample subtitle or introduction text.",
    "signupText": "If you don't have a participant ID, you can have one by clicking the button below.",
    "additionalText": "Please view this application in full screen mode."
  }
}
```

The corresponding `.env`:

```dotenv
REACT_APP_warning={"warningMessage": "Please view this page on a device with a screen resolution of at least 1200 x 800.","title": "This is reading from .env"}
REACT_APP_home={"title": "This is reading from .env","introText": "This is reading from .env","signupText": "This is reading from .env","additionalText": "This is reading from .env"}
```

Note: The variables in `.env` are embedded during the build time (see [here](https://create-react-app.dev/docs/adding-custom-environment-variables/)), so if you change the `.env` file, you need to either redeploy the app, or restart the development server (if you are running locally).

### Storage

In order to use Google Firebase to store assets and/or responses, you need to set up a Firebase project first.

- Login to https://firebase.google.com/ with your Google account.
- Click **Go to console**.
- Click **+ Add project** and follow the prompts to create a project.
- Click the **</>** icon to create a web app.
- Once the web app is created, the project configuration page will be opened automatically. Here you can see Firebase connection parameters such as `apiKey` and `appId`. Save these for later use. (If you forget, you can find this info under **Project Overview** -> **Project settings** -> **General**.)
- In your project, go to **All Products** -> **Authentication**. On the **Sign-in Methods** page, enable the **Anonymous** sign-in method

In order for Huldra to be able to connect to your Firebase project, you need to set up environment variables with the relevant credentials.

- Create a file named `.env` in the same folder as `package.json`. The content of the file should be in the following format:

```
REACT_APP_FIREBASE_API_KEY="Hmp4B8AgT@n!6*p@Hmp4B8AgT@n!6*p@Hmp4B8AgT@n!6*p@Hmp"
REACT_APP_FIREBASE_AUTH_DOMAIN="foobar.firebaseapp.com"
REACT_APP_FIREBASE_PROJECT_ID="foobar"
REACT_APP_FIREBASE_STORAGE_BUCKET="foobar.appspot.com"
REACT_APP_FIREBASE_MESSAGING_SENDER_ID="1234567890"
REACT_APP_FIREBASE_APP_ID="Hmp4B8AgT@n!6*p@"
REACT_APP_FIREBASE_ROOT_DIRECTORY="/dev"
```

- Don't use the values given as examples above because they are only dummy content. You should replace them with the Firebase connection parameters you get in the last step of setting up a Firebase project.
- You can choose whichever directory you like for `REACT_APP_FIREBASE_ROOT_DIRECTORY`. However, make sure that your `gallery` folder is under it. For instance, if you would like to have a folder structure as `dev/gallery`, you should specify `REACT_APP_FIREBASE_ROOT_DIRECTORY="/dev"`. Don't forget to place a forward slash at the start of the path.

The above variables are necessary for Huldra to connect to your Firebase project.
The `.env` file can also optionally contain other variables that are used to override the values in `config.json` (see [Overriding Configuration Parameters with `.env`](#overriding-configuration-parameters-with-env) for details).

### Assets

The assets are the images, audio and/or video clips that you want to collect feedback on. Huldra automatically generates the question pages in the survey based on the assets you provide.

- The assets can be placed either locally or in your Firebase bucket. You can configure this in `config.json` under `REACT_APP_general` -> `storage` -> `assetsStorageType` (possible values for `assetsStorageType`: `"local"`, `"firebase"`).
- By default, Huldra reads assets from the `public/gallery` folder (default value for `assetsStorageType`: `"local"`).
- As the cases are fetched at the beginning of the survey, if you change the value of these parameters, you need to go to the homepage and restart the survey from scratch by clicking the "Get participant ID" button.
- In either storage type, the asset folders and files have to adhere to the [folder structure](#directory-tree) and [naming convention](#naming-convention) given below.
- If a case folder is missing any of the required files, the case will be skipped.
- See the [Case Order](#case-order) section below for details about the ordering of cases.

If `assetsStorageType` is `"local"`:

- We look for assets in `public/gallery`.
- You need to specify the names of the case folders in `config.json` under `REACT_APP_general` -> `caseOrder` -> `cases`. This field must be populated as an array of strings, with the case foldernames in the order you would like them to appear in the survey (subject to potential shuffling as described in [Case Order](#case-order)).

If `assetsStorageType` is `"firebase"`:

- If you want to put your assets in Firebase, you need to [set up a Firebase project](#storage), and upload the assets to your Firebase storage bucket.
- In Firebase console, find **Storage** in **All Products**. You can create folders in your storage bucket.
- Huldra reads assets from the `gallery` folder by default[^1], so upload your assets (images, audio and/or video clips) in this folder.

[^1]: If `assetsStorageType` is `"firebase"`, Huldra looks for assets in the `<Firebase root>/gallery` folder (`<Firebase root>` is set with `REACT_APP_FIREBASE_ROOT_DIRECTORY` in `.env`).

#### Directory Tree

```
gallery
└───cases
│   └───audio-lorem
|       └───audio-lorem-a.mp3
|       └───audio-lorem-b.mp3
│   └───video-ipsum
|       └───video-ipsum-a.mp4
|       └───video-ipsum-b.mp4
│   └───hybrid-amet
|       └───hybrid-amet.mp4
|       └───hybrid-amet-a.jpeg
|       └───hybrid-amet-b.jpeg
│   └───image-sit
|       └───image-sit.jpeg
|       └───image-sit-a.jpeg
|       └───image-sit-b.jpeg
|       └───image-sit.json
│   └───text-lorem
|       └───text-lorem-a.txt
|       └───text-lorem-b.txt
│   └───feedback-lorem
|       └───feedback-lorem.mp3
|       └───feedback-lorem-config.json
```

For an image case, a json file is also necessary. The json file should contain the description of the image and the description will be used on the page for that image case. An example of the json file is as follows:

```json
{
  "description": "Write your description here."
}
```

#### Naming Convention

The assets have to adhere to the following naming convention:

- Folder: `<type>-<label>`
- Main asset: `<type>-<label>.<extension>`
- Option A: `<type>-<label>-a.<extension>`
- Option B: `<type>-<label>-b.<extension>`
- JSON file: `<type>-<label>.json`

`<type>` has to be one of the following: `audio`, `video`, `image`, `hybrid`, `text`, or `feedback`.

Refer to the [Directory Tree](#directory-tree) section about which assets are required for each type.

#### Supported File Extensions

```js
image: ["jpg", "jpeg", "png", "gif"],
audio: ["mp3", "wav", "ogg", "aac", "flac"],
video: ["mp4", "webm", "mov"],
text: ["txt"],
feedback: ["jpg", "jpeg", "png", "gif","mp3", "wav", "ogg", "aac", "flac","mp4", "webm", "mov","txt"],

```

The file extensions must be lowercase.

This is also the order in which the app will look for assets. For example, if you have both `image-sit.jpg` and `image-sit.png`, the app will use `image-sit.jpg`.

#### Case Order

If `assetsStorageType` is `"local"`, `REACT_APP_general` -> `caseOrder` -> `cases` in `config.json` must be populated with the list of case foldernames.

If `assetsStorageType` is `"firebase"`, the `cases` array can be empty.
If `cases` is not empty, the app uses these cases; if empty, the app fetches all cases from Firebase.

The app only uses valid cases (cases with all the necessary assets) and the order of cases is decided by the `shuffle` parameter as described below.

The `shuffle` parameter under `caseOrder` has the following effects:

- If `cases` is empty: categorized shuffle
- If `cases` is not empty:
  - `"shuffle": "categorized"`: the order of the cases is shuffled within each case type, but the order of the types is hardcoded (image, hybrid, video, audio, text, and feedback)
  - `"shuffle": "full"`: all the cases are shuffled
  - If `shuffle` is not specified: the app uses the order specified in `cases`

If you change the value of these parameters, you need to go to the home page and restart the survey from scratch by clicking the "Get participant ID" button.

#### Example Assets

We put some example assets in `public/gallery` (minimal working example with all case types, as well as placeholder images and example assets for other pages), so that when you clone the repo and [run directly](#quick-start), you can have a fully working example locally.

The case assets were downloaded from [Pexels](https://www.pexels.com/), which allows free use of their images and videos without attribution, as well as modification (see https://www.pexels.com/license/ for details).

### Responses

At the end of the survey, Huldra generates a file containing the responses of the participant.

- The responses can be either be downloaded or pushed to the Firebase bucket[^2]. You can configure this in `config.json` under `REACT_APP_general` -> `storage` -> `responsesStorageType` (possible values for `responsesStorageType`: `"download"`, `"firebase"`).
- By default, Huldra will prompt the participant to download the file containing their responses at the end of the survey (default value for `responsesStorageType`: `"download"`).

[^2]: If `responsesStorageType` is `"firebase"`, Huldra stores responses in the `<Firebase root>/responses` folder (`<Firebase root>` is set with `REACT_APP_FIREBASE_ROOT_DIRECTORY` in `.env`).

Note that the two parameters `assetsStorageType` and `responsesStorageType` are independent of each other, which means you can have the following combinations:

- `assetsStorageType` is `"local"` and `responsesStorageType` is `"download"` (default)
- `assetsStorageType` is `"local"` and `responsesStorageType` is `"firebase"`
- `assetsStorageType` is `"firebase"` and `responsesStorageType` is `"download"`
- `assetsStorageType` is `"firebase"` and `responsesStorageType` is `"firebase"`

### Deployment

You can delopy Huldra to servers that support Node.js, such as [Heroku](https://heroku.com/), [Netlify](https://www.netlify.com/) or [GitHub Pages](https://pages.github.com/).

For Heroku, you can set Firebase connection parameters in the Heroku interface as config vars for your app (from the project page: **Settings** -> **Config Vars**). See [Heroku's documantation](https://devcenter.heroku.com/articles/github-integration) if you need help on how to deploy to Heroku from GitHub.

For Netlify, you can set variables under **Site settings** -> **Build & deploy** -> **Environment** -> **Environment variables**.

For GitHub Pages, go to your repository's **Setting** -> **Secrets** to enter the Firebase connection parameters.

<!-- You can change Firebase settings to suit your needs.-->

**CORS error messages from Firebase:** If you see CORS error messages from Firabase in the console, that means you must [configure your Cloud Storage bucket for cross-origin access (CORS)](https://firebase.google.com/docs/storage/web/download-files#cors_configuration). [Here](https://stackoverflow.com/a/71193349/802678) is a guide on how to do it.

<!--
</details>
-->

## References

If you find our work useful for your research, please include the following citation:

```
@inproceedings{Hammou2022,
  doi = {10.1145/3524273.3532887},
  url = {https://doi.org/10.1145/3524273.3532887},
  year = {2022},
  month = jun,
  publisher = {{ACM}},
  author = {Malek Hammou and Cise Midoglu and Steven A. Hicks and Andrea Stor{\aa}s and Saeed Shafiee Sabet and Inga Str\"{u}mke and Michael A. Riegler and P{\aa}l Halvorsen},
  title = {Huldra: a framework for collecting crowdsourced feedback on multimedia assets},
  booktitle = {Proceedings of the 13th {ACM} Multimedia Systems Conference}
}
```

Relevant publications:

- Hammou et al., [Huldra: a framework for collecting crowdsourced feedback on multimedia assets](https://dl.acm.org/doi/abs/10.1145/3524273.3532887), 2022
- Midoglu et al., [Experiences and Lessons Learned from a Crowdsourced-Remote Hybrid User Survey Framework](https://ieeexplore.ieee.org/document/10019678), 2022
- Husa et al., [Automatic thumbnail selection for soccer videos using machine learning](https://dl.acm.org/doi/abs/10.1145/3524273.3528182), 2022
- Husa et al., [HOST-ATS: automatic thumbnail selection with dashboard-controlled ML pipeline and dynamic user survey](https://dl.acm.org/doi/abs/10.1145/3524273.3532908), 2022
- Hicks et al., [Visual explanations for polyp detection: How medical doctors assess intrinsic versus extrinsic explanations](https://arxiv.org/abs/2204.00617)

## Internal Notes

### Documentation and Guidelines

- [CHANGELOG.md](CHANGELOG.md): Documents notable changes to the `dev` branch, per release.
- [CONFIGURATION-PARAMETERS.md](/docs/CONFIGURATION-PARAMETERS.md): Serves as a comprehensive guide to the configuration parameters.
- [DEVELOPMENT-GUIDELINES.md](/docs/DEVELOPMENT-GUIDELINES.md): [INTERNAL] Provides guidelines for development.
- [GITHUB-ACTIONS.md](/docs/GITHUB-ACTIONS.md): [INTERNAL] Describes all GitHub action workflows set up in the repository.
- [RELEASE-GUIDELINES.md](/docs/RELEASE-GUIDELINES.md): [INTERNAL] Provides guidelines for making releases.

### Keyboard Shortcuts

- `Enter`: imitate the press of the Next button, with all its requirements where applicable (e.g., if the cases need to be viewed before the button can be pressed, `Enter` also doesn't work until then)
- `Shift + Enter`: forcefully skip to the next page (also possible to skip to the next case without answering the current one)
- `Shift + F`: automatically fill out the form on the registration page (which opens after clicking `Get participant ID` in the homepage), and make the "Start Survey" button clickable (applicable fields are filled with the string "NA", in order to facilitate the filtering of such development/test/debug responses from Firebase later on)
# annotation-lina-hul
