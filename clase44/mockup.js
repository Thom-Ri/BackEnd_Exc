////////////////////cart//////////////////

const schema = buildSchema(`
    type Cart {
        id: ID!,
        creation : String,
        products : Array 
    }
    input CartInput{
        creation : String,
        products : Array
    }

    type Query{
        getAll(campo:String, valor: String): [Cart]
        getOne(id: ID!): Cart

    }

    type Mutation{
        create(datos: CartInput):Cart,
        update(id: ID!, datos: CartInput):Cart,
        Cartdelete(id: ID!): Cart,
    }
`)

class Cart{
    constructor(id,creation,products){
        this.id = id
        this.creation= creation
        this.products= products
    } 
}
const Carts= []
////resolvers
const getAll=({campo, valor})=>{
    if(campo && valor){
        return Carts.filter(cart => cart[campo] === valor)
    }
    return Carts
}
const getOne=({id})=>{
    const cart = Carts.find(cart => cart.id === id)
    if(!cart){
        throw new Error ('user not found')
    }
}

const create=({datos})=>{
    const id = crypto.randomBytes(10).toString('hex')
    const newCart = new User(id,datos.creation,datos.products)
    Carts.push (newCart)
    return newCart
}
const update=({id,datos})=>{
    const cartIndex = Carts.findIndex(cart => cart.id === id)
    if(cartIndex === -1){
        throw new Error ('user not found')
    }
    users[cartIndex].creation = datos.creation
    users[cartIndex].products = datos.products
    return Carts[cartIndex]
}
const Cartdelete=({id})=>{
    const cartIndex = Carts.findIndex(cart => cart.id === id)
    if(cartIndex === -1){
        throw new Error ('user not found')
    }
    const cart = Carts[cartIndex]
    Carts.splice(cartIndex,1)
    return cart
}


//////////////////////////PRODUCT//////////////////////////////

const schema = buildSchema(`
    type Product {
        id: ID!,
        title : String,
        price : int,
        text : String,
        code : String,
        stock : String
    }
    input ProductInput{
        title : String,
        price : int,
        text : String,
        code : String,
        stock : String
    }

    type Query{
        getAll(campo:String, valor: String): [Product]
        getOne(id: ID!): Product

    }

    type Mutation{
        create(datos: ProductInput):Product,
        update(id: ID!, datos: ProductInput):Product,
        Productdelete(id: ID!): Product,
    }
`)
class Product{
    constructor(id,title,price,text,code,stock){
        this.id = id
        this.title =title
        this.price= price
        this.text= text
        this.code= code
        this.stock= stock
    } 
}
const products= []

////resolvers
const getAll=({campo, valor})=>{
    if(campo && valor){
        return products.filter(product => product[campo] === valor)
    }
    return products
}
const getOne=({id})=>{
    const product = products.find(product => product.id === id)
    if(!product){
        throw new Error ('product not found')
    }
}

const create=({datos})=>{
    const id = crypto.randomBytes(10).toString('hex')
    const newProduct = new User(id,datos.title,datos.price,datos.text,datos.code,datos.stock)
    products.push (newProduct)
    return newProduct
}
const update=({id,datos})=>{
    const productIndex = products.findIndex(product => product.id === id)
    if(productIndex === -1){
        throw new Error ('user not found')
    }
    products[productIndex].title = datos.title
    products[productIndex].price = datos.price
    products[productIndex].text = datos.text
    products[productIndex].code = datos.code
    products[productIndex].stock = datos.stock

    return products[productIndex]
}
const Productdelete=({id})=>{
    const productIndex = products.findIndex(product => product.id === id)
    if(productIndex === -1){
        throw new Error ('user not found')
    }
    const product = products[productIndex]
    products.splice(productIndex,1)
    return product
}
