# Drone Coding Test

## Drone Delivery Service

A squad of drones is tasked with delivering packages for a major online reseller in a world
where time and distance do not matter. Each drone can carry a specific weight and can make
multiple deliveries before returning to home base to pick up additional loads; however, the goal
is to make the fewest number of trips as each time the drone returns to home base, it is
extremely costly to refuel and reload the drone.
The purpose of the written software is to accept input which will include the name of each
drone and the maximum weight it can carry, along with a series of locations and the total weight
needed to be delivered to that specific location. The software should highlight the most efficient
deliveries for each drone to make on each trip.
Assume that time and distance to each drop off location do not matter, and that the size of
each package is also irrelevant. It is also assumed that the cost to refuel and restock each
drone is a constant and does not vary between drones. The maximum number of drones in a
squad is 100, and there is no maximum number of deliveries which are required.

### Solution Provided

Please supply an input data file. The client should be able to run the project and display results.

### Given Input

Line 1: [Drone #1 Name], [#1 Maximum Weight], [Drone #2 Name], [#2 Maximum Weight], etc.
Line 2: [Location #1 Name], [Location #1 Package Weight]
Line 3: [Location #2 Name], [Location #2 Package Weight]
Line 4: [Location #3 Name], [Location #3 Package Weight]
Etc.

### Expected Output

[Drone #1 Name]
Trip #1
[Location #2 Name], [Location #3 Name]
Trip #2
[Location #1 Name]

[Drone #2 Name]
Trip #1

[Location #4 Name], [Location #7 Name]
Trip #2
[Location #5 Name], [Location #6 Name]

### Algorithm:
The implemented algorithm aims to optimize the delivery of packages by a fleet of drones, minimizing the number of trips made by each drone. Initially, information about the drones is extracted, including their names and maximum weight capacities, as well as details of each package, such as name and weight. Subsequently, the packages are efficiently distributed among the drones, considering each drone's maximum capacity. The final output showcases the trips made by each drone, highlighting the packages delivered in each trip.

### Step-by-Step Solution:
The solution begins with reading the input file, extracting information about the drones and packages. Drones are then sorted in descending order of weight capacity, ensuring that the most capable drones are used more efficiently. Package distribution occurs iteratively, prioritizing drones with higher capacity. The final output is generated, emphasizing the drones, the trips made, and the packages delivered on each trip. This approach provides an efficient delivery, minimizing the overall number of trips made by the drone fleet.

### Project Structure
```
├── public/
│   └── index.html
├── src/
│   ├── controllers/
│   │   └── DroneDeliveryController.js
│   ├── services/
│   │   ├── tests/
│   │   │   ├── DroneDeliveryService.spec.js
│   │   │   └── InputTest.txt
│   │   └── DroneDeliveryService.js
│   ├── uploads
│   ├── routes.js
│   └── server.js
├── .env.exemple
├── .gitignore
├── nodemon.json
├── package-lock.json
├── package.json
└── README.md
```

### Running the Project

#### Clone the repository
```
git clone https://github.com/nogueiracandido/drone-delivery-service.git
```
#### Enter the project directory
```
cd drone-delivery-service
```
#### Install dependencies
```
npm install
```
#### Configure .env file 
###### _Make sure that your port 3333 is available or change it in the file_
```
 cp .env.example .env
```
#### Run the project
```
 npm run dev
```

**Main Language: Node.js v20.11.1**


###  Dependencies

| Dependency  | Purpose                       |
| ----------- | ----------------------------- |
| dotenv      | Load environment variables    |
| express     | Web application framework     |
| fs          | File system module            |
| multer      | Middleware for handling files |
| nodemon     | Monitor for changes in files  |

### Dev Dependencies

| Dependency          | Purpose                           |
| ------------------- | --------------------------------- |
| @vitest/coverage-v8 | Code coverage tool for V8 engine   |
| vitest              | Testing library for JS projects |


### Additional Commands

#### Run the application tests
```
npm run test
```

#### To view the test coverage of the application
###### _Open in the browser: `/coverage/index.html_
###### _Alternatively, check the terminal output:_
```
npm run test:coverage
```