import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http';
import { Configuration} from '../configuration'

import { Todo } from '../models/Todo';
import { ObservableTodoApi } from './ObservableAPI';

import { TodoApiRequestFactory, TodoApiResponseProcessor} from "../apis/TodoApi";
export class PromiseTodoApi {
    private api: ObservableTodoApi

    public constructor(
        configuration: Configuration,
        requestFactory?: TodoApiRequestFactory,
        responseProcessor?: TodoApiResponseProcessor
    ) {
        this.api = new ObservableTodoApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Add a new todo to the store
     * Add a new todo to the store
     * @param todo Create a new todo
     */
    public addTodoWithHttpInfo(todo: Todo, _options?: Configuration): Promise<HttpInfo<Todo>> {
        const result = this.api.addTodoWithHttpInfo(todo, _options);
        return result.toPromise();
    }

    /**
     * Add a new todo to the store
     * Add a new todo to the store
     * @param todo Create a new todo
     */
    public addTodo(todo: Todo, _options?: Configuration): Promise<Todo> {
        const result = this.api.addTodo(todo, _options);
        return result.toPromise();
    }


}



