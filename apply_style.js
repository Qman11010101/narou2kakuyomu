// CSS上書き
const link = document.createElement("link");
const head = document.getElementsByTagName("head")[0];
link.href = "css/narou-kinari.css";
link.rel = "stylesheet";
link.type = "text/css";
head.appendChild(link);
