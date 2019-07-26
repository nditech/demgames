import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
//import "react-datepicker/dist/react-datepicker.css";

class Register extends Component {
  
    constructor(props){
        super(props);
        this.initialState={
                firstName:"",
                middleName:"",
                lastName:"",
                userName:"",
                email:"",
                dateOfBirth:new Date(),
                gender:"",
                country:"",
                city:"",
                program:""
        }
        this.state=this.initialState;

        this.handleDate = this.handleDate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit  = this.handleSubmit.bind(this);
        this.reset=this.reset.bind(this);
    }

    handleDate(date){
        this.setState({dateOfBirth:date});
        console.log(this.state.dateOfBirth)
    }

    handleChange(event) {   
        switch(event.target.name){
            case "firstName":
            {
                    this.setState({firstName: event.target.value});
                    break;
            }
            case "middleName":
            {
                    this.setState({middleName: event.target.value});
                    break;
            }
            case "lastName":
            {
                    this.setState({lastName: event.target.value});
                    break;
            }
            case "userName":
            {
                    this.setState({userName: event.target.value});
                    break;
            }
            case "email":
            {
                    this.setState({email: event.target.value});
                    break;
            }
            case "dateOfBirth":
            {
                    this.setState({dateOfBirth:event.target.value})
                    break;
            }
            case "gender":
            {
                    this.setState({gender:event.target.value})
                    break;
            }
            case "country":
            {
                    this.setState({country:event.target.value})
                    break;
            }
            case "city":
            {
                    this.setState({city:event.target.value})
                    break;
            }
            case "program":
            {
                    this.setState({program:event.target.value})
                    break;
            }
            default:
            {
                    console.log("Found it");
            }
        }        
   }

   handleSubmit(event) 
   {
       event.preventDefault();
       console.log(JSON.stringify(this.state));
       
       const url ='http://localhost:9000/registerplayer';
       fetch(url, {
        method: 'POST',
        headers: {
            'Accept':'application/json',
            'Content-Type': 'application/json'          
        },
        body: JSON.stringify(this.state)
      })
      .then(res=>res.json()) 
      .then((data)=>{console.log(data)})
      .then(alert("Your profile is now stored!"))
      .catch((error)=>console.log(error));         
    }
    
    reset(e){
        e.preventDefault();
        this.setState(this.initialState);
    }      
   
    render() {
      return (
      <div className="App">
            <div>
               <form className="playerForm" onSubmit={this.handleSubmit}>
                    
                        <label>First name 
                            <input type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange}/> <br/>
                        </label>
                        <label>Middle name 
                            <input type="text" name="middleName" value={this.state.middleName} onChange={this.handleChange}/> <br/>
                        </label>
                        <label>Last name 
                            <input type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange}/> <br/>
                        </label>
                        <label>User name 
                            <input type="text" name="userName" value={this.state.userName} onChange={this.handleChange}/> <br/>
                        </label>
                        <label>email 
                            <input type="text" name="email" value={this.state.email} onChange={this.handleChange}/> <br/>
                        </label>
                        <label>Gender 
                            <input type="radio" name="gender" value={"Female"} checked={this.state.gender === "Female"} onChange={this.handleChange}/> Female
                            <input type="radio" name="gender" value={"Male"} onChange={this.handleChange}  checked={this.state.gender === "Male"}/> Male 
                            <input type="radio" name="gender" value={"Other"} onChange={this.handleChange}  checked={this.state.gender === "Other"}/> Other  
                            <br/>
                        </label>
                        <label>Date of Birth 
                        <DatePicker  name="dateOfBirth"  onChange={this.handleDate} selected={this.state.dateOfBirth}  isClearable={true}  placeholderText={"MM/DD/YYYY"}/> <br/>
                        </label>
                        <label> Country
                        <select name="country" value={this.state.selectValue} onChange={this.handleChange} >
                                <option value="Afghanistan">Afghanistan</option><option value="Albania">Albania</option><option value="Algeria">Algeria</option>
                                <option value="Andorra">Andorra</option><option value="Angola">Angola</option><option value="AntiguaandBarbuda">Antigua and Barbuda</option>
                                <option value="Argentina">Argentina</option><option value="Armenia">Armenia</option><option value="Australia">Australia</option>                      
                                <option value="Afghanistan">Afghanistan</option><option value="Azerbaijan">Azerbaijan</option><option value="Bahamas">Bahamas</option>
                                <option value="Bahrain">Bahrain</option><option value="Bangladesh">Bangladesh</option><option value="Barbados">Barbados</option>
                                <option value="Belarus">Belarus</option><option value="Belgium">Belgium</option><option value="Belize">Belize</option>
                                <option value="Benin">Benin</option><option value="Bhutan">Bhutan</option><option value="Bolivia">Bolivia</option>
                                <option value="BosniaandHerzegovina">Bosnia and Herzegovina</option><option value="Botswana">Botswana</option><option value="Brazil">Brazil</option>
                                <option value="Brunei">Brunei</option><option value="Bulgaria">Bulgaria</option><option value="BurkinaFaso">Burkina Faso</option>                       
                                <option value="Burundi">Burundi</option><option value="CaboVerde">Cabo Verde</option><option value="Cambodia">Cambodia</option>
                                <option value="Cameroon">Cameroon</option><option value="Canada">Canada</option><option value="CentralAfricanRepublic">Central African Republic</option>
                                <option value="Chad">Chad</option><option value="Chile">Chile</option><option value="China">China</option>
                                <option value="Colombia">Colombia</option><option value="Comoros">Comoros</option><option value="Democratic Republic of the Congo">Congo, Democratic Republic of the</option>
                                <option value="Republic of the Congo">Congo, Republic of the</option><option value="CostaRica">Costa Rica</option><option value="Côted’Ivoire">Côte d’Ivoire</option>
                                <option value="Croatia">Croatia</option><option value="Cuba">Cuba</option><option value="Cyprus">Cyprus</option>
                                <option value="CzechRepublic">Czech Republic</option><option value="Denmark">Denmark</option><option value="Djibouti">Djibouti</option>
                                <option value="Dominica">Dominica</option><option value="DominicanRepublic">Dominican Republic</option><option value="EastTimor">East Timor</option>
                                <option value="Ecuador">Ecuador</option><option value="Egypt">Egypt</option><option value="ElSalvador">El Salvador</option>
                                <option value="EquatorialGuinea">Equatorial Guinea</option><option value="Eritrea">Eritrea</option><option value="Estonia">Estonia</option>
                                <option value="Eswatini">Eswatini</option><option value="Ethiopia">Ethiopia</option><option value="Fiji">Fiji</option>
                                <option value="Finland">Finland</option><option value="France">France</option><option value="Gabon">Gabon</option>                       
                                <option value="Gambia">Gambia</option><option value="Georgia">Georgia</option><option value="Germany">Germany</option>
                                <option value="Ghana">Ghana</option><option value="Greece">Greece</option><option value="Grenada">Grenada</option>
                                <option value="Guatemala">Guatemala</option><option value="Guinea">Guinea</option><option value="GuineaBissau">Guinea-Bissau</option>

                                <option value="Guyana">Guyana</option><option value="Haiti">Haiti</option><option value="Honduras">Honduras</option>
                                <option value="Hungary">Hungary</option><option value="Iceland">Iceland</option><option value="India">India</option>
                                <option value="Indonesia">Indonesia</option><option value="Iran">Iran</option><option value="Iraq">Iraq</option>                       
                                <option value="Ireland">Ireland</option><option value="Israel">Israel</option><option value="Italy">Italy</option>
                                <option value="Jamaica">Jamaica</option><option value="Japan">Japan</option><option value="Jordan">Jordan</option>
                                <option value="Kazakhstan">Kazakhstan</option><option value="Kenya">Kenya</option><option value="Kiribati">Kiribati</option>

                                <option value="NorthKorea">Korea, North</option><option value="SouthKorea">Korea, North</option><option value="Kosovo">Kosovo</option>
                                <option value="Kuwait">Kuwait</option><option value="Kyrgyzstan">Kyrgyzstan</option><option value="Laos">Laos</option>
                                <option value="Latvia">Latvia</option><option value="Lebanon">Lebanon</option><option value="Lesotho">Lesotho</option>                       
                                <option value="Liberia">Liberia</option><option value="Libya">Libya</option><option value="Liechtenstein">Liechtenstein</option>
                                <option value="Lithuania">Lithuania</option><option value="Luxembourg">Luxembourg</option><option value="Madagascar">Madagascar</option>
                                <option value="Malawi">Malawi</option><option value="Maldives">Maldives</option><option value="Mali">Mali</option>
                                <option value="Malta">Malta</option><option value="MarshallIslands">Marshall Islands</option><option value="Mauritania">Mauritania</option>
                                <option value="Mauritius">Mauritius</option><option value="Mexico">Mexico</option><option value="Micronesia">Micronesia, Federated States of</option>
                                <option value="Moldova">Moldova</option><option value="Monaco">Monaco</option><option value="Mongolia">Mongolia</option>                       
                                <option value="Montenegro">Montenegro</option><option value="Morocco">Morocco</option><option value="Mozambique">Mozambique</option>
                                <option value="Myanmar">Myanmar</option><option value="Namibia">Namibia</option><option value="Nauru">Nauru</option>
                                <option value="Nepal">Nepal</option><option value="Netherlands">Netherlands</option><option value="NewZealand">New Zealand</option>
                                <option value="Nicaragua">Nicaragua</option><option value="Niger">Niger</option><option value="Nigeria">Nigeria</option>
                                <option value="NorthMacedonia">Macedonia, North</option><option value="Norway">Norway</option><option value="Oman">Oman</option>
                                <option value="Pakistan">Pakistan</option><option value="Palau">Palau</option><option value="Panama">Panama</option>                       
                                <option value="PapuaNewGuinea">Papua New Guinea</option><option value="Paraguay">Paraguay</option><option value="Peru">Peru</option>
                                <option value="Philippines">Philippines</option><option value="Poland">Poland</option><option value="Portugal">Portugal</option>
                                <option value="Qatar">Qatar</option><option value="Romania">Romania</option><option value="Russia">Russia</option><option value="Rwanda">Rwanda</option>
                       
