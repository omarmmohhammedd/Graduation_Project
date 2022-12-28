const cartSechema = require("../model/Cart");
const productSchema = require("../model/Products")
const getCart = async (req, res) => {
  const { userId } = req.params
  const findCart = await cartSechema.findOne({userId}).exec();
  if (findCart) res.send(findCart)
  else res.status(403).json({ "message":"Cart not found"})
}
const AddtoCart = async (req, res) => {
    const { productId, quantity } = req.body
    const { userId } = req.params
    try {
      const duplicateCart = await cartSechema.findOne({ userId }).exec();
      const productInfo = await productSchema.findOne({ id: productId }).exec();
      if (duplicateCart) {
            const userProducts = duplicateCart.products
            var duplicateProduct =false
            userProducts.forEach((e) => e.productId.equals(productId)?duplicateProduct=e:null);
          if (duplicateProduct) {
            duplicateProduct.quantity = duplicateProduct.quantity + quantity
            duplicateProduct.totalPrice= duplicateProduct.quantity * productInfo.price
                await duplicateCart.save();
                res.sendStatus(200)
            } else {
                 duplicateCart.products = [
                   ...userProducts,
                   { productId, quantity, totalPrice: quantity *  productInfo.price}
                ];
                      await duplicateCart.save();
                      res.sendStatus(200)
            }
        }
        else {
                await cartSechema.create({
                  userId: userId,
                  products: [
                    {
                      productId,
                      quantity,
                      totalPrice: quantity * productInfo.price,
                    },
                  ],
                });
             res.sendStatus(200);}
    }
    catch(e){console.log(e)}
};
const deleteCart = async (req, res) => { 
  const { productId } = req.body
  const { userId } = req.params
  const foundCart = await cartSechema.findOne({ userId }).exec();
  if (foundCart) {
    var userProducts = foundCart.products
    if (userProducts.length > 1) {
      foundCart.products = foundCart.products.filter(product => !product.productId.equals(productId) && product);
      await foundCart.save()
      res.sendStatus(200);
    }
    else { 
      try {
          const removeCart = await cartSechema.findByIdAndRemove({ _id: foundCart._id }).exec(); 
          res.sendStatus(200);
      }
      catch(e){console.log(e)}
    }
   }
}
module.exports = { AddtoCart ,getCart,deleteCart};