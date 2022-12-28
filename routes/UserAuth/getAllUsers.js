const route = require('express').Router()
const { getAllUsers } = require('../../controllers/UserControllers')
const verifyRoles = require("../../middlewares/verifyRoles");
const allowedRoles = require('../../config/allowedRoles')
route.get("/", verifyRoles(allowedRoles.Admin), getAllUsers);
module.exports = route
