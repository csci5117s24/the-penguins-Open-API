# .TodoApi

All URIs are relative to *http://localhost:7071*

Method | HTTP request | Description
------------- | ------------- | -------------
[**addTodo**](TodoApi.md#addTodo) | **POST** /api/todo | Add a new todo to the store


# **addTodo**
> Todo addTodo(todo)

Add a new todo to the store

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .TodoApi(configuration);

let body:.TodoApiAddTodoRequest = {
  // Todo | Create a new todo
  todo: {
    id: 10,
    description: "Do Something",
    done: false,
  },
};

apiInstance.addTodo(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **todo** | **Todo**| Create a new todo |


### Return type

**Todo**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful operation |  -  |
**400** | Invalid input |  -  |
**422** | Validation exception |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


