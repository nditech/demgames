import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
//import '../App.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

class ListGames extends Component {  
    constructor(props){
        super(props);
        this.state={
            games:[{
                id:"", 
                caption:"",
                gamedescription:"", 
                gametype:""
            }]
        };
        this.simpleTable=this.simpleTable.bind(this);      
    }

    componentDidMount() {
        this.pool();                
    }

    pool(){
        fetch('http://localhost:9000/listgames')
        .then((res) =>res.json())
        .then((data)=>{                                                                   
              // console.log(JSON.stringify(data))
               const Str2=JSON.stringify(JSON.parse(JSON.stringify(data)));
               const bObj2=JSON.parse(Str2);
               const newGame=JSON.parse(JSON.stringify(bObj2)); 
               console.log(newGame);                             
               this.setState(prevState=>({
                    games:prevState.games.concat(newGame)
               }))
               //console.log(JSON.stringify(JSON.parse(JSON.stringify(this.state.user))));                         
        })
        .catch(err=>console.log(err));         
       //  console.log(this.state.user);
    }

     simpleTable(){
       // const {rows}=this.state.games;
        return(
                 <Paper><Table>
                     <TableHead>
                         <TableRow>
                         <TableCell align="right">Id</TableCell>
                         <TableCell align="right">Caption</TableCell>
                         <TableCell align="right">Description</TableCell>
                         <TableCell align="right">Type</TableCell>                         
                         </TableRow>
                     </TableHead>
                 <TableBody>
                     {
                         this.state.games.map(row => (
                         <TableRow key={row.id}>
                             <TableCell align="right">{row.id}</TableCell>
                             <TableCell align="right">{row.caption}</TableCell>
                             <TableCell align="right">{row.gamedescription}</TableCell>
                             <TableCell align="right">{row.gametype}</TableCell>                             
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

export default ListGames;
