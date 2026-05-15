// ============ MOBILE MENU ============
function toggleMobileMenu() {
    const menu = document.getElementById('mobileNav');
    if (menu) menu.classList.toggle('show');
}

function closeMobileMenu() {
    const menu = document.getElementById('mobileNav');
    if (menu) menu.classList.remove('show');
}

// Close mobile menu when clicking a link
document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// ============ EMAILJS CONFIGURATION ============
// Sign up at emailjs.com and replace these values:
const EMAILJS_PUBLIC_KEY = "5Hd33KSB9u3B7gHEl";
const EMAILJS_SERVICE_ID = "";
const EMAILJS_TEMPLATE_ID = "template_s11tmmn";

// Initialize EmailJS
if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY") {
    emailjs.init(EMAILJS_PUBLIC_KEY);
}

// ============ MENU DATA ============
const menuData = {
    popular: [
        { name: "Grilled Fish Special", price: "2500 CFA", image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=300" },
        { name: "Pepper Soup", price: "1500 CFA", image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=300" },
        { name: "BBQ Chicken", price: "2000 CFA", image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=300" }
    ],
    main: [
        { name: "Fried Plantains", price: "1000 CFA", image: "https://images.unsplash.com/photo-1597534458220-9fb4969f2df5?w=300" },
        { name: "Beef Stew", price: "2000 CFA", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=300" },
        { name: "Jollof Rice", price: "1500 CFA", image: "https://images.unsplash.com/photo-1546074177-ffdda98d214f?w=300" }
    ],
    drinks: [
        { name: "Beer (Flag/Brasseries)", price: "1000 CFA", image: "https://images.unsplash.com/photo-1619635179682-b2f0f46c50ec?w=300" },
        { name: "Signature Cocktail", price: "3000 CFA", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=300" },
        { name: "Soft Drinks", price: "500 CFA", image: "https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=300" }
    ]
};

function loadMenus() {
    // Popular menu
    const popularContainer = document.getElementById('popularMenu');
    if (popularContainer) {
        popularContainer.innerHTML = menuData.popular.map(item => `
            <div class="menu-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="menu-info">
                    <h3>${item.name}</h3>
                    <span class="menu-price">${item.price}</span>
                </div>
            </div>
        `).join('');
    }
    
    // Main menu
    const mainContainer = document.getElementById('mainMenu');
    if (mainContainer) {
        mainContainer.innerHTML = menuData.main.map(item => `
            <div class="menu-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="menu-info">
                    <h3>${item.name}</h3>
                    <span class="menu-price">${item.price}</span>
                </div>
            </div>
        `).join('');
    }
    
    // Drinks menu
    const drinksContainer = document.getElementById('drinksMenu');
    if (drinksContainer) {
        drinksContainer.innerHTML = menuData.drinks.map(item => `
            <div class="menu-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="menu-info">
                    <h3>${item.name}</h3>
                    <span class="menu-price">${item.price}</span>
                </div>
            </div>
        `).join('');
    }
}

// ============ GALLERY FUNCTIONS ============
let galleryItems = JSON.parse(localStorage.getItem('georgesGallery')) || [
    { type: 'image', url: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400', caption: 'Cozy Interior View' },
    { type: 'image', url: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=400', caption: 'Our Signature Cocktails' },
    { type: 'image', url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400', caption: 'Delicious Meals' }
];

function loadGallery() {
    const container = document.getElementById('galleryGrid');
    if (!container) return;
    
    container.innerHTML = galleryItems.map((item, index) => `
        <div class="gallery-item" onclick="openMedia('${item.url}', '${item.type}')">
            ${item.type === 'video' ? `<video src="${item.url}"></video>` : `<img src="${item.url}" alt="${item.caption}">`}
            <div class="gallery-overlay">
                <p>${item.caption || 'George\'s Corner'}</p>
                <small>📸 Click to view</small>
            </div>
        </div>
    `).join('');
}

function uploadMedia() {
    const fileInput = document.getElementById('uploadFile');
    const caption = document.getElementById('uploadCaption');
    const file = fileInput?.files[0];
    
    if (!file) {
        alert('Please select a file to upload');
        return;
    }
    
    const type = file.type.startsWith('image') ? 'image' : 'video';
    const url = URL.createObjectURL(file);
    
    galleryItems.unshift({ type, url, caption: caption?.value || 'Shared by customer' });
    localStorage.setItem('georgesGallery', JSON.stringify(galleryItems));
    loadGallery();
    
    alert('Media added to gallery!');
    if (fileInput) fileInput.value = '';
    if (caption) caption.value = '';
}

function openMedia(url, type) {
    const modal = document.getElementById('mediaModal');
    const content = document.getElementById('modalContent');
    if (!modal || !content) return;
    
    if (type === 'video') {
        content.innerHTML = `<video src="${url}" controls autoplay style="max-width:90%; max-height:90%;"></video>`;
    } else {
        content.innerHTML = `<img src="${url}" style="max-width:90%; max-height:90%;">`;
    }
    modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('mediaModal');
    const content = document.getElementById('modalContent');
    if (modal) modal.style.display = 'none';
    if (content) content.innerHTML = '';
}

// ============ REVIEWS FUNCTIONS ============
let reviews = JSON.parse(localStorage.getItem('georgesReviews')) || [
    { name: "Na Azeh Workam", rating: 4, text: "George's Corner offers a delightful dining experience with its picturesque city view. The food is consistently good!", date: "2023-01-15" },
    { name: "Akwo KN", rating: 4, text: "A cozy, secured and nice spot for relaxing with a lover, family, colleagues or friends.", date: "2024-01-10" },
    { name: "Faith Nsoni", rating: 3, text: "Services are very poor, the cook takes about 1hr to serve a meal.", date: "2024-01-05" },
    { name: "Lily Asongfac", rating: 4, text: "The view from this place is breathtaking!", date: "2024-02-20" },
    { name: "Martin EBO ZE", rating: 5, text: "Excellent and fairly quick service. The best in the restaurant business!", date: "2023-12-10" },
    { name: "rostand ayissi", rating: 5, text: "There are no two, the best!", date: "2023-11-01" },
    { name: "Mohamed KHALIF", rating: 4, text: "The service is pleasant", date: "2023-10-15" },
    { name: "nassourou kassoum", rating: 5, text: "Quality reception and services", date: "2023-09-20" }
];

let currentFilter = 'all';
let currentRating = 0;

function loadReviews() {
    const container = document.getElementById('reviewsGrid');
    if (!container) return;
    
    let filteredReviews = reviews;
    if (currentFilter !== 'all') {
        filteredReviews = reviews.filter(r => r.rating === currentFilter);
    }
    
    container.innerHTML = filteredReviews.map(review => `
        <div class="review-card">
            <div class="review-stars">${'★'.repeat(review.rating)}${'☆'.repeat(5-review.rating)}</div>
            <p>${review.text}</p>
            <div class="review-name">— ${review.name}</div>
            <div class="review-date">${review.date}</div>
        </div>
    `).join('');
}

function filterReviews(rating) {
    currentFilter = rating;
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.innerText.includes(rating === 'all' ? 'All' : rating)) {
            btn.classList.add('active');
        }
    });
    loadReviews();
}

function setupStarRating() {
    const stars = document.querySelectorAll('#reviewStars i');
    stars.forEach(star => {
        star.addEventListener('click', () => {
            currentRating = parseInt(star.dataset.rating);
            stars.forEach(s => {
                if (parseInt(s.dataset.rating) <= currentRating) {
                    s.className = 'fas fa-star';
                    s.style.color = '#f59e0b';
                } else {
                    s.className = 'far fa-star';
                    s.style.color = '#555';
                }
            });
        });
    });
}

function submitReview() {
    const name = document.getElementById('reviewName')?.value;
    const text = document.getElementById('reviewText')?.value;
    const statusDiv = document.getElementById('reviewStatus');
    
    if (!name || !text || currentRating === 0) {
        alert('Please fill all fields and select a rating');
        return;
    }
    
    const newReview = {
        name: name,
        rating: currentRating,
        text: text,
        date: new Date().toISOString().split('T')[0]
    };
    
    reviews.unshift(newReview);
    localStorage.setItem('georgesReviews', JSON.stringify(reviews));
    loadReviews();
    
    // Send email notification
    if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY") {
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
            from_name: name,
            message: `New Review (${currentRating} stars): ${text}`,
            to_email: "lilicon2331@gmail.com"
        }).catch(err => console.log("Email error:", err));
    }
    
    if (statusDiv) {
        statusDiv.innerHTML = '<p style="color: #22c55e;">Thank you for your review!</p>';
        setTimeout(() => { statusDiv.innerHTML = ''; }, 3000);
    }
    
    if (document.getElementById('reviewName')) document.getElementById('reviewName').value = '';
    if (document.getElementById('reviewText')) document.getElementById('reviewText').value = '';
    currentRating = 0;
    document.querySelectorAll('#reviewStars i').forEach(s => {
        s.className = 'far fa-star';
        s.style.color = '#555';
    });
}

// ============ CONTACT FORM ============
function setupContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('contactName')?.value;
        const email = document.getElementById('contactEmail')?.value;
        const subject = document.getElementById('contactSubject')?.value;
        const message = document.getElementById('contactMessage')?.value;
        const statusDiv = document.getElementById('contactStatus');
        
        if (!name || !email || !message) {
            alert('Please fill all required fields');
            return;
        }
        
        if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY") {
            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
                from_name: name,
                from_email: email,
                subject: subject || 'Contact from Website',
                message: message,
                to_email: "lilicon2331@gmail.com"
            }).then(() => {
                if (statusDiv) statusDiv.innerHTML = '<p style="color: #22c55e;">Message sent successfully! We\'ll reply soon.</p>';
                form.reset();
                setTimeout(() => { if(statusDiv) statusDiv.innerHTML = ''; }, 5000);
            }).catch(() => {
                // Fallback - store locally
                const messages = JSON.parse(localStorage.getItem('georgesMessages') || '[]');
                messages.push({ name, email, subject, message, date: new Date().toISOString() });
                localStorage.setItem('georgesMessages', JSON.stringify(messages));
                if (statusDiv) statusDiv.innerHTML = '<p style="color: #f59e0b;">Message saved locally. We\'ll respond soon!</p>';
                form.reset();
                setTimeout(() => { if(statusDiv) statusDiv.innerHTML = ''; }, 5000);
            });
        } else {
            // Store locally if EmailJS not configured
            const messages = JSON.parse(localStorage.getItem('georgesMessages') || '[]');
            messages.push({ name, email, subject, message, date: new Date().toISOString() });
            localStorage.setItem('georgesMessages', JSON.stringify(messages));
            if (statusDiv) statusDiv.innerHTML = '<p style="color: #f59e0b;">Message saved! (EmailJS not configured)</p>';
            form.reset();
            setTimeout(() => { if(statusDiv) statusDiv.innerHTML = ''; }, 5000);
        }
    });
}

// ============ INITIALIZE ALL PAGES ============
document.addEventListener('DOMContentLoaded', () => {
    loadMenus();
    loadGallery();
    loadReviews();
    setupStarRating();
    setupContactForm();
});