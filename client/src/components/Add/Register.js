import React, { useState } from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import { setAlert } from '../../actions/alert';
import { countryList } from './countryList';
import { config } from "../../settings";
import Auth from '../../Auth';
import { alert } from "../Confirm/Confirm";

const auth0 = new Auth();

const Register = () => {
  const initialState = {
    firstName: "",
    middleName: "",
    lastName: "",
    userName: "",
    email: "",
    dateOfBirth: new Date(),
    gender: "Female",
    country: "Afghanistan",
    city: "",
    program: "M&E",
  };

  const [formData, setFormData] = useState(initialState);

  const {
    firstName,
    middleName,
    lastName,
    userName,
    email,
    dateOfBirth,
    gender,
    country,
    city,
    program,
  } = formData;

  const handleDate = date => setFormData({ ...formData, dateOfBirth: date });

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (event) => {
    event.preventDefault();

    const submitData = () => {
      const url = `${config.baseUrl}/registerplayer`;

      fetch(url, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${auth0.getAccessToken()}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((res) => (res.json()))
        .then((data) => { alert(data.message); }) // eslint-disable-line
        .catch((error) => console.log(error)); // eslint-disable-line
    };
    submitData();
  };

  const reset = (e) => {
    e.preventDefault();
    setFormData(initialState);
  };

  return (
    <div className=" container App">
      <div className="row">
        <div className="col-md-2" />
        <div className="col-md-8">
          <form className="text-center border border-info mt-3 mb-3 p-2" onSubmit={e => handleSubmit(e)}>
            <input type="text" name="firstName" value={firstName} onChange={e => handleChange(e)} className="form-control mb-1" placeholder="First Name" />
            <input type="text" name="middleName" value={middleName} onChange={e => handleChange(e)} className="form-control mb-1" placeholder="Middle Name" />
            <input type="text" name="lastName" value={lastName} onChange={e => handleChange(e)} className="form-control mb-1" placeholder="Last Name" />
            <input type="text" name="userName" value={userName} onChange={e => handleChange(e)} className="form-control mb-1" placeholder="Username" />
            <input type="text" name="email" value={email} onChange={e => handleChange(e)} className="form-control mb-1" placeholder="Email" />
            <div className="row">
              <div className="form-group col-md-12">
                <label htmlFor="gender-select" className="form-label">
                  <span>Gender: </span>
                  <select id="gender-select" className="custom-select custom-select-sm" name="gender" value={gender} onChange={e => handleChange(e)}>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                </label>
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-12">
                <div>Date of Birth:</div>
                <DatePicker className="form-control custom-select custom-select-sm" name="dateOfBirth" onChange={e => handleDate(e)} selected={dateOfBirth} isClearable placeholderText="MM/DD/YYYY" />
                {' '}
                <br />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-12">
                <label htmlFor="country-select" className="form-label">
                  <span>Country</span>
                  <select id="country-select" className="form-control custom-select custom-select-sm" name="country" value={country} onChange={e => handleChange(e)}>
                    {countryList.map((countryItem, index) => <option key={`${country}${index.toString()}`} value={countryItem.replace(' ', '')}>{country}</option>)}
                  </select>
                </label>
              </div>
            </div>
            <input type="text" name="city" value={city} onChange={e => handleChange(e)} className="form-control mb-1" placeholder="City" />
            <div className="row">
              <div className="form-group col-md-12">
                <label htmlFor="program-select" className="form-label">
                  <span>Program</span>
                  <select id="program-select" className="custom-select custom-select-sm" name="program" value={program} onChange={e => handleChange(e)}>
                    <option value="M&E">Monitoring & Evaluation</option>
                    <option value="Elections">Elections</option>
                    <option value="Governance">Governance</option>
                    <option value="GWD">Gender, Women & Democracy</option>
                  </select>
                </label>
              </div>
            </div>

            <button className="btn btn-info" type="submit">Save</button>
            {' '}
            |
            <button className="btn btn-warning" type="button" onClick={e => reset(e)}>Reset</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { setAlert })(Register);
