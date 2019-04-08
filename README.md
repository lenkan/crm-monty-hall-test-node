# crm-monty-hall-test

Ett förberett projekt baserat på create-react-app och express hello world (med några tillägg). 


### Systemkrav
[NodeJS](https://nodejs.org)  


### Development mode
#### Start client
```
cd client
npm install
npm start
```

#### Start server
```
cd server
npm install
npm start   
```

#### Verifikation
React appen har en komponent som pollar spring boot appens health endpoint och skriver ut svaret. Det som skrivs ut ska vara "UP" om allt funkar som det ska.
