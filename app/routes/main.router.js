import express from "express";
import { mainController as main } from "../controllers/index.controller.js";

const router = express.Router();

// POST Routes
/**
 * POST /login
 * @summary connection au site
 * @tags user
 * @param {user} request.body.required - user info
 * @return {object} 200 - bookmark response
 * @return {object} 500 - Unexpected error
 */
router.post("/login", main.login);
/**
 * POST /signup
 * @summary inscription au site
 * @tags user
 * @param {user} request.body.required - user info
 * @return {object} 200 - bookmark response
 * @return {object} 500 - Unexpected error
 */
router.post("/signup", main.signup);

export default router;