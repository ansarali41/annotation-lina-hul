import React, { useCallback, useEffect, useRef, useState } from "react";

const TextHighlight = ({ className, title, text, textClassName, isConvertNewLine }) => {
  const [showNavMenu, setShowNavMenu] = useState(false);
  const [showEditMenu, setShowEditMenu] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const [SectionTitle, setSectionTitle] = useState(title);
  const [SectionText, setSectionText] = useState(text);

  // Load previously highlighted text from session storage
  const [savedHighlights, setSavedHighlights] = useState(() => {
    const storedHighlights = localStorage.getItem("highlightedComments");
    return JSON.parse(storedHighlights) || [];
  });
  const inputRef = useRef(null);
  const editInputRef = useRef(null);

  let deleteButton;
  let editButton;

  const handleMouseOver = (event) => {
    const hoveredElement = event.target;

    // Check if the hovered element has the class "highlighted-text"
    if (hoveredElement.classList.contains("highlighted-text")) {
      const hoveredText = hoveredElement.innerText.trim();
      const ID = hoveredElement.id;

      if (deleteButton) {
        deleteButton.remove();
        deleteButton = null;
      }
      if (editButton) {
        editButton.remove();
        editButton = null;
      }
      // Check if the delete button already exists
      if (!deleteButton && !showEditMenu) {
        deleteButton = document.createElement("span");
        // deleteButton.className = "highlighted-text-delete-btn";
        deleteButton.innerText = "Delete";
        deleteButton.style.fontSize = "12px";
        deleteButton.style.padding = "5px";
        deleteButton.style.borderRadius = "10px";
        deleteButton.style.color = "#fff";
        deleteButton.style.background = "#ffc107";
        deleteButton.style.borderColor = "#ffc107";
        deleteButton.style.cursor = "pointer";
        deleteButton.style.setProperty("position", "absolute", "important");
        deleteButton.style.marginTop = "-24px";
        deleteButton.style.marginLeft = "0px";
        deleteButton.addEventListener("click", () => handleDelete(hoveredText, deleteButton, ID));

        // Insert the delete button before the hovered element
        hoveredElement.insertAdjacentElement("beforebegin", deleteButton);

        // Create the edit button
        editButton = document.createElement("span");
        editButton.innerText = "Edit";
        editButton.style.fontSize = "12px";
        editButton.style.padding = "5px";
        editButton.style.borderRadius = "10px";
        editButton.style.color = "#fff";
        editButton.style.background = "#28a745";
        editButton.style.borderColor = "#28a745";
        editButton.style.cursor = "pointer";
        editButton.style.setProperty("position", "absolute", "important");
        editButton.style.marginTop = "-24px";
        editButton.style.marginLeft = "50px"; // Adjust the margin as needed
        editButton.addEventListener("click", () => handleEditModal(event, ID));

        // Insert the buttons before the hovered element
        hoveredElement.insertAdjacentElement("beforebegin", editButton);
        setTimeout(() => {
          if (deleteButton) {
            deleteButton.remove();
            deleteButton = null;
          }
          if (editButton) {
            editButton.remove();
            editButton = null;
          }
        }, 2500);
      }
    }
  };

  const handleDelete = (text, deleteButton, id) => {
    if (deleteButton) {
      deleteButton.remove();
      deleteButton = null;
    }

    if (editButton) {
      editButton.remove();
      editButton = null; // Reset the editButton variable
    }

    // Find the index of the comment with the given id
    const indexToDelete = savedHighlights.findIndex((comment) => comment.id == id);

    // Remove the comment from the array if found
    if (indexToDelete !== -1) {
      const updatedComments = [...savedHighlights];
      updatedComments.splice(indexToDelete, 1);

      // Update the local storage and state
      localStorage.setItem("highlightedComments", JSON.stringify(updatedComments));
      setSavedHighlights(updatedComments);
    }
  };
  // delete end

  // edit modal handle start
  const handleEditModal = (event, ID) => {
    // Remove the buttons immediately
    if (deleteButton) {
      deleteButton.remove();
      deleteButton = null; // Reset the deleteButton variable
    }

    if (editButton) {
      editButton.remove();
      editButton = null; // Reset the editButton variable
    }

    if (ID) {
      setShowEditMenu(true);
      const editMenu = document.querySelector(".edit-menu");
      editMenu.style.position = "absolute";
      editMenu.style.left = `${event.clientX}px`;
      editMenu.style.top = `${event.clientY}px`;
      editMenu.style.width = "170px";
      editMenu.style.padding = "20px";
      editInputRef.current.focus();
      editInputRef.current.value = savedHighlights.find((item) => item.id == ID).comment;
      editInputRef.current.ID = ID;
    }
  };

  const handleEditHighlight = (editedComment, ID) => {
    setSavedHighlights((prevHighlights) => {
      // Find the index of the item to edit
      const indexToEdit = prevHighlights.findIndex((item) => item.id == ID);

      // If the item is found, update its text property
      if (indexToEdit !== -1) {
        const updatedHighlights = [...prevHighlights];
        updatedHighlights[indexToEdit] = {
          ...updatedHighlights[indexToEdit],
          comment: editedComment,
        };

        return updatedHighlights;
      }
      return prevHighlights;
    });

    localStorage.setItem("highlightedComments", JSON.stringify(savedHighlights));
    setShowEditMenu(false);
  };
  // edit modal handle end

  useEffect(() => {
    const handleClick = (event) => {
      setShowNavMenu(false);
    };
    const handleEditModal = (event) => {
      setShowEditMenu(false);
    };

    // Attach the click event listener to the window
    window.addEventListener("click", handleClick);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("click", handleClick);
      window.removeEventListener("click", handleEditModal);
    };
  }, []);

  // Function to convert newlines to <br> tags
  const convertNewlinesToBreaks = (text) => {
    return text
      .split("\n")
      .map((line, index, array) => {
        // Check if the current line is the last line in the array
        const isLastLine = index === array.length - 1;

        // Check if the line already contains the highlighted-text class
        const containsHighlightedText = /class="highlighted-text"/.test(line);

        // If the line contains the class, don't add <br>
        return containsHighlightedText ? line : line + (isLastLine ? "" : "<br />");
      })
      .join("");
  };
  const replaceWithSpan = useCallback((text, regex, index, comment, id) => {
    let result = text;
    let match;
    while ((match = regex.exec(text)) !== null) {
      const matchedText = match[0];

      // Check if the current match has already been replaced
      if (!result.includes(`key="${index}"`)) {
        const span = `<span key="${index}" class="highlighted-text" id="${id}" title="${comment}">
           ${matchedText}</span>`;
        result = result.replace(matchedText, span);
      }
    }
    return result;
  }, []);

  useEffect(() => {
    setSectionTitle(title);
    setSectionText(text);
    setShowNavMenu(false);

    if (savedHighlights?.length) {
      let updatedTextBefore = title;
      let updatedTextAfter = text;

      savedHighlights.forEach((highlight, index) => {
        // Check if the highlight is from the current page
        if (highlight.pageReference === window.location.pathname) {
          const regex = new RegExp(`(${highlight.text})`, "g");

          updatedTextBefore = replaceWithSpan(
            updatedTextBefore,
            regex,
            index,
            highlight.comment,
            highlight.id
          );
          updatedTextAfter = replaceWithSpan(
            updatedTextAfter,
            regex,
            index,
            highlight.comment,
            highlight.id
          );
        }
      });
      setSectionTitle(updatedTextBefore);
      setSectionText(updatedTextAfter);
    }
  }, [savedHighlights, text, title, replaceWithSpan]);

  const handleMouseUp = (event) => {
    const selected = window.getSelection().toString().trim();

    if (selected) {
      setSelectedText(selected);
      if (event.button === 2) {
        setShowNavMenu(true);
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const span = document.createElement("span");
        range.surroundContents(span);
        selection.removeAllRanges();
        selection.addRange(range);
        setTimeout(() => {
          const navMenu = document.querySelector(".nav-menu");
          navMenu.style.position = "absolute";
          navMenu.style.left = `${event.clientX}px`;
          navMenu.style.top = `${event.clientY}px`;
          navMenu.style.width = "170px";
          navMenu.style.padding = "20px";

          inputRef.current.focus();
        }, 0);
      } else {
        setShowNavMenu(false);
      }
    }
  };

  const handleHighlight = (comment) => {
    if (selectedText) {
      const highlightedComments = JSON.parse(localStorage.getItem("highlightedComments")) || [];
      // generate ID for the highlighted comment
      const lastHighlightedCommentId = highlightedComments[highlightedComments.length - 1]
        ? highlightedComments[highlightedComments.length - 1]?.id + 1
        : 1;
      document.querySelectorAll("span").forEach((element) => {
        if (element.innerText === selectedText) {
          element.className = "highlighted-text";
          element.title = comment || "";
          element.id = lastHighlightedCommentId || "";
        }
      });

      highlightedComments.push({
        id: lastHighlightedCommentId,
        text: selectedText,
        comment: comment,
        pageReference: window.location.pathname,
        timestamp: new Date().getTime(),
      });
      localStorage.setItem("highlightedComments", JSON.stringify(highlightedComments));
      setSavedHighlights(highlightedComments);

      setShowNavMenu(false);
    }
  };

  return (
    <div
      className={className}
      onContextMenu={(e) => e.preventDefault()}
      onMouseUp={handleMouseUp}
      onMouseOver={(e) => handleMouseOver(e)}
    >
      <h4 dangerouslySetInnerHTML={{ __html: SectionTitle }}>{}</h4>
      <p
        className={textClassName}
        dangerouslySetInnerHTML={
          isConvertNewLine
            ? { __html: convertNewlinesToBreaks(SectionText) }
            : { __html: SectionText }
        }
      >
        {}
      </p>

      {showEditMenu && (
        <div className="edit-menu">
          <input
            type="text"
            placeholder="Edit the comment"
            className="form-control"
            ref={editInputRef}
          />
          <div
            className="row"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              paddingTop: "10px",
            }}
          >
            <button
              className="btn btn-primary"
              onClick={() =>
                handleEditHighlight(editInputRef.current.value, editInputRef.current.ID)
              }
            >
              Submit
            </button>
            <button className="btn btn-secondary" onClick={() => setShowEditMenu(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {showNavMenu && (
        <div className="nav-menu">
          <input type="text" placeholder="Add a comment" className="form-control" ref={inputRef} />
          <div
            className="row"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              paddingTop: "10px",
            }}
          >
            <button
              className="btn btn-primary"
              onClick={() => handleHighlight(inputRef.current.value)}
            >
              Submit
            </button>
            <button className="btn btn-secondary" onClick={() => setShowNavMenu(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextHighlight;
