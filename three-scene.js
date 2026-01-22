// Three.js 3D Coding Background Scene
class HeroScene {
    constructor() {
        this.container = document.getElementById('hero-canvas');
        if (!this.container) return;

        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.codeLines = [];
        this.particles = null;
        this.mouse = { x: 0, y: 0 };
        this.targetRotation = { x: 0, y: 0 };
        this.currentRotation = { x: 0, y: 0 };

        // Performance optimization: detect mobile
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;

        // Code snippets for different programming languages
        this.codeSnippets = [
            // JavaScript
            'const app = express();',
            'async function getData() {',
            'return response.json();',
            'useState(initialValue)',
            'useEffect(() => {',
            'map(item => item.id)',
            'filter(x => x > 0)',
            'await fetch(url)',
            'export default App;',

            // React
            '<Component prop={value} />',
            'return <div>{data}</div>',
            'props.children',
            'dispatch(action)',

            // Python
            'def calculate(x, y):',
            'return sum(numbers)',
            'import numpy as np',
            'class Model:',
            'for i in range(10):',

            // Node.js
            'app.listen(3000)',
            'router.get(\'/api\')',
            'mongoose.connect()',
            'res.json(data)',

            // Flutter/Dart
            'Widget build(context)',
            'setState(() {})',
            'Navigator.push(',
            'ListView.builder(',

            // Database
            'SELECT * FROM users',
            'db.collection.find()',
            'WHERE id = ?',
            'JOIN orders ON',

            // CSS
            'display: flex;',
            'position: absolute;',
            'transform: scale(1.2);',
            'background: linear-gradient',

            // General
            'try { } catch(e) { }',
            'if (condition) {',
            'else if (value) {',
            'switch (type) {',
            'while (true) {',
            'break; continue;',
            'console.log(data)',
            'throw new Error()',
        ];

        this.init();
        this.createLights();
        this.createCodeLines();
        this.createParticles();
        this.addEventListeners();
        this.animate();
    }

    init() {
        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.Fog(0x0f172a, 10, 60);

        // Camera setup
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = 30;

        // Renderer setup
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.container,
            alpha: true,
            antialias: !this.isMobile // Disable antialiasing on mobile for performance
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setClearColor(0x000000, 0);
    }

    createLights() {
        // Ambient light (increased for better visibility of colorful code)
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        // Colorful directional lights for vibrant code highlighting
        const directionalLight1 = new THREE.DirectionalLight(0x00ff88, 1.2); // Green
        directionalLight1.position.set(5, 5, 5);
        this.scene.add(directionalLight1);

        const directionalLight2 = new THREE.DirectionalLight(0xff0080, 0.8); // Hot pink
        directionalLight2.position.set(-5, -5, -5);
        this.scene.add(directionalLight2);

        const directionalLight3 = new THREE.DirectionalLight(0x00d4ff, 0.6); // Cyan
        directionalLight3.position.set(0, -5, 5);
        this.scene.add(directionalLight3);

        // Animated point lights for dynamic colorful glow
        this.pointLight1 = new THREE.PointLight(0xff0080, 2, 50); // Hot pink
        this.pointLight1.position.set(0, 0, 15);
        this.scene.add(this.pointLight1);

        this.pointLight2 = new THREE.PointLight(0x00ff88, 1.5, 40); // Green
        this.pointLight2.position.set(10, 10, 10);
        this.scene.add(this.pointLight2);

        this.pointLight3 = new THREE.PointLight(0xffaa00, 1.5, 40); // Orange
        this.pointLight3.position.set(-10, -10, 10);
        this.scene.add(this.pointLight3);
    }

    createCodeTexture(text, color = '#667eea') {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        // Set canvas size
        const fontSize = this.isMobile ? 16 : 24;
        canvas.width = 512;
        canvas.height = 64;

        // Clear canvas
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Set text style
        context.font = `${fontSize}px "Courier New", monospace`;
        context.fillStyle = color;
        context.textAlign = 'left';
        context.textBaseline = 'middle';

        // Add subtle glow effect
        context.shadowColor = color;
        context.shadowBlur = 10;

        // Draw text
        context.fillText(text, 10, canvas.height / 2);

        return new THREE.CanvasTexture(canvas);
    }

