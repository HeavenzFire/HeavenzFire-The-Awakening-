import React, { useEffect, useRef } from 'react';

const Particles: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            particles.length = 0;
            init();
        });

        const particles: Particle[] = [];
        const particleCount = 50;
        const repelDistance = 50;
        const attractDistance = 150;
        const repelStrength = 0.4;
        const attractStrength = 0.005;
        const maxVelocity = 0.5;

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            radius: number;
            baseRadius: number;
            pulseSpeed: number;
            pulseOffset: number;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = Math.random() * 0.4 - 0.2;
                this.vy = Math.random() * 0.4 - 0.2;
                this.baseRadius = Math.random() * 1.5 + 0.5;
                this.radius = this.baseRadius;
                this.pulseSpeed = 0.002 + Math.random() * 0.002;
                this.pulseOffset = Math.random() * Math.PI * 2;
            }

            update() {
                // Limit velocity
                const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
                if (speed > maxVelocity) {
                    this.vx = (this.vx / speed) * maxVelocity;
                    this.vy = (this.vy / speed) * maxVelocity;
                }

                this.x += this.vx;
                this.y += this.vy;

                // Wall collision
                if (this.x - this.radius < 0 || this.x + this.radius > width) this.vx *= -1;
                if (this.y - this.radius < 0 || this.y + this.radius > height) this.vy *= -1;
                
                // Pulsing effect
                this.radius = this.baseRadius + Math.sin(Date.now() * this.pulseSpeed + this.pulseOffset) * 0.5;
                if (this.radius < 0.5) this.radius = 0.5;
            }

            draw() {
                ctx!.beginPath();
                ctx!.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx!.fillStyle = 'rgba(100, 255, 218, 0.5)';
                ctx!.fill();
            }
        }

        function init() {
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }
        init();

        function handleInteractions() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const p1 = particles[i];
                    const p2 = particles[j];
                    const dx = p2.x - p1.x;
                    const dy = p2.y - p1.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    // Draw connecting lines
                    if (distance < attractDistance) {
                        ctx!.strokeStyle = `rgba(100, 255, 218, ${1 - distance / attractDistance})`;
                        ctx!.lineWidth = 0.2;
                        ctx!.beginPath();
                        ctx!.moveTo(p1.x, p1.y);
                        ctx!.lineTo(p2.x, p2.y);
                        ctx!.stroke();
                    }

                    // Apply forces
                    if (distance > 0 && distance < repelDistance) {
                        // Repel
                        const force = (repelDistance - distance) / repelDistance * repelStrength;
                        const ax = (dx / distance) * force;
                        const ay = (dy / distance) * force;
                        p1.vx -= ax;
                        p1.vy -= ay;
                        p2.vx += ax;
                        p2.vy += ay;
                    } else if (distance > repelDistance && distance < attractDistance) {
                        // Attract
                        const force = attractStrength;
                        const ax = (dx / distance) * force;
                        const ay = (dy / distance) * force;
                        p1.vx += ax;
                        p1.vy += ay;
                        p2.vx -= ax;
                        p2.vy -= ay;
                    }
                }
            }
        }

        let animationFrameId: number;
        function animate() {
            ctx!.clearRect(0, 0, width, height);
            handleInteractions();
            for (const particle of particles) {
                particle.update();
                particle.draw();
            }
            animationFrameId = requestAnimationFrame(animate);
        }
        animate();
        
        return () => {
          cancelAnimationFrame(animationFrameId);
          window.removeEventListener('resize', () => {});
        }

    }, []);

    return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: -1, opacity: 0.3 }} />;
};

export default Particles;
