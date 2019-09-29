import "./DialogBox.scss";

import { Button, Modal } from "react-bootstrap";
import React, { Component } from "react";

import PropTypes from "prop-types";
import { isEmpty } from "lodash";

import { getChoices } from "../List/utility";

const modalStyles = {
  display: "flex",
  alignItems: "center"
};
/**
 * This component contains few features.
 * 1. Allow to show message in popup
 * 2. Allow CRUD operation in popup.
 *
 * Parameter and descriptions
 *    showMessage: true if it is messagebox.
 *    confirmButtonValue: Text value for confirmation.
 *    messageTitle: Title for message box.
 *    messageDescription: description for the message box.
 *    onConfirm: Function to call on confirmation button click.
 *    isConfirmation: Confirmation button is required or not. using this we can use as an alert box.
 *    title: Title for CRUD operation.
 *    messageBox: true if it is messagebox
 *    edit: true if it is edit in CRUD operation.
 *    create: true if it is create in CRUD operation.
 *    onDelete: Function to call on click on the remove button,
 *    removeMessage: Error message for remove.
 *    isRemove: true if it is delete in CRUD operation.
 *    cancelButtonValue: Cancel button text value
 *    messageNote: Detail message for messagebox
 *    onCancel: Func to call on cancel button
 *    data: Data for CRUD operation. xample is given below.
 *
 * example of data value for edit, view for MCQ question
 *    {
 *      id: "1",
 *      values: [
 *        {
 *          type: "text",
 *          title: "Game",
 *          value: "Desiging a argument"
 *        },
 *        {
 *          type: "text",
 *          title: "Level",
 *          value: "1"
 *        },
 *        {
 *          type: "text",
 *          title: "Question",
 *          value: "text question",
 *          multiline: true,
 *          editable: true
 *        },
 *        {
 *          type: "options",
 *          title: "answers",
 *          value: ["test1", "test2", "test3", "test4"]
 *        },
 *        {
 *          type: "choice",
 *          title: "Current choice",
 *          value: "B",
 *          key: "answers" // same as options title
 *        }
 *      ]
 *    }
 * example of data value to add MCQ question
 *    fields = [
 *      {
 *        type: "text",
 *        title: "Game",
 *        value: "Desiging a argument"
 *      },
 *      {
 *        type: "text",
 *        title: "Level",
 *        value: "1"
 *      },
 *      {
 *        type: "text",
 *        title: "Question",
 *        multiline: true,
 *        editable: true,
 *        value: ""
 *      },
 *      {
 *        type: "options",
 *        title: "answers",
 *        value: ["", "", "", ""]
 *      },
 *      {
 *        type: "choice",
 *        title: "Correct choice",
 *        value: "",
 *        editable: true,
 *        key: "answers" // same as options title
 *      }
 *    ];
 *
 */

/**
 * Functional component to display user confirmation or
 * warning messages.
 * cancelButtonType and confirmButtonType
 * supports four types of colors - primary, secondary, warning
 * and success
 * @function DialogBox
 * @param {props} - Component props
 * @returns {JSX.Element} - Rendered Component
 */
class DialogBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmButtonDisable: false,
      choices: 1,
      data: []
    };
  }
  initialState = props => {
    debugger;
    const { data, edit, create, hasChoices = true } = props;
    let val = data.values ? data.values : [];
    const values = create ? [...data] : [...val],
      id = data.id;
    let confirmButtonDisable = false;
    this.clearPrevious(values, create, edit, hasChoices);
    if (create) {
      confirmButtonDisable = true;
    }

    this.setState({ edit, id, confirmButtonDisable, hasChoices });
  };
  clearPrevious = (data, createMethod, edit, hasChoices = true) => {
    let choices = {},
      choiceLength = 1;
    let values = data;
    data.map(item => {
      if (item.type === "text" && !item.editable) return;
      if (item.type === "options") {
        choiceLength = item.value.length;
        choices[item.title] = Array(choiceLength).fill("");
        if (edit && hasChoices) {
          values.push({
            type: "choice",
            title: "Choose new choice",
            value: "",
            editable: true,
            optional: true,
            key: item.title
          });
        }
      }
      if (createMethod) {
        item.value =
          item.type === "options" ? Array(choiceLength).fill("") : "";
        item.error =
          item.type === "options" ? Array(choiceLength).fill(false) : false;
      }
    });
    this.setState({ choices, data: values });
  };
  componentDidMount = () => {
    this.initialState(this.props);
  };
  componentWillReceiveProps = props => {
    this.initialState(props);
  };

  /**
   * Covert index value to alphabets. A B C etc.
   */
  convertChoice = value => {
    return String.fromCharCode(value + 65);
  };
  onConfirm = () => {
    const { edit, create, onConfirm } = this.props;
    const { data, id } = this.state;
    if (edit || create) {
      const value = {};
      data.map(item => {
        value[item.key] = item.value;
      });
      onConfirm(value, id);
    } else {
      onConfirm();
    }
  };

  validateValues = () => {
    const { data } = this.state;
    let confirmButtonDisable = false;
    data.map(item => {
      if (item.optional) {
        return;
      }
      if (item.type === "options") {
        item.value.map(arr => {
          if (arr.trim() === "") confirmButtonDisable = true;
        });
      } else {
        if (item.value.toString().trim() === "") confirmButtonDisable = true;
      }
    });
    return confirmButtonDisable;
  };

  valueChange = (value, title, index = 0) => {
    const { data } = this.state;

    data.map(item => {
      if (item.title === title) {
        if (item.type === "options") {
          item.value[index] = value;
          item.error = item.error ? item.error : [false, false, false, false];
          item.error[index] = isEmpty(value) ? true : false;
        } else {
          item.value = value;
          item["error"] = isEmpty(value) ? true : false;
        }
      }
    });
    this.setState({ data, confirmButtonDisable: this.validateValues() });
  };

  // Add and remove choice functionality for future. Few edge cases need to be integrate
  // addOption = title => {
  //   const { data, choices } = this.state;
  //   data.map(item => {
  //     if (item.title === title) {
  //       choices[item.title].push("");
  //       item.value.push("");
  //     }
  //   });
  //   this.setState({ data, choices });
  //   console.log("Add item");
  // };
  // removeOption = (title, index) => {
  //   const { data, choices } = this.state;
  //   data.map(item => {
  //     if (item.title === title) {
  //       choices[item.title].splice(index, 1);
  //       item.value.splice(index, 1);
  //     }
  //   });
  //   this.setState({ data, choices });
  //   console.log("Remove item" + index);
  // };

  // Add Scenario Based Question

  setChoicesForSelectedQuestion = choices => {
    const { data } = this.state;

    data.map(item => {
      if (item.key === "previous_question_choice") {
        item.options = choices.map(choice => {
          return { id: choice.id, title: choice.choicestatement };
        });
        item.options.unshift({ id: "", title: "Select Choice" });
      }
    });
    this.setState({ data });
  };

  handleChangeQuestion(e) {
    let fieldName = e.target.name;
    if (fieldName === "previous_question") {
      let questionId = e.target.value;
      getChoices(questionId, null, this.setChoicesForSelectedQuestion);
    }
  }
  // --Add Scenario Based Question

  render() {
    const {
        cancelButtonValue,
        confirmButtonValue,
        isConfirmation,
        messageDescription,
        messageNote,
        messageTitle,
        onCancel,
        showMessage,
        title,
        messageBox,
        create,
        onDelete,
        removeMessage,
        isRemove
      } = this.props,
      { data, edit, confirmButtonDisable, choices } = this.state;
    return (
      <div data-test="component-message-dialog">
        <Modal
          show={showMessage}
          style={modalStyles}
          className={`message-dialog ${
            messageBox ? "message-dialog-message" : "message-dialog-data"
          }`}
        >
          <Modal.Header className="dialog-header">
            <div>{title}</div>
            <div onClick={onCancel}>X</div>
          </Modal.Header>
          <Modal.Body className="dialog-body">
            {messageBox ? (
              <div>
                {messageTitle && (
                  <div className="dialog-title">{messageTitle}</div>
                )}
                <div className="dialog-message">{messageDescription}</div>
                {messageNote && (
                  <div className="dialog-note">{messageNote}</div>
                )}
              </div>
            ) : (
              <div>
                {!isEmpty(data) &&
                  data.map((object, index) => {
                    switch (object.type) {
                      case "dropdown":
                        return (
                          <div
                            key={`dropdown_${index}`}
                            className="dialog-content"
                          >
                            <div className="item-title">{object.title}</div>
                            <div className="item-separator">:</div>
                            <div className="item-value">
                              <select
                                value={object.value}
                                name={object.key}
                                disabled={
                                  !((edit || create) && object.editable)
                                }
                                className="dropdown-list"
                                onChange={e => {
                                  (edit || create) &&
                                    object.editable &&
                                    this.valueChange(
                                      e.target.value,
                                      object.title
                                    );
                                  this.handleChangeQuestion(e);
                                }}
                              >
                                {object.options.map((option, option_index) => {
                                  return (
                                    <option
                                      key={option_index + option}
                                      value={option.id}
                                    >
                                      {option.title}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                          </div>
                        );
                      case "options":
                        return (
                          <div
                            key={`options_${index}`}
                            className="dialog-content dialog-options"
                          >
                            <div>
                              <div className="item-title">Choice/Option</div>
                            </div>
                            <div>
                              {object.value.map((option, option_index) => {
                                return (
                                  <div key={`options_content_${option_index}`}>
                                    <div className="item-title option-title">
                                      {this.convertChoice(option_index)}
                                    </div>
                                    <div className="item-separator">: </div>
                                    {create || edit ? (
                                      <div className="item-value option-value">
                                        <input
                                          type="text"
                                          name=""
                                          className={
                                            object.error &&
                                            object.error[option_index]
                                              ? "error"
                                              : ""
                                          }
                                          value={option}
                                          onChange={e =>
                                            this.valueChange(
                                              e.target.value,
                                              object.title,
                                              option_index
                                            )
                                          }
                                        />
                                      </div>
                                    ) : (
                                      <div
                                        key={`options_content_${option_index}`}
                                        className="item-value"
                                      >
                                        {option}
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      case "choice":
                        return (
                          <div key={`choices_${index}`}>
                            <div className="dialog-content">
                              <div className="item-title">{object.title}</div>
                              <div className="item-separator">:</div>
                              <div className="choices item-value">
                                {choices &&
                                  choices[object.key].map(
                                    (choice, chice_index) => {
                                      return (
                                        <div
                                          key={`choice_content-${chice_index}${choice}`}
                                          className={
                                            object.value ===
                                            this.convertChoice(chice_index)
                                              ? "selected"
                                              : "unselected"
                                          }
                                          onClick={() =>
                                            object.editable &&
                                            this.valueChange(
                                              this.convertChoice(chice_index),
                                              object.title
                                            )
                                          }
                                        >
                                          {this.convertChoice(chice_index)}
                                        </div>
                                      );
                                    }
                                  )}
                              </div>
                            </div>
                          </div>
                        );
                      case "text":
                        return (edit || create) && object.editable ? (
                          <div key={`text_${index}`} className="dialog-content">
                            <div className="item-title">{object.title}</div>
                            <div className="item-separator">:</div>
                            {object.multiline ? (
                              <div className="item-value">
                                <textarea
                                  cols="30"
                                  name={object.title}
                                  className={
                                    object.error
                                      ? "error dialog-multiline-text"
                                      : "dialog-multiline-text"
                                  }
                                  value={object.value}
                                  onChange={e =>
                                    this.valueChange(
                                      e.target.value,
                                      object.title
                                    )
                                  }
                                />
                              </div>
                            ) : (
                              <div
                                key={`textbox_${index}`}
                                className="item-value"
                              >
                                <input
                                  type="text"
                                  name="object.title"
                                  value={object.value}
                                  className={object.error ? "error" : ""}
                                  onChange={e =>
                                    this.valueChange(
                                      e.target.value,
                                      object.title
                                    )
                                  }
                                />
                              </div>
                            )}
                          </div>
                        ) : (
                          <div
                            key={`content_view_${index}`}
                            className="dialog-content"
                          >
                            <div className="item-title">{object.title}</div>
                            <div className="item-separator">:</div>
                            <div className="item-value">{object.value}</div>
                          </div>
                        );
                      default:
                        return <div key={`default_${index}`}></div>;
                    }
                  })}
                {removeMessage && (
                  <div>
                    <p className="remove-message">{removeMessage}</p>
                  </div>
                )}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer className="dialog-footer">
            {!isEmpty(confirmButtonValue) && (
              <Button
                className={`dialog-btn ${isRemove ? "btn-danger" : "confirm"}`}
                // disabled={confirmButtonDisable}
                onClick={this.onConfirm}
              >
                {confirmButtonValue}
              </Button>
            )}
            {onDelete && !removeMessage && (
              <Button className="dialog-btn btn-danger" onClick={onDelete}>
                Remove Question
              </Button>
            )}
            {isConfirmation && (
              <Button className={`dialog-btn cancel`} onClick={onCancel}>
                {cancelButtonValue}
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

DialogBox.propTypes = {
  data: PropTypes.object,
  cancelButtonValue: PropTypes.string,
  confirmButtonValue: PropTypes.string.isRequired,
  isConfirmation: PropTypes.bool,
  messageDescription: PropTypes.string,
  messageNote: PropTypes.string,
  messageTitle: PropTypes.string,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  showMessage: PropTypes.bool,
  onDelete: PropTypes.func,
  title: PropTypes.string,
  messageBox: PropTypes.bool,
  edit: PropTypes.bool,
  create: PropTypes.bool,
  removeMessage: PropTypes.string,
  isRemove: PropTypes.bool
};

DialogBox.defaultProps = {
  cancelButtonValue: "CANCEL",
  data: {},
  confirmButtonValue: "",
  isConfirmation: false,
  messageDescription: "",
  messageNote: "",
  messageTitle: "",
  showMessage: false,
  title: "",
  messageBox: false,
  edit: false,
  create: false,
  removeMessage: "",
  isRemove: false
};

export default DialogBox;
