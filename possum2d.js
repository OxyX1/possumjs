/* 

possum 2d is a GUI-based plugin that is like p5.js but easier to use.
Things like sprites, which is an easier way to write functions, for example:

if (sprite1 == touching(sprite2)) {
    continue;
}

*/

const possum2d = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    document.body.appendChild(canvas);  // Ensure the canvas is appended to the DOM
  
    let backgroundColor = 'white'; // Default background color
  
    const createCanvas = (width, height, fullscreen = false) => {
      if (!fullscreen) {
        canvas.width = width;
        canvas.height = height;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
  
    const setTitle = (_title) => {
      document.title = _title;
    };
  
    // Function to render a sprite
    const render = (sprite) => {
      ctx.fillStyle = sprite.color || 'red'; // Default color is red
      ctx.fillRect(sprite.x, sprite.y, sprite.width, sprite.height);
    };
  
    const touching = (sprite1, sprite2) => {
      // Simple collision detection between two sprites
      if (
        sprite1.x < sprite2.x + sprite2.width &&
        sprite1.x + sprite1.width > sprite2.x &&
        sprite1.y < sprite2.y + sprite2.height &&
        sprite1.y + sprite1.height > sprite2.y
      ) {
        return true;
      }
      return false;
    };
  
    // Function to set the background color
    const setBackgroundColor = (color) => {
      backgroundColor = color; // Set the background color
    };
  
    // Run the setup once and then enter the draw loop
    let setupDone = false;
  
    const run = () => {
      if (!setupDone && typeof setup === 'function') {
        setup(); // Call setup() once
        setupDone = true;
      }
  
      // Clear the canvas with the background color (this needs to be before rendering)
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height); // Clear the canvas with the background color
  
      if (typeof draw === 'function') {
        draw(); // Continuously call draw() (or render in this case)
      }
  
      requestAnimationFrame(run); // Keep looping draw
    };
  
    return {
      createCanvas,
      setTitle,
      render,
      touching,
      setBackgroundColor, // Added setBackgroundColor function
      run, // Added to start the loop
    };
  };
  
  // Usage Example
  
  /*
  const game = possum2d();
  
  function setup() {
    game.setTitle("Possum 2D Game");
    game.createCanvas(800, 600);
    game.setBackgroundColor('lightblue'); // Set background color
  }
  
  const sprite1 = { x: 50, y: 50, width: 50, height: 50, color: 'blue' };
  const sprite2 = { x: 100, y: 100, width: 50, height: 50, color: 'green' };
  
  function draw() {
    game.render(sprite1);
    game.render(sprite2);
  }
  
  game.run();
  */
  
  