const { app } = require('@azure/functions');
const { ObjectId } = require('mongodb');
const mongoClient = require("mongodb").MongoClient;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    description: { type: String, required: true },
    done: { type: Boolean, default: false },
    id: { type: Number, required: true }
});

app.http('newTodo', {
    methods: ['POST'],
    authLevel: 'anonymous',
    route: 'todo',
    handler: async (request, context) => {
        await mongoose.connect(process.env.AZURE_MONGO_DB);
        const body = await request.json();
        //const auth_header = request.headers.get('X-MS-CLIENT-PRINCIPAL');
        const Todo = mongoose.model('Todo', todoSchema);
        const name = body.description ?? "Todo 1"
        const id = body.id ?? 1
        const done = body.done;
        const newTodo = new Todo();
        newTodo.description = name; 
        newTodo.id = id;
        newTodo.done = done;
        const savedTask = await newTodo.save(); //save the new Todo task
        return{
            status: 201, /* Defaults to 200 */
            jsonBody: savedTask
        };
    },
});