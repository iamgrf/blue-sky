
function translation(message){

    return new Promise(resolve => {
        chrome.runtime.sendMessage({"message": message}, function (result) {
            resolve(result.data);
        })
    });

}


async function twitterTranslation(){

    var divs = $("div[lang='en']:not([translation])");
    for(var i = 0; i < divs.length; i++){


        var childrens = $(divs[i]).children();

        var html_str = "";

        for(var j = 0; j < childrens.length; j++){
            var tagName = $(childrens[j]).prop("tagName");
            if (tagName == 'SPAN' && $(childrens[j]).children().length == 0){
                var message = $(childrens[j]).text().trim();
                if (message.length > 0){
                    html_str += await translation(message);
                }
            }else{
                html_str += $(childrens[j]).html();
            }
        }
        if ($(divs[i]).attr("translation") == undefined){
            $(divs[i]).attr("translation", "yes");
            $(divs[i]).append(`<div style="margin-top: 8px; color: blue">`+html_str+`</div>`);
        }

    }
    
}

$(function(){
    setInterval(function(){
        if(document.domain.indexOf("twitter.com") > -1){
            twitterTranslation();
        }
    }, 1000);
});
