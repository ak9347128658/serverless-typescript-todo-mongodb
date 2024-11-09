import { APIGatewayProxyEventV2 } from "aws-lambda";
import { ErrorResponse } from "../utils/reponse";
import { container } from "tsyringe";
import TodoService from "../services/todo.service";

const todoService = container.resolve(TodoService);

export const todoHandler = async (event: APIGatewayProxyEventV2) => {
  try {
    const httpMethod = event.requestContext.http.method.toLowerCase();

    switch (httpMethod) {
      case "get":
        return await todoService.getTodos(event);
      case "post":
        return await todoService.createTodo(event);
      case "patch":
        return await todoService.updateTodo(event);
      case "delete":
        return await todoService.deleteTodoById(event);
      default:
        return ErrorResponse(400, "Invalid HTTP Method");
    }
  } catch (error) {
    return ErrorResponse(500, error.message);
  }
};
