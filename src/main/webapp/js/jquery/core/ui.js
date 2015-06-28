// ============================全局变量 起
var SYS_NAME = "机务安全质量系统";

var $rightContent = $("#rightContent");

var $windowModel; // 窗体的样例

var WINDOW_ID_PREFIX = "popWin";

// 全局变量
var gbl_window_id = 0;
var gbl_window_shadow_id = 0;
var gbl_window_zIndex = 50;

var gbl_win_init_fun = function () {

}
// ============================全局变量 止

// 默认关闭所有的菜单
function closeAllMenu() {

    var $mainMenu = $("#mainMenu");

    // 初始状态下，将所有的菜单都隐藏
    $mainMenu.find("li > h4").next("div.Navli").hide();

    $mainMenu.find("li > h4").click(function () {

        // 获取当前点击的主菜单
        var $this = $(this);

        // 如果当前是激活的，则关闭之，否则打开之
        if ($this.parent().hasClass("ovr")) {

            // 给本身除去激活的样式
            $this.parent().removeClass("ovr").find("div.Navli").hide().find("p").removeClass("liOvr");
        } else {

            // 找到子菜单，并显示之， 给本身加上激活的样式，并找到相邻的菜单，隐藏之
            $this.parent().addClass("ovr").find("div.Navli").show().closest("li").siblings("li").removeClass("ovr").find("div.Navli").hide();
        }
    });

    // 默认把第一个菜单打开
    $("#mainMenu").find("li:eq(0) > h4").trigger("click");
}

$(function () {

    closeAllMenu();

    // 全局ajax请求验证
    $.ajaxSetup({
        cache: false,
        // error : ajaxError,
        beforeSend: function (XHR) {
            showLoadingMsg("请求处理中，请稍候。。。");
        },
        success: function (data) {
            ajaxComplete(data);
        },
        complete: function (XHR, TS) {
            var resText = XHR.responseText;
            ajaxComplete(resText);
        }
    });

    // 初始化窗体模板
    $windowModel = $("#windowModelDiv");

    // 为body绑定点击后的处理动作
    $("body").click(function (event) {

        var $target = $(event.target);

        // 判断是否点击的是按钮，如果是按钮，则根据按钮的类型来处理
        if ($target.attr("btnType")) {

            _action_ByBtnType($target);

            return false;
        }

        // 如果是全选/取消按钮
        if ($target.attr("checkCancelAll")) {
            var $table = $target.closest("table");
            if ($target.is(":checked")) {
                $table.find(":checkbox").attr("checked", true);
            } else {
                $table.find(":checkbox").attr("checked", false);
            }

            return true;
        }

        // 扩充dialog的打开方式
        if ($target.attr("openMode") == "dialog") {

            _open_dialog($target);
            return false;
        }

        // 判断是否是收起查询条件的按钮
        var $targetParentDiv = $target.parent("div");
        if ($targetParentDiv.attr("collapse") == "true") {
            if ($targetParentDiv.hasClass("moreBtn")) {

                $targetParentDiv.removeClass("moreBtn").addClass("moreBtnA").closest("table").find("tr:gt(0)").hide();
            } else if ($target.parent("div").hasClass("moreBtnA")) {
                $targetParentDiv.removeClass("moreBtnA").addClass("moreBtn").closest("table").find("tr:gt(0)").show();
            }
            return false;
        }

        // 点击的是A标签，则需要判断是否要触发ajax操作
        var $this = $target.closest("a");

        // 点击的是超级链接，则打开连接对应的内容
        if ($this.attr("openMode") == "tab") {

            _openTab($this);

            // 如果点击的是菜单，则需要加选中的样式
            if ($this.closest("div").hasClass("Navli")) {
                $("#mainMenu").find("p").removeClass("liOvr");
                $this.parent("p").addClass("liOvr");
            }

            // 防止页面跳转
            return false;
        } else if ($this.attr("openMode") == "dialog") {

            _open_dialog($this);
            return false;
        }

        event.stopPropagation();

        if ($target[0].type == "checkbox") {
            return true;
        }

        return true;
    });
});

/**
 * 根据按钮的类型来判断到底执行哪个函数
 * @param $btn
 */
