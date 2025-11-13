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

### Adding More Photos

1. Add new photo files to `assets/images/`
2. Add new photo divs in `index.html`:
   ```html
   <div class="photo" data-photo="6">
       <img src="assets/images/photo6.jpg" alt="Photo 6">
   </div>
   ```
3. Add initial positioning styles in `css/style.css`

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
