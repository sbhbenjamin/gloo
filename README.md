# gloo

## Documentation
Full documentation is available [here](https://docs.google.com/document/d/1bVPTLPg8pEzMXdrCoE8WAIPHWew3eoUAmjKMPSIZJVk/edit#)

## Motivation
The COVID-19 pandemic and work-from-home arrangement have fuelled a growth in the home maintenance industry in Singapore. From experience, home maintenance services are typically sourced either through word-of-mouth, or through companies online. Customers do not have many substitutes to choose from as there is no one consolidated platform for them to compare the different services available. Furthermore, as an agency, there is a possibility of a vested interest in making their services look good, which could impact the way customer reviews are managed on their sites. At the same time, many skilled technicians source for customers through verbal recommendations. The main issue is that users looking for home services, and skilled technicians looking to offer their services do not exist on the same platform.

With the development of our consolidated platform, we aim to bridge the gap between consumers and skilled technicians and streamline this process. Digitalising the home maintenance industry can not only ensure more reliable options for consumers, but also help to increase revenue streams for freelance service providers. 

We aim to create a web-based consumer to consumer and business to consumer marketplace for buying and selling general utility services.



## Usage
### ES Modules 
We use ECMAScript Modules in the backend in this project. Be sure to have at least Node v14.6+ or you will need to add the "--experimental-modules" flag.

### Environment Variables
Create a .env file in then root and add the following
```
NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = 'abc123'
PAYPAL_CLIENT_ID = your paypal client id
```

### Install Dependencies (frontend and backend)
```
npm install
cd client
npm install
```

### Run
```
# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server
```

### Seeding Data
You can use the following commands to seed the database with sample users and products, as well as destroy all data
```
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```
```
# Sample User Logins

admin@example.com (Admin)
123456

john@example.com (Customer)
123456

jane@example.com (Customer)
123456
```

## Testing
Unit and Integration testing is conducted with React Testing Library and Jest. End to end testing is conducted using Cypress.





