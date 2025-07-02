document.addEventListener("DOMContentLoaded", () => {
  // --- FUNÇÃO 1: VERIFICAÇÃO PADRÃO (PARA INPUTS SIMPLES) ---
  const setupVerification = (
    buttonId,
    questionPrefix,
    feedbackPrefix,
    totalQuestions
  ) => {
    const verifyButton = document.getElementById(buttonId);
    if (!verifyButton) return;

    verifyButton.addEventListener("click", () => {
      let allCorrect = true;
      for (let i = 1; i <= totalQuestions; i++) {
        const inputElement = document.getElementById(`${questionPrefix}${i}`);
        if (!inputElement) continue;

        const feedbackElementId = feedbackPrefix
          ? `${feedbackPrefix}${i}`
          : null;
        const feedbackElement = feedbackElementId
          ? document.getElementById(feedbackElementId)
          : null;

        const userAnswer = inputElement.value
          .trim()
          .toLowerCase()
          .replace(/\s+/g, " ");
        const correctAnswer = inputElement.dataset.answer;
        const alternativeAnswer = inputElement.dataset.alternative; // Para respostas alternativas

        inputElement.classList.remove("correct", "incorrect");
        if (feedbackElement) feedbackElement.style.display = "none";

        if (
          userAnswer === correctAnswer ||
          (alternativeAnswer && userAnswer === alternativeAnswer)
        ) {
          inputElement.classList.add("correct");
        } else {
          allCorrect = false;
          inputElement.classList.add("incorrect");
          if (feedbackElement) {
            let feedbackHint = `🤔 Quase lá! Releia com atenção.`;
            feedbackElement.innerHTML = feedbackHint;
            feedbackElement.style.display = "block";
          }
        }
      }
      if (allCorrect) {
        alert(
          "Incrível! Todas as respostas estão corretas! Você é um mestre! ✨"
        );
      }
    });
  };

  // --- FUNÇÃO 2: MÚLTIPLA ESCOLHA (PARA BOTÕES) ---
  const setupMultipleChoice = () => {
    const optionContainers = document.querySelectorAll(
      ".multiple-choice-options"
    );
    optionContainers.forEach((container) => {
      const buttons = container.querySelectorAll(".choice-btn");
      buttons.forEach((button) => {
        button.addEventListener("click", () => {
          // Se já foi respondido corretamente, não faz nada
          if (container.querySelector(".choice-btn.correct")) return;

          if (button.classList.contains("correct-answer")) {
            button.classList.add("correct");
            // Desabilita todos após acertar
            buttons.forEach((btn) => (btn.disabled = true));
          } else {
            button.classList.add("incorrect");
            button.disabled = true; // Só desabilita o botão errado
          }
        });
      });
    });
  };

  // Treino 1 Semana 2 - Match the Phrases
  function setupMatchExercise() {
    const leftItems = document.querySelectorAll("#match-left .match-item.left");
    const rightItems = document.querySelectorAll(
      "#match-right .match-item.right"
    );
    let selectedLeft = null;
    let selectedRight = null;
    let matches = 0;

    leftItems.forEach((item) => {
      item.addEventListener("click", function () {
        leftItems.forEach((i) => i.classList.remove("selected"));
        this.classList.add("selected");
        selectedLeft = this;
        checkMatch();
      });
    });
    rightItems.forEach((item) => {
      item.addEventListener("click", function () {
        rightItems.forEach((i) => i.classList.remove("selected"));
        this.classList.add("selected");
        selectedRight = this;
        checkMatch();
      });
    });

    function checkMatch() {
      if (selectedLeft && selectedRight) {
        const feedback = document.getElementById("match-feedback");
        if (selectedLeft.dataset.match === selectedRight.dataset.match) {
          selectedLeft.classList.add("matched");
          selectedRight.classList.add("matched");
          selectedLeft.style.pointerEvents = "none";
          selectedRight.style.pointerEvents = "none";
          matches++;
          feedback.textContent = "Ótimo! Você fez uma ligação correta!";
        } else {
          feedback.textContent = "Tente novamente!";
        }
        setTimeout(() => {
          leftItems.forEach((i) => i.classList.remove("selected"));
          rightItems.forEach((i) => i.classList.remove("selected"));
          feedback.textContent = "";
          selectedLeft = null;
          selectedRight = null;
        }, 1000);
        if (matches === 5) {
          feedback.textContent = "Parabéns! Você completou todas as ligações!";
        }
      }
    }
  }

  // --- INICIALIZAÇÃO DE TODAS AS FUNCIONALIDADES ---

  // Ativa a múltipla escolha em qualquer página que a tiver
  setupMultipleChoice();

  // ----- CONFIGURAÇÃO PARA A SEMANA 1 DA LYLIA -----
  setupVerification("verify-s1", "s1q", "s1-feedback", 5);
  setupVerification("verify-s2", "s2q", null, 5);
  setupVerification("verify-s4", "s4q", "s4-feedback", 5);

  // ----- CONFIGURAÇÃO PARA A SEMANA 2 DA LYLIA -----
  setupVerification("verify-s2t1", "s2q1_", null, 5);
  setupVerification("verify-s2t2", "s2q2_", "s2-feedback", 5);
  setupVerification("verify-s2t4", "s2q4_", "s2-feedback4-", 5);

  // ----- CONFIGURAÇÃO PARA A SEMANA 3 DA LYLIA -----
  setupVerification("verify-s3t1", "s3q1_", null, 5);
  setupVerification("verify-s3t3", "s3q3_", null, 5);
  setupVerification("verify-s3t4", "s3q4_", "s3-feedback4-", 5);

  // ----- CONFIGURAÇÃO PARA A SEMANA 4 DA LYLIA -----
  setupVerification("verify-s4t1", "s4q1_", null, 5);
  // O Treino 2 da Semana 4 é de múltipla escolha.
  setupVerification("verify-s4t3", "s4q3_", "s4t3-feedback", 5);
  setupVerification("verify-s4t4", "s4q4_", "s4t4-feedback", 5);
  // O treino 5 da Semana 4 é de escrita livre.

  // --- Funcionalidades Gerais do Site ---

  // Funcionalidade de Concluir a Semana
  const completeWeekButton = document.getElementById("complete-week-btn");
  if (completeWeekButton) {
    completeWeekButton.addEventListener("click", () => {
      const weekNumber = completeWeekButton.dataset.week;
      localStorage.setItem(`week${weekNumber}_completed`, "true");
      alert(`Parabéns! Missão da Semana ${weekNumber} concluída! 🏆`);
      window.location.href = "../index.html";
    });
  }

  // Funcionalidade dos Botões de Áudio
  let audioPlayer;
  document.querySelectorAll(".audio-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const audioSrc = button.getAttribute("data-audio-src");
      if (!audioSrc) return;
      if (!audioPlayer) {
        audioPlayer = document.createElement("audio");
        document.body.appendChild(audioPlayer);
      }
      audioPlayer.src = audioSrc;
      audioPlayer.currentTime = 0;
      audioPlayer.play();
    });
  });

  setupMatchExercise();
});
