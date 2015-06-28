define("echarts/chart/gauge", ["require", "./base", "../util/shape/GaugePointer", "zrender/shape/Text", "zrender/shape/Line", "zrender/shape/Rectangle", "zrender/shape/Circle", "zrender/shape/Sector", "../config", "../util/ecData", "../util/accMath", "zrender/tool/util", "../chart"], function (e) {
    function t(e, t, i, a, o) {
        n.call(this, e, t, i, a, o), this.refresh(a)
    }

    var n = e("./base"), i = e("../util/shape/GaugePointer"), a = e("zrender/shape/Text"), o = e("zrender/shape/Line"), r = e("zrender/shape/Rectangle"), s = e("zrender/shape/Circle"), l = e("zrender/shape/Sector"), h = e("../config");
    h.gauge = {
        zlevel: 0,
        z: 2,
        center: ["50%", "50%"],
        clickable: !0,
        legendHoverLink: !0,
        radius: "75%",
        startAngle: 225,
        endAngle: -45,
        min: 0,
        max: 100,
        splitNumber: 10,
        axisLine: {show: !0, lineStyle: {color: [[.2, "#228b22"], [.8, "#48b"], [1, "#ff4500"]], width: 30}},
        axisTick: {show: !0, splitNumber: 5, length: 8, lineStyle: {color: "#eee", width: 1, type: "solid"}},
        axisLabel: {show: !0, textStyle: {color: "auto"}},
        splitLine: {show: !0, length: 30, lineStyle: {color: "#eee", width: 2, type: "solid"}},
        pointer: {show: !0, length: "80%", width: 8, color: "auto"},
        title: {show: !0, offsetCenter: [0, "-40%"], textStyle: {color: "#333", fontSize: 15}},
        detail: {
            show: !0,
            backgroundColor: "rgba(0,0,0,0)",
            borderWidth: 0,
            borderColor: "#ccc",
            width: 100,
            height: 40,
            offsetCenter: [0, "40%"],
            textStyle: {color: "auto", fontSize: 30}
        }
    };
    var m = e("../util/ecData"), V = e("../util/accMath"), U = e("zrender/tool/util");
    return t.prototype = {
        type: h.CHART_TYPE_GAUGE, _buildShape: function () {
            var e = this.series;
            this._paramsMap = {};
            for (var t = 0, n = e.length; n > t; t++)e[t].type === h.CHART_TYPE_GAUGE && (e[t] = this.reformOption(e[t]), this.legendHoverLink = e[t].legendHoverLink || this.legendHoverLink, this._buildSingleGauge(t), this.buildMark(t));
            this.addShapeList()
        }, _buildSingleGauge: function (e) {
            var t = this.series[e];
            this._paramsMap[e] = {
                center: this.parseCenter(this.zr, t.center),
                radius: this.parseRadius(this.zr, t.radius),
                startAngle: t.startAngle.toFixed(2) - 0,
                endAngle: t.endAngle.toFixed(2) - 0
            }, this._paramsMap[e].totalAngle = this._paramsMap[e].startAngle - this._paramsMap[e].endAngle, this._colorMap(e), this._buildAxisLine(e), this._buildSplitLine(e), this._buildAxisTick(e), this._buildAxisLabel(e), this._buildPointer(e), this._buildTitle(e), this._buildDetail(e)
        }, _buildAxisLine: function (e) {
            var t = this.series[e];
            if (t.axisLine.show)for (var n, i, a = t.min, o = t.max - a, r = this._paramsMap[e], s = r.center, l = r.startAngle, h = r.totalAngle, V = r.colorArray, U = t.axisLine.lineStyle, d = this.parsePercent(U.width, r.radius[1]), p = r.radius[1], c = p - d, u = l, y = 0, g = V.length; g > y; y++)i = l - h * (V[y][0] - a) / o, n = this._getSector(s, c, p, i, u, V[y][1], U), u = i, n._animationAdd = "r", m.set(n, "seriesIndex", e), m.set(n, "dataIndex", y), this.shapeList.push(n)
        }, _buildSplitLine: function (e) {
            var t = this.series[e];
            if (t.splitLine.show)for (var n, i, a, r = this._paramsMap[e], s = t.splitNumber, l = t.min, h = t.max - l, m = t.splitLine, V = this.parsePercent(m.length, r.radius[1]), U = m.lineStyle, d = U.color, p = r.center, c = r.startAngle * Math.PI / 180, u = r.totalAngle * Math.PI / 180, y = r.radius[1], g = y - V, b = 0; s >= b; b++)n = c - u / s * b, i = Math.sin(n), a = Math.cos(n), this.shapeList.push(new o({
                zlevel: this.getZlevelBase(),
                z: this.getZBase() + 1,
                hoverable: !1,
                style: {
                    xStart: p[0] + a * y,
                    yStart: p[1] - i * y,
                    xEnd: p[0] + a * g,
                    yEnd: p[1] - i * g,
                    strokeColor: "auto" === d ? this._getColor(e, l + h / s * b) : d,
                    lineType: U.type,
                    lineWidth: U.width,
                    shadowColor: U.shadowColor,
                    shadowBlur: U.shadowBlur,
                    shadowOffsetX: U.shadowOffsetX,
                    shadowOffsetY: U.shadowOffsetY
                }
            }))
        }, _buildAxisTick: function (e) {
            var t = this.series[e];
            if (t.axisTick.show)for (var n, i, a, r = this._paramsMap[e], s = t.splitNumber, l = t.min, h = t.max - l, m = t.axisTick, V = m.splitNumber, U = this.parsePercent(m.length, r.radius[1]), d = m.lineStyle, p = d.color, c = r.center, u = r.startAngle * Math.PI / 180, y = r.totalAngle * Math.PI / 180, g = r.radius[1], b = g - U, f = 0, k = s * V; k >= f; f++)f % V !== 0 && (n = u - y / k * f, i = Math.sin(n), a = Math.cos(n), this.shapeList.push(new o({
                zlevel: this.getZlevelBase(),
                z: this.getZBase() + 1,
                hoverable: !1,
                style: {
                    xStart: c[0] + a * g,
                    yStart: c[1] - i * g,
                    xEnd: c[0] + a * b,
                    yEnd: c[1] - i * b,
                    strokeColor: "auto" === p ? this._getColor(e, l + h / k * f) : p,
                    lineType: d.type,
                    lineWidth: d.width,
                    shadowColor: d.shadowColor,
                    shadowBlur: d.shadowBlur,
                    shadowOffsetX: d.shadowOffsetX,
                    shadowOffsetY: d.shadowOffsetY
                }
            })))
        }, _buildAxisLabel: function (e) {
            var t = this.series[e];
            if (t.axisLabel.show)for (var n, i, o, r, s = t.splitNumber, l = t.min, h = t.max - l, m = t.axisLabel.textStyle, U = this.getFont(m), d = m.color, p = this._paramsMap[e], c = p.center, u = p.startAngle, y = p.totalAngle, g = p.radius[1] - this.parsePercent(t.splitLine.length, p.radius[1]) - 5, b = 0; s >= b; b++)r = V.accAdd(l, V.accMul(V.accDiv(h, s), b)), n = u - y / s * b, i = Math.sin(n * Math.PI / 180), o = Math.cos(n * Math.PI / 180), n = (n + 360) % 360, this.shapeList.push(new a({
                zlevel: this.getZlevelBase(),
                z: this.getZBase() + 1,
                hoverable: !1,
                style: {
                    x: c[0] + o * g,
                    y: c[1] - i * g,
                    color: "auto" === d ? this._getColor(e, r) : d,
                    text: this._getLabelText(t.axisLabel.formatter, r),
                    textAlign: n >= 110 && 250 >= n ? "left" : 70 >= n || n >= 290 ? "right" : "center",
                    textBaseline: n >= 10 && 170 >= n ? "top" : n >= 190 && 350 >= n ? "bottom" : "middle",
                    textFont: U,
                    shadowColor: m.shadowColor,
                    shadowBlur: m.shadowBlur,
                    shadowOffsetX: m.shadowOffsetX,
                    shadowOffsetY: m.shadowOffsetY
                }
            }))
        }, _buildPointer: function (e) {
            var t = this.series[e];
            if (t.pointer.show) {
                var n = t.max - t.min, a = t.pointer, o = this._paramsMap[e], r = this.parsePercent(a.length, o.radius[1]), l = this.parsePercent(a.width, o.radius[1]), h = o.center, V = this._getValue(e);
                V = V < t.max ? V : t.max;
                var U = (o.startAngle - o.totalAngle / n * (V - t.min)) * Math.PI / 180, d = "auto" === a.color ? this._getColor(e, V) : a.color, p = new i({
                    zlevel: this.getZlevelBase(),
                    z: this.getZBase() + 1,
                    clickable: this.query(t, "clickable"),
                    style: {
                        x: h[0],
                        y: h[1],
                        r: r,
                        startAngle: o.startAngle * Math.PI / 180,
                        angle: U,
                        color: d,
                        width: l,
                        shadowColor: a.shadowColor,
                        shadowBlur: a.shadowBlur,
                        shadowOffsetX: a.shadowOffsetX,
                        shadowOffsetY: a.shadowOffsetY
                    },
                    highlightStyle: {brushType: "fill", width: l > 2 ? 2 : l / 2, color: "#fff"}
                });
                m.pack(p, this.series[e], e, this.series[e].data[0], 0, this.series[e].data[0].name, V), this.shapeList.push(p), this.shapeList.push(new s({
                    zlevel: this.getZlevelBase(),
                    z: this.getZBase() + 2,
                    hoverable: !1,
                    style: {x: h[0], y: h[1], r: a.width / 2.5, color: "#fff"}
                }))
            }
        }, _buildTitle: function (e) {
            var t = this.series[e];
            if (t.title.show) {
                var n = t.data[0], i = null != n.name ? n.name : "";
                if ("" !== i) {
                    var o = t.title, r = o.offsetCenter, s = o.textStyle, l = s.color, h = this._paramsMap[e], m = h.center[0] + this.parsePercent(r[0], h.radius[1]), V = h.center[1] + this.parsePercent(r[1], h.radius[1]);
                    this.shapeList.push(new a({
                        zlevel: this.getZlevelBase(),
                        z: this.getZBase() + (Math.abs(m - h.center[0]) + Math.abs(V - h.center[1]) < 2 * s.fontSize ? 2 : 1),
                        hoverable: !1,
                        style: {
                            x: m,
                            y: V,
                            color: "auto" === l ? this._getColor(e) : l,
                            text: i,
                            textAlign: "center",
                            textFont: this.getFont(s),
                            shadowColor: s.shadowColor,
                            shadowBlur: s.shadowBlur,
                            shadowOffsetX: s.shadowOffsetX,
                            shadowOffsetY: s.shadowOffsetY
                        }
                    }))
                }
            }
        }, _buildDetail: function (e) {
            var t = this.series[e];
            if (t.detail.show) {
                var n = t.detail, i = n.offsetCenter, a = n.backgroundColor, o = n.textStyle, s = o.color, l = this._paramsMap[e], h = this._getValue(e), m = l.center[0] - n.width / 2 + this.parsePercent(i[0], l.radius[1]), V = l.center[1] + this.parsePercent(i[1], l.radius[1]);
                this.shapeList.push(new r({
                    zlevel: this.getZlevelBase(),
                    z: this.getZBase() + (Math.abs(m + n.width / 2 - l.center[0]) + Math.abs(V + n.height / 2 - l.center[1]) < o.fontSize ? 2 : 1),
                    hoverable: !1,
                    style: {
                        x: m,
                        y: V,
                        width: n.width,
                        height: n.height,
                        brushType: "both",
                        color: "auto" === a ? this._getColor(e, h) : a,
                        lineWidth: n.borderWidth,
                        strokeColor: n.borderColor,
                        shadowColor: n.shadowColor,
                        shadowBlur: n.shadowBlur,
                        shadowOffsetX: n.shadowOffsetX,
                        shadowOffsetY: n.shadowOffsetY,
                        text: this._getLabelText(n.formatter, h),
                        textFont: this.getFont(o),
                        textPosition: "inside",
                        textColor: "auto" === s ? this._getColor(e, h) : s
                    }
                }))
            }
        }, _getValue: function (e) {
            return this.getDataFromOption(this.series[e].data[0])
        }, _colorMap: function (e) {
            var t = this.series[e], n = t.min, i = t.max - n, a = t.axisLine.lineStyle.color;
            a instanceof Array || (a = [[1, a]]);
            for (var o = [], r = 0, s = a.length; s > r; r++)o.push([a[r][0] * i + n, a[r][1]]);
            this._paramsMap[e].colorArray = o
        }, _getColor: function (e, t) {
            null == t && (t = this._getValue(e));
            for (var n = this._paramsMap[e].colorArray, i = 0, a = n.length; a > i; i++)if (n[i][0] >= t)return n[i][1];
            return n[n.length - 1][1]
        }, _getSector: function (e, t, n, i, a, o, r) {
            return new l({
                zlevel: this.getZlevelBase(),
                z: this.getZBase(),
                hoverable: !1,
                style: {
                    x: e[0],
                    y: e[1],
                    r0: t,
                    r: n,
                    startAngle: i,
                    endAngle: a,
                    brushType: "fill",
                    color: o,
                    shadowColor: r.shadowColor,
                    shadowBlur: r.shadowBlur,
                    shadowOffsetX: r.shadowOffsetX,
                    shadowOffsetY: r.shadowOffsetY
                }
            })
        }, _getLabelText: function (e, t) {
            if (e) {
                if ("function" == typeof e)return e.call(this.myChart, t);
                if ("string" == typeof e)return e.replace("{value}", t)
            }
            return t
        }, refresh: function (e) {
            e && (this.option = e, this.series = e.series), this.backupShapeList(), this._buildShape()
        }
    }, U.inherits(t, n), e("../chart").define("gauge", t), t
}), define("echarts/util/shape/GaugePointer", ["require", "zrender/shape/Base", "zrender/tool/util", "./normalIsCover"], function (e) {
    function t(e) {
        n.call(this, e)
    }

    var n = e("zrender/shape/Base"), i = e("zrender/tool/util");
    return t.prototype = {
        type: "gauge-pointer", buildPath: function (e, t) {
            var n = t.r, i = t.width, a = t.angle, o = t.x - Math.cos(a) * i * (i >= n / 3 ? 1 : 2), r = t.y + Math.sin(a) * i * (i >= n / 3 ? 1 : 2);
            a = t.angle - Math.PI / 2, e.moveTo(o, r), e.lineTo(t.x + Math.cos(a) * i, t.y - Math.sin(a) * i), e.lineTo(t.x + Math.cos(t.angle) * n, t.y - Math.sin(t.angle) * n), e.lineTo(t.x - Math.cos(a) * i, t.y + Math.sin(a) * i), e.lineTo(o, r)
        }, getRect: function (e) {
            if (e.__rect)return e.__rect;
            var t = 2 * e.width, n = e.x, i = e.y, a = n + Math.cos(e.angle) * e.r, o = i - Math.sin(e.angle) * e.r;
            return e.__rect = {
                x: Math.min(n, a) - t,
                y: Math.min(i, o) - t,
                width: Math.abs(n - a) + t,
                height: Math.abs(i - o) + t
            }, e.__rect
        }, isCover: e("./normalIsCover")
    }, i.inherits(t, n), t
});