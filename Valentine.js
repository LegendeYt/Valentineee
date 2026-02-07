document.addEventListener("DOMContentLoaded", () => {

  const screen1 = document.getElementById("screen1");
  const screen2 = document.getElementById("screen2");
  const screen3 = document.getElementById("screen3");
  const screen4 = document.getElementById("screen4");

  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");

  const wrongBtns = document.querySelectorAll(".wrong-month");
  const rightBtn = document.getElementById("rightBtn");
  const error = document.getElementById("error");

  // Screen 3 Elemente
  const memoAudio = document.getElementById("memoAudio");
  const finalYesBtn = document.getElementById("finalYesBtn"); // erscheint NACH Memo
  const planBtn = document.getElementById("planBtn");         // erscheint NACH Yes

  let noScale = 1;
  let yesScale = 1;

  /* --------------------
     LEVEL 1 → LEVEL 2
  -------------------- */
  yesBtn?.addEventListener("click", () => {
    screen1.classList.add("hidden");
    screen2.classList.remove("hidden");
  });

  /* --------------------
     NEIN-BUTTON 😈
  -------------------- */
  if (noBtn && yesBtn) {
    noBtn.addEventListener("click", () => {
      noScale -= 0.25;
      yesScale += 0.25;

      noBtn.style.transform = `
        scale(${noScale})
        rotate(${Math.random() * 20 - 10}deg)
      `;
      yesBtn.style.transform = `scale(${yesScale})`;

      if (noScale <= 0.12) {
        noBtn.style.opacity = "0";
        noBtn.style.pointerEvents = "none";
      }
    });
  }

  /* --------------------
     FALSCHE MONATE 😈
  -------------------- */
  wrongBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      error.classList.remove("hidden");

      btn.style.transform = `
        scale(0.85)
        rotate(${Math.random() * 12 - 6}deg)
      `;
    });
  });

  /* --------------------
     RICHTIG → SCREEN 3 + MEMO START 🎙️
  -------------------- */
  rightBtn?.addEventListener("click", () => {
    screen2.classList.add("hidden");
    screen3.classList.remove("hidden");

    // Memo automatisch starten
    memoAudio?.play().catch(() => {});

    // Wenn Memo fertig → YES anzeigen
    memoAudio?.addEventListener("ended", () => {
      finalYesBtn.classList.remove("hidden");
    }, { once: true });
  });

  /* --------------------
     YES → PLAN BUTTON 💘
  -------------------- */
  finalYesBtn?.addEventListener("click", () => {
    finalYesBtn.style.display = "none";
    planBtn.classList.remove("hidden");
  });

  /* --------------------
     PLAN → SCREEN 4 💝
  -------------------- */
  planBtn?.addEventListener("click", () => {
    screen3.classList.add("hidden");
    screen4.classList.remove("hidden");
  });

});
