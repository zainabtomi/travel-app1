##zainab tomi

# FEND Capstone - Travel App

This project is a travel application designed to help users plan their trips efficiently. Users can enter a destination and departure date, and the app will provide weather forecasts and images of the destination to aid in travel planning.

## Project Overview

This is a Front-End Capstone project for Udacity, developed as part of the Front-End Web Development (FEND) Nanodegree program. The app uses several external APIs to fetch relevant data, including:

- **Geonames API:** Provides geographic data, including latitude and longitude for locations.
- **Weatherbit API:** Supplies weather forecasts for the entered destination.
- **Pixabay API:** Retrieves images related to the destination.

## APIs Used

- **Geonames:** Fetches geographic data (latitude and longitude) based on the user's input location.
- **Weatherbit:** Provides weather forecasts for the entered destination.
- **Pixabay:** Retrieves relevant images of the destination for visual reference.

## Application Structure

Travel App/
│── dist/                      # Distribution folder (bundled files)
│   ├── bundle.js              # Compiled JavaScript bundle
│   ├── index.html             # Main HTML file
│   ├── service-worker.js      # Service worker for caching
│
│── src/                       # Source files
│   ├── client/                # Frontend source code
│   │   ├── js/                # JavaScript files for client-side logic
│   │   │   ├── app.js         # Main client-side script
│   │   │   ├── app.test.js    # Client-side test script
│   │   ├── styles/            # SCSS stylesheets
│   │   │   ├── img/           # Image assets
│   │   │   ├── footer.scss
│   │   │   ├── form.scss
│   │   │   ├── header.scss
│   │   │   ├── responsive.scss # Styles for responsiveness
│   │   ├── views/             # HTML and view-related files
│   │   │   ├── index.html     # Main frontend page
│   │   │   ├── index.js       # JavaScript handling views
│   │   ├── service-worker.js  # Client-side service worker
│
│   ├── server/                # Backend source code
│   │   ├── server.js          # Main server entry point (likely Node.js/Express)
│   │   ├── server.test.js     # Backend test script
│
│── node_modules/              # Dependencies installed via npm
│── .babelrc                   # Babel configuration file
│── package.json               # Project metadata and dependencies
│── package-lock.json          # Lockfile for package versions
│── README.md                  # Documentation and setup guide
│── webpack.config.js          # Webpack main configuration file
│── webpack.dev.js             # Webpack development config
│── webpack.prod.js            # Webpack production config



Node.js Version
This project requires Node.js version 20.15.1. Make sure to have the correct version installed by checking with:
node -v

Project Dependencies
The app relies on the following npm packages:

Express: A fast, unopinionated, minimalist web framework for Node.js.
Webpack: A module bundler to manage and optimize JavaScript, CSS, and other assets.
Babel: A JavaScript compiler for ES6+ support, allowing backward compatibility for older browsers.
Jest: A testing framework to run unit tests and ensure the application works as expected.

HHow to Set Up and Run the App
Follow these steps to set up and run the app locally:

Clone the repository:
Clone the project repository to your local machine.

Install dependencies:
Navigate to the project directory and run the following command to install the necessary npm packages:
npm instal

Build the project: After installing dependencies, compile the project files by running:
npm run build

Start the server: Start the application server with the following command:
npm start

Access the app: Open your browser and go to http://localhost:8001 to use the application.
Running Tests
The project includes tests that ensure the app functions correctly. To run the tests, use the following command:

npm test


📅 Feature Highlights
Destination search with auto-suggestions

Date picker for trip planning (MM/DD/YYYY format)

Dynamic itinerary generation

Offline support via service worker
