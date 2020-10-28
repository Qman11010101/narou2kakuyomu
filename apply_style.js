// 保存された値のロード(デフォルト値つき)
const kvobj = browser.storage.sync.get({
    font_size: "middle",
    background_color: "white",
    font_style: "gothic"
}); //全部undefined返してくる

const size = kvobj.font_size;
const bgcolor = kvobj.background_color;
const font = kvobj.font_style;

// CSS上書き
const link = document.createElement("link");
const head = document.getElementsByTagName("head")[0];
link.href = "css/narou-kinari.css";
link.rel = "stylesheet";
link.type = "text/css";
head.appendChild(link);
