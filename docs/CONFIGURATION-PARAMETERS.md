# Huldra Configuration Parameters

This document serves as a comprehensive guide to the parameters in the `config.json` file.

<!---
It describes each parameter and its purpose.
Make sure to follow the instructions and guidelines mentioned for each parameter.
The names in the table of content directly refer to the name of the configurable property.
The properties which are next to the numbered list represent the page type that the particular parameter can configure, and the properties that are next to the bullet points represent the component of that page that it configures.
-->

The Huldra framework supports 8 type of pages[^1]. All pages are configurable using the `config.json` file.

- **Warning:** Page used to communicate to users that there is a problem.
- **Homepage:** Landing page, where the users can log in with an existing participant ID, or choose to go to the registration page to create a new participant ID.
- **Registration:** Page used to retrieve participant information/metadata.
- **Background:** Page used to display background information related to the study.
- **Demonstration:** Page that can be configured to display various multimedia content. This page can be used to check participant requirements (auditory/visual acuity, hardware/software, etc.), and/or display additional orientation information related to the study.
- **Case:** Main questionnaire page which displays survey questions. A case page can be one of 6 different types: _caseImage_, _caseHybrid_, _caseVideo_, _caseAudio_, _caseText_, _caseFeedback_.
- **Summary and Feedback:** Page used to display the summary of the questions (and optionally responses) in the survey, and a customizable feedback form.
- **End:** Final page of the survey, which is displayed after users complete the survey and submit their responses.

![Overview](/src/assets/documentation/documentation-main.png)

