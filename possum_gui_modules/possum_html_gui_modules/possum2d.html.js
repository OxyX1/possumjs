class Possum2dCanvas extends HTMLElement {
    constructor() {
        super();
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.fullscreen = false;
        this.backgroundColor = 'white';
        this.lastTime = 0;
        this.keyboardState = {};
        this.resizeObserver = new ResizeObserver(() => this.updateCanvasSize());
        this.attachShadow({ mode: 'open' }).appendChild(this.canvas);
    }

    connectedCallback() {
        this.updateCanvasSize();
        this.setBackgroundColor(this.getAttribute('background-color') || 'white');
        if (this.hasAttribute('fullscreen')) {
            this.fullscreen = true;
            this.updateCanvasSize();
        }
        window.addEventListener('resize', () => this.updateCanvasSize());
        window.addEventListener('keydown', (event) => {
            this.keyboardState[event.key] = true;
        });
        window.addEventListener('keyup', (event) => {
            this.keyboardState[event.key] = false;
        });
        this.run();
    }

    updateCanvasSize() {
        if (this.fullscreen) {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        } else {
            this.canvas.width = this.getAttribute('width') || 800;
            this.canvas.height = this.getAttribute('height') || 600;
        }
    }

    setTitle(title) {
        document.title = title;
    }

    setBackgroundColor(color) {
        this.backgroundColor = color;
    }

    render(sprite) {
        this.ctx.fillStyle = sprite.color || 'red';
        this.ctx.fillRect(sprite.x, sprite.y, sprite.width, sprite.height);
    }

    move(sprite, dx, dy, dt) {
        sprite.x += dx * sprite.speed * dt;
        sprite.y += dy * sprite.speed * dt;
    }

    moveg(sprite, dx, dy) {
        sprite.x += dx * sprite.speed;
        sprite.y += dy * sprite.speed;
    }

    run() {
        const dt = (performance.now() - this.lastTime) / 1000;
        this.lastTime = performance.now();
        
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        const sprites = this.querySelectorAll('possum-sprite');
        sprites.forEach(spriteElement => {
            const sprite = {
                x: parseFloat(spriteElement.getAttribute('x')),
                y: parseFloat(spriteElement.getAttribute('y')),
                width: parseFloat(spriteElement.getAttribute('width')),
                height: parseFloat(spriteElement.getAttribute('height')),
                speed: parseFloat(spriteElement.getAttribute('speed') || 1),
                color: spriteElement.getAttribute('color')
            };
            this.render(sprite);
        });

        requestAnimationFrame(() => this.run());
    }
}

customElements.define('possum2d-canvas', Possum2dCanvas);

class PossumSprite extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.setAttribute('draggable', 'false');
    }
}

customElements.define('possum-sprite', PossumSprite);
