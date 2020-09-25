import axios from 'axios'



// const res = axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${spoonacularAPI_KEY}&query=pasta`).then(response =>  console.log(response))
// console.log(res)


// const res1 = axios.get(`https://api.spoonacular.com/recipes/511728/information?apiKey=${spoonacularAPI_KEY}`).then(response =>  console.log(response))
// console.log(res1)

export default axios.create({
    baseURL: "https://aaaaaapi.spoonacular.com/recipes",
    params: {
        apiKey: process.env.REACT_APP_SPOONACULAR_API_KEY,
        // number: 10
      }
})