import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function SearchBar() {
  const [name, setName] = useState('');

  const handleClick = (event) => {
    event.preventDefault();

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
      .then((res) => {
        console.log(res.json());
      })
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

export default SearchBar;
