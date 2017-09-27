/** 
 * fis3-postprocessor-vconsole
 * a plugin of fis3 to insert the vconsole tools
 * @author long
 * @date 2017/9/26
 * @ref https://github.com/Tencent/vConsole
 * @ref https://github.com/WechatFE/vConsole-elements
 * @ref https://github.com/WechatFE/vConsole-resources
 * 
 */

var _ = fis.util;
var coreFile, elementsFile, resourcesFile;
var corePath = _(__dirname, 'node_modules/vconsole/dist/vconsole.min.js');
var corePathForNpm3 = _(__dirname, '../vconsole/dist/vconsole.min.js');
var elementsPath = _(__dirname, 'node_modules/vconsole-elements/dist/vconsole-elements.min.js');
var elementsPathForNpm3 = _(__dirname, '../vconsole-elements/dist/vconsole-elements.min.js');
var resourcesPath = _(__dirname, 'node_modules/vconsole-resources/dist/vconsole-resources.min.js');
var resourcesPathForNpm3 = _(__dirname, '../vconsole-resources/dist/vconsole-resources.min.js');
var isNpm3 = _.isFile(corePathForNpm3);

function init(options) {
    if (!coreFile) {
        coreFile = fis.util.read(isNpm3 ? corePathForNpm3 : corePath);
    }
    if (!elementsFile && !(options && options.noElements)) {
        elementsFile = fis.util.read(isNpm3 ? elementsPathForNpm3 : elementsPath);
    }
    if (!resourcesFile && !(options && options.noResources)) {
        resourcesFile = fis.util.read(isNpm3 ? resourcesPathForNpm3 : resourcesPath);
    }
}

function expo(content, file, options) {
    if (file.isHtmlLike) {
        init(options);
        var cntArr = [
            '<script>', 
            coreFile,
            '\n',
            !(options && options.noElements) ? (elementsFile + '\n') : '',
            !(options && options.noResources) ? (resourcesFile + '\n') : '',
            '</script>'];
        content = content.replace(/<\/head>/, function(str) {
            return cntArr.join('') + str;
        });
    }

    return content;
}

module.exports = expo;