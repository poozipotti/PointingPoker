# Pointing Poker    

This is a fun little weekend project to start learning some flask and more about websockets. Expect more soon!

inspired by: https://www.pointingpoker.com/

## Running the App
```
First start the websocket server
 ```
cd socket_server
export FLASK_APP=server
export FLASK_DEBUG=True
flask run 
```
Then start the react app
 ```
cd client
yarn 
yarn start 
```