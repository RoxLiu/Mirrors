function handle_menu_event(element) {
    var ftype = $(element).attr("tyf_type");
    var author = $(element).parent().attr("username").toLowerCase();

    switch (ftype) {
        case "1": //拉黑
            $(element).hide();
            $(element).parent().find(".tyf_link[tyf_type=2]").show();
            $(element).parent().find(".tyf_link[tyf_type=3]").hide();
            doActionAndRefresh($(element).attr("url"), author);
            break;
        case "2": //洗白
            $(element).hide();
            $(element).parent().find(".tyf_link[tyf_type=1]").show();
            $(element).parent().find(".tyf_link[tyf_type=3]").show();
            doActionAndRefresh($(element).attr("url"), author);
            break;
        case "3": //关注
            $(element).hide();
            $(element).parent().find(".tyf_link[tyf_type=1]").hide();
            $(element).parent().find(".tyf_link[tyf_type=4]").show();
            doActionAndRefresh($(element).attr("url"), author);
            break;
        case "4": //取关
            $(element).hide();
            $(element).parent().find(".tyf_link[tyf_type=1]").show();
            $(element).parent().find(".tyf_link[tyf_type=3]").show();
            doActionAndRefresh($(element).attr("url"), author);
            break;
        case "5": //只看此人
            $(element).hide();
            $(element).parent().find(".tyf_link[tyf_type=1]").show();
            $(element).parent().find(".tyf_link[tyf_type=3]").show();

            window.open($(element).attr("url") + "/" + encodeURI(author));
            break;
    }
}

// 鼠标跟随效果，黑名单ID显示“洗白”，白名单ID显示“取关”，其他ID显示“拉黑、关注”
function show_menu (element) {
    var type = $(element).attr("type").toLowerCase();
    switch(type) {
        case "1": //楼主
            $(element).find(".tyf_link[tyf_type=1]").hide(); //拉黑
            $(element).find(".tyf_link[tyf_type=2]").hide(); //洗白
            $(element).find(".tyf_link[tyf_type=3]").hide(); //关注
            $(element).find(".tyf_link[tyf_type=4]").hide(); //取关
            $(element).find(".tyf_link[tyf_type=5]").show(); //只看此人
            break;
        case "2": //普通
            $(element).find(".tyf_link[tyf_type=1]").show(); //拉黑
            $(element).find(".tyf_link[tyf_type=2]").hide(); //洗白
            $(element).find(".tyf_link[tyf_type=3]").show(); //关注
            $(element).find(".tyf_link[tyf_type=4]").hide(); //取关
            $(element).find(".tyf_link[tyf_type=5]").show(); //只看此人
            break;
        case "3": //关注
            $(element).find(".tyf_link[tyf_type=1]").show(); //拉黑
            $(element).find(".tyf_link[tyf_type=2]").hide(); //洗白
            $(element).find(".tyf_link[tyf_type=3]").hide(); //关注
            $(element).find(".tyf_link[tyf_type=4]").show(); //取关
            $(element).find(".tyf_link[tyf_type=5]").show(); //只看此人
            break;
        case "0": //拉黑
            $(element).find(".tyf_link[tyf_type=1]").hide(); //拉黑
            $(element).find(".tyf_link[tyf_type=2]").show(); //洗白
            $(element).find(".tyf_link[tyf_type=3]").show(); //关注
            $(element).find(".tyf_link[tyf_type=4]").hide(); //取关
            $(element).find(".tyf_link[tyf_type=5]").show(); //只看此人
            break;
    }
}

function hide_menu(element) {
    $(element).find(".tyf_link").hide();
}

function doActionAndRefresh(objLink, username) {
// 发送ajax请求，并
    $.ajax({
        type: 'POST',
        url: objLink,
        data:{username: username},
        success: function (json) {
            location.reload();
        }
    });
}