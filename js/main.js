// 初始化AOS动画库
AOS.init({
    duration: 1000,
    once: true
});

// 复制服务器IP功能
function copyIP() {
    navigator.clipboard.writeText("mc.pzm.com");
    alert("服务器IP已复制到剪贴板！");
}

// 初始化粒子效果
particlesJS('particles-js', {
    particles: {
        number: { value: 80 },
        color: { value: '#ffffff' },
        shape: { type: 'circle' },
        opacity: { value: 0.5 },
        size: { value: 3 },
        move: {
            enable: true,
            speed: 2
        }
    }
}); 