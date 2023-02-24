/**
 * 将对象转字符串（可以包含函数）
 * @param {any} obj 
 * @returns {string}
 */
function stringify(obj) {
    return JSON.stringify(obj, (key, value) => {
        if (typeof value === "function") {
            return value.toString();
        }
        return value;
    });
}
/**
 * 将包含函数的字符串解析为对象
 * @param {string} jsonStr 
 * @returns {any}
 */
function parse(jsonStr) {
    return JSON.parse(jsonStr, (key, value) => {
        try {
            if (
                typeof value === "string" &&
                /^function\s*\(|^\(\s*\w*(,\s*\w*)*\s*\)\s*=>/.test(value)
            ) {
                // 使用 eval 函数将字符串转换为函数对象
                return eval(`(${value})`);
            } else if (
                typeof value === "string" &&
                /^\s*[\w$]+\s*\(/.test(value) &&
                value.indexOf(key) === 0
            ) {
                return eval(`(function ${value})`);
            } else if (/=>\s*/.test(value)) {
                return eval(`(${value})`);
            }
            // 其他情况保持不变
            return value;
        } catch (error) {
            console.error(error);
            return value;
        }
    });
}
module.exports = {
    stringify,
    parse
};
