import { Document, Schema, model, Model } from "mongoose";
import { IsString, Length, IsBoolean, IsOptional } from "class-validator";
import { container } from "tsyringe";

interface ITodo {
  title: string;
  description: string;
  completed: boolean;
}

class TodoValidator implements ITodo {
  @IsString()
  @Length(2, 50)
  title: string;

  @IsString()
  @Length(2, 100)
  description: string;

  @IsOptional()
  @IsBoolean()
  completed: boolean;
}

interface ITodoDocument extends ITodo, Document {}

const todoSchema = new Schema<ITodoDocument>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const TodoModel: Model<ITodoDocument> = model("Todo", todoSchema);
container.register<Model<ITodoDocument>>("TodoModel", { useValue: TodoModel });

export { ITodo, ITodoDocument, TodoModel, TodoValidator };
