class Carrito {
    #total;
    #moneda;
    #productos;

    constructor(productos) {
        this.#total = 0;
        this.#moneda = "€";
        this.#productos = productos;
    }

    actualizarUnidades(sku, unidades) {
        const producto = this.obtenerInformacionProducto(sku);
        const productoLista = productosLista.products.find(p => p.SKU === sku);
        producto.setCantidad(unidades);
        producto.setTotal(productoLista.price * unidades);
    }

    obtenerInformacionProducto(sku) {
        return this.#productos.find(p => p.getSku() === sku);
    }

    calcularTotal() {
        this.#total = this.#productos.reduce((acc, value) => {
            return acc + value.getTotal();
        }, 0);
    }
}