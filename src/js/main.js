// import { renderCartContents } from "./cart";
import productList from "./productList.mjs";
import { loadHeaderFooter }  from "./utils.mjs"

init();
async function init(){
    await loadHeaderFooter();
    // renderCartContents();
    productList(".product-list", "tents");
}

// await loadHeaderFooter();
// renderCartContents();
// console.log('main');
// productList(".product-list", "tents");