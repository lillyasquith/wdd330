import { setLocalStorage, getParam} from './utils.mjs';
import { findProductById } from './productData.mjs';
import productDetails from './productDetails.mjs';

const productId = getParam('product');//test your getParams function in product.js to see if you can
//get the product id successfully when someone navigates to the product-details page.
console.log(productId);
productDetails(productId);
// const data =await findProductById(productId);
// console.log(data);

function addProductToCart(product) {
  setLocalStorage('so-cart', product);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById('addToCart')
  .addEventListener('click', addToCartHandler);
