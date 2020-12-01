function append_css(file_path) {
    const link = document.createElement("link");
    const head = document.getElementsByTagName("head")[0];
    link.href = browser.runtime.getURL(file_path);
    link.rel = "stylesheet";
    link.type = "text/css";
    head.appendChild(link);
}

function isFirstStory(novel_no) {
    return novel_no.startsWith("1/");
}

append_css("css/general.css");

// 文字サイズ・背景色・フォントをsyncストレージから取得する
// undefinedならデフォルト値が代入される

// 表示調整ボタン
let disp, dispap, size, bgcolor, font;
browser.storage.sync.get(["display_button"], function (res) {
    const rd = res.display_button;
    disp = (rd != undefined) ? rd : "hide"; // display, hide

    // 1要素だけなのでCSSファイル適用しないで直接弄っている
    let toggle = document.getElementsByClassName("toggle");
    if (disp === "hide") {
        toggle[0].style.display = "none";
    } else {
        toggle[0].style.display = "inline";
    }
});

// 前書き・後書き
browser.storage.sync.get(["display_pref_post"], function (res) {
    const rds = res.display_pref_post;
    dispap = (rds != undefined) ? rds : "hide"; // display, hide
    const dispap_dir = "css/disp_script/";
    const dispap_css = dispap_dir + dispap + ".css";
    append_css(dispap_css);
});

// 文字サイズ
browser.storage.sync.get(["font_size"], function (res) {
    const rs = res.font_size;
    size = (rs === undefined) ? "medium" : rs; // small, medium, large, huge
    const size_dir = "css/size/";
    const size_css = size_dir + size + ".css";
    append_css(size_css);
    append_css(size_dir + "apply_size.css");
});

// 背景色
browser.storage.sync.get(["background_color"], function (res) {
    const rb = res.background_color;
    bgcolor = (rb === undefined) ? "white" : rb; // white, black, kinari, blue
    const bgcolor_dir = "css/color/";
    const bgcolor_css = bgcolor_dir + bgcolor + ".css";
    append_css(bgcolor_css);
    append_css(bgcolor_dir + "apply_color.css");
});

// フォント
browser.storage.sync.get(["font_style"], function (res) {
    const rf = res.font_style;
    font = (rf === undefined) ? "mincho" : rf; // mincho, gothic
    const font_dir = "css/font/"
    const font_css = font_dir + font + ".css";
    append_css(font_css);
    append_css(font_dir + "apply_font.css");
});

// 目次/前へ/次へボタンにID付与していじりやすくする
let novel_bn = document.querySelectorAll(".novel_bn a");
let id_list = []
if (isFirstStory(document.getElementById("novel_no").innerText)) {
    id_list = ["upper_next", "lower_next", "table_contents"]
} else {
    id_list = ["upper_back", "upper_next", "lower_back", "lower_next", "table_contents"]
}
for (let i = 0; i < novel_bn.length; i++) {
    novel_bn[i].id = id_list[i];
}
