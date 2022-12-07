const productos = [
    {
        id: 1,
        nombre: 'Aceite Esencial de Lavanda',
        seccion: 'AROMATERAPIA',
        precioVenta: 2560,
        cantidad: 1,
        imagen: 'images/Prod1.jpg',
        descripcion: 'Con un aroma floral, fresco y con un dejo herbal, el Aceite Esencial de Lavanda es tan versátil como útil en cualquier hogar. Su aroma calma y aquieta los nervios, la ansiedad y el estrés ayudando a conciliar el sueño cuando resulta difícil bajar revoluciones. Es el aceite ideal para tener en el botiquín de primeros auxilios a la hora de reconfortar la piel en casos de quemaduras, eczemas y alergias.'
    },
    {
        id: 2,
        nombre: 'Aceite Esencial de Jazmin',
        seccion: 'AROMATERAPIA',
        precioVenta: 5205,
        cantidad: 1,
        imagen: 'images/Prod2.jpg',
        descripcion: 'El Aceite Esencial de Jazmín envuelve con su aroma sensual, dulce, exótico e intensamente floral. Las inhibiciones desaparecen, los velos se corren y la pasión invade provocando intensidad en los sentimientos y entrega total. '
    },
    {
        id: 3,
        nombre: 'Crema de Noche Redensificante Vital Just',
        seccion: 'BIENESTAR DERMO-COSMÉTICO',
        precioVenta: 1500,
        cantidad: 1,
        imagen: 'images/Prod3.jpg',
        descripcion: 'Con “Complejo de Hidratación Alpino”, extracto de crocus y aceites botánicos, la crema de noche asiste el proceso de renovación celular nocturno mejorando visiblemente la elasticidad y ﬁrmeza de la piel. Ideal para amanecer con un aspecto renovado y saludable cada mañana.  '
    },
    {
        id: 4,
        nombre: 'Gel limpiador',
        seccion: 'BIENESTAR DERMO-COSMÉTICO',
        precioVenta: 1150,
        cantidad: 1,
        imagen: 'images/Prod3.jpg',
        descripcion: 'Gel limpiador suave y delicado con extractos de edelweiss y rosas de Provenza. Remueve las impurezas y maquillaje de la piel sin resecar ni dañar su barrera protectora. Deja tu piel limpia, radiante y puriﬁcada, con agradable aroma a rosas naturales.  '
    }
]

let carrito = [];


class Carrito {
    constructor(id, nombre, seccion, precioVenta, cantidad, imagen, descripcion, total) {
        this.id = id;
        this.nombre = nombre;
        this.seccion = seccion;
        this.precioVenta = precioVenta;
        this.cantidad = cantidad;
        this.imagen = imagen;
        this.descripcion = descripcion;
        this.total = precioVenta * cantidad;

    }
}

//Referencias html
const contenedor = document.getElementById('contenedor');
const inputSearch = document.getElementById('inputsearch');
const contenedorCarrito = document.getElementById('contenedor-carrito');
const botonComprar = document.getElementById('botonComprar');
const botonCancelar = document.getElementById('botonCancelar');

const agregarAlCarrito = (id) => {

    if (!id) {
        return;
    }

    const producto = productos.find(el => el.id === id);

    if (producto) {
        const productoCarrito = new Carrito(producto.id, producto.nombre, producto.seccion, producto.precioVenta, producto.cantidad, producto.imagen, producto.descripcion, producto.total);

        if (carrito.some(el => el.id === id)) {
            const target = carrito.find(el => el.id === id);
            carrito = carrito.filter(el => el.id !== id);

            const nuevoProducto = new Carrito(target.id, target.nombre, target.seccion, target.precioVenta, target.cantidad + 1, target.imagen, target.descripcion, target.total)
            carrito.push(nuevoProducto)
        }
        else {
            carrito.push(productoCarrito)
        }

    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    listarCarrito(carrito);
}


const listarCarrito = (productoCarrito) => {

    let acumulador = '';
    productoCarrito.forEach((producto) => {
        acumulador += `
        <tr>
        <th>
        <th scope="row">${producto.nombre}</th>
        <td>$ ${producto.precioVenta}</td>
        <td>${producto.cantidad}</td>
        <td>${producto.total}</td>
        </th>
        </tr>
        `
    })
    contenedorCarrito.innerHTML = acumulador;
}



if (localStorage.getItem('carrito')){
    carrito = JSON.parse(localStorage.getItem('carrito'));
    listarCarrito(carrito);
} 


const vaciarCarrito = () =>{
    carrito = localStorage.clear('carrito');
}
botonCancelar.addEventListener('click', vaciarCarrito)


const dibujarProductos = (productos, contenedor) => {
    let acumulador = '';

    productos.forEach(element => {
        acumulador += `
            <div class="boxA">
			<h3>${element.nombre}</h3>
			<p>${element.descripcion}</p>
            <img src=${element.imagen}>
            <h4 style="text-align: left">Precio: $ ${element.precioVenta}</h4>
            <a class="button" onclick="agregarAlCarrito(${element.id})" class="btn btn-primary">Agregar al carrito</a>
		</div>
        `
        contenedor.innerHTML = acumulador;
    });
}

dibujarProductos(productos, contenedor);

const handleSearch = (e) => {
    e.preventDefault();
    const filtrados = productos.filter(productos => (productos.nombre.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())))
    dibujarProductos(filtrados, contenedor);
}
inputSearch.addEventListener('click', handleSearch);






