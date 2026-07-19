# 個案照片資料夾

把每隻動物的照片放進這個資料夾，**檔名要完全對應下面的清單**（英文小寫、.jpg），
上傳後首頁和個案檔案室會自動顯示，不用改任何程式碼。

| 個案 | 需要的檔名 |
|---|---|
| 偷偷 | `toutou.jpg` |
| 小畢 | `xiaobi.jpg` |
| 阿臉 | `alian.jpg` |
| 珠珠 | `zhuzhu.jpg` |
| Biron | `biron.jpg` |
| Killua | `killua.jpg` |
| 咪咪 | `mimi.jpg` |
| 奴比 | `nubi.jpg` |
| 丁丁 | `dingding.jpg` |
| Qbi | `qbi.jpg` |
| Cony | `cony.jpg` |
| Mio 咪歐 | `mio.jpg` |

## 照片建議

- **正方形**、至少 400×400px，畫面會自動裁成圓形，建議動物臉／主體放在照片正中央
- 檔案大小盡量壓在 500KB 以內，網站才不會被拖慢（可以用 [squoosh.app](https://squoosh.app) 免費壓縮）
- 檔名一定要跟上表一模一樣，包含**全部小寫**，如果拼錯或漏放，該篇個案會自動顯示一個柔和的🐾佔位圖案，不會壞版面，但也不會顯示照片

## 怎麼上傳

**方法一：GitHub 網頁直接拖曳**
1. 打開你的 repository，進到 `images/cases/` 這個資料夾
2. 點「Add file → Upload files」，把 12 張（或你目前有的幾張）圖片拖進去
3. 檔名記得改成上表對應的名稱再上傳
4. Commit，等 GitHub Pages 重新部署（通常1-2分鐘）就會顯示在網站上

**方法二：本機 git**
```bash
cp 你的照片路徑/toutou.jpg images/cases/
git add images/cases/
git commit -m "新增個案照片"
git push
```

沒有照片的個案完全沒關係，先不放就好，網站會自動用🐾佔位圖案代替，之後有照片再補上傳即可，不影響網站正常運作。
