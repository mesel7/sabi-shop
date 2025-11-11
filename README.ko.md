# <img width="64" height="64" alt="logo192" src="https://github.com/user-attachments/assets/c393121a-5bb1-4012-973d-4802404d010c" /> SABI SHOP – WABI SABI Minimal Coffee Store

**SABI SHOP**은 ‘와비사비(侘び寂び)’ — 고요함과 여백의 아름다움에서 영감을 받은 미니멀 커피 스토어입니다.  
절제된 디자인과 균형 잡힌 레이아웃을 통해 **미니멀한 UX**을 구현했습니다.  

Next.js 16(App Router) 기반의 **다국어 지원(한국어·일본어)**, **상태 관리(Redux Toolkit)**, **Firebase 인증 및 데이터베이스**, **Vercel 배포 자동화**까지 전 과정을 직접 설계·구현했습니다.

---

## 🧭 프로젝트 개요

- **기간:** 2025.10 ~ 2025.11  
- **유형:** Personal Project / Fullstack  
- **담당:** 전체 기능 설계 및 프론트엔드 구현, Firebase 기반 Database 구축, Vercel 배포  

---

## ⚙️ 기술 스택

| 구분 | 기술 스택 |
|------|------------|
| Frontend | HTML5, Tailwind CSS, TypeScript, React (Redux Toolkit), Next.js |
| Backend | Firebase Auth |
| Database | Firebase Firestore |
| Infra & Deployment | Vercel |
| Collaboration & Versioning | GitHub |

---

## ✨ 주요 기능

### 🔐 간편 로그인
이메일과 비밀번호로 간편하게 회원가입 및 로그인할 수 있으며, Firebase Auth를 활용해 안전한 인증 환경을 제공합니다.
<p align="center">
  <img src="https://github.com/user-attachments/assets/51d7af67-2fa7-47eb-8033-0921f5c3998e" width="49%"/>
  &nbsp;&nbsp;
  <img src="https://github.com/user-attachments/assets/dc99b47e-4d1a-4ab3-9f72-277f6a8b932b" width="49%"/>
</p>
<br>

### 🏠 홈 화면
브랜드의 철학과 감성을 담은 홈 화면에서는 대표 원두, 추천 상품, 브랜드 스토리를 확인할 수 있습니다.  
여백 중심의 미니멀한 UI와 따뜻한 색감으로 디자인했습니다.
<p align="center">
  <img src="https://github.com/user-attachments/assets/4394c8b2-1e69-4735-8a90-8c1827abb340" width="49%"/>
  &nbsp;&nbsp;
  <img src="https://github.com/user-attachments/assets/b2c6c7ed-3f59-4262-a398-164ca8663615" width="49%"/>
</p>
<br>

### 🛍️ 상품 목록
카테고리별로 상품을 탐색하고, 최신순·가격순 정렬 및 검색 기능을 제공합니다.  
심플한 카드형 구조로 사용자 친화적인 쇼핑 경험을 제공합니다.
<p align="center">
  <img src="https://github.com/user-attachments/assets/9be8bbae-0ca8-4f80-92f4-7127efe9d937" width="49%"/>
  &nbsp;&nbsp;
  <img src="https://github.com/user-attachments/assets/ef5bcc64-437c-4e88-b0be-5335da72aa3d" width="49%"/>
</p>
<p align="center">
  <img src="https://github.com/user-attachments/assets/2aa2c519-ebe3-43c2-94ea-8034bf317df5" width="49%"/>
  &nbsp;&nbsp;
  <img src="https://github.com/user-attachments/assets/3bb14a08-41a4-40da-8f80-0e974d9712cc" width="49%"/>
</p>
<br>

### ☕ 상품 상세 및 장바구니
상품 상세 페이지에서는 제품 이미지, 설명, 가격 등을 확인할 수 있으며, 장바구니에 담거나 수량을 조정할 수 있습니다.  
Redux를 통한 전역 상태 관리로 장바구니 데이터를 유지합니다.
<p align="center">
  <img src="https://github.com/user-attachments/assets/76161264-1417-408b-a9a8-c358e35d886f" width="49%"/>
  &nbsp;&nbsp;
  <img src="https://github.com/user-attachments/assets/772fb804-7f12-41cb-89b6-9d439a3b8276" width="49%"/>
</p>
<br>

### 💳 결제 및 주문
사용자는 주문 정보를 입력하고 결제 절차를 완료할 수 있습니다.  
Firebase Firestore를 통해 주문 내역이 저장되며, 서버리스 구조로 빠르고 안정적인 트랜잭션을 제공합니다.
<p align="center">
  <img src="https://github.com/user-attachments/assets/8e44f534-9366-4b2e-a97e-cff04f47692e" width="49%"/>
  &nbsp;&nbsp;
  <img src="https://github.com/user-attachments/assets/127e6042-c1fd-4245-9696-9c72cd8c96a1" width="49%"/>
</p>
<br>

### 📦 주문 조회 및 상세 내역
주문 내역 페이지에서 사용자는 과거 주문 목록을 확인하고, 각 주문의 상세 정보를 열람할 수 있습니다.  
Firestore에 저장된 데이터를 기반으로 실시간으로 반영됩니다.
<p align="center">
  <img src="https://github.com/user-attachments/assets/6e5410ad-8612-4b79-8da6-87b22a5d65ce" width="49%"/>
  &nbsp;&nbsp;
  <img src="https://github.com/user-attachments/assets/2366cb32-f11e-47f0-a1d6-12f0b32d51e4" width="49%"/>
</p>

---

## 📎 기타 정보
본 문서는 주요 기능, 구조, 핵심 기술 중심으로 구성되어 있습니다.  
개발 배경 및 문제 해결 과정, 배운 점 등은 [포트폴리오 사이트](https://mesel7.dev/projects/sabi-shop)에서 확인하실 수 있습니다.
