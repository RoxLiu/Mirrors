/**
 * 在body中加入等待的消息
 */
function showLoadingMsg(msg) {

    var $body = $("body");
    $("<div class=\"mask\"></div>").css({zIndex: 90}).appendTo($body).css({
        height: $body.height(),
        width: $body.width()
    }).show();

    $("<div class=\"maskMsg\"></div>").html(msg).appendTo($body).css({
        display: "none", zIndex: 8000,
        left: $body.width() / 2 - $("div.maskMsg").width() / 2,
        top: $body.height() / 2
    }).show();
}

/**
 * 取消body中等待的消息
 */
function removeLoadingMsg() {
    var $body = $("body");
    var $masgMsg = $body.find("div.maskMsg");
    var $mask = $body.find("div.mask");
    $masgMsg.fadeOut();
    $mask.fadeOut();

    $masgMsg.remove();
    $mask.remove();

    $mask = null;
    $masgMsg = null;
    $body = null;
}

function uploadifyError(event, queueId, fileObj, errorObj) {
    alert("event:" + event + "\nqueueId:" + queueId + "\nfileObj.name:"
        + fileObj.name + "\nerrorObj.type:" + errorObj.type + "\nerrorObj.info:" + errorObj.info);
}

var SYSCORE = {
    keyCode: {
        ENTER: 13, ESC: 27, END: 35, HOME: 36,
        SHIFT: 16, TAB: 9,
        LEFT: 37, RIGHT: 39, UP: 38, DOWN: 40,
        DELETE: 46, BACKSPACE: 8
    },
    statusCode: {ok: 200, error: 300, timeout: 301},
    msg: function (key, args) {
        var _format = function (str, args) {
            args = args || [];
            var result = str || "";
            for (var i = 0; i < args.length; i++) {
                result = result.replace(new RegExp("\\{" + i + "\\}", "g"), args[i]);
            }
            return result;
        }
        return _format(this._msg[key], args);
    },
    ajaxError: function (xhr, ajaxOptions, thrownError) {

        if ($.messager.alert) {

            var msg = "<div>Http status: " + xhr.status + " " + xhr.statusText + "</div>";
            msg += "<div>ajaxOptions: " + ajaxOptions + "</div>";
            msg += "<div>thrownError: " + thrownError + "</div>";
            msg += "<div>" + xhr.responseText + "</div>";

            $.messager.alert("机务安全管理系统", msg, "error");
        } else {
            alert("Http status: " + xhr.status + " " + xhr.statusText + "\najaxOptions: " + ajaxOptions + "\nthrownError:" + thrownError + "\n" + xhr.responseText);
        }
    },
    ajaxDone: function (json) {
        if (json.statusCode == SYSCORE.statusCode.error) {

            if (json.message && $.messager.alert) $.messager.alert("机务安全管理系统", json.message, "error");
        } else if (json.statusCode == SYSCORE.statusCode.timeout) {

            $.messager.alert("机务安全管理系统", "会话超时，请重新登陆", "error", function () {

                window.location.href = "/login!logout";
            });
        } else {

            if (json.message && $.messager.show) {
                if (json.message && $.messager.show) {
                    $.messager.show({
                        title: '机务安全管理系统',
                        msg: json.message,
                        timeout: 3000,
                        showType: 'slide'
                    });
                }
            }
        }
    },
    debug: function (msg) {
        if (typeof(console) != "undefined") console.log(msg);
        else alert(msg);
    },
    /*
     * json to string
     */
    obj2str: function (o) {
        var r = [];
        if (typeof o == "string") return "\"" + o.replace(/([\'\"\\])/g, "\\$1").replace(/(\n)/g, "\\n").replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t") + "\"";
        if (typeof o == "object") {
            if (!o.sort) {
                for (var i in o)
                    r.push(i + ":" + SYSCORE.obj2str(o[i]));
                if (!!document.all && !/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(o.toString)) {
                    r.push("toString:" + o.toString.toString());
                }
                r = "{" + r.join() + "}"
            } else {
                for (var i = 0; i < o.length; i++) {
                    r.push(SYSCORE.obj2str(o[i]));
                }
                r = "[" + r.join() + "]"
            }
            return r;
        }
        return o.toString();
    },
    jsonEval: function (data) {
        try {
            if ($.type(data) == 'string')
                return eval('(' + data + ')');
            else return data;
        } catch (e) {
            return {};
        }
    }
};


/**
 * You can use this map like this:
 * var myMap = new Map();
 * myMap.put("key","value");
 * var key = myMap.get("key");
 * myMap.remove("key");
 */
function Map() {

    this.elements = new Array();

    this.size = function () {
        return this.elements.length;
    }

    this.isEmpty = function () {
        return (this.elements.length < 1);
    }

    this.clear = function () {
        this.elements = new Array();
    }

    this.put = function (_key, _value) {
        this.remove(_key);
        this.elements.push({key: _key, value: _value});
    }

    this.remove = function (_key) {
        try {
            for (i = 0; i < this.elements.length; i++) {
                if (this.elements[i].key == _key) {
                    this.elements.splice(i, 1);
                    return true;
                }
            }
        } catch (e) {
            return false;
        }
        return false;
    }

    this.get = function (_key) {
        try {
            for (i = 0; i < this.elements.length; i++) {
                if (this.elements[i].key == _key) {
                    return this.elements[i].value;
                }
            }
        } catch (e) {
            return null;
        }
    }

    this.element = function (_index) {
        if (_index < 0 || _index >= this.elements.length) {
            return null;
        }
        return this.elements[_index];
    }

    this.containsKey = function (_key) {
        try {
            for (i = 0; i < this.elements.length; i++) {
                if (this.elements[i].key == _key) {
                    return true;
                }
            }
        } catch (e) {
            return false;
        }
        return false;
    }

    this.values = function () {
        var arr = new Array();
        for (i = 0; i < this.elements.length; i++) {
            arr.push(this.elements[i].value);
        }
        return arr;
    }

    this.keys = function () {
        var arr = new Array();
        for (i = 0; i < this.elements.length; i++) {
            arr.push(this.elements[i].key);
        }
        return arr;
    }
}

/**
 * 在窗体中上传完毕
 */
function windowUploadSuccess(file, data, response) {

    var $container = getCurrentWindow() != null && getCurrentWindow().length > 0 ? getCurrentWindow() : $("#rightContent");

    var $fileName = $container.find("input[type='hidden'][name='upfileName']");
    var $filePath = $container.find("input[type='hidden'][name='upfilePath']");

    $fileName.val($fileName.val() + file.name + ",");
    $filePath.val($filePath.val() + data + ",");

    $container.find("div.cancel").remove();

    $fileName = null;
    $filePath = null;
    $container = null;
}
