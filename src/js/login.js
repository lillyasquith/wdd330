
import { login } from "./auth.mjs";
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
document.querySelector('#loginBtn').addEventListener('click', (e)=>{
    e.preventDefault();
    //  Get the username and password out of the form fields.
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    // console.log(username);
    login({email, password}, redirect)
})

//  Pass those to the login function along with the redirect information we gathered above.