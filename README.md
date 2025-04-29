# ECS-162 Homework 2 - New York Times Webpage Clone

## Description
This project utilizes a Flask backend and Svelte frontend to mimic the New York Times frontpage. It displays news stories related to UC Davis.

## Installation and Usage
1. Clone the repository.
```
git clone  ...
```
2. Build and start docker container.
```
docker-compose up --build
```
3. Start project.
```
npm run dev
```
4. Navigate to generated localhost link.

## Testing
### Backend Testing
The following command tests the backend route to get the API key.
```
pytest
```
### Frontend Testing
We used Jest for Frontend Testing. Use the following command to install jest before testing.
```
npm install --save-dev ts-jest
```
The following command tests calls to the NYT API.
```
npm test
```

## Contributors
1. Ryan Yu 
2. James Fu

## License
MIT Lcense