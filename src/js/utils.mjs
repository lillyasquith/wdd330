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
  const product = urlParams.get('product')
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
  console.log(htmlStrings.join());
    parentElement.insertAdjacentHTML(position, htmlStrings.join());
}