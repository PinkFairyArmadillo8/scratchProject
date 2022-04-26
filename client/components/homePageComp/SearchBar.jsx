import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      foods: [],
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  /* 
  energy_kcal_100g: 0,
  fat_100g: 31.6
  proteins_100g: 6
  saturated_fat_100g: 11
  sodium_100g: 0.0456
  sugars_100g: 56.8
  */

  handleChange(event) {
    this.setState({ name: event.target.value });
  }

  handleClick(event) {
    event.preventDefault();

    const bodyObject = {
      searchTerm: this.state.name,
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
        this.setState({ foods: data });
        console.log('❌❌ Check for the length ❌❌ ', this.state.foods);
      })
      .catch((err) => console.log('❌❌ Error in Post Fetch ❌❌', err));
  }

  //cant we put fetch inside of another function?
  // does that make sense
  render() {
    const arr = [];
    console.log('❌❌ Check for the length ❌❌ ', this.state.foods);
    for (let i = 0; i < this.state.foods.length; i++) {
      arr.push(
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          id="ListName"
        >
          {this.state.name}
          <ListItemButton id="button" dense>
            <ListItem>
              Calories: {this.state.foods[i].energy_kcal_100g}
            </ListItem>
            <ListItem>Fat: {this.state.foods[i].fat_100g}g</ListItem>
            <ListItem>Protein: {this.state.foods[i].proteins_100g}g</ListItem>
            <ListItem>
              SatFat: {this.state.foods[i].saturated_fat_100g}g
            </ListItem>
            <ListItem>Sodium: {this.state.foods[i].sodium_100g}g </ListItem>
            <ListItem>Sugars: {this.state.foods[i].sugars_100g}g</ListItem>
            <button id="ateIt">Ate it!</button>
          </ListItemButton>
        </List>
      );
    }
    return (
      <div id="searchBar">
        <form id="searchFood">
          <TextField
            fullWidth
            label="What are you feeling today"
            id="fullWidth"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <Button
            id="foodButton"
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={this.handleClick}
          >
            Search
          </Button>
        </form>
        <div id="resultsList">{arr}</div>
      </div>
    );
  }
}

export default SearchBar;
