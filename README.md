# Tech Demo of OpenAPI Specification and Swagger Editor

![OPEN_API logo](openapi_swagger.png)

## Introduction

Welcome to the Penguin's tech demo! Today we will be introducing you to the OpenAPI Specification (OAS) and the Swagger Editor tool. In this tech demo, we will guide you through the process of setting up and using OAS and Swagger, configuring code generation, and utilizing a testing toolkit to create robust API backends for your websites. Get ready to dive into the world of API documentation and development!

## Why Use Open API

The OpenAPI Specification (OAS) offers developers and teams a streamlined framework for structuring and documenting HTTP-based APIs. By adhering to this specification, all stakeholders in product development gain a cohesive and standardized method for API documentation. Moreover, OAS supports the generation of client code, the sending of requests, and the creation of test cases. Tools like the Swagger Editor leverage OAS to provide syntax error feedback, visualize APIs, facilitate HTTP requests, and more.

### Task 0: Get started with Swagger Editor

To get started, visit the [Swagger Editor website](https://editor.swagger.io/)

### Task 1: Setting up Open API in Swagger editor

_please note that all credit and attribution for setup process belongs to [SwaggerIO]()._

We are going to use the online version of swagger editor for this process. For more detailed and dedicated projects, they recommend using the full desktop client.

First, go to the website to use the [online swagger editor](https://editor.swagger.io/?_gl=1*1kmbfui*_gcl_au*MjA0NDYzNDQ1Ni4xNzEzMzE4MTAx&_ga=2.72475856.2107357273.1713318092-276513053.1713201288)
This page will show an editable document containing API configuration information. You can import a file to edit or work on the predefined template shown. 

![image](https://github.com/csci5117s24/the-penguins-Open-API/assets/96550351/6213f6d1-2cea-49cc-a32d-65eadd204953)

From here, anything you edit will change the results on the right-hand side of the page, which shows the specifications of your new API.

![image](https://github.com/csci5117s24/the-penguins-Open-API/assets/96550351/ae473ff5-fead-4354-b9bc-79094080a2b7)


If you would like to use the same schema document we used, you can download this repository through the following git command:
```bash
git clone repo
```

   


### Task 2: 
There are three main basic components of an OPENAPI document. The header, the requests, and the schemas for these requests.

#### The description:
The description part of the schema is used for documentation purposes. It is edited using Markdown language.
insert pic

#### The Requests
This section of your open API file is for defining the requests that you want to use for your API.
To set up a request, you must first create a path. This will act as your request URL.

![image](https://github.com/csci5117s24/the-penguins-Open-API/assets/96550351/0cef1f0b-3325-46d8-a924-041edb2dbf23)

Under each path you specify, you can chose which request types to use. For this example, we create a POST request. 
```yaml
paths:
  /todo:
    post:
```
Under the post request, we must define the Request body or Parameters if necessary. For post requests, we typically use the request body attribute so we can include multiple variables in creating an object, which will be based on our Schema, which we will create later.
```yaml
requestBody:
        description: Create a new todo
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/todo'
        required: true
```
This example request body will define the input request body with the "todo" schema that we have not yet defined. The last part of the Requests is the response section. Here we must define the expected responses from our request, such as 200: Normal, 404: Not Found, and other common examples relevant to your code.
```yaml
responses:
        '200':
          description: Successful operation
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/todo'
        '400':
          description: Invalid input
        '422':
          description: Validation exception
```

#### The Schemas

Once we have defined our request(s), we must create a schema that will define the attributes passed in our requests for different object types.
In our example, we look to create a todo schema, which is created to define what a new to-do list item will contain: a description, an id, and a done property.

```yaml
components:
  schemas:
    todo:
      type: object
      properties:
        id:
          type: integer
          format: int64
          example: 10
        description:
          type: string
          example: "Do Something"
        done:
          type: boolean
          example: false
```

A lot of the attributes within Open API such as "example" are very useful for designing detailed documentation, and you will be able to notice this on the right side of the page.

Once you have added your schema, you can now view your request on the right side. 

![image](https://github.com/csci5117s24/the-penguins-Open-API/assets/96550351/80ecb389-fc3a-4290-92d9-04c0fcbd4c94)


### Task 3: Creating a React app to work with your Open API

to start using this API schema, we must create a react app that will act as our front end for the API. The nice thing about the Swagger is that you can use most application types, and for our purposes, it can be generated in typescript or javascript.

```bash
npx create-react-app demo-app --template redux-typescript
cd demo-app
```


### Task 4: Create code for your Azure backend HTTP requests.

Unfortunately, there are no working code-generation resources for creating Azure Http requests, but many other backend API services support OpenAPI autogeneration.
We have provided a sample backend in the demo Git repository.

Make sure to change your local.settings.json file to contain your personal connection string
```json
{
    "Values": {
        "AZURE_MONGO_DB":"<INSERT CONNECTION STRING HERE>",
        "FUNCTIONS_WORKER_RUNTIME": "node"
    },
    "IsEncrypted": false
}
```

for our HTTP requests, we use Mongoose. if you would like to learn more about Mongoose as a utility for MongoDB, click here.
We then configure our code to comply with the schema and OpenApi requests we previously defined

```javascript
const { app } = require('@azure/functions');
const { ObjectId } = require('mongodb');
const mongoClient = require("mongodb").MongoClient;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    userID: { type: String, required: true, unique: true },
    lists: [{ type: Schema.Types.ObjectId, ref: 'Todo' }],
    // Add other user-related fields if needed (e.g., email, firstName, lastName)
});

const todoSchema = new Schema({
    text: { type: String, required: true },
    completed: { type: Boolean, default: false },
    id: { type: Number, required: true }
});



app.http('newTodo', {
    methods: ['POST'],
    authLevel: 'anonymous',
    route: 'todos',
    handler: async (request, context) => {
        await mongoose.connect(process.env.AZURE_MONGO_DB);
        const body = await request.json();
        const auth_header = request.headers.get('X-MS-CLIENT-PRINCIPAL');
        const Todo = mongoose.model('Todo', todoSchema);
        const Users = mongoose.model('Users', userSchema);
        const name = body.text ?? "Todo 1"
        
        const newTodo = new Todo();
        newTodo.text = name; 
        newTodo.id = body.id;
        const savedTask = await newTodo.save(); //save the new Todo task

        //add todo task to the user database.
        Users.findOneAndUpdate({userID: auth_header}, 
            { $set: { userId: auth_header }, $push: { lists: savedTask._id }}, 
            { new: true, upsert: true })
            .then(function(res) {
                console.log("lists " +res.lists)
            })
            .catch(function(err) {
                return {status: 404, jsonBody: err};
            });

        return{
            status: 201, /* Defaults to 200 */
            jsonBody: savedTask
        };
    },
});

```
Make sure to run ```bash npm install ``` in both your main project folder and the api backend folder, and if you are creating a project from scratch, run ```bash npm install mongoose```
Once this is done, go to your package.json file in your main project folder and make sure the following script is added with the other npm scripts
```json
"web": "npx @azure/static-web-apps-cli start http://localhost:3000 --run \"npm start\" --api-location ./api"
```

In your main project folder, you can now run
```bash
npm run web
```
to start your frontend and backend.

### Task 5: Test out your API!

With your API set up and configured, you can now test these endpoints using Swagger editor. 
Go back to your page that you created your schema. On the right hand side, you should see your specified endpoints and requests. Make sure to specify the correct server in the dropdown. 

![image](https://github.com/csci5117s24/the-penguins-Open-API/assets/96550351/04a63546-5cea-4e4c-a472-6208d0cd0fde)

For azure we use by default http://localhost:7071

![image](https://github.com/csci5117s24/the-penguins-Open-API/assets/96550351/818ec488-4f2f-4fee-8aab-ed7ee0f8531f)

Once you're ready to execute, click the "Execute" button. your response will then show up below near the expected server responses.

![image](https://github.com/csci5117s24/the-penguins-Open-API/assets/96550351/fbe338a8-e969-4959-a659-26e141a7c348)

### Next Steps

Now that you have your openAPI specification set up and communicating with your server, you can now use the OpenAPI ecosystem that has a lot of support and useful tools such as:
1. Postman Integration
2. Code generation for a variety of tech stacks
3. 

### Feature 1: integrate with Postman

OpenAPI lets you integrate with Postman to send requests and collaborate with others on API development. First, you must export your openAPI YAML file from swagger editor. Select File > Save as YAML.
In Postman's online or desktop client, create a workspace. Once in your workspace, you can drag and drop your YAML file into your workspace. Click import.

![image](https://github.com/csci5117s24/the-penguins-Open-API/assets/96550351/0c19efe3-d202-453d-9129-f1dc7b5924b0)

You can now use your API definition to send requests from Postman.

![image](https://github.com/csci5117s24/the-penguins-Open-API/assets/96550351/b0951379-549e-46d1-af54-90b638a4380d)

Postman also has many other OpenAPI features such as viewing and editing documentation, generating schemas, and much more.

### Feature 2: Generate Open API models in react

There are many libraries that can be used to generate fetch code for a variety of different tech stacks. For react, we found this [OpenApi Typescript Generator](https://openapi-generator.tech/docs/generators/typescript/) to work pretty well with some modifications.

first go to your root project directory and install the generator with

```bash
npm i -D openapi-typescript typescript
```

Then with our openapi schema in our project's root directory, we ran

```bash
mkdir ./src/api
npx openapi-generator-cli generate -i openapi.yaml -g typescript -o ./src/api
```

This generated all the request code from our API definition from open API, and it even generates auth middleware and other useful tools that you can easily implement. To learn more about the additional tools, you can visit LINK HERE.

To use the generated code, we must first remove the unnecessary imports that aren't being used in ```path ./src/api/index.ts```. You can remove the following lines of code:
```typescript
export { Configuration } from "./configuration"
export { PromiseMiddleware as Middleware } from './middleware';
```

Modify the import structure of ./src/models/ObjectSerializer.ts :
```typescript
import { Todo } from '../models/Todo';
export * from '../models/Todo';
```

Once that is complete, you can now use your generated API definitions!
An example of this in action for our post request:

```typescript
import './App.css';
import * as TodoApi from './api/index'
import { Todo } from './api/index';
import * as fs from 'fs';

const configuration = TodoApi.createConfiguration();
const apiInstance = new TodoApi.TodoApi(configuration);

let body:Todo = {
  id: 10,
  description: "Do Nothing",
  done: false,
};

export default function App() {
  function postTodo() {
    apiInstance.addTodo(body).then((data:any) => {
      console.log('API called successfully. Returned data: ' + data);
    }).catch((error:any) => console.error(error));
  }

  return (
    <div className="App">
      <button onClick={postTodo}>Post</button>
    </div>
  );
}
```


### Feature 3: Mock servers?

## Other Features and Abilities with OPENAPI

There are so many other programs and tools that can be used with OPENAPI, a detailed list can be found here: https://openapi.tools/


## Review and Discussion

To conclude, There are a lot of things to be absorbed that are described here in this end paragraph. If you've made it this far then you probably can submit your feedback! hope you enjoyed
