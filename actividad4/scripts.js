const productos = productosLista.products.map(product => new Producto(product.SKU));
const carrito = new Carrito(productos);
carrito.actualizarUnidades("IOKW9BQ9F3", 5);
carrito.actualizarUnidades("TGD5XORY1L", 3);
console.log(carrito.calcularTotal());
console.log(carrito);