const CartDAO = require('../DAO/CartDaoMongo')
const ProdDAO = require('../DAO/productDaoMongo')
const UserDAO = require('../DAO/userDaoMongo')
const assert = require('assert')

describe("Test de funcionalidad de Daos", () =>{
    it('Deberia devolver algun contenido', async()=>{
        const users = new UserDAO()
        const Prods = new UserDAO()
        const Carts = new UserDAO()

        assert.strictEqual((await users.getAll()).lenght, 0)
        assert.strictEqual((await Prods.getAll()).lenght, 0)
        assert.strictEqual((await Carts.getAll()).lenght, 0)

    })
})