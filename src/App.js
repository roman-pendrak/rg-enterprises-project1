import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';

import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';

export default function App() {
  const classes = useStyles();
  const [num1, setNum1] = useState("N/A");
  const [num2, setNum2] = useState("N/A");
  const [resultPlus, setResultPlus] = useState("N/A");
  const [resultMinus, setResultMinus] = useState("N/A");
  const [resultTimes, setResultTimes] = useState("N/A");
  const [resultDividedBy, setResultDividedBy] = useState("N/A");

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
    setNum1("loading");
    setNum2("loading");
    setResultPlus("loading");
    setResultMinus("loading");
    setResultTimes("loading");
    setResultDividedBy("loading");
    const operations = ["plus", "minus", "times", "divided by"];
    fetch('https://100insure.com/mi/api1.php')
    .then(data => {
      return data.json();
    })
    .then(data => {
      console.log(data);
      setNum1(convertToNumber(data.key1));
      setNum2(convertToNumber(data.key2));
      //start post
      for (let i = 0; i < operations.length; i++) {
        fetch('https://100insure.com/mi/api2.php', {
            body: '{"num1": ' + convertToNumber(data.key1) + ', "num2": ' + convertToNumber(data.key2) + ', "operation": "' + operations[i] + '"}',
            method: 'POST',
        })
        .then(response => response.text())
        .then(data => {
          console.log(data);  
          switch(operations[i]){
            case 'plus':
              setResultPlus(data);
              break;

            case 'minus':
              setResultMinus(data);
              break;

            case 'times':
              setResultTimes(data);
              break;

            case 'divided by':
              setResultDividedBy(data);
              break;

            default: 
              console.log("Invalid Operation.")
              break;
          }
        })
        .catch(function(error) {
          console.log(error)
        });
      }
      //end post
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
        <Grid item xs={3}>
          {/* empty space */}
        </Grid>
        <Grid className={classes.root} item xs={6}>
          {/* button to send GET req for new numbers */}
          <Button onClick={() => {handleClick()}} className={classes.button} color='primary'>GENERATE NEW</Button>    
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
                  <TableCell width="50%" align='center'>{num1 === "loading" ? <CircularProgress size="0.90rem"/> : num1}</TableCell>
                  <TableCell width="50%" align='center'>{num2 === "loading" ? <CircularProgress size="0.90rem"/> : num2}</TableCell>
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
                  <TableCell width="50%" align='center'>{resultPlus === "loading" ? <CircularProgress size="0.90rem"/> : resultPlus}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell width="50%" align='center'>Minus (-)</TableCell>
                  <TableCell width="50%" align='center'>{resultMinus === "loading" ? <CircularProgress size="0.90rem"/> : resultMinus}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell width="50%" align='center'>Times (x)</TableCell>
                  <TableCell width="50%" align='center'>{resultTimes === "loading" ? <CircularProgress size="0.90rem"/> : resultTimes}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell width="50%" align='center'>Divided By (/)</TableCell>
                  <TableCell width="50%" align='center'>{resultDividedBy === "loading" ? <CircularProgress size="0.90rem"/> : resultDividedBy}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={3}>
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
  },
}));