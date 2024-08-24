### Important Note

I think I made a mistake in the challenge submission form, because I think I added as a link to the app the deployment of one of the first commits I made, if so the link will be composed by some letters and numbers that identify a deployment for a specific commit in Vercel (where the frontend is deployed) e.g: https://restaurant-donations-frontend-7tfc3p54y.vercel.app/ if this is the case can you use this link instead please?: https://restaurant-donations-frontend-app.vercel.app 🥹. Thanks!

### Restaurant Donations App

This project was made based on the following diagram:

![restaurant app drawio](https://github.com/user-attachments/assets/73db8bcd-e3d9-4aef-bebc-04b2ed7b8240)

In this repo you can find the code for the four services represented in the diagram

- Frotend: restaurant-donations-frontend
- Consumer Service: restaurant-donations-consumer-service
- Kitchen Service: restaurant-donations-kitchen-service
- Food Storage Service: restaurant-donations-food-storage-service

### Explanation

- Frotend: Is in charge of displaying and creating orders either one by one or in bulk, it shows in real time the orders that are “under preparation” and the orders that are “completed'. You can visualize the available recipes to be prepared by the kitchen and how many ingredients the winery has available.

- Consumer Service: Is in charge of notifying the frontend via websockets when an order is ready or in preparation by listening to Kafka's events.

- Kitchen Service: It is in charge of receiving the orders sent by the frontend, choosing one of the available recipes at random and requesting the necessary ingredients to prepare the dish to the food storage service, it is in charge of telling Kafka when an order is under preparation and when it is completed.

- Food Storage Service: It is in charge of checking if there are available ingredients requested by the kitchen service using a database where it keeps track of the amount of available ingredients, if there are not, it buys the ingredients from the food marketplace until it gets the necessary ingredients, if it has any left over it saves the unused ones in the database.

### Deploy

- Frontend: https://restaurant-donations-frontend-app.vercel.app

- Consumer Service: https://restaurant-donations-consumer-production.up.railway.app (Base Api since dont have any available endpoints)

- Kitchen Service: https://restaurant-donations-kitchen-production.up.railway.app/api (Swagger Documentation)

- Food Storage Service: https://restaurant-donations-foodstorage-production.up.railway.app/api (Swagger Documentation)
