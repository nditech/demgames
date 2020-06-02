import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Auth from "../../Auth";
import { config } from "../../settings";

const auth0 = new Auth();

const AddQuestion = () => {
  const initialState = {
    gameid: 1,
    gametype: "multiplechoice",
    difficulty_level: "1",
    question_statement: "",
    weight: "",
    explanation: "",
    isitmedia: "",
  };

  const [formData, setFormData] = useState(initialState);

  const {
    gameid,
    gametype,
    difficulty_level,
    question_statement,
    weight,
    explanation,
    isitmedia,
  } = formData;

  const reset = event => {
    setFormData(initialState);
  };

  const handleChange = event => {
    const val = event.target.value;
    const fieldName = event.target.name;

    if (fieldName === "gametype") {
      if (val === "multiplechoice") {
        setFormData({ ...formData, gameid: 1, gametype: val });
      }
      if (val === "matching") {
        setFormData({ ...formData, gameid: 2, gametype: val });
      }
      if (val === "truefalse") {
        setFormData({ ...formData, gameid: 3, gametype: val });
      }
      if (val === "fillin") {
        setFormData({ ...formData, gameid: 4, gametype: val });
      }
    } else {
      setFormData({ ...formData, [fieldName]: val });
    }

  };

  const handleSubmit = event => {
    event.preventDefault();

    fetch(`${config.baseUrl  }/addquestion`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${  auth0.getAccessToken()}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(res => res.json())
      .then(data => {
        alert("Question was successfully added");
      })
      .catch(error => console.log(error)); // eslint-disable-line
  };

  return (
    <div className="container App">
      <div className="row">
        <div className="col-md-2" />
        <div className="col-md-8">
          <form
            className="text-center border border-light p-5"
            onSubmit={e => handleSubmit(e)}
          >
            <label className="mr-3">
              Game type
              <select
                className="custom-select custom-select-sm"
                name="gametype"
                value={gametype}
                onChange={e => handleChange(e)}
              >
                <option defaultChecked value="multiplechoice">
                  Multiple Choice
                </option>
                <option value="matching">Matching</option>
                <option value="truefalse">True or False</option>
                <option value="fillin">Fill in</option>
              </select>
              <br />
            </label>
            <label>
              Difficulty Level
              <select
                className="custom-select custom-select-sm"
                name="difficulty_level"
                value={difficulty_level}
                onChange={e => handleChange(e)}
              >
                <option value="1">Very simple</option>
                <option value="2">Simple</option>
                <option defaultChecked value="3">
                  Normal/Regular
                </option>
                <option value="4">Difficult</option>
                <option value="5">Very difficult</option>
              </select>
              <br />
            </label>
            <input
              className="form-control mb-1"
              placeholder="Question Statement"
              type="text"
              name="question_statement"
              value={question_statement}
              onChange={e => handleChange(e)}
            />{" "}
            <br />
            <input
              className="form-control mb-1"
              placeholder="Weight"
              type="text"
              name="weight"
              value={weight}
              onChange={e => handleChange(e)}
            />{" "}
            <br />
            <textarea
              className="form-control mb-1"
              placeholder="Explanation"
              type="text"
              name="explanation"
              value={explanation}
              onChange={e => handleChange(e)}
             />
            <br />
            <input
              className="form-control mb-1"
              placeholder="is it media?"
              type="text"
              name="isitmedia"
              value={isitmedia}
              onChange={e => handleChange(e)}
            />{" "}
            <br />
            <button className="btn btn-info" type="submit">
              Save
            </button>{" "}
            |{" "}
            <button
              className="btn btn-warning"
              type="button"
              onClick={e => reset(e)}
            >
              Reset
            </button>
          </form>
        </div>
        <div className="col-md-2" />
      </div>
    </div>
  );
};

export default connect(
  null,
  {}
)(AddQuestion);
