function append_css(file_path) {
    const link = document.createElement("link");
    const head = document.getElementsByTagName("head")[0];
    link.href = browser.runtime.getURL(file_path);
    link.rel = "stylesheet";
    link.type = "text/css";
    head.appendChild(link);
}

// append_css("css/constant.css");

// 文字サイズ・背景色・フォントをsyncストレージから取得する
// undefinedならデフォルト値が代入される

// 表示調整ボタン
let disp, size, bgcolor, font;
browser.storage.sync.get(["display_button"], function (res) {
    
    let rd = res.display_button;
    disp = (rd != undefined) ? rd : "hide"; // display, hide
    // const disp_dir = "./css/button/";
    // let disp_css;
    // switch (disp) {
    //     case "display":
    //         disp_css = disp_dir + "display.css";
    //     case "hide":
    //         disp_css = disp_dir + "hide.css";
    //     default:
    //         disp_css = disp_dir + "hide.css";
    // }
    // append_css(disp_css);
});

// 文字サイズ
browser.storage.sync.get(["font_size"], function (res) {
    let rs = res.font_size;
    size = (rs != undefined) ? rs : "middle"; // small, middle, large, huge
    // const size_dir = "./css/size/";
    // let size_css;
    // switch (size) {
    //     case "small":
    //         size_css = size_dir + "small.css";
    //     case "middle":
    //         size_css = size_dir + "middle.css";
    //     case "large":
    //         size_css = size_dir + "large.css";
    //     case "huge":
    //         size_css = size_dir + "huge.css";
    // }
    // append_css(size_css);
});

// 背景色
browser.storage.sync.get(["background_color"], function (res) {
    let rb = res.background_color;
    bgcolor = (rb != undefined) ? rb : "white"; // white, black, kinari, blue
    const bgcolor_dir = "css/color/";
    let bgcolor_css = bgcolor_dir + bgcolor + ".css";
    append_css(bgcolor_css);
    append_css("css/finalize.css");
});
browser.storage.sync.get(["font_style"], function (res) {
    // フォント
    let rf = res.font_style;
    font = (rf != undefined) ? rf : "mincho"; // mincho, gothic
    // const font_dir = "./css/font/"
    // let font_css;
    // switch (font) {
    //     case "mincho":
    //         font_css = font_dir + "mincho.css";
    //     case "gothic":
    //         font_css = font_dir + "gothic.css";
    // }
    // append_css(font_css);
});
