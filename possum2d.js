const possum2d = () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  document.body.appendChild(canvas);

  let fullscreen = false;

  const updateCanvasSize = () => {
      if (fullscreen) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
      }
  };

  const createCanvas = (width, height, full = false) => {
      fullscreen = full;
      if (!fullscreen) {
          canvas.width = width;
          canvas.height = height;
      } else {
          updateCanvasSize(); // Ensure it's updated immediately
          window.addEventListener("resize", updateCanvasSize); // Listen for window resizes
      }
  };

  const setTitle = (_title) => {
      document.title = _title;
  };

  const setBackgroundColor = (_color) => {
      ctx.fillStyle = _color;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const render = (sprite) => {
      ctx.fillStyle = sprite.color || 'red';
      ctx.fillRect(sprite.x, sprite.y, sprite.width, sprite.height);
  };

  const touching = (sprite1, sprite2) => {
      return (
          sprite1.x < sprite2.x + sprite2.width &&
          sprite1.x + sprite1.width > sprite2.x &&
          sprite1.y < sprite2.y + sprite2.height &&
          sprite1.y + sprite1.height > sprite2.y
      );
  };

  let setupDone = false;

  const run = () => {
      if (!setupDone && typeof setup === 'function') {
          setup();
          setupDone = true;
      }

      if (typeof draw === 'function') {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          draw();
      }

      requestAnimationFrame(run);
  };

  return {
      createCanvas,
      setTitle,
      render,
      touching,
      run,
      setBackgroundColor
  };
};

// Example Usage
const game = possum2d();

function setup() {
  game.setTitle("Possum 2D Game");
  game.createCanvas(800, 600, true); // Fullscreen mode
  game.setBackgroundColor("blue");
}

const sprite1 = { x: 50, y: 50, width: 50, height: 50, color: 'blue' };
const sprite2 = { x: 100, y: 100, width: 50, height: 50, color: 'green' };

function draw() {
  game.render(sprite1);
  game.render(sprite2);
}

game.run();
