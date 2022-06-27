const API_URL = "https://jsonblob.com/api/jsonBlob/988949163437998080";
const REGEX = "^[0-9]";
const carrito = new Carrito();
let json = {};

const request = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
};

document.addEventListener("DOMContentLoaded", async () => {
    const tbodyEL = document.querySelector("#table-body");
    const productsListEL = document.querySelector("#products-list");
    const subtotal = document.querySelector(".total-car__subtotal-price");

    json = await request();

    const addProduct = (sku, quantity) => {
        const productoLista = json.products.find(p => p.SKU === sku);
        const quantityEL = document.querySelector(`[data-sku-input="${sku}"]`);

        let producto = carrito.obtenerInformacionProducto(sku);
        if (typeof producto === "undefined" && quantity > 0) {

            //Se agrega producto a la clase
            producto = new Producto(sku);
            carrito.guardarProducto(producto);

            //Se agrega producto a la lista HTML
            const li = document.createElement("li");
            const p1 = document.createElement("p");
            const p2 = document.createElement("p");
            li.classList.add("total-car__list-item");
            p1.classList.add("total-car__product-info");
            p1.innerText = productoLista.title;
            p2.classList.add("total-car__product-info");
            p2.setAttribute("data-sku-total", productoLista.SKU);
            li.setAttribute("id", `list-item-${productoLista.SKU}`);
            li.append(p1, p2);
            productsListEL.appendChild(li);
        }

        //Se actualiza el producto en la clase
        carrito.actualizarUnidades(producto, quantity);
        carrito.calcularTotal();

        //Se actualiza el precio total en la lista HTML
        const totalProduct = document.querySelectorAll(`[data-sku-total="${producto.getSku()}"]`);
        totalProduct[0].innerText = `${producto.getTotal().toFixed(2)} ${json.currency}`;
        totalProduct[1].innerText = `${producto.getTotal().toFixed(2)} ${json.currency}`;
        quantityEL.value = producto.getCantidad();
        subtotal.innerText = `${carrito.getTotal().toFixed(2)} ${json.currency}`;
    };

    const delProduct = (sku, quantity) => {
        const producto = carrito.obtenerInformacionProducto(sku);
        const quantityEL = document.querySelector(`[data-sku-input="${sku}"]`);

        if (typeof producto === "undefined"){
            alert("Este artículo no se ha ingresado a la lista del carrito");
        } else {
            carrito.actualizarUnidades(producto, quantity);
            if (producto.getCantidad() === 0) {

                //Se elimina el producto de la lista
                carrito.eliminarProducto(producto);
                const li = document.querySelector(`#list-item-${producto.getSku()}`);
                productsListEL.removeChild(li);
            }

            //Se actualiza el precio total en la lista HTML
            carrito.calcularTotal();
            const totalProduct = document.querySelectorAll(`[data-sku-total="${producto.getSku()}"]`);
            totalProduct[0].innerText = `${producto.getTotal().toFixed(2)} ${json.currency}`;

            if (totalProduct.length === 2) {
                totalProduct[1].innerText = `${producto.getTotal().toFixed(2)} ${json.currency}`;
            }

            quantityEL.value = producto.getCantidad() === 0 ? "" : producto.getCantidad();
            subtotal.innerText = carrito.getTotal().toFixed(2);
        }
    }

    const inputQuantityClickHandler = (event) => {
        if (!event.target.value.match(REGEX)) {
            event.target.value = "";   
        } 

        const sku = event.target.getAttribute("data-sku-input");
        const quantity = Number(event.target.value);
        let producto = carrito.obtenerInformacionProducto(sku);

        if ((typeof producto === "undefined") || (producto.getCantidad() < quantity)) {
            addProduct(sku, quantity);
        } else {
            delProduct(sku, quantity);
        }
    }

    const addProductClickHandler = (event) => {
        const sku = event.target.getAttribute("data-sku");
        const quantityEL = document.querySelector(`[data-sku-input="${sku}"]`);
        const totalQuantity = Number(quantityEL.value) + 1;
        addProduct(sku, totalQuantity);
    }

    const delProductClickHandler = (event) => {
        const sku = event.target.getAttribute("data-sku");
        const quantityEL = document.querySelector(`[data-sku-input="${sku}"]`);
        const totalQuantity = Number(quantityEL.value) - 1;
        delProduct(sku, totalQuantity);
    }

    const loadTable = () => {
        json.products.forEach((producto) => {
            const tr = document.createElement("tr");
            const td1 = document.createElement("td");
            const p = document.createElement("p");
            const td2 = document.createElement("td");
            const div = document.createElement("div");
            const td3 = document.createElement("td");
            const td4 = document.createElement("td");
            const addButton = document.createElement("button");
            const delButton = document.createElement("button");
            const input = document.createElement("input");

            tr.classList.add("table__row");

            //Se crea primer td
            td1.classList.add("table__data");
            p.classList.add("table__product-title");
            p.innerText = producto.title;
            td1.appendChild(p);

            //Se crea segundo td
            td2.classList.add("table__data");
            div.classList.add("table__container-quantity");

            addButton.classList.add("table__quantity-btn");
            addButton.setAttribute("data-sku", producto.SKU);
            addButton.innerText = "+";

            input.setAttribute("type", "number");
            input.setAttribute("min", "0");
            input.setAttribute("data-sku-input", producto.SKU);
            input.classList.add("table__quantity-input");

            delButton.classList.add("table__quantity-btn");
            delButton.setAttribute("data-sku", producto.SKU);
            delButton.innerText = "-";
            
            div.append(delButton, input, addButton);
            td2.appendChild(div);

            //Se crea el tercero y cuarto td
            td3.classList.add("table__data");
            td4.classList.add("table__data");
            td3.innerText = `${producto.price} ${carrito.getMoneda()}`
            td4.innerText = `0.00 ${json.currency}`;
            td4.setAttribute("data-sku-total", producto.SKU);

            tr.append(td1, td2, td3, td4);
            tbodyEL.appendChild(tr);
            
            addButton.addEventListener("click", addProductClickHandler);
            delButton.addEventListener("click", delProductClickHandler);
            input.addEventListener("input", inputQuantityClickHandler);
        });
    }

    loadTable();
});