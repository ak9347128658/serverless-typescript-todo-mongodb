import "reflect-metadata";
import { container } from "tsyringe";
import MongoDBConnection from "./utils/mongodbConnection";
export * from "./handlers/todo.handler";
// export * from "./handlers/user.handler";
container.resolve(MongoDBConnection).connect();
