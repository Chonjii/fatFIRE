/**
 * Photo Drag and Drop Functionality
 * Allows users to drag photos around the screen
 * Optimized for smooth performance
 */

class PhotoDragger {
    constructor() {
        this.photos = document.querySelectorAll('.photo');
        this.activePhoto = null;
        this.currentX = 0;
        this.currentY = 0;
        this.initialX = 0;
        this.initialY = 0;
        this.xOffset = 0;
        this.yOffset = 0;
        this.rotation = 0; // Cache rotation to avoid recalculation

        // Store initial rotations for each photo
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
                translateY: 0
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
        // Get the element being dragged
        this.activePhoto = e.currentTarget;
        const photoData = this.photoData.get(this.activePhoto);

        // Bring to front
        this.bringToFront(this.activePhoto);

        // Add dragging class
        this.activePhoto.classList.add('dragging');

        // Cache the current rotation
        this.rotation = photoData.rotation;

        // Get current position
        this.xOffset = photoData.translateX;
        this.yOffset = photoData.translateY;

        if (e.type === 'touchstart') {
            this.initialX = e.touches[0].clientX - this.xOffset;
            this.initialY = e.touches[0].clientY - this.yOffset;
        } else {
            this.initialX = e.clientX - this.xOffset;
            this.initialY = e.clientY - this.yOffset;
        }
    }

    drag(e) {
        if (this.activePhoto !== null) {
            e.preventDefault();

            if (e.type === 'touchmove') {
                this.currentX = e.touches[0].clientX - this.initialX;
                this.currentY = e.touches[0].clientY - this.initialY;
            } else {
                this.currentX = e.clientX - this.initialX;
                this.currentY = e.clientY - this.initialY;
            }

            this.xOffset = this.currentX;
            this.yOffset = this.currentY;

            // Update cached position
            const photoData = this.photoData.get(this.activePhoto);
            photoData.translateX = this.currentX;
            photoData.translateY = this.currentY;

            // Use translate3d for GPU acceleration and cached rotation
            const rotationDeg = this.rotation * (180 / Math.PI);
            this.activePhoto.style.transform = `translate3d(${this.currentX}px, ${this.currentY}px, 0) rotate(${rotationDeg}deg)`;
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

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PhotoDragger();
    console.log('Photo dragger initialized! Drag the photos around.');
});
