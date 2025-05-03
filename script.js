// active hamburger menu 
let menuIcon = document.querySelector(".menu-icon");
let navlist = document.querySelector(".navlist")
menuIcon.addEventListener("click",()=>{
    menuIcon.classList.toggle("active");
    navlist.classList.toggle("active");
    document.body.classList.toggle("open");
});

// remove navlist
navlist.addEventListener("click",()=>{
    navlist.classList.remove("active");
    menuIcon.classList.remove("active");
    document.body.classList.remove("open");
})

// rotate text js code 
let text = document.querySelector(".text p");

text.innerHTML = text.innerHTML.split("").map((char,i)=>
    `<b style="transform:rotate(${i * 6.3}deg")>${char}</b>`
).join("");

// switch between about buttons 

const buttons = document.querySelectorAll('.about-btn button');
const contents = document.querySelectorAll('.content');

buttons.forEach((button, index) => {
  button.addEventListener('click', () => {
    contents.forEach(content => content.style.display = 'none');
    contents[index].style.display = 'block';
    buttons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
  });
});

// Fetch GitHub repositories count
function fetchGitHubStats() {
    // This function would ideally fetch live data from GitHub API
    // For now, we'll use placeholder data that's updated manually
    console.log("GitHub stats would be fetched here");
}

document.addEventListener('DOMContentLoaded', function() {
    fetchGitHubStats();
});

// portfolio fillter 

var mixer = mixitup('.portfolio-gallery',{
    selectors: {
        target: '.portfolio-box'
    },
    animation: {
        duration: 500
    }
});

// Initialize swiperjs 

var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    autoplay:{
        delay:3000,
        disableOnInteraction:false,
    },

    breakpoints: {
        576:{
            slidesPerView:2,
            spaceBetween:10,
        },
        1200:{
            slidesPerView:3,
            spaceBetween:20,
        },
    }
  });

//   skill Progress bar 

const first_skill = document.querySelector(".skill:first-child");
const sk_counters = document.querySelectorAll(".counter span");
const progress_bars = document.querySelectorAll(".skills svg circle");

window.addEventListener("scroll",()=>{
    if(!skillsPlayed)
    skillsCounter();
})

function hasReached(el){
    let topPosition = el.getBoundingClientRect().top;
    if(window.innerHeight >= topPosition + el.offsetHeight)return true;
    return false;
}

function updateCount(num,maxNum){
    let currentNum = +num.innerText;
    
    if(currentNum < maxNum){
        num.innerText = currentNum + 1;
        setTimeout(()=>{
            updateCount(num,maxNum)
        },12)
    }
}

let skillsPlayed = false;

function skillsCounter(){
    if(!hasReached(first_skill))return;
    skillsPlayed = true;
    sk_counters.forEach((counter,i)=>{
        let target = +counter.dataset.target;
        let strokeValue = 465 - 465 * (target / 100);

        progress_bars[i].style.setProperty("--target",strokeValue);

        setTimeout(()=>{
            updateCount(counter,target);
        },400)
    });

    progress_bars.forEach(p => p.style.animation = "progress 2s ease-in-out forwards");
}

// side progress bar 

let calcScrollValue = ()=>{
    let scrollProgress = document.getElementById("progress");
    let pos = document.documentElement.scrollTop;

    let calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrollValue = Math.round((pos * 100)/calcHeight);
    
    if(pos > 100){
        scrollProgress.style.display = "grid";
    }else{
        scrollProgress.style.display = "none";
    }

    scrollProgress.addEventListener("click",()=>{
        document.documentElement.scrollTop = 0;
    });

    scrollProgress.style.background = `conic-gradient(#fff ${scrollValue}%,#e6006d ${scrollValue}%)`;
};

window.onscroll = calcScrollValue;
window.onload = calcScrollValue;

// active menu 

let menuLi = document.querySelectorAll("header ul li a");
let section = document.querySelectorAll('section');

function activeMenu(){
    let len = section.length;
    while(--len && window.scrollY + 97 < section[len].offsetTop){}
    menuLi.forEach(sec => sec.classList.remove("active"));
    menuLi[len].classList.add("active");
}
activeMenu();
window.addEventListener("scroll",activeMenu);

// scroll reveal

ScrollReveal({ 
    distance:"90px",
    duration:2000,
    delay:200,
    // reset: true ,
});

ScrollReveal().reveal('.hero-info,.main-text,.proposal,.heading', { origin: "top" });
ScrollReveal().reveal('.about-img,.fillter-buttons,.contact-info', { origin: "left" });
ScrollReveal().reveal('.about-content,.skills,.tech-stack', { origin: "right" });
ScrollReveal().reveal('.allServices,.portfolio-gallery,.blog-box,footer,.img-hero,.tech-categories', { origin: "bottom" });

