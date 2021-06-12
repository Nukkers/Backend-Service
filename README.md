# Backend-Service
A backend service built using NodeJS and ExpressJS.

# Running locally
- Clone the repo to your local machine
- `cd` into the `Backend-Service` folder
- Run `npm install`
- Run `node server.js` to run the server locally
- You can then start up Postman or Insomnia to test the endpoints

# Running Tests
- `npm run test` should fire off all the tests

# Endpoints
- `/subscribe` is a `get` endpoint. Takes the callers IP address and stores it locally. This helps keep track of the total number of streams running locally.
- `/unsubscribe` is a `get` endpoint. Takes the callers IP address. Checks if this is already stored locally, if true then decrement the total number of streams associated with that IP address.


# Logging
- This service currently does not support any logging. If this service was to be productionised then I would use `CloudWatch` to add logging. Some of the data that would be stored would include: date and time, requester identity such as User ID and IP address or referral URL, the actual request data, the requested endpoint URL and the body.

# Scaling
- To scale this application I would do the following. Create a `lambda` function which does exactly what this NodeJS service does.
- Using AWS as my choice of service allows the application to scale for millions of users easily without adding heavy costs.
- We could then consider which scaling method would fit better for our service - Horizontal or Vertical scaling.
- We would also be able to replicate our data into multiple zones allowing our app to both be available and accurate.
- We could use `AWS ElastiCache` to cache our data and improve the latency
- I would also add a load balancer to help route traffic. A service like AWS `route53`