    createCodeLines() {
        const lineCount = this.isMobile ? 20 : 40;
        // Vibrant syntax highlighting colors
        const colors = [
            '#00ff88', // Bright green (functions/methods)
            '#ff0080', // Hot pink (keywords)
            '#00d4ff', // Cyan (strings)
            '#ffaa00', // Orange (numbers/constants)
            '#a855f7', // Purple (variables)
            '#ff4444', // Red (errors/important)
            '#44ff44', // Lime green (success/comments)
            '#ffff00', // Yellow (warnings)
            '#ff66ff', // Magenta (classes)
            '#00ffff', // Aqua (parameters)
            '#ff9900', // Bright orange (operators)
            '#66ff66'  // Light green (types)
        ];

        for (let i = 0; i < lineCount; i++) {
            // Random code snippet
            const code = this.codeSnippets[Math.floor(Math.random() * this.codeSnippets.length)];
            const color = colors[Math.floor(Math.random() * colors.length)];

            // Create texture
            const texture = this.createCodeTexture(code, color);

            // Create sprite material
            const material = new THREE.SpriteMaterial({
                map: texture,
                transparent: true,
                opacity: 0.7,
                blending: THREE.AdditiveBlending
            });

            // Create sprite
            const sprite = new THREE.Sprite(material);

            // Random position
            sprite.position.x = (Math.random() - 0.5) * 60;
            sprite.position.y = (Math.random() - 0.5) * 60;
            sprite.position.z = (Math.random() - 0.5) * 50 - 10;

            // Random scale
            const scale = (Math.random() * 0.5 + 0.5) * (this.isMobile ? 2 : 3);
            sprite.scale.set(scale * 4, scale, 1);

            // Store animation properties
            sprite.userData = {
                speedY: -(Math.random() * 0.3 + 0.1), // Falling speed
                speedX: (Math.random() - 0.5) * 0.05, // Drift speed
                initialX: sprite.position.x,
                initialY: sprite.position.y,
                rotationSpeed: (Math.random() - 0.5) * 0.01,
                pulseSpeed: Math.random() * 2 + 1,
                pulseOffset: Math.random() * Math.PI * 2,
                resetTimer: Math.random() * 100
            };

            this.codeLines.push(sprite);
            this.scene.add(sprite);
        }

        // Add some larger, slower-moving code blocks
        const blockCount = this.isMobile ? 5 : 10;
        for (let i = 0; i < blockCount; i++) {
            const code = this.codeSnippets[Math.floor(Math.random() * this.codeSnippets.length)];
            const color = colors[Math.floor(Math.random() * colors.length)];

            const texture = this.createCodeTexture(code, color);
            const material = new THREE.SpriteMaterial({
                map: texture,
                transparent: true,
                opacity: 0.4,
                blending: THREE.AdditiveBlending
            });

            const sprite = new THREE.Sprite(material);

            sprite.position.x = (Math.random() - 0.5) * 80;
            sprite.position.y = (Math.random() - 0.5) * 80;
            sprite.position.z = (Math.random() - 0.5) * 60 - 20;

            const scale = (Math.random() * 1 + 1) * (this.isMobile ? 2.5 : 4);
            sprite.scale.set(scale * 4, scale, 1);

            sprite.userData = {
                speedY: -(Math.random() * 0.15 + 0.05),
                speedX: (Math.random() - 0.5) * 0.03,
                initialX: sprite.position.x,
                initialY: sprite.position.y,
                rotationSpeed: (Math.random() - 0.5) * 0.005,
                pulseSpeed: Math.random() * 1.5 + 0.5,
                pulseOffset: Math.random() * Math.PI * 2,
                resetTimer: Math.random() * 100
            };

            this.codeLines.push(sprite);
            this.scene.add(sprite);
        }
    }

