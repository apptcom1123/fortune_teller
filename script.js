const viewFortuneButton = document.getElementById("viewFortune");
const backButton = document.getElementById("back");
const homePage = document.getElementById("home");
const imagePage = document.getElementById("image");
const fortuneImage = document.getElementById("fortuneImage");
const englishDescription = document.getElementById("englishDescription");
const chineseDescription = document.getElementById("chineseDescription");
const languageToggle = document.getElementById("languageToggle");

// 切換語言功能
let isEnglish = true;
languageToggle.addEventListener("click", () => {
  isEnglish = !isEnglish;
  englishDescription.style.display = isEnglish ? "block" : "none";
  chineseDescription.style.display = isEnglish ? "none" : "block";
  languageToggle.innerText = isEnglish ? "中文" : "English";
  viewFortuneButton.innerText = isEnglish ? "View Fortune" : "查看命運"; // 更新 "View Fortune" 按鈕文字
  backButton.innerText = isEnglish ? "Back" : "返回"; // 更新 "Back" 按鈕文字
});

// 定義 emoji 範圍
const emojiRanges = [
  [0x1f600, 0x1f64f], // 表情符號
  [0x1f300, 0x1f5ff], // 各種符號和物件
  [0x1f680, 0x1f6ff], // 交通和地圖符號
  [0x2600, 0x26ff], // 雜項符號
  [0x1f330, 0x1f37f], // 食物和飲料
  [0x1f380, 0x1f3ff], // 慶祝和活動
  [0x1f400, 0x1f4ff], // 動物、自然和物件
  [0x1f900, 0x1f9ff], // 補充符號和象形文字
];

// 生成隨機的命運
function generateFortune() {
  const grid = Array.from({ length: 4 }, () => Array(4).fill("　")); // 使用全形空格
  const numIcons = Math.floor(Math.random() * 4) + 1; // 隨機 1-4 個圖示

  const positions = getRandomPositions(numIcons);
  positions.forEach(([row, col]) => {
    grid[row][col] = getRandomIcon();
  });

  // 將格線轉換為 HTML 表格
  const tableHTML = `
        <table class="fortune-grid">
            ${grid
              .map(
                (row) => `
                <tr>
                    ${row.map((cell) => `<td>${cell}</td>`).join("")}
                </tr>
            `,
              )
              .join("")}
        </table>
    `;
  fortuneImage.innerHTML = tableHTML;
}

// 隨機座標函數保持不變
function getRandomPositions(num) {
  const positions = new Set();
  while (positions.size < num) {
    const row = Math.floor(Math.random() * 4);
    const col = Math.floor(Math.random() * 4);
    positions.add(`${row},${col}`);
  }
  return Array.from(positions).map((pos) => pos.split(",").map(Number));
}

// 修改隨機圖示函數
function getRandomIcon() {
  let emoji;
  let isValid = false;

  while (!isValid) {
    const range = emojiRanges[Math.floor(Math.random() * emojiRanges.length)];
    const codePoint =
      Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];
    emoji = String.fromCodePoint(codePoint);

    // 確保生成的是有效的 emoji
    isValid = emoji.length > 0 && emoji.trim() !== "";
  }

  return emoji;
}

// 按鈕功能
viewFortuneButton.addEventListener("click", () => {
  homePage.style.display = "none";
  imagePage.style.display = "block";
  generateFortune();
});

backButton.addEventListener("click", () => {
  imagePage.style.display = "none";
  homePage.style.display = "block";
});
