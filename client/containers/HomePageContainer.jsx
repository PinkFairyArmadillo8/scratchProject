import React, { Component, useState, useEffect } from 'react';
import SearchBar from '../components/homePageComp/SearchBar.jsx';
import AteToday from '../components/homePageComp/AteToday.jsx';
import Test from '../components/homePageComp/Test.jsx';

const HomePageContainer = () => {
  //iteraet throughthe array so that you grab the info that you really want to show in the frontend(to the client)

  return (
    <div id="homePageContainer">
      <h1> Big Body Nutrients </h1>
      <SearchBar />
      <AteToday />
      {/* <Test /> */}
    </div>
  );
};

export default HomePageContainer;