[^1]: Please refer to the paper [Hammou et al.](https://dl.acm.org/doi/pdf/10.1145/3524273.3532887) for a more detailed overview of Huldra pages.

## Configuration Blocks

1. [REACT_APP_warning](#react_app_warning)
2. [REACT_APP_home](#react_app_home)
3. [REACT_APP_registration](#react_app_registration)
4. [REACT_APP_background](#react_app_background)
5. [REACT_APP_demonstration](#react_app_demonstration)
6. [REACT_APP_caseImage](#react_app_caseimage)
7. [REACT_APP_caseHybrid](#react_app_casehybrid)
8. [REACT_APP_caseVideo](#react_app_casevideo)
9. [REACT_APP_caseAudio](#react_app_caseaudio)
10. [REACT_APP_caseText](#react_app_casetext)
11. [REACT_APP_caseFeedback](#react_app_casefeedback)
12. [REACT_APP_summaryAndFeedback](#react_app_summaryandfeedback)
13. [REACT_APP_end](#react_app_end)
14. [REACT_APP_general](#react_app_general)

## REACT_APP_warning

The warning page is used to display a warning when the user's screen resolution is less than 1200 x 800, or if there is any other rendering problem.
The warning page is configured using the `REACT_APP_warning` block in the `config.json` file.

### Parameters

The `REACT_APP_warning` block contains 2 elements.

- `warningMessage`: The actual message displayed to the user when there is a rendering error is defined by this element.
- `title`: The heading of actual message displayed to the user when there is a rendering error is defined by this element.

### Visual Overview

<kbd>![Warning](/src/assets/documentation/warning.png)</kbd>

### Sample Config

```json
"REACT_APP_warning": {
"warningMessage": "Please view this page on a device with a screen resolution of at least 1200 x 800.",
"title": "Huldra"
}
```

## REACT_APP_home

The homepage serves as the landing page.
The homepage is configured using the `REACT_APP_homepage` block in the `config.json` file.

### Parameters

The `REACT_APP_homepage` block contains 4 elements.

- `title`: This element is used to show the title on the home page.
- `introText`: This element is used to configure the introduction text shown at the home page.
- `signupText`: This element is used to configure the subheading, signup text shown at the home page.
- `additionalText`: This element configures the additional text shown on the home page.

### Visual Overview

<kbd>![Home](/src/assets/documentation/home.png)</kbd>

### Sample Config

```json
"REACT_APP_home": {
"title": "Huldra: Sample Title",
"introText": "This is a sample subtitle or introduction text.",
"signupText": "If you don't have a participant ID, you can have one by clicking the button below.",
"additionalText": "Please view this application in full-screen mode."
}
```

## REACT_APP_registration

The registration page is used to retrieve participant information/metadata.
The registration page is configured using the `REACT_APP_registration` block in the `config.json` file.

### Parameters

<!---
`REACT_APP_registration`:  The components of these element are used to configure the regestration page. Nine diffrerent questions can be configured. If you are creating a REACT_APP_registration element, make sure to include all the 9 questions inside. Each question (labeled "Q<question number>") has the following elements.
- `label`: Element to describe the label/heading of the 1st question. MANDATORY?
- `showTooltip`: A bool to set whether to show the tooltip for the question or not. OPTIONAL?
- `showTooltip`: A bool to set whether to show the tooltip for the question or not. OPTIONAL?
-->

### Visual Overview

### Sample Config

<!---
```json
"REACT_APP_registration": {
"Q1": {
"label": "Name"
},
"Q2": {
"label": "E-mail address"
},
"Q3": {
"label": "Country",
"showTooltip": true,
"tooltipMessage": "This field is mandatory."
},
"Q4": {
"label": "Comments"
},
"Q5": {
"label": "Degree",
"showTooltip": true,
"tooltipMessage": "This field is mandatory."
},
"Q6": {
"label": "Mandatory question",
"showTooltip": true,
"tooltipMessage": "This field is mandatory."
},
"Q7": {
"label": "Optional question",
"showTooltip": true,
"tooltipMessage": "This field is mandatory and must be a number."
},
"Q8": {
"label": "Text for mandatory tickbox."
},
"Q9": {
"label": "Text for optional tickbox."
}
}
```
-->

## REACT_APP_background

The background page is used to display background information related to the study.
The background page is configured using the `REACT_APP_background` block in the `config.json` file.

### Parameters

The background page can contain as many sections as desired, where each section contains as many subsections as desired.

The `REACT_APP_warning` block contains the following elements for each section.

- `sectionTitle`: Title of the section is defined with this property.
- `sectionText`: Text of the section is defined with this property.
- `sectionClassName`: Styling of section is defined by choosing the predefined classes. Check the styling classes section for more details regarding particular classes.
- `sectionTitleClassName`: Styling of title of the section is defined by choosing the predefined classes. Check the styling classes section for more details regarding particular classes.
- `sectionTextClassName`: Styling of text of the section is defined by choosing the predefined classes. Check the styling classes section for more details regarding particular classes.
- `sectionContent`: This element is used to define the subsections under sections. <!--- Create multipule objects under the array to create multipule subsections, i.e., every subsection is one object. --> Each object under `sectionContent` corresponds to a subsection, and contains the following elements.
  - `title`: Title of the subsection is defined by this property.
  - `sectionText`: Text of the subsection is defined by this property.
  - `className`: Styling of subsection is defined by choosing the predefined classes. Check the styling classes section for more details regarding particular classes.
  - `imagePath`: Define the path of the image located on firebase to here to display the image on subsection.
  - `imageClassName`: Styling of image on the subsection is defined by choosing the predefined classes. Check the styling classes section for more details regarding particular classes.
  - `imageAlternativeText`: Alternative text to be displayed, if the image is not available is defined here.
  - `descriptionClassName`: Styling of description on the subsection is defined by choosing the predefined classes. Check the styling classes section for more details regarding particular classes.
  - `titleClassName`: Styling of title of the subsection is defined by choosing the predefined classes. Check the styling classes section for more details regarding particular classes.
  - `textClassName`: Styling of text of the subsection is defined by choosing the predefined classes. Check the styling classes section for more details regarding particular classes.

### Visual Overview

<kbd>![Background](/src/assets/documentation/background.png)</kbd>

### Sample Config

```json
   "REACT_APP_background": [
    {
      "sectionTitle": "Background",
      "sectionText": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque at nisi diam. Phasellus sed nulla ornare, ullamcorper justo a, dictum diam. Ut massa nibh, suscipit id magna facilisis, eleifend aliquam ipsum. Praesent erat libero, luctus nec ligula nec, tincidunt scelerisque mauris. Pellentesque consectetur nibh risus. Vestibulum pellentesque auctor orci a viverra. Curabitur eu lacus nulla.Nullam nulla justo, semper tincidunt tempor eget, porttitor et metus. Vestibulum in massa vestibulum, tristique libero vitae, porta elit. Fusce sollicitudin nulla ut tellus ornare, a pretium nulla laoreet. Proin gravida orci fermentum nisi lobortis ornare. Fusce egestas porta tincidunt. Donec placerat viverra diam non dignissim. Cras vel est ut tellus euismod ultricies. Nunc finibus sem felis, sed laoreet dolor hendrerit vel. Sed tincidunt varius erat at consequat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.Nullam in nulla at nunc tincidunt elementum. Aliquam finibus vel ligula non blandit. Nunc ultricies feugiat libero, eu viverra orci facilisis in. Donec ultrices iaculis rutrum. Etiam eu luctus mi. Phasellus augue nunc, gravida ut pretium at, faucibus eu mauris. Ut ac vulputate elit. Donec massa justo, semper sit amet quam id, commodo pulvinar dui.",
      "sectionClassName": "background-section",
      "sectionTitleClassName": "background-section-title",
      "sectionTextClassName": "background-text-content",
      "sectionContent": []
    },
    {
      "sectionTitle": "Sample Section Title",
      "sectionText": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce neque odio, tempus quis sapien id, accumsan aliquam nunc. Proin tincidunt, felis nec iaculis rutrum, ex quam condimentum ante, id sagittis elit odio sed risus. Maecenas nec ultrices nisi. Maecenas sapien nulla, porttitor vel facilisis et, fermentum ut massa. Vivamus molestie eros non quam dictum, vitae dapibus turpis viverra. Cras id mauris tempor, rhoncus tellus vel, dictum nisl. Vivamus orci ex, interdum non justo eget, fringilla auctor purus. Donec in elementum mi, id mattis mauris. Integer in tincidunt nunc. In hac habitasse platea dictumst. Pellentesque nec mi ornare, viverra lectus nec, egestas sapien.",
      "sectionClassName": "background-section",
      "sectionTitleClassName": "background-section-title",
      "sectionTextClassName": "background-text-content",
      "sectionContent": [
        {
          "title": "Sample Subsection Title",
          "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce neque odio, tempus quis sapien id, accumsan aliquam nunc. Proin tincidunt, felis nec iaculis rutrum, ex quam condimentum ante, id sagittis elit odio sed risus. Maecenas nec ultrices nisi. Maecenas sapien nulla, porttitor vel facilisis et, fermentum ut massa. Vivamus molestie eros non quam dictum, vitae dapibus turpis viverra. Cras id mauris tempor, rhoncus tellus vel, dictum nisl. Vivamus orci ex, interdum non justo eget, fringilla auctor purus. Donec in elementum mi, id mattis mauris. Integer in tincidunt nunc. In hac habitasse platea dictumst. Pellentesque nec mi ornare, viverra lectus nec, egestas sapien.",
          "className": "background-single-block",
          "imagePath": "/gallery/image-sample.png",
          "imageClassName": "explanation-background-image",
          "imageAlternativeText": "sample-image",
          "descriptionClassName": "background-single-block-description-content",
          "titleClassName": "background-single-block-description-label",
          "textClassName": "background-text-content"
        },
        {
          "title": "Sample Subsection Title",
          "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce neque odio, tempus quis sapien id, accumsan aliquam nunc. Proin tincidunt, felis nec iaculis rutrum, ex quam condimentum ante, id sagittis elit odio sed risus. Maecenas nec ultrices nisi. Maecenas sapien nulla, porttitor vel facilisis et, fermentum ut massa. Vivamus molestie eros non quam dictum, vitae dapibus turpis viverra. Cras id mauris tempor, rhoncus tellus vel, dictum nisl. Vivamus orci ex, interdum non justo eget, fringilla auctor purus. Donec in elementum mi, id mattis mauris. Integer in tincidunt nunc. In hac habitasse platea dictumst. Pellentesque nec mi ornare, viverra lectus nec, egestas sapien.",
          "className": "background-single-block",
          "imagePath": "/gallery/image-sample.png",
          "imageClassName": "explanation-background-image",
          "imageAlternativeText": "sample-image",
          "descriptionClassName": "background-single-block-description-content",
          "titleClassName": "background-single-block-description-label",
          "textClassName": "background-text-content"
        }
      ]
    },
    {
      "sectionTitle": "Sample Section Title",
      "sectionClassName": "background-section",
      "sectionTitleClassName": "background-section-title",
      "sectionTextClassName": "background-text-content",
      "sectionContent": [
        {
          "title": "Sample Subsection Title",
          "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce neque odio, tempus quis sapien id, accumsan aliquam nunc. Proin tincidunt, felis nec iaculis rutrum, ex quam condimentum ante, id sagittis elit odio sed risus. Maecenas nec ultrices nisi. Maecenas sapien nulla, porttitor vel facilisis et, fermentum ut massa. Vivamus molestie eros non quam dictum, vitae dapibus turpis viverra. Cras id mauris tempor, rhoncus tellus vel, dictum nisl. Vivamus orci ex, interdum non justo eget, fringilla auctor purus. Donec in elementum mi, id mattis mauris. Integer in tincidunt nunc. In hac habitasse platea dictumst. Pellentesque nec mi ornare, viverra lectus nec, egestas sapien.",
          "className": "background-single-block",
          "imagePath": "/gallery/image-sample.png",
          "imageClassName": "explanation-background-image",
          "imageAlternativeText": "sample-image",
          "descriptionClassName": "background-single-block-description-content",
          "titleClassName": "background-single-block-description-label",
          "textClassName": "background-text-content"
        }
      ]
    }
  ]
```

<!--
`REACT_APP_background`: This element is used to define the information on background page. This is defined as an array, since multipule sections for information can be defined here. Every section is one object.

### Styling Classes

```json
".background {
    height: 100%;
    overflow-y: auto;
    text-align: left;
    padding: 0 0.8em 0.8em 0.8em;
}

.background-section-title {
    font-weight: 700;
    font-size: 1.5em;
}

.background-section {
    margin-top: 2em;
}

.background-single-block {
    margin-left: 1.3em;
    margin-top: 2em;
    align-items: flex-start;
    display: flex;
}

.background-single-block-description-content {
    padding-left: 0.8em;
    height: 100%;
}

.background-single-block-description-label {
    font-weight: 700;
    font-size: 1em;
}

.background::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 0.4em;
    background-color: #f5f5f5;
}

.background::-webkit-scrollbar {
    width: 0.3em;
    background-color: #f5f5f5;
}

.background::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #9c9393;
}

.background-text-content {
    text-align: justify;
}"
```
-->

## REACT_APP_demonstration

The demonstration page(s) can be configured to display various multimedia content.
The demonstration page(s) are configured using the `REACT_APP_demonstration` block in the `config.json` file.

### Parameters

Huldra can include up to 3 demonstration pages, where each page can contain an image, video, or audio. Pages can also contain multiple elements.

The `REACT_APP_demonstration` block contains the following elements for each demonstration page.

- `textBefore`: Text written on line 1 can be configured here.
- `textAfter`: Text written on line 2 can be configured here.
- `hasImage`: A bool. Set it true to display an image on the demonstration page.
- `imagePath`: Define the path of the image located on firebase to here to display the image on the demonstration page. **Note:** `hasImage` bool has to be set true in order to put the image on the demonstartion page.
- `imageClassName`: The class used to define styling of the image on demonstration page. As of now there is only one class available to define the image styling. The class name is "demonstration-image", whose height is defined as 22em and width is auto adjusted.
- `hasVideo`: A bool. Set it true to display a video on the demonstration page.
- `videoPath`: Define the path of the video on firebase to here to display the video on the demonstartion page. **Note:** `hasVideo` bool has to be set true in order to put the video on the demonstartion page.
- `videoHeight`: Define the height of the video player in px or em.
- `videoWidth`: Define the width of the video player in px or em.
- `hasAudio`: A bool. Set it true to put an audio on the demonstration page.
- `audioPath`: Define the path of the audio on firebase to here to put the audio on the demonstartion page. **Note:** `hasAudio` bool has to be set true in order to put the audio on the demonstartion page.
- `audioHeight`: Define the height of the audio player in px or em.
- `audioWidth`: Define the width of the audio player in px or em.

### Visual Overview

<kbd>![Demonstration (video and image)](/src/assets/documentation/demonstration_video_image.png)</kbd>
<kbd>![Demonstration (image)](/src/assets/documentation/demonstration_image.png)</kbd>
<kbd>![Demonstration (video)](/src/assets/documentation/demonstration_video.png)</kbd>
<kbd>![Demonstration (audio)](/src/assets/documentation/demonstration_audio.png)</kbd>

### Sample Config

```json
  "REACT_APP_demonstration": [
    {
      "textBefore": "You can have a demonstration page with a single image.",
      "textAfter": "You can use this page to describe how the rest of the survey works.",
      "hasImage": true,
      "imagePath": "/gallery/image-sample.png",
      "imageClassName": "demonstration-image"
    },
    {
      "textBefore": "You can have a demonstration page with a single video player (custom size).",
      "textAfter": "You can use this page to run a video check, or to display a tutorial video showing how the rest of the survey works.",
      "hasVideo": true,
      "videoPath": "/gallery/video-sample.mp4",
      "videoHeight": "300px",
      "videoWidth": "450px"
    },
    {
      "textBefore": "You can have a demonstration page with a single audio player (custom size).",
      "textAfter": "You can use this page to run a sound check, or to play a tutorial audio describing how the rest of the survey works.",
      "hasAudio": true,
      "audioPath": "/gallery/audio-sample.mp3",
      "audioHeight": "300px",
      "audioWidth": "450px"
    }
  ]
```

<!---
-  **Exact Name**: `REACT_APP_demonstration`
-  **Description**: This element is used to configure the demonstartion page. You can demonstrate image, video, and audio to the user. It is mandatody to have this array. The number of objects in this array define the number of demonstartion pages. To have no demonstartion page at all, make this as an empty array. The demonstration page is comprised of the elements below:
-->

## REACT_APP_caseImage

The caseImage page is a main questionnaire page which displays a _caseImage_ type survey question.

<!--- where a user can rank 2 images -->

All case pages identified as being of type _caseImage_ are configured using the `REACT_APP_caseImage` block in the `config.json` file.

### Parameters

The `REACT_APP_caseImage` block contains 3 sub-blocks.

The `caseImageColumnLeft` sub-block is used to configure the left column, and ...

- `label`: This element is used to configure the heading on the left column of case image page.

The `caseImageColumnMiddle` sub-block is used to configure the middle column, and ...

- `title`: This element is used to configure the heading on the middle column of case image page.
- `text`: This element is used to configure the descriptive text on the middle column of case image page.
- `leftSectionTitle`: This element is used to configure the heading text over the left image on the middle column of case image page.
- `leftSectionButtonlabel`: This element is used to configure the text of the button located below the left image on the middle column of case image page.
- `leftSectionTextWithIconsLabel`: This element is used to configure the text below the button located below the left image on the middle column of case image page. This text is only visible when the user has clicked on the mentioned button.
- `rightSectionTitle`: This element is used to configure the heading text over the right image on the middle column of case image page.
- `rightSectionButtonlabel`: This element is used to configure the text of the button located below the right image on the middle column of case image page.
- `rightSectionTextWithIconsLabel`: This element is used to configure the text below the button located below the right image on the middle column of case image page. This text is only visible when the user has clicked on the mentioned button.
- `popupA`: This element is used to configure the popup which opens after clicking on the button located below the left image on the middle column of case image page.
  - `mainTitle`: When the button below the any of the smaller image on the middle column of the case image page is clicked a popup appears. This element configures up the main heading on the popup, which is positioned above the first image on the popup (the large one).
  - `leftImageTitle`: When the button below the any of the smaller image on the middle column of the case image page is clicked a popup appears. This element configures up the heading for the second image, which is the left one among the two small images, on the popup.
  - `descriptionTitle`: When the button below the any of the smaller image on the middle column of the case image page is clicked a popup appears. This element configures up the description heading of the popup. The description heading is positioned below the 2 smaller images.
  - `descriptionText`: When the button below the any of the smaller image on the middle column of the case image page is clicked a popup appears. This element configures up the description text of the popup.
- `popupB`: This element is used to configure the popup which opens after clicking on the button located below the right image on the middle column of case image page.
  - `mainTitle`: When the button below the any of the smaller image on the middle column of the case image page is clicked a popup appears. This element configures up the main heading on the popup, which is positioned above the first image on the popup (the large one).
  - `leftImageTitle`: When the button below the any of the smaller image on the middle column of the case image page is clicked a popup appears. This element configures up the heading for the second image, which is the left one among the two small images, on the popup.
  - `descriptionTitle`: When the button below the any of the smaller image on the middle column of the case image page is clicked a popup appears. This element configures up the description heading of the popup. The description heading is positioned below the 2 smaller images.
  - `descriptionText`: When the button below the any of the smaller image on the middle column of the case image page is clicked a popup appears. This element configures up the description text of the popup.
  - `gallerySubstring`: When the button below the any of the smaller image on the middle column of the case image page is clicked a popup appears. This element configures the string below the larger image(1st one). **Note:** This is exclusive to popup B (the one which opens after clicking on the button located below the right image on the middle column of case image page.)

The `caseImageColumnRight` sub-block is used to configure the right column, and ...

- `title`: This element is used to configure the heading on the right column of case image page.
- `text`: This element is used to configure the text description on the right column of case image page.

### Visual Overview

<kbd>![CaseImage](/src/assets/documentation/caseImage.png)</kbd>
<kbd>![CaseImage popup](/src/assets/documentation/caseImage_popup.png)</kbd>

### Sample Config

```json
  "REACT_APP_caseImage": {
    "caseImageColumnLeft": { "label": "Case" },
    "caseImageColumnMiddle": {
      "title": "Answer Options",
      "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "leftSectionTitle": "Option A",
      "leftSectionButtonlabel": "View details",
      "leftSectionTextWithIconsLabel": "Viewed",
      "rightSectionTitle": "Option B",
      "rightSectionButtonlabel": "View details",
      "rightSectionTextWithIconsLabel": "Viewed",
      "popupA": {
        "mainTitle": "Sample Title for Popup A",
        "leftImageTitle": "Original",
        "rightImageTitle": "Option A",
        "descriptionTitle": "Description",
        "descriptionText": "Lorem ipsum dolor sit amet, ."
      },
      "popupB": {
        "mainTitle": "Sample Title for Popup B",
        "leftImageTitle": "Original",
        "rightImageTitle": "Option B",
        "descriptionTitle": "Description",
        "descriptionText": "Lorem ipsum dolor sit amet,.",
        "gallerySubstring": "similar"
      }
    },
    "caseImageColumnRight": {
      "title": "Your Answer",
      "text": "Please click on one of the thumbnails (option A or B) to place it on top. Do not drag and drop the image. The top image is your preferred option for this case."
    }
  }
```

## REACT_APP_caseHybrid

The caseHybrid page is a main questionnaire page which displays a _caseHybrid_ type survey question.

<!--- where a user can view a video, compare two image options, and provide their answer in the right column -->

All case pages identified as being of type _caseHybrid_ are configured using the `REACT_APP_caseHybrid` block in the `config.json` file.

### Parameters

The `REACT_APP_caseHybrid` block contains 3 sub-blocks.

The `caseHybridColumnLeft` sub-block is used to configure the left column, and contains the following elements.

- `label`: This element is used to configure the heading on the left column of case hybrid page.

The `caseHybridColumnMiddle` sub-block is used to configure the middle column, and contains the following elements..

- `title`: This element is used to configure the heading on the middle column of case hybrid page.
- `text`: This element is used to configure the descriptive text on the middle column of case hybrid page.
- `leftSectionTitle`: This element is used to configure the heading text over the left image on the middle column of case hybrid page.
- `leftSectionButtonlabel`: This element is used to configure the text of the button located below the left image on the middle column of case hybrid page.
- `leftSectionTextWithIconsLabel`: This element is used to configure the text below the button located below the left image on the middle column of case hybrid page. This text is only visible when the user has clicked on the mentioned button.
- `rightSectionTitle`: This element is used to configure the heading text over the right image on the middle column of case hybrid page.
- `rightSectionButtonlabel`: This element is used to configure the text of the button located below the right image on the middle column of case hybrid page.
- `rightSectionTextWithIconsLabel`: This element is used to configure the text below the button located below the right image on the middle column of case hybrid page. This text is only visible when the user has clicked on the mentioned button.
- `popupA`: This element is used to configure the popup which opens after clicking on the button located below the left image on the middle column of caseHybrid page.
  - `mainTitle`: When the button below the any of the smaller image on the middle column of the case hybrid page is clicked a popup appears. This element configures up the main heading on the popup, which is positioned above the first image on the popup (the large one).
  - `leftImageTitle`: ...
  - `rightImageTitle`: ...
  - `descriptionTitle`: ...
  - `descriptionText`: ...
- `popupB`: This element is used to configure the popup which opens after clicking on the button located below the right image on the middle column of caseHybrid page.
  - `leftImageTitle`: ...
  - `rightImageTitle`: ...
  - `descriptionTitle`: ...
  - `descriptionText`: ...
  - `gallerySubstring`: ...

The `caseHybridColumnRight` sub-block is used to configure the right column, and contains the following elements.

- `title`: This element is used to configure the heading on the right column of case hybrid page.
- `text`: This element is used to configure the text description on the right column of case image page.

### Visual Overview

<kbd>![CaseHybrid](/src/assets/documentation/caseHybrid.png)</kbd>
<kbd>![CaseHybrid popup](/src/assets/documentation/caseHybrid_popup.png)</kbd>

### Sample Config

```json
    "REACT_APP_caseHybrid": {
    "caseHybridColumnLeft": { "label": "Case" },
    "caseHybridColumnMiddle": {
      "title": "Answer Options",
      "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce neque odio, tempus quis sapien id, accumsan aliquam nunc. Proin tincidunt, felis nec iaculis rutrum, ex quam condimentum ante, id sagittis elit odio sed risus.",
      "leftSectionTitle": "Option A",
      "leftSectionButtonlabel": "View details",
      "leftSectionTextWithIconsLabel": "Viewed",
      "rightSectionTitle": "Option B",
      "rightSectionButtonlabel": "View details",
      "rightSectionTextWithIconsLabel": "Viewed",
      "popupA": {
        "mainTitle": "Sample Title for Popup A",
        "leftImageTitle": "Original",
        "rightImageTitle": "Option A",
        "descriptionTitle": "Description",
        "descriptionText": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce neque odio, tempus quis sapien id, accumsan aliquam nunc. Proin tincidunt, felis nec iaculis rutrum, ex quam condimentum ante, id sagittis elit odio sed risus."
      },
      "popupB": {
        "mainTitle": "Sample Title for Popup B",
        "leftImageTitle": "Original",
        "rightImageTitle": "Option B",
        "descriptionTitle": "Description",
        "descriptionText": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce neque odio, tempus quis sapien id, accumsan aliquam nunc. Proin tincidunt, felis nec iaculis rutrum, ex quam condimentum ante, id sagittis elit odio sed risus.",
        "gallerySubstring": "similar"
      }
    },
    "caseHybridColumnRight": {
      "title": "Your Answer",
      "text": "Please click on one of the thumbnails (option A or B) to place it on top. Do not drag and drop the image. The top image is your preferred option for this case."
    }
  },
```

## REACT_APP_caseVideo

The caseVideo page is a main questionnaire page which displays a _caseVideo_ type survey question.

<!--- where a user can rank 2 videos -->

All case pages identified as being of type _caseVideo_ are configured using the `REACT_APP_caseVideo` block in the `config.json` file.

### Parameters

The `REACT_APP_caseVideo` block contains 2 sub-blocks.

The `caseVideoColumnLeft` sub-block is used to configure the left column, and contains the following elements.

- `label`: This element is used to configure the heading on the left column of case Video page.
- `sectionVideoHeight`: This element is used to configure the height of the video players on the left column of case video page.
- `sectionVideoWidth`: This element is used to configure the width of the video players on the left column of case video page.
- `rightSectionVideoLabel`: This element is used to configure the heading of the right video on the left column of case video page.
- `leftSectionVideoLabel`: This element is used to configure the heading of the left video on the left column of case video page.
- `sectionButtonlabel`: This element is used to configure the label of the buttons below the videos on the left column of case video page.

The `caseVideoColumnRight` sub-block is used to configure the right column, and contains the following elements.

- `title`: This element is used to configure the heading on the right column of case video page.
- `text`: This element is used to configure the text description on the right column of case video page.

### Visual Overview

<kbd>![CaseVideo](/src/assets/documentation/caseVideo.png)</kbd>

### Sample Config

```json
  "REACT_APP_caseVideo": {
    "caseVideoColumnLeft": {
      "label": "Case",
      "sectionVideoHeight": "200px",
      "sectionVideoWidth": "410px",
      "rightSectionVideoLabel": "Video Clip B",
      "leftSectionVideoLabel": "Video Clip A",
      "sectionButtonlabel": "Select"
    },
    "caseVideoColumnRight": {
      "title": "Your Answer",
      "text": "Please select one of the video clips to place it on top. The top video clip is your preferred option for this case."
    }
  },
```

## REACT_APP_caseAudio

The caseAudio page is a main questionnaire page which displays a _caseAudio_ type survey question.

<!--- where a user can rank 2 audios -->

All case pages identified as being of type _caseAudio_ are configured using the `REACT_APP_caseAudio` block in the `config.json` file.

### Parameters

The `REACT_APP_caseAudio` block contains 2 sub-blocks.

The `caseAudioColumnLeft` sub-block is used to configure the left column, and contains the following elements.

- `label`: This element is used to configure the heading on the left column of case Audio page.
- `sectionAudioHeight`: This element is used to configure the height of the audio players on the left column of case audio page.
- `sectionAudioWidth`: This element is used to configure the width of the audio players on the left column of case audio page.
- `rightSectionAudioLabel`: This element is used to configure the heading of the right audio on the left column of case audio page.
- `leftSectionAudioLabel`: This element is used to configure the heading of the left audio on the left column of case audio page.
- `sectionButtonlabel`: This element is used to configure the label of the buttons below the audios on the left column of case audio page.

The `caseAudioColumnRight` sub-block is used to configure the right column, and contains the following elements.

- `title`: This element is used to configure the heading on the right column of case audio page.
- `text`: This element is used to configure the text description on the right column of case audio page.

### Visual Overview

<kbd>![CaseAudio](/src/assets/documentation/caseAudio.png)</kbd>

### Sample Config

```json
  "REACT_APP_caseAudio": {
    "caseAudioColumnLeft": {
      "label": "Case",
      "sectionAudioHeight": "200px",
      "sectionAudioWidth": "410px",
      "rightSectionAudioLabel": "Audio Clip B",
      "leftSectionAudioLabel": "Audio Clip A",
      "sectionButtonlabel": "Select"
    },
    "caseAudioColumnRight": {
      "title": "Your Answer",
      "text": "Please select one of the audio clips to place it on top. The top audio clip is your preferred option for this case."
    }
  },
```

## REACT_APP_caseText

The caseText page is a main questionnaire page which displays a _caseText_ type survey question.

<!--- where a user can rank 2 texts -->

All case pages identified as being of type _caseText_ are configured using the `REACT_APP_caseText` block in the `config.json` file.

### Parameters

The `REACT_APP_caseText` block contains 2 sub-blocks.

The `caseTextColumnLeft` sub-block is used to configure the left column, and contains the following elements.

- `label`: This element is used to configure the heading on the left column of case Text page.
- `rightSectionTextLabel`: This element is used to configure the heading of the right text column on the left section of case text page.
- `leftSectionTextLabel`: This element is used to configure the heading of the left text column on the left section of case text page.
- `sectionButtonlabel`: This element is used to configure the label of the buttons below the texts on the left section of case text page.

The `caseTextColumnRight` sub-block is used to configure the right column, and contains the following elements.

- `title`: This element is used to configure the heading on the right column of case text page.
- `text`: This element is used to configure the text description on the right column of case text page.

### Visual Overview

<kbd>![CaseText](/src/assets/documentation/caseText.png)</kbd>

### Sample Config

```json
  "REACT_APP_caseText": {
    "caseTextColumnLeft": {
      "label": "Case Text",
      "rightSectionTextLabel": "Text Label B",
      "leftSectionTextLabel": "Text Label A",
      "sectionButtonlabel": "Select Text"
    },
    "caseTextColumnRight": {
      "title": "Your Text Answer",
      "text": "Please select one of the Text Text to place it on top. The top Text Text is your preferred option for this case."
    }
  },
```

## REACT_APP_caseFeedback

The caseFeedback page is a main questionnaire page which displays a _caseFeedback_ type survey question.

<!--- where an asset is diplayed with a feedback form to the user -->

All case pages identified as being of type _caseFeedback_ are configured using the `REACT_APP_caseFeedback` block in the `config.json` file, or the cases can be individually configured by creating a `feedback-casename-config.json` under `/feedback-casename`. If there is no feedback-casename-config.json under /feedback-casename, the case will be rendered according to the `REACT_APP_caseFeedback` block in the `config.json`.

### Parameters

The `REACT_APP_caseFeedback` block contains 3 sub-blocks.

The `caseFeedbackColumnLeft` sub-block is used to configure the left column, and contains the following elements.

- `label`: This element is used to configure the heading on the left column of case feedback page.
- `text`: This element is used to configure the text under the heading on the left column of case feedback page.

The `caseFeedbackColumnRight` sub-block is used to configure the right column, and contains the following elements.

- `title`: This element is used to configure the heading on the right column of case feedback page.
- `text`: This element is used to configure the text description on the right column of case feedback page.

The `caseFeedbackQuestions` sub-block is used to configure the questions on the right column.  It is an array. The number of objects added in this array will correspond to the the number of questions shown to the user. The `caseFeedbackQuestions` can contain as many questions as desired, where each question is configured using the following elements.

  - `questionType`: The type of question that you intend to add in the feeback form. The question types can be - text: where the answer is expected as a text input, likert - where the answer is expected to be a value on likert scale, and mc - where the answer is expected to be a selection of multipule choices.
  - `id`: The unique identifier of the question. Can be understood as question number.
  - `label`: The question can be defined/written with this label.
  - `optional`: A bool value. When set to false, the question becomes mandatory to answer.
  - `choices`[^2]: If the questionType is 'mc', i.e., multipule choice. The options of the multipule choice can be defined in this array.
  - `hasCommentBox`[^2]: A bool field. Set it to true to display a comment box to take textual input from the user.
  - `commentBoxLabel`[^2]: The heading of the comment box is defined by this field.
  - `showToolTip`[^3]
  - `likertQuestions`[^4]: if the questionType field is set as 'likert', then the likert scale can be configured with this array. The number of objects in this array is equivalent to the number of likert questions displayed to the user. `likertQuestions` includes the following elements per question.
    - `question`: As the name suggest the questions is defined here.
    - `size`: The size of the likert scale, corresponding to the question is defined by this element.
    - `label`: The text over the likert scale which can be used to describe or give instructions to the user is written here.

[^2]: Only for multiple choice type questions.
[^3]: Only for text type questions.
[^4]: Only for likert type questions.


### Visual Overview

<kbd>![CaseFeedback](/src/assets/documentation/caseFeedback.png)</kbd>

### Sample Config


```json
  "REACT_APP_caseFeedback":  // you only need to provide this line if you are setting config.json. You do not need this line if you are configuring case-by-case, i.e., creating a `feedback-casename-config.json` under `/feedback-casename`
  
  {
    "caseFeedbackColumnLeft": {
      "label": "Case feedback label config",
      "text":"some text config here"

    },
    "caseFeedbackColumnRight": {
      "title": "Config Feedback Title",
      "text": "Config Feedback Text"
    },
    "caseFeedbackQuestions": [
      {
        "questionType": "text",
        "id": "Q1",
        "label": "Example config question.",
        "optional": false,
        "showTooltip": false
      },
      {
        "questionType": "likert",
        "id": "Q2",
        "label": "Example config question block.",
        "optional": false,
        "likertQuestions": [
         
          {
            "question": "Example likert question 3.",
            "size": 10,
            "label": "Likert_Question_3"
          }
        ]
      },
      {
        "questionType": "mc",
        "id": "Q3",
        "label": "Example multiple choice question.",
        "optional": false,
        "choices": ["Example choice 1.", "Example choice 2."],
        "hasCommentBox": true,
        "commentBoxLabel": "Comment to the multiple choice question Q3."
      }
    ]
  

  }
```


## REACT_APP_summaryAndFeedback

The summary and feedback page used to display the summary of the questions (and optionally responses) in the survey, and a customizable feedback form.

<!---
The summary of the user's answers is displayed on the left column, and the right column is used for getting the feedback.
left column, i.e., the summary column of the page
right column, i.e., the feedback column of the page
-->

The summary and feedback page is configured using the `REACT_APP_summaryAndFeedback` block in the `config.json` file.

### Parameters

The `REACT_APP_summaryAndFeedback` block contains 2 sub-blocks.

The `summary` sub-block is used to configure the left column, and contains the following elements.

- `display`: It is a bool value, setting this value to false will not show the summary coulumn, it will only show the feedback form.
- `highlightAnswers`: It is a bool value, setting this value to false will not show the highlight the answer's that users has selected for the questions.
- `title`: The element is used to define the heading of the summary column.
- `title`: The element is used to define the text below the heading of the summary column.
- `videoPlaceholderIconPath`: For questions containing videos, instead of full videos, a thumbnail is shown. That thumbnail location can be set here.
- `audioPlaceholderIconPath`: For questions containing audios, instead of full audio players, a thumbnail is shown. That thumbnail location can be set here.
- `imagePlaceholderIconPath`: For questions containing audios or videos or hybrid cases, the image representing those cases can be configured here by giving it's location.

The `feedbackForm` sub-block is used to configure the right column, and contains the following elements.

- `title`: You can configure the heading of the feedback form with this element.
- `text`: You can configure the text below the heading of the feedback form with this element.
- `feedbackFormQuestions`: Questions can be added in the feedback from through this element. It is an array. The number of objects added in this array will correspond to the the number of questions shown to the user. The `feedbackFormQuestions` can contain as many questions as desired, where each question is configured using the following elements.
  - `questionType`: The type of question that you intend to add in the feeback form. The question types can be - text: where the answer is expected as a text input, likert - where the answer is expected to be a value on likert scale, and mc - where the answer is expected to be a selection of multipule choices.
  - `id`: The unique identifier of the question. Can be understood as question number.
  - `label`: The question can be defined/written with this label.
  - `optional`: A bool value. When set to false, the question becomes mandatory to answer.
  - `choices`[^2]: If the questionType is 'mc', i.e., multipule choice. The options of the multipule choice can be defined in this array.
  - `hasCommentBox`[^2]: A bool field. Set it to true to display a comment box to take textual input from the user.
  - `commentBoxLabel`[^2]: The heading of the comment box is defined by this field.
  - `showToolTip`[^3]
  - `likertQuestions`[^4]: if the questionType field is set as 'likert', then the likert scale can be configured with this array. The number of objects in this array is equivalent to the number of likert questions displayed to the user. `likertQuestions` includes the following elements per question.
    - `question`: As the name suggest the questions is defined here.
    - `size`: The size of the likert scale, corresponding to the question is defined by this element.
    - `label`: The text over the likert scale which can be used to describe or give instructions to the user is written here.

[^2]: Only for multiple choice type questions.
[^3]: Only for text type questions.
[^4]: Only for likert type questions.

### Visual Overview

<kbd>![Summary and Feedback](/src/assets/documentation/summaryAndFeedback.png)</kbd>

### Sample Config

```json
  "REACT_APP_summaryAndFeedback": {
    "summary": {
      "display": true,
      "highlightAnswers": true,
      "title": "Summary of cases",
      "text": "Lorem ipsum tur repudiandae nobis! Vero itaque dolorum dicta!",
      "label": "Case",
      "videoPlaceholderIconPath": "/gallery/video-placeholder.png",
      "audioPlaceholderIconPath": "/gallery/audio-placeholder.png",
      "imagePlaceholderIconPath": "/gallery/image-placeholder.png"
    },
    "feedbackForm": {
      "title": "Overall feedback",
      "text": "Lorem ipsum tur repudiandae nobis! Vero itaque dolorum dicta!",
      "feedbackFormQuestions": [
        {
          "questionType": "text",
          "id": "Q1",
          "label": "Example free form text question.",
          "optional": false,
          "showTooltip": false
        },
        {
          "questionType": "likert",
          "id": "Q2",
          "label": "Example likert question block.",
          "optional": false,
          "likertQuestions": [
            {
              "question": "Example likert question 1.",
              "size": 10,
              "label": "Likert_Question_1"
            },
            {
              "question": "Example likert question 2.",
              "size": 10,
              "label": "Likert_Question_2"
            },
            {
              "question": "Example likert question 3.",
              "size": 10,
              "label": "Likert_Question_3"
            }
          ]
        },
        {
          "questionType": "mc",
          "id": "Q3",
          "label": "Example multiple choice question.",
          "optional": false,
          "choices": [
            "Example choice 1.",
            "Example choice 2."
          ],
          "hasCommentBox": true,
          "commentBoxLabel": "Comment to the multiple choice question Q3."
        },
        {
          "questionType": "mc",
          "id": "Q4",
          "label": "Example multiple choice question.",
          "optional": false,
          "choices": [
            "Example 1.",
            "Example 2."
          ],
          "hasCommentBox": true,
          "commentBoxLabel": "To the multiple choice question Q3."
        }
      ]
    }
  }
```

## REACT_APP_end

The end page is the final page of the survey, which is displayed after users complete the survey and submit their responses.
The end page is configured using the `REACT_APP_end` block in the `config.json` file.

### Parameters

The `REACT_APP_homepage` block contains 3 elements.

- `title`: This element is used to show the title on the end page.
- `endMessage`: This element is used to show the last message below title on the end page.
- `redirectTimeout`: The end page stays for a certain duration and then the user is redirected to the homepage. You can configure the time user stays at the end page in miliseconds here.

### Visual Overview

<kbd>![End](/src/assets/documentation/end.png)</kbd>

### Sample Config

```json
  "REACT_APP_end": {
    "title": "",
    "endMessage": "Thank you for participating in our survey!",
    "redirectTimeout": 2500
  }
```

## REACT_APP_general

This component is a general component which configures various properties of the Huldra framework. This component is used to alter Huldra's behviour and working.

### Parameters

The `REACT_APP_general` block contains the following elements.

- `softwareInfoTag`: This tag serves the purpose of defining the software version or providing software information. The details specified here are prominently displayed in the generated JSON output file.
- `appName`: This tag is used to congigure the app name which is displayed on the header. (Refer to the visual overview under the header subsection here for better understanding.)
- `allowRevisitingAnswers`: This tag can take 2 values, i.e., True or False. Setting the value to False will not allow users to visit previous question.
- `allowProceedingWithoutAnswering`: This tag can take 2 values, i.e., True or False. Setting the value to True will let users move on to another question without answering it, basically making the questions optional to answer.
- `caseImageViewDetailsMandatory`: In _caseImage_ type survey question, there is a button where users can view more details about a particular image. With this tag it can be set if it is mandatory for user to view the details of the images or not. Set this value to True, if you want to make it mandatory for the user to view the details.
- `caseHybridViewDetailsMandatory`: In _caseHybrid_ type survey question, there is a button where users can view more details about a particular image. With this tag it can be set if it is mandatory for user to view the details of the images or not. Set this value to True, if you want to make it mandatory for the user to view the details.
- `caseOrder`: This parameter defines the order of the cases shown to the user. 

  #### Parameters

  - `cases:` This is where you write the list of cases (folder names in local/firebase directory) that you want to show to the user.
  - `shuffle:` This where you define if/how the cases should be shuffled when shown to the user. 

  **NB:** See [README.md](/README.md#case-order) for more details about `caseOrder`, `cases`, and shuffle.

- `outputJson`: This parameter defines what optional data is included in the output JSON file. It expects an array of strings. The following values are allowed: 'SoftwareInfo' and 'SessionEvents'. (Other required data is always included in the output JSON file, such as the survey questions and responses.)
- `color`: This element can be used to define the color scheme of the app. It has 2 subelements.

  #### Parameters

  - `themeColor:` Here you can define the theme color of the app, this is mostly observed at the header and footer of the app. The default themeColor is `blue`.
  - `buttonColor:` Here you can define the color of buttons in the app. The default buttonColor is `yellow`.
  
  **NB:** Supported values are `blue`, `green`, `orange`, `purple`, `teal`, and `yellow` (you can pick from the following lists of colors only):

  - 'blue': $\color{#38c3f2}{■}$ (#38c3f2)
  - 'green': $\color{#6db784}{■}$ (#6db784);
  - 'orange': $\color{#eb6b40}{■}$ (#eb6b40);
  - 'purple': $\color{#9b45b2}{■}$ (#9b45b2);
  - 'teal': $\color{#2b6777}{■}$ (#2b6777);
  - 'yellow': $\color{#f9e45b}{■}$ (#f9e45b);

- `footer`:

  The footer component is common to all pages in the survey (except warning page).
  The footer is configured using the `footer` block under `REACT_APP_general` in the `config.json` file.

  #### Parameters

  The `footer` block contains 5 elements.

  - `icon1ClassName`: The first icon dsplayed on the footer can be configured with this element. The icon class is generated through font awesome which is a toolkit that provides scalable vector icons.
  - `icon2ClassName`: The second icon dsplayed on the footer can be configured with this element. The icon class is generated through font awesome which is a toolkit that provides scalable vector icons.
  - `icon1Url`: The URL that a user will be redirected when clicked on first icon is defined here.
  - `icon2Url`: The URL that a user will be redirected when clicked on second icon is defined here.
  - `label`: The text between two icons can be configured here.

  #### Visual Overview

<kbd>![Footer](/src/assets/documentation/footer.png)</kbd>

- #### `header`

  The header component is common to all pages in the survey (except warning page, homepage, registration page, and end page).
  The header is configured using the `header` block under `REACT_APP_general` in the `config.json` file.

  #### Parameters

  The `header` block contains 4 elements.

  - `labelBackground`: This element is used to configure the title of the header on the Background page.
  - `labelDemonstration`: This element is used to configure the title of the header on the Demonstration page.
  - `labelCase`: This element is used to configure the title of the header on the cases pages.
  - `labelSummaryAndFeedback`: This element is used to configure the title of the header on the Summary and Feedback page.

  #### Visual Overview

<kbd>![Header (Background)](/src/assets/documentation/header_background.png)</kbd>
<kbd>![Header (Demonstration)](/src/assets/documentation/header_demonstration.png)</kbd>
<kbd>![Header (Case)](/src/assets/documentation/header_case.png)</kbd>
<kbd>![Header (Summary and Feedback)](/src/assets/documentation/header_summaryAndFeedback.png)</kbd>

### Sample Config

```

     "REACT_APP_general": {
    "softwareInfoTag": "NA (Development)",
    "appName": "MyApp",
    "allowRevisitingAnswers": true,
    "allowProceedingWithoutAnswering": true,
    "caseImageViewDetailsMandatory": true,
    "caseHybridViewDetailsMandatory": true,
    "caseOrder": {
      "cases": [],
      "shuffle": "categorized"
    },
    "outputJson": [
      "SoftwareInfo",
      "SessionEvents"
    ],
    "color": {
      "themeColor": "blue",
      "buttonColor": "yellow"
    },
    "footer": {
      "icon1ClassName": "fa fa-envelope-o mr-1 fa-lg generic-icon",
      "icon2ClassName": "fa fa-github ml-1 fa-lg generic-icon",
      "icon1Url": "mailto:me@mulo.no",
      "icon2Url": "https://github.com",
      "label": "me@smulo.no"
    },
    "header": {
      "labelBackground": "Background",
      "labelDemonstration": "Demonstration",
      "labelCase": "Questionnaire",
      "labelSummaryAndFeedback": "Summary and Feedback"
    }
```
