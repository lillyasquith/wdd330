const baseURL = import.meta.env.VITE_SERVER_URL
async function convertToJson(res) {
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    //throw new Error("Bad Response");
    throw { name: 'servicesError', message: data };
  }
}

// export function getData(category = "tents") {
//   return fetch(`../json/${category}.json`)
//     .then(convertToJson)
//     .then((data) => data);
// }

//Change the getData function to Pulling from an API
export async function getProductsByCategory(category) {
  console.log(category);
  const response = await fetch(baseURL + `products/search/${category}`);
  const data = await convertToJson(response);
  // console.log(data);
  return data.Result;
}
// export async function findProductById(id) {
//   const products = await getData();
//   return products.find((item) => item.Id === id);
// }

//Now we need to fix the findProductById method
//The API we are using now has the ability to query directly for this. 
//The URL for the API endpoint you need to hit is: baseURL + `product/${id}`
export async function findProductById(id) {
  const response = await fetch(baseURL + `product/${id}`);
  const product = await convertToJson(response);
  return product.Result;
}

export async function checkout(payload){
  const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(payload)
}
  return await fetch("http://server-nodejs.cit.byui.edu:3000/checkout", options).then(convertToJson);
}

