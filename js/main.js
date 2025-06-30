document.addEventListener("DOMContentLoaded", () => {
  const totalWeeks = 4;
  const bonusCard = document.getElementById("bonus-mission-card");
  const unlockOverlay = document.getElementById("unlock-overlay");
  const unlockOkBtn = document.getElementById("unlock-ok-btn");
  
  // Função ÚNICA para verificar e gerenciar todo o progresso
  function manageProgress() {
    let completedCount = 0;

    // Loop para marcar semanas como concluídas
    for (let i = 1; i <= totalWeeks; i++) {
      if (localStorage.getItem(`week${i}_completed`) === "true") {
        const card = document.getElementById(`week-${i}`);
        const statusBadge = document.getElementById(`status-${i}`);
        
        if (card) card.classList.add("completed");
        if (statusBadge) statusBadge.textContent = "CONCLUÍDO!";
        
        completedCount++;
      }
    }

    // Lógica para desbloquear as próximas semanas
    for (let i = 1; i < totalWeeks; i++) {
      if (localStorage.getItem(`week${i}_completed`) === "true") {
        const nextWeekBtn = document.getElementById(`btn-week-${i + 1}`);
        if (nextWeekBtn) nextWeekBtn.classList.remove("disabled");
      }
    }

    // Lógica para desbloquear a MISSÃO BÔNUS
    if (completedCount === totalWeeks && bonusCard) {
      const bonusAlreadyShown = localStorage.getItem("bonus_unlocked") === "true";
      
      if (!bonusAlreadyShown && unlockOverlay) {
        // Primeira vez: mostra a animação
        unlockOverlay.style.display = "flex";
        localStorage.setItem("bonus_unlocked", "true");
      } else {
        // Já viu a animação: apenas mostra o card
        bonusCard.style.display = "block";
      }
    }
  }

  // Evento para fechar a tela de anúncio
  if (unlockOkBtn && bonusCard) {
    unlockOkBtn.addEventListener("click", () => {
      unlockOverlay.style.display = "none";
      bonusCard.style.display = "block";
      bonusCard.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  // Evento para o alerta de semana bloqueada (verifica no clique se está desabilitado)
  document.querySelectorAll(".mission-button").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (btn.classList.contains("disabled")) {
        e.preventDefault();
        alert("Conclua a semana anterior para desbloquear esta missão!");
      }
    });
  });

  // Evento para resetar o progresso
  const resetBtn = document.getElementById("reset-progress-btn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (confirm("Tem certeza que deseja apagar todo o progresso?")) {
        localStorage.clear();
        location.reload();
      }
    });
  }

  // Chama a função principal ao carregar a página
  manageProgress();
});