function _action_ByBtnType($btn) {

    // 获取按钮类型
    var btnType = $btn.attr("btnType");

    var $form = $btn.closest("form");

    // 如果是提交按钮
    if (btnType == "submitForm") {

        if ($btn.attr("pageNumber")) {
            $form.find("#hidPageNumber").val($btn.attr("pageNumber"));
        }

        $form.trigger("submit");

        // 如果是重置form
    } else if (btnType == "resetForm") {

        $form.find("input[type='text'], textArea").val("");
        $form.find("select").find("option:eq(0)").attr("selected", true);

        // 如果是ajax删除
    } else if (btnType == "ajaxDelete") {

        doDelete($btn);

        // 如果是批量删除
    } else if (btnType == "ajaxDeleteBatch") {
        doDeleteBatch($btn);

        // 如果自定义操作
    } else if (btnType == "ajaxAction") {
        doAction($btn);
    }
}


/**
 * 打开右侧标签页的内容
 */
function _openTab($objLink) {

    if ($objLink.attr("href") == "#") {

        alert("请配置链接地址!");
        return;
    }

    $("#rightContent").load($objLink.attr("href"));
}

function _open_dialog($objClickTarget) {

    // 系统模块名称
    var moduleName = $objClickTarget.attr("moduleName");
    if (!moduleName) {
        alert("请配置窗口的模块名称属性：moduleName");
        return false;
    }

    // 系统功能名称
    var functionName = $objClickTarget.attr("functionName");
    if (!functionName) {
        alert("请配置窗口的功能名称属性：functionName");
        return false;
    }

    if (functionName.length > 20) {
        functionName = functionName.substring(0, 20) + "...";
    }

    // 窗体的宽度
    var width = $objClickTarget.attr("width");
    if (!width) {
        alert("请配置窗口的宽度属性：width");
        return false;
    }

    // 窗体的高度
    var height = $objClickTarget.attr("height");
    if (!height) {
        alert("请配置窗口的高度属性：height");
        return false;
    }

    // 窗口需要打开的URL
    var url = $objClickTarget.attr("href");

    // 是否使用iframe
    var useIframe = $objClickTarget.attr("useIframe");

    // 是否以模态的方式打开
    var isModel = $objClickTarget.attr("modal");

    // 是否隐藏关闭按钮
    var hideCloseBtn = $objClickTarget.attr("hideCloseBtn");

    // 关闭的时候的回调函数
    var closeCallBack = $objClickTarget.attr("closeCallBack");

    // 打开窗口
    _open_dialog_action_callBack(moduleName, functionName, width, height, url, useIframe, isModel, hideCloseBtn, closeCallBack);

    $objClickTarget = null;
}

function _open_dialog_action(moduleName, functionName, width, height, url, useIframe, isModel, hideCloseBtn) {
    _open_dialog_action_callBack(moduleName, functionName, width, height, url, useIframe, isModel, hideCloseBtn, function () {
    });
}

/**
 * 打开窗体window
 * @param $objClickTarget 被点击的a标签
 */
