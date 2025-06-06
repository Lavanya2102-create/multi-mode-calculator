// =============================================================
// script.js – Enhanced Calculator Logic (Simple + Scientific + Currency)
// -------------------------------------------------------------
// This JavaScript file handles:
// - Simple calculator functionality
// - Scientific calculator extensions (with simple base)
// - Currency converter logic
// - Mode switching between sections
// =============================================================

/********************** DOM ELEMENTS ***********************/
// Navigation to switch between modes
let resultShown = false;

const navItems = document.querySelectorAll(".nav-item");
const sections = document.querySelectorAll(".calc-section");

// Displays
const simpleDisplay = document.getElementById("display");
const sciDisplay = document.getElementById("sci-display");

/********************** MODE SWITCHING ***********************/
function switchMode(mode) {
  navItems.forEach(item => item.classList.toggle("active", item.dataset.mode === mode));
  sections.forEach(section => section.classList.toggle("show", section.id === mode));
}

navItems.forEach(item => {
  item.addEventListener("click", () => switchMode(item.dataset.mode));
});

/********************** SIMPLE CALCULATOR ***********************/
function appendValue(value) {
    const display = document.getElementById('display');
    
    // If result was just shown, replace with new value
    if (display.value === '0' || resultShown) {
      display.value = value;
      resultShown = false;
    } else {
      display.value += value;
    }
  }
  
  

  function clearDisplay() {
    document.getElementById('display').value = '0';
    resultShown = false;
  }
  
  

  function deleteLast() {
    const display = document.getElementById('display');
    display.value = display.value.slice(0, -1) || '0';
    resultShown = false;
  }
  

function calculateResult() {
    const display = document.getElementById('display');
    try {
      let result = eval(display.value);
      document.getElementById('history').innerHTML += `<div>${display.value} = ${result}</div>`;
      display.value = result;
      resultShown = true;
    } catch (e) {
      display.value = "Error";
    }
  }
  

/********************** SCIENTIFIC CALCULATOR ***********************/
function sciAppendValue(value) {
  sciDisplay.value += value; // Add value to scientific calculator display
}

function sciClearDisplay() {
  sciDisplay.value = "";
}

function sciDeleteLast() {
  sciDisplay.value = sciDisplay.value.slice(0, -1);
}

function sciCalculateResult() {
  try {
    let result = new Function("with(Math) { return " + sciDisplay.value + " }")();
    sciDisplay.value = result;
  } catch (error) {
    sciDisplay.value = "Error";
  }
}

function applyScientificFunction(funcName) {
  sciDisplay.value = `${funcName}(` + sciDisplay.value + `)`;
  sciCalculateResult();
}

/********************** CURRENCY CONVERTER ***********************/
const RATES = {
  INR: 1,
  USD: 0.012,
  EUR: 0.011,
  GBP: 0.0096
};

function convertCurrency() {
  const amount = parseFloat(document.getElementById("amount").value);
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;
  const output = document.getElementById("currency-result");

  if (isNaN(amount)) {
    output.value = "Enter amount";
    return;
  }
  const amountInINR = amount / RATES[from];
  const converted = amountInINR * RATES[to];
  output.value = converted.toFixed(2);
}

/********************** INITIAL LOAD ***********************/
switchMode("simple");

// SIMPLE CALCULATOR
function appendValue(value) {
    const display = document.getElementById('display');
    
    // If result was just shown, replace with new value
    if (display.value === '0' || resultShown) {
      display.value = value;
      resultShown = false;
    } else {
      display.value += value;
    }
  }
  
  

  function clearDisplay() {
    document.getElementById('display').value = '0';
    resultShown = false;
  }
  
  

  function deleteLast() {
    const display = document.getElementById('display');
    display.value = display.value.slice(0, -1) || '0';
    resultShown = false;
  }
  

function calculateResult() {
    const display = document.getElementById('display');
    try {
      let result = eval(display.value);
      document.getElementById('history').innerHTML += `<div>${display.value} = ${result}</div>`;
      display.value = result;
      resultShown = true;
    } catch (e) {
      display.value = "Error";
    }
  }
  
  
  // SCIENTIFIC CALCULATOR
  function sciAppend(value) {
    const display = document.getElementById('sci-display');
    if (display.value === '0' || resultShown) {
      display.value = value;
      resultShown = false;
    } else {
      display.value += value;
    }
  }
  
  function sciClear() {
    document.getElementById('sci-display').value = '0';
  }
  
  function sciDelete() {
    const display = document.getElementById('sci-display');
    display.value = display.value.slice(0, -1) || '0';
  }
  
  function sciCalculate() {
    const display = document.getElementById('sci-display');
    try {
      let expression = display.value
        .replace(/sin\(/g, 'Math.sin(')
        .replace(/cos\(/g, 'Math.cos(')
        .replace(/tan\(/g, 'Math.tan(')
        .replace(/log\(/g, 'Math.log10(')
        .replace(/sqrt\(/g, 'Math.sqrt(')
        .replace(/\^/g, '**');
      let result = eval(expression);
      document.getElementById('sci-history').innerHTML += `<div>${display.value} = ${result}</div>`;
      display.value = result;
      resultShown = true;
    } catch (e) {
      display.value = "Error";
    }
  }
  
  

  // Toggle dark/light theme
  document.getElementById("theme-toggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });
  
  
  // Keyboard support for both calculators


  // Auto-focus hidden input on page load and mode switch
  const inputField = document.getElementById("hidden-keyboard-capture");

  // Focus on load and when mode changes
  window.addEventListener("load", () => inputField.focus());
  document.querySelectorAll(".nav-item").forEach(item => {
    item.addEventListener("click", () => setTimeout(() => inputField.focus(), 200));
  });
  
  // Handle normal key inputs
  inputField.addEventListener("input", (e) => {
    const key = e.data;
    const simple = document.getElementById("simple").classList.contains("show");
    const sci = document.getElementById("scientific").classList.contains("show");
  
    if (simple && /[\d\+\-\*\/\.]/.test(key)) appendValue(key);
    else if (sci && /[\d\+\-\*\/\.\(\)]/.test(key)) sciAppend(key);
  
    inputField.value = ''; // clear input
  });
  
  // Handle Backspace and Enter keys
  inputField.addEventListener("keydown", (e) => {
    const simple = document.getElementById("simple").classList.contains("show");
    const sci = document.getElementById("scientific").classList.contains("show");
  
    if (simple) {
      if (e.key === "Enter") {
        calculateResult();
        e.preventDefault();
      }
      if (e.key === "Backspace") {
        deleteLast();
        e.preventDefault();
      }
    } else if (sci) {
      if (e.key === "Enter") {
        sciCalculate();
        e.preventDefault();
      }
      if (e.key === "Backspace") {
        sciDelete();
        e.preventDefault();
      }
    }
  });
  
  // === Floating Bubbles Background Animation ===
const canvas = document.getElementById('bg-animation');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 5 + 2;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
    this.color = 'rgba(173, 216, 230, 0.5)'; // Light blue
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Bounce on edge
    if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
    if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Create particles
function initParticles() {
  particlesArray = [];
  const numberOfParticles = 100;
  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
  }
}

// Animate particles
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}

// Resize canvas on window resize
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

// Initialize everything
initParticles();
animateParticles();
