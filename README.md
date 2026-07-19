# SAMO TALK 薩摩白｜官網原始碼

不露臉的動物溝通工作室網站。純靜態 HTML／CSS／JS，沒有任何後端或建置工具，可以直接上傳到 GitHub Pages、Zeabur、Netlify 或任何靜態空間。

## 檔案結構

```
samowhite/
├── index.html                    首頁
├── cases.html                    個案檔案室（12篇個案）
├── articles.html                 好文分享列表
├── article-scent-memory.html     文章：氣味記憶
├── article-territory.html        文章：地盤與安全感
├── article-goodbye.html          文章：告別與安寧
├── 404.html                      找不到頁面時顯示
├── preview.html                  本機整站預覽工具（不用上傳也可以，見下方說明）
├── css/style.css                 共用樣式
├── js/main.js                    共用互動邏輯（語錄機／小測驗／個案篩選）
└── .nojekyll                     告訴 GitHub 不要用 Jekyll 處理這個網站（必須保留）
```

## 一、上傳到 GitHub

1. 到 GitHub 建立一個新的 repository，例如取名 `samowhite`（Public 或 Private 都可以，Private 需要付費方案才能開 Pages）。
2. 把這個資料夾裡「全部檔案」（包含 `.nojekyll`，這種以 `.` 開頭的檔案在 Finder／檔案總管可能被隱藏，記得開啟顯示隱藏檔案）上傳上去。最簡單的方式：

```bash
cd samowhite
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/你的帳號/samowhite.git
git push -u origin main
```

或者直接在 GitHub 網頁上用「Add file → Upload files」把整個資料夾拖上去也可以。

## 二、開啟 GitHub Pages

1. 進 repository 的 **Settings → Pages**
2. Source 選擇 **Deploy from a branch**
3. Branch 選 **main**，資料夾選 **/ (root)**
4. 存檔後等 1–2 分鐘，會出現一個網址，長得像：
   `https://你的帳號.github.io/samowhite/`

這個網址現在就能直接看到完整網站了。

## 三、接上 samotalk.com（買了網域之後才需要做這步）

這個資料夾裡已經放好一個 `CNAME` 檔案，內容是 `samotalk.com`，所以 GitHub 那邊已經準備好了。你只需要在買到網域、開通 Cloudflare 之後，做以下設定：

1. **把網域加進 Cloudflare**：登入 Cloudflare → Add a site → 輸入 `samotalk.com` → 依照畫面指示把 Cloudflare 提供的兩組 Nameserver 填回你買網域的地方（換掉原本網域商給的 Nameserver）。這步驟通常要等幾小時到一天生效。
2. **在 Cloudflare 新增 DNS 記錄**，把網域指到 GitHub Pages：
   - 根網域 `samotalk.com`（不帶 www）：新增 4 筆 **A 記錄**，Name 填 `@`，分別指向這四個 GitHub IP：
     `185.199.108.153`、`185.199.109.153`、`185.199.110.153`、`185.199.111.153`
   - `www.samotalk.com`：新增 1 筆 **CNAME 記錄**，Name 填 `www`，Target 填 `你的帳號.github.io`
   - ⚠️ **這幾筆記錄先設成「僅限 DNS」（灰色雲朵，DNS only），不要開代理（橘色雲朵）**。等下一步 GitHub 把 HTTPS 憑證核發成功之後，再視需求切回橘色雲朵開代理／CDN。一開始就開代理，GitHub 常常沒辦法驗證網域、核發不出憑證。
3. 回到 GitHub repository 的 **Settings → Pages**，Custom domain 欄位填入 `samotalk.com`，存檔。GitHub 會自動偵測到 `CNAME` 檔案。
4. 等網域驗證＋Let's Encrypt 憑證核發完成後（通常幾分鐘到幾小時），勾選 **Enforce HTTPS**。
5. 如果想讓 `www.samotalk.com` 自動導去 `samotalk.com`（或反過來），可以在 Cloudflare 的 **Rules → Redirect Rules** 設一條轉址規則，不需要改網站程式碼。

設定完成後，訪客不管是直接輸入 `samotalk.com`，還是點到 GitHub 給的 `你的帳號.github.io/samowhite/` 連結，都會落在你自己的網址上（GitHub 對綁定過自訂網域的 repository，預設就會把 `.github.io` 網址自動 301 轉址到你設定的 Custom domain，不用額外寫轉址程式碼）。

## 四、上線前記得改的地方

- 全站的網址已經先幫你統一改成 `https://samotalk.com/...`（`canonical`、`og:url`、schema.org 的 `url` 欄位、`CNAME` 檔案都是），如果之後想換別的網域，告訴我新網址，我再幫你一次全部替換。
- `index.html` 申請個案區塊目前是 `mailto:hello@samotalk.com`，這信箱目前還沒真的存在，記得換成你實際會收信的信箱，或之後串 n8n webhook 直接收單。
- 三篇文章 schema 裡的 `datePublished` 目前是 `2026-07-01`，改成實際發布日期。
- 在網域還沒設定好之前，先用 GitHub 給的 `你的帳號.github.io/samowhite/` 網址就能正常瀏覽整個網站；`CNAME` 檔案放著不會影響現在的瀏覽，等網域生效後才會真的生效。

## 五、preview.html 是什麼

`preview.html` 是給你自己在上傳前檢查用的工具頁，不是網站的一部分：
- 在檔案總管裡直接雙擊 `preview.html` 用瀏覽器開啟（不需要架伺服器）
- 上面可以切換首頁／個案／三篇文章／404頁
- 右上角可以切換「桌機／手機」寬度，快速檢查手機排版
- 這個頁面已經設定 `noindex`，就算不小心上傳上去也不會被 Google 收錄，但建議上傳到正式空間時可以不用帶這個檔案。
