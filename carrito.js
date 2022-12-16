export class carrito{
    constructor(){
        this.productos = [];
        this.total = 0;
    }
    agregarProducto(producto){
        this.productos.push(producto);
        this.total += producto.precio;
    }
    eliminarProducto(producto){
        this.productos = this.productos.filter(p => p.id != producto.id);
        this.total -= producto.precio;
    }
    vaciarCarrito(){
        this.productos = [];
        this.total = 0;
    }
    mostrarCarrito(){
        let carrito = document.getElementById("carrito");
        carrito.innerHTML = "";
        for (let i = 0; i < this.productos.length; i++){
            carrito.innerHTML += `
            <div class="producto_carrito">
                <img src="${this.productos[i].imagen}" alt="producto" class="imagen_carrito">
                <div class="descripcion_carrito">
                    <p class="nombre_carrito">${this.productos[i].nombre}</p>
                    <p class="precio_carrito">${this.productos[i].precio}</p>
                </div>
                <div class="botones_carrito">
                    <button class="boton_carrito" onclick="eliminarProducto(${this.productos[i].id})">Eliminar</button>
                </div>
            </div>`;
        }
        carrito.innerHTML += `
        <div class="total_carrito">
            <p class="total_carrito">Total: ${this.total}</p>
        </div>
        <div class="botones_carrito">
            <button class="boton_carrito" onclick="vaciarCarrito()">Vaciar carrito</button>
        </div>`;
    }
}