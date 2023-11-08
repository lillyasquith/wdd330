// import { renderCartContents } from "./cart";
import productList from "./productList.mjs";
import { loadHeaderFooter, getParam }  from "./utils.mjs"

init();
async function init(){
    await loadHeaderFooter();
    // renderCartContents();
    //productList(".product-list", "tents");
    const category = getParam("category");
    document.querySelector('.category').innerHTML = category
    console.log(category);
    productList(".product-list", category);
}

// await loadHeaderFooter();
// renderCartContents();
// console.log('main');
// productList(".product-list", "tents");
