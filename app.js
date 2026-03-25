document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("startButton");
  const loading = document.getElementById("loading");
  const loadingText = document.getElementById("loadingText");
  const guideMessage = document.getElementById("guideMessage");
  const speechBubble = document.getElementById("speechBubble");
  const speechText = document.getElementById("speechText");
  const detailPanel = document.getElementById("detailPanel");
  const detailTitle = document.getElementById("detailTitle");
  const detailText = document.getElementById("detailText");

  const detailButton = document.getElementById("detailButton");
  const langButton = document.getElementById("langButton");
  const closeBubbleButton = document.getElementById("closeBubbleButton");
  const closeDetailButton = document.getElementById("closeDetailButton");
  const backButton = document.getElementById("backButton");

  const arScene = document.getElementById("arScene");
  const markerTarget = document.getElementById("markerTarget");
  const spiritPlane = document.getElementById("spiritPlane");

  let currentLang = "ja";
  let hasShownBubble = false;
  let canShowAgain = true;
  let guideTimer = null;

  function applyLanguage() {
    const t = window.APP_MESSAGES[currentLang];
    loadingText.textContent = t.loading;
    guideMessage.textContent = t.guide;
    speechText.textContent = t.speech;
    detailTitle.textContent = t.title;
    detailText.textContent = t.detail;
    detailButton.textContent = t.detailButton;
    langButton.textContent = t.langButton;
    closeBubbleButton.textContent = t.closeBubble;
    closeDetailButton.textContent = t.closeDetail;
  }

  function showBubble() {
    speechBubble.classList.remove("hidden");
  }

  function hideBubble() {
    speechBubble.classList.add("hidden");
  }

  function showGuide() {
    guideMessage.classList.remove("hidden");
  }

  function hideGuide() {
    guideMessage.classList.add("hidden");
  }

  function startGuideTimer() {
    clearTimeout(guideTimer);
    showGuide();
    guideTimer = setTimeout(() => {
      hideGuide();
    }, 5000);
  }

  function fadeInSpirit() {
    let opacity = 0;
    spiritPlane.setAttribute("opacity", 0);

    const timer = setInterval(() => {
      opacity += 0.08;
      spiritPlane.setAttribute("opacity", Math.min(opacity, 1));
      if (opacity >= 1) {
        clearInterval(timer);
      }
    }, 40);
  }

  function hideSpirit() {
    spiritPlane.setAttribute("opacity", 0);
  }

  async function startMindAR() {
    const mindarSystem = arScene.systems["mindar-image-system"];
    if (mindarSystem) {
      await mindarSystem.start();
    }
  }

  applyLanguage();

  startButton.addEventListener("click", async () => {
    loading.classList.add("hidden");
    startGuideTimer();

    if (arScene.hasLoaded) {
      await startMindAR();
    } else {
      arScene.addEventListener(
        "loaded",
        async function onSceneLoaded() {
          arScene.removeEventListener("loaded", onSceneLoaded);
          await startMindAR();
        },
        { once: true }
      );
    }
  });

  markerTarget.addEventListener("targetFound", () => {
    hideGuide();

    if (!hasShownBubble && canShowAgain) {
      hasShownBubble = true;
      canShowAgain = false;
      fadeInSpirit();
      showBubble();
    }
  });

  markerTarget.addEventListener("targetLost", () => {
    hideBubble();
    hideSpirit();
    hasShownBubble = false;
    canShowAgain = true;
  });

  detailButton.addEventListener("click", () => {
    detailPanel.classList.remove("hidden");
  });

  closeDetailButton.addEventListener("click", () => {
    detailPanel.classList.add("hidden");
  });

  closeBubbleButton.addEventListener("click", () => {
    hideBubble();
    // ここでは canShowAgain を戻さない
    // 一度札を外して targetLost になったときだけ再表示可能にする
  });

  langButton.addEventListener("click", () => {
    currentLang = currentLang === "ja" ? "en" : "ja";
    applyLanguage();
  });

  backButton.addEventListener("click", () => {
    window.history.back();
  });
});
