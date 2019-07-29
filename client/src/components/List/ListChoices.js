import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

//import '../App.css';

class ListChoices extends Component {  
    constructor(props){
        super(props);
        this.state={
            choices:[{
                id:"",
                questionid:"",
                choicestatement:"",
                choicedescription:"",
                weight:"",
                answer:0
            }]
        };
        this.simpleTable=this.simpleTable.bind(this);      
    }
    componentDidMount() {
        this.pool();                
    }
    pool(){
        fetch('http://localhost:9000/listchoices')
        .then((res) =>res.json())
        .then((data)=>{                                                                   
               const Str2=JSON.stringify(JSON.parse(JSON.stringify(data)));
               const bObj2=JSON.parse(Str2);
               const newChoice=JSON.parse(JSON.stringify(bObj2)); 
               console.log(newChoice);                             
               this.setState(prevState=>({
                    choices:prevState.choices.concat(newChoice)
               }))                                       
        })
        .catch(err=>console.log(err));         
    }
     simpleTable(){
        return(
                 <Paper><Table>
                     <TableHead>
                         <TableRow>
                         <TableCell align="right">Choice Id</TableCell>
                         <TableCell align="right">Question Id</TableCell>
                         <TableCell align="right">Choice Statement</TableCell>
                         <TableCell align="right">Choice Description</TableCell>
                         <TableCell align="right">Weight</TableCell>     
                         <TableCell align="right">Answer</TableCell>                     
                         </TableRow>
                     </TableHead>
                 <TableBody>
                     {
                         this.state.choices.map(row => (
                         <TableRow key={row.id}>
                             <TableCell align="right">{row.id}</TableCell>
                             <TableCell align="right">{row.questionid}</TableCell>
                             <TableCell align="right">{row.choicestatement}</TableCell>
                             <TableCell align="right">{row.choicedescription}</TableCell>
                             <TableCell align="right">{row.weight}</TableCell>                            
                             <TableCell align="right">{row.answer}</TableCell> 
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

export default ListChoices;