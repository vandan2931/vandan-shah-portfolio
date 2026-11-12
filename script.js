// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function () {
            mobileMenu.classList.toggle('hidden');
        });
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
        });
    }

    // Current year
    const yearEl = document.getElementById('current-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // AOS
    if (window.AOS) {
        AOS.init({ duration: 800, easing: 'ease-in-out', once: true, offset: 100 });
    }

    // Particles
    if (window.particlesJS && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 60, density: { enable: true, value_area: 800 } },
                color: { value: '#3b82f6' },
                shape: { type: 'circle' },
                opacity: { value: 0.4 },
                size: { value: 3, random: true },
                line_linked: { enable: true, distance: 150, color: '#3b82f6', opacity: 0.2, width: 1 },
                move: { enable: true, speed: 1.5, direction: 'none', out_mode: 'out' }
            },
            interactivity: {
                detect_on: 'canvas',
                events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' }, resize: true },
                modes: { grab: { distance: 140, line_linked: { opacity: 0.8 } } }
            },
            retina_detect: true
        });
    }

    // Scroll indicator + back to top
    const scrollBar = document.getElementById('scrollBar');
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', function () {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        if (scrollBar) scrollBar.style.width = ((scrollTop / scrollHeight) * 100) + '%';
        if (backToTop) backToTop.classList.toggle('visible', window.pageYOffset > 300);
    });
    if (backToTop) {
        backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // Copy buttons on code blocks
    document.querySelectorAll('.code-block .copy-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const code = this.parentElement.querySelector('code');
            if (!code) return;
            navigator.clipboard.writeText(code.innerText).then(() => {
                const original = this.textContent;
                this.textContent = 'Copied!';
                setTimeout(() => { this.textContent = original; }, 1500);
            });
        });
    });

    // Contact form (Formspree-compatible with graceful fallback)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            const action = contactForm.getAttribute('action') || '';
            // If Formspree endpoint is configured, let it submit normally (AJAX below)
            if (action.includes('formspree.io')) {
                e.preventDefault();
                const data = new FormData(contactForm);
                const status = document.getElementById('formStatus');
                try {
                    const res = await fetch(action, { method: 'POST', body: data, headers: { 'Accept': 'application/json' } });
                    if (res.ok) {
                        if (status) { status.textContent = 'Thank you! Your message has been sent.'; status.className = 'mt-3 text-green-400'; }
                        contactForm.reset();
                    } else {
                        if (status) { status.textContent = 'Something went wrong. Please email me directly.'; status.className = 'mt-3 text-red-400'; }
                    }
                } catch (err) {
                    if (status) { status.textContent = 'Network error. Please email me directly.'; status.className = 'mt-3 text-red-400'; }
                }
            } else {
                // Fallback: mailto
                e.preventDefault();
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const subject = document.getElementById('subject').value;
                const message = document.getElementById('message').value;
                const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
                window.location.href = `mailto:vandanshah074@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
                const status = document.getElementById('formStatus');
                if (status) { status.textContent = 'Opening your email client…'; status.className = 'mt-3 text-blue-300'; }
            }
        });
    }
});