                                <option value="SaintKittsandNevis">Saint Kitts and Nevis</option><option value="SaintLucia">Saint Lucia</option><option value="SaintVincentandtheGrenadines">Saint Vincent and the Grenadines</option>
                                <option value="Samoa">Samoa</option><option value="SanMarino">San Marino</option><option value="SaoTomeandPrincipe">Sao Tome and Principe</option>
                                <option value="SaudiArabia">Saudi Arabia</option><option value="Senegal">Senegal</option><option value="Serbia">Serbia</option>                       
                                <option value="Seychelles">Seychelles</option><option value="SierraLeone">Sierra Leone</option><option value="Singapore">Singapore</option>
                                <option value="Slovakia">Slovakia</option><option value="Slovenia">Slovenia</option><option value="SolomonIslands">Solomon Islands</option>
                                <option value="Somalia">Somalia</option><option value="SouthAfrica">South Africa</option><option value="Spain">Spain</option>
                                <option value="SriLanka">Sri Lanka</option><option value="Sudan">Sudan</option><option value="SouthSudan">Sudan, South</option>
                                <option value="Suriname">Suriname</option><option value="Sweden">Sweden</option><option value="Switzerland">Switzerland</option>
                                <option value="Syria">Syria</option><option value="Taiwan">Taiwan</option><option value="Tajikistan">Tajikistan</option>                       
                                <option value="Tanzania">Tanzania</option><option value="Thailand">Thailand</option><option value="Togo">Togo</option>
                                <option value="Tonga">Tonga</option><option value="TrinidadandTobago">Trinidad and Tobago</option><option value="Tunisia">Tunisia</option>
                                <option value="Turkey">Turkey</option><option value="Turkmenistan">Turkmenistan</option><option value="Tuvalu">Tuvalu</option>
                                <option value="Uganda">Uganda</option><option value="Ukraine">Ukraine</option><option value="UnitedArabEmirates">United Arab Emirates</option>
                                <option value="UnitedKingdom">United Kingdom</option><option value="UnitedStates">United States</option><option value="Uruguay">Uruguay</option>
                                <option value="Uzbekistan">Uzbekistan</option><option value="Vanuatu">Vanuatu</option><option value="VaticanCity">Vatican City</option>                       
                                <option value="Venezuela">Venezuela</option><option value="Vietnam">Vietnam</option><option value="Yemen">Yemen</option>
                                <option value="Zambia">Zambia</option><option value="Zimbabwe">Zimbabwe</option>
                        </select>
                        </label>
                        <br/>
                        <label>City 
                            <input type="text" name="city" value={this.state.city} onChange={this.handleChange}/> <br/>
                            
                        </label>
                       
                        <label>Program 
                            
                            <select name="program" value={this.state.selectValue} onChange={this.handleChange} >
                                <option value="M&E">Monitoring & Evaluation</option>
                                <option value="Elections">Elections</option>
                                <option value="Governance">Governance</option>                      
                                <option value="GWD">Gender, Women & Democracy</option>
                            </select>
                            <br/>
                        </label>
                        <br/>
                        <button type="submit">Save</button> | <button type="button" onClick={this.reset}>Reset</button>              
                </form>
            </div>            
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
/*
    player_given_name:state.authDetail.authDetail.player_given_name,
    player_family_name:state.authDetail.authDetail.player_given_name,
    player_picture:state.authDetail.authDetail.player_picture,
    player_email:state.authDetail.authDetail.player_email,
    player_username:state.authDetail.authDetail.player_username,
    player_gender:state.authDetail.authDetail.player_gender,
    player_dateOfBirth:state.authDetail.authDetail.player_dateOfBirth
	gameData: state.gameData 
*/
});

//Dispatch action to fetch game data and scores.
const mapDispatchToProps = (dispatch) => {
	return {
//		getGameData: (gameData) => dispatch(fetchGameData(gameData)),
//		getScores: (scores) => dispatch(fetchScores(scores)),
		setAuth:(authDetail) => dispatch(fetchAuthDetails(authDetail)),
		clearAuth:(authDetail)=> dispatch(clearAuthDetails(authDetail)),
	};
};

Register.propTypes = {
//	getGameData: PropTypes.func,
//	getScores: PropTypes.func,
//	gameData: PropTypes.object,
	authDetail:PropTypes.object,
//	setAuth: PropTypes.func,
//	clearAuth: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
