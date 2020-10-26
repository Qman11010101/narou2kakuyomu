// 自作表示調整ボタン生成
let display_button = document.createElement("div");
let header = document.getElementById("novel_header");
display_button.textContent = "表示調整";
display_button.id = "novelnavi_right_alter"
header.appendChild(display_button);

// CSS上書き
let link = document.createElement("link");
let head = document.getElementsByTagName("head")[0];
link.href = "css/narou-kinari.css";
link.rel = "stylesheet";
link.type = "text/css";
head.appendChild(link);
