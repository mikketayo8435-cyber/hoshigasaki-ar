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

  function fadeInSpirit() {
    let opacity = 0;
    const timer = setInterval(() => {
      opacity += 0.08;
      spiritPlane.setAttribute("opacity", Math.min(opacity, 1));
      if (opacity >= 1) clearInterval(timer);
    }, 40);
  }

  applyLanguage();

  startButton.addEventListener("click", async () => {
    loading.classList.add("hidden");
    arScene.classList.remove("hidden");

    try {
      const mindarSystem = arScene.systems["mindar-image-system"];
      if (mindarSystem) {
        await mindarSystem.start();
      }
    } catch (error) {
      alert("ARの起動に失敗しました。READMEの手順で hoshigasaki.mind を配置したか確認してください。");
      console.error(error);
    }
  });

  markerTarget.addEventListener("targetFound", () => {
    if (!hasShownBubble) {
      hasShownBubble = true;
      fadeInSpirit();
      showBubble();
    }
  });

  detailButton.addEventListener("click", () => {
    detailPanel.classList.remove("hidden");
  });

  closeDetailButton.addEventListener("click", () => {
    detailPanel.classList.add("hidden");
  });

  closeBubbleButton.addEventListener("click", () => {
    hideBubble();
  });

  langButton.addEventListener("click", () => {
    currentLang = currentLang === "ja" ? "en" : "ja";
    applyLanguage();
  });

  backButton.addEventListener("click", () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      loading.classList.remove("hidden");
    }
  });

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js").catch(console.error);
    });
  }
});
