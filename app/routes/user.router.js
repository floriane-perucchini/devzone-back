import express from "express";
import userController from "../controllers/user.controller.js";

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
/**

// GET Routes
/**
 * GET /v1/user
 * @summary Génère un user
 * @tags user
 * @return {string} 200 - un ou plusieurs users"
 * @return {object} 500 - Unexpected error
 */
router.get('/users', userController.getAllUser);
router.get('/user', userController.getUser);

/**
 * POST /user
 * @summary ajout d'un nouveau user
 * @tags user
 * @param {user} request.body.required - user info
 * @return {object} 200 - bookmark response
 * @return {object} 500 - Unexpected error
 */

// POST Routes
router.post("/user", userController.createUser);


/**
 * PATCH /user/:id
 * @summary modification d'un user
 * @tags user
 * @param {user} request.body.required - user info
 * @return {object} 200 - bookmark response
 * @return {object} 500 - Unexpected error
 */

// PATCH Routes
router.patch('/user/:id', userController.updateUser);


/**
 * DELETE /user/:id
 * @summary suppression d'un user
 * @tags user
 * @param {user} request.body.required - user info
 * @return {object} 200 - bookmark response
 * @return {object} 500 - Unexpected error
 */

// DELETE Routes
router.delete('/user/:id', userController.deleteUser);

export default router;
