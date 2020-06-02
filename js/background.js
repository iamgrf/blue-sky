function token(a) {  
    var TKK = "437030.266915008";
    for (var e = TKK.split("."), h = Number(e[0]) || 0, g = [], d = 0, f = 0; f < a.length; f++) {  
        var c = a.charCodeAt(f);  
        128 > c ? g[d++] = c : (2048 > c ? g[d++] = c >> 6 | 192 : (55296 == (c & 64512) && f + 1 < a.length && 56320 == (a.charCodeAt(f + 1) & 64512) ? (c = 65536 + ((c & 1023) << 10) + (a.charCodeAt(++f) & 1023), g[d++] = c >> 18 | 240, g[d++] = c >> 12 & 63 | 128) : g[d++] = c >> 12 | 224, g[d++] = c >> 6 & 63 | 128), g[d++] = c & 63 | 128)  
    }  
    a = h;  
    for (d = 0; d < g.length; d++) a += g[d], a = b(a, "+-a^+6");  
    a = b(a, "+-3^+b+-f");  
    a ^= Number(e[1]) || 0;  
    0 > a && (a = (a & 2147483647) + 2147483648);  
    a %= 1E6;  
    return a.toString() + "." + (a ^ h)  
}

function b(a, b) {  
    for (var d = 0; d < b.length - 2; d += 3) {  
        var c = b.charAt(d + 2),  
            c = "a" <= c ? c.charCodeAt(0) - 87 : Number(c),  
            c = "+" == b.charAt(d + 1) ? a >>> c : a << c;  
        a = "+" == b.charAt(d) ? a + c & 4294967295 : a ^ c  
    }  
    return a  
  }

function googleTranslation(time, text, call){
    var tk = token(text);
    var q = encodeURIComponent(text);
    console.log(time + " -> 编码:" + q);
    var cnUrl = "https://translate.google.cn/translate_a/single?client=webapp&sl=en&tl=zh-CN&hl=en&dt=at&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&otf=2&ssel=3&tsel=6&kc=1&tk="+tk+"&q="+q;

    $.get(cnUrl, function(result){
        var results = "";
        console.log(time + " -> 全结果:" + result);
        for (var i = 0; i < result[0].length - 1; i++) {
            results += result[0][i][0];
        }
        call(results);
    });

}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    var time = new Date().getTime();
    console.log(time + " -> 翻译:" + request.message);
    // sendResponse({"data": request.message});
    googleTranslation(time, request.message, function(data){
        console.log(time + " -> 结果:" + data);
        sendResponse({"data": data});
    });
    return true;
})
