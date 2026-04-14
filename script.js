window.addEventListener("DOMContentLoaded", () => {
  const description = document.getElementById("description");
  const music = document.getElementById("music");
  const enterBtn = document.getElementById("enterBtn");
  const startScreen = document.getElementById("startScreen");
  const mainContent = document.getElementById("mainContent");
  const canvas = document.getElementById("matrix");

  if (description) {
    description.textContent = '"Я сигма 😎"';
  }

  if (music) {
    music.volume = 0.1;
  }

  if (enterBtn && startScreen && mainContent && music) {
    enterBtn.addEventListener("click", async () => {
      startScreen.style.display = "none";
      mainContent.style.display = "block";

      try {
        await music.play();
      } catch (e) {
        console.log("Музыка не запустилась:", e);
      }
    });
  }

  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();

  const text = "322";
  const fontSize = 20;
  let columns = Math.floor(window.innerWidth / fontSize);
  let drops = Array(columns).fill(0).map(() => Math.random() * -100);

  function resetDrops() {
    columns = Math.floor(window.innerWidth / fontSize);
    drops = Array(columns).fill(0).map(() => Math.random() * -100);
  }

  window.addEventListener("resize", () => {
    resizeCanvas();
    resetDrops();
  });

  function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00ff00";
    ctx.font = fontSize + "px Consolas";

    for (let i = 0; i < drops.length; i++) {
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      ctx.fillText(text, x, y);

      if (y > canvas.height && Math.random() > 0.975) {
        drops[i] = Math.random() * -20;
      }

      drops[i] += 0.35 + Math.random() * 0.35;
    }
  }

  setInterval(drawMatrix, 50);
});