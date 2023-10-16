import { setLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";

let product= {};

export default async function productDetails(productId){
    product = await findProductById(productId);
    console.log(product);
    renderProductDetails();

    document.querySelector('#addToCart').addEventListener('click', addProductToCart);


}

function addProductToCart(product) {
    setLocalStorage('so-cart', product);
  }

function renderProductDetails(){
    document.querySelector('#productName').innerText = product.Brand.Name;
    document.querySelector('#productNameWithoutBrand').innerText = product.NameWithoutBrand;
    document.querySelector('#productImage').innerText = product.Image;//img is not working
    document.querySelector('#productFinalPrice').innerText = `$${product.FinalPrice}`;
    document.querySelector('#productColorName').innerText = product.Colors.ColorName;// colorName is not working
    document.querySelector('#productDescriptionHtmlSimple').innerText = product.DescriptionHtmlSimple;

}