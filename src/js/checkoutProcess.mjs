import { checkout } from "./externalServices.mjs";
import { getLocalStorage, setLocalStorage } from "./utils.mjs";


function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}
function packageItems(items) {
  // convert the list of products from localStorage to the simpler form required for the checkout process. Array.map would be perfect for this.
  const simplifiedForm = [];
  items.forEach(item => {
    simplifiedForm.push({
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: 1,
    })
  })
  return simplifiedForm;
}

const checkoutProcess = {
    key: "",
    outputSelector: "",
    list: [],
    itemTotal: 0,
    shipping: 0,
    tax: 0,
    orderTotal: 0,
    init: function (key, outputSelector='') {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = getLocalStorage(key);
        this.calculateItemSummary();
        this.calculateOrdertotal();
    },

    // Tax
    // Use 6% for sales tax.
    // Shipping
    // Use $10 for the first item plus $2 for each additional item for shipping.
  calculateItemSummary: function() {
    // calculate and display the total amount of the items in the cart, and the number of items.
    const numItems = this.list.length;
    this.list.forEach(item=> {
      // console.log(item.FinalPrice);
      this.itemTotal += item.FinalPrice;
    })
    console.log(numItems);
  
    document.querySelector(".numItems").innerHTML = numItems;
    document.querySelector(".cartTotal").innerHTML = `$${this.itemTotal.toFixed(2)}`;

  },
  calculateOrdertotal: function() {
    // calculate the tax amounts. Then use them to along with the cart total to figure out the order total
    this.tax = (this.itemTotal * 0.06);


    // calculate the shipping
    const items = this.list.length;
    if (items == 1){
      this.shipping = 10;
    } else {
      this.shipping = ((items - 1) * 2) + 10; // 4 items, 1 =>10, 3 * 2 , 16
    };
    this.orderTotal = (this.itemTotal + this.tax + this.shipping);
    
    // display the totals.
    this.displayOrderTotals();
  },
  displayOrderTotals: function() {
    // once the totals are all calculated display them in the order summary page
    document.querySelector(".tax").innerHTML = `$${this.tax.toFixed(2)}`;
    document.querySelector(".shipping").innerHTML = `$${this.shipping.toFixed(2)}`;
    document.querySelector(".orderTotal").innerHTML = `$${this.orderTotal.toFixed(2)}`;
  },

  checkout: async function(form){
    // build the data object from the calculated fields, the items in the cart, and the information entered into the form

    // call the checkout method in our externalServices module and send it our data object.
    // console.log(formDataToJSON(form));
    const json = formDataToJSON(form);

    json.orderDate = new Date();
    json.orderTotal = this.orderTotal;
    json.shipping = this.shipping;
    json.tax = this.tax;
    json.items = packageItems(this.list);
    console.log(json)

    try{
      const result = await checkout(json);
      console.log(result);

      // set localStorage to emty array after checkout
      localStorage.setItem("so-cart", JSON.stringify([])); // search for JSON.parse and JSON.stringify
      location.assign("/checkout/success.html");
    }
    catch(err){
      console.log(err);
    }
    
  }
  
  
}
export default checkoutProcess;