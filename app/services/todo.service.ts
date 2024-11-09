import { APIGatewayProxyEventV2 } from "aws-lambda";
import { plainToClass } from "class-transformer";
import { autoInjectable, inject } from "tsyringe";
import { TodoValidator } from "../models/todo.model";
import TodoRepository from "../repositories/todo.repository";
import { AppValidationError } from "../utils/errors";
import { SuccessResponse, AppValidationResponse } from "app/utils/reponse";

@autoInjectable()
class TodoService {
  /// new todRepository
  private todoRepository: TodoRepository;

  constructor(@inject(TodoRepository) todoRepository: TodoRepository) {
    this.todoRepository = todoRepository;
  }

  public async createTodo(event: APIGatewayProxyEventV2) {
    const input = plainToClass(TodoValidator, JSON.parse(event.body));

    const error = await AppValidationError(input);
    if (error) return AppValidationResponse(error);
    return SuccessResponse(await this.todoRepository.create(input), 201);
  }

  public async getTodos(event: APIGatewayProxyEventV2) {
    const id = event.pathParameters?.id;
    if (id) {
      return SuccessResponse([await this.todoRepository.getById(id)]);
    }
    return SuccessResponse(await this.todoRepository.read());
  }

  public async updateTodo(event: APIGatewayProxyEventV2) {
    const id = event.pathParameters?.id; // query event.queryStringParameters?.id
    const input = plainToClass(TodoValidator, JSON.parse(event.body!));
    const error = await AppValidationError(input);
    if (error) return AppValidationResponse(error);
    return SuccessResponse(await this.todoRepository.update(id, input));
  }

  public async deleteTodoById(event: APIGatewayProxyEventV2) {
    const id = event.pathParameters?.id;
    if (!id) throw new Error("ID is required");
    return SuccessResponse(await this.todoRepository.delete(id), 200);
  }

  public async getTodoById(event: APIGatewayProxyEventV2) {
    const id = event.pathParameters?.id;
    if (!id) throw new Error("ID is required");
    return SuccessResponse(await this.todoRepository.getById(id), 200);
  }

  public async deleteAllTodos() {
    return SuccessResponse(await this.todoRepository.deleteAll(), 204);
  }
}

export default TodoService;