function _open_dialog_action_callBack(moduleName, functionName, width, height, url, useIframe, isModel, hideCloseBtn, callBackFunc) {

    // 初始化全局调用的函数
    gbl_win_init_fun = function () {
    }

    var pWidth = window.innerWidth;
    var pHeight = window.innerHeight - 100;
    var $body = $("body");
    if ($body.width() < pWidth) {
        pWidth = $body.width();
    }
    if ($body.height() < pHeight) {
        pHeight = $body.height();
    }

    //var left = 215;
    //var top = -30;

    var left = (pWidth - width) / 2;
    var top = (pHeight - height) / 2;

    //防止窗口过高时，标题位置太高，导致无法显示在屏幕内
    if (top < -30) {
        top = -30;
    }
    //alert("windows high:" + window.innerHeight);
    // 获取窗体的模板代码，并设置其中的属性
    var $objTargetWin = $windowModel.clone().appendTo($body);

    $objTargetWin.draggable({
        handle: $objTargetWin.find("div.fdTtl")
    });

    // 设定页面内容(当前位置)
    $objTargetWin.find("div.fdTtl > h4").html(moduleName + "&nbsp;&gt;&nbsp;" + functionName);

    var $objContentDiv = $objTargetWin.find("div.content");

    // 如果需要显示模态对话框
    if (isModel != "false") {

        // 首先判断当前是否有已经打开的dialog，如果有，则将dialog的遮罩层zIndex+1
        var $maskDiv = $("div.windowMask");
        if ($maskDiv.length > 0) {

            // 调整全局的zindex
            gbl_window_zIndex += 1;
            $maskDiv.css({zIndex: gbl_window_zIndex});
        } else {
            $("<div class=\"windowMask\"></div>").css({zIndex: gbl_window_zIndex}).appendTo($body).css({
                height: $body.height(),
                width: $body.width()
            }).show();
        }
    }

    // 是否使用iframe
    if (useIframe == "true") {
        var appendHTML = '<iframe src="' + url + '" height="' + height + '" width="' + (width - 15) + '" frameborder="0" scrolling="auto"></iframe>';
        //$(appendHTML).appendTo($objContentDiv);

        // 打开窗体
        $objTargetWin.appendTo($("body")).show().height(height).width(width)
            .css({
                position: "absolute",
                left: left,
                top: top,
                "z-index": gbl_window_zIndex
            }).attr("id", WINDOW_ID_PREFIX + gbl_window_zIndex);
        $objTargetWin.find("a.content").html(appendHTML);

        $objTargetWin.find("a.window_close").click(function () {
            eval(callBackFunc);
            closeCurrentWindow();
        });

        // 清空内容占用
        $objContentDiv = null;
        $objTargetWin = null;
        $body = null;
    } else {

        // 打开窗体
        $objTargetWin.appendTo($("body")).hide().height(height).width(width)
            .css({
                position: "absolute",
                left: left,
                top: top,
                "z-index": gbl_window_zIndex
            }).attr("id", WINDOW_ID_PREFIX + gbl_window_zIndex);

        $objContentDiv.load(url, function () {

            $objContentDiv.height(height - 44).css({"overflow-y": "auto"});

            $objTargetWin.appendTo($("body")).show()

            // 是否需要隐藏关闭按钮
            if (hideCloseBtn == "true") {
                $objTargetWin.find("a.window_close").hide();
            }

            // 调用全局的打开窗口后的函数
            gbl_win_init_fun();

            $objTargetWin.find("a.window_close").click(function () {
                eval(callBackFunc);
                closeCurrentWindow();
            });

            $objTargetWin.focus();

            _init_ui($objContentDiv);

            // 清空内容占用
            $objContentDiv = null;
            $objTargetWin = null;
            $body = null;
        });
    }
}

function _init_ui($container) {

    // 如果有
    if ($.fn.uploadify) {

        $(":file[uploaderOption]", $container).each(function () {
            var $this = $(this);
            var options = {
                fileObjName: $this.attr("name") || "file",
                auto: true,
                multi: true,
                onUploadError: uploadifyError
            };

            var uploaderOption = SYSCORE.jsonEval($this.attr("uploaderOption"));
            $.extend(options, uploaderOption);

            SYSCORE.debug("uploaderOption: " + SYSCORE.obj2str(uploaderOption));

            $this.uploadify(options);
        });
    }
}

function _open_tab() {

}

/**
 * 获取当前弹出窗的对象
 * @return 当前弹窗对象
 */
function getCurrentWindow() {
    //return $("div.window_frame:visible");
    return $("#" + WINDOW_ID_PREFIX + gbl_window_zIndex);
}

/**
 * 获取当前弹出窗的对象
 * @return 当前弹窗对象
 */
function getParentWindow() {
    //return $("div.window_frame:visible");
    return $("#" + WINDOW_ID_PREFIX + (gbl_window_zIndex - 1));
}

/**
 * 获取当前弹出窗的对象
 * @return 当前弹窗对象的content部分
 */
function getCurrentWindowBody() {
    //return $("div.window_frame:visible").find("div.content");
    return $("#" + WINDOW_ID_PREFIX + gbl_window_zIndex).find("div.content");
}

/**
 * 关闭当前的dialog
 */
