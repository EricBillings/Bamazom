# Bamazon


This project is an e-commerce application that utilizes mySQL to update store stock levels in real-time.

## Technologies Used

* javascript-programming language
* node.js
* npm express server package
* npm path for file handling
* nodemon for keeping the server up
* sequelize for SQL database transactions
* bootstrap for css styling
* heroku for app deployment

## Deployed Version Links
<https://ericbillings.github.io/Bamazon/>

<https://github.com/EricBillings/Bamazon.git>

<https://sleepy-river-75189.herokuapp.com/>

## To get started with the program: 

1. Clone the repository to your local machine.

1. Run npm install on the command line to install local dependencies. 
 
1. Use node to start your server.

1. Initiate a SQL database using the schema file provided.

1. Execute npm run seed from the command line to seed the database.

1. Navigate to local host on your browser.


## Using the app

1.  Items are added to the store page html dynamically based on the data in the database.

1.  Items can be added, deleted, or updated with your SQL editor and automatically reflected in the store.

1.  Items added to the user's cart are stored in local storage and rendered dynamically on the cart page. 

1.  If the user's cart quantity exceeds the stock quantity available in the database, the user is notified and the transaction cannot be completed.

1. Upon click of the purchase button, the stock quantities are adjusted by the cart quantities.

## Future Updates

1.  Allow for adding, deleting, and updating items via a manager page.

1.  Flesh out the "checkout" process to include payment processing and shipping options.

1.  Allow for cart editing (quantity adjustment or item removal).




## Help with the app

Message Eric_Billings (developer & maintainer) on GitHub for assistance with the application.

## About the developer

Visit Eric's portfolio page to see this and other projects:

<https://ericbillings.github.io/Bootstrap-Portfolio/>