// AI Chatbot functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatToggle = document.querySelector('.chat-bot-toggle');
    const chatBox = document.querySelector('.chat-box');
    const closeChat = document.getElementById('close-chat');
    const sendButton = document.getElementById('send-message');
    const userInput = document.getElementById('user-message');
    const chatMessages = document.querySelector('.chat-messages');

    // Toggle chat box with animation
    chatToggle.addEventListener('click', () => {
        chatBox.classList.toggle('active');
        if (chatBox.classList.contains('active')) {
            // Focus input when chat opens
            setTimeout(() => userInput.focus(), 300);
            // Reset chat toggle animation
            chatToggle.style.animation = 'none';
            setTimeout(() => chatToggle.style.animation = '', 10);
        }
    });

    // Close chat box
    closeChat.addEventListener('click', () => {
        chatBox.classList.remove('active');
    });

    // Send message when button is clicked
    sendButton.addEventListener('click', sendMessage);

    // Send message when Enter key is pressed
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const message = userInput.value.trim();
        if (message !== '') {
            // Add user message to chat
            addMessage(message, 'user');
            
            // Clear input field
            userInput.value = '';
            
            // Add typing indicator
            const typingIndicator = document.createElement('div');
            typingIndicator.classList.add('message', 'bot', 'typing');
            typingIndicator.innerHTML = '<p><span class="dot"></span><span class="dot"></span><span class="dot"></span></p>';
            chatMessages.appendChild(typingIndicator);
            
            // Scroll to bottom of chat
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            // Get bot response after a realistic delay
            setTimeout(() => {
                // Remove typing indicator
                if (typingIndicator.parentNode === chatMessages) {
                    chatMessages.removeChild(typingIndicator);
                }
                
                const botResponse = getBotResponse(message);
                addMessage(botResponse, 'bot');
            }, 1200);
        }
    }

    function addMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        messageElement.innerHTML = `<p>${message}</p>`;
        chatMessages.appendChild(messageElement);
        
        // Scroll to bottom of chat
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function getBotResponse(message) {
        // Convert message to lowercase for easier comparison
        const lowerMessage = message.toLowerCase();
        
        // Simple response logic
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            return "👋 Hello! How can I help you today?";
        } else if (lowerMessage.includes('who are you') || lowerMessage.includes('your name')) {
            return "I'm Sakith's AI assistant, here to help answer questions about his work and services.";
        } else if (lowerMessage.includes('contact') || lowerMessage.includes('reach')) {
            return "📱 You can contact Sakith via WhatsApp at +94769092755 or email at sakithchanlaka2004@gmail.com";
        } else if (lowerMessage.includes('service')) {
            return "🚀 Sakith offers web development, graphic design, UI/UX design, and digital marketing services. Would you like to know more about any specific service?";
        } else if (lowerMessage.includes('portfolio') || lowerMessage.includes('work') || lowerMessage.includes('project')) {
            return "💼 Sakith has worked on various projects including VN Sports Dressings, Orbiter Shoes, Rapid Cart Shopping, and more. You can check his portfolio section for details.";
        } else if (lowerMessage.includes('web') || lowerMessage.includes('website')) {
            return "💻 Sakith specializes in responsive web design and development. He can create beautiful, functional websites tailored to your needs.";
        } else if (lowerMessage.includes('graphic') || lowerMessage.includes('design')) {
            return "🎨 Sakith provides graphic design services including logo design, branding, and packaging design like the New Inland Coffee project.";
        } else if (lowerMessage.includes('skill')) {
            return "🔧 Sakith is skilled in HTML (90%), CSS (85%), JavaScript (48%), UI/UX Design (20%), Adobe Photoshop (80%), and Adobe Illustrator (70%).";
        } else if (lowerMessage.includes('thank')) {
            return "😊 You're welcome! Feel free to ask if you have any other questions.";
        } else if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
            return "👋 Goodbye! Have a great day!";
        } else {
            return "I'm not sure I understand. Could you please rephrase or ask about Sakith's services, portfolio, or contact information?";
        }
    }
});

// Add this CSS for typing animation
const style = document.createElement('style');
style.textContent = `
    .typing .dot {
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        margin-right: 3px;
        background: #999;
        animation: typing 1.5s infinite ease-in-out;
    }
    .typing .dot:nth-child(2) {
        animation-delay: 0.2s;
    }
    .typing .dot:nth-child(3) {
        animation-delay: 0.4s;
    }
    @keyframes typing {
        0%, 60%, 100% { transform: translateY(0); }
        30% { transform: translateY(-6px); }
    }
`;
document.head.appendChild(style);

