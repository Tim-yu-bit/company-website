// 移动端菜单切换
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    // 动画效果
    const spans = menuToggle.querySelectorAll('span');
    spans[0].style.transform = navMenu.classList.contains('active')
        ? 'rotate(45deg) translate(5px, 5px)'
        : 'none';
    spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navMenu.classList.contains('active')
        ? 'rotate(-45deg) translate(7px, -6px)'
        : 'none';
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            // 关闭移动端菜单
            navMenu.classList.remove('active');

            // 滚动到目标位置
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 滚动时导航栏效果
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.background = '#1a252f';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
    } else {
        navbar.style.background = '#2c3e50';
        navbar.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    }

    lastScroll = currentScroll;
});

// 表单提交处理
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // 获取表单数据
    const formData = new FormData(contactForm);
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const message = contactForm.querySelector('textarea').value;

    // 验证表单
    if (!name || !email || !message) {
        alert('请填写所有字段');
        return;
    }

    // 这里可以添加实际的表单提交逻辑
    // 比如使用 fetch API 发送到服务器

    // 显示成功消息
    alert('感谢您的留言！我们会尽快与您联系。');

    // 重置表单
    contactForm.reset();
});

// 数字动画效果
const animateNumbers = () => {
    const stats = document.querySelectorAll('.stat-item h3');

    stats.forEach(stat => {
        const text = stat.textContent;
        const hasPlus = text.includes('+');
        const hasPercent = text.includes('%');
        const target = parseInt(text);

        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }

            let displayText = Math.floor(current).toString();
            if (hasPlus) displayText += '+';
            if (hasPercent) displayText += '%';

            stat.textContent = displayText;
        }, 30);
    });
};

// 观察者模式 - 当元素进入视口时触发动画
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';

            // 如果是统计数据区域，触发数字动画
            if (entry.target.classList.contains('about-stats')) {
                animateNumbers();
                observer.unobserve(entry.target);
            }
        }
    });
}, {
    threshold: 0.2
});

// 为需要动画的元素添加观察
document.querySelectorAll('.service-card, .about-stats, .stat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// 页面加载完成后的初始化
window.addEventListener('load', () => {
    // 添加页面加载动画
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s';
        document.body.style.opacity = '1';
    }, 100);
});

console.log('网站已加载完成！');
