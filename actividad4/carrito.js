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
        const productoLista = productosLista.products.find(p => p.SKU === producto.getSku());
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
        if (typeof this.obtenerInformacionProducto(producto.getSku()) === "undefined") {
            this.#productos.push(producto);
        }
        this.actualizarUnidades(producto, producto.getCantidad() + 1);
        this.calcularTotal();
    }

    eliminarProducto(producto) {
        if (typeof this.obtenerInformacionProducto(producto.getSku()) === "undefined") {
            alert("Este artículo no se ha ingresado a la lista del carrito");
        } else {
            if (producto.getCantidad() === 1) {
                const index = this.#productos.findIndex(p => p.getSku() === producto.getSku());
                if (index > -1) {
                    this.#productos.splice(index, 1);
                }
            }
            this.actualizarUnidades(producto, producto.getCantidad() - 1);
            this.calcularTotal();
        }
    }

    getMoneda() {
        return this.#moneda;
    }

    getTotal() {
        return this.#total;
    }
}