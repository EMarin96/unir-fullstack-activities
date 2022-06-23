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
            li.classList.add("list-group-item");
            li.classList.add("d-flex");
            li.classList.add("justify-content-between");
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
        let contador = 1;
        json.products.forEach((producto) => {
            const tr = document.createElement("tr");
            let content = "";
            content += `<th scope="row" class="fs-5">
                            ${producto.title}
                        </th>`;
            content += `<td class="d-flex gap-2">
                            <button class="btn btn-secondary" id= "del-button${contador.toString()}">-</button>
                            <span class="d-inline-block py-2 px-3 border border-secondary rounded-2">0</span>
                            <button class="btn btn-secondary" id= "add-button${contador.toString()}">+</button>       
                        </td>`;
            content += `<td>
                            ${producto.price} ${carrito.getMoneda()}
                        </td>`;
            content += `<td>
                            0 ${json.currency}
                        </td>`;
            tr.innerHTML = content;
            tbodyEL.appendChild(tr);

            const addButton = document.querySelector(`#add-button${contador.toString()}`);
            const delButton = document.querySelector(`#del-button${contador.toString()}`);
            addButton.setAttribute("data-sku", producto.SKU);
            addButton.addEventListener("click", addProductoClickHandler);
            delButton.setAttribute("data-sku", producto.SKU);
            delButton.addEventListener("click", delProductoClickHandler);
            contador++;
        });
    }

    loadTable();
});