function closeCurrentWindow() {

    // 关闭当前的窗口
    $("#" + WINDOW_ID_PREFIX + gbl_window_zIndex).remove();

    // 点击关闭按钮
    var $openedWin = $("div.fdDiv:visible");
    if ($openedWin.length > 0) {
        gbl_window_zIndex -= 1;
        $("div.windowMask").css({"z-index": gbl_window_zIndex});
    } else {
        $("div.windowMask").remove();
    }
}

function reloadCurrentTab(formIndex) {

    var $form = $("#rightContent").find("form:eq(" + formIndex + ")");
    tabSearch($form[0]);

    $currentTab = null;
}

// 表单查询
function tabSearch(targetForm) {

    var $form = $(targetForm);

    // 发送ajax请求，并
    $.ajax({
        type: $form.attr("method") || 'POST',
        url: $form.attr("action"),
        data: $form.find("input[value!=''], select, textarea").serializeArray(),
        dataType: "html",
        cache: false,
        async: true,
        success: function (html) {

            $("#rightContent").html(html);

            // 清空内存占用
            html = null;

            // 释放资源
            $form = null;
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert("Http status: " + xhr.status + " " + xhr.statusText + "\najaxOptions: " + ajaxOptions + "\nthrownError:" + thrownError + "\n" + xhr.responseText);

            $form = null;
        }
    });

    return false;
}

//在窗体中查询表单
function dialogSearch(targetForm) {

    var $form = $(targetForm);

    // 发送ajax请求，并
    $.ajax({
        type: $form.attr("method") || 'POST',
        url: $form.attr("action"),
        data: $form.find("input[value!=''], select, textarea").serializeArray(),
        dataType: "html",
        cache: false,
        async: true,
        success: function (html) {

            getCurrentWindowBody().html(html);

            // 清空内存占用
            html = null;

            // 释放资源
            $form = null;
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert("Http status: " + xhr.status + " " + xhr.statusText + "\najaxOptions: " + ajaxOptions + "\nthrownError:" + thrownError + "\n" + xhr.responseText);

            $form = null;
        }
    });

    return false;
}

