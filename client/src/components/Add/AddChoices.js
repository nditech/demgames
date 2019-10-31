import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
//import '../App.css';
import {connect} from 'react-redux';
import Auth from '../../Auth';
import { config } from "../../settings";

const auth0=new Auth();


const AddChoices = () => {

    const initialState = {
        choicestatement:'',
        choicedescription:'',
        weight:'',
        isanswer:'',
        questionid:'',
        questions:[]
    };

    const [formData, setFormData] = useState(initialState);

    const {
        choicestatement,
        choicedescription,
        weight,
        isanswer,
        questionid,
    } = formData;

    const handleReset = () => {
        setFormData({...formData, choicestatement: '', choicedescription: '', weight: '', isanswer: '', questionid: ''});
    };

    const handleChange = (event) => {   
        setFormData({ ...formData, [event.target.name]: event.target.value });       
   }

   const handleSubmit = (event) => 
   {
       event.preventDefault();
       fetch(config.baseUrl + '/addchoice', {
        method: 'POST',
        headers: {
             authorization: "Bearer "+auth0.getAccessToken(),
            'Accept':'application/json',
            'Content-Type': 'application/json'          
        },
        body: JSON.stringify(formData)
      })
      .then(res=>res.json())
      .then((data)=>{
         
         alert('The choice was successfully added');
         handleReset();
        })
      .catch((error)=>console.log(error));         
    }
           
      let optionItems = formData.questions.map((question) =>
            <option key={question.id} value={question.id}>{question.question_statement}</option>
      );

      return (
        <div className=" container App">
        <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8">
               <form className="text-center border border-light p-5" onSubmit={e => handleSubmit(e)}> 
                    <div className="row">
                        <div className="form-group col-md-12">
                            <label className="form-label" >Question statement </label>
                            <select className="form-control custom-select custom-select-sm" name="questionid" value={questionid} onChange={e => handleChange(e)} >
                            {optionItems}
                            </select>
                        </div>
                    </div>

                    <input className="form-control mb-1" placeholder="Choice statement" type="text" name="choicestatement" value={choicestatement} onChange={e => handleChange(e)}/> <br/>
                    <textarea className="form-control mb-1" placeholder="Choice description" type="text" name="choicedescription" value={choicedescription} onChange={e => handleChange(e)}> 
                    </textarea>
                    <input className="form-control mb-1" placeholder="Weight" type="text" name="weight" value={weight} onChange={e => handleChange(e)}/> <br/>
                    <input className="form-control mb-1" placeholder="Is it answer?" type="text" name="isanswer" value={isanswer} onChange={e => handleChange(e)}/> <br/>
                    <div className="text-center mt-12">
                        <button className="btn btn-info" type="submit">Save</button> | <button className="btn btn-warning" type="button" onClick={e => handleReset(e)}>Reset</button>
                    </div>
              </form>
            </div>
        </div>            
        </div>
    );
}
    
export default connect(null, {}) (AddChoices);