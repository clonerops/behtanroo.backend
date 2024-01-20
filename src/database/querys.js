export default {
    getAllProduct: "SELECT * FROM Products",
    addNewProduct: "INSERT INTO Products (PName, PDesc, Price) VALUES(@name, @desc, @pr)",
    getProductById: "SELECT * FROM Products Where Id = @Id",
    deleteProductById: "DELETE FROM [webstore].[dbo].[Products] Where Id = @Id",
    updateProductById: "UPDATE Products SET PName = @name, PDesc = @desc, Price = @pr Where Id = @Id "
}