// import {carrito} from "./carrito.js";

// const carrito = carrito();

const TIEMPO_INTERVALO_MILESIMAS_SEG = 4000;

const IMAGENES = [
    "./imagenes/carrusel/nieve.jpg",
    "./imagenes/carrusel/columna.jpg",
    "./imagenes/carrusel/percha.jpg",
    "./imagenes/carrusel/colores.jpg",
    "./imagenes/carrusel/sol.jpg",
];

var carrito = [];

window.onload = function(){

    document.getElementById("logo").addEventListener("click", function(){
        montarInicio();
    });
    document.getElementById("mujer").addEventListener("click", function(){
        hacerPeticionCategoria("women's%20clothing");
    });
    document.getElementById("hombre").addEventListener("click", function(){
        hacerPeticionCategoria("men's%20clothing");
    });
    document.getElementById("joyeria").addEventListener("click", function(){
        hacerPeticionCategoria("jewelery");
    });
    document.getElementById("accesorios").addEventListener("click", function(){
        hacerPeticionCategoria("electronics");
    });
    document.getElementById("login").addEventListener("click", function(){
        mostrarLogin();
    });
    document.getElementById("carrito").addEventListener("click", function(){
        mostrarCarrito();
    });


    montarInicio();
    playIntervalo();
}

let posicionActual = 0;

function pasarFoto(){
    if (posicionActual >= IMAGENES.length - 1){
        posicionActual = 0;
    }
    else{
        posicionActual++;
    }
    renderizarImagen();
}

function renderizarImagen(){
    for (i = 0; i < IMAGENES.length; i++){
        var img_carrusel = document.getElementById("imagen_carrusel");
        img_carrusel.src = IMAGENES[posicionActual];
    }
}

function playIntervalo(){
    let intervalo;
    intervalo = setInterval(pasarFoto, TIEMPO_INTERVALO_MILESIMAS_SEG);
}

function hacerPeticionCategoria(categoria){
    fetch("https://fakestoreapi.com/products/category/" + categoria + "")
        .then(res => res.json())
        .then(json => montarCategoria(json, categoria))
}

const montarCategoria = (productos) => {
    $("main").html("");
    $("main").css("display", "block");
    let div_principal = document.createElement("div");
    div_principal.className = "div_principal";
    $("div_principal").css("display", "flex");
    $("main").append(div_principal);
    for(let i = 0; i < productos.length; i++){
        let producto = productos[i];
        let div = document.createElement("div");
        div.className = "div_producto";
        div.innerHTML = "<input id='product_id' type='hidden' value=" + producto.id + "><h3>" + producto.title + "</h3><img src='" + producto.image + "'><p>" + producto.price + "$</p>";
        div_principal.append(div);
    }
    eventoDivProducto();
}

function montarInicio(){
    $("main").html("<section id='hero'><div id='hero_img'><img src='./imagenes/good vibes.jpg' alt='good vibes' id='vibes'><img src='./imagenes/capucha.jpg' alt='capucha' id='capucha'><img src='./imagenes/flores.jpg' alt='flores' id='flores'></div><div id='hero_cont'><h2 style='--ancho:41%'>Sammy´s Shop</h2><p>Bienvenidos a Sammy´s Shop, tu tienda de ropa favorita, donde puedes encontrar todo tipo de productos.</p></div></section ><section id='carrusel'><img src='./imagenes/logo_c.PNG' id='logo_carrusel' alt=''><div id='img_carrusel'><img src='./imagenes/carrusel/nieve.jpg' alt='imagen_carrusel' id='imagen_carrusel'></div></section><section id='siguenos'><div class='contenedor_red' id='twitter'><a href='https://twitter.com' target='_blank'><img src='./imagenes/twitter.png' alt='Twitter'></a><span>Twiiter</span></div><div class='contenedor_red' id='instagram'><a href='https://instagram.com' target='_blank'><img src='./imagenes/instagram.png' alt='Instagram'></a><span>Instagram</span></div><div class='contenedor_red' id='github'><a href='https://github.com/sam6710' target='_blank'><img src='./imagenes/github.png' alt='GitHub'></a><span>GitHub</span></div><div class='contenedor_red' id='yt'><a href='https://www.youtube.com' target='_blank'><img src='./imagenes/yt.png' alt='YT'></a><span id='span_yt'>YouTube</span></div><p id='p_sig'>SÍGUENOS</p><img src='./imagenes/columna2.jpg' alt='columna' id='columna_sig'><img src='./imagenes/escultura.jpg' alt='escultura' id='escultura_sig'></section>");
    $("main").css("display", "grid");
}

