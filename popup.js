document.addEventListener("DOMContentLoaded", function () {
    // データ保存
    const display_button = document.getElementById("display_button_container");
    const display_pref_post = document.getElementById("display_pref_post_container");
    const display_width = document.getElementById("display_width_container");
    const font_size = document.getElementById("font_size_container");
    const background_color = document.getElementById("background_color_container");
    const font_style = document.getElementById("font_style_container");

    display_button.addEventListener("click", function () {
        save_settings();
    });
    display_pref_post.addEventListener("click", function () {
        save_settings();
    });
    display_width.addEventListener("click", function () {
        save_settings();
    });
    font_size.addEventListener("click", function () {
        save_settings();
    });
    background_color.addEventListener("click", function () {
        save_settings();
    });
    font_style.addEventListener("click", function () {
        save_settings();
    });

    //データ読込
    window.addEventListener("load", function () {
        const disp_elements = document.getElementById("display_button").display_button;
        const scri_elements = document.getElementById("display_pref_post").display_pref_post;
        const dwid_elements = document.getElementById("display_width").display_width;
        const size_elements = document.getElementById("font_size").font_size;
        const bgcl_elements = document.getElementById("background_color").background_color;
        const font_elements = document.getElementById("font_style").font_style;

        let disp, scri, dwid, size, bgcl, font;
        chrome.storage.sync.get(["display_button"], function (res) {
            const rd = res.display_button;
            disp = (rd != undefined) ? rd : "hide"; // display, hide
            for (let i = 0; i < disp_elements.length; i++) {
                if (disp_elements[i].value == disp) {
                    disp_elements[i].checked = true;
                }
            }
        });
        chrome.storage.sync.get(["display_pref_post"], function (res) {
            const rds = res.display_pref_post;
            scri = (rds != undefined) ? rds : "displayscript"; // displayscript, hidescript
            for (let i = 0; i < scri_elements.length; i++) {
                if (scri_elements[i].value == scri) {
                    scri_elements[i].checked = true;
                }
            }
        });
        chrome.storage.sync.get(["display_width"], function (res) {
            const rw = res.display_width;
            dwid = (rw === undefined) ? "x1" : rw; // x1, x1.25, x1.5
            for (let i = 0; i < dwid_elements.length; i++) {
                if (dwid_elements[i].value == dwid) {
                    dwid_elements[i].checked = true;
                }
            }
        });
        chrome.storage.sync.get(["font_size"], function (res) {
            const rs = res.font_size;
            size = (rs === undefined) ? "medium" : rs; // small, medium, large, huge
            for (let i = 0; i < size_elements.length; i++) {
                if (size_elements[i].value == size) {
                    size_elements[i].checked = true;
                }
            }
        });
        chrome.storage.sync.get(["background_color"], function (res) {
            const rb = res.background_color;
            bgcl = (rb === undefined) ? "white" : rb; // white, black, kinari, blue
            for (let i = 0; i < bgcl_elements.length; i++) {
                if (bgcl_elements[i].value == bgcl) {
                    bgcl_elements[i].checked = true;
                }
            }
        });
        chrome.storage.sync.get(["font_style"], function (res) {
            const rf = res.font_style;
            font = (rf === undefined) ? "mincho" : rf; // mincho, gothic
            for (let i = 0; i < font_elements.length; i++) {
                if (font_elements[i].value == font) {
                    font_elements[i].checked = true;
                    conv_font(font);
                }
            }
        });
    });

    // フォント変更適用
    const gothicdiv = document.getElementById("gothicdiv");
    gothicdiv.addEventListener("click", function () {
        conv_font("gothic");
    });
    const minchodiv = document.getElementById("minchodiv");
    minchodiv.addEventListener("click", function () {
        conv_font("mincho");
    });
});

function save_settings() {
    const disp = document.getElementById("display_button").display_button.value;
    const scri = document.getElementById("display_pref_post").display_pref_post.value;
    const dwid = document.getElementById("display_width").display_width.value;
    const size = document.getElementById("font_size").font_size.value;
    const bgcl = document.getElementById("background_color").background_color.value;
    const font = document.getElementById("font_style").font_style.value;
    const kvobj = {
        display_button: disp,
        display_pref_post: scri,
        display_width: dwid,
        font_size: size,
        background_color: bgcl,
        font_style: font
    };
    chrome.storage.sync.set(kvobj);
}

function conv_font(font_name) {
    const label = document.getElementsByTagName("label");
    const mincho_family = "'游明朝',YuMincho,'ヒラギノ明朝 Pr6N','Hiragino Mincho Pr6N','ヒラギノ明朝 ProN','Hiragino Mincho ProN','ヒラギノ明朝 StdN','Hiragino Mincho StdN',HiraMinProN-W3,'HGS明朝B','HG明朝B',dcsymbols,'Helvetica Neue',Helvetica,Arial,'ヒラギノ角ゴ Pr6N','Hiragino Kaku Gothic Pr6N','ヒラギノ角ゴ ProN','Hiragino Kaku Gothic ProN','ヒラギノ角ゴ StdN','Hiragino Kaku Gothic StdN','Segoe UI',Verdana,'メイリオ',Meiryo,sans-serif";
    const gothic_family = "'Helvetica Neue',Helvetica,Arial,'ヒラギノ角ゴ Pr6N','Hiragino Kaku Gothic Pr6N','ヒラギノ角ゴ ProN','Hiragino Kaku Gothic ProN','ヒラギノ角ゴ StdN','Hiragino Kaku Gothic StdN','Segoe UI',Verdana,'メイリオ',Meiryo,sans-serif";
    for (let tag = 0; tag < label.length - 2; tag++) {
        let font_name_temp;
        if (font_name == "mincho") {
            font_name_temp = mincho_family;
        } else if (font_name == "gothic") {
            font_name_temp = gothic_family;
        }
        label[tag].style.fontFamily = font_name_temp;
    };
}

// function check_pass() {
//     const checkspan = document.getElementById("check");
//     checkspan.style.color = "#009900";
//     checkspan.textContent = " ✓ 保存しました";
// }
