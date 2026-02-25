// FALLING DOTS ON SCROLL - Visible animation
console.log('🎨 FALLING DOTS ANIMATION LOADED');

(function() {
    'use strict';
    
    function initFallingDots() {
        console.log('🚀 Initializing falling dots on scroll...');
        
        // Create container for dots
        const container = document.createElement('div');
        container.id = 'falling-dots-container';
        container.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;overflow:hidden;';
        document.body.appendChild(container);
        
        console.log('✅ Falling dots container created');
        
        let dotId = 0;
        let lastScrollTime = 0;
        let isScrolling = false;
        
        // Create falling dot
        function createFallingDot() {
            const dot = document.createElement('div');
            dot.className = 'falling-dot';
            dot.id = 'dot-' + (dotId++);
            
            const size = Math.random() * 6 + 3;
            const startX = Math.random() * window.innerWidth;
            const duration = Math.random() * 2 + 2; // 2-4 seconds
            const delay = Math.random() * 0.3;
            
            // Random colors - gold, orange, yellow
            const colors = [
                'rgba(255, 215, 0, 1)',    // Gold
                'rgba(255, 165, 0, 1)',    // Orange
                'rgba(255, 255, 0, 1)',    // Yellow
                'rgba(255, 140, 0, 1)',    // Dark orange
                'rgba(255, 200, 50, 1)'    // Light gold
            ];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            dot.style.cssText = `
                position: absolute;
                left: ${startX}px;
                top: -20px;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                border-radius: 50%;
                pointer-events: none;
                box-shadow: 0 0 ${size * 3}px ${color}, 0 0 ${size * 6}px ${color.replace('1)', '0.5)')};
                animation: fallDown ${duration}s linear ${delay}s forwards;
                opacity: 0;
            `;
            
            container.appendChild(dot);
            
            // Remove after animation
            setTimeout(() => {
                if (dot.parentNode) {
                    dot.remove();
                }
            }, (duration + delay + 0.5) * 1000);
        }
        
        // Create multiple dots
        function createDotBurst(count) {
            for (let i = 0; i < count; i++) {
                setTimeout(() => createFallingDot(), i * 50);
            }
        }
        
        // Scroll handler
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            const now = Date.now();
            
            if (!isScrolling) {
                isScrolling = true;
                console.log('📜 Scrolling detected - creating falling dots!');
            }
            
            // Create dots while scrolling
            if (now - lastScrollTime > 100) {
                createDotBurst(5);
                lastScrollTime = now;
            }
            
            // Reset scrolling flag
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                isScrolling = false;
                console.log('📜 Scrolling stopped');
            }, 150);
        });
        
        // Mouse move - create dots on cursor movement
        let lastMouseTime = 0;
        document.addEventListener('mousemove', function(e) {
            const now = Date.now();
            if (now - lastMouseTime > 100) {
                const dot = document.createElement('div');
                dot.className = 'cursor-dot';
                
                const size = Math.random() * 5 + 3;
                
                dot.style.cssText = `
                    position: fixed;
                    left: ${e.clientX}px;
                    top: ${e.clientY}px;
                    width: ${size}px;
                    height: ${size}px;
                    background: radial-gradient(circle, rgba(255,215,0,1) 0%, rgba(255,215,0,0) 70%);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    animation: cursorDotFade 0.8s ease-out forwards;
                    box-shadow: 0 0 ${size * 4}px rgba(255,215,0,0.8);
                `;
                
                container.appendChild(dot);
                
                setTimeout(() => {
                    if (dot.parentNode) {
                        dot.remove();
                    }
                }, 800);
                
                lastMouseTime = now;
            }
        });
        
        // Click burst
        document.addEventListener('click', function(e) {
            console.log('💥 CLICK - Creating dot burst!');
            for (let i = 0; i < 15; i++) {
                const angle = (Math.PI * 2 * i) / 15;
                const dist = 30 + Math.random() * 40;
                
                const dot = document.createElement('div');
                const size = Math.random() * 6 + 4;
                
                dot.style.cssText = `
                    position: fixed;
                    left: ${e.clientX}px;
                    top: ${e.clientY}px;
                    width: ${size}px;
                    height: ${size}px;
                    background: rgba(255, 215, 0, 1);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    box-shadow: 0 0 ${size * 3}px rgba(255,215,0,0.8);
                    animation: burstOut 0.6s ease-out forwards;
                    --tx: ${Math.cos(angle) * dist}px;
                    --ty: ${Math.sin(angle) * dist}px;
                `;
                
                container.appendChild(dot);
                
                setTimeout(() => {
                    if (dot.parentNode) {
                        dot.remove();
                    }
                }, 600);
            }
        });
        
        // Create initial dots on load
        setTimeout(() => {
            createDotBurst(10);
            console.log('✨ Initial dots created!');
        }, 500);
        
        console.log('✨ FALLING DOTS FULLY ACTIVE!');
    }
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fallDown {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(${window.innerHeight + 50}px) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes cursorDotFade {
            0% {
                transform: scale(1) translateY(0);
                opacity: 1;
            }
            100% {
                transform: scale(0.2) translateY(20px);
                opacity: 0;
            }
        }
        
        @keyframes burstOut {
            0% {
                transform: translate(0, 0) scale(1);
                opacity: 1;
            }
            100% {
                transform: translate(var(--tx), var(--ty)) scale(0.3);
                opacity: 0;
            }
        }
        
        .falling-dot, .cursor-dot {
            will-change: transform, opacity;
        }
    `;
    document.head.appendChild(style);
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFallingDots);
    } else {
        initFallingDots();
    }
})();
