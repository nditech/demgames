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
      confirmButtonDisable: false
    };
  }
  initialState = props => {
    const { data, edit, create } = props;

    const values = create ? data : data.values,
      id = data.id;
    let confirmButtonDisable = false;
    if (create) {
      confirmButtonDisable = true;
    }
    if (edit) {
      values.push({
        key: "new_choice",
        type: "choice",
        title: "Choose new choice",
        value: "",
        editable: true
      });
    }
    this.setState({ data: values, edit, id, confirmButtonDisable });
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
  valueChange = (value, title, index = 0) => {
    const { data } = this.state;
    data.map(item => {
      if (item.title === title) {
        item.type === "options"
          ? (item.value[index] = value)
          : (item.value = value);
        if (isEmpty(value)) {
          item.type === "options"
            ? (item["error"] = true)
            : (item["error"] = true);
        } else {
          item["error"] = false;
        }
      }
    });
    this.setState({ data, confirmButtonDisable: isEmpty(value) });
  };
  render() {
    const {
        bsSize,
        cancelButtonType,
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
        removeMessage
      } = this.props,
      { data, edit, confirmButtonDisable } = this.state;
    return (
      <div data-test="component-message-dialog">
        <Modal
          show={showMessage}
          style={modalStyles}
          className="message-dialog"
          bsSize={bsSize}
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
                            key={index}
                            className="dialog-content dialog-options"
                          >
                            <div>
                              <div>Choice/Option</div>
                            </div>
                            <div>
                              {object.value.map((option, option_index) => {
                                return (
                                  <div key={option_index}>
                                    {this.convertChoice(option_index)} :
                                    {create || edit ? (
                                      <input
                                        type="text"
                                        name=""
                                        value={option}
                                        onChange={e =>
                                          this.valueChange(
                                            e.target.value,
                                            object.title,
                                            option_index
                                          )
                                        }
                                      />
                                    ) : (
                                      <div>{option}</div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      case "choice":
                        return (
                          <div key={index}>
                            <div className="dialog-content">
                              {object.title} :
                              <div className="choices">
                                <div
                                  className={
                                    object.value === "A"
                                      ? "selected"
                                      : "unselected"
                                  }
                                  onClick={() =>
                                    object.editable &&
                                    this.valueChange("A", object.title)
                                  }
                                >
                                  A
                                </div>
                                <div
                                  className={
                                    object.value === "B"
                                      ? "selected"
                                      : "unselected"
                                  }
                                  onClick={() =>
                                    object.editable &&
                                    this.valueChange("B", object.title)
                                  }
                                >
                                  B
                                </div>
                                <div
                                  className={
                                    object.value === "C"
                                      ? "selected"
                                      : "unselected"
                                  }
                                  onClick={() =>
                                    object.editable &&
                                    this.valueChange("C", object.title)
                                  }
                                >
                                  C
                                </div>
                                <div
                                  className={
                                    object.value === "D"
                                      ? "selected"
                                      : "unselected"
                                  }
                                  onClick={() =>
                                    object.editable &&
                                    this.valueChange("D", object.title)
                                  }
                                >
                                  D
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      case "text":
                        return (edit || create) && object.editable ? (
                          <div key={index} className="dialog-content">
                            {object.title} :
                            {object.multiline ? (
                              <textarea
                                name={object.title}
                                className="dialog-multiline-text"
                                value={object.value}
                                onChange={e =>
                                  this.valueChange(e.target.value, object.title)
                                }
                              />
                            ) : (
                              <input
                                type="text"
                                name="object.title"
                                value={object.value}
                                onChange={e =>
                                  this.valueChange(e.target.value, object.title)
                                }
                              />
                            )}
                          </div>
                        ) : (
                          <div key={index} className="dialog-content">
                            {object.title} : {object.value}
                          </div>
                        );
                      default:
                        return <div></div>;
                    }
                  })}
                {removeMessage && <div>{removeMessage}</div>}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer className="dialog-footer">
            {!isEmpty(confirmButtonValue) && (
              <Button
                className="dialog-btn confirm"
                disabled={confirmButtonDisable}
                onClick={this.onConfirm}
              >
                {confirmButtonValue}
              </Button>
            )}
            {onDelete && (
              <Button className="dialog-btn confirm" onClick={onDelete}>
                Remove Question
              </Button>
            )}
            {isConfirmation && (
              <Button
                className={`dialog-btn cancel ${cancelButtonType}`}
                onClick={onCancel}
              >
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
  bsSize: PropTypes.string,
  data: PropTypes.object,
  cancelButtonType: PropTypes.string,
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
  bsSize: "sm",
  cancelButtonType: "",
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
