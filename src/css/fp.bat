@echo off
@chcp 65001
cls

set /p name=module name:
set /p directory=directory:(./%name% ?)

::if exist %name% echo 路径 [./%name%]已存在，是否要覆盖？ && pause

md %name%
cd %name%

echo /* 文件名 %name%.css */>%name%.css

echo ^<!doctype html^>>test_%name%.html
echo ^<html lang="en"^>>>test_%name%.html
echo ^<head^>>>test_%name%.html
echo    ^<meta charset^="UTF-8"^>>>test_%name%.html
echo    ^<title^>test %name%^</title^>>>test_%name%.html
echo    ^<link rel^="stylesheet" href^="%name%.css"^>>>test_%name%.html
echo    ^<style^>>>test_%name%.html
echo    body {padding: 0;margin: 0;}>>test_%name%.html
echo    #about {position: absolute;left: 0;top: 0;width: 20em;padding: 0 12px;background-color: #ffe;height: 100%%;border-right: 1px solid #eea;}>>test_%name%.html
echo    #about .about-des {margin-bottom: 50px;color: #37A4A8;}>>test_%name%.html
echo    #about h2, #demo h2 {color:#399;}>>test_%name%.html
echo    #demo {position: relative;margin-left: 24em;padding: 0 40px 0 12px;}>>test_%name%.html
echo    code {border: 1px solid #ccc;display: inline-block;*display: inline;*zoom: 1;padding: 0 4px;background-color: #fefefe;-webkit-border-radius: 3px;-moz-border-radius: 3px;border-radius: 3px;color: #555;}>>test_%name%.html
echo    pre.code {border: 1px solid #ccc;padding: 10px;background-color: #fff;overflow: hidden;_overflow: auto;}>>test_%name%.html
echo    pre.code:hover {overflow: auto;}>>test_%name%.html
echo    ^</style^>>>test_%name%.html

echo ^</head^>>>test_%name%.html
echo ^<body^>>>test_%name%.html
echo    ^<div id="about"^>>>test_%name%.html
echo        ^<h2^>说明^</h2^>>>test_%name%.html
echo        ^<div class="about-des"^>>>test_%name%.html
echo        ^</div^>>>test_%name%.html
echo. >>test_%name%.html
echo        html 片段：>>test_%name%.html
echo        ^<pre class="code"^>>>test_%name%.html
echo        ^</pre^>>>test_%name%.html
echo    ^</div^>>>test_%name%.html
echo. >>test_%name%.html
echo. >>test_%name%.html
echo    ^<div id="demo"^>>>test_%name%.html
echo        ^<h2^>DEMO^</h2^>>>test_%name%.html
echo    ^</div^>>>test_%name%.html


echo ^</body^>>>test_%name%.html
echo ^</html^>>>test_%name%.html


echo 创建 %name% 成功!
timeout /t 3
exit