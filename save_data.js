document.addEventListener("DOMContentLoaded", function () {
    const save_data = document.getElementById("save_data");
    save_data.addEventListener("click", function () {
        const size = document.getElementById("font_size").font_size.value;
        const bgcl = document.getElementById("background_color").background_color.value;
        const font = document.getElementById("font_style").font_style.value;

        const kvobj = {
            font_size: size,
            background_color: bgcl,
            font_style: font
        }
        browser.storage.sync.set(kvobj, check_pass());
    });
});

function check_pass() {
    const checkspan = document.getElementById("check");
    checkspan.style.color = "#009900";
    checkspan.textContent = " ✓ 保存しました";
}
