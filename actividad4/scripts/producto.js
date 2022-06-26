class Producto {
    #sku;
    #cantidad;
    #total;

    constructor(sku){
        this.#sku = sku;
        this.#cantidad = 0;
        this.#total = 0;
    }

    getSku() {
        return this.#sku;
    }

    getCantidad() {
        return this.#cantidad;
    }

    getTotal() {
        return this.#total;
    }

    setCantidad(cantidad) {
        this.#cantidad = cantidad;
    }

    setTotal(total) {
        this.#total = total;
    }
}