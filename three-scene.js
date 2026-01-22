// Three.js 3D Scene for Hero Section
class HeroScene {
    constructor() {
        this.container = document.getElementById('hero-canvas');
        if (!this.container) return;

        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.geometries = [];
        this.particles = null;
        this.mouse = { x: 0, y: 0 };
        this.targetRotation = { x: 0, y: 0 };
        this.currentRotation = { x: 0, y: 0 };

        // Performance optimization: detect mobile
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;

        this.init();
        this.createLights();
        this.createGeometries();
        this.createParticles();
        this.addEventListeners();
        this.animate();
    }

    init() {
        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.Fog(0x0f172a, 1, 50);

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
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setClearColor(0x000000, 0);
    }

    createLights() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        // Directional light 1 (purple)
        const directionalLight1 = new THREE.DirectionalLight(0x667eea, 1);
        directionalLight1.position.set(5, 5, 5);
        this.scene.add(directionalLight1);

        // Directional light 2 (pink)
        const directionalLight2 = new THREE.DirectionalLight(0x764ba2, 0.8);
        directionalLight2.position.set(-5, -5, -5);
        this.scene.add(directionalLight2);

        // Point light (moving)
        this.pointLight = new THREE.PointLight(0x8b5cf6, 2, 50);
        this.pointLight.position.set(0, 0, 10);
        this.scene.add(this.pointLight);
    }

    createGeometries() {
        const geometryTypes = [
            new THREE.BoxGeometry(2, 2, 2),
            new THREE.SphereGeometry(1.5, 32, 32),
            new THREE.TorusGeometry(1.2, 0.4, 16, 100),
            new THREE.OctahedronGeometry(1.5),
            new THREE.TetrahedronGeometry(1.5),
            new THREE.IcosahedronGeometry(1.5)
        ];

        const materials = [
            new THREE.MeshPhongMaterial({
                color: 0x667eea,
                shininess: 100,
                transparent: true,
                opacity: 0.8,
                wireframe: false
            }),
            new THREE.MeshPhongMaterial({
                color: 0x764ba2,
                shininess: 100,
                transparent: true,
                opacity: 0.8,
                wireframe: false
            }),
            new THREE.MeshPhongMaterial({
                color: 0x8b5cf6,
                shininess: 100,
                transparent: true,
                opacity: 0.8,
                wireframe: false
            }),
            new THREE.MeshStandardMaterial({
                color: 0x6366f1,
                metalness: 0.7,
                roughness: 0.2,
                transparent: true,
                opacity: 0.9
            })
        ];

        // Create multiple 3D objects (fewer on mobile for performance)
        const objectCount = this.isMobile ? 8 : 15;
        for (let i = 0; i < objectCount; i++) {
            const geometry = geometryTypes[Math.floor(Math.random() * geometryTypes.length)];
            const material = materials[Math.floor(Math.random() * materials.length)].clone();
            const mesh = new THREE.Mesh(geometry, material);

            // Random position
            mesh.position.x = (Math.random() - 0.5) * 50;
            mesh.position.y = (Math.random() - 0.5) * 50;
            mesh.position.z = (Math.random() - 0.5) * 40 - 10;

            // Random rotation
            mesh.rotation.x = Math.random() * Math.PI;
            mesh.rotation.y = Math.random() * Math.PI;

            // Random scale
            const scale = Math.random() * 0.5 + 0.5;
            mesh.scale.set(scale, scale, scale);

            // Store animation properties
            mesh.userData = {
                rotationSpeed: {
                    x: (Math.random() - 0.5) * 0.02,
                    y: (Math.random() - 0.5) * 0.02,
                    z: (Math.random() - 0.5) * 0.02
                },
                floatSpeed: Math.random() * 0.5 + 0.5,
                floatOffset: Math.random() * Math.PI * 2,
                initialY: mesh.position.y
            };

            this.geometries.push(mesh);
            this.scene.add(mesh);
        }

        // Add wireframe versions for some objects (fewer on mobile)
        const wireframeCount = this.isMobile ? 2 : 5;
        for (let i = 0; i < wireframeCount; i++) {
            const geometry = geometryTypes[Math.floor(Math.random() * geometryTypes.length)];
            const material = new THREE.MeshBasicMaterial({
                color: 0x667eea,
                wireframe: true,
                transparent: true,
                opacity: 0.3
            });
            const mesh = new THREE.Mesh(geometry, material);

            mesh.position.x = (Math.random() - 0.5) * 50;
            mesh.position.y = (Math.random() - 0.5) * 50;
            mesh.position.z = (Math.random() - 0.5) * 40 - 10;

            mesh.userData = {
                rotationSpeed: {
                    x: (Math.random() - 0.5) * 0.01,
                    y: (Math.random() - 0.5) * 0.01,
                    z: (Math.random() - 0.5) * 0.01
                }
            };

            this.geometries.push(mesh);
            this.scene.add(mesh);
        }
    }

    createParticles() {
        const particlesGeometry = new THREE.BufferGeometry();
        // Reduce particles on mobile for better performance
        const particlesCount = this.isMobile ? 300 : 1000;
        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 100;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.1,
            color: 0x667eea,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });

        this.particles = new THREE.Points(particlesGeometry, particlesMaterial);
        this.scene.add(this.particles);
    }

    addEventListeners() {
        // Mouse move
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

            this.targetRotation.y = this.mouse.x * 0.3;
            this.targetRotation.x = this.mouse.y * 0.3;
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
                this.camera.position.z = 30 + scrollPercent * 10;
                this.scene.rotation.z = scrollPercent * 0.5;
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

        // Animate geometries
        this.geometries.forEach((mesh) => {
            // Rotation
            if (mesh.userData.rotationSpeed) {
                mesh.rotation.x += mesh.userData.rotationSpeed.x;
                mesh.rotation.y += mesh.userData.rotationSpeed.y;
                mesh.rotation.z += mesh.userData.rotationSpeed.z;
            }

            // Float animation
            if (mesh.userData.floatSpeed) {
                mesh.position.y = mesh.userData.initialY +
                    Math.sin(time * mesh.userData.floatSpeed + mesh.userData.floatOffset) * 2;
            }

            // Pulse effect
            const pulse = Math.sin(time * 2 + mesh.position.x) * 0.1 + 1;
            if (mesh.material.opacity !== undefined) {
                mesh.material.opacity = 0.5 + pulse * 0.3;
            }
        });

        // Animate particles
        if (this.particles) {
            this.particles.rotation.y += 0.0005;
            this.particles.rotation.x = Math.sin(time * 0.3) * 0.1;
        }

        // Animate point light
        if (this.pointLight) {
            this.pointLight.position.x = Math.sin(time * 0.5) * 15;
            this.pointLight.position.y = Math.cos(time * 0.3) * 15;
            this.pointLight.position.z = Math.sin(time * 0.7) * 10 + 10;
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
