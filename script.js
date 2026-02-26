// 页面加载完成后执行
window.addEventListener('DOMContentLoaded', function() {
    // 显示加载动画
    const loading = document.createElement('div');
    loading.className = 'loading';
    document.body.appendChild(loading);

    // 页面加载完成后隐藏加载动画
    setTimeout(() => {
        loading.style.opacity = '0';
        setTimeout(() => {
            loading.remove();
        }, 500);
    }, 1000);

    // 导航栏滚动效果
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 22, 0.98)';
            navbar.style.boxShadow = '0 5px 20px rgba(0, 240, 255, 0.1)';
        } else {
            navbar.style.background = 'rgba(10, 10, 22, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 表单提交处理 - 使用mailto链接，无需JavaScript处理

    // 团队成员卡片悬停效果
    const memberCards = document.querySelectorAll('.member-card');
    memberCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotateY(5deg) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateY(0) scale(1)';
        });
    });

    // 技术栈图标悬停效果
    const techIcons = document.querySelectorAll('.tech-icon');
    techIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.1)';
            this.style.boxShadow = '0 15px 30px rgba(0, 240, 255, 0.4)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(0, 240, 255, 0.1)';
        });
    });

    // 按钮点击效果
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // 创建点击效果
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // 添加滚动动画
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.section-title, .about-text, .tech-stack, .team-member, .contact-info, .contact-form');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // 初始设置
    document.querySelectorAll('.section-title, .about-text, .tech-stack, .team-member, .contact-info, .contact-form').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // 滚动时执行动画
    window.addEventListener('scroll', animateOnScroll);
    
    // 初始执行一次
    animateOnScroll();

    // 添加代码动画效果
    const codeLines = document.querySelectorAll('.code-line');
    codeLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = '1';
            line.style.transform = 'translateY(0)';
        }, 200 * (index + 1));
    });
});

// 添加页面可见性变化时的处理
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        // 页面重新可见时，重新执行动画
        const elements = document.querySelectorAll('.section-title, .about-text, .tech-stack, .team-member, .contact-info, .contact-form');
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
        });
        
        setTimeout(() => {
            const animateOnScroll = function() {
                elements.forEach(element => {
                    const elementTop = element.getBoundingClientRect().top;
                    const elementVisible = 150;
                    
                    if (elementTop < window.innerHeight - elementVisible) {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }
                });
            };
            animateOnScroll();
        }, 100);
    }
});

// 添加键盘导航支持
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        // 为焦点元素添加样式
        document.addEventListener('focusin', function() {
            document.body.classList.add('keyboard-navigation');
        });
        
        document.addEventListener('mousedown', function() {
            document.body.classList.remove('keyboard-navigation');
        });
    }
});

// 添加响应式菜单（移动端）
const navLinks = document.querySelector('.nav-links');
const menuToggle = document.createElement('button');
menuToggle.className = 'menu-toggle';
menuToggle.innerHTML = '☰';
menuToggle.style.cssText = `
    display: none;
    background: transparent;
    border: none;
    color: var(--primary-color);
    font-size: 1.5rem;
    cursor: pointer;
    padding: 10px;
`;

// 将菜单按钮添加到导航栏
const navbarContainer = document.querySelector('.navbar .container');
navbarContainer.appendChild(menuToggle);

// 响应式菜单逻辑
const toggleMenu = function() {
    if (window.innerWidth <= 768) {
        menuToggle.style.display = 'block';
        navLinks.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: rgba(10, 10, 22, 0.98);
            flex-direction: column;
            align-items: center;
            padding: 20px 0;
            gap: 15px;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
        `;
    } else {
        menuToggle.style.display = 'none';
        navLinks.style.cssText = `
            display: flex;
            flex-direction: row;
            position: static;
            max-height: none;
            overflow: visible;
            box-shadow: none;
            padding: 0;
        `;
    }
};

// 初始执行
 toggleMenu();

// 窗口大小变化时执行
window.addEventListener('resize', toggleMenu);

// 菜单按钮点击事件
menuToggle.addEventListener('click', function() {
    if (navLinks.style.maxHeight === '0px' || !navLinks.style.maxHeight) {
        navLinks.style.maxHeight = navLinks.scrollHeight + 'px';
    } else {
        navLinks.style.maxHeight = '0px';
    }
});

// 添加涟漪效果样式
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .keyboard-navigation :focus {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
    }
`;
document.head.appendChild(style);