// DIBUJO NAVBAR
const dibujoNavBar = () => {
  let contenedor = document.getElementById("navbar");
  let navbar = document.createElement("nav");
  navbar.classList.add(
    "navbar",
    "navbar-expand-lg",
    "navbar-light",
    "bg-light"
  );
  navbar.innerHTML = `<div class="container-fluid">
        <a class="navbar-brand" href="#">Logo</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor03"
          aria-controls="navbarColor03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarColor03">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <a class="nav-link active" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Nosotros</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Productos</a>
            </li>
          </ul>
          <form class="d-flex justify-content-end">
            <input
              class="form-control me-sm-2"
              type="search"
              placeholder="Search"
            />
            <button class="btn btn-secondary my-2 my-sm-0" type="submit">
              Search
            </button>
          </form>
          <button id="boton-carrito" class="btn btn-success float-right mx-2" onClick="dibujarCarrito()">
              <i class="fas fa-shopping-cart"></i>
              <span id="contadorCarrito">0</span>
              <br/>
              Subtotal $<span id="subtotal">0</span>
          </button>
        </div>
      </div>`;
  contenedor.appendChild(navbar);
};
dibujoNavBar();

const productos = [
  {
    id: 1,
    nombre: "Correas Trapeciales Clásicas",
    precio: 1500,
    img: "../assets/img/clasicas.jpg",
  },
  {
    id: 2,
    nombre: "Correas Trapeciales Dentadas",
    precio: 500,
    img: "../assets/img/dentadas.jpg",
  },
  {
    id: 3,
    nombre: "Correas Automotor",
    precio: 1000,
    img: "../assets/img/automotor.jpg",
  },
  {
    id: 4,
    nombre: "Correas Trapeciales Estrechas",
    precio: 2000,
    img: "../assets/img/estrechas.jpg",
  },
];

const dibujarProductos = () => {
  let contenedor = document.getElementById("container");
  productos.forEach((producto, index) => {
    let card = document.createElement("div"); // CREO EL DIV DONDE VAN A ESTAR LOS PRODUCTOS
    card.classList.add("card", "col-sm-12", "col-lg-3", "m-2"); //AGREGO CLASES AL DIV DE LAS CARD
    // CREO EL CONTENIDO DENTRO DEL DIV
    card.innerHTML = `    
      <img class="card-img-top" src="${producto.img}" alt="Card image cap">
      <div class="card-body">
        <h4 class="card-title">${producto.nombre}</h4>
        <p class="card-text">$ ${producto.precio}</p>
        <a href="#!" class="btn btn-primary" onClick="agregarAlCarrito(${index})" >Agregar al Carrito</a>
      </div>
      `;
    contenedor.appendChild(card); // MANDO EFECTIVAMENTE LA CARD CREADA EN JS AL HTML
  });
};
dibujarProductos();
