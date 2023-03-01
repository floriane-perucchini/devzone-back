import userDatamapper from "./user.datamapper.js";
import mainDatamapper from "./main.datamapper.js";
import toolDatamapper from "./tool.datamapper.js";
import bookmarkDatamapper from "./bookmark.datamapper.js";

const db = {
  user: userDatamapper,
  main: mainDatamapper,
  tool: toolDatamapper,
  bookmark: bookmarkDatamapper,
};

export default db;
