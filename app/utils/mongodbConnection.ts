import mongoose, { ConnectOptions } from "mongoose";
import { autoInjectable } from "tsyringe";

@autoInjectable()
class MongoDBConnection {
  private uri: string =
    "mongodb+srv://ak2311581:n89GlxaE8JxBMpx2@cluster0.ancybcx.mongodb.net/";
  private options: ConnectOptions;

  constructor(options: ConnectOptions) {
    this.options = options;
  }

  public async connect() {
    try {
      await mongoose.connect(this.uri, this.options);
      console.log("Connected to MongoDB");
    } catch (error) {
      console.log("Error in connecting to MongoDB", error);
    }
  }
  public async disconnect() {
    try {
      await mongoose.disconnect();
      console.log("Disconnected from MongoDB");
    } catch (error) {
      console.log("Error in disconnecting from MongoDB", error);
    }
  }
}

export default MongoDBConnection;

//mongodb+srv://ytak2311581:a1D5zKAyu5ZLIlVv@cluster0.ancybcx.mongodb.net/
