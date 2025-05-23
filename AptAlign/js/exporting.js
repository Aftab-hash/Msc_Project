/*
 Highcharts JS v9.2.2 (2021-08-24)

 Exporting module

 (c) 2010-2021 Torstein Honsi

 License: www.highcharts.com/license
*/
'use strict';
(function (a) {
    "object" === typeof module && module.exports ? (a["default"] = a, module.exports = a) : "function" === typeof define && define.amd ? define("highcharts/modules/exporting", ["highcharts"], function (g) {
        a(g);
        a.Highcharts = g;
        return a
    }) : a("undefined" !== typeof Highcharts ? Highcharts : void 0)
})(function (a) {
    function g(a, b, r, h) {
        a.hasOwnProperty(b) || (a[b] = h.apply(null, r))
    }
    a = a ? a._modules : {};
    g(a, "Extensions/FullScreen.js", [a["Core/Chart/Chart.js"], a["Core/Globals.js"], a["Core/Renderer/HTML/AST.js"], a["Core/Utilities.js"]],
        function (a, b, r, h) {
            var m = h.addEvent;
            h = function () {
                function a(c) {
                    this.chart = c;
                    this.isOpen = !1;
                    c = c.renderTo;
                    this.browserProps || ("function" === typeof c.requestFullscreen ? this.browserProps = {
                        fullscreenChange: "fullscreenchange",
                        requestFullscreen: "requestFullscreen",
                        exitFullscreen: "exitFullscreen"
                    } : c.mozRequestFullScreen ? this.browserProps = {
                        fullscreenChange: "mozfullscreenchange",
                        requestFullscreen: "mozRequestFullScreen",
                        exitFullscreen: "mozCancelFullScreen"
                    } : c.webkitRequestFullScreen ? this.browserProps = {
                        fullscreenChange: "webkitfullscreenchange",
                        requestFullscreen: "webkitRequestFullScreen",
                        exitFullscreen: "webkitExitFullscreen"
                    } : c.msRequestFullscreen && (this.browserProps = {
                        fullscreenChange: "MSFullscreenChange",
                        requestFullscreen: "msRequestFullscreen",
                        exitFullscreen: "msExitFullscreen"
                    }))
                }
                a.prototype.close = function () {
                    var c = this.chart,
                        a = c.options.chart;
                    if (this.isOpen && this.browserProps && c.container.ownerDocument instanceof Document) c.container.ownerDocument[this.browserProps.exitFullscreen]();
                    this.unbindFullscreenEvent && (this.unbindFullscreenEvent =
                        this.unbindFullscreenEvent());
                    c.setSize(this.origWidth, this.origHeight, !1);
                    this.origHeight = this.origWidth = void 0;
                    a.width = this.origWidthOption;
                    a.height = this.origHeightOption;
                    this.origHeightOption = this.origWidthOption = void 0;
                    this.isOpen = !1;
                    this.setButtonText()
                };
                a.prototype.open = function () {
                    var c = this,
                        a = c.chart,
                        e = a.options.chart;
                    e && (c.origWidthOption = e.width, c.origHeightOption = e.height);
                    c.origWidth = a.chartWidth;
                    c.origHeight = a.chartHeight;
                    if (c.browserProps) {
                        var k = m(a.container.ownerDocument, c.browserProps.fullscreenChange,
                                function () {
                                    c.isOpen ? (c.isOpen = !1, c.close()) : (a.setSize(null, null, !1), c.isOpen = !0, c.setButtonText())
                                }),
                            b = m(a, "destroy", k);
                        c.unbindFullscreenEvent = function () {
                            k();
                            b()
                        };
                        if (e = a.renderTo[c.browserProps.requestFullscreen]()) e["catch"](function () {
                            alert("Full screen is not supported inside a frame.")
                        })
                    }
                };
                a.prototype.setButtonText = function () {
                    var a = this.chart,
                        b = a.exportDivElements,
                        e = a.options.exporting,
                        k = e && e.buttons && e.buttons.contextButton.menuItems;
                    a = a.options.lang;
                    e && e.menuItemDefinitions && a && a.exitFullscreen &&
                        a.viewFullscreen && k && b && (b = b[k.indexOf("viewFullscreen")]) && r.setElementHTML(b, this.isOpen ? a.exitFullscreen : e.menuItemDefinitions.viewFullscreen.text || a.viewFullscreen)
                };
                a.prototype.toggle = function () {
                    this.isOpen ? this.close() : this.open()
                };
                return a
            }();
            b.Fullscreen = h;
            m(a, "beforeRender", function () {
                this.fullscreen = new b.Fullscreen(this)
            });
            return b.Fullscreen
        });
    g(a, "Mixins/Navigation.js", [], function () {
        return {
            initUpdate: function (a) {
                a.navigation || (a.navigation = {
                    updates: [],
                    update: function (a, m) {
                        this.updates.forEach(function (b) {
                            b.update.call(b.context,
                                a, m)
                        })
                    }
                })
            },
            addUpdate: function (a, b) {
                b.navigation || this.initUpdate(b);
                b.navigation.updates.push({
                    update: a,
                    context: b
                })
            }
        }
    });
    g(a, "Extensions/Exporting/ExportingDefaults.js", [a["Core/Globals.js"], a["Core/Color/Palette.js"]], function (a, b) {
        return {
            exporting: {
                type: "image/png",
                url: "https://export.highcharts.com/",
                printMaxWidth: 780,
                scale: 2,
                buttons: {
                    contextButton: {
                        className: "highcharts-contextbutton",
                        menuClassName: "highcharts-contextmenu",
                        symbol: "menu",
                        titleKey: "contextButtonTitle",
                        menuItems: "viewFullscreen printChart separator downloadPNG downloadJPEG downloadPDF downloadSVG".split(" ")
                    }
                },
                menuItemDefinitions: {
                    viewFullscreen: {
                        textKey: "viewFullscreen",
                        onclick: function () {
                            this.fullscreen.toggle()
                        }
                    },
                    printChart: {
                        textKey: "printChart",
                        onclick: function () {
                            this.print()
                        }
                    },
                    separator: {
                        separator: !0
                    },
                    downloadPNG: {
                        textKey: "downloadPNG",
                        onclick: function () {
                            this.exportChart()
                        }
                    },
                    downloadJPEG: {
                        textKey: "downloadJPEG",
                        onclick: function () {
                            this.exportChart({
                                type: "image/jpeg"
                            })
                        }
                    },
                    downloadPDF: {
                        textKey: "downloadPDF",
                        onclick: function () {
                            this.exportChart({
                                type: "application/pdf"
                            })
                        }
                    },
                    downloadSVG: {
                        textKey: "downloadSVG",
                        onclick: function () {
                            this.exportChart({
                                type: "image/svg+xml"
                            })
                        }
                    }
                }
            },
            lang: {
                viewFullscreen: "View in full screen",
                exitFullscreen: "Exit from full screen",
                printChart: "Print chart",
                downloadPNG: "Download PNG image",
                downloadJPEG: "Download JPEG image",
                downloadPDF: "Download PDF document",
                downloadSVG: "Download SVG vector image",
                contextButtonTitle: "Chart context menu"
            },
            navigation: {
                buttonOptions: {
                    symbolSize: 14,
                    symbolX: 12.5,
                    symbolY: 10.5,
                    align: "right",
                    buttonSpacing: 3,
                    height: 22,
                    verticalAlign: "top",
                    width: 24,
                    symbolFill: b.neutralColor60,
                    symbolStroke: b.neutralColor60,
                    symbolStrokeWidth: 3,
                    theme: {
                        padding: 5
                    }
                },
                menuStyle: {
                    border: "1px solid " + b.neutralColor40,
                    background: b.backgroundColor,
                    padding: "5px 0"
                },
                menuItemStyle: {
                    padding: "0.5em 1em",
                    color: b.neutralColor80,
                    background: "none",
                    fontSize: a.isTouchDevice ? "14px" : "11px",
                    transition: "background 250ms, color 250ms"
                },
                menuItemHoverStyle: {
                    background: b.highlightColor80,
                    color: b.backgroundColor
                }
            }
        }
    });
    g(a, "Extensions/Exporting/ExportingSymbols.js", [], function () {
        var a;
        (function (a) {
            function b(a, c, b, e) {
                return [
                    ["M",
                        a, c + 2.5
                    ],
                    ["L", a + b, c + 2.5],
                    ["M", a, c + e / 2 + .5],
                    ["L", a + b, c + e / 2 + .5],
                    ["M", a, c + e - 1.5],
                    ["L", a + b, c + e - 1.5]
                ]
            }

            function h(a, c, b, e) {
                a = e / 3 - 2;
                e = [];
                return e = e.concat(this.circle(b - a, c, a, a), this.circle(b - a, c + a + 4, a, a), this.circle(b - a, c + 2 * (a + 4), a, a))
            }
            var m = [];
            a.compose = function (a) {
                -1 === m.indexOf(a) && (m.push(a), a = a.prototype.symbols, a.menu = b, a.menuball = h.bind(a))
            }
        })(a || (a = {}));
        return a
    });
    g(a, "Core/HttpUtilities.js", [a["Core/Globals.js"], a["Core/Utilities.js"]], function (a, b) {
        var m = a.doc,
            h = b.createElement,
            g = b.discardElement,
            F = b.merge,
            c = b.objectEach,
            G = {
                ajax: function (a) {
                    var b = F(!0, {
                        url: !1,
                        type: "get",
                        dataType: "json",
                        success: !1,
                        error: !1,
                        data: !1,
                        headers: {}
                    }, a);
                    a = {
                        json: "application/json",
                        xml: "application/xml",
                        text: "text/plain",
                        octet: "application/octet-stream"
                    };
                    var e = new XMLHttpRequest;
                    if (!b.url) return !1;
                    e.open(b.type.toUpperCase(), b.url, !0);
                    b.headers["Content-Type"] || e.setRequestHeader("Content-Type", a[b.dataType] || a.text);
                    c(b.headers, function (a, b) {
                        e.setRequestHeader(b, a)
                    });
                    e.onreadystatechange = function () {
                        if (4 === e.readyState) {
                            if (200 ===
                                e.status) {
                                var a = e.responseText;
                                if ("json" === b.dataType) try {
                                    a = JSON.parse(a)
                                } catch (t) {
                                    b.error && b.error(e, t);
                                    return
                                }
                                return b.success && b.success(a)
                            }
                            b.error && b.error(e, e.responseText)
                        }
                    };
                    try {
                        b.data = JSON.stringify(b.data)
                    } catch (ka) {}
                    e.send(b.data || !0)
                },
                getJSON: function (a, b) {
                    G.ajax({
                        url: a,
                        success: b,
                        dataType: "json",
                        headers: {
                            "Content-Type": "text/plain"
                        }
                    })
                },
                post: function (a, b, r) {
                    var e = h("form", F({
                        method: "post",
                        action: a,
                        enctype: "multipart/form-data"
                    }, r), {
                        display: "none"
                    }, m.body);
                    c(b, function (a, b) {
                        h("input", {
                            type: "hidden",
                            name: b,
                            value: a
                        }, null, e)
                    });
                    e.submit();
                    g(e)
                }
            };
        "";
        return G
    });
    g(a, "Extensions/Exporting/Exporting.js", [a["Core/Renderer/HTML/AST.js"], a["Core/Chart/Chart.js"], a["Mixins/Navigation.js"], a["Core/DefaultOptions.js"], a["Extensions/Exporting/ExportingDefaults.js"], a["Extensions/Exporting/ExportingSymbols.js"], a["Core/Globals.js"], a["Core/HttpUtilities.js"], a["Core/Color/Palette.js"], a["Core/Utilities.js"]], function (a, b, g, h, z, F, c, G, e, k) {
        h = h.defaultOptions;
        var m = c.doc,
            r = c.win,
            t = k.addEvent,
            u = k.css,
            A = k.createElement,
            I = k.discardElement,
            B = k.extend,
            O = k.find,
            C = k.fireEvent,
            P = k.isObject,
            p = k.merge,
            J = k.objectEach,
            v = k.pick,
            Q = k.removeEvent,
            R = k.uniqueKey,
            D;
        (function (h) {
            function z(a) {
                var d = this,
                    b = d.renderer,
                    l = p(d.options.navigation.buttonOptions, a),
                    c = l.onclick,
                    x = l.menuItems,
                    m = l.symbolSize || 12;
                d.btnCount || (d.btnCount = 0);
                d.exportDivElements || (d.exportDivElements = [], d.exportSVGElements = []);
                if (!1 !== l.enabled && l.theme) {
                    var f = l.theme,
                        y = f.states,
                        h = y && y.hover;
                    y = y && y.select;
                    var k;
                    d.styledMode || (f.fill = v(f.fill, e.backgroundColor),
                        f.stroke = v(f.stroke, "none"));
                    delete f.states;
                    c ? k = function (a) {
                        a && a.stopPropagation();
                        c.call(d, a)
                    } : x && (k = function (a) {
                        a && a.stopPropagation();
                        d.contextMenu(q.menuClassName, x, q.translateX, q.translateY, q.width, q.height, q);
                        q.setState(2)
                    });
                    l.text && l.symbol ? f.paddingLeft = v(f.paddingLeft, 30) : l.text || B(f, {
                        width: l.width,
                        height: l.height,
                        padding: 0
                    });
                    d.styledMode || (f["stroke-linecap"] = "round", f.fill = v(f.fill, e.backgroundColor), f.stroke = v(f.stroke, "none"));
                    var q = b.button(l.text, 0, 0, k, f, h, y).addClass(a.className).attr({
                        title: v(d.options.lang[l._titleKey ||
                            l.titleKey], "")
                    });
                    q.menuClassName = a.menuClassName || "highcharts-menu-" + d.btnCount++;
                    if (l.symbol) {
                        var r = b.symbol(l.symbol, l.symbolX - m / 2, l.symbolY - m / 2, m, m, {
                            width: m,
                            height: m
                        }).addClass("highcharts-button-symbol").attr({
                            zIndex: 1
                        }).add(q);
                        d.styledMode || r.attr({
                            stroke: l.symbolStroke,
                            fill: l.symbolFill,
                            "stroke-width": l.symbolStrokeWidth || 1
                        })
                    }
                    q.add(d.exportingGroup).align(B(l, {
                        width: q.width,
                        x: v(l.x, d.buttonOffset)
                    }), !0, "spacingBox");
                    d.buttonOffset += (q.width + l.buttonSpacing) * ("right" === l.align ? -1 : 1);
                    d.exportSVGElements.push(q,
                        r)
                }
            }

            function D() {
                if (this.printReverseInfo) {
                    var a = this.printReverseInfo,
                        w = a.childNodes,
                        b = a.origDisplay;
                    a = a.resetParams;
                    this.moveContainers(this.renderTo);
                    [].forEach.call(w, function (a, d) {
                        1 === a.nodeType && (a.style.display = b[d] || "")
                    });
                    this.isPrinting = !1;
                    a && this.setSize.apply(this, a);
                    delete this.printReverseInfo;
                    E = void 0;
                    C(this, "afterPrint")
                }
            }

            function S() {
                var a = m.body,
                    b = this.options.exporting.printMaxWidth,
                    c = {
                        childNodes: a.childNodes,
                        origDisplay: [],
                        resetParams: void 0
                    };
                this.isPrinting = !0;
                this.pointer.reset(null,
                    0);
                C(this, "beforePrint");
                b && this.chartWidth > b && (c.resetParams = [this.options.chart.width, void 0, !1], this.setSize(b, void 0, !1));
                [].forEach.call(c.childNodes, function (a, d) {
                    1 === a.nodeType && (c.origDisplay[d] = a.style.display, a.style.display = "none")
                });
                this.moveContainers(a);
                this.printReverseInfo = c
            }

            function T(a) {
                a.renderExporting();
                t(a, "redraw", a.renderExporting);
                t(a, "destroy", a.destroyExport)
            }

            function U(d, b, c, l, e, x, h) {
                var f = this,
                    w = f.options.navigation,
                    H = f.chartWidth,
                    K = f.chartHeight,
                    q = "cache-" + d,
                    g = Math.max(e,
                        x),
                    n = f[q];
                if (!n) {
                    f.exportContextMenu = f[q] = n = A("div", {
                        className: d
                    }, {
                        position: "absolute",
                        zIndex: 1E3,
                        padding: g + "px",
                        pointerEvents: "auto"
                    }, f.fixedDiv || f.container);
                    var p = A("ul", {
                        className: "highcharts-menu"
                    }, {
                        listStyle: "none",
                        margin: 0,
                        padding: 0
                    }, n);
                    f.styledMode || u(p, B({
                        MozBoxShadow: "3px 3px 10px #888",
                        WebkitBoxShadow: "3px 3px 10px #888",
                        boxShadow: "3px 3px 10px #888"
                    }, w.menuStyle));
                    n.hideMenu = function () {
                        u(n, {
                            display: "none"
                        });
                        h && h.setState(0);
                        f.openMenu = !1;
                        u(f.renderTo, {
                            overflow: "hidden"
                        });
                        u(f.container, {
                            overflow: "hidden"
                        });
                        k.clearTimeout(n.hideTimer);
                        C(f, "exportMenuHidden")
                    };
                    f.exportEvents.push(t(n, "mouseleave", function () {
                        n.hideTimer = r.setTimeout(n.hideMenu, 500)
                    }), t(n, "mouseenter", function () {
                        k.clearTimeout(n.hideTimer)
                    }), t(m, "mouseup", function (a) {
                        f.pointer.inClass(a.target, d) || n.hideMenu()
                    }), t(n, "click", function () {
                        f.openMenu && n.hideMenu()
                    }));
                    b.forEach(function (d) {
                        "string" === typeof d && (d = f.options.exporting.menuItemDefinitions[d]);
                        if (P(d, !0)) {
                            var b = void 0;
                            d.separator ? b = A("hr", void 0, void 0, p) : ("viewData" ===
                                d.textKey && f.isDataTableVisible && (d.textKey = "hideData"), b = A("li", {
                                    className: "highcharts-menu-item",
                                    onclick: function (a) {
                                        a && a.stopPropagation();
                                        n.hideMenu();
                                        d.onclick && d.onclick.apply(f, arguments)
                                    }
                                }, void 0, p), a.setElementHTML(b, d.text || f.options.lang[d.textKey]), f.styledMode || (b.onmouseover = function () {
                                    u(this, w.menuItemHoverStyle)
                                }, b.onmouseout = function () {
                                    u(this, w.menuItemStyle)
                                }, u(b, B({
                                    cursor: "pointer"
                                }, w.menuItemStyle))));
                            f.exportDivElements.push(b)
                        }
                    });
                    f.exportDivElements.push(p, n);
                    f.exportMenuWidth =
                        n.offsetWidth;
                    f.exportMenuHeight = n.offsetHeight
                }
                b = {
                    display: "block"
                };
                c + f.exportMenuWidth > H ? b.right = H - c - e - g + "px" : b.left = c - g + "px";
                l + x + f.exportMenuHeight > K && "top" !== h.alignOptions.verticalAlign ? b.bottom = K - l - g + "px" : b.top = l + x - g + "px";
                u(n, b);
                u(f.renderTo, {
                    overflow: ""
                });
                u(f.container, {
                    overflow: ""
                });
                f.openMenu = !0;
                C(f, "exportMenuShown")
            }

            function V(a) {
                var d = a ? a.target : this,
                    b = d.exportSVGElements,
                    c = d.exportDivElements;
                a = d.exportEvents;
                var e;
                b && (b.forEach(function (a, c) {
                    a && (a.onclick = a.ontouchstart = null, e = "cache-" +
                        a.menuClassName, d[e] && delete d[e], b[c] = a.destroy())
                }), b.length = 0);
                d.exportingGroup && (d.exportingGroup.destroy(), delete d.exportingGroup);
                c && (c.forEach(function (a, d) {
                    a && (k.clearTimeout(a.hideTimer), Q(a, "mouseleave"), c[d] = a.onmouseout = a.onmouseover = a.ontouchstart = a.onclick = null, I(a))
                }), c.length = 0);
                a && (a.forEach(function (a) {
                    a()
                }), a.length = 0)
            }

            function W(a, b) {
                b = this.getSVGForExport(a, b);
                a = p(this.options.exporting, a);
                G.post(a.url, {
                    filename: a.filename ? a.filename.replace(/\//g, "-") : this.getFilename(),
                    type: a.type,
                    width: a.width || 0,
                    scale: a.scale,
                    svg: b
                }, a.formAttributes)
            }

            function X() {
                this.styledMode && this.inlineStyles();
                return this.container.innerHTML
            }

            function Y() {
                var a = this.userOptions.title && this.userOptions.title.text,
                    b = this.options.exporting.filename;
                if (b) return b.replace(/\//g, "-");
                "string" === typeof a && (b = a.toLowerCase().replace(/<\/?[^>]+(>|$)/g, "").replace(/[\s_]+/g, "-").replace(/[^a-z0-9\-]/g, "").replace(/^[\-]+/g, "").replace(/[\-]+/g, "-").substr(0, 24).replace(/[\-]+$/g, ""));
                if (!b || 5 > b.length) b = "chart";
                return b
            }

            function Z(a) {
                var d, c = p(this.options, a);
                c.plotOptions = p(this.userOptions.plotOptions, a && a.plotOptions);
                c.time = p(this.userOptions.time, a && a.time);
                var e = A("div", null, {
                        position: "absolute",
                        top: "-9999em",
                        width: this.chartWidth + "px",
                        height: this.chartHeight + "px"
                    }, m.body),
                    h = this.renderTo.style.width;
                var k = this.renderTo.style.height;
                h = c.exporting.sourceWidth || c.chart.width || /px$/.test(h) && parseInt(h, 10) || (c.isGantt ? 800 : 600);
                k = c.exporting.sourceHeight || c.chart.height || /px$/.test(k) && parseInt(k, 10) ||
                    400;
                B(c.chart, {
                    animation: !1,
                    renderTo: e,
                    forExport: !0,
                    renderer: "SVGRenderer",
                    width: h,
                    height: k
                });
                c.exporting.enabled = !1;
                delete c.data;
                c.series = [];
                this.series.forEach(function (a) {
                    d = p(a.userOptions, {
                        animation: !1,
                        enableMouseTracking: !1,
                        showCheckbox: !1,
                        visible: a.visible
                    });
                    d.isInternal || c.series.push(d)
                });
                var g = {};
                this.axes.forEach(function (a) {
                    a.userOptions.internalKey || (a.userOptions.internalKey = R());
                    a.options.isInternal || (g[a.coll] || (g[a.coll] = !0, c[a.coll] = []), c[a.coll].push(p(a.userOptions, {
                        visible: a.visible
                    })))
                });
                var f = new b(c, this.callback);
                a && ["xAxis", "yAxis", "series"].forEach(function (b) {
                    var d = {};
                    a[b] && (d[b] = a[b], f.update(d))
                });
                this.axes.forEach(function (a) {
                    var b = O(f.axes, function (b) {
                            return b.options.internalKey === a.userOptions.internalKey
                        }),
                        d = a.getExtremes(),
                        c = d.userMin;
                    d = d.userMax;
                    b && ("undefined" !== typeof c && c !== b.min || "undefined" !== typeof d && d !== b.max) && b.setExtremes(c, d, !0, !1)
                });
                k = f.getChartHTML();
                C(this, "getSVG", {
                    chartCopy: f
                });
                k = this.sanitizeSVG(k, c);
                c = null;
                f.destroy();
                I(e);
                return k
            }

            function aa(a,
                b) {
                var d = this.options.exporting;
                return this.getSVG(p({
                    chart: {
                        borderRadius: 0
                    }
                }, d.chartOptions, b, {
                    exporting: {
                        sourceWidth: a && a.sourceWidth || d.sourceWidth,
                        sourceHeight: a && a.sourceHeight || d.sourceHeight
                    }
                }))
            }

            function L(a) {
                return a.replace(/([A-Z])/g, function (a, b) {
                    return "-" + b.toLowerCase()
                })
            }

            function ba() {
                function a(d) {
                    function f(a, c) {
                        h = m = !1;
                        if (e.length) {
                            for (g = e.length; g-- && !m;) m = e[g].test(c);
                            h = !m
                        }
                        "transform" === c && "none" === a && (h = !0);
                        for (g = b.length; g-- && !h;) h = b[g].test(c) || "function" === typeof a;
                        h || H[c] ===
                            a && "svg" !== d.nodeName || l[d.nodeName][c] === a || (M && -1 === M.indexOf(c) ? w += L(c) + ":" + a + ";" : a && d.setAttribute(L(c), a))
                    }
                    var w = "",
                        h, m, g;
                    if (1 === d.nodeType && -1 === ca.indexOf(d.nodeName)) {
                        var n = r.getComputedStyle(d, null);
                        var H = "svg" === d.nodeName ? {} : r.getComputedStyle(d.parentNode, null);
                        if (!l[d.nodeName]) {
                            k = t.getElementsByTagName("svg")[0];
                            var u = t.createElementNS(d.namespaceURI, d.nodeName);
                            k.appendChild(u);
                            l[d.nodeName] = p(r.getComputedStyle(u, null));
                            "text" === d.nodeName && delete l.text.fill;
                            k.removeChild(u)
                        }
                        if (c.isFirefox ||
                            c.isMS)
                            for (var v in n) f(n[v], v);
                        else J(n, f);
                        w && (n = d.getAttribute("style"), d.setAttribute("style", (n ? n + ";" : "") + w));
                        "svg" === d.nodeName && d.setAttribute("stroke-width", "1px");
                        "text" !== d.nodeName && [].forEach.call(d.children || d.childNodes, a)
                    }
                }
                var b = da,
                    e = h.inlineWhitelist,
                    l = {},
                    k, g = m.createElement("iframe");
                u(g, {
                    width: "1px",
                    height: "1px",
                    visibility: "hidden"
                });
                m.body.appendChild(g);
                var t = g.contentWindow.document;
                t.open();
                t.write('<svg xmlns="http://www.w3.org/2000/svg"></svg>');
                t.close();
                a(this.container.querySelector("svg"));
                k.parentNode.removeChild(k);
                g.parentNode.removeChild(g)
            }

            function ea(a) {
                (this.fixedDiv ? [this.fixedDiv, this.scrollingContainer] : [this.container]).forEach(function (b) {
                    a.appendChild(b)
                })
            }

            function fa() {
                var a = this;
                a.exporting = {
                    update: function (b, d) {
                        a.isDirtyExporting = !0;
                        p(!0, a.options.exporting, b);
                        v(d, !0) && a.redraw()
                    }
                };
                g.addUpdate(function (b, d) {
                    a.isDirtyExporting = !0;
                    p(!0, a.options.navigation, b);
                    v(d, !0) && a.redraw()
                }, a)
            }

            function ha() {
                var a = this;
                a.isPrinting || (E = a, c.isSafari || a.beforePrint(), setTimeout(function () {
                    r.focus();
                    r.print();
                    c.isSafari || setTimeout(function () {
                        a.afterPrint()
                    }, 1E3)
                }, 1))
            }

            function ia() {
                var a = this,
                    b = a.options.exporting,
                    c = b.buttons,
                    e = a.isDirtyExporting || !a.exportSVGElements;
                a.buttonOffset = 0;
                a.isDirtyExporting && a.destroyExport();
                e && !1 !== b.enabled && (a.exportEvents = [], a.exportingGroup = a.exportingGroup || a.renderer.g("exporting-group").attr({
                    zIndex: 3
                }).add(), J(c, function (b) {
                    a.addButton(b)
                }), a.isDirtyExporting = !1)
            }

            function ja(a, b) {
                var c = a.indexOf("</svg>") + 6,
                    d = a.substr(c);
                a = a.substr(0, c);
                b && b.exporting &&
                    b.exporting.allowHTML && d && (d = '<foreignObject x="0" y="0" width="' + b.chart.width + '" height="' + b.chart.height + '"><body xmlns="http://www.w3.org/1999/xhtml">' + d.replace(/(<(?:img|br).*?(?=>))>/g, "$1 />") + "</body></foreignObject>", a = a.replace("</svg>", d + "</svg>"));
                a = a.replace(/zIndex="[^"]+"/g, "").replace(/symbolName="[^"]+"/g, "").replace(/jQuery[0-9]+="[^"]+"/g, "").replace(/url\(("|&quot;)(.*?)("|&quot;);?\)/g, "url($2)").replace(/url\([^#]+#/g, "url(#").replace(/<svg /, '<svg xmlns:xlink="http://www.w3.org/1999/xlink" ').replace(/ (|NS[0-9]+:)href=/g,
                    " xlink:href=").replace(/\n/, " ").replace(/(fill|stroke)="rgba\(([ 0-9]+,[ 0-9]+,[ 0-9]+),([ 0-9\.]+)\)"/g, '$1="rgb($2)" $1-opacity="$3"').replace(/&nbsp;/g, "\u00a0").replace(/&shy;/g, "\u00ad");
                this.ieSanitizeSVG && (a = this.ieSanitizeSVG(a));
                return a
            }
            var N = [],
                da = [/-/, /^(clipPath|cssText|d|height|width)$/, /^font$/, /[lL]ogical(Width|Height)$/, /perspective/, /TapHighlightColor/, /^transition/, /^length$/],
                M = "fill stroke strokeLinecap strokeLinejoin strokeWidth textAnchor x y".split(" ");
            h.inlineWhitelist = [];
            var ca = ["clipPath", "defs", "desc"],
                E;
            h.compose = function (a, b) {
                F.compose(b); - 1 === N.indexOf(a) && (N.push(a), b = a.prototype, b.afterPrint = D, b.exportChart = W, b.inlineStyles = ba, b.print = ha, b.sanitizeSVG = ja, b.getChartHTML = X, b.getSVG = Z, b.getSVGForExport = aa, b.getFilename = Y, b.moveContainers = ea, b.beforePrint = S, b.contextMenu = U, b.addButton = z, b.destroyExport = V, b.renderExporting = ia, b.callbacks.push(T), t(a, "init", fa), c.isSafari && c.win.matchMedia("print").addListener(function (a) {
                    E && (a.matches ? E.beforePrint() : E.afterPrint())
                }))
            }
        })(D ||
            (D = {}));
        h.exporting = p(z.exporting, h.exporting);
        h.lang = p(z.lang, h.lang);
        h.navigation = p(z.navigation, h.navigation);
        "";
        "";
        return D
    });
    g(a, "masters/modules/exporting.src.js", [a["Core/Globals.js"], a["Extensions/Exporting/Exporting.js"], a["Core/HttpUtilities.js"]], function (a, b, g) {
        a.HttpUtilities = g;
        a.ajax = g.ajax;
        a.getJSON = g.getJSON;
        a.post = g.post;
        b.compose(a.Chart, a.Renderer)
    })
});