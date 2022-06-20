const carrito = new Carrito();

document.addEventListener("DOMContentLoaded", () => {
    const tbodyEL = document.querySelector("#table-body");

    const tableLoad = () => {
        productosLista.products.forEach((producto) => {
            const tr = document.createElement("tr");
            let content = "";
            content += `<td class="pt-4">
                            <p class="fw-bold fs-5 m-0">${producto.title}</p>
                            <span>Ref: ${producto.SKU}</span>
                        </td>`;
            content += `<td class="pt-4">
                            <div class="container p-0 d-flex align-items-center">
                                <button class="ps-0 pe-3 border border-white bg-light bg-transparent">-</button>
                                <span class="px-3 py-2 border border-secondary rounded">0</span>
                                <button class= "pe-0 ps-3 border border-white bg-transparent">+</button>  
                            </div>      
                        </td>`;
            content += `<td class="pt-4">
                            ${producto.price} ${carrito.getMoneda()}
                        </td>`;
            content += `<td class="pt-4">
                            0 ${carrito.getMoneda()}
                        </td>`;
            tr.innerHTML = content;
            tbodyEL.appendChild(tr);
        });
    }

    tableLoad();
});