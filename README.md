# ECS-162 Homework 2 - New York Times Webpage Clone

## Description
This project utilizes a Flask backend and Svelte frontend to mimic the New York Times frontpage. It displays news stories related to UC Davis.

## Installation and Usage
1. Clone the repository.
```
git clone https://github.com/ryyu444/ECS-162.git
```
2. Install necessary files.
```
npm install
```
3. Build and start docker container inside HW2 directory.
```
docker-compose up --build
```
4. Start project in frontend folder.
```
npm run dev
```
5. Navigate to generated localhost link.

## Testing
### Backend Testing
The following command tests the backend route to get the API key and should be run from the backend test folder.
```
pytest
```
### Frontend Testing
The following command tests calls to the NYT API and should be run from the frontend test folder.
```
npm test
```

## Contributors
1. Ryan Yu 
2. James Fu

## License
MIT Lcense