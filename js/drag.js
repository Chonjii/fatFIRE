/**
 * Photo Drag and Drop Functionality
 * Allows users to drag photos around the screen
 * Optimized for smooth performance
 */

// ============================================
// CONFIGURATION: Add your images here!
// ============================================
// Just add image filenames to this array - that's it!
// Supported formats: JPG, PNG, GIF, SVG, WebP, etc.
const IMAGE_FILES = [
    'photo1.jpg',
    'photo2.jpg',
    'photo3.jpg',
    'photo4.jpg',
    'photo5.jpg',
    'animated-demo.svg',
    'animated-demo2.svg'
];

// Path to your images folder
const IMAGE_PATH = 'assets/images/';

// ============================================
// Photo Stack Generator
// ============================================
class PhotoStackGenerator {
    constructor(imageFiles, imagePath) {
        this.imageFiles = imageFiles;
        this.imagePath = imagePath;
        this.photoStack = document.getElementById('photoStack');
    }

    generate() {
        // Clear existing photos
        this.photoStack.innerHTML = '';

        // Generate random rotations for variety
        const rotations = this.generateRotations(this.imageFiles.length);

        // Create photo elements
        this.imageFiles.forEach((filename, index) => {
            const photoDiv = document.createElement('div');
            photoDiv.className = 'photo';
            photoDiv.setAttribute('data-photo', index + 1);
            photoDiv.style.top = '50%';
            photoDiv.style.left = '50%';
            photoDiv.style.transform = `translate(-50%, -50%) rotate(${rotations[index]}deg)`;
            photoDiv.style.zIndex = this.imageFiles.length - index;

            const img = document.createElement('img');
            img.src = `${this.imagePath}${filename}`;
            img.alt = `Photo ${index + 1}`;

            photoDiv.appendChild(img);
            this.photoStack.appendChild(photoDiv);
        });
    }

    generateRotations(count) {
        // Generate varied rotation angles between -8 and 8 degrees
        const rotations = [];
        for (let i = 0; i < count; i++) {
            const rotation = Math.floor(Math.random() * 17) - 8; // -8 to 8
            rotations.push(rotation);
        }
        return rotations;
    }
}

// ============================================
// Photo Dragger Class
// ============================================
class PhotoDragger {
    constructor() {
        this.photos = document.querySelectorAll('.photo');
        this.activePhoto = null;
        this.rotation = 0; // Cache rotation to avoid recalculation
        this.offsetX = 0; // Mouse offset from element center
        this.offsetY = 0;
        this.elementWidth = 0; // Cache element dimensions
        this.elementHeight = 0;

        // Store data for each photo
        this.photoData = new Map();

        this.init();
    }

    init() {
        this.photos.forEach(photo => {
            // Cache initial rotation for each photo
            const transform = window.getComputedStyle(photo).transform;
            let rotation = 0;

            if (transform !== 'none') {
                const matrix = new DOMMatrix(transform);
                rotation = Math.atan2(matrix.b, matrix.a);
            }

            this.photoData.set(photo, {
                rotation: rotation,
                translateX: 0,
                translateY: 0,
                isDragged: false // Track if photo has been moved
            });

            // Mouse events
            photo.addEventListener('mousedown', this.dragStart.bind(this));

            // Touch events for mobile
            photo.addEventListener('touchstart', this.dragStart.bind(this), { passive: false });
        });

        // Global events
        document.addEventListener('mousemove', this.drag.bind(this));
        document.addEventListener('mouseup', this.dragEnd.bind(this));

        document.addEventListener('touchmove', this.drag.bind(this), { passive: false });
        document.addEventListener('touchend', this.dragEnd.bind(this));
    }

    dragStart(e) {
        this.activePhoto = e.currentTarget;
        const photoData = this.photoData.get(this.activePhoto);

        // Bring to front
        this.bringToFront(this.activePhoto);

        // Add dragging class
        this.activePhoto.classList.add('dragging');

        // Cache the current rotation
        this.rotation = photoData.rotation;

        // Get mouse/touch position
        const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
        const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;

        // Get current element position (where it actually is on screen)
        const rect = this.activePhoto.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Cache element size for drag calculations
        this.elementWidth = rect.width;
        this.elementHeight = rect.height;

        // Calculate offset from mouse to element center
        // This keeps the element from jumping - the point where user clicked stays under cursor
        this.offsetX = clientX - centerX;
        this.offsetY = clientY - centerY;
    }

    drag(e) {
        if (this.activePhoto !== null) {
            e.preventDefault();

            const photoData = this.photoData.get(this.activePhoto);

            // Get current mouse position
            const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
            const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;

            // Calculate where the element center should be
            // (mouse position minus the offset we calculated on mousedown)
            const newCenterX = clientX - this.offsetX;
            const newCenterY = clientY - this.offsetY;

            // Convert to translate values
            // Elements are positioned at top: 50%, left: 50% (top-left at viewport center)
            // translate3d moves from that point, so we need to account for element size
            // to position the center correctly
            const translateX = newCenterX - window.innerWidth / 2 - this.elementWidth / 2;
            const translateY = newCenterY - window.innerHeight / 2 - this.elementHeight / 2;

            // Update cached position
            photoData.translateX = translateX;
            photoData.translateY = translateY;
            photoData.isDragged = true;

            // Apply transform with GPU acceleration
            const rotationDeg = this.rotation * (180 / Math.PI);
            this.activePhoto.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) rotate(${rotationDeg}deg)`;
        }
    }

    dragEnd(e) {
        if (this.activePhoto !== null) {
            this.activePhoto.classList.remove('dragging');
            this.activePhoto = null;
        }
    }

    bringToFront(el) {
        // Get all photos and find max z-index
        let maxZ = 0;
        this.photos.forEach(photo => {
            const z = parseInt(photo.style.zIndex) || parseInt(window.getComputedStyle(photo).zIndex) || 0;
            if (z > maxZ) maxZ = z;
        });

        // Set this photo's z-index higher
        el.style.zIndex = maxZ + 1;
    }
}

// ============================================
// Initialize when DOM is loaded
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Step 1: Generate photo stack from image list
    const generator = new PhotoStackGenerator(IMAGE_FILES, IMAGE_PATH);
    generator.generate();

    // Step 2: Initialize drag functionality
    new PhotoDragger();

    console.log(`Photo stack initialized with ${IMAGE_FILES.length} photos!`);
    console.log('Drag the photos around the screen.');
});
