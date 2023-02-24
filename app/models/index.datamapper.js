import userDatamapper from "./user.datamapper.js";
import mainDatamapper from "./main.datamapper.js";
import toolDatamapper from "./tool.datamapper.js";

const db = {
  user: userDatamapper,
  main: mainDatamapper,
  tool: toolDatamapper,
};

export default db;
