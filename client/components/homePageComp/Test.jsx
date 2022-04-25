// import * as React from 'react';
import React, { Component, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function Test() {
  const [name, setName] = useState('');
  // name : ""

  const handleClick = (event) => {
    // event.preventDefault();

    const bodyObject = {
      searchTerm: name,
    };

    fetch('/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify(bodyObject), // req.body.searchTerm
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log('❌❌ Error in Post Fetch ❌❌', err));
  };

  return (
    <div id="searchBar">
      <form id="searchFood">
        <TextField
          fullWidth
          label="What are you feeling today"
          id="fullWidth"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button
          id="foodButton"
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleClick}
        >
          Search
        </Button>
      </form>
    </div>
  );
}
export default Test;

// const [name, setName] = useState('');
//  // name : ""
// food: []

// fetch api
// parse it
// grab the parced data
// store it in the state
/*
   {
    name:
    cal:
    protein
    } 
    */

// declare storedData []

//iterate through data and store it in empty variable

/* 
const rows = [
createData('storedData.name', storedData.cal , storedData.protein, storedData.sugar),
createData('storedData.name', storedData.cal , storedData.protein, storedData.sugar),
createData('storedData.name', storedData.cal , storedData.protein, storedData.sugar),
createData('storedData.name', storedData.cal , storedData.protein, storedData.sugar),
createData('storedData.name', storedData.cal , storedData.protein, storedData.sugar),
];
    
    
    */
