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

//FALTA LOCALSTORAGE

//MODIFICAR Y TRAERLOS CON FETCH
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

// CREO EL CARRITO DONDE SE VAN A GUARDAR LOS PRODUCTOS
let cart = JSON.parse(localStorage.getItem("carrito")) || [];

const agregarAlCarrito = (index) => {
  const indiceEncontradoCarrito = cart.findIndex((producto) => {
    return producto.id === productos[index].id;
    // SI ENCUENTRA ALGO LO GUARDA EN indiceEncontradoCarrito Y SINO DEVUELVE -1
  });
  if (indiceEncontradoCarrito === -1) {
    Swal.fire("Producto agregado al carrito", "", "success");
    // SI NO ENCUENTRA EL INDICE LO CREA
    const agregarProducto = productos[index];
    agregarProducto.cantidad = 1;
    cart.push(agregarProducto);
    dibujarCarrito();
    guardarLocal();
  } else {
    Swal.fire("Producto agregado al carrito", "", "success");
    //SI ENCUENTRA EL INDICE, LE AGREGA UNO
    cart[indiceEncontradoCarrito].cantidad += 1;
    dibujarCarrito();
    guardarLocal();
  }
};

let total = 0;
//CAPTURO EL DIV DE CARRITO
let modalCarrito = document.getElementById("cart");

const dibujarCarrito = () => {
  modalCarrito.className = "cart";
  // VACIO PARA QUE CUANDO SE EJECUTE SE BORRE LO QUE ESTÁ Y LO VUELVA A DIBUJAR, ES ACTUALIZACIÓN
  modalCarrito.innerHTML = "";
  if (cart.length > 0) {
    cart.forEach((producto, index) => {
      total += producto.precio * producto.cantidad;
      const carritoContainer = document.createElement("div");
      carritoContainer.className = "producto-carrito";
      carritoContainer.innerHTML = `
        <img class="cart-img" src="${producto.img}" alt="Card image cap">
        <div class="producto-details">${producto.nombre}</div>
        <div class="producto-detail">
          <button onClick="restarItem(${
            producto.id
          })" class="btn btn-secondary"><i class="fa-solid fa-minus"></i></button>
          <span id='cantidad'>${producto.cantidad}</span>
          <button onClick="sumarItem(${
            producto.id
          })" class="btn btn-success"><i class="fa-solid fa-plus"></i></button></div>
          <div class="producto-detailt"> Precio: $ ${producto.precio}</div>
          <div class="producto-detail"> Subtotal: $ ${
            producto.precio * producto.cantidad
          }</div>
          <button href="#!" class="btn btn-primary" onClick="eliminarProducto(${index})" >Eliminar Producto</button>
        `;
      modalCarrito.appendChild(carritoContainer);
    });
    const totalContainer = document.createElement("div");
    totalContainer.className = "total-carrito";
    totalContainer.innerHTML = `
        <div>
        <h2 class="text-center">Total: $ ${total}</h2>
        <button href="#!" class="btn btn-primary" id="finalizar" onClick="vaciarCarrito()" >Vaciar Carrito</button>
        <button href="#!" class="btn btn-primary" id="finalizar" onClick="finalizarCompra()" >Finalizar Compra</button>
        </div>
      `;
    modalCarrito.appendChild(totalContainer);
  } else {
    modalCarrito.classList.remove("cart");
  }
};

const sumarItem = (prodId) =>{
  const item = cart.find((prod) => prod.id === prodId);
  item.cantidad++;
  dibujarCarrito();
}

const restarItem = (prodId) => {
  const item = cart.find((prod) => prod.id === prodId);
  if(item.cantidad > 1){
  item.cantidad--;
  dibujarCarrito();}
}

const eliminarProducto = (index) => {
  Swal.fire({
    title: "¿Estás seguro que desea eliminar el producto?",
    text: "Luego podrá volverlo a agregar nuevamente",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, estoy seguro.",
  }).then((result) => {
    if (result.isConfirmed) {
      cart.splice(index, 1); //removeme de la posición index, 1 elemento
      dibujarCarrito();
      Swal.fire("Producto eliminado!", "", "success");
    }
  });
};

const vaciarCarrito = () => {
  Swal.fire({
    title: "¿Estas seguro?",
    text: "Estas a punto de vaciar el carrito.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Borrar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("¡Listo!", "Tu carrito esta vacio.", "success");
      cart.length = 0;
      localStorage.removeItem("cart");
      dibujarCarrito();
    }
    dibujarCarrito();
  });
};
const finalizarCompra = () => {
  Swal.fire({
    title: "¿Desea seguir comprando o ir a pagar?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Ir a pagar",
    cancelButtonText: "Seguir Comprando",
  }).then((result) => {
    if (result.isConfirmed) {
      cargarFormulario();
    }
  });
};

const cargarFormulario = () => {
  // INGRESO DE NOMBRE
  modalCarrito.innerHTML = "";
  const formulario = `
  <h2>DATOS PARA EL ENVÍO</h2>
  <div class="contact__secction-container">
    <div class="row">
      <div class="contact_secction_item">
        <label>Nombre</label>
        <input type="text" id="forName" placeholder="Nombre"/>
      </div>
      <div class="contact_secction_item">
        <label>Email</label>
        <input type="text" id="forEmail" placeholder="E-mail"/>
      </div>
      <div class="contact_secction_item">
        <label>Teléfono</label>
        <input type="text" id="telefono" placeholder="Teléfono"/>
      </div>
      <div class="contact_secction_item">
        <label>Domicilio</label>
        <input type="text" id="forDirection" placeholder="Domicilio"/>
      </div>
    </div>
    <button class="btn btn-primary" onClick="mostrarMensaje()" >Enviar</button>
  </div>
  `;
  modalCarrito.innerHTML = formulario;
};

const mostrarMensaje = () => {
  const nombreCliente = document.getElementById("forName").value;
  const emailCliente = document.getElementById("forEmail").value;
  const direccionCliente = document.getElementById("forDirection").value;

  modalCarrito.innerHTML = "";
  let mensaje = `
    <div class="text-center"> <h4>${nombreCliente}, gracias por confiar en AguStore. En 5 días hábiles tendrás tu compra en ${direccionCliente}.
    Te enviamos la factura al mail ${emailCliente}</h4> </div>`;
  modalCarrito.innerHTML = mensaje;
};

/* //PROBANDO APPI

let listado = document.getElementById("listado")
fetch("/data.json")
  .then((res)=>res.json())
  .then((data)=>{
    data.forEach((post,index)=>{
      const card = document.createElement("div")
      card.classList.add("card", "col-sm-12", "col-lg-3", "m-2");
      card.innerHTML=`
      <img class="card-img-top" src="${post.img}" alt="Card image cap">
      <div class="card-body">
        <h4 class="card-title">${post.nombre}</h4>
        <p class="card-text">$ ${post.precio}</p>
        <a href="#!" class="btn btn-primary" onClick="agregarAlCarrito(${index})" >Agregar al Carrito</a>
      </div>
      `
      listado.append(card);
    })
  })


  //PRUEBA LOCALSTORE
  const guardarLocal = () =>{
    localStorage.setItem("Carrito",JSON.stringify(cart));
  }
 */
