document.addEventListener("DOMContentLoaded", function () {
    const save_data = document.getElementById("save_data");
    save_data.addEventListener("click", function () {
        const disp = document.getElementById("display_button").display_button.value;
        const size = document.getElementById("font_size").font_size.value;
        const bgcl = document.getElementById("background_color").background_color.value;
        const font = document.getElementById("font_style").font_style.value;
        const kvobj = {
            display_button: disp,
            font_size: size,
            background_color: bgcl,
            font_style: font
        };
        browser.storage.sync.set(kvobj, check_pass());
    });
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
