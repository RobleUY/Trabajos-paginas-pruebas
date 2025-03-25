// Selección de elementos del DOM
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li');
const contactForm = document.getElementById('contact-form');

// Función para manejar la navegación con efecto "sticky"
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.padding = '10px 0';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.padding = '20px 0';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Función para manejar el menú hamburguesa en dispositivos móviles
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    // Animación para las barras del menú hamburguesa
    const bars = document.querySelectorAll('.bar');
    if (hamburger.classList.contains('active')) {
        bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
    } else {
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    }
});

// Cerrar el menú al hacer clic en un enlace
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            hamburger.click();
        }
    });
});

// Manejar cambio de sección activa al hacer scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksItems.forEach(li => {
        li.querySelector('a').classList.remove('active');
        if (li.querySelector('a').getAttribute('href') === `#${current}`) {
            li.querySelector('a').classList.add('active');
        }
    });
});

// Manejo del formulario de contacto
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener los valores del formulario
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const telefono = document.getElementById('telefono').value;
        const mensaje = document.getElementById('mensaje').value;
        
        // Aquí normalmente se enviarían los datos a un servidor
        // Pero por ahora, solo mostraremos un mensaje de confirmación
        
        // Resetear el formulario y mostrar mensaje de éxito
        contactForm.reset();
        
        // Crear elemento de mensaje de éxito
        const successMessage = document.createElement('div');
        successMessage.classList.add('mensaje-exito');
        successMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <p>¡Gracias por tu mensaje, ${nombre}! Te contactaremos pronto.</p>
        `;
        
        // Insertar el mensaje después del formulario
        contactForm.parentNode.appendChild(successMessage);
        
        // Remover el mensaje después de 5 segundos
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    });
}

// Animaciones para elementos al hacer scroll
document.addEventListener('DOMContentLoaded', () => {
    // Función para verificar si un elemento está en el viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    // Elementos a animar
    const animateElements = [
        ...document.querySelectorAll('.producto-card'),
        ...document.querySelectorAll('.galeria-item'),
        ...document.querySelectorAll('.proceso-item'),
        ...document.querySelectorAll('.contacto-item')
    ];
    
    // Función para animar elementos visibles
    function checkVisibility() {
        animateElements.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('animated')) {
                element.classList.add('animated');
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Aplicar estilo inicial a los elementos
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Verificar la visibilidad inicialmente y en cada scroll
    checkVisibility();
    window.addEventListener('scroll', checkVisibility);
}); 