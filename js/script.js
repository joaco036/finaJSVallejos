    document.addEventListener("DOMContentLoaded", function() {
      let carritoAbierto = true
      let carritoDiv = null
      let carritoProductos = []
    
      const crearCarritoBtn = document.getElementById("crearCarritoBtn")
    
      abrirCarrito()
    
      crearCarritoBtn.addEventListener("click", function() {
        if (!carritoAbierto) {
          abrirCarrito()
        } else {
          cerrarCarrito()
        }
      })
    
      const yerbaBtn = document.getElementById("yerba")
      const teBtn = document.getElementById("te")
      const cafeBtn = document.getElementById("cafe")
    
      yerbaBtn.addEventListener("click", function() {
        agregarProducto("yerba")
      })
    
      teBtn.addEventListener("click", function() {
        agregarProducto("te")
      })
    
      cafeBtn.addEventListener("click", function() {
        agregarProducto("cafe")
      })
    
      function abrirCarrito() {
        carritoDiv = document.createElement("div")
        carritoDiv.id = "carrito"
        carritoDiv.classList.add("carrito")
    
        crearCarritoBtn.textContent = "Cerrar Carrito"
    
        document.body.appendChild(carritoDiv)
        carritoAbierto = true
    
        actualizarCarritoVisual()
      }
    
      function cerrarCarrito() {
        document.body.removeChild(carritoDiv)
        carritoAbierto = false
        carritoDiv = null
    
        crearCarritoBtn.textContent = "Crear Carrito"
      }
    
      function agregarProducto(nombreProducto) {
        const rutaJson = "../productos/productos.json"
        fetch(rutaJson)
          .then(response => response.json())
          .then(data => {
            const productos = data.productos
            const producto = productos.find(prod => prod.nombre === nombreProducto)
            if (producto) {
              const nombre = producto.nombre
              const precio = producto.precio
    
              const productoEnCarrito = { nombre, precio }
              carritoProductos.push(productoEnCarrito)
    
              guardarProductosEnStorage()
              actualizarCarritoVisual()
            }
          })

      }
    
      function cargarProductosDelStorage() {
        const productosDelStorage = localStorage.getItem("carritoProductos")
        if (productosDelStorage) {
          carritoProductos = JSON.parse(productosDelStorage)
          actualizarCarritoVisual()
        }
      }
    
      function guardarProductosEnStorage() {
        localStorage.setItem("carritoProductos", JSON.stringify(carritoProductos))
      }
    
      function actualizarCarritoVisual() {
        while (carritoDiv.firstChild) {
          carritoDiv.removeChild(carritoDiv.firstChild)
        }
    
        carritoProductos.forEach((producto, index) => {
          const productoItem = document.createElement("li")
          productoItem.textContent = `${producto.nombre}: $${producto.precio}`
          productoItem.classList.add("producto-carrito")
    
          productoItem.addEventListener("click", function() {
            eliminarProducto(index)
          })
    
          carritoDiv.appendChild(productoItem)
        })
      }
    
      function eliminarProducto(index) {
        carritoProductos.splice(index, 1)
        guardarProductosEnStorage()
        actualizarCarritoVisual()
      }
    
      cargarProductosDelStorage()
    })

    
    
    
    document.addEventListener("DOMContentLoaded", function() {
      const btnEliminarCarrito = document.getElementById("BtnCarrito");
      
      btnEliminarCarrito.addEventListener("click", function() {
        localStorage.removeItem("carritoProductos"); 
        
        Swal.fire({
          title: 'Gracias por su compra',
          text: 'porfavor esperar a que la compra se complete',
          icon: 'success',
          timer: 3000
        })
        setTimeout(function() {
          location.reload();
      }, 3000)
      });
    });
    