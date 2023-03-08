import userDatamapper from "./user.datamapper.js";
import toolDatamapper from "./tool.datamapper.js";
import bookmarkDatamapper from "./bookmark.datamapper.js";
import categoryDatamapper from "./category.datamapper.js";
import tokenDatamapper from "./token.datamapper.js";
import avatarDatamapper from "./avatar.datamapper.js";

const db = {
  user: userDatamapper,
  tool: toolDatamapper,
  bookmark: bookmarkDatamapper,
  category: categoryDatamapper,
  toolsOnUsers: toolDatamapper,
  token: tokenDatamapper,
  avatar: avatarDatamapper,
};

export default db;