function eventoDivProducto(){
    $(".div_producto").on("click", function(){
        let id = $(this).children("#product_id").val();
        pedirProducto(id);
    });
}

function pedirProducto(id){
    fetch(`https://fakestoreapi.com/products/${id}`)
        .then(res => res.json())
        .then(json => montarProducto(json))
}

const montarProducto = (producto) => {
    $("main").html("");
    let div_principal = document.createElement("div");
    div_principal.className = "div_principal2";
    $("main").append(div_principal);
    let div_producto = document.createElement("div");
    div_producto.className = "div_producto";
    div_producto.innerHTML = "<h3>" + producto.title + "</h3><img src='" + producto.image + "'><p>" + producto.price + "$</p>";
    div_principal.append(div_producto);
    $(".div_producto").css("border", "none");
    $(".div_producto").css("border-radius", "0");
    $(".div_producto").css("background-color", "rgb(240,240,240)");
    $(".div_producto p").css("display", "none");
    $(".div_principal2").css("display", "flex");
    let div_info = document.createElement("div");
    div_info.className = "div_info";
    div_info.innerHTML = "<p id='descripcion'>" + producto.description + "</p><p id='price'>" + producto.price + "€</p><span id='rating'>Puntuación: " + producto.rating.rate + " en </span><span id='reviews'>" + producto.rating.count + "reviews.</span><span id='talla'>Talla:</span><select><option value='XS'>XS</option><option value='S'>S</option><option value='M'>M</option><option value='L'>L</option><option value='XL'>XL</option></select><button id='btn_add_carrito'>Añadir al carrito</button>";
    div_principal.append(div_info);

    eventoBtnCarrito(producto);
}

function mostrarLogin(){
    $("main").html("");
    let div_principal = document.createElement("div");
    div_principal.className = "div_principal";
    $("main").append(div_principal);
    let div_login = document.createElement("div");
    div_login.className = "div_login";
    div_login.innerHTML = "<h3>Inicio de sesión</h3><input type='text' placeholder='Usuario'><input type='password' placeholder='Contraseña'><button id='btn_login'>Iniciar sesión</button>";
    div_principal.append(div_login);
    let div_registro = document.createElement("div");
    div_registro.className = "div_registro";
    div_registro.innerHTML = "<h3>Registro</h3><input type='text' placeholder='Nombre'><input type='text' placeholder='Usuario'><input type='password' placeholder='Contraseña'><input type='email' placeholder='Email'><button id='btn_registro'>Registrarse</button>";
    div_principal.append(div_registro);
    $("main").css("display", "flex");
    $(".div_principal").css("width", "100%");
}

function eventoBtnCarrito(producto){
    $("#btn_add_carrito").on("click", function(){
        console.log("Producto añadido al carrito");
        añadirProducto(producto);
    });
}

function añadirProducto(producto){
    if(localStorage.carrito != null)
        var carrito = JSON.parse(localStorage.getItem("carrito"))
    else
        var carrito = [];
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    console.log(carrito);
}

function mostrarCarrito(){
    $("main").html("");
    let div_principal = document.createElement("div");
    div_principal.className = "div_principal";
    $("main").append(div_principal);
    let h2 = document.createElement("h2");
    h2.innerHTML = "Carrito";
    div_principal.append(h2);
    let div_carrito = document.createElement("div");
    div_carrito.className = "div_carrito";
    div_principal.append(div_carrito);
    if(localStorage.carrito != null){
        let carrito = JSON.parse(localStorage.getItem("carrito"));
        let ul = document.createElement("ul");
        carrito.forEach(producto => {
            let li = document.createElement("li");
            li.innerHTML = "<img src=" + producto.image + "><span>" + producto.price + "₤</span><i class='fa fa-trash'></i><h3>" + producto.title + "</h3>";
            ul.append(li);
            div_carrito.append(ul);
        });
        let div_compra = document.createElement("div");
        div_compra.className = "div_compra"
        div_compra.innerHTML = "<p>Total:</p><button id='btn_comprar'>Comprar</button>";
        div_carrito.append(div_compra);
    }
    else{
        let div_vacio = document.createElement("div");
        div_vacio.className = "div_vacio";
        div_vacio.innerHTML = "<h3>El carrito está vacío</h3>";
        div_carrito.append(div_vacio);
    }
    $("main").css("display", "flex");
    $(".div_principal").css("width", "100%");
    $(".div_principal").css("display", "block");
}
