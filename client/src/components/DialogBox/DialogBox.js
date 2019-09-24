import "./DialogBox.scss";

import { Button, Modal } from "react-bootstrap";
import React, { Component } from "react";

import PropTypes from "prop-types";
import { isEmpty } from "lodash";

const modalStyles = {
  display: "flex",
  alignItems: "center"
};

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
  // const DialogBox = props => {
  constructor(props) {
    super(props);
    this.state = {
      confirmButtonDisable: false,
      choices: 1
    };
  }
  initialState = props => {
    const { data, edit, create } = props;
    let val = data.values ? data.values : [];
    const values = create ? [...data] : [...val],
      id = data.id;
    let confirmButtonDisable = false;
    this.clearPrevious(values, create);
    if (create) {
      confirmButtonDisable = true;
    }
    if (edit) {
      values.push({
        key: "new_choice",
        type: "choice",
        title: "Choose new choice",
        value: "",
        editable: true,
        optional: true,
        key: "answers"
      });
    }
    this.setState({ data: values, edit, id, confirmButtonDisable });
  };
  clearPrevious = (data, createMethod) => {
    let choices = {},
      choiceLength = 1;
    data.map(item => {
      if (item.type === "text" && !item.editable) return;
      if (item.type === "options") {
        choiceLength = item.value.length;
        choices[item.title] = Array(choiceLength).fill("");
      }
      if (createMethod) {
        item.value =
          item.type === "options" ? Array(choiceLength).fill("") : "";
        item.error =
          item.type === "options" ? Array(choiceLength).fill(false) : false;
      }
    });
    this.setState({ choices });
  };
  componentDidMount = () => {
    this.initialState(this.props);
  };
  componentWillReceiveProps = props => {
    this.initialState(props);
  };

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
    // const confirmButtonDisable = this.validateValues();
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
                                      <div className="item-value">{option}</div>
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
                                          kay={`choice_content-${chice_index}${choice}`}
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
                              <div className="item-value">
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
                        return <div></div>;
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
                disabled={confirmButtonDisable}
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
  messageHeader: PropTypes.string,
  messageNote: PropTypes.string,
  messageTitle: PropTypes.string,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  showMessage: PropTypes.bool
};

DialogBox.defaultProps = {
  cancelButtonValue: "CANCEL",
  data: {},
  confirmButtonValue: "",
  isConfirmation: false,
  messageDescription: "",
  messageHeader: "",
  messageNote: "",
  messageTitle: "",
  showMessage: false
};

export default DialogBox;
