import Core from "./core.js";
import client from "../services/dbClient.js";

class User extends Core {
    static tableName = 'user';
}
export default User;