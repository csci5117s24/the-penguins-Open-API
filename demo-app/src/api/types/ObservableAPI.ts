import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http';
import { Configuration} from '../configuration'
import { Observable, of, from } from '../rxjsStub';
import {mergeMap, map} from  '../rxjsStub';
import { Todo } from '../models/Todo';

import { TodoApiRequestFactory, TodoApiResponseProcessor} from "../apis/TodoApi";
export class ObservableTodoApi {
    private requestFactory: TodoApiRequestFactory;
    private responseProcessor: TodoApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: TodoApiRequestFactory,
        responseProcessor?: TodoApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new TodoApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new TodoApiResponseProcessor();
    }

    /**
     * Add a new todo to the store
     * Add a new todo to the store
     * @param todo Create a new todo
     */
    public addTodoWithHttpInfo(todo: Todo, _options?: Configuration): Observable<HttpInfo<Todo>> {
        const requestContextPromise = this.requestFactory.addTodo(todo, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.addTodoWithHttpInfo(rsp)));
            }));
    }

    /**
     * Add a new todo to the store
     * Add a new todo to the store
     * @param todo Create a new todo
     */
    public addTodo(todo: Todo, _options?: Configuration): Observable<Todo> {
        return this.addTodoWithHttpInfo(todo, _options).pipe(map((apiResponse: HttpInfo<Todo>) => apiResponse.data));
    }

}
