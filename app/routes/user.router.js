import express from "express";
import { userController as user } from "../controllers/index.controller.js";
import { validateUser as validate } from "../middlewares/validators/index.validator.js";
import { auth } from "../middlewares/index.middleware.js";

const router = express.Router();
/**
 * user
 * @typedef {object} user
 * @property {string} lastname - nom
 * @property {string} firstname - prénom
 * @property {string} email - email
 * @property {string} password - mot de passe
 * @property {string} pseudo - pseudo
 * @property {string} avatar - avatar
 */

// GET Routes
/**
 * GET /v1/user
 * @summary Génère un user
 * @tags user
 * @return {string} 200 - un ou plusieurs users"
 * @return {object} 500 - Unexpected error
 */

router.get("/users", auth, user.getAll);
router.get("/user/:id", auth, user.get);

// PATCH Routes
/**
 * PATCH /user/:id
 * @summary modification d'un user
 * @tags user
 * @param {user} request.body.required - user info
 * @return {object} 200 - bookmark response
 * @return {object} 500 - Unexpected error
 */
router.patch("/user/:id", validate, user.update);

// DELETE Routes
/**
 * DELETE /user/:id
 * @summary suppression d'un user
 * @tags user
 * @param {user} request.body.required - user info
 * @return {object} 200 - bookmark response
 * @return {object} 500 - Unexpected error
 */
router.delete("/user/:id", user.delete);

export default router;
