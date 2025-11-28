(function() {

    /* ====================
    Preloader
    ======================= */
    window.onload = function () {
        window.setTimeout(fadeout, 300);
    }

    function fadeout() {
        document.querySelector('.preloader').style.opacity = '0';
        document.querySelector('.preloader').style.display = 'none';
    }

    /* ====================
    Sticky Header & Scroll to Top
    ======================= */
    window.addEventListener('scroll', function () {
        var header_navbar = document.querySelector(".header");
        var sticky = header_navbar.offsetTop;

        // Sticky header
        if (window.pageYOffset > sticky) {
            header_navbar.classList.add("scrolled");
        } else {
            header_navbar.classList.remove("scrolled");
        }

        // Show or hide the back-to-top button
        var backToTo = document.querySelector(".scroll-top");
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            backToTo.style.display = "flex";
        } else {
            backToTo.style.display = "none";
        }
    });

    /* ====================
    Navbar Toggler - WORKING VERSION
    ======================= */
    document.addEventListener('DOMContentLoaded', function() {
        const navbarToggler = document.querySelector(".navbar-toggler");
        const navbarCollapse = document.querySelector(".navbar-collapse");
        
        if (navbarToggler && navbarCollapse) {
            navbarToggler.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Toggle class active untuk hamburger icon
                this.classList.toggle("active");
                
                // Toggle class show untuk navbar menu
                navbarCollapse.classList.toggle("show");
            });
        }
        
        // Close navbar when clicking on nav links
        document.querySelectorAll(".navbar-nav .page-scroll").forEach(link => {
            link.addEventListener("click", function() {
                const navbarToggler = document.querySelector(".navbar-toggler");
                const navbarCollapse = document.querySelector(".navbar-collapse");
                
                if (navbarToggler && navbarCollapse) {
                    navbarToggler.classList.remove("active");
                    navbarCollapse.classList.remove('show');
                }
            });
        });
        
        // Close navbar when clicking outside
        document.addEventListener('click', function(e) {
            const navbarToggler = document.querySelector(".navbar-toggler");
            const navbarCollapse = document.querySelector(".navbar-collapse");
            
            if (navbarCollapse && navbarCollapse.classList.contains('show') && 
                !e.target.closest('.navbar')) {
                navbarToggler.classList.remove("active");
                navbarCollapse.classList.remove('show');
            }
        });
        
        // Auto close on scroll
        window.addEventListener('scroll', function() {
            const navbarToggler = document.querySelector(".navbar-toggler");
            const navbarCollapse = document.querySelector(".navbar-collapse");
            
            if (window.innerWidth <= 991 && navbarCollapse && navbarCollapse.classList.contains('show')) {
                navbarToggler.classList.remove("active");
                navbarCollapse.classList.remove('show');
            }
        });
    });

    /* ====================
    Section Menu Active
    ======================= */
    function onScroll(event) {
        var navLinks = document.querySelectorAll('.navbar-nav .nav-item a.page-scroll');
        var scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

        // Reset semua active class
        document.querySelectorAll('.navbar-nav .nav-item a.page-scroll').forEach(link => {
            link.classList.remove('active');
        });

        // Cek section mana yang aktif
        for (var i = 0; i < navLinks.length; i++) {
            var navLink = navLinks[i];
            var val = navLink.getAttribute('href');
            
            if (!val || val === '#' || val === '#0') continue;
            
            var refElement = document.querySelector(val);
            if (!refElement) continue;
            
            var scrollTopMinus = scrollPos + 100;
            
            // Jika di home section, jangan set active ke home link
            if (val === '#home' && scrollPos < 100) {
                continue;
            }
            
            if (refElement.offsetTop <= scrollTopMinus && (refElement.offsetTop + refElement.offsetHeight > scrollTopMinus)) {
                navLink.classList.add('active');
            }
        }
    }

    window.addEventListener('scroll', onScroll);

    /* ====================
    Counter Up
    ======================= */
    var cu = new counterUp({
        start: 0,
        duration: 2000,
        intvalues: true,
        interval: 100,
        append: " ",
    });
    cu.start();

    /* ====================
    WOW Animation
    ======================= */
    new WOW().init();

    /* ====================
    Article Card Interactions
    ======================= */
    document.addEventListener('DOMContentLoaded', function() {
        // Fungsi untuk modal artikel
        const readMoreButtons = document.querySelectorAll('.btn-read-more');
        const modalCloseButtons = document.querySelectorAll('.modal-close');
        const modalOverlays = document.querySelectorAll('.modal-overlay');
        
        // Buka modal
        readMoreButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                const articleId = this.getAttribute('data-article');
                const modal = document.getElementById(`modal-${articleId}`);
                if (modal) {
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        // Klik pada card artikel juga membuka modal
        document.querySelectorAll('.article-card').forEach(card => {
            card.addEventListener('click', function(e) {
                if (!e.target.closest('.btn-like')) {
                    const articleId = this.getAttribute('data-article');
                    const modal = document.getElementById(`modal-${articleId}`);
                    if (modal) {
                        modal.classList.add('active');
                        document.body.style.overflow = 'hidden';
                    }
                }
            });
        });
        
        // Tutup modal
        function closeModal() {
            const modals = document.querySelectorAll('.article-modal');
            modals.forEach(modal => {
                modal.classList.remove('active');
            });
            document.body.style.overflow = 'auto';
        }
        
        modalCloseButtons.forEach(button => {
            button.addEventListener('click', closeModal);
        });
        
        modalOverlays.forEach(overlay => {
            overlay.addEventListener('click', closeModal);
        });

        // Smooth scrolling untuk semua link dengan hash
        document.querySelectorAll('a.page-scroll').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Close mobile navbar if open
                    const navbarCollapse = document.querySelector(".navbar-collapse");
                    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                        const navbarToggler = document.querySelector(".navbar-toggler");
                        navbarToggler.classList.remove('active');
                        navbarCollapse.classList.remove('show');
                    }
                }
            });
        });

        // Scroll to top functionality
        const scrollTopBtn = document.querySelector('.scroll-top');
        if (scrollTopBtn) {
            scrollTopBtn.addEventListener('click', function(e) {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }

        // Form submission handling
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Validasi form sederhana
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const message = document.getElementById('message').value;
                
                if (!name || !email || !message) {
                    showNotification('Harap lengkapi semua field yang wajib diisi!', 'error');
                    return;
                }
                
                // Validasi email
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    showNotification('Format email tidak valid!', 'error');
                    return;
                }
                
                // Simulasi pengiriman form
                const submitButton = this.querySelector('button[type="submit"]');
                const originalText = submitButton.innerHTML;
                
                submitButton.innerHTML = '<i class="lni lni-spinner-alt spinning"></i> Mengirim...';
                submitButton.disabled = true;
                
                // Simulasi delay pengiriman
                setTimeout(() => {
                    showNotification('Pesan berhasil dikirim! Kami akan menghubungi Anda segera.');
                    this.reset();
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                }, 2000);
            });
        }

        // Tutup modal dengan ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeModal();
            }
        });

        // Fungsi untuk menampilkan notifikasi
        function showNotification(message, type = 'success') {
            // Hapus notifikasi sebelumnya jika ada
            const existingNotification = document.querySelector('.custom-notification');
            if (existingNotification) {
                existingNotification.remove();
            }

            // Buat elemen notifikasi
            const notification = document.createElement('div');
            notification.className = `custom-notification ${type === 'error' ? 'error' : ''}`;
            notification.innerHTML = `
                <div class="notification-content">
                    <i class="lni ${type === 'error' ? 'lni-warning' : 'lni-checkmark-circle'}"></i>
                    <span>${message}</span>
                </div>
            `;
            
            document.body.appendChild(notification);
            
            // Animasi masuk
            setTimeout(() => {
                notification.style.transform = 'translateX(0)';
            }, 100);
            
            // Animasi keluar setelah 3 detik
            setTimeout(() => {
                notification.style.transform = 'translateX(150%)';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }, 3000);
        }

        // Tambahkan style untuk spinner dan notifikasi
        const style = document.createElement('style');
        style.textContent = `
            .lni-spinner-alt.spinning {
                animation: spin 1s linear infinite;
            }
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            
            .custom-notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: #28a745;
                color: white;
                padding: 15px 25px;
                border-radius: 8px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                z-index: 10000;
                transform: translateX(150%);
                transition: transform 0.3s ease;
                max-width: 300px;
                display: flex;
                align-items: center;
                gap: 12px;
            }
            
            .custom-notification.error {
                background: #dc3545;
            }
            
            .custom-notification .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .custom-notification .notification-content i {
                font-size: 20px;
            }
        `;
        document.head.appendChild(style);
    });

})();