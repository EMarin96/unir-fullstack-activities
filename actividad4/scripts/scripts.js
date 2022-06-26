const carrito = new Carrito();
let json = {};

const request = async () => {
    const response = await fetch("https://jsonblob.com/api/jsonBlob/988949163437998080");
    const data = await response.json();
    return data;
};

document.addEventListener("DOMContentLoaded", async () => {
    const tbodyEL = document.querySelector("#table-body");
    const productsListEL = document.querySelector("#products-list");
    const subtotal = document.querySelector(".total-car__subtotal-price");

    json = await request();

    const addProduct = (sku) => {
        const productoLista = json.products.find(p => p.SKU === sku);
        const totalQuantity = document.querySelector(".table__quantity-input");

        let producto = carrito.obtenerInformacionProducto(sku);
        if (typeof producto === "undefined") {

            //Se agrega producto a la clase
            producto = new Producto(sku);
            carrito.guardarProducto(producto);
            carrito.actualizarUnidades(producto, 1);
            carrito.calcularTotal();

            //Se agrega producto a la lista HTML
            const li = document.createElement("li");
            const p1 = document.createElement("p");
            const p2 = document.createElement("p");
            li.classList.add("total-car__list-item");
            p1.classList.add("total-car__product-info");
            p1.innerText = productoLista.title;
            p2.classList.add("total-car__product-info");
            p2.innerText = `${producto.getTotal().toFixed(2)} ${json.currency}`;
            p2.setAttribute("id", `total-product-${productoLista.SKU}`);
            li.setAttribute("id", `list-item-${productoLista.SKU}`);
            li.append(p1, p2);
            productsListEL.appendChild(li);

        } else {

            //Se actualiza el producto en la clase
            carrito.actualizarUnidades(producto, producto.getCantidad() + 1);
            carrito.calcularTotal();

            //Se actualiza el precio total en la lista HTML
            const totalProduct = document.querySelector(`#total-product-${productoLista.SKU}`);
            totalProduct.innerText = `${producto.getTotal().toFixed(2)} ${json.currency}`;
        }

        totalQuantity.value = producto.getCantidad();
        subtotal.innerText = carrito.getTotal().toFixed(2);
    };

    const delProduct = (sku) => {
        const producto = carrito.obtenerInformacionProducto(sku);

        if (typeof producto === "undefined"){
            alert("Este artículo no se ha ingresado a la lista del carrito");
        } else {
            if (producto.getCantidad() === 1) {

                //Se elimina el producto de la lista
                carrito.eliminarProducto(producto);
                const li = document.querySelector(`#list-item-${producto.getSku()}`);
                productsListEL.removeChild(li);
            }

            //Se actualiza el precio total en la lista HTML
            carrito.actualizarUnidades(producto, producto.getCantidad() - 1);
            carrito.calcularTotal();
            const totalList = document.querySelector(`#total-product-${producto.getSku()}`);
            
            if (totalList !== null) {
                totalList.innerText = `${producto.getTotal().toFixed(2)} ${json.currency}`;
            }
        }
    }

    const addProductoClickHandler = (event) => {
        const sku = event.target.getAttribute("data-sku");
        addProduct(sku);
    }

    const delProductoClickHandler = (event) => {
        const sku = event.target.getAttribute("data-sku");
        delProduct(sku);
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
            input.setAttribute("data-sku", producto.SKU);
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
            td4.innerText = `0 ${json.currency}`;

            tr.append(td1, td2, td3, td4);
            tbodyEL.appendChild(tr);
            
            addButton.addEventListener("click", addProductoClickHandler);
            delButton.addEventListener("click", delProductoClickHandler);
        });
    }

    loadTable();
});