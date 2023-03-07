import userDatamapper from "./user.datamapper.js";
import toolDatamapper from "./tool.datamapper.js";
import bookmarkDatamapper from "./bookmark.datamapper.js";
import categoryDatamapper from "./category.datamapper.js";
import tokenDatamapper from "./token.datamapper.js";

const db = {
  user: userDatamapper,
  tool: toolDatamapper,
  bookmark: bookmarkDatamapper,
  category: categoryDatamapper,
  token: tokenDatamapper,
};

export default db;
