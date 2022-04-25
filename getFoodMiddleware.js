const path = require('path');
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const foodController = {};

foodController.getProduct = async (req, res, next) => {
  const searchTerm = req.body.searchTerm;
  const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${searchTerm}&search_simple=1&action=process&json=1`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        //   UserAgent: userAgent
      },
    });
    const product = await response.json();
    // console.log('this is the products page', product);
    //   res.locals.searchResults = product;
    //     const { energy-kcal_100g, sodium_100g, fat_100g, saturated - fat_100g, fiber_100g, proteins_100g, sugars_100g
    // } = product.product[0].nutriments;
    let i = 0;
    let resultsArray = [];
    while (i < 5) {
      // foodArray = Object.keys(foodObj);
      // for (let item in foodArray) {
      //     res.locals.product[i][item] = foodObj[item]

      const { sodium_100g, fat_100g, fiber_100g, proteins_100g, sugars_100g } =
        product.products[i].nutriments;
      const energy_kcal_100g =
        product.products[i].nutriments['energy-kcal_100g'];
      const saturated_fat_100g =
        product.products[i].nutriments['saturated-fat_100g'];
      const calAndFatObj = {
        energy_kcal_100g: energy_kcal_100g,
        saturated_fat_100g: saturated_fat_100g,
      };
      const { product_name } = product.products[i].product_name;
      const { image_url } = product.products[i].image_url;

      const foodObj = Object.assign(
        {
          ...calAndFatObj,
          sodium_100g,
          fat_100g,
          fiber_100g,
          proteins_100g,
          sugars_100g,
        },
        { energy_kcal_100g },
        { saturated_fat_100g },
        { product_name },
        { image_url }
      );

      // const {kcal, energy-kcal_100g} = product.product[i].nutriments

      resultsArray.push(foodObj);
      i++;
    }

    console.log(resultsArray);
    //   console.log('This is the res.locals', res.locals.searchResults)
    // if (product.status === 0) {
    //     return null;
    // }
    return next();
  } catch (error) {
    console.error(error);
    return null;
  }
};

module.exports = foodController;

/*
"energy-kcal_100g": 180,
    "sodium_100g": 0.16,
"carbohydrates_100g": 26.9,
"fat_100g": 7,
"saturated-fat_100g": 0.8,
"fiber_100g": 2.3,
 "proteins_100g": 2.3,
  "sugars_100g": 0.2,

*/
