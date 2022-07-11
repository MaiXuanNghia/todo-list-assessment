const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const Todo = require('./model.js');
const app = express();
const mockList = require('./mock.json')
const cors = require('cors')



const connectToDb = async () => {
    try {
        await mongoose.connect(`mongodb://localhost:27017/todo-app`,  {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });
       if(await Todo.estimatedDocumentCount() === 0) {
        await Promise.all(mockList.map(async (item) => {
            const todo = new Todo({
                ...item
            })
            return await todo.save();
        }))
       }
       console.log("connection success");
    } catch (error) {
        console.log(error);
    }
}

connectToDb();

const schema = buildSchema(`
scalar Date
scalar void
type Todo {
    _id: String
    summary: String
    description: String
    dueDate: Date
    priority: Int
    isCompleted: Boolean        
}
type Query {
    getTodos(term: String): [Todo]
    getTodo(id: String): Todo
}
type Mutation {
    createTodo(summary: String, description: String, dueDate: Date, priority: Int): Todo
    updateTodo(id: String, summary: String, description: String, dueDate: Date, priority: Int, isCompleted: Boolean): Todo
    removeTodo(id: String): Todo
}
`);

const root = {
    getTodos: async ({term = ''}) => await Todo.find({summary: new RegExp(term, 'i')}),
    getTodo: async (args) => await Todo.findById(args.id),
    createTodo: async (args) => {const newTodo = new Todo({...args}); return await newTodo.save();},
    updateTodo: async ({id, ...args}) => {
        return await Todo.findByIdAndUpdate(id, {...args});
    },
    removeTodo: async ({id}) => {await Todo.findByIdAndRemove(id);}
}

app.use(cors())
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
    rootValue: root
  }),
);
 
app.listen(3000);