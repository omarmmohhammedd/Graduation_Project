const route = require( "express" ).Router()
const { Logout } = require( "../../controllers/UserControllers" )
route.get( "/", Logout )
module.exports=route