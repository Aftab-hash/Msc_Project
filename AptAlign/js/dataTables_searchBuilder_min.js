/*!
 SearchBuilder 1.3.0
 ©SpryMedia Ltd - datatables.net/license/mit
*/
var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function (k, m, l) {
    if (k == Array.prototype || k == Object.prototype) return k;
    k[m] = l.value;
    return k
};
$jscomp.getGlobal = function (k) {
    k = ["object" == typeof globalThis && globalThis, k, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
    for (var m = 0; m < k.length; ++m) {
        var l = k[m];
        if (l && l.Math == Math) return l
    }
    throw Error("Cannot find global object");
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.IS_SYMBOL_NATIVE = "function" === typeof Symbol && "symbol" === typeof Symbol("x");
$jscomp.TRUST_ES6_POLYFILLS = !$jscomp.ISOLATE_POLYFILLS || $jscomp.IS_SYMBOL_NATIVE;
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
var $jscomp$lookupPolyfilledValue = function (k, m) {
    var l = $jscomp.propertyToPolyfillSymbol[m];
    if (null == l) return k[m];
    l = k[l];
    return void 0 !== l ? l : k[m]
};
$jscomp.polyfill = function (k, m, l, h) {
    m && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(k, m, l, h) : $jscomp.polyfillUnisolated(k, m, l, h))
};
$jscomp.polyfillUnisolated = function (k, m, l, h) {
    l = $jscomp.global;
    k = k.split(".");
    for (h = 0; h < k.length - 1; h++) {
        var p = k[h];
        if (!(p in l)) return;
        l = l[p]
    }
    k = k[k.length - 1];
    h = l[k];
    m = m(h);
    m != h && null != m && $jscomp.defineProperty(l, k, {
        configurable: !0,
        writable: !0,
        value: m
    })
};
$jscomp.polyfillIsolated = function (k, m, l, h) {
    var p = k.split(".");
    k = 1 === p.length;
    h = p[0];
    h = !k && h in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
    for (var t = 0; t < p.length - 1; t++) {
        var v = p[t];
        if (!(v in h)) return;
        h = h[v]
    }
    p = p[p.length - 1];
    l = $jscomp.IS_SYMBOL_NATIVE && "es6" === l ? h[p] : null;
    m = m(l);
    null != m && (k ? $jscomp.defineProperty($jscomp.polyfills, p, {
        configurable: !0,
        writable: !0,
        value: m
    }) : m !== l && ($jscomp.propertyToPolyfillSymbol[p] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(p) : $jscomp.POLYFILL_PREFIX + p, p =
        $jscomp.propertyToPolyfillSymbol[p], $jscomp.defineProperty(h, p, {
            configurable: !0,
            writable: !0,
            value: m
        })))
};
$jscomp.polyfill("Object.is", function (k) {
    return k ? k : function (m, l) {
        return m === l ? 0 !== m || 1 / m === 1 / l : m !== m && l !== l
    }
}, "es6", "es3");
$jscomp.polyfill("Array.prototype.includes", function (k) {
    return k ? k : function (m, l) {
        var h = this;
        h instanceof String && (h = String(h));
        var p = h.length;
        l = l || 0;
        for (0 > l && (l = Math.max(l + p, 0)); l < p; l++) {
            var t = h[l];
            if (t === m || Object.is(t, m)) return !0
        }
        return !1
    }
}, "es7", "es3");
$jscomp.checkStringArgs = function (k, m, l) {
    if (null == k) throw new TypeError("The 'this' value for String.prototype." + l + " must not be null or undefined");
    if (m instanceof RegExp) throw new TypeError("First argument to String.prototype." + l + " must not be a regular expression");
    return k + ""
};
$jscomp.polyfill("String.prototype.includes", function (k) {
    return k ? k : function (m, l) {
        return -1 !== $jscomp.checkStringArgs(this, m, "includes").indexOf(m, l || 0)
    }
}, "es6", "es3");
$jscomp.arrayIteratorImpl = function (k) {
    var m = 0;
    return function () {
        return m < k.length ? {
            done: !1,
            value: k[m++]
        } : {
            done: !0
        }
    }
};
$jscomp.arrayIterator = function (k) {
    return {
        next: $jscomp.arrayIteratorImpl(k)
    }
};
$jscomp.initSymbol = function () {};
$jscomp.polyfill("Symbol", function (k) {
    if (k) return k;
    var m = function (p, t) {
        this.$jscomp$symbol$id_ = p;
        $jscomp.defineProperty(this, "description", {
            configurable: !0,
            writable: !0,
            value: t
        })
    };
    m.prototype.toString = function () {
        return this.$jscomp$symbol$id_
    };
    var l = 0,
        h = function (p) {
            if (this instanceof h) throw new TypeError("Symbol is not a constructor");
            return new m("jscomp_symbol_" + (p || "") + "_" + l++, p)
        };
    return h
}, "es6", "es3");
$jscomp.initSymbolIterator = function () {};
$jscomp.polyfill("Symbol.iterator", function (k) {
        if (k) return k;
        k = Symbol("Symbol.iterator");
        for (var m = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), l = 0; l < m.length; l++) {
            var h = $jscomp.global[m[l]];
            "function" === typeof h && "function" != typeof h.prototype[k] && $jscomp.defineProperty(h.prototype, k, {
                configurable: !0,
                writable: !0,
                value: function () {
                    return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this))
                }
            })
        }
        return k
    }, "es6",
    "es3");
