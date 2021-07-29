# Description
An npm package for transforming your postman collection into JavaScript files and functions that you used to code manually.
This package uses the Axios Http library.

# Installation
if you wish to install the axios library:
`npm i yllw-postman-to-functions axios`

Or if you already have it installed use:
`npm i yllw-postman-to-functions`

# Usage
After installation, place your postman collection in the project's root. Make sure you rename it to postman.json.

The build script is automatically added to your package.json, you can simply run `npm run yllw-build`, you will notice that a directory called 'services' is created in your project's root directory.

Inside this folder you will find different folders based on how you grouped your postman collection (Auth calls, products, categories, etc ... ).

Right inside the folder you will notice a file which exports the URL constant, fill in your base URL to be used with all your endpoints.

# IMPORTANT NOTES:
1- Make sure that your postman collection has your based URL as an environment variable, otherwise your endpoints might create the base url statically.

2- If your postman collection contains too many nested folders, make sure you fix the path the url file which contains your base url

3- Unfortunately at this stage URL parameters are not taken into account, these will have to be replaced manually, example:
```
export const getCategoryProducts = () => {
    return axios.get(URL + '/category/1/products');
}
```
 should be manually replaced to: 

 ```
 export const getCategoryProducts = (categoryId) => {
    return axios.get(URL + `/category/${categoryId}/products`);
}
 ```

