// ==================== WHATSAPP ====================
let pedidoActivo = {
  producto: '',
  precio: 0,
  imagen: ''
};

function abrirModalPedido(producto, precio, imagen) {
  pedidoActivo.producto = producto;
  pedidoActivo.precio = precio;
  pedidoActivo.imagen = imagen;

  const modal = document.getElementById('clientModal');
  const productName = document.getElementById('modal-product-name');
  const nameInput = document.getElementById('modal-client-name');
  const lastnameInput = document.getElementById('modal-client-lastname');
  const cityInput = document.getElementById('modal-client-city');
  const idInput = document.getElementById('modal-client-id');

  if (productName) {
    productName.textContent = `${producto} - ₲ ${precio}`;
  }

  if (nameInput) nameInput.value = '';
  if (lastnameInput) lastnameInput.value = '';
  if (cityInput) cityInput.value = '';
  if (idInput) idInput.value = '';

  if (modal) {
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
  }
}

function cerrarModalPedido() {
  const modal = document.getElementById('clientModal');
  if (modal) {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
  }
}

function enviarPedidoWhatsApp() {
  const numero = '595986179875';
  const nombre = document.getElementById('modal-client-name')?.value.trim() || '';
  const apellido = document.getElementById('modal-client-lastname')?.value.trim() || '';
  const ciudad = document.getElementById('modal-client-city')?.value.trim() || '';
  const cedula = document.getElementById('modal-client-id')?.value.trim() || '';

  let mensaje = `Hola! Quiero pedir el perfume: ${pedidoActivo.producto}`;
  if (pedidoActivo.precio !== undefined) {
    mensaje += ` - Precio: ₲ ${pedidoActivo.precio}`;
  }

  if (nombre || apellido || ciudad || cedula) {
    mensaje += `\n\nDatos del cliente:`;
    if (nombre) mensaje += `\nNombre: ${nombre}`;
    if (apellido) mensaje += `\nApellido: ${apellido}`;
    if (ciudad) mensaje += `\nCiudad: ${ciudad}`;
    if (cedula) mensaje += `\nCédula: ${cedula}`;
  }

  if (pedidoActivo.imagen) {
    const imageUrl = `${window.location.origin}/${pedidoActivo.imagen.replace(/^\/+/, '')}`;
    mensaje += `\n\nImagen: ${imageUrl}`;
  }

  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
  cerrarModalPedido();
}

// ==================== BÚSQUEDA ====================
function setupSearch() {
  const input = document.getElementById('search');
  if (!input) return;
  
  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    document.querySelectorAll('.card').forEach(card => {
      const title = (card.querySelector('h3')?.innerText || '').toLowerCase();
      const desc = (card.querySelector('.description')?.innerText || '').toLowerCase();
      const match = q === '' || title.includes(q) || desc.includes(q);
      card.style.display = match ? '' : 'none';
    });
  });
}

// ==================== MENÚ HAMBURGUESA ====================
function toggleMenu() {
  const btn = document.querySelector('.menu-toggle');
  const menu = document.getElementById('navMenu');
  
  if (btn && menu) {
    btn.classList.toggle('active');
    menu.classList.toggle('active');
  }
}

// Cerrar menú al hacer clic en un enlace
document.addEventListener('DOMContentLoaded', () => {
  setupSearch();
  
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const btn = document.querySelector('.menu-toggle');
      const menu = document.getElementById('navMenu');
      btn?.classList.remove('active');
      menu?.classList.remove('active');
    });
  });
  
  // Cerrar menú al hacer clic fuera
  document.addEventListener('click', (e) => {
    const header = document.querySelector('header');
    if (!header.contains(e.target)) {
      const btn = document.querySelector('.menu-toggle');
      const menu = document.getElementById('navMenu');
      btn?.classList.remove('active');
      menu?.classList.remove('active');
    }
  });
});
