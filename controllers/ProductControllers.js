const productSchema = require( "../model/Products" )
const getAllProducts = async ( req, res ) =>
{
    const allProducts = await productSchema.find( {} ).exec()
    res.status(200).json({ allProducts } )
}
const AddNewProduct = async ( req, res ) =>
{
  const { name, flavor, price, quantity, weight, validDate, expDate } = req.body
  console.log(name)
    const imgPath = req.file && req.file.path
    if ( !name || !flavor || !price || !quantity || !weight || !validDate || !expDate ) res.json( { "message": "All Fields Are Required " } ).status( 400 )
    try
    {
        const duplicate = await productSchema.findOne( { name: name, price: price } ).exec()
        if ( !duplicate )
        {
            await productSchema.create( {name,flavor,price,quantity,weight,validDate,expDate,img:"http://localhost:3500/"+imgPath} )
            res.sendStatus( 201 )
        }
        else { res.status( 409 ).json( { "id": duplicate.id } ) }

    }
    catch (e) { console.log(e) }
}
const updateProduct = async ( req, res ) =>
{
    const { productId } = req.params;
    if ( req.query.quantity )
    {
        try
        {
            var productQuantity = parseInt( req.query.quantity )
            const foundProduct = await productSchema
              .findOne({ productId })
              .exec();
            await productSchema
              .findOneAndUpdate(
                { productId },
                { quantity: foundProduct.quantity + productQuantity }
              )
              .exec();
            res.sendStatus( 201 )
        }
        catch ( e ) { console.log( e ) }
    }
    else
    {
        const imgPath = req.file && req.file.path 
        const { name, flavor, price, quantity, weight, validDate, expDate } = req.body
        await productSchema
          .findOneAndUpdate(
            { productId },
            {
              name,
              flavor,
              price,
              quantity,
              weight,
              validDate,
              expDate,
              img: "http://localhost:3500/" + imgPath,
            }
          )
          .exec();
        res.sendStatus( 201 )
    }

}
const deleteProduct = async ( req, res ) =>
{
    const { productId } = req.params;
    try
    {
        const removeUser = await productSchema.findByIdAndRemove({_id: productId });
        res.sendStatus( 200 )
    }
    catch(e){console.log(e)}
}

module.exports = { getAllProducts, AddNewProduct, updateProduct, deleteProduct }