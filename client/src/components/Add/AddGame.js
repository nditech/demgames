import React, { useState } from "react";
import { connect } from "react-redux";

const AddGame = () => {
  const initialState = {
    caption: "",
    gamedescription: "",
    gametype: "multiplechoice",
  };

  const [formData, setFormData] = useState(initialState);

  const { caption, gamedescription, gametype } = formData;

  const handleReset = event => {
    event.preventDefault();
    setFormData(initialState);
  };

  const handleChange = event => {
    const val = event.target.value;
    const fieldName = event.target.name;

    if (fieldName === "gametype") {
      if (val === "multiplechoice") {
        setFormData({ ...formData, gametype: val });
      }
      if (val === "matching") {
        setFormData({ ...formData, gametype: val });
      }
      if (val === "truefalse") {
        setFormData({ ...formData, gametype: val });
      }
      if (val === "fillin") {
        setFormData({ ...formData, gametype: val });
      }
    } else {
      setFormData({ ...formData, [fieldName]: val });
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
  };

  return (
    <div className="container App">
      <div className="row">
        <div className="col-md-2" />
        <div className="col-md-8">
          <form className="mt-5" onSubmit={e => handleSubmit(e)}>
            <input
              className="form-control mb-1"
              placeholder="Caption"
              type="text"
              name="caption"
              value={caption}
              onChange={e => handleChange(e)}
            />{" "}
            <br />
            <textarea
              className="form-control mb-1"
              placeholder="Game Description"
              type="text"
              name="gamedescription"
              value={gamedescription}
              onChange={e => handleChange(e)}
             />
            <div className="row">
              <div className="form-group col-md-12">
                <label className="form-label">Game type</label>
                <select
                  className="form-control custom-select custom-select-sm"
                  name="gametype"
                  value={gametype}
                  onChange={e => handleChange(e)}
                >
                  <option value="multiplechoice">Multiple choice</option>
                  <option value="matching">Matching</option>
                  <option value="truefalse">True or False</option>
                  <option value="fillin">Fill in</option>
                </select>
              </div>
            </div>
            <div className="text-center mt-12">
              <button className="btn btn-info" type="submit">
                Save
              </button>{" "}
              |{" "}
              <button
                className="btn btn-warning"
                type="button"
                onClick={e => handleReset(e)}
              >
                Reset
              </button>
            </div>
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
)(AddGame);
