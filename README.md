### welcome to "post application"


#### Technologies used
1. Express.js
2. MongoDb
3. Node.js
4. html
5. css
6. javaScript
7. pug

#### Libraries or modules needed
1. Mongoose
2. jsonwebtokens
3. bcrypt
4. nodemon
5. promisify
6. path
7. util
8. dotenv


#### How to use this api
1. first install the packages
````express
    npm i mongoose, nodemon, bcryptjs, jsonwebtoken, util, path
````

2. first install the modules
````express
    npm i express
    const app = express()
    const dotenv = require('dotenv')
    dotenv.config({path : "./config.env"})
    const mongoose = require('mongoose')
    const connect = mongoose.connect(process.env.CONNECTION).then(el=>{console.log("db coneection established")})
    const port = 8600 | process.env.port
    const server = app.listen(port, ()=>{
        console.log(`server is running at ${port}`)
    })
````

3. make a **config.env** file
    **use process.env.connection** line to excess this .env file, this file is available all over the application without any import
````express
    CONNECTION = "your mongo db connection string"
    STRING = "your Jsonwebtoken secret string"
````

4. to run application we have to write 2 commands
````express
  * npm install
  * npm run
````
