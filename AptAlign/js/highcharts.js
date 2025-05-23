/*
 Highcharts JS v9.2.2 (2021-08-24)

 (c) 2009-2021 Torstein Honsi

 License: www.highcharts.com/license
*/
'use strict';
(function (aa, M) {
    "object" === typeof module && module.exports ? (M["default"] = M, module.exports = aa.document ? M(aa) : M) : "function" === typeof define && define.amd ? define("highcharts/highcharts", function () {
        return M(aa)
    }) : (aa.Highcharts && aa.Highcharts.error(16, !0), aa.Highcharts = M(aa))
})("undefined" !== typeof window ? window : this, function (aa) {
    function M(r, a, C, E) {
        r.hasOwnProperty(a) || (r[a] = E.apply(null, C))
    }
    var a = {};
    M(a, "Core/Globals.js", [], function () {
        var r = "undefined" !== typeof aa ? aa : "undefined" !== typeof window ?
            window : {},
            a;
        (function (a) {
            a.SVG_NS = "http://www.w3.org/2000/svg";
            a.product = "Highcharts";
            a.version = "9.2.2";
            a.win = r;
            a.doc = a.win.document;
            a.svg = a.doc && a.doc.createElementNS && !!a.doc.createElementNS(a.SVG_NS, "svg").createSVGRect;
            a.userAgent = a.win.navigator && a.win.navigator.userAgent || "";
            a.isChrome = -1 !== a.userAgent.indexOf("Chrome");
            a.isFirefox = -1 !== a.userAgent.indexOf("Firefox");
            a.isMS = /(edge|msie|trident)/i.test(a.userAgent) && !a.win.opera;
            a.isSafari = !a.isChrome && -1 !== a.userAgent.indexOf("Safari");
            a.isTouchDevice =
                /(Mobile|Android|Windows Phone)/.test(a.userAgent);
            a.isWebKit = -1 !== a.userAgent.indexOf("AppleWebKit");
            a.deg2rad = 2 * Math.PI / 360;
            a.hasBidiBug = a.isFirefox && 4 > parseInt(a.userAgent.split("Firefox/")[1], 10);
            a.hasTouch = !!a.win.TouchEvent;
            a.marginNames = ["plotTop", "marginRight", "marginBottom", "plotLeft"];
            a.noop = function () {};
            a.supportsPassiveEvents = function () {
                var r = !1;
                if (!a.isMS) {
                    var w = Object.defineProperty({}, "passive", {
                        get: function () {
                            r = !0
                        }
                    });
                    a.win.addEventListener && a.win.removeEventListener && (a.win.addEventListener("testPassive",
                        a.noop, w), a.win.removeEventListener("testPassive", a.noop, w))
                }
                return r
            }();
            a.charts = [];
            a.dateFormats = {};
            a.seriesTypes = {};
            a.symbolSizes = {};
            a.chartCount = 0
        })(a || (a = {}));
        "";
        return a
    });
    M(a, "Core/Utilities.js", [a["Core/Globals.js"]], function (a) {
        function r(b, d, e, p) {
            var y = d ? "Highcharts error" : "Highcharts warning";
            32 === b && (b = y + ": Deprecated member");
            var F = m(b),
                c = F ? y + " #" + b + ": www.highcharts.com/errors/" + b + "/" : b.toString();
            if ("undefined" !== typeof p) {
                var k = "";
                F && (c += "?");
                I(p, function (b, K) {
                    k += "\n - " + K + ": " + b;
                    F && (c += encodeURI(K) + "=" + encodeURI(b))
                });
                c += k
            }
            B(a, "displayError", {
                chart: e,
                code: b,
                message: c,
                params: p
            }, function () {
                if (d) throw Error(c);
                h.console && -1 === r.messages.indexOf(c) && console.warn(c)
            });
            r.messages.push(c)
        }

        function C(b, d) {
            var y = {};
            I(b, function (h, c) {
                if (J(b[c], !0) && !b.nodeType && d[c]) h = C(b[c], d[c]), Object.keys(h).length && (y[c] = h);
                else if (J(b[c]) || b[c] !== d[c]) y[c] = b[c]
            });
            return y
        }

        function E(b, d) {
            return parseInt(b, d || 10)
        }

        function z(b) {
            return "string" === typeof b
        }

        function x(b) {
            b = Object.prototype.toString.call(b);
            return "[object Array]" === b || "[object Array Iterator]" === b
        }

        function J(b, d) {
            return !!b && "object" === typeof b && (!d || !x(b))
        }

        function u(b) {
            return J(b) && "number" === typeof b.nodeType
        }

        function n(b) {
            var d = b && b.constructor;
            return !(!J(b, !0) || u(b) || !d || !d.name || "Object" === d.name)
        }

        function m(b) {
            return "number" === typeof b && !isNaN(b) && Infinity > b && -Infinity < b
        }

        function g(b) {
            return "undefined" !== typeof b && null !== b
        }

        function c(b, d, h) {
            var y;
            z(d) ? g(h) ? b.setAttribute(d, h) : b && b.getAttribute && ((y = b.getAttribute(d)) || "class" !==
                d || (y = b.getAttribute(d + "Name"))) : I(d, function (d, y) {
                b.setAttribute(y, d)
            });
            return y
        }

        function e(b, d) {
            var y;
            b || (b = {});
            for (y in d) b[y] = d[y];
            return b
        }

        function l() {
            for (var b = arguments, d = b.length, h = 0; h < d; h++) {
                var c = b[h];
                if ("undefined" !== typeof c && null !== c) return c
            }
        }

        function f(b, d) {
            a.isMS && !a.svg && d && "undefined" !== typeof d.opacity && (d.filter = "alpha(opacity=" + 100 * d.opacity + ")");
            e(b.style, d)
        }

        function v(b, d, h, c, p) {
            b = t.createElement(b);
            d && e(b, d);
            p && f(b, {
                padding: "0",
                border: "none",
                margin: "0"
            });
            h && f(b, h);
            c && c.appendChild(b);
            return b
        }

        function q(b, d) {
            return parseFloat(b.toPrecision(d || 14))
        }

        function k(b, d, c) {
            var y = a.getStyle || k;
            if ("width" === d) return d = Math.min(b.offsetWidth, b.scrollWidth), c = b.getBoundingClientRect && b.getBoundingClientRect().width, c < d && c >= d - 1 && (d = Math.floor(c)), Math.max(0, d - (y(b, "padding-left", !0) || 0) - (y(b, "padding-right", !0) || 0));
            if ("height" === d) return Math.max(0, Math.min(b.offsetHeight, b.scrollHeight) - (y(b, "padding-top", !0) || 0) - (y(b, "padding-bottom", !0) || 0));
            h.getComputedStyle || r(27, !0);
            if (b = h.getComputedStyle(b,
                    void 0)) {
                var e = b.getPropertyValue(d);
                l(c, "opacity" !== d) && (e = E(e))
            }
            return e
        }

        function I(b, d, h) {
            for (var y in b) Object.hasOwnProperty.call(b, y) && d.call(h || b[y], b[y], y, b)
        }

        function D(b, d, h) {
            function y(d, H) {
                var K = b.removeEventListener || a.removeEventListenerPolyfill;
                K && K.call(b, d, H, !1)
            }

            function c(h) {
                var H;
                if (b.nodeName) {
                    if (d) {
                        var K = {};
                        K[d] = !0
                    } else K = h;
                    I(K, function (b, d) {
                        if (h[d])
                            for (H = h[d].length; H--;) y(d, h[d][H].fn)
                    })
                }
            }
            var e = "function" === typeof b && b.prototype || b;
            if (Object.hasOwnProperty.call(e, "hcEvents")) {
                var p =
                    e.hcEvents;
                d ? (e = p[d] || [], h ? (p[d] = e.filter(function (b) {
                    return h !== b.fn
                }), y(d, h)) : (c(p), p[d] = [])) : (c(p), delete e.hcEvents)
            }
        }

        function B(b, d, h, c) {
            h = h || {};
            if (t.createEvent && (b.dispatchEvent || b.fireEvent && b !== a)) {
                var y = t.createEvent("Events");
                y.initEvent(d, !0, !0);
                h = e(y, h);
                b.dispatchEvent ? b.dispatchEvent(h) : b.fireEvent(d, h)
            } else if (b.hcEvents) {
                h.target || e(h, {
                    preventDefault: function () {
                        h.defaultPrevented = !0
                    },
                    target: b,
                    type: d
                });
                y = [];
                for (var p = b, k = !1; p.hcEvents;) Object.hasOwnProperty.call(p, "hcEvents") && p.hcEvents[d] &&
                    (y.length && (k = !0), y.unshift.apply(y, p.hcEvents[d])), p = Object.getPrototypeOf(p);
                k && y.sort(function (b, d) {
                    return b.order - d.order
                });
                y.forEach(function (d) {
                    !1 === d.fn.call(b, h) && h.preventDefault()
                })
            }
            c && !h.defaultPrevented && c.call(b, h)
        }
        var O = a.charts,
            t = a.doc,
            h = a.win;
        (r || (r = {})).messages = [];
        var d;
        Math.easeInOutSine = function (b) {
            return -.5 * (Math.cos(Math.PI * b) - 1)
        };
        var b = Array.prototype.find ? function (b, d) {
            return b.find(d)
        } : function (b, d) {
            var h, y = b.length;
            for (h = 0; h < y; h++)
                if (d(b[h], h)) return b[h]
        };
        I({
            map: "map",
            each: "forEach",
            grep: "filter",
            reduce: "reduce",
            some: "some"
        }, function (b, d) {
            a[d] = function (h) {
                var y;
                r(32, !1, void 0, (y = {}, y["Highcharts." + d] = "use Array." + b, y));
                return Array.prototype[b].apply(h, [].slice.call(arguments, 1))
            }
        });
        var p, G = function () {
            var b = Math.random().toString(36).substring(2, 9) + "-",
                d = 0;
            return function () {
                return "highcharts-" + (p ? "" : b) + d++
            }
        }();
        h.jQuery && (h.jQuery.fn.highcharts = function () {
            var b = [].slice.call(arguments);
            if (this[0]) return b[0] ? (new(a[z(b[0]) ? b.shift() : "Chart"])(this[0], b[0], b[1]), this) : O[c(this[0],
                "data-highcharts-chart")]
        });
        b = {
            addEvent: function (b, d, h, c) {
                void 0 === c && (c = {});
                var y = "function" === typeof b && b.prototype || b;
                Object.hasOwnProperty.call(y, "hcEvents") || (y.hcEvents = {});
                y = y.hcEvents;
                a.Point && b instanceof a.Point && b.series && b.series.chart && (b.series.chart.runTrackerClick = !0);
                var p = b.addEventListener || a.addEventListenerPolyfill;
                p && p.call(b, d, h, a.supportsPassiveEvents ? {
                    passive: void 0 === c.passive ? -1 !== d.indexOf("touch") : c.passive,
                    capture: !1
                } : !1);
                y[d] || (y[d] = []);
                y[d].push({
                    fn: h,
                    order: "number" ===
                        typeof c.order ? c.order : Infinity
                });
                y[d].sort(function (b, d) {
                    return b.order - d.order
                });
                return function () {
                    D(b, d, h)
                }
            },
            arrayMax: function (b) {
                for (var d = b.length, h = b[0]; d--;) b[d] > h && (h = b[d]);
                return h
            },
            arrayMin: function (b) {
                for (var d = b.length, h = b[0]; d--;) b[d] < h && (h = b[d]);
                return h
            },
            attr: c,
            clamp: function (b, d, h) {
                return b > d ? b < h ? b : h : d
            },
            cleanRecursively: C,
            clearTimeout: function (b) {
                g(b) && clearTimeout(b)
            },
            correctFloat: q,
            createElement: v,
            css: f,
            defined: g,
            destroyObjectProperties: function (b, d) {
                I(b, function (h, c) {
                    h && h !== d &&
                        h.destroy && h.destroy();
                    delete b[c]
                })
            },
            discardElement: function (b) {
                d || (d = v("div"));
                b && d.appendChild(b);
                d.innerHTML = ""
            },
            erase: function (b, d) {
                for (var h = b.length; h--;)
                    if (b[h] === d) {
                        b.splice(h, 1);
                        break
                    }
            },
            error: r,
            extend: e,
            extendClass: function (b, d) {
                var h = function () {};
                h.prototype = new b;
                e(h.prototype, d);
                return h
            },
            find: b,
            fireEvent: B,
            getMagnitude: function (b) {
                return Math.pow(10, Math.floor(Math.log(b) / Math.LN10))
            },
            getNestedProperty: function (b, d) {
                for (b = b.split("."); b.length && g(d);) {
                    var c = b.shift();
                    if ("undefined" ===
                        typeof c || "__proto__" === c) return;
                    d = d[c];
                    if (!g(d) || "function" === typeof d || "number" === typeof d.nodeType || d === h) return
                }
                return d
            },
            getStyle: k,
            inArray: function (b, d, h) {
                r(32, !1, void 0, {
                    "Highcharts.inArray": "use Array.indexOf"
                });
                return d.indexOf(b, h)
            },
            isArray: x,
            isClass: n,
            isDOMElement: u,
            isFunction: function (b) {
                return "function" === typeof b
            },
            isNumber: m,
            isObject: J,
            isString: z,
            keys: function (b) {
                r(32, !1, void 0, {
                    "Highcharts.keys": "use Object.keys"
                });
                return Object.keys(b)
            },
            merge: function () {
                var b, d = arguments,
                    h = {},
                    c = function (b,
                        d) {
                        "object" !== typeof b && (b = {});
                        I(d, function (h, H) {
                            "__proto__" !== H && "constructor" !== H && (!J(h, !0) || n(h) || u(h) ? b[H] = d[H] : b[H] = c(b[H] || {}, h))
                        });
                        return b
                    };
                !0 === d[0] && (h = d[1], d = Array.prototype.slice.call(d, 2));
                var p = d.length;
                for (b = 0; b < p; b++) h = c(h, d[b]);
                return h
            },
            normalizeTickInterval: function (b, d, h, c, p) {
                var e = b;
                h = l(h, 1);
                var k = b / h;
                d || (d = p ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10], !1 === c && (1 === h ? d = d.filter(function (b) {
                    return 0 === b % 1
                }) : .1 >= h && (d = [1 / h])));
                for (c = 0; c < d.length && !(e = d[c], p && e * h >= b || !p && k <= (d[c] +
                        (d[c + 1] || d[c])) / 2); c++);
                return e = q(e * h, -Math.round(Math.log(.001) / Math.LN10))
            },
            objectEach: I,
            offset: function (b) {
                var d = t.documentElement;
                b = b.parentElement || b.parentNode ? b.getBoundingClientRect() : {
                    top: 0,
                    left: 0,
                    width: 0,
                    height: 0
                };
                return {
                    top: b.top + (h.pageYOffset || d.scrollTop) - (d.clientTop || 0),
                    left: b.left + (h.pageXOffset || d.scrollLeft) - (d.clientLeft || 0),
                    width: b.width,
                    height: b.height
                }
            },
            pad: function (b, d, h) {
                return Array((d || 2) + 1 - String(b).replace("-", "").length).join(h || "0") + b
            },
            pick: l,
            pInt: E,
            relativeLength: function (b,
                d, h) {
                return /%$/.test(b) ? d * parseFloat(b) / 100 + (h || 0) : parseFloat(b)
            },
            removeEvent: D,
            splat: function (b) {
                return x(b) ? b : [b]
            },
            stableSort: function (b, d) {
                var h = b.length,
                    c, p;
                for (p = 0; p < h; p++) b[p].safeI = p;
                b.sort(function (b, h) {
                    c = d(b, h);
                    return 0 === c ? b.safeI - h.safeI : c
                });
                for (p = 0; p < h; p++) delete b[p].safeI
            },
            syncTimeout: function (b, d, h) {
                if (0 < d) return setTimeout(b, d, h);
                b.call(0, h);
                return -1
            },
            timeUnits: {
                millisecond: 1,
                second: 1E3,
                minute: 6E4,
                hour: 36E5,
                day: 864E5,
                week: 6048E5,
                month: 24192E5,
                year: 314496E5
            },
            uniqueKey: G,
            useSerialIds: function (b) {
                return p =
                    l(b, p)
            },
            wrap: function (b, d, h) {
                var c = b[d];
                b[d] = function () {
                    var b = Array.prototype.slice.call(arguments),
                        d = arguments,
                        p = this;
                    p.proceed = function () {
                        c.apply(p, arguments.length ? arguments : d)
                    };
                    b.unshift(c);
                    b = h.apply(this, b);
                    p.proceed = null;
                    return b
                }
            }
        };
        "";
        return b
    });
    M(a, "Core/Color/Palette.js", [], function () {
        return {
            colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),
            backgroundColor: "#ffffff",
            neutralColor100: "#000000",
            neutralColor80: "#333333",
            neutralColor60: "#666666",
            neutralColor40: "#999999",
            neutralColor20: "#cccccc",
            neutralColor10: "#e6e6e6",
            neutralColor5: "#f2f2f2",
            neutralColor3: "#f7f7f7",
            highlightColor100: "#003399",
            highlightColor80: "#335cad",
            highlightColor60: "#6685c2",
            highlightColor20: "#ccd6eb",
            highlightColor10: "#e6ebf5",
            positiveColor: "#06b535",
            negativeColor: "#f21313"
        }
    });
    M(a, "Core/Chart/ChartDefaults.js", [a["Core/Color/Palette.js"]], function (a) {
        return {
            panning: {
                enabled: !1,
                type: "x"
            },
            styledMode: !1,
            borderRadius: 0,
            colorCount: 10,
            defaultSeriesType: "line",
            ignoreHiddenSeries: !0,
            spacing: [10, 10, 15, 10],
            resetZoomButton: {
                theme: {
                    zIndex: 6
                },
                position: {
                    align: "right",
                    x: -10,
                    y: 10
                }
            },
            zoomBySingleTouch: !1,
            width: null,
            height: null,
            borderColor: a.highlightColor80,
            backgroundColor: a.backgroundColor,
            plotBorderColor: a.neutralColor20
        }
    });
    M(a, "Core/Color/Color.js", [a["Core/Globals.js"], a["Core/Utilities.js"]], function (a, w) {
        var r = w.isNumber,
            E = w.merge,
            z = w.pInt;
        w = function () {
            function x(r) {
                this.rgba = [NaN, NaN, NaN, NaN];
                this.input = r;
                var u = a.Color;
                if (u && u !== x) return new u(r);
                if (!(this instanceof x)) return new x(r);
                this.init(r)
            }
            x.parse = function (a) {
                return a ? new x(a) : x.None
            };
            x.prototype.init = function (a) {
                var u;
                if ("object" === typeof a && "undefined" !== typeof a.stops) this.stops = a.stops.map(function (c) {
                    return new x(c[1])
                });
                else if ("string" === typeof a) {
                    this.input = a = x.names[a.toLowerCase()] || a;
                    if ("#" === a.charAt(0)) {
                        var n = a.length;
                        var m = parseInt(a.substr(1), 16);
                        7 === n ? u = [(m & 16711680) >> 16, (m & 65280) >> 8, m & 255, 1] : 4 === n && (u = [(m & 3840) >> 4 | (m & 3840) >> 8, (m & 240) >> 4 | m & 240, (m & 15) << 4 | m & 15, 1])
                    }
                    if (!u)
                        for (m = x.parsers.length; m-- && !u;) {
                            var g =
                                x.parsers[m];
                            (n = g.regex.exec(a)) && (u = g.parse(n))
                        }
                }
                u && (this.rgba = u)
            };
            x.prototype.get = function (a) {
                var u = this.input,
                    n = this.rgba;
                if ("object" === typeof u && "undefined" !== typeof this.stops) {
                    var m = E(u);
                    m.stops = [].slice.call(m.stops);
                    this.stops.forEach(function (g, c) {
                        m.stops[c] = [m.stops[c][0], g.get(a)]
                    });
                    return m
                }
                return n && r(n[0]) ? "rgb" === a || !a && 1 === n[3] ? "rgb(" + n[0] + "," + n[1] + "," + n[2] + ")" : "a" === a ? "" + n[3] : "rgba(" + n.join(",") + ")" : u
            };
            x.prototype.brighten = function (a) {
                var u = this.rgba;
                if (this.stops) this.stops.forEach(function (m) {
                    m.brighten(a)
                });
                else if (r(a) && 0 !== a)
                    for (var n = 0; 3 > n; n++) u[n] += z(255 * a), 0 > u[n] && (u[n] = 0), 255 < u[n] && (u[n] = 255);
                return this
            };
            x.prototype.setOpacity = function (a) {
                this.rgba[3] = a;
                return this
            };
            x.prototype.tweenTo = function (a, u) {
                var n = this.rgba,
                    m = a.rgba;
                if (!r(n[0]) || !r(m[0])) return a.input || "none";
                a = 1 !== m[3] || 1 !== n[3];
                return (a ? "rgba(" : "rgb(") + Math.round(m[0] + (n[0] - m[0]) * (1 - u)) + "," + Math.round(m[1] + (n[1] - m[1]) * (1 - u)) + "," + Math.round(m[2] + (n[2] - m[2]) * (1 - u)) + (a ? "," + (m[3] + (n[3] - m[3]) * (1 - u)) : "") + ")"
            };
            x.names = {
                white: "#ffffff",
                black: "#000000"
            };
            x.parsers = [{
                regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
                parse: function (a) {
                    return [z(a[1]), z(a[2]), z(a[3]), parseFloat(a[4], 10)]
                }
            }, {
                regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
                parse: function (a) {
                    return [z(a[1]), z(a[2]), z(a[3]), 1]
                }
            }];
            x.None = new x("");
            return x
        }();
        "";
        return w
    });
    M(a, "Core/Time.js", [a["Core/Globals.js"], a["Core/Utilities.js"]], function (a, w) {
        var r = a.win,
            E = w.defined,
            z = w.error,
            x = w.extend,
            J = w.isObject,
            u = w.merge,
            n = w.objectEach,
            m = w.pad,
            g = w.pick,
            c = w.splat,
            e = w.timeUnits,
            l = a.isSafari && r.Intl && r.Intl.DateTimeFormat.prototype.formatRange,
            f = a.isSafari && r.Intl && !r.Intl.DateTimeFormat.prototype.formatRange;
        w = function () {
            function v(c) {
                this.options = {};
                this.variableTimezone = this.useUTC = !1;
                this.Date = r.Date;
                this.getTimezoneOffset = this.timezoneOffsetFunction();
                this.update(c)
            }
            v.prototype.get = function (c, e) {
                if (this.variableTimezone || this.timezoneOffset) {
                    var k = e.getTime(),
                        f = k - this.getTimezoneOffset(e);
                    e.setTime(f);
                    c = e["getUTC" +
                        c]();
                    e.setTime(k);
                    return c
                }
                return this.useUTC ? e["getUTC" + c]() : e["get" + c]()
            };
            v.prototype.set = function (c, e, f) {
                if (this.variableTimezone || this.timezoneOffset) {
                    if ("Milliseconds" === c || "Seconds" === c || "Minutes" === c && 0 === this.getTimezoneOffset(e) % 36E5) return e["setUTC" + c](f);
                    var k = this.getTimezoneOffset(e);
                    k = e.getTime() - k;
                    e.setTime(k);
                    e["setUTC" + c](f);
                    c = this.getTimezoneOffset(e);
                    k = e.getTime() + c;
                    return e.setTime(k)
                }
                return this.useUTC || l && "FullYear" === c ? e["setUTC" + c](f) : e["set" + c](f)
            };
            v.prototype.update = function (c) {
                var e =
                    g(c && c.useUTC, !0);
                this.options = c = u(!0, this.options || {}, c);
                this.Date = c.Date || r.Date || Date;
                this.timezoneOffset = (this.useUTC = e) && c.timezoneOffset;
                this.getTimezoneOffset = this.timezoneOffsetFunction();
                this.variableTimezone = e && !(!c.getTimezoneOffset && !c.timezone)
            };
            v.prototype.makeTime = function (c, e, l, v, B, a) {
                if (this.useUTC) {
                    var k = this.Date.UTC.apply(0, arguments);
                    var h = this.getTimezoneOffset(k);
                    k += h;
                    var d = this.getTimezoneOffset(k);
                    h !== d ? k += d - h : h - 36E5 !== this.getTimezoneOffset(k - 36E5) || f || (k -= 36E5)
                } else k = (new this.Date(c,
                    e, g(l, 1), g(v, 0), g(B, 0), g(a, 0))).getTime();
                return k
            };
            v.prototype.timezoneOffsetFunction = function () {
                var c = this,
                    e = this.options,
                    f = e.moment || r.moment;
                if (!this.useUTC) return function (c) {
                    return 6E4 * (new Date(c.toString())).getTimezoneOffset()
                };
                if (e.timezone) {
                    if (f) return function (c) {
                        return 6E4 * -f.tz(c, e.timezone).utcOffset()
                    };
                    z(25)
                }
                return this.useUTC && e.getTimezoneOffset ? function (c) {
                    return 6E4 * e.getTimezoneOffset(c.valueOf())
                } : function () {
                    return 6E4 * (c.timezoneOffset || 0)
                }
            };
            v.prototype.dateFormat = function (c,
                e, f) {
                if (!E(e) || isNaN(e)) return a.defaultOptions.lang && a.defaultOptions.lang.invalidDate || "";
                c = g(c, "%Y-%m-%d %H:%M:%S");
                var k = this,
                    l = new this.Date(e),
                    q = this.get("Hours", l),
                    t = this.get("Day", l),
                    h = this.get("Date", l),
                    d = this.get("Month", l),
                    b = this.get("FullYear", l),
                    p = a.defaultOptions.lang,
                    G = p && p.weekdays,
                    y = p && p.shortWeekdays;
                l = x({
                    a: y ? y[t] : G[t].substr(0, 3),
                    A: G[t],
                    d: m(h),
                    e: m(h, 2, " "),
                    w: t,
                    b: p.shortMonths[d],
                    B: p.months[d],
                    m: m(d + 1),
                    o: d + 1,
                    y: b.toString().substr(2, 2),
                    Y: b,
                    H: m(q),
                    k: q,
                    I: m(q % 12 || 12),
                    l: q % 12 || 12,
                    M: m(this.get("Minutes",
                        l)),
                    p: 12 > q ? "AM" : "PM",
                    P: 12 > q ? "am" : "pm",
                    S: m(l.getSeconds()),
                    L: m(Math.floor(e % 1E3), 3)
                }, a.dateFormats);
                n(l, function (b, d) {
                    for (; - 1 !== c.indexOf("%" + d);) c = c.replace("%" + d, "function" === typeof b ? b.call(k, e) : b)
                });
                return f ? c.substr(0, 1).toUpperCase() + c.substr(1) : c
            };
            v.prototype.resolveDTLFormat = function (e) {
                return J(e, !0) ? e : (e = c(e), {
                    main: e[0],
                    from: e[1],
                    to: e[2]
                })
            };
            v.prototype.getTimeTicks = function (c, k, f, l) {
                var q = this,
                    v = [],
                    t = {},
                    h = new q.Date(k),
                    d = c.unitRange,
                    b = c.count || 1,
                    p;
                l = g(l, 1);
                if (E(k)) {
                    q.set("Milliseconds", h,
                        d >= e.second ? 0 : b * Math.floor(q.get("Milliseconds", h) / b));
                    d >= e.second && q.set("Seconds", h, d >= e.minute ? 0 : b * Math.floor(q.get("Seconds", h) / b));
                    d >= e.minute && q.set("Minutes", h, d >= e.hour ? 0 : b * Math.floor(q.get("Minutes", h) / b));
                    d >= e.hour && q.set("Hours", h, d >= e.day ? 0 : b * Math.floor(q.get("Hours", h) / b));
                    d >= e.day && q.set("Date", h, d >= e.month ? 1 : Math.max(1, b * Math.floor(q.get("Date", h) / b)));
                    if (d >= e.month) {
                        q.set("Month", h, d >= e.year ? 0 : b * Math.floor(q.get("Month", h) / b));
                        var G = q.get("FullYear", h)
                    }
                    d >= e.year && q.set("FullYear",
                        h, G - G % b);
                    d === e.week && (G = q.get("Day", h), q.set("Date", h, q.get("Date", h) - G + l + (G < l ? -7 : 0)));
                    G = q.get("FullYear", h);
                    l = q.get("Month", h);
                    var y = q.get("Date", h),
                        a = q.get("Hours", h);
                    k = h.getTime();
                    !q.variableTimezone && q.useUTC || !E(f) || (p = f - k > 4 * e.month || q.getTimezoneOffset(k) !== q.getTimezoneOffset(f));
                    k = h.getTime();
                    for (h = 1; k < f;) v.push(k), k = d === e.year ? q.makeTime(G + h * b, 0) : d === e.month ? q.makeTime(G, l + h * b) : !p || d !== e.day && d !== e.week ? p && d === e.hour && 1 < b ? q.makeTime(G, l, y, a + h * b) : k + d * b : q.makeTime(G, l, y + h * b * (d === e.day ? 1 : 7)),
                        h++;
                    v.push(k);
                    d <= e.hour && 1E4 > v.length && v.forEach(function (b) {
                        0 === b % 18E5 && "000000000" === q.dateFormat("%H%M%S%L", b) && (t[b] = "day")
                    })
                }
                v.info = x(c, {
                    higherRanks: t,
                    totalRange: d * b
                });
                return v
            };
            v.prototype.getDateFormat = function (c, k, f, g) {
                var l = this.dateFormat("%m-%d %H:%M:%S.%L", k),
                    q = {
                        millisecond: 15,
                        second: 12,
                        minute: 9,
                        hour: 6,
                        day: 3
                    },
                    t = "millisecond";
                for (h in e) {
                    if (c === e.week && +this.dateFormat("%w", k) === f && "00:00:00.000" === l.substr(6)) {
                        var h = "week";
                        break
                    }
                    if (e[h] > c) {
                        h = t;
                        break
                    }
                    if (q[h] && l.substr(q[h]) !== "01-01 00:00:00.000".substr(q[h])) break;
                    "week" !== h && (t = h)
                }
                if (h) var d = this.resolveDTLFormat(g[h]).main;
                return d
            };
            return v
        }();
        "";
        return w
    });
    M(a, "Core/DefaultOptions.js", [a["Core/Chart/ChartDefaults.js"], a["Core/Color/Color.js"], a["Core/Globals.js"], a["Core/Color/Palette.js"], a["Core/Time.js"], a["Core/Utilities.js"]], function (a, w, C, E, z, x) {
        w = w.parse;
        var r = x.merge,
            u = {
                colors: E.colors,
                symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
                lang: {
                    loading: "Loading...",
                    months: "January February March April May June July August September October November December".split(" "),
                    shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
                    weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                    decimalPoint: ".",
                    numericSymbols: "kMGTPE".split(""),
                    resetZoom: "Reset zoom",
                    resetZoomTitle: "Reset zoom level 1:1",
                    thousandsSep: " "
                },
                global: {},
                time: {
                    Date: void 0,
                    getTimezoneOffset: void 0,
                    timezone: void 0,
                    timezoneOffset: 0,
                    useUTC: !0
                },
                chart: a,
                title: {
                    text: "Chart title",
                    align: "center",
                    margin: 15,
                    widthAdjust: -44
                },
                subtitle: {
                    text: "",
                    align: "center",
                    widthAdjust: -44
                },
                caption: {
                    margin: 15,
                    text: "",
                    align: "left",
                    verticalAlign: "bottom"
                },
                plotOptions: {},
                labels: {
                    style: {
                        position: "absolute",
                        color: E.neutralColor80
                    }
                },
                legend: {
                    enabled: !0,
                    align: "center",
                    alignColumns: !0,
                    className: "highcharts-no-tooltip",
                    layout: "horizontal",
                    labelFormatter: function () {
                        return this.name
                    },
                    borderColor: E.neutralColor40,
                    borderRadius: 0,
                    navigation: {
                        activeColor: E.highlightColor100,
                        inactiveColor: E.neutralColor20
                    },
                    itemStyle: {
                        color: E.neutralColor80,
                        cursor: "pointer",
                        fontSize: "12px",
                        fontWeight: "bold",
                        textOverflow: "ellipsis"
                    },
                    itemHoverStyle: {
                        color: E.neutralColor100
                    },
                    itemHiddenStyle: {
                        color: E.neutralColor20
                    },
                    shadow: !1,
                    itemCheckboxStyle: {
                        position: "absolute",
                        width: "13px",
                        height: "13px"
                    },
                    squareSymbol: !0,
                    symbolPadding: 5,
                    verticalAlign: "bottom",
                    x: 0,
                    y: 0,
                    title: {
                        style: {
                            fontWeight: "bold"
                        }
                    }
                },
                loading: {
                    labelStyle: {
                        fontWeight: "bold",
                        position: "relative",
                        top: "45%"
                    },
                    style: {
                        position: "absolute",
                        backgroundColor: E.backgroundColor,
                        opacity: .5,
                        textAlign: "center"
                    }
                },
                tooltip: {
                    enabled: !0,
                    animation: C.svg,
                    borderRadius: 3,
                    dateTimeLabelFormats: {
                        millisecond: "%A, %b %e, %H:%M:%S.%L",
                        second: "%A, %b %e, %H:%M:%S",
                        minute: "%A, %b %e, %H:%M",
                        hour: "%A, %b %e, %H:%M",
                        day: "%A, %b %e, %Y",
                        week: "Week from %A, %b %e, %Y",
                        month: "%B %Y",
                        year: "%Y"
                    },
                    footerFormat: "",
                    headerShape: "callout",
                    hideDelay: 500,
                    padding: 8,
                    shape: "callout",
                    shared: !1,
                    snap: C.isTouchDevice ? 25 : 10,
                    headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>',
                    pointFormat: '<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.y}</b><br/>',
                    backgroundColor: w(E.neutralColor3).setOpacity(.85).get(),
                    borderWidth: 1,
                    shadow: !0,
                    stickOnContact: !1,
                    style: {
                        color: E.neutralColor80,
                        cursor: "default",
                        fontSize: "12px",
                        whiteSpace: "nowrap"
                    },
                    useHTML: !1
                },
                credits: {
                    enabled: !0,
                    href: "https://www.highcharts.com?credits",
                    position: {
                        align: "right",
                        x: -10,
                        verticalAlign: "bottom",
                        y: -5
                    },
                    style: {
                        cursor: "pointer",
                        color: E.neutralColor40,
                        fontSize: "9px"
                    },
                    text: "Highcharts.com"
                }
            };
        u.chart.styledMode = !1;
        "";
        var n = new z(r(u.global, u.time));
        a = {
            defaultOptions: u,
            defaultTime: n,
            getOptions: function () {
                return u
            },
            setOptions: function (a) {
                r(!0, u, a);
                if (a.time || a.global) C.time ?
                    C.time.update(r(u.global, u.time, a.global, a.time)) : C.time = n;
                return u
            }
        };
        "";
        return a
    });
    M(a, "Core/Animation/Fx.js", [a["Core/Color/Color.js"], a["Core/Globals.js"], a["Core/Utilities.js"]], function (a, w, C) {
        var r = a.parse,
            z = w.win,
            x = C.isNumber,
            J = C.objectEach;
        return function () {
            function a(a, m, g) {
                this.pos = NaN;
                this.options = m;
                this.elem = a;
                this.prop = g
            }
            a.prototype.dSetter = function () {
                var a = this.paths,
                    m = a && a[0];
                a = a && a[1];
                var g = this.now || 0,
                    c = [];
                if (1 !== g && m && a)
                    if (m.length === a.length && 1 > g)
                        for (var e = 0; e < a.length; e++) {
                            for (var l =
                                    m[e], f = a[e], v = [], q = 0; q < f.length; q++) {
                                var k = l[q],
                                    I = f[q];
                                x(k) && x(I) && ("A" !== f[0] || 4 !== q && 5 !== q) ? v[q] = k + g * (I - k) : v[q] = I
                            }
                            c.push(v)
                        } else c = a;
                    else c = this.toD || [];
                this.elem.attr("d", c, void 0, !0)
            };
            a.prototype.update = function () {
                var a = this.elem,
                    m = this.prop,
                    g = this.now,
                    c = this.options.step;
                if (this[m + "Setter"]) this[m + "Setter"]();
                else a.attr ? a.element && a.attr(m, g, null, !0) : a.style[m] = g + this.unit;
                c && c.call(a, g, this)
            };
            a.prototype.run = function (n, m, g) {
                var c = this,
                    e = c.options,
                    l = function (e) {
                        return l.stopped ? !1 : c.step(e)
                    },
                    f = z.requestAnimationFrame || function (c) {
                        setTimeout(c, 13)
                    },
                    v = function () {
                        for (var c = 0; c < a.timers.length; c++) a.timers[c]() || a.timers.splice(c--, 1);
                        a.timers.length && f(v)
                    };
                n !== m || this.elem["forceAnimate:" + this.prop] ? (this.startTime = +new Date, this.start = n, this.end = m, this.unit = g, this.now = this.start, this.pos = 0, l.elem = this.elem, l.prop = this.prop, l() && 1 === a.timers.push(l) && f(v)) : (delete e.curAnim[this.prop], e.complete && 0 === Object.keys(e.curAnim).length && e.complete.call(this.elem))
            };
            a.prototype.step = function (a) {
                var m = +new Date,
                    g = this.options,
                    c = this.elem,
                    e = g.complete,
                    l = g.duration,
                    f = g.curAnim;
                if (c.attr && !c.element) a = !1;
                else if (a || m >= l + this.startTime) {
                    this.now = this.end;
                    this.pos = 1;
                    this.update();
                    var v = f[this.prop] = !0;
                    J(f, function (c) {
                        !0 !== c && (v = !1)
                    });
                    v && e && e.call(c);
                    a = !1
                } else this.pos = g.easing((m - this.startTime) / l), this.now = this.start + (this.end - this.start) * this.pos, this.update(), a = !0;
                return a
            };
            a.prototype.initPath = function (a, m, g) {
                function c(c, e) {
                    for (; c.length < D;) {
                        var f = c[0],
                            h = e[D - c.length];
                        h && "M" === f[0] && (c[0] = "C" ===
                            h[0] ? ["C", f[1], f[2], f[1], f[2], f[1], f[2]] : ["L", f[1], f[2]]);
                        c.unshift(f);
                        v && (f = c.pop(), c.push(c[c.length - 1], f))
                    }
                }

                function e(c, e) {
                    for (; c.length < D;)
                        if (e = c[Math.floor(c.length / q) - 1].slice(), "C" === e[0] && (e[1] = e[5], e[2] = e[6]), v) {
                            var f = c[Math.floor(c.length / q)].slice();
                            c.splice(c.length / 2, 0, e, f)
                        } else c.push(e)
                }
                var l = a.startX,
                    f = a.endX;
                g = g.slice();
                var v = a.isArea,
                    q = v ? 2 : 1;
                m = m && m.slice();
                if (!m) return [g, g];
                if (l && f && f.length) {
                    for (a = 0; a < l.length; a++)
                        if (l[a] === f[0]) {
                            var k = a;
                            break
                        } else if (l[0] === f[f.length - l.length +
                            a]) {
                        k = a;
                        var I = !0;
                        break
                    } else if (l[l.length - 1] === f[f.length - l.length + a]) {
                        k = l.length - a;
                        break
                    }
                    "undefined" === typeof k && (m = [])
                }
                if (m.length && x(k)) {
                    var D = g.length + k * q;
                    I ? (c(m, g), e(g, m)) : (c(g, m), e(m, g))
                }
                return [m, g]
            };
            a.prototype.fillSetter = function () {
                a.prototype.strokeSetter.apply(this, arguments)
            };
            a.prototype.strokeSetter = function () {
                this.elem.attr(this.prop, r(this.start).tweenTo(r(this.end), this.pos), null, !0)
            };
            a.timers = [];
            return a
        }()
    });
    M(a, "Core/Animation/AnimationUtilities.js", [a["Core/Animation/Fx.js"], a["Core/Utilities.js"]],
        function (a, w) {
            function r(c) {
                return n(c) ? m({
                    duration: 500,
                    defer: 0
                }, c) : {
                    duration: c ? 500 : 0,
                    defer: 0
                }
            }

            function E(c, g) {
                for (var e = a.timers.length; e--;) a.timers[e].elem !== c || g && g !== a.timers[e].prop || (a.timers[e].stopped = !0)
            }
            var z = w.defined,
                x = w.getStyle,
                J = w.isArray,
                u = w.isNumber,
                n = w.isObject,
                m = w.merge,
                g = w.objectEach,
                c = w.pick;
            return {
                animate: function (c, l, f) {
                    var e, q = "",
                        k, I;
                    if (!n(f)) {
                        var D = arguments;
                        f = {
                            duration: D[2],
                            easing: D[3],
                            complete: D[4]
                        }
                    }
                    u(f.duration) || (f.duration = 400);
                    f.easing = "function" === typeof f.easing ?
                        f.easing : Math[f.easing] || Math.easeInOutSine;
                    f.curAnim = m(l);
                    g(l, function (g, v) {
                        E(c, v);
                        I = new a(c, f, v);
                        k = void 0;
                        "d" === v && J(l.d) ? (I.paths = I.initPath(c, c.pathArray, l.d), I.toD = l.d, e = 0, k = 1) : c.attr ? e = c.attr(v) : (e = parseFloat(x(c, v)) || 0, "opacity" !== v && (q = "px"));
                        k || (k = g);
                        "string" === typeof k && k.match("px") && (k = k.replace(/px/g, ""));
                        I.run(e, k, q)
                    })
                },
                animObject: r,
                getDeferredAnimation: function (c, g, f) {
                    var e = r(g),
                        a = 0,
                        k = 0;
                    (f ? [f] : c.series).forEach(function (c) {
                        c = r(c.options.animation);
                        a = g && z(g.defer) ? e.defer : Math.max(a,
                            c.duration + c.defer);
                        k = Math.min(e.duration, c.duration)
                    });
                    c.renderer.forExport && (a = 0);
                    return {
                        defer: Math.max(0, a - k),
                        duration: Math.min(a, k)
                    }
                },
                setAnimation: function (e, g) {
                    g.renderer.globalAnimation = c(e, g.options.chart.animation, !0)
                },
                stop: E
            }
        });
    M(a, "Core/Renderer/HTML/AST.js", [a["Core/Globals.js"], a["Core/Utilities.js"]], function (a, w) {
        var r = a.SVG_NS,
            E = w.attr,
            z = w.createElement,
            x = w.discardElement,
            J = w.error,
            u = w.isString,
            n = w.objectEach,
            m = w.splat;
        try {
            var g = !!(new DOMParser).parseFromString("", "text/html")
        } catch (c) {
            g = !1
        }
        w = function () {
            function c(c) {
                this.nodes = "string" === typeof c ? this.parseMarkup(c) : c
            }
            c.filterUserAttributes = function (e) {
                n(e, function (g, f) {
                    var a = !0; - 1 === c.allowedAttributes.indexOf(f) && (a = !1); - 1 !== ["background", "dynsrc", "href", "lowsrc", "src"].indexOf(f) && (a = u(g) && c.allowedReferences.some(function (c) {
                        return 0 === g.indexOf(c)
                    }));
                    a || (J("Highcharts warning: Invalid attribute '" + f + "' in config"), delete e[f])
                });
                return e
            };
            c.setElementHTML = function (e, g) {
                e.innerHTML = "";
                g && (new c(g)).addToDOM(e)
            };
            c.prototype.addToDOM =
                function (e) {
                    function g(e, l) {
                        var f;
                        m(e).forEach(function (e) {
                            var k = e.tagName,
                                q = e.textContent ? a.doc.createTextNode(e.textContent) : void 0;
                            if (k)
                                if ("#text" === k) var v = q;
                                else if (-1 !== c.allowedTags.indexOf(k)) {
                                k = a.doc.createElementNS("svg" === k ? r : l.namespaceURI || r, k);
                                var m = e.attributes || {};
                                n(e, function (c, h) {
                                    "tagName" !== h && "attributes" !== h && "children" !== h && "textContent" !== h && (m[h] = c)
                                });
                                E(k, c.filterUserAttributes(m));
                                q && k.appendChild(q);
                                g(e.children || [], k);
                                v = k
                            } else J("Highcharts warning: Invalid tagName '" + k +
                                "' in config");
                            v && l.appendChild(v);
                            f = v
                        });
                        return f
                    }
                    return g(this.nodes, e)
                };
            c.prototype.parseMarkup = function (c) {
                var e = [];
                c = c.trim();
                if (g) c = (new DOMParser).parseFromString(c, "text/html");
                else {
                    var f = z("div");
                    f.innerHTML = c;
                    c = {
                        body: f
                    }
                }
                var a = function (c, e) {
                    var f = c.nodeName.toLowerCase(),
                        k = {
                            tagName: f
                        };
                    "#text" === f && (k.textContent = c.textContent || "");
                    if (f = c.attributes) {
                        var g = {};
                        [].forEach.call(f, function (c) {
                            g[c.name] = c.value
                        });
                        k.attributes = g
                    }
                    if (c.childNodes.length) {
                        var l = [];
                        [].forEach.call(c.childNodes, function (c) {
                            a(c,
                                l)
                        });
                        l.length && (k.children = l)
                    }
                    e.push(k)
                };
                [].forEach.call(c.body.childNodes, function (c) {
                    return a(c, e)
                });
                f && x(f);
                return e
            };
            c.allowedAttributes = "aria-controls aria-describedby aria-expanded aria-haspopup aria-hidden aria-label aria-labelledby aria-live aria-pressed aria-readonly aria-roledescription aria-selected class clip-path color colspan cx cy d dx dy disabled fill height href id in markerHeight markerWidth offset opacity orient padding paddingLeft paddingRight patternUnits r refX refY role scope slope src startOffset stdDeviation stroke stroke-linecap stroke-width style tableValues result rowspan summary target tabindex text-align textAnchor textLength type valign width x x1 x2 y y1 y2 zIndex".split(" ");
            c.allowedReferences = "https:// http:// mailto: / ../ ./ #".split(" ");
            c.allowedTags = "a b br button caption circle clipPath code dd defs div dl dt em feComponentTransfer feFuncA feFuncB feFuncG feFuncR feGaussianBlur feOffset feMerge feMergeNode filter h1 h2 h3 h4 h5 h6 hr i img li linearGradient marker ol p path pattern pre rect small span stop strong style sub sup svg table text thead tbody tspan td th tr u ul #text".split(" ");
            return c
        }();
        "";
        return w
    });
    M(a, "Core/FormatUtilities.js", [a["Core/DefaultOptions.js"],
        a["Core/Utilities.js"]
    ], function (a, w) {
        function r(a, g, c, e) {
            a = +a || 0;
            g = +g;
            var l = E.lang,
                f = (a.toString().split(".")[1] || "").split("e")[0].length,
                v = a.toString().split("e"),
                q = g;
            if (-1 === g) g = Math.min(f, 20);
            else if (!J(g)) g = 2;
            else if (g && v[1] && 0 > v[1]) {
                var k = g + +v[1];
                0 <= k ? (v[0] = (+v[0]).toExponential(k).split("e")[0], g = k) : (v[0] = v[0].split(".")[0] || 0, a = 20 > g ? (v[0] * Math.pow(10, v[1])).toFixed(g) : 0, v[1] = 0)
            }
            k = (Math.abs(v[1] ? v[0] : a) + Math.pow(10, -Math.max(g, f) - 1)).toFixed(g);
            f = String(n(k));
            var m = 3 < f.length ? f.length % 3 :
                0;
            c = u(c, l.decimalPoint);
            e = u(e, l.thousandsSep);
            a = (0 > a ? "-" : "") + (m ? f.substr(0, m) + e : "");
            a = 0 > +v[1] && !q ? "0" : a + f.substr(m).replace(/(\d{3})(?=\d)/g, "$1" + e);
            g && (a += c + k.slice(-g));
            v[1] && 0 !== +a && (a += "e" + v[1]);
            return a
        }
        var E = a.defaultOptions,
            z = a.defaultTime,
            x = w.getNestedProperty,
            J = w.isNumber,
            u = w.pick,
            n = w.pInt;
        return {
            dateFormat: function (a, g, c) {
                return z.dateFormat(a, g, c)
            },
            format: function (a, g, c) {
                var e = "{",
                    l = !1,
                    f = /f$/,
                    v = /\.([0-9])/,
                    q = E.lang,
                    k = c && c.time || z;
                c = c && c.numberFormatter || r;
                for (var m = []; a;) {
                    var D = a.indexOf(e);
                    if (-1 === D) break;
                    var B = a.slice(0, D);
                    if (l) {
                        B = B.split(":");
                        e = x(B.shift() || "", g);
                        if (B.length && "number" === typeof e)
                            if (B = B.join(":"), f.test(B)) {
                                var u = parseInt((B.match(v) || ["", "-1"])[1], 10);
                                null !== e && (e = c(e, u, q.decimalPoint, -1 < B.indexOf(",") ? q.thousandsSep : ""))
                            } else e = k.dateFormat(B, e);
                        m.push(e)
                    } else m.push(B);
                    a = a.slice(D + 1);
                    e = (l = !l) ? "}" : "{"
                }
                m.push(a);
                return m.join("")
            },
            numberFormat: r
        }
    });
    M(a, "Core/Renderer/RendererUtilities.js", [a["Core/Utilities.js"]], function (a) {
        var r = a.clamp,
            C = a.pick,
            E = a.stableSort,
            z;
        (function (a) {
            function x(a, n, m) {
                var g = a,
                    c = g.reducedLen || n,
                    e = function (c, e) {
                        return (e.rank || 0) - (c.rank || 0)
                    },
                    l = function (c, e) {
                        return c.target - e.target
                    },
                    f, v = !0,
                    q = [],
                    k = 0;
                for (f = a.length; f--;) k += a[f].size;
                if (k > c) {
                    E(a, e);
                    for (k = f = 0; k <= c;) k += a[f].size, f++;
                    q = a.splice(f - 1, a.length)
                }
                E(a, l);
                for (a = a.map(function (c) {
                        return {
                            size: c.size,
                            targets: [c.target],
                            align: C(c.align, .5)
                        }
                    }); v;) {
                    for (f = a.length; f--;) c = a[f], e = (Math.min.apply(0, c.targets) + Math.max.apply(0, c.targets)) / 2, c.pos = r(e - c.size * c.align, 0, n - c.size);
                    f = a.length;
                    for (v = !1; f--;) 0 < f && a[f - 1].pos + a[f - 1].size > a[f].pos && (a[f - 1].size += a[f].size, a[f - 1].targets = a[f - 1].targets.concat(a[f].targets), a[f - 1].align = .5, a[f - 1].pos + a[f - 1].size > n && (a[f - 1].pos = n - a[f - 1].size), a.splice(f, 1), v = !0)
                }
                g.push.apply(g, q);
                f = 0;
                a.some(function (c) {
                    var e = 0;
                    return (c.targets || []).some(function () {
                        g[f].pos = c.pos + e;
                        if ("undefined" !== typeof m && Math.abs(g[f].pos - g[f].target) > m) return g.slice(0, f + 1).forEach(function (c) {
                            return delete c.pos
                        }), g.reducedLen = (g.reducedLen || n) - .1 * n, g.reducedLen > .1 * n && x(g,
                            n, m), !0;
                        e += g[f].size;
                        f++;
                        return !1
                    })
                });
                E(g, l);
                return g
            }
            a.distribute = x
        })(z || (z = {}));
        return z
    });
    M(a, "Core/Renderer/SVG/SVGElement.js", [a["Core/Animation/AnimationUtilities.js"], a["Core/Renderer/HTML/AST.js"], a["Core/Color/Color.js"], a["Core/Globals.js"], a["Core/Color/Palette.js"], a["Core/Utilities.js"]], function (a, w, C, E, z, x) {
        var r = a.animate,
            u = a.animObject,
            n = a.stop,
            m = E.deg2rad,
            g = E.doc,
            c = E.noop,
            e = E.svg,
            l = E.SVG_NS,
            f = E.win,
            v = x.addEvent,
            q = x.attr,
            k = x.createElement,
            I = x.css,
            D = x.defined,
            B = x.erase,
            O = x.extend,
            t = x.fireEvent,
            h = x.isArray,
            d = x.isFunction,
            b = x.isNumber,
            p = x.isString,
            G = x.merge,
            y = x.objectEach,
            L = x.pick,
            F = x.pInt,
            P = x.syncTimeout,
            S = x.uniqueKey;
        a = function () {
            function a() {
                this.element = void 0;
                this.onEvents = {};
                this.opacity = 1;
                this.renderer = void 0;
                this.SVG_NS = l;
                this.symbolCustomAttribs = "x y width height r start end innerR anchorX anchorY rounded".split(" ")
            }
            a.prototype._defaultGetter = function (b) {
                b = L(this[b + "Value"], this[b], this.element ? this.element.getAttribute(b) : null, 0);
                /^[\-0-9\.]+$/.test(b) && (b = parseFloat(b));
                return b
            };
            a.prototype._defaultSetter = function (b, d, c) {
                c.setAttribute(d, b)
            };
            a.prototype.add = function (b) {
                var d = this.renderer,
                    c = this.element;
                b && (this.parentGroup = b);
                this.parentInverted = b && b.inverted;
                "undefined" !== typeof this.textStr && "text" === this.element.nodeName && d.buildText(this);
                this.added = !0;
                if (!b || b.handleZ || this.zIndex) var K = this.zIndexSetter();
                K || (b ? b.element : d.box).appendChild(c);
                if (this.onAdd) this.onAdd();
                return this
            };
            a.prototype.addClass = function (b, d) {
                var c = d ? "" : this.attr("class") || "";
                b = (b ||
                    "").split(/ /g).reduce(function (b, d) {
                    -1 === c.indexOf(d) && b.push(d);
                    return b
                }, c ? [c] : []).join(" ");
                b !== c && this.attr("class", b);
                return this
            };
            a.prototype.afterSetters = function () {
                this.doTransform && (this.updateTransform(), this.doTransform = !1)
            };
            a.prototype.align = function (b, d, c) {
                var K = {},
                    h = this.renderer,
                    H = h.alignedObjects,
                    a, e, A;
                if (b) {
                    if (this.alignOptions = b, this.alignByTranslate = d, !c || p(c)) this.alignTo = a = c || "renderer", B(H, this), H.push(this), c = void 0
                } else b = this.alignOptions, d = this.alignByTranslate, a = this.alignTo;
                c = L(c, h[a], "scrollablePlotBox" === a ? h.plotBox : void 0, h);
                a = b.align;
                var f = b.verticalAlign;
                h = (c.x || 0) + (b.x || 0);
                H = (c.y || 0) + (b.y || 0);
                "right" === a ? e = 1 : "center" === a && (e = 2);
                e && (h += (c.width - (b.width || 0)) / e);
                K[d ? "translateX" : "x"] = Math.round(h);
                "bottom" === f ? A = 1 : "middle" === f && (A = 2);
                A && (H += (c.height - (b.height || 0)) / A);
                K[d ? "translateY" : "y"] = Math.round(H);
                this[this.placed ? "animate" : "attr"](K);
                this.placed = !0;
                this.alignAttr = K;
                return this
            };
            a.prototype.alignSetter = function (b) {
                var d = {
                    left: "start",
                    center: "middle",
                    right: "end"
                };
                d[b] && (this.alignValue = b, this.element.setAttribute("text-anchor", d[b]))
            };
            a.prototype.animate = function (b, d, c) {
                var h = this,
                    H = u(L(d, this.renderer.globalAnimation, !0));
                d = H.defer;
                L(g.hidden, g.msHidden, g.webkitHidden, !1) && (H.duration = 0);
                0 !== H.duration ? (c && (H.complete = c), P(function () {
                    h.element && r(h, b, H)
                }, d)) : (this.attr(b, void 0, c), y(b, function (b, d) {
                    H.step && H.step.call(this, b, {
                        prop: d,
                        pos: 1,
                        elem: this
                    })
                }, this));
                return this
            };
            a.prototype.applyTextOutline = function (b) {
                var d = this.element; - 1 !== b.indexOf("contrast") &&
                    (b = b.replace(/contrast/g, this.renderer.getContrast(d.style.fill)));
                var c = b.split(" ");
                b = c[c.length - 1];
                if ((c = c[0]) && "none" !== c && E.svg) {
                    this.fakeTS = !0;
                    this.ySetter = this.xSetter;
                    c = c.replace(/(^[\d\.]+)(.*?)$/g, function (b, d, c) {
                        return 2 * Number(d) + c
                    });
                    this.removeTextOutline();
                    var h = g.createElementNS(l, "tspan");
                    q(h, {
                        "class": "highcharts-text-outline",
                        fill: b,
                        stroke: b,
                        "stroke-width": c,
                        "stroke-linejoin": "round"
                    });
                    [].forEach.call(d.childNodes, function (b) {
                        var d = b.cloneNode(!0);
                        d.removeAttribute && ["fill", "stroke",
                            "stroke-width", "stroke"
                        ].forEach(function (b) {
                            return d.removeAttribute(b)
                        });
                        h.appendChild(d)
                    });
                    var a = g.createElementNS(l, "tspan");
                    a.textContent = "\u200b";
                    ["x", "y"].forEach(function (b) {
                        var c = d.getAttribute(b);
                        c && a.setAttribute(b, c)
                    });
                    h.appendChild(a);
                    d.insertBefore(h, d.firstChild)
                }
            };
            a.prototype.attr = function (b, d, c, h) {
                var K = this.element,
                    H = this.symbolCustomAttribs,
                    a, e = this,
                    A, p;
                if ("string" === typeof b && "undefined" !== typeof d) {
                    var f = b;
                    b = {};
                    b[f] = d
                }
                "string" === typeof b ? e = (this[b + "Getter"] || this._defaultGetter).call(this,
                    b, K) : (y(b, function (d, c) {
                    A = !1;
                    h || n(this, c);
                    this.symbolName && -1 !== H.indexOf(c) && (a || (this.symbolAttr(b), a = !0), A = !0);
                    !this.rotation || "x" !== c && "y" !== c || (this.doTransform = !0);
                    A || (p = this[c + "Setter"] || this._defaultSetter, p.call(this, d, c, K), !this.styledMode && this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(c) && this.updateShadows(c, d, p))
                }, this), this.afterSetters());
                c && c.call(this);
                return e
            };
            a.prototype.clip = function (b) {
                return this.attr("clip-path", b ? "url(" + this.renderer.url + "#" + b.id +
                    ")" : "none")
            };
            a.prototype.crisp = function (b, d) {
                d = d || b.strokeWidth || 0;
                var c = Math.round(d) % 2 / 2;
                b.x = Math.floor(b.x || this.x || 0) + c;
                b.y = Math.floor(b.y || this.y || 0) + c;
                b.width = Math.floor((b.width || this.width || 0) - 2 * c);
                b.height = Math.floor((b.height || this.height || 0) - 2 * c);
                D(b.strokeWidth) && (b.strokeWidth = d);
                return b
            };
            a.prototype.complexColor = function (b, d, c) {
                var K = this.renderer,
                    a, H, e, p, A, f, k, g, l, q, v = [],
                    F;
                t(this.renderer, "complexColor", {
                    args: arguments
                }, function () {
                    b.radialGradient ? H = "radialGradient" : b.linearGradient &&
                        (H = "linearGradient");
                    if (H) {
                        e = b[H];
                        A = K.gradients;
                        f = b.stops;
                        l = c.radialReference;
                        h(e) && (b[H] = e = {
                            x1: e[0],
                            y1: e[1],
                            x2: e[2],
                            y2: e[3],
                            gradientUnits: "userSpaceOnUse"
                        });
                        "radialGradient" === H && l && !D(e.gradientUnits) && (p = e, e = G(e, K.getRadialAttr(l, p), {
                            gradientUnits: "userSpaceOnUse"
                        }));
                        y(e, function (b, d) {
                            "id" !== d && v.push(d, b)
                        });
                        y(f, function (b) {
                            v.push(b)
                        });
                        v = v.join(",");
                        if (A[v]) q = A[v].attr("id");
                        else {
                            e.id = q = S();
                            var N = A[v] = K.createElement(H).attr(e).add(K.defs);
                            N.radAttr = p;
                            N.stops = [];
                            f.forEach(function (b) {
                                0 === b[1].indexOf("rgba") ?
                                    (a = C.parse(b[1]), k = a.get("rgb"), g = a.get("a")) : (k = b[1], g = 1);
                                b = K.createElement("stop").attr({
                                    offset: b[0],
                                    "stop-color": k,
                                    "stop-opacity": g
                                }).add(N);
                                N.stops.push(b)
                            })
                        }
                        F = "url(" + K.url + "#" + q + ")";
                        c.setAttribute(d, F);
                        c.gradient = v;
                        b.toString = function () {
                            return F
                        }
                    }
                })
            };
            a.prototype.css = function (b) {
                var d = this.styles,
                    c = {},
                    h = this.element,
                    a = ["textOutline", "textOverflow", "width"],
                    p = "",
                    f = !d;
                b && b.color && (b.fill = b.color);
                d && y(b, function (b, h) {
                    d && d[h] !== b && (c[h] = b, f = !0)
                });
                if (f) {
                    d && (b = O(d, c));
                    if (b)
                        if (null === b.width || "auto" ===
                            b.width) delete this.textWidth;
                        else if ("text" === h.nodeName.toLowerCase() && b.width) var k = this.textWidth = F(b.width);
                    this.styles = b;
                    k && !e && this.renderer.forExport && delete b.width;
                    if (h.namespaceURI === this.SVG_NS) {
                        var A = function (b, d) {
                            return "-" + d.toLowerCase()
                        };
                        y(b, function (b, d) {
                            -1 === a.indexOf(d) && (p += d.replace(/([A-Z])/g, A) + ":" + b + ";")
                        });
                        p && q(h, "style", p)
                    } else I(h, b);
                    this.added && ("text" === this.element.nodeName && this.renderer.buildText(this), b && b.textOutline && this.applyTextOutline(b.textOutline))
                }
                return this
            };
            a.prototype.dashstyleSetter = function (b) {
                var d = this["stroke-width"];
                "inherit" === d && (d = 1);
                if (b = b && b.toLowerCase()) {
                    var c = b.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",");
                    for (b = c.length; b--;) c[b] = "" + F(c[b]) * L(d, NaN);
                    b = c.join(",").replace(/NaN/g, "none");
                    this.element.setAttribute("stroke-dasharray", b)
                }
            };
            a.prototype.destroy =
                function () {
                    var b = this,
                        d = b.element || {},
                        c = b.renderer,
                        h = d.ownerSVGElement,
                        a = c.isSVG && "SPAN" === d.nodeName && b.parentGroup || void 0;
                    d.onclick = d.onmouseout = d.onmouseover = d.onmousemove = d.point = null;
                    n(b);
                    if (b.clipPath && h) {
                        var e = b.clipPath;
                        [].forEach.call(h.querySelectorAll("[clip-path],[CLIP-PATH]"), function (b) {
                            -1 < b.getAttribute("clip-path").indexOf(e.element.id) && b.removeAttribute("clip-path")
                        });
                        b.clipPath = e.destroy()
                    }
                    if (b.stops) {
                        for (h = 0; h < b.stops.length; h++) b.stops[h].destroy();
                        b.stops.length = 0;
                        b.stops = void 0
                    }
                    b.safeRemoveChild(d);
                    for (c.styledMode || b.destroyShadows(); a && a.div && 0 === a.div.childNodes.length;) d = a.parentGroup, b.safeRemoveChild(a.div), delete a.div, a = d;
                    b.alignTo && B(c.alignedObjects, b);
                    y(b, function (d, c) {
                        b[c] && b[c].parentGroup === b && b[c].destroy && b[c].destroy();
                        delete b[c]
                    })
                };
            a.prototype.destroyShadows = function () {
                (this.shadows || []).forEach(function (b) {
                    this.safeRemoveChild(b)
                }, this);
                this.shadows = void 0
            };
            a.prototype.destroyTextPath = function (b, d) {
                var c = b.getElementsByTagName("text")[0];
                if (c) {
                    if (c.removeAttribute("dx"),
                        c.removeAttribute("dy"), d.element.setAttribute("id", ""), this.textPathWrapper && c.getElementsByTagName("textPath").length) {
                        for (b = this.textPathWrapper.element.childNodes; b.length;) c.appendChild(b[0]);
                        c.removeChild(this.textPathWrapper.element)
                    }
                } else if (b.getAttribute("dx") || b.getAttribute("dy")) b.removeAttribute("dx"), b.removeAttribute("dy");
                this.textPathWrapper && (this.textPathWrapper = this.textPathWrapper.destroy())
            };
            a.prototype.dSetter = function (b, d, c) {
                h(b) && ("string" === typeof b[0] && (b = this.renderer.pathToSegments(b)),
                    this.pathArray = b, b = b.reduce(function (b, d, c) {
                        return d && d.join ? (c ? b + " " : "") + d.join(" ") : (d || "").toString()
                    }, ""));
                /(NaN| {2}|^$)/.test(b) && (b = "M 0 0");
                this[d] !== b && (c.setAttribute(d, b), this[d] = b)
            };
            a.prototype.fadeOut = function (b) {
                var d = this;
                d.animate({
                    opacity: 0
                }, {
                    duration: L(b, 150),
                    complete: function () {
                        d.attr({
                            y: -9999
                        }).hide()
                    }
                })
            };
            a.prototype.fillSetter = function (b, d, c) {
                "string" === typeof b ? c.setAttribute(d, b) : b && this.complexColor(b, d, c)
            };
            a.prototype.getBBox = function (b, c) {
                var h = this.renderer,
                    K = this.element,
                    e = this.styles,
                    p = this.textStr,
                    f = h.cache,
                    k = h.cacheKeys,
                    A = K.namespaceURI === this.SVG_NS;
                c = L(c, this.rotation, 0);
                var g = h.styledMode ? K && a.prototype.getStyle.call(K, "font-size") : e && e.fontSize,
                    y;
                if (D(p)) {
                    var G = p.toString(); - 1 === G.indexOf("<") && (G = G.replace(/[0-9]/g, "0"));
                    G += ["", c, g, this.textWidth, e && e.textOverflow, e && e.fontWeight].join()
                }
                G && !b && (y = f[G]);
                if (!y) {
                    if (A || h.forExport) {
                        try {
                            var l = this.fakeTS && function (b) {
                                var d = K.querySelector(".highcharts-text-outline");
                                d && I(d, {
                                    display: b
                                })
                            };
                            d(l) && l("none");
                            y = K.getBBox ?
                                O({}, K.getBBox()) : {
                                    width: K.offsetWidth,
                                    height: K.offsetHeight
                                };
                            d(l) && l("")
                        } catch (Y) {
                            ""
                        }
                        if (!y || 0 > y.width) y = {
                            width: 0,
                            height: 0
                        }
                    } else y = this.htmlGetBBox();
                    h.isSVG && (b = y.width, h = y.height, A && (y.height = h = {
                        "11px,17": 14,
                        "13px,20": 16
                    } [e && e.fontSize + "," + Math.round(h)] || h), c && (e = c * m, y.width = Math.abs(h * Math.sin(e)) + Math.abs(b * Math.cos(e)), y.height = Math.abs(h * Math.cos(e)) + Math.abs(b * Math.sin(e))));
                    if (G && ("" === p || 0 < y.height)) {
                        for (; 250 < k.length;) delete f[k.shift()];
                        f[G] || k.push(G);
                        f[G] = y
                    }
                }
                return y
            };
            a.prototype.getStyle =
                function (b) {
                    return f.getComputedStyle(this.element || this, "").getPropertyValue(b)
                };
            a.prototype.hasClass = function (b) {
                return -1 !== ("" + this.attr("class")).split(" ").indexOf(b)
            };
            a.prototype.hide = function (b) {
                b ? this.attr({
                    y: -9999
                }) : this.attr({
                    visibility: "hidden"
                });
                return this
            };
            a.prototype.htmlGetBBox = function () {
                return {
                    height: 0,
                    width: 0,
                    x: 0,
                    y: 0
                }
            };
            a.prototype.init = function (b, d) {
                this.element = "span" === d ? k(d) : g.createElementNS(this.SVG_NS, d);
                this.renderer = b;
                t(this, "afterInit")
            };
            a.prototype.invert = function (b) {
                this.inverted =
                    b;
                this.updateTransform();
                return this
            };
            a.prototype.on = function (b, d) {
                var c = this.onEvents;
                if (c[b]) c[b]();
                c[b] = v(this.element, b, d);
                return this
            };
            a.prototype.opacitySetter = function (b, d, c) {
                this.opacity = b = Number(Number(b).toFixed(3));
                c.setAttribute(d, b)
            };
            a.prototype.removeClass = function (b) {
                return this.attr("class", ("" + this.attr("class")).replace(p(b) ? new RegExp("(^| )" + b + "( |$)") : b, " ").replace(/ +/g, " ").trim())
            };
            a.prototype.removeTextOutline = function () {
                var b = this.element.querySelector("tspan.highcharts-text-outline");
                b && this.safeRemoveChild(b)
            };
            a.prototype.safeRemoveChild = function (b) {
                var d = b.parentNode;
                d && d.removeChild(b)
            };
            a.prototype.setRadialReference = function (b) {
                var d = this.element.gradient && this.renderer.gradients[this.element.gradient];
                this.element.radialReference = b;
                d && d.radAttr && d.animate(this.renderer.getRadialAttr(b, d.radAttr));
                return this
            };
            a.prototype.setTextPath = function (d, h) {
                var a = this.element,
                    K = this.text ? this.text.element : a,
                    e = {
                        textAnchor: "text-anchor"
                    },
                    p = !1,
                    f = this.textPathWrapper,
                    k = !f;
                h = G(!0, {
                    enabled: !0,
                    attributes: {
                        dy: -5,
                        startOffset: "50%",
                        textAnchor: "middle"
                    }
                }, h);
                var A = w.filterUserAttributes(h.attributes);
                if (d && h && h.enabled) {
                    f && null === f.element.parentNode ? (k = !0, f = f.destroy()) : f && this.removeTextOutline.call(f.parentGroup);
                    this.options && this.options.padding && (A.dx = -this.options.padding);
                    f || (this.textPathWrapper = f = this.renderer.createElement("textPath"), p = !0);
                    var g = f.element;
                    (h = d.element.getAttribute("id")) || d.element.setAttribute("id", h = S());
                    if (k)
                        for (K.setAttribute("y", 0), b(A.dx) && K.setAttribute("x",
                                -A.dx), d = [].slice.call(K.childNodes), k = 0; k < d.length; k++) {
                            var l = d[k];
                            l.nodeType !== Node.TEXT_NODE && "tspan" !== l.nodeName || g.appendChild(l)
                        }
                    p && f && f.add({
                        element: K
                    });
                    g.setAttributeNS("http://www.w3.org/1999/xlink", "href", this.renderer.url + "#" + h);
                    D(A.dy) && (g.parentNode.setAttribute("dy", A.dy), delete A.dy);
                    D(A.dx) && (g.parentNode.setAttribute("dx", A.dx), delete A.dx);
                    y(A, function (b, d) {
                        g.setAttribute(e[d] || d, b)
                    });
                    a.removeAttribute("transform");
                    this.removeTextOutline.call(f);
                    this.text && !this.renderer.styledMode &&
                        this.attr({
                            fill: "none",
                            "stroke-width": 0
                        });
                    this.applyTextOutline = this.updateTransform = c
                } else f && (delete this.updateTransform, delete this.applyTextOutline, this.destroyTextPath(a, d), this.updateTransform(), this.options && this.options.rotation && this.applyTextOutline(this.options.style.textOutline));
                return this
            };
            a.prototype.shadow = function (b, d, c) {
                var h = [],
                    a = this.element,
                    e = this.oldShadowOptions,
                    H = {
                        color: z.neutralColor100,
                        offsetX: this.parentInverted ? -1 : 1,
                        offsetY: this.parentInverted ? -1 : 1,
                        opacity: .15,
                        width: 3
                    },
                    p = !1,
                    A;
                !0 === b ? A = H : "object" === typeof b && (A = O(H, b));
                A && (A && e && y(A, function (b, d) {
                    b !== e[d] && (p = !0)
                }), p && this.destroyShadows(), this.oldShadowOptions = A);
                if (!A) this.destroyShadows();
                else if (!this.shadows) {
                    var f = A.opacity / A.width;
                    var k = this.parentInverted ? "translate(" + A.offsetY + ", " + A.offsetX + ")" : "translate(" + A.offsetX + ", " + A.offsetY + ")";
                    for (H = 1; H <= A.width; H++) {
                        var g = a.cloneNode(!1);
                        var G = 2 * A.width + 1 - 2 * H;
                        q(g, {
                            stroke: b.color || z.neutralColor100,
                            "stroke-opacity": f * H,
                            "stroke-width": G,
                            transform: k,
                            fill: "none"
                        });
                        g.setAttribute("class", (g.getAttribute("class") || "") + " highcharts-shadow");
                        c && (q(g, "height", Math.max(q(g, "height") - G, 0)), g.cutHeight = G);
                        d ? d.element.appendChild(g) : a.parentNode && a.parentNode.insertBefore(g, a);
                        h.push(g)
                    }
                    this.shadows = h
                }
                return this
            };
            a.prototype.show = function (b) {
                return this.attr({
                    visibility: b ? "inherit" : "visible"
                })
            };
            a.prototype.strokeSetter = function (b, d, c) {
                this[d] = b;
                this.stroke && this["stroke-width"] ? (a.prototype.fillSetter.call(this, this.stroke, "stroke", c), c.setAttribute("stroke-width",
                    this["stroke-width"]), this.hasStroke = !0) : "stroke-width" === d && 0 === b && this.hasStroke ? (c.removeAttribute("stroke"), this.hasStroke = !1) : this.renderer.styledMode && this["stroke-width"] && (c.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0)
            };
            a.prototype.strokeWidth = function () {
                if (!this.renderer.styledMode) return this["stroke-width"] || 0;
                var b = this.getStyle("stroke-width"),
                    d = 0;
                if (b.indexOf("px") === b.length - 2) d = F(b);
                else if ("" !== b) {
                    var c = g.createElementNS(l, "rect");
                    q(c, {
                        width: b,
                        "stroke-width": 0
                    });
                    this.element.parentNode.appendChild(c);
                    d = c.getBBox().width;
                    c.parentNode.removeChild(c)
                }
                return d
            };
            a.prototype.symbolAttr = function (b) {
                var d = this;
                "x y r start end width height innerR anchorX anchorY clockwise".split(" ").forEach(function (c) {
                    d[c] = L(b[c], d[c])
                });
                d.attr({
                    d: d.renderer.symbols[d.symbolName](d.x, d.y, d.width, d.height, d)
                })
            };
            a.prototype.textSetter = function (b) {
                b !== this.textStr && (delete this.textPxLength, this.textStr = b, this.added && this.renderer.buildText(this))
            };
            a.prototype.titleSetter = function (b) {
                var d =
                    this.element,
                    c = d.getElementsByTagName("title")[0] || g.createElementNS(this.SVG_NS, "title");
                d.insertBefore ? d.insertBefore(c, d.firstChild) : d.appendChild(c);
                c.textContent = String(L(b, "")).replace(/<[^>]*>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
            };
            a.prototype.toFront = function () {
                var b = this.element;
                b.parentNode.appendChild(b);
                return this
            };
            a.prototype.translate = function (b, d) {
                return this.attr({
                    translateX: b,
                    translateY: d
                })
            };
            a.prototype.updateShadows = function (b, d, c) {
                var h = this.shadows;
                if (h)
                    for (var a = h.length; a--;) c.call(h[a],
                        "height" === b ? Math.max(d - (h[a].cutHeight || 0), 0) : "d" === b ? this.d : d, b, h[a])
            };
            a.prototype.updateTransform = function () {
                var b = this.scaleX,
                    d = this.scaleY,
                    c = this.inverted,
                    h = this.rotation,
                    a = this.matrix,
                    e = this.element,
                    p = this.translateX || 0,
                    f = this.translateY || 0;
                c && (p += this.width, f += this.height);
                p = ["translate(" + p + "," + f + ")"];
                D(a) && p.push("matrix(" + a.join(",") + ")");
                c ? p.push("rotate(90) scale(-1,1)") : h && p.push("rotate(" + h + " " + L(this.rotationOriginX, e.getAttribute("x"), 0) + " " + L(this.rotationOriginY, e.getAttribute("y") ||
                    0) + ")");
                (D(b) || D(d)) && p.push("scale(" + L(b, 1) + " " + L(d, 1) + ")");
                p.length && e.setAttribute("transform", p.join(" "))
            };
            a.prototype.visibilitySetter = function (b, d, c) {
                "inherit" === b ? c.removeAttribute(d) : this[d] !== b && c.setAttribute(d, b);
                this[d] = b
            };
            a.prototype.xGetter = function (b) {
                "circle" === this.element.nodeName && ("x" === b ? b = "cx" : "y" === b && (b = "cy"));
                return this._defaultGetter(b)
            };
            a.prototype.zIndexSetter = function (b, d) {
                var c = this.renderer,
                    h = this.parentGroup,
                    a = (h || c).element || c.box,
                    e = this.element;
                c = a === c.box;
                var p = !1;
                var f = this.added;
                var A;
                D(b) ? (e.setAttribute("data-z-index", b), b = +b, this[d] === b && (f = !1)) : D(this[d]) && e.removeAttribute("data-z-index");
                this[d] = b;
                if (f) {
                    (b = this.zIndex) && h && (h.handleZ = !0);
                    d = a.childNodes;
                    for (A = d.length - 1; 0 <= A && !p; A--) {
                        h = d[A];
                        f = h.getAttribute("data-z-index");
                        var k = !D(f);
                        if (h !== e)
                            if (0 > b && k && !c && !A) a.insertBefore(e, d[A]), p = !0;
                            else if (F(f) <= b || k && (!D(b) || 0 <= b)) a.insertBefore(e, d[A + 1] || null), p = !0
                    }
                    p || (a.insertBefore(e, d[c ? 3 : 0] || null), p = !0)
                }
                return p
            };
            return a
        }();
        a.prototype["stroke-widthSetter"] =
            a.prototype.strokeSetter;
        a.prototype.yGetter = a.prototype.xGetter;
        a.prototype.matrixSetter = a.prototype.rotationOriginXSetter = a.prototype.rotationOriginYSetter = a.prototype.rotationSetter = a.prototype.scaleXSetter = a.prototype.scaleYSetter = a.prototype.translateXSetter = a.prototype.translateYSetter = a.prototype.verticalAlignSetter = function (b, d) {
            this[d] = b;
            this.doTransform = !0
        };
        "";
        return a
    });
    M(a, "Core/Renderer/RendererRegistry.js", [a["Core/Globals.js"]], function (a) {
        var r;
        (function (r) {
            r.rendererTypes = {};
            var w;
            r.getRendererType = function (a) {
                void 0 === a && (a = w);
                return r.rendererTypes[a] || r.rendererTypes[w]
            };
            r.registerRendererType = function (C, x, E) {
                r.rendererTypes[C] = x;
                if (!w || E) w = C, a.Renderer = x
            }
        })(r || (r = {}));
        return r
    });
    M(a, "Core/Renderer/SVG/SVGLabel.js", [a["Core/Renderer/SVG/SVGElement.js"], a["Core/Utilities.js"]], function (a, w) {
        var r = this && this.__extends || function () {
                var a = function (g, c) {
                    a = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function (c, a) {
                        c.__proto__ = a
                    } || function (c, a) {
                        for (var e in a) a.hasOwnProperty(e) &&
                            (c[e] = a[e])
                    };
                    return a(g, c)
                };
                return function (g, c) {
                    function e() {
                        this.constructor = g
                    }
                    a(g, c);
                    g.prototype = null === c ? Object.create(c) : (e.prototype = c.prototype, new e)
                }
            }(),
            E = w.defined,
            z = w.extend,
            x = w.isNumber,
            J = w.merge,
            u = w.pick,
            n = w.removeEvent;
        return function (m) {
            function g(c, a, l, f, v, q, k, I, D, B) {
                var e = m.call(this) || this;
                e.paddingLeftSetter = e.paddingSetter;
                e.paddingRightSetter = e.paddingSetter;
                e.init(c, "g");
                e.textStr = a;
                e.x = l;
                e.y = f;
                e.anchorX = q;
                e.anchorY = k;
                e.baseline = D;
                e.className = B;
                e.addClass("button" === B ? "highcharts-no-tooltip" :
                    "highcharts-label");
                B && e.addClass("highcharts-" + B);
                e.text = c.text(void 0, 0, 0, I).attr({
                    zIndex: 1
                });
                var t;
                "string" === typeof v && ((t = /^url\((.*?)\)$/.test(v)) || e.renderer.symbols[v]) && (e.symbolKey = v);
                e.bBox = g.emptyBBox;
                e.padding = 3;
                e.baselineOffset = 0;
                e.needsBox = c.styledMode || t;
                e.deferredAttr = {};
                e.alignFactor = 0;
                return e
            }
            r(g, m);
            g.prototype.alignSetter = function (c) {
                c = {
                    left: 0,
                    center: .5,
                    right: 1
                } [c];
                c !== this.alignFactor && (this.alignFactor = c, this.bBox && x(this.xSetting) && this.attr({
                    x: this.xSetting
                }))
            };
            g.prototype.anchorXSetter =
                function (c, a) {
                    this.anchorX = c;
                    this.boxAttr(a, Math.round(c) - this.getCrispAdjust() - this.xSetting)
                };
            g.prototype.anchorYSetter = function (c, a) {
                this.anchorY = c;
                this.boxAttr(a, c - this.ySetting)
            };
            g.prototype.boxAttr = function (c, a) {
                this.box ? this.box.attr(c, a) : this.deferredAttr[c] = a
            };
            g.prototype.css = function (c) {
                if (c) {
                    var e = {};
                    c = J(c);
                    g.textProps.forEach(function (a) {
                        "undefined" !== typeof c[a] && (e[a] = c[a], delete c[a])
                    });
                    this.text.css(e);
                    var l = "width" in e;
                    "fontSize" in e || "fontWeight" in e ? this.updateTextPadding() : l &&
                        this.updateBoxSize()
                }
                return a.prototype.css.call(this, c)
            };
            g.prototype.destroy = function () {
                n(this.element, "mouseenter");
                n(this.element, "mouseleave");
                this.text && this.text.destroy();
                this.box && (this.box = this.box.destroy());
                a.prototype.destroy.call(this)
            };
            g.prototype.fillSetter = function (c, a) {
                c && (this.needsBox = !0);
                this.fill = c;
                this.boxAttr(a, c)
            };
            g.prototype.getBBox = function () {
                this.textStr && 0 === this.bBox.width && 0 === this.bBox.height && this.updateBoxSize();
                var c = this.padding,
                    a = u(this.paddingLeft, c);
                return {
                    width: this.width,
                    height: this.height,
                    x: this.bBox.x - a,
                    y: this.bBox.y - c
                }
            };
            g.prototype.getCrispAdjust = function () {
                return this.renderer.styledMode && this.box ? this.box.strokeWidth() % 2 / 2 : (this["stroke-width"] ? parseInt(this["stroke-width"], 10) : 0) % 2 / 2
            };
            g.prototype.heightSetter = function (c) {
                this.heightSetting = c
            };
            g.prototype.onAdd = function () {
                var c = this.textStr;
                this.text.add(this);
                this.attr({
                    text: E(c) ? c : "",
                    x: this.x,
                    y: this.y
                });
                this.box && E(this.anchorX) && this.attr({
                    anchorX: this.anchorX,
                    anchorY: this.anchorY
                })
            };
            g.prototype.paddingSetter =
                function (c, a) {
                    x(c) ? c !== this[a] && (this[a] = c, this.updateTextPadding()) : this[a] = void 0
                };
            g.prototype.rSetter = function (c, a) {
                this.boxAttr(a, c)
            };
            g.prototype.shadow = function (c) {
                c && !this.renderer.styledMode && (this.updateBoxSize(), this.box && this.box.shadow(c));
                return this
            };
            g.prototype.strokeSetter = function (c, a) {
                this.stroke = c;
                this.boxAttr(a, c)
            };
            g.prototype["stroke-widthSetter"] = function (c, a) {
                c && (this.needsBox = !0);
                this["stroke-width"] = c;
                this.boxAttr(a, c)
            };
            g.prototype["text-alignSetter"] = function (c) {
                this.textAlign =
                    c
            };
            g.prototype.textSetter = function (c) {
                "undefined" !== typeof c && this.text.attr({
                    text: c
                });
                this.updateTextPadding()
            };
            g.prototype.updateBoxSize = function () {
                var c = this.text.element.style,
                    a = {},
                    l = this.padding,
                    f = this.bBox = x(this.widthSetting) && x(this.heightSetting) && !this.textAlign || !E(this.text.textStr) ? g.emptyBBox : this.text.getBBox();
                this.width = this.getPaddedWidth();
                this.height = (this.heightSetting || f.height || 0) + 2 * l;
                c = this.renderer.fontMetrics(c && c.fontSize, this.text);
                this.baselineOffset = l + Math.min((this.text.firstLineMetrics ||
                    c).b, f.height || Infinity);
                this.heightSetting && (this.baselineOffset += (this.heightSetting - c.h) / 2);
                this.needsBox && (this.box || (l = this.box = this.symbolKey ? this.renderer.symbol(this.symbolKey) : this.renderer.rect(), l.addClass(("button" === this.className ? "" : "highcharts-label-box") + (this.className ? " highcharts-" + this.className + "-box" : "")), l.add(this)), l = this.getCrispAdjust(), a.x = l, a.y = (this.baseline ? -this.baselineOffset : 0) + l, a.width = Math.round(this.width), a.height = Math.round(this.height), this.box.attr(z(a, this.deferredAttr)),
                    this.deferredAttr = {})
            };
            g.prototype.updateTextPadding = function () {
                var c = this.text;
                this.updateBoxSize();
                var a = this.baseline ? 0 : this.baselineOffset,
                    g = u(this.paddingLeft, this.padding);
                E(this.widthSetting) && this.bBox && ("center" === this.textAlign || "right" === this.textAlign) && (g += {
                    center: .5,
                    right: 1
                } [this.textAlign] * (this.widthSetting - this.bBox.width));
                if (g !== c.x || a !== c.y) c.attr("x", g), c.hasBoxWidthChanged && (this.bBox = c.getBBox(!0)), "undefined" !== typeof a && c.attr("y", a);
                c.x = g;
                c.y = a
            };
            g.prototype.widthSetter = function (c) {
                this.widthSetting =
                    x(c) ? c : void 0
            };
            g.prototype.getPaddedWidth = function () {
                var c = this.padding,
                    a = u(this.paddingLeft, c);
                c = u(this.paddingRight, c);
                return (this.widthSetting || this.bBox.width || 0) + a + c
            };
            g.prototype.xSetter = function (c) {
                this.x = c;
                this.alignFactor && (c -= this.alignFactor * this.getPaddedWidth(), this["forceAnimate:x"] = !0);
                this.xSetting = Math.round(c);
                this.attr("translateX", this.xSetting)
            };
            g.prototype.ySetter = function (c) {
                this.ySetting = this.y = Math.round(c);
                this.attr("translateY", this.ySetting)
            };
            g.emptyBBox = {
                width: 0,
                height: 0,
                x: 0,
                y: 0
            };
            g.textProps = "color direction fontFamily fontSize fontStyle fontWeight lineHeight textAlign textDecoration textOutline textOverflow width".split(" ");
            return g
        }(a)
    });
    M(a, "Core/Renderer/SVG/Symbols.js", [a["Core/Utilities.js"]], function (a) {
        function r(a, n, m, g, c) {
            var e = [];
            if (c) {
                var l = c.start || 0,
                    f = J(c.r, m);
                m = J(c.r, g || m);
                var v = (c.end || 0) - .001;
                g = c.innerR;
                var q = J(c.open, .001 > Math.abs((c.end || 0) - l - 2 * Math.PI)),
                    k = Math.cos(l),
                    I = Math.sin(l),
                    D = Math.cos(v),
                    B = Math.sin(v);
                l = J(c.longArc, .001 > v - l - Math.PI ? 0 : 1);
                e.push(["M", a + f * k, n + m * I], ["A", f, m, 0, l, J(c.clockwise, 1), a + f * D, n + m * B]);
                z(g) && e.push(q ? ["M", a + g * D, n + g * B] : ["L", a + g * D, n + g * B], ["A", g, g, 0, l, z(c.clockwise) ? 1 - c.clockwise : 0, a + g * k, n + g * I]);
                q || e.push(["Z"])
            }
            return e
        }

        function C(a, n, m, g, c) {
            return c && c.r ? E(a, n, m, g, c) : [
                ["M", a, n],
                ["L", a + m, n],
                ["L", a + m, n + g],
                ["L", a, n + g],
                ["Z"]
            ]
        }

        function E(a, n, m, g, c) {
            c = c && c.r || 0;
            return [
                ["M", a + c, n],
                ["L", a + m - c, n],
                ["C", a + m, n, a + m, n, a + m, n + c],
                ["L", a + m, n + g - c],
                ["C", a + m, n + g, a + m, n + g, a + m - c, n + g],
                ["L", a + c, n + g],
                ["C", a, n + g, a, n + g, a, n + g - c],
                ["L", a, n + c],
                ["C", a, n, a, n, a + c, n]
            ]
        }
        var z = a.defined,
            x = a.isNumber,
            J = a.pick;
        return {
            arc: r,
            callout: function (a, n, m, g, c) {
                var e = Math.min(c && c.r || 0, m, g),
                    l = e + 6,
                    f = c && c.anchorX;
                c = c && c.anchorY || 0;
                var v = E(a, n, m, g, {
                    r: e
                });
                if (!x(f)) return v;
                a + f >= m ? c > n + l && c < n + g - l ? v.splice(3, 1, ["L", a + m, c - 6], ["L", a + m + 6, c], ["L", a + m, c + 6], ["L", a + m, n + g - e]) : v.splice(3, 1, ["L", a + m, g / 2], ["L", f, c], ["L", a + m, g / 2], ["L", a + m, n + g - e]) : 0 >= a + f ? c > n + l && c < n + g - l ? v.splice(7, 1, ["L", a, c + 6], ["L", a - 6, c], ["L", a, c - 6], ["L", a, n + e]) : v.splice(7, 1, ["L", a, g / 2], ["L", f, c], ["L", a, g / 2],
                    ["L", a, n + e]) : c && c > g && f > a + l && f < a + m - l ? v.splice(5, 1, ["L", f + 6, n + g], ["L", f, n + g + 6], ["L", f - 6, n + g], ["L", a + e, n + g]) : c && 0 > c && f > a + l && f < a + m - l && v.splice(1, 1, ["L", f - 6, n], ["L", f, n - 6], ["L", f + 6, n], ["L", m - e, n]);
                return v
            },
            circle: function (a, n, m, g) {
                return r(a + m / 2, n + g / 2, m / 2, g / 2, {
                    start: .5 * Math.PI,
                    end: 2.5 * Math.PI,
                    open: !1
                })
            },
            diamond: function (a, n, m, g) {
                return [
                    ["M", a + m / 2, n],
                    ["L", a + m, n + g / 2],
                    ["L", a + m / 2, n + g],
                    ["L", a, n + g / 2],
                    ["Z"]
                ]
            },
            rect: C,
            roundedRect: E,
            square: C,
            triangle: function (a, n, m, g) {
                return [
                    ["M", a + m / 2, n],
                    ["L", a + m, n + g],
                    ["L", a,
                        n + g
                    ],
                    ["Z"]
                ]
            },
            "triangle-down": function (a, n, m, g) {
                return [
                    ["M", a, n],
                    ["L", a + m, n],
                    ["L", a + m / 2, n + g],
                    ["Z"]
                ]
            }
        }
    });
    M(a, "Core/Renderer/SVG/TextBuilder.js", [a["Core/Renderer/HTML/AST.js"], a["Core/Globals.js"], a["Core/Utilities.js"]], function (a, w, C) {
        var r = w.doc,
            z = w.SVG_NS,
            x = C.attr,
            J = C.isString,
            u = C.objectEach,
            n = C.pick;
        return function () {
            function m(a) {
                var c = a.styles;
                this.renderer = a.renderer;
                this.svgElement = a;
                this.width = a.textWidth;
                this.textLineHeight = c && c.lineHeight;
                this.textOutline = c && c.textOutline;
                this.ellipsis = !(!c || "ellipsis" !== c.textOverflow);
                this.noWrap = !(!c || "nowrap" !== c.whiteSpace);
                this.fontSize = c && c.fontSize
            }
            m.prototype.buildSVG = function () {
                var g = this.svgElement,
                    c = g.element,
                    e = g.renderer,
                    l = n(g.textStr, "").toString(),
                    f = -1 !== l.indexOf("<"),
                    v = c.childNodes;
                e = this.width && !g.added && e.box;
                var q = /<br.*?>/g,
                    k = [l, this.ellipsis, this.noWrap, this.textLineHeight, this.textOutline, this.fontSize, this.width].join();
                if (k !== g.textCache) {
                    g.textCache = k;
                    delete g.actualWidth;
                    for (k = v.length; k--;) c.removeChild(v[k]);
                    f || this.ellipsis ||
                        this.width || -1 !== l.indexOf(" ") && (!this.noWrap || q.test(l)) ? "" !== l && (e && e.appendChild(c), l = new a(l), this.modifyTree(l.nodes), l.addToDOM(g.element), this.modifyDOM(), this.ellipsis && -1 !== (c.textContent || "").indexOf("\u2026") && g.attr("title", this.unescapeEntities(g.textStr || "", ["&lt;", "&gt;"])), e && e.removeChild(c)) : c.appendChild(r.createTextNode(this.unescapeEntities(l)));
                    J(this.textOutline) && g.applyTextOutline && g.applyTextOutline(this.textOutline)
                }
            };
            m.prototype.modifyDOM = function () {
                var a = this,
                    c = this.svgElement,
                    e = x(c.element, "x");
                c.firstLineMetrics = void 0;
                for (var l; l = c.element.firstChild;)
                    if (/^[\s\u200B]*$/.test(l.textContent || " ")) c.element.removeChild(l);
                    else break;
                [].forEach.call(c.element.querySelectorAll("tspan.highcharts-br"), function (f, g) {
                    f.nextSibling && f.previousSibling && (0 === g && 1 === f.previousSibling.nodeType && (c.firstLineMetrics = c.renderer.fontMetrics(void 0, f.previousSibling)), x(f, {
                        dy: a.getLineHeight(f.nextSibling),
                        x: e
                    }))
                });
                var f = this.width || 0;
                if (f) {
                    var v = function (k, g) {
                            var l = k.textContent || "",
                                q = l.replace(/([^\^])-/g, "$1- ").split(" "),
                                v = !a.noWrap && (1 < q.length || 1 < c.element.childNodes.length),
                                t = a.getLineHeight(g),
                                h = 0,
                                d = c.actualWidth;
                            if (a.ellipsis) l && a.truncate(k, l, void 0, 0, Math.max(0, f - parseInt(a.fontSize || 12, 10)), function (b, d) {
                                return b.substring(0, d) + "\u2026"
                            });
                            else if (v) {
                                l = [];
                                for (v = []; g.firstChild && g.firstChild !== k;) v.push(g.firstChild), g.removeChild(g.firstChild);
                                for (; q.length;) q.length && !a.noWrap && 0 < h && (l.push(k.textContent || ""), k.textContent = q.join(" ").replace(/- /g, "-")), a.truncate(k,
                                    void 0, q, 0 === h ? d || 0 : 0, f,
                                    function (b, d) {
                                        return q.slice(0, d).join(" ").replace(/- /g, "-")
                                    }), d = c.actualWidth, h++;
                                v.forEach(function (b) {
                                    g.insertBefore(b, k)
                                });
                                l.forEach(function (b) {
                                    g.insertBefore(r.createTextNode(b), k);
                                    b = r.createElementNS(z, "tspan");
                                    b.textContent = "\u200b";
                                    x(b, {
                                        dy: t,
                                        x: e
                                    });
                                    g.insertBefore(b, k)
                                })
                            }
                        },
                        q = function (a) {
                            [].slice.call(a.childNodes).forEach(function (e) {
                                e.nodeType === Node.TEXT_NODE ? v(e, a) : (-1 !== e.className.baseVal.indexOf("highcharts-br") && (c.actualWidth = 0), q(e))
                            })
                        };
                    q(c.element)
                }
            };
            m.prototype.getLineHeight =
                function (a) {
                    var c;
                    a = a.nodeType === Node.TEXT_NODE ? a.parentElement : a;
                    this.renderer.styledMode || (c = a && /(px|em)$/.test(a.style.fontSize) ? a.style.fontSize : this.fontSize || this.renderer.style.fontSize || 12);
                    return this.textLineHeight ? parseInt(this.textLineHeight.toString(), 10) : this.renderer.fontMetrics(c, a || this.svgElement.element).h
                };
            m.prototype.modifyTree = function (a) {
                var c = this,
                    e = function (g, f) {
                        var l = g.tagName,
                            q = c.renderer.styledMode,
                            k = g.attributes || {};
                        if ("b" === l || "strong" === l) q ? k["class"] = "highcharts-strong" :
                            k.style = "font-weight:bold;" + (k.style || "");
                        else if ("i" === l || "em" === l) q ? k["class"] = "highcharts-emphasized" : k.style = "font-style:italic;" + (k.style || "");
                        J(k.style) && (k.style = k.style.replace(/(;| |^)color([ :])/, "$1fill$2"));
                        "br" === l && (k["class"] = "highcharts-br", g.textContent = "\u200b", (f = a[f + 1]) && f.textContent && (f.textContent = f.textContent.replace(/^ +/gm, "")));
                        "#text" !== l && "a" !== l && (g.tagName = "tspan");
                        g.attributes = k;
                        g.children && g.children.filter(function (c) {
                            return "#text" !== c.tagName
                        }).forEach(e)
                    };
                a.forEach(e)
            };
            m.prototype.truncate = function (a, c, e, l, f, v) {
                var g = this.svgElement,
                    k = g.renderer,
                    m = g.rotation,
                    D = [],
                    B = e ? 1 : 0,
                    n = (c || e || "").length,
                    t = n,
                    h, d = function (b, d) {
                        d = d || b;
                        var h = a.parentNode;
                        if (h && "undefined" === typeof D[d])
                            if (h.getSubStringLength) try {
                                D[d] = l + h.getSubStringLength(0, e ? d + 1 : d)
                            } catch (L) {
                                ""
                            } else k.getSpanWidth && (a.textContent = v(c || e, b), D[d] = l + k.getSpanWidth(g, a));
                        return D[d]
                    };
                g.rotation = 0;
                var b = d(a.textContent.length);
                if (l + b > f) {
                    for (; B <= n;) t = Math.ceil((B + n) / 2), e && (h = v(e, t)), b = d(t, h && h.length - 1), B === n ? B = n + 1 :
                        b > f ? n = t - 1 : B = t;
                    0 === n ? a.textContent = "" : c && n === c.length - 1 || (a.textContent = h || v(c || e, t))
                }
                e && e.splice(0, t);
                g.actualWidth = b;
                g.rotation = m
            };
            m.prototype.unescapeEntities = function (a, c) {
                u(this.renderer.escapes, function (e, g) {
                    c && -1 !== c.indexOf(e) || (a = a.toString().replace(new RegExp(e, "g"), g))
                });
                return a
            };
            return m
        }()
    });
    M(a, "Core/Renderer/SVG/SVGRenderer.js", [a["Core/Renderer/HTML/AST.js"], a["Core/Color/Color.js"], a["Core/Globals.js"], a["Core/Color/Palette.js"], a["Core/Renderer/RendererRegistry.js"], a["Core/Renderer/SVG/SVGElement.js"],
        a["Core/Renderer/SVG/SVGLabel.js"], a["Core/Renderer/SVG/Symbols.js"], a["Core/Renderer/SVG/TextBuilder.js"], a["Core/Utilities.js"]
    ], function (a, w, C, E, z, x, J, u, n, m) {
        var g = C.charts,
            c = C.deg2rad,
            e = C.doc,
            l = C.isFirefox,
            f = C.isMS,
            v = C.isWebKit,
            q = C.noop,
            k = C.SVG_NS,
            I = C.symbolSizes,
            D = C.win,
            B = m.addEvent,
            r = m.attr,
            t = m.createElement,
            h = m.css,
            d = m.defined,
            b = m.destroyObjectProperties,
            p = m.extend,
            G = m.isArray,
            y = m.isNumber,
            L = m.isObject,
            F = m.isString,
            P = m.merge,
            S = m.pick,
            Q = m.pInt,
            V = m.uniqueKey,
            fa;
        C = function () {
            function H(b, d, c,
                a, h, e, p) {
                this.width = this.url = this.style = this.isSVG = this.imgCount = this.height = this.gradients = this.globalAnimation = this.defs = this.chartIndex = this.cacheKeys = this.cache = this.boxWrapper = this.box = this.alignedObjects = void 0;
                this.init(b, d, c, a, h, e, p)
            }
            H.prototype.init = function (b, d, c, a, p, A, H) {
                var K = this.createElement("svg").attr({
                        version: "1.1",
                        "class": "highcharts-root"
                    }),
                    f = K.element;
                H || K.css(this.getStyle(a));
                b.appendChild(f);
                r(b, "dir", "ltr"); - 1 === b.innerHTML.indexOf("xmlns") && r(f, "xmlns", this.SVG_NS);
                this.isSVG = !0;
                this.box = f;
                this.boxWrapper = K;
                this.alignedObjects = [];
                this.url = this.getReferenceURL();
                this.createElement("desc").add().element.appendChild(e.createTextNode("Created with Highcharts 9.2.2"));
                this.defs = this.createElement("defs").add();
                this.allowHTML = A;
                this.forExport = p;
                this.styledMode = H;
                this.gradients = {};
                this.cache = {};
                this.cacheKeys = [];
                this.imgCount = 0;
                this.setSize(d, c, !1);
                var k;
                l && b.getBoundingClientRect && (d = function () {
                    h(b, {
                        left: 0,
                        top: 0
                    });
                    k = b.getBoundingClientRect();
                    h(b, {
                        left: Math.ceil(k.left) - k.left +
                            "px",
                        top: Math.ceil(k.top) - k.top + "px"
                    })
                }, d(), this.unSubPixelFix = B(D, "resize", d))
            };
            H.prototype.definition = function (b) {
                return (new a([b])).addToDOM(this.defs.element)
            };
            H.prototype.getReferenceURL = function () {
                if ((l || v) && e.getElementsByTagName("base").length) {
                    if (!d(fa)) {
                        var b = V();
                        b = (new a([{
                            tagName: "svg",
                            attributes: {
                                width: 8,
                                height: 8
                            },
                            children: [{
                                tagName: "defs",
                                children: [{
                                    tagName: "clipPath",
                                    attributes: {
                                        id: b
                                    },
                                    children: [{
                                        tagName: "rect",
                                        attributes: {
                                            width: 4,
                                            height: 4
                                        }
                                    }]
                                }]
                            }, {
                                tagName: "rect",
                                attributes: {
                                    id: "hitme",
                                    width: 8,
                                    height: 8,
                                    "clip-path": "url(#" + b + ")",
                                    fill: "rgba(0,0,0,0.001)"
                                }
                            }]
                        }])).addToDOM(e.body);
                        h(b, {
                            position: "fixed",
                            top: 0,
                            left: 0,
                            zIndex: 9E5
                        });
                        var c = e.elementFromPoint(6, 6);
                        fa = "hitme" === (c && c.id);
                        e.body.removeChild(b)
                    }
                    if (fa) return D.location.href.split("#")[0].replace(/<[^>]*>/g, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20")
                }
                return ""
            };
            H.prototype.getStyle = function (b) {
                return this.style = p({
                    fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
                    fontSize: "12px"
                }, b)
            };
            H.prototype.setStyle =
                function (b) {
                    this.boxWrapper.css(this.getStyle(b))
                };
            H.prototype.isHidden = function () {
                return !this.boxWrapper.getBBox().width
            };
            H.prototype.destroy = function () {
                var d = this.defs;
                this.box = null;
                this.boxWrapper = this.boxWrapper.destroy();
                b(this.gradients || {});
                this.gradients = null;
                d && (this.defs = d.destroy());
                this.unSubPixelFix && this.unSubPixelFix();
                return this.alignedObjects = null
            };
            H.prototype.createElement = function (b) {
                var d = new this.Element;
                d.init(this, b);
                return d
            };
            H.prototype.getRadialAttr = function (b, d) {
                return {
                    cx: b[0] -
                        b[2] / 2 + (d.cx || 0) * b[2],
                    cy: b[1] - b[2] / 2 + (d.cy || 0) * b[2],
                    r: (d.r || 0) * b[2]
                }
            };
            H.prototype.buildText = function (b) {
                (new n(b)).buildSVG()
            };
            H.prototype.getContrast = function (b) {
                b = w.parse(b).rgba;
                b[0] *= 1;
                b[1] *= 1.2;
                b[2] *= .5;
                return 459 < b[0] + b[1] + b[2] ? "#000000" : "#FFFFFF"
            };
            H.prototype.button = function (b, d, c, h, e, A, H, k, g, y) {
                var K = this.label(b, d, c, g, void 0, void 0, y, void 0, "button"),
                    G = this.styledMode,
                    l = 0,
                    t = e ? P(e) : {};
                b = t && t.style || {};
                t = a.filterUserAttributes(t);
                K.attr(P({
                    padding: 8,
                    r: 2
                }, t));
                if (!G) {
                    t = P({
                        fill: E.neutralColor3,
                        stroke: E.neutralColor20,
                        "stroke-width": 1,
                        style: {
                            color: E.neutralColor80,
                            cursor: "pointer",
                            fontWeight: "normal"
                        }
                    }, {
                        style: b
                    }, t);
                    var N = t.style;
                    delete t.style;
                    A = P(t, {
                        fill: E.neutralColor10
                    }, a.filterUserAttributes(A || {}));
                    var q = A.style;
                    delete A.style;
                    H = P(t, {
                        fill: E.highlightColor10,
                        style: {
                            color: E.neutralColor100,
                            fontWeight: "bold"
                        }
                    }, a.filterUserAttributes(H || {}));
                    var v = H.style;
                    delete H.style;
                    k = P(t, {
                        style: {
                            color: E.neutralColor20
                        }
                    }, a.filterUserAttributes(k || {}));
                    var F = k.style;
                    delete k.style
                }
                B(K.element, f ? "mouseover" :
                    "mouseenter",
                    function () {
                        3 !== l && K.setState(1)
                    });
                B(K.element, f ? "mouseout" : "mouseleave", function () {
                    3 !== l && K.setState(l)
                });
                K.setState = function (b) {
                    1 !== b && (K.state = l = b);
                    K.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed", "disabled"][b || 0]);
                    G || K.attr([t, A, H, k][b || 0]).css([N, q, v, F][b || 0])
                };
                G || K.attr(t).css(p({
                    cursor: "default"
                }, N));
                return K.on("touchstart", function (b) {
                    return b.stopPropagation()
                }).on("click", function (b) {
                    3 !== l && h.call(K,
                        b)
                })
            };
            H.prototype.crispLine = function (b, c, a) {
                void 0 === a && (a = "round");
                var h = b[0],
                    e = b[1];
                d(h[1]) && h[1] === e[1] && (h[1] = e[1] = Math[a](h[1]) - c % 2 / 2);
                d(h[2]) && h[2] === e[2] && (h[2] = e[2] = Math[a](h[2]) + c % 2 / 2);
                return b
            };
            H.prototype.path = function (b) {
                var d = this.styledMode ? {} : {
                    fill: "none"
                };
                G(b) ? d.d = b : L(b) && p(d, b);
                return this.createElement("path").attr(d)
            };
            H.prototype.circle = function (b, d, c) {
                b = L(b) ? b : "undefined" === typeof b ? {} : {
                    x: b,
                    y: d,
                    r: c
                };
                d = this.createElement("circle");
                d.xSetter = d.ySetter = function (b, d, c) {
                    c.setAttribute("c" +
                        d, b)
                };
                return d.attr(b)
            };
            H.prototype.arc = function (b, d, c, a, h, e) {
                L(b) ? (a = b, d = a.y, c = a.r, b = a.x) : a = {
                    innerR: a,
                    start: h,
                    end: e
                };
                b = this.symbol("arc", b, d, c, c, a);
                b.r = c;
                return b
            };
            H.prototype.rect = function (b, d, c, a, h, e) {
                h = L(b) ? b.r : h;
                var p = this.createElement("rect");
                b = L(b) ? b : "undefined" === typeof b ? {} : {
                    x: b,
                    y: d,
                    width: Math.max(c, 0),
                    height: Math.max(a, 0)
                };
                this.styledMode || ("undefined" !== typeof e && (b["stroke-width"] = e, b = p.crisp(b)), b.fill = "none");
                h && (b.r = h);
                p.rSetter = function (b, d, c) {
                    p.r = b;
                    r(c, {
                        rx: b,
                        ry: b
                    })
                };
                p.rGetter = function () {
                    return p.r ||
                        0
                };
                return p.attr(b)
            };
            H.prototype.setSize = function (b, d, c) {
                this.width = b;
                this.height = d;
                this.boxWrapper.animate({
                    width: b,
                    height: d
                }, {
                    step: function () {
                        this.attr({
                            viewBox: "0 0 " + this.attr("width") + " " + this.attr("height")
                        })
                    },
                    duration: S(c, !0) ? void 0 : 0
                });
                this.alignElements()
            };
            H.prototype.g = function (b) {
                var d = this.createElement("g");
                return b ? d.attr({
                    "class": "highcharts-" + b
                }) : d
            };
            H.prototype.image = function (b, d, c, a, h, e) {
                var A = {
                        preserveAspectRatio: "none"
                    },
                    H = function (b, d) {
                        b.setAttributeNS ? b.setAttributeNS("http://www.w3.org/1999/xlink",
                            "href", d) : b.setAttribute("hc-svg-href", d)
                    };
                1 < arguments.length && p(A, {
                    x: d,
                    y: c,
                    width: a,
                    height: h
                });
                var f = this.createElement("image").attr(A);
                A = function (d) {
                    H(f.element, b);
                    e.call(f, d)
                };
                if (e) {
                    H(f.element, "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==");
                    var K = new D.Image;
                    B(K, "load", A);
                    K.src = b;
                    K.complete && A({})
                } else H(f.element, b);
                return f
            };
            H.prototype.symbol = function (b, c, a, H, f, A) {
                var K = this,
                    k = /^url\((.*?)\)$/,
                    y = k.test(b),
                    G = !y && (this.symbols[b] ? b : "circle"),
                    l = G && this.symbols[G],
                    q;
                if (l) {
                    "number" === typeof c && (q = l.call(this.symbols, Math.round(c || 0), Math.round(a || 0), H || 0, f || 0, A));
                    var v = this.path(q);
                    K.styledMode || v.attr("fill", "none");
                    p(v, {
                        symbolName: G || void 0,
                        x: c,
                        y: a,
                        width: H,
                        height: f
                    });
                    A && p(v, A)
                } else if (y) {
                    var F = b.match(k)[1];
                    var m = v = this.image(F);
                    m.imgwidth = S(I[F] && I[F].width, A && A.width);
                    m.imgheight = S(I[F] && I[F].height, A && A.height);
                    var L = function (b) {
                        return b.attr({
                            width: b.width,
                            height: b.height
                        })
                    };
                    ["width", "height"].forEach(function (b) {
                        m[b + "Setter"] = function (b, c) {
                            var a = this["img" +
                                c];
                            this[c] = b;
                            d(a) && (A && "within" === A.backgroundSize && this.width && this.height && (a = Math.round(a * Math.min(this.width / this.imgwidth, this.height / this.imgheight))), this.element && this.element.setAttribute(c, a), this.alignByTranslate || (b = ((this[c] || 0) - a) / 2, this.attr("width" === c ? {
                                translateX: b
                            } : {
                                translateY: b
                            })))
                        }
                    });
                    d(c) && m.attr({
                        x: c,
                        y: a
                    });
                    m.isImg = !0;
                    d(m.imgwidth) && d(m.imgheight) ? L(m) : (m.attr({
                        width: 0,
                        height: 0
                    }), t("img", {
                        onload: function () {
                            var b = g[K.chartIndex];
                            0 === this.width && (h(this, {
                                    position: "absolute",
                                    top: "-999em"
                                }),
                                e.body.appendChild(this));
                            I[F] = {
                                width: this.width,
                                height: this.height
                            };
                            m.imgwidth = this.width;
                            m.imgheight = this.height;
                            m.element && L(m);
                            this.parentNode && this.parentNode.removeChild(this);
                            K.imgCount--;
                            if (!K.imgCount && b && !b.hasLoaded) b.onload()
                        },
                        src: F
                    }), this.imgCount++)
                }
                return v
            };
            H.prototype.clipRect = function (b, d, c, a) {
                var h = V() + "-",
                    e = this.createElement("clipPath").attr({
                        id: h
                    }).add(this.defs);
                b = this.rect(b, d, c, a, 0).add(e);
                b.id = h;
                b.clipPath = e;
                b.count = 0;
                return b
            };
            H.prototype.text = function (b, c, a, h) {
                var e = {};
                if (h && (this.allowHTML || !this.forExport)) return this.html(b, c, a);
                e.x = Math.round(c || 0);
                a && (e.y = Math.round(a));
                d(b) && (e.text = b);
                b = this.createElement("text").attr(e);
                if (!h || this.forExport && !this.allowHTML) b.xSetter = function (b, d, c) {
                    for (var a = c.getElementsByTagName("tspan"), h = c.getAttribute(d), e = 0, p; e < a.length; e++) p = a[e], p.getAttribute(d) === h && p.setAttribute(d, b);
                    c.setAttribute(d, b)
                };
                return b
            };
            H.prototype.fontMetrics = function (b, d) {
                b = !this.styledMode && /px/.test(b) || !D.getComputedStyle ? b || d && d.style && d.style.fontSize ||
                    this.style && this.style.fontSize : d && x.prototype.getStyle.call(d, "font-size");
                b = /px/.test(b) ? Q(b) : 12;
                d = 24 > b ? b + 3 : Math.round(1.2 * b);
                return {
                    h: d,
                    b: Math.round(.8 * d),
                    f: b
                }
            };
            H.prototype.rotCorr = function (b, d, a) {
                var h = b;
                d && a && (h = Math.max(h * Math.cos(d * c), 4));
                return {
                    x: -b / 3 * Math.sin(d * c),
                    y: h
                }
            };
            H.prototype.pathToSegments = function (b) {
                for (var d = [], c = [], a = {
                        A: 8,
                        C: 7,
                        H: 2,
                        L: 3,
                        M: 3,
                        Q: 5,
                        S: 5,
                        T: 3,
                        V: 2
                    }, h = 0; h < b.length; h++) F(c[0]) && y(b[h]) && c.length === a[c[0].toUpperCase()] && b.splice(h, 0, c[0].replace("M", "L").replace("m", "l")),
                    "string" === typeof b[h] && (c.length && d.push(c.slice(0)), c.length = 0), c.push(b[h]);
                d.push(c.slice(0));
                return d
            };
            H.prototype.label = function (b, d, c, a, h, e, p, H, f) {
                return new J(this, b, d, c, a, h, e, p, H, f)
            };
            H.prototype.alignElements = function () {
                this.alignedObjects.forEach(function (b) {
                    return b.align()
                })
            };
            return H
        }();
        p(C.prototype, {
            Element: x,
            SVG_NS: k,
            escapes: {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                "'": "&#39;",
                '"': "&quot;"
            },
            symbols: u,
            draw: q
        });
        z.registerRendererType("svg", C, !0);
        "";
        return C
    });
    M(a, "Core/Renderer/HTML/HTMLElement.js",
        [a["Core/Globals.js"], a["Core/Renderer/SVG/SVGElement.js"], a["Core/Utilities.js"]],
        function (a, w, C) {
            var r = this && this.__extends || function () {
                    var c = function (a, e) {
                        c = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function (c, a) {
                            c.__proto__ = a
                        } || function (c, a) {
                            for (var e in a) a.hasOwnProperty(e) && (c[e] = a[e])
                        };
                        return c(a, e)
                    };
                    return function (a, e) {
                        function f() {
                            this.constructor = a
                        }
                        c(a, e);
                        a.prototype = null === e ? Object.create(e) : (f.prototype = e.prototype, new f)
                    }
                }(),
                z = a.isFirefox,
                x = a.isMS,
                J = a.isWebKit,
                u = a.win,
                n = C.css,
                m = C.defined,
                g = C.extend,
                c = C.pick,
                e = C.pInt;
            return function (a) {
                function f() {
                    return null !== a && a.apply(this, arguments) || this
                }
                r(f, a);
                f.compose = function (c) {
                    if (-1 === f.composedClasses.indexOf(c)) {
                        f.composedClasses.push(c);
                        var a = f.prototype,
                            e = c.prototype;
                        e.getSpanCorrection = a.getSpanCorrection;
                        e.htmlCss = a.htmlCss;
                        e.htmlGetBBox = a.htmlGetBBox;
                        e.htmlUpdateTransform = a.htmlUpdateTransform;
                        e.setSpanRotation = a.setSpanRotation
                    }
                    return c
                };
                f.prototype.getSpanCorrection = function (c, a, e) {
                    this.xCorr = -c * e;
                    this.yCorr = -a
                };
                f.prototype.htmlCss = function (a) {
                    var e = "SPAN" === this.element.tagName && a && "width" in a,
                        f = c(e && a.width, void 0);
                    if (e) {
                        delete a.width;
                        this.textWidth = f;
                        var l = !0
                    }
                    a && "ellipsis" === a.textOverflow && (a.whiteSpace = "nowrap", a.overflow = "hidden");
                    this.styles = g(this.styles, a);
                    n(this.element, a);
                    l && this.htmlUpdateTransform();
                    return this
                };
                f.prototype.htmlGetBBox = function () {
                    var c = this.element;
                    return {
                        x: c.offsetLeft,
                        y: c.offsetTop,
                        width: c.offsetWidth,
                        height: c.offsetHeight
                    }
                };
                f.prototype.htmlUpdateTransform = function () {
                    if (this.added) {
                        var c =
                            this.renderer,
                            a = this.element,
                            f = this.translateX || 0,
                            g = this.translateY || 0,
                            l = this.x || 0,
                            B = this.y || 0,
                            r = this.textAlign || "left",
                            t = {
                                left: 0,
                                center: .5,
                                right: 1
                            } [r],
                            h = this.styles;
                        h = h && h.whiteSpace;
                        n(a, {
                            marginLeft: f,
                            marginTop: g
                        });
                        !c.styledMode && this.shadows && this.shadows.forEach(function (b) {
                            n(b, {
                                marginLeft: f + 1,
                                marginTop: g + 1
                            })
                        });
                        this.inverted && [].forEach.call(a.childNodes, function (b) {
                            c.invertChild(b, a)
                        });
                        if ("SPAN" === a.tagName) {
                            var d = this.rotation,
                                b = this.textWidth && e(this.textWidth),
                                p = [d, r, a.innerHTML, this.textWidth,
                                    this.textAlign
                                ].join(),
                                G = void 0;
                            (G = b !== this.oldTextWidth) && !(G = b > this.oldTextWidth) && ((G = this.textPxLength) || (n(a, {
                                width: "",
                                whiteSpace: h || "nowrap"
                            }), G = a.offsetWidth), G = G > b);
                            G && (/[ \-]/.test(a.textContent || a.innerText) || "ellipsis" === a.style.textOverflow) ? (n(a, {
                                width: b + "px",
                                display: "block",
                                whiteSpace: h || "normal"
                            }), this.oldTextWidth = b, this.hasBoxWidthChanged = !0) : this.hasBoxWidthChanged = !1;
                            p !== this.cTT && (G = c.fontMetrics(a.style.fontSize, a).b, !m(d) || d === (this.oldRotation || 0) && r === this.oldAlign || this.setSpanRotation(d,
                                t, G), this.getSpanCorrection(!m(d) && this.textPxLength || a.offsetWidth, G, t, d, r));
                            n(a, {
                                left: l + (this.xCorr || 0) + "px",
                                top: B + (this.yCorr || 0) + "px"
                            });
                            this.cTT = p;
                            this.oldRotation = d;
                            this.oldAlign = r
                        }
                    } else this.alignOnAdd = !0
                };
                f.prototype.setSpanRotation = function (c, a, e) {
                    var f = {},
                        g = x && !/Edge/.test(u.navigator.userAgent) ? "-ms-transform" : J ? "-webkit-transform" : z ? "MozTransform" : u.opera ? "-o-transform" : void 0;
                    g && (f[g] = f.transform = "rotate(" + c + "deg)", f[g + (z ? "Origin" : "-origin")] = f.transformOrigin = 100 * a + "% " + e + "px", n(this.element,
                        f))
                };
                f.composedClasses = [];
                return f
            }(w)
        });
    M(a, "Core/Renderer/HTML/HTMLRenderer.js", [a["Core/Renderer/HTML/AST.js"], a["Core/Renderer/SVG/SVGElement.js"], a["Core/Renderer/SVG/SVGRenderer.js"], a["Core/Utilities.js"]], function (a, w, C, E) {
        var r = this && this.__extends || function () {
                var a = function (g, c) {
                    a = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function (a, c) {
                        a.__proto__ = c
                    } || function (a, c) {
                        for (var e in c) c.hasOwnProperty(e) && (a[e] = c[e])
                    };
                    return a(g, c)
                };
                return function (g, c) {
                    function e() {
                        this.constructor =
                            g
                    }
                    a(g, c);
                    g.prototype = null === c ? Object.create(c) : (e.prototype = c.prototype, new e)
                }
            }(),
            x = E.attr,
            J = E.createElement,
            u = E.extend,
            n = E.pick;
        return function (m) {
            function g() {
                return null !== m && m.apply(this, arguments) || this
            }
            r(g, m);
            g.compose = function (c) {
                -1 === g.composedClasses.indexOf(c) && (g.composedClasses.push(c), c.prototype.html = g.prototype.html);
                return c
            };
            g.prototype.html = function (c, e, g) {
                var f = this.createElement("span"),
                    l = f.element,
                    q = f.renderer,
                    k = q.isSVG,
                    m = function (c, a) {
                        ["opacity", "visibility"].forEach(function (e) {
                            c[e +
                                "Setter"] = function (f, h, d) {
                                var b = c.div ? c.div.style : a;
                                w.prototype[e + "Setter"].call(this, f, h, d);
                                b && (b[h] = f)
                            }
                        });
                        c.addedSetters = !0
                    };
                f.textSetter = function (c) {
                    c !== this.textStr && (delete this.bBox, delete this.oldTextWidth, a.setElementHTML(this.element, n(c, "")), this.textStr = c, f.doTransform = !0)
                };
                k && m(f, f.element.style);
                f.xSetter = f.ySetter = f.alignSetter = f.rotationSetter = function (c, a) {
                    "align" === a ? f.alignValue = f.textAlign = c : f[a] = c;
                    f.doTransform = !0
                };
                f.afterSetters = function () {
                    this.doTransform && (this.htmlUpdateTransform(),
                        this.doTransform = !1)
                };
                f.attr({
                    text: c,
                    x: Math.round(e),
                    y: Math.round(g)
                }).css({
                    position: "absolute"
                });
                q.styledMode || f.css({
                    fontFamily: this.style.fontFamily,
                    fontSize: this.style.fontSize
                });
                l.style.whiteSpace = "nowrap";
                f.css = f.htmlCss;
                k && (f.add = function (c) {
                    var a = q.box.parentNode,
                        e = [];
                    if (this.parentGroup = c) {
                        var g = c.div;
                        if (!g) {
                            for (; c;) e.push(c), c = c.parentGroup;
                            e.reverse().forEach(function (c) {
                                function d(b, d) {
                                    c[d] = b;
                                    "translateX" === d ? k.left = b + "px" : k.top = b + "px";
                                    c.doTransform = !0
                                }
                                var b = x(c.element, "class"),
                                    h = c.styles || {};
                                g = c.div = c.div || J("div", b ? {
                                    className: b
                                } : void 0, {
                                    position: "absolute",
                                    left: (c.translateX || 0) + "px",
                                    top: (c.translateY || 0) + "px",
                                    display: c.display,
                                    opacity: c.opacity,
                                    cursor: h.cursor,
                                    pointerEvents: h.pointerEvents,
                                    visibility: c.visibility
                                }, g || a);
                                var k = g.style;
                                u(c, {
                                    classSetter: function (b) {
                                        return function (d) {
                                            this.element.setAttribute("class", d);
                                            b.className = d
                                        }
                                    }(g),
                                    on: function () {
                                        e[0].div && f.on.apply({
                                            element: e[0].div,
                                            onEvents: c.onEvents
                                        }, arguments);
                                        return c
                                    },
                                    translateXSetter: d,
                                    translateYSetter: d
                                });
                                c.addedSetters ||
                                    m(c)
                            })
                        }
                    } else g = a;
                    g.appendChild(l);
                    f.added = !0;
                    f.alignOnAdd && f.htmlUpdateTransform();
                    return f
                });
                return f
            };
            g.composedClasses = [];
            return g
        }(C)
    });
    M(a, "Core/Axis/AxisDefaults.js", [a["Core/Color/Palette.js"]], function (a) {
        var r;
        (function (r) {
            r.defaultXAxisOptions = {
                alignTicks: !0,
                allowDecimals: void 0,
                panningEnabled: !0,
                zIndex: 2,
                zoomEnabled: !0,
                dateTimeLabelFormats: {
                    millisecond: {
                        main: "%H:%M:%S.%L",
                        range: !1
                    },
                    second: {
                        main: "%H:%M:%S",
                        range: !1
                    },
                    minute: {
                        main: "%H:%M",
                        range: !1
                    },
                    hour: {
                        main: "%H:%M",
                        range: !1
                    },
                    day: {
                        main: "%e. %b"
                    },
                    week: {
                        main: "%e. %b"
                    },
                    month: {
                        main: "%b '%y"
                    },
                    year: {
                        main: "%Y"
                    }
                },
                endOnTick: !1,
                gridLineDashStyle: "Solid",
                gridZIndex: 1,
                labels: {
                    autoRotation: void 0,
                    autoRotationLimit: 80,
                    distance: void 0,
                    enabled: !0,
                    indentation: 10,
                    overflow: "justify",
                    padding: 5,
                    reserveSpace: void 0,
                    rotation: void 0,
                    staggerLines: 0,
                    step: 0,
                    useHTML: !1,
                    x: 0,
                    zIndex: 7,
                    style: {
                        color: a.neutralColor60,
                        cursor: "default",
                        fontSize: "11px"
                    }
                },
                maxPadding: .01,
                minorGridLineDashStyle: "Solid",
                minorTickLength: 2,
                minorTickPosition: "outside",
                minPadding: .01,
                offset: void 0,
                opposite: !1,
                reversed: void 0,
                reversedStacks: !1,
                showEmpty: !0,
                showFirstLabel: !0,
                showLastLabel: !0,
                startOfWeek: 1,
                startOnTick: !1,
                tickLength: 10,
                tickPixelInterval: 100,
                tickmarkPlacement: "between",
                tickPosition: "outside",
                title: {
                    align: "middle",
                    rotation: 0,
                    useHTML: !1,
                    x: 0,
                    y: 0,
                    style: {
                        color: a.neutralColor60
                    }
                },
                type: "linear",
                uniqueNames: !0,
                visible: !0,
                minorGridLineColor: a.neutralColor5,
                minorGridLineWidth: 1,
                minorTickColor: a.neutralColor40,
                lineColor: a.highlightColor20,
                lineWidth: 1,
                gridLineColor: a.neutralColor10,
                gridLineWidth: void 0,
                tickColor: a.highlightColor20
            };
            r.defaultYAxisOptions = {
                reversedStacks: !0,
                endOnTick: !0,
                maxPadding: .05,
                minPadding: .05,
                tickPixelInterval: 72,
                showLastLabel: !0,
                labels: {
                    x: -8
                },
                startOnTick: !0,
                title: {
                    rotation: 270,
                    text: "Values"
                },
                stackLabels: {
                    animation: {},
                    allowOverlap: !1,
                    enabled: !1,
                    crop: !0,
                    overflow: "justify",
                    formatter: function () {
                        var a = this.axis.chart.numberFormatter;
                        return a(this.total, -1)
                    },
                    style: {
                        color: a.neutralColor100,
                        fontSize: "11px",
                        fontWeight: "bold",
                        textOutline: "1px contrast"
                    }
                },
                gridLineWidth: 1,
                lineWidth: 0
            };
            r.defaultLeftAxisOptions = {
                labels: {
                    x: -15
                },
                title: {
                    rotation: 270
                }
            };
            r.defaultRightAxisOptions = {
                labels: {
                    x: 15
                },
                title: {
                    rotation: 90
                }
            };
            r.defaultBottomAxisOptions = {
                labels: {
                    autoRotation: [-45],
                    x: 0
                },
                margin: 15,
                title: {
                    rotation: 0
                }
            };
            r.defaultTopAxisOptions = {
                labels: {
                    autoRotation: [-45],
                    x: 0
                },
                margin: 15,
                title: {
                    rotation: 0
                }
            }
        })(r || (r = {}));
        return r
    });
    M(a, "Core/Foundation.js", [a["Core/Utilities.js"]], function (a) {
        var r = a.addEvent,
            C = a.isFunction,
            E = a.objectEach,
            z = a.removeEvent;
        return {
            registerEventOptions: function (a, w) {
                a.eventOptions =
                    a.eventOptions || {};
                E(w.events, function (u, n) {
                    a.eventOptions[n] !== u && (a.eventOptions[n] && (z(a, n, a.eventOptions[n]), delete a.eventOptions[n]), C(u) && (a.eventOptions[n] = u, r(a, n, u)))
                })
            }
        }
    });
    M(a, "Core/Axis/Tick.js", [a["Core/FormatUtilities.js"], a["Core/Globals.js"], a["Core/Utilities.js"]], function (a, w, C) {
        var r = w.deg2rad,
            z = C.clamp,
            x = C.correctFloat,
            J = C.defined,
            u = C.destroyObjectProperties,
            n = C.extend,
            m = C.fireEvent,
            g = C.isNumber,
            c = C.merge,
            e = C.objectEach,
            l = C.pick;
        w = function () {
            function f(c, a, e, f, g) {
                this.isNewLabel =
                    this.isNew = !0;
                this.axis = c;
                this.pos = a;
                this.type = e || "";
                this.parameters = g || {};
                this.tickmarkOffset = this.parameters.tickmarkOffset;
                this.options = this.parameters.options;
                m(this, "init");
                e || f || this.addLabel()
            }
            f.prototype.addLabel = function () {
                var c = this,
                    e = c.axis,
                    f = e.options,
                    I = e.chart,
                    D = e.categories,
                    B = e.logarithmic,
                    r = e.names,
                    t = c.pos,
                    h = l(c.options && c.options.labels, f.labels),
                    d = e.tickPositions,
                    b = t === d[0],
                    p = t === d[d.length - 1],
                    G = (!h.step || 1 === h.step) && 1 === e.tickInterval;
                d = d.info;
                var y = c.label,
                    L;
                D = this.parameters.category ||
                    (D ? l(D[t], r[t], t) : t);
                B && g(D) && (D = x(B.lin2log(D)));
                if (e.dateTime)
                    if (d) {
                        var F = I.time.resolveDTLFormat(f.dateTimeLabelFormats[!f.grid && d.higherRanks[t] || d.unitName]);
                        var P = F.main
                    } else g(D) && (P = e.dateTime.getXDateFormat(D, f.dateTimeLabelFormats || {}));
                c.isFirst = b;
                c.isLast = p;
                var S = {
                    axis: e,
                    chart: I,
                    dateTimeLabelFormat: P,
                    isFirst: b,
                    isLast: p,
                    pos: t,
                    tick: c,
                    tickPositionInfo: d,
                    value: D
                };
                m(this, "labelFormat", S);
                var Q = function (b) {
                    return h.formatter ? h.formatter.call(b, b) : h.format ? (b.text = e.defaultLabelFormatter.call(b),
                        a.format(h.format, b, I)) : e.defaultLabelFormatter.call(b, b)
                };
                f = Q.call(S, S);
                var u = F && F.list;
                c.shortenLabel = u ? function () {
                    for (L = 0; L < u.length; L++)
                        if (n(S, {
                                dateTimeLabelFormat: u[L]
                            }), y.attr({
                                text: Q.call(S, S)
                            }), y.getBBox().width < e.getSlotWidth(c) - 2 * h.padding) return;
                    y.attr({
                        text: ""
                    })
                } : void 0;
                G && e._addedPlotLB && c.moveLabel(f, h);
                J(y) || c.movedLabel ? y && y.textStr !== f && !G && (!y.textWidth || h.style.width || y.styles.width || y.css({
                    width: null
                }), y.attr({
                    text: f
                }), y.textPxLength = y.getBBox().width) : (c.label = y = c.createLabel({
                    x: 0,
                    y: 0
                }, f, h), c.rotation = 0)
            };
            f.prototype.createLabel = function (a, e, f) {
                var g = this.axis,
                    k = g.chart;
                if (a = J(e) && f.enabled ? k.renderer.text(e, a.x, a.y, f.useHTML).add(g.labelGroup) : null) k.styledMode || a.css(c(f.style)), a.textPxLength = a.getBBox().width;
                return a
            };
            f.prototype.destroy = function () {
                u(this, this.axis)
            };
            f.prototype.getPosition = function (c, a, e, f) {
                var g = this.axis,
                    k = g.chart,
                    l = f && k.oldChartHeight || k.chartHeight;
                c = {
                    x: c ? x(g.translate(a + e, null, null, f) + g.transB) : g.left + g.offset + (g.opposite ? (f && k.oldChartWidth || k.chartWidth) -
                        g.right - g.left : 0),
                    y: c ? l - g.bottom + g.offset - (g.opposite ? g.height : 0) : x(l - g.translate(a + e, null, null, f) - g.transB)
                };
                c.y = z(c.y, -1E5, 1E5);
                m(this, "afterGetPosition", {
                    pos: c
                });
                return c
            };
            f.prototype.getLabelPosition = function (c, a, e, f, g, l, n, t) {
                var h = this.axis,
                    d = h.transA,
                    b = h.isLinked && h.linkedParent ? h.linkedParent.reversed : h.reversed,
                    p = h.staggerLines,
                    k = h.tickRotCorr || {
                        x: 0,
                        y: 0
                    },
                    y = f || h.reserveSpaceDefault ? 0 : -h.labelOffset * ("center" === h.labelAlign ? .5 : 1),
                    q = {},
                    F = g.y;
                J(F) || (F = 0 === h.side ? e.rotation ? -8 : -e.getBBox().height :
                    2 === h.side ? k.y + 8 : Math.cos(e.rotation * r) * (k.y - e.getBBox(!1, 0).height / 2));
                c = c + g.x + y + k.x - (l && f ? l * d * (b ? -1 : 1) : 0);
                a = a + F - (l && !f ? l * d * (b ? 1 : -1) : 0);
                p && (e = n / (t || 1) % p, h.opposite && (e = p - e - 1), a += h.labelOffset / p * e);
                q.x = c;
                q.y = Math.round(a);
                m(this, "afterGetLabelPosition", {
                    pos: q,
                    tickmarkOffset: l,
                    index: n
                });
                return q
            };
            f.prototype.getLabelSize = function () {
                return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0
            };
            f.prototype.getMarkPath = function (c, a, e, f, g, l) {
                return l.crispLine([
                    ["M", c, a],
                    ["L", c + (g ? 0 : -e),
                        a + (g ? e : 0)
                    ]
                ], f)
            };
            f.prototype.handleOverflow = function (c) {
                var a = this.axis,
                    e = a.options.labels,
                    f = c.x,
                    g = a.chart.chartWidth,
                    m = a.chart.spacing,
                    v = l(a.labelLeft, Math.min(a.pos, m[3]));
                m = l(a.labelRight, Math.max(a.isRadial ? 0 : a.pos + a.len, g - m[1]));
                var t = this.label,
                    h = this.rotation,
                    d = {
                        left: 0,
                        center: .5,
                        right: 1
                    } [a.labelAlign || t.attr("align")],
                    b = t.getBBox().width,
                    p = a.getSlotWidth(this),
                    G = {},
                    y = p,
                    L = 1,
                    F;
                if (h || "justify" !== e.overflow) 0 > h && f - d * b < v ? F = Math.round(f / Math.cos(h * r) - v) : 0 < h && f + d * b > m && (F = Math.round((g - f) / Math.cos(h *
                    r)));
                else if (g = f + (1 - d) * b, f - d * b < v ? y = c.x + y * (1 - d) - v : g > m && (y = m - c.x + y * d, L = -1), y = Math.min(p, y), y < p && "center" === a.labelAlign && (c.x += L * (p - y - d * (p - Math.min(b, y)))), b > y || a.autoRotation && (t.styles || {}).width) F = y;
                F && (this.shortenLabel ? this.shortenLabel() : (G.width = Math.floor(F) + "px", (e.style || {}).textOverflow || (G.textOverflow = "ellipsis"), t.css(G)))
            };
            f.prototype.moveLabel = function (c, a) {
                var f = this,
                    g = f.label,
                    l = f.axis,
                    m = l.reversed,
                    q = !1;
                g && g.textStr === c ? (f.movedLabel = g, q = !0, delete f.label) : e(l.ticks, function (a) {
                    q ||
                        a.isNew || a === f || !a.label || a.label.textStr !== c || (f.movedLabel = a.label, q = !0, a.labelPos = f.movedLabel.xy, delete a.label)
                });
                if (!q && (f.labelPos || g)) {
                    var t = f.labelPos || g.xy;
                    g = l.horiz ? m ? 0 : l.width + l.left : t.x;
                    l = l.horiz ? t.y : m ? l.width + l.left : 0;
                    f.movedLabel = f.createLabel({
                        x: g,
                        y: l
                    }, c, a);
                    f.movedLabel && f.movedLabel.attr({
                        opacity: 0
                    })
                }
            };
            f.prototype.render = function (a, c, e) {
                var f = this.axis,
                    g = f.horiz,
                    k = this.pos,
                    q = l(this.tickmarkOffset, f.tickmarkOffset);
                k = this.getPosition(g, k, q, c);
                q = k.x;
                var t = k.y;
                f = g && q === f.pos + f.len ||
                    !g && t === f.pos ? -1 : 1;
                g = l(e, this.label && this.label.newOpacity, 1);
                e = l(e, 1);
                this.isActive = !0;
                this.renderGridLine(c, e, f);
                this.renderMark(k, e, f);
                this.renderLabel(k, c, g, a);
                this.isNew = !1;
                m(this, "afterRender")
            };
            f.prototype.renderGridLine = function (c, a, e) {
                var f = this.axis,
                    g = f.options,
                    k = {},
                    m = this.pos,
                    t = this.type,
                    h = l(this.tickmarkOffset, f.tickmarkOffset),
                    d = f.chart.renderer,
                    b = this.gridLine,
                    p = g.gridLineWidth,
                    G = g.gridLineColor,
                    y = g.gridLineDashStyle;
                "minor" === this.type && (p = g.minorGridLineWidth, G = g.minorGridLineColor,
                    y = g.minorGridLineDashStyle);
                b || (f.chart.styledMode || (k.stroke = G, k["stroke-width"] = p || 0, k.dashstyle = y), t || (k.zIndex = 1), c && (a = 0), this.gridLine = b = d.path().attr(k).addClass("highcharts-" + (t ? t + "-" : "") + "grid-line").add(f.gridGroup));
                if (b && (e = f.getPlotLinePath({
                        value: m + h,
                        lineWidth: b.strokeWidth() * e,
                        force: "pass",
                        old: c
                    }))) b[c || this.isNew ? "attr" : "animate"]({
                    d: e,
                    opacity: a
                })
            };
            f.prototype.renderMark = function (c, a, e) {
                var f = this.axis,
                    g = f.options,
                    k = f.chart.renderer,
                    m = this.type,
                    t = f.tickSize(m ? m + "Tick" : "tick"),
                    h = c.x;
                c = c.y;
                var d = l(g["minor" !== m ? "tickWidth" : "minorTickWidth"], !m && f.isXAxis ? 1 : 0);
                g = g["minor" !== m ? "tickColor" : "minorTickColor"];
                var b = this.mark,
                    p = !b;
                t && (f.opposite && (t[0] = -t[0]), b || (this.mark = b = k.path().addClass("highcharts-" + (m ? m + "-" : "") + "tick").add(f.axisGroup), f.chart.styledMode || b.attr({
                    stroke: g,
                    "stroke-width": d
                })), b[p ? "attr" : "animate"]({
                    d: this.getMarkPath(h, c, t[0], b.strokeWidth() * e, f.horiz, k),
                    opacity: a
                }))
            };
            f.prototype.renderLabel = function (c, a, e, f) {
                var k = this.axis,
                    m = k.horiz,
                    q = k.options,
                    t = this.label,
                    h = q.labels,
                    d = h.step;
                k = l(this.tickmarkOffset, k.tickmarkOffset);
                var b = c.x;
                c = c.y;
                var p = !0;
                t && g(b) && (t.xy = c = this.getLabelPosition(b, c, t, m, h, k, f, d), this.isFirst && !this.isLast && !q.showFirstLabel || this.isLast && !this.isFirst && !q.showLastLabel ? p = !1 : !m || h.step || h.rotation || a || 0 === e || this.handleOverflow(c), d && f % d && (p = !1), p && g(c.y) ? (c.opacity = e, t[this.isNewLabel ? "attr" : "animate"](c), this.isNewLabel = !1) : (t.attr("y", -9999), this.isNewLabel = !0))
            };
            f.prototype.replaceMovedLabel = function () {
                var c = this.label,
                    a = this.axis,
                    e = a.reversed;
                if (c && !this.isNew) {
                    var f = a.horiz ? e ? a.left : a.width + a.left : c.xy.x;
                    e = a.horiz ? c.xy.y : e ? a.width + a.top : a.top;
                    c.animate({
                        x: f,
                        y: e,
                        opacity: 0
                    }, void 0, c.destroy);
                    delete this.label
                }
                a.isDirty = !0;
                this.label = this.movedLabel;
                delete this.movedLabel
            };
            return f
        }();
        "";
        return w
    });
    M(a, "Core/Axis/Axis.js", [a["Core/Animation/AnimationUtilities.js"], a["Core/Axis/AxisDefaults.js"], a["Core/Color/Color.js"], a["Core/Color/Palette.js"], a["Core/DefaultOptions.js"], a["Core/Foundation.js"], a["Core/Globals.js"], a["Core/Axis/Tick.js"],
        a["Core/Utilities.js"]
    ], function (a, w, C, E, z, x, J, u, n) {
        var m = a.animObject,
            g = z.defaultOptions,
            c = x.registerEventOptions,
            e = J.deg2rad,
            l = n.arrayMax,
            f = n.arrayMin,
            v = n.clamp,
            q = n.correctFloat,
            k = n.defined,
            r = n.destroyObjectProperties,
            D = n.erase,
            B = n.error,
            O = n.extend,
            t = n.fireEvent,
            h = n.getMagnitude,
            d = n.isArray,
            b = n.isNumber,
            p = n.isString,
            G = n.merge,
            y = n.normalizeTickInterval,
            L = n.objectEach,
            F = n.pick,
            P = n.relativeLength,
            S = n.removeEvent,
            Q = n.splat,
            V = n.syncTimeout;
        a = function () {
            function a(b, a) {
                this.zoomEnabled = this.width = this.visible =
                    this.userOptions = this.translationSlope = this.transB = this.transA = this.top = this.ticks = this.tickRotCorr = this.tickPositions = this.tickmarkOffset = this.tickInterval = this.tickAmount = this.side = this.series = this.right = this.positiveValuesOnly = this.pos = this.pointRangePadding = this.pointRange = this.plotLinesAndBandsGroups = this.plotLinesAndBands = this.paddedTicks = this.overlap = this.options = this.offset = this.names = this.minPixelPadding = this.minorTicks = this.minorTickInterval = this.min = this.maxLabelLength = this.max = this.len =
                    this.left = this.labelFormatter = this.labelEdge = this.isLinked = this.height = this.hasVisibleSeries = this.hasNames = this.eventOptions = this.coll = this.closestPointRange = this.chart = this.categories = this.bottom = this.alternateBands = void 0;
                this.init(b, a)
            }
            a.prototype.init = function (a, d) {
                var h = d.isX;
                this.chart = a;
                this.horiz = a.inverted && !this.isZAxis ? !h : h;
                this.isXAxis = h;
                this.coll = this.coll || (h ? "xAxis" : "yAxis");
                t(this, "init", {
                    userOptions: d
                });
                this.opposite = F(d.opposite, this.opposite);
                this.side = F(d.side, this.side, this.horiz ?
                    this.opposite ? 0 : 2 : this.opposite ? 1 : 3);
                this.setOptions(d);
                var e = this.options,
                    f = e.labels,
                    p = e.type;
                this.userOptions = d;
                this.minPixelPadding = 0;
                this.reversed = F(e.reversed, this.reversed);
                this.visible = e.visible;
                this.zoomEnabled = e.zoomEnabled;
                this.hasNames = "category" === p || !0 === e.categories;
                this.categories = e.categories || this.hasNames;
                this.names || (this.names = [], this.names.keys = {});
                this.plotLinesAndBandsGroups = {};
                this.positiveValuesOnly = !!this.logarithmic;
                this.isLinked = k(e.linkedTo);
                this.ticks = {};
                this.labelEdge = [];
                this.minorTicks = {};
                this.plotLinesAndBands = [];
                this.alternateBands = {};
                this.len = 0;
                this.minRange = this.userMinRange = e.minRange || e.maxZoom;
                this.range = e.range;
                this.offset = e.offset || 0;
                this.min = this.max = null;
                d = F(e.crosshair, Q(a.options.tooltip.crosshairs)[h ? 0 : 1]);
                this.crosshair = !0 === d ? {} : d; - 1 === a.axes.indexOf(this) && (h ? a.axes.splice(a.xAxis.length, 0, this) : a.axes.push(this), a[this.coll].push(this));
                this.series = this.series || [];
                a.inverted && !this.isZAxis && h && "undefined" === typeof this.reversed && (this.reversed = !0);
                this.labelRotation = b(f.rotation) ? f.rotation : void 0;
                c(this, e);
                t(this, "afterInit")
            };
            a.prototype.setOptions = function (b) {
                this.options = G(w.defaultXAxisOptions, "yAxis" === this.coll && w.defaultYAxisOptions, [w.defaultTopAxisOptions, w.defaultRightAxisOptions, w.defaultBottomAxisOptions, w.defaultLeftAxisOptions][this.side], G(g[this.coll], b));
                t(this, "afterSetOptions", {
                    userOptions: b
                })
            };
            a.prototype.defaultLabelFormatter = function (a) {
                var d = this.axis;
                a = this.chart.numberFormatter;
                var c = b(this.value) ? this.value : NaN,
                    e = d.chart.time,
                    h = this.dateTimeLabelFormat,
                    f = g.lang,
                    p = f.numericSymbols;
                f = f.numericSymbolMagnitude || 1E3;
                var H = d.logarithmic ? Math.abs(c) : d.tickInterval,
                    y = p && p.length;
                if (d.categories) var k = "" + this.value;
                else if (h) k = e.dateFormat(h, c);
                else if (y && 1E3 <= H)
                    for (; y-- && "undefined" === typeof k;) d = Math.pow(f, y + 1), H >= d && 0 === 10 * c % d && null !== p[y] && 0 !== c && (k = a(c / d, -1) + p[y]);
                "undefined" === typeof k && (k = 1E4 <= Math.abs(c) ? a(c, -1) : a(c, -1, void 0, ""));
                return k
            };
            a.prototype.getSeriesExtremes = function () {
                var a = this,
                    d = a.chart,
                    c;
                t(this, "getSeriesExtremes", null, function () {
                    a.hasVisibleSeries = !1;
                    a.dataMin = a.dataMax = a.threshold = null;
                    a.softThreshold = !a.isXAxis;
                    a.stacking && a.stacking.buildStacks();
                    a.series.forEach(function (e) {
                        if (e.visible || !d.options.chart.ignoreHiddenSeries) {
                            var h = e.options,
                                f = h.threshold;
                            a.hasVisibleSeries = !0;
                            a.positiveValuesOnly && 0 >= f && (f = null);
                            if (a.isXAxis) {
                                if (h = e.xData, h.length) {
                                    h = a.logarithmic ? h.filter(a.validatePositiveValue) : h;
                                    c = e.getXExtremes(h);
                                    var p = c.min;
                                    var g = c.max;
                                    b(p) || p instanceof Date || (h = h.filter(b),
                                        c = e.getXExtremes(h), p = c.min, g = c.max);
                                    h.length && (a.dataMin = Math.min(F(a.dataMin, p), p), a.dataMax = Math.max(F(a.dataMax, g), g))
                                }
                            } else if (e = e.applyExtremes(), b(e.dataMin) && (p = e.dataMin, a.dataMin = Math.min(F(a.dataMin, p), p)), b(e.dataMax) && (g = e.dataMax, a.dataMax = Math.max(F(a.dataMax, g), g)), k(f) && (a.threshold = f), !h.softThreshold || a.positiveValuesOnly) a.softThreshold = !1
                        }
                    })
                });
                t(this, "afterGetSeriesExtremes")
            };
            a.prototype.translate = function (a, d, c, e, h, f) {
                var p = this.linkedParent || this,
                    g = e && p.old ? p.old.min : p.min,
                    H = p.minPixelPadding;
                h = (p.isOrdinal || p.brokenAxis && p.brokenAxis.hasBreaks || p.logarithmic && h) && p.lin2val;
                var K = 1,
                    y = 0;
                e = e && p.old ? p.old.transA : p.transA;
                e || (e = p.transA);
                c && (K *= -1, y = p.len);
                p.reversed && (K *= -1, y -= K * (p.sector || p.len));
                d ? (a = (a * K + y - H) / e + g, h && (a = p.lin2val(a))) : (h && (a = p.val2lin(a)), a = b(g) ? K * (a - g) * e + y + K * H + (b(f) ? e * f : 0) : void 0);
                return a
            };
            a.prototype.toPixels = function (b, a) {
                return this.translate(b, !1, !this.horiz, null, !0) + (a ? 0 : this.pos)
            };
            a.prototype.toValue = function (b, a) {
                return this.translate(b - (a ?
                    0 : this.pos), !0, !this.horiz, null, !0)
            };
            a.prototype.getPlotLinePath = function (a) {
                function d(b, a, d) {
                    if ("pass" !== m && b < a || b > d) m ? b = v(b, a, d) : r = !0;
                    return b
                }
                var c = this,
                    e = c.chart,
                    h = c.left,
                    f = c.top,
                    p = a.old,
                    g = a.value,
                    H = a.lineWidth,
                    y = p && e.oldChartHeight || e.chartHeight,
                    k = p && e.oldChartWidth || e.chartWidth,
                    G = c.transB,
                    l = a.translatedValue,
                    m = a.force,
                    L, q, n, B, r;
                a = {
                    value: g,
                    lineWidth: H,
                    old: p,
                    force: m,
                    acrossPanes: a.acrossPanes,
                    translatedValue: l
                };
                t(this, "getPlotLinePath", a, function (a) {
                    l = F(l, c.translate(g, null, null, p));
                    l = v(l, -1E5,
                        1E5);
                    L = n = Math.round(l + G);
                    q = B = Math.round(y - l - G);
                    b(l) ? c.horiz ? (q = f, B = y - c.bottom, L = n = d(L, h, h + c.width)) : (L = h, n = k - c.right, q = B = d(q, f, f + c.height)) : (r = !0, m = !1);
                    a.path = r && !m ? null : e.renderer.crispLine([
                        ["M", L, q],
                        ["L", n, B]
                    ], H || 1)
                });
                return a.path
            };
            a.prototype.getLinearTickPositions = function (b, a, d) {
                var c = q(Math.floor(a / b) * b);
                d = q(Math.ceil(d / b) * b);
                var e = [],
                    h;
                q(c + b) === c && (h = 20);
                if (this.single) return [a];
                for (a = c; a <= d;) {
                    e.push(a);
                    a = q(a + b, h);
                    if (a === f) break;
                    var f = a
                }
                return e
            };
            a.prototype.getMinorTickInterval = function () {
                var b =
                    this.options;
                return !0 === b.minorTicks ? F(b.minorTickInterval, "auto") : !1 === b.minorTicks ? null : b.minorTickInterval
            };
            a.prototype.getMinorTickPositions = function () {
                var b = this.options,
                    a = this.tickPositions,
                    d = this.minorTickInterval,
                    c = this.pointRangePadding || 0,
                    e = this.min - c;
                c = this.max + c;
                var h = c - e,
                    f = [];
                if (h && h / d < this.len / 3) {
                    var p = this.logarithmic;
                    if (p) this.paddedTicks.forEach(function (b, a, c) {
                        a && f.push.apply(f, p.getLogTickPositions(d, c[a - 1], c[a], !0))
                    });
                    else if (this.dateTime && "auto" === this.getMinorTickInterval()) f =
                        f.concat(this.getTimeTicks(this.dateTime.normalizeTimeTickInterval(d), e, c, b.startOfWeek));
                    else
                        for (b = e + (a[0] - e) % d; b <= c && b !== f[0]; b += d) f.push(b)
                }
                0 !== f.length && this.trimTicks(f);
                return f
            };
            a.prototype.adjustForMinRange = function () {
                var b = this.options,
                    a = this.logarithmic,
                    d = this.min,
                    c = this.max,
                    e = 0,
                    h, p, g, y;
                this.isXAxis && "undefined" === typeof this.minRange && !a && (k(b.min) || k(b.max) ? this.minRange = null : (this.series.forEach(function (b) {
                    g = b.xData;
                    y = b.xIncrement ? 1 : g.length - 1;
                    if (1 < g.length)
                        for (h = y; 0 < h; h--)
                            if (p = g[h] -
                                g[h - 1], !e || p < e) e = p
                }), this.minRange = Math.min(5 * e, this.dataMax - this.dataMin)));
                if (c - d < this.minRange) {
                    var G = this.dataMax - this.dataMin >= this.minRange;
                    var t = this.minRange;
                    var m = (t - c + d) / 2;
                    m = [d - m, F(b.min, d - m)];
                    G && (m[2] = this.logarithmic ? this.logarithmic.log2lin(this.dataMin) : this.dataMin);
                    d = l(m);
                    c = [d + t, F(b.max, d + t)];
                    G && (c[2] = a ? a.log2lin(this.dataMax) : this.dataMax);
                    c = f(c);
                    c - d < t && (m[0] = c - t, m[1] = F(b.min, c - t), d = l(m))
                }
                this.min = d;
                this.max = c
            };
            a.prototype.getClosest = function () {
                var b;
                this.categories ? b = 1 : this.series.forEach(function (a) {
                    var d =
                        a.closestPointRange,
                        c = a.visible || !a.chart.options.chart.ignoreHiddenSeries;
                    !a.noSharedTooltip && k(d) && c && (b = k(b) ? Math.min(b, d) : d)
                });
                return b
            };
            a.prototype.nameToX = function (b) {
                var a = d(this.categories),
                    c = a ? this.categories : this.names,
                    e = b.options.x;
                b.series.requireSorting = !1;
                k(e) || (e = this.options.uniqueNames ? a ? c.indexOf(b.name) : F(c.keys[b.name], -1) : b.series.autoIncrement());
                if (-1 === e) {
                    if (!a) var h = c.length
                } else h = e;
                "undefined" !== typeof h && (this.names[h] = b.name, this.names.keys[b.name] = h);
                return h
            };
            a.prototype.updateNames =
                function () {
                    var b = this,
                        a = this.names;
                    0 < a.length && (Object.keys(a.keys).forEach(function (b) {
                        delete a.keys[b]
                    }), a.length = 0, this.minRange = this.userMinRange, (this.series || []).forEach(function (a) {
                        a.xIncrement = null;
                        if (!a.points || a.isDirtyData) b.max = Math.max(b.max, a.xData.length - 1), a.processData(), a.generatePoints();
                        a.data.forEach(function (d, c) {
                            if (d && d.options && "undefined" !== typeof d.name) {
                                var e = b.nameToX(d);
                                "undefined" !== typeof e && e !== d.x && (d.x = e, a.xData[c] = e)
                            }
                        })
                    }))
                };
            a.prototype.setAxisTranslation = function () {
                var b =
                    this,
                    a = b.max - b.min,
                    d = b.linkedParent,
                    c = !!b.categories,
                    e = b.isXAxis,
                    h = b.axisPointRange || 0,
                    f = 0,
                    g = 0,
                    y = b.transA;
                if (e || c || h) {
                    var k = b.getClosest();
                    d ? (f = d.minPointOffset, g = d.pointRangePadding) : b.series.forEach(function (a) {
                        var d = c ? 1 : e ? F(a.options.pointRange, k, 0) : b.axisPointRange || 0,
                            A = a.options.pointPlacement;
                        h = Math.max(h, d);
                        if (!b.single || c) a = a.is("xrange") ? !e : e, f = Math.max(f, a && p(A) ? 0 : d / 2), g = Math.max(g, a && "on" === A ? 0 : d)
                    });
                    d = b.ordinal && b.ordinal.slope && k ? b.ordinal.slope / k : 1;
                    b.minPointOffset = f *= d;
                    b.pointRangePadding =
                        g *= d;
                    b.pointRange = Math.min(h, b.single && c ? 1 : a);
                    e && (b.closestPointRange = k)
                }
                b.translationSlope = b.transA = y = b.staticScale || b.len / (a + g || 1);
                b.transB = b.horiz ? b.left : b.bottom;
                b.minPixelPadding = y * f;
                t(this, "afterSetAxisTranslation")
            };
            a.prototype.minFromRange = function () {
                return this.max - this.range
            };
            a.prototype.setTickInterval = function (a) {
                var d = this,
                    c = d.chart,
                    e = d.logarithmic,
                    f = d.options,
                    p = d.isXAxis,
                    g = d.isLinked,
                    l = f.tickPixelInterval,
                    G = d.categories,
                    H = d.softThreshold,
                    m = f.maxPadding,
                    L = f.minPadding,
                    n = f.tickInterval,
                    v = b(d.threshold) ? d.threshold : null;
                d.dateTime || G || g || this.getTickAmount();
                var r = F(d.userMin, f.min);
                var P = F(d.userMax, f.max);
                if (g) {
                    d.linkedParent = c[d.coll][f.linkedTo];
                    var D = d.linkedParent.getExtremes();
                    d.min = F(D.min, D.dataMin);
                    d.max = F(D.max, D.dataMax);
                    f.type !== d.linkedParent.options.type && B(11, 1, c)
                } else {
                    if (H && k(v))
                        if (d.dataMin >= v) D = v, L = 0;
                        else if (d.dataMax <= v) {
                        var I = v;
                        m = 0
                    }
                    d.min = F(r, D, d.dataMin);
                    d.max = F(P, I, d.dataMax)
                }
                e && (d.positiveValuesOnly && !a && 0 >= Math.min(d.min, F(d.dataMin, d.min)) && B(10, 1, c), d.min =
                    q(e.log2lin(d.min), 16), d.max = q(e.log2lin(d.max), 16));
                d.range && k(d.max) && (d.userMin = d.min = r = Math.max(d.dataMin, d.minFromRange()), d.userMax = P = d.max, d.range = null);
                t(d, "foundExtremes");
                d.beforePadding && d.beforePadding();
                d.adjustForMinRange();
                !(G || d.axisPointRange || d.stacking && d.stacking.usePercentage || g) && k(d.min) && k(d.max) && (c = d.max - d.min) && (!k(r) && L && (d.min -= c * L), !k(P) && m && (d.max += c * m));
                b(d.userMin) || (b(f.softMin) && f.softMin < d.min && (d.min = r = f.softMin), b(f.floor) && (d.min = Math.max(d.min, f.floor)));
                b(d.userMax) ||
                    (b(f.softMax) && f.softMax > d.max && (d.max = P = f.softMax), b(f.ceiling) && (d.max = Math.min(d.max, f.ceiling)));
                H && k(d.dataMin) && (v = v || 0, !k(r) && d.min < v && d.dataMin >= v ? d.min = d.options.minRange ? Math.min(v, d.max - d.minRange) : v : !k(P) && d.max > v && d.dataMax <= v && (d.max = d.options.minRange ? Math.max(v, d.min + d.minRange) : v));
                b(d.min) && b(d.max) && !this.chart.polar && d.min > d.max && (k(d.options.min) ? d.max = d.min : k(d.options.max) && (d.min = d.max));
                d.tickInterval = d.min === d.max || "undefined" === typeof d.min || "undefined" === typeof d.max ? 1 :
                    g && d.linkedParent && !n && l === d.linkedParent.options.tickPixelInterval ? n = d.linkedParent.tickInterval : F(n, this.tickAmount ? (d.max - d.min) / Math.max(this.tickAmount - 1, 1) : void 0, G ? 1 : (d.max - d.min) * l / Math.max(d.len, l));
                p && !a && (d.series.forEach(function (b) {
                    b.forceCrop = b.forceCropping && b.forceCropping();
                    b.processData(d.min !== (d.old && d.old.min) || d.max !== (d.old && d.old.max))
                }), t(this, "postProcessData"));
                d.setAxisTranslation();
                t(this, "initialAxisTranslation");
                d.pointRange && !n && (d.tickInterval = Math.max(d.pointRange,
                    d.tickInterval));
                a = F(f.minTickInterval, d.dateTime && !d.series.some(function (b) {
                    return b.noSharedTooltip
                }) ? d.closestPointRange : 0);
                !n && d.tickInterval < a && (d.tickInterval = a);
                d.dateTime || d.logarithmic || n || (d.tickInterval = y(d.tickInterval, void 0, h(d.tickInterval), F(f.allowDecimals, .5 > d.tickInterval || void 0 !== this.tickAmount), !!this.tickAmount));
                this.tickAmount || (d.tickInterval = d.unsquish());
                this.setTickPositions()
            };
            a.prototype.setTickPositions = function () {
                var b = this.options,
                    d = b.tickPositions,
                    a = this.getMinorTickInterval(),
                    c = this.hasVerticalPanning(),
                    e = "colorAxis" === this.coll,
                    h = (e || !c) && b.startOnTick;
                c = (e || !c) && b.endOnTick;
                e = b.tickPositioner;
                this.tickmarkOffset = this.categories && "between" === b.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0;
                this.minorTickInterval = "auto" === a && this.tickInterval ? this.tickInterval / 5 : a;
                this.single = this.min === this.max && k(this.min) && !this.tickAmount && (parseInt(this.min, 10) === this.min || !1 !== b.allowDecimals);
                this.tickPositions = a = d && d.slice();
                !a && (this.ordinal && this.ordinal.positions || !((this.max -
                    this.min) / this.tickInterval > Math.max(2 * this.len, 200)) ? a = this.dateTime ? this.getTimeTicks(this.dateTime.normalizeTimeTickInterval(this.tickInterval, b.units), this.min, this.max, b.startOfWeek, this.ordinal && this.ordinal.positions, this.closestPointRange, !0) : this.logarithmic ? this.logarithmic.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max) : (a = [this.min, this.max], B(19, !1, this.chart)), a.length > this.len && (a = [a[0], a.pop()], a[0] === a[1] &&
                    (a.length = 1)), this.tickPositions = a, e && (e = e.apply(this, [this.min, this.max]))) && (this.tickPositions = a = e);
                this.paddedTicks = a.slice(0);
                this.trimTicks(a, h, c);
                this.isLinked || (this.single && 2 > a.length && !this.categories && !this.series.some(function (b) {
                    return b.is("heatmap") && "between" === b.options.pointPlacement
                }) && (this.min -= .5, this.max += .5), d || e || this.adjustTickAmount());
                t(this, "afterSetTickPositions")
            };
            a.prototype.trimTicks = function (b, d, a) {
                var c = b[0],
                    e = b[b.length - 1],
                    h = !this.isOrdinal && this.minPointOffset ||
                    0;
                t(this, "trimTicks");
                if (!this.isLinked) {
                    if (d && -Infinity !== c) this.min = c;
                    else
                        for (; this.min - h > b[0];) b.shift();
                    if (a) this.max = e;
                    else
                        for (; this.max + h < b[b.length - 1];) b.pop();
                    0 === b.length && k(c) && !this.options.tickPositions && b.push((e + c) / 2)
                }
            };
            a.prototype.alignToOthers = function () {
                var b = {},
                    d = this.options,
                    a;
                !1 !== this.chart.options.chart.alignTicks && d.alignTicks && !1 !== d.startOnTick && !1 !== d.endOnTick && !this.logarithmic && this.chart[this.coll].forEach(function (d) {
                    var c = d.options;
                    c = [d.horiz ? c.left : c.top, c.width,
                        c.height, c.pane
                    ].join();
                    d.series.length && (b[c] ? a = !0 : b[c] = 1)
                });
                return a
            };
            a.prototype.getTickAmount = function () {
                var b = this.options,
                    d = b.tickPixelInterval,
                    a = b.tickAmount;
                !k(b.tickInterval) && !a && this.len < d && !this.isRadial && !this.logarithmic && b.startOnTick && b.endOnTick && (a = 2);
                !a && this.alignToOthers() && (a = Math.ceil(this.len / d) + 1);
                4 > a && (this.finalTickAmt = a, a = 5);
                this.tickAmount = a
            };
            a.prototype.adjustTickAmount = function () {
                var d = this.options,
                    a = this.tickInterval,
                    c = this.tickPositions,
                    e = this.tickAmount,
                    h = this.finalTickAmt,
                    f = c && c.length,
                    p = F(this.threshold, this.softThreshold ? 0 : null);
                if (this.hasData() && b(this.min) && b(this.max)) {
                    if (f < e) {
                        for (; c.length < e;) c.length % 2 || this.min === p ? c.push(q(c[c.length - 1] + a)) : c.unshift(q(c[0] - a));
                        this.transA *= (f - 1) / (e - 1);
                        this.min = d.startOnTick ? c[0] : Math.min(this.min, c[0]);
                        this.max = d.endOnTick ? c[c.length - 1] : Math.max(this.max, c[c.length - 1])
                    } else f > e && (this.tickInterval *= 2, this.setTickPositions());
                    if (k(h)) {
                        for (a = d = c.length; a--;)(3 === h && 1 === a % 2 || 2 >= h && 0 < a && a < d - 1) && c.splice(a, 1);
                        this.finalTickAmt =
                            void 0
                    }
                }
            };
            a.prototype.setScale = function () {
                var b = !1,
                    d = !1;
                this.series.forEach(function (a) {
                    b = b || a.isDirtyData || a.isDirty;
                    d = d || a.xAxis && a.xAxis.isDirty || !1
                });
                this.setAxisSize();
                var a = this.len !== (this.old && this.old.len);
                a || b || d || this.isLinked || this.forceRedraw || this.userMin !== (this.old && this.old.userMin) || this.userMax !== (this.old && this.old.userMax) || this.alignToOthers() ? (this.stacking && this.stacking.resetStacks(), this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickInterval(), this.isDirty || (this.isDirty =
                    a || this.min !== (this.old && this.old.min) || this.max !== (this.old && this.old.max))) : this.stacking && this.stacking.cleanStacks();
                b && this.panningState && (this.panningState.isDirty = !0);
                t(this, "afterSetScale")
            };
            a.prototype.setExtremes = function (b, d, a, c, e) {
                var h = this,
                    f = h.chart;
                a = F(a, !0);
                h.series.forEach(function (b) {
                    delete b.kdTree
                });
                e = O(e, {
                    min: b,
                    max: d
                });
                t(h, "setExtremes", e, function () {
                    h.userMin = b;
                    h.userMax = d;
                    h.eventArgs = e;
                    a && f.redraw(c)
                })
            };
            a.prototype.zoom = function (b, d) {
                var a = this,
                    c = this.dataMin,
                    e = this.dataMax,
                    h = this.options,
                    f = Math.min(c, F(h.min, c)),
                    p = Math.max(e, F(h.max, e));
                b = {
                    newMin: b,
                    newMax: d
                };
                t(this, "zoom", b, function (b) {
                    var d = b.newMin,
                        h = b.newMax;
                    if (d !== a.min || h !== a.max) a.allowZoomOutside || (k(c) && (d < f && (d = f), d > p && (d = p)), k(e) && (h < f && (h = f), h > p && (h = p))), a.displayBtn = "undefined" !== typeof d || "undefined" !== typeof h, a.setExtremes(d, h, !1, void 0, {
                        trigger: "zoom"
                    });
                    b.zoomed = !0
                });
                return b.zoomed
            };
            a.prototype.setAxisSize = function () {
                var b = this.chart,
                    d = this.options,
                    a = d.offsets || [0, 0, 0, 0],
                    c = this.horiz,
                    e = this.width = Math.round(P(F(d.width,
                        b.plotWidth - a[3] + a[1]), b.plotWidth)),
                    h = this.height = Math.round(P(F(d.height, b.plotHeight - a[0] + a[2]), b.plotHeight)),
                    f = this.top = Math.round(P(F(d.top, b.plotTop + a[0]), b.plotHeight, b.plotTop));
                d = this.left = Math.round(P(F(d.left, b.plotLeft + a[3]), b.plotWidth, b.plotLeft));
                this.bottom = b.chartHeight - h - f;
                this.right = b.chartWidth - e - d;
                this.len = Math.max(c ? e : h, 0);
                this.pos = c ? d : f
            };
            a.prototype.getExtremes = function () {
                var b = this.logarithmic;
                return {
                    min: b ? q(b.lin2log(this.min)) : this.min,
                    max: b ? q(b.lin2log(this.max)) : this.max,
                    dataMin: this.dataMin,
                    dataMax: this.dataMax,
                    userMin: this.userMin,
                    userMax: this.userMax
                }
            };
            a.prototype.getThreshold = function (b) {
                var d = this.logarithmic,
                    a = d ? d.lin2log(this.min) : this.min;
                d = d ? d.lin2log(this.max) : this.max;
                null === b || -Infinity === b ? b = a : Infinity === b ? b = d : a > b ? b = a : d < b && (b = d);
                return this.translate(b, 0, 1, 0, 1)
            };
            a.prototype.autoLabelAlign = function (b) {
                var d = (F(b, 0) - 90 * this.side + 720) % 360;
                b = {
                    align: "center"
                };
                t(this, "autoLabelAlign", b, function (b) {
                    15 < d && 165 > d ? b.align = "right" : 195 < d && 345 > d && (b.align = "left")
                });
                return b.align
            };
            a.prototype.tickSize = function (b) {
                var d = this.options,
                    a = F(d["tick" === b ? "tickWidth" : "minorTickWidth"], "tick" === b && this.isXAxis && !this.categories ? 1 : 0),
                    c = d["tick" === b ? "tickLength" : "minorTickLength"];
                if (a && c) {
                    "inside" === d[b + "Position"] && (c = -c);
                    var e = [c, a]
                }
                b = {
                    tickSize: e
                };
                t(this, "afterTickSize", b);
                return b.tickSize
            };
            a.prototype.labelMetrics = function () {
                var b = this.tickPositions && this.tickPositions[0] || 0;
                return this.chart.renderer.fontMetrics(this.options.labels.style.fontSize, this.ticks[b] &&
                    this.ticks[b].label)
            };
            a.prototype.unsquish = function () {
                var d = this.options.labels,
                    a = this.horiz,
                    c = this.tickInterval,
                    h = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / c),
                    f = d.rotation,
                    p = this.labelMetrics(),
                    g = Math.max(this.max - this.min, 0),
                    y = function (b) {
                        var d = b / (h || 1);
                        d = 1 < d ? Math.ceil(d) : 1;
                        d * c > g && Infinity !== b && Infinity !== h && g && (d = Math.ceil(g / c));
                        return q(d * c)
                    },
                    k = c,
                    l, G, t = Number.MAX_VALUE;
                if (a) {
                    if (!d.staggerLines && !d.step)
                        if (b(f)) var m = [f];
                        else h < d.autoRotationLimit && (m = d.autoRotation);
                    m && m.forEach(function (b) {
                        if (b ===
                            f || b && -90 <= b && 90 >= b) {
                            G = y(Math.abs(p.h / Math.sin(e * b)));
                            var d = G + Math.abs(b / 360);
                            d < t && (t = d, l = b, k = G)
                        }
                    })
                } else d.step || (k = y(p.h));
                this.autoRotation = m;
                this.labelRotation = F(l, b(f) ? f : 0);
                return k
            };
            a.prototype.getSlotWidth = function (d) {
                var a = this.chart,
                    c = this.horiz,
                    e = this.options.labels,
                    h = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1),
                    f = a.margin[3];
                if (d && b(d.slotWidth)) return d.slotWidth;
                if (c && 2 > e.step) return e.rotation ? 0 : (this.staggerLines || 1) * this.len / h;
                if (!c) {
                    d = e.style.width;
                    if (void 0 !== d) return parseInt(String(d),
                        10);
                    if (f) return f - a.spacing[3]
                }
                return .33 * a.chartWidth
            };
            a.prototype.renderUnsquish = function () {
                var b = this.chart,
                    d = b.renderer,
                    a = this.tickPositions,
                    c = this.ticks,
                    e = this.options.labels,
                    h = e.style,
                    f = this.horiz,
                    g = this.getSlotWidth(),
                    y = Math.max(1, Math.round(g - 2 * e.padding)),
                    k = {},
                    G = this.labelMetrics(),
                    l = h.textOverflow,
                    t = 0;
                p(e.rotation) || (k.rotation = e.rotation || 0);
                a.forEach(function (b) {
                    b = c[b];
                    b.movedLabel && b.replaceMovedLabel();
                    b && b.label && b.label.textPxLength > t && (t = b.label.textPxLength)
                });
                this.maxLabelLength =
                    t;
                if (this.autoRotation) t > y && t > G.h ? k.rotation = this.labelRotation : this.labelRotation = 0;
                else if (g) {
                    var m = y;
                    if (!l) {
                        var F = "clip";
                        for (y = a.length; !f && y--;) {
                            var L = a[y];
                            if (L = c[L].label) L.styles && "ellipsis" === L.styles.textOverflow ? L.css({
                                textOverflow: "clip"
                            }) : L.textPxLength > g && L.css({
                                width: g + "px"
                            }), L.getBBox().height > this.len / a.length - (G.h - G.f) && (L.specificTextOverflow = "ellipsis")
                        }
                    }
                }
                k.rotation && (m = t > .5 * b.chartHeight ? .33 * b.chartHeight : t, l || (F = "ellipsis"));
                if (this.labelAlign = e.align || this.autoLabelAlign(this.labelRotation)) k.align =
                    this.labelAlign;
                a.forEach(function (b) {
                    var d = (b = c[b]) && b.label,
                        a = h.width,
                        e = {};
                    d && (d.attr(k), b.shortenLabel ? b.shortenLabel() : m && !a && "nowrap" !== h.whiteSpace && (m < d.textPxLength || "SPAN" === d.element.tagName) ? (e.width = m + "px", l || (e.textOverflow = d.specificTextOverflow || F), d.css(e)) : d.styles && d.styles.width && !e.width && !a && d.css({
                        width: null
                    }), delete d.specificTextOverflow, b.rotation = k.rotation)
                }, this);
                this.tickRotCorr = d.rotCorr(G.b, this.labelRotation || 0, 0 !== this.side)
            };
            a.prototype.hasData = function () {
                return this.series.some(function (b) {
                        return b.hasData()
                    }) ||
                    this.options.showEmpty && k(this.min) && k(this.max)
            };
            a.prototype.addTitle = function (b) {
                var d = this.chart.renderer,
                    a = this.horiz,
                    c = this.opposite,
                    e = this.options.title,
                    h = this.chart.styledMode,
                    f;
                this.axisTitle || ((f = e.textAlign) || (f = (a ? {
                        low: "left",
                        middle: "center",
                        high: "right"
                    } : {
                        low: c ? "right" : "left",
                        middle: "center",
                        high: c ? "left" : "right"
                    })[e.align]), this.axisTitle = d.text(e.text || "", 0, 0, e.useHTML).attr({
                        zIndex: 7,
                        rotation: e.rotation,
                        align: f
                    }).addClass("highcharts-axis-title"), h || this.axisTitle.css(G(e.style)), this.axisTitle.add(this.axisGroup),
                    this.axisTitle.isNew = !0);
                h || e.style.width || this.isRadial || this.axisTitle.css({
                    width: this.len + "px"
                });
                this.axisTitle[b ? "show" : "hide"](b)
            };
            a.prototype.generateTick = function (b) {
                var d = this.ticks;
                d[b] ? d[b].addLabel() : d[b] = new u(this, b)
            };
            a.prototype.getOffset = function () {
                var b = this,
                    d = this,
                    a = d.chart,
                    c = a.renderer,
                    e = d.options,
                    h = d.tickPositions,
                    f = d.ticks,
                    p = d.horiz,
                    g = d.side,
                    y = a.inverted && !d.isZAxis ? [1, 0, 3, 2][g] : g,
                    G = d.hasData(),
                    l = e.title,
                    m = e.labels,
                    q = a.axisOffset;
                a = a.clipOffset;
                var v = [-1, 1, 1, -1][g],
                    n = e.className,
                    B = d.axisParent,
                    r, P = 0,
                    D = 0,
                    ca = 0;
                d.showAxis = r = G || e.showEmpty;
                d.staggerLines = d.horiz && m.staggerLines || void 0;
                if (!d.axisGroup) {
                    var ia = function (d, a, e) {
                        return c.g(d).attr({
                            zIndex: e
                        }).addClass("highcharts-" + b.coll.toLowerCase() + a + " " + (b.isRadial ? "highcharts-radial-axis" + a + " " : "") + (n || "")).add(B)
                    };
                    d.gridGroup = ia("grid", "-grid", e.gridZIndex);
                    d.axisGroup = ia("axis", "", e.zIndex);
                    d.labelGroup = ia("axis-labels", "-labels", m.zIndex)
                }
                G || d.isLinked ? (h.forEach(function (b) {
                        d.generateTick(b)
                    }), d.renderUnsquish(), d.reserveSpaceDefault =
                    0 === g || 2 === g || {
                        1: "left",
                        3: "right"
                    } [g] === d.labelAlign, F(m.reserveSpace, "center" === d.labelAlign ? !0 : null, d.reserveSpaceDefault) && h.forEach(function (b) {
                        ca = Math.max(f[b].getLabelSize(), ca)
                    }), d.staggerLines && (ca *= d.staggerLines), d.labelOffset = ca * (d.opposite ? -1 : 1)) : L(f, function (b, d) {
                    b.destroy();
                    delete f[d]
                });
                if (l && l.text && !1 !== l.enabled && (d.addTitle(r), r && !1 !== l.reserveSpace)) {
                    d.titleOffset = P = d.axisTitle.getBBox()[p ? "height" : "width"];
                    var I = l.offset;
                    D = k(I) ? 0 : F(l.margin, p ? 5 : 10)
                }
                d.renderLine();
                d.offset = v * F(e.offset,
                    q[g] ? q[g] + (e.margin || 0) : 0);
                d.tickRotCorr = d.tickRotCorr || {
                    x: 0,
                    y: 0
                };
                l = 0 === g ? -d.labelMetrics().h : 2 === g ? d.tickRotCorr.y : 0;
                G = Math.abs(ca) + D;
                ca && (G = G - l + v * (p ? F(m.y, d.tickRotCorr.y + 8 * v) : m.x));
                d.axisTitleMargin = F(I, G);
                d.getMaxLabelDimensions && (d.maxLabelDimensions = d.getMaxLabelDimensions(f, h));
                p = this.tickSize("tick");
                q[g] = Math.max(q[g], (d.axisTitleMargin || 0) + P + v * d.offset, G, h && h.length && p ? p[0] + v * d.offset : 0);
                e = e.offset ? 0 : 2 * Math.floor(d.axisLine.strokeWidth() / 2);
                a[y] = Math.max(a[y], e);
                t(this, "afterGetOffset")
            };
            a.prototype.getLinePath = function (b) {
                var d = this.chart,
                    a = this.opposite,
                    c = this.offset,
                    e = this.horiz,
                    h = this.left + (a ? this.width : 0) + c;
                c = d.chartHeight - this.bottom - (a ? this.height : 0) + c;
                a && (b *= -1);
                return d.renderer.crispLine([
                    ["M", e ? this.left : h, e ? c : this.top],
                    ["L", e ? d.chartWidth - this.right : h, e ? c : d.chartHeight - this.bottom]
                ], b)
            };
            a.prototype.renderLine = function () {
                this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup), this.chart.styledMode || this.axisLine.attr({
                    stroke: this.options.lineColor,
                    "stroke-width": this.options.lineWidth,
                    zIndex: 7
                }))
            };
            a.prototype.getTitlePosition = function () {
                var b = this.horiz,
                    d = this.left,
                    a = this.top,
                    c = this.len,
                    e = this.options.title,
                    h = b ? d : a,
                    f = this.opposite,
                    p = this.offset,
                    g = e.x,
                    y = e.y,
                    k = this.axisTitle,
                    G = this.chart.renderer.fontMetrics(e.style.fontSize, k);
                k = Math.max(k.getBBox(null, 0).height - G.h - 1, 0);
                c = {
                    low: h + (b ? 0 : c),
                    middle: h + c / 2,
                    high: h + (b ? c : 0)
                } [e.align];
                d = (b ? a + this.height : d) + (b ? 1 : -1) * (f ? -1 : 1) * this.axisTitleMargin + [-k, k, G.f, -k][this.side];
                b = {
                    x: b ? c + g : d + (f ? this.width : 0) + p +
                        g,
                    y: b ? d + y - (f ? this.height : 0) + p : c + y
                };
                t(this, "afterGetTitlePosition", {
                    titlePosition: b
                });
                return b
            };
            a.prototype.renderMinorTick = function (b, d) {
                var a = this.minorTicks;
                a[b] || (a[b] = new u(this, b, "minor"));
                d && a[b].isNew && a[b].render(null, !0);
                a[b].render(null, !1, 1)
            };
            a.prototype.renderTick = function (b, d, a) {
                var c = this.ticks;
                if (!this.isLinked || b >= this.min && b <= this.max || this.grid && this.grid.isColumn) c[b] || (c[b] = new u(this, b)), a && c[b].isNew && c[b].render(d, !0, -1), c[b].render(d)
            };
            a.prototype.render = function () {
                var d = this,
                    a = d.chart,
                    c = d.logarithmic,
                    e = d.options,
                    h = d.isLinked,
                    f = d.tickPositions,
                    p = d.axisTitle,
                    g = d.ticks,
                    y = d.minorTicks,
                    k = d.alternateBands,
                    G = e.stackLabels,
                    l = e.alternateGridColor,
                    F = d.tickmarkOffset,
                    q = d.axisLine,
                    v = d.showAxis,
                    n = m(a.renderer.globalAnimation),
                    B, r;
                d.labelEdge.length = 0;
                d.overlap = !1;
                [g, y, k].forEach(function (b) {
                    L(b, function (b) {
                        b.isActive = !1
                    })
                });
                if (d.hasData() || h) {
                    var P = d.chart.hasRendered && d.old && b(d.old.min);
                    d.minorTickInterval && !d.categories && d.getMinorTickPositions().forEach(function (b) {
                        d.renderMinorTick(b,
                            P)
                    });
                    f.length && (f.forEach(function (b, a) {
                        d.renderTick(b, a, P)
                    }), F && (0 === d.min || d.single) && (g[-1] || (g[-1] = new u(d, -1, null, !0)), g[-1].render(-1)));
                    l && f.forEach(function (b, e) {
                        r = "undefined" !== typeof f[e + 1] ? f[e + 1] + F : d.max - F;
                        0 === e % 2 && b < d.max && r <= d.max + (a.polar ? -F : F) && (k[b] || (k[b] = new J.PlotLineOrBand(d)), B = b + F, k[b].options = {
                            from: c ? c.lin2log(B) : B,
                            to: c ? c.lin2log(r) : r,
                            color: l,
                            className: "highcharts-alternate-grid"
                        }, k[b].render(), k[b].isActive = !0)
                    });
                    d._addedPlotLB || (d._addedPlotLB = !0, (e.plotLines || []).concat(e.plotBands || []).forEach(function (b) {
                        d.addPlotBandOrLine(b)
                    }))
                } [g, y, k].forEach(function (b) {
                    var d = [],
                        c = n.duration;
                    L(b, function (b, a) {
                        b.isActive || (b.render(a, !1, 0), b.isActive = !1, d.push(a))
                    });
                    V(function () {
                        for (var a = d.length; a--;) b[d[a]] && !b[d[a]].isActive && (b[d[a]].destroy(), delete b[d[a]])
                    }, b !== k && a.hasRendered && c ? c : 0)
                });
                q && (q[q.isPlaced ? "animate" : "attr"]({
                    d: this.getLinePath(q.strokeWidth())
                }), q.isPlaced = !0, q[v ? "show" : "hide"](v));
                p && v && (e = d.getTitlePosition(), b(e.y) ? (p[p.isNew ? "attr" : "animate"](e), p.isNew = !1) : (p.attr("y",
                    -9999), p.isNew = !0));
                G && G.enabled && d.stacking && d.stacking.renderStackTotals();
                d.old = {
                    len: d.len,
                    max: d.max,
                    min: d.min,
                    transA: d.transA,
                    userMax: d.userMax,
                    userMin: d.userMin
                };
                d.isDirty = !1;
                t(this, "afterRender")
            };
            a.prototype.redraw = function () {
                this.visible && (this.render(), this.plotLinesAndBands.forEach(function (b) {
                    b.render()
                }));
                this.series.forEach(function (b) {
                    b.isDirty = !0
                })
            };
            a.prototype.getKeepProps = function () {
                return this.keepProps || a.keepProps
            };
            a.prototype.destroy = function (b) {
                var d = this,
                    a = d.plotLinesAndBands,
                    c = this.eventOptions;
                t(this, "destroy", {
                    keepEvents: b
                });
                b || S(d);
                [d.ticks, d.minorTicks, d.alternateBands].forEach(function (b) {
                    r(b)
                });
                if (a)
                    for (b = a.length; b--;) a[b].destroy();
                "axisLine axisTitle axisGroup gridGroup labelGroup cross scrollbar".split(" ").forEach(function (b) {
                    d[b] && (d[b] = d[b].destroy())
                });
                for (var e in d.plotLinesAndBandsGroups) d.plotLinesAndBandsGroups[e] = d.plotLinesAndBandsGroups[e].destroy();
                L(d, function (b, a) {
                    -1 === d.getKeepProps().indexOf(a) && delete d[a]
                });
                this.eventOptions = c
            };
            a.prototype.drawCrosshair =
                function (b, d) {
                    var a = this.crosshair,
                        c = F(a && a.snap, !0),
                        e = this.chart,
                        h, f = this.cross;
                    t(this, "drawCrosshair", {
                        e: b,
                        point: d
                    });
                    b || (b = this.cross && this.cross.e);
                    if (a && !1 !== (k(d) || !c)) {
                        c ? k(d) && (h = F("colorAxis" !== this.coll ? d.crosshairPos : null, this.isXAxis ? d.plotX : this.len - d.plotY)) : h = b && (this.horiz ? b.chartX - this.pos : this.len - b.chartY + this.pos);
                        if (k(h)) {
                            var p = {
                                value: d && (this.isXAxis ? d.x : F(d.stackY, d.y)),
                                translatedValue: h
                            };
                            e.polar && O(p, {
                                isCrosshair: !0,
                                chartX: b && b.chartX,
                                chartY: b && b.chartY,
                                point: d
                            });
                            p = this.getPlotLinePath(p) ||
                                null
                        }
                        if (!k(p)) {
                            this.hideCrosshair();
                            return
                        }
                        c = this.categories && !this.isRadial;
                        f || (this.cross = f = e.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (c ? "category " : "thin ") + (a.className || "")).attr({
                            zIndex: F(a.zIndex, 2)
                        }).add(), e.styledMode || (f.attr({
                            stroke: a.color || (c ? C.parse(E.highlightColor20).setOpacity(.25).get() : E.neutralColor20),
                            "stroke-width": F(a.width, 1)
                        }).css({
                            "pointer-events": "none"
                        }), a.dashStyle && f.attr({
                            dashstyle: a.dashStyle
                        })));
                        f.show().attr({
                            d: p
                        });
                        c && !a.width && f.attr({
                            "stroke-width": this.transA
                        });
                        this.cross.e = b
                    } else this.hideCrosshair();
                    t(this, "afterDrawCrosshair", {
                        e: b,
                        point: d
                    })
                };
            a.prototype.hideCrosshair = function () {
                this.cross && this.cross.hide();
                t(this, "afterHideCrosshair")
            };
            a.prototype.hasVerticalPanning = function () {
                var b = this.chart.options.chart.panning;
                return !!(b && b.enabled && /y/.test(b.type))
            };
            a.prototype.validatePositiveValue = function (d) {
                return b(d) && 0 < d
            };
            a.prototype.update = function (b, d) {
                var a = this.chart;
                b = G(this.userOptions, b);
                this.destroy(!0);
                this.init(a, b);
                a.isDirtyBox = !0;
                F(d, !0) && a.redraw()
            };
            a.prototype.remove = function (b) {
                for (var d = this.chart, a = this.coll, c = this.series, e = c.length; e--;) c[e] && c[e].remove(!1);
                D(d.axes, this);
                D(d[a], this);
                d[a].forEach(function (b, d) {
                    b.options.index = b.userOptions.index = d
                });
                this.destroy();
                d.isDirtyBox = !0;
                F(b, !0) && d.redraw()
            };
            a.prototype.setTitle = function (b, d) {
                this.update({
                    title: b
                }, d)
            };
            a.prototype.setCategories = function (b, d) {
                this.update({
                    categories: b
                }, d)
            };
            a.defaultOptions = w.defaultXAxisOptions;
            a.keepProps = "extKey hcEvents names series userMax userMin".split(" ");
            return a
        }();
        "";
        return a
    });
    M(a, "Core/Axis/DateTimeAxis.js", [a["Core/Utilities.js"]], function (a) {
        var r = a.addEvent,
            C = a.getMagnitude,
            E = a.normalizeTickInterval,
            z = a.timeUnits,
            x;
        (function (a) {
            function u() {
                return this.chart.time.getTimeTicks.apply(this.chart.time, arguments)
            }

            function n(a) {
                "datetime" !== a.userOptions.type ? this.dateTime = void 0 : this.dateTime || (this.dateTime = new g(this))
            }
            var m = [];
            a.compose = function (a) {
                -1 === m.indexOf(a) && (m.push(a), a.keepProps.push("dateTime"), a.prototype.getTimeTicks = u, r(a, "init",
                    n));
                return a
            };
            var g = function () {
                function a(a) {
                    this.axis = a
                }
                a.prototype.normalizeTimeTickInterval = function (a, c) {
                    var e = c || [
                        ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
                        ["second", [1, 2, 5, 10, 15, 30]],
                        ["minute", [1, 2, 5, 10, 15, 30]],
                        ["hour", [1, 2, 3, 4, 6, 8, 12]],
                        ["day", [1, 2]],
                        ["week", [1, 2]],
                        ["month", [1, 2, 3, 4, 6]],
                        ["year", null]
                    ];
                    c = e[e.length - 1];
                    var g = z[c[0]],
                        l = c[1],
                        k;
                    for (k = 0; k < e.length && !(c = e[k], g = z[c[0]], l = c[1], e[k + 1] && a <= (g * l[l.length - 1] + z[e[k + 1][0]]) / 2); k++);
                    g === z.year && a < 5 * g && (l = [1, 2, 5]);
                    a = E(a / g, l, "year" === c[0] ?
                        Math.max(C(a / g), 1) : 1);
                    return {
                        unitRange: g,
                        count: a,
                        unitName: c[0]
                    }
                };
                a.prototype.getXDateFormat = function (a, c) {
                    var e = this.axis;
                    return e.closestPointRange ? e.chart.time.getDateFormat(e.closestPointRange, a, e.options.startOfWeek, c) || c.year : c.day
                };
                return a
            }();
            a.Additions = g
        })(x || (x = {}));
        return x
    });
    M(a, "Core/Axis/LogarithmicAxis.js", [a["Core/Utilities.js"]], function (a) {
        var r = a.addEvent,
            C = a.getMagnitude,
            E = a.normalizeTickInterval,
            z = a.pick,
            x;
        (function (a) {
            function u(a) {
                var c = this.logarithmic;
                "logarithmic" !== a.userOptions.type ?
                    this.logarithmic = void 0 : c || (this.logarithmic = new g(this))
            }

            function n() {
                var a = this.logarithmic;
                a && (this.lin2val = function (c) {
                    return a.lin2log(c)
                }, this.val2lin = function (c) {
                    return a.log2lin(c)
                })
            }
            var m = [];
            a.compose = function (a) {
                -1 === m.indexOf(a) && (m.push(a), a.keepProps.push("logarithmic"), r(a, "init", u), r(a, "afterInit", n));
                return a
            };
            var g = function () {
                function a(a) {
                    this.axis = a
                }
                a.prototype.getLogTickPositions = function (a, c, f, g) {
                    var e = this.axis,
                        k = e.len,
                        l = e.options,
                        m = [];
                    g || (this.minorAutoInterval = void 0);
                    if (.5 <=
                        a) a = Math.round(a), m = e.getLinearTickPositions(a, c, f);
                    else if (.08 <= a) {
                        var n = Math.floor(c),
                            v, t = l = void 0;
                        for (k = .3 < a ? [1, 2, 4] : .15 < a ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; n < f + 1 && !t; n++) {
                            var h = k.length;
                            for (v = 0; v < h && !t; v++) {
                                var d = this.log2lin(this.lin2log(n) * k[v]);
                                d > c && (!g || l <= f) && "undefined" !== typeof l && m.push(l);
                                l > f && (t = !0);
                                l = d
                            }
                        }
                    } else c = this.lin2log(c), f = this.lin2log(f), a = g ? e.getMinorTickInterval() : l.tickInterval, a = z("auto" === a ? null : a, this.minorAutoInterval, l.tickPixelInterval / (g ? 5 : 1) * (f - c) / ((g ? k / e.tickPositions.length :
                        k) || 1)), a = E(a, void 0, C(a)), m = e.getLinearTickPositions(a, c, f).map(this.log2lin), g || (this.minorAutoInterval = a / 5);
                    g || (e.tickInterval = a);
                    return m
                };
                a.prototype.lin2log = function (a) {
                    return Math.pow(10, a)
                };
                a.prototype.log2lin = function (a) {
                    return Math.log(a) / Math.LN10
                };
                return a
            }();
            a.Additions = g
        })(x || (x = {}));
        return x
    });
    M(a, "Core/Axis/PlotLineOrBand/PlotLineOrBandAxis.js", [a["Core/Utilities.js"]], function (a) {
        var r = a.erase,
            C = a.extend,
            E = a.isNumber,
            z;
        (function (a) {
            var x = [],
                u;
            a.compose = function (a, g) {
                u || (u = a); - 1 ===
                    x.indexOf(g) && (x.push(g), C(g.prototype, n.prototype));
                return g
            };
            var n = function () {
                function a() {}
                a.prototype.getPlotBandPath = function (a, c, e) {
                    void 0 === e && (e = this.options);
                    var g = this.getPlotLinePath({
                            value: c,
                            force: !0,
                            acrossPanes: e.acrossPanes
                        }),
                        f = [],
                        m = this.horiz;
                    c = !E(this.min) || !E(this.max) || a < this.min && c < this.min || a > this.max && c > this.max;
                    a = this.getPlotLinePath({
                        value: a,
                        force: !0,
                        acrossPanes: e.acrossPanes
                    });
                    e = 1;
                    if (a && g) {
                        if (c) {
                            var q = a.toString() === g.toString();
                            e = 0
                        }
                        for (c = 0; c < a.length; c += 2) {
                            var k = a[c],
                                n = a[c +
                                    1],
                                r = g[c],
                                B = g[c + 1];
                            "M" !== k[0] && "L" !== k[0] || "M" !== n[0] && "L" !== n[0] || "M" !== r[0] && "L" !== r[0] || "M" !== B[0] && "L" !== B[0] || (m && r[1] === k[1] ? (r[1] += e, B[1] += e) : m || r[2] !== k[2] || (r[2] += e, B[2] += e), f.push(["M", k[1], k[2]], ["L", n[1], n[2]], ["L", B[1], B[2]], ["L", r[1], r[2]], ["Z"]));
                            f.isFlat = q
                        }
                    }
                    return f
                };
                a.prototype.addPlotBand = function (a) {
                    return this.addPlotBandOrLine(a, "plotBands")
                };
                a.prototype.addPlotLine = function (a) {
                    return this.addPlotBandOrLine(a, "plotLines")
                };
                a.prototype.addPlotBandOrLine = function (a, c) {
                    var e = this,
                        g = this.userOptions,
                        f = new u(this, a);
                    this.visible && (f = f.render());
                    if (f) {
                        this._addedPlotLB || (this._addedPlotLB = !0, (g.plotLines || []).concat(g.plotBands || []).forEach(function (a) {
                            e.addPlotBandOrLine(a)
                        }));
                        if (c) {
                            var m = g[c] || [];
                            m.push(a);
                            g[c] = m
                        }
                        this.plotLinesAndBands.push(f)
                    }
                    return f
                };
                a.prototype.removePlotBandOrLine = function (a) {
                    var c = this.plotLinesAndBands,
                        e = this.options,
                        g = this.userOptions;
                    if (c) {
                        for (var f = c.length; f--;) c[f].id === a && c[f].destroy();
                        [e.plotLines || [], g.plotLines || [], e.plotBands || [], g.plotBands || []].forEach(function (c) {
                            for (f = c.length; f--;)(c[f] || {}).id === a && r(c, c[f])
                        })
                    }
                };
                a.prototype.removePlotBand = function (a) {
                    this.removePlotBandOrLine(a)
                };
                a.prototype.removePlotLine = function (a) {
                    this.removePlotBandOrLine(a)
                };
                return a
            }()
        })(z || (z = {}));
        return z
    });
    M(a, "Core/Axis/PlotLineOrBand/PlotLineOrBand.js", [a["Core/Color/Palette.js"], a["Core/Axis/PlotLineOrBand/PlotLineOrBandAxis.js"], a["Core/Utilities.js"]], function (a, w, C) {
        var r = C.arrayMax,
            z = C.arrayMin,
            x = C.defined,
            J = C.destroyObjectProperties,
            u = C.erase,
            n =
            C.fireEvent,
            m = C.merge,
            g = C.objectEach,
            c = C.pick;
        C = function () {
            function e(a, c) {
                this.axis = a;
                c && (this.options = c, this.id = c.id)
            }
            e.compose = function (a) {
                return w.compose(e, a)
            };
            e.prototype.render = function () {
                n(this, "render");
                var e = this,
                    f = e.axis,
                    v = f.horiz,
                    q = f.logarithmic,
                    k = e.options,
                    r = k.color,
                    D = c(k.zIndex, 0),
                    B = k.events,
                    u = {},
                    t = f.chart.renderer,
                    h = k.label,
                    d = e.label,
                    b = k.to,
                    p = k.from,
                    G = k.value,
                    y = e.svgElem,
                    L = [],
                    F = x(p) && x(b);
                L = x(G);
                var P = !y,
                    S = {
                        "class": "highcharts-plot-" + (F ? "band " : "line ") + (k.className || "")
                    },
                    Q = F ? "bands" :
                    "lines";
                q && (p = q.log2lin(p), b = q.log2lin(b), G = q.log2lin(G));
                f.chart.styledMode || (L ? (S.stroke = r || a.neutralColor40, S["stroke-width"] = c(k.width, 1), k.dashStyle && (S.dashstyle = k.dashStyle)) : F && (S.fill = r || a.highlightColor10, k.borderWidth && (S.stroke = k.borderColor, S["stroke-width"] = k.borderWidth)));
                u.zIndex = D;
                Q += "-" + D;
                (q = f.plotLinesAndBandsGroups[Q]) || (f.plotLinesAndBandsGroups[Q] = q = t.g("plot-" + Q).attr(u).add());
                P && (e.svgElem = y = t.path().attr(S).add(q));
                if (L) L = f.getPlotLinePath({
                    value: G,
                    lineWidth: y.strokeWidth(),
                    acrossPanes: k.acrossPanes
                });
                else if (F) L = f.getPlotBandPath(p, b, k);
                else return;
                !e.eventsAdded && B && (g(B, function (b, d) {
                    y.on(d, function (b) {
                        B[d].apply(e, [b])
                    })
                }), e.eventsAdded = !0);
                (P || !y.d) && L && L.length ? y.attr({
                    d: L
                }) : y && (L ? (y.show(!0), y.animate({
                    d: L
                })) : y.d && (y.hide(), d && (e.label = d = d.destroy())));
                h && (x(h.text) || x(h.formatter)) && L && L.length && 0 < f.width && 0 < f.height && !L.isFlat ? (h = m({
                    align: v && F && "center",
                    x: v ? !F && 4 : 10,
                    verticalAlign: !v && F && "middle",
                    y: v ? F ? 16 : 10 : F ? 6 : -4,
                    rotation: v && !F && 90
                }, h), this.renderLabel(h, L,
                    F, D)) : d && d.hide();
                return e
            };
            e.prototype.renderLabel = function (a, c, e, g) {
                var f = this.axis,
                    l = f.chart.renderer,
                    q = this.label;
                q || (this.label = q = l.text(this.getLabelText(a), 0, 0, a.useHTML).attr({
                    align: a.textAlign || a.align,
                    rotation: a.rotation,
                    "class": "highcharts-plot-" + (e ? "band" : "line") + "-label " + (a.className || ""),
                    zIndex: g
                }).add(), f.chart.styledMode || q.css(m({
                    textOverflow: "ellipsis"
                }, a.style)));
                g = c.xBounds || [c[0][1], c[1][1], e ? c[2][1] : c[0][1]];
                c = c.yBounds || [c[0][2], c[1][2], e ? c[2][2] : c[0][2]];
                e = z(g);
                l = z(c);
                q.align(a,
                    !1, {
                        x: e,
                        y: l,
                        width: r(g) - e,
                        height: r(c) - l
                    });
                q.alignValue && "left" !== q.alignValue || q.css({
                    width: (90 === q.rotation ? f.height - (q.alignAttr.y - f.top) : f.width - (q.alignAttr.x - f.left)) + "px"
                });
                q.show(!0)
            };
            e.prototype.getLabelText = function (a) {
                return x(a.formatter) ? a.formatter.call(this) : a.text
            };
            e.prototype.destroy = function () {
                u(this.axis.plotLinesAndBands, this);
                delete this.axis;
                J(this)
            };
            return e
        }();
        "";
        "";
        return C
    });
    M(a, "Core/Tooltip.js", [a["Core/FormatUtilities.js"], a["Core/Globals.js"], a["Core/Color/Palette.js"],
        a["Core/Renderer/RendererUtilities.js"], a["Core/Renderer/RendererRegistry.js"], a["Core/Utilities.js"]
    ], function (a, w, C, E, z, x) {
        var r = a.format,
            u = w.doc,
            n = E.distribute,
            m = x.addEvent,
            g = x.clamp,
            c = x.css,
            e = x.defined,
            l = x.discardElement,
            f = x.extend,
            v = x.fireEvent,
            q = x.isArray,
            k = x.isNumber,
            I = x.isString,
            D = x.merge,
            B = x.pick,
            O = x.splat,
            t = x.syncTimeout;
        a = function () {
            function a(a, b) {
                this.container = void 0;
                this.crosshairs = [];
                this.distance = 0;
                this.isHidden = !0;
                this.isSticky = !1;
                this.now = {};
                this.options = {};
                this.outside = !1;
                this.chart =
                    a;
                this.init(a, b)
            }
            a.prototype.applyFilter = function () {
                var a = this.chart;
                a.renderer.definition({
                    tagName: "filter",
                    attributes: {
                        id: "drop-shadow-" + a.index,
                        opacity: .5
                    },
                    children: [{
                        tagName: "feGaussianBlur",
                        attributes: {
                            "in": "SourceAlpha",
                            stdDeviation: 1
                        }
                    }, {
                        tagName: "feOffset",
                        attributes: {
                            dx: 1,
                            dy: 1
                        }
                    }, {
                        tagName: "feComponentTransfer",
                        children: [{
                            tagName: "feFuncA",
                            attributes: {
                                type: "linear",
                                slope: .3
                            }
                        }]
                    }, {
                        tagName: "feMerge",
                        children: [{
                            tagName: "feMergeNode"
                        }, {
                            tagName: "feMergeNode",
                            attributes: {
                                "in": "SourceGraphic"
                            }
                        }]
                    }]
                })
            };
            a.prototype.bodyFormatter = function (a) {
                return a.map(function (b) {
                    var a = b.series.tooltipOptions;
                    return (a[(b.point.formatPrefix || "point") + "Formatter"] || b.point.tooltipFormatter).call(b.point, a[(b.point.formatPrefix || "point") + "Format"] || "")
                })
            };
            a.prototype.cleanSplit = function (a) {
                this.chart.series.forEach(function (b) {
                    var d = b && b.tt;
                    d && (!d.isActive || a ? b.tt = d.destroy() : d.isActive = !1)
                })
            };
            a.prototype.defaultFormatter = function (a) {
                var b = this.points || O(this);
                var d = [a.tooltipFooterHeaderFormatter(b[0])];
                d = d.concat(a.bodyFormatter(b));
                d.push(a.tooltipFooterHeaderFormatter(b[0], !0));
                return d
            };
            a.prototype.destroy = function () {
                this.label && (this.label = this.label.destroy());
                this.split && this.tt && (this.cleanSplit(this.chart, !0), this.tt = this.tt.destroy());
                this.renderer && (this.renderer = this.renderer.destroy(), l(this.container));
                x.clearTimeout(this.hideTimer);
                x.clearTimeout(this.tooltipTimeout)
            };
            a.prototype.getAnchor = function (a, b) {
                var d = this.chart,
                    c = d.pointer,
                    e = d.inverted,
                    h = d.plotTop,
                    f = d.plotLeft,
                    g, k, t = 0,
                    l = 0;
                a = O(a);
                this.followPointer && b ? ("undefined" ===
                    typeof b.chartX && (b = c.normalize(b)), c = [b.chartX - f, b.chartY - h]) : a[0].tooltipPos ? c = a[0].tooltipPos : (a.forEach(function (b) {
                    g = b.series.yAxis;
                    k = b.series.xAxis;
                    t += b.plotX || 0;
                    l += b.plotLow ? (b.plotLow + (b.plotHigh || 0)) / 2 : b.plotY || 0;
                    k && g && (e ? (t += h + d.plotHeight - k.len - k.pos, l += f + d.plotWidth - g.len - g.pos) : (t += k.pos - f, l += g.pos - h))
                }), t /= a.length, l /= a.length, c = [e ? d.plotWidth - l : t, e ? d.plotHeight - t : l], this.shared && 1 < a.length && b && (e ? c[0] = b.chartX - f : c[1] = b.chartY - h));
                return c.map(Math.round)
            };
            a.prototype.getLabel = function () {
                var a =
                    this,
                    b = this.chart.styledMode,
                    h = this.options,
                    f = "tooltip" + (e(h.className) ? " " + h.className : ""),
                    g = h.style.pointerEvents || (!this.followPointer && h.stickOnContact ? "auto" : "none"),
                    k = function () {
                        a.inContact = !0
                    },
                    t = function (b) {
                        var d = a.chart.hoverSeries;
                        a.inContact = a.shouldStickOnContact() && a.chart.pointer.inClass(b.relatedTarget, "highcharts-tooltip");
                        if (!a.inContact && d && d.onMouseOut) d.onMouseOut()
                    },
                    l, q = this.chart.renderer;
                if (!this.label) {
                    if (this.outside) {
                        var n = this.chart.options.chart.style,
                            v = z.getRendererType();
                        this.container = l = w.doc.createElement("div");
                        l.className = "highcharts-tooltip-container";
                        c(l, {
                            position: "absolute",
                            top: "1px",
                            pointerEvents: g,
                            zIndex: Math.max(this.options.style.zIndex || 0, (n && n.zIndex || 0) + 3)
                        });
                        m(l, "mouseenter", k);
                        m(l, "mouseleave", t);
                        w.doc.body.appendChild(l);
                        this.renderer = q = new v(l, 0, 0, n, void 0, void 0, q.styledMode)
                    }
                    this.split ? this.label = q.g(f) : (this.label = q.label("", 0, 0, h.shape, void 0, void 0, h.useHTML, void 0, f).attr({
                        padding: h.padding,
                        r: h.borderRadius
                    }), b || this.label.attr({
                        fill: h.backgroundColor,
                        "stroke-width": h.borderWidth
                    }).css(h.style).css({
                        pointerEvents: g
                    }).shadow(h.shadow));
                    b && h.shadow && (this.applyFilter(), this.label.attr({
                        filter: "url(#drop-shadow-" + this.chart.index + ")"
                    }));
                    if (a.outside && !a.split) {
                        var r = this.label,
                            B = r.xSetter,
                            D = r.ySetter;
                        r.xSetter = function (b) {
                            B.call(r, a.distance);
                            l.style.left = b + "px"
                        };
                        r.ySetter = function (b) {
                            D.call(r, a.distance);
                            l.style.top = b + "px"
                        }
                    }
                    this.label.on("mouseenter", k).on("mouseleave", t).attr({
                        zIndex: 8
                    }).add()
                }
                return this.label
            };
            a.prototype.getPosition = function (a,
                b, c) {
                var d = this.chart,
                    e = this.distance,
                    h = {},
                    f = d.inverted && c.h || 0,
                    g = this.outside,
                    p = g ? u.documentElement.clientWidth - 2 * e : d.chartWidth,
                    k = g ? Math.max(u.body.scrollHeight, u.documentElement.scrollHeight, u.body.offsetHeight, u.documentElement.offsetHeight, u.documentElement.clientHeight) : d.chartHeight,
                    l = d.pointer.getChartPosition(),
                    t = function (h) {
                        var f = "x" === h;
                        return [h, f ? p : k, f ? a : b].concat(g ? [f ? a * l.scaleX : b * l.scaleY, f ? l.left - e + (c.plotX + d.plotLeft) * l.scaleX : l.top - e + (c.plotY + d.plotTop) * l.scaleY, 0, f ? p : k] : [f ? a : b, f ?
                            c.plotX + d.plotLeft : c.plotY + d.plotTop, f ? d.plotLeft : d.plotTop, f ? d.plotLeft + d.plotWidth : d.plotTop + d.plotHeight
                        ])
                    },
                    m = t("y"),
                    q = t("x"),
                    n, v = !this.followPointer && B(c.ttBelow, !d.inverted === !!c.negative),
                    r = function (b, a, d, c, p, k, y) {
                        var t = g ? "y" === b ? e * l.scaleY : e * l.scaleX : e,
                            G = (d - c) / 2,
                            A = c < p - e,
                            m = p + e + c < a,
                            F = p - t - d + G;
                        p = p + t - G;
                        if (v && m) h[b] = p;
                        else if (!v && A) h[b] = F;
                        else if (A) h[b] = Math.min(y - c, 0 > F - f ? F : F - f);
                        else if (m) h[b] = Math.max(k, p + f + d > a ? p : p + f);
                        else return !1
                    },
                    D = function (b, a, d, c, f) {
                        var g;
                        f < e || f > a - e ? g = !1 : h[b] = f < d / 2 ? 1 : f > a - c /
                            2 ? a - c - 2 : f - d / 2;
                        return g
                    },
                    A = function (b) {
                        var a = m;
                        m = q;
                        q = a;
                        n = b
                    },
                    U = function () {
                        !1 !== r.apply(0, m) ? !1 !== D.apply(0, q) || n || (A(!0), U()) : n ? h.x = h.y = 0 : (A(!0), U())
                    };
                (d.inverted || 1 < this.len) && A();
                U();
                return h
            };
            a.prototype.hide = function (a) {
                var b = this;
                x.clearTimeout(this.hideTimer);
                a = B(a, this.options.hideDelay);
                this.isHidden || (this.hideTimer = t(function () {
                    b.getLabel().fadeOut(a ? void 0 : a);
                    b.isHidden = !0
                }, a))
            };
            a.prototype.init = function (a, b) {
                this.chart = a;
                this.options = b;
                this.crosshairs = [];
                this.now = {
                    x: 0,
                    y: 0
                };
                this.isHidden = !0;
                this.split = b.split && !a.inverted && !a.polar;
                this.shared = b.shared || this.split;
                this.outside = B(b.outside, !(!a.scrollablePixelsX && !a.scrollablePixelsY))
            };
            a.prototype.shouldStickOnContact = function () {
                return !(this.followPointer || !this.options.stickOnContact)
            };
            a.prototype.isStickyOnContact = function () {
                return !(!this.shouldStickOnContact() || !this.inContact)
            };
            a.prototype.move = function (a, b, c, e) {
                var d = this,
                    h = d.now,
                    g = !1 !== d.options.animation && !d.isHidden && (1 < Math.abs(a - h.x) || 1 < Math.abs(b - h.y)),
                    p = d.followPointer ||
                    1 < d.len;
                f(h, {
                    x: g ? (2 * h.x + a) / 3 : a,
                    y: g ? (h.y + b) / 2 : b,
                    anchorX: p ? void 0 : g ? (2 * h.anchorX + c) / 3 : c,
                    anchorY: p ? void 0 : g ? (h.anchorY + e) / 2 : e
                });
                d.getLabel().attr(h);
                d.drawTracker();
                g && (x.clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function () {
                    d && d.move(a, b, c, e)
                }, 32))
            };
            a.prototype.refresh = function (a, b) {
                var d = this.chart,
                    c = this.options,
                    e = O(a),
                    h = e[0],
                    f = [],
                    g = c.formatter || this.defaultFormatter,
                    k = this.shared,
                    l = d.styledMode,
                    t = {};
                if (c.enabled) {
                    x.clearTimeout(this.hideTimer);
                    this.followPointer = !this.split &&
                        h.series.tooltipOptions.followPointer;
                    var m = this.getAnchor(a, b),
                        n = m[0],
                        r = m[1];
                    !k || !q(a) && a.series && a.series.noSharedTooltip ? t = h.getLabelConfig() : (d.pointer.applyInactiveState(e), e.forEach(function (b) {
                        b.setState("hover");
                        f.push(b.getLabelConfig())
                    }), t = {
                        x: h.category,
                        y: h.y
                    }, t.points = f);
                    this.len = f.length;
                    a = g.call(t, this);
                    g = h.series;
                    this.distance = B(g.tooltipOptions.distance, 16);
                    if (!1 === a) this.hide();
                    else {
                        if (this.split) this.renderSplit(a, e);
                        else if (e = n, k = r, b && d.pointer.isDirectTouch && (e = b.chartX - d.plotLeft,
                                k = b.chartY - d.plotTop), d.polar || !1 === g.options.clip || g.shouldShowTooltip(e, k)) b = this.getLabel(), c.style.width && !l || b.css({
                            width: this.chart.spacingBox.width + "px"
                        }), b.attr({
                            text: a && a.join ? a.join("") : a
                        }), b.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-" + B(h.colorIndex, g.colorIndex)), l || b.attr({
                            stroke: c.borderColor || h.color || g.color || C.neutralColor60
                        }), this.updatePosition({
                            plotX: n,
                            plotY: r,
                            negative: h.negative,
                            ttBelow: h.ttBelow,
                            h: m[2] || 0
                        });
                        else {
                            this.hide();
                            return
                        }
                        this.isHidden && this.label &&
                            this.label.attr({
                                opacity: 1
                            }).show();
                        this.isHidden = !1
                    }
                    v(this, "refresh")
                }
            };
            a.prototype.renderSplit = function (a, b) {
                function d(b, a, d, e, h) {
                    void 0 === h && (h = !0);
                    d ? (a = Y ? 0 : J, b = g(b - e / 2, N.left, N.right - e - (c.outside ? T : 0))) : (a -= da, b = h ? b - e - z : b + z, b = g(b, h ? b : N.left, N.right));
                    return {
                        x: b,
                        y: a
                    }
                }
                var c = this,
                    e = c.chart,
                    h = c.chart,
                    k = h.chartWidth,
                    l = h.chartHeight,
                    t = h.plotHeight,
                    m = h.plotLeft,
                    q = h.plotTop,
                    r = h.pointer,
                    v = h.scrollablePixelsY;
                v = void 0 === v ? 0 : v;
                var D = h.scrollablePixelsX,
                    x = h.scrollingContainer;
                x = void 0 === x ? {
                    scrollLeft: 0,
                    scrollTop: 0
                } : x;
                var w = x.scrollLeft;
                x = x.scrollTop;
                var O = h.styledMode,
                    z = c.distance,
                    A = c.options,
                    U = c.options.positioner,
                    N = c.outside && "number" !== typeof D ? u.documentElement.getBoundingClientRect() : {
                        left: w,
                        right: w + k,
                        top: x,
                        bottom: x + l
                    },
                    W = c.getLabel(),
                    X = this.renderer || e.renderer,
                    Y = !(!e.xAxis[0] || !e.xAxis[0].opposite);
                e = r.getChartPosition();
                var T = e.left;
                e = e.top;
                var da = q + x,
                    E = 0,
                    J = t - v;
                I(a) && (a = [!1, a]);
                a = a.slice(0, b.length + 1).reduce(function (a, e, h) {
                    if (!1 !== e && "" !== e) {
                        h = b[h - 1] || {
                            isHeader: !0,
                            plotX: b[0].plotX,
                            plotY: t,
                            series: {}
                        };
                        var f = h.isHeader,
                            p = f ? c : h.series;
                        e = e.toString();
                        var k = p.tt,
                            l = h.isHeader;
                        var y = h.series;
                        var G = "highcharts-color-" + B(h.colorIndex, y.colorIndex, "none");
                        k || (k = {
                            padding: A.padding,
                            r: A.borderRadius
                        }, O || (k.fill = A.backgroundColor, k["stroke-width"] = A.borderWidth), k = X.label("", 0, 0, A[l ? "headerShape" : "shape"], void 0, void 0, A.useHTML).addClass((l ? "highcharts-tooltip-header " : "") + "highcharts-tooltip-box " + G).attr(k).add(W));
                        k.isActive = !0;
                        k.attr({
                            text: e
                        });
                        O || k.css(A.style).shadow(A.shadow).attr({
                            stroke: A.borderColor ||
                                h.color || y.color || C.neutralColor80
                        });
                        p = p.tt = k;
                        l = p.getBBox();
                        e = l.width + p.strokeWidth();
                        f && (E = l.height, J += E, Y && (da -= E));
                        y = h.plotX;
                        y = void 0 === y ? 0 : y;
                        G = h.plotY;
                        G = void 0 === G ? 0 : G;
                        k = h.series;
                        if (h.isHeader) {
                            y = m + y;
                            var F = q + t / 2
                        } else {
                            var n = k.xAxis,
                                ca = k.yAxis;
                            y = n.pos + g(y, -z, n.len + z);
                            k.shouldShowTooltip(0, ca.pos - q + G, {
                                ignoreX: !0
                            }) && (F = ca.pos + G)
                        }
                        y = g(y, N.left - z, N.right + z);
                        "number" === typeof F ? (l = l.height + 1, G = U ? U.call(c, e, l, h) : d(y, F, f, e), a.push({
                            align: U ? 0 : void 0,
                            anchorX: y,
                            anchorY: F,
                            boxWidth: e,
                            point: h,
                            rank: B(G.rank, f ?
                                1 : 0),
                            size: l,
                            target: G.y,
                            tt: p,
                            x: G.x
                        })) : p.isActive = !1
                    }
                    return a
                }, []);
                !U && a.some(function (b) {
                    var a = (c.outside ? T : 0) + b.anchorX;
                    return a < N.left && a + b.boxWidth < N.right ? !0 : a < T - N.left + b.boxWidth && N.right - a > a
                }) && (a = a.map(function (b) {
                    var a = d(b.anchorX, b.anchorY, b.point.isHeader, b.boxWidth, !1);
                    return f(b, {
                        target: a.y,
                        x: a.x
                    })
                }));
                c.cleanSplit();
                n(a, J);
                var ba = T,
                    ea = T;
                a.forEach(function (b) {
                    var a = b.x,
                        d = b.boxWidth;
                    b = b.isHeader;
                    b || (c.outside && T + a < ba && (ba = T + a), !b && c.outside && ba + d > ea && (ea = T + a))
                });
                a.forEach(function (b) {
                    var a =
                        b.x,
                        d = b.anchorX,
                        e = b.pos,
                        h = b.point.isHeader;
                    e = {
                        visibility: "undefined" === typeof e ? "hidden" : "inherit",
                        x: a,
                        y: e + da,
                        anchorX: d,
                        anchorY: b.anchorY
                    };
                    if (c.outside && a < d) {
                        var f = T - ba;
                        0 < f && (h || (e.x = a + f, e.anchorX = d + f), h && (e.x = (ea - ba) / 2, e.anchorX = d + f))
                    }
                    b.tt.attr(e)
                });
                a = c.container;
                v = c.renderer;
                c.outside && a && v && (h = W.getBBox(), v.setSize(h.width + h.x, h.height + h.y, !1), a.style.left = ba + "px", a.style.top = e + "px")
            };
            a.prototype.drawTracker = function () {
                if (this.followPointer || !this.options.stickOnContact) this.tracker && this.tracker.destroy();
                else {
                    var a = this.chart,
                        b = this.label,
                        c = this.shared ? a.hoverPoints : a.hoverPoint;
                    if (b && c) {
                        var e = {
                            x: 0,
                            y: 0,
                            width: 0,
                            height: 0
                        };
                        c = this.getAnchor(c);
                        var h = b.getBBox();
                        c[0] += a.plotLeft - b.translateX;
                        c[1] += a.plotTop - b.translateY;
                        e.x = Math.min(0, c[0]);
                        e.y = Math.min(0, c[1]);
                        e.width = 0 > c[0] ? Math.max(Math.abs(c[0]), h.width - c[0]) : Math.max(Math.abs(c[0]), h.width);
                        e.height = 0 > c[1] ? Math.max(Math.abs(c[1]), h.height - Math.abs(c[1])) : Math.max(Math.abs(c[1]), h.height);
                        this.tracker ? this.tracker.attr(e) : (this.tracker = b.renderer.rect(e).addClass("highcharts-tracker").add(b),
                            a.styledMode || this.tracker.attr({
                                fill: "rgba(0,0,0,0)"
                            }))
                    }
                }
            };
            a.prototype.styledModeFormat = function (a) {
                return a.replace('style="font-size: 10px"', 'class="highcharts-header"').replace(/style="color:{(point|series)\.color}"/g, 'class="highcharts-color-{$1.colorIndex}"')
            };
            a.prototype.tooltipFooterHeaderFormatter = function (a, b) {
                var d = a.series,
                    c = d.tooltipOptions,
                    e = d.xAxis,
                    h = e && e.dateTime;
                e = {
                    isFooter: b,
                    labelConfig: a
                };
                var f = c.xDateFormat,
                    g = c[b ? "footerFormat" : "headerFormat"];
                v(this, "headerFormatter", e, function (b) {
                    h &&
                        !f && k(a.key) && (f = h.getXDateFormat(a.key, c.dateTimeLabelFormats));
                    h && f && (a.point && a.point.tooltipDateKeys || ["key"]).forEach(function (b) {
                        g = g.replace("{point." + b + "}", "{point." + b + ":" + f + "}")
                    });
                    d.chart.styledMode && (g = this.styledModeFormat(g));
                    b.text = r(g, {
                        point: a,
                        series: d
                    }, this.chart)
                });
                return e.text
            };
            a.prototype.update = function (a) {
                this.destroy();
                D(!0, this.chart.options.tooltip.userOptions, a);
                this.init(this.chart, D(!0, this.options, a))
            };
            a.prototype.updatePosition = function (a) {
                var b = this.chart,
                    d = this.options,
                    e = b.pointer,
                    h = this.getLabel();
                e = e.getChartPosition();
                var f = (d.positioner || this.getPosition).call(this, h.width, h.height, a),
                    g = a.plotX + b.plotLeft;
                a = a.plotY + b.plotTop;
                if (this.outside) {
                    d = d.borderWidth + 2 * this.distance;
                    this.renderer.setSize(h.width + d, h.height + d, !1);
                    if (1 !== e.scaleX || 1 !== e.scaleY) c(this.container, {
                        transform: "scale(" + e.scaleX + ", " + e.scaleY + ")"
                    }), g *= e.scaleX, a *= e.scaleY;
                    g += e.left - f.x;
                    a += e.top - f.y
                }
                this.move(Math.round(f.x), Math.round(f.y || 0), g, a)
            };
            return a
        }();
        "";
        return a
    });
    M(a, "Core/Series/Point.js",
        [a["Core/Renderer/HTML/AST.js"], a["Core/Animation/AnimationUtilities.js"], a["Core/DefaultOptions.js"], a["Core/FormatUtilities.js"], a["Core/Utilities.js"]],
        function (a, w, C, E, z) {
            var r = w.animObject,
                J = C.defaultOptions,
                u = E.format,
                n = z.addEvent,
                m = z.defined,
                g = z.erase,
                c = z.extend,
                e = z.fireEvent,
                l = z.getNestedProperty,
                f = z.isArray,
                v = z.isFunction,
                q = z.isNumber,
                k = z.isObject,
                I = z.merge,
                D = z.objectEach,
                B = z.pick,
                O = z.syncTimeout,
                t = z.removeEvent,
                h = z.uniqueKey;
            w = function () {
                function d() {
                    this.colorIndex = this.category = void 0;
                    this.formatPrefix = "point";
                    this.id = void 0;
                    this.isNull = !1;
                    this.percentage = this.options = this.name = void 0;
                    this.selected = !1;
                    this.total = this.series = void 0;
                    this.visible = !0;
                    this.x = void 0
                }
                d.prototype.animateBeforeDestroy = function () {
                    var b = this,
                        a = {
                            x: b.startXPos,
                            opacity: 0
                        },
                        d = b.getGraphicalProps();
                    d.singular.forEach(function (d) {
                        b[d] = b[d].animate("dataLabel" === d ? {
                            x: b[d].startXPos,
                            y: b[d].startYPos,
                            opacity: 0
                        } : a)
                    });
                    d.plural.forEach(function (a) {
                        b[a].forEach(function (a) {
                            a.element && a.animate(c({
                                x: b.startXPos
                            }, a.startYPos ? {
                                x: a.startXPos,
                                y: a.startYPos
                            } : {}))
                        })
                    })
                };
                d.prototype.applyOptions = function (b, a) {
                    var e = this.series,
                        h = e.options.pointValKey || e.pointValKey;
                    b = d.prototype.optionsToObject.call(this, b);
                    c(this, b);
                    this.options = this.options ? c(this.options, b) : b;
                    b.group && delete this.group;
                    b.dataLabels && delete this.dataLabels;
                    h && (this.y = d.prototype.getNestedProperty.call(this, h));
                    this.formatPrefix = (this.isNull = B(this.isValid && !this.isValid(), null === this.x || !q(this.y))) ? "null" : "point";
                    this.selected && (this.state = "select");
                    "name" in
                    this && "undefined" === typeof a && e.xAxis && e.xAxis.hasNames && (this.x = e.xAxis.nameToX(this));
                    "undefined" === typeof this.x && e ? this.x = "undefined" === typeof a ? e.autoIncrement() : a : q(b.x) && e.options.relativeXValue && (this.x = e.autoIncrement(b.x));
                    return this
                };
                d.prototype.destroy = function () {
                    function b() {
                        if (a.graphic || a.dataLabel || a.dataLabels) t(a), a.destroyElements();
                        for (f in a) a[f] = null
                    }
                    var a = this,
                        d = a.series,
                        c = d.chart;
                    d = d.options.dataSorting;
                    var e = c.hoverPoints,
                        h = r(a.series.chart.renderer.globalAnimation),
                        f;
                    a.legendItem &&
                        c.legend.destroyItem(a);
                    e && (a.setState(), g(e, a), e.length || (c.hoverPoints = null));
                    if (a === c.hoverPoint) a.onMouseOut();
                    d && d.enabled ? (this.animateBeforeDestroy(), O(b, h.duration)) : b();
                    c.pointCount--
                };
                d.prototype.destroyElements = function (b) {
                    var a = this;
                    b = a.getGraphicalProps(b);
                    b.singular.forEach(function (b) {
                        a[b] = a[b].destroy()
                    });
                    b.plural.forEach(function (b) {
                        a[b].forEach(function (b) {
                            b.element && b.destroy()
                        });
                        delete a[b]
                    })
                };
                d.prototype.firePointEvent = function (b, a, d) {
                    var c = this,
                        h = this.series.options;
                    (h.point.events[b] ||
                        c.options && c.options.events && c.options.events[b]) && c.importEvents();
                    "click" === b && h.allowPointSelect && (d = function (b) {
                        c.select && c.select(null, b.ctrlKey || b.metaKey || b.shiftKey)
                    });
                    e(c, b, a, d)
                };
                d.prototype.getClassName = function () {
                    return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" : "") + ("undefined" !== typeof this.colorIndex ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className :
                        "") + (this.zone && this.zone.className ? " " + this.zone.className.replace("highcharts-negative", "") : "")
                };
                d.prototype.getGraphicalProps = function (b) {
                    var a = this,
                        d = [],
                        c = {
                            singular: [],
                            plural: []
                        },
                        e;
                    b = b || {
                        graphic: 1,
                        dataLabel: 1
                    };
                    b.graphic && d.push("graphic", "upperGraphic", "shadowGroup");
                    b.dataLabel && d.push("dataLabel", "dataLabelUpper", "connector");
                    for (e = d.length; e--;) {
                        var h = d[e];
                        a[h] && c.singular.push(h)
                    } ["dataLabel", "connector"].forEach(function (d) {
                        var e = d + "s";
                        b[d] && a[e] && c.plural.push(e)
                    });
                    return c
                };
                d.prototype.getLabelConfig =
                    function () {
                        return {
                            x: this.category,
                            y: this.y,
                            color: this.color,
                            colorIndex: this.colorIndex,
                            key: this.name || this.category,
                            series: this.series,
                            point: this,
                            percentage: this.percentage,
                            total: this.total || this.stackTotal
                        }
                    };
                d.prototype.getNestedProperty = function (b) {
                    if (b) return 0 === b.indexOf("custom.") ? l(b, this.options) : this[b]
                };
                d.prototype.getZone = function () {
                    var b = this.series,
                        a = b.zones;
                    b = b.zoneAxis || "y";
                    var d, c = 0;
                    for (d = a[c]; this[b] >= d.value;) d = a[++c];
                    this.nonZonedColor || (this.nonZonedColor = this.color);
                    this.color =
                        d && d.color && !this.options.color ? d.color : this.nonZonedColor;
                    return d
                };
                d.prototype.hasNewShapeType = function () {
                    return (this.graphic && (this.graphic.symbolName || this.graphic.element.nodeName)) !== this.shapeType
                };
                d.prototype.init = function (b, a, d) {
                    this.series = b;
                    this.applyOptions(a, d);
                    this.id = m(this.id) ? this.id : h();
                    this.resolveColor();
                    b.chart.pointCount++;
                    e(this, "afterInit");
                    return this
                };
                d.prototype.optionsToObject = function (b) {
                    var a = this.series,
                        c = a.options.keys,
                        e = c || a.pointArrayMap || ["y"],
                        h = e.length,
                        g = {},
                        k =
                        0,
                        l = 0;
                    if (q(b) || null === b) g[e[0]] = b;
                    else if (f(b))
                        for (!c && b.length > h && (a = typeof b[0], "string" === a ? g.name = b[0] : "number" === a && (g.x = b[0]), k++); l < h;) c && "undefined" === typeof b[k] || (0 < e[l].indexOf(".") ? d.prototype.setNestedProperty(g, b[k], e[l]) : g[e[l]] = b[k]), k++, l++;
                    else "object" === typeof b && (g = b, b.dataLabels && (a._hasPointLabels = !0), b.marker && (a._hasPointMarkers = !0));
                    return g
                };
                d.prototype.resolveColor = function () {
                    var b = this.series,
                        a = b.chart.styledMode;
                    var d = b.chart.options.chart.colorCount;
                    delete this.nonZonedColor;
                    if (b.options.colorByPoint) {
                        if (!a) {
                            d = b.options.colors || b.chart.options.colors;
                            var c = d[b.colorCounter];
                            d = d.length
                        }
                        a = b.colorCounter;
                        b.colorCounter++;
                        b.colorCounter === d && (b.colorCounter = 0)
                    } else a || (c = b.color), a = b.colorIndex;
                    this.colorIndex = B(this.options.colorIndex, a);
                    this.color = B(this.options.color, c)
                };
                d.prototype.setNestedProperty = function (b, a, d) {
                    d.split(".").reduce(function (b, d, c, e) {
                        b[d] = e.length - 1 === c ? a : k(b[d], !0) ? b[d] : {};
                        return b[d]
                    }, b);
                    return b
                };
                d.prototype.tooltipFormatter = function (b) {
                    var a = this.series,
                        d = a.tooltipOptions,
                        c = B(d.valueDecimals, ""),
                        e = d.valuePrefix || "",
                        h = d.valueSuffix || "";
                    a.chart.styledMode && (b = a.chart.tooltip.styledModeFormat(b));
                    (a.pointArrayMap || ["y"]).forEach(function (a) {
                        a = "{point." + a;
                        if (e || h) b = b.replace(RegExp(a + "}", "g"), e + a + "}" + h);
                        b = b.replace(RegExp(a + "}", "g"), a + ":,." + c + "f}")
                    });
                    return u(b, {
                        point: this,
                        series: this.series
                    }, a.chart)
                };
                d.prototype.update = function (b, a, d, c) {
                    function e() {
                        h.applyOptions(b);
                        var c = g && h.hasDummyGraphic;
                        c = null === h.y ? !c : c;
                        g && c && (h.graphic = g.destroy(), delete h.hasDummyGraphic);
                        k(b, !0) && (g && g.element && b && b.marker && "undefined" !== typeof b.marker.symbol && (h.graphic = g.destroy()), b && b.dataLabels && h.dataLabel && (h.dataLabel = h.dataLabel.destroy()), h.connector && (h.connector = h.connector.destroy()));
                        t = h.index;
                        f.updateParallelArrays(h, t);
                        l.data[t] = k(l.data[t], !0) || k(b, !0) ? h.options : B(b, l.data[t]);
                        f.isDirty = f.isDirtyData = !0;
                        !f.fixedBox && f.hasCartesianSeries && (p.isDirtyBox = !0);
                        "point" === l.legendType && (p.isDirtyLegend = !0);
                        a && p.redraw(d)
                    }
                    var h = this,
                        f = h.series,
                        g = h.graphic,
                        p = f.chart,
                        l = f.options,
                        t;
                    a = B(a, !0);
                    !1 === c ? e() : h.firePointEvent("update", {
                        options: b
                    }, e)
                };
                d.prototype.remove = function (b, a) {
                    this.series.removePoint(this.series.data.indexOf(this), b, a)
                };
                d.prototype.select = function (b, a) {
                    var d = this,
                        c = d.series,
                        e = c.chart;
                    this.selectedStaging = b = B(b, !d.selected);
                    d.firePointEvent(b ? "select" : "unselect", {
                        accumulate: a
                    }, function () {
                        d.selected = d.options.selected = b;
                        c.options.data[c.data.indexOf(d)] = d.options;
                        d.setState(b && "select");
                        a || e.getSelectedPoints().forEach(function (b) {
                            var a = b.series;
                            b.selected &&
                                b !== d && (b.selected = b.options.selected = !1, a.options.data[a.data.indexOf(b)] = b.options, b.setState(e.hoverPoints && a.options.inactiveOtherPoints ? "inactive" : ""), b.firePointEvent("unselect"))
                        })
                    });
                    delete this.selectedStaging
                };
                d.prototype.onMouseOver = function (b) {
                    var a = this.series.chart,
                        d = a.pointer;
                    b = b ? d.normalize(b) : d.getChartCoordinatesFromPoint(this, a.inverted);
                    d.runPointActions(b, this)
                };
                d.prototype.onMouseOut = function () {
                    var b = this.series.chart;
                    this.firePointEvent("mouseOut");
                    this.series.options.inactiveOtherPoints ||
                        (b.hoverPoints || []).forEach(function (b) {
                            b.setState()
                        });
                    b.hoverPoints = b.hoverPoint = null
                };
                d.prototype.importEvents = function () {
                    if (!this.hasImportedEvents) {
                        var b = this,
                            a = I(b.series.options.point, b.options).events;
                        b.events = a;
                        D(a, function (a, d) {
                            v(a) && n(b, d, a)
                        });
                        this.hasImportedEvents = !0
                    }
                };
                d.prototype.setState = function (b, d) {
                    var h = this.series,
                        f = this.state,
                        g = h.options.states[b || "normal"] || {},
                        k = J.plotOptions[h.type].marker && h.options.marker,
                        p = k && !1 === k.enabled,
                        l = k && k.states && k.states[b || "normal"] || {},
                        t = !1 ===
                        l.enabled,
                        m = this.marker || {},
                        n = h.chart,
                        v = k && h.markerAttribs,
                        r = h.halo,
                        D, I = h.stateMarkerGraphic;
                    b = b || "";
                    if (!(b === this.state && !d || this.selected && "select" !== b || !1 === g.enabled || b && (t || p && !1 === l.enabled) || b && m.states && m.states[b] && !1 === m.states[b].enabled)) {
                        this.state = b;
                        v && (D = h.markerAttribs(this, b));
                        if (this.graphic && !this.hasDummyGraphic) {
                            f && this.graphic.removeClass("highcharts-point-" + f);
                            b && this.graphic.addClass("highcharts-point-" + b);
                            if (!n.styledMode) {
                                var u = h.pointAttribs(this, b);
                                var x = B(n.options.chart.animation,
                                    g.animation);
                                h.options.inactiveOtherPoints && q(u.opacity) && ((this.dataLabels || []).forEach(function (b) {
                                    b && b.animate({
                                        opacity: u.opacity
                                    }, x)
                                }), this.connector && this.connector.animate({
                                    opacity: u.opacity
                                }, x));
                                this.graphic.animate(u, x)
                            }
                            D && this.graphic.animate(D, B(n.options.chart.animation, l.animation, k.animation));
                            I && I.hide()
                        } else {
                            if (b && l) {
                                f = m.symbol || h.symbol;
                                I && I.currentSymbol !== f && (I = I.destroy());
                                if (D)
                                    if (I) I[d ? "animate" : "attr"]({
                                        x: D.x,
                                        y: D.y
                                    });
                                    else f && (h.stateMarkerGraphic = I = n.renderer.symbol(f, D.x, D.y,
                                        D.width, D.height).add(h.markerGroup), I.currentSymbol = f);
                                !n.styledMode && I && I.attr(h.pointAttribs(this, b))
                            }
                            I && (I[b && this.isInside ? "show" : "hide"](), I.element.point = this, I.addClass(this.getClassName(), !0))
                        }
                        g = g.halo;
                        D = (I = this.graphic || I) && I.visibility || "inherit";
                        g && g.size && I && "hidden" !== D && !this.isCluster ? (r || (h.halo = r = n.renderer.path().add(I.parentGroup)), r.show()[d ? "animate" : "attr"]({
                            d: this.haloPath(g.size)
                        }), r.attr({
                            "class": "highcharts-halo highcharts-color-" + B(this.colorIndex, h.colorIndex) + (this.className ?
                                " " + this.className : ""),
                            visibility: D,
                            zIndex: -1
                        }), r.point = this, n.styledMode || r.attr(c({
                            fill: this.color || h.color,
                            "fill-opacity": g.opacity
                        }, a.filterUserAttributes(g.attributes || {})))) : r && r.point && r.point.haloPath && r.animate({
                            d: r.point.haloPath(0)
                        }, null, r.hide);
                        e(this, "afterSetState", {
                            state: b
                        })
                    }
                };
                d.prototype.haloPath = function (b) {
                    return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX) - b, this.plotY - b, 2 * b, 2 * b)
                };
                return d
            }();
            "";
            return w
        });
    M(a, "Core/Pointer.js", [a["Core/Color/Color.js"], a["Core/Globals.js"],
        a["Core/Color/Palette.js"], a["Core/Tooltip.js"], a["Core/Utilities.js"]
    ], function (a, w, C, E, z) {
        var r = a.parse,
            J = w.charts,
            u = w.noop,
            n = z.addEvent,
            m = z.attr,
            g = z.css,
            c = z.defined,
            e = z.extend,
            l = z.find,
            f = z.fireEvent,
            v = z.isNumber,
            q = z.isObject,
            k = z.objectEach,
            I = z.offset,
            D = z.pick,
            B = z.splat;
        a = function () {
            function a(a, c) {
                this.lastValidTouch = {};
                this.pinchDown = [];
                this.runChartClick = !1;
                this.eventsToUnbind = [];
                this.chart = a;
                this.hasDragged = !1;
                this.options = c;
                this.init(a, c)
            }
            a.prototype.applyInactiveState = function (a) {
                var c = [],
                    d;
                (a || []).forEach(function (b) {
                    d = b.series;
                    c.push(d);
                    d.linkedParent && c.push(d.linkedParent);
                    d.linkedSeries && (c = c.concat(d.linkedSeries));
                    d.navigatorSeries && c.push(d.navigatorSeries)
                });
                this.chart.series.forEach(function (b) {
                    -1 === c.indexOf(b) ? b.setState("inactive", !0) : b.options.inactiveOtherPoints && b.setAllPointsToState("inactive")
                })
            };
            a.prototype.destroy = function () {
                var c = this;
                this.eventsToUnbind.forEach(function (a) {
                    return a()
                });
                this.eventsToUnbind = [];
                w.chartCount || (a.unbindDocumentMouseUp && (a.unbindDocumentMouseUp =
                    a.unbindDocumentMouseUp()), a.unbindDocumentTouchEnd && (a.unbindDocumentTouchEnd = a.unbindDocumentTouchEnd()));
                clearInterval(c.tooltipTimeout);
                k(c, function (a, d) {
                    c[d] = void 0
                })
            };
            a.prototype.drag = function (a) {
                var c = this.chart,
                    d = c.options.chart,
                    b = this.zoomHor,
                    e = this.zoomVert,
                    f = c.plotLeft,
                    g = c.plotTop,
                    k = c.plotWidth,
                    l = c.plotHeight,
                    t = this.mouseDownX || 0,
                    m = this.mouseDownY || 0,
                    n = q(d.panning) ? d.panning && d.panning.enabled : d.panning,
                    v = d.panKey && a[d.panKey + "Key"],
                    B = a.chartX,
                    D = a.chartY,
                    I = this.selectionMarker;
                if (!I || !I.touch)
                    if (B <
                        f ? B = f : B > f + k && (B = f + k), D < g ? D = g : D > g + l && (D = g + l), this.hasDragged = Math.sqrt(Math.pow(t - B, 2) + Math.pow(m - D, 2)), 10 < this.hasDragged) {
                        var u = c.isInsidePlot(t - f, m - g, {
                            visiblePlotOnly: !0
                        });
                        c.hasCartesianSeries && (this.zoomX || this.zoomY) && u && !v && !I && (this.selectionMarker = I = c.renderer.rect(f, g, b ? 1 : k, e ? 1 : l, 0).attr({
                            "class": "highcharts-selection-marker",
                            zIndex: 7
                        }).add(), c.styledMode || I.attr({
                            fill: d.selectionMarkerFill || r(C.highlightColor80).setOpacity(.25).get()
                        }));
                        I && b && (b = B - t, I.attr({
                            width: Math.abs(b),
                            x: (0 < b ? 0 : b) +
                                t
                        }));
                        I && e && (b = D - m, I.attr({
                            height: Math.abs(b),
                            y: (0 < b ? 0 : b) + m
                        }));
                        u && !I && n && c.pan(a, d.panning)
                    }
            };
            a.prototype.dragStart = function (a) {
                var c = this.chart;
                c.mouseIsDown = a.type;
                c.cancelClick = !1;
                c.mouseDownX = this.mouseDownX = a.chartX;
                c.mouseDownY = this.mouseDownY = a.chartY
            };
            a.prototype.drop = function (a) {
                var h = this,
                    d = this.chart,
                    b = this.hasPinched;
                if (this.selectionMarker) {
                    var k = {
                            originalEvent: a,
                            xAxis: [],
                            yAxis: []
                        },
                        l = this.selectionMarker,
                        t = l.attr ? l.attr("x") : l.x,
                        m = l.attr ? l.attr("y") : l.y,
                        q = l.attr ? l.attr("width") : l.width,
                        n = l.attr ? l.attr("height") : l.height,
                        r;
                    if (this.hasDragged || b) d.axes.forEach(function (d) {
                        if (d.zoomEnabled && c(d.min) && (b || h[{
                                xAxis: "zoomX",
                                yAxis: "zoomY"
                            } [d.coll]]) && v(t) && v(m)) {
                            var e = d.horiz,
                                f = "touchend" === a.type ? d.minPixelPadding : 0,
                                g = d.toValue((e ? t : m) + f);
                            e = d.toValue((e ? t + q : m + n) - f);
                            k[d.coll].push({
                                axis: d,
                                min: Math.min(g, e),
                                max: Math.max(g, e)
                            });
                            r = !0
                        }
                    }), r && f(d, "selection", k, function (a) {
                        d.zoom(e(a, b ? {
                            animation: !1
                        } : null))
                    });
                    v(d.index) && (this.selectionMarker = this.selectionMarker.destroy());
                    b && this.scaleGroups()
                }
                d &&
                    v(d.index) && (g(d.container, {
                        cursor: d._cursor
                    }), d.cancelClick = 10 < this.hasDragged, d.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = [])
            };
            a.prototype.findNearestKDPoint = function (a, c, d) {
                var b = this.chart,
                    e = b.hoverPoint;
                b = b.tooltip;
                if (e && b && b.isStickyOnContact()) return e;
                var h;
                a.forEach(function (b) {
                    var a = !(b.noSharedTooltip && c) && 0 > b.options.findNearestPointBy.indexOf("y");
                    b = b.searchPoint(d, a);
                    if ((a = q(b, !0) && b.series) && !(a = !q(h, !0))) {
                        a = h.distX - b.distX;
                        var e = h.dist - b.dist,
                            f = (b.series.group &&
                                b.series.group.zIndex) - (h.series.group && h.series.group.zIndex);
                        a = 0 < (0 !== a && c ? a : 0 !== e ? e : 0 !== f ? f : h.series.index > b.series.index ? -1 : 1)
                    }
                    a && (h = b)
                });
                return h
            };
            a.prototype.getChartCoordinatesFromPoint = function (a, c) {
                var d = a.series,
                    b = d.xAxis;
                d = d.yAxis;
                var e = a.shapeArgs;
                if (b && d) {
                    var h = D(a.clientX, a.plotX),
                        f = a.plotY || 0;
                    a.isNode && e && v(e.x) && v(e.y) && (h = e.x, f = e.y);
                    return c ? {
                        chartX: d.len + d.pos - f,
                        chartY: b.len + b.pos - h
                    } : {
                        chartX: h + b.pos,
                        chartY: f + d.pos
                    }
                }
                if (e && e.x && e.y) return {
                    chartX: e.x,
                    chartY: e.y
                }
            };
            a.prototype.getChartPosition =
                function () {
                    if (this.chartPosition) return this.chartPosition;
                    var a = this.chart.container,
                        c = I(a);
                    this.chartPosition = {
                        left: c.left,
                        top: c.top,
                        scaleX: 1,
                        scaleY: 1
                    };
                    var d = a.offsetWidth;
                    a = a.offsetHeight;
                    2 < d && 2 < a && (this.chartPosition.scaleX = c.width / d, this.chartPosition.scaleY = c.height / a);
                    return this.chartPosition
                };
            a.prototype.getCoordinates = function (a) {
                var c = {
                    xAxis: [],
                    yAxis: []
                };
                this.chart.axes.forEach(function (d) {
                    c[d.isXAxis ? "xAxis" : "yAxis"].push({
                        axis: d,
                        value: d.toValue(a[d.horiz ? "chartX" : "chartY"])
                    })
                });
                return c
            };
            a.prototype.getHoverData = function (a, c, d, b, e, g) {
                var h = [];
                b = !(!b || !a);
                var k = {
                    chartX: g ? g.chartX : void 0,
                    chartY: g ? g.chartY : void 0,
                    shared: e
                };
                f(this, "beforeGetHoverData", k);
                var p = c && !c.stickyTracking ? [c] : d.filter(function (b) {
                    return k.filter ? k.filter(b) : b.visible && !(!e && b.directTouch) && D(b.options.enableMouseTracking, !0) && b.stickyTracking
                });
                var t = b || !g ? a : this.findNearestKDPoint(p, e, g);
                c = t && t.series;
                t && (e && !c.noSharedTooltip ? (p = d.filter(function (b) {
                    return k.filter ? k.filter(b) : b.visible && !(!e && b.directTouch) &&
                        D(b.options.enableMouseTracking, !0) && !b.noSharedTooltip
                }), p.forEach(function (b) {
                    var a = l(b.points, function (b) {
                        return b.x === t.x && !b.isNull
                    });
                    q(a) && (b.chart.isBoosting && (a = b.getPoint(a)), h.push(a))
                })) : h.push(t));
                k = {
                    hoverPoint: t
                };
                f(this, "afterGetHoverData", k);
                return {
                    hoverPoint: k.hoverPoint,
                    hoverSeries: c,
                    hoverPoints: h
                }
            };
            a.prototype.getPointFromEvent = function (a) {
                a = a.target;
                for (var c; a && !c;) c = a.point, a = a.parentNode;
                return c
            };
            a.prototype.onTrackerMouseOut = function (a) {
                a = a.relatedTarget || a.toElement;
                var c =
                    this.chart.hoverSeries;
                this.isDirectTouch = !1;
                if (!(!c || !a || c.stickyTracking || this.inClass(a, "highcharts-tooltip") || this.inClass(a, "highcharts-series-" + c.index) && this.inClass(a, "highcharts-tracker"))) c.onMouseOut()
            };
            a.prototype.inClass = function (a, c) {
                for (var d; a;) {
                    if (d = m(a, "class")) {
                        if (-1 !== d.indexOf(c)) return !0;
                        if (-1 !== d.indexOf("highcharts-container")) return !1
                    }
                    a = a.parentNode
                }
            };
            a.prototype.init = function (a, c) {
                this.options = c;
                this.chart = a;
                this.runChartClick = !(!c.chart.events || !c.chart.events.click);
                this.pinchDown = [];
                this.lastValidTouch = {};
                E && (a.tooltip = new E(a, c.tooltip), this.followTouchMove = D(c.tooltip.followTouchMove, !0));
                this.setDOMEvents()
            };
            a.prototype.normalize = function (a, c) {
                var d = a.touches,
                    b = d ? d.length ? d.item(0) : D(d.changedTouches, a.changedTouches)[0] : a;
                c || (c = this.getChartPosition());
                d = b.pageX - c.left;
                b = b.pageY - c.top;
                d /= c.scaleX;
                b /= c.scaleY;
                return e(a, {
                    chartX: Math.round(d),
                    chartY: Math.round(b)
                })
            };
            a.prototype.onContainerClick = function (a) {
                var c = this.chart,
                    d = c.hoverPoint;
                a = this.normalize(a);
                var b = c.plotLeft,
                    g = c.plotTop;
                c.cancelClick || (d && this.inClass(a.target, "highcharts-tracker") ? (f(d.series, "click", e(a, {
                    point: d
                })), c.hoverPoint && d.firePointEvent("click", a)) : (e(a, this.getCoordinates(a)), c.isInsidePlot(a.chartX - b, a.chartY - g, {
                    visiblePlotOnly: !0
                }) && f(c, "click", a)))
            };
            a.prototype.onContainerMouseDown = function (a) {
                var c = 1 === ((a.buttons || a.button) & 1);
                a = this.normalize(a);
                if (w.isFirefox && 0 !== a.button) this.onContainerMouseMove(a);
                if ("undefined" === typeof a.button || c) this.zoomOption(a), c && a.preventDefault && a.preventDefault(),
                    this.dragStart(a)
            };
            a.prototype.onContainerMouseLeave = function (c) {
                var e = J[D(a.hoverChartIndex, -1)],
                    d = this.chart.tooltip;
                d && d.shouldStickOnContact() && this.inClass(c.relatedTarget, "highcharts-tooltip-container") || (c = this.normalize(c), e && (c.relatedTarget || c.toElement) && (e.pointer.reset(), e.pointer.chartPosition = void 0), d && !d.isHidden && this.reset())
            };
            a.prototype.onContainerMouseEnter = function (a) {
                delete this.chartPosition
            };
            a.prototype.onContainerMouseMove = function (a) {
                var c = this.chart;
                a = this.normalize(a);
                this.setHoverChartIndex();
                a.preventDefault || (a.returnValue = !1);
                ("mousedown" === c.mouseIsDown || this.touchSelect(a)) && this.drag(a);
                c.openMenu || !this.inClass(a.target, "highcharts-tracker") && !c.isInsidePlot(a.chartX - c.plotLeft, a.chartY - c.plotTop, {
                    visiblePlotOnly: !0
                }) || (this.inClass(a.target, "highcharts-no-tooltip") ? this.reset(!1, 0) : this.runPointActions(a))
            };
            a.prototype.onDocumentTouchEnd = function (c) {
                var e = J[D(a.hoverChartIndex, -1)];
                e && e.pointer.drop(c)
            };
            a.prototype.onContainerTouchMove = function (a) {
                if (this.touchSelect(a)) this.onContainerMouseMove(a);
                else this.touch(a)
            };
            a.prototype.onContainerTouchStart = function (a) {
                if (this.touchSelect(a)) this.onContainerMouseDown(a);
                else this.zoomOption(a), this.touch(a, !0)
            };
            a.prototype.onDocumentMouseMove = function (a) {
                var c = this.chart,
                    d = this.chartPosition;
                a = this.normalize(a, d);
                var b = c.tooltip;
                !d || b && b.isStickyOnContact() || c.isInsidePlot(a.chartX - c.plotLeft, a.chartY - c.plotTop, {
                    visiblePlotOnly: !0
                }) || this.inClass(a.target, "highcharts-tracker") || this.reset()
            };
            a.prototype.onDocumentMouseUp = function (c) {
                var e = J[D(a.hoverChartIndex,
                    -1)];
                e && e.pointer.drop(c)
            };
            a.prototype.pinch = function (a) {
                var c = this,
                    d = c.chart,
                    b = c.pinchDown,
                    f = a.touches || [],
                    g = f.length,
                    k = c.lastValidTouch,
                    l = c.hasZoom,
                    m = {},
                    t = 1 === g && (c.inClass(a.target, "highcharts-tracker") && d.runTrackerClick || c.runChartClick),
                    q = {},
                    n = c.selectionMarker;
                1 < g ? c.initiated = !0 : 1 === g && this.followTouchMove && (c.initiated = !1);
                l && c.initiated && !t && !1 !== a.cancelable && a.preventDefault();
                [].map.call(f, function (b) {
                    return c.normalize(b)
                });
                "touchstart" === a.type ? ([].forEach.call(f, function (a, d) {
                    b[d] = {
                        chartX: a.chartX,
                        chartY: a.chartY
                    }
                }), k.x = [b[0].chartX, b[1] && b[1].chartX], k.y = [b[0].chartY, b[1] && b[1].chartY], d.axes.forEach(function (b) {
                    if (b.zoomEnabled) {
                        var a = d.bounds[b.horiz ? "h" : "v"],
                            c = b.minPixelPadding,
                            e = b.toPixels(Math.min(D(b.options.min, b.dataMin), b.dataMin)),
                            h = b.toPixels(Math.max(D(b.options.max, b.dataMax), b.dataMax)),
                            f = Math.max(e, h);
                        a.min = Math.min(b.pos, Math.min(e, h) - c);
                        a.max = Math.max(b.pos + b.len, f + c)
                    }
                }), c.res = !0) : c.followTouchMove && 1 === g ? this.runPointActions(c.normalize(a)) : b.length && (n ||
                    (c.selectionMarker = n = e({
                        destroy: u,
                        touch: !0
                    }, d.plotBox)), c.pinchTranslate(b, f, m, n, q, k), c.hasPinched = l, c.scaleGroups(m, q), c.res && (c.res = !1, this.reset(!1, 0)))
            };
            a.prototype.pinchTranslate = function (a, c, d, b, e, f) {
                this.zoomHor && this.pinchTranslateDirection(!0, a, c, d, b, e, f);
                this.zoomVert && this.pinchTranslateDirection(!1, a, c, d, b, e, f)
            };
            a.prototype.pinchTranslateDirection = function (a, c, d, b, e, f, g, k) {
                var h = this.chart,
                    l = a ? "x" : "y",
                    p = a ? "X" : "Y",
                    m = "chart" + p,
                    y = a ? "width" : "height",
                    t = h["plot" + (a ? "Left" : "Top")],
                    q = h.inverted,
                    n = h.bounds[a ? "h" : "v"],
                    r = 1 === c.length,
                    v = c[0][m],
                    B = !r && c[1][m];
                c = function () {
                    "number" === typeof I && 20 < Math.abs(v - B) && (D = k || Math.abs(N - I) / Math.abs(v - B));
                    A = (t - N) / D + v;
                    G = h["plot" + (a ? "Width" : "Height")] / D
                };
                var G, A, D = k || 1,
                    N = d[0][m],
                    I = !r && d[1][m];
                c();
                d = A;
                if (d < n.min) {
                    d = n.min;
                    var L = !0
                } else d + G > n.max && (d = n.max - G, L = !0);
                L ? (N -= .8 * (N - g[l][0]), "number" === typeof I && (I -= .8 * (I - g[l][1])), c()) : g[l] = [N, I];
                q || (f[l] = A - t, f[y] = G);
                f = q ? 1 / D : D;
                e[y] = G;
                e[l] = d;
                b[q ? a ? "scaleY" : "scaleX" : "scale" + p] = D;
                b["translate" + p] = f * t + (N - f * v)
            };
            a.prototype.reset =
                function (a, c) {
                    var d = this.chart,
                        b = d.hoverSeries,
                        e = d.hoverPoint,
                        h = d.hoverPoints,
                        f = d.tooltip,
                        g = f && f.shared ? h : e;
                    a && g && B(g).forEach(function (b) {
                        b.series.isCartesian && "undefined" === typeof b.plotX && (a = !1)
                    });
                    if (a) f && g && B(g).length && (f.refresh(g), f.shared && h ? h.forEach(function (b) {
                        b.setState(b.state, !0);
                        b.series.isCartesian && (b.series.xAxis.crosshair && b.series.xAxis.drawCrosshair(null, b), b.series.yAxis.crosshair && b.series.yAxis.drawCrosshair(null, b))
                    }) : e && (e.setState(e.state, !0), d.axes.forEach(function (b) {
                        b.crosshair &&
                            e.series[b.coll] === b && b.drawCrosshair(null, e)
                    })));
                    else {
                        if (e) e.onMouseOut();
                        h && h.forEach(function (b) {
                            b.setState()
                        });
                        if (b) b.onMouseOut();
                        f && f.hide(c);
                        this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove());
                        d.axes.forEach(function (b) {
                            b.hideCrosshair()
                        });
                        this.hoverX = d.hoverPoints = d.hoverPoint = null
                    }
                };
            a.prototype.runPointActions = function (c, e) {
                var d = this.chart,
                    b = d.tooltip && d.tooltip.options.enabled ? d.tooltip : void 0,
                    h = b ? b.shared : !1,
                    f = e || d.hoverPoint,
                    g = f && f.series || d.hoverSeries;
                e = this.getHoverData(f,
                    g, d.series, (!c || "touchmove" !== c.type) && (!!e || g && g.directTouch && this.isDirectTouch), h, c);
                f = e.hoverPoint;
                g = e.hoverSeries;
                var k = e.hoverPoints;
                e = g && g.tooltipOptions.followPointer && !g.tooltipOptions.split;
                h = h && g && !g.noSharedTooltip;
                if (f && (f !== d.hoverPoint || b && b.isHidden)) {
                    (d.hoverPoints || []).forEach(function (b) {
                        -1 === k.indexOf(b) && b.setState()
                    });
                    if (d.hoverSeries !== g) g.onMouseOver();
                    this.applyInactiveState(k);
                    (k || []).forEach(function (b) {
                        b.setState("hover")
                    });
                    d.hoverPoint && d.hoverPoint.firePointEvent("mouseOut");
                    if (!f.series) return;
                    d.hoverPoints = k;
                    d.hoverPoint = f;
                    f.firePointEvent("mouseOver");
                    b && b.refresh(h ? k : f, c)
                } else e && b && !b.isHidden && (f = b.getAnchor([{}], c), d.isInsidePlot(f[0], f[1], {
                    visiblePlotOnly: !0
                }) && b.updatePosition({
                    plotX: f[0],
                    plotY: f[1]
                }));
                this.unDocMouseMove || (this.unDocMouseMove = n(d.container.ownerDocument, "mousemove", function (b) {
                    var d = J[a.hoverChartIndex];
                    if (d) d.pointer.onDocumentMouseMove(b)
                }), this.eventsToUnbind.push(this.unDocMouseMove));
                d.axes.forEach(function (b) {
                    var a = D((b.crosshair || {}).snap,
                            !0),
                        e;
                    a && ((e = d.hoverPoint) && e.series[b.coll] === b || (e = l(k, function (a) {
                        return a.series[b.coll] === b
                    })));
                    e || !a ? b.drawCrosshair(c, e) : b.hideCrosshair()
                })
            };
            a.prototype.scaleGroups = function (a, c) {
                var d = this.chart;
                d.series.forEach(function (b) {
                    var e = a || b.getPlotBox();
                    b.xAxis && b.xAxis.zoomEnabled && b.group && (b.group.attr(e), b.markerGroup && (b.markerGroup.attr(e), b.markerGroup.clip(c ? d.clipRect : null)), b.dataLabelsGroup && b.dataLabelsGroup.attr(e))
                });
                d.clipRect.attr(c || d.clipBox)
            };
            a.prototype.setDOMEvents = function () {
                var c =
                    this,
                    e = this.chart.container,
                    d = e.ownerDocument;
                e.onmousedown = this.onContainerMouseDown.bind(this);
                e.onmousemove = this.onContainerMouseMove.bind(this);
                e.onclick = this.onContainerClick.bind(this);
                this.eventsToUnbind.push(n(e, "mouseenter", this.onContainerMouseEnter.bind(this)));
                this.eventsToUnbind.push(n(e, "mouseleave", this.onContainerMouseLeave.bind(this)));
                a.unbindDocumentMouseUp || (a.unbindDocumentMouseUp = n(d, "mouseup", this.onDocumentMouseUp.bind(this)));
                for (var b = this.chart.renderTo.parentElement; b &&
                    "BODY" !== b.tagName;) this.eventsToUnbind.push(n(b, "scroll", function () {
                    delete c.chartPosition
                })), b = b.parentElement;
                w.hasTouch && (this.eventsToUnbind.push(n(e, "touchstart", this.onContainerTouchStart.bind(this), {
                    passive: !1
                })), this.eventsToUnbind.push(n(e, "touchmove", this.onContainerTouchMove.bind(this), {
                    passive: !1
                })), a.unbindDocumentTouchEnd || (a.unbindDocumentTouchEnd = n(d, "touchend", this.onDocumentTouchEnd.bind(this), {
                    passive: !1
                })))
            };
            a.prototype.setHoverChartIndex = function () {
                var c = this.chart,
                    e = w.charts[D(a.hoverChartIndex,
                        -1)];
                if (e && e !== c) e.pointer.onContainerMouseLeave({
                    relatedTarget: !0
                });
                e && e.mouseIsDown || (a.hoverChartIndex = c.index)
            };
            a.prototype.touch = function (a, c) {
                var d = this.chart,
                    b;
                this.setHoverChartIndex();
                if (1 === a.touches.length)
                    if (a = this.normalize(a), (b = d.isInsidePlot(a.chartX - d.plotLeft, a.chartY - d.plotTop, {
                            visiblePlotOnly: !0
                        })) && !d.openMenu) {
                        c && this.runPointActions(a);
                        if ("touchmove" === a.type) {
                            c = this.pinchDown;
                            var e = c[0] ? 4 <= Math.sqrt(Math.pow(c[0].chartX - a.chartX, 2) + Math.pow(c[0].chartY - a.chartY, 2)) : !1
                        }
                        D(e,
                            !0) && this.pinch(a)
                    } else c && this.reset();
                else 2 === a.touches.length && this.pinch(a)
            };
            a.prototype.touchSelect = function (a) {
                return !(!this.chart.options.chart.zoomBySingleTouch || !a.touches || 1 !== a.touches.length)
            };
            a.prototype.zoomOption = function (a) {
                var c = this.chart,
                    d = c.options.chart;
                c = c.inverted;
                var b = d.zoomType || "";
                /touch/.test(a.type) && (b = D(d.pinchType, b));
                this.zoomX = a = /x/.test(b);
                this.zoomY = d = /y/.test(b);
                this.zoomHor = a && !c || d && c;
                this.zoomVert = d && !c || a && c;
                this.hasZoom = a || d
            };
            return a
        }();
        "";
        return a
    });
    M(a,
        "Core/MSPointer.js", [a["Core/Globals.js"], a["Core/Pointer.js"], a["Core/Utilities.js"]],
        function (a, w, C) {
            function r() {
                var a = [];
                a.item = function (a) {
                    return this[a]
                };
                e(f, function (c) {
                    a.push({
                        pageX: c.pageX,
                        pageY: c.pageY,
                        target: c.target
                    })
                });
                return a
            }

            function z(a, c, e, f) {
                var g = J[w.hoverChartIndex || NaN];
                "touch" !== a.pointerType && a.pointerType !== a.MSPOINTER_TYPE_TOUCH || !g || (g = g.pointer, f(a), g[c]({
                    type: e,
                    target: a.currentTarget,
                    preventDefault: n,
                    touches: r()
                }))
            }
            var x = this && this.__extends || function () {
                    var a = function (c,
                        e) {
                        a = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function (a, c) {
                            a.__proto__ = c
                        } || function (a, c) {
                            for (var e in c) c.hasOwnProperty(e) && (a[e] = c[e])
                        };
                        return a(c, e)
                    };
                    return function (c, e) {
                        function f() {
                            this.constructor = c
                        }
                        a(c, e);
                        c.prototype = null === e ? Object.create(e) : (f.prototype = e.prototype, new f)
                    }
                }(),
                J = a.charts,
                u = a.doc,
                n = a.noop,
                m = a.win,
                g = C.addEvent,
                c = C.css,
                e = C.objectEach,
                l = C.removeEvent,
                f = {},
                v = !!m.PointerEvent;
            return function (e) {
                function k() {
                    return null !== e && e.apply(this, arguments) || this
                }
                x(k, e);
                k.isRequired =
                    function () {
                        return !(a.hasTouch || !m.PointerEvent && !m.MSPointerEvent)
                    };
                k.prototype.batchMSEvents = function (a) {
                    a(this.chart.container, v ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown);
                    a(this.chart.container, v ? "pointermove" : "MSPointerMove", this.onContainerPointerMove);
                    a(u, v ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp)
                };
                k.prototype.destroy = function () {
                    this.batchMSEvents(l);
                    e.prototype.destroy.call(this)
                };
                k.prototype.init = function (a, f) {
                    e.prototype.init.call(this, a, f);
                    this.hasZoom && c(a.container, {
                        "-ms-touch-action": "none",
                        "touch-action": "none"
                    })
                };
                k.prototype.onContainerPointerDown = function (a) {
                    z(a, "onContainerTouchStart", "touchstart", function (a) {
                        f[a.pointerId] = {
                            pageX: a.pageX,
                            pageY: a.pageY,
                            target: a.currentTarget
                        }
                    })
                };
                k.prototype.onContainerPointerMove = function (a) {
                    z(a, "onContainerTouchMove", "touchmove", function (a) {
                        f[a.pointerId] = {
                            pageX: a.pageX,
                            pageY: a.pageY
                        };
                        f[a.pointerId].target || (f[a.pointerId].target = a.currentTarget)
                    })
                };
                k.prototype.onDocumentPointerUp = function (a) {
                    z(a, "onDocumentTouchEnd",
                        "touchend",
                        function (a) {
                            delete f[a.pointerId]
                        })
                };
                k.prototype.setDOMEvents = function () {
                    e.prototype.setDOMEvents.call(this);
                    (this.hasZoom || this.followTouchMove) && this.batchMSEvents(g)
                };
                return k
            }(w)
        });
    M(a, "Core/Legend/Legend.js", [a["Core/Animation/AnimationUtilities.js"], a["Core/FormatUtilities.js"], a["Core/Globals.js"], a["Core/Series/Point.js"], a["Core/Renderer/RendererUtilities.js"], a["Core/Utilities.js"]], function (a, w, C, E, z, x) {
        var r = a.animObject,
            u = a.setAnimation,
            n = w.format;
        a = C.isFirefox;
        var m = C.marginNames;
        C = C.win;
        var g = z.distribute,
            c = x.addEvent,
            e = x.createElement,
            l = x.css,
            f = x.defined,
            v = x.discardElement,
            q = x.find,
            k = x.fireEvent,
            I = x.isNumber,
            D = x.merge,
            B = x.pick,
            O = x.relativeLength,
            t = x.stableSort,
            h = x.syncTimeout;
        z = x.wrap;
        x = function () {
            function a(a, d) {
                this.allItems = [];
                this.contentGroup = this.box = void 0;
                this.display = !1;
                this.group = void 0;
                this.offsetWidth = this.maxLegendWidth = this.maxItemWidth = this.legendWidth = this.legendHeight = this.lastLineHeight = this.lastItemY = this.itemY = this.itemX = this.itemMarginTop = this.itemMarginBottom =
                    this.itemHeight = this.initialItemY = 0;
                this.options = {};
                this.padding = 0;
                this.pages = [];
                this.proximate = !1;
                this.scrollGroup = void 0;
                this.widthOption = this.totalItemWidth = this.titleHeight = this.symbolWidth = this.symbolHeight = 0;
                this.chart = a;
                this.init(a, d)
            }
            a.prototype.init = function (a, d) {
                this.chart = a;
                this.setOptions(d);
                d.enabled && (this.render(), c(this.chart, "endResize", function () {
                    this.legend.positionCheckboxes()
                }), this.proximate ? this.unchartrender = c(this.chart, "render", function () {
                    this.legend.proximatePositions();
                    this.legend.positionItems()
                }) : this.unchartrender && this.unchartrender())
            };
            a.prototype.setOptions = function (a) {
                var b = B(a.padding, 8);
                this.options = a;
                this.chart.styledMode || (this.itemStyle = a.itemStyle, this.itemHiddenStyle = D(this.itemStyle, a.itemHiddenStyle));
                this.itemMarginTop = a.itemMarginTop || 0;
                this.itemMarginBottom = a.itemMarginBottom || 0;
                this.padding = b;
                this.initialItemY = b - 5;
                this.symbolWidth = B(a.symbolWidth, 16);
                this.pages = [];
                this.proximate = "proximate" === a.layout && !this.chart.inverted;
                this.baseline = void 0
            };
            a.prototype.update = function (a, d) {
                var b = this.chart;
                this.setOptions(D(!0, this.options, a));
                this.destroy();
                b.isDirtyLegend = b.isDirtyBox = !0;
                B(d, !0) && b.redraw();
                k(this, "afterUpdate")
            };
            a.prototype.colorizeItem = function (a, d) {
                a.legendGroup[d ? "removeClass" : "addClass"]("highcharts-legend-item-hidden");
                if (!this.chart.styledMode) {
                    var b = this.options,
                        c = a.legendItem,
                        e = a.legendLine,
                        h = a.legendSymbol,
                        f = this.itemHiddenStyle.color;
                    b = d ? b.itemStyle.color : f;
                    var g = d ? a.color || f : f,
                        l = a.options && a.options.marker,
                        p = {
                            fill: g
                        };
                    c &&
                        c.css({
                            fill: b,
                            color: b
                        });
                    e && e.attr({
                        stroke: g
                    });
                    h && (l && h.isMarker && (p = a.pointAttribs(), d || (p.stroke = p.fill = f)), h.attr(p))
                }
                k(this, "afterColorizeItem", {
                    item: a,
                    visible: d
                })
            };
            a.prototype.positionItems = function () {
                this.allItems.forEach(this.positionItem, this);
                this.chart.isResizing || this.positionCheckboxes()
            };
            a.prototype.positionItem = function (a) {
                var b = this,
                    d = this.options,
                    c = d.symbolPadding,
                    e = !d.rtl,
                    h = a._legendItemPos;
                d = h[0];
                h = h[1];
                var g = a.checkbox,
                    l = a.legendGroup;
                l && l.element && (c = {
                    translateX: e ? d : this.legendWidth -
                        d - 2 * c - 4,
                    translateY: h
                }, e = function () {
                    k(b, "afterPositionItem", {
                        item: a
                    })
                }, f(l.translateY) ? l.animate(c, void 0, e) : (l.attr(c), e()));
                g && (g.x = d, g.y = h)
            };
            a.prototype.destroyItem = function (a) {
                var b = a.checkbox;
                ["legendItem", "legendLine", "legendSymbol", "legendGroup"].forEach(function (b) {
                    a[b] && (a[b] = a[b].destroy())
                });
                b && v(a.checkbox)
            };
            a.prototype.destroy = function () {
                function a(a) {
                    this[a] && (this[a] = this[a].destroy())
                }
                this.getAllItems().forEach(function (b) {
                    ["legendItem", "legendGroup"].forEach(a, b)
                });
                "clipRect up down pager nav box title group".split(" ").forEach(a,
                    this);
                this.display = null
            };
            a.prototype.positionCheckboxes = function () {
                var a = this.group && this.group.alignAttr,
                    d = this.clipHeight || this.legendHeight,
                    c = this.titleHeight;
                if (a) {
                    var e = a.translateY;
                    this.allItems.forEach(function (b) {
                        var h = b.checkbox;
                        if (h) {
                            var f = e + c + h.y + (this.scrollOffset || 0) + 3;
                            l(h, {
                                left: a.translateX + b.checkboxOffset + h.x - 20 + "px",
                                top: f + "px",
                                display: this.proximate || f > e - 6 && f < e + d - 6 ? "" : "none"
                            })
                        }
                    }, this)
                }
            };
            a.prototype.renderTitle = function () {
                var a = this.options,
                    d = this.padding,
                    c = a.title,
                    e = 0;
                c.text && (this.title ||
                    (this.title = this.chart.renderer.label(c.text, d - 3, d - 4, null, null, null, a.useHTML, null, "legend-title").attr({
                        zIndex: 1
                    }), this.chart.styledMode || this.title.css(c.style), this.title.add(this.group)), c.width || this.title.css({
                        width: this.maxLegendWidth + "px"
                    }), a = this.title.getBBox(), e = a.height, this.offsetWidth = a.width, this.contentGroup.attr({
                        translateY: e
                    }));
                this.titleHeight = e
            };
            a.prototype.setText = function (a) {
                var b = this.options;
                a.legendItem.attr({
                    text: b.labelFormat ? n(b.labelFormat, a, this.chart) : b.labelFormatter.call(a)
                })
            };
            a.prototype.renderItem = function (a) {
                var b = this.chart,
                    d = b.renderer,
                    c = this.options,
                    e = this.symbolWidth,
                    h = c.symbolPadding || 0,
                    f = this.itemStyle,
                    g = this.itemHiddenStyle,
                    k = "horizontal" === c.layout ? B(c.itemDistance, 20) : 0,
                    l = !c.rtl,
                    m = !a.series,
                    n = !m && a.series.drawLegendSymbol ? a.series : a,
                    q = n.options,
                    t = this.createCheckboxForItem && q && q.showCheckbox,
                    v = c.useHTML,
                    r = a.options.className,
                    I = a.legendItem;
                q = e + h + k + (t ? 20 : 0);
                I || (a.legendGroup = d.g("legend-item").addClass("highcharts-" + n.type + "-series highcharts-color-" + a.colorIndex +
                    (r ? " " + r : "") + (m ? " highcharts-series-" + a.index : "")).attr({
                    zIndex: 1
                }).add(this.scrollGroup), a.legendItem = I = d.text("", l ? e + h : -h, this.baseline || 0, v), b.styledMode || I.css(D(a.visible ? f : g)), I.attr({
                    align: l ? "left" : "right",
                    zIndex: 2
                }).add(a.legendGroup), this.baseline || (this.fontMetrics = d.fontMetrics(b.styledMode ? 12 : f.fontSize, I), this.baseline = this.fontMetrics.f + 3 + this.itemMarginTop, I.attr("y", this.baseline), this.symbolHeight = c.symbolHeight || this.fontMetrics.f, c.squareSymbol && (this.symbolWidth = B(c.symbolWidth,
                    Math.max(this.symbolHeight, 16)), q = this.symbolWidth + h + k + (t ? 20 : 0), l && I.attr("x", this.symbolWidth + h))), n.drawLegendSymbol(this, a), this.setItemEvents && this.setItemEvents(a, I, v));
                t && !a.checkbox && this.createCheckboxForItem && this.createCheckboxForItem(a);
                this.colorizeItem(a, a.visible);
                !b.styledMode && f.width || I.css({
                    width: (c.itemWidth || this.widthOption || b.spacingBox.width) - q + "px"
                });
                this.setText(a);
                b = I.getBBox();
                a.itemWidth = a.checkboxOffset = c.itemWidth || a.legendItemWidth || b.width + q;
                this.maxItemWidth = Math.max(this.maxItemWidth,
                    a.itemWidth);
                this.totalItemWidth += a.itemWidth;
                this.itemHeight = a.itemHeight = Math.round(a.legendItemHeight || b.height || this.symbolHeight)
            };
            a.prototype.layoutItem = function (a) {
                var b = this.options,
                    d = this.padding,
                    c = "horizontal" === b.layout,
                    e = a.itemHeight,
                    h = this.itemMarginBottom,
                    f = this.itemMarginTop,
                    g = c ? B(b.itemDistance, 20) : 0,
                    k = this.maxLegendWidth;
                b = b.alignColumns && this.totalItemWidth > k ? this.maxItemWidth : a.itemWidth;
                c && this.itemX - d + b > k && (this.itemX = d, this.lastLineHeight && (this.itemY += f + this.lastLineHeight +
                    h), this.lastLineHeight = 0);
                this.lastItemY = f + this.itemY + h;
                this.lastLineHeight = Math.max(e, this.lastLineHeight);
                a._legendItemPos = [this.itemX, this.itemY];
                c ? this.itemX += b : (this.itemY += f + e + h, this.lastLineHeight = e);
                this.offsetWidth = this.widthOption || Math.max((c ? this.itemX - d - (a.checkbox ? 0 : g) : b) + d, this.offsetWidth)
            };
            a.prototype.getAllItems = function () {
                var a = [];
                this.chart.series.forEach(function (b) {
                    var d = b && b.options;
                    b && B(d.showInLegend, f(d.linkedTo) ? !1 : void 0, !0) && (a = a.concat(b.legendItems || ("point" === d.legendType ?
                        b.data : b)))
                });
                k(this, "afterGetAllItems", {
                    allItems: a
                });
                return a
            };
            a.prototype.getAlignment = function () {
                var a = this.options;
                return this.proximate ? a.align.charAt(0) + "tv" : a.floating ? "" : a.align.charAt(0) + a.verticalAlign.charAt(0) + a.layout.charAt(0)
            };
            a.prototype.adjustMargins = function (a, d) {
                var b = this.chart,
                    c = this.options,
                    e = this.getAlignment();
                e && [/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/].forEach(function (h, g) {
                    h.test(e) && !f(a[g]) && (b[m[g]] = Math.max(b[m[g]], b.legend[(g + 1) % 2 ? "legendHeight" :
                        "legendWidth"] + [1, -1, -1, 1][g] * c[g % 2 ? "x" : "y"] + B(c.margin, 12) + d[g] + (b.titleOffset[g] || 0)))
                })
            };
            a.prototype.proximatePositions = function () {
                var a = this.chart,
                    d = [],
                    c = "left" === this.options.align;
                this.allItems.forEach(function (b) {
                    var e;
                    var h = c;
                    if (b.yAxis) {
                        b.xAxis.options.reversed && (h = !h);
                        b.points && (e = q(h ? b.points : b.points.slice(0).reverse(), function (a) {
                            return I(a.plotY)
                        }));
                        h = this.itemMarginTop + b.legendItem.getBBox().height + this.itemMarginBottom;
                        var f = b.yAxis.top - a.plotTop;
                        b.visible ? (e = e ? e.plotY : b.yAxis.height,
                            e += f - .3 * h) : e = f + b.yAxis.height;
                        d.push({
                            target: e,
                            size: h,
                            item: b
                        })
                    }
                }, this);
                g(d, a.plotHeight).forEach(function (b) {
                    b.item._legendItemPos && (b.item._legendItemPos[1] = a.plotTop - a.spacing[0] + b.pos)
                })
            };
            a.prototype.render = function () {
                var a = this.chart,
                    d = a.renderer,
                    c = this.options,
                    e = this.padding,
                    h = this.getAllItems(),
                    f = this.group,
                    g = this.box;
                this.itemX = e;
                this.itemY = this.initialItemY;
                this.lastItemY = this.offsetWidth = 0;
                this.widthOption = O(c.width, a.spacingBox.width - e);
                var l = a.spacingBox.width - 2 * e - c.x; - 1 < ["rm", "lm"].indexOf(this.getAlignment().substring(0,
                    2)) && (l /= 2);
                this.maxLegendWidth = this.widthOption || l;
                f || (this.group = f = d.g("legend").addClass(c.className || "").attr({
                    zIndex: 7
                }).add(), this.contentGroup = d.g().attr({
                    zIndex: 1
                }).add(f), this.scrollGroup = d.g().add(this.contentGroup));
                this.renderTitle();
                t(h, function (a, b) {
                    return (a.options && a.options.legendIndex || 0) - (b.options && b.options.legendIndex || 0)
                });
                c.reversed && h.reverse();
                this.allItems = h;
                this.display = l = !!h.length;
                this.itemHeight = this.totalItemWidth = this.maxItemWidth = this.lastLineHeight = 0;
                h.forEach(this.renderItem,
                    this);
                h.forEach(this.layoutItem, this);
                h = (this.widthOption || this.offsetWidth) + e;
                var m = this.lastItemY + this.lastLineHeight + this.titleHeight;
                m = this.handleOverflow(m);
                m += e;
                g || (this.box = g = d.rect().addClass("highcharts-legend-box").attr({
                    r: c.borderRadius
                }).add(f), g.isNew = !0);
                a.styledMode || g.attr({
                    stroke: c.borderColor,
                    "stroke-width": c.borderWidth || 0,
                    fill: c.backgroundColor || "none"
                }).shadow(c.shadow);
                0 < h && 0 < m && (g[g.isNew ? "attr" : "animate"](g.crisp.call({}, {
                    x: 0,
                    y: 0,
                    width: h,
                    height: m
                }, g.strokeWidth())), g.isNew = !1);
                g[l ? "show" : "hide"]();
                a.styledMode && "none" === f.getStyle("display") && (h = m = 0);
                this.legendWidth = h;
                this.legendHeight = m;
                l && this.align();
                this.proximate || this.positionItems();
                k(this, "afterRender")
            };
            a.prototype.align = function (a) {
                void 0 === a && (a = this.chart.spacingBox);
                var b = this.chart,
                    d = this.options,
                    c = a.y;
                /(lth|ct|rth)/.test(this.getAlignment()) && 0 < b.titleOffset[0] ? c += b.titleOffset[0] : /(lbh|cb|rbh)/.test(this.getAlignment()) && 0 < b.titleOffset[2] && (c -= b.titleOffset[2]);
                c !== a.y && (a = D(a, {
                    y: c
                }));
                this.group.align(D(d, {
                    width: this.legendWidth,
                    height: this.legendHeight,
                    verticalAlign: this.proximate ? "top" : d.verticalAlign
                }), !0, a)
            };
            a.prototype.handleOverflow = function (a) {
                var b = this,
                    d = this.chart,
                    c = d.renderer,
                    e = this.options,
                    h = e.y,
                    f = "top" === e.verticalAlign,
                    g = this.padding,
                    k = e.maxHeight,
                    l = e.navigation,
                    m = B(l.animation, !0),
                    n = l.arrowSize || 12,
                    q = this.pages,
                    t = this.allItems,
                    v = function (a) {
                        "number" === typeof a ? N.attr({
                            height: a
                        }) : N && (b.clipRect = N.destroy(), b.contentGroup.clip());
                        b.contentGroup.div && (b.contentGroup.div.style.clip = a ? "rect(" +
                            g + "px,9999px," + (g + a) + "px,0)" : "auto")
                    },
                    r = function (a) {
                        b[a] = c.circle(0, 0, 1.3 * n).translate(n / 2, n / 2).add(U);
                        d.styledMode || b[a].attr("fill", "rgba(0,0,0,0.0001)");
                        return b[a]
                    },
                    I, A;
                h = d.spacingBox.height + (f ? -h : h) - g;
                var U = this.nav,
                    N = this.clipRect;
                "horizontal" !== e.layout || "middle" === e.verticalAlign || e.floating || (h /= 2);
                k && (h = Math.min(h, k));
                q.length = 0;
                a && 0 < h && a > h && !1 !== l.enabled ? (this.clipHeight = I = Math.max(h - 20 - this.titleHeight - g, 0), this.currentPage = B(this.currentPage, 1), this.fullHeight = a, t.forEach(function (a,
                    b) {
                    var d = a._legendItemPos[1],
                        c = Math.round(a.legendItem.getBBox().height),
                        e = q.length;
                    if (!e || d - q[e - 1] > I && (A || d) !== q[e - 1]) q.push(A || d), e++;
                    a.pageIx = e - 1;
                    A && (t[b - 1].pageIx = e - 1);
                    b === t.length - 1 && d + c - q[e - 1] > I && d !== A && (q.push(d), a.pageIx = e);
                    d !== A && (A = d)
                }), N || (N = b.clipRect = c.clipRect(0, g, 9999, 0), b.contentGroup.clip(N)), v(I), U || (this.nav = U = c.g().attr({
                        zIndex: 1
                    }).add(this.group), this.up = c.symbol("triangle", 0, 0, n, n).add(U), r("upTracker").on("click", function () {
                        b.scroll(-1, m)
                    }), this.pager = c.text("", 15, 10).addClass("highcharts-legend-navigation"),
                    d.styledMode || this.pager.css(l.style), this.pager.add(U), this.down = c.symbol("triangle-down", 0, 0, n, n).add(U), r("downTracker").on("click", function () {
                        b.scroll(1, m)
                    })), b.scroll(0), a = h) : U && (v(), this.nav = U.destroy(), this.scrollGroup.attr({
                    translateY: 1
                }), this.clipHeight = 0);
                return a
            };
            a.prototype.scroll = function (a, d) {
                var b = this,
                    c = this.chart,
                    e = this.pages,
                    f = e.length,
                    g = this.clipHeight,
                    l = this.options.navigation,
                    m = this.pager,
                    p = this.padding,
                    n = this.currentPage + a;
                n > f && (n = f);
                0 < n && ("undefined" !== typeof d && u(d, c), this.nav.attr({
                    translateX: p,
                    translateY: g + this.padding + 7 + this.titleHeight,
                    visibility: "visible"
                }), [this.up, this.upTracker].forEach(function (a) {
                    a.attr({
                        "class": 1 === n ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                    })
                }), m.attr({
                    text: n + "/" + f
                }), [this.down, this.downTracker].forEach(function (a) {
                    a.attr({
                        x: 18 + this.pager.getBBox().width,
                        "class": n === f ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                    })
                }, this), c.styledMode || (this.up.attr({
                    fill: 1 === n ? l.inactiveColor : l.activeColor
                }), this.upTracker.css({
                    cursor: 1 ===
                        n ? "default" : "pointer"
                }), this.down.attr({
                    fill: n === f ? l.inactiveColor : l.activeColor
                }), this.downTracker.css({
                    cursor: n === f ? "default" : "pointer"
                })), this.scrollOffset = -e[n - 1] + this.initialItemY, this.scrollGroup.animate({
                    translateY: this.scrollOffset
                }), this.currentPage = n, this.positionCheckboxes(), a = r(B(d, c.renderer.globalAnimation, !0)), h(function () {
                    k(b, "afterScroll", {
                        currentPage: n
                    })
                }, a.duration))
            };
            a.prototype.setItemEvents = function (a, d, c) {
                var b = this,
                    e = b.chart.renderer.boxWrapper,
                    h = a instanceof E,
                    f = "highcharts-legend-" +
                    (h ? "point" : "series") + "-active",
                    g = b.chart.styledMode,
                    l = function (d) {
                        b.allItems.forEach(function (b) {
                            a !== b && [b].concat(b.linkedSeries || []).forEach(function (a) {
                                a.setState(d, !h)
                            })
                        })
                    };
                (c ? [d, a.legendSymbol] : [a.legendGroup]).forEach(function (c) {
                    if (c) c.on("mouseover", function () {
                        a.visible && l("inactive");
                        a.setState("hover");
                        a.visible && e.addClass(f);
                        g || d.css(b.options.itemHoverStyle)
                    }).on("mouseout", function () {
                        b.chart.styledMode || d.css(D(a.visible ? b.itemStyle : b.itemHiddenStyle));
                        l("");
                        e.removeClass(f);
                        a.setState()
                    }).on("click",
                        function (b) {
                            var d = function () {
                                a.setVisible && a.setVisible();
                                l(a.visible ? "inactive" : "")
                            };
                            e.removeClass(f);
                            b = {
                                browserEvent: b
                            };
                            a.firePointEvent ? a.firePointEvent("legendItemClick", b, d) : k(a, "legendItemClick", b, d)
                        })
                })
            };
            a.prototype.createCheckboxForItem = function (a) {
                a.checkbox = e("input", {
                    type: "checkbox",
                    className: "highcharts-legend-checkbox",
                    checked: a.selected,
                    defaultChecked: a.selected
                }, this.options.itemCheckboxStyle, this.chart.container);
                c(a.checkbox, "click", function (b) {
                    k(a.series || a, "checkboxClick", {
                        checked: b.target.checked,
                        item: a
                    }, function () {
                        a.select()
                    })
                })
            };
            return a
        }();
        (/Trident\/7\.0/.test(C.navigator && C.navigator.userAgent) || a) && z(x.prototype, "positionItem", function (a, b) {
            var d = this,
                c = function () {
                    b._legendItemPos && a.call(d, b)
                };
            c();
            d.bubbleLegend || setTimeout(c)
        });
        "";
        return x
    });
    M(a, "Core/Series/SeriesRegistry.js", [a["Core/Globals.js"], a["Core/DefaultOptions.js"], a["Core/Series/Point.js"], a["Core/Utilities.js"]], function (a, w, C, E) {
        var r = w.defaultOptions,
            x = E.error,
            J = E.extendClass,
            u = E.merge,
            n;
        (function (m) {
            function g(a, e) {
                var c =
                    r.plotOptions || {},
                    f = e.defaultOptions;
                e.prototype.pointClass || (e.prototype.pointClass = C);
                e.prototype.type = a;
                f && (c[a] = f);
                m.seriesTypes[a] = e
            }
            m.seriesTypes = a.seriesTypes;
            m.getSeries = function (a, e) {
                void 0 === e && (e = {});
                var c = a.options.chart;
                c = e.type || c.type || c.defaultSeriesType || "";
                var f = m.seriesTypes[c];
                m || x(17, !0, a, {
                    missingModuleFor: c
                });
                c = new f;
                "function" === typeof c.init && c.init(a, e);
                return c
            };
            m.registerSeriesType = g;
            m.seriesType = function (a, e, l, f, n) {
                var c = r.plotOptions || {};
                e = e || "";
                c[a] = u(c[e], l);
                g(a, J(m.seriesTypes[e] ||
                    function () {}, f));
                m.seriesTypes[a].prototype.type = a;
                n && (m.seriesTypes[a].prototype.pointClass = J(C, n));
                return m.seriesTypes[a]
            }
        })(n || (n = {}));
        return n
    });
    M(a, "Core/Chart/Chart.js", [a["Core/Animation/AnimationUtilities.js"], a["Core/Axis/Axis.js"], a["Core/FormatUtilities.js"], a["Core/Foundation.js"], a["Core/Globals.js"], a["Core/Legend/Legend.js"], a["Core/MSPointer.js"], a["Core/DefaultOptions.js"], a["Core/Color/Palette.js"], a["Core/Pointer.js"], a["Core/Renderer/RendererRegistry.js"], a["Core/Series/SeriesRegistry.js"],
        a["Core/Renderer/SVG/SVGRenderer.js"], a["Core/Time.js"], a["Core/Utilities.js"], a["Core/Renderer/HTML/AST.js"]
    ], function (a, w, C, E, z, x, J, u, n, m, g, c, e, l, f, v) {
        var q = a.animate,
            k = a.animObject,
            r = a.setAnimation,
            D = C.numberFormat,
            B = E.registerEventOptions,
            O = z.charts,
            t = z.doc,
            h = z.marginNames,
            d = z.svg,
            b = z.win,
            p = u.defaultOptions,
            G = u.defaultTime,
            y = c.seriesTypes,
            L = f.addEvent,
            F = f.attr,
            P = f.cleanRecursively,
            S = f.createElement,
            Q = f.css,
            V = f.defined,
            fa = f.discardElement,
            H = f.erase,
            K = f.error,
            M = f.extend,
            ha = f.find,
            R = f.fireEvent,
            Z = f.getStyle,
            A = f.isArray,
            U = f.isNumber,
            N = f.isObject,
            W = f.isString,
            X = f.merge,
            Y = f.objectEach,
            T = f.pick,
            da = f.pInt,
            ka = f.relativeLength,
            ja = f.removeEvent,
            ba = f.splat,
            ea = f.syncTimeout,
            ma = f.uniqueKey;
        a = function () {
            function a(a, b, d) {
                this.series = this.renderTo = this.renderer = this.pointer = this.pointCount = this.plotWidth = this.plotTop = this.plotLeft = this.plotHeight = this.plotBox = this.options = this.numberFormatter = this.margin = this.legend = this.labelCollectors = this.isResizing = this.index = this.eventOptions = this.container = this.colorCounter =
                    this.clipBox = this.chartWidth = this.chartHeight = this.bounds = this.axisOffset = this.axes = void 0;
                this.sharedClips = {};
                this.yAxis = this.xAxis = this.userOptions = this.titleOffset = this.time = this.symbolCounter = this.spacingBox = this.spacing = void 0;
                this.getArgs(a, b, d)
            }
            a.chart = function (b, d, c) {
                return new a(b, d, c)
            };
            a.prototype.getArgs = function (a, b, d) {
                W(a) || a.nodeName ? (this.renderTo = a, this.init(b, d)) : this.init(a, b)
            };
            a.prototype.init = function (a, b) {
                var d = a.plotOptions || {};
                R(this, "init", {
                    args: arguments
                }, function () {
                    var c =
                        X(p, a),
                        e = c.chart;
                    Y(c.plotOptions, function (a, b) {
                        N(a) && (a.tooltip = d[b] && X(d[b].tooltip) || void 0)
                    });
                    c.tooltip.userOptions = a.chart && a.chart.forExport && a.tooltip.userOptions || a.tooltip;
                    this.userOptions = a;
                    this.margin = [];
                    this.spacing = [];
                    this.bounds = {
                        h: {},
                        v: {}
                    };
                    this.labelCollectors = [];
                    this.callback = b;
                    this.isResizing = 0;
                    this.options = c;
                    this.axes = [];
                    this.series = [];
                    this.time = a.time && Object.keys(a.time).length ? new l(a.time) : z.time;
                    this.numberFormatter = e.numberFormatter || D;
                    this.styledMode = e.styledMode;
                    this.hasCartesianSeries =
                        e.showAxes;
                    this.index = O.length;
                    O.push(this);
                    z.chartCount++;
                    B(this, e);
                    this.xAxis = [];
                    this.yAxis = [];
                    this.pointCount = this.colorCounter = this.symbolCounter = 0;
                    R(this, "afterInit");
                    this.firstRender()
                })
            };
            a.prototype.initSeries = function (a) {
                var b = this.options.chart;
                b = a.type || b.type || b.defaultSeriesType;
                var d = y[b];
                d || K(17, !0, this, {
                    missingModuleFor: b
                });
                b = new d;
                "function" === typeof b.init && b.init(this, a);
                return b
            };
            a.prototype.setSeriesData = function () {
                this.getSeriesOrderByLinks().forEach(function (a) {
                    a.points || a.data ||
                        !a.enabledDataSorting || a.setData(a.options.data, !1)
                })
            };
            a.prototype.getSeriesOrderByLinks = function () {
                return this.series.concat().sort(function (a, b) {
                    return a.linkedSeries.length || b.linkedSeries.length ? b.linkedSeries.length - a.linkedSeries.length : 0
                })
            };
            a.prototype.orderSeries = function (a) {
                var b = this.series;
                a = a || 0;
                for (var d = b.length; a < d; ++a) b[a] && (b[a].index = a, b[a].name = b[a].getName())
            };
            a.prototype.isInsidePlot = function (a, b, d) {
                void 0 === d && (d = {});
                var c = this.inverted,
                    e = this.plotBox,
                    h = this.plotLeft,
                    f = this.plotTop,
                    g = this.scrollablePlotBox,
                    k = 0;
                var l = 0;
                d.visiblePlotOnly && this.scrollingContainer && (l = this.scrollingContainer, k = l.scrollLeft, l = l.scrollTop);
                var m = d.series;
                e = d.visiblePlotOnly && g || e;
                g = d.inverted ? b : a;
                b = d.inverted ? a : b;
                a = {
                    x: g,
                    y: b,
                    isInsidePlot: !0
                };
                if (!d.ignoreX) {
                    var A = m && (c ? m.yAxis : m.xAxis) || {
                        pos: h,
                        len: Infinity
                    };
                    g = d.paneCoordinates ? A.pos + g : h + g;
                    g >= Math.max(k + h, A.pos) && g <= Math.min(k + h + e.width, A.pos + A.len) || (a.isInsidePlot = !1)
                }!d.ignoreY && a.isInsidePlot && (c = m && (c ? m.xAxis : m.yAxis) || {
                        pos: f,
                        len: Infinity
                    }, d = d.paneCoordinates ?
                    c.pos + b : f + b, d >= Math.max(l + f, c.pos) && d <= Math.min(l + f + e.height, c.pos + c.len) || (a.isInsidePlot = !1));
                R(this, "afterIsInsidePlot", a);
                return a.isInsidePlot
            };
            a.prototype.redraw = function (a) {
                R(this, "beforeRedraw");
                var b = this.hasCartesianSeries ? this.axes : this.colorAxis || [],
                    d = this.series,
                    c = this.pointer,
                    e = this.legend,
                    h = this.userOptions.legend,
                    f = this.renderer,
                    g = f.isHidden(),
                    k = [],
                    l = this.isDirtyBox,
                    m = this.isDirtyLegend;
                this.setResponsive && this.setResponsive(!1);
                r(this.hasRendered ? a : !1, this);
                g && this.temporaryDisplay();
                this.layOutTitles();
                for (a = d.length; a--;) {
                    var A = d[a];
                    if (A.options.stacking || A.options.centerInCategory) {
                        var p = !0;
                        if (A.isDirty) {
                            var n = !0;
                            break
                        }
                    }
                }
                if (n)
                    for (a = d.length; a--;) A = d[a], A.options.stacking && (A.isDirty = !0);
                d.forEach(function (a) {
                    a.isDirty && ("point" === a.options.legendType ? ("function" === typeof a.updateTotals && a.updateTotals(), m = !0) : h && (h.labelFormatter || h.labelFormat) && (m = !0));
                    a.isDirtyData && R(a, "updatedData")
                });
                m && e && e.options.enabled && (e.render(), this.isDirtyLegend = !1);
                p && this.getStacks();
                b.forEach(function (a) {
                    a.updateNames();
                    a.setScale()
                });
                this.getMargins();
                b.forEach(function (a) {
                    a.isDirty && (l = !0)
                });
                b.forEach(function (a) {
                    var b = a.min + "," + a.max;
                    a.extKey !== b && (a.extKey = b, k.push(function () {
                        R(a, "afterSetExtremes", M(a.eventArgs, a.getExtremes()));
                        delete a.eventArgs
                    }));
                    (l || p) && a.redraw()
                });
                l && this.drawChartBox();
                R(this, "predraw");
                d.forEach(function (a) {
                    (l || a.isDirty) && a.visible && a.redraw();
                    a.isDirtyData = !1
                });
                c && c.reset(!0);
                f.draw();
                R(this, "redraw");
                R(this, "render");
                g && this.temporaryDisplay(!0);
                k.forEach(function (a) {
                    a.call()
                })
            };
            a.prototype.get = function (a) {
                function b(b) {
                    return b.id === a || b.options && b.options.id === a
                }
                for (var d = this.series, c = ha(this.axes, b) || ha(this.series, b), e = 0; !c && e < d.length; e++) c = ha(d[e].points || [], b);
                return c
            };
            a.prototype.getAxes = function () {
                var a = this,
                    b = this.options,
                    d = b.xAxis = ba(b.xAxis || {});
                b = b.yAxis = ba(b.yAxis || {});
                R(this, "getAxes");
                d.forEach(function (a, b) {
                    a.index = b;
                    a.isX = !0
                });
                b.forEach(function (a, b) {
                    a.index = b
                });
                d.concat(b).forEach(function (b) {
                    new w(a, b)
                });
                R(this, "afterGetAxes")
            };
            a.prototype.getSelectedPoints =
                function () {
                    return this.series.reduce(function (a, b) {
                        b.getPointsCollection().forEach(function (b) {
                            T(b.selectedStaging, b.selected) && a.push(b)
                        });
                        return a
                    }, [])
                };
            a.prototype.getSelectedSeries = function () {
                return this.series.filter(function (a) {
                    return a.selected
                })
            };
            a.prototype.setTitle = function (a, b, d) {
                this.applyDescription("title", a);
                this.applyDescription("subtitle", b);
                this.applyDescription("caption", void 0);
                this.layOutTitles(d)
            };
            a.prototype.applyDescription = function (a, b) {
                var d = this,
                    c = "title" === a ? {
                        color: n.neutralColor80,
                        fontSize: this.options.isStock ? "16px" : "18px"
                    } : {
                        color: n.neutralColor60
                    };
                c = this.options[a] = X(!this.styledMode && {
                    style: c
                }, this.options[a], b);
                var e = this[a];
                e && b && (this[a] = e = e.destroy());
                c && !e && (e = this.renderer.text(c.text, 0, 0, c.useHTML).attr({
                    align: c.align,
                    "class": "highcharts-" + a,
                    zIndex: c.zIndex || 4
                }).add(), e.update = function (b) {
                    d[{
                        title: "setTitle",
                        subtitle: "setSubtitle",
                        caption: "setCaption"
                    } [a]](b)
                }, this.styledMode || e.css(c.style), this[a] = e)
            };
            a.prototype.layOutTitles = function (a) {
                var b = [0, 0, 0],
                    d = this.renderer,
                    c = this.spacingBox;
                ["title", "subtitle", "caption"].forEach(function (a) {
                    var e = this[a],
                        h = this.options[a],
                        f = h.verticalAlign || "top";
                    a = "title" === a ? "top" === f ? -3 : 0 : "top" === f ? b[0] + 2 : 0;
                    var g;
                    if (e) {
                        this.styledMode || (g = h.style && h.style.fontSize);
                        g = d.fontMetrics(g, e).b;
                        e.css({
                            width: (h.width || c.width + (h.widthAdjust || 0)) + "px"
                        });
                        var k = Math.round(e.getBBox(h.useHTML).height);
                        e.align(M({
                            y: "bottom" === f ? g : a + g,
                            height: k
                        }, h), !1, "spacingBox");
                        h.floating || ("top" === f ? b[0] = Math.ceil(b[0] + k) : "bottom" === f && (b[2] = Math.ceil(b[2] +
                            k)))
                    }
                }, this);
                b[0] && "top" === (this.options.title.verticalAlign || "top") && (b[0] += this.options.title.margin);
                b[2] && "bottom" === this.options.caption.verticalAlign && (b[2] += this.options.caption.margin);
                var e = !this.titleOffset || this.titleOffset.join(",") !== b.join(",");
                this.titleOffset = b;
                R(this, "afterLayOutTitles");
                !this.isDirtyBox && e && (this.isDirtyBox = this.isDirtyLegend = e, this.hasRendered && T(a, !0) && this.isDirtyBox && this.redraw())
            };
            a.prototype.getChartSize = function () {
                var a = this.options.chart,
                    b = a.width;
                a = a.height;
                var d = this.renderTo;
                V(b) || (this.containerWidth = Z(d, "width"));
                V(a) || (this.containerHeight = Z(d, "height"));
                this.chartWidth = Math.max(0, b || this.containerWidth || 600);
                this.chartHeight = Math.max(0, ka(a, this.chartWidth) || (1 < this.containerHeight ? this.containerHeight : 400))
            };
            a.prototype.temporaryDisplay = function (a) {
                var b = this.renderTo;
                if (a)
                    for (; b && b.style;) b.hcOrigStyle && (Q(b, b.hcOrigStyle), delete b.hcOrigStyle), b.hcOrigDetached && (t.body.removeChild(b), b.hcOrigDetached = !1), b = b.parentNode;
                else
                    for (; b && b.style;) {
                        t.body.contains(b) ||
                            b.parentNode || (b.hcOrigDetached = !0, t.body.appendChild(b));
                        if ("none" === Z(b, "display", !1) || b.hcOricDetached) b.hcOrigStyle = {
                            display: b.style.display,
                            height: b.style.height,
                            overflow: b.style.overflow
                        }, a = {
                            display: "block",
                            overflow: "hidden"
                        }, b !== this.renderTo && (a.height = 0), Q(b, a), b.offsetWidth || b.style.setProperty("display", "block", "important");
                        b = b.parentNode;
                        if (b === t.body) break
                    }
            };
            a.prototype.setClassName = function (a) {
                this.container.className = "highcharts-container " + (a || "")
            };
            a.prototype.getContainer = function () {
                var a =
                    this.options,
                    b = a.chart,
                    c = ma(),
                    h, f = this.renderTo;
                f || (this.renderTo = f = b.renderTo);
                W(f) && (this.renderTo = f = t.getElementById(f));
                f || K(13, !0, this);
                var k = da(F(f, "data-highcharts-chart"));
                U(k) && O[k] && O[k].hasRendered && O[k].destroy();
                F(f, "data-highcharts-chart", this.index);
                f.innerHTML = "";
                b.skipClone || f.offsetWidth || this.temporaryDisplay();
                this.getChartSize();
                k = this.chartWidth;
                var l = this.chartHeight;
                Q(f, {
                    overflow: "hidden"
                });
                this.styledMode || (h = M({
                    position: "relative",
                    overflow: "hidden",
                    width: k + "px",
                    height: l +
                        "px",
                    textAlign: "left",
                    lineHeight: "normal",
                    zIndex: 0,
                    "-webkit-tap-highlight-color": "rgba(0,0,0,0)",
                    userSelect: "none",
                    "touch-action": "manipulation",
                    outline: "none"
                }, b.style || {}));
                this.container = c = S("div", {
                    id: c
                }, h, f);
                this._cursor = c.style.cursor;
                this.renderer = new(b.renderer || !d ? g.getRendererType(b.renderer) : e)(c, k, l, void 0, b.forExport, a.exporting && a.exporting.allowHTML, this.styledMode);
                r(void 0, this);
                this.setClassName(b.className);
                if (this.styledMode)
                    for (var m in a.defs) this.renderer.definition(a.defs[m]);
                else this.renderer.setStyle(b.style);
                this.renderer.chartIndex = this.index;
                R(this, "afterGetContainer")
            };
            a.prototype.getMargins = function (a) {
                var b = this.spacing,
                    d = this.margin,
                    c = this.titleOffset;
                this.resetMargins();
                c[0] && !V(d[0]) && (this.plotTop = Math.max(this.plotTop, c[0] + b[0]));
                c[2] && !V(d[2]) && (this.marginBottom = Math.max(this.marginBottom, c[2] + b[2]));
                this.legend && this.legend.display && this.legend.adjustMargins(d, b);
                R(this, "getMargins");
                a || this.getAxisMargins()
            };
            a.prototype.getAxisMargins = function () {
                var a =
                    this,
                    b = a.axisOffset = [0, 0, 0, 0],
                    d = a.colorAxis,
                    c = a.margin,
                    e = function (a) {
                        a.forEach(function (a) {
                            a.visible && a.getOffset()
                        })
                    };
                a.hasCartesianSeries ? e(a.axes) : d && d.length && e(d);
                h.forEach(function (d, e) {
                    V(c[e]) || (a[d] += b[e])
                });
                a.setChartSize()
            };
            a.prototype.reflow = function (a) {
                var d = this,
                    c = d.options.chart,
                    e = d.renderTo,
                    h = V(c.width) && V(c.height),
                    g = c.width || Z(e, "width");
                c = c.height || Z(e, "height");
                e = a ? a.target : b;
                delete d.pointer.chartPosition;
                if (!h && !d.isPrinting && g && c && (e === b || e === t)) {
                    if (g !== d.containerWidth || c !==
                        d.containerHeight) f.clearTimeout(d.reflowTimeout), d.reflowTimeout = ea(function () {
                        d.container && d.setSize(void 0, void 0, !1)
                    }, a ? 100 : 0);
                    d.containerWidth = g;
                    d.containerHeight = c
                }
            };
            a.prototype.setReflow = function (a) {
                var d = this;
                !1 === a || this.unbindReflow ? !1 === a && this.unbindReflow && (this.unbindReflow = this.unbindReflow()) : (this.unbindReflow = L(b, "resize", function (a) {
                    d.options && d.reflow(a)
                }), L(this, "destroy", this.unbindReflow))
            };
            a.prototype.setSize = function (a, b, d) {
                var c = this,
                    e = c.renderer;
                c.isResizing += 1;
                r(d, c);
                d =
                    e.globalAnimation;
                c.oldChartHeight = c.chartHeight;
                c.oldChartWidth = c.chartWidth;
                "undefined" !== typeof a && (c.options.chart.width = a);
                "undefined" !== typeof b && (c.options.chart.height = b);
                c.getChartSize();
                c.styledMode || (d ? q : Q)(c.container, {
                    width: c.chartWidth + "px",
                    height: c.chartHeight + "px"
                }, d);
                c.setChartSize(!0);
                e.setSize(c.chartWidth, c.chartHeight, d);
                c.axes.forEach(function (a) {
                    a.isDirty = !0;
                    a.setScale()
                });
                c.isDirtyLegend = !0;
                c.isDirtyBox = !0;
                c.layOutTitles();
                c.getMargins();
                c.redraw(d);
                c.oldChartHeight = null;
                R(c,
                    "resize");
                ea(function () {
                    c && R(c, "endResize", null, function () {
                        --c.isResizing
                    })
                }, k(d).duration)
            };
            a.prototype.setChartSize = function (a) {
                var b = this.inverted,
                    d = this.renderer,
                    c = this.chartWidth,
                    e = this.chartHeight,
                    h = this.options.chart,
                    f = this.spacing,
                    g = this.clipOffset,
                    k, l, m, A;
                this.plotLeft = k = Math.round(this.plotLeft);
                this.plotTop = l = Math.round(this.plotTop);
                this.plotWidth = m = Math.max(0, Math.round(c - k - this.marginRight));
                this.plotHeight = A = Math.max(0, Math.round(e - l - this.marginBottom));
                this.plotSizeX = b ? A : m;
                this.plotSizeY =
                    b ? m : A;
                this.plotBorderWidth = h.plotBorderWidth || 0;
                this.spacingBox = d.spacingBox = {
                    x: f[3],
                    y: f[0],
                    width: c - f[3] - f[1],
                    height: e - f[0] - f[2]
                };
                this.plotBox = d.plotBox = {
                    x: k,
                    y: l,
                    width: m,
                    height: A
                };
                b = 2 * Math.floor(this.plotBorderWidth / 2);
                c = Math.ceil(Math.max(b, g[3]) / 2);
                e = Math.ceil(Math.max(b, g[0]) / 2);
                this.clipBox = {
                    x: c,
                    y: e,
                    width: Math.floor(this.plotSizeX - Math.max(b, g[1]) / 2 - c),
                    height: Math.max(0, Math.floor(this.plotSizeY - Math.max(b, g[2]) / 2 - e))
                };
                a || (this.axes.forEach(function (a) {
                        a.setAxisSize();
                        a.setAxisTranslation()
                    }),
                    d.alignElements());
                R(this, "afterSetChartSize", {
                    skipAxes: a
                })
            };
            a.prototype.resetMargins = function () {
                R(this, "resetMargins");
                var a = this,
                    b = a.options.chart;
                ["margin", "spacing"].forEach(function (d) {
                    var c = b[d],
                        e = N(c) ? c : [c, c, c, c];
                    ["Top", "Right", "Bottom", "Left"].forEach(function (c, h) {
                        a[d][h] = T(b[d + c], e[h])
                    })
                });
                h.forEach(function (b, d) {
                    a[b] = T(a.margin[d], a.spacing[d])
                });
                a.axisOffset = [0, 0, 0, 0];
                a.clipOffset = [0, 0, 0, 0]
            };
            a.prototype.drawChartBox = function () {
                var a = this.options.chart,
                    b = this.renderer,
                    d = this.chartWidth,
                    c = this.chartHeight,
                    e = this.styledMode,
                    h = this.plotBGImage,
                    f = a.backgroundColor,
                    g = a.plotBackgroundColor,
                    k = a.plotBackgroundImage,
                    l = this.plotLeft,
                    m = this.plotTop,
                    A = this.plotWidth,
                    p = this.plotHeight,
                    n = this.plotBox,
                    q = this.clipRect,
                    N = this.clipBox,
                    t = this.chartBackground,
                    v = this.plotBackground,
                    r = this.plotBorder,
                    B, y = "animate";
                t || (this.chartBackground = t = b.rect().addClass("highcharts-background").add(), y = "attr");
                if (e) var I = B = t.strokeWidth();
                else {
                    I = a.borderWidth || 0;
                    B = I + (a.shadow ? 8 : 0);
                    f = {
                        fill: f || "none"
                    };
                    if (I || t["stroke-width"]) f.stroke =
                        a.borderColor, f["stroke-width"] = I;
                    t.attr(f).shadow(a.shadow)
                }
                t[y]({
                    x: B / 2,
                    y: B / 2,
                    width: d - B - I % 2,
                    height: c - B - I % 2,
                    r: a.borderRadius
                });
                y = "animate";
                v || (y = "attr", this.plotBackground = v = b.rect().addClass("highcharts-plot-background").add());
                v[y](n);
                e || (v.attr({
                    fill: g || "none"
                }).shadow(a.plotShadow), k && (h ? (k !== h.attr("href") && h.attr("href", k), h.animate(n)) : this.plotBGImage = b.image(k, l, m, A, p).add()));
                q ? q.animate({
                    width: N.width,
                    height: N.height
                }) : this.clipRect = b.clipRect(N);
                y = "animate";
                r || (y = "attr", this.plotBorder =
                    r = b.rect().addClass("highcharts-plot-border").attr({
                        zIndex: 1
                    }).add());
                e || r.attr({
                    stroke: a.plotBorderColor,
                    "stroke-width": a.plotBorderWidth || 0,
                    fill: "none"
                });
                r[y](r.crisp({
                    x: l,
                    y: m,
                    width: A,
                    height: p
                }, -r.strokeWidth()));
                this.isDirtyBox = !1;
                R(this, "afterDrawChartBox")
            };
            a.prototype.propFromSeries = function () {
                var a = this,
                    b = a.options.chart,
                    d = a.options.series,
                    c, e, h;
                ["inverted", "angular", "polar"].forEach(function (f) {
                    e = y[b.type || b.defaultSeriesType];
                    h = b[f] || e && e.prototype[f];
                    for (c = d && d.length; !h && c--;)(e = y[d[c].type]) &&
                        e.prototype[f] && (h = !0);
                    a[f] = h
                })
            };
            a.prototype.linkSeries = function () {
                var a = this,
                    b = a.series;
                b.forEach(function (a) {
                    a.linkedSeries.length = 0
                });
                b.forEach(function (b) {
                    var d = b.options.linkedTo;
                    W(d) && (d = ":previous" === d ? a.series[b.index - 1] : a.get(d)) && d.linkedParent !== b && (d.linkedSeries.push(b), b.linkedParent = d, d.enabledDataSorting && b.setDataSortingOptions(), b.visible = T(b.options.visible, d.options.visible, b.visible))
                });
                R(this, "afterLinkSeries")
            };
            a.prototype.renderSeries = function () {
                this.series.forEach(function (a) {
                    a.translate();
                    a.render()
                })
            };
            a.prototype.renderLabels = function () {
                var a = this,
                    b = a.options.labels;
                b.items && b.items.forEach(function (d) {
                    var c = M(b.style, d.style),
                        e = da(c.left) + a.plotLeft,
                        h = da(c.top) + a.plotTop + 12;
                    delete c.left;
                    delete c.top;
                    a.renderer.text(d.html, e, h).attr({
                        zIndex: 2
                    }).css(c).add()
                })
            };
            a.prototype.render = function () {
                var a = this.axes,
                    b = this.colorAxis,
                    d = this.renderer,
                    c = this.options,
                    e = function (a) {
                        a.forEach(function (a) {
                            a.visible && a.render()
                        })
                    },
                    h = 0;
                this.setTitle();
                this.legend = new x(this, c.legend);
                this.getStacks &&
                    this.getStacks();
                this.getMargins(!0);
                this.setChartSize();
                c = this.plotWidth;
                a.some(function (a) {
                    if (a.horiz && a.visible && a.options.labels.enabled && a.series.length) return h = 21, !0
                });
                var f = this.plotHeight = Math.max(this.plotHeight - h, 0);
                a.forEach(function (a) {
                    a.setScale()
                });
                this.getAxisMargins();
                var g = 1.1 < c / this.plotWidth,
                    k = 1.05 < f / this.plotHeight;
                if (g || k) a.forEach(function (a) {
                    (a.horiz && g || !a.horiz && k) && a.setTickInterval(!0)
                }), this.getMargins();
                this.drawChartBox();
                this.hasCartesianSeries ? e(a) : b && b.length && e(b);
                this.seriesGroup || (this.seriesGroup = d.g("series-group").attr({
                    zIndex: 3
                }).add());
                this.renderSeries();
                this.renderLabels();
                this.addCredits();
                this.setResponsive && this.setResponsive();
                this.hasRendered = !0
            };
            a.prototype.addCredits = function (a) {
                var d = this,
                    c = X(!0, this.options.credits, a);
                c.enabled && !this.credits && (this.credits = this.renderer.text(c.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function () {
                        c.href && (b.location.href = c.href)
                    }).attr({
                        align: c.position.align,
                        zIndex: 8
                    }), d.styledMode ||
                    this.credits.css(c.style), this.credits.add().align(c.position), this.credits.update = function (a) {
                        d.credits = d.credits.destroy();
                        d.addCredits(a)
                    })
            };
            a.prototype.destroy = function () {
                var a = this,
                    b = a.axes,
                    d = a.series,
                    c = a.container,
                    e = c && c.parentNode,
                    h;
                R(a, "destroy");
                a.renderer.forExport ? H(O, a) : O[a.index] = void 0;
                z.chartCount--;
                a.renderTo.removeAttribute("data-highcharts-chart");
                ja(a);
                for (h = b.length; h--;) b[h] = b[h].destroy();
                this.scroller && this.scroller.destroy && this.scroller.destroy();
                for (h = d.length; h--;) d[h] =
                    d[h].destroy();
                "title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" ").forEach(function (b) {
                    var d = a[b];
                    d && d.destroy && (a[b] = d.destroy())
                });
                c && (c.innerHTML = "", ja(c), e && fa(c));
                Y(a, function (b, d) {
                    delete a[d]
                })
            };
            a.prototype.firstRender = function () {
                var a = this,
                    b = a.options;
                if (!a.isReadyToRender || a.isReadyToRender()) {
                    a.getContainer();
                    a.resetMargins();
                    a.setChartSize();
                    a.propFromSeries();
                    a.getAxes();
                    (A(b.series) ? b.series : []).forEach(function (b) {
                        a.initSeries(b)
                    });
                    a.linkSeries();
                    a.setSeriesData();
                    R(a, "beforeRender");
                    m && (J.isRequired() ? a.pointer = new J(a, b) : a.pointer = new m(a, b));
                    a.render();
                    a.pointer.getChartPosition();
                    if (!a.renderer.imgCount && !a.hasLoaded) a.onload();
                    a.temporaryDisplay(!0)
                }
            };
            a.prototype.onload = function () {
                this.callbacks.concat([this.callback]).forEach(function (a) {
                    a && "undefined" !== typeof this.index && a.apply(this, [this])
                }, this);
                R(this, "load");
                R(this, "render");
                V(this.index) && this.setReflow(this.options.chart.reflow);
                this.hasLoaded = !0
            };
            a.prototype.addSeries = function (a, b, d) {
                var c = this,
                    e;
                a && (b = T(b, !0), R(c, "addSeries", {
                    options: a
                }, function () {
                    e = c.initSeries(a);
                    c.isDirtyLegend = !0;
                    c.linkSeries();
                    e.enabledDataSorting && e.setData(a.data, !1);
                    R(c, "afterAddSeries", {
                        series: e
                    });
                    b && c.redraw(d)
                }));
                return e
            };
            a.prototype.addAxis = function (a, b, d, c) {
                return this.createAxis(b ? "xAxis" : "yAxis", {
                    axis: a,
                    redraw: d,
                    animation: c
                })
            };
            a.prototype.addColorAxis = function (a, b, d) {
                return this.createAxis("colorAxis", {
                    axis: a,
                    redraw: b,
                    animation: d
                })
            };
            a.prototype.createAxis =
                function (a, b) {
                    a = new w(this, X(b.axis, {
                        index: this[a].length,
                        isX: "xAxis" === a
                    }));
                    T(b.redraw, !0) && this.redraw(b.animation);
                    return a
                };
            a.prototype.showLoading = function (a) {
                var b = this,
                    d = b.options,
                    c = d.loading,
                    e = function () {
                        h && Q(h, {
                            left: b.plotLeft + "px",
                            top: b.plotTop + "px",
                            width: b.plotWidth + "px",
                            height: b.plotHeight + "px"
                        })
                    },
                    h = b.loadingDiv,
                    f = b.loadingSpan;
                h || (b.loadingDiv = h = S("div", {
                    className: "highcharts-loading highcharts-loading-hidden"
                }, null, b.container));
                f || (b.loadingSpan = f = S("span", {
                        className: "highcharts-loading-inner"
                    },
                    null, h), L(b, "redraw", e));
                h.className = "highcharts-loading";
                v.setElementHTML(f, T(a, d.lang.loading, ""));
                b.styledMode || (Q(h, M(c.style, {
                    zIndex: 10
                })), Q(f, c.labelStyle), b.loadingShown || (Q(h, {
                    opacity: 0,
                    display: ""
                }), q(h, {
                    opacity: c.style.opacity || .5
                }, {
                    duration: c.showDuration || 0
                })));
                b.loadingShown = !0;
                e()
            };
            a.prototype.hideLoading = function () {
                var a = this.options,
                    b = this.loadingDiv;
                b && (b.className = "highcharts-loading highcharts-loading-hidden", this.styledMode || q(b, {
                    opacity: 0
                }, {
                    duration: a.loading.hideDuration || 100,
                    complete: function () {
                        Q(b, {
                            display: "none"
                        })
                    }
                }));
                this.loadingShown = !1
            };
            a.prototype.update = function (a, b, d, c) {
                var e = this,
                    h = {
                        credits: "addCredits",
                        title: "setTitle",
                        subtitle: "setSubtitle",
                        caption: "setCaption"
                    },
                    f = a.isResponsiveOptions,
                    g = [],
                    k, m;
                R(e, "update", {
                    options: a
                });
                f || e.setResponsive(!1, !0);
                a = P(a, e.options);
                e.userOptions = X(e.userOptions, a);
                var A = a.chart;
                if (A) {
                    X(!0, e.options.chart, A);
                    "className" in A && e.setClassName(A.className);
                    "reflow" in A && e.setReflow(A.reflow);
                    if ("inverted" in A || "polar" in A || "type" in
                        A) {
                        e.propFromSeries();
                        var p = !0
                    }
                    "alignTicks" in A && (p = !0);
                    "events" in A && B(this, A);
                    Y(A, function (a, b) {
                        -1 !== e.propsRequireUpdateSeries.indexOf("chart." + b) && (k = !0); - 1 !== e.propsRequireDirtyBox.indexOf(b) && (e.isDirtyBox = !0); - 1 !== e.propsRequireReflow.indexOf(b) && (f ? e.isDirtyBox = !0 : m = !0)
                    });
                    !e.styledMode && A.style && e.renderer.setStyle(e.options.chart.style || {})
                }!e.styledMode && a.colors && (this.options.colors = a.colors);
                a.time && (this.time === G && (this.time = new l(a.time)), X(!0, e.options.time, a.time));
                Y(a, function (b,
                    d) {
                    if (e[d] && "function" === typeof e[d].update) e[d].update(b, !1);
                    else if ("function" === typeof e[h[d]]) e[h[d]](b);
                    else "colors" !== d && -1 === e.collectionsWithUpdate.indexOf(d) && X(!0, e.options[d], a[d]);
                    "chart" !== d && -1 !== e.propsRequireUpdateSeries.indexOf(d) && (k = !0)
                });
                this.collectionsWithUpdate.forEach(function (b) {
                    if (a[b]) {
                        var c = [];
                        e[b].forEach(function (a, b) {
                            a.options.isInternal || c.push(T(a.options.index, b))
                        });
                        ba(a[b]).forEach(function (a, h) {
                            var f = V(a.id),
                                g;
                            f && (g = e.get(a.id));
                            !g && e[b] && (g = e[b][c ? c[h] : h]) && f &&
                                V(g.options.id) && (g = void 0);
                            g && g.coll === b && (g.update(a, !1), d && (g.touched = !0));
                            !g && d && e.collectionsWithInit[b] && (e.collectionsWithInit[b][0].apply(e, [a].concat(e.collectionsWithInit[b][1] || []).concat([!1])).touched = !0)
                        });
                        d && e[b].forEach(function (a) {
                            a.touched || a.options.isInternal ? delete a.touched : g.push(a)
                        })
                    }
                });
                g.forEach(function (a) {
                    a.chart && a.remove && a.remove(!1)
                });
                p && e.axes.forEach(function (a) {
                    a.update({}, !1)
                });
                k && e.getSeriesOrderByLinks().forEach(function (a) {
                    a.chart && a.update({}, !1)
                }, this);
                p = A &&
                    A.width;
                A = A && (W(A.height) ? ka(A.height, p || e.chartWidth) : A.height);
                m || U(p) && p !== e.chartWidth || U(A) && A !== e.chartHeight ? e.setSize(p, A, c) : T(b, !0) && e.redraw(c);
                R(e, "afterUpdate", {
                    options: a,
                    redraw: b,
                    animation: c
                })
            };
            a.prototype.setSubtitle = function (a, b) {
                this.applyDescription("subtitle", a);
                this.layOutTitles(b)
            };
            a.prototype.setCaption = function (a, b) {
                this.applyDescription("caption", a);
                this.layOutTitles(b)
            };
            a.prototype.showResetZoom = function () {
                function a() {
                    b.zoomOut()
                }
                var b = this,
                    d = p.lang,
                    c = b.options.chart.resetZoomButton,
                    e = c.theme,
                    h = e.states,
                    f = "chart" === c.relativeTo || "spacingBox" === c.relativeTo ? null : "scrollablePlotBox";
                R(this, "beforeShowResetZoom", null, function () {
                    b.resetZoomButton = b.renderer.button(d.resetZoom, null, null, a, e, h && h.hover).attr({
                        align: c.position.align,
                        title: d.resetZoomTitle
                    }).addClass("highcharts-reset-zoom").add().align(c.position, !1, f)
                });
                R(this, "afterShowResetZoom")
            };
            a.prototype.zoomOut = function () {
                R(this, "selection", {
                    resetSelection: !0
                }, this.zoom)
            };
            a.prototype.zoom = function (a) {
                var b = this,
                    d = b.pointer,
                    c = b.inverted ? d.mouseDownX : d.mouseDownY,
                    e = !1,
                    h;
                !a || a.resetSelection ? (b.axes.forEach(function (a) {
                    h = a.zoom()
                }), d.initiated = !1) : a.xAxis.concat(a.yAxis).forEach(function (a) {
                    var f = a.axis,
                        g = b.inverted ? f.left : f.top,
                        k = b.inverted ? g + f.width : g + f.height,
                        l = f.isXAxis,
                        A = !1;
                    if (!l && c >= g && c <= k || l || !V(c)) A = !0;
                    d[l ? "zoomX" : "zoomY"] && A && (h = f.zoom(a.min, a.max), f.displayBtn && (e = !0))
                });
                var f = b.resetZoomButton;
                e && !f ? b.showResetZoom() : !e && N(f) && (b.resetZoomButton = f.destroy());
                h && b.redraw(T(b.options.chart.animation, a && a.animation,
                    100 > b.pointCount))
            };
            a.prototype.pan = function (a, b) {
                var d = this,
                    c = d.hoverPoints;
                b = "object" === typeof b ? b : {
                    enabled: b,
                    type: "x"
                };
                var e = d.options.chart,
                    h = d.options.mapNavigation && d.options.mapNavigation.enabled;
                e && e.panning && (e.panning = b);
                var f = b.type,
                    g;
                R(this, "pan", {
                    originalEvent: a
                }, function () {
                    c && c.forEach(function (a) {
                        a.setState()
                    });
                    var b = d.xAxis;
                    "xy" === f ? b = b.concat(d.yAxis) : "y" === f && (b = d.yAxis);
                    var e = {};
                    b.forEach(function (b) {
                        if (b.options.panningEnabled && !b.options.isInternal) {
                            var c = b.horiz,
                                k = a[c ? "chartX" :
                                    "chartY"];
                            c = c ? "mouseDownX" : "mouseDownY";
                            var l = d[c],
                                A = b.minPointOffset || 0,
                                m = b.reversed && !d.inverted || !b.reversed && d.inverted ? -1 : 1,
                                p = b.getExtremes(),
                                n = b.toValue(l - k, !0) + A * m,
                                q = b.toValue(l + b.len - k, !0) - (A * m || b.isXAxis && b.pointRangePadding || 0),
                                t = q < n;
                            m = b.hasVerticalPanning();
                            l = t ? q : n;
                            n = t ? n : q;
                            var N = b.panningState;
                            !m || b.isXAxis || N && !N.isDirty || b.series.forEach(function (a) {
                                var b = a.getProcessedData(!0);
                                b = a.getExtremes(b.yData, !0);
                                N || (N = {
                                    startMin: Number.MAX_VALUE,
                                    startMax: -Number.MAX_VALUE
                                });
                                U(b.dataMin) && U(b.dataMax) &&
                                    (N.startMin = Math.min(T(a.options.threshold, Infinity), b.dataMin, N.startMin), N.startMax = Math.max(T(a.options.threshold, -Infinity), b.dataMax, N.startMax))
                            });
                            m = Math.min(T(N && N.startMin, p.dataMin), A ? p.min : b.toValue(b.toPixels(p.min) - b.minPixelPadding));
                            q = Math.max(T(N && N.startMax, p.dataMax), A ? p.max : b.toValue(b.toPixels(p.max) + b.minPixelPadding));
                            b.panningState = N;
                            b.isOrdinal || (A = m - l, 0 < A && (n += A, l = m), A = n - q, 0 < A && (n = q, l -= A), b.series.length && l !== p.min && n !== p.max && l >= m && n <= q && (b.setExtremes(l, n, !1, !1, {
                                    trigger: "pan"
                                }),
                                d.resetZoomButton || h || l === m || n === q || !f.match("y") || (d.showResetZoom(), b.displayBtn = !1), g = !0), e[c] = k)
                        }
                    });
                    Y(e, function (a, b) {
                        d[b] = a
                    });
                    g && d.redraw(!1);
                    Q(d.container, {
                        cursor: "move"
                    })
                })
            };
            return a
        }();
        M(a.prototype, {
            callbacks: [],
            collectionsWithInit: {
                xAxis: [a.prototype.addAxis, [!0]],
                yAxis: [a.prototype.addAxis, [!1]],
                series: [a.prototype.addSeries]
            },
            collectionsWithUpdate: ["xAxis", "yAxis", "series"],
            propsRequireDirtyBox: "backgroundColor borderColor borderWidth borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
            propsRequireReflow: "margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft".split(" "),
            propsRequireUpdateSeries: "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(" ")
        });
        "";
        return a
    });
    M(a, "Core/Legend/LegendSymbol.js", [a["Core/Utilities.js"]], function (a) {
        var r = a.merge,
            C = a.pick,
            E;
        (function (a) {
            a.drawLineMarker = function (a) {
                var x = this.options,
                    u = a.symbolWidth,
                    n = a.symbolHeight,
                    m = n / 2,
                    g = this.chart.renderer,
                    c = this.legendGroup;
                a = a.baseline - Math.round(.3 * a.fontMetrics.b);
                var e = {},
                    l = x.marker;
                this.chart.styledMode || (e = {
                    "stroke-width": x.lineWidth || 0
                }, x.dashStyle && (e.dashstyle = x.dashStyle));
                this.legendLine = g.path([
                    ["M", 0, a],
                    ["L", u, a]
                ]).addClass("highcharts-graph").attr(e).add(c);
                l && !1 !== l.enabled && u && (x = Math.min(C(l.radius, m), m), 0 === this.symbol.indexOf("url") && (l = r(l, {
                    width: n,
                    height: n
                }), x = 0), this.legendSymbol = u = g.symbol(this.symbol, u / 2 - x, a - x, 2 * x, 2 * x, l).addClass("highcharts-point").add(c), u.isMarker = !0)
            };
            a.drawRectangle =
                function (a, r) {
                    var u = a.symbolHeight,
                        n = a.options.squareSymbol;
                    r.legendSymbol = this.chart.renderer.rect(n ? (a.symbolWidth - u) / 2 : 0, a.baseline - u + 1, n ? u : a.symbolWidth, u, C(a.options.symbolRadius, u / 2)).addClass("highcharts-point").attr({
                        zIndex: 3
                    }).add(r.legendGroup)
                }
        })(E || (E = {}));
        return E
    });
    M(a, "Core/Series/SeriesDefaults.js", [a["Core/Color/Palette.js"]], function (a) {
        return {
            lineWidth: 2,
            allowPointSelect: !1,
            crisp: !0,
            showCheckbox: !1,
            animation: {
                duration: 1E3
            },
            events: {},
            marker: {
                enabledThreshold: 2,
                lineColor: a.backgroundColor,
                lineWidth: 0,
                radius: 4,
                states: {
                    normal: {
                        animation: !0
                    },
                    hover: {
                        animation: {
                            duration: 50
                        },
                        enabled: !0,
                        radiusPlus: 2,
                        lineWidthPlus: 1
                    },
                    select: {
                        fillColor: a.neutralColor20,
                        lineColor: a.neutralColor100,
                        lineWidth: 2
                    }
                }
            },
            point: {
                events: {}
            },
            dataLabels: {
                animation: {},
                align: "center",
                defer: !0,
                formatter: function () {
                    var a = this.series.chart.numberFormatter;
                    return "number" !== typeof this.y ? "" : a(this.y, -1)
                },
                padding: 5,
                style: {
                    fontSize: "11px",
                    fontWeight: "bold",
                    color: "contrast",
                    textOutline: "1px contrast"
                },
                verticalAlign: "bottom",
                x: 0,
                y: 0
            },
            cropThreshold: 300,
            opacity: 1,
            pointRange: 0,
            softThreshold: !0,
            states: {
                normal: {
                    animation: !0
                },
                hover: {
                    animation: {
                        duration: 50
                    },
                    lineWidthPlus: 1,
                    marker: {},
                    halo: {
                        size: 10,
                        opacity: .25
                    }
                },
                select: {
                    animation: {
                        duration: 0
                    }
                },
                inactive: {
                    animation: {
                        duration: 50
                    },
                    opacity: .2
                }
            },
            stickyTracking: !0,
            turboThreshold: 1E3,
            findNearestPointBy: "x"
        }
    });
    M(a, "Core/Series/Series.js", [a["Core/Animation/AnimationUtilities.js"], a["Core/DefaultOptions.js"], a["Core/Foundation.js"], a["Core/Globals.js"], a["Core/Legend/LegendSymbol.js"], a["Core/Color/Palette.js"],
        a["Core/Series/Point.js"], a["Core/Series/SeriesDefaults.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Renderer/SVG/SVGElement.js"], a["Core/Utilities.js"]
    ], function (a, w, C, E, z, x, J, u, n, m, g) {
        var c = a.animObject,
            e = a.setAnimation,
            l = w.defaultOptions,
            f = C.registerEventOptions,
            v = E.hasTouch,
            q = E.svg,
            k = E.win,
            r = n.seriesTypes,
            D = g.addEvent,
            B = g.arrayMax,
            O = g.arrayMin,
            t = g.clamp,
            h = g.cleanRecursively,
            d = g.correctFloat,
            b = g.defined,
            p = g.erase,
            G = g.error,
            y = g.extend,
            L = g.find,
            F = g.fireEvent,
            P = g.getNestedProperty,
            S = g.isArray,
            Q = g.isNumber,
            V = g.isString,
            M = g.merge,
            H = g.objectEach,
            K = g.pick,
            la = g.removeEvent,
            ha = g.splat,
            R = g.syncTimeout;
        a = function () {
            function a() {
                this.zones = this.yAxis = this.xAxis = this.userOptions = this.tooltipOptions = this.processedYData = this.processedXData = this.points = this.options = this.linkedSeries = this.index = this.eventsToUnbind = this.eventOptions = this.data = this.chart = this._i = void 0
            }
            a.prototype.init = function (a, b) {
                F(this, "init", {
                    options: b
                });
                var d = this,
                    c = a.series;
                this.eventsToUnbind = [];
                d.chart = a;
                d.options = d.setOptions(b);
                b = d.options;
                d.linkedSeries = [];
                d.bindAxes();
                y(d, {
                    name: b.name,
                    state: "",
                    visible: !1 !== b.visible,
                    selected: !0 === b.selected
                });
                f(this, b);
                var e = b.events;
                if (e && e.click || b.point && b.point.events && b.point.events.click || b.allowPointSelect) a.runTrackerClick = !0;
                d.getColor();
                d.getSymbol();
                d.parallelArrays.forEach(function (a) {
                    d[a + "Data"] || (d[a + "Data"] = [])
                });
                d.isCartesian && (a.hasCartesianSeries = !0);
                var h;
                c.length && (h = c[c.length - 1]);
                d._i = K(h && h._i, -1) + 1;
                d.opacity = d.options.opacity;
                a.orderSeries(this.insert(c));
                b.dataSorting &&
                    b.dataSorting.enabled ? d.setDataSortingOptions() : d.points || d.data || d.setData(b.data, !1);
                F(this, "afterInit")
            };
            a.prototype.is = function (a) {
                return r[a] && this instanceof r[a]
            };
            a.prototype.insert = function (a) {
                var b = this.options.index,
                    d;
                if (Q(b)) {
                    for (d = a.length; d--;)
                        if (b >= K(a[d].options.index, a[d]._i)) {
                            a.splice(d + 1, 0, this);
                            break
                        } - 1 === d && a.unshift(this);
                    d += 1
                } else a.push(this);
                return K(d, a.length - 1)
            };
            a.prototype.bindAxes = function () {
                var a = this,
                    b = a.options,
                    d = a.chart,
                    c;
                F(this, "bindAxes", null, function () {
                    (a.axisTypes || []).forEach(function (e) {
                        var h = 0;
                        d[e].forEach(function (d) {
                            c = d.options;
                            if (b[e] === h && !c.isInternal || "undefined" !== typeof b[e] && b[e] === c.id || "undefined" === typeof b[e] && 0 === c.index) a.insert(d.series), a[e] = d, d.isDirty = !0;
                            c.isInternal || h++
                        });
                        a[e] || a.optionalAxis === e || G(18, !0, d)
                    })
                });
                F(this, "afterBindAxes")
            };
            a.prototype.updateParallelArrays = function (a, b) {
                var d = a.series,
                    c = arguments,
                    e = Q(b) ? function (c) {
                        var e = "y" === c && d.toYData ? d.toYData(a) : a[c];
                        d[c + "Data"][b] = e
                    } : function (a) {
                        Array.prototype[b].apply(d[a + "Data"],
                            Array.prototype.slice.call(c, 2))
                    };
                d.parallelArrays.forEach(e)
            };
            a.prototype.hasData = function () {
                return this.visible && "undefined" !== typeof this.dataMax && "undefined" !== typeof this.dataMin || this.visible && this.yData && 0 < this.yData.length
            };
            a.prototype.autoIncrement = function (a) {
                var b = this.options,
                    d = b.pointIntervalUnit,
                    c = b.relativeXValue,
                    e = this.chart.time,
                    h = this.xIncrement,
                    f;
                h = K(h, b.pointStart, 0);
                this.pointInterval = f = K(this.pointInterval, b.pointInterval, 1);
                c && Q(a) && (f *= a);
                d && (b = new e.Date(h), "day" === d ? e.set("Date",
                    b, e.get("Date", b) + f) : "month" === d ? e.set("Month", b, e.get("Month", b) + f) : "year" === d && e.set("FullYear", b, e.get("FullYear", b) + f), f = b.getTime() - h);
                if (c && Q(a)) return h + f;
                this.xIncrement = h + f;
                return h
            };
            a.prototype.setDataSortingOptions = function () {
                var a = this.options;
                y(this, {
                    requireSorting: !1,
                    sorted: !1,
                    enabledDataSorting: !0,
                    allowDG: !1
                });
                b(a.pointRange) || (a.pointRange = 1)
            };
            a.prototype.setOptions = function (a) {
                var d = this.chart,
                    c = d.options,
                    e = c.plotOptions,
                    h = d.userOptions || {};
                a = M(a);
                d = d.styledMode;
                var f = {
                    plotOptions: e,
                    userOptions: a
                };
                F(this, "setOptions", f);
                var g = f.plotOptions[this.type],
                    k = h.plotOptions || {};
                this.userOptions = f.userOptions;
                h = M(g, e.series, h.plotOptions && h.plotOptions[this.type], a);
                this.tooltipOptions = M(l.tooltip, l.plotOptions.series && l.plotOptions.series.tooltip, l.plotOptions[this.type].tooltip, c.tooltip.userOptions, e.series && e.series.tooltip, e[this.type].tooltip, a.tooltip);
                this.stickyTracking = K(a.stickyTracking, k[this.type] && k[this.type].stickyTracking, k.series && k.series.stickyTracking, this.tooltipOptions.shared &&
                    !this.noSharedTooltip ? !0 : h.stickyTracking);
                null === g.marker && delete h.marker;
                this.zoneAxis = h.zoneAxis;
                e = this.zones = (h.zones || []).slice();
                !h.negativeColor && !h.negativeFillColor || h.zones || (c = {
                    value: h[this.zoneAxis + "Threshold"] || h.threshold || 0,
                    className: "highcharts-negative"
                }, d || (c.color = h.negativeColor, c.fillColor = h.negativeFillColor), e.push(c));
                e.length && b(e[e.length - 1].value) && e.push(d ? {} : {
                    color: this.color,
                    fillColor: this.fillColor
                });
                F(this, "afterSetOptions", {
                    options: h
                });
                return h
            };
            a.prototype.getName =
                function () {
                    return K(this.options.name, "Series " + (this.index + 1))
                };
            a.prototype.getCyclic = function (a, d, c) {
                var e = this.chart,
                    h = this.userOptions,
                    f = a + "Index",
                    g = a + "Counter",
                    k = c ? c.length : K(e.options.chart[a + "Count"], e[a + "Count"]);
                if (!d) {
                    var l = K(h[f], h["_" + f]);
                    b(l) || (e.series.length || (e[g] = 0), h["_" + f] = l = e[g] % k, e[g] += 1);
                    c && (d = c[l])
                }
                "undefined" !== typeof l && (this[f] = l);
                this[a] = d
            };
            a.prototype.getColor = function () {
                this.chart.styledMode ? this.getCyclic("color") : this.options.colorByPoint ? this.color = x.neutralColor20 :
                    this.getCyclic("color", this.options.color || l.plotOptions[this.type].color, this.chart.options.colors)
            };
            a.prototype.getPointsCollection = function () {
                return (this.hasGroupedData ? this.points : this.data) || []
            };
            a.prototype.getSymbol = function () {
                this.getCyclic("symbol", this.options.marker.symbol, this.chart.options.symbols)
            };
            a.prototype.findPointIndex = function (a, b) {
                var d = a.id,
                    c = a.x,
                    e = this.points,
                    h = this.options.dataSorting,
                    f, g;
                if (d) h = this.chart.get(d), h instanceof J && (f = h);
                else if (this.linkedParent || this.enabledDataSorting ||
                    this.options.relativeXValue)
                    if (f = function (b) {
                            return !b.touched && b.index === a.index
                        }, h && h.matchByName ? f = function (b) {
                            return !b.touched && b.name === a.name
                        } : this.options.relativeXValue && (f = function (b) {
                            return !b.touched && b.options.x === a.x
                        }), f = L(e, f), !f) return;
                if (f) {
                    var k = f && f.index;
                    "undefined" !== typeof k && (g = !0)
                }
                "undefined" === typeof k && Q(c) && (k = this.xData.indexOf(c, b)); - 1 !== k && "undefined" !== typeof k && this.cropped && (k = k >= this.cropStart ? k - this.cropStart : k);
                !g && Q(k) && e[k] && e[k].touched && (k = void 0);
                return k
            };
            a.prototype.updateData =
                function (a, d) {
                    var c = this.options,
                        e = c.dataSorting,
                        h = this.points,
                        f = [],
                        g = this.requireSorting,
                        k = a.length === h.length,
                        l, m, A, p = !0;
                    this.xIncrement = null;
                    a.forEach(function (a, d) {
                            var m = b(a) && this.pointClass.prototype.optionsToObject.call({
                                    series: this
                                }, a) || {},
                                p = m.x;
                            if (m.id || Q(p)) {
                                if (m = this.findPointIndex(m, A), -1 === m || "undefined" === typeof m ? f.push(a) : h[m] && a !== c.data[m] ? (h[m].update(a, !1, null, !1), h[m].touched = !0, g && (A = m + 1)) : h[m] && (h[m].touched = !0), !k || d !== m || e && e.enabled || this.hasDerivedData) l = !0
                            } else f.push(a)
                        },
                        this);
                    if (l)
                        for (a = h.length; a--;)(m = h[a]) && !m.touched && m.remove && m.remove(!1, d);
                    else !k || e && e.enabled ? p = !1 : (a.forEach(function (a, b) {
                        a !== h[b].y && h[b].update && h[b].update(a, !1, null, !1)
                    }), f.length = 0);
                    h.forEach(function (a) {
                        a && (a.touched = !1)
                    });
                    if (!p) return !1;
                    f.forEach(function (a) {
                        this.addPoint(a, !1, null, null, !1)
                    }, this);
                    null === this.xIncrement && this.xData && this.xData.length && (this.xIncrement = B(this.xData), this.autoIncrement());
                    return !0
                };
            a.prototype.setData = function (a, b, d, c) {
                var e = this,
                    h = e.points,
                    f = h && h.length ||
                    0,
                    g = e.options,
                    k = e.chart,
                    l = g.dataSorting,
                    m = e.xAxis,
                    A = g.turboThreshold,
                    p = this.xData,
                    n = this.yData,
                    q = e.pointArrayMap;
                q = q && q.length;
                var t = g.keys,
                    v, r = 0,
                    B = 1,
                    y = null;
                a = a || [];
                var N = a.length;
                b = K(b, !0);
                l && l.enabled && (a = this.sortData(a));
                !1 !== c && N && f && !e.cropped && !e.hasGroupedData && e.visible && !e.isSeriesBoosting && (v = this.updateData(a, d));
                if (!v) {
                    e.xIncrement = null;
                    e.colorCounter = 0;
                    this.parallelArrays.forEach(function (a) {
                        e[a + "Data"].length = 0
                    });
                    if (A && N > A)
                        if (y = e.getFirstValidPoint(a), Q(y))
                            for (d = 0; d < N; d++) p[d] = this.autoIncrement(),
                                n[d] = a[d];
                        else if (S(y))
                        if (q)
                            for (d = 0; d < N; d++) c = a[d], p[d] = c[0], n[d] = c.slice(1, q + 1);
                        else
                            for (t && (r = t.indexOf("x"), B = t.indexOf("y"), r = 0 <= r ? r : 0, B = 0 <= B ? B : 1), d = 0; d < N; d++) c = a[d], p[d] = c[r], n[d] = c[B];
                    else G(12, !1, k);
                    else
                        for (d = 0; d < N; d++) "undefined" !== typeof a[d] && (c = {
                            series: e
                        }, e.pointClass.prototype.applyOptions.apply(c, [a[d]]), e.updateParallelArrays(c, d));
                    n && V(n[0]) && G(14, !0, k);
                    e.data = [];
                    e.options.data = e.userOptions.data = a;
                    for (d = f; d--;) h[d] && h[d].destroy && h[d].destroy();
                    m && (m.minRange = m.userMinRange);
                    e.isDirty =
                        k.isDirtyBox = !0;
                    e.isDirtyData = !!h;
                    d = !1
                }
                "point" === g.legendType && (this.processData(), this.generatePoints());
                b && k.redraw(d)
            };
            a.prototype.sortData = function (a) {
                var d = this,
                    c = d.options.dataSorting.sortKey || "y",
                    e = function (a, d) {
                        return b(d) && a.pointClass.prototype.optionsToObject.call({
                            series: a
                        }, d) || {}
                    };
                a.forEach(function (b, c) {
                    a[c] = e(d, b);
                    a[c].index = c
                }, this);
                a.concat().sort(function (a, b) {
                    a = P(c, a);
                    b = P(c, b);
                    return b < a ? -1 : b > a ? 1 : 0
                }).forEach(function (a, b) {
                    a.x = b
                }, this);
                d.linkedSeries && d.linkedSeries.forEach(function (b) {
                    var d =
                        b.options,
                        c = d.data;
                    d.dataSorting && d.dataSorting.enabled || !c || (c.forEach(function (d, h) {
                        c[h] = e(b, d);
                        a[h] && (c[h].x = a[h].x, c[h].index = h)
                    }), b.setData(c, !1))
                });
                return a
            };
            a.prototype.getProcessedData = function (a) {
                var b = this.xAxis,
                    d = this.options,
                    c = d.cropThreshold,
                    e = a || this.getExtremesFromAll || d.getExtremesFromAll,
                    h = this.isCartesian;
                a = b && b.val2lin;
                d = !(!b || !b.logarithmic);
                var f = 0,
                    g = this.xData,
                    k = this.yData,
                    l = this.requireSorting;
                var m = !1;
                var A = g.length;
                if (b) {
                    m = b.getExtremes();
                    var p = m.min;
                    var n = m.max;
                    m = b.categories &&
                        !b.names.length
                }
                if (h && this.sorted && !e && (!c || A > c || this.forceCrop))
                    if (g[A - 1] < p || g[0] > n) g = [], k = [];
                    else if (this.yData && (g[0] < p || g[A - 1] > n)) {
                    var q = this.cropData(this.xData, this.yData, p, n);
                    g = q.xData;
                    k = q.yData;
                    f = q.start;
                    q = !0
                }
                for (c = g.length || 1; --c;)
                    if (b = d ? a(g[c]) - a(g[c - 1]) : g[c] - g[c - 1], 0 < b && ("undefined" === typeof t || b < t)) var t = b;
                    else 0 > b && l && !m && (G(15, !1, this.chart), l = !1);
                return {
                    xData: g,
                    yData: k,
                    cropped: q,
                    cropStart: f,
                    closestPointRange: t
                }
            };
            a.prototype.processData = function (a) {
                var b = this.xAxis;
                if (this.isCartesian &&
                    !this.isDirty && !b.isDirty && !this.yAxis.isDirty && !a) return !1;
                a = this.getProcessedData();
                this.cropped = a.cropped;
                this.cropStart = a.cropStart;
                this.processedXData = a.xData;
                this.processedYData = a.yData;
                this.closestPointRange = this.basePointRange = a.closestPointRange
            };
            a.prototype.cropData = function (a, b, d, c, e) {
                var h = a.length,
                    f, g = 0,
                    k = h;
                e = K(e, this.cropShoulder);
                for (f = 0; f < h; f++)
                    if (a[f] >= d) {
                        g = Math.max(0, f - e);
                        break
                    } for (d = f; d < h; d++)
                    if (a[d] > c) {
                        k = d + e;
                        break
                    } return {
                    xData: a.slice(g, k),
                    yData: b.slice(g, k),
                    start: g,
                    end: k
                }
            };
            a.prototype.generatePoints =
                function () {
                    var a = this.options,
                        b = a.data,
                        d = this.processedXData,
                        c = this.processedYData,
                        e = this.pointClass,
                        h = d.length,
                        f = this.cropStart || 0,
                        g = this.hasGroupedData,
                        k = a.keys,
                        l = [];
                    a = a.dataGrouping && a.dataGrouping.groupAll ? f : 0;
                    var m, p, n = this.data;
                    if (!n && !g) {
                        var q = [];
                        q.length = b.length;
                        n = this.data = q
                    }
                    k && g && (this.options.keys = !1);
                    for (p = 0; p < h; p++) {
                        q = f + p;
                        if (g) {
                            var t = (new e).init(this, [d[p]].concat(ha(c[p])));
                            t.dataGroup = this.groupMap[a + p];
                            t.dataGroup.options && (t.options = t.dataGroup.options, y(t, t.dataGroup.options),
                                delete t.dataLabels)
                        } else(t = n[q]) || "undefined" === typeof b[q] || (n[q] = t = (new e).init(this, b[q], d[p]));
                        t && (t.index = g ? a + p : q, l[p] = t)
                    }
                    this.options.keys = k;
                    if (n && (h !== (m = n.length) || g))
                        for (p = 0; p < m; p++) p !== f || g || (p += h), n[p] && (n[p].destroyElements(), n[p].plotX = void 0);
                    this.data = n;
                    this.points = l;
                    F(this, "afterGeneratePoints")
                };
            a.prototype.getXExtremes = function (a) {
                return {
                    min: O(a),
                    max: B(a)
                }
            };
            a.prototype.getExtremes = function (a, b) {
                var d = this.xAxis,
                    c = this.yAxis,
                    e = this.processedXData || this.xData,
                    h = [],
                    f = this.requireSorting ?
                    this.cropShoulder : 0;
                c = c ? c.positiveValuesOnly : !1;
                var g, k = 0,
                    l = 0,
                    m = 0;
                a = a || this.stackedYData || this.processedYData || [];
                var p = a.length;
                if (d) {
                    var n = d.getExtremes();
                    k = n.min;
                    l = n.max
                }
                for (g = 0; g < p; g++) {
                    var A = e[g];
                    n = a[g];
                    var q = (Q(n) || S(n)) && (n.length || 0 < n || !c);
                    A = b || this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || !d || (e[g + f] || A) >= k && (e[g - f] || A) <= l;
                    if (q && A)
                        if (q = n.length)
                            for (; q--;) Q(n[q]) && (h[m++] = n[q]);
                        else h[m++] = n
                }
                a = {
                    dataMin: O(h),
                    dataMax: B(h)
                };
                F(this, "afterGetExtremes", {
                    dataExtremes: a
                });
                return a
            };
            a.prototype.applyExtremes = function () {
                var a = this.getExtremes();
                this.dataMin = a.dataMin;
                this.dataMax = a.dataMax;
                return a
            };
            a.prototype.getFirstValidPoint = function (a) {
                for (var b = a.length, d = 0, c = null; null === c && d < b;) c = a[d], d++;
                return c
            };
            a.prototype.translate = function () {
                this.processedXData || this.processData();
                this.generatePoints();
                var a = this.options,
                    c = a.stacking,
                    e = this.xAxis,
                    h = e.categories,
                    f = this.enabledDataSorting,
                    g = this.yAxis,
                    k = this.points,
                    l = k.length,
                    m = !!this.modifyValue,
                    p = this.pointPlacementToXValue(),
                    n = !!p,
                    q = a.threshold,
                    v = a.startFromThreshold ? q : 0,
                    r = this.zoneAxis || "y",
                    B, y, I = Number.MAX_VALUE;
                for (B = 0; B < l; B++) {
                    var D = k[B],
                        u = D.x,
                        G = void 0,
                        x = void 0,
                        w = D.y,
                        L = D.low,
                        z = c && g.stacking && g.stacking.stacks[(this.negStacks && w < (v ? 0 : q) ? "-" : "") + this.stackKey];
                    if (g.positiveValuesOnly && !g.validatePositiveValue(w) || e.positiveValuesOnly && !e.validatePositiveValue(u)) D.isNull = !0;
                    D.plotX = y = d(t(e.translate(u, 0, 0, 0, 1, p, "flags" === this.type), -1E5, 1E5));
                    if (c && this.visible && z && z[u]) {
                        var C = this.getStackIndicator(C, u, this.index);
                        D.isNull || (G = z[u], x = G.points[C.key])
                    }
                    S(x) && (L = x[0], w = x[1], L === v && C.key === z[u].base && (L = K(Q(q) && q, g.min)), g.positiveValuesOnly && 0 >= L && (L = null), D.total = D.stackTotal = G.total, D.percentage = G.total && D.y / G.total * 100, D.stackY = w, this.irregularWidths || G.setOffset(this.pointXOffset || 0, this.barW || 0));
                    D.yBottom = b(L) ? t(g.translate(L, 0, 1, 0, 1), -1E5, 1E5) : null;
                    m && (w = this.modifyValue(w, D));
                    D.plotY = void 0;
                    Q(w) && (G = g.translate(w, !1, !0, !1, !0), "undefined" !== typeof G && (D.plotY = t(G, -1E5, 1E5)));
                    D.isInside = this.isPointInside(D);
                    D.clientX = n ? d(e.translate(u, 0, 0, 0, 1, p)) : y;
                    D.negative = D[r] < (a[r + "Threshold"] || q || 0);
                    D.category = h && "undefined" !== typeof h[D.x] ? h[D.x] : D.x;
                    if (!D.isNull && !1 !== D.visible) {
                        "undefined" !== typeof H && (I = Math.min(I, Math.abs(y - H)));
                        var H = y
                    }
                    D.zone = this.zones.length && D.getZone();
                    !D.graphic && this.group && f && (D.isNew = !0)
                }
                this.closestPointRangePx = I;
                F(this, "afterTranslate")
            };
            a.prototype.getValidPoints = function (a, b, d) {
                var c = this.chart;
                return (a || this.points || []).filter(function (a) {
                    return b && !c.isInsidePlot(a.plotX, a.plotY, {
                        inverted: c.inverted
                    }) ? !1 : !1 !== a.visible && (d || !a.isNull)
                })
            };
            a.prototype.getClipBox = function (a, b) {
                var d = this.options,
                    c = this.chart,
                    e = c.inverted,
                    h = this.xAxis,
                    f = h && this.yAxis,
                    g = c.options.chart.scrollablePlotArea || {};
                a && !1 === d.clip && f ? a = e ? {
                    y: -c.chartWidth + f.len + f.pos,
                    height: c.chartWidth,
                    width: c.chartHeight,
                    x: -c.chartHeight + h.len + h.pos
                } : {
                    y: -f.pos,
                    height: c.chartHeight,
                    width: c.chartWidth,
                    x: -h.pos
                } : (a = this.clipBox || c.clipBox, b && (a.width = c.plotSizeX, a.x = (c.scrollablePixelsX || 0) * (g.scrollPositionX || 0)));
                return b ? {
                    width: a.width,
                    x: a.x
                } : a
            };
            a.prototype.getSharedClipKey = function (a) {
                if (this.sharedClipKey) return this.sharedClipKey;
                var b = [a && a.duration, a && a.easing, a && a.defer, this.getClipBox(a).height, this.options.xAxis, this.options.yAxis].join();
                if (!1 !== this.options.clip || a) this.sharedClipKey = b;
                return b
            };
            a.prototype.setClip = function (a) {
                var b = this.chart,
                    d = this.options,
                    c = b.renderer,
                    e = b.inverted,
                    h = this.clipBox,
                    f = this.getClipBox(a),
                    g = this.getSharedClipKey(a),
                    k = b.sharedClips[g],
                    l = b.sharedClips[g + "m"];
                a && (f.width = 0, e &&
                    (f.x = b.plotHeight + (!1 !== d.clip ? 0 : b.plotTop)));
                k ? b.hasLoaded || k.attr(f) : (a && (b.sharedClips[g + "m"] = l = c.clipRect(e ? (b.plotSizeX || 0) + 99 : -99, e ? -b.plotLeft : -b.plotTop, 99, e ? b.chartWidth : b.chartHeight)), b.sharedClips[g] = k = c.clipRect(f), k.count = {
                    length: 0
                });
                a && !k.count[this.index] && (k.count[this.index] = !0, k.count.length += 1);
                if (!1 !== d.clip || a) this.group.clip(a || h ? k : b.clipRect), this.markerGroup.clip(l);
                a || (k.count[this.index] && (delete k.count[this.index], --k.count.length), 0 === k.count.length && (h || (b.sharedClips[g] =
                    k.destroy()), l && (b.sharedClips[g + "m"] = l.destroy())))
            };
            a.prototype.animate = function (a) {
                var b = this.chart,
                    d = c(this.options.animation),
                    e = this.sharedClipKey;
                if (a) this.setClip(d);
                else if (e) {
                    a = b.sharedClips[e];
                    e = b.sharedClips[e + "m"];
                    var h = this.getClipBox(d, !0);
                    a && a.animate(h, d);
                    e && e.animate({
                        width: h.width + 99,
                        x: h.x - (b.inverted ? 0 : 99)
                    }, d)
                }
            };
            a.prototype.afterAnimate = function () {
                this.setClip();
                F(this, "afterAnimate");
                this.finishedAnimating = !0
            };
            a.prototype.drawPoints = function () {
                var a = this.points,
                    b = this.chart,
                    d =
                    this.options.marker,
                    c = this[this.specialGroup] || this.markerGroup,
                    e = this.xAxis,
                    h = K(d.enabled, !e || e.isRadial ? !0 : null, this.closestPointRangePx >= d.enabledThreshold * d.radius),
                    f, g;
                if (!1 !== d.enabled || this._hasPointMarkers)
                    for (f = 0; f < a.length; f++) {
                        var k = a[f];
                        var l = (g = k.graphic) ? "animate" : "attr";
                        var m = k.marker || {};
                        var p = !!k.marker;
                        if ((h && "undefined" === typeof m.enabled || m.enabled) && !k.isNull && !1 !== k.visible) {
                            var n = K(m.symbol, this.symbol, "rect");
                            var q = this.markerAttribs(k, k.selected && "select");
                            this.enabledDataSorting &&
                                (k.startXPos = e.reversed ? -(q.width || 0) : e.width);
                            var t = !1 !== k.isInside;
                            g ? g[t ? "show" : "hide"](t).animate(q) : t && (0 < (q.width || 0) || k.hasImage) && (k.graphic = g = b.renderer.symbol(n, q.x, q.y, q.width, q.height, p ? m : d).add(c), this.enabledDataSorting && b.hasRendered && (g.attr({
                                x: k.startXPos
                            }), l = "animate"));
                            g && "animate" === l && g[t ? "show" : "hide"](t).animate(q);
                            if (g && !b.styledMode) g[l](this.pointAttribs(k, k.selected && "select"));
                            g && g.addClass(k.getClassName(), !0)
                        } else g && (k.graphic = g.destroy())
                    }
            };
            a.prototype.markerAttribs =
                function (a, b) {
                    var d = this.options,
                        c = d.marker,
                        e = a.marker || {},
                        h = e.symbol || c.symbol,
                        f = K(e.radius, c.radius);
                    b && (c = c.states[b], b = e.states && e.states[b], f = K(b && b.radius, c && c.radius, f + (c && c.radiusPlus || 0)));
                    a.hasImage = h && 0 === h.indexOf("url");
                    a.hasImage && (f = 0);
                    a = {
                        x: d.crisp ? Math.floor(a.plotX - f) : a.plotX - f,
                        y: a.plotY - f
                    };
                    f && (a.width = a.height = 2 * f);
                    return a
                };
            a.prototype.pointAttribs = function (a, b) {
                var d = this.options.marker,
                    c = a && a.options,
                    e = c && c.marker || {},
                    h = c && c.color,
                    f = a && a.color,
                    g = a && a.zone && a.zone.color,
                    k = this.color;
                a = K(e.lineWidth, d.lineWidth);
                c = 1;
                k = h || g || f || k;
                h = e.fillColor || d.fillColor || k;
                f = e.lineColor || d.lineColor || k;
                b = b || "normal";
                d = d.states[b];
                b = e.states && e.states[b] || {};
                a = K(b.lineWidth, d.lineWidth, a + K(b.lineWidthPlus, d.lineWidthPlus, 0));
                h = b.fillColor || d.fillColor || h;
                f = b.lineColor || d.lineColor || f;
                c = K(b.opacity, d.opacity, c);
                return {
                    stroke: f,
                    "stroke-width": a,
                    fill: h,
                    opacity: c
                }
            };
            a.prototype.destroy = function (a) {
                var b = this,
                    d = b.chart,
                    c = /AppleWebKit\/533/.test(k.navigator.userAgent),
                    e = b.data || [],
                    h, f, l, n;
                F(b, "destroy");
                this.removeEvents(a);
                (b.axisTypes || []).forEach(function (a) {
                    (n = b[a]) && n.series && (p(n.series, b), n.isDirty = n.forceRedraw = !0)
                });
                b.legendItem && b.chart.legend.destroyItem(b);
                for (f = e.length; f--;)(l = e[f]) && l.destroy && l.destroy();
                b.clips && b.clips.forEach(function (a) {
                    return a.destroy()
                });
                g.clearTimeout(b.animationTimeout);
                H(b, function (a, b) {
                    a instanceof m && !a.survive && (h = c && "group" === b ? "hide" : "destroy", a[h]())
                });
                d.hoverSeries === b && (d.hoverSeries = void 0);
                p(d.series, b);
                d.orderSeries();
                H(b, function (d, c) {
                    a && "hcEvents" ===
                        c || delete b[c]
                })
            };
            a.prototype.applyZones = function () {
                var a = this,
                    b = this.chart,
                    d = b.renderer,
                    c = this.zones,
                    e = this.clips || [],
                    h = this.graph,
                    f = this.area,
                    g = Math.max(b.chartWidth, b.chartHeight),
                    k = this[(this.zoneAxis || "y") + "Axis"],
                    l = b.inverted,
                    m, p, n, q, v, r, B, y, D = !1;
                if (c.length && (h || f) && k && "undefined" !== typeof k.min) {
                    var I = k.reversed;
                    var F = k.horiz;
                    h && !this.showLine && h.hide();
                    f && f.hide();
                    var u = k.getExtremes();
                    c.forEach(function (c, A) {
                        m = I ? F ? b.plotWidth : 0 : F ? 0 : k.toPixels(u.min) || 0;
                        m = t(K(p, m), 0, g);
                        p = t(Math.round(k.toPixels(K(c.value,
                            u.max), !0) || 0), 0, g);
                        D && (m = p = k.toPixels(u.max));
                        q = Math.abs(m - p);
                        v = Math.min(m, p);
                        r = Math.max(m, p);
                        k.isXAxis ? (n = {
                            x: l ? r : v,
                            y: 0,
                            width: q,
                            height: g
                        }, F || (n.x = b.plotHeight - n.x)) : (n = {
                            x: 0,
                            y: l ? r : v,
                            width: g,
                            height: q
                        }, F && (n.y = b.plotWidth - n.y));
                        l && d.isVML && (n = k.isXAxis ? {
                            x: 0,
                            y: I ? v : r,
                            height: n.width,
                            width: b.chartWidth
                        } : {
                            x: n.y - b.plotLeft - b.spacingBox.x,
                            y: 0,
                            width: n.height,
                            height: b.chartHeight
                        });
                        e[A] ? e[A].animate(n) : e[A] = d.clipRect(n);
                        B = a["zone-area-" + A];
                        y = a["zone-graph-" + A];
                        h && y && y.clip(e[A]);
                        f && B && B.clip(e[A]);
                        D = c.value >
                            u.max;
                        a.resetZones && 0 === p && (p = void 0)
                    });
                    this.clips = e
                } else a.visible && (h && h.show(!0), f && f.show(!0))
            };
            a.prototype.invertGroups = function (a) {
                function b() {
                    ["group", "markerGroup"].forEach(function (b) {
                        d[b] && (c.renderer.isVML && d[b].attr({
                            width: d.yAxis.len,
                            height: d.xAxis.len
                        }), d[b].width = d.yAxis.len, d[b].height = d.xAxis.len, d[b].invert(d.isRadialSeries ? !1 : a))
                    })
                }
                var d = this,
                    c = d.chart;
                d.xAxis && (d.eventsToUnbind.push(D(c, "resize", b)), b(), d.invertGroups = b)
            };
            a.prototype.plotGroup = function (a, d, c, e, h) {
                var f = this[a],
                    g = !f;
                c = {
                    visibility: c,
                    zIndex: e || .1
                };
                "undefined" === typeof this.opacity || this.chart.styledMode || "inactive" === this.state || (c.opacity = this.opacity);
                g && (this[a] = f = this.chart.renderer.g().add(h));
                f.addClass("highcharts-" + d + " highcharts-series-" + this.index + " highcharts-" + this.type + "-series " + (b(this.colorIndex) ? "highcharts-color-" + this.colorIndex + " " : "") + (this.options.className || "") + (f.hasClass("highcharts-tracker") ? " highcharts-tracker" : ""), !0);
                f.attr(c)[g ? "attr" : "animate"](this.getPlotBox());
                return f
            };
            a.prototype.getPlotBox = function () {
                var a = this.chart,
                    b = this.xAxis,
                    d = this.yAxis;
                a.inverted && (b = d, d = this.xAxis);
                return {
                    translateX: b ? b.left : a.plotLeft,
                    translateY: d ? d.top : a.plotTop,
                    scaleX: 1,
                    scaleY: 1
                }
            };
            a.prototype.removeEvents = function (a) {
                a || la(this);
                this.eventsToUnbind.length && (this.eventsToUnbind.forEach(function (a) {
                    a()
                }), this.eventsToUnbind.length = 0)
            };
            a.prototype.render = function () {
                var a = this,
                    b = a.chart,
                    d = a.options,
                    e = c(d.animation),
                    h = a.visible ? "inherit" : "hidden",
                    f = d.zIndex,
                    g = a.hasRendered,
                    k = b.seriesGroup,
                    l = b.inverted,
                    m = !a.finishedAnimating && b.renderer.isSVG && e.duration;
                F(this, "render");
                var p = a.plotGroup("group", "series", h, f, k);
                a.markerGroup = a.plotGroup("markerGroup", "markers", h, f, k);
                m && a.animate && a.animate(!0);
                p.inverted = K(a.invertible, a.isCartesian) ? l : !1;
                a.drawGraph && (a.drawGraph(), a.applyZones());
                a.visible && a.drawPoints();
                a.drawDataLabels && a.drawDataLabels();
                a.redrawPoints && a.redrawPoints();
                a.drawTracker && !1 !== a.options.enableMouseTracking && a.drawTracker();
                a.invertGroups(l);
                !1 === d.clip || a.sharedClipKey ||
                    g || p.clip(b.clipRect);
                m && a.animate && a.animate();
                g || (m && e.defer && (m += e.defer), a.animationTimeout = R(function () {
                    a.afterAnimate()
                }, m || 0));
                a.isDirty = !1;
                a.hasRendered = !0;
                F(a, "afterRender")
            };
            a.prototype.redraw = function () {
                var a = this.chart,
                    b = this.isDirty || this.isDirtyData,
                    d = this.group,
                    c = this.xAxis,
                    e = this.yAxis;
                d && (a.inverted && d.attr({
                    width: a.plotWidth,
                    height: a.plotHeight
                }), d.animate({
                    translateX: K(c && c.left, a.plotLeft),
                    translateY: K(e && e.top, a.plotTop)
                }));
                this.translate();
                this.render();
                b && delete this.kdTree
            };
            a.prototype.searchPoint = function (a, b) {
                var d = this.xAxis,
                    c = this.yAxis,
                    e = this.chart.inverted;
                return this.searchKDTree({
                    clientX: e ? d.len - a.chartY + d.pos : a.chartX - d.pos,
                    plotY: e ? c.len - a.chartX + c.pos : a.chartY - c.pos
                }, b, a)
            };
            a.prototype.buildKDTree = function (a) {
                function b(a, c, e) {
                    var h = a && a.length;
                    if (h) {
                        var f = d.kdAxisArray[c % e];
                        a.sort(function (a, b) {
                            return a[f] - b[f]
                        });
                        h = Math.floor(h / 2);
                        return {
                            point: a[h],
                            left: b(a.slice(0, h), c + 1, e),
                            right: b(a.slice(h + 1), c + 1, e)
                        }
                    }
                }
                this.buildingKdTree = !0;
                var d = this,
                    c = -1 < d.options.findNearestPointBy.indexOf("y") ?
                    2 : 1;
                delete d.kdTree;
                R(function () {
                    d.kdTree = b(d.getValidPoints(null, !d.directTouch), c, c);
                    d.buildingKdTree = !1
                }, d.options.kdNow || a && "touchstart" === a.type ? 0 : 1)
            };
            a.prototype.searchKDTree = function (a, d, c) {
                function e(a, d, c, l) {
                    var m = d.point,
                        p = h.kdAxisArray[c % l],
                        n = m,
                        q = b(a[f]) && b(m[f]) ? Math.pow(a[f] - m[f], 2) : null;
                    var t = b(a[g]) && b(m[g]) ? Math.pow(a[g] - m[g], 2) : null;
                    t = (q || 0) + (t || 0);
                    m.dist = b(t) ? Math.sqrt(t) : Number.MAX_VALUE;
                    m.distX = b(q) ? Math.sqrt(q) : Number.MAX_VALUE;
                    p = a[p] - m[p];
                    t = 0 > p ? "left" : "right";
                    q = 0 > p ? "right" : "left";
                    d[t] && (t = e(a, d[t], c + 1, l), n = t[k] < n[k] ? t : m);
                    d[q] && Math.sqrt(p * p) < n[k] && (a = e(a, d[q], c + 1, l), n = a[k] < n[k] ? a : n);
                    return n
                }
                var h = this,
                    f = this.kdAxisArray[0],
                    g = this.kdAxisArray[1],
                    k = d ? "distX" : "dist";
                d = -1 < h.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                this.kdTree || this.buildingKdTree || this.buildKDTree(c);
                if (this.kdTree) return e(a, this.kdTree, d, d)
            };
            a.prototype.pointPlacementToXValue = function () {
                var a = this.options,
                    b = a.pointRange,
                    d = this.xAxis;
                a = a.pointPlacement;
                "between" === a && (a = d.reversed ? -.5 : .5);
                return Q(a) ? a * (b ||
                    d.pointRange) : 0
            };
            a.prototype.isPointInside = function (a) {
                return "undefined" !== typeof a.plotY && "undefined" !== typeof a.plotX && 0 <= a.plotY && a.plotY <= this.yAxis.len && 0 <= a.plotX && a.plotX <= this.xAxis.len
            };
            a.prototype.drawTracker = function () {
                var a = this,
                    b = a.options,
                    d = b.trackByArea,
                    c = [].concat(d ? a.areaPath : a.graphPath),
                    e = a.chart,
                    h = e.pointer,
                    f = e.renderer,
                    g = e.options.tooltip.snap,
                    k = a.tracker,
                    l = function (b) {
                        if (e.hoverSeries !== a) a.onMouseOver()
                    },
                    m = "rgba(192,192,192," + (q ? .0001 : .002) + ")";
                k ? k.attr({
                    d: c
                }) : a.graph && (a.tracker =
                    f.path(c).attr({
                        visibility: a.visible ? "visible" : "hidden",
                        zIndex: 2
                    }).addClass(d ? "highcharts-tracker-area" : "highcharts-tracker-line").add(a.group), e.styledMode || a.tracker.attr({
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        stroke: m,
                        fill: d ? m : "none",
                        "stroke-width": a.graph.strokeWidth() + (d ? 0 : 2 * g)
                    }), [a.tracker, a.markerGroup, a.dataLabelsGroup].forEach(function (a) {
                        if (a && (a.addClass("highcharts-tracker").on("mouseover", l).on("mouseout", function (a) {
                                    h.onTrackerMouseOut(a)
                                }), b.cursor && !e.styledMode && a.css({
                                    cursor: b.cursor
                                }),
                                v)) a.on("touchstart", l)
                    }));
                F(this, "afterDrawTracker")
            };
            a.prototype.addPoint = function (a, b, d, c, e) {
                var h = this.options,
                    f = this.data,
                    g = this.chart,
                    k = this.xAxis;
                k = k && k.hasNames && k.names;
                var l = h.data,
                    m = this.xData,
                    p;
                b = K(b, !0);
                var n = {
                    series: this
                };
                this.pointClass.prototype.applyOptions.apply(n, [a]);
                var q = n.x;
                var t = m.length;
                if (this.requireSorting && q < m[t - 1])
                    for (p = !0; t && m[t - 1] > q;) t--;
                this.updateParallelArrays(n, "splice", t, 0, 0);
                this.updateParallelArrays(n, t);
                k && n.name && (k[q] = n.name);
                l.splice(t, 0, a);
                p && (this.data.splice(t,
                    0, null), this.processData());
                "point" === h.legendType && this.generatePoints();
                d && (f[0] && f[0].remove ? f[0].remove(!1) : (f.shift(), this.updateParallelArrays(n, "shift"), l.shift()));
                !1 !== e && F(this, "addPoint", {
                    point: n
                });
                this.isDirtyData = this.isDirty = !0;
                b && g.redraw(c)
            };
            a.prototype.removePoint = function (a, b, d) {
                var c = this,
                    h = c.data,
                    f = h[a],
                    g = c.points,
                    k = c.chart,
                    l = function () {
                        g && g.length === h.length && g.splice(a, 1);
                        h.splice(a, 1);
                        c.options.data.splice(a, 1);
                        c.updateParallelArrays(f || {
                            series: c
                        }, "splice", a, 1);
                        f && f.destroy();
                        c.isDirty = !0;
                        c.isDirtyData = !0;
                        b && k.redraw()
                    };
                e(d, k);
                b = K(b, !0);
                f ? f.firePointEvent("remove", null, l) : l()
            };
            a.prototype.remove = function (a, b, d, c) {
                function e() {
                    h.destroy(c);
                    f.isDirtyLegend = f.isDirtyBox = !0;
                    f.linkSeries();
                    K(a, !0) && f.redraw(b)
                }
                var h = this,
                    f = h.chart;
                !1 !== d ? F(h, "remove", null, e) : e()
            };
            a.prototype.update = function (a, b) {
                a = h(a, this.userOptions);
                F(this, "update", {
                    options: a
                });
                var d = this,
                    c = d.chart,
                    e = d.userOptions,
                    f = d.initialType || d.type,
                    g = c.options.plotOptions,
                    k = r[f].prototype,
                    l = d.finishedAnimating && {
                        animation: !1
                    },
                    m = {},
                    p, n = ["eventOptions", "navigatorSeries", "baseSeries"],
                    q = a.type || e.type || c.options.chart.type,
                    t = !(this.hasDerivedData || q && q !== this.type || "undefined" !== typeof a.pointStart || "undefined" !== typeof a.pointInterval || "undefined" !== typeof a.relativeXValue || d.hasOptionChanged("dataGrouping") || d.hasOptionChanged("pointStart") || d.hasOptionChanged("pointInterval") || d.hasOptionChanged("pointIntervalUnit") || d.hasOptionChanged("keys"));
                q = q || f;
                t && (n.push("data", "isDirtyData", "points", "processedXData", "processedYData",
                    "xIncrement", "cropped", "_hasPointMarkers", "_hasPointLabels", "clips", "nodes", "layout", "mapMap", "mapData", "minY", "maxY", "minX", "maxX"), !1 !== a.visible && n.push("area", "graph"), d.parallelArrays.forEach(function (a) {
                    n.push(a + "Data")
                }), a.data && (a.dataSorting && y(d.options.dataSorting, a.dataSorting), this.setData(a.data, !1)));
                a = M(e, l, {
                    index: "undefined" === typeof e.index ? d.index : e.index,
                    pointStart: K(g && g.series && g.series.pointStart, e.pointStart, d.xData[0])
                }, !t && {
                    data: d.options.data
                }, a);
                t && a.data && (a.data = d.options.data);
                n = ["group", "markerGroup", "dataLabelsGroup", "transformGroup"].concat(n);
                n.forEach(function (a) {
                    n[a] = d[a];
                    delete d[a]
                });
                g = !1;
                if (r[q]) {
                    if (g = q !== d.type, d.remove(!1, !1, !1, !0), g)
                        if (Object.setPrototypeOf) Object.setPrototypeOf(d, r[q].prototype);
                        else {
                            l = Object.hasOwnProperty.call(d, "hcEvents") && d.hcEvents;
                            for (p in k) d[p] = void 0;
                            y(d, r[q].prototype);
                            l ? d.hcEvents = l : delete d.hcEvents
                        }
                } else G(17, !0, c, {
                    missingModuleFor: q
                });
                n.forEach(function (a) {
                    d[a] = n[a]
                });
                d.init(c, a);
                if (t && this.points) {
                    var v = d.options;
                    !1 === v.visible ?
                        (m.graphic = 1, m.dataLabel = 1) : d._hasPointLabels || (a = v.marker, k = v.dataLabels, !a || !1 !== a.enabled && (e.marker && e.marker.symbol) === a.symbol || (m.graphic = 1), k && !1 === k.enabled && (m.dataLabel = 1));
                    this.points.forEach(function (a) {
                        a && a.series && (a.resolveColor(), Object.keys(m).length && a.destroyElements(m), !1 === v.showInLegend && a.legendItem && c.legend.destroyItem(a))
                    }, this)
                }
                d.initialType = f;
                c.linkSeries();
                g && d.linkedSeries.length && (d.isDirtyData = !0);
                F(this, "afterUpdate");
                K(b, !0) && c.redraw(t ? void 0 : !1)
            };
            a.prototype.setName =
                function (a) {
                    this.name = this.options.name = this.userOptions.name = a;
                    this.chart.isDirtyLegend = !0
                };
            a.prototype.hasOptionChanged = function (a) {
                var b = this.options[a],
                    d = this.chart.options.plotOptions,
                    c = this.userOptions[a];
                return c ? b !== c : b !== K(d && d[this.type] && d[this.type][a], d && d.series && d.series[a], b)
            };
            a.prototype.onMouseOver = function () {
                var a = this.chart,
                    b = a.hoverSeries;
                a.pointer.setHoverChartIndex();
                if (b && b !== this) b.onMouseOut();
                this.options.events.mouseOver && F(this, "mouseOver");
                this.setState("hover");
                a.hoverSeries =
                    this
            };
            a.prototype.onMouseOut = function () {
                var a = this.options,
                    b = this.chart,
                    d = b.tooltip,
                    c = b.hoverPoint;
                b.hoverSeries = null;
                if (c) c.onMouseOut();
                this && a.events.mouseOut && F(this, "mouseOut");
                !d || this.stickyTracking || d.shared && !this.noSharedTooltip || d.hide();
                b.series.forEach(function (a) {
                    a.setState("", !0)
                })
            };
            a.prototype.setState = function (a, b) {
                var d = this,
                    c = d.options,
                    e = d.graph,
                    h = c.inactiveOtherPoints,
                    f = c.states,
                    g = K(f[a || "normal"] && f[a || "normal"].animation, d.chart.options.chart.animation),
                    k = c.lineWidth,
                    l = 0,
                    m = c.opacity;
                a = a || "";
                if (d.state !== a && ([d.group, d.markerGroup, d.dataLabelsGroup].forEach(function (b) {
                        b && (d.state && b.removeClass("highcharts-series-" + d.state), a && b.addClass("highcharts-series-" + a))
                    }), d.state = a, !d.chart.styledMode)) {
                    if (f[a] && !1 === f[a].enabled) return;
                    a && (k = f[a].lineWidth || k + (f[a].lineWidthPlus || 0), m = K(f[a].opacity, m));
                    if (e && !e.dashstyle)
                        for (c = {
                                "stroke-width": k
                            }, e.animate(c, g); d["zone-graph-" + l];) d["zone-graph-" + l].animate(c, g), l += 1;
                    h || [d.group, d.markerGroup, d.dataLabelsGroup, d.labelBySeries].forEach(function (a) {
                        a &&
                            a.animate({
                                opacity: m
                            }, g)
                    })
                }
                b && h && d.points && d.setAllPointsToState(a || void 0)
            };
            a.prototype.setAllPointsToState = function (a) {
                this.points.forEach(function (b) {
                    b.setState && b.setState(a)
                })
            };
            a.prototype.setVisible = function (a, b) {
                var d = this,
                    c = d.chart,
                    e = d.legendItem,
                    h = c.options.chart.ignoreHiddenSeries,
                    f = d.visible,
                    g = (d.visible = a = d.options.visible = d.userOptions.visible = "undefined" === typeof a ? !f : a) ? "show" : "hide";
                ["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"].forEach(function (a) {
                    if (d[a]) d[a][g]()
                });
                if (c.hoverSeries ===
                    d || (c.hoverPoint && c.hoverPoint.series) === d) d.onMouseOut();
                e && c.legend.colorizeItem(d, a);
                d.isDirty = !0;
                d.options.stacking && c.series.forEach(function (a) {
                    a.options.stacking && a.visible && (a.isDirty = !0)
                });
                d.linkedSeries.forEach(function (b) {
                    b.setVisible(a, !1)
                });
                h && (c.isDirtyBox = !0);
                F(d, g);
                !1 !== b && c.redraw()
            };
            a.prototype.show = function () {
                this.setVisible(!0)
            };
            a.prototype.hide = function () {
                this.setVisible(!1)
            };
            a.prototype.select = function (a) {
                this.selected = a = this.options.selected = "undefined" === typeof a ? !this.selected :
                    a;
                this.checkbox && (this.checkbox.checked = a);
                F(this, a ? "select" : "unselect")
            };
            a.prototype.shouldShowTooltip = function (a, b, d) {
                void 0 === d && (d = {});
                d.series = this;
                d.visiblePlotOnly = !0;
                return this.chart.isInsidePlot(a, b, d)
            };
            a.defaultOptions = u;
            return a
        }();
        y(a.prototype, {
            axisTypes: ["xAxis", "yAxis"],
            coll: "series",
            colorCounter: 0,
            cropShoulder: 1,
            directTouch: !1,
            drawLegendSymbol: z.drawLineMarker,
            isCartesian: !0,
            kdAxisArray: ["clientX", "plotY"],
            parallelArrays: ["x", "y"],
            pointClass: J,
            requireSorting: !0,
            sorted: !0
        });
        n.series =
            a;
        "";
        "";
        return a
    });
    M(a, "Extensions/ScrollablePlotArea.js", [a["Core/Animation/AnimationUtilities.js"], a["Core/Axis/Axis.js"], a["Core/Chart/Chart.js"], a["Core/Series/Series.js"], a["Core/Renderer/RendererRegistry.js"], a["Core/Utilities.js"]], function (a, w, C, E, z, x) {
        var r = a.stop,
            u = x.addEvent,
            n = x.createElement,
            m = x.merge,
            g = x.pick;
        u(C, "afterSetChartSize", function (a) {
            var c = this.options.chart.scrollablePlotArea,
                g = c && c.minWidth;
            c = c && c.minHeight;
            if (!this.renderer.forExport) {
                if (g) {
                    if (this.scrollablePixelsX = g = Math.max(0,
                            g - this.chartWidth)) {
                        this.scrollablePlotBox = this.renderer.scrollablePlotBox = m(this.plotBox);
                        this.plotBox.width = this.plotWidth += g;
                        this.inverted ? this.clipBox.height += g : this.clipBox.width += g;
                        var f = {
                            1: {
                                name: "right",
                                value: g
                            }
                        }
                    }
                } else c && (this.scrollablePixelsY = g = Math.max(0, c - this.chartHeight)) && (this.scrollablePlotBox = this.renderer.scrollablePlotBox = m(this.plotBox), this.plotBox.height = this.plotHeight += g, this.inverted ? this.clipBox.width += g : this.clipBox.height += g, f = {
                    2: {
                        name: "bottom",
                        value: g
                    }
                });
                f && !a.skipAxes &&
                    this.axes.forEach(function (a) {
                        f[a.side] ? a.getPlotLinePath = function () {
                            var c = f[a.side].name,
                                e = this[c];
                            this[c] = e - f[a.side].value;
                            var g = w.prototype.getPlotLinePath.apply(this, arguments);
                            this[c] = e;
                            return g
                        } : (a.setAxisSize(), a.setAxisTranslation())
                    })
            }
        });
        u(C, "render", function () {
            this.scrollablePixelsX || this.scrollablePixelsY ? (this.setUpScrolling && this.setUpScrolling(), this.applyFixed()) : this.fixedDiv && this.applyFixed()
        });
        C.prototype.setUpScrolling = function () {
            var a = this,
                e = {
                    WebkitOverflowScrolling: "touch",
                    overflowX: "hidden",
                    overflowY: "hidden"
                };
            this.scrollablePixelsX && (e.overflowX = "auto");
            this.scrollablePixelsY && (e.overflowY = "auto");
            this.scrollingParent = n("div", {
                className: "highcharts-scrolling-parent"
            }, {
                position: "relative"
            }, this.renderTo);
            this.scrollingContainer = n("div", {
                className: "highcharts-scrolling"
            }, e, this.scrollingParent);
            u(this.scrollingContainer, "scroll", function () {
                a.pointer && delete a.pointer.chartPosition
            });
            this.innerContainer = n("div", {
                className: "highcharts-inner-container"
            }, null, this.scrollingContainer);
            this.innerContainer.appendChild(this.container);
            this.setUpScrolling = null
        };
        C.prototype.moveFixedElements = function () {
            var a = this.container,
                e = this.fixedRenderer,
                g = ".highcharts-contextbutton .highcharts-credits .highcharts-legend .highcharts-legend-checkbox .highcharts-navigator-series .highcharts-navigator-xaxis .highcharts-navigator-yaxis .highcharts-navigator .highcharts-reset-zoom .highcharts-drillup-button .highcharts-scrollbar .highcharts-subtitle .highcharts-title".split(" "),
                f;
            this.scrollablePixelsX &&
                !this.inverted ? f = ".highcharts-yaxis" : this.scrollablePixelsX && this.inverted ? f = ".highcharts-xaxis" : this.scrollablePixelsY && !this.inverted ? f = ".highcharts-xaxis" : this.scrollablePixelsY && this.inverted && (f = ".highcharts-yaxis");
            f && g.push(f + ":not(.highcharts-radial-axis)", f + "-labels:not(.highcharts-radial-axis-labels)");
            g.forEach(function (c) {
                [].forEach.call(a.querySelectorAll(c), function (a) {
                    (a.namespaceURI === e.SVG_NS ? e.box : e.box.parentNode).appendChild(a);
                    a.style.pointerEvents = "auto"
                })
            })
        };
        C.prototype.applyFixed =
            function () {
                var a = !this.fixedDiv,
                    e = this.options.chart,
                    l = e.scrollablePlotArea,
                    f = z.getRendererType();
                a ? (this.fixedDiv = n("div", {
                        className: "highcharts-fixed"
                    }, {
                        position: "absolute",
                        overflow: "hidden",
                        pointerEvents: "none",
                        zIndex: (e.style && e.style.zIndex || 0) + 2,
                        top: 0
                    }, null, !0), this.scrollingContainer && this.scrollingContainer.parentNode.insertBefore(this.fixedDiv, this.scrollingContainer), this.renderTo.style.overflow = "visible", this.fixedRenderer = e = new f(this.fixedDiv, this.chartWidth, this.chartHeight, this.options.chart.style),
                    this.scrollableMask = e.path().attr({
                        fill: this.options.chart.backgroundColor || "#fff",
                        "fill-opacity": g(l.opacity, .85),
                        zIndex: -1
                    }).addClass("highcharts-scrollable-mask").add(), u(this, "afterShowResetZoom", this.moveFixedElements), u(this, "afterDrilldown", this.moveFixedElements), u(this, "afterLayOutTitles", this.moveFixedElements)) : this.fixedRenderer.setSize(this.chartWidth, this.chartHeight);
                if (this.scrollableDirty || a) this.scrollableDirty = !1, this.moveFixedElements();
                e = this.chartWidth + (this.scrollablePixelsX ||
                    0);
                f = this.chartHeight + (this.scrollablePixelsY || 0);
                r(this.container);
                this.container.style.width = e + "px";
                this.container.style.height = f + "px";
                this.renderer.boxWrapper.attr({
                    width: e,
                    height: f,
                    viewBox: [0, 0, e, f].join(" ")
                });
                this.chartBackground.attr({
                    width: e,
                    height: f
                });
                this.scrollingContainer.style.height = this.chartHeight + "px";
                a && (l.scrollPositionX && (this.scrollingContainer.scrollLeft = this.scrollablePixelsX * l.scrollPositionX), l.scrollPositionY && (this.scrollingContainer.scrollTop = this.scrollablePixelsY * l.scrollPositionY));
                f = this.axisOffset;
                a = this.plotTop - f[0] - 1;
                l = this.plotLeft - f[3] - 1;
                e = this.plotTop + this.plotHeight + f[2] + 1;
                f = this.plotLeft + this.plotWidth + f[1] + 1;
                var m = this.plotLeft + this.plotWidth - (this.scrollablePixelsX || 0),
                    q = this.plotTop + this.plotHeight - (this.scrollablePixelsY || 0);
                a = this.scrollablePixelsX ? [
                    ["M", 0, a],
                    ["L", this.plotLeft - 1, a],
                    ["L", this.plotLeft - 1, e],
                    ["L", 0, e],
                    ["Z"],
                    ["M", m, a],
                    ["L", this.chartWidth, a],
                    ["L", this.chartWidth, e],
                    ["L", m, e],
                    ["Z"]
                ] : this.scrollablePixelsY ? [
                    ["M", l, 0],
                    ["L", l, this.plotTop - 1],
                    ["L", f, this.plotTop -
                        1
                    ],
                    ["L", f, 0],
                    ["Z"],
                    ["M", l, q],
                    ["L", l, this.chartHeight],
                    ["L", f, this.chartHeight],
                    ["L", f, q],
                    ["Z"]
                ] : [
                    ["M", 0, 0]
                ];
                "adjustHeight" !== this.redrawTrigger && this.scrollableMask.attr({
                    d: a
                })
            };
        u(w, "afterInit", function () {
            this.chart.scrollableDirty = !0
        });
        u(E, "show", function () {
            this.chart.scrollableDirty = !0
        });
        ""
    });
    M(a, "Core/Axis/StackingAxis.js", [a["Core/Animation/AnimationUtilities.js"], a["Core/Axis/Axis.js"], a["Core/Utilities.js"]], function (a, w, C) {
        var r = a.getDeferredAnimation,
            z = C.addEvent,
            x = C.destroyObjectProperties,
            J = C.fireEvent,
            u = C.isNumber,
            n = C.objectEach,
            m;
        (function (a) {
            function c() {
                var a = this.stacking;
                if (a) {
                    var c = a.stacks;
                    n(c, function (a, e) {
                        x(a);
                        c[e] = null
                    });
                    a && a.stackTotalGroup && a.stackTotalGroup.destroy()
                }
            }

            function e() {
                this.stacking || (this.stacking = new f(this))
            }
            var g = [];
            a.compose = function (a) {
                -1 === g.indexOf(a) && (g.push(a), z(a, "init", e), z(a, "destroy", c));
                return a
            };
            var f = function () {
                function a(a) {
                    this.oldStacks = {};
                    this.stacks = {};
                    this.stacksTouched = 0;
                    this.axis = a
                }
                a.prototype.buildStacks = function () {
                    var a = this.axis,
                        c = a.series,
                        e = a.options.reversedStacks,
                        f = c.length,
                        g;
                    if (!a.isXAxis) {
                        this.usePercentage = !1;
                        for (g = f; g--;) {
                            var l = c[e ? g : f - g - 1];
                            l.setStackedPoints();
                            l.setGroupedPoints()
                        }
                        for (g = 0; g < f; g++) c[g].modifyStacks();
                        J(a, "afterBuildStacks")
                    }
                };
                a.prototype.cleanStacks = function () {
                    if (!this.axis.isXAxis) {
                        if (this.oldStacks) var a = this.stacks = this.oldStacks;
                        n(a, function (a) {
                            n(a, function (a) {
                                a.cumulative = a.total
                            })
                        })
                    }
                };
                a.prototype.resetStacks = function () {
                    var a = this,
                        c = a.stacks;
                    a.axis.isXAxis || n(c, function (c) {
                        n(c, function (e, f) {
                            u(e.touched) &&
                                e.touched < a.stacksTouched ? (e.destroy(), delete c[f]) : (e.total = null, e.cumulative = null)
                        })
                    })
                };
                a.prototype.renderStackTotals = function () {
                    var a = this.axis,
                        c = a.chart,
                        e = c.renderer,
                        f = this.stacks;
                    a = r(c, a.options.stackLabels && a.options.stackLabels.animation || !1);
                    var g = this.stackTotalGroup = this.stackTotalGroup || e.g("stack-labels").attr({
                        visibility: "visible",
                        zIndex: 6,
                        opacity: 0
                    }).add();
                    g.translate(c.plotLeft, c.plotTop);
                    n(f, function (a) {
                        n(a, function (a) {
                            a.render(g)
                        })
                    });
                    g.animate({
                        opacity: 1
                    }, a)
                };
                return a
            }();
            a.Additions =
                f
        })(m || (m = {}));
        return m
    });
    M(a, "Extensions/Stacking.js", [a["Core/Axis/Axis.js"], a["Core/Chart/Chart.js"], a["Core/FormatUtilities.js"], a["Core/Globals.js"], a["Core/Series/Series.js"], a["Core/Axis/StackingAxis.js"], a["Core/Utilities.js"]], function (a, w, C, E, z, x, J) {
        var r = C.format,
            n = J.correctFloat,
            m = J.defined,
            g = J.destroyObjectProperties,
            c = J.isArray,
            e = J.isNumber,
            l = J.objectEach,
            f = J.pick,
            v = function () {
                function a(a, c, e, f, g) {
                    var k = a.chart.inverted;
                    this.axis = a;
                    this.isNegative = e;
                    this.options = c = c || {};
                    this.x = f;
                    this.total =
                        null;
                    this.points = {};
                    this.hasValidPoints = !1;
                    this.stack = g;
                    this.rightCliff = this.leftCliff = 0;
                    this.alignOptions = {
                        align: c.align || (k ? e ? "left" : "right" : "center"),
                        verticalAlign: c.verticalAlign || (k ? "middle" : e ? "bottom" : "top"),
                        y: c.y,
                        x: c.x
                    };
                    this.textAlign = c.textAlign || (k ? e ? "right" : "left" : "center")
                }
                a.prototype.destroy = function () {
                    g(this, this.axis)
                };
                a.prototype.render = function (a) {
                    var c = this.axis.chart,
                        e = this.options,
                        g = e.format;
                    g = g ? r(g, this, c) : e.formatter.call(this);
                    this.label ? this.label.attr({
                            text: g,
                            visibility: "hidden"
                        }) :
                        (this.label = c.renderer.label(g, null, null, e.shape, null, null, e.useHTML, !1, "stack-labels"), g = {
                            r: e.borderRadius || 0,
                            text: g,
                            rotation: e.rotation,
                            padding: f(e.padding, 5),
                            visibility: "hidden"
                        }, c.styledMode || (g.fill = e.backgroundColor, g.stroke = e.borderColor, g["stroke-width"] = e.borderWidth, this.label.css(e.style)), this.label.attr(g), this.label.added || this.label.add(a));
                    this.label.labelrank = c.plotSizeY
                };
                a.prototype.setOffset = function (a, c, g, l, n) {
                    var k = this.axis,
                        h = k.chart;
                    l = k.translate(k.stacking.usePercentage ? 100 :
                        l ? l : this.total, 0, 0, 0, 1);
                    g = k.translate(g ? g : 0);
                    g = m(l) && Math.abs(l - g);
                    a = f(n, h.xAxis[0].translate(this.x)) + a;
                    k = m(l) && this.getStackBox(h, this, a, l, c, g, k);
                    c = this.label;
                    g = this.isNegative;
                    a = "justify" === f(this.options.overflow, "justify");
                    var d = this.textAlign;
                    c && k && (n = c.getBBox(), l = c.padding, d = "left" === d ? h.inverted ? -l : l : "right" === d ? n.width : h.inverted && "center" === d ? n.width / 2 : h.inverted ? g ? n.width + l : -l : n.width / 2, g = h.inverted ? n.height / 2 : g ? -l : n.height, this.alignOptions.x = f(this.options.x, 0), this.alignOptions.y = f(this.options.y,
                        0), k.x -= d, k.y -= g, c.align(this.alignOptions, null, k), h.isInsidePlot(c.alignAttr.x + d - this.alignOptions.x, c.alignAttr.y + g - this.alignOptions.y) ? c.show() : (c.alignAttr.y = -9999, a = !1), a && z.prototype.justifyDataLabel.call(this.axis, c, this.alignOptions, c.alignAttr, n, k), c.attr({
                        x: c.alignAttr.x,
                        y: c.alignAttr.y
                    }), f(!a && this.options.crop, !0) && ((h = e(c.x) && e(c.y) && h.isInsidePlot(c.x - l + c.width, c.y) && h.isInsidePlot(c.x + l, c.y)) || c.hide()))
                };
                a.prototype.getStackBox = function (a, c, e, f, g, l, h) {
                    var d = c.axis.reversed,
                        b = a.inverted,
                        k = h.height + h.pos - (b ? a.plotLeft : a.plotTop);
                    c = c.isNegative && !d || !c.isNegative && d;
                    return {
                        x: b ? c ? f - h.right : f - l + h.pos - a.plotLeft : e + a.xAxis[0].transB - a.plotLeft,
                        y: b ? h.height - e - g : c ? k - f - l : k - f,
                        width: b ? l : g,
                        height: b ? g : l
                    }
                };
                return a
            }();
        w.prototype.getStacks = function () {
            var a = this,
                c = a.inverted;
            a.yAxis.forEach(function (a) {
                a.stacking && a.stacking.stacks && a.hasVisibleSeries && (a.stacking.oldStacks = a.stacking.stacks)
            });
            a.series.forEach(function (e) {
                var g = e.xAxis && e.xAxis.options || {};
                !e.options.stacking || !0 !== e.visible &&
                    !1 !== a.options.chart.ignoreHiddenSeries || (e.stackKey = [e.type, f(e.options.stack, ""), c ? g.top : g.left, c ? g.height : g.width].join())
            })
        };
        x.compose(a);
        z.prototype.setGroupedPoints = function () {
            var a = this.yAxis.stacking;
            this.options.centerInCategory && (this.is("column") || this.is("columnrange")) && !this.options.stacking && 1 < this.chart.series.length ? z.prototype.setStackedPoints.call(this, "group") : a && l(a.stacks, function (c, e) {
                "group" === e.slice(-5) && (l(c, function (a) {
                    return a.destroy()
                }), delete a.stacks[e])
            })
        };
        z.prototype.setStackedPoints =
            function (a) {
                var e = a || this.options.stacking;
                if (e && (!0 === this.visible || !1 === this.chart.options.chart.ignoreHiddenSeries)) {
                    var g = this.processedXData,
                        l = this.processedYData,
                        q = [],
                        r = l.length,
                        t = this.options,
                        h = t.threshold,
                        d = f(t.startFromThreshold && h, 0);
                    t = t.stack;
                    a = a ? this.type + "," + e : this.stackKey;
                    var b = "-" + a,
                        p = this.negStacks,
                        u = this.yAxis,
                        y = u.stacking.stacks,
                        x = u.stacking.oldStacks,
                        F, w;
                    u.stacking.stacksTouched += 1;
                    for (w = 0; w < r; w++) {
                        var z = g[w];
                        var C = l[w];
                        var E = this.getStackIndicator(E, z, this.index);
                        var J = E.key;
                        var H = (F = p && C < (d ? 0 : h)) ? b : a;
                        y[H] || (y[H] = {});
                        y[H][z] || (x[H] && x[H][z] ? (y[H][z] = x[H][z], y[H][z].total = null) : y[H][z] = new v(u, u.options.stackLabels, F, z, t));
                        H = y[H][z];
                        null !== C ? (H.points[J] = H.points[this.index] = [f(H.cumulative, d)], m(H.cumulative) || (H.base = J), H.touched = u.stacking.stacksTouched, 0 < E.index && !1 === this.singleStacks && (H.points[J][0] = H.points[this.index + "," + z + ",0"][0])) : H.points[J] = H.points[this.index] = null;
                        "percent" === e ? (F = F ? a : b, p && y[F] && y[F][z] ? (F = y[F][z], H.total = F.total = Math.max(F.total, H.total) +
                            Math.abs(C) || 0) : H.total = n(H.total + (Math.abs(C) || 0))) : "group" === e ? (c(C) && (C = C[0]), null !== C && (H.total = (H.total || 0) + 1)) : H.total = n(H.total + (C || 0));
                        H.cumulative = "group" === e ? (H.total || 1) - 1 : f(H.cumulative, d) + (C || 0);
                        null !== C && (H.points[J].push(H.cumulative), q[w] = H.cumulative, H.hasValidPoints = !0)
                    }
                    "percent" === e && (u.stacking.usePercentage = !0);
                    "group" !== e && (this.stackedYData = q);
                    u.stacking.oldStacks = {}
                }
            };
        z.prototype.modifyStacks = function () {
            var a = this,
                c = a.stackKey,
                e = a.yAxis.stacking.stacks,
                f = a.processedXData,
                g,
                l = a.options.stacking;
            a[l + "Stacker"] && [c, "-" + c].forEach(function (c) {
                for (var h = f.length, d, b; h--;)
                    if (d = f[h], g = a.getStackIndicator(g, d, a.index, c), b = (d = e[c] && e[c][d]) && d.points[g.key]) a[l + "Stacker"](b, d, h)
            })
        };
        z.prototype.percentStacker = function (a, c, e) {
            c = c.total ? 100 / c.total : 0;
            a[0] = n(a[0] * c);
            a[1] = n(a[1] * c);
            this.stackedYData[e] = a[1]
        };
        z.prototype.getStackIndicator = function (a, c, e, f) {
            !m(a) || a.x !== c || f && a.key !== f ? a = {
                x: c,
                index: 0,
                key: f
            } : a.index++;
            a.key = [e, c, a.index].join();
            return a
        };
        E.StackItem = v;
        "";
        return E.StackItem
    });
    M(a, "Series/Line/LineSeries.js", [a["Core/Color/Palette.js"], a["Core/Series/Series.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]], function (a, w, C, E) {
        var r = this && this.__extends || function () {
                var a = function (n, m) {
                    a = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function (a, c) {
                        a.__proto__ = c
                    } || function (a, c) {
                        for (var e in c) c.hasOwnProperty(e) && (a[e] = c[e])
                    };
                    return a(n, m)
                };
                return function (n, m) {
                    function g() {
                        this.constructor = n
                    }
                    a(n, m);
                    n.prototype = null === m ? Object.create(m) : (g.prototype = m.prototype,
                        new g)
                }
            }(),
            x = E.defined,
            J = E.merge;
        E = function (u) {
            function n() {
                var a = null !== u && u.apply(this, arguments) || this;
                a.data = void 0;
                a.options = void 0;
                a.points = void 0;
                return a
            }
            r(n, u);
            n.prototype.drawGraph = function () {
                var m = this,
                    g = this.options,
                    c = (this.gappedPath || this.getGraphPath).call(this),
                    e = this.chart.styledMode,
                    l = [
                        ["graph", "highcharts-graph"]
                    ];
                e || l[0].push(g.lineColor || this.color || a.neutralColor20, g.dashStyle);
                l = m.getZonesGraphs(l);
                l.forEach(function (a, l) {
                    var f = a[0],
                        k = m[f],
                        n = k ? "animate" : "attr";
                    k ? (k.endX = m.preventGraphAnimation ?
                        null : c.xMap, k.animate({
                            d: c
                        })) : c.length && (m[f] = k = m.chart.renderer.path(c).addClass(a[1]).attr({
                        zIndex: 1
                    }).add(m.group));
                    k && !e && (f = {
                        stroke: a[2],
                        "stroke-width": g.lineWidth,
                        fill: m.fillGraph && m.color || "none"
                    }, a[3] ? f.dashstyle = a[3] : "square" !== g.linecap && (f["stroke-linecap"] = f["stroke-linejoin"] = "round"), k[n](f).shadow(2 > l && g.shadow));
                    k && (k.startX = c.xMap, k.isArea = c.isArea)
                })
            };
            n.prototype.getGraphPath = function (a, g, c) {
                var e = this,
                    l = e.options,
                    f = [],
                    m = [],
                    n, k = l.step;
                a = a || e.points;
                var r = a.reversed;
                r && a.reverse();
                (k = {
                    right: 1,
                    center: 2
                } [k] || k && 3) && r && (k = 4 - k);
                a = this.getValidPoints(a, !1, !(l.connectNulls && !g && !c));
                a.forEach(function (q, r) {
                    var v = q.plotX,
                        t = q.plotY,
                        h = a[r - 1];
                    (q.leftCliff || h && h.rightCliff) && !c && (n = !0);
                    q.isNull && !x(g) && 0 < r ? n = !l.connectNulls : q.isNull && !g ? n = !0 : (0 === r || n ? r = [
                        ["M", q.plotX, q.plotY]
                    ] : e.getPointSpline ? r = [e.getPointSpline(a, q, r)] : k ? (r = 1 === k ? [
                        ["L", h.plotX, t]
                    ] : 2 === k ? [
                        ["L", (h.plotX + v) / 2, h.plotY],
                        ["L", (h.plotX + v) / 2, t]
                    ] : [
                        ["L", v, h.plotY]
                    ], r.push(["L", v, t])) : r = [
                        ["L", v, t]
                    ], m.push(q.x), k && (m.push(q.x),
                        2 === k && m.push(q.x)), f.push.apply(f, r), n = !1)
                });
                f.xMap = m;
                return e.graphPath = f
            };
            n.prototype.getZonesGraphs = function (a) {
                this.zones.forEach(function (g, c) {
                    c = ["zone-graph-" + c, "highcharts-graph highcharts-zone-graph-" + c + " " + (g.className || "")];
                    this.chart.styledMode || c.push(g.color || this.color, g.dashStyle || this.options.dashStyle);
                    a.push(c)
                }, this);
                return a
            };
            n.defaultOptions = J(w.defaultOptions, {});
            return n
        }(w);
        C.registerSeriesType("line", E);
        "";
        return E
    });
    M(a, "Series/Area/AreaSeries.js", [a["Core/Color/Color.js"],
        a["Core/Legend/LegendSymbol.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]
    ], function (a, w, C, E) {
        var r = this && this.__extends || function () {
                var a = function (c, e) {
                    a = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function (a, c) {
                        a.__proto__ = c
                    } || function (a, c) {
                        for (var e in c) c.hasOwnProperty(e) && (a[e] = c[e])
                    };
                    return a(c, e)
                };
                return function (c, e) {
                    function g() {
                        this.constructor = c
                    }
                    a(c, e);
                    c.prototype = null === e ? Object.create(e) : (g.prototype = e.prototype, new g)
                }
            }(),
            x = a.parse,
            J = C.seriesTypes.line;
        a =
            E.extend;
        var u = E.merge,
            n = E.objectEach,
            m = E.pick;
        E = function (a) {
            function c() {
                var c = null !== a && a.apply(this, arguments) || this;
                c.data = void 0;
                c.options = void 0;
                c.points = void 0;
                return c
            }
            r(c, a);
            c.prototype.drawGraph = function () {
                this.areaPath = [];
                a.prototype.drawGraph.apply(this);
                var c = this,
                    g = this.areaPath,
                    f = this.options,
                    n = [
                        ["area", "highcharts-area", this.color, f.fillColor]
                    ];
                this.zones.forEach(function (a, e) {
                    n.push(["zone-area-" + e, "highcharts-area highcharts-zone-area-" + e + " " + a.className, a.color || c.color, a.fillColor ||
                        f.fillColor
                    ])
                });
                n.forEach(function (a) {
                    var e = a[0],
                        l = c[e],
                        n = l ? "animate" : "attr",
                        q = {};
                    l ? (l.endX = c.preventGraphAnimation ? null : g.xMap, l.animate({
                        d: g
                    })) : (q.zIndex = 0, l = c[e] = c.chart.renderer.path(g).addClass(a[1]).add(c.group), l.isArea = !0);
                    c.chart.styledMode || (q.fill = m(a[3], x(a[2]).setOpacity(m(f.fillOpacity, .75)).get()));
                    l[n](q);
                    l.startX = g.xMap;
                    l.shiftUnit = f.step ? 2 : 1
                })
            };
            c.prototype.getGraphPath = function (a) {
                var c = J.prototype.getGraphPath,
                    e = this.options,
                    g = e.stacking,
                    n = this.yAxis,
                    k, r = [],
                    u = [],
                    B = this.index,
                    x =
                    n.stacking.stacks[this.stackKey],
                    t = e.threshold,
                    h = Math.round(n.getThreshold(e.threshold));
                e = m(e.connectNulls, "percent" === g);
                var d = function (b, d, c) {
                    var e = a[b];
                    b = g && x[e.x].points[B];
                    var f = e[c + "Null"] || 0;
                    c = e[c + "Cliff"] || 0;
                    e = !0;
                    if (c || f) {
                        var k = (f ? b[0] : b[1]) + c;
                        var l = b[0] + c;
                        e = !!f
                    } else !g && a[d] && a[d].isNull && (k = l = t);
                    "undefined" !== typeof k && (u.push({
                        plotX: p,
                        plotY: null === k ? h : n.getThreshold(k),
                        isNull: e,
                        isCliff: !0
                    }), r.push({
                        plotX: p,
                        plotY: null === l ? h : n.getThreshold(l),
                        doCurve: !1
                    }))
                };
                a = a || this.points;
                g && (a = this.getStackPoints(a));
                for (k = 0; k < a.length; k++) {
                    g || (a[k].leftCliff = a[k].rightCliff = a[k].leftNull = a[k].rightNull = void 0);
                    var b = a[k].isNull;
                    var p = m(a[k].rectPlotX, a[k].plotX);
                    var G = g ? m(a[k].yBottom, h) : h;
                    if (!b || e) e || d(k, k - 1, "left"), b && !g && e || (u.push(a[k]), r.push({
                        x: k,
                        plotX: p,
                        plotY: G
                    })), e || d(k, k + 1, "right")
                }
                k = c.call(this, u, !0, !0);
                r.reversed = !0;
                b = c.call(this, r, !0, !0);
                (G = b[0]) && "M" === G[0] && (b[0] = ["L", G[1], G[2]]);
                b = k.concat(b);
                b.length && b.push(["Z"]);
                c = c.call(this, u, !1, e);
                b.xMap = k.xMap;
                this.areaPath = b;
                return c
            };
            c.prototype.getStackPoints =
                function (a) {
                    var c = this,
                        e = [],
                        g = [],
                        r = this.xAxis,
                        k = this.yAxis,
                        u = k.stacking.stacks[this.stackKey],
                        x = {},
                        B = k.series,
                        w = B.length,
                        t = k.options.reversedStacks ? 1 : -1,
                        h = B.indexOf(c);
                    a = a || this.points;
                    if (this.options.stacking) {
                        for (var d = 0; d < a.length; d++) a[d].leftNull = a[d].rightNull = void 0, x[a[d].x] = a[d];
                        n(u, function (a, b) {
                            null !== a.total && g.push(b)
                        });
                        g.sort(function (a, b) {
                            return a - b
                        });
                        var b = B.map(function (a) {
                            return a.visible
                        });
                        g.forEach(function (a, d) {
                            var f = 0,
                                l, n;
                            if (x[a] && !x[a].isNull) e.push(x[a]), [-1, 1].forEach(function (e) {
                                var f =
                                    1 === e ? "rightNull" : "leftNull",
                                    k = 0,
                                    m = u[g[d + e]];
                                if (m)
                                    for (var p = h; 0 <= p && p < w;) {
                                        var r = B[p].index;
                                        l = m.points[r];
                                        l || (r === c.index ? x[a][f] = !0 : b[p] && (n = u[a].points[r]) && (k -= n[1] - n[0]));
                                        p += t
                                    }
                                x[a][1 === e ? "rightCliff" : "leftCliff"] = k
                            });
                            else {
                                for (var p = h; 0 <= p && p < w;) {
                                    if (l = u[a].points[B[p].index]) {
                                        f = l[1];
                                        break
                                    }
                                    p += t
                                }
                                f = m(f, 0);
                                f = k.translate(f, 0, 1, 0, 1);
                                e.push({
                                    isNull: !0,
                                    plotX: r.translate(a, 0, 0, 0, 1),
                                    x: a,
                                    plotY: f,
                                    yBottom: f
                                })
                            }
                        })
                    }
                    return e
                };
            c.defaultOptions = u(J.defaultOptions, {
                threshold: 0
            });
            return c
        }(J);
        a(E.prototype, {
            singleStacks: !1,
            drawLegendSymbol: w.drawRectangle
        });
        C.registerSeriesType("area", E);
        "";
        return E
    });
    M(a, "Series/Spline/SplineSeries.js", [a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]], function (a, w) {
        var r = this && this.__extends || function () {
                var a = function (r, n) {
                    a = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function (a, g) {
                        a.__proto__ = g
                    } || function (a, g) {
                        for (var c in g) g.hasOwnProperty(c) && (a[c] = g[c])
                    };
                    return a(r, n)
                };
                return function (r, n) {
                    function m() {
                        this.constructor = r
                    }
                    a(r, n);
                    r.prototype = null === n ? Object.create(n) :
                        (m.prototype = n.prototype, new m)
                }
            }(),
            E = a.seriesTypes.line,
            z = w.merge,
            x = w.pick;
        w = function (a) {
            function u() {
                var n = null !== a && a.apply(this, arguments) || this;
                n.data = void 0;
                n.options = void 0;
                n.points = void 0;
                return n
            }
            r(u, a);
            u.prototype.getPointSpline = function (a, m, g) {
                var c = m.plotX || 0,
                    e = m.plotY || 0,
                    l = a[g - 1];
                g = a[g + 1];
                if (l && !l.isNull && !1 !== l.doCurve && !m.isCliff && g && !g.isNull && !1 !== g.doCurve && !m.isCliff) {
                    a = l.plotY || 0;
                    var f = g.plotX || 0;
                    g = g.plotY || 0;
                    var n = 0;
                    var r = (1.5 * c + (l.plotX || 0)) / 2.5;
                    var k = (1.5 * e + a) / 2.5;
                    f = (1.5 * c +
                        f) / 2.5;
                    var u = (1.5 * e + g) / 2.5;
                    f !== r && (n = (u - k) * (f - c) / (f - r) + e - u);
                    k += n;
                    u += n;
                    k > a && k > e ? (k = Math.max(a, e), u = 2 * e - k) : k < a && k < e && (k = Math.min(a, e), u = 2 * e - k);
                    u > g && u > e ? (u = Math.max(g, e), k = 2 * e - u) : u < g && u < e && (u = Math.min(g, e), k = 2 * e - u);
                    m.rightContX = f;
                    m.rightContY = u
                }
                m = ["C", x(l.rightContX, l.plotX, 0), x(l.rightContY, l.plotY, 0), x(r, c, 0), x(k, e, 0), c, e];
                l.rightContX = l.rightContY = void 0;
                return m
            };
            u.defaultOptions = z(E.defaultOptions);
            return u
        }(E);
        a.registerSeriesType("spline", w);
        "";
        return w
    });
    M(a, "Series/AreaSpline/AreaSplineSeries.js",
        [a["Series/Area/AreaSeries.js"], a["Series/Spline/SplineSeries.js"], a["Core/Legend/LegendSymbol.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]],
        function (a, w, C, E, z) {
            var r = this && this.__extends || function () {
                    var a = function (g, c) {
                        a = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function (a, c) {
                            a.__proto__ = c
                        } || function (a, c) {
                            for (var e in c) c.hasOwnProperty(e) && (a[e] = c[e])
                        };
                        return a(g, c)
                    };
                    return function (g, c) {
                        function e() {
                            this.constructor = g
                        }
                        a(g, c);
                        g.prototype = null === c ? Object.create(c) :
                            (e.prototype = c.prototype, new e)
                    }
                }(),
                J = a.prototype,
                u = z.extend,
                n = z.merge;
            z = function (m) {
                function g() {
                    var a = null !== m && m.apply(this, arguments) || this;
                    a.data = void 0;
                    a.points = void 0;
                    a.options = void 0;
                    return a
                }
                r(g, m);
                g.defaultOptions = n(w.defaultOptions, a.defaultOptions);
                return g
            }(w);
            u(z.prototype, {
                getGraphPath: J.getGraphPath,
                getStackPoints: J.getStackPoints,
                drawGraph: J.drawGraph,
                drawLegendSymbol: C.drawRectangle
            });
            E.registerSeriesType("areaspline", z);
            "";
            return z
        });
    M(a, "Series/Column/ColumnSeries.js", [a["Core/Animation/AnimationUtilities.js"],
        a["Core/Color/Color.js"], a["Core/Globals.js"], a["Core/Legend/LegendSymbol.js"], a["Core/Color/Palette.js"], a["Core/Series/Series.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]
    ], function (a, w, C, E, z, x, J, u) {
        var n = this && this.__extends || function () {
                var a = function (c, d) {
                    a = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function (a, d) {
                        a.__proto__ = d
                    } || function (a, d) {
                        for (var b in d) d.hasOwnProperty(b) && (a[b] = d[b])
                    };
                    return a(c, d)
                };
                return function (c, d) {
                    function b() {
                        this.constructor = c
                    }
                    a(c, d);
                    c.prototype = null === d ? Object.create(d) : (b.prototype = d.prototype, new b)
                }
            }(),
            m = a.animObject,
            g = w.parse,
            c = C.hasTouch;
        a = C.noop;
        var e = u.clamp,
            l = u.css,
            f = u.defined,
            r = u.extend,
            q = u.fireEvent,
            k = u.isArray,
            I = u.isNumber,
            D = u.merge,
            B = u.pick,
            O = u.objectEach;
        u = function (a) {
            function h() {
                var d = null !== a && a.apply(this, arguments) || this;
                d.borderWidth = void 0;
                d.data = void 0;
                d.group = void 0;
                d.options = void 0;
                d.points = void 0;
                return d
            }
            n(h, a);
            h.prototype.animate = function (a) {
                var b = this,
                    d = this.yAxis,
                    c = b.options,
                    h = this.chart.inverted,
                    f = {},
                    g = h ? "translateX" : "translateY";
                if (a) f.scaleY = .001, a = e(d.toPixels(c.threshold), d.pos, d.pos + d.len), h ? f.translateX = a - d.len : f.translateY = a, b.clipBox && b.setClip(), b.group.attr(f);
                else {
                    var k = Number(b.group.attr(g));
                    b.group.animate({
                        scaleY: 1
                    }, r(m(b.options.animation), {
                        step: function (a, c) {
                            b.group && (f[g] = k + c.pos * (d.pos - k), b.group.attr(f))
                        }
                    }))
                }
            };
            h.prototype.init = function (d, b) {
                a.prototype.init.apply(this, arguments);
                var c = this;
                d = c.chart;
                d.hasRendered && d.series.forEach(function (a) {
                    a.type === c.type && (a.isDirty = !0)
                })
            };
            h.prototype.getColumnMetrics = function () {
                var a = this,
                    b = a.options,
                    c = a.xAxis,
                    e = a.yAxis,
                    h = c.options.reversedStacks;
                h = c.reversed && !h || !c.reversed && h;
                var f = {},
                    g, k = 0;
                !1 === b.grouping ? k = 1 : a.chart.series.forEach(function (b) {
                    var d = b.yAxis,
                        c = b.options;
                    if (b.type === a.type && (b.visible || !a.chart.options.chart.ignoreHiddenSeries) && e.len === d.len && e.pos === d.pos) {
                        if (c.stacking && "group" !== c.stacking) {
                            g = b.stackKey;
                            "undefined" === typeof f[g] && (f[g] = k++);
                            var h = f[g]
                        } else !1 !== c.grouping && (h = k++);
                        b.columnIndex = h
                    }
                });
                var l =
                    Math.min(Math.abs(c.transA) * (c.ordinal && c.ordinal.slope || b.pointRange || c.closestPointRange || c.tickInterval || 1), c.len),
                    m = l * b.groupPadding,
                    n = (l - 2 * m) / (k || 1);
                b = Math.min(b.maxPointWidth || c.len, B(b.pointWidth, n * (1 - 2 * b.pointPadding)));
                a.columnMetrics = {
                    width: b,
                    offset: (n - b) / 2 + (m + ((a.columnIndex || 0) + (h ? 1 : 0)) * n - l / 2) * (h ? -1 : 1),
                    paddedWidth: n,
                    columnCount: k
                };
                return a.columnMetrics
            };
            h.prototype.crispCol = function (a, b, c, e) {
                var d = this.chart,
                    h = this.borderWidth,
                    f = -(h % 2 ? .5 : 0);
                h = h % 2 ? .5 : 1;
                d.inverted && d.renderer.isVML && (h +=
                    1);
                this.options.crisp && (c = Math.round(a + c) + f, a = Math.round(a) + f, c -= a);
                e = Math.round(b + e) + h;
                f = .5 >= Math.abs(b) && .5 < e;
                b = Math.round(b) + h;
                e -= b;
                f && e && (--b, e += 1);
                return {
                    x: a,
                    y: b,
                    width: c,
                    height: e
                }
            };
            h.prototype.adjustForMissingColumns = function (a, b, c, e) {
                var d = this,
                    h = this.options.stacking;
                if (!c.isNull && 1 < e.columnCount) {
                    var f = 0,
                        g = 0;
                    O(this.yAxis.stacking && this.yAxis.stacking.stacks, function (a) {
                        if ("number" === typeof c.x && (a = a[c.x.toString()])) {
                            var b = a.points[d.index],
                                e = a.total;
                            h ? (b && (f = g), a.hasValidPoints && g++) : k(b) &&
                                (f = b[1], g = e || 0)
                        }
                    });
                    a = (c.plotX || 0) + ((g - 1) * e.paddedWidth + b) / 2 - b - f * e.paddedWidth
                }
                return a
            };
            h.prototype.translate = function () {
                var a = this,
                    b = a.chart,
                    c = a.options,
                    h = a.dense = 2 > a.closestPointRange * a.xAxis.transA;
                h = a.borderWidth = B(c.borderWidth, h ? 0 : 1);
                var g = a.xAxis,
                    k = a.yAxis,
                    l = c.threshold,
                    m = a.translatedThreshold = k.getThreshold(l),
                    n = B(c.minPointLength, 5),
                    r = a.getColumnMetrics(),
                    t = r.width,
                    q = a.pointXOffset = r.offset,
                    v = a.dataMin,
                    u = a.dataMax,
                    w = a.barW = Math.max(t, 1 + 2 * h);
                b.inverted && (m -= .5);
                c.pointPadding && (w = Math.ceil(w));
                x.prototype.translate.apply(a);
                a.points.forEach(function (d) {
                    var h = B(d.yBottom, m),
                        p = 999 + Math.abs(h),
                        y = d.plotX || 0;
                    p = e(d.plotY, -p, k.len + p);
                    var x = Math.min(p, h),
                        F = Math.max(p, h) - x,
                        D = t,
                        G = y + q,
                        z = w;
                    n && Math.abs(F) < n && (F = n, y = !k.reversed && !d.negative || k.reversed && d.negative, I(l) && I(u) && d.y === l && u <= l && (k.min || 0) < l && (v !== u || (k.max || 0) <= l) && (y = !y), x = Math.abs(x - m) > n ? h - n : m - (y ? n : 0));
                    f(d.options.pointWidth) && (D = z = Math.ceil(d.options.pointWidth), G -= Math.round((D - t) / 2));
                    c.centerInCategory && (G = a.adjustForMissingColumns(G,
                        D, d, r));
                    d.barX = G;
                    d.pointWidth = D;
                    d.tooltipPos = b.inverted ? [e(k.len + k.pos - b.plotLeft - p, k.pos - b.plotLeft, k.len + k.pos - b.plotLeft), g.len + g.pos - b.plotTop - G - z / 2, F] : [g.left - b.plotLeft + G + z / 2, e(p + k.pos - b.plotTop, k.pos - b.plotTop, k.len + k.pos - b.plotTop), F];
                    d.shapeType = a.pointClass.prototype.shapeType || "rect";
                    d.shapeArgs = a.crispCol.apply(a, d.isNull ? [G, m, z, 0] : [G, x, z, F])
                })
            };
            h.prototype.drawGraph = function () {
                this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data")
            };
            h.prototype.pointAttribs = function (a,
                b) {
                var d = this.options,
                    c = this.pointAttrToOptions || {},
                    e = c.stroke || "borderColor",
                    h = c["stroke-width"] || "borderWidth",
                    f = a && a.color || this.color,
                    k = a && a[e] || d[e] || f;
                c = a && a.options.dashStyle || d.dashStyle;
                var l = a && a[h] || d[h] || this[h] || 0,
                    m = B(a && a.opacity, d.opacity, 1);
                if (a && this.zones.length) {
                    var n = a.getZone();
                    f = a.options.color || n && (n.color || a.nonZonedColor) || this.color;
                    n && (k = n.borderColor || k, c = n.dashStyle || c, l = n.borderWidth || l)
                }
                b && a && (a = D(d.states[b], a.options.states && a.options.states[b] || {}), b = a.brightness,
                    f = a.color || "undefined" !== typeof b && g(f).brighten(a.brightness).get() || f, k = a[e] || k, l = a[h] || l, c = a.dashStyle || c, m = B(a.opacity, m));
                e = {
                    fill: f,
                    stroke: k,
                    "stroke-width": l,
                    opacity: m
                };
                c && (e.dashstyle = c);
                return e
            };
            h.prototype.drawPoints = function () {
                var a = this,
                    b = this.chart,
                    c = a.options,
                    e = b.renderer,
                    h = c.animationLimit || 250,
                    f;
                a.points.forEach(function (d) {
                    var g = d.graphic,
                        k = !!g,
                        l = g && b.pointCount < h ? "animate" : "attr";
                    if (I(d.plotY) && null !== d.y) {
                        f = d.shapeArgs;
                        g && d.hasNewShapeType() && (g = g.destroy());
                        a.enabledDataSorting &&
                            (d.startXPos = a.xAxis.reversed ? -(f ? f.width || 0 : 0) : a.xAxis.width);
                        g || (d.graphic = g = e[d.shapeType](f).add(d.group || a.group)) && a.enabledDataSorting && b.hasRendered && b.pointCount < h && (g.attr({
                            x: d.startXPos
                        }), k = !0, l = "animate");
                        if (g && k) g[l](D(f));
                        if (c.borderRadius) g[l]({
                            r: c.borderRadius
                        });
                        b.styledMode || g[l](a.pointAttribs(d, d.selected && "select")).shadow(!1 !== d.allowShadow && c.shadow, null, c.stacking && !c.borderRadius);
                        g && (g.addClass(d.getClassName(), !0), g.attr({
                            visibility: d.visible ? "inherit" : "hidden"
                        }))
                    } else g &&
                        (d.graphic = g.destroy())
                })
            };
            h.prototype.drawTracker = function () {
                var a = this,
                    b = a.chart,
                    e = b.pointer,
                    h = function (a) {
                        var b = e.getPointFromEvent(a);
                        "undefined" !== typeof b && (e.isDirectTouch = !0, b.onMouseOver(a))
                    },
                    f;
                a.points.forEach(function (a) {
                    f = k(a.dataLabels) ? a.dataLabels : a.dataLabel ? [a.dataLabel] : [];
                    a.graphic && (a.graphic.element.point = a);
                    f.forEach(function (b) {
                        b.div ? b.div.point = a : b.element.point = a
                    })
                });
                a._hasTracking || (a.trackerGroups.forEach(function (d) {
                    if (a[d]) {
                        a[d].addClass("highcharts-tracker").on("mouseover",
                            h).on("mouseout", function (a) {
                            e.onTrackerMouseOut(a)
                        });
                        if (c) a[d].on("touchstart", h);
                        !b.styledMode && a.options.cursor && a[d].css(l).css({
                            cursor: a.options.cursor
                        })
                    }
                }), a._hasTracking = !0);
                q(this, "afterDrawTracker")
            };
            h.prototype.remove = function () {
                var a = this,
                    b = a.chart;
                b.hasRendered && b.series.forEach(function (b) {
                    b.type === a.type && (b.isDirty = !0)
                });
                x.prototype.remove.apply(a, arguments)
            };
            h.defaultOptions = D(x.defaultOptions, {
                borderRadius: 0,
                centerInCategory: !1,
                groupPadding: .2,
                marker: null,
                pointPadding: .1,
                minPointLength: 0,
                cropThreshold: 50,
                pointRange: null,
                states: {
                    hover: {
                        halo: !1,
                        brightness: .1
                    },
                    select: {
                        color: z.neutralColor20,
                        borderColor: z.neutralColor100
                    }
                },
                dataLabels: {
                    align: void 0,
                    verticalAlign: void 0,
                    y: void 0
                },
                startFromThreshold: !0,
                stickyTracking: !1,
                tooltip: {
                    distance: 6
                },
                threshold: 0,
                borderColor: z.backgroundColor
            });
            return h
        }(x);
        r(u.prototype, {
            cropShoulder: 0,
            directTouch: !0,
            drawLegendSymbol: E.drawRectangle,
            getSymbol: a,
            negStacks: !0,
            trackerGroups: ["group", "dataLabelsGroup"]
        });
        J.registerSeriesType("column", u);
        "";
        "";
        return u
    });
    M(a, "Core/Series/DataLabel.js", [a["Core/Animation/AnimationUtilities.js"], a["Core/FormatUtilities.js"], a["Core/Color/Palette.js"], a["Core/Utilities.js"]], function (a, w, C, E) {
        var r = a.getDeferredAnimation,
            x = w.format,
            J = E.defined,
            u = E.extend,
            n = E.fireEvent,
            m = E.isArray,
            g = E.merge,
            c = E.objectEach,
            e = E.pick,
            l = E.splat,
            f;
        (function (a) {
            function f(a, c, b, f, g) {
                var d = this,
                    h = this.chart,
                    k = this.isCartesian && h.inverted,
                    l = this.enabledDataSorting,
                    m = e(a.dlBox && a.dlBox.centerX, a.plotX, -9999),
                    n = e(a.plotY, -9999),
                    p = c.getBBox(),
                    r =
                    b.rotation,
                    t = b.align,
                    q = h.isInsidePlot(m, Math.round(n), {
                        inverted: k,
                        paneCoordinates: !0,
                        series: d
                    }),
                    v = function (b) {
                        l && d.xAxis && !B && d.setDataLabelStartPos(a, c, g, q, b)
                    },
                    B = "justify" === e(b.overflow, l ? "none" : "justify"),
                    x = this.visible && !1 !== a.visible && (a.series.forceDL || l && !B || q || e(b.inside, !!this.options.stacking) && f && h.isInsidePlot(m, k ? f.x + 1 : f.y + f.height - 1, {
                        inverted: k,
                        paneCoordinates: !0,
                        series: d
                    }));
                if (x) {
                    var w = h.renderer.fontMetrics(h.styledMode ? void 0 : b.style.fontSize, c).b;
                    f = u({
                        x: k ? this.yAxis.len - n : m,
                        y: Math.round(k ?
                            this.xAxis.len - m : n),
                        width: 0,
                        height: 0
                    }, f);
                    u(b, {
                        width: p.width,
                        height: p.height
                    });
                    r ? (B = !1, m = h.renderer.rotCorr(w, r), m = {
                        x: f.x + (b.x || 0) + f.width / 2 + m.x,
                        y: f.y + (b.y || 0) + {
                            top: 0,
                            middle: .5,
                            bottom: 1
                        } [b.verticalAlign] * f.height
                    }, v(m), c[g ? "attr" : "animate"](m).attr({
                        align: t
                    }), v = (r + 720) % 360, v = 180 < v && 360 > v, "left" === t ? m.y -= v ? p.height : 0 : "center" === t ? (m.x -= p.width / 2, m.y -= p.height / 2) : "right" === t && (m.x -= p.width, m.y -= v ? 0 : p.height), c.placed = !0, c.alignAttr = m) : (v(f), c.align(b, void 0, f), m = c.alignAttr);
                    B && 0 <= f.height ? this.justifyDataLabel(c,
                        b, m, p, f, g) : e(b.crop, !0) && (x = h.isInsidePlot(m.x, m.y, {
                        paneCoordinates: !0,
                        series: d
                    }) && h.isInsidePlot(m.x + p.width, m.y + p.height, {
                        paneCoordinates: !0,
                        series: d
                    }));
                    if (b.shape && !r) c[g ? "attr" : "animate"]({
                        anchorX: k ? h.plotWidth - a.plotY : a.plotX,
                        anchorY: k ? h.plotHeight - a.plotX : a.plotY
                    })
                }
                g && l && (c.placed = !1);
                x || l && !B || (c.hide(!0), c.placed = !1)
            }

            function k(a, c) {
                var b = c.filter;
                return b ? (c = b.operator, a = a[b.property], b = b.value, ">" === c && a > b || "<" === c && a < b || ">=" === c && a >= b || "<=" === c && a <= b || "==" === c && a == b || "===" === c && a === b ? !0 :
                    !1) : !0
            }

            function v() {
                var a = this,
                    d = a.chart,
                    b = a.options,
                    f = a.points,
                    g = a.hasRendered || 0,
                    t = d.renderer,
                    q = b.dataLabels,
                    v, u = q.animation;
                u = q.defer ? r(d, u, a) : {
                    defer: 0,
                    duration: 0
                };
                q = B(B(d.options.plotOptions && d.options.plotOptions.series && d.options.plotOptions.series.dataLabels, d.options.plotOptions && d.options.plotOptions[a.type] && d.options.plotOptions[a.type].dataLabels), q);
                n(this, "drawDataLabels");
                if (m(q) || q.enabled || a._hasPointLabels) {
                    var w = a.plotGroup("dataLabelsGroup", "data-labels", g ? "inherit" : "hidden", q.zIndex ||
                        6);
                    w.attr({
                        opacity: +g
                    });
                    !g && (g = a.dataLabelsGroup) && (a.visible && w.show(!0), g[b.animation ? "animate" : "attr"]({
                        opacity: 1
                    }, u));
                    f.forEach(function (f) {
                        v = l(B(q, f.dlOptions || f.options && f.options.dataLabels));
                        v.forEach(function (h, g) {
                            var l = h.enabled && (!f.isNull || f.dataLabelOnNull) && k(f, h),
                                m = f.connectors ? f.connectors[g] : f.connector,
                                n = f.dataLabels ? f.dataLabels[g] : f.dataLabel,
                                p = e(h.distance, f.labelDistance),
                                r = !n;
                            if (l) {
                                var q = f.getLabelConfig();
                                var v = e(h[f.formatPrefix + "Format"], h.format);
                                q = J(v) ? x(v, q, d) : (h[f.formatPrefix +
                                    "Formatter"] || h.formatter).call(q, h);
                                v = h.style;
                                var u = h.rotation;
                                d.styledMode || (v.color = e(h.color, v.color, a.color, C.neutralColor100), "contrast" === v.color ? (f.contrastColor = t.getContrast(f.color || a.color), v.color = !J(p) && h.inside || 0 > p || b.stacking ? f.contrastColor : C.neutralColor100) : delete f.contrastColor, b.cursor && (v.cursor = b.cursor));
                                var B = {
                                    r: h.borderRadius || 0,
                                    rotation: u,
                                    padding: h.padding,
                                    zIndex: 1
                                };
                                d.styledMode || (B.fill = h.backgroundColor, B.stroke = h.borderColor, B["stroke-width"] = h.borderWidth);
                                c(B, function (a,
                                    b) {
                                    "undefined" === typeof a && delete B[b]
                                })
                            }!n || l && J(q) ? l && J(q) && (n ? B.text = q : (f.dataLabels = f.dataLabels || [], n = f.dataLabels[g] = u ? t.text(q, 0, -9999, h.useHTML).addClass("highcharts-data-label") : t.label(q, 0, -9999, h.shape, null, null, h.useHTML, null, "data-label"), g || (f.dataLabel = n), n.addClass(" highcharts-data-label-color-" + f.colorIndex + " " + (h.className || "") + (h.useHTML ? " highcharts-tracker" : ""))), n.options = h, n.attr(B), d.styledMode || n.css(v).shadow(h.shadow), n.added || n.add(w), h.textPath && !h.useHTML && (n.setTextPath(f.getDataLabelPath &&
                                f.getDataLabelPath(n) || f.graphic, h.textPath), f.dataLabelPath && !h.textPath.enabled && (f.dataLabelPath = f.dataLabelPath.destroy())), a.alignDataLabel(f, n, h, null, r)) : (f.dataLabel = f.dataLabel && f.dataLabel.destroy(), f.dataLabels && (1 === f.dataLabels.length ? delete f.dataLabels : delete f.dataLabels[g]), g || delete f.dataLabel, m && (f.connector = f.connector.destroy(), f.connectors && (1 === f.connectors.length ? delete f.connectors : delete f.connectors[g])))
                        })
                    })
                }
                n(this, "afterDrawDataLabels")
            }

            function w(a, c, b, e, f, g) {
                var d = this.chart,
                    h = c.align,
                    k = c.verticalAlign,
                    l = a.box ? 0 : a.padding || 0,
                    m = c.x;
                m = void 0 === m ? 0 : m;
                var n = c.y;
                n = void 0 === n ? 0 : n;
                var p = (b.x || 0) + l;
                if (0 > p) {
                    "right" === h && 0 <= m ? (c.align = "left", c.inside = !0) : m -= p;
                    var r = !0
                }
                p = (b.x || 0) + e.width - l;
                p > d.plotWidth && ("left" === h && 0 >= m ? (c.align = "right", c.inside = !0) : m += d.plotWidth - p, r = !0);
                p = b.y + l;
                0 > p && ("bottom" === k && 0 <= n ? (c.verticalAlign = "top", c.inside = !0) : n -= p, r = !0);
                p = (b.y || 0) + e.height - l;
                p > d.plotHeight && ("top" === k && 0 >= n ? (c.verticalAlign = "bottom", c.inside = !0) : n += d.plotHeight - p, r = !0);
                r && (c.x = m,
                    c.y = n, a.placed = !g, a.align(c, void 0, f));
                return r
            }

            function B(a, c) {
                var b = [],
                    d;
                if (m(a) && !m(c)) b = a.map(function (a) {
                    return g(a, c)
                });
                else if (m(c) && !m(a)) b = c.map(function (b) {
                    return g(a, b)
                });
                else if (m(a) || m(c))
                    for (d = Math.max(a.length, c.length); d--;) b[d] = g(a[d], c[d]);
                else b = g(a, c);
                return b
            }

            function z(a, c, b, e, f) {
                var d = this.chart,
                    h = d.inverted,
                    g = this.xAxis,
                    k = g.reversed,
                    l = h ? c.height / 2 : c.width / 2;
                a = (a = a.pointWidth) ? a / 2 : 0;
                c.startXPos = h ? f.x : k ? -l - a : g.width - l + a;
                c.startYPos = h ? k ? this.yAxis.height - l + a : -l - a : f.y;
                e ? "hidden" ===
                    c.visibility && (c.show(), c.attr({
                        opacity: 0
                    }).animate({
                        opacity: 1
                    })) : c.attr({
                        opacity: 1
                    }).animate({
                        opacity: 0
                    }, void 0, c.hide);
                d.hasRendered && (b && c.attr({
                    x: c.startXPos,
                    y: c.startYPos
                }), c.placed = !0)
            }
            var t = [];
            a.compose = function (a) {
                if (-1 === t.indexOf(a)) {
                    var c = a.prototype;
                    t.push(a);
                    c.alignDataLabel = f;
                    c.drawDataLabels = v;
                    c.justifyDataLabel = w;
                    c.setDataLabelStartPos = z
                }
            }
        })(f || (f = {}));
        "";
        return f
    });
    M(a, "Series/Column/ColumnDataLabel.js", [a["Core/Series/DataLabel.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]],
        function (a, w, C) {
            var r = w.series,
                z = C.merge,
                x = C.pick,
                J;
            (function (u) {
                function n(a, c, e, l, f) {
                    var g = this.chart.inverted,
                        m = a.series,
                        k = a.dlBox || a.shapeArgs,
                        n = x(a.below, a.plotY > x(this.translatedThreshold, m.yAxis.len)),
                        u = x(e.inside, !!this.options.stacking);
                    k && (l = z(k), 0 > l.y && (l.height += l.y, l.y = 0), k = l.y + l.height - m.yAxis.len, 0 < k && k < l.height && (l.height -= k), g && (l = {
                        x: m.yAxis.len - l.y - l.height,
                        y: m.xAxis.len - l.x - l.width,
                        width: l.height,
                        height: l.width
                    }), u || (g ? (l.x += n ? 0 : l.width, l.width = 0) : (l.y += n ? l.height : 0, l.height = 0)));
                    e.align = x(e.align, !g || u ? "center" : n ? "right" : "left");
                    e.verticalAlign = x(e.verticalAlign, g || u ? "middle" : n ? "top" : "bottom");
                    r.prototype.alignDataLabel.call(this, a, c, e, l, f);
                    e.inside && a.contrastColor && c.css({
                        color: a.contrastColor
                    })
                }
                var m = [];
                u.compose = function (g) {
                    a.compose(r); - 1 === m.indexOf(g) && (m.push(g), g.prototype.alignDataLabel = n)
                }
            })(J || (J = {}));
            return J
        });
    M(a, "Series/Bar/BarSeries.js", [a["Series/Column/ColumnSeries.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]], function (a, w, C) {
        var r = this &&
            this.__extends || function () {
                var a = function (r, n) {
                    a = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function (a, g) {
                        a.__proto__ = g
                    } || function (a, g) {
                        for (var c in g) g.hasOwnProperty(c) && (a[c] = g[c])
                    };
                    return a(r, n)
                };
                return function (r, n) {
                    function m() {
                        this.constructor = r
                    }
                    a(r, n);
                    r.prototype = null === n ? Object.create(n) : (m.prototype = n.prototype, new m)
                }
            }(),
            z = C.extend,
            x = C.merge;
        C = function (w) {
            function u() {
                var a = null !== w && w.apply(this, arguments) || this;
                a.data = void 0;
                a.options = void 0;
                a.points = void 0;
                return a
            }
            r(u, w);
            u.defaultOptions = x(a.defaultOptions, {});
            return u
        }(a);
        z(C.prototype, {
            inverted: !0
        });
        w.registerSeriesType("bar", C);
        "";
        return C
    });
    M(a, "Series/Scatter/ScatterSeries.js", [a["Series/Column/ColumnSeries.js"], a["Series/Line/LineSeries.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]], function (a, w, C, E) {
        var r = this && this.__extends || function () {
                var a = function (m, g) {
                    a = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function (a, e) {
                        a.__proto__ = e
                    } || function (a, e) {
                        for (var c in e) e.hasOwnProperty(c) &&
                            (a[c] = e[c])
                    };
                    return a(m, g)
                };
                return function (m, g) {
                    function c() {
                        this.constructor = m
                    }
                    a(m, g);
                    m.prototype = null === g ? Object.create(g) : (c.prototype = g.prototype, new c)
                }
            }(),
            x = E.addEvent,
            J = E.extend,
            u = E.merge;
        E = function (a) {
            function m() {
                var g = null !== a && a.apply(this, arguments) || this;
                g.data = void 0;
                g.options = void 0;
                g.points = void 0;
                return g
            }
            r(m, a);
            m.prototype.applyJitter = function () {
                var a = this,
                    c = this.options.jitter,
                    e = this.points.length;
                c && this.points.forEach(function (g, f) {
                    ["x", "y"].forEach(function (l, m) {
                        var k = "plot" +
                            l.toUpperCase();
                        if (c[l] && !g.isNull) {
                            var n = a[l + "Axis"];
                            var r = c[l] * n.transA;
                            if (n && !n.isLog) {
                                var q = Math.max(0, g[k] - r);
                                n = Math.min(n.len, g[k] + r);
                                m = 1E4 * Math.sin(f + m * e);
                                g[k] = q + (n - q) * (m - Math.floor(m));
                                "x" === l && (g.clientX = g.plotX)
                            }
                        }
                    })
                })
            };
            m.prototype.drawGraph = function () {
                this.options.lineWidth ? a.prototype.drawGraph.call(this) : this.graph && (this.graph = this.graph.destroy())
            };
            m.defaultOptions = u(w.defaultOptions, {
                lineWidth: 0,
                findNearestPointBy: "xy",
                jitter: {
                    x: 0,
                    y: 0
                },
                marker: {
                    enabled: !0
                },
                tooltip: {
                    headerFormat: '<span style="color:{point.color}">\u25cf</span> <span style="font-size: 10px"> {series.name}</span><br/>',
                    pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>"
                }
            });
            return m
        }(w);
        J(E.prototype, {
            drawTracker: a.prototype.drawTracker,
            sorted: !1,
            requireSorting: !1,
            noSharedTooltip: !0,
            trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
            takeOrdinalPosition: !1
        });
        x(E, "afterTranslate", function () {
            this.applyJitter()
        });
        C.registerSeriesType("scatter", E);
        "";
        return E
    });
    M(a, "Mixins/CenteredSeries.js", [a["Core/Globals.js"], a["Core/Series/Series.js"], a["Core/Utilities.js"]], function (a, w, C) {
        var r = C.isNumber,
            z = C.pick,
            x = C.relativeLength,
            J = a.deg2rad;
        return a.CenteredSeriesMixin = {
            getCenter: function () {
                var a = this.options,
                    n = this.chart,
                    m = 2 * (a.slicedOffset || 0),
                    g = n.plotWidth - 2 * m,
                    c = n.plotHeight - 2 * m,
                    e = a.center,
                    l = Math.min(g, c),
                    f = a.size,
                    r = a.innerSize || 0;
                "string" === typeof f && (f = parseFloat(f));
                "string" === typeof r && (r = parseFloat(r));
                a = [z(e[0], "50%"), z(e[1], "50%"), z(f && 0 > f ? void 0 : a.size, "100%"), z(r && 0 > r ? void 0 : a.innerSize || 0, "0%")];
                !n.angular || this instanceof w || (a[3] = 0);
                for (e = 0; 4 > e; ++e) f = a[e], n = 2 > e || 2 === e && /%$/.test(f), a[e] =
                    x(f, [g, c, l, a[2]][e]) + (n ? m : 0);
                a[3] > a[2] && (a[3] = a[2]);
                return a
            },
            getStartAndEndRadians: function (a, n) {
                a = r(a) ? a : 0;
                n = r(n) && n > a && 360 > n - a ? n : a + 360;
                return {
                    start: J * (a + -90),
                    end: J * (n + -90)
                }
            }
        }
    });
    M(a, "Series/Pie/PiePoint.js", [a["Core/Animation/AnimationUtilities.js"], a["Core/Series/Point.js"], a["Core/Utilities.js"]], function (a, w, C) {
        var r = this && this.__extends || function () {
                var a = function (c, e) {
                    a = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function (a, c) {
                        a.__proto__ = c
                    } || function (a, c) {
                        for (var e in c) c.hasOwnProperty(e) &&
                            (a[e] = c[e])
                    };
                    return a(c, e)
                };
                return function (c, e) {
                    function g() {
                        this.constructor = c
                    }
                    a(c, e);
                    c.prototype = null === e ? Object.create(e) : (g.prototype = e.prototype, new g)
                }
            }(),
            z = a.setAnimation,
            x = C.addEvent,
            J = C.defined;
        a = C.extend;
        var u = C.isNumber,
            n = C.pick,
            m = C.relativeLength;
        w = function (a) {
            function c() {
                var c = null !== a && a.apply(this, arguments) || this;
                c.labelDistance = void 0;
                c.options = void 0;
                c.series = void 0;
                return c
            }
            r(c, a);
            c.prototype.getConnectorPath = function () {
                var a = this.labelPosition,
                    c = this.series.options.dataLabels,
                    f = this.connectorShapes,
                    g = c.connectorShape;
                f[g] && (g = f[g]);
                return g.call(this, {
                    x: a.final.x,
                    y: a.final.y,
                    alignment: a.alignment
                }, a.connectorPosition, c)
            };
            c.prototype.getTranslate = function () {
                return this.sliced ? this.slicedTranslation : {
                    translateX: 0,
                    translateY: 0
                }
            };
            c.prototype.haloPath = function (a) {
                var c = this.shapeArgs;
                return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(c.x, c.y, c.r + a, c.r + a, {
                    innerR: c.r - 1,
                    start: c.start,
                    end: c.end
                })
            };
            c.prototype.init = function () {
                var c = this;
                a.prototype.init.apply(this,
                    arguments);
                this.name = n(this.name, "Slice");
                var g = function (a) {
                    c.slice("select" === a.type)
                };
                x(this, "select", g);
                x(this, "unselect", g);
                return this
            };
            c.prototype.isValid = function () {
                return u(this.y) && 0 <= this.y
            };
            c.prototype.setVisible = function (a, c) {
                var e = this,
                    g = this.series,
                    l = g.chart,
                    k = g.options.ignoreHiddenPoint;
                c = n(c, k);
                a !== this.visible && (this.visible = this.options.visible = a = "undefined" === typeof a ? !this.visible : a, g.options.data[g.data.indexOf(this)] = this.options, ["graphic", "dataLabel", "connector", "shadowGroup"].forEach(function (c) {
                    if (e[c]) e[c][a ?
                        "show" : "hide"
                    ](a)
                }), this.legendItem && l.legend.colorizeItem(this, a), a || "hover" !== this.state || this.setState(""), k && (g.isDirty = !0), c && l.redraw())
            };
            c.prototype.slice = function (a, c, f) {
                var e = this.series;
                z(f, e.chart);
                n(c, !0);
                this.sliced = this.options.sliced = J(a) ? a : !this.sliced;
                e.options.data[e.data.indexOf(this)] = this.options;
                this.graphic && this.graphic.animate(this.getTranslate());
                this.shadowGroup && this.shadowGroup.animate(this.getTranslate())
            };
            return c
        }(w);
        a(w.prototype, {
            connectorShapes: {
                fixedOffset: function (a,
                    c, e) {
                    var g = c.breakAt;
                    c = c.touchingSliceAt;
                    return [
                        ["M", a.x, a.y], e.softConnector ? ["C", a.x + ("left" === a.alignment ? -5 : 5), a.y, 2 * g.x - c.x, 2 * g.y - c.y, g.x, g.y] : ["L", g.x, g.y],
                        ["L", c.x, c.y]
                    ]
                },
                straight: function (a, c) {
                    c = c.touchingSliceAt;
                    return [
                        ["M", a.x, a.y],
                        ["L", c.x, c.y]
                    ]
                },
                crookedLine: function (a, c, e) {
                    c = c.touchingSliceAt;
                    var g = this.series,
                        f = g.center[0],
                        n = g.chart.plotWidth,
                        r = g.chart.plotLeft;
                    g = a.alignment;
                    var k = this.shapeArgs.r;
                    e = m(e.crookDistance, 1);
                    n = "left" === g ? f + k + (n + r - f - k) * (1 - e) : r + (f - k) * e;
                    e = ["L", n, a.y];
                    f = !0;
                    if ("left" ===
                        g ? n > a.x || n < c.x : n < a.x || n > c.x) f = !1;
                    a = [
                        ["M", a.x, a.y]
                    ];
                    f && a.push(e);
                    a.push(["L", c.x, c.y]);
                    return a
                }
            }
        });
        return w
    });
    M(a, "Series/Pie/PieSeries.js", [a["Mixins/CenteredSeries.js"], a["Series/Column/ColumnSeries.js"], a["Core/Globals.js"], a["Core/Legend/LegendSymbol.js"], a["Core/Color/Palette.js"], a["Series/Pie/PiePoint.js"], a["Core/Series/Series.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Renderer/SVG/Symbols.js"], a["Core/Utilities.js"]], function (a, w, C, E, z, x, J, u, n, m) {
        var g = this && this.__extends || function () {
                var a =
                    function (c, e) {
                        a = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function (a, c) {
                            a.__proto__ = c
                        } || function (a, c) {
                            for (var e in c) c.hasOwnProperty(e) && (a[e] = c[e])
                        };
                        return a(c, e)
                    };
                return function (c, e) {
                    function f() {
                        this.constructor = c
                    }
                    a(c, e);
                    c.prototype = null === e ? Object.create(e) : (f.prototype = e.prototype, new f)
                }
            }(),
            c = a.getStartAndEndRadians;
        C = C.noop;
        var e = m.clamp,
            l = m.extend,
            f = m.fireEvent,
            r = m.merge,
            q = m.pick,
            k = m.relativeLength;
        m = function (a) {
            function l() {
                var c = null !== a && a.apply(this, arguments) || this;
                c.center =
                    void 0;
                c.data = void 0;
                c.maxLabelDistance = void 0;
                c.options = void 0;
                c.points = void 0;
                return c
            }
            g(l, a);
            l.prototype.animate = function (a) {
                var c = this,
                    e = c.points,
                    f = c.startAngleRad;
                a || e.forEach(function (a) {
                    var b = a.graphic,
                        d = a.shapeArgs;
                    b && d && (b.attr({
                        r: q(a.startR, c.center && c.center[3] / 2),
                        start: f,
                        end: f
                    }), b.animate({
                        r: d.r,
                        start: d.start,
                        end: d.end
                    }, c.options.animation))
                })
            };
            l.prototype.drawEmpty = function () {
                var a = this.startAngleRad,
                    c = this.endAngleRad,
                    e = this.options;
                if (0 === this.total && this.center) {
                    var f = this.center[0];
                    var d = this.center[1];
                    this.graph || (this.graph = this.chart.renderer.arc(f, d, this.center[1] / 2, 0, a, c).addClass("highcharts-empty-series").add(this.group));
                    this.graph.attr({
                        d: n.arc(f, d, this.center[2] / 2, 0, {
                            start: a,
                            end: c,
                            innerR: this.center[3] / 2
                        })
                    });
                    this.chart.styledMode || this.graph.attr({
                        "stroke-width": e.borderWidth,
                        fill: e.fillColor || "none",
                        stroke: e.color || z.neutralColor20
                    })
                } else this.graph && (this.graph = this.graph.destroy())
            };
            l.prototype.drawPoints = function () {
                var a = this.chart.renderer;
                this.points.forEach(function (c) {
                    c.graphic &&
                        c.hasNewShapeType() && (c.graphic = c.graphic.destroy());
                    c.graphic || (c.graphic = a[c.shapeType](c.shapeArgs).add(c.series.group), c.delayedRendering = !0)
                })
            };
            l.prototype.generatePoints = function () {
                a.prototype.generatePoints.call(this);
                this.updateTotals()
            };
            l.prototype.getX = function (a, c, f) {
                var h = this.center,
                    d = this.radii ? this.radii[f.index] || 0 : h[2] / 2;
                a = Math.asin(e((a - h[1]) / (d + f.labelDistance), -1, 1));
                return h[0] + (c ? -1 : 1) * Math.cos(a) * (d + f.labelDistance) + (0 < f.labelDistance ? (c ? -1 : 1) * this.options.dataLabels.padding :
                    0)
            };
            l.prototype.hasData = function () {
                return !!this.processedXData.length
            };
            l.prototype.redrawPoints = function () {
                var a = this,
                    c = a.chart,
                    e = c.renderer,
                    f = a.options.shadow,
                    d, b, g, k;
                this.drawEmpty();
                !f || a.shadowGroup || c.styledMode || (a.shadowGroup = e.g("shadow").attr({
                    zIndex: -1
                }).add(a.group));
                a.points.forEach(function (h) {
                    var l = {};
                    b = h.graphic;
                    if (!h.isNull && b) {
                        var m = void 0;
                        k = h.shapeArgs;
                        d = h.getTranslate();
                        c.styledMode || (m = h.shadowGroup, f && !m && (m = h.shadowGroup = e.g("shadow").add(a.shadowGroup)), m && m.attr(d), g = a.pointAttribs(h,
                            h.selected && "select"));
                        h.delayedRendering ? (b.setRadialReference(a.center).attr(k).attr(d), c.styledMode || b.attr(g).attr({
                            "stroke-linejoin": "round"
                        }).shadow(f, m), h.delayedRendering = !1) : (b.setRadialReference(a.center), c.styledMode || r(!0, l, g), r(!0, l, k, d), b.animate(l));
                        b.attr({
                            visibility: h.visible ? "inherit" : "hidden"
                        });
                        b.addClass(h.getClassName(), !0)
                    } else b && (h.graphic = b.destroy())
                })
            };
            l.prototype.sortByAngle = function (a, c) {
                a.sort(function (a, e) {
                    return "undefined" !== typeof a.angle && (e.angle - a.angle) * c
                })
            };
            l.prototype.translate =
                function (a) {
                    this.generatePoints();
                    var e = this.options,
                        g = e.slicedOffset,
                        h = g + (e.borderWidth || 0),
                        d = c(e.startAngle, e.endAngle),
                        b = this.startAngleRad = d.start;
                    d = (this.endAngleRad = d.end) - b;
                    var l = this.points,
                        m = e.dataLabels.distance;
                    e = e.ignoreHiddenPoint;
                    var n = l.length,
                        r, v = 0;
                    a || (this.center = a = this.getCenter());
                    for (r = 0; r < n; r++) {
                        var u = l[r];
                        var x = b + v * d;
                        !u.isValid() || e && !u.visible || (v += u.percentage / 100);
                        var w = b + v * d;
                        var B = {
                            x: a[0],
                            y: a[1],
                            r: a[2] / 2,
                            innerR: a[3] / 2,
                            start: Math.round(1E3 * x) / 1E3,
                            end: Math.round(1E3 * w) / 1E3
                        };
                        u.shapeType = "arc";
                        u.shapeArgs = B;
                        u.labelDistance = q(u.options.dataLabels && u.options.dataLabels.distance, m);
                        u.labelDistance = k(u.labelDistance, B.r);
                        this.maxLabelDistance = Math.max(this.maxLabelDistance || 0, u.labelDistance);
                        w = (w + x) / 2;
                        w > 1.5 * Math.PI ? w -= 2 * Math.PI : w < -Math.PI / 2 && (w += 2 * Math.PI);
                        u.slicedTranslation = {
                            translateX: Math.round(Math.cos(w) * g),
                            translateY: Math.round(Math.sin(w) * g)
                        };
                        B = Math.cos(w) * a[2] / 2;
                        var z = Math.sin(w) * a[2] / 2;
                        u.tooltipPos = [a[0] + .7 * B, a[1] + .7 * z];
                        u.half = w < -Math.PI / 2 || w > Math.PI / 2 ? 1 : 0;
                        u.angle =
                            w;
                        x = Math.min(h, u.labelDistance / 5);
                        u.labelPosition = {
                            natural: {
                                x: a[0] + B + Math.cos(w) * u.labelDistance,
                                y: a[1] + z + Math.sin(w) * u.labelDistance
                            },
                            "final": {},
                            alignment: 0 > u.labelDistance ? "center" : u.half ? "right" : "left",
                            connectorPosition: {
                                breakAt: {
                                    x: a[0] + B + Math.cos(w) * x,
                                    y: a[1] + z + Math.sin(w) * x
                                },
                                touchingSliceAt: {
                                    x: a[0] + B,
                                    y: a[1] + z
                                }
                            }
                        }
                    }
                    f(this, "afterTranslate")
                };
            l.prototype.updateTotals = function () {
                var a = this.points,
                    c = a.length,
                    e = this.options.ignoreHiddenPoint,
                    f, d = 0;
                for (f = 0; f < c; f++) {
                    var b = a[f];
                    !b.isValid() || e && !b.visible ||
                        (d += b.y)
                }
                this.total = d;
                for (f = 0; f < c; f++) b = a[f], b.percentage = 0 < d && (b.visible || !e) ? b.y / d * 100 : 0, b.total = d
            };
            l.defaultOptions = r(J.defaultOptions, {
                center: [null, null],
                clip: !1,
                colorByPoint: !0,
                dataLabels: {
                    allowOverlap: !0,
                    connectorPadding: 5,
                    connectorShape: "fixedOffset",
                    crookDistance: "70%",
                    distance: 30,
                    enabled: !0,
                    formatter: function () {
                        return this.point.isNull ? void 0 : this.point.name
                    },
                    softConnector: !0,
                    x: 0
                },
                fillColor: void 0,
                ignoreHiddenPoint: !0,
                inactiveOtherPoints: !0,
                legendType: "point",
                marker: null,
                size: null,
                showInLegend: !1,
                slicedOffset: 10,
                stickyTracking: !1,
                tooltip: {
                    followPointer: !0
                },
                borderColor: z.backgroundColor,
                borderWidth: 1,
                lineWidth: void 0,
                states: {
                    hover: {
                        brightness: .1
                    }
                }
            });
            return l
        }(J);
        l(m.prototype, {
            axisTypes: [],
            directTouch: !0,
            drawGraph: void 0,
            drawLegendSymbol: E.drawRectangle,
            drawTracker: w.prototype.drawTracker,
            getCenter: a.getCenter,
            getSymbol: C,
            isCartesian: !1,
            noSharedTooltip: !0,
            pointAttribs: w.prototype.pointAttribs,
            pointClass: x,
            requireSorting: !1,
            searchPoint: C,
            trackerGroups: ["group", "dataLabelsGroup"]
        });
        u.registerSeriesType("pie",
            m);
        "";
        return m
    });
    M(a, "Series/Pie/PieDataLabel.js", [a["Core/Series/DataLabel.js"], a["Core/Globals.js"], a["Core/Color/Palette.js"], a["Core/Renderer/RendererUtilities.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]], function (a, w, C, E, z, x) {
        var r = w.noop,
            u = E.distribute,
            n = z.series,
            m = x.arrayMax,
            g = x.clamp,
            c = x.defined,
            e = x.merge,
            l = x.pick,
            f = x.relativeLength,
            v;
        (function (q) {
            function k() {
                var a = this,
                    f = a.data,
                    d = a.chart,
                    b = a.options.dataLabels || {},
                    g = b.connectorPadding,
                    k = d.plotWidth,
                    r = d.plotHeight,
                    q = d.plotLeft,
                    v = Math.round(d.chartWidth / 3),
                    w = a.center,
                    x = w[2] / 2,
                    B = w[1],
                    z = [
                        [],
                        []
                    ],
                    D = [0, 0, 0, 0],
                    E = a.dataLabelPositioners,
                    I, J, M, O, Z, A, U, N, W, X, Y, T;
                a.visible && (b.enabled || a._hasPointLabels) && (f.forEach(function (a) {
                    a.dataLabel && a.visible && a.dataLabel.shortened && (a.dataLabel.attr({
                        width: "auto"
                    }).css({
                        width: "auto",
                        textOverflow: "clip"
                    }), a.dataLabel.shortened = !1)
                }), n.prototype.drawDataLabels.apply(a), f.forEach(function (a) {
                    a.dataLabel && (a.visible ? (z[a.half].push(a), a.dataLabel._pos = null, !c(b.style.width) && !c(a.options.dataLabels &&
                        a.options.dataLabels.style && a.options.dataLabels.style.width) && a.dataLabel.getBBox().width > v && (a.dataLabel.css({
                        width: Math.round(.7 * v) + "px"
                    }), a.dataLabel.shortened = !0)) : (a.dataLabel = a.dataLabel.destroy(), a.dataLabels && 1 === a.dataLabels.length && delete a.dataLabels))
                }), z.forEach(function (e, f) {
                    var h = e.length,
                        m = [],
                        n;
                    if (h) {
                        a.sortByAngle(e, f - .5);
                        if (0 < a.maxLabelDistance) {
                            var p = Math.max(0, B - x - a.maxLabelDistance);
                            var t = Math.min(B + x + a.maxLabelDistance, d.plotHeight);
                            e.forEach(function (a) {
                                0 < a.labelDistance && a.dataLabel &&
                                    (a.top = Math.max(0, B - x - a.labelDistance), a.bottom = Math.min(B + x + a.labelDistance, d.plotHeight), n = a.dataLabel.getBBox().height || 21, a.distributeBox = {
                                        target: a.labelPosition.natural.y - a.top + n / 2,
                                        size: n,
                                        rank: a.y
                                    }, m.push(a.distributeBox))
                            });
                            p = t + n - p;
                            u(m, p, p / 5)
                        }
                        for (Y = 0; Y < h; Y++) {
                            I = e[Y];
                            A = I.labelPosition;
                            O = I.dataLabel;
                            X = !1 === I.visible ? "hidden" : "inherit";
                            W = p = A.natural.y;
                            m && c(I.distributeBox) && ("undefined" === typeof I.distributeBox.pos ? X = "hidden" : (U = I.distributeBox.size, W = E.radialDistributionY(I)));
                            delete I.positionIndex;
                            if (b.justify) N = E.justify(I, x, w);
                            else switch (b.alignTo) {
                                case "connectors":
                                    N = E.alignToConnectors(e, f, k, q);
                                    break;
                                case "plotEdges":
                                    N = E.alignToPlotEdges(O, f, k, q);
                                    break;
                                default:
                                    N = E.radialDistributionX(a, I, W, p)
                            }
                            O._attr = {
                                visibility: X,
                                align: A.alignment
                            };
                            T = I.options.dataLabels || {};
                            O._pos = {
                                x: N + l(T.x, b.x) + ({
                                    left: g,
                                    right: -g
                                } [A.alignment] || 0),
                                y: W + l(T.y, b.y) - 10
                            };
                            A.final.x = N;
                            A.final.y = W;
                            l(b.crop, !0) && (Z = O.getBBox().width, p = null, N - Z < g && 1 === f ? (p = Math.round(Z - N + g), D[3] = Math.max(p, D[3])) : N + Z > k - g && 0 === f && (p = Math.round(N +
                                Z - k + g), D[1] = Math.max(p, D[1])), 0 > W - U / 2 ? D[0] = Math.max(Math.round(-W + U / 2), D[0]) : W + U / 2 > r && (D[2] = Math.max(Math.round(W + U / 2 - r), D[2])), O.sideOverflow = p)
                        }
                    }
                }), 0 === m(D) || this.verifyDataLabelOverflow(D)) && (this.placeDataLabels(), this.points.forEach(function (c) {
                    T = e(b, c.options.dataLabels);
                    if (J = l(T.connectorWidth, 1)) {
                        var f;
                        M = c.connector;
                        if ((O = c.dataLabel) && O._pos && c.visible && 0 < c.labelDistance) {
                            X = O._attr.visibility;
                            if (f = !M) c.connector = M = d.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-" +
                                c.colorIndex + (c.className ? " " + c.className : "")).add(a.dataLabelsGroup), d.styledMode || M.attr({
                                "stroke-width": J,
                                stroke: T.connectorColor || c.color || C.neutralColor60
                            });
                            M[f ? "attr" : "animate"]({
                                d: c.getConnectorPath()
                            });
                            M.attr("visibility", X)
                        } else M && (c.connector = M.destroy())
                    }
                }))
            }

            function v() {
                this.points.forEach(function (a) {
                    var c = a.dataLabel,
                        d;
                    c && a.visible && ((d = c._pos) ? (c.sideOverflow && (c._attr.width = Math.max(c.getBBox().width - c.sideOverflow, 0), c.css({
                        width: c._attr.width + "px",
                        textOverflow: (this.options.dataLabels.style || {}).textOverflow || "ellipsis"
                    }), c.shortened = !0), c.attr(c._attr), c[c.moved ? "animate" : "attr"](d), c.moved = !0) : c && c.attr({
                        y: -9999
                    }));
                    delete a.distributeBox
                }, this)
            }

            function w(a) {
                var c = this.center,
                    d = this.options,
                    b = d.center,
                    e = d.minSize || 80,
                    k = null !== d.size;
                if (!k) {
                    if (null !== b[0]) var l = Math.max(c[2] - Math.max(a[1], a[3]), e);
                    else l = Math.max(c[2] - a[1] - a[3], e), c[0] += (a[3] - a[1]) / 2;
                    null !== b[1] ? l = g(l, e, c[2] - Math.max(a[0], a[2])) : (l = g(l, e, c[2] - a[0] - a[2]), c[1] += (a[0] - a[2]) / 2);
                    l < c[2] ? (c[2] = l, c[3] = Math.min(f(d.innerSize ||
                        0, l), l), this.translate(c), this.drawDataLabels && this.drawDataLabels()) : k = !0
                }
                return k
            }
            var x = [],
                z = {
                    radialDistributionY: function (a) {
                        return a.top + a.distributeBox.pos
                    },
                    radialDistributionX: function (a, c, d, b) {
                        return a.getX(d < c.top + 2 || d > c.bottom - 2 ? b : d, c.half, c)
                    },
                    justify: function (a, c, d) {
                        return d[0] + (a.half ? -1 : 1) * (c + a.labelDistance)
                    },
                    alignToPlotEdges: function (a, c, d, b) {
                        a = a.getBBox().width;
                        return c ? a + b : d - a - b
                    },
                    alignToConnectors: function (a, c, d, b) {
                        var e = 0,
                            f;
                        a.forEach(function (a) {
                            f = a.dataLabel.getBBox().width;
                            f > e &&
                                (e = f)
                        });
                        return c ? e + b : d - e - b
                    }
                };
            q.compose = function (c) {
                a.compose(n); - 1 === x.indexOf(c) && (x.push(c), c = c.prototype, c.dataLabelPositioners = z, c.alignDataLabel = r, c.drawDataLabels = k, c.placeDataLabels = v, c.verifyDataLabelOverflow = w)
            }
        })(v || (v = {}));
        return v
    });
    M(a, "Extensions/OverlappingDataLabels.js", [a["Core/Chart/Chart.js"], a["Core/Utilities.js"]], function (a, w) {
        function r(a, g) {
            var c = !1;
            if (a) {
                var e = a.newOpacity;
                a.oldOpacity !== e && (a.alignAttr && a.placed ? (a[e ? "removeClass" : "addClass"]("highcharts-data-label-hidden"),
                    c = !0, a.alignAttr.opacity = e, a[a.isOld ? "animate" : "attr"](a.alignAttr, null, function () {
                        g.styledMode || a.css({
                            pointerEvents: e ? "auto" : "none"
                        })
                    }), z(g, "afterHideOverlappingLabel")) : a.attr({
                    opacity: e
                }));
                a.isOld = !0
            }
            return c
        }
        var E = w.addEvent,
            z = w.fireEvent,
            x = w.isArray,
            J = w.isNumber,
            u = w.objectEach,
            n = w.pick;
        E(a, "render", function () {
            var a = this,
                g = [];
            (this.labelCollectors || []).forEach(function (a) {
                g = g.concat(a())
            });
            (this.yAxis || []).forEach(function (a) {
                a.stacking && a.options.stackLabels && !a.options.stackLabels.allowOverlap &&
                    u(a.stacking.stacks, function (a) {
                        u(a, function (a) {
                            a.label && "hidden" !== a.label.visibility && g.push(a.label)
                        })
                    })
            });
            (this.series || []).forEach(function (c) {
                var e = c.options.dataLabels;
                c.visible && (!1 !== e.enabled || c._hasPointLabels) && (e = function (c) {
                    return c.forEach(function (c) {
                        c.visible && (x(c.dataLabels) ? c.dataLabels : c.dataLabel ? [c.dataLabel] : []).forEach(function (e) {
                            var f = e.options;
                            e.labelrank = n(f.labelrank, c.labelrank, c.shapeArgs && c.shapeArgs.height);
                            f.allowOverlap ? (e.oldOpacity = e.opacity, e.newOpacity = 1, r(e,
                                a)) : g.push(e)
                        })
                    })
                }, e(c.nodes || []), e(c.points))
            });
            this.hideOverlappingLabels(g)
        });
        a.prototype.hideOverlappingLabels = function (a) {
            var g = this,
                c = a.length,
                e = g.renderer,
                l, f, m, n = !1;
            var k = function (a) {
                var c, f = a.box ? 0 : a.padding || 0,
                    g = c = 0,
                    d;
                if (a && (!a.alignAttr || a.placed)) {
                    var b = a.alignAttr || {
                        x: a.attr("x"),
                        y: a.attr("y")
                    };
                    var k = a.parentGroup;
                    a.width || (c = a.getBBox(), a.width = c.width, a.height = c.height, c = e.fontMetrics(null, a.element).h);
                    var l = a.width - 2 * f;
                    (d = {
                        left: "0",
                        center: "0.5",
                        right: "1"
                    } [a.alignValue]) ? g = +d * l: J(a.x) &&
                        Math.round(a.x) !== a.translateX && (g = a.x - a.translateX);
                    return {
                        x: b.x + (k.translateX || 0) + f - (g || 0),
                        y: b.y + (k.translateY || 0) + f - c,
                        width: a.width - 2 * f,
                        height: a.height - 2 * f
                    }
                }
            };
            for (f = 0; f < c; f++)
                if (l = a[f]) l.oldOpacity = l.opacity, l.newOpacity = 1, l.absoluteBox = k(l);
            a.sort(function (a, c) {
                return (c.labelrank || 0) - (a.labelrank || 0)
            });
            for (f = 0; f < c; f++) {
                var u = (k = a[f]) && k.absoluteBox;
                for (l = f + 1; l < c; ++l) {
                    var w = (m = a[l]) && m.absoluteBox;
                    !u || !w || k === m || 0 === k.newOpacity || 0 === m.newOpacity || w.x >= u.x + u.width || w.x + w.width <= u.x || w.y >= u.y + u.height ||
                        w.y + w.height <= u.y || ((k.labelrank < m.labelrank ? k : m).newOpacity = 0)
                }
            }
            a.forEach(function (a) {
                r(a, g) && (n = !0)
            });
            n && z(g, "afterHideAllOverlappingLabels")
        }
    });
    M(a, "Core/Responsive.js", [a["Core/Utilities.js"]], function (a) {
        var r = a.extend,
            C = a.find,
            E = a.isArray,
            z = a.isObject,
            x = a.merge,
            J = a.objectEach,
            u = a.pick,
            n = a.splat,
            m = a.uniqueKey,
            g;
        (function (a) {
            var c = [];
            a.compose = function (a) {
                -1 === c.indexOf(a) && (c.push(a), r(a.prototype, g.prototype));
                return a
            };
            var g = function () {
                function a() {}
                a.prototype.currentOptions = function (a) {
                    function c(a,
                        f, g, k) {
                        var h;
                        J(a, function (a, b) {
                            if (!k && -1 < e.collectionsWithUpdate.indexOf(b) && f[b])
                                for (a = n(a), g[b] = [], h = 0; h < Math.max(a.length, f[b].length); h++) f[b][h] && (void 0 === a[h] ? g[b][h] = f[b][h] : (g[b][h] = {}, c(a[h], f[b][h], g[b][h], k + 1)));
                            else z(a) ? (g[b] = E(a) ? [] : {}, c(a, f[b] || {}, g[b], k + 1)) : g[b] = "undefined" === typeof f[b] ? null : f[b]
                        })
                    }
                    var e = this,
                        f = {};
                    c(a, this.options, f, 0);
                    return f
                };
                a.prototype.matchResponsiveRule = function (a, c) {
                    var e = a.condition;
                    (e.callback || function () {
                        return this.chartWidth <= u(e.maxWidth, Number.MAX_VALUE) &&
                            this.chartHeight <= u(e.maxHeight, Number.MAX_VALUE) && this.chartWidth >= u(e.minWidth, 0) && this.chartHeight >= u(e.minHeight, 0)
                    }).call(this) && c.push(a._id)
                };
                a.prototype.setResponsive = function (a, c) {
                    var e = this,
                        f = this.options.responsive,
                        g = this.currentResponsive,
                        l = [];
                    !c && f && f.rules && f.rules.forEach(function (a) {
                        "undefined" === typeof a._id && (a._id = m());
                        e.matchResponsiveRule(a, l)
                    }, this);
                    c = x.apply(void 0, l.map(function (a) {
                        return C((f || {}).rules || [], function (c) {
                            return c._id === a
                        })
                    }).map(function (a) {
                        return a && a.chartOptions
                    }));
                    c.isResponsiveOptions = !0;
                    l = l.toString() || void 0;
                    l !== (g && g.ruleIds) && (g && this.update(g.undoOptions, a, !0), l ? (g = this.currentOptions(c), g.isResponsiveOptions = !0, this.currentResponsive = {
                        ruleIds: l,
                        mergedOptions: c,
                        undoOptions: g
                    }, this.update(c, a, !0)) : this.currentResponsive = void 0)
                };
                return a
            }()
        })(g || (g = {}));
        "";
        "";
        return g
    });
    M(a, "masters/highcharts.src.js", [a["Core/Globals.js"], a["Core/Utilities.js"], a["Core/DefaultOptions.js"], a["Core/Animation/Fx.js"], a["Core/Animation/AnimationUtilities.js"], a["Core/Renderer/HTML/AST.js"],
        a["Core/FormatUtilities.js"], a["Core/Renderer/RendererUtilities.js"], a["Core/Renderer/SVG/SVGElement.js"], a["Core/Renderer/SVG/SVGRenderer.js"], a["Core/Renderer/HTML/HTMLElement.js"], a["Core/Renderer/HTML/HTMLRenderer.js"], a["Core/Axis/Axis.js"], a["Core/Axis/DateTimeAxis.js"], a["Core/Axis/LogarithmicAxis.js"], a["Core/Axis/PlotLineOrBand/PlotLineOrBand.js"], a["Core/Axis/Tick.js"], a["Core/Tooltip.js"], a["Core/Series/Point.js"], a["Core/Pointer.js"], a["Core/MSPointer.js"], a["Core/Legend/Legend.js"], a["Core/Chart/Chart.js"],
        a["Core/Series/Series.js"], a["Core/Series/SeriesRegistry.js"], a["Series/Column/ColumnSeries.js"], a["Series/Column/ColumnDataLabel.js"], a["Series/Pie/PieSeries.js"], a["Series/Pie/PieDataLabel.js"], a["Core/Series/DataLabel.js"], a["Core/Responsive.js"], a["Core/Color/Color.js"], a["Core/Time.js"]
    ], function (a, w, C, E, z, x, J, u, n, m, g, c, e, l, f, v, q, k, I, D, B, M, t, h, d, b, p, G, y, L, F, P, S) {
        a.animate = z.animate;
        a.animObject = z.animObject;
        a.getDeferredAnimation = z.getDeferredAnimation;
        a.setAnimation = z.setAnimation;
        a.stop = z.stop;
        a.timers = E.timers;
        a.AST = x;
        a.Axis = e;
        a.Chart = t;
        a.chart = t.chart;
        a.Fx = E;
        a.Legend = M;
        a.PlotLineOrBand = v;
        a.Point = I;
        a.Pointer = B.isRequired() ? B : D;
        a.Series = h;
        a.SVGElement = n;
        a.SVGRenderer = m;
        a.Tick = q;
        a.Time = S;
        a.Tooltip = k;
        a.Color = P;
        a.color = P.parse;
        c.compose(m);
        g.compose(n);
        a.defaultOptions = C.defaultOptions;
        a.getOptions = C.getOptions;
        a.time = C.defaultTime;
        a.setOptions = C.setOptions;
        a.dateFormat = J.dateFormat;
        a.format = J.format;
        a.numberFormat = J.numberFormat;
        a.addEvent = w.addEvent;
        a.arrayMax = w.arrayMax;
        a.arrayMin = w.arrayMin;
        a.attr = w.attr;
        a.clearTimeout = w.clearTimeout;
        a.correctFloat = w.correctFloat;
        a.createElement = w.createElement;
        a.css = w.css;
        a.defined = w.defined;
        a.destroyObjectProperties = w.destroyObjectProperties;
        a.discardElement = w.discardElement;
        a.distribute = u.distribute;
        a.erase = w.erase;
        a.error = w.error;
        a.extend = w.extend;
        a.extendClass = w.extendClass;
        a.find = w.find;
        a.fireEvent = w.fireEvent;
        a.getMagnitude = w.getMagnitude;
        a.getStyle = w.getStyle;
        a.inArray = w.inArray;
        a.isArray = w.isArray;
        a.isClass = w.isClass;
        a.isDOMElement = w.isDOMElement;
        a.isFunction = w.isFunction;
        a.isNumber = w.isNumber;
        a.isObject = w.isObject;
        a.isString = w.isString;
        a.keys = w.keys;
        a.merge = w.merge;
        a.normalizeTickInterval = w.normalizeTickInterval;
        a.objectEach = w.objectEach;
        a.offset = w.offset;
        a.pad = w.pad;
        a.pick = w.pick;
        a.pInt = w.pInt;
        a.relativeLength = w.relativeLength;
        a.removeEvent = w.removeEvent;
        a.seriesType = d.seriesType;
        a.splat = w.splat;
        a.stableSort = w.stableSort;
        a.syncTimeout = w.syncTimeout;
        a.timeUnits = w.timeUnits;
        a.uniqueKey = w.uniqueKey;
        a.useSerialIds = w.useSerialIds;
        a.wrap = w.wrap;
        p.compose(b);
        L.compose(h);
        l.compose(e);
        f.compose(e);
        y.compose(G);
        v.compose(e);
        F.compose(t);
        return a
    });
    a["masters/highcharts.src.js"]._modules = a;
    return a["masters/highcharts.src.js"]
});