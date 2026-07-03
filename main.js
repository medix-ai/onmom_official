/* 온맘 랜딩 · 인터랙션 (의존성 없음) */
(function () {
  "use strict";

  /* ---- 1. 스크롤 리빌 ---- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- 2. 헤더 그림자 + 하단 고정 CTA ---- */
  var header = document.getElementById("siteHeader");
  var sticky = document.getElementById("stickyCta");
  var apply = document.getElementById("apply");
  var hero = document.querySelector(".hero");

  function onScroll() {
    var y = window.pageYOffset || document.documentElement.scrollTop;
    if (header) header.classList.toggle("scrolled", y > 8);

    // 히어로를 지나면 노출, 신청 폼이 보이면 숨김
    if (sticky && hero) {
      var pastHero = y > hero.offsetHeight - 120;
      var applyTop = apply ? apply.getBoundingClientRect().top : Infinity;
      var applyVisible = applyTop < window.innerHeight * 0.85;
      sticky.classList.toggle("show", pastHero && !applyVisible);
    }
  }
  var ticking = false;
  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        window.requestAnimationFrame(function () { onScroll(); ticking = false; });
        ticking = true;
      }
    },
    { passive: true }
  );
  onScroll();

  /* ---- 3. S3 인포그래픽 점 (10칸 중 비율 채우기) ---- */
  document.querySelectorAll(".dots").forEach(function (grid) {
    var fill = parseFloat(grid.getAttribute("data-fill")) || 0; // 채울 개수 (0~10)
    for (var i = 0; i < 10; i++) {
      var d = document.createElement("span");
      var isFilled = i < Math.round(fill);
      d.style.width = "100%";
      d.style.paddingTop = "100%";
      d.style.borderRadius = "50%";
      d.style.background = isFilled ? "var(--coral)" : "var(--coral-tint-2)";
      grid.appendChild(d);
    }
  });

  /* ---- 4. 사전신청 폼 → 구글 시트 수집 ---- */
  // 구글 Apps Script 웹앱 URL. (아래 값을 배포한 웹앱 주소로 교체)
  var LAUNCH_ENDPOINT = "https://script.google.com/macros/s/AKfycbz8YCy3-9GvN7q-ADBIrx-XMaWqWRJa9QZ5vxbHvpNburgi_hsRJB0cFmcFtVbF8p6U/exec";

  var form = document.getElementById("applyForm");
  var msg = document.getElementById("formMsg");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = form.email.value.trim();
      var consent = form.consent.checked;
      var valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!valid) {
        setMsg("올바른 이메일 주소를 입력해주세요.", "err");
        form.email.focus();
        return;
      }
      if (!consent) {
        setMsg("개인정보 수집·이용 동의가 필요합니다.", "err");
        return;
      }

      var btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.disabled = true; }
      try { localStorage.setItem("onmom_launch_alert", email); } catch (_) {}

      // 구글 시트로 전송 (no-cors: 응답은 못 읽지만 기록은 됨)
      if (LAUNCH_ENDPOINT) {
        var body = new URLSearchParams({
          email: email,
          ua: navigator.userAgent,
          ref: location.href
        });
        fetch(LAUNCH_ENDPOINT, { method: "POST", mode: "no-cors", body: body })
          .catch(function () {});
      }

      setMsg("출시 알림 신청이 완료되었어요. 앱이 나오면 가장 먼저 알려드릴게요.", "ok");
      form.reset();
      if (btn) { setTimeout(function () { btn.disabled = false; }, 1500); }
    });
  }
  function setMsg(text, kind) {
    if (!msg) return;
    msg.textContent = text;
    msg.className = "form-msg " + kind;
  }
})();
