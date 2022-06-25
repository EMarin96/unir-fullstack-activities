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

    json = await request();

    const addProduct = (sku) => {
        const productoLista = json.products.find(p => p.SKU === sku);
        let producto = carrito.obtenerInformacionProducto(sku);
        if (typeof producto === "undefined") {

            //Se agrega producto a la clase
            producto = new Producto(sku);
            carrito.guardarProducto(producto);
            carrito.actualizarUnidades(producto, 1);
            carrito.calcularTotal();

            //Se agrega producto a la lista HTML
            const li = document.createElement("li");
            let content = "";
            content += `<p class="m-0">${productoLista.title}</p>`;
            content += `<p class="m-0" id="total-list-${productoLista.SKU}">${producto.getTotal().toFixed(2)} ${json.currency}</p>`;
            li.classList.add("list-group-item", "d-flex", "justify-content-between");
            li.setAttribute("id", `list-${productoLista.SKU}`);
            li.innerHTML = content;
            productsListEL.appendChild(li);

        } else {

            //Se actualiza el producto en la clase
            carrito.actualizarUnidades(producto, producto.getCantidad() + 1);
            carrito.calcularTotal();

            //Se actualiza el precio total en la lista HTML
            const totalList = document.querySelector(`#total-list-${productoLista.SKU}`);
            totalList.innerText = `${producto.getTotal().toFixed(2)} ${json.currency}`;
        }
    };

    const delProduct = (sku) => {
        const producto = carrito.obtenerInformacionProducto(sku);

        if (typeof producto === "undefined"){
            alert("Este artículo no se ha ingresado a la lista del carrito");
        } else {
            if (producto.getCantidad() === 1) {

                //Se elimina el producto de la lista
                carrito.eliminarProducto(producto);
                const li = document.querySelector(`#list-${producto.getSku()}`);
                productsListEL.removeChild(li);
            }

            //Se actualiza el precio total en la lista HTML
            carrito.actualizarUnidades(producto, producto.getCantidad() - 1);
            carrito.calcularTotal();
            const totalList = document.querySelector(`#total-list-${producto.getSku()}`);
            
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
        json.products.forEach((producto, index) => {
            const tr = document.createElement("tr");
            const th = document.createElement("th");
            const td1 = document.createElement("td");
            const td2 = document.createElement("td");
            const td3 = document.createElement("td");
            const addButton = document.createElement("button");
            const delButton = document.createElement("button");
            const span = document.createElement("span");

            th.setAttribute("scope", "row");
            th.classList.add("fs-5");
            th.innerText = producto.title;

            td1.classList.add("d-flex", "gap-2");

            //Se inicializa el botón de agregar
            addButton.classList.add("btn", "btn-secondary");
            addButton.setAttribute("data-sku", producto.SKU);
            addButton.innerText = "+";

            //Se inicializa el span de la cantidad
            span.classList.add("d-inline-block", "py-2", "px-3", "border", "border-secondary", "rounded-2");
            span.innerText = "0";

            //Se inicializa el botón de eliminar
            delButton.classList.add("btn", "btn-secondary");
            delButton.setAttribute("data-sku", producto.SKU);
            delButton.innerText = "-";

            td1.appendChild(delButton);
            td1.appendChild(span);
            td1.appendChild(addButton);

            td2.innerText = `${producto.price} ${carrito.getMoneda()}`
            td3.innerText = `0 ${json.currency}`;

            tr.appendChild(th);
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tbodyEL.appendChild(tr);
            
            addButton.addEventListener("click", addProductoClickHandler);
            delButton.addEventListener("click", delProductoClickHandler);
        });
    }

    loadTable();
});