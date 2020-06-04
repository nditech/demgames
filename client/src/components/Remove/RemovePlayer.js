import React, { Component } from 'react';
import Auth from "../../Auth";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import { config } from "../../settings";

const auth0 = new Auth();


class RemovePlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      player: {
        player_id: null,
        email: null,
        given_name: null,
        middle_name: null,
        family_name: null,
        username: null,
        picture: null,
        gender: null,
        dateOfBirth: null,
        city: null,
        country: null,
        program: null,
      },
      search: {
        player_id: null,
        email: null,
        username: null,
      },
    };

    // this.getInitialState=this.getInitialState.bind(this);

    //       this.handleReset=this.handleReset.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.res = this.res.bind(this);
  }

  handleDate(date) {
    this.setState({
      player: {
        dateOfBirth: date,
      },
    });
  }

  handleChange(e) {
    e.preventDefault();
    const sc = e.target.value;

    switch (e.target.name) {
      case "given_name":
        this.setState({
          given_name: sc,
        });
        break;
      case "middle_name":
        this.setState({
          middle_name: sc,
        });
        break;
      case "family_name":
        this.setState({
          family_name: sc,
        });
        break;
      case "username":
        this.setState({
          username: sc,
        });
        break;
      case "gender":
        this.setState({
          gender: sc,
        });
        break;
      case "program":
        this.setState({
          program: sc,
        });
        break;
      case "city":
        this.setState({
          city: sc,
        });
        break;
      case "country":
        this.setState({
          country: sc,
        });
        break;
      default:
        break;
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const url = `${config.baseUrl}/deleteplayer`;
    fetch(url, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${auth0.getAccessToken()}`,
        "Content-Type": "Application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(this.state.player),
      mode: 'cors',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data === 200) {
          alert("Successful");
        }
      })
      .catch((error) => console.log(error));  // eslint-disable-line
  }

  res() {
    if (this.props.given_name !== 'undefined') return (this.props.given_name);
    return ('');
  }

  handleSearchChange(event) {
    event.preventDefault();

    switch (event.target.name) {
      case 'email':
        this.setState({
          search: {
            email: event.target.value,
          },
        });
        break;
      case 'username':
        this.setState({
          search: {
            username: event.target.value,
          },
        });
        break;
      case 'player_id':
        this.setState({
          search: {
            player_id: event.target.value,
          },
        });
        break;
      default:
    }
  }


  handleSearch() {
    fetch(`${config.baseUrl}/selectProfileforDel`, {
      method: 'post',
      headers: {
        authorization: `Bearer ${auth0.getAccessToken()}`,
        "Content-Type": "Application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(this.state.search),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'Not found') {
          alert("player with specified Id/Email/Username not found");
        } else {
          this.setState({
            player: {
              player_id: data[0].id,
              given_name: data[0].firstname,
              family_name: data[0].lastname,
              middle_name: data[0].middlename,
              username: data[0].username,
              gender: data[0].gender,
              dateOfBirth: moment(data[0].dateofbirth).format("MM/DD/YYYY") || null,
              city: data[0].city,
              country: data[0].country,
              program: data[0].program,
              email: data[0].email,
            },
          });
        }
      })
      .catch((error) => console.log(error)); // eslint-disable-line
  }

  handleReset() {
    this.setState({
      search: {
        player_id: '',
        username: '',
        email: '',
      },
    });
  }

  render() {
    return (
      <div>
        <form className="searchPlayer">
          <label htmlFor="player-id">
            Player id
            <input id="player-id" type="text" name="player_id" value={this.state.search.player_id} onChange={this.handleSearchChange} />
            {' '}
            <br />
          </label>
          <label htmlFor="username">
            User name
            <input id="username" type="text" name="username" value={this.state.search.username} onChange={this.handleSearchChange} />
            {' '}
            <br />
          </label>
          <label htmlFor="player-email">
            email
            <input id="player-id" type="text" name="email" value={this.state.search.email} onChange={this.handleSearchChange} />
            {' '}
            <br />
          </label>
          <label htmlFor="buttons">
            <input id="buttons" type="button" name="Delete" onClick={this.handleSearch} value="Search" />
            <input type="button" name="reset" onClick={this.handleReset} value="Reset" />
          </label>
        </form>
        <div>
          <form className="playerScore" onSubmit={this.handleSubmit}>
            <label htmlFor="player-id">
              Id
              <input id="player-id" type="text" name="player_id" value={this.state.player.player_id} onChange={this.handleChange} />
              {' '}
              <br />
            </label>
            <label htmlFor="firstname">
              First name
              <input id="firstname" type="text" name="given_name" value={this.state.player.given_name} onChange={this.handleChange} />
              {' '}
              <br />
            </label>
            <label htmlFor="middlename">
              Middle name
              <input id="middlename" type="text" name="middle_name" value={this.state.player.middle_name} onChange={this.handleChange} />
              {' '}
              <br />
            </label>
            <label htmlFor="familyname">
              Family name
              <input id="familyname" type="text" name="family_name" value={this.state.player.family_name} onChange={this.handleChange} />
              {' '}
              <br />
            </label>
            <label htmlFor="username">
              User name
              <input id="username" type="text" name="username" value={this.state.player.username} onChange={this.handleChange} />
              {' '}
              <br />
            </label>
            <label htmlFor="gender">
              Gender
              <input id="gender" type="text" name="gender" value={this.state.player.gender} onChange={this.handleChange} />
              {' '}
              <br />
            </label>
            <label htmlFor="program">
              Program
              <input id="program" type="text" name="program" value={this.state.player.program} onChange={this.handleChange} />
              {' '}
              <br />
            </label>
            <label>
              Date of Birth
              <DatePicker
                id="birth"
                name="dateOfBirth"
                value={this.state.player.dateOfBirth}
                isClearable
                dateFormat="MM/dd/yyyy"
              />
              <br />
            </label>
            <label htmlFor="city">
              City
              <input id="city" type="text" name="city" value={this.state.player.city} onChange={this.handleChange} />
              {' '}
              <br />
            </label>
            <label htmlFor="country">
              {' '}
              Country
              <select id="country" name="country" value={this.state.player.country} onChange={this.handleChange} defaultValue={this.state.player.country}>
                <option value="Afghanistan">Afghanistan</option>
                <option value="Albania">Albania</option>
                <option value="Algeria">Algeria</option>
                <option value="Andorra">Andorra</option>
                <option value="Angola">Angola</option>
                <option value="AntiguaandBarbuda">Antigua and Barbuda</option>
                <option value="Argentina">Argentina</option>
                <option value="Armenia">Armenia</option>
                <option value="Australia">Australia</option>
                <option value="Afghanistan">Afghanistan</option>
                <option value="Azerbaijan">Azerbaijan</option>
                <option value="Bahamas">Bahamas</option>
                <option value="Bahrain">Bahrain</option>
                <option value="Bangladesh">Bangladesh</option>
                <option value="Barbados">Barbados</option>
                <option value="Belarus">Belarus</option>
                <option value="Belgium">Belgium</option>
                <option value="Belize">Belize</option>
                <option value="Benin">Benin</option>
                <option value="Bhutan">Bhutan</option>
                <option value="Bolivia">Bolivia</option>
                <option value="BosniaandHerzegovina">Bosnia and Herzegovina</option>
                <option value="Botswana">Botswana</option>
                <option value="Brazil">Brazil</option>
                <option value="Brunei">Brunei</option>
                <option value="Bulgaria">Bulgaria</option>
                <option value="BurkinaFaso">Burkina Faso</option>
                <option value="Burundi">Burundi</option>
                <option value="CaboVerde">Cabo Verde</option>
                <option value="Cambodia">Cambodia</option>
                <option value="Cameroon">Cameroon</option>
                <option value="Canada">Canada</option>
                <option value="CentralAfricanRepublic">Central African Republic</option>
                <option value="Chad">Chad</option>
                <option value="Chile">Chile</option>
                <option value="China">China</option>
                <option value="Colombia">Colombia</option>
                <option value="Comoros">Comoros</option>
                <option value="Democratic Republic of the Congo">Congo, Democratic Republic of the</option>
                <option value="Republic of the Congo">Congo, Republic of the</option>
                <option value="CostaRica">Costa Rica</option>
                <option value="Côted’Ivoire">Côte d’Ivoire</option>
                <option value="Croatia">Croatia</option>
                <option value="Cuba">Cuba</option>
                <option value="Cyprus">Cyprus</option>
                <option value="CzechRepublic">Czech Republic</option>
                <option value="Denmark">Denmark</option>
                <option value="Djibouti">Djibouti</option>
                <option value="Dominica">Dominica</option>
                <option value="DominicanRepublic">Dominican Republic</option>
                <option value="EastTimor">East Timor</option>
                <option value="Ecuador">Ecuador</option>
                <option value="Egypt">Egypt</option>
                <option value="ElSalvador">El Salvador</option>
                <option value="EquatorialGuinea">Equatorial Guinea</option>
                <option value="Eritrea">Eritrea</option>
                <option value="Estonia">Estonia</option>
                <option value="Eswatini">Eswatini</option>
                <option value="Ethiopia">Ethiopia</option>
                <option value="Fiji">Fiji</option>
                <option value="Finland">Finland</option>
                <option value="France">France</option>
                <option value="Gabon">Gabon</option>
                <option value="Gambia">Gambia</option>
                <option value="Georgia">Georgia</option>
                <option value="Germany">Germany</option>
                <option value="Ghana">Ghana</option>
                <option value="Greece">Greece</option>
                <option value="Grenada">Grenada</option>
                <option value="Guatemala">Guatemala</option>
                <option value="Guinea">Guinea</option>
                <option value="GuineaBissau">Guinea-Bissau</option>
                <option value="Guyana">Guyana</option>
                <option value="Haiti">Haiti</option>
                <option value="Honduras">Honduras</option>
                <option value="Hungary">Hungary</option>
                <option value="Iceland">Iceland</option>
                <option value="India">India</option>
                <option value="Indonesia">Indonesia</option>
                <option value="Iran">Iran</option>
                <option value="Iraq">Iraq</option>
                <option value="Ireland">Ireland</option>
                <option value="Israel">Israel</option>
                <option value="Italy">Italy</option>
                <option value="Jamaica">Jamaica</option>
                <option value="Japan">Japan</option>
                <option value="Jordan">Jordan</option>
                <option value="Kazakhstan">Kazakhstan</option>
                <option value="Kenya">Kenya</option>
                <option value="Kiribati">Kiribati</option>
                <option value="NorthKorea">Korea, North</option>
                <option value="SouthKorea">Korea, North</option>
                <option value="Kosovo">Kosovo</option>
                <option value="Kuwait">Kuwait</option>
                <option value="Kyrgyzstan">Kyrgyzstan</option>
                <option value="Laos">Laos</option>
                <option value="Latvia">Latvia</option>
                <option value="Lebanon">Lebanon</option>
                <option value="Lesotho">Lesotho</option>
                <option value="Liberia">Liberia</option>
                <option value="Libya">Libya</option>
                <option value="Liechtenstein">Liechtenstein</option>
                <option value="Lithuania">Lithuania</option>
                <option value="Luxembourg">Luxembourg</option>
                <option value="Madagascar">Madagascar</option>
                <option value="Malawi">Malawi</option>
                <option value="Maldives">Maldives</option>
                <option value="Mali">Mali</option>
                <option value="Malta">Malta</option>
                <option value="MarshallIslands">Marshall Islands</option>
                <option value="Mauritania">Mauritania</option>
                <option value="Mauritius">Mauritius</option>
                <option value="Mexico">Mexico</option>
                <option value="Micronesia">Micronesia, Federated States of</option>
                <option value="Moldova">Moldova</option>
                <option value="Monaco">Monaco</option>
                <option value="Mongolia">Mongolia</option>
                <option value="Montenegro">Montenegro</option>
                <option value="Morocco">Morocco</option>
                <option value="Mozambique">Mozambique</option>
                <option value="Myanmar">Myanmar</option>
                <option value="Namibia">Namibia</option>
                <option value="Nauru">Nauru</option>
                <option value="Nepal">Nepal</option>
                <option value="Netherlands">Netherlands</option>
                <option value="NewZealand">New Zealand</option>
                <option value="Nicaragua">Nicaragua</option>
                <option value="Niger">Niger</option>
                <option value="Nigeria">Nigeria</option>
                <option value="NorthMacedonia">Macedonia, North</option>
                <option value="Norway">Norway</option>
                <option value="Oman">Oman</option>
                <option value="Pakistan">Pakistan</option>
                <option value="Palau">Palau</option>
                <option value="Panama">Panama</option>
                <option value="PapuaNewGuinea">Papua New Guinea</option>
                <option value="Paraguay">Paraguay</option>
                <option value="Peru">Peru</option>
                <option value="Philippines">Philippines</option>
                <option value="Poland">Poland</option>
                <option value="Portugal">Portugal</option>
                <option value="Qatar">Qatar</option>
                <option value="Romania">Romania</option>
                <option value="Russia">Russia</option>
                <option value="Rwanda">Rwanda</option>
                <option value="SaintKittsandNevis">Saint Kitts and Nevis</option>
                <option value="SaintLucia">Saint Lucia</option>
                <option value="SaintVincentandtheGrenadines">Saint Vincent and the Grenadines</option>
                <option value="Samoa">Samoa</option>
                <option value="SanMarino">San Marino</option>
                <option value="SaoTomeandPrincipe">Sao Tome and Principe</option>
                <option value="SaudiArabia">Saudi Arabia</option>
                <option value="Senegal">Senegal</option>
                <option value="Serbia">Serbia</option>
                <option value="Seychelles">Seychelles</option>
                <option value="SierraLeone">Sierra Leone</option>
                <option value="Singapore">Singapore</option>
                <option value="Slovakia">Slovakia</option>
                <option value="Slovenia">Slovenia</option>
                <option value="SolomonIslands">Solomon Islands</option>
                <option value="Somalia">Somalia</option>
                <option value="SouthAfrica">South Africa</option>
                <option value="Spain">Spain</option>
                <option value="SriLanka">Sri Lanka</option>
                <option value="Sudan">Sudan</option>
                <option value="SouthSudan">Sudan, South</option>
                <option value="Suriname">Suriname</option>
                <option value="Sweden">Sweden</option>
                <option value="Switzerland">Switzerland</option>
                <option value="Syria">Syria</option>
                <option value="Taiwan">Taiwan</option>
                <option value="Tajikistan">Tajikistan</option>
                <option value="Tanzania">Tanzania</option>
                <option value="Thailand">Thailand</option>
                <option value="Togo">Togo</option>
                <option value="Tonga">Tonga</option>
                <option value="TrinidadandTobago">Trinidad and Tobago</option>
                <option value="Tunisia">Tunisia</option>
                <option value="Turkey">Turkey</option>
                <option value="Turkmenistan">Turkmenistan</option>
                <option value="Tuvalu">Tuvalu</option>
                <option value="Uganda">Uganda</option>
                <option value="Ukraine">Ukraine</option>
                <option value="UnitedArabEmirates">United Arab Emirates</option>
                <option value="UnitedKingdom">United Kingdom</option>
                <option value="UnitedStates">United States</option>
                <option value="Uruguay">Uruguay</option>
                <option value="Uzbekistan">Uzbekistan</option>
                <option value="Vanuatu">Vanuatu</option>
                <option value="VaticanCity">Vatican City</option>
                <option value="Venezuela">Venezuela</option>
                <option value="Vietnam">Vietnam</option>
                <option value="Yemen">Yemen</option>
                <option value="Zambia">Zambia</option>
                <option value="Zimbabwe">Zimbabwe</option>
              </select>
              <br />
            </label>
            <label htmlFor="email">
              email
              <input id="email" type="text" name="email" value={this.state.player.email} onChange={this.handleChange} />
              {' '}
              <br />
            </label>
            <button type="submit">Delete user</button>
            <div>
              <button type="submit">Log out</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

// Dispatch action to fetch game data and scores.
const mapDispatchToProps = (dispatch) => ({
  setAuth: (authDetail) => dispatch(fetchAuthDetails(authDetail)),
  clearAuth: (authDetail) => dispatch(clearAuthDetails(authDetail)),
});

RemovePlayer.propTypes = {
  authDetail: PropTypes.shape({}).isRequired,
  given_name: PropTypes.string.isRequired,
};

export default connect(null, mapDispatchToProps)(RemovePlayer);
