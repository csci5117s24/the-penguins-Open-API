import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http';
import { Configuration} from '../configuration'

import { Todo } from '../models/Todo';

import { ObservableTodoApi } from "./ObservableAPI";
import { TodoApiRequestFactory, TodoApiResponseProcessor} from "../apis/TodoApi";

export interface TodoApiAddTodoRequest {
    /**
     * Create a new todo
     * @type Todo
     * @memberof TodoApiaddTodo
     */
    todo: Todo
}

export class ObjectTodoApi {
    private api: ObservableTodoApi

    public constructor(configuration: Configuration, requestFactory?: TodoApiRequestFactory, responseProcessor?: TodoApiResponseProcessor) {
        this.api = new ObservableTodoApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Add a new todo to the store
     * Add a new todo to the store
     * @param param the request object
     */
    public addTodoWithHttpInfo(param: TodoApiAddTodoRequest, options?: Configuration): Promise<HttpInfo<Todo>> {
        return this.api.addTodoWithHttpInfo(param.todo,  options).toPromise();
    }

    /**
     * Add a new todo to the store
     * Add a new todo to the store
     * @param param the request object
     */
    public addTodo(param: TodoApiAddTodoRequest, options?: Configuration): Promise<Todo> {
        return this.api.addTodo(param.todo,  options).toPromise();
    }

}
