# Photo Stack - Drag & Drop Website

A single-page website featuring draggable photo stacks that users can interact with by dragging photos around the screen.

## Project Structure

```
/
├── index.html              # Main HTML file
├── css/
│   └── style.css          # Styling and layout
├── js/
│   └── drag.js            # Drag and drop functionality
└── assets/
    └── images/            # Photo assets
        ├── photo1.jpg
        ├── photo2.jpg
        ├── photo3.jpg
        ├── photo4.jpg
        └── photo5.jpg
```

## Features

- **Draggable Photos**: Click and drag any photo to move it around the screen
- **Touch Support**: Works on mobile devices with touch gestures
- **Stack Effect**: Photos start in a stacked formation with slight rotations
- **Bring to Front**: Dragged photos automatically come to the front
- **Responsive Design**: Adapts to different screen sizes
- **Smooth Animations**: Fluid drag interactions with visual feedback
- **GIF Support**: Animated GIFs and SVGs continue animating while being dragged
- **All Image Formats**: Supports JPG, PNG, GIF, SVG, WebP, and more

## Tech Stack

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with flexbox, gradients, and transitions
- **Vanilla JavaScript**: ES6+ class-based drag and drop implementation

## How to Use

1. Open `index.html` in a web browser
2. Click and hold on any photo to start dragging
3. Move your mouse/finger to drag the photo around
4. Release to drop the photo in its new position

## Customization

### Adding More Photos (Super Easy!)

Just two simple steps:

1. **Add your image file** to `assets/images/`
2. **Add the filename** to the `IMAGE_FILES` array in `js/drag.js`:
   ```javascript
   const IMAGE_FILES = [
       'photo1.jpg',
       'photo2.jpg',
       'your-new-image.jpg',  // ← Add your filename here!
       'cool-animation.gif'    // Works with GIFs too!
   ];
   ```

That's it! The photo will automatically appear with random rotation and proper z-index.

**No need to edit HTML or CSS!** The positioning and stacking are handled automatically.

### Using Animated GIFs

Animated GIFs work perfectly! They continue animating smoothly while being dragged:

1. Add your GIF to `assets/images/`
2. Add the filename to `IMAGE_FILES` array
3. Done! Your GIF will animate while draggable

**Supported formats**: JPG, PNG, GIF, SVG, WebP, and more!

### Changing Colors

- Edit the gradient background in `style.css` at the `body` selector
- Modify photo border colors and shadows in the `.photo` class

### Adjusting Photo Size

- Change `width` and `height` values in the `.photo` class in `style.css`

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers with touch support

## License

MIT
