# Shop-Cook App

![GitHub stars](https://img.shields.io/github/stars/OxiBo/shop-cook)
![GitHub forks](https://img.shields.io/github/forks/OxiBo/shop-cook)
![GitHub issues](https://img.shields.io/github/issues/OxiBo/shop-cook)
![GitHub license](https://img.shields.io/github/license/OxiBo/shop-cook)

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## About the Project

Shop-Cook App is an application designed to help users find recipes, modify the number of servings to adjust the ingredients list, create shopping lists, email the shopping lists, and create accounts for saving recipes.

## Features

- **Recipe Search**: Find recipes based on various criteria.
- **Serving Adjustment**: Modify the number of servings to automatically adjust the ingredients list.
- **Shopping List**: Create and manage shopping lists based on selected recipes.
- **Email Shopping List**: Send the shopping list to your email.
- **User Accounts**: Create and manage user accounts to save favorite recipes.

## Technologies

- **Backend**: Node.js, Express, Passport.js, SendGrid, MongoDB, Heroku
- **Frontend**: React, REST, HTML, Styled-Components

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB instance (local or cloud-based).

### Installation

1. **Clone the repository**:
   ```sh
   git clone https://github.com/OxiBo/shop-cook.git
   cd shop-cook

2. **Install dependencies:**

    ```sh
    npm install 
    cd client
    npm install
    cd ..
    ```
3. **Set up environment variables:**

   Create two files in the `/config` folder: `dev.js` and `prod.js`. These files should contain the necessary environment variables for development and production environments, respectively.

   Example `dev.js`:
   ```js
   // dev.js - Don't commit this
   module.exports = {
      googleClientID: process.env.GOOGLE_CLIENT_ID,
      googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
      sendGridKey: process.env.SENDGRID_KEY,
      mongoURI: process.env.MONGO_URI,
      cookieKey: process.env.COOKIE_KEY,
      redirectDomain: process.env.REDIRECT_DOMAIN
   };
   ```

   Additionally, create a keys.js file in the /config folder to determine which set of credentials to use based on the environment:
```js
   if (process.env.NODE_ENV === "production") {
  // we are in production
  module.exports = require("./prod");
} else {
  // we are in development
  module.exports = require("./dev");
}
```