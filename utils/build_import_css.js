/**
 *合并 @import 方式引入的css文件，可以让团队成员在单独的CSS文件上书写CSS，减少冲突。
 */
WScript //H:CScript //S
var logLevel = 4; // log 提示级别 【1-4: 多-少】

var args = WScript.Arguments;
var inputFile = args.Item(0);
var ignore = false;
var hasError = false;

if (!inputFile) {
    WScript.Echo('arguments error');
} else {
    inputFile = /\w+\.css/.test(inputFile) ? inputFile : (inputFile + '.css');
    var fs = new ActiveXObject("Scripting.FileSystemObject");
    var buildFile = inputFile.split('.')[0] + '-build.css';
    var buildPath = fs.GetParentFolderName(buildFile).replace(/\\/g, '/') + '/';

    var f = fs.GetFile(inputFile);
    if (!f) {
        WScript.Echo('file not fined: '+inputFile);
    } else {
        if (fs.FileExists(buildFile)) {
            fs.DeleteFile(buildFile, true);
        }

        var line, lmatch, f2;
        var ts = f.OpenAsTextStream(1, 0);
        var out = fs.OpenTextFile(buildFile, 8, true,-2);

        out.WriteLine('/* label:'+ new Date() + '*/\n');

        while (!ts.AtEndOfStream) {
            line = ts.ReadLine();
            lmatch = line.match(/^[\s\t]?@import\surl\((.+)\);?/);

            if ( /^\/\*/.test(line) && !/.+\*\//.test(line) ) {
                ignore = true;
            }
            if ( /\s?\*\/s?/.test(line) ) {
                ignore = false;
            }

            if (ignore) {
                logLevel === 1 && WScript.Echo('[-]  ' + line);
            } else {
                // 干净的语句 => @import url(...);
                if ( lmatch ) {
                    try{
                        f2 = fs.OpenTextFile( buildPath + lmatch[1], 1);
                        out.WriteLine( f2.ReadAll() );
                        logLevel <= 2 && WScript.Echo('[+]  '+ buildPath + lmatch[1]);

                        f2.Close(); f2 = null;
                    } catch(e) {
                        hasError = true;
                        WScript.Echo('error\t', e);
                    }
                } else {
                    logLevel == 1 && line && WScript.Echo('[-]  ', line);
                }
            }
        }
        out.Close(); out = null;
        ts.close();

        logLevel <= 3 && WScript.Echo('\n[=] ' + buildFile + '\n');
        logLevel <= 4 && WScript.Echo( hasError? 'with error': 'Build complete!');
    }
}
