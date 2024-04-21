import React, { useEffect } from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
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

function App() {

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

export default App;
