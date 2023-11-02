import { getLocalStorage } from './utils.mjs';

 function renderCartContents() {
  let cartItems = getLocalStorage('so-cart');
  console.log(cartItems);
  if(!cartItems){ //if there is no item in cart, length will show an error. Therefore, we need an emty array
    cartItems = [];//lenght works with array
  }
  //console.log(cartItems.length);//show the number of items
  document.querySelector('.num_items').innerHTML = cartItems.length;
  const element = document.querySelector('.product-list'); // element product list 
  const htmlItems = cartItems.map((item) => {
  console.log(item);
  return cartItemTemplate(item)// add return 
  // const cartItem = cartItemTemplate(item)
  // element.insertAdjacentHTML()
  
  });
  // console.log(htmlItems);
  element.insertAdjacentHTML("afterbegin", htmlItems.join(""));//add items into elements
  }
function cartItemTemplate(item) {
  // console.log(item);
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
