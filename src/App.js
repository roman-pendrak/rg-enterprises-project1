import './App.css';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';

export default function App() {
  const classes = useStyles();
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [resultPlus, setResultPlus] = useState(0);
  const [resultMinus, setResultMinus] = useState(0);
  const [resultTimes, setResultTimes] = useState(0);
  const [resultDividedBy, setResultDividedBy] = useState(0);

  const stringToNumberTable = {
    "one" : 1,
    "two" : 2,
    "three" : 3,
    "four" : 4,
    "five" : 5,
    "six" : 6,
    "seven" : 7,
    "eight" : 8,
    "nine" : 9,
    "ten" : 10,
    "eleven" : 11,
    "twelve" : 12,
    "thirteen" : 13,
    "fourteen" : 14,
    "fifteen" : 15,
    "sixteen" : 16,
    "seventeen" : 17,
    "eighteen" : 18,
    "nineteen" : 19,
    "twenty" : 20,
    "thirty" : 30,
    "forty" : 40,
    "fifty" : 50,
    "sixty" : 60,
    "seventy" : 70,
    "eighty" : 80,
    "ninety" : 90
  }

  function handleClick() {
    fetch('https://100insure.com/mi/api1.php')
    .then(data => {
      return data.json();
    })
    .then(data => {
      console.log(data);
      setNum1(convertToNumber(data.key1));
      setNum2(convertToNumber(data.key2));
      
//start

var headers = new Headers();
headers.append('Content-Type', 'application/json');

fetch('https://100insure.com/mi/api2.php', {
    data: {"num1": num1, "num2": num2, "operation": "plus"},
    method: 'POST',
    headers: headers,
})
.then(response => response.text())
.then(data => {
console.log(data);  
})
.catch(function(error) {
  console.log(error)
});



//end

      // post to add num
      // post to subtract
      // post to multiply 
      // post to divide
    })
    .catch(function(error) {
      console.log(error)
    });
  } 

  function convertToNumber(numberText) {
    var numArray = numberText.split('-');
    if (numArray.length > 1) {
      return stringToNumberTable[numArray[0]] + stringToNumberTable[numArray[1]];
    } else {
      return stringToNumberTable[numArray[0]];
    }
  }

  return (
    <div>
      <Grid container direction='row'>
        <Grid item xs={4}>
          {/* empty space */}
        </Grid>
        <Grid className={classes.root} item xs={4}>
          {/* button to send GET req for new numbers */}
          <Button onClick={handleClick} className={classes.button} color='primary'>GENERATE NEW</Button>    
          {/* table to show numbers recieved from GET req */}
          <TableContainer className={classes.table} component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell width="50%" align='center'><b>Number 1</b></TableCell>
                  <TableCell width="50%" align='center'><b>Number 2</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell width="50%" align='center'>{num1}</TableCell>
                  <TableCell width="50%" align='center'>{num2}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          {/* table to show results from POST req */}
          <TableContainer className={classes.table} component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell width="50%" align='center'><b>Operation</b></TableCell>
                  <TableCell width="50%" align='center'><b>Result</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell width="50%" align='center'>Plus (+)</TableCell>
                  <TableCell width="50%" align='center'>{resultPlus}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell width="50%" align='center'>Minus (-)</TableCell>
                  <TableCell width="50%" align='center'>{resultMinus}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell width="50%" align='center'>Times (x)</TableCell>
                  <TableCell width="50%" align='center'>{resultTimes}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell width="50%" align='center'>Divided By (/)</TableCell>
                  <TableCell width="50%" align='center'>{resultDividedBy}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={4}>
          {/* empty space */}
        </Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles(() => ({ 
  root: {
      textAlign: "center",
      background: "none" 
  },
  button: {
    width: "100%",
    color: "whitesmoke",
    fontWeight: "bold",
    backgroundColor: "gray",
    marginTop: "20px",
    boxShadow: "3px 3px 10px gray",
    borderRadius: "5px",
    '&:hover': {
      backgroundColor: "green"
    }
  },
  table: {
    marginTop: "20px",
    border: "1px solid gray"
  }
}));