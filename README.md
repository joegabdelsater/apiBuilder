# Description
An npm package for transforming your postman collection into JavaScript files and functions that you used to code manually.
This package uses and automatically installs the Axios Http library.

# Installation
`npm i yllw-postman-to-functions`

# Usage
After installation, place your postman collection in the project's root. Make sure you rename it to postman.json.

The build script is automatically added to your package.json, you can simply run `npm run yllw-build`, you will notice that a directory called 'services' is created in your project's root directory.

