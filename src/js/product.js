
// import { setLocalStorage, getParam} from './utils.mjs';
// import { findProductById } from './productData.mjs';
// import productDetails from './productDetails.mjs';

// const productId = getParam('product');//test your getParams function in product.js to see if you can
// //get the product id successfully when someone navigates to the product-details page.
// console.log(productId);
// productDetails(productId);
// // const data =await findProductById(productId);
// // console.log(data);

// function addProductToCart(product) {//fixed this function
//   let cart_items;
//   cart_items = getLocalStorage('so-cart') || [];//get items to put in the bag or set it to an emty array
//   if(!Array.isArray(cart_items)) cart_items = [cart_items];// make an array for cart-items

//   cart_items.push(product);
//   setLocalStorage('so-cart', cart_items);
// }
// // add to cart button event handler
// async function addToCartHandler(e) {
//   const product = await findProductById(e.target.dataset.id); //
//   // console.log(product);
//   addProductToCart(product);
// }

// // add listener to Add to Cart button
// document
//   .getElementById('addToCart')
//   .addEventListener('click', addToCartHandler);


import { getParam, loadHeaderFooter } from "./utils.mjs";
import productDetails from "./productDetails.mjs";

//loadHeaderFooter for product_pages/index.html
await loadHeaderFooter();

const productId = getParam("product");
productDetails(productId);

document.getElementById('addToCart').addEventListener('click', addToCart);