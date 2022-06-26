class Carrito {
    #total;
    #moneda;
    #productos;

    constructor() {
        this.#total = 0;
        this.#moneda = "€";
        this.#productos = [];
    }

    actualizarUnidades(producto, unidades) {
        const productoLista = json.products.find(p => p.SKU === producto.getSku());
        producto.setCantidad(unidades);
        producto.setTotal(productoLista.price * producto.getCantidad());
    }

    obtenerInformacionProducto(sku) {
        return this.#productos.find(p => p.getSku() === sku);
    }

    calcularTotal() {
        this.#total = this.#productos.reduce((acc, value) => {
            return acc + value.getTotal();
        }, 0);
    }

    guardarProducto(producto) {
        this.#productos.push(producto);
    }

    eliminarProducto(producto) {
        const index = this.#productos.findIndex(p => p.getSku() === producto.getSku());
        if (index > -1) {
            this.#productos.splice(index, 1);
        }
    }

    getMoneda() {
        return this.#moneda;
    }

    getTotal() {
        return this.#total;
    }
}