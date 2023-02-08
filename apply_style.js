function append_css(file_path) {
    const link = document.createElement("link");
    const head = document.getElementsByTagName("head")[0];
    link.href = chrome.runtime.getURL(file_path);
    link.rel = "stylesheet";
    link.type = "text/css";
    head.appendChild(link);
}

function isFirstStory(novel_no) {
    return novel_no.startsWith("1/");
}

function isLatestStory(novel_no) {
    let spno = novel_no.split("/");
    return spno[0] === spno[1];
}

// 文字サイズ・背景色・フォントをsyncストレージから取得する
// undefinedならデフォルト値が代入される

// 背景色
chrome.storage.sync.get(["background_color"], function (res) {
    const rb = res.background_color;
    bgcolor = (rb === undefined) ? "white" : rb; // white, black, kinari, blue
    const bgcolor_dir = "css/color/";
    const bgcolor_css = bgcolor_dir + bgcolor + ".css";
    append_css(bgcolor_css);
    append_css(bgcolor_dir + "apply_color.css");
});

// 表示調整ボタン
let disp, dispap, w_mul, size, bgcolor, font;
chrome.storage.sync.get(["display_button"], function (res) {
    const rd = res.display_button;
    disp = (rd === undefined) ? "hide" : rd; // display, hide

    // 1要素だけなのでCSSファイル適用しないで直接弄っている
    let toggle = document.getElementsByClassName("toggle");
    if (disp === "hide") {
        toggle[0].style.display = "none";
    } else {
        toggle[0].style.display = "inline";
    }
});

// 前書き・後書き
chrome.storage.sync.get(["display_pref_post"], function (res) {
    const rds = res.display_pref_post;
    dispap = (rds === undefined) ? "displayscript" : rds; // displayscript, hidescript
    const dispap_dir = "css/disp_script/";
    const dispap_css = dispap_dir + dispap + ".css";
    append_css(dispap_css);
});

// 表示幅
chrome.storage.sync.get(["display_width"], function (res) {
    const rw = res.display_width;
    const dw = 730
    // rw   : x1  , x1.25, x1.5
    w_mul = (rw === undefined ? "x1" : rw).substr(1); // 1, 1.25, 1.5
    const width = parseFloat(w_mul) * dw;
    const elements = ["novel_color", "novel_honbun", "novel_p", "novel_a"];
    for (const i of elements) {
        const elem = document.getElementById(i);
        elem.style.width = width.toString() + "px";
    }
});

// 文字サイズ
chrome.storage.sync.get(["font_size"], function (res) {
    const rs = res.font_size;
    size = (rs === undefined) ? "medium" : rs; // small, medium, large, huge
    const size_dir = "css/size/";
    const size_css = size_dir + size + ".css";
    append_css(size_css);
    append_css(size_dir + "apply_size.css");
});

// フォント
chrome.storage.sync.get(["font_style"], function (res) {
    const rf = res.font_style;
    font = (rf === undefined) ? "mincho" : rf; // mincho, gothic
    const font_dir = "css/font/"
    const font_css = font_dir + font + ".css";
    append_css(font_css);
    append_css(font_dir + "apply_font.css");
});

// ページ下部遷移/上部遷移ボタンのテキスト書き換え
document.getElementById("pageBottom").innerText = "▼";
document.getElementById("pageTop").innerText = "▲ ページトップへ";

// これより下、トップページではエラーになる処理だが一番下なので問題ないはず
// 目次/前へ/次へボタンにID付与していじりやすくする
const novel_bn = document.querySelectorAll(".novel_bn a");
const novel_no = document.getElementById("novel_no").innerText;
let id_list = []
if (isFirstStory(novel_no)) {
    id_list = ["upper_next", "lower_next", "table_contents"]
} else if (isLatestStory(novel_no)) {
    id_list = ["upper_back", "lower_back", "table_contents"]
} else {
    id_list = ["upper_back", "upper_next", "lower_back", "lower_next", "table_contents"]
}
for (let i = 0; i < novel_bn.length; i++) {
    novel_bn[i].id = id_list[i];
}
