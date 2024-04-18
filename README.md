# Tech Demo of OPEN API by Swagger

![OPEN_API logo]()

## Introduction

Welcome to the Penguin's tech demo! Today we will be walking you through how to set up and use Open API, an API schema planner, generator, and testing toolkit that can be used to create better API backends for your websites.

## Why Use Open API

OpenAPI streamlines web development for HTTP-based API designers by standardizing API descriptions, allowing frontend teams to integrate seamlessly with backend services through clear, auto-generated documentation. For instance, tools like Swagger UI enable developers to visualize and interact with the API directly, speeding up the testing and iteration of interactive website components. Code generation also facilitates quick adjustments to website functionality. 


### Task 0: Create an account with Swagger

![Sign up](https://swagger.io/tools/swagger-editor/)

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
npx create-react-app my-app
cd my-app
```

### Task 4: Generate Open API components in react

with our completed Open API specification, we can generate the typescript components for react automatically. On your swagger editor page, click "Generate Client" and then select "javascript" to download the generated files.

![image](https://github.com/csci5117s24/the-penguins-Open-API/assets/96550351/c1e04a43-cc21-427f-8c41-3d88c035dd89)

Now create a new folder in your source directory called "generated". you must then extract the files of the downloaded zip into this new folder. 

https://blog.logrocket.com/generating-integrating-openapi-services-react/

Next, Create your Azure Backend http requests. 

Finally, run    
npm install superagent 

### Task 5: Generate code for your Azure backend HTTP requests.

With Open API, you can generate templates for your API within your code database once you specify your endpoints and descriptions within your schema file.
https://azure.microsoft.com/en-us/updates/generate-a-new-function-app-from-an-openapi-specification/





### Task 6: Test out your API!

With your API set up and configured, you can now test these endpoints using Swagger editor. 
Go back to your page that you created your schema. On the right hand side, you should see your specified endpoints and requests. Make sure to specify the correct server in the dropdown. For azure we use by default http://localhost:7071

![image](https://github.com/csci5117s24/the-penguins-Open-API/assets/96550351/04a63546-5cea-4e4c-a472-6208d0cd0fde)

Next, Click on the API request you want to test out. Click on "Try it out." You can then fill in the request body and queries as necessary and click "Execute" when you're ready to test your request out. This will show you the response. 

## Other Features and Abilities with OPENAPI

## Review and Discussion

To conclude, There are a lot of things to be absorbed that are described here in this end paragraph. If you've made it this far then you probably can submit your feedback! hope you enjoyed
