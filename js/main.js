// 初始化AOS动画库
AOS.init({
    duration: 1000,
    once: true
});

// 复制服务器IP功能
function copyIP() {
    navigator.clipboard.writeText("www.madouchuanmei.com");
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

// 添加服务器状态检查功能
async function updateServerStatus() {
    try {
        // 使用Minecraft Server Status API
        const response = await fetch('https://api.mcsrvstat.us/2/www.madouchuanmei.com');
        const data = await response.json();
        
        // 更新在线玩家数
        const onlinePlayers = document.getElementById('online-players');
        if (data.online) {
            onlinePlayers.textContent = data.players.online;
        } else {
            onlinePlayers.textContent = '离线';
        }

        // 如果服务器提供了这些信息，更新其他统计数据
        if (data.stats) {
            // 更新运行时间
            if (data.stats.uptime) {
                document.getElementById('uptime').textContent = 
                    Math.floor(data.stats.uptime / (24 * 60 * 60)) + '天';
            }
            
            // 更新总注册人数
            if (data.stats.totalPlayers) {
                document.getElementById('total-players').textContent = 
                    data.stats.totalPlayers + '+';
            }
        }
    } catch (error) {
        console.error('无法获取服务器状态:', error);
    }
}

// 页面加载时获取一次数据
updateServerStatus();

// 每60秒更新一次数据
setInterval(updateServerStatus, 60000);

// 添加导航栏动画延迟
document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-content li');
    navItems.forEach((item, index) => {
        item.style.setProperty('--i', index + 1);
    });
});

// 修改悬浮球功能
document.addEventListener('DOMContentLoaded', function() {
    const floatingBall = document.getElementById('floatingBall');
    const dialogBox = document.getElementById('dialogBox');
    let isDragging = false;
    let currentX, currentY, initialX, initialY;
    let xOffset = 0;
    let yOffset = 0;
    let clickCount = 0;
    let clickStartTime;

    // 对话内容保持不变
    const dialogContents = [
        {
            question: "Q：这个服的服主是不是善良的彦祖？",
            answer: "A：是的。"
        },
        {
            question: "Q：服务器永不跑路吗？",
            answer: "A：你见过自己没钱吃饭的人会借钱给别人花吗？"
        },
        {
            question: "Q：我在服务器里可不可以偷偷作弊？",
            answer: "A：666这个入开桂了。"
        },
        {
            question: "Q：我想给你米用来赞助服务器怎么办？",
            answer: "A：下面有赞助二维码，谢谢您的支持。"
        },
        {
            question: "Q：服务器会越做越大吗？",
            answer: "A：是的，就跟我的黑龙棍一样。"
        }
    ];

    // 拖动功能
    function dragStart(e) {
        if (e.type === "mousedown") {
            clickStartTime = Date.now();
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
        } else {
            initialX = e.touches[0].clientX - xOffset;
            initialY = e.touches[0].clientY - yOffset;
        }

        if (e.target === floatingBall) {
            isDragging = true;
        }
    }

    function dragEnd(e) {
        if (e.type === "mouseup" && Date.now() - clickStartTime < 200) {
            showDialog();
        }
        
        initialX = currentX;
        initialY = currentY;
        isDragging = false;
    }

    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            
            if (e.type === "mousemove") {
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
            } else {
                currentX = e.touches[0].clientX - initialX;
                currentY = e.touches[0].clientY - initialY;
            }

            xOffset = currentX;
            yOffset = currentY;
            
            setTranslate(currentX, currentY, floatingBall);
        }
    }

    function setTranslate(xPos, yPos, el) {
        el.style.transform = `translate(${xPos}px, ${yPos}px)`;
    }

    // 事件监听
    floatingBall.addEventListener("mousedown", dragStart);
    floatingBall.addEventListener("touchstart", dragStart, { passive: false });
    document.addEventListener("mousemove", drag);
    document.addEventListener("touchmove", drag, { passive: false });
    document.addEventListener("mouseup", dragEnd);
    document.addEventListener("touchend", dragEnd);

    // 显示对话框
    function showDialog() {
        const content = dialogContents[clickCount % 5];
        dialogBox.querySelector('.question').textContent = content.question;
        dialogBox.querySelector('.answer').textContent = content.answer;
        
        dialogBox.style.display = 'block';
        const ballRect = floatingBall.getBoundingClientRect();
        const dialogWidth = 320;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        if (ballRect.right + dialogWidth > windowWidth) {
            dialogBox.style.left = `${ballRect.left - dialogWidth - 20}px`;
        } else {
            dialogBox.style.left = `${ballRect.right + 20}px`;
        }

        if (ballRect.bottom > windowHeight - 200) {
            dialogBox.style.top = `${ballRect.top - 150}px`;
        } else {
            dialogBox.style.top = `${ballRect.top}px`;
        }
        
        clickCount++;
    }

    // 关闭对话框
    document.querySelector('.dialog-close').addEventListener('click', function() {
        dialogBox.style.display = 'none';
    });
});

// 添加倒计时功能
document.addEventListener('DOMContentLoaded', function() {
    // 设置目标日期（从现在开始10天）
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 10);
    
    function updateCountdown() {
        const now = new Date();
        const difference = targetDate - now;
        const days = Math.ceil(difference / (1000 * 60 * 60 * 24));
        
        const countdownElement = document.getElementById('countdown');
        if (countdownElement) {
            countdownElement.textContent = days;
            
            // 当剩余天数少于3天时添加紧急样式
            if (days <= 3) {
                countdownElement.style.color = '#ff4757';
                countdownElement.style.animation = 'pulse 1s infinite';
            }
        }
    }
    
    // 立即更新一次
    updateCountdown();
    
    // 每天更新一次
    setInterval(updateCountdown, 24 * 60 * 60 * 1000);
}); 