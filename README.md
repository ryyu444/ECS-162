# ECS-162 Homework 2: New York Times Webpage Clone

## Description
This project utilizes a Flask backend and Svelte frontend to mimic the New York Times frontpage. It displays news stories related to UC Davis.

## Installation and Usage
1. Clone the repository in your desired folder.
```
git clone https://github.com/ryyu444/ECS-162.git
```
2. Navigate to frontend and install necessary files.
```
cd ./frontend + npm install
```
3. Open a new terminal, navigate to HW2, and run the following docker command.
```
docker-compose -f docker-compose.dev.yml up --build
```
4. Go back to your terminal that is in frontend. Start the Svelte app with:
```
npm run dev
```
5. Navigate to generated localhost link and explore!

## Testing
### Backend Testing
To execute unit tests for the backend, navigate to the backend folder and running the following command:
```
pytest
```
### Frontend Testing
To execute unit tests for the frontend, navigate to the frontend folder and run the following command:
```
npm test
```

## Contributors
1. Ryan Yu 
2. James Fu

## License
MIT License