//表单提交
function dialogSubmit(targetForm) {

    var $form = $(targetForm);

    if ($form.hasClass("validateForm") && !$form.valid()) {
        return false;
    }

    // 发送ajax请求，并
    $.ajax({
        type: $form.attr("method") || 'POST',
        url: $form.attr("action"),
        data: $form.find("input[value!=''], select, textarea").serializeArray(),
        dataType: "html",
        cache: false,
        async: true,
        success: function (json) {
            json = SYSCORE.jsonEval(json);
            SYSCORE.ajaxDone(json);
            if (json.statusCode == SYSCORE.statusCode.ok) {
                if (json.reloadParentTab) {

                    if ("closeCurrent" == json.callbackType) {
                        closeCurrentWindow();
                    }
                    reloadCurrentTab(0);
                } else {
                    if ("closeCurrent" == json.callbackType) {
                        closeCurrentWindow();
                    }
                }
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert("Http status: " + xhr.status + " " + xhr.statusText + "\najaxOptions: " + ajaxOptions + "\nthrownError:" + thrownError + "\n" + xhr.responseText);

            $form = null;
        }
    });

    return false;
}

// 执行全局的ajax完成动作
function ajaxComplete(res) {

    var isStop = false;

    if (res == "timeout") {
        $.messager.alert(SYS_NAME, "会话超时，请您重新登录系统继续操作！", "error", function () {
            if (window.parent) {
                window.parent.location = contextPath + '/';
            }
            window.location = contextPath + '/';
        });
    } else if (res == "error") {

        alert("error");
        isStop = true;
    }

    removeLoadingMsg();

    if (isStop) {
        return false;
    }
}

/***
 * 点击删除的时候执行的方法
 */
function doDelete(objLink) {

    $.messager.confirm(SYS_NAME, '确定要删除吗?', function (r) {
        if (r) {
            // 发送ajax请求，并
            $.ajax({
                type: 'POST',
                url: $(objLink).attr("href"),
                data: {},
                dataType: "html",
                cache: false,
                success: function (json) {
                    json = SYSCORE.jsonEval(json);
                    SYSCORE.ajaxDone(json);
                    if (json.statusCode == SYSCORE.statusCode.ok) {
                        if (json.reloadParentTab) {

                            if ("closeCurrent" == json.callbackType) {
                                closeCurrentWindow();
                            }
                            reloadCurrentTab(0);
                        }
                    }
                }
            });
        }
    });

    return false;
}

function _ajaxDelete(url, data) {

    $.messager.confirm(SYS_NAME, '确定要删除吗?', function (r) {
        if (r) {
            // 发送ajax请求，并
            $.ajax({
                type: 'POST',
                url: url,
                data: data,
                dataType: "html",
                cache: false,
                success: function (json) {
                    json = SYSCORE.jsonEval(json);
                    SYSCORE.ajaxDone(json);
                    if (json.statusCode == SYSCORE.statusCode.ok) {
                        if (json.reloadParentTab) {

                            if ("closeCurrent" == json.callbackType) {
                                closeCurrentWindow();
                            }
                            reloadCurrentTab(0);
                        }
                    }
                }
            });
        }
    });
}

/***
 * 点击删除的时候执行的方法
 */
function doDeleteBatch(objLink) {

    var $selectedCheckbox = $(objLink).closest("form").find(".detailTable :checkbox:checked");
    var selectedRowCnt = $selectedCheckbox.length;
    if (selectedRowCnt == 0) {

        $.messager.alert(SYS_NAME, "请选择需要删除的数据！", "error");
        return false;
    }

    $.messager.confirm(SYS_NAME, '确定要删除?', function (r) {
        if (r) {
            // 发送ajax请求，并
            $.ajax({
                type: 'POST',
                url: $(objLink).attr("href"),
                data: $selectedCheckbox.serializeArray(),
                dataType: "html",
                cache: false,
                success: function (json) {
                    json = SYSCORE.jsonEval(json);
                    SYSCORE.ajaxDone(json);
                    if (json.statusCode == SYSCORE.statusCode.ok) {
                        if (json.reloadParentTab) {

                            if ("closeCurrent" == json.callbackType) {
                                closeCurrentWindow();
                            }
                            reloadCurrentTab(0);
                        }
                    }
                }
            });
        }
    });

    return false;
}


/***
 * 点击删除的时候执行的方法
 */
function doAjaxSendBatch(objLink) {

    var $selectedCheckbox = $(objLink).closest("form").find(".detailTable :checkbox:checked, .detailTable input[type='hidden']");
    var selectedRowCnt = $selectedCheckbox.length;
    if (selectedRowCnt == 0) {

        $.messager.alert(SYS_NAME, $(objLink).attr("notSelectedMsg"), "error");
        return false;
    }

    $.messager.confirm(SYS_NAME, $(objLink).attr("confirmMsg"), function (r) {
        if (r) {
            // 发送ajax请求，并
            $.ajax({
                type: 'POST',
                url: $(objLink).attr("href"),
                data: $selectedCheckbox.serializeArray(),
                dataType: "html",
                cache: false,
                success: function (json) {
                    json = SYSCORE.jsonEval(json);
                    SYSCORE.ajaxDone(json);
                    if (json.statusCode == SYSCORE.statusCode.ok) {
                        if (json.reloadParentTab) {

                            if ("closeCurrent" == json.callbackType) {
                                closeCurrentWindow();
                            }
                        }
                        $(objLink).closest("form").trigger("submit");
                    }
                }
            });
        }
    });

    return false;
}

/***
 * 点击删除的时候执行的方法
 */
function doAction(objLink) {

    $.messager.confirm(SYS_NAME, '请确认是否执行该操作?', function (r) {
        if (r) {
            // 发送ajax请求，并
            $.ajax({
                type: 'POST',
                url: $(objLink).attr("href"),
                data: {},
                dataType: "html",
                cache: false,
                success: function (json) {
                    json = SYSCORE.jsonEval(json);
                    SYSCORE.ajaxDone(json);
                    if (json.statusCode == SYSCORE.statusCode.ok) {
                        if (json.reloadParentTab) {

                            if ("closeCurrent" == json.callbackType) {
                                closeCurrentWindow();
                            }
                            reloadCurrentTab(0);
                        }
                    }

                }
            });
        }
    });

    return false;
}
