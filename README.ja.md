# <img width="64" height="64" alt="logo192" src="https://github.com/user-attachments/assets/c393121a-5bb1-4012-973d-4802404d010c" /> SABI SHOP – WABI SABI Minimal Coffee Store

**SABI SHOP**は、「侘び寂び」 —— 静けさと余白の美しさから着想を得た、**ミニマルなコーヒーストア**です。  
**抑えたデザイン**と**バランスの取れたレイアウト**によって、**ミニマルなUX**を実現しました。  

**Next.js 16 (App Router)** をベースに、**多言語対応（韓国語・日本語）**、**状態管理（Redux Toolkit）**、**Firebaseによる認証とデータベース**、**Vercelによる自動デプロイ**まで、**全工程を自ら設計・実装しました。**

---

## 🧭 プロジェクト概要

- **期間:** 2025.10 ~ 2025.11  
- **タイプ:** Personal Project / Fullstack  
- **担当:** 全機能の設計・フロントエンド実装、Firebaseを用いたバックエンド構築、Vercel デプロイ  

---

## ⚙️ 技術スタック

| 区分 | 技術スタック |
|------|------------|
| Frontend | HTML5, Tailwind CSS, TypeScript, React (Redux Toolkit), Next.js |
| Backend | Firebase Auth |
| Database | Firebase Firestore |
| Infra & Deployment | Vercel |
| Collaboration & Versioning | GitHub |

---

## ✨ 主な機能

### 🔐 簡単ログイン
メールアドレスとパスワードで簡単に新規登録・ログインができます。  
**Firebase Auth** を活用し、安全で信頼性の高い認証環境を提供しています。
<p align="center">
  <img src="https://github.com/user-attachments/assets/f7caba3d-9c80-4b82-8a1d-6a6812dbfb66" width="49%"/>
  &nbsp;&nbsp;
  <img src="https://github.com/user-attachments/assets/50ee6cb8-c304-4c3c-8057-e780314fb4aa" width="49%"/>
</p>
<br>

### 🏠 ホーム画面
ブランドの哲学と世界観を表現したホーム画面では、代表的なコーヒー豆やおすすめ商品、ブランドストーリーを確認できます。  
余白を活かしたミニマルなUIと温かみのある配色でデザインされています。
<p align="center">
  <img src="https://github.com/user-attachments/assets/74443232-96fc-4a16-b4c4-9fdcd253335a" width="49%"/>
  &nbsp;&nbsp;
  <img src="https://github.com/user-attachments/assets/5d5dcde7-049b-4896-a86a-40d2fa1bd3dc" width="49%"/>
</p>
<br>

### 🛍️ 商品一覧
カテゴリーごとに商品を閲覧でき、**新着順・価格順** の並び替えや検索機能にも対応しています。  
シンプルなカード型レイアウトで、ユーザーにとって直感的で快適なショッピング体験を提供します。
<p align="center">
  <img src="https://github.com/user-attachments/assets/8c874904-c93b-428f-a3de-5336f88e0325" width="49%"/>
  &nbsp;&nbsp;
  <img src="https://github.com/user-attachments/assets/814848ad-70d0-4c6b-a7e9-12fe69319487" width="49%"/>
</p>
<p align="center">
  <img src="https://github.com/user-attachments/assets/fc668eaa-ef96-49f2-9b7c-e14b4c2b57bc" width="49%"/>
  &nbsp;&nbsp;
  <img src="https://github.com/user-attachments/assets/81d778f8-3376-4d7a-9f0c-1d20046ed803" width="49%"/>
</p>
<br>

### ☕ 商品詳細とカート機能
商品詳細ページでは、画像・説明・価格などを確認し、カートに追加したり数量を変更することができます。  
**Redux** によるグローバル状態管理で、カートデータが常に維持されます。
<p align="center">
  <img src="https://github.com/user-attachments/assets/3bac1411-94d7-49ac-8f89-b638de1614b2" width="49%"/>
  &nbsp;&nbsp;
  <img src="https://github.com/user-attachments/assets/88e9f8b4-1cc5-42d4-968b-fcdc74e82760" width="49%"/>
</p>
<br>

### 💳 決済と注文
ユーザーは注文情報を入力し、決済を完了できます。  
**Firebase Firestore** に注文履歴が保存され、サーバーレス構成によって高速かつ安定したトランザクションを実現しています。
<p align="center">
  <img src="https://github.com/user-attachments/assets/b5d6c943-3752-4edd-b5f0-6eefcea83ccd" width="49%"/>
  &nbsp;&nbsp;
  <img src="https://github.com/user-attachments/assets/e735b26c-a7bc-418c-bc82-9caa12e2fe6c" width="49%"/>
</p>
<br>

### 📦 注文履歴と詳細
注文履歴ページでは、過去の注文一覧を確認し、それぞれの詳細情報を閲覧できます。  
**Firestore** に保存されたデータをもとに、リアルタイムで反映されます。
<p align="center">
  <img src="https://github.com/user-attachments/assets/86458b34-f08d-4077-9e49-51ff81e6bf43" width="49%"/>
  &nbsp;&nbsp;
  <img src="https://github.com/user-attachments/assets/74419d8c-3862-4431-9925-b547353911d9" width="49%"/>
</p>

---

## 📎 その他の情報
本ドキュメントでは、主要機能・構成・技術的な要点を中心に紹介しております。  
開発背景、課題解決の過程、学びの内容などについては、[ポートフォリオサイト](https://mesel7.dev/projects/sabi-shop)にてご覧いただけます。
