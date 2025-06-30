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
        const feedbackElement = document.getElementById(
          `${feedbackPrefix}${i}`
        );
        if (!inputElement) continue;

        const userAnswer = inputElement.value
          .trim()
          .toLowerCase()
          .replace(/\s+/g, " ");
        const correctAnswer = inputElement.dataset.answer;

        inputElement.classList.remove("correct", "incorrect");
        if (feedbackElement) feedbackElement.style.display = "none";

        if (userAnswer === correctAnswer) {
          inputElement.classList.add("correct");
        } else {
          allCorrect = false;
          inputElement.classList.add("incorrect");
          if (feedbackElement) {
            const verb = inputElement.dataset.verb;
            let feedbackHint = `🤔 Quase lá! Releia com atenção.`;
            if (verb) {
              if (
                !userAnswer.includes("don't") &&
                !userAnswer.includes("do not")
              ) {
                feedbackHint = `🤔 Lembre-se da palavra mágica para negativas... <span class="en-word">don't</span>!`;
              } else if (!userAnswer.includes(verb)) {
                feedbackHint = `🤔 Ótimo uso do <span class="en-word">don't</span>! Mas não se esqueça do verbo de ação.`;
              }
            }
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

  // --- FUNÇÃO 2: ASSISTENTE DE IA (PARA TEXTAREAS) ---
  const setupAiAssistant = () => {
    const aiCheckButtons = document.querySelectorAll(".ai-check-btn");
    aiCheckButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const textareaId = button.dataset.textareaId;
        const keywords = button.dataset.keywords.split(",");
        const textarea = document.getElementById(textareaId);
        const userText = textarea.value.toLowerCase();
        const feedbackBoxId = `ai-feedback-${textareaId}`;
        const feedbackBox = document.getElementById(feedbackBoxId);

        if (!textarea || !feedbackBox) return;

        feedbackBox.style.display = "block";
        feedbackBox.innerHTML = `🤖 O Assistente está pensando...`;

        setTimeout(() => {
          let foundKeywords = 0;
          let feedbackMessage = "";
          keywords.forEach((key) => {
            if (userText.includes(key.trim().toLowerCase())) {
              foundKeywords++;
            }
          });

          if (userText.length < 15) {
            feedbackMessage = `Hmm, seu texto está um pouco curto. Tente escrever um pouco mais sobre suas ideias! Vamos lá!`;
          } else if (foundKeywords === 0) {
            feedbackMessage = `Bom começo! Agora, tente usar algumas palavras da missão, como <span class="en-word">${keywords.join(
              '</span>, <span class="en-word">'
            )}</span>.`;
          } else if (foundKeywords < keywords.length) {
            feedbackMessage = `Excelente trabalho! Você usou ${foundKeywords} palavras-chave.`;
          } else {
            feedbackMessage = `UAU! Missão cumprida, <span class="en-word">player</span>! Você usou todas as palavras-chave. Seu texto está superpoderoso agora! 🚀`;
          }

          feedbackBox.innerHTML = `🤖 ${feedbackMessage}`;
        }, 1500);
      });
    });
  };

  // --- INICIALIZAÇÃO DE TODAS AS FUNCIONALIDADES ---

  // Configurar verificações da Semana 1
  setupVerification("verify-s1d1", "s1d1q", null, 10);
  setupVerification("verify-s1d3", "s1d3q", "s1d3-feedback", 10);
  setupVerification("verify-s1d4", "s1d4q", null, 10);
  setupVerification("verify-s1d5", "s1d5q", null, 10);

  // Configurar verificações da Semana 2
  setupVerification("verify-s2d1", "s2d1q", null, 10);
  setupVerification("verify-s2d2", "s2d2q", "s2d2-feedback", 10);
  // Não precisa chamar setupVerification para s2d3, pois ele usa o assistente.

  // Configurar o Assistente de IA (vai funcionar em qualquer página que o tenha)
  setupAiAssistant();

  // Funcionalidade dos Botões de Áudio
  document.querySelectorAll(".audio-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const audioSrc = button.getAttribute("data-audio-src");
      if (audioSrc) {
        const audio = new Audio(audioSrc);
        audio.play();
      }
    });
  });

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
  // Configurar verificações da Semana 3 (com 5 atividades)
  setupVerification("verify-s3d1", "s3d1q", "s3d1-feedback", 5);
  setupVerification("verify-s3d2", "s3d2q", "s3d2-feedback", 5);
  setupVerification("verify-s3d3", "s3d3q", "s3d3-feedback", 5);
  setupVerification("verify-s3d4", "s3d4q", "s3d4-feedback", 5);
  setupVerification("verify-s3d5", "s3d5q", "s3d5-feedback", 5); // NOVA LINHA

  // Adicione estas linhas ao final da seção de inicialização no js/atividades.js

  // Configurar verificações da Semana 4
  setupVerification("verify-s4d1", "s4d1q", "s4d1-feedback", 5);
  setupVerification("verify-s4d2", "s4d2q", "s4d2-feedback", 5);
  setupVerification("verify-s4d3", "s4d3q", "s4d3-feedback", 5);
  setupVerification("verify-s4d4", "s4d4q", "s4d4-feedback", 5);
  // O treino 5 (s4d5) é de escrita livre e não precisa de verificação.

  // Salvar e restaurar respostas dos inputs de texto
  document.querySelectorAll('input[type="text"]').forEach((input) => {
    if (!input.id) return; // Só salva se tiver ID
    const key = `input_${window.location.pathname}_${input.id}`;
    // Restaurar valor salvo
    const saved = localStorage.getItem(key);
    if (saved !== null) input.value = saved;
    // Salvar ao digitar
    input.addEventListener("input", () => {
      localStorage.setItem(key, input.value);
    });
  });

  // Salvar e restaurar respostas dos textareas
  document.querySelectorAll("textarea").forEach((textarea) => {
    if (!textarea.id) return;
    const key = `textarea_${window.location.pathname}_${textarea.id}`;
    // Restaurar valor salvo
    const saved = localStorage.getItem(key);
    if (saved !== null) textarea.value = saved;
    // Salvar ao digitar
    textarea.addEventListener("input", () => {
      localStorage.setItem(key, textarea.value);
    });
  });

  // Função para checar se todos os campos obrigatórios estão preenchidos
  function checkAllFieldsFilled() {
    const textInputs = Array.from(document.querySelectorAll('input[type="text"]'));
    const textareas = Array.from(document.querySelectorAll('textarea'));
    // Só considera campos que não estão desabilitados e não são hidden
    const allFields = textInputs.concat(textareas).filter(el => !el.disabled && el.type !== 'hidden');
    return allFields.every(el => el.value.trim().length > 0);
  }

  function updateCompleteButtonState() {
    const completeWeekButton = document.getElementById('complete-week-btn');
    if (!completeWeekButton) return;
    if (checkAllFieldsFilled()) {
        completeWeekButton.disabled = false;
        completeWeekButton.classList.remove('disabled');
    } else {
        completeWeekButton.disabled = true;
        completeWeekButton.classList.add('disabled');
    }
  }

  // Inicializa o estado do botão ao carregar a página
  updateCompleteButtonState();

  // Atualiza o estado do botão sempre que o aluno digitar algo
  document.querySelectorAll('input[type="text"], textarea').forEach(el => {
    el.addEventListener('input', updateCompleteButtonState);
  });
});
