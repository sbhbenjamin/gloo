# gloo
https://gloo-fixr.herokuapp.com/

The COVID-19 pandemic and work-from-home arrangement have fuelled a growth in the home maintenance industry in Singapore. From experience, home maintenance services are typically sourced through word-of-mouth or unverified websites which may result in unsatisfactory service quality. Similarly, many skilled technicians source for clients through verbal recommendations. 

With the development of our consolidated platform, we aim to streamline this process by bridging the gap between consumers and service providers. Digitalising the home maintenance industry can not only ensure more reliable options for consumers, but also help to increase revenue streams for freelance service providers. 


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





