// Get all products
// fetch("https://fakestoreapi.com/products")
//             .then(res=>res.json())
//             .then(json=>console.log(json))

const TIEMPO_INTERVALO_MILESIMAS_SEG = 4000;

const IMAGENES = [
    "./imagenes/carrusel/nieve.jpg",
    "./imagenes/carrusel/columna.jpg",
    "./imagenes/carrusel/percha.jpg",
    "./imagenes/carrusel/colores.jpg",
    "./imagenes/carrusel/sol.jpg",
];

window.onload = function(){

    document.getElementById("logo").addEventListener("click", function(){
        hacerPeticionTodo();
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

    // montarInicio();
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
        .then(json => montarCategoria(json))
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
        div.innerHTML = "<h3>" + producto.title + "</h3><img src='" + producto.image + "'><p>" + producto.price + "$</p>";
        div_principal.append(div);
    }
}

function montarInicio(productos){
    $("main").html("<section id='hero'><h2>Sammy´s Shop</h2><p></p></section ><section id='carrusel'><img src='./imagenes/logo_c.PNG' id='logo_carrusel' alt=''><div id='img_carrusel'><img src='./imagenes/carrusel/nieve.jpg' alt='imagen_carrusel' id='imagen_carrusel'></div></section><section id='siguenos'><div class='contenedor_red' id='twitter'><a href='https://twitter.com' target='_blank'><img src='./imagenes/twitter.png' alt='Twitter'></a><span>Twiiter</span></div><div class='contenedor_red' id='instagram'><a href='https://instagram.com' target='_blank'><img src='./imagenes/instagram.png' alt='Instagram'></a><span>Instagram</span></div><div class='contenedor_red' id='github'><a href='https://github.com/sam6710' target='_blank'><img src='./imagenes/github.png' alt='GitHub'></a><span>GitHub</span></div><div class='contenedor_red' id='yt'><a href='https://www.youtube.com' target='_blank'><img src='./imagenes/yt.png' alt='YT'></a><span id='span_yt'>YouTube</span></div><p id='p_sig'>SÍGUENOS</p></section>");
    $("main").css("display", "grid");
}
