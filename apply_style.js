let undefined; // undefined保証

function append_css(file_path) {
    const link = document.createElement("link");
    const head = document.getElementsByTagName("head")[0];
    link.href = file_path;
    link.rel = "stylesheet";
    link.type = "text/css";
    head.appendChild(link);
}

// 文字サイズ・背景色・フォントをsyncストレージから取得する
// undefinedならデフォルト値が代入される
let size, bgcolor, font;
browser.storage.sync.get(["font_size"], function (res) {
    size = (res.font_size !== undefined ? res.font_size : "middle"); // small, middle, large, huge
});
browser.storage.sync.get(["background_color"], function (res) {
    bgcolor = (res.background_color !== undefined ? res.background_color : "white"); // white, black, kinari, blue
});
browser.storage.sync.get(["font_style"], function (res) {
    font = (res.font_style !== undefined ? res.font_style : "mincho"); // mincho, gothic
});

// 設定に依存しないCSS
append_css("./css/general.css")

// 文字サイズ
const size_dir = "./css/size/";
let size_css;
switch (size) {
    case "small":
        size_css = size_dir + "small.css";
    case "middle":
        size_css = size_dir + "middle.css";
    case "large":
        size_css = size_dir + "large.css";
    case "huge":
        size_css = size_dir + "huge.css";
}
append_css(size_css);

// 背景色
const bgcolor_dir = "./css/color/";
let bgcolor_css;
switch (bgcolor) {
    case "white":
        bgcolor_css = bgcolor_dir + "white.css";
    case "black":
        bgcolor_css = bgcolor_dir + "black.css";
    case "kinari":
        bgcolor_css = bgcolor_dir + "kinari.css";
    case "blue":
        bgcolor_css = bgcolor_dir + "blue.css";
}
append_css(bgcolor_css);

// フォント
const font_dir = "./css/font/"
let font_css;
switch (font) {
    case "mincho":
        font_css = font_dir + "mincho.css";
    case "gothic":
        font_css = font_dir + "gothic.css";
}
append_css(font_css);
