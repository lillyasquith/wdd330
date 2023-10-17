import { setLocalStorage,getLocalStorage } from './utils.mjs';//using getLocalStorage to get the items 
import { findProductById } from './productData.mjs';

function addProductToCart(product) {//fixed this function
  let cart_items;
  cart_items = getLocalStorage('so-cart') || [];//get items to put in the bag or set it to an emty array
  if(!Array.isArray(cart_items)) cart_items = [cart_items];// make an array for cart-items

  cart_items.push(product);
  setLocalStorage('so-cart', cart_items);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id); //
  // console.log(product);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById('addToCart')
  .addEventListener('click', addToCartHandler);
