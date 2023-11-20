import { doc } from "prettier";
import { loadHeaderFooter, getParam }  from "./utils.mjs"

// Load the header and footer onto the page.
init();
async function init(){
    //loadHeaderFooter for cart/index.html
    await loadHeaderFooter();
}
//  Check for a url parameter called redirect (remember the utility function: getParam?)
const redirect = getParam('redirect');
//  Add an event listener to our login form's button, when the login button is clicked do the following:
document.querySelector('#loginBtn').addEventListener('click', ()=>{
    //  Get the username and password out of the form fields.
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
})

//  Pass those to the login function along with the redirect information we gathered above.