import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

//import '../App.css';

class ListQuestions extends Component {
  
    constructor(props){
        super(props);
        this.state={
            questions:[{
                    id:"",
                    gameid:"",
                    difficulty_level:"",
                    question_statement:"",
                    weight:"",
                    explanation:"",
                    isitmedia:""
            }]
        };
        this.simpleTable=this.simpleTable.bind(this);      
    }

    componentDidMount() {
        this.pool();                
    }

    pool(){
        fetch('http://localhost:9000/listquestions')
        .then((res) =>res.json())
        .then((data)=>{                                                                   
               const Str2=JSON.stringify(JSON.parse(JSON.stringify(data)));
               const bObj2=JSON.parse(Str2);
               const newQuestion=JSON.parse(JSON.stringify(bObj2)); 
               console.log(newQuestion);                             
               this.setState(prevState=>({
                    questions:prevState.questions.concat(newQuestion)
               }))                                       
        })
        .catch(err=>console.log(err));         
    }

     simpleTable(){
        return(
                 <Paper><Table>
                     <TableHead>
                         <TableRow>
                         <TableCell align="right">Id</TableCell>
                         <TableCell align="right">Game Id</TableCell>
                         <TableCell align="right">Difficulty Level</TableCell>
                         <TableCell align="right">Question</TableCell>
                         <TableCell align="right">Weight</TableCell>    
                         <TableCell align="right">Explanation</TableCell> 
                         <TableCell align="right">is it media</TableCell>                      
                         </TableRow>
                     </TableHead>
                 <TableBody>
                     {
                         this.state.questions.map(row => (
                         <TableRow key={row.id}>
                             <TableCell align="right">{row.id}</TableCell>
                             <TableCell align="right">{row.gameid}</TableCell>
                             <TableCell align="right">{row.difficulty_level}</TableCell>
                             <TableCell align="right">{row.question_statement}</TableCell>
                             <TableCell align="right">{row.weight}</TableCell>   
                             <TableCell align="right">{row.explanation}</TableCell> 
                             <TableCell align="right">{row.isitmedia}</TableCell>                           
                         </TableRow>
                     ))}
                 </TableBody>
                 </Table></Paper>
             );       
    } 

   render() {             
      return (
      <div className="App">
            <div>
                {this.simpleTable()} 
            </div>            
      </div>
    );
  }
}

export default ListQuestions;
