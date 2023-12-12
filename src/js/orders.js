import { checkLogin } from "./auth.mjs";
import { getorders } from "./externalServices.mjs";

const token = checkLogin();
console.log(token);

const orders = await getorders(token);
// console.log(orders);
const filtered = orders.filter(item => {
    return item.fname =='Ly' && item.lname=='Asquith';
})
console.log(filtered);