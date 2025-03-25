const possum2d = () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  document.body.appendChild(canvas);

  let fullscreen = false;
  let backgroundColor = "white"; // Default background color
  let keyboardState = {}; // Keyboard state tracking
  let lastTime = 0; // To calculate delta time (dt)

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
          updateCanvasSize();
          window.addEventListener("resize", updateCanvasSize);
      }
  };

  const setTitle = (_title) => {
      document.title = _title;
  };

  const setBackgroundColor = (_color) => {
      backgroundColor = _color;
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

  const move = (sprite, dx, dy, dt) => {
      // Update sprite's position based on dx, dy, and delta time (dt)
      sprite.x += dx * sprite.speed * dt;
      sprite.y += dy * sprite.speed * dt;
  };

  const moveg = (sprite, dx, dy) => {
      // For general movement (non-delta-time-based)
      sprite.x += dx * sprite.speed;
      sprite.y += dy * sprite.speed;
  };

  const run = (timestamp) => {
      const dt = (timestamp - lastTime) / 1000;  // Calculate delta time in seconds
      lastTime = timestamp;

      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (typeof draw === 'function') {
          draw(dt); // Pass dt to the draw function
      }

      requestAnimationFrame(run);
  };

  // Key state tracking for WASD/Arrow keys
  window.addEventListener('keydown', (event) => {
      keyboardState[event.key] = true;
  });

  window.addEventListener('keyup', (event) => {
      keyboardState[event.key] = false;
  });

  return {
      createCanvas,
      setTitle,
      render,
      touching,
      move,
      moveg,
      setBackgroundColor,
      run
  };
};