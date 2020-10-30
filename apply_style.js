function append_css(file_path) {
    const link = document.createElement("link");
    const head = document.getElementsByTagName("head")[0];
    link.href = browser.runtime.getURL(file_path);
    link.rel = "stylesheet";
    link.type = "text/css";
    head.appendChild(link);
}


// 文字サイズ・背景色・フォントをsyncストレージから取得する
// undefinedならデフォルト値が代入される

// 表示調整ボタン
let disp, size, bgcolor, font;
browser.storage.sync.get(["display_button"], function (res) {
    const rd = res.display_button;
    disp = (rd != undefined) ? rd : "hide"; // display, hide

    // 1要素だけなのでCSSファイル適用しないで直接弄っている
    let toggle = document.getElementsByClassName("toggle");
    if (disp == "hide"){
        toggle[0].style.display = "none";
    } else {
        toggle[0].style.display = "inline";
    }
});

// 文字サイズ
browser.storage.sync.get(["font_size"], function (res) {
    const rs = res.font_size;
    size = (rs != undefined) ? rs : "medium"; // small, medium, large, huge
    const size_dir = "./css/size/";
    const size_css = size_dir + size + ".css";
    append_css(size_css);
    append_css(size_dir + "apply_size.css");
});

// 背景色
browser.storage.sync.get(["background_color"], function (res) {
    const rb = res.background_color;
    bgcolor = (rb != undefined) ? rb : "white"; // white, black, kinari, blue
    const bgcolor_dir = "css/color/";
    const bgcolor_css = bgcolor_dir + bgcolor + ".css";
    append_css(bgcolor_css);
    append_css(bgcolor_dir + "apply_color.css");
});

// フォント
browser.storage.sync.get(["font_style"], function (res) {
    const rf = res.font_style;
    font = (rf != undefined) ? rf : "mincho"; // mincho, gothic
    const font_dir = "css/font/"
    const font_css = font_dir + font + ".css";
    append_css(font_css);
    append_css(font_dir + "apply_font.css");
});