    createParticles() {
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = this.isMobile ? 200 : 500;
        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 100;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.2,
            color: 0x00ffff, // Bright cyan for visibility
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });

        this.particles = new THREE.Points(particlesGeometry, particlesMaterial);
        this.scene.add(this.particles);
    }

    addEventListeners() {
        // Mouse move - subtle camera movement
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

            this.targetRotation.y = this.mouse.x * 0.2;
            this.targetRotation.x = this.mouse.y * 0.2;
        });

        // Window resize
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // Scroll effect
        window.addEventListener('scroll', () => {
            const scrollPercent = window.pageYOffset / window.innerHeight;
            if (scrollPercent < 1) {
                this.camera.position.z = 30 + scrollPercent * 5;
            }
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        const time = Date.now() * 0.001;

        // Smooth camera rotation based on mouse
        this.currentRotation.x += (this.targetRotation.x - this.currentRotation.x) * 0.05;
        this.currentRotation.y += (this.targetRotation.y - this.currentRotation.y) * 0.05;

        this.camera.rotation.x = this.currentRotation.x;
        this.camera.rotation.y = this.currentRotation.y;

        // Animate code lines (matrix-style falling effect)
        this.codeLines.forEach((sprite) => {
            // Move down (falling effect)
            sprite.position.y += sprite.userData.speedY;

            // Slight horizontal drift
            sprite.position.x += sprite.userData.speedX;

            // Subtle rotation
            sprite.material.rotation += sprite.userData.rotationSpeed;

            // Pulse opacity
            const pulse = Math.sin(time * sprite.userData.pulseSpeed + sprite.userData.pulseOffset);
            sprite.material.opacity = 0.3 + pulse * 0.2;

            // Reset position when out of view
            if (sprite.position.y < -40) {
                sprite.position.y = 40;
                sprite.position.x = (Math.random() - 0.5) * 60;
                // Change code snippet
                const newCode = this.codeSnippets[Math.floor(Math.random() * this.codeSnippets.length)];
                const colors = ['#00ff88', '#ff0080', '#00d4ff', '#ffaa00', '#a855f7', '#ff4444', '#44ff44', '#ffff00', '#ff66ff', '#00ffff', '#ff9900', '#66ff66'];
                const newColor = colors[Math.floor(Math.random() * colors.length)];
                sprite.material.map = this.createCodeTexture(newCode, newColor);
                sprite.material.needsUpdate = true;
            }

            // Keep within horizontal bounds
            if (Math.abs(sprite.position.x) > 40) {
                sprite.userData.speedX *= -0.5;
            }
        });

        // Animate particles (slow rotation)
        if (this.particles) {
            this.particles.rotation.y += 0.0003;
            this.particles.rotation.x = Math.sin(time * 0.2) * 0.1;
        }

        // Animate colorful point lights for dynamic effect
        if (this.pointLight1) {
            this.pointLight1.position.x = Math.sin(time * 0.4) * 20;
            this.pointLight1.position.y = Math.cos(time * 0.25) * 20;
            this.pointLight1.position.z = Math.sin(time * 0.6) * 10 + 15;
        }

        if (this.pointLight2) {
            this.pointLight2.position.x = Math.cos(time * 0.3) * 25;
            this.pointLight2.position.y = Math.sin(time * 0.5) * 15;
            this.pointLight2.position.z = Math.cos(time * 0.4) * 10 + 10;
        }

        if (this.pointLight3) {
            this.pointLight3.position.x = Math.sin(time * 0.35) * -20;
            this.pointLight3.position.y = Math.cos(time * 0.45) * -15;
            this.pointLight3.position.z = Math.sin(time * 0.55) * 10 + 12;
        }

        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize scene when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new HeroScene();
    });
} else {
    new HeroScene();
}
