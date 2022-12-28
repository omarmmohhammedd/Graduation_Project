const route = require( "express" ).Router()
const { ForgetPassword } = require( "../../controllers/UserControllers" )
route.post( "/", ForgetPassword )
module.exports = route