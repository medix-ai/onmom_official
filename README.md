# 온맘 (Onmom) — 랜딩 페이지

AI 기반 지역사회 산후 회복 플랫폼 · 원페이지 스크롤형 랜딩 (모바일 우선)

## 구성

| 파일 | 설명 |
|---|---|
| `index.html` | 전체 페이지 (S1~S13 섹션) |
| `styles.css` | Toss 스타일 디자인 토큰 · 반응형 |
| `main.js` | 스크롤 리빌 · 고정 CTA · 사전신청 폼 (의존성 없음) |
| `onmom_logo.png` | 로고 |

빌드 과정 없음 — `index.html`을 브라우저로 바로 열면 됩니다.

## 로컬 미리보기

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## GitHub Pages 배포

1. 이 저장소를 GitHub에 push.
2. **Settings → Pages → Source: `Deploy from a branch`**, Branch: `main` / `/root` 선택.
3. 몇 분 뒤 `https://<계정>.github.io/onmom_official/` 에서 확인.

정적 파일이 루트에 있어 별도 설정이 필요 없습니다.

## 이후 채울 것 (TODO)

- **앱 스크린샷**: 현재 빈 휴대폰 목업(`.phone`)에 실제 캡처 삽입.
  `index.html`에서 `<div class="phone" data-screen="...">`를 `<img>`로 교체.
- **사전신청 폼 연동**: `main.js`의 폼 submit 핸들러(현재 localStorage 저장만)를
  실제 수집 엔드포인트(구글 시트/폼, 이메일 등)로 연결. (`// TODO` 주석 참고)
- **개인정보 처리방침** 링크(현재 `#`).
- 히어로 헤드라인 최종 택1, 지역 근거 수치 출처 확인 (계획안 §7).
