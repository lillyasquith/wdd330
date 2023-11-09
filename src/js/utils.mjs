// import { renderCartContents } from "./cart";

// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  let dataArray = [];//added dataArray because items showed as NULL/ undefined in cart
  if(!getLocalStorage(key)){
    dataArray = [];
  }else{
    dataArray = getLocalStorage(key);
  }
  // console.log(data);
  if(data != undefined){
    console.log(data);
    dataArray.push(data);
  }
  
  localStorage.setItem(key, JSON.stringify(dataArray));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

//create a new function in the utils.mjs file called getParam(param) 
//that we can use to get a parameter from the URL when we need to. 
//(Don't forget to return the parameter!)
export function getParam(param){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param) // changed 'product' to param
  return product;
  //or return urlParams.get(param);
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = true){
  if(clear){
    parentElement.innerHTML = "";
  }
  const htmlStrings = list.map(templateFn);
    // console.log(selectEl);
  // console.log(htmlStrings);
  // console.log(htmlStrings.join());
    parentElement.insertAdjacentHTML(position, htmlStrings.join());
}

export async function renderWithTemplate(templateFn, parentElement, data, callback, position="afterbegin", clear=true) {
  // get template using function...no need to loop this time.
  console.log(templateFn)
  if (clear) {
      parentElement.innerHTML = "";
  }
  // console.log(data);
  const contents = await templateFn(data);
  parentElement.insertAdjacentHTML(position, contents);
  if(callback) {
      callback(data);
  }
}
async function loadTemplate(path) {
  // wait what?  we are returning a new function? 
  // this is called currying and can be very helpful.
  return async function () {
      const res = await fetch(path);
      if (res.ok) {
      const html = await res.text();
      return html;
      }
  };
} 
export async function loadHeaderFooter(){
  const headerTemplateFn = await loadTemplate("/partials/header.html");
  const footerTemplateFn = await loadTemplate("/partials/footer.html");
  const headerEl = document.querySelector('#main-header');
  const footerEl = document.querySelector('#main-footer')
  // loadTemplate(path);
  console.log(headerTemplateFn);
  await renderWithTemplate(headerTemplateFn, headerEl);
  await renderWithTemplate(footerTemplateFn, footerEl);
  renderCartContents();
}

export function renderCartContents() {
  let cartItems = getLocalStorage('so-cart');
  console.log(cartItems);
  if (!cartItems){
    cartItems = [];
  }
  console.log(document.querySelector('.num_items'))
  //console.log(cartItems.length);//show the number of items
  document.querySelector('.num_items').innerHTML = cartItems.length;
  // const element = document.querySelector('.product-list'); // element product list ////this function only need in the cart page, not in the main page.
  const htmlItems = cartItems.map((item) => {
  console.log(item);
  // return cartItemTemplate(item)// add return //this function only need in the cart page, not in the main page.
  // const cartItem = cartItemTemplate(item)
  // element.insertAdjacentHTML()
  
  });
  // console.log(htmlItems);
  // element.insertAdjacentHTML("afterbegin", htmlItems.join(""));//add items into elements ////this function only need in the cart page, not in the main page.
  }