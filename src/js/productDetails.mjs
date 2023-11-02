import { setLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";

let product= {};

export default async function productDetails(productId){
    product = await findProductById(productId);
    //console.log(product);
    renderProductDetails();//render the details of products

    document.querySelector('#addToCart').addEventListener('click', addProductToCart);

}

function addProductToCart() {
    setLocalStorage('so-cart', product);
  }

function renderProductDetails(){

    document.querySelector('#productName').innerText = product.Brand.Name;//why Brand does not need index number? B/c it is an Object
    document.querySelector('#productNameWithoutBrand').innerText = product.NameWithoutBrand;
    document.querySelector('#productImage').src = product.Image;//img is not working if use innerText
    document.querySelector('#productFinalPrice').innerText = `$${product.FinalPrice}`;
    document.querySelector('#productColorName').innerText = product.Colors[0].ColorName;// colorName is not working without index number. B/c it is an array
    document.querySelector('#productDescriptionHtmlSimple').innerHTML = product.DescriptionHtmlSimple; //why use innerHTML instead of innerText. (weird icons appreared with innerText)
}

