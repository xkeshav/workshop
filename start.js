import $im0Rw$express from "express";
import $im0Rw$path, {dirname as $im0Rw$dirname} from "path";
import {fileURLToPath as $im0Rw$fileURLToPath} from "url";

/* eslint-disable no-undef */ 



const $747425b437e121da$var$__filename = (0, $im0Rw$fileURLToPath)("file:///index.js");
const $747425b437e121da$var$__dirname = (0, $im0Rw$dirname)($747425b437e121da$var$__filename);
// @ts-ignore
//const { __dirname } = fileDirName();
const $747425b437e121da$var$app = (0, $im0Rw$express)();
const $747425b437e121da$var$BASE_DIR = (0, $im0Rw$path).join($747425b437e121da$var$__dirname, "src");
const $747425b437e121da$var$HTML_DIR = (0, $im0Rw$path).join($747425b437e121da$var$BASE_DIR, "html");
const $747425b437e121da$var$port = 3000;
//console.log({ BASE_DIR, HTML_DIR });
const $747425b437e121da$var$router = (0, $im0Rw$express).Router();
$747425b437e121da$var$app.use((_, res, next)=>{
    let now = new Date();
    console.log("Time: ", now.toUTCString());
    next();
});
$747425b437e121da$var$router.get("/", (_, res)=>{
    res.sendFile(`${$747425b437e121da$var$HTML_DIR}/index.html`);
});
$747425b437e121da$var$router.get("/index", (_, res)=>{
    res.sendFile(`${$747425b437e121da$var$HTML_DIR}/index.html`);
});
$747425b437e121da$var$router.get("/css", (_, res)=>{
    res.sendFile(`${$747425b437e121da$var$HTML_DIR}/css1-color.html`);
});
$747425b437e121da$var$router.get("/named", (_, res)=>{
    res.sendFile(`${$747425b437e121da$var$HTML_DIR}/named-color.html`);
});
$747425b437e121da$var$router.get("/mix", (_, res)=>{
    res.sendFile(`${$747425b437e121da$var$HTML_DIR}/color-mix.html`);
});
$747425b437e121da$var$router.get("/wall", (_, res)=>{
    res.sendFile(`${$747425b437e121da$var$HTML_DIR}/color-wall.html`);
});
$747425b437e121da$var$router.get("/space", (_, res)=>{
    res.sendFile(`${$747425b437e121da$var$HTML_DIR}/color-space.html`);
});
$747425b437e121da$var$router.get("/relative", (_, res)=>{
    res.sendFile(`${$747425b437e121da$var$HTML_DIR}/relative-color.html`);
});
$747425b437e121da$var$router.get("/syntax", (_, res)=>{
    res.sendFile(`${$747425b437e121da$var$HTML_DIR}/color-syntax.html`);
});
$747425b437e121da$var$router.get("/hsl", (_, res)=>{
    res.sendFile(`${$747425b437e121da$var$HTML_DIR}/hsl.html`);
});
// error handling middleware
$747425b437e121da$var$app.use((err, req, res, next)=>{
    console.error(err.stack);
    res.status(500).send("Something broke!");
});
$747425b437e121da$var$app.use("/", (0, $im0Rw$express).static($747425b437e121da$var$BASE_DIR));
$747425b437e121da$var$app.use("/", $747425b437e121da$var$router);
$747425b437e121da$var$app.listen($747425b437e121da$var$port, ()=>{
    console.log(" listening port " + $747425b437e121da$var$port);
});


//# sourceMappingURL=start.js.map
