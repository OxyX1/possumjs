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