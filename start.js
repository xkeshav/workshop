var $lsnuL$express = require("express");
var $lsnuL$path = require("path");

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
/* eslint-disable no-undef */ 

var $43d7963e56408b24$var$__dirname = "";
const $43d7963e56408b24$var$app = (0, ($parcel$interopDefault($lsnuL$express)))();
const $43d7963e56408b24$var$BASE_DIR = (0, ($parcel$interopDefault($lsnuL$path))).join($43d7963e56408b24$var$__dirname, "src");
const $43d7963e56408b24$var$HTML_DIR = (0, ($parcel$interopDefault($lsnuL$path))).join($43d7963e56408b24$var$BASE_DIR, "html");
const $43d7963e56408b24$var$port = 3000;
//console.log({ BASE_DIR, HTML_DIR });
const $43d7963e56408b24$var$router = (0, ($parcel$interopDefault($lsnuL$express))).Router();
$43d7963e56408b24$var$app.use((_, res, next)=>{
    let now = new Date();
    console.log("Time: ", now.toUTCString());
    next();
});
$43d7963e56408b24$var$router.get("/", (_, res)=>{
    res.sendFile(`${$43d7963e56408b24$var$HTML_DIR}/index.html`);
});
$43d7963e56408b24$var$router.get("/index", (_, res)=>{
    res.sendFile(`${$43d7963e56408b24$var$HTML_DIR}/index.html`);
});
$43d7963e56408b24$var$router.get("/css", (_, res)=>{
    res.sendFile(`${$43d7963e56408b24$var$HTML_DIR}/css1-color.html`);
});
$43d7963e56408b24$var$router.get("/named", (_, res)=>{
    res.sendFile(`${$43d7963e56408b24$var$HTML_DIR}/named-color.html`);
});
$43d7963e56408b24$var$router.get("/mix", (_, res)=>{
    res.sendFile(`${$43d7963e56408b24$var$HTML_DIR}/color-mix.html`);
});
$43d7963e56408b24$var$router.get("/wall", (_, res)=>{
    res.sendFile(`${$43d7963e56408b24$var$HTML_DIR}/color-wall.html`);
});
$43d7963e56408b24$var$router.get("/space", (_, res)=>{
    res.sendFile(`${$43d7963e56408b24$var$HTML_DIR}/color-space.html`);
});
$43d7963e56408b24$var$router.get("/relative", (_, res)=>{
    res.sendFile(`${$43d7963e56408b24$var$HTML_DIR}/relative-color.html`);
});
$43d7963e56408b24$var$router.get("/syntax", (_, res)=>{
    res.sendFile(`${$43d7963e56408b24$var$HTML_DIR}/color-syntax.html`);
});
$43d7963e56408b24$var$router.get("/hsl", (_, res)=>{
    res.sendFile(`${$43d7963e56408b24$var$HTML_DIR}/hsl.html`);
});
// error handling middleware
$43d7963e56408b24$var$app.use((err, req, res, next)=>{
    console.error(err.stack);
    res.status(500).send("Something broke!");
});
$43d7963e56408b24$var$app.use("/", (0, ($parcel$interopDefault($lsnuL$express))).static($43d7963e56408b24$var$BASE_DIR));
$43d7963e56408b24$var$app.use("/", $43d7963e56408b24$var$router);
$43d7963e56408b24$var$app.listen($43d7963e56408b24$var$port, ()=>{
    console.log(" listening port " + $43d7963e56408b24$var$port);
});


//# sourceMappingURL=start.js.map