$jscomp.initSymbolAsyncIterator = function () {};
$jscomp.iteratorPrototype = function (k) {
    k = {
        next: k
    };
    k[Symbol.iterator] = function () {
        return this
    };
    return k
};
$jscomp.iteratorFromArray = function (k, m) {
    k instanceof String && (k += "");
    var l = 0,
        h = {
            next: function () {
                if (l < k.length) {
                    var p = l++;
                    return {
                        value: m(p, k[p]),
                        done: !1
                    }
                }
                h.next = function () {
                    return {
                        done: !0,
                        value: void 0
                    }
                };
                return h.next()
            }
        };
    h[Symbol.iterator] = function () {
        return h
    };
    return h
};
$jscomp.polyfill("Array.prototype.keys", function (k) {
    return k ? k : function () {
        return $jscomp.iteratorFromArray(this, function (m) {
            return m
        })
    }
}, "es6", "es3");
$jscomp.polyfill("String.prototype.startsWith", function (k) {
    return k ? k : function (m, l) {
        var h = $jscomp.checkStringArgs(this, m, "startsWith");
        m += "";
        var p = h.length,
            t = m.length;
        l = Math.max(0, Math.min(l | 0, h.length));
        for (var v = 0; v < t && l < p;)
            if (h[l++] != m[v++]) return !1;
        return v >= t
    }
}, "es6", "es3");
$jscomp.polyfill("String.prototype.endsWith", function (k) {
    return k ? k : function (m, l) {
        var h = $jscomp.checkStringArgs(this, m, "endsWith");
        m += "";
        void 0 === l && (l = h.length);
        l = Math.max(0, Math.min(l | 0, h.length));
        for (var p = m.length; 0 < p && 0 < l;)
            if (h[--l] != m[--p]) return !1;
        return 0 >= p
    }
}, "es6", "es3");
(function () {
    function k(c) {
        h = c;
        p = c.fn.dataTable
    }

    function m(c) {
        B = c;
        E = c.fn.dataTable
    }

    function l(c) {
        x = c;
        C = c.fn.DataTable
    }
    var h, p, t = window.moment,
        v = window.luxon,
        r = function () {
            function c(a, b, d, e, f) {
                var g = this;
                void 0 === e && (e = 0);
                void 0 === f && (f = 1);
                if (!p || !p.versionCheck || !p.versionCheck("1.10.0")) throw Error("SearchPane requires DataTables 1.10 or newer");
                this.classes = h.extend(!0, {}, c.classes);
                this.c = h.extend(!0, {}, c.defaults, h.fn.dataTable.ext.searchBuilder, b);
                b = this.c.i18n;
                this.s = {
                    condition: void 0,
                    conditions: {},
                    data: void 0,
                    dataIdx: -1,
                    dataPoints: [],
                    dateFormat: !1,
                    depth: f,
                    dt: a,
                    filled: !1,
                    index: e,
                    origData: void 0,
                    topGroup: d,
                    type: "",
                    value: []
                };
                this.dom = {
                    buttons: h("<div/>").addClass(this.classes.buttonContainer),
                    condition: h("<select disabled/>").addClass(this.classes.condition).addClass(this.classes.dropDown).addClass(this.classes.italic).attr("autocomplete", "hacking"),
                    conditionTitle: h('<option value="" disabled selected hidden/>').text(this.s.dt.i18n("searchBuilder.condition", b.condition)),
                    container: h("<div/>").addClass(this.classes.container),
                    data: h("<select/>").addClass(this.classes.data).addClass(this.classes.dropDown).addClass(this.classes.italic),
                    dataTitle: h('<option value="" disabled selected hidden/>').text(this.s.dt.i18n("searchBuilder.data", b.data)),
                    defaultValue: h("<select disabled/>").addClass(this.classes.value).addClass(this.classes.dropDown).addClass(this.classes.select),
                    "delete": h("<button/>").html(this.s.dt.i18n("searchBuilder.delete", b["delete"])).addClass(this.classes["delete"]).addClass(this.classes.button).attr("title",
                        this.s.dt.i18n("searchBuilder.deleteTitle", b.deleteTitle)).attr("type", "button"),
                    left: h("<button/>").text(this.s.dt.i18n("searchBuilder.left", b.left)).addClass(this.classes.left).addClass(this.classes.button).attr("title", this.s.dt.i18n("searchBuilder.leftTitle", b.leftTitle)).attr("type", "button"),
                    right: h("<button/>").text(this.s.dt.i18n("searchBuilder.right", b.right)).addClass(this.classes.right).addClass(this.classes.button).attr("title", this.s.dt.i18n("searchBuilder.rightTitle", b.rightTitle)).attr("type",
                        "button"),
                    value: [h("<select disabled/>").addClass(this.classes.value).addClass(this.classes.dropDown).addClass(this.classes.italic).addClass(this.classes.select)],
                    valueTitle: h('<option value="--valueTitle--" selected/>').text(this.s.dt.i18n("searchBuilder.value", b.value))
                };
                if (this.c.greyscale)
                    for (this.dom.data.addClass(this.classes.greyscale), this.dom.condition.addClass(this.classes.greyscale), this.dom.defaultValue.addClass(this.classes.greyscale), a = 0, d = this.dom.value; a < d.length; a++) d[a].addClass(this.classes.greyscale);
                this.s.dt.on("draw.dtsb", function () {
                    g._adjustCriteria()
                });
                this.s.dt.on("buttons-action.dtsb", function () {
                    g._adjustCriteria()
                });
                h(window).on("resize.dtsb", p.util.throttle(function () {
                    g._adjustCriteria()
                }));
                this._buildCriteria();
                return this
            }
            c.prototype.updateArrows = function (a, b) {
                void 0 === a && (a = !1);
                void 0 === b && (b = !0);
                this.dom.container.children().detach();
                this.dom.container.append(this.dom.data).append(this.dom.condition).append(this.dom.value[0]);
                this.setListeners();
                void 0 !== this.dom.value[0] && this.dom.value[0].trigger("dtsb-inserted");
                for (var d = 1; d < this.dom.value.length; d++) this.dom.container.append(this.dom.value[d]), this.dom.value[d].trigger("dtsb-inserted");
                1 < this.s.depth && this.dom.buttons.append(this.dom.left);
                (!1 === this.c.depthLimit || this.s.depth < this.c.depthLimit) && a ? this.dom.buttons.append(this.dom.right) : this.dom.right.remove();
                this.dom.buttons.append(this.dom["delete"]);
                this.dom.container.append(this.dom.buttons);
                b && this._adjustCriteria()
            };
            c.prototype.destroy = function () {
                this.dom.data.off(".dtsb");
                this.dom.condition.off(".dtsb");
                this.dom["delete"].off(".dtsb");
                for (var a = 0, b = this.dom.value; a < b.length; a++) b[a].off(".dtsb");
                this.dom.container.remove()
            };
            c.prototype.search = function (a, b) {
                var d = this.s.conditions[this.s.condition];
                if (void 0 !== this.s.condition && void 0 !== d) {
                    var e = a[this.s.dataIdx];
                    if (this.s.type.includes("num") && ("" !== this.s.dt.settings()[0].oLanguage.sDecimal || "" !== this.s.dt.settings()[0].oLanguage.sThousands)) {
                        e = [a[this.s.dataIdx]];
                        "" !== this.s.dt.settings()[0].oLanguage.sDecimal && (e = a[this.s.dataIdx].split(this.s.dt.settings()[0].oLanguage.sDecimal));
                        if ("" !== this.s.dt.settings()[0].oLanguage.sThousands)
                            for (a = 0; a < e.length; a++) e[a] = e[a].replace(this.s.dt.settings()[0].oLanguage.sThousands, ",");
                        e = e.join(".")
                    }
                    "filter" !== this.c.orthogonal.search && (e = this.s.dt.settings()[0], e = e.oApi._fnGetCellData(e, b, this.s.dataIdx, "string" === typeof this.c.orthogonal ? this.c.orthogonal : this.c.orthogonal.search));
                    if ("array" === this.s.type)
                        for (Array.isArray(e) || (e = [e]), e.sort(), b = 0, a = e; b < a.length; b++) {
                            var f = a[b];
                            f && f.replace(/[\r\n\u2028]/g, " ")
                        } else null !== e && (e = e.replace(/[\r\n\u2028]/g,
                            " "));
                    this.s.type.includes("html") && (e = e.replace(/(<([^>]+)>)/ig, ""));
                    null === e && (e = "");
                    return d.search(e, this.s.value, this)
                }
            };
            c.prototype.getDetails = function (a) {
                void 0 === a && (a = !1);
                if (null !== this.s.type && this.s.type.includes("num") && ("" !== this.s.dt.settings()[0].oLanguage.sDecimal || "" !== this.s.dt.settings()[0].oLanguage.sThousands))
                    for (a = 0; a < this.s.value.length; a++) {
                        var b = [this.s.value[a].toString()];
                        "" !== this.s.dt.settings()[0].oLanguage.sDecimal && (b = this.s.value[a].split(this.s.dt.settings()[0].oLanguage.sDecimal));
                        if ("" !== this.s.dt.settings()[0].oLanguage.sThousands)
                            for (var d = 0; d < b.length; d++) b[d] = b[d].replace(this.s.dt.settings()[0].oLanguage.sThousands, ",");
                        this.s.value[a] = b.join(".")
                    } else if (null !== this.s.type && a)
                        if (this.s.type.includes("date") || this.s.type.includes("time"))
                            for (a = 0; a < this.s.value.length; a++) null === this.s.value[a].match(/^\d{4}-([0]\d|1[0-2])-([0-2]\d|3[01])$/g) && (this.s.value[a] = "");
                        else if (this.s.type.includes("moment"))
                    for (a = 0; a < this.s.value.length; a++) this.s.value[a] = t(this.s.value[a],
                        this.s.dateFormat).toISOString();
                else if (this.s.type.includes("luxon"))
                    for (a = 0; a < this.s.value.length; a++) this.s.value[a] = v.DateTime.fromFormat(this.s.value[a], this.s.dateFormat).toISO();
                if (this.s.type.includes("num") && this.s.dt.page.info().serverSide)
                    for (a = 0; a < this.s.value.length; a++) this.s.value[a] = this.s.value[a].replace(/[^0-9.]/g, "");
                return {
                    condition: this.s.condition,
                    data: this.s.data,
                    origData: this.s.origData,
                    type: this.s.type,
                    value: this.s.value.map(function (e) {
                        return e.toString()
                    })
                }
            };
            c.prototype.getNode =
                function () {
                    return this.dom.container
                };
            c.prototype.populate = function () {
                this._populateData(); - 1 !== this.s.dataIdx && (this._populateCondition(), void 0 !== this.s.condition && this._populateValue())
            };
            c.prototype.rebuild = function (a) {
                var b = !1,
                    d;
                this._populateData();
                if (void 0 !== a.data) {
                    var e = this.classes.italic,
                        f = this.dom.data;
                    this.dom.data.children("option").each(function () {
                        h(this).text() === a.data ? (h(this).prop("selected", !0), f.removeClass(e), b = !0, d = h(this).val()) : h(this).removeProp("selected")
                    })
                }
                if (b) {
                    this.s.data =
                        a.data;
                    this.s.origData = a.origData;
                    this.s.dataIdx = d;
                    this.c.orthogonal = this._getOptions().orthogonal;
                    this.dom.dataTitle.remove();
                    this._populateCondition();
                    this.dom.conditionTitle.remove();
                    for (var g = void 0, n = this.dom.condition.children("option"), q = 0; q < n.length; q++) {
                        var u = h(n[q]);
                        void 0 !== a.condition && u.val() === a.condition && "string" === typeof a.condition ? (u.prop("selected", !0), g = u.val()) : u.removeProp("selected")
                    }
                    this.s.condition = g;
                    if (void 0 !== this.s.condition) {
                        this.dom.conditionTitle.removeProp("selected");
                        this.dom.conditionTitle.remove();
                        this.dom.condition.removeClass(this.classes.italic);
                        for (q = 0; q < n.length; q++) u = h(n[q]), u.val() !== this.s.condition && u.removeProp("selected");
                        this._populateValue(a)
                    } else this.dom.conditionTitle.prependTo(this.dom.condition).prop("selected", !0)
                }
            };
            c.prototype.setListeners = function () {
                var a = this;
                this.dom.data.unbind("change").on("change.dtsb", function () {
                    a.dom.dataTitle.removeProp("selected");
                    for (var b = a.dom.data.children("option." + a.classes.option), d = 0; d < b.length; d++) {
                        var e =
                            h(b[d]);
                        e.val() === a.dom.data.val() ? (a.dom.data.removeClass(a.classes.italic), e.prop("selected", !0), a.s.dataIdx = +e.val(), a.s.data = e.text(), a.s.origData = e.prop("origData"), a.c.orthogonal = a._getOptions().orthogonal, a._clearCondition(), a._clearValue(), a._populateCondition(), a.s.filled && (a.s.filled = !1, a.s.dt.draw(), a.setListeners()), a.s.dt.state.save()) : e.removeProp("selected")
                    }
                });
                this.dom.condition.unbind("change").on("change.dtsb", function () {
                    a.dom.conditionTitle.removeProp("selected");
                    for (var b = a.dom.condition.children("option." +
                            a.classes.option), d = 0; d < b.length; d++) {
                        var e = h(b[d]);
                        if (e.val() === a.dom.condition.val()) {
                            a.dom.condition.removeClass(a.classes.italic);
                            e.prop("selected", !0);
                            e = e.val();
                            for (var f = 0, g = Object.keys(a.s.conditions); f < g.length; f++)
                                if (g[f] === e) {
                                    a.s.condition = e;
                                    break
                                } a._clearValue();
                            a._populateValue();
                            e = 0;
                            for (f = a.dom.value; e < f.length; e++) g = f[e], a.s.filled && void 0 !== g && 0 !== a.dom.container.has(g[0]).length && (a.s.filled = !1, a.s.dt.draw(), a.setListeners());
                            (0 === a.dom.value.length || 1 === a.dom.value.length && void 0 ===
                                a.dom.value[0]) && a.s.dt.draw()
                        } else e.removeProp("selected")
                    }
                })
            };
            c.prototype._adjustCriteria = function () {
                if (0 !== h(document).has(this.dom.container).length) {
                    var a = this.dom.value[this.dom.value.length - 1];
                    if (void 0 !== a && 0 !== this.dom.container.has(a[0]).length) {
                        var b = a.outerWidth(!0);
                        a = a.offset().left + b;
                        var d = this.dom.left.offset(),
                            e = this.dom.right.offset(),
                            f = this.dom["delete"].offset(),
                            g = 0 !== this.dom.container.has(this.dom.left[0]).length,
                            n = 0 !== this.dom.container.has(this.dom.right[0]).length,
                            q = g ? d.left :
                            n ? e.left : f.left;
                        (15 > q - a || g && d.top !== f.top || n && e.top !== f.top) && !this.dom.container.parent().hasClass(this.classes.vertical) ? (this.dom.container.parent().addClass(this.classes.vertical), this.s.topGroup.trigger("dtsb-redrawContents")) : 15 < q - (this.dom.data.offset().left + this.dom.data.outerWidth(!0) + this.dom.condition.outerWidth(!0) + b) && this.dom.container.parent().hasClass(this.classes.vertical) && (this.dom.container.parent().removeClass(this.classes.vertical), this.s.topGroup.trigger("dtsb-redrawContents"))
                    }
                }
            };
            c.prototype._buildCriteria = function () {
                this.dom.data.append(this.dom.dataTitle);
                this.dom.condition.append(this.dom.conditionTitle);
                this.dom.container.append(this.dom.data).append(this.dom.condition);
                for (var a = 0, b = this.dom.value; a < b.length; a++) {
                    var d = b[a];
                    d.append(this.dom.valueTitle);
                    this.dom.container.append(d)
                }
                this.dom.container.append(this.dom["delete"]).append(this.dom.right);
                this.setListeners()
            };
            c.prototype._clearCondition = function () {
                this.dom.condition.empty();
                this.dom.conditionTitle.prop("selected",
                    !0).attr("disabled", "true");
                this.dom.condition.prepend(this.dom.conditionTitle).prop("selectedIndex", 0);
                this.s.conditions = {};
                this.s.condition = void 0
            };
            c.prototype._clearValue = function () {
                if (void 0 !== this.s.condition) {
                    if (0 < this.dom.value.length && void 0 !== this.dom.value[0])
                        for (var a = function (f) {
                                void 0 !== f && setTimeout(function () {
                                    f.remove()
                                }, 50)
                            }, b = 0, d = this.dom.value; b < d.length; b++) {
                            var e = d[b];
                            a(e)
                        }
                    this.dom.value = [].concat(this.s.conditions[this.s.condition].init(this, c.updateListener));
                    if (0 < this.dom.value.length &&
                        void 0 !== this.dom.value[0])
                        for (this.dom.value[0].insertAfter(this.dom.condition).trigger("dtsb-inserted"), e = 1; e < this.dom.value.length; e++) this.dom.value[e].insertAfter(this.dom.value[e - 1]).trigger("dtsb-inserted")
                } else {
                    a = function (f) {
                        void 0 !== f && setTimeout(function () {
                            f.remove()
                        }, 50)
                    };
                    b = 0;
                    for (d = this.dom.value; b < d.length; b++) e = d[b], a(e);
                    this.dom.valueTitle.prop("selected", !0);
                    this.dom.defaultValue.append(this.dom.valueTitle).insertAfter(this.dom.condition)
                }
                this.s.value = [];
                this.dom.value = [h("<select disabled/>").addClass(this.classes.value).addClass(this.classes.dropDown).addClass(this.classes.italic).addClass(this.classes.select).append(this.dom.valueTitle.clone())]
            };
            c.prototype._getOptions = function () {
                return h.extend(!0, {}, c.defaults, this.s.dt.settings()[0].aoColumns[this.s.dataIdx].searchBuilder)
            };
            c.prototype._populateCondition = function () {
                var a = [],
                    b = Object.keys(this.s.conditions).length;
                if (0 === b) {
                    b = +this.dom.data.children("option:selected").val();
                    this.s.type = this.s.dt.columns().type().toArray()[b];
                    var d = this.s.dt.settings()[0].aoColumns;
                    if (void 0 !== d)
                        if (d = d[b], void 0 !== d.searchBuilderType && null !== d.searchBuilderType) this.s.type = d.searchBuilderType;
                        else if (void 0 ===
                        this.s.type || null === this.s.type) this.s.type = d.sType;
                    if (null === this.s.type || void 0 === this.s.type) h.fn.dataTable.ext.oApi._fnColumnTypes(this.s.dt.settings()[0]), this.s.type = this.s.dt.columns().type().toArray()[b];
                    this.dom.condition.removeAttr("disabled").empty().append(this.dom.conditionTitle).addClass(this.classes.italic);
                    this.dom.conditionTitle.prop("selected", !0);
                    b = this.s.dt.settings()[0].oLanguage.sDecimal;
                    "" !== b && this.s.type.indexOf(b) === this.s.type.length - b.length && (this.s.type.includes("num-fmt") ?
                        this.s.type = this.s.type.replace(b, "") : this.s.type.includes("num") && (this.s.type = this.s.type.replace(b, "")));
                    var e = void 0 !== this.c.conditions[this.s.type] ? this.c.conditions[this.s.type] : this.s.type.includes("moment") ? this.c.conditions.moment : this.s.type.includes("luxon") ? this.c.conditions.luxon : this.c.conditions.string;
                    this.s.type.includes("moment") ? this.s.dateFormat = this.s.type.replace(/moment-/g, "") : this.s.type.includes("luxon") && (this.s.dateFormat = this.s.type.replace(/luxon-/g, ""));
                    for (var f = 0,
                            g = Object.keys(e); f < g.length; f++) d = g[f], null !== e[d] && (this.s.dt.page.info().serverSide && e[d].init === c.initSelect && (e[d].init = c.initInput, e[d].inputValue = c.inputValueInput, e[d].isInputValid = c.isInputValidInput), this.s.conditions[d] = e[d], b = e[d].conditionName, "function" === typeof b && (b = b(this.s.dt, this.c.i18n)), a.push(h("<option>", {
                        text: b,
                        value: d
                    }).addClass(this.classes.option).addClass(this.classes.notItalic)))
                } else if (0 < b)
                    for (this.dom.condition.empty().removeAttr("disabled").addClass(this.classes.italic),
                        e = 0, f = Object.keys(this.s.conditions); e < f.length; e++) d = f[e], b = this.s.conditions[d].conditionName, "function" === typeof b && (b = b(this.s.dt, this.c.i18n)), d = h("<option>", {
                        text: b,
                        value: d
                    }).addClass(this.classes.option).addClass(this.classes.notItalic), void 0 !== this.s.condition && this.s.condition === b && (d.prop("selected", !0), this.dom.condition.removeClass(this.classes.italic)), a.push(d);
                else {
                    this.dom.condition.attr("disabled", "true").addClass(this.classes.italic);
                    return
                }
                for (b = 0; b < a.length; b++) this.dom.condition.append(a[b]);
                this.dom.condition.prop("selectedIndex", 0)
            };
            c.prototype._populateData = function () {
                var a = this;
                this.dom.data.empty().append(this.dom.dataTitle);
                if (0 === this.s.dataPoints.length) this.s.dt.columns().every(function (g) {
                    if (!0 === a.c.columns || a.s.dt.columns(a.c.columns).indexes().toArray().includes(g)) {
                        for (var n = !1, q = 0, u = a.s.dataPoints; q < u.length; q++)
                            if (u[q].index === g) {
                                n = !0;
                                break
                            } n || (n = a.s.dt.settings()[0].aoColumns[g], g = {
                            index: g,
                            origData: n.data,
                            text: (void 0 === n.searchBuilderTitle ? n.sTitle : n.searchBuilderTitle).replace(/(<([^>]+)>)/ig,
                                "")
                        }, a.s.dataPoints.push(g), a.dom.data.append(h("<option>", {
                            text: g.text,
                            value: g.index
                        }).addClass(a.classes.option).addClass(a.classes.notItalic).prop("origData", n.data).prop("selected", a.s.dataIdx === g.index ? !0 : !1)), a.s.dataIdx === g.index && a.dom.dataTitle.removeProp("selected"))
                    }
                });
                else
                    for (var b = function (g) {
                            d.s.dt.columns().every(function (q) {
                                var u = a.s.dt.settings()[0].aoColumns[q];
                                (void 0 === u.searchBuilderTitle ? u.sTitle : u.searchBuilderTitle).replace(/(<([^>]+)>)/ig, "") === g.text && (g.index = q, g.origData =
                                    u.data)
                            });
                            var n = h("<option>", {
                                text: g.text.replace(/(<([^>]+)>)/ig, ""),
                                value: g.index
                            }).addClass(d.classes.option).addClass(d.classes.notItalic).prop("origData", g.origData);
                            d.s.data === g.text && (d.s.dataIdx = g.index, d.dom.dataTitle.removeProp("selected"), n.prop("selected", !0), d.dom.data.removeClass(d.classes.italic));
                            d.dom.data.append(n)
                        }, d = this, e = 0, f = this.s.dataPoints; e < f.length; e++) b(f[e])
            };
            c.prototype._populateValue = function (a) {
                var b = this,
                    d = this.s.filled;
                this.s.filled = !1;
                setTimeout(function () {
                        b.dom.defaultValue.remove()
                    },
                    50);
                for (var e = function (n) {
                        setTimeout(function () {
                            void 0 !== n && n.remove()
                        }, 50)
                    }, f = 0, g = this.dom.value; f < g.length; f++) e(g[f]);
                e = this.dom.container.children();
                if (3 < e.length)
                    for (f = 2; f < e.length - 1; f++) h(e[f]).remove();
                void 0 !== a && this.s.dt.columns().every(function (n) {
                    b.s.dt.settings()[0].aoColumns[n].sTitle === a.data && (b.s.dataIdx = n)
                });
                this.dom.value = [].concat(this.s.conditions[this.s.condition].init(this, c.updateListener, void 0 !== a ? a.value : void 0));
                void 0 !== a && void 0 !== a.value && (this.s.value = a.value);
                void 0 !==
                    this.dom.value[0] && this.dom.value[0].insertAfter(this.dom.condition).trigger("dtsb-inserted");
                for (f = 1; f < this.dom.value.length; f++) this.dom.value[f].insertAfter(this.dom.value[f - 1]).trigger("dtsb-inserted");
                this.s.filled = this.s.conditions[this.s.condition].isInputValid(this.dom.value, this);
                this.setListeners();
                d !== this.s.filled && (this.s.dt.draw(), this.setListeners())
            };
            c.prototype._throttle = function (a, b) {
                void 0 === b && (b = 200);
                var d = null,
                    e = null,
                    f = this;
                null === b && (b = 200);
                return function () {
                    for (var g = [], n =
                            0; n < arguments.length; n++) g[n] = arguments[n];
                    n = +new Date;
                    null !== d && n < d + b ? clearTimeout(e) : d = n;
                    e = setTimeout(function () {
                        d = null;
                        a.apply(f, g)
                    }, b)
                }
            };
            c.version = "1.1.0";
            c.classes = {
                button: "dtsb-button",
                buttonContainer: "dtsb-buttonContainer",
                condition: "dtsb-condition",
                container: "dtsb-criteria",
                data: "dtsb-data",
                "delete": "dtsb-delete",
                dropDown: "dtsb-dropDown",
                greyscale: "dtsb-greyscale",
                input: "dtsb-input",
                italic: "dtsb-italic",
                joiner: "dtsp-joiner",
                left: "dtsb-left",
                notItalic: "dtsb-notItalic",
                option: "dtsb-option",
                right: "dtsb-right",
                select: "dtsb-select",
                value: "dtsb-value",
                vertical: "dtsb-vertical"
            };
            c.initSelect = function (a, b, d, e) {
                void 0 === d && (d = null);
                void 0 === e && (e = !1);
                var f = a.dom.data.children("option:selected").val(),
                    g = a.s.dt.rows().indexes().toArray(),
                    n = a.s.dt.settings()[0],
                    q = h("<select/>").addClass(c.classes.value).addClass(c.classes.dropDown).addClass(c.classes.italic).addClass(c.classes.select).append(a.dom.valueTitle).on("change.dtsb", function () {
                        h(this).removeClass(c.classes.italic);
                        b(a, this)
                    });
                a.c.greyscale &&
                    q.addClass(c.classes.greyscale);
                for (var u = [], D = [], H = 0; H < g.length; H++) {
                    var A = g[H],
                        z = n.oApi._fnGetCellData(n, A, f, "string" === typeof a.c.orthogonal ? a.c.orthogonal : a.c.orthogonal.search);
                    z = "string" === typeof z ? z.replace(/[\r\n\u2028]/g, " ") : z;
                    A = n.oApi._fnGetCellData(n, A, f, "string" === typeof a.c.orthogonal ? a.c.orthogonal : a.c.orthogonal.display);
                    "array" === a.s.type && (z = Array.isArray(z) ? z = z.sort() : [z], A = Array.isArray(A) ? A = A.sort() : [A]);
                    var J = function (w, y) {
                        w = h("<option>", {
                            type: Array.isArray(w) ? "Array" : "String",
                            value: a.s.type.includes("html") && null !== w && "string" === typeof w ? w.replace(/(<([^>]+)>)/ig, "") : w
                        }).addClass(a.classes.option).addClass(a.classes.notItalic).html("string" === typeof y ? y.replace(/(<([^>]+)>)/ig, "") : y);
                        y = w.val(); - 1 === u.indexOf(y) && (u.push(y), D.push(w), null !== d && Array.isArray(d[0]) && (d[0] = d[0].sort().join(",")), null !== d && w.val() === d[0] && (w.prop("selected", !0), q.removeClass(c.classes.italic)))
                    };
                    if (e)
                        for (var F = 0; F < z.length; F++) J(z[F], A[F]);
                    else J(z, A)
                }
                D.sort(function (w, y) {
                    if ("array" === a.s.type ||
                        "string" === a.s.type || "html" === a.s.type) return w.val() < y.val() ? -1 : w.val() > y.val() ? 1 : 0;
                    if ("num" === a.s.type || "html-num" === a.s.type) return +w.val().replace(/(<([^>]+)>)/ig, "") < +y.val().replace(/(<([^>]+)>)/ig, "") ? -1 : +w.val().replace(/(<([^>]+)>)/ig, "") > +y.val().replace(/(<([^>]+)>)/ig, "") ? 1 : 0;
                    if ("num-fmt" === a.s.type || "html-num-fmt" === a.s.type) return +w.val().replace(/[^0-9.]/g, "") < +y.val().replace(/[^0-9.]/g, "") ? -1 : +w.val().replace(/[^0-9.]/g, "") > +y.val().replace(/[^0-9.]/g, "") ? 1 : 0
                });
                for (e = 0; e < D.length; e++) q.append(D[e]);
                return q
            };
            c.initSelectArray = function (a, b, d) {
                void 0 === d && (d = null);
                return c.initSelect(a, b, d, !0)
            };
            c.initInput = function (a, b, d) {
                void 0 === d && (d = null);
                var e = a.s.dt.settings()[0].searchDelay;
                e = h("<input/>").addClass(c.classes.value).addClass(c.classes.input).on("input.dtsb keypress.dtsb", a._throttle(function (f) {
                    f = f.keyCode || f.which;
                    if (!(a.c.enterSearch || void 0 !== a.s.dt.settings()[0].oInit.search && a.s.dt.settings()[0].oInit.search["return"]) || 13 === f) return b(a, this)
                }, null === e ? 100 : e));
                a.c.greyscale && e.addClass(c.classes.greyscale);
                null !== d && e.val(d[0]);
                a.s.dt.one("draw.dtsb", function () {
                    a.s.topGroup.trigger("dtsb-redrawLogic")
                });
                return e
            };
            c.init2Input = function (a, b, d) {
                void 0 === d && (d = null);
                var e = a.s.dt.settings()[0].searchDelay;
                e = [h("<input/>").addClass(c.classes.value).addClass(c.classes.input).on("input.dtsb keypress.dtsb", a._throttle(function (f) {
                    f = f.keyCode || f.which;
                    if (!(a.c.enterSearch || void 0 !== a.s.dt.settings()[0].oInit.search && a.s.dt.settings()[0].oInit.search["return"]) || 13 === f) return b(a, this)
                }, null === e ? 100 : e)), h("<span>").addClass(a.classes.joiner).text(a.s.dt.i18n("searchBuilder.valueJoiner",
                    a.c.i18n.valueJoiner)), h("<input/>").addClass(c.classes.value).addClass(c.classes.input).on("input.dtsb keypress.dtsb", a._throttle(function (f) {
                    f = f.keyCode || f.which;
                    if (!(a.c.enterSearch || void 0 !== a.s.dt.settings()[0].oInit.search && a.s.dt.settings()[0].oInit.search["return"]) || 13 === f) return b(a, this)
                }, null === e ? 100 : e))];
                a.c.greyscale && (e[0].addClass(c.classes.greyscale), e[2].addClass(c.classes.greyscale));
                null !== d && (e[0].val(d[0]), e[2].val(d[1]));
                a.s.dt.one("draw.dtsb", function () {
                    a.s.topGroup.trigger("dtsb-redrawLogic")
                });
                return e
            };
            c.initDate = function (a, b, d) {
                void 0 === d && (d = null);
                var e = a.s.dt.settings()[0].searchDelay,
                    f = h("<input/>").addClass(c.classes.value).addClass(c.classes.input).dtDateTime({
                        attachTo: "input",
                        format: a.s.dateFormat ? a.s.dateFormat : void 0
                    }).on("change.dtsb", a._throttle(function () {
                        return b(a, this)
                    }, null === e ? 100 : e)).on("input.dtsb keypress.dtsb", a.c.enterSearch || void 0 !== a.s.dt.settings()[0].oInit.search && a.s.dt.settings()[0].oInit.search["return"] ? function (g) {
                        a._throttle(function () {
                            if (13 === (g.keyCode ||
                                    g.which)) return b(a, this)
                        }, null === e ? 100 : e)
                    } : a._throttle(function () {
                        return b(a, this)
                    }, null === e ? 100 : e));
                a.c.greyscale && f.addClass(c.classes.greyscale);
                null !== d && f.val(d[0]);
                a.s.dt.one("draw.dtsb", function () {
                    a.s.topGroup.trigger("dtsb-redrawLogic")
                });
                return f
            };
            c.initNoValue = function (a) {
                a.s.dt.one("draw.dtsb", function () {
                    a.s.topGroup.trigger("dtsb-redrawLogic")
                })
            };
            c.init2Date = function (a, b, d) {
                var e = this;
                void 0 === d && (d = null);
                var f = a.s.dt.settings()[0].searchDelay;
                f = [h("<input/>").addClass(c.classes.value).addClass(c.classes.input).dtDateTime({
                    attachTo: "input",
                    format: a.s.dateFormat ? a.s.dateFormat : void 0
                }).on("change.dtsb", null !== f ? a.s.dt.settings()[0].oApi._fnThrottle(function () {
                    return b(a, this)
                }, f) : function () {
                    b(a, e)
                }).on("input.dtsb keypress.dtsb", a.c.enterSearch || void 0 !== a.s.dt.settings()[0].oInit.search && a.s.dt.settings()[0].oInit.search["return"] || null === f ? a.c.enterSearch || void 0 !== a.s.dt.settings()[0].oInit.search && a.s.dt.settings()[0].oInit.search["return"] ? function (g) {
                    13 === (g.keyCode || g.which) && b(a, e)
                } : function () {
                    b(a, e)
                } : a.s.dt.settings()[0].oApi._fnThrottle(function () {
                    return b(a,
                        this)
                }, f)), h("<span>").addClass(a.classes.joiner).text(a.s.dt.i18n("searchBuilder.valueJoiner", a.c.i18n.valueJoiner)), h("<input/>").addClass(c.classes.value).addClass(c.classes.input).dtDateTime({
                    attachTo: "input",
                    format: a.s.dateFormat ? a.s.dateFormat : void 0
                }).on("change.dtsb", null !== f ? a.s.dt.settings()[0].oApi._fnThrottle(function () {
                    return b(a, this)
                }, f) : function () {
                    b(a, e)
                }).on("input.dtsb keypress.dtsb", a.c.enterSearch || void 0 !== a.s.dt.settings()[0].oInit.search && a.s.dt.settings()[0].oInit.search["return"] ||
                    null === f ? a.c.enterSearch || void 0 !== a.s.dt.settings()[0].oInit.search && a.s.dt.settings()[0].oInit.search["return"] ? function (g) {
                        13 === (g.keyCode || g.which) && b(a, e)
                    } : function () {
                        b(a, e)
                    } : a.s.dt.settings()[0].oApi._fnThrottle(function () {
                        return b(a, this)
                    }, f))];
                a.c.greyscale && (f[0].addClass(c.classes.greyscale), f[2].addClass(c.classes.greyscale));
                null !== d && 0 < d.length && (f[0].val(d[0]), f[2].val(d[1]));
                a.s.dt.one("draw.dtsb", function () {
                    a.s.topGroup.trigger("dtsb-redrawLogic")
                });
                return f
            };
            c.isInputValidSelect =
                function (a) {
                    for (var b = !0, d = 0; d < a.length; d++) {
                        var e = a[d];
                        e.children("option:selected").length === e.children("option").length - e.children("option." + c.classes.notItalic).length && 1 === e.children("option:selected").length && e.children("option:selected")[0] === e.children("option:hidden")[0] && (b = !1)
                    }
                    return b
                };
            c.isInputValidInput = function (a) {
                for (var b = !0, d = 0; d < a.length; d++) {
                    var e = a[d];
                    e.is("input") && 0 === e.val().length && (b = !1)
                }
                return b
            };
            c.inputValueSelect = function (a) {
                for (var b = [], d = 0; d < a.length; d++) {
                    var e = a[d];
                    if (e.is("select")) {
                        var f = e.children("option:selected").val();
                        b.push("Array" === e.children("option:selected").attr("type") ? f.split(",").sort() : f)
                    }
                }
                return b
            };
            c.inputValueInput = function (a) {
                for (var b = [], d = 0; d < a.length; d++) {
                    var e = a[d];
                    e.is("input") && b.push(e.val())
                }
                return b
            };
            c.updateListener = function (a, b) {
                var d = a.s.conditions[a.s.condition];
                a.s.filled = d.isInputValid(a.dom.value, a);
                a.s.value = d.inputValue(a.dom.value, a);
                if (a.s.filled) {
                    Array.isArray(a.s.value) || (a.s.value = [a.s.value]);
                    for (d = 0; d < a.s.value.length; d++)
                        if (Array.isArray(a.s.value[d])) a.s.value[d].sort();
                        else if (a.s.type.includes("num") && ("" !== a.s.dt.settings()[0].oLanguage.sDecimal || "" !== a.s.dt.settings()[0].oLanguage.sThousands)) {
                        var e = [a.s.value[d].toString()];
                        "" !== a.s.dt.settings()[0].oLanguage.sDecimal && (e = a.s.value[d].split(a.s.dt.settings()[0].oLanguage.sDecimal));
                        if ("" !== a.s.dt.settings()[0].oLanguage.sThousands)
                            for (var f = 0; f < e.length; f++) e[f] = e[f].replace(a.s.dt.settings()[0].oLanguage.sThousands, ",");
                        a.s.value[d] = e.join(".")
                    }
                    f = e = null;
                    for (d = 0; d < a.dom.value.length; d++) b === a.dom.value[d][0] &&
                        (e = d, void 0 !== b.selectionStart && (f = b.selectionStart));
                    a.s.dt.draw();
                    null !== e && (a.dom.value[e].removeClass(a.classes.italic), a.dom.value[e].focus(), null !== f && a.dom.value[e][0].setSelectionRange(f, f))
                } else a.s.dt.draw()
            };
            c.dateConditions = {
                "=": {
                    conditionName: function (a, b) {
                        return a.i18n("searchBuilder.conditions.date.equals", b.conditions.date.equals)
                    },
                    init: c.initDate,
                    inputValue: c.inputValueInput,
                    isInputValid: c.isInputValidInput,
                    search: function (a, b) {
                        a = a.replace(/(\/|-|,)/g, "-");
                        return a === b[0]
                    }
                },
                "!=": {
                    conditionName: function (a,
                        b) {
                        return a.i18n("searchBuilder.conditions.date.not", b.conditions.date.not)
                    },
                    init: c.initDate,
                    inputValue: c.inputValueInput,
                    isInputValid: c.isInputValidInput,
                    search: function (a, b) {
                        a = a.replace(/(\/|-|,)/g, "-");
                        return a !== b[0]
                    }
                },
                "<": {
                    conditionName: function (a, b) {
                        return a.i18n("searchBuilder.conditions.date.before", b.conditions.date.before)
                    },
                    init: c.initDate,
                    inputValue: c.inputValueInput,
                    isInputValid: c.isInputValidInput,
                    search: function (a, b) {
                        a = a.replace(/(\/|-|,)/g, "-");
                        return a < b[0]
                    }
                },
                ">": {
                    conditionName: function (a,
                        b) {
                        return a.i18n("searchBuilder.conditions.date.after", b.conditions.date.after)
                    },
                    init: c.initDate,
                    inputValue: c.inputValueInput,
                    isInputValid: c.isInputValidInput,
                    search: function (a, b) {
                        a = a.replace(/(\/|-|,)/g, "-");
                        return a > b[0]
                    }
                },
                between: {
                    conditionName: function (a, b) {
                        return a.i18n("searchBuilder.conditions.date.between", b.conditions.date.between)
                    },
                    init: c.init2Date,
                    inputValue: c.inputValueInput,
                    isInputValid: c.isInputValidInput,
                    search: function (a, b) {
                        a = a.replace(/(\/|-|,)/g, "-");
                        return b[0] < b[1] ? b[0] <= a && a <=
                            b[1] : b[1] <= a && a <= b[0]
                    }
                },
                "!between": {
                    conditionName: function (a, b) {
                        return a.i18n("searchBuilder.conditions.date.notBetween", b.conditions.date.notBetween)
                    },
                    init: c.init2Date,
                    inputValue: c.inputValueInput,
                    isInputValid: c.isInputValidInput,
                    search: function (a, b) {
                        a = a.replace(/(\/|-|,)/g, "-");
                        return b[0] < b[1] ? !(b[0] <= a && a <= b[1]) : !(b[1] <= a && a <= b[0])
                    }
                },
                "null": {
                    conditionName: function (a, b) {
                        return a.i18n("searchBuilder.conditions.date.empty", b.conditions.date.empty)
                    },
                    init: c.initNoValue,
                    inputValue: function () {},
                    isInputValid: function () {
                        return !0
                    },
                    search: function (a) {
                        return null === a || void 0 === a || 0 === a.length
                    }
                },
                "!null": {
                    conditionName: function (a, b) {
                        return a.i18n("searchBuilder.conditions.date.notEmpty", b.conditions.date.notEmpty)
                    },
                    init: c.initNoValue,
                    inputValue: function () {},
                    isInputValid: function () {
                        return !0
                    },
                    search: function (a) {
                        return !(null === a || void 0 === a || 0 === a.length)
                    }
                }
            };
            c.momentDateConditions = {
                "=": {
                    conditionName: function (a, b) {
                        return a.i18n("searchBuilder.conditions.date.equals", b.conditions.date.equals)
                    },
                    init: c.initDate,
                    inputValue: c.inputValueInput,
                    isInputValid: c.isInputValidInput,
                    search: function (a, b, d) {
                        return t(a, d.s.dateFormat).valueOf() === t(b[0], d.s.dateFormat).valueOf()
                    }
                },
                "!=": {
                    conditionName: function (a, b) {
                        return a.i18n("searchBuilder.conditions.date.not", b.conditions.date.not)
                    },
                    init: c.initDate,
                    inputValue: c.inputValueInput,
                    isInputValid: c.isInputValidInput,
                    search: function (a, b, d) {
                        return t(a, d.s.dateFormat).valueOf() !== t(b[0], d.s.dateFormat).valueOf()
                    }
                },
                "<": {
                    conditionName: function (a, b) {
                        return a.i18n("searchBuilder.conditions.date.before", b.conditions.date.before)
                    },
                    init: c.initDate,
                    inputValue: c.inputValueInput,
                    isInputValid: c.isInputValidInput,
                    search: function (a, b, d) {
                        return t(a, d.s.dateFormat).valueOf() < t(b[0], d.s.dateFormat).valueOf()
                    }
                },
                ">": {
                    conditionName: function (a, b) {
                        return a.i18n("searchBuilder.conditions.date.after", b.conditions.date.after)
                    },
                    init: c.initDate,
                    inputValue: c.inputValueInput,
                    isInputValid: c.isInputValidInput,
                    search: function (a, b, d) {
                        return t(a, d.s.dateFormat).valueOf() > t(b[0], d.s.dateFormat).valueOf()
                    }
                },
                between: {
                    conditionName: function (a, b) {
                        return a.i18n("searchBuilder.conditions.date.between",
                            b.conditions.date.between)
                    },
                    init: c.init2Date,
                    inputValue: c.inputValueInput,
                    isInputValid: c.isInputValidInput,
                    search: function (a, b, d) {
                        a = t(a, d.s.dateFormat).valueOf();
                        var e = t(b[0], d.s.dateFormat).valueOf();
                        b = t(b[1], d.s.dateFormat).valueOf();
                        return e < b ? e <= a && a <= b : b <= a && a <= e
                    }
                },
                "!between": {
                    conditionName: function (a, b) {
                        return a.i18n("searchBuilder.conditions.date.notBetween", b.conditions.date.notBetween)
                    },
                    init: c.init2Date,
                    inputValue: c.inputValueInput,
                    isInputValid: c.isInputValidInput,
                    search: function (a, b, d) {
                        a =
                            t(a, d.s.dateFormat).valueOf();
                        var e = t(b[0], d.s.dateFormat).valueOf();
                        b = t(b[1], d.s.dateFormat).valueOf();
                        return e < b ? !(+e <= +a && +a <= +b) : !(+b <= +a && +a <= +e)
                    }
                },
                "null": {
                    conditionName: function (a, b) {
                        return a.i18n("searchBuilder.conditions.date.empty", b.conditions.date.empty)
                    },
                    init: c.initNoValue,
                    inputValue: function () {},
                    isInputValid: function () {
                        return !0
                    },
                    search: function (a) {
                        return null === a || void 0 === a || 0 === a.length
                    }
                },
                "!null": {
                    conditionName: function (a, b) {
                        return a.i18n("searchBuilder.conditions.date.notEmpty", b.conditions.date.notEmpty)
                    },
                    init: c.initNoValue,
                    inputValue: function () {},
                    isInputValid: function () {
                        return !0
                    },
                    search: function (a) {
                        return !(null === a || void 0 === a || 0 === a.length)
                    }
                }
            };
            c.luxonDateConditions = {
                "=": {
                    conditionName: function (a, b) {
                        return a.i18n("searchBuilder.conditions.date.equals", b.conditions.date.equals)
                    },
                    init: c.initDate,
                    inputValue: c.inputValueInput,
                    isInputValid: c.isInputValidInput,
                    search: function (a, b, d) {
                        return v.DateTime.fromFormat(a, d.s.dateFormat).ts === v.DateTime.fromFormat(b[0], d.s.dateFormat).ts
                    }
                },
                "!=": {
                    conditionName: function (a,
                        b) {
                        return a.i18n("searchBuilder.conditions.date.not", b.conditions.date.not)
                    },
                    init: c.initDate,
                    inputValue: c.inputValueInput,
                    isInputValid: c.isInputValidInput,
                    search: function (a, b, d) {
                        return v.DateTime.fromFormat(a, d.s.dateFormat).ts !== v.DateTime.fromFormat(b[0], d.s.dateFormat).ts
                    }
                },
                "<": {
                    conditionName: function (a, b) {
                        return a.i18n("searchBuilder.conditions.date.before", b.conditions.date.before)
                    },
                    init: c.initDate,
                    inputValue: c.inputValueInput,
                    isInputValid: c.isInputValidInput,
                    search: function (a, b, d) {
                        return v.DateTime.fromFormat(a,
                            d.s.dateFormat).ts < v.DateTime.fromFormat(b[0], d.s.dateFormat).ts
                    }
                },
                ">": {
                    conditionName: function (a, b) {
                        return a.i18n("searchBuilder.conditions.date.after", b.conditions.date.after)
                    },
                    init: c.initDate,
                    inputValue: c.inputValueInput,
                    isInputValid: c.isInputValidInput,
                    search: function (a, b, d) {
                        return v.DateTime.fromFormat(a, d.s.dateFormat).ts > v.DateTime.fromFormat(b[0], d.s.dateFormat).ts
                    }
                },
                between: {
                    conditionName: function (a, b) {
                        return a.i18n("searchBuilder.conditions.date.between", b.conditions.date.between)
                    },
                    init: c.init2Date,
                    inputValue: c.inputValueInput,
                    isInputValid: c.isInputValidInput,
                    search: function (a, b, d) {
                        a = v.DateTime.fromFormat(a, d.s.dateFormat).ts;
                        var e = v.DateTime.fromFormat(b[0], d.s.dateFormat).ts;
                        b = v.DateTime.fromFormat(b[1], d.s.dateFormat).ts;
                        return e < b ? e <= a && a <= b : b <= a && a <= e
                    }
                },
                "!between": {
                    conditionName: function (a, b) {
                        return a.i18n("searchBuilder.conditions.date.notBetween", b.conditions.date.notBetween)
                    },
                    init: c.init2Date,
                    inputValue: c.inputValueInput,
                    isInputValid: c.isInputValidInput,
                    search: function (a, b, d) {
                        a = v.DateTime.fromFormat(a,
                            d.s.dateFormat).ts;
                        var e = v.DateTime.fromFormat(b[0], d.s.dateFormat).ts;
                        b = v.DateTime.fromFormat(b[1], d.s.dateFormat).ts;
                        return e < b ? !(+e <= +a && +a <= +b) : !(+b <= +a && +a <= +e)
                    }
                },
                "null": {
                    conditionName: function (a, b) {
                        return a.i18n("searchBuilder.conditions.date.empty", b.conditions.date.empty)
                    },
                    init: c.initNoValue,
                    inputValue: function () {},
                    isInputValid: function () {
                        return !0
                    },
                    search: function (a) {
                        return null === a || void 0 === a || 0 === a.length
                    }
                },
                "!null": {
                    conditionName: function (a, b) {
                        return a.i18n("searchBuilder.conditions.date.notEmpty",
                            b.conditions.date.notEmpty)
                    },
                    init: c.initNoValue,
                    inputValue: function () {},
                    isInputValid: function () {
                        return !0
                    },
                    search: function (a) {
                        return !(null === a || void 0 === a || 0 === a.length)
                    }
                }
            };
            c.numConditions = {
                "=": {
                    conditionName: function (a, b) {
                        return a.i18n("searchBuilder.conditions.number.equals", b.conditions.number.equals)
                    },
                    init: c.initSelect,
                    inputValue: c.inputValueSelect,
                    isInputValid: c.isInputValidSelect,
                    search: function (a, b) {
                        return +a === +b[0]
                    }
                },
                "!=": {
                    conditionName: function (a, b) {
                        return a.i18n("searchBuilder.conditions.number.not",
                            b.conditions.number.not)
                    },
                    init: c.initSelect,
                    inputValue: c.inputValueSelect,
                    isInputValid: c.isInputValidSelect,
                    search: function (a, b) {
                        return +a !== +b[0]
                    }
                },
                "<": {
                    conditionName: function (a, b) {
                        return a.i18n("searchBuilder.conditions.number.lt", b.conditions.number.lt)
                    },
                    init: c.initInput,
                    inputValue: c.inputValueInput,
                    isInputValid: c.isInputValidInput,
                    search: function (a, b) {
                        return +a < +b[0]
                    }
                },
                "<=": {
                    conditionName: function (a, b) {
                        return a.i18n("searchBuilder.conditions.number.lte", b.conditions.number.lte)
                    },
                    init: c.initInput,
                    inputValue: c.inputValueInput,
                    isInputValid: c.isInputValidInput,
                    search: function (a, b) {
                        return +a <= +b[0]
                    }
                },
                ">=": {
                    conditionName: function (a, b) {
                        return a.i18n("searchBuilder.conditions.number.gte", b.conditions.number.gte)
                    },
                    init: c.initInput,
                    inputValue: c.inputValueInput,
                    isInputValid: c.isInputValidInput,
                    search: function (a, b) {
                        return +a >= +b[0]
                    }
                },
                ">": {
                    conditionName: function (a, b) {
                        return a.i18n("searchBuilder.conditions.number.gt", b.conditions.number.gt)
                    },
                    init: c.initInput,
                    inputValue: c.inputValueInput,
                    isInputValid: c.isInputValidInput,
                    search: function (a, b) {
                        return +a > +b[0]
                    }
                },
                between: {
                    conditionName: function (a, b) {
                        return a.i18n("searchBuilder.conditions.number.between", b.conditions.number.between)
                    },
                    init: c.init2Input,
                    inputValue: c.inputValueInput,
                    isInputValid: c.isInputValidInput,
                    search: function (a, b) {
                        return +b[0] < +b[1] ? +b[0] <= +a && +a <= +b[1] : +b[1] <= +a && +a <= +b[0]
                    }
                },
                "!between": {
                    conditionName: function (a, b) {
                        return a.i18n("searchBuilder.conditions.number.notBetween", b.conditions.number.notBetween)
                    },
                    init: c.init2Input,
                    inputValue: c.inputValueInput,
                    isInputValid: c.isInputValidInput,
                    search: function (a, b) {
                        return +b[0] < +b[1] ? !(+b[0] <= +a && +a <= +b[1]) : !(+b[1] <= +a && +a <= +b[0])
                    }
                },
                "null": {
                    conditionName: function (a, b) {
                        return a.i18n("searchBuilder.conditions.number.empty", b.conditions.number.empty)
                    },
                    init: c.initNoValue,
                    inputValue: function () {},
                    isInputValid: function () {
                        return !0
                    },
                    search: function (a) {
                        return null === a || void 0 === a || 0 === a.length
                    }
                },
                "!null": {
                    conditionName: function (a, b) {
                        return a.i18n("searchBuilder.conditions.number.notEmpty", b.conditions.number.notEmpty)
                    },
                    init: c.initNoValue,
                    inputValue: function () {},
                    isInputValid: function () {
                        return !0
                    },
                    search: function (a) {
                        return !(null === a || void 0 === a || 0 === a.length)
                    }
                }
            };
            c.numFmtConditions = {
                "=": {
                    conditionName: function (a, b) {
                        return a.i18n("searchBuilder.conditions.number.equals", b.conditions.number.equals)
                    },
                    init: c.initSelect,
                    inputValue: c.inputValueSelect,
                    isInputValid: c.isInputValidSelect,
                    search: function (a, b) {
                        a = 0 === a.indexOf("-") ? "-" + a.replace(/[^0-9.]/g, "") : a.replace(/[^0-9.]/g, "");
                        b = 0 === b[0].indexOf("-") ? "-" + b[0].replace(/[^0-9.]/g,
                            "") : b[0].replace(/[^0-9.]/g, "");
                        return +a === +b
                    }
                },
                "!=": {
                    conditionName: function (a, b) {
                        return a.i18n("searchBuilder.conditions.number.not", b.conditions.number.not)
                    },
                    init: c.initSelect,
                    inputValue: c.inputValueSelect,
                    isInputValid: c.isInputValidSelect,
                    search: function (a, b) {
                        a = 0 === a.indexOf("-") ? "-" + a.replace(/[^0-9.]/g, "") : a.replace(/[^0-9.]/g, "");
                        b = 0 === b[0].indexOf("-") ? "-" + b[0].replace(/[^0-9.]/g, "") : b[0].replace(/[^0-9.]/g, "");
                        return +a !== +b
                    }
                },
                "<": {
                    conditionName: function (a, b) {
                        return a.i18n("searchBuilder.conditions.number.lt",
                            b.conditions.number.lt)
                    },
                    init: c.initInput,
                    inputValue: c.inputValueInput,
                    isInputValid: c.isInputValidInput,
                    search: function (a, b) {
                        a = 0 === a.indexOf("-") ? "-" + a.replace(/[^0-9.]/g, "") : a.replace(/[^0-9.]/g, "");
                        b = 0 === b[0].indexOf("-") ? "-" + b[0].replace(/[^0-9.]/g, "") : b[0].replace(/[^0-9.]/g, "");
                        return +a < +b
                    }
                },
                "<=": {
                    conditionName: function (a, b) {
                        return a.i18n("searchBuilder.conditions.number.lte", b.conditions.number.lte)
                    },
                    init: c.initInput,
                    inputValue: c.inputValueInput,
                    isInputValid: c.isInputValidInput,
                    search: function (a,
                        b) {
                        a = 0 === a.indexOf("-") ? "-" + a.replace(/[^0-9.]/g, "") : a.replace(/[^0-9.]/g, "");
                        b = 0 === b[0].indexOf("-") ? "-" + b[0].replace(/[^0-9.]/g, "") : b[0].replace(/[^0-9.]/g, "");
                        return +a <= +b
                    }
                },
                ">=": {
                    conditionName: function (a, b) {
                        return a.i18n("searchBuilder.conditions.number.gte", b.conditions.number.gte)
                    },
                    init: c.initInput,
                    inputValue: c.inputValueInput,
                    isInputValid: c.isInputValidInput,
                    search: function (a, b) {
                        a = 0 === a.indexOf("-") ? "-" + a.replace(/[^0-9.]/g, "") : a.replace(/[^0-9.]/g, "");
                        b = 0 === b[0].indexOf("-") ? "-" + b[0].replace(/[^0-9.]/g,
                            "") : b[0].replace(/[^0-9.]/g, "");
                        return +a >= +b
                    }
                },
                ">": {
                    conditionName: function (a, b) {
                        return a.i18n("searchBuilder.conditions.number.gt", b.conditions.number.gt)
                    },
                    init: c.initInput,
                    inputValue: c.inputValueInput,
                    isInputValid: c.isInputValidInput,
                    search: function (a, b) {
                        a = 0 === a.indexOf("-") ? "-" + a.replace(/[^0-9.]/g, "") : a.replace(/[^0-9.]/g, "");
                        b = 0 === b[0].indexOf("-") ? "-" + b[0].replace(/[^0-9.]/g, "") : b[0].replace(/[^0-9.]/g, "");
                        return +a > +b
                    }
                },
                between: {
                    conditionName: function (a, b) {
                        return a.i18n("searchBuilder.conditions.number.between",
                            b.conditions.number.between)
                    },
                    init: c.init2Input,
                    inputValue: c.inputValueInput,
                    isInputValid: c.isInputValidInput,
                    search: function (a, b) {
                        a = 0 === a.indexOf("-") ? "-" + a.replace(/[^0-9.]/g, "") : a.replace(/[^0-9.]/g, "");
                        var d = 0 === b[0].indexOf("-") ? "-" + b[0].replace(/[^0-9.]/g, "") : b[0].replace(/[^0-9.]/g, "");
                        b = 0 === b[1].indexOf("-") ? "-" + b[1].replace(/[^0-9.]/g, "") : b[1].replace(/[^0-9.]/g, "");
                        return +d < +b ? +d <= +a && +a <= +b : +b <= +a && +a <= +d
                    }
                },
                "!between": {
                    conditionName: function (a, b) {
                        return a.i18n("searchBuilder.conditions.number.notBetween",
                            b.conditions.number.notBetween)
                    },
                    init: c.init2Input,
                    inputValue: c.inputValueInput,
                    isInputValid: c.isInputValidInput,
                    search: function (a, b) {
                        a = 0 === a.indexOf("-") ? "-" + a.replace(/[^0-9.]/g, "") : a.replace(/[^0-9.]/g, "");
                        var d = 0 === b[0].indexOf("-") ? "-" + b[0].replace(/[^0-9.]/g, "") : b[0].replace(/[^0-9.]/g, "");
                        b = 0 === b[1].indexOf("-") ? "-" + b[1].replace(/[^0-9.]/g, "") : b[1].replace(/[^0-9.]/g, "");
                        return +d < +b ? !(+d <= +a && +a <= +b) : !(+b <= +a && +a <= +d)
                    }
                },
                "null": {
                    conditionName: function (a, b) {
                        return a.i18n("searchBuilder.conditions.number.empty",
                            b.conditions.number.empty)
                    },
                    init: c.initNoValue,
                    inputValue: function () {},
                    isInputValid: function () {
                        return !0
                    },
                    search: function (a) {
                        return null === a || void 0 === a || 0 === a.length
                    }
                },
                "!null": {
                    conditionName: function (a, b) {
                        return a.i18n("searchBuilder.conditions.number.notEmpty", b.conditions.number.notEmpty)
                    },
                    init: c.initNoValue,
                    inputValue: function () {},
                    isInputValid: function () {
                        return !0
                    },
                    search: function (a) {
                        return !(null === a || void 0 === a || 0 === a.length)
                    }
                }
            };
            c.stringConditions = {
                "=": {
                    conditionName: function (a, b) {
                        return a.i18n("searchBuilder.conditions.string.equals",
                            b.conditions.string.equals)
                    },
                    init: c.initSelect,
                    inputValue: c.inputValueSelect,
                    isInputValid: c.isInputValidSelect,
                    search: function (a, b) {
                        return a === b[0]
                    }
                },
                "!=": {
                    conditionName: function (a, b) {
                        return a.i18n("searchBuilder.conditions.string.not", b.conditions.string.not)
                    },
                    init: c.initSelect,
                    inputValue: c.inputValueSelect,
                    isInputValid: c.isInputValidInput,
                    search: function (a, b) {
                        return a !== b[0]
                    }
                },
                starts: {
                    conditionName: function (a, b) {
                        return a.i18n("searchBuilder.conditions.string.startsWith", b.conditions.string.startsWith)
                    },
                    init: c.initInput,
                    inputValue: c.inputValueInput,
                    isInputValid: c.isInputValidInput,
                    search: function (a, b) {
                        return 0 === a.toLowerCase().indexOf(b[0].toLowerCase())
                    }
                },
                "!starts": {
                    conditionName: function (a, b) {
                        return a.i18n("searchBuilder.conditions.string.notStartsWith", b.conditions.string.notStartsWith)
                    },
                    init: c.initInput,
                    inputValue: c.inputValueInput,
                    isInputValid: c.isInputValidInput,
                    search: function (a, b) {
                        return 0 !== a.toLowerCase().indexOf(b[0].toLowerCase())
                    }
                },
                contains: {
                    conditionName: function (a, b) {
                        return a.i18n("searchBuilder.conditions.string.contains",
                            b.conditions.string.contains)
                    },
                    init: c.initInput,
                    inputValue: c.inputValueInput,
                    isInputValid: c.isInputValidInput,
                    search: function (a, b) {
                        return a.toLowerCase().includes(b[0].toLowerCase())
                    }
                },
                "!contains": {
                    conditionName: function (a, b) {
                        return a.i18n("searchBuilder.conditions.string.notContains", b.conditions.string.notContains)
                    },
                    init: c.initInput,
                    inputValue: c.inputValueInput,
                    isInputValid: c.isInputValidInput,
                    search: function (a, b) {
                        return !a.toLowerCase().includes(b[0].toLowerCase())
                    }
                },
                ends: {
                    conditionName: function (a,
                        b) {
                        return a.i18n("searchBuilder.conditions.string.endsWith", b.conditions.string.endsWith)
                    },
                    init: c.initInput,
                    inputValue: c.inputValueInput,
                    isInputValid: c.isInputValidInput,
                    search: function (a, b) {
                        return a.toLowerCase().endsWith(b[0].toLowerCase())
                    }
                },
                "!ends": {
                    conditionName: function (a, b) {
                        return a.i18n("searchBuilder.conditions.string.notEndsWith", b.conditions.string.notEndsWith)
                    },
                    init: c.initInput,
                    inputValue: c.inputValueInput,
                    isInputValid: c.isInputValidInput,
                    search: function (a, b) {
                        return !a.toLowerCase().endsWith(b[0].toLowerCase())
                    }
                },
                "null": {
                    conditionName: function (a, b) {
                        return a.i18n("searchBuilder.conditions.string.empty", b.conditions.string.empty)
                    },
                    init: c.initNoValue,
                    inputValue: function () {},
                    isInputValid: function () {
                        return !0
                    },
                    search: function (a) {
                        return null === a || void 0 === a || 0 === a.length
                    }
                },
                "!null": {
                    conditionName: function (a, b) {
                        return a.i18n("searchBuilder.conditions.string.notEmpty", b.conditions.string.notEmpty)
                    },
                    init: c.initNoValue,
                    inputValue: function () {},
                    isInputValid: function () {
                        return !0
                    },
                    search: function (a) {
                        return !(null === a || void 0 ===
                            a || 0 === a.length)
                    }
                }
            };
            c.arrayConditions = {
                contains: {
                    conditionName: function (a, b) {
                        return a.i18n("searchBuilder.conditions.array.contains", b.conditions.array.contains)
                    },
                    init: c.initSelectArray,
                    inputValue: c.inputValueSelect,
                    isInputValid: c.isInputValidSelect,
                    search: function (a, b) {
                        return a.includes(b[0])
                    }
                },
                without: {
                    conditionName: function (a, b) {
                        return a.i18n("searchBuilder.conditions.array.without", b.conditions.array.without)
                    },
                    init: c.initSelectArray,
                    inputValue: c.inputValueSelect,
                    isInputValid: c.isInputValidSelect,
                    search: function (a, b) {
                        return -1 === a.indexOf(b[0])
                    }
                },
                "=": {
                    conditionName: function (a, b) {
                        return a.i18n("searchBuilder.conditions.array.equals", b.conditions.array.equals)
                    },
                    init: c.initSelect,
                    inputValue: c.inputValueSelect,
                    isInputValid: c.isInputValidSelect,
                    search: function (a, b) {
                        if (a.length === b[0].length) {
                            for (var d = 0; d < a.length; d++)
                                if (a[d] !== b[0][d]) return !1;
                            return !0
                        }
                        return !1
                    }
                },
                "!=": {
                    conditionName: function (a, b) {
                        return a.i18n("searchBuilder.conditions.array.not", b.conditions.array.not)
                    },
                    init: c.initSelect,
                    inputValue: c.inputValueSelect,
                    isInputValid: c.isInputValidSelect,
                    search: function (a, b) {
                        if (a.length === b[0].length) {
                            for (var d = 0; d < a.length; d++)
                                if (a[d] !== b[0][d]) return !0;
                            return !1
                        }
                        return !0
                    }
                },
                "null": {
                    conditionName: function (a, b) {
                        return a.i18n("searchBuilder.conditions.array.empty", b.conditions.array.empty)
                    },
                    init: c.initNoValue,
                    inputValue: function () {},
                    isInputValid: function () {
                        return !0
                    },
                    search: function (a) {
                        return null === a || void 0 === a || 0 === a.length
                    }
                },
                "!null": {
                    conditionName: function (a, b) {
                        return a.i18n("searchBuilder.conditions.array.notEmpty",
                            b.conditions.array.notEmpty)
                    },
                    init: c.initNoValue,
                    inputValue: function () {},
                    isInputValid: function () {
                        return !0
                    },
                    search: function (a) {
                        return null !== a && void 0 !== a && 0 !== a.length
                    }
                }
            };
            c.defaults = {
                columns: !0,
                conditions: {
                    array: c.arrayConditions,
                    date: c.dateConditions,
                    html: c.stringConditions,
                    "html-num": c.numConditions,
                    "html-num-fmt": c.numFmtConditions,
                    luxon: c.luxonDateConditions,
                    moment: c.momentDateConditions,
                    num: c.numConditions,
                    "num-fmt": c.numFmtConditions,
                    string: c.stringConditions
                },
                depthLimit: !1,
                enterSearch: !1,
                filterChanged: void 0,
                greyscale: !1,
                i18n: {
                    add: "Add Condition",
                    button: {
                        0: "Search Builder",
                        _: "Search Builder (%d)"
                    },
                    clearAll: "Clear All",
                    condition: "Condition",
                    data: "Data",
                    "delete": "&times",
                    deleteTitle: "Delete filtering rule",
                    left: "<",
                    leftTitle: "Outdent criteria",
                    logicAnd: "And",
                    logicOr: "Or",
                    right: ">",
                    rightTitle: "Indent criteria",
                    title: {
                        0: "Custom Search Builder",
                        _: "Custom Search Builder (%d)"
                    },
                    value: "Value",
                    valueJoiner: "and"
                },
                logic: "AND",
                orthogonal: {
                    display: "display",
                    search: "filter"
                },
                preDefined: !1
            };
            return c
        }(),
        B, E, G = function () {
            function c(a,
                b, d, e, f, g) {
                void 0 === e && (e = 0);
                void 0 === f && (f = !1);
                void 0 === g && (g = 1);
                if (!E || !E.versionCheck || !E.versionCheck("1.10.0")) throw Error("SearchBuilder requires DataTables 1.10 or newer");
                this.classes = B.extend(!0, {}, c.classes);
                this.c = B.extend(!0, {}, c.defaults, b);
                this.s = {
                    criteria: [],
                    depth: g,
                    dt: a,
                    index: e,
                    isChild: f,
                    logic: void 0,
                    opts: b,
                    preventRedraw: !1,
                    toDrop: void 0,
                    topGroup: d
                };
                this.dom = {
                    add: B("<button/>").addClass(this.classes.add).addClass(this.classes.button).attr("type", "button"),
                    clear: B("<button>&times</button>").addClass(this.classes.button).addClass(this.classes.clearGroup).attr("type",
                        "button"),
                    container: B("<div/>").addClass(this.classes.group),
                    logic: B("<button><div/></button>").addClass(this.classes.logic).addClass(this.classes.button).attr("type", "button"),
                    logicContainer: B("<div/>").addClass(this.classes.logicContainer)
                };
                void 0 === this.s.topGroup && (this.s.topGroup = this.dom.container);
                this._setup();
                return this
            }
            c.prototype.destroy = function () {
                this.dom.add.off(".dtsb");
                this.dom.logic.off(".dtsb");
                this.dom.container.trigger("dtsb-destroy").remove();
                this.s.criteria = []
            };
            c.prototype.getDetails =
                function (a) {
                    void 0 === a && (a = !1);
                    if (0 === this.s.criteria.length) return {};
                    for (var b = {
                            criteria: [],
                            logic: this.s.logic
                        }, d = 0, e = this.s.criteria; d < e.length; d++) b.criteria.push(e[d].criteria.getDetails(a));
                    return b
                };
            c.prototype.getNode = function () {
                return this.dom.container
            };
            c.prototype.rebuild = function (a) {
                if (!(void 0 === a.criteria || null === a.criteria || Array.isArray(a.criteria) && 0 === a.criteria.length)) {
                    this.s.logic = a.logic;
                    this.dom.logic.children().first().text("OR" === this.s.logic ? this.s.dt.i18n("searchBuilder.logicOr",
                        this.c.i18n.logicOr) : this.s.dt.i18n("searchBuilder.logicAnd", this.c.i18n.logicAnd));
                    if (Array.isArray(a.criteria))
                        for (var b = 0, d = a.criteria; b < d.length; b++) a = d[b], void 0 !== a.logic ? this._addPrevGroup(a) : void 0 === a.logic && this._addPrevCriteria(a);
                    b = 0;
                    for (d = this.s.criteria; b < d.length; b++) a = d[b], a.criteria instanceof r && (a.criteria.updateArrows(1 < this.s.criteria.length, !1), this._setCriteriaListeners(a.criteria))
                }
            };
            c.prototype.redrawContents = function () {
                if (!this.s.preventRedraw) {
                    this.dom.container.children().detach();
                    this.dom.container.append(this.dom.logicContainer).append(this.dom.add);
                    this.s.criteria.sort(function (d, e) {
                        return d.criteria.s.index < e.criteria.s.index ? -1 : d.criteria.s.index > e.criteria.s.index ? 1 : 0
                    });
                    this.setListeners();
                    for (var a = 0; a < this.s.criteria.length; a++) {
                        var b = this.s.criteria[a].criteria;
                        b instanceof r ? (this.s.criteria[a].index = a, this.s.criteria[a].criteria.s.index = a, this.s.criteria[a].criteria.dom.container.insertBefore(this.dom.add), this._setCriteriaListeners(b), this.s.criteria[a].criteria.rebuild(this.s.criteria[a].criteria.getDetails())) :
                            b instanceof c && 0 < b.s.criteria.length ? (this.s.criteria[a].index = a, this.s.criteria[a].criteria.s.index = a, this.s.criteria[a].criteria.dom.container.insertBefore(this.dom.add), b.redrawContents(), this._setGroupListeners(b)) : (this.s.criteria.splice(a, 1), a--)
                    }
                    this.setupLogic()
                }
            };
            c.prototype.redrawLogic = function () {
                for (var a = 0, b = this.s.criteria; a < b.length; a++) {
                    var d = b[a];
                    d instanceof c && d.redrawLogic()
                }
                this.setupLogic()
            };
            c.prototype.search = function (a, b) {
                return "AND" === this.s.logic ? this._andSearch(a, b) : "OR" ===
                    this.s.logic ? this._orSearch(a, b) : !0
            };
            c.prototype.setupLogic = function () {
                this.dom.logicContainer.remove();
                this.dom.clear.remove();
                if (1 > this.s.criteria.length) this.s.isChild || (this.dom.container.trigger("dtsb-destroy"), this.dom.container.css("margin-left", 0));
                else {
                    var a = this.dom.container.height() - 1;
                    this.dom.clear.height("0px");
                    this.dom.logicContainer.append(this.dom.clear).width(a);
                    this.dom.container.prepend(this.dom.logicContainer);
                    this._setLogicListener();
                    this.dom.container.css("margin-left", this.dom.logicContainer.outerHeight(!0));
                    a = this.dom.logicContainer.offset();
                    var b = a.left,
                        d = this.dom.container.offset().left;
                    b = b - (b - d) - this.dom.logicContainer.outerHeight(!0);
                    this.dom.logicContainer.offset({
                        left: b
                    });
                    b = this.dom.logicContainer.next();
                    a = a.top;
                    b = B(b).offset().top;
                    this.dom.logicContainer.offset({
                        top: a - (a - b)
                    });
                    this.dom.clear.outerHeight(this.dom.logicContainer.height());
                    this._setClearListener()
                }
            };
            c.prototype.setListeners = function () {
                var a = this;
                this.dom.add.unbind("click");
                this.dom.add.on("click.dtsb", function () {
                    a.s.isChild || a.dom.container.prepend(a.dom.logicContainer);
                    a.addCriteria();
                    a.dom.container.trigger("dtsb-add");
                    a.s.dt.state.save();
                    return !1
                });
                for (var b = 0, d = this.s.criteria; b < d.length; b++) d[b].criteria.setListeners();
                this._setClearListener();
                this._setLogicListener()
            };
            c.prototype.addCriteria = function (a, b) {
                void 0 === a && (a = null);
                void 0 === b && (b = !0);
                var d = null === a ? this.s.criteria.length : a.s.index,
                    e = new r(this.s.dt, this.s.opts, this.s.topGroup, d, this.s.depth);
                null !== a && (e.c = a.c, e.s = a.s, e.s.depth = this.s.depth, e.classes = a.classes);
                e.populate();
                a = !1;
                for (var f = 0; f < this.s.criteria.length; f++) 0 ===
                    f && this.s.criteria[f].criteria.s.index > e.s.index ? (e.getNode().insertBefore(this.s.criteria[f].criteria.dom.container), a = !0) : f < this.s.criteria.length - 1 && this.s.criteria[f].criteria.s.index < e.s.index && this.s.criteria[f + 1].criteria.s.index > e.s.index && (e.getNode().insertAfter(this.s.criteria[f].criteria.dom.container), a = !0);
                a || e.getNode().insertBefore(this.dom.add);
                this.s.criteria.push({
                    criteria: e,
                    index: d
                });
                this.s.criteria = this.s.criteria.sort(function (g, n) {
                    return g.criteria.s.index - n.criteria.s.index
                });
                d = 0;
                for (a = this.s.criteria; d < a.length; d++) f = a[d], f.criteria instanceof r && f.criteria.updateArrows(1 < this.s.criteria.length, b);
                this._setCriteriaListeners(e);
                e.setListeners();
                this.setupLogic()
            };
            c.prototype.checkFilled = function () {
                for (var a = 0, b = this.s.criteria; a < b.length; a++) {
                    var d = b[a];
                    if (d.criteria instanceof r && d.criteria.s.filled || d.criteria instanceof c && d.criteria.checkFilled()) return !0
                }
                return !1
            };
            c.prototype.count = function () {
                for (var a = 0, b = 0, d = this.s.criteria; b < d.length; b++) {
                    var e = d[b];
                    e.criteria instanceof
                    c ? a += e.criteria.count() : a++
                }
                return a
            };
            c.prototype._addPrevGroup = function (a) {
                var b = this.s.criteria.length,
                    d = new c(this.s.dt, this.c, this.s.topGroup, b, !0, this.s.depth + 1);
                this.s.criteria.push({
                    criteria: d,
                    index: b,
                    logic: d.s.logic
                });
                d.rebuild(a);
                this.s.criteria[b].criteria = d;
                this.s.topGroup.trigger("dtsb-redrawContents");
                this._setGroupListeners(d)
            };
            c.prototype._addPrevCriteria = function (a) {
                var b = this.s.criteria.length,
                    d = new r(this.s.dt, this.s.opts, this.s.topGroup, b, this.s.depth);
                d.populate();
                this.s.criteria.push({
                    criteria: d,
                    index: b
                });
                d.rebuild(a);
                this.s.criteria[b].criteria = d;
                this.s.topGroup.trigger("dtsb-redrawContents")
            };
            c.prototype._andSearch = function (a, b) {
                if (0 === this.s.criteria.length) return !0;
                for (var d = 0, e = this.s.criteria; d < e.length; d++) {
                    var f = e[d];
                    if (!(f.criteria instanceof r && !f.criteria.s.filled || f.criteria.search(a, b))) return !1
                }
                return !0
            };
            c.prototype._orSearch = function (a, b) {
                if (0 === this.s.criteria.length) return !0;
                for (var d = !1, e = 0, f = this.s.criteria; e < f.length; e++) {
                    var g = f[e];
                    if (g.criteria instanceof r && g.criteria.s.filled) {
                        if (d = !0, g.criteria.search(a, b)) return !0
                    } else if (g.criteria instanceof c && g.criteria.checkFilled() && (d = !0, g.criteria.search(a, b))) return !0
                }
                return !d
            };
            c.prototype._removeCriteria = function (a, b) {
                void 0 === b && (b = !1);
                if (1 >= this.s.criteria.length && this.s.isChild) this.destroy();
                else {
                    for (var d = void 0, e = 0; e < this.s.criteria.length; e++) this.s.criteria[e].index === a.s.index && (!b || this.s.criteria[e].criteria instanceof c) && (d = e);
                    void 0 !== d && this.s.criteria.splice(d, 1);
                    for (e = 0; e < this.s.criteria.length; e++) this.s.criteria[e].index =
                        e, this.s.criteria[e].criteria.s.index = e
                }
            };
            c.prototype._setCriteriaListeners = function (a) {
                var b = this;
                a.dom["delete"].unbind("click").on("click.dtsb", function () {
                    b._removeCriteria(a);
                    a.dom.container.remove();
                    for (var d = 0, e = b.s.criteria; d < e.length; d++) {
                        var f = e[d];
                        f.criteria instanceof r && f.criteria.updateArrows(1 < b.s.criteria.length)
                    }
                    a.destroy();
                    b.s.dt.draw();
                    b.s.topGroup.trigger("dtsb-redrawContents");
                    b.s.topGroup.trigger("dtsb-updateTitle");
                    return !1
                });
                a.dom.right.unbind("click").on("click.dtsb", function () {
                    var d =
                        a.s.index,
                        e = new c(b.s.dt, b.s.opts, b.s.topGroup, a.s.index, !0, b.s.depth + 1);
                    e.addCriteria(a);
                    b.s.criteria[d].criteria = e;
                    b.s.criteria[d].logic = "AND";
                    b.s.topGroup.trigger("dtsb-redrawContents");
                    b._setGroupListeners(e);
                    return !1
                });
                a.dom.left.unbind("click").on("click.dtsb", function () {
                    b.s.toDrop = new r(b.s.dt, b.s.opts, b.s.topGroup, a.s.index);
                    b.s.toDrop.s = a.s;
                    b.s.toDrop.c = a.c;
                    b.s.toDrop.classes = a.classes;
                    b.s.toDrop.populate();
                    var d = b.s.toDrop.s.index;
                    b.dom.container.trigger("dtsb-dropCriteria");
                    a.s.index = d;
                    b._removeCriteria(a);
                    b.s.topGroup.trigger("dtsb-redrawContents");
                    b.s.dt.draw();
                    return !1
                })
            };
            c.prototype._setClearListener = function () {
                var a = this;
                this.dom.clear.unbind("click").on("click.dtsb", function () {
                    if (!a.s.isChild) return a.dom.container.trigger("dtsb-clearContents"), !1;
                    a.destroy();
                    a.s.topGroup.trigger("dtsb-updateTitle");
                    a.s.topGroup.trigger("dtsb-redrawContents");
                    return !1
                })
            };
            c.prototype._setGroupListeners = function (a) {
                var b = this;
                a.dom.add.unbind("click").on("click.dtsb", function () {
                    b.setupLogic();
                    b.dom.container.trigger("dtsb-add");
                    return !1
                });
                a.dom.container.unbind("dtsb-add").on("dtsb-add.dtsb", function () {
                    b.setupLogic();
                    b.dom.container.trigger("dtsb-add");
                    return !1
                });
                a.dom.container.unbind("dtsb-destroy").on("dtsb-destroy.dtsb", function () {
                    b._removeCriteria(a, !0);
                    a.dom.container.remove();
                    b.setupLogic();
                    return !1
                });
                a.dom.container.unbind("dtsb-dropCriteria").on("dtsb-dropCriteria.dtsb", function () {
                    var d = a.s.toDrop;
                    d.s.index = a.s.index;
                    d.updateArrows(1 < b.s.criteria.length, !1);
                    b.addCriteria(d, !1);
                    return !1
                });
                a.setListeners()
            };
            c.prototype._setup = function () {
                this.setListeners();
                this.dom.add.text(this.s.dt.i18n("searchBuilder.add", this.c.i18n.add));
                this.dom.logic.children().first().text("OR" === this.c.logic ? this.s.dt.i18n("searchBuilder.logicOr", this.c.i18n.logicOr) : this.s.dt.i18n("searchBuilder.logicAnd", this.c.i18n.logicAnd));
                this.s.logic = "OR" === this.c.logic ? "OR" : "AND";
                this.c.greyscale && this.dom.logic.addClass(this.classes.greyscale);
                this.dom.logicContainer.append(this.dom.logic).append(this.dom.clear);
                this.s.isChild && this.dom.container.append(this.dom.logicContainer);
                this.dom.container.append(this.dom.add)
            };
            c.prototype._setLogicListener = function () {
                var a = this;
                this.dom.logic.unbind("click").on("click.dtsb", function () {
                    a._toggleLogic();
                    a.s.dt.draw();
                    for (var b = 0, d = a.s.criteria; b < d.length; b++) d[b].criteria.setListeners()
                })
            };
            c.prototype._toggleLogic = function () {
                "OR" === this.s.logic ? (this.s.logic = "AND", this.dom.logic.children().first().text(this.s.dt.i18n("searchBuilder.logicAnd", this.c.i18n.logicAnd))) :
                    "AND" === this.s.logic && (this.s.logic = "OR", this.dom.logic.children().first().text(this.s.dt.i18n("searchBuilder.logicOr", this.c.i18n.logicOr)))
            };
            c.version = "1.1.0";
            c.classes = {
                add: "dtsb-add",
                button: "dtsb-button",
                clearGroup: "dtsb-clearGroup",
                greyscale: "dtsb-greyscale",
                group: "dtsb-group",
                inputButton: "dtsb-iptbtn",
                logic: "dtsb-logic",
                logicContainer: "dtsb-logicContainer"
            };
            c.defaults = {
                columns: !0,
                conditions: {
                    date: r.dateConditions,
                    html: r.stringConditions,
                    "html-num": r.numConditions,
                    "html-num-fmt": r.numFmtConditions,
                    luxon: r.luxonDateConditions,
                    moment: r.momentDateConditions,
                    num: r.numConditions,
                    "num-fmt": r.numFmtConditions,
                    string: r.stringConditions
                },
                depthLimit: !1,
                enterSearch: !1,
                filterChanged: void 0,
                greyscale: !1,
                i18n: {
                    add: "Add Condition",
                    button: {
                        0: "Search Builder",
                        _: "Search Builder (%d)"
                    },
                    clearAll: "Clear All",
                    condition: "Condition",
                    data: "Data",
                    "delete": "&times",
                    deleteTitle: "Delete filtering rule",
                    left: "<",
                    leftTitle: "Outdent criteria",
                    logicAnd: "And",
                    logicOr: "Or",
                    right: ">",
                    rightTitle: "Indent criteria",
                    title: {
                        0: "Custom Search Builder",
                        _: "Custom Search Builder (%d)"
                    },
                    value: "Value",
                    valueJoiner: "and"
                },
                logic: "AND",
                orthogonal: {
                    display: "display",
                    search: "filter"
                },
                preDefined: !1
            };
            return c
        }(),
        x, C, I = function () {
            function c(a, b) {
                var d = this;
                if (!C || !C.versionCheck || !C.versionCheck("1.10.0")) throw Error("SearchBuilder requires DataTables 1.10 or newer");
                a = new C.Api(a);
                this.classes = x.extend(!0, {}, c.classes);
                this.c = x.extend(!0, {}, c.defaults, b);
                this.dom = {
                    clearAll: x('<button type="button">' + a.i18n("searchBuilder.clearAll", this.c.i18n.clearAll) + "</button>").addClass(this.classes.clearAll).addClass(this.classes.button).attr("type",
                        "button"),
                    container: x("<div/>").addClass(this.classes.container),
                    title: x("<div/>").addClass(this.classes.title),
                    titleRow: x("<div/>").addClass(this.classes.titleRow),
                    topGroup: void 0
                };
                this.s = {
                    dt: a,
                    opts: b,
                    search: void 0,
                    topGroup: void 0
                };
                if (void 0 === a.settings()[0]._searchBuilder) {
                    a.settings()[0]._searchBuilder = this;
                    if (this.s.dt.settings()[0]._bInitComplete) this._setUp();
                    else a.one("init.dt", function () {
                        d._setUp()
                    });
                    return this
                }
            }
            c.prototype.getDetails = function (a) {
                void 0 === a && (a = !1);
                return this.s.topGroup.getDetails(a)
            };
            c.prototype.getNode = function () {
                return this.dom.container
            };
            c.prototype.rebuild = function (a) {
                this.dom.clearAll.click();
                if (void 0 === a || null === a) return this;
                this.s.topGroup.s.preventRedraw = !0;
                this.s.topGroup.rebuild(a);
                this.s.topGroup.s.preventRedraw = !1;
                this.s.topGroup.redrawContents();
                this.s.dt.draw(!1);
                this.s.topGroup.setListeners();
                return this
            };
            c.prototype._applyPreDefDefaults = function (a) {
                var b = this;
                void 0 !== a.criteria && void 0 === a.logic && (a.logic = "AND");
                for (var d = function (n) {
                        void 0 !== n.criteria ? n = e._applyPreDefDefaults(n) :
                            e.s.dt.columns().every(function (q) {
                                b.s.dt.settings()[0].aoColumns[q].sTitle === n.data && (n.dataIdx = q)
                            })
                    }, e = this, f = 0, g = a.criteria; f < g.length; f++) d(g[f]);
                return a
            };
            c.prototype._setUp = function (a) {
                var b = this;
                void 0 === a && (a = !0);
                x.fn.DataTable.Api.registerPlural("columns().type()", "column().type()", function () {
                    return this.iterator("column", function (n, q) {
                        return n.aoColumns[q].sType
                    }, 1)
                });
                if (!C.DateTime) {
                    var d = this.s.dt.columns().type().toArray();
                    if (void 0 === d || d.includes(void 0) || d.includes(null)) {
                        d = [];
                        for (var e =
                                0, f = this.s.dt.settings()[0].aoColumns; e < f.length; e++) {
                            var g = f[e];
                            d.push(void 0 !== g.searchBuilderType ? g.searchBuilderType : g.sType)
                        }
                    }
                    e = this.s.dt.columns().toArray();
                    if (void 0 === d || d.includes(void 0) || d.includes(null)) x.fn.dataTable.ext.oApi._fnColumnTypes(this.s.dt.settings()[0]), d = this.s.dt.columns().type().toArray();
                    for (f = 0; f < e[0].length; f++)
                        if (g = d[e[0][f]], (!0 === this.c.columns || Array.isArray(this.c.columns) && this.c.columns.includes(f)) && (g.includes("date") || g.includes("moment") || g.includes("luxon"))) throw alert("SearchBuilder Requires DateTime when used with dates."),
                            Error("SearchBuilder requires DateTime");
                }
                this.s.topGroup = new G(this.s.dt, this.c, void 0);
                this._setClearListener();
                this.s.dt.on("stateSaveParams.dtsb", function (n, q, u) {
                    u.searchBuilder = b.getDetails();
                    u.page = b.s.dt.page()
                });
                this.s.dt.on("stateLoadParams.dtsb", function (n, q, u) {
                    b.rebuild(u.searchBuilder)
                });
                this._build();
                this.s.dt.on("preXhr.dtsb", function (n, q, u) {
                    b.s.dt.page.info().serverSide && (u.searchBuilder = b._collapseArray(b.getDetails(!0)))
                });
                a && (a = this.s.dt.state.loaded(), null !== a && void 0 !== a.searchBuilder ?
                    (this.s.topGroup.rebuild(a.searchBuilder), this.s.topGroup.dom.container.trigger("dtsb-redrawContents"), this.s.dt.page(a.page).draw("page"), this.s.topGroup.setListeners()) : !1 !== this.c.preDefined && (this.c.preDefined = this._applyPreDefDefaults(this.c.preDefined), this.rebuild(this.c.preDefined)));
                this._setEmptyListener();
                this.s.dt.state.save()
            };
            c.prototype._collapseArray = function (a) {
                if (void 0 === a.logic) void 0 !== a.value && (a.value.sort(function (d, e) {
                        isNaN(+d) || (d = +d, e = +e);
                        return d < e ? -1 : e < d ? 1 : 0
                    }), a.value1 =
                    a.value[0], a.value2 = a.value[1]);
                else
                    for (var b = 0; b < a.criteria.length; b++) a.criteria[b] = this._collapseArray(a.criteria[b]);
                return a
            };
            c.prototype._updateTitle = function (a) {
                this.dom.title.html(this.s.dt.i18n("searchBuilder.title", this.c.i18n.title, a))
            };
            c.prototype._build = function () {
                var a = this;
                this.dom.clearAll.remove();
                this.dom.container.empty();
                var b = this.s.topGroup.count();
                this._updateTitle(b);
                this.dom.titleRow.append(this.dom.title);
                this.dom.container.append(this.dom.titleRow);
                this.dom.topGroup = this.s.topGroup.getNode();
                this.dom.container.append(this.dom.topGroup);
                this._setRedrawListener();
                var d = this.s.dt.table(0).node();
                x.fn.dataTable.ext.search.includes(this.s.search) || (this.s.search = function (e, f, g) {
                    return e.nTable !== d ? !0 : a.s.topGroup.search(f, g)
                }, x.fn.dataTable.ext.search.push(this.s.search));
                this.s.dt.on("destroy.dtsb", function () {
                    a.dom.container.remove();
                    a.dom.clearAll.remove();
                    for (var e = x.fn.dataTable.ext.search.indexOf(a.s.search); - 1 !== e;) x.fn.dataTable.ext.search.splice(e, 1), e = x.fn.dataTable.ext.search.indexOf(a.s.search);
                    a.s.dt.off(".dtsb");
                    x(a.s.dt.table().node()).off(".dtsb")
                })
            };
            c.prototype._checkClear = function () {
                0 < this.s.topGroup.s.criteria.length ? (this.dom.clearAll.insertAfter(this.dom.title), this._setClearListener()) : this.dom.clearAll.remove()
            };
            c.prototype._filterChanged = function (a) {
                var b = this.c.filterChanged;
                "function" === typeof b && b(a, this.s.dt.i18n("searchBuilder.button", this.c.i18n.button, a))
            };
            c.prototype._setClearListener = function () {
                var a = this;
                this.dom.clearAll.unbind("click");
                this.dom.clearAll.on("click.dtsb",
                    function () {
                        a.s.topGroup = new G(a.s.dt, a.c, void 0);
                        a._build();
                        a.s.dt.draw();
                        a.s.topGroup.setListeners();
                        a.dom.clearAll.remove();
                        a._setEmptyListener();
                        a._filterChanged(0);
                        return !1
                    })
            };
            c.prototype._setRedrawListener = function () {
                var a = this;
                this.s.topGroup.dom.container.unbind("dtsb-redrawContents");
                this.s.topGroup.dom.container.on("dtsb-redrawContents.dtsb", function () {
                    a._checkClear();
                    a.s.topGroup.redrawContents();
                    a.s.topGroup.setupLogic();
                    a._setEmptyListener();
                    var b = a.s.topGroup.count();
                    a._updateTitle(b);
                    a._filterChanged(b);
                    a.s.dt.draw();
                    a.s.dt.state.save()
                });
                this.s.topGroup.dom.container.unbind("dtsb-redrawLogic");
                this.s.topGroup.dom.container.on("dtsb-redrawLogic.dtsb", function () {
                    a.s.topGroup.redrawLogic();
                    var b = a.s.topGroup.count();
                    a._updateTitle(b);
                    a._filterChanged(b)
                });
                this.s.topGroup.dom.container.unbind("dtsb-add");
                this.s.topGroup.dom.container.on("dtsb-add.dtsb", function () {
                    var b = a.s.topGroup.count();
                    a._updateTitle(b);
                    a._filterChanged(b)
                });
                this.s.dt.on("postEdit.dtsb postCreate.dtsb postRemove.dtsb",
                    function () {
                        a.s.topGroup.redrawContents()
                    });
                this.s.topGroup.dom.container.unbind("dtsb-clearContents");
                this.s.topGroup.dom.container.on("dtsb-clearContents.dtsb", function () {
                    a._setUp(!1);
                    a._filterChanged(0);
                    a.s.dt.draw()
                });
                this.s.topGroup.dom.container.on("dtsb-updateTitle.dtsb", function () {
                    var b = a.s.topGroup.count();
                    a._updateTitle(b);
                    a._filterChanged(b)
                })
            };
            c.prototype._setEmptyListener = function () {
                var a = this;
                this.s.topGroup.dom.add.on("click.dtsb", function () {
                    a._checkClear()
                });
                this.s.topGroup.dom.container.on("dtsb-destroy.dtsb",
                    function () {
                        a.dom.clearAll.remove()
                    })
            };
            c.version = "1.3.0";
            c.classes = {
                button: "dtsb-button",
                clearAll: "dtsb-clearAll",
                container: "dtsb-searchBuilder",
                inputButton: "dtsb-iptbtn",
                title: "dtsb-title",
                titleRow: "dtsb-titleRow"
            };
            c.defaults = {
                columns: !0,
                conditions: {
                    date: r.dateConditions,
                    html: r.stringConditions,
                    "html-num": r.numConditions,
                    "html-num-fmt": r.numFmtConditions,
                    luxon: r.luxonDateConditions,
                    moment: r.momentDateConditions,
                    num: r.numConditions,
                    "num-fmt": r.numFmtConditions,
                    string: r.stringConditions
                },
                depthLimit: !1,
                enterSearch: !1,
                filterChanged: void 0,
                greyscale: !1,
                i18n: {
                    add: "Add Condition",
                    button: {
                        0: "Search Builder",
                        _: "Search Builder (%d)"
                    },
                    clearAll: "Clear All",
                    condition: "Condition",
                    conditions: {
                        array: {
                            contains: "Contains",
                            empty: "Empty",
                            equals: "Equals",
                            not: "Not",
                            notEmpty: "Not Empty",
                            without: "Without"
                        },
                        date: {
                            after: "After",
                            before: "Before",
                            between: "Between",
                            empty: "Empty",
                            equals: "Equals",
                            not: "Not",
                            notBetween: "Not Between",
                            notEmpty: "Not Empty"
                        },
                        number: {
                            between: "Between",
                            empty: "Empty",
                            equals: "Equals",
                            gt: "Greater Than",
                            gte: "Greater Than Equal To",
                            lt: "Less Than",
                            lte: "Less Than Equal To",
                            not: "Not",
                            notBetween: "Not Between",
                            notEmpty: "Not Empty"
                        },
                        string: {
                            contains: "Contains",
                            empty: "Empty",
                            endsWith: "Ends With",
                            equals: "Equals",
                            not: "Not",
                            notContains: "Does Not Contain",
                            notEmpty: "Not Empty",
                            notEndsWith: "Does Not End With",
                            notStartsWith: "Does Not Start With",
                            startsWith: "Starts With"
                        }
                    },
                    data: "Data",
                    "delete": "&times",
                    deleteTitle: "Delete filtering rule",
                    left: "<",
                    leftTitle: "Outdent criteria",
                    logicAnd: "And",
                    logicOr: "Or",
                    right: ">",
                    rightTitle: "Indent criteria",
                    title: {
                        0: "Custom Search Builder",
                        _: "Custom Search Builder (%d)"
                    },
                    value: "Value",
                    valueJoiner: "and"
                },
                logic: "AND",
                orthogonal: {
                    display: "display",
                    search: "filter"
                },
                preDefined: !1
            };
            return c
        }();
    (function (c) {
        "function" === typeof define && define.amd ? define(["jquery", "datatables.net"], function (a) {
            return c(a, window, document)
        }) : "object" === typeof exports ? module.exports = function (a, b) {
            a || (a = window);
            b && b.fn.dataTable || (b = require("datatables.net")(a, b).$);
            return c(b, a, a.document)
        } : c(window.jQuery,
            window, document)
    })(function (c, a, b) {
        function d(f, g) {
            f = new e.Api(f);
            g = g ? g : f.init().searchBuilder || e.defaults.searchBuilder;
            return (new I(f, g)).getNode()
        }
        l(c);
        m(c);
        k(c);
        var e = c.fn.dataTable;
        c.fn.dataTable.SearchBuilder = I;
        c.fn.DataTable.SearchBuilder = I;
        c.fn.dataTable.Group = G;
        c.fn.DataTable.Group = G;
        c.fn.dataTable.Criteria = r;
        c.fn.DataTable.Criteria = r;
        a = c.fn.dataTable.Api.register;
        c.fn.dataTable.ext.searchBuilder = {
            conditions: {}
        };
        c.fn.dataTable.ext.buttons.searchBuilder = {
            action: function (f, g, n, q) {
                this.popover(q._searchBuilder.getNode(), {
                    align: "dt-container"
                });
                void 0 !== q._searchBuilder.s.topGroup && q._searchBuilder.s.topGroup.dom.container.trigger("dtsb-redrawContents");
                0 === q._searchBuilder.s.topGroup.s.criteria.length && c("." + c.fn.dataTable.Group.classes.add).click()
            },
            config: {},
            init: function (f, g, n) {
                var q = new c.fn.dataTable.SearchBuilder(f, c.extend({
                    filterChanged: function (u, D) {
                        f.button(g).text(D)
                    }
                }, n.config));
                f.button(g).text(n.text || f.i18n("searchBuilder.button", q.c.i18n.button, 0));
                n._searchBuilder = q
            },
            text: null
        };
        a("searchBuilder.getDetails()",
            function (f) {
                void 0 === f && (f = !1);
                var g = this.context[0];
                return g._searchBuilder ? g._searchBuilder.getDetails(f) : null
            });
        a("searchBuilder.rebuild()", function (f) {
            var g = this.context[0];
            if (void 0 === g._searchBuilder) return null;
            g._searchBuilder.rebuild(f);
            return this
        });
        a("searchBuilder.container()", function () {
            var f = this.context[0];
            return f._searchBuilder ? f._searchBuilder.getNode() : null
        });
        c(b).on("preInit.dt.dtsp", function (f, g) {
            "dt" === f.namespace && (g.oInit.searchBuilder || e.defaults.searchBuilder) && (g._searchBuilder ||
                d(g))
        });
        e.ext.feature.push({
            cFeature: "Q",
            fnInit: d
        });
        e.ext.features && e.ext.features.register("searchBuilder", d)
    })
})();