import { DeleteResult, Model } from "mongoose";
import { autoInjectable, inject } from "tsyringe";
import { ITodo, ITodoDocument } from "../models/todo.model";

@autoInjectable()
class TodoRepository {
  private model: Model<ITodoDocument>;

  constructor(@inject("TodoModel") model: Model<ITodoDocument>) {
    this.model = model;
  }
  public async create(data: Partial<ITodo>): Promise<ITodoDocument> {
    const newTodo = new this.model({ ...data });
    return await newTodo.save();
  }

  public async read(): Promise<ITodoDocument[]> {
    return await this.model.find();
  }

  public async update(
    id: string,
    update: Partial<ITodo>
  ): Promise<ITodoDocument | null> {
    return await this.model.findByIdAndUpdate(id, update, { new: true });
  }

  public async delete(id: string): Promise<Object> {
    const data = await this.model.findByIdAndDelete(id);
    return {
      message: "Deleted successfully",
      id: id,
    };
  }

  public async getById(id: string): Promise<ITodoDocument | null> {
    return await this.model.findById(id);
  }

  public async deleteAll(): Promise<DeleteResult> {
    return await this.model.deleteMany({});
  }
}

export default TodoRepository;
