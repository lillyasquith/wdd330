import { getLocalStorage } from "./utils.mjs";

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
    // let subTotal = 0;
    const numItems = this.list.length;
    // const subTotal = this.list.reduce((sum, item) => sum + item.FinalPrice
    // );
    this.list.forEach(item=> {
      // console.log(item.FinalPrice);
      this.itemTotal += item.FinalPrice;
    })
    console.log(numItems);
    // console.log(subTotal);

    document.querySelector('.numItems').innerHTML = numItems;
    document.querySelector(".cartTotal").innerHTML = `$${this.itemTotal}`;

  },
  calculateOrdertotal: function() {
    // calculate the tax amounts. Then use them to along with the cart total to figure out the order total
    const tax = 0.06;
    this.tax = this.itemTotal * tax
    

    // calculate the shipping
    const items = this.list.length;
    if (items == 1){
      this.shipping = 10;
    } else {
      this.shipping = ((items - 1) * 2) + 10; // 4 items, 1 =>10, 3 * 2 , 16
    };
    this.orderTotal = this.itemTotal + this.tax + this.shipping;
    // display the totals.
    this.displayOrderTotals();
  },
  displayOrderTotals: function() {
    // once the totals are all calculated display them in the order summary page
    document.querySelector(".tax").innerHTML = this.tax;
    document.querySelector(".shipping").innerHTML = this.shipping;
    document.querySelector(".orderTotal").innerHTML = this.orderTotal;
  },

  checkout: function(){
    
  }

  
  
}
export default checkoutProcess;