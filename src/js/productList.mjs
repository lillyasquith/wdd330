import { doc } from "prettier";
import { getData } from "./productData.mjs";

function productCardTemplate(product) {
    return `<li class="product-card">
    <a href="product_pages/index.html?product=880RR">
    <img
      src="images/tents/marmot-ajax-tent-3-person-3-season-in-pale-pumpkin-terracotta~p~880rr_01~320.jpg"
      alt="Image of Marmot Ajax tent"
    />
    <h3 class="card__brand">Marmot</h3>
    <h2 class="card__name">Ajax Tent - 3-Person, 3-Season</h2>
    <p class="product-card__price">$199.99</p></a>
  </li>`
}         

function renderList(list, selectEl) {
    const htmlStrings = list.map(productCardTemplate);
    selectEl.insertAdjacentHTML('afterbegin', htmlStrings.join()); //The join() method returns an array as a string and does not change the original array.
}

export default async function productList(selector, category) {
    
    // get the element we will insert the list into from the selector
    let selectEl = document.querySelector('selector');
    // get the list of products 
    let products = await getData(category);//without async, await will show an error. 
    console.log(products);
    // render out the product list to the element
    //renderList (selectEl, products);
}