const express = require("express");
const router = express.Router();
let UserController = require("../Controllers/user-Controller");
const { AUTHENITCATE_MIDDLEWARE } = require("../Middlewares/auth-midleware");

// all routes goes here--->>
router.post('/user-registration', UserController.NEW_USER_REGISTRATION);
router.post('/user-login', UserController.USER_LOGIN);
router.patch('/user-logout/:id', UserController.USER_LOGOUT);
router.get('/get-user-details/:id', UserController.GET_USER_DATA);
router.patch('/user-account-update/:id', AUTHENITCATE_MIDDLEWARE, UserController.USER_ACCOUNT_UPDATE);

module.exports = router;
