/**
 * Photo Drag and Drop Functionality
 * Allows users to drag photos around the screen
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

        this.init();
    }

    init() {
        this.photos.forEach(photo => {
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

        // Bring to front
        this.bringToFront(this.activePhoto);

        // Add dragging class
        this.activePhoto.classList.add('dragging');

        if (e.type === 'touchstart') {
            this.initialX = e.touches[0].clientX - this.xOffset;
            this.initialY = e.touches[0].clientY - this.yOffset;
        } else {
            this.initialX = e.clientX - this.xOffset;
            this.initialY = e.clientY - this.yOffset;
        }

        // Get current transform values
        const transform = window.getComputedStyle(this.activePhoto).transform;
        if (transform !== 'none') {
            const matrix = new DOMMatrix(transform);
            this.xOffset = matrix.m41;
            this.yOffset = matrix.m42;
            this.initialX = (e.type === 'touchstart' ? e.touches[0].clientX : e.clientX) - this.xOffset;
            this.initialY = (e.type === 'touchstart' ? e.touches[0].clientY : e.clientY) - this.yOffset;
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

            this.setTranslate(this.currentX, this.currentY, this.activePhoto);
        }
    }

    dragEnd(e) {
        if (this.activePhoto !== null) {
            this.activePhoto.classList.remove('dragging');
            this.activePhoto = null;
        }
    }

    setTranslate(xPos, yPos, el) {
        // Preserve the original transform rotation
        const currentTransform = window.getComputedStyle(el).transform;
        let rotation = '0deg';

        if (currentTransform !== 'none') {
            const values = currentTransform.split('(')[1].split(')')[0].split(',');
            const a = values[0];
            const b = values[1];
            rotation = Math.round(Math.atan2(b, a) * (180/Math.PI)) + 'deg';
        }

        el.style.transform = `translate(${xPos}px, ${yPos}px) rotate(${rotation})`;
    }

    bringToFront(el) {
        // Get all photos and find max z-index
        let maxZ = 0;
        this.photos.forEach(photo => {
            const z = parseInt(window.getComputedStyle(photo).zIndex) || 0;
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
