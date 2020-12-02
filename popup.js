document.addEventListener("DOMContentLoaded", function () {
    // データ保存
    const save_data = document.getElementById("save_data");
    save_data.addEventListener("click", function () {
        const disp = document.getElementById("display_button").display_button.value;
        const scri = document.getElementById("display_pref_post").display_pref_post.value;
        const size = document.getElementById("font_size").font_size.value;
        const bgcl = document.getElementById("background_color").background_color.value;
        const font = document.getElementById("font_style").font_style.value;
        const kvobj = {
            display_button: disp,
            display_pref_post: scri,
            font_size: size,
            background_color: bgcl,
            font_style: font
        };
        browser.storage.sync.set(kvobj, check_pass());
    });

    //データ読込
    const load_data = document.getElementById("load_data");
    load_data.addEventListener("click", function () {
        const disp_elements = document.getElementById("display_button").display_button;
        const scri_elements = document.getElementById("display_pref_post").display_pref_post;
        const size_elements = document.getElementById("font_size").font_size;
        const bgcl_elements = document.getElementById("background_color").background_color;
        const font_elements = document.getElementById("font_style").font_style;

        let disp, scri, size, bgcl, font;
        browser.storage.sync.get(["display_button"], function (res) {
            const rd = res.display_button;
            disp = (rd != undefined) ? rd : "hide"; // display, hide
            for (let i = 0; i < disp_elements.length; i++) {
                //alert(disp_elements[i].value);
            }
        });
        browser.storage.sync.get(["display_pref_post"], function (res) {
            const rds = res.display_pref_post;
            scri = (rds != undefined) ? rds : "hide"; // display, hide

        });
        browser.storage.sync.get(["font_size"], function (res) {
            const rs = res.font_size;
            size = (rs === undefined) ? "medium" : rs; // small, medium, large, huge

        });
        browser.storage.sync.get(["background_color"], function (res) {
            const rb = res.background_color;
            bgcl = (rb === undefined) ? "white" : rb; // white, black, kinari, blue

        });
        browser.storage.sync.get(["font_style"], function (res) {
            const rf = res.font_style;
            font = (rf === undefined) ? "mincho" : rf; // mincho, gothic

        });
    });
    // フォント変更適用
    const gothicdiv = document.getElementById("gothicdiv");
    gothicdiv.addEventListener("click", function () {
        const label = document.getElementsByTagName("label");
        for (let tag = 0; tag < label.length - 2; tag++) { // 最後の2つが「明朝」「ゴシック」の選択肢であるためその手前で変更を止めることでなんとかしている。代償にこれ以上は下にlabelを入れられなくなった。丁寧にやるならifでid見るべきか？
            label[tag].style.fontFamily = "'Helvetica Neue',Helvetica,Arial,'ヒラギノ角ゴ Pr6N','Hiragino Kaku Gothic Pr6N','ヒラギノ角ゴ ProN','Hiragino Kaku Gothic ProN','ヒラギノ角ゴ StdN','Hiragino Kaku Gothic StdN','Segoe UI',Verdana,'メイリオ',Meiryo,sans-serif";
        };
    });
    const minchodiv = document.getElementById("minchodiv");
    minchodiv.addEventListener("click", function () {
        const label = document.getElementsByTagName("label");
        for (let tag = 0; tag < label.length - 2; tag++) { // 同上
            label[tag].style.fontFamily = "'游明朝',YuMincho,'ヒラギノ明朝 Pr6N','Hiragino Mincho Pr6N','ヒラギノ明朝 ProN','Hiragino Mincho ProN','ヒラギノ明朝 StdN','Hiragino Mincho StdN',HiraMinProN-W3,'HGS明朝B','HG明朝B',dcsymbols,'Helvetica Neue',Helvetica,Arial,'ヒラギノ角ゴ Pr6N','Hiragino Kaku Gothic Pr6N','ヒラギノ角ゴ ProN','Hiragino Kaku Gothic ProN','ヒラギノ角ゴ StdN','Hiragino Kaku Gothic StdN','Segoe UI',Verdana,'メイリオ',Meiryo,sans-serif";
        };
    });
});

function check_pass() {
    const checkspan = document.getElementById("check");
    checkspan.style.color = "#009900";
    checkspan.textContent = " ✓ 保存しました";
}
