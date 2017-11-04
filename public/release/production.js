function SpecialReset() { $(".option.open .profile").css("visibility", "hidden").addClass("hidden"), $(".special-options .col-xs-12").removeClass("col-xs-12").addClass("col-xs-6"), $(".special-scroll").css("overflow-y", "scroll"), $(".option.open").removeClass("open"), $(".option-wrap").css("height", "240px").css("width", "50%"), $(".option-wrap, .option-select").show(), $(".option-wrap").css("visibility", "visible") }

function clearScreen() { $(".modal").hide(), SpecialReset() }

function Reload() { points = 0, $("#points-counter #points-text").text(points) }

function ShowMatch(a, b, c) { var d = $(a).find(".item-pane").attr("id"),
        e = !1; if ($(".buttons input").prop("disabled", !0), g = window.level, "*" == g) { if (matchList.push({ item: d, match: b, choice: c }), b ? (UpdateScore(1), ion.sound.play("tada", { volume: .2 })) : ($(a).addClass("loss"), $(".lives-wrap").find(".life:not(.loss)").first().addClass("loss"), UpdateScore(-1), ion.sound.play("wahwah")), ($(".level .item").length <= 1 || 3 == $(".level .life.loss").length) && (e = !0), setTimeout(function() { a.remove() }, 500), e === !0) { var f = { id: window.playerId, score: points, matchList: matchList, level: $(".level.tinderslide").data("level") };
            clearInterval(countdown); var g = $(".game-level .level").data("level"),
                h = $('.game-level .level[data-level="' + g + '"]').data("tries");
            h ? $('.game-level .level[data-level="' + g + '"]').data("tries", h + 1) : $('.game-level .level[data-level="' + g + '"]').data("tries", 1), $.get("/api/game/", f, function(a) { $(".buttons").hide(), $(".modal.end").html(a.html).fadeIn(function() { $(".match-list").css("visibility", "visible"), $(".btn.replay").unbind("click").on("click", function() { StartLevel(g), $(".modal.end").hide() }), $(".btn.next-lvl").unbind("click").on("click", function() { StartLevel(g + 1), $(".modal.end").hide() }) }) }) } return void $(".buttons input").prop("disabled", !1) } if (1 != matchOpen && d) { setTimeout(function() { a.remove() }, 500), matchOpen = !0; var f = { match: b, id: d };
        $.get("/api/game/match", f, function(c) { ion.sound.stop(), 1 == b ? (UpdateScore(1), ion.sound.play("tada", { volume: .2 })) : (UpdateScore(0), ion.sound.play("wahwah")), $(".modal.match").css("opacity", 1), $(".modal.match").html(c.html).fadeIn(function() { if ($(a) && a.remove(), $(".item").length <= 1 && (e = !0), e === !0) { var b = { id: window.playerId, score: points, level: $(".level.tinderslide").data("level") },
                        c = $(".game-level .level").data("level"),
                        d = $(".game-level .level[data-level=" + c + "]").data("tries");
                    d ? $(".game-level .level[data-level=" + c + "]").data("tries", d + 1) : $(".game-level .level[data-level=" + c + "]").data("tries", 1), $.get("/api/game/", b, function(a) { $(".buttons").hide(), $(".modal.end").html(a.html).fadeIn(function() { $(".btn.replay").unbind("click").on("click", function() { StartLevel(c), $(".modal.end").hide() }), $(".btn.next-lvl").unbind("click").on("click", function() { StartLevel(c + 1), $(".modal.end").hide() }) }) }) } $(this).find("#back-btn").on("click", function() { $(".modal.match .modal-wrap").remove(), $(".modal.match").animate({ opacity: 0 }, 100, function() { matchOpen = !1, $(".modal.match").hide(), $(".buttons input").prop("disabled", !1) }) }) }) }) } }

function CheckItem(a, b, c) { ShowMatch(a, b, c) }

function timer(a, b, c, d) { counting = !0; var e = a;
    $(b).text(e), clearInterval(countdown), countdown = setInterval(function() { c && ($(b).css("font-size", timerSize), $(b).animate({ "font-size": "0px" }, 900)), e >= 0 && $(b).text(e), e -= 1, e <= -1 && (counting = !1, $(b).css("font-size", timerSize), d()) }, 1e3) }

function free(a) { a && (timerSize = $(display).css("font-size")), $(".level .item").length <= 1 || 3 == $(".level .life.loss").length || (currentItem || (currentItem = $(document).find(".level .item").last()), clearInterval(countdown), timer(speed, display, !0, function() { currentItem = $(document).find(".level .item").last(), ShowMatch(currentItem, !1, "Loss"), $(currentItem).addClass("gone").addClass("loss"), clearInterval(countdown), clearScreen(), $(".level .item").length <= 1 || 3 == $(".level .life.loss").length || free() })) }

function getReady() { $(readyDisplay).show(function() { setTimeout(function() { var a = $(readyDisplay).find("#ready-timer-text");
            timerSize = $(a).css("font-size"), $(a).show(function() { timer(readyCount, a, !0, function() { clearInterval(countdown), $(a).text("Go!").css("font-size", timerSize), setTimeout(function() { $(readyDisplay).animate({ left: "600px" }, 500, function() { free(!0) }) }, 500) }), $(readyDisplay).find("#skip").on("click", function() { clearInterval(countdown), $(readyDisplay).hide(), free(!0) }) }) }, 1e3) }) }

function UpdateScore(a) { points += a, $("#points-counter #points-text").html(points) } imageLoaded = function(a, b) { a.find("img").first().on("load", function() { b() }).each(function() { this.complete && $(this).load() }) },
    function(a) { "function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery) }(function(a) {
        function b(a) { for (var b = a.css("visibility");
                "inherit" === b;) a = a.parent(), b = a.css("visibility"); return "hidden" !== b }

        function c(a) { for (var b, c; a.length && a[0] !== document;) { if (b = a.css("position"), ("absolute" === b || "relative" === b || "fixed" === b) && (c = parseInt(a.css("zIndex"), 10), !isNaN(c) && 0 !== c)) return c;
                a = a.parent() } return 0 }

        function d() { this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, this._inDialog = !1, this._mainDivId = "ui-datepicker-div", this._inlineClass = "ui-datepicker-inline", this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger", this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled", this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day", this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = { closeText: "Done", prevText: "Prev", nextText: "Next", currentText: "Today", monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], weekHeader: "Wk", dateFormat: "mm/dd/yy", firstDay: 0, isRTL: !1, showMonthAfterYear: !1, yearSuffix: "" }, this._defaults = { showOn: "focus", showAnim: "fadeIn", showOptions: {}, defaultDate: null, appendText: "", buttonText: "...", buttonImage: "", buttonImageOnly: !1, hideIfNoPrevNext: !1, navigationAsDateFormat: !1, gotoCurrent: !1, changeMonth: !1, changeYear: !1, yearRange: "c-10:c+10", showOtherMonths: !1, selectOtherMonths: !1, showWeek: !1, calculateWeek: this.iso8601Week, shortYearCutoff: "+10", minDate: null, maxDate: null, duration: "fast", beforeShowDay: null, beforeShow: null, onSelect: null, onChangeMonthYear: null, onClose: null, numberOfMonths: 1, showCurrentAtPos: 0, stepMonths: 1, stepBigMonths: 12, altField: "", altFormat: "", constrainInput: !0, showButtonPanel: !1, autoSize: !1, disabled: !1 }, a.extend(this._defaults, this.regional[""]), this.regional.en = a.extend(!0, {}, this.regional[""]), this.regional["en-US"] = a.extend(!0, {}, this.regional.en), this.dpDiv = e(a("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")) }

        function e(b) { var c = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a"; return b.on("mouseout", c, function() { a(this).removeClass("ui-state-hover"), this.className.indexOf("ui-datepicker-prev") !== -1 && a(this).removeClass("ui-datepicker-prev-hover"), this.className.indexOf("ui-datepicker-next") !== -1 && a(this).removeClass("ui-datepicker-next-hover") }).on("mouseover", c, f) }

        function f() { a.datepicker._isDisabledDatepicker(q.inline ? q.dpDiv.parent()[0] : q.input[0]) || (a(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), a(this).addClass("ui-state-hover"), this.className.indexOf("ui-datepicker-prev") !== -1 && a(this).addClass("ui-datepicker-prev-hover"), this.className.indexOf("ui-datepicker-next") !== -1 && a(this).addClass("ui-datepicker-next-hover")) }

        function g(b, c) { a.extend(b, c); for (var d in c) null == c[d] && (b[d] = c[d]); return b }

        function h(a) { return function() { var b = this.element.val();
                a.apply(this, arguments), this._refresh(), b !== this.element.val() && this._trigger("change") } } a.ui = a.ui || {};
        var i = (a.ui.version = "1.12.0", 0),
            j = Array.prototype.slice;
        a.cleanData = function(b) { return function(c) { var d, e, f; for (f = 0; null != (e = c[f]); f++) try { d = a._data(e, "events"), d && d.remove && a(e).triggerHandler("remove") } catch (g) {} b(c) } }(a.cleanData), a.widget = function(b, c, d) { var e, f, g, h = {},
                i = b.split(".")[0];
            b = b.split(".")[1]; var j = i + "-" + b; return d || (d = c, c = a.Widget), a.isArray(d) && (d = a.extend.apply(null, [{}].concat(d))), a.expr[":"][j.toLowerCase()] = function(b) { return !!a.data(b, j) }, a[i] = a[i] || {}, e = a[i][b], f = a[i][b] = function(a, b) { return this._createWidget ? void(arguments.length && this._createWidget(a, b)) : new f(a, b) }, a.extend(f, e, { version: d.version, _proto: a.extend({}, d), _childConstructors: [] }), g = new c, g.options = a.widget.extend({}, g.options), a.each(d, function(b, d) { return a.isFunction(d) ? void(h[b] = function() {
                    function a() { return c.prototype[b].apply(this, arguments) }

                    function e(a) { return c.prototype[b].apply(this, a) } return function() { var b, c = this._super,
                            f = this._superApply; return this._super = a, this._superApply = e, b = d.apply(this, arguments), this._super = c, this._superApply = f, b } }()) : void(h[b] = d) }), f.prototype = a.widget.extend(g, { widgetEventPrefix: e ? g.widgetEventPrefix || b : b }, h, { constructor: f, namespace: i, widgetName: b, widgetFullName: j }), e ? (a.each(e._childConstructors, function(b, c) { var d = c.prototype;
                a.widget(d.namespace + "." + d.widgetName, f, c._proto) }), delete e._childConstructors) : c._childConstructors.push(f), a.widget.bridge(b, f), f }, a.widget.extend = function(b) { for (var c, d, e = j.call(arguments, 1), f = 0, g = e.length; f < g; f++)
                for (c in e[f]) d = e[f][c], e[f].hasOwnProperty(c) && void 0 !== d && (a.isPlainObject(d) ? b[c] = a.isPlainObject(b[c]) ? a.widget.extend({}, b[c], d) : a.widget.extend({}, d) : b[c] = d); return b }, a.widget.bridge = function(b, c) { var d = c.prototype.widgetFullName || b;
            a.fn[b] = function(e) { var f = "string" == typeof e,
                    g = j.call(arguments, 1),
                    h = this; return f ? this.each(function() { var c, f = a.data(this, d); return "instance" === e ? (h = f, !1) : f ? a.isFunction(f[e]) && "_" !== e.charAt(0) ? (c = f[e].apply(f, g), c !== f && void 0 !== c ? (h = c && c.jquery ? h.pushStack(c.get()) : c, !1) : void 0) : a.error("no such method '" + e + "' for " + b + " widget instance") : a.error("cannot call methods on " + b + " prior to initialization; attempted to call method '" + e + "'") }) : (g.length && (e = a.widget.extend.apply(null, [e].concat(g))), this.each(function() { var b = a.data(this, d);
                    b ? (b.option(e || {}), b._init && b._init()) : a.data(this, d, new c(e, this)) })), h } }, a.Widget = function() {}, a.Widget._childConstructors = [], a.Widget.prototype = { widgetName: "widget", widgetEventPrefix: "", defaultElement: "<div>", options: { classes: {}, disabled: !1, create: null }, _createWidget: function(b, c) { c = a(c || this.defaultElement || this)[0], this.element = a(c), this.uuid = i++, this.eventNamespace = "." + this.widgetName + this.uuid, this.bindings = a(), this.hoverable = a(), this.focusable = a(), this.classesElementLookup = {}, c !== this && (a.data(c, this.widgetFullName, this), this._on(!0, this.element, { remove: function(a) { a.target === c && this.destroy() } }), this.document = a(c.style ? c.ownerDocument : c.document || c), this.window = a(this.document[0].defaultView || this.document[0].parentWindow)), this.options = a.widget.extend({}, this.options, this._getCreateOptions(), b), this._create(), this.options.disabled && this._setOptionDisabled(this.options.disabled), this._trigger("create", null, this._getCreateEventData()), this._init() }, _getCreateOptions: function() { return {} }, _getCreateEventData: a.noop, _create: a.noop, _init: a.noop, destroy: function() { var b = this;
                this._destroy(), a.each(this.classesElementLookup, function(a, c) { b._removeClass(c, a) }), this.element.off(this.eventNamespace).removeData(this.widgetFullName), this.widget().off(this.eventNamespace).removeAttr("aria-disabled"), this.bindings.off(this.eventNamespace) }, _destroy: a.noop, widget: function() { return this.element }, option: function(b, c) { var d, e, f, g = b; if (0 === arguments.length) return a.widget.extend({}, this.options); if ("string" == typeof b)
                    if (g = {}, d = b.split("."), b = d.shift(), d.length) { for (e = g[b] = a.widget.extend({}, this.options[b]), f = 0; f < d.length - 1; f++) e[d[f]] = e[d[f]] || {}, e = e[d[f]]; if (b = d.pop(), 1 === arguments.length) return void 0 === e[b] ? null : e[b];
                        e[b] = c } else { if (1 === arguments.length) return void 0 === this.options[b] ? null : this.options[b];
                        g[b] = c }
                return this._setOptions(g), this }, _setOptions: function(a) { var b; for (b in a) this._setOption(b, a[b]); return this }, _setOption: function(a, b) { return "classes" === a && this._setOptionClasses(b), this.options[a] = b, "disabled" === a && this._setOptionDisabled(b), this }, _setOptionClasses: function(b) { var c, d, e; for (c in b) e = this.classesElementLookup[c], b[c] !== this.options.classes[c] && e && e.length && (d = a(e.get()), this._removeClass(e, c), d.addClass(this._classes({ element: d, keys: c, classes: b, add: !0 }))) }, _setOptionDisabled: function(a) { this._toggleClass(this.widget(), this.widgetFullName + "-disabled", null, !!a), a && (this._removeClass(this.hoverable, null, "ui-state-hover"), this._removeClass(this.focusable, null, "ui-state-focus")) }, enable: function() { return this._setOptions({ disabled: !1 }) }, disable: function() { return this._setOptions({ disabled: !0 }) }, _classes: function(b) {
                function c(c, f) { var g, h; for (h = 0; h < c.length; h++) g = e.classesElementLookup[c[h]] || a(), g = a(b.add ? a.unique(g.get().concat(b.element.get())) : g.not(b.element).get()), e.classesElementLookup[c[h]] = g, d.push(c[h]), f && b.classes[c[h]] && d.push(b.classes[c[h]]) } var d = [],
                    e = this; return b = a.extend({ element: this.element, classes: this.options.classes || {} }, b), b.keys && c(b.keys.match(/\S+/g) || [], !0), b.extra && c(b.extra.match(/\S+/g) || []), d.join(" ") }, _removeClass: function(a, b, c) { return this._toggleClass(a, b, c, !1) }, _addClass: function(a, b, c) { return this._toggleClass(a, b, c, !0) }, _toggleClass: function(a, b, c, d) { d = "boolean" == typeof d ? d : c; var e = "string" == typeof a || null === a,
                    f = { extra: e ? b : c, keys: e ? a : b, element: e ? this.element : a, add: d }; return f.element.toggleClass(this._classes(f), d), this }, _on: function(b, c, d) { var e, f = this; "boolean" != typeof b && (d = c, c = b, b = !1), d ? (c = e = a(c), this.bindings = this.bindings.add(c)) : (d = c, c = this.element, e = this.widget()), a.each(d, function(d, g) {
                    function h() { if (b || f.options.disabled !== !0 && !a(this).hasClass("ui-state-disabled")) return ("string" == typeof g ? f[g] : g).apply(f, arguments) } "string" != typeof g && (h.guid = g.guid = g.guid || h.guid || a.guid++); var i = d.match(/^([\w:-]*)\s*(.*)$/),
                        j = i[1] + f.eventNamespace,
                        k = i[2];
                    k ? e.on(j, k, h) : c.on(j, h) }) }, _off: function(b, c) { c = (c || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, b.off(c).off(c), this.bindings = a(this.bindings.not(b).get()), this.focusable = a(this.focusable.not(b).get()), this.hoverable = a(this.hoverable.not(b).get()) }, _delay: function(a, b) {
                function c() { return ("string" == typeof a ? d[a] : a).apply(d, arguments) } var d = this; return setTimeout(c, b || 0) }, _hoverable: function(b) { this.hoverable = this.hoverable.add(b), this._on(b, { mouseenter: function(b) { this._addClass(a(b.currentTarget), null, "ui-state-hover") }, mouseleave: function(b) { this._removeClass(a(b.currentTarget), null, "ui-state-hover") } }) }, _focusable: function(b) { this.focusable = this.focusable.add(b), this._on(b, { focusin: function(b) { this._addClass(a(b.currentTarget), null, "ui-state-focus") }, focusout: function(b) { this._removeClass(a(b.currentTarget), null, "ui-state-focus") } }) }, _trigger: function(b, c, d) { var e, f, g = this.options[b]; if (d = d || {}, c = a.Event(c), c.type = (b === this.widgetEventPrefix ? b : this.widgetEventPrefix + b).toLowerCase(), c.target = this.element[0], f = c.originalEvent)
                    for (e in f) e in c || (c[e] = f[e]); return this.element.trigger(c, d), !(a.isFunction(g) && g.apply(this.element[0], [c].concat(d)) === !1 || c.isDefaultPrevented()) } }, a.each({ show: "fadeIn", hide: "fadeOut" }, function(b, c) { a.Widget.prototype["_" + b] = function(d, e, f) { "string" == typeof e && (e = { effect: e }); var g, h = e ? e === !0 || "number" == typeof e ? c : e.effect || c : b;
                e = e || {}, "number" == typeof e && (e = { duration: e }), g = !a.isEmptyObject(e), e.complete = f, e.delay && d.delay(e.delay), g && a.effects && a.effects.effect[h] ? d[b](e) : h !== b && d[h] ? d[h](e.duration, e.easing, f) : d.queue(function(c) { a(this)[b](), f && f.call(d[0]), c() }) } });
        a.widget;
        ! function() {
            function b(a, b, c) { return [parseFloat(a[0]) * (n.test(a[0]) ? b / 100 : 1), parseFloat(a[1]) * (n.test(a[1]) ? c / 100 : 1)] }

            function c(b, c) { return parseInt(a.css(b, c), 10) || 0 }

            function d(b) { var c = b[0]; return 9 === c.nodeType ? { width: b.width(), height: b.height(), offset: { top: 0, left: 0 } } : a.isWindow(c) ? { width: b.width(), height: b.height(), offset: { top: b.scrollTop(), left: b.scrollLeft() } } : c.preventDefault ? { width: 0, height: 0, offset: { top: c.pageY, left: c.pageX } } : { width: b.outerWidth(), height: b.outerHeight(), offset: b.offset() } } var e, f, g = Math.max,
                h = Math.abs,
                i = Math.round,
                j = /left|center|right/,
                k = /top|center|bottom/,
                l = /[\+\-]\d+(\.[\d]+)?%?/,
                m = /^\w+/,
                n = /%$/,
                o = a.fn.position;
            f = function() { var b = a("<div>").css("position", "absolute").appendTo("body").offset({ top: 1.5, left: 1.5 }),
                    c = 1.5 === b.offset().top; return b.remove(), f = function() { return c }, c }, a.position = { scrollbarWidth: function() { if (void 0 !== e) return e; var b, c, d = a("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
                        f = d.children()[0]; return a("body").append(d), b = f.offsetWidth, d.css("overflow", "scroll"), c = f.offsetWidth, b === c && (c = d[0].clientWidth), d.remove(), e = b - c }, getScrollInfo: function(b) { var c = b.isWindow || b.isDocument ? "" : b.element.css("overflow-x"),
                        d = b.isWindow || b.isDocument ? "" : b.element.css("overflow-y"),
                        e = "scroll" === c || "auto" === c && b.width < b.element[0].scrollWidth,
                        f = "scroll" === d || "auto" === d && b.height < b.element[0].scrollHeight; return { width: f ? a.position.scrollbarWidth() : 0, height: e ? a.position.scrollbarWidth() : 0 } }, getWithinInfo: function(b) { var c = a(b || window),
                        d = a.isWindow(c[0]),
                        e = !!c[0] && 9 === c[0].nodeType,
                        f = !d && !e; return { element: c, isWindow: d, isDocument: e, offset: f ? a(b).offset() : { left: 0, top: 0 }, scrollLeft: c.scrollLeft(), scrollTop: c.scrollTop(), width: c.outerWidth(), height: c.outerHeight() } } }, a.fn.position = function(e) { if (!e || !e.of) return o.apply(this, arguments);
                e = a.extend({}, e); var n, p, q, r, s, t, u = a(e.of),
                    v = a.position.getWithinInfo(e.within),
                    w = a.position.getScrollInfo(v),
                    x = (e.collision || "flip").split(" "),
                    y = {}; return t = d(u), u[0].preventDefault && (e.at = "left top"), p = t.width, q = t.height, r = t.offset, s = a.extend({}, r), a.each(["my", "at"], function() { var a, b, c = (e[this] || "").split(" ");
                    1 === c.length && (c = j.test(c[0]) ? c.concat(["center"]) : k.test(c[0]) ? ["center"].concat(c) : ["center", "center"]), c[0] = j.test(c[0]) ? c[0] : "center", c[1] = k.test(c[1]) ? c[1] : "center", a = l.exec(c[0]), b = l.exec(c[1]), y[this] = [a ? a[0] : 0, b ? b[0] : 0], e[this] = [m.exec(c[0])[0], m.exec(c[1])[0]] }), 1 === x.length && (x[1] = x[0]), "right" === e.at[0] ? s.left += p : "center" === e.at[0] && (s.left += p / 2), "bottom" === e.at[1] ? s.top += q : "center" === e.at[1] && (s.top += q / 2), n = b(y.at, p, q), s.left += n[0], s.top += n[1], this.each(function() { var d, j, k = a(this),
                        l = k.outerWidth(),
                        m = k.outerHeight(),
                        o = c(this, "marginLeft"),
                        t = c(this, "marginTop"),
                        z = l + o + c(this, "marginRight") + w.width,
                        A = m + t + c(this, "marginBottom") + w.height,
                        B = a.extend({}, s),
                        C = b(y.my, k.outerWidth(), k.outerHeight()); "right" === e.my[0] ? B.left -= l : "center" === e.my[0] && (B.left -= l / 2), "bottom" === e.my[1] ? B.top -= m : "center" === e.my[1] && (B.top -= m / 2), B.left += C[0], B.top += C[1], f() || (B.left = i(B.left), B.top = i(B.top)), d = { marginLeft: o, marginTop: t }, a.each(["left", "top"], function(b, c) { a.ui.position[x[b]] && a.ui.position[x[b]][c](B, { targetWidth: p, targetHeight: q, elemWidth: l, elemHeight: m, collisionPosition: d, collisionWidth: z, collisionHeight: A, offset: [n[0] + C[0], n[1] + C[1]], my: e.my, at: e.at, within: v, elem: k }) }), e.using && (j = function(a) { var b = r.left - B.left,
                            c = b + p - l,
                            d = r.top - B.top,
                            f = d + q - m,
                            i = { target: { element: u, left: r.left, top: r.top, width: p, height: q }, element: { element: k, left: B.left, top: B.top, width: l, height: m }, horizontal: c < 0 ? "left" : b > 0 ? "right" : "center", vertical: f < 0 ? "top" : d > 0 ? "bottom" : "middle" };
                        p < l && h(b + c) < p && (i.horizontal = "center"), q < m && h(d + f) < q && (i.vertical = "middle"), g(h(b), h(c)) > g(h(d), h(f)) ? i.important = "horizontal" : i.important = "vertical", e.using.call(this, a, i) }), k.offset(a.extend(B, { using: j })) }) }, a.ui.position = { fit: { left: function(a, b) { var c, d = b.within,
                            e = d.isWindow ? d.scrollLeft : d.offset.left,
                            f = d.width,
                            h = a.left - b.collisionPosition.marginLeft,
                            i = e - h,
                            j = h + b.collisionWidth - f - e;
                        b.collisionWidth > f ? i > 0 && j <= 0 ? (c = a.left + i + b.collisionWidth - f - e, a.left += i - c) : j > 0 && i <= 0 ? a.left = e : i > j ? a.left = e + f - b.collisionWidth : a.left = e : i > 0 ? a.left += i : j > 0 ? a.left -= j : a.left = g(a.left - h, a.left) }, top: function(a, b) { var c, d = b.within,
                            e = d.isWindow ? d.scrollTop : d.offset.top,
                            f = b.within.height,
                            h = a.top - b.collisionPosition.marginTop,
                            i = e - h,
                            j = h + b.collisionHeight - f - e;
                        b.collisionHeight > f ? i > 0 && j <= 0 ? (c = a.top + i + b.collisionHeight - f - e, a.top += i - c) : j > 0 && i <= 0 ? a.top = e : i > j ? a.top = e + f - b.collisionHeight : a.top = e : i > 0 ? a.top += i : j > 0 ? a.top -= j : a.top = g(a.top - h, a.top) } }, flip: { left: function(a, b) { var c, d, e = b.within,
                            f = e.offset.left + e.scrollLeft,
                            g = e.width,
                            i = e.isWindow ? e.scrollLeft : e.offset.left,
                            j = a.left - b.collisionPosition.marginLeft,
                            k = j - i,
                            l = j + b.collisionWidth - g - i,
                            m = "left" === b.my[0] ? -b.elemWidth : "right" === b.my[0] ? b.elemWidth : 0,
                            n = "left" === b.at[0] ? b.targetWidth : "right" === b.at[0] ? -b.targetWidth : 0,
                            o = -2 * b.offset[0];
                        k < 0 ? (c = a.left + m + n + o + b.collisionWidth - g - f, (c < 0 || c < h(k)) && (a.left += m + n + o)) : l > 0 && (d = a.left - b.collisionPosition.marginLeft + m + n + o - i, (d > 0 || h(d) < l) && (a.left += m + n + o)) }, top: function(a, b) { var c, d, e = b.within,
                            f = e.offset.top + e.scrollTop,
                            g = e.height,
                            i = e.isWindow ? e.scrollTop : e.offset.top,
                            j = a.top - b.collisionPosition.marginTop,
                            k = j - i,
                            l = j + b.collisionHeight - g - i,
                            m = "top" === b.my[1],
                            n = m ? -b.elemHeight : "bottom" === b.my[1] ? b.elemHeight : 0,
                            o = "top" === b.at[1] ? b.targetHeight : "bottom" === b.at[1] ? -b.targetHeight : 0,
                            p = -2 * b.offset[1];
                        k < 0 ? (d = a.top + n + o + p + b.collisionHeight - g - f, (d < 0 || d < h(k)) && (a.top += n + o + p)) : l > 0 && (c = a.top - b.collisionPosition.marginTop + n + o + p - i, (c > 0 || h(c) < l) && (a.top += n + o + p)) } }, flipfit: { left: function() { a.ui.position.flip.left.apply(this, arguments), a.ui.position.fit.left.apply(this, arguments) }, top: function() { a.ui.position.flip.top.apply(this, arguments), a.ui.position.fit.top.apply(this, arguments) } } } }();
        var k = (a.ui.position, a.extend(a.expr[":"], { data: a.expr.createPseudo ? a.expr.createPseudo(function(b) { return function(c) { return !!a.data(c, b) } }) : function(b, c, d) { return !!a.data(b, d[3]) } }), a.fn.extend({ disableSelection: function() { var a = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown"; return function() { return this.on(a + ".ui-disableSelection", function(a) { a.preventDefault() }) } }(), enableSelection: function() { return this.off(".ui-disableSelection") } }), "ui-effects-"),
            l = "ui-effects-style",
            m = "ui-effects-animated",
            n = a;
        a.effects = { effect: {} },
            function(a, b) {
                function c(a, b, c) { var d = l[b.type] || {}; return null == a ? c || !b.def ? null : b.def : (a = d.floor ? ~~a : parseFloat(a), isNaN(a) ? b.def : d.mod ? (a + d.mod) % d.mod : 0 > a ? 0 : d.max < a ? d.max : a) }

                function d(b) { var c = j(),
                        d = c._rgba = []; return b = b.toLowerCase(), o(i, function(a, e) { var f, g = e.re.exec(b),
                            h = g && e.parse(g),
                            i = e.space || "rgba"; if (h) return f = c[i](h), c[k[i].cache] = f[k[i].cache], d = c._rgba = f._rgba, !1 }), d.length ? ("0,0,0,0" === d.join() && a.extend(d, f.transparent), c) : f[b] }

                function e(a, b, c) { return c = (c + 1) % 1, 6 * c < 1 ? a + (b - a) * c * 6 : 2 * c < 1 ? b : 3 * c < 2 ? a + (b - a) * (2 / 3 - c) * 6 : a } var f, g = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",
                    h = /^([\-+])=\s*(\d+\.?\d*)/,
                    i = [{ re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/, parse: function(a) { return [a[1], a[2], a[3], a[4]] } }, { re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/, parse: function(a) { return [2.55 * a[1], 2.55 * a[2], 2.55 * a[3], a[4]] } }, { re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/, parse: function(a) { return [parseInt(a[1], 16), parseInt(a[2], 16), parseInt(a[3], 16)] } }, { re: /#([a-f0-9])([a-f0-9])([a-f0-9])/, parse: function(a) { return [parseInt(a[1] + a[1], 16), parseInt(a[2] + a[2], 16), parseInt(a[3] + a[3], 16)] } }, { re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/, space: "hsla", parse: function(a) { return [a[1], a[2] / 100, a[3] / 100, a[4]] } }],
                    j = a.Color = function(b, c, d, e) { return new a.Color.fn.parse(b, c, d, e) },
                    k = { rgba: { props: { red: { idx: 0, type: "byte" }, green: { idx: 1, type: "byte" }, blue: { idx: 2, type: "byte" } } }, hsla: { props: { hue: { idx: 0, type: "degrees" }, saturation: { idx: 1, type: "percent" }, lightness: { idx: 2, type: "percent" } } } },
                    l = { "byte": { floor: !0, max: 255 }, percent: { max: 1 }, degrees: { mod: 360, floor: !0 } },
                    m = j.support = {},
                    n = a("<p>")[0],
                    o = a.each;
                n.style.cssText = "background-color:rgba(1,1,1,.5)", m.rgba = n.style.backgroundColor.indexOf("rgba") > -1, o(k, function(a, b) { b.cache = "_" + a, b.props.alpha = { idx: 3, type: "percent", def: 1 } }), j.fn = a.extend(j.prototype, { parse: function(e, g, h, i) { if (e === b) return this._rgba = [null, null, null, null], this;
                        (e.jquery || e.nodeType) && (e = a(e).css(g), g = b); var l = this,
                            m = a.type(e),
                            n = this._rgba = []; return g !== b && (e = [e, g, h, i], m = "array"), "string" === m ? this.parse(d(e) || f._default) : "array" === m ? (o(k.rgba.props, function(a, b) { n[b.idx] = c(e[b.idx], b) }), this) : "object" === m ? (e instanceof j ? o(k, function(a, b) { e[b.cache] && (l[b.cache] = e[b.cache].slice()) }) : o(k, function(b, d) { var f = d.cache;
                            o(d.props, function(a, b) { if (!l[f] && d.to) { if ("alpha" === a || null == e[a]) return;
                                    l[f] = d.to(l._rgba) } l[f][b.idx] = c(e[a], b, !0) }), l[f] && a.inArray(null, l[f].slice(0, 3)) < 0 && (l[f][3] = 1, d.from && (l._rgba = d.from(l[f]))) }), this) : void 0 }, is: function(a) { var b = j(a),
                            c = !0,
                            d = this; return o(k, function(a, e) { var f, g = b[e.cache]; return g && (f = d[e.cache] || e.to && e.to(d._rgba) || [], o(e.props, function(a, b) { if (null != g[b.idx]) return c = g[b.idx] === f[b.idx] })), c }), c }, _space: function() { var a = [],
                            b = this; return o(k, function(c, d) { b[d.cache] && a.push(c) }), a.pop() }, transition: function(a, b) { var d = j(a),
                            e = d._space(),
                            f = k[e],
                            g = 0 === this.alpha() ? j("transparent") : this,
                            h = g[f.cache] || f.to(g._rgba),
                            i = h.slice(); return d = d[f.cache], o(f.props, function(a, e) { var f = e.idx,
                                g = h[f],
                                j = d[f],
                                k = l[e.type] || {};
                            null !== j && (null === g ? i[f] = j : (k.mod && (j - g > k.mod / 2 ? g += k.mod : g - j > k.mod / 2 && (g -= k.mod)), i[f] = c((j - g) * b + g, e))) }), this[e](i) }, blend: function(b) { if (1 === this._rgba[3]) return this; var c = this._rgba.slice(),
                            d = c.pop(),
                            e = j(b)._rgba; return j(a.map(c, function(a, b) { return (1 - d) * e[b] + d * a })) }, toRgbaString: function() { var b = "rgba(",
                            c = a.map(this._rgba, function(a, b) { return null == a ? b > 2 ? 1 : 0 : a }); return 1 === c[3] && (c.pop(), b = "rgb("), b + c.join() + ")" }, toHslaString: function() { var b = "hsla(",
                            c = a.map(this.hsla(), function(a, b) { return null == a && (a = b > 2 ? 1 : 0), b && b < 3 && (a = Math.round(100 * a) + "%"), a }); return 1 === c[3] && (c.pop(), b = "hsl("), b + c.join() + ")" }, toHexString: function(b) { var c = this._rgba.slice(),
                            d = c.pop(); return b && c.push(~~(255 * d)), "#" + a.map(c, function(a) { return a = (a || 0).toString(16), 1 === a.length ? "0" + a : a }).join("") }, toString: function() { return 0 === this._rgba[3] ? "transparent" : this.toRgbaString() } }), j.fn.parse.prototype = j.fn, k.hsla.to = function(a) { if (null == a[0] || null == a[1] || null == a[2]) return [null, null, null, a[3]]; var b, c, d = a[0] / 255,
                        e = a[1] / 255,
                        f = a[2] / 255,
                        g = a[3],
                        h = Math.max(d, e, f),
                        i = Math.min(d, e, f),
                        j = h - i,
                        k = h + i,
                        l = .5 * k; return b = i === h ? 0 : d === h ? 60 * (e - f) / j + 360 : e === h ? 60 * (f - d) / j + 120 : 60 * (d - e) / j + 240, c = 0 === j ? 0 : l <= .5 ? j / k : j / (2 - k), [Math.round(b) % 360, c, l, null == g ? 1 : g] }, k.hsla.from = function(a) { if (null == a[0] || null == a[1] || null == a[2]) return [null, null, null, a[3]]; var b = a[0] / 360,
                        c = a[1],
                        d = a[2],
                        f = a[3],
                        g = d <= .5 ? d * (1 + c) : d + c - d * c,
                        h = 2 * d - g; return [Math.round(255 * e(h, g, b + 1 / 3)), Math.round(255 * e(h, g, b)), Math.round(255 * e(h, g, b - 1 / 3)), f] }, o(k, function(d, e) { var f = e.props,
                        g = e.cache,
                        i = e.to,
                        k = e.from;
                    j.fn[d] = function(d) { if (i && !this[g] && (this[g] = i(this._rgba)), d === b) return this[g].slice(); var e, h = a.type(d),
                            l = "array" === h || "object" === h ? d : arguments,
                            m = this[g].slice(); return o(f, function(a, b) { var d = l["object" === h ? a : b.idx];
                            null == d && (d = m[b.idx]), m[b.idx] = c(d, b) }), k ? (e = j(k(m)), e[g] = m, e) : j(m) }, o(f, function(b, c) { j.fn[b] || (j.fn[b] = function(e) { var f, g = a.type(e),
                                i = "alpha" === b ? this._hsla ? "hsla" : "rgba" : d,
                                j = this[i](),
                                k = j[c.idx]; return "undefined" === g ? k : ("function" === g && (e = e.call(this, k), g = a.type(e)), null == e && c.empty ? this : ("string" === g && (f = h.exec(e), f && (e = k + parseFloat(f[2]) * ("+" === f[1] ? 1 : -1))), j[c.idx] = e, this[i](j))) }) }) }), j.hook = function(b) { var c = b.split(" ");
                    o(c, function(b, c) { a.cssHooks[c] = { set: function(b, e) { var f, g, h = ""; if ("transparent" !== e && ("string" !== a.type(e) || (f = d(e)))) { if (e = j(f || e), !m.rgba && 1 !== e._rgba[3]) { for (g = "backgroundColor" === c ? b.parentNode : b;
                                            ("" === h || "transparent" === h) && g && g.style;) try { h = a.css(g, "backgroundColor"), g = g.parentNode } catch (i) {} e = e.blend(h && "transparent" !== h ? h : "_default") } e = e.toRgbaString() } try { b.style[c] = e } catch (i) {} } }, a.fx.step[c] = function(b) { b.colorInit || (b.start = j(b.elem, c), b.end = j(b.end), b.colorInit = !0), a.cssHooks[c].set(b.elem, b.start.transition(b.end, b.pos)) } }) }, j.hook(g), a.cssHooks.borderColor = { expand: function(a) { var b = {}; return o(["Top", "Right", "Bottom", "Left"], function(c, d) { b["border" + d + "Color"] = a }), b } }, f = a.Color.names = { aqua: "#00ffff", black: "#000000", blue: "#0000ff", fuchsia: "#ff00ff", gray: "#808080", green: "#008000", lime: "#00ff00", maroon: "#800000", navy: "#000080", olive: "#808000", purple: "#800080", red: "#ff0000", silver: "#c0c0c0", teal: "#008080", white: "#ffffff", yellow: "#ffff00", transparent: [null, null, null, 0], _default: "#ffffff" } }(n),
            function() {
                function b(b) { var c, d, e = b.ownerDocument.defaultView ? b.ownerDocument.defaultView.getComputedStyle(b, null) : b.currentStyle,
                        f = {}; if (e && e.length && e[0] && e[e[0]])
                        for (d = e.length; d--;) c = e[d], "string" == typeof e[c] && (f[a.camelCase(c)] = e[c]);
                    else
                        for (c in e) "string" == typeof e[c] && (f[c] = e[c]); return f }

                function c(b, c) { var d, f, g = {}; for (d in c) f = c[d], b[d] !== f && (e[d] || !a.fx.step[d] && isNaN(parseFloat(f)) || (g[d] = f)); return g } var d = ["add", "remove", "toggle"],
                    e = { border: 1, borderBottom: 1, borderColor: 1, borderLeft: 1, borderRight: 1, borderTop: 1, borderWidth: 1, margin: 1, padding: 1 };
                a.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function(b, c) { a.fx.step[c] = function(a) {
                        ("none" !== a.end && !a.setAttr || 1 === a.pos && !a.setAttr) && (n.style(a.elem, c, a.end), a.setAttr = !0) } }), a.fn.addBack || (a.fn.addBack = function(a) { return this.add(null == a ? this.prevObject : this.prevObject.filter(a)) }), a.effects.animateClass = function(e, f, g, h) { var i = a.speed(f, g, h); return this.queue(function() { var f, g = a(this),
                            h = g.attr("class") || "",
                            j = i.children ? g.find("*").addBack() : g;
                        j = j.map(function() { var c = a(this); return { el: c, start: b(this) } }), f = function() { a.each(d, function(a, b) { e[b] && g[b + "Class"](e[b]) }) }, f(), j = j.map(function() { return this.end = b(this.el[0]), this.diff = c(this.start, this.end), this }), g.attr("class", h), j = j.map(function() { var b = this,
                                c = a.Deferred(),
                                d = a.extend({}, i, { queue: !1, complete: function() { c.resolve(b) } }); return this.el.animate(this.diff, d), c.promise() }), a.when.apply(a, j.get()).done(function() { f(), a.each(arguments, function() { var b = this.el;
                                a.each(this.diff, function(a) { b.css(a, "") }) }), i.complete.call(g[0]) }) }) }, a.fn.extend({ addClass: function(b) { return function(c, d, e, f) { return d ? a.effects.animateClass.call(this, { add: c }, d, e, f) : b.apply(this, arguments) } }(a.fn.addClass), removeClass: function(b) { return function(c, d, e, f) { return arguments.length > 1 ? a.effects.animateClass.call(this, { remove: c }, d, e, f) : b.apply(this, arguments) } }(a.fn.removeClass), toggleClass: function(b) { return function(c, d, e, f, g) { return "boolean" == typeof d || void 0 === d ? e ? a.effects.animateClass.call(this, d ? { add: c } : { remove: c }, e, f, g) : b.apply(this, arguments) : a.effects.animateClass.call(this, { toggle: c }, d, e, f) } }(a.fn.toggleClass), switchClass: function(b, c, d, e, f) { return a.effects.animateClass.call(this, { add: c, remove: b }, d, e, f) } }) }(),
            function() {
                function b(b, c, d, e) { return a.isPlainObject(b) && (c = b, b = b.effect), b = { effect: b }, null == c && (c = {}), a.isFunction(c) && (e = c, d = null, c = {}), ("number" == typeof c || a.fx.speeds[c]) && (e = d, d = c, c = {}), a.isFunction(d) && (e = d, d = null), c && a.extend(b, c), d = d || c.duration, b.duration = a.fx.off ? 0 : "number" == typeof d ? d : d in a.fx.speeds ? a.fx.speeds[d] : a.fx.speeds._default, b.complete = e || c.complete, b }

                function c(b) { return !(b && "number" != typeof b && !a.fx.speeds[b]) || ("string" == typeof b && !a.effects.effect[b] || (!!a.isFunction(b) || "object" == typeof b && !b.effect)) }

                function d(a, b) { var c = b.outerWidth(),
                        d = b.outerHeight(),
                        e = /^rect\((-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto)\)$/,
                        f = e.exec(a) || ["", 0, c, d, 0]; return { top: parseFloat(f[1]) || 0, right: "auto" === f[2] ? c : parseFloat(f[2]), bottom: "auto" === f[3] ? d : parseFloat(f[3]), left: parseFloat(f[4]) || 0 } } a.expr && a.expr.filters && a.expr.filters.animated && (a.expr.filters.animated = function(b) { return function(c) { return !!a(c).data(m) || b(c) } }(a.expr.filters.animated)), a.uiBackCompat !== !1 && a.extend(a.effects, {
                    save: function(a, b) { for (var c = 0, d = b.length; c < d; c++) null !== b[c] && a.data(k + b[c], a[0].style[b[c]]) },
                    restore: function(a, b) { for (var c, d = 0, e = b.length; d < e; d++) null !== b[d] && (c = a.data(k + b[d]), a.css(b[d], c)) },
                    setMode: function(a, b) { return "toggle" === b && (b = a.is(":hidden") ? "show" : "hide"), b },
                    createWrapper: function(b) { if (b.parent().is(".ui-effects-wrapper")) return b.parent(); var c = { width: b.outerWidth(!0), height: b.outerHeight(!0), "float": b.css("float") },
                            d = a("<div></div>").addClass("ui-effects-wrapper").css({ fontSize: "100%", background: "transparent", border: "none", margin: 0, padding: 0 }),
                            e = { width: b.width(), height: b.height() },
                            f = document.activeElement; try { f.id } catch (g) { f = document.body } return b.wrap(d), (b[0] === f || a.contains(b[0], f)) && a(f).trigger("focus"), d = b.parent(), "static" === b.css("position") ? (d.css({ position: "relative" }), b.css({ position: "relative" })) : (a.extend(c, { position: b.css("position"), zIndex: b.css("z-index") }), a.each(["top", "left", "bottom", "right"], function(a, d) { c[d] = b.css(d), isNaN(parseInt(c[d], 10)) && (c[d] = "auto") }), b.css({ position: "relative", top: 0, left: 0, right: "auto", bottom: "auto" })), b.css(e), d.css(c).show() },
                    removeWrapper: function(b) { var c = document.activeElement; return b.parent().is(".ui-effects-wrapper") && (b.parent().replaceWith(b), (b[0] === c || a.contains(b[0], c)) && a(c).trigger("focus")), b }
                }), a.extend(a.effects, { version: "1.12.0", define: function(b, c, d) { return d || (d = c, c = "effect"), a.effects.effect[b] = d, a.effects.effect[b].mode = c, d }, scaledDimensions: function(a, b, c) { if (0 === b) return { height: 0, width: 0, outerHeight: 0, outerWidth: 0 }; var d = "horizontal" !== c ? (b || 100) / 100 : 1,
                            e = "vertical" !== c ? (b || 100) / 100 : 1; return { height: a.height() * e, width: a.width() * d, outerHeight: a.outerHeight() * e, outerWidth: a.outerWidth() * d } }, clipToBox: function(a) { return { width: a.clip.right - a.clip.left, height: a.clip.bottom - a.clip.top, left: a.clip.left, top: a.clip.top } }, unshift: function(a, b, c) { var d = a.queue();
                        b > 1 && d.splice.apply(d, [1, 0].concat(d.splice(b, c))), a.dequeue() }, saveStyle: function(a) { a.data(l, a[0].style.cssText) }, restoreStyle: function(a) { a[0].style.cssText = a.data(l) || "", a.removeData(l) }, mode: function(a, b) { var c = a.is(":hidden"); return "toggle" === b && (b = c ? "show" : "hide"), (c ? "hide" === b : "show" === b) && (b = "none"), b }, getBaseline: function(a, b) { var c, d; switch (a[0]) {
                            case "top":
                                c = 0; break;
                            case "middle":
                                c = .5; break;
                            case "bottom":
                                c = 1; break;
                            default:
                                c = a[0] / b.height } switch (a[1]) {
                            case "left":
                                d = 0; break;
                            case "center":
                                d = .5; break;
                            case "right":
                                d = 1; break;
                            default:
                                d = a[1] / b.width } return { x: d, y: c } }, createPlaceholder: function(b) { var c, d = b.css("position"),
                            e = b.position(); return b.css({ marginTop: b.css("marginTop"), marginBottom: b.css("marginBottom"), marginLeft: b.css("marginLeft"), marginRight: b.css("marginRight") }).outerWidth(b.outerWidth()).outerHeight(b.outerHeight()), /^(static|relative)/.test(d) && (d = "absolute", c = a("<" + b[0].nodeName + ">").insertAfter(b).css({ display: /^(inline|ruby)/.test(b.css("display")) ? "inline-block" : "block", visibility: "hidden", marginTop: b.css("marginTop"), marginBottom: b.css("marginBottom"), marginLeft: b.css("marginLeft"), marginRight: b.css("marginRight"), "float": b.css("float") }).outerWidth(b.outerWidth()).outerHeight(b.outerHeight()).addClass("ui-effects-placeholder"), b.data(k + "placeholder", c)), b.css({ position: d, left: e.left, top: e.top }), c }, removePlaceholder: function(a) { var b = k + "placeholder",
                            c = a.data(b);
                        c && (c.remove(), a.removeData(b)) }, cleanUp: function(b) { a.effects.restoreStyle(b), a.effects.removePlaceholder(b) }, setTransition: function(b, c, d, e) { return e = e || {}, a.each(c, function(a, c) { var f = b.cssUnit(c);
                            f[0] > 0 && (e[c] = f[0] * d + f[1]) }), e } }), a.fn.extend({ effect: function() {
                        function c(b) {
                            function c() { h.removeData(m), a.effects.cleanUp(h), "hide" === d.mode && h.hide(), g() }

                            function g() { a.isFunction(i) && i.call(h[0]), a.isFunction(b) && b() } var h = a(this);
                            d.mode = k.shift(), a.uiBackCompat === !1 || f ? "none" === d.mode ? (h[j](), g()) : e.call(h[0], d, c) : (h.is(":hidden") ? "hide" === j : "show" === j) ? (h[j](), g()) : e.call(h[0], d, g) } var d = b.apply(this, arguments),
                            e = a.effects.effect[d.effect],
                            f = e.mode,
                            g = d.queue,
                            h = g || "fx",
                            i = d.complete,
                            j = d.mode,
                            k = [],
                            l = function(b) { var c = a(this),
                                    d = a.effects.mode(c, j) || f;
                                c.data(m, !0), k.push(d), f && ("show" === d || d === f && "hide" === d) && c.show(), f && "none" === d || a.effects.saveStyle(c), a.isFunction(b) && b() }; return a.fx.off || !e ? j ? this[j](d.duration, i) : this.each(function() { i && i.call(this) }) : g === !1 ? this.each(l).each(c) : this.queue(h, l).queue(h, c) }, show: function(a) { return function(d) { if (c(d)) return a.apply(this, arguments); var e = b.apply(this, arguments); return e.mode = "show", this.effect.call(this, e) } }(a.fn.show), hide: function(a) { return function(d) { if (c(d)) return a.apply(this, arguments); var e = b.apply(this, arguments); return e.mode = "hide", this.effect.call(this, e) } }(a.fn.hide), toggle: function(a) { return function(d) { if (c(d) || "boolean" == typeof d) return a.apply(this, arguments); var e = b.apply(this, arguments); return e.mode = "toggle", this.effect.call(this, e) } }(a.fn.toggle), cssUnit: function(b) { var c = this.css(b),
                            d = []; return a.each(["em", "px", "%", "pt"], function(a, b) { c.indexOf(b) > 0 && (d = [parseFloat(c), b]) }), d }, cssClip: function(a) { return a ? this.css("clip", "rect(" + a.top + "px " + a.right + "px " + a.bottom + "px " + a.left + "px)") : d(this.css("clip"), this) }, transfer: function(b, c) { var d = a(this),
                            e = a(b.to),
                            f = "fixed" === e.css("position"),
                            g = a("body"),
                            h = f ? g.scrollTop() : 0,
                            i = f ? g.scrollLeft() : 0,
                            j = e.offset(),
                            k = { top: j.top - h, left: j.left - i, height: e.innerHeight(), width: e.innerWidth() },
                            l = d.offset(),
                            m = a("<div class='ui-effects-transfer'></div>").appendTo("body").addClass(b.className).css({ top: l.top - h, left: l.left - i, height: d.innerHeight(), width: d.innerWidth(), position: f ? "fixed" : "absolute" }).animate(k, b.duration, b.easing, function() { m.remove(), a.isFunction(c) && c() }) } }), a.fx.step.clip = function(b) { b.clipInit || (b.start = a(b.elem).cssClip(), "string" == typeof b.end && (b.end = d(b.end, b.elem)), b.clipInit = !0), a(b.elem).cssClip({ top: b.pos * (b.end.top - b.start.top) + b.start.top, right: b.pos * (b.end.right - b.start.right) + b.start.right, bottom: b.pos * (b.end.bottom - b.start.bottom) + b.start.bottom, left: b.pos * (b.end.left - b.start.left) + b.start.left }) }
            }(),
            function() { var b = {};
                a.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function(a, c) { b[c] = function(b) { return Math.pow(b, a + 2) } }), a.extend(b, { Sine: function(a) { return 1 - Math.cos(a * Math.PI / 2) }, Circ: function(a) { return 1 - Math.sqrt(1 - a * a) }, Elastic: function(a) { return 0 === a || 1 === a ? a : -Math.pow(2, 8 * (a - 1)) * Math.sin((80 * (a - 1) - 7.5) * Math.PI / 15) }, Back: function(a) { return a * a * (3 * a - 2) }, Bounce: function(a) { for (var b, c = 4; a < ((b = Math.pow(2, --c)) - 1) / 11;); return 1 / Math.pow(4, 3 - c) - 7.5625 * Math.pow((3 * b - 2) / 22 - a, 2) } }), a.each(b, function(b, c) { a.easing["easeIn" + b] = c, a.easing["easeOut" + b] = function(a) { return 1 - c(1 - a) }, a.easing["easeInOut" + b] = function(a) { return a < .5 ? c(2 * a) / 2 : 1 - c(a * -2 + 2) / 2 } }) }();
        var o, o = a.effects;
        a.effects.define("blind", "hide", function(b, c) { var d = { up: ["bottom", "top"], vertical: ["bottom", "top"], down: ["top", "bottom"], left: ["right", "left"], horizontal: ["right", "left"], right: ["left", "right"] },
                e = a(this),
                f = b.direction || "up",
                g = e.cssClip(),
                h = { clip: a.extend({}, g) },
                i = a.effects.createPlaceholder(e);
            h.clip[d[f][0]] = h.clip[d[f][1]], "show" === b.mode && (e.cssClip(h.clip), i && i.css(a.effects.clipToBox(h)), h.clip = g), i && i.animate(a.effects.clipToBox(h), b.duration, b.easing), e.animate(h, { queue: !1, duration: b.duration, easing: b.easing, complete: c }) }), a.effects.define("bounce", function(b, c) { var d, e, f, g = a(this),
                h = b.mode,
                i = "hide" === h,
                j = "show" === h,
                k = b.direction || "up",
                l = b.distance,
                m = b.times || 5,
                n = 2 * m + (j || i ? 1 : 0),
                o = b.duration / n,
                p = b.easing,
                q = "up" === k || "down" === k ? "top" : "left",
                r = "up" === k || "left" === k,
                s = 0,
                t = g.queue().length; for (a.effects.createPlaceholder(g), f = g.css(q), l || (l = g["top" === q ? "outerHeight" : "outerWidth"]() / 3), j && (e = { opacity: 1 }, e[q] = f, g.css("opacity", 0).css(q, r ? 2 * -l : 2 * l).animate(e, o, p)), i && (l /= Math.pow(2, m - 1)), e = {}, e[q] = f; s < m; s++) d = {}, d[q] = (r ? "-=" : "+=") + l, g.animate(d, o, p).animate(e, o, p), l = i ? 2 * l : l / 2;
            i && (d = { opacity: 0 }, d[q] = (r ? "-=" : "+=") + l, g.animate(d, o, p)), g.queue(c), a.effects.unshift(g, t, n + 1) }), a.effects.define("clip", "hide", function(b, c) { var d, e = {},
                f = a(this),
                g = b.direction || "vertical",
                h = "both" === g,
                i = h || "horizontal" === g,
                j = h || "vertical" === g;
            d = f.cssClip(), e.clip = { top: j ? (d.bottom - d.top) / 2 : d.top, right: i ? (d.right - d.left) / 2 : d.right, bottom: j ? (d.bottom - d.top) / 2 : d.bottom, left: i ? (d.right - d.left) / 2 : d.left }, a.effects.createPlaceholder(f), "show" === b.mode && (f.cssClip(e.clip), e.clip = d), f.animate(e, { queue: !1, duration: b.duration, easing: b.easing, complete: c }) }), a.effects.define("drop", "hide", function(b, c) { var d, e = a(this),
                f = b.mode,
                g = "show" === f,
                h = b.direction || "left",
                i = "up" === h || "down" === h ? "top" : "left",
                j = "up" === h || "left" === h ? "-=" : "+=",
                k = "+=" === j ? "-=" : "+=",
                l = { opacity: 0 };
            a.effects.createPlaceholder(e), d = b.distance || e["top" === i ? "outerHeight" : "outerWidth"](!0) / 2, l[i] = j + d, g && (e.css(l), l[i] = k + d, l.opacity = 1), e.animate(l, { queue: !1, duration: b.duration, easing: b.easing, complete: c }) }), a.effects.define("explode", "hide", function(b, c) {
            function d() { t.push(this), t.length === l * m && e() }

            function e() { n.css({ visibility: "visible" }), a(t).remove(), c() } var f, g, h, i, j, k, l = b.pieces ? Math.round(Math.sqrt(b.pieces)) : 3,
                m = l,
                n = a(this),
                o = b.mode,
                p = "show" === o,
                q = n.show().css("visibility", "hidden").offset(),
                r = Math.ceil(n.outerWidth() / m),
                s = Math.ceil(n.outerHeight() / l),
                t = []; for (f = 0; f < l; f++)
                for (i = q.top + f * s, k = f - (l - 1) / 2, g = 0; g < m; g++) h = q.left + g * r, j = g - (m - 1) / 2, n.clone().appendTo("body").wrap("<div></div>").css({ position: "absolute", visibility: "visible", left: -g * r, top: -f * s }).parent().addClass("ui-effects-explode").css({ position: "absolute", overflow: "hidden", width: r, height: s, left: h + (p ? j * r : 0), top: i + (p ? k * s : 0), opacity: p ? 0 : 1 }).animate({ left: h + (p ? 0 : j * r), top: i + (p ? 0 : k * s), opacity: p ? 1 : 0 }, b.duration || 500, b.easing, d) }), a.effects.define("fade", "toggle", function(b, c) { var d = "show" === b.mode;
            a(this).css("opacity", d ? 0 : 1).animate({ opacity: d ? 1 : 0 }, { queue: !1, duration: b.duration, easing: b.easing, complete: c }) }), a.effects.define("fold", "hide", function(b, c) { var d = a(this),
                e = b.mode,
                f = "show" === e,
                g = "hide" === e,
                h = b.size || 15,
                i = /([0-9]+)%/.exec(h),
                j = !!b.horizFirst,
                k = j ? ["right", "bottom"] : ["bottom", "right"],
                l = b.duration / 2,
                m = a.effects.createPlaceholder(d),
                n = d.cssClip(),
                o = { clip: a.extend({}, n) },
                p = { clip: a.extend({}, n) },
                q = [n[k[0]], n[k[1]]],
                r = d.queue().length;
            i && (h = parseInt(i[1], 10) / 100 * q[g ? 0 : 1]), o.clip[k[0]] = h, p.clip[k[0]] = h, p.clip[k[1]] = 0, f && (d.cssClip(p.clip), m && m.css(a.effects.clipToBox(p)), p.clip = n), d.queue(function(c) { m && m.animate(a.effects.clipToBox(o), l, b.easing).animate(a.effects.clipToBox(p), l, b.easing), c() }).animate(o, l, b.easing).animate(p, l, b.easing).queue(c), a.effects.unshift(d, r, 4) }), a.effects.define("highlight", "show", function(b, c) { var d = a(this),
                e = { backgroundColor: d.css("backgroundColor") }; "hide" === b.mode && (e.opacity = 0), a.effects.saveStyle(d), d.css({ backgroundImage: "none", backgroundColor: b.color || "#ffff99" }).animate(e, { queue: !1, duration: b.duration, easing: b.easing, complete: c }) }), a.effects.define("size", function(b, c) { var d, e, f, g = a(this),
                h = ["fontSize"],
                i = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"],
                j = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"],
                k = b.mode,
                l = "effect" !== k,
                m = b.scale || "both",
                n = b.origin || ["middle", "center"],
                o = g.css("position"),
                p = g.position(),
                q = a.effects.scaledDimensions(g),
                r = b.from || q,
                s = b.to || a.effects.scaledDimensions(g, 0);
            a.effects.createPlaceholder(g), "show" === k && (f = r, r = s, s = f), e = { from: { y: r.height / q.height, x: r.width / q.width }, to: { y: s.height / q.height, x: s.width / q.width } }, "box" !== m && "both" !== m || (e.from.y !== e.to.y && (r = a.effects.setTransition(g, i, e.from.y, r), s = a.effects.setTransition(g, i, e.to.y, s)), e.from.x !== e.to.x && (r = a.effects.setTransition(g, j, e.from.x, r), s = a.effects.setTransition(g, j, e.to.x, s))), "content" !== m && "both" !== m || e.from.y !== e.to.y && (r = a.effects.setTransition(g, h, e.from.y, r), s = a.effects.setTransition(g, h, e.to.y, s)), n && (d = a.effects.getBaseline(n, q), r.top = (q.outerHeight - r.outerHeight) * d.y + p.top, r.left = (q.outerWidth - r.outerWidth) * d.x + p.left, s.top = (q.outerHeight - s.outerHeight) * d.y + p.top, s.left = (q.outerWidth - s.outerWidth) * d.x + p.left), g.css(r), "content" !== m && "both" !== m || (i = i.concat(["marginTop", "marginBottom"]).concat(h), j = j.concat(["marginLeft", "marginRight"]), g.find("*[width]").each(function() { var c = a(this),
                    d = a.effects.scaledDimensions(c),
                    f = { height: d.height * e.from.y, width: d.width * e.from.x, outerHeight: d.outerHeight * e.from.y, outerWidth: d.outerWidth * e.from.x },
                    g = { height: d.height * e.to.y, width: d.width * e.to.x, outerHeight: d.height * e.to.y, outerWidth: d.width * e.to.x };
                e.from.y !== e.to.y && (f = a.effects.setTransition(c, i, e.from.y, f), g = a.effects.setTransition(c, i, e.to.y, g)), e.from.x !== e.to.x && (f = a.effects.setTransition(c, j, e.from.x, f), g = a.effects.setTransition(c, j, e.to.x, g)), l && a.effects.saveStyle(c), c.css(f), c.animate(g, b.duration, b.easing, function() { l && a.effects.restoreStyle(c) }) })), g.animate(s, { queue: !1, duration: b.duration, easing: b.easing, complete: function() { var b = g.offset();
                    0 === s.opacity && g.css("opacity", r.opacity), l || (g.css("position", "static" === o ? "relative" : o).offset(b), a.effects.saveStyle(g)), c() } }) }), a.effects.define("scale", function(b, c) { var d = a(this),
                e = b.mode,
                f = parseInt(b.percent, 10) || (0 === parseInt(b.percent, 10) ? 0 : "effect" !== e ? 0 : 100),
                g = a.extend(!0, { from: a.effects.scaledDimensions(d), to: a.effects.scaledDimensions(d, f, b.direction || "both"), origin: b.origin || ["middle", "center"] }, b);
            b.fade && (g.from.opacity = 1, g.to.opacity = 0), a.effects.effect.size.call(this, g, c) }), a.effects.define("puff", "hide", function(b, c) { var d = a.extend(!0, {}, b, { fade: !0, percent: parseInt(b.percent, 10) || 150 });
            a.effects.effect.scale.call(this, d, c) }), a.effects.define("pulsate", "show", function(b, c) { var d = a(this),
                e = b.mode,
                f = "show" === e,
                g = "hide" === e,
                h = f || g,
                i = 2 * (b.times || 5) + (h ? 1 : 0),
                j = b.duration / i,
                k = 0,
                l = 1,
                m = d.queue().length; for (!f && d.is(":visible") || (d.css("opacity", 0).show(), k = 1); l < i; l++) d.animate({ opacity: k }, j, b.easing), k = 1 - k;
            d.animate({ opacity: k }, j, b.easing), d.queue(c), a.effects.unshift(d, m, i + 1) }), a.effects.define("shake", function(b, c) { var d = 1,
                e = a(this),
                f = b.direction || "left",
                g = b.distance || 20,
                h = b.times || 3,
                i = 2 * h + 1,
                j = Math.round(b.duration / i),
                k = "up" === f || "down" === f ? "top" : "left",
                l = "up" === f || "left" === f,
                m = {},
                n = {},
                o = {},
                p = e.queue().length; for (a.effects.createPlaceholder(e), m[k] = (l ? "-=" : "+=") + g, n[k] = (l ? "+=" : "-=") + 2 * g, o[k] = (l ? "-=" : "+=") + 2 * g, e.animate(m, j, b.easing); d < h; d++) e.animate(n, j, b.easing).animate(o, j, b.easing);
            e.animate(n, j, b.easing).animate(m, j / 2, b.easing).queue(c), a.effects.unshift(e, p, i + 1) }), a.effects.define("slide", "show", function(b, c) { var d, e, f = a(this),
                g = { up: ["bottom", "top"], down: ["top", "bottom"], left: ["right", "left"], right: ["left", "right"] },
                h = b.mode,
                i = b.direction || "left",
                j = "up" === i || "down" === i ? "top" : "left",
                k = "up" === i || "left" === i,
                l = b.distance || f["top" === j ? "outerHeight" : "outerWidth"](!0),
                m = {};
            a.effects.createPlaceholder(f), d = f.cssClip(), e = f.position()[j], m[j] = (k ? -1 : 1) * l + e, m.clip = f.cssClip(), m.clip[g[i][1]] = m.clip[g[i][0]], "show" === h && (f.cssClip(m.clip), f.css(j, m[j]), m.clip = d, m[j] = e), f.animate(m, { queue: !1, duration: b.duration, easing: b.easing, complete: c }) });
        a.uiBackCompat !== !1 && (o = a.effects.define("transfer", function(b, c) { a(this).transfer(b, c) }));
        a.ui.focusable = function(c, d) { var e, f, g, h, i, j = c.nodeName.toLowerCase(); return "area" === j ? (e = c.parentNode, f = e.name, !(!c.href || !f || "map" !== e.nodeName.toLowerCase()) && (g = a("img[usemap='#" + f + "']"), g.length > 0 && g.is(":visible"))) : (/^(input|select|textarea|button|object)$/.test(j) ? (h = !c.disabled, h && (i = a(c).closest("fieldset")[0], i && (h = !i.disabled))) : h = "a" === j ? c.href || d : d, h && a(c).is(":visible") && b(a(c))) }, a.extend(a.expr[":"], { focusable: function(b) { return a.ui.focusable(b, null != a.attr(b, "tabindex")) } });
        a.ui.focusable, a.fn.form = function() { return "string" == typeof this[0].form ? this.closest("form") : a(this[0].form) }, a.ui.formResetMixin = { _formResetHandler: function() { var b = a(this);
                setTimeout(function() { var c = b.data("ui-form-reset-instances");
                    a.each(c, function() { this.refresh() }) }) }, _bindFormResetHandler: function() { if (this.form = this.element.form(), this.form.length) { var a = this.form.data("ui-form-reset-instances") || [];
                    a.length || this.form.on("reset.ui-form-reset", this._formResetHandler), a.push(this), this.form.data("ui-form-reset-instances", a) } }, _unbindFormResetHandler: function() { if (this.form.length) { var b = this.form.data("ui-form-reset-instances");
                    b.splice(a.inArray(this, b), 1), b.length ? this.form.data("ui-form-reset-instances", b) : this.form.removeData("ui-form-reset-instances").off("reset.ui-form-reset") } } };
        "1.7" === a.fn.jquery.substring(0, 3) && (a.each(["Width", "Height"], function(b, c) {
            function d(b, c, d, f) { return a.each(e, function() { c -= parseFloat(a.css(b, "padding" + this)) || 0, d && (c -= parseFloat(a.css(b, "border" + this + "Width")) || 0), f && (c -= parseFloat(a.css(b, "margin" + this)) || 0) }), c } var e = "Width" === c ? ["Left", "Right"] : ["Top", "Bottom"],
                f = c.toLowerCase(),
                g = { innerWidth: a.fn.innerWidth, innerHeight: a.fn.innerHeight, outerWidth: a.fn.outerWidth, outerHeight: a.fn.outerHeight };
            a.fn["inner" + c] = function(b) { return void 0 === b ? g["inner" + c].call(this) : this.each(function() { a(this).css(f, d(this, b) + "px") }) }, a.fn["outer" + c] = function(b, e) { return "number" != typeof b ? g["outer" + c].call(this, b) : this.each(function() { a(this).css(f, d(this, b, !0, e) + "px") }) } }), a.fn.addBack = function(a) { return this.add(null == a ? this.prevObject : this.prevObject.filter(a)) });
        a.ui.keyCode = { BACKSPACE: 8, COMMA: 188, DELETE: 46, DOWN: 40, END: 35, ENTER: 13, ESCAPE: 27, HOME: 36, LEFT: 37, PAGE_DOWN: 34, PAGE_UP: 33, PERIOD: 190, RIGHT: 39, SPACE: 32, TAB: 9, UP: 38 }, a.ui.escapeSelector = function() { var a = /([!"#$%&'()*+,.\/:;<=>?@[\]^`{|}~])/g; return function(b) { return b.replace(a, "\\$1") } }(), a.fn.labels = function() { var b, c, d, e, f; return this[0].labels && this[0].labels.length ? this.pushStack(this[0].labels) : (e = this.eq(0).parents("label"), d = this.attr("id"), d && (b = this.eq(0).parents().last(), f = b.add(b.length ? b.siblings() : this.siblings()), c = "label[for='" + a.ui.escapeSelector(d) + "']", e = e.add(f.find(c).addBack(c))), this.pushStack(e)) }, a.fn.scrollParent = function(b) { var c = this.css("position"),
                d = "absolute" === c,
                e = b ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
                f = this.parents().filter(function() { var b = a(this); return (!d || "static" !== b.css("position")) && e.test(b.css("overflow") + b.css("overflow-y") + b.css("overflow-x")) }).eq(0); return "fixed" !== c && f.length ? f : a(this[0].ownerDocument || document) }, a.extend(a.expr[":"], { tabbable: function(b) { var c = a.attr(b, "tabindex"),
                    d = null != c; return (!d || c >= 0) && a.ui.focusable(b, d) } }), a.fn.extend({ uniqueId: function() { var a = 0; return function() { return this.each(function() { this.id || (this.id = "ui-id-" + ++a) }) } }(), removeUniqueId: function() { return this.each(function() { /^ui-id-\d+$/.test(this.id) && a(this).removeAttr("id") }) } }), a.widget("ui.accordion", { version: "1.12.0", options: { active: 0, animate: {}, classes: { "ui-accordion-header": "ui-corner-top", "ui-accordion-header-collapsed": "ui-corner-all", "ui-accordion-content": "ui-corner-bottom" }, collapsible: !1, event: "click", header: "> li > :first-child, > :not(li):even", heightStyle: "auto", icons: { activeHeader: "ui-icon-triangle-1-s", header: "ui-icon-triangle-1-e" }, activate: null, beforeActivate: null }, hideProps: { borderTopWidth: "hide", borderBottomWidth: "hide", paddingTop: "hide", paddingBottom: "hide", height: "hide" }, showProps: { borderTopWidth: "show", borderBottomWidth: "show", paddingTop: "show", paddingBottom: "show", height: "show" }, _create: function() { var b = this.options;
                this.prevShow = this.prevHide = a(), this._addClass("ui-accordion", "ui-widget ui-helper-reset"), this.element.attr("role", "tablist"), b.collapsible || b.active !== !1 && null != b.active || (b.active = 0), this._processPanels(), b.active < 0 && (b.active += this.headers.length), this._refresh() }, _getCreateEventData: function() { return { header: this.active, panel: this.active.length ? this.active.next() : a() } }, _createIcons: function() { var b, c, d = this.options.icons;
                d && (b = a("<span>"), this._addClass(b, "ui-accordion-header-icon", "ui-icon " + d.header), b.prependTo(this.headers), c = this.active.children(".ui-accordion-header-icon"), this._removeClass(c, d.header)._addClass(c, null, d.activeHeader)._addClass(this.headers, "ui-accordion-icons")) }, _destroyIcons: function() { this._removeClass(this.headers, "ui-accordion-icons"), this.headers.children(".ui-accordion-header-icon").remove() }, _destroy: function() { var a;
                this.element.removeAttr("role"), this.headers.removeAttr("role aria-expanded aria-selected aria-controls tabIndex").removeUniqueId(), this._destroyIcons(), a = this.headers.next().css("display", "").removeAttr("role aria-hidden aria-labelledby").removeUniqueId(), "content" !== this.options.heightStyle && a.css("height", "") }, _setOption: function(a, b) { return "active" === a ? void this._activate(b) : ("event" === a && (this.options.event && this._off(this.headers, this.options.event), this._setupEvents(b)), this._super(a, b), "collapsible" !== a || b || this.options.active !== !1 || this._activate(0), void("icons" === a && (this._destroyIcons(), b && this._createIcons()))) }, _setOptionDisabled: function(a) { this._super(a), this.element.attr("aria-disabled", a), this._toggleClass(null, "ui-state-disabled", !!a), this._toggleClass(this.headers.add(this.headers.next()), null, "ui-state-disabled", !!a) }, _keydown: function(b) { if (!b.altKey && !b.ctrlKey) { var c = a.ui.keyCode,
                        d = this.headers.length,
                        e = this.headers.index(b.target),
                        f = !1; switch (b.keyCode) {
                        case c.RIGHT:
                        case c.DOWN:
                            f = this.headers[(e + 1) % d]; break;
                        case c.LEFT:
                        case c.UP:
                            f = this.headers[(e - 1 + d) % d]; break;
                        case c.SPACE:
                        case c.ENTER:
                            this._eventHandler(b); break;
                        case c.HOME:
                            f = this.headers[0]; break;
                        case c.END:
                            f = this.headers[d - 1] } f && (a(b.target).attr("tabIndex", -1), a(f).attr("tabIndex", 0), a(f).trigger("focus"), b.preventDefault()) } }, _panelKeyDown: function(b) { b.keyCode === a.ui.keyCode.UP && b.ctrlKey && a(b.currentTarget).prev().trigger("focus") }, refresh: function() { var b = this.options;
                this._processPanels(), b.active === !1 && b.collapsible === !0 || !this.headers.length ? (b.active = !1, this.active = a()) : b.active === !1 ? this._activate(0) : this.active.length && !a.contains(this.element[0], this.active[0]) ? this.headers.length === this.headers.find(".ui-state-disabled").length ? (b.active = !1, this.active = a()) : this._activate(Math.max(0, b.active - 1)) : b.active = this.headers.index(this.active), this._destroyIcons(), this._refresh() }, _processPanels: function() { var a = this.headers,
                    b = this.panels;
                this.headers = this.element.find(this.options.header), this._addClass(this.headers, "ui-accordion-header ui-accordion-header-collapsed", "ui-state-default"), this.panels = this.headers.next().filter(":not(.ui-accordion-content-active)").hide(), this._addClass(this.panels, "ui-accordion-content", "ui-helper-reset ui-widget-content"), b && (this._off(a.not(this.headers)), this._off(b.not(this.panels))) }, _refresh: function() { var b, c = this.options,
                    d = c.heightStyle,
                    e = this.element.parent();
                this.active = this._findActive(c.active), this._addClass(this.active, "ui-accordion-header-active", "ui-state-active")._removeClass(this.active, "ui-accordion-header-collapsed"), this._addClass(this.active.next(), "ui-accordion-content-active"), this.active.next().show(), this.headers.attr("role", "tab").each(function() { var b = a(this),
                        c = b.uniqueId().attr("id"),
                        d = b.next(),
                        e = d.uniqueId().attr("id");
                    b.attr("aria-controls", e), d.attr("aria-labelledby", c) }).next().attr("role", "tabpanel"), this.headers.not(this.active).attr({ "aria-selected": "false", "aria-expanded": "false", tabIndex: -1 }).next().attr({ "aria-hidden": "true" }).hide(), this.active.length ? this.active.attr({ "aria-selected": "true", "aria-expanded": "true", tabIndex: 0 }).next().attr({ "aria-hidden": "false" }) : this.headers.eq(0).attr("tabIndex", 0), this._createIcons(), this._setupEvents(c.event), "fill" === d ? (b = e.height(), this.element.siblings(":visible").each(function() { var c = a(this),
                        d = c.css("position"); "absolute" !== d && "fixed" !== d && (b -= c.outerHeight(!0)) }), this.headers.each(function() { b -= a(this).outerHeight(!0) }), this.headers.next().each(function() { a(this).height(Math.max(0, b - a(this).innerHeight() + a(this).height())) }).css("overflow", "auto")) : "auto" === d && (b = 0, this.headers.next().each(function() { var c = a(this).is(":visible");
                    c || a(this).show(), b = Math.max(b, a(this).css("height", "").height()), c || a(this).hide() }).height(b)) }, _activate: function(b) { var c = this._findActive(b)[0];
                c !== this.active[0] && (c = c || this.active[0], this._eventHandler({ target: c, currentTarget: c, preventDefault: a.noop })) }, _findActive: function(b) { return "number" == typeof b ? this.headers.eq(b) : a() }, _setupEvents: function(b) { var c = { keydown: "_keydown" };
                b && a.each(b.split(" "), function(a, b) { c[b] = "_eventHandler" }), this._off(this.headers.add(this.headers.next())), this._on(this.headers, c), this._on(this.headers.next(), { keydown: "_panelKeyDown" }), this._hoverable(this.headers), this._focusable(this.headers) }, _eventHandler: function(b) { var c, d, e = this.options,
                    f = this.active,
                    g = a(b.currentTarget),
                    h = g[0] === f[0],
                    i = h && e.collapsible,
                    j = i ? a() : g.next(),
                    k = f.next(),
                    l = { oldHeader: f, oldPanel: k, newHeader: i ? a() : g, newPanel: j };
                b.preventDefault(), h && !e.collapsible || this._trigger("beforeActivate", b, l) === !1 || (e.active = !i && this.headers.index(g), this.active = h ? a() : g, this._toggle(l), this._removeClass(f, "ui-accordion-header-active", "ui-state-active"), e.icons && (c = f.children(".ui-accordion-header-icon"), this._removeClass(c, null, e.icons.activeHeader)._addClass(c, null, e.icons.header)), h || (this._removeClass(g, "ui-accordion-header-collapsed")._addClass(g, "ui-accordion-header-active", "ui-state-active"), e.icons && (d = g.children(".ui-accordion-header-icon"), this._removeClass(d, null, e.icons.header)._addClass(d, null, e.icons.activeHeader)), this._addClass(g.next(), "ui-accordion-content-active"))) }, _toggle: function(b) { var c = b.newPanel,
                    d = this.prevShow.length ? this.prevShow : b.oldPanel;
                this.prevShow.add(this.prevHide).stop(!0, !0), this.prevShow = c, this.prevHide = d, this.options.animate ? this._animate(c, d, b) : (d.hide(), c.show(), this._toggleComplete(b)), d.attr({ "aria-hidden": "true" }), d.prev().attr({ "aria-selected": "false", "aria-expanded": "false" }), c.length && d.length ? d.prev().attr({ tabIndex: -1, "aria-expanded": "false" }) : c.length && this.headers.filter(function() { return 0 === parseInt(a(this).attr("tabIndex"), 10) }).attr("tabIndex", -1), c.attr("aria-hidden", "false").prev().attr({ "aria-selected": "true", "aria-expanded": "true", tabIndex: 0 }) }, _animate: function(a, b, c) { var d, e, f, g = this,
                    h = 0,
                    i = a.css("box-sizing"),
                    j = a.length && (!b.length || a.index() < b.index()),
                    k = this.options.animate || {},
                    l = j && k.down || k,
                    m = function() { g._toggleComplete(c) }; return "number" == typeof l && (f = l), "string" == typeof l && (e = l), e = e || l.easing || k.easing, f = f || l.duration || k.duration, b.length ? a.length ? (d = a.show().outerHeight(), b.animate(this.hideProps, { duration: f, easing: e, step: function(a, b) { b.now = Math.round(a) } }), void a.hide().animate(this.showProps, { duration: f, easing: e, complete: m, step: function(a, c) { c.now = Math.round(a), "height" !== c.prop ? "content-box" === i && (h += c.now) : "content" !== g.options.heightStyle && (c.now = Math.round(d - b.outerHeight() - h), h = 0) } })) : b.animate(this.hideProps, f, e, m) : a.animate(this.showProps, f, e, m) }, _toggleComplete: function(a) { var b = a.oldPanel,
                    c = b.prev();
                this._removeClass(b, "ui-accordion-content-active"), this._removeClass(c, "ui-accordion-header-active")._addClass(c, "ui-accordion-header-collapsed"), b.length && (b.parent()[0].className = b.parent()[0].className), this._trigger("activate", null, a) } }), a.ui.safeActiveElement = function(a) { var b; try { b = a.activeElement } catch (c) { b = a.body } return b || (b = a.body), b.nodeName || (b = a.body), b }, a.widget("ui.menu", {
            version: "1.12.0",
            defaultElement: "<ul>",
            delay: 300,
            options: { icons: { submenu: "ui-icon-caret-1-e" }, items: "> *", menus: "ul", position: { my: "left top", at: "right top" }, role: "menu", blur: null, focus: null, select: null },
            _create: function() { this.activeMenu = this.element, this.mouseHandled = !1, this.element.uniqueId().attr({ role: this.options.role, tabIndex: 0 }), this._addClass("ui-menu", "ui-widget ui-widget-content"), this._on({ "mousedown .ui-menu-item": function(a) { a.preventDefault() }, "click .ui-menu-item": function(b) { var c = a(b.target),
                            d = a(a.ui.safeActiveElement(this.document[0]));!this.mouseHandled && c.not(".ui-state-disabled").length && (this.select(b), b.isPropagationStopped() || (this.mouseHandled = !0), c.has(".ui-menu").length ? this.expand(b) : !this.element.is(":focus") && d.closest(".ui-menu").length && (this.element.trigger("focus", [!0]), this.active && 1 === this.active.parents(".ui-menu").length && clearTimeout(this.timer))) }, "mouseenter .ui-menu-item": function(b) { if (!this.previousFilter) { var c = a(b.target).closest(".ui-menu-item"),
                                d = a(b.currentTarget);
                            c[0] === d[0] && (this._removeClass(d.siblings().children(".ui-state-active"), null, "ui-state-active"), this.focus(b, d)) } }, mouseleave: "collapseAll", "mouseleave .ui-menu": "collapseAll", focus: function(a, b) { var c = this.active || this.element.find(this.options.items).eq(0);
                        b || this.focus(a, c) }, blur: function(b) { this._delay(function() { var c = !a.contains(this.element[0], a.ui.safeActiveElement(this.document[0]));
                            c && this.collapseAll(b) }) }, keydown: "_keydown" }), this.refresh(), this._on(this.document, { click: function(a) { this._closeOnDocumentClick(a) && this.collapseAll(a), this.mouseHandled = !1 } }) },
            _destroy: function() { var b = this.element.find(".ui-menu-item").removeAttr("role aria-disabled"),
                    c = b.children(".ui-menu-item-wrapper").removeUniqueId().removeAttr("tabIndex role aria-haspopup");
                this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeAttr("role aria-labelledby aria-expanded aria-hidden aria-disabled tabIndex").removeUniqueId().show(), c.children().each(function() { var b = a(this);
                    b.data("ui-menu-submenu-caret") && b.remove() }) },
            _keydown: function(b) { var c, d, e, f, g = !0; switch (b.keyCode) {
                    case a.ui.keyCode.PAGE_UP:
                        this.previousPage(b); break;
                    case a.ui.keyCode.PAGE_DOWN:
                        this.nextPage(b); break;
                    case a.ui.keyCode.HOME:
                        this._move("first", "first", b); break;
                    case a.ui.keyCode.END:
                        this._move("last", "last", b); break;
                    case a.ui.keyCode.UP:
                        this.previous(b); break;
                    case a.ui.keyCode.DOWN:
                        this.next(b); break;
                    case a.ui.keyCode.LEFT:
                        this.collapse(b); break;
                    case a.ui.keyCode.RIGHT:
                        this.active && !this.active.is(".ui-state-disabled") && this.expand(b); break;
                    case a.ui.keyCode.ENTER:
                    case a.ui.keyCode.SPACE:
                        this._activate(b); break;
                    case a.ui.keyCode.ESCAPE:
                        this.collapse(b); break;
                    default:
                        g = !1, d = this.previousFilter || "", e = String.fromCharCode(b.keyCode), f = !1, clearTimeout(this.filterTimer), e === d ? f = !0 : e = d + e, c = this._filterMenuItems(e), c = f && c.index(this.active.next()) !== -1 ? this.active.nextAll(".ui-menu-item") : c, c.length || (e = String.fromCharCode(b.keyCode), c = this._filterMenuItems(e)), c.length ? (this.focus(b, c), this.previousFilter = e, this.filterTimer = this._delay(function() { delete this.previousFilter }, 1e3)) : delete this.previousFilter } g && b.preventDefault() },
            _activate: function(a) { this.active && !this.active.is(".ui-state-disabled") && (this.active.children("[aria-haspopup='true']").length ? this.expand(a) : this.select(a)) },
            refresh: function() { var b, c, d, e, f, g = this,
                    h = this.options.icons.submenu,
                    i = this.element.find(this.options.menus);
                this._toggleClass("ui-menu-icons", null, !!this.element.find(".ui-icon").length), d = i.filter(":not(.ui-menu)").hide().attr({ role: this.options.role, "aria-hidden": "true", "aria-expanded": "false" }).each(function() { var b = a(this),
                        c = b.prev(),
                        d = a("<span>").data("ui-menu-submenu-caret", !0);
                    g._addClass(d, "ui-menu-icon", "ui-icon " + h), c.attr("aria-haspopup", "true").prepend(d), b.attr("aria-labelledby", c.attr("id")) }), this._addClass(d, "ui-menu", "ui-widget ui-widget-content ui-front"), b = i.add(this.element), c = b.find(this.options.items), c.not(".ui-menu-item").each(function() { var b = a(this);
                    g._isDivider(b) && g._addClass(b, "ui-menu-divider", "ui-widget-content") }), e = c.not(".ui-menu-item, .ui-menu-divider"), f = e.children().not(".ui-menu").uniqueId().attr({ tabIndex: -1, role: this._itemRole() }), this._addClass(e, "ui-menu-item")._addClass(f, "ui-menu-item-wrapper"), c.filter(".ui-state-disabled").attr("aria-disabled", "true"), this.active && !a.contains(this.element[0], this.active[0]) && this.blur() },
            _itemRole: function() { return { menu: "menuitem", listbox: "option" }[this.options.role] },
            _setOption: function(a, b) { if ("icons" === a) { var c = this.element.find(".ui-menu-icon");
                    this._removeClass(c, null, this.options.icons.submenu)._addClass(c, null, b.submenu) } this._super(a, b) },
            _setOptionDisabled: function(a) { this._super(a), this.element.attr("aria-disabled", String(a)), this._toggleClass(null, "ui-state-disabled", !!a) },
            focus: function(a, b) {
                var c, d, e;
                this.blur(a, a && "focus" === a.type), this._scrollIntoView(b), this.active = b.first(), d = this.active.children(".ui-menu-item-wrapper"), this._addClass(d, null, "ui-state-active"), this.options.role && this.element.attr("aria-activedescendant", d.attr("id")), e = this.active.parent().closest(".ui-menu-item").children(".ui-menu-item-wrapper"), this._addClass(e, null, "ui-state-active"),
                    a && "keydown" === a.type ? this._close() : this.timer = this._delay(function() { this._close() }, this.delay), c = b.children(".ui-menu"), c.length && a && /^mouse/.test(a.type) && this._startOpening(c), this.activeMenu = b.parent(), this._trigger("focus", a, { item: b })
            },
            _scrollIntoView: function(b) { var c, d, e, f, g, h;
                this._hasScroll() && (c = parseFloat(a.css(this.activeMenu[0], "borderTopWidth")) || 0, d = parseFloat(a.css(this.activeMenu[0], "paddingTop")) || 0, e = b.offset().top - this.activeMenu.offset().top - c - d, f = this.activeMenu.scrollTop(), g = this.activeMenu.height(), h = b.outerHeight(), e < 0 ? this.activeMenu.scrollTop(f + e) : e + h > g && this.activeMenu.scrollTop(f + e - g + h)) },
            blur: function(a, b) { b || clearTimeout(this.timer), this.active && (this._removeClass(this.active.children(".ui-menu-item-wrapper"), null, "ui-state-active"), this._trigger("blur", a, { item: this.active }), this.active = null) },
            _startOpening: function(a) { clearTimeout(this.timer), "true" === a.attr("aria-hidden") && (this.timer = this._delay(function() { this._close(), this._open(a) }, this.delay)) },
            _open: function(b) { var c = a.extend({ of: this.active }, this.options.position);
                clearTimeout(this.timer), this.element.find(".ui-menu").not(b.parents(".ui-menu")).hide().attr("aria-hidden", "true"), b.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(c) },
            collapseAll: function(b, c) { clearTimeout(this.timer), this.timer = this._delay(function() { var d = c ? this.element : a(b && b.target).closest(this.element.find(".ui-menu"));
                    d.length || (d = this.element), this._close(d), this.blur(b), this._removeClass(d.find(".ui-state-active"), null, "ui-state-active"), this.activeMenu = d }, this.delay) },
            _close: function(a) { a || (a = this.active ? this.active.parent() : this.element), a.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false") },
            _closeOnDocumentClick: function(b) { return !a(b.target).closest(".ui-menu").length },
            _isDivider: function(a) { return !/[^\-\u2014\u2013\s]/.test(a.text()) },
            collapse: function(a) { var b = this.active && this.active.parent().closest(".ui-menu-item", this.element);
                b && b.length && (this._close(), this.focus(a, b)) },
            expand: function(a) { var b = this.active && this.active.children(".ui-menu ").find(this.options.items).first();
                b && b.length && (this._open(b.parent()), this._delay(function() { this.focus(a, b) })) },
            next: function(a) { this._move("next", "first", a) },
            previous: function(a) { this._move("prev", "last", a) },
            isFirstItem: function() { return this.active && !this.active.prevAll(".ui-menu-item").length },
            isLastItem: function() { return this.active && !this.active.nextAll(".ui-menu-item").length },
            _move: function(a, b, c) { var d;
                this.active && (d = "first" === a || "last" === a ? this.active["first" === a ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1) : this.active[a + "All"](".ui-menu-item").eq(0)), d && d.length && this.active || (d = this.activeMenu.find(this.options.items)[b]()), this.focus(c, d) },
            nextPage: function(b) { var c, d, e; return this.active ? void(this.isLastItem() || (this._hasScroll() ? (d = this.active.offset().top, e = this.element.height(), this.active.nextAll(".ui-menu-item").each(function() { return c = a(this), c.offset().top - d - e < 0 }), this.focus(b, c)) : this.focus(b, this.activeMenu.find(this.options.items)[this.active ? "last" : "first"]()))) : void this.next(b) },
            previousPage: function(b) { var c, d, e; return this.active ? void(this.isFirstItem() || (this._hasScroll() ? (d = this.active.offset().top, e = this.element.height(), this.active.prevAll(".ui-menu-item").each(function() { return c = a(this), c.offset().top - d + e > 0 }), this.focus(b, c)) : this.focus(b, this.activeMenu.find(this.options.items).first()))) : void this.next(b) },
            _hasScroll: function() { return this.element.outerHeight() < this.element.prop("scrollHeight") },
            select: function(b) { this.active = this.active || a(b.target).closest(".ui-menu-item"); var c = { item: this.active };
                this.active.has(".ui-menu").length || this.collapseAll(b, !0), this._trigger("select", b, c) },
            _filterMenuItems: function(b) { var c = b.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&"),
                    d = new RegExp("^" + c, "i"); return this.activeMenu.find(this.options.items).filter(".ui-menu-item").filter(function() { return d.test(a.trim(a(this).children(".ui-menu-item-wrapper").text())) }) }
        });
        a.widget("ui.autocomplete", { version: "1.12.0", defaultElement: "<input>", options: { appendTo: null, autoFocus: !1, delay: 300, minLength: 1, position: { my: "left top", at: "left bottom", collision: "none" }, source: null, change: null, close: null, focus: null, open: null, response: null, search: null, select: null }, requestIndex: 0, pending: 0, _create: function() { var b, c, d, e = this.element[0].nodeName.toLowerCase(),
                    f = "textarea" === e,
                    g = "input" === e;
                this.isMultiLine = f || !g && this._isContentEditable(this.element), this.valueMethod = this.element[f || g ? "val" : "text"], this.isNewMenu = !0, this._addClass("ui-autocomplete-input"), this.element.attr("autocomplete", "off"), this._on(this.element, { keydown: function(e) { if (this.element.prop("readOnly")) return b = !0, d = !0, void(c = !0);
                        b = !1, d = !1, c = !1; var f = a.ui.keyCode; switch (e.keyCode) {
                            case f.PAGE_UP:
                                b = !0, this._move("previousPage", e); break;
                            case f.PAGE_DOWN:
                                b = !0, this._move("nextPage", e); break;
                            case f.UP:
                                b = !0, this._keyEvent("previous", e); break;
                            case f.DOWN:
                                b = !0, this._keyEvent("next", e); break;
                            case f.ENTER:
                                this.menu.active && (b = !0, e.preventDefault(), this.menu.select(e)); break;
                            case f.TAB:
                                this.menu.active && this.menu.select(e); break;
                            case f.ESCAPE:
                                this.menu.element.is(":visible") && (this.isMultiLine || this._value(this.term), this.close(e), e.preventDefault()); break;
                            default:
                                c = !0, this._searchTimeout(e) } }, keypress: function(d) { if (b) return b = !1, void(this.isMultiLine && !this.menu.element.is(":visible") || d.preventDefault()); if (!c) { var e = a.ui.keyCode; switch (d.keyCode) {
                                case e.PAGE_UP:
                                    this._move("previousPage", d); break;
                                case e.PAGE_DOWN:
                                    this._move("nextPage", d); break;
                                case e.UP:
                                    this._keyEvent("previous", d); break;
                                case e.DOWN:
                                    this._keyEvent("next", d) } } }, input: function(a) { return d ? (d = !1, void a.preventDefault()) : void this._searchTimeout(a) }, focus: function() { this.selectedItem = null, this.previous = this._value() }, blur: function(a) { return this.cancelBlur ? void delete this.cancelBlur : (clearTimeout(this.searching), this.close(a), void this._change(a)) } }), this._initSource(), this.menu = a("<ul>").appendTo(this._appendTo()).menu({ role: null }).hide().menu("instance"), this._addClass(this.menu.element, "ui-autocomplete", "ui-front"), this._on(this.menu.element, { mousedown: function(b) { b.preventDefault(), this.cancelBlur = !0, this._delay(function() { delete this.cancelBlur, this.element[0] !== a.ui.safeActiveElement(this.document[0]) && this.element.trigger("focus") }) }, menufocus: function(b, c) { var d, e; return this.isNewMenu && (this.isNewMenu = !1, b.originalEvent && /^mouse/.test(b.originalEvent.type)) ? (this.menu.blur(), void this.document.one("mousemove", function() { a(b.target).trigger(b.originalEvent) })) : (e = c.item.data("ui-autocomplete-item"), !1 !== this._trigger("focus", b, { item: e }) && b.originalEvent && /^key/.test(b.originalEvent.type) && this._value(e.value), d = c.item.attr("aria-label") || e.value, void(d && a.trim(d).length && (this.liveRegion.children().hide(), a("<div>").text(d).appendTo(this.liveRegion)))) }, menuselect: function(b, c) { var d = c.item.data("ui-autocomplete-item"),
                            e = this.previous;
                        this.element[0] !== a.ui.safeActiveElement(this.document[0]) && (this.element.trigger("focus"), this.previous = e, this._delay(function() { this.previous = e, this.selectedItem = d })), !1 !== this._trigger("select", b, { item: d }) && this._value(d.value), this.term = this._value(), this.close(b), this.selectedItem = d } }), this.liveRegion = a("<div>", { role: "status", "aria-live": "assertive", "aria-relevant": "additions" }).appendTo(this.document[0].body), this._addClass(this.liveRegion, null, "ui-helper-hidden-accessible"), this._on(this.window, { beforeunload: function() { this.element.removeAttr("autocomplete") } }) }, _destroy: function() { clearTimeout(this.searching), this.element.removeAttr("autocomplete"), this.menu.element.remove(), this.liveRegion.remove() }, _setOption: function(a, b) { this._super(a, b), "source" === a && this._initSource(), "appendTo" === a && this.menu.element.appendTo(this._appendTo()), "disabled" === a && b && this.xhr && this.xhr.abort() }, _isEventTargetInWidget: function(b) { var c = this.menu.element[0]; return b.target === this.element[0] || b.target === c || a.contains(c, b.target) }, _closeOnClickOutside: function(a) { this._isEventTargetInWidget(a) || this.close() }, _appendTo: function() { var b = this.options.appendTo; return b && (b = b.jquery || b.nodeType ? a(b) : this.document.find(b).eq(0)), b && b[0] || (b = this.element.closest(".ui-front, dialog")), b.length || (b = this.document[0].body), b }, _initSource: function() { var b, c, d = this;
                a.isArray(this.options.source) ? (b = this.options.source, this.source = function(c, d) { d(a.ui.autocomplete.filter(b, c.term)) }) : "string" == typeof this.options.source ? (c = this.options.source, this.source = function(b, e) { d.xhr && d.xhr.abort(), d.xhr = a.ajax({ url: c, data: b, dataType: "json", success: function(a) { e(a) }, error: function() { e([]) } }) }) : this.source = this.options.source }, _searchTimeout: function(a) { clearTimeout(this.searching), this.searching = this._delay(function() { var b = this.term === this._value(),
                        c = this.menu.element.is(":visible"),
                        d = a.altKey || a.ctrlKey || a.metaKey || a.shiftKey;
                    b && (!b || c || d) || (this.selectedItem = null, this.search(null, a)) }, this.options.delay) }, search: function(a, b) { return a = null != a ? a : this._value(), this.term = this._value(), a.length < this.options.minLength ? this.close(b) : this._trigger("search", b) !== !1 ? this._search(a) : void 0 }, _search: function(a) { this.pending++, this._addClass("ui-autocomplete-loading"), this.cancelSearch = !1, this.source({ term: a }, this._response()) }, _response: function() { var b = ++this.requestIndex; return a.proxy(function(a) { b === this.requestIndex && this.__response(a), this.pending--, this.pending || this._removeClass("ui-autocomplete-loading") }, this) }, __response: function(a) { a && (a = this._normalize(a)), this._trigger("response", null, { content: a }), !this.options.disabled && a && a.length && !this.cancelSearch ? (this._suggest(a), this._trigger("open")) : this._close() }, close: function(a) { this.cancelSearch = !0, this._close(a) }, _close: function(a) { this._off(this.document, "mousedown"), this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.blur(), this.isNewMenu = !0, this._trigger("close", a)) }, _change: function(a) { this.previous !== this._value() && this._trigger("change", a, { item: this.selectedItem }) }, _normalize: function(b) { return b.length && b[0].label && b[0].value ? b : a.map(b, function(b) { return "string" == typeof b ? { label: b, value: b } : a.extend({}, b, { label: b.label || b.value, value: b.value || b.label }) }) }, _suggest: function(b) { var c = this.menu.element.empty();
                this._renderMenu(c, b), this.isNewMenu = !0, this.menu.refresh(), c.show(), this._resizeMenu(), c.position(a.extend({ of: this.element }, this.options.position)), this.options.autoFocus && this.menu.next(), this._on(this.document, { mousedown: "_closeOnClickOutside" }) }, _resizeMenu: function() { var a = this.menu.element;
                a.outerWidth(Math.max(a.width("").outerWidth() + 1, this.element.outerWidth())) }, _renderMenu: function(b, c) { var d = this;
                a.each(c, function(a, c) { d._renderItemData(b, c) }) }, _renderItemData: function(a, b) { return this._renderItem(a, b).data("ui-autocomplete-item", b) }, _renderItem: function(b, c) { return a("<li>").append(a("<div>").text(c.label)).appendTo(b) }, _move: function(a, b) { return this.menu.element.is(":visible") ? this.menu.isFirstItem() && /^previous/.test(a) || this.menu.isLastItem() && /^next/.test(a) ? (this.isMultiLine || this._value(this.term), void this.menu.blur()) : void this.menu[a](b) : void this.search(null, b) }, widget: function() { return this.menu.element }, _value: function() { return this.valueMethod.apply(this.element, arguments) }, _keyEvent: function(a, b) { this.isMultiLine && !this.menu.element.is(":visible") || (this._move(a, b), b.preventDefault()) }, _isContentEditable: function(a) { if (!a.length) return !1; var b = a.prop("contentEditable"); return "inherit" === b ? this._isContentEditable(a.parent()) : "true" === b } }), a.extend(a.ui.autocomplete, { escapeRegex: function(a) { return a.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&") }, filter: function(b, c) { var d = new RegExp(a.ui.autocomplete.escapeRegex(c), "i"); return a.grep(b, function(a) { return d.test(a.label || a.value || a) }) } }), a.widget("ui.autocomplete", a.ui.autocomplete, { options: { messages: { noResults: "No search results.", results: function(a) { return a + (a > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate." } } }, __response: function(b) { var c;
                this._superApply(arguments), this.options.disabled || this.cancelSearch || (c = b && b.length ? this.options.messages.results(b.length) : this.options.messages.noResults, this.liveRegion.children().hide(), a("<div>").text(c).appendTo(this.liveRegion)) } });
        var p = (a.ui.autocomplete, /ui-corner-([a-z]){2,6}/g);
        a.widget("ui.controlgroup", { version: "1.12.0", defaultElement: "<div>", options: { direction: "horizontal", disabled: null, onlyVisible: !0, items: { button: "input[type=button], input[type=submit], input[type=reset], button, a", controlgroupLabel: ".ui-controlgroup-label", checkboxradio: "input[type='checkbox'], input[type='radio']", selectmenu: "select", spinner: ".ui-spinner-input" } }, _create: function() { this._enhance() }, _enhance: function() { this.element.attr("role", "toolbar"), this.refresh() }, _destroy: function() { this._callChildMethod("destroy"), this.childWidgets.removeData("ui-controlgroup-data"), this.element.removeAttr("role"), this.options.items.controlgroupLabel && this.element.find(this.options.items.controlgroupLabel).find(".ui-controlgroup-label-contents").contents().unwrap() }, _initWidgets: function() { var b = this,
                    c = [];
                a.each(this.options.items, function(d, e) { var f, g = {}; if (e) return "controlgroupLabel" === d ? (f = b.element.find(e), f.each(function() { var b = a(this);
                        b.children(".ui-controlgroup-label-contents").length || b.contents().wrapAll("<span class='ui-controlgroup-label-contents'></span>") }), b._addClass(f, null, "ui-widget ui-widget-content ui-state-default"), void(c = c.concat(f.get()))) : void(a.fn[d] && (b["_" + d + "Options"] && (g = b["_" + d + "Options"]("middle")), b.element.find(e).each(function() { var e = a(this),
                            f = e[d]("instance"),
                            h = a.widget.extend({}, g); if ("button" !== d || !e.parent(".ui-spinner").length) { f || (f = e[d]()[d]("instance")), f && (h.classes = b._resolveClassesValues(h.classes, f)), e[d](h); var i = e[d]("widget");
                            a.data(i[0], "ui-controlgroup-data", f ? f : e[d]("instance")), c.push(i[0]) } }))) }), this.childWidgets = a(a.unique(c)), this._addClass(this.childWidgets, "ui-controlgroup-item") }, _callChildMethod: function(b) { this.childWidgets.each(function() { var c = a(this),
                        d = c.data("ui-controlgroup-data");
                    d && d[b] && d[b]() }) }, _updateCornerClass: function(a, b) { var c = "ui-corner-top ui-corner-bottom ui-corner-left ui-corner-right ui-corner-all",
                    d = this._buildSimpleOptions(b, "label").classes.label;
                this._removeClass(a, null, c), this._addClass(a, null, d) }, _buildSimpleOptions: function(a, b) { var c = "vertical" === this.options.direction,
                    d = { classes: {} }; return d.classes[b] = { middle: "", first: "ui-corner-" + (c ? "top" : "left"), last: "ui-corner-" + (c ? "bottom" : "right"), only: "ui-corner-all" }[a], d }, _spinnerOptions: function(a) { var b = this._buildSimpleOptions(a, "ui-spinner"); return b.classes["ui-spinner-up"] = "", b.classes["ui-spinner-down"] = "", b }, _buttonOptions: function(a) { return this._buildSimpleOptions(a, "ui-button") }, _checkboxradioOptions: function(a) { return this._buildSimpleOptions(a, "ui-checkboxradio-label") }, _selectmenuOptions: function(a) { var b = "vertical" === this.options.direction; return { width: !!b && "auto", classes: { middle: { "ui-selectmenu-button-open": "", "ui-selectmenu-button-closed": "" }, first: { "ui-selectmenu-button-open": "ui-corner-" + (b ? "top" : "tl"), "ui-selectmenu-button-closed": "ui-corner-" + (b ? "top" : "left") }, last: { "ui-selectmenu-button-open": b ? "" : "ui-corner-tr", "ui-selectmenu-button-closed": "ui-corner-" + (b ? "bottom" : "right") }, only: { "ui-selectmenu-button-open": "ui-corner-top", "ui-selectmenu-button-closed": "ui-corner-all" } }[a] } }, _resolveClassesValues: function(b, c) { var d = {}; return a.each(b, function(a) { var e = c.options.classes[a] || "";
                    e = e.replace(p, "").trim(), d[a] = (e + " " + b[a]).replace(/\s+/g, " ") }), d }, _setOption: function(a, b) { return "direction" === a && this._removeClass("ui-controlgroup-" + this.options.direction), this._super(a, b), "disabled" === a ? void this._callChildMethod(b ? "disable" : "enable") : void this.refresh() }, refresh: function() { var b, c = this;
                this._addClass("ui-controlgroup ui-controlgroup-" + this.options.direction), "horizontal" === this.options.direction && this._addClass(null, "ui-helper-clearfix"), this._initWidgets(), b = this.childWidgets, this.options.onlyVisible && (b = b.filter(":visible")), b.length && (a.each(["first", "last"], function(a, d) { var e = b[d]().data("ui-controlgroup-data"); if (e && c["_" + e.widgetName + "Options"]) { var f = c["_" + e.widgetName + "Options"](1 === b.length ? "only" : d);
                        f.classes = c._resolveClassesValues(f.classes, e), e.element[e.widgetName](f) } else c._updateCornerClass(b[d](), d) }), this._callChildMethod("refresh")) } });
        a.widget("ui.checkboxradio", [a.ui.formResetMixin, { version: "1.12.0", options: { disabled: null, label: null, icon: !0, classes: { "ui-checkboxradio-label": "ui-corner-all", "ui-checkboxradio-icon": "ui-corner-all" } }, _getCreateOptions: function() { var b, c, d = this,
                    e = this._super() || {}; return this._readType(), c = this.element.labels(), this.label = a(c[c.length - 1]), this.label.length || a.error("No label found for checkboxradio widget"), this.originalLabel = "", this.label.contents().not(this.element).each(function() { d.originalLabel += 3 === this.nodeType ? a(this).text() : this.outerHTML }), this.originalLabel && (e.label = this.originalLabel), b = this.element[0].disabled, null != b && (e.disabled = b), e }, _create: function() { var a = this.element[0].checked;
                this._bindFormResetHandler(), null == this.options.disabled && (this.options.disabled = this.element[0].disabled), this._setOption("disabled", this.options.disabled), this._addClass("ui-checkboxradio", "ui-helper-hidden-accessible"), this._addClass(this.label, "ui-checkboxradio-label", "ui-button ui-widget"), "radio" === this.type && this._addClass(this.label, "ui-checkboxradio-radio-label"), this.options.label && this.options.label !== this.originalLabel ? this._updateLabel() : this.originalLabel && (this.options.label = this.originalLabel), this._enhance(), a && (this._addClass(this.label, "ui-checkboxradio-checked", "ui-state-active"), this.icon && this._addClass(this.icon, null, "ui-state-hover")), this._on({ change: "_toggleClasses", focus: function() { this._addClass(this.label, null, "ui-state-focus ui-visual-focus") }, blur: function() { this._removeClass(this.label, null, "ui-state-focus ui-visual-focus") } }) }, _readType: function() { var b = this.element[0].nodeName.toLowerCase();
                this.type = this.element[0].type, "input" === b && /radio|checkbox/.test(this.type) || a.error("Can't create checkboxradio on element.nodeName=" + b + " and element.type=" + this.type) }, _enhance: function() { this._updateIcon(this.element[0].checked) }, widget: function() { return this.label }, _getRadioGroup: function() { var b, c = this.element[0].name,
                    d = "input[name='" + a.ui.escapeSelector(c) + "']"; return c ? (b = this.form.length ? a(this.form[0].elements).filter(d) : a(d).filter(function() { return 0 === a(this).form().length }), b.not(this.element)) : a([]) }, _toggleClasses: function() { var b = this.element[0].checked;
                this._toggleClass(this.label, "ui-checkboxradio-checked", "ui-state-active", b), this.options.icon && "checkbox" === this.type && this._toggleClass(this.icon, null, "ui-icon-check ui-state-checked", b)._toggleClass(this.icon, null, "ui-icon-blank", !b), "radio" === this.type && this._getRadioGroup().each(function() { var b = a(this).checkboxradio("instance");
                    b && b._removeClass(b.label, "ui-checkboxradio-checked", "ui-state-active") }) }, _destroy: function() { this._unbindFormResetHandler(), this.icon && (this.icon.remove(), this.iconSpace.remove()) }, _setOption: function(a, b) { if ("label" !== a || b) return this._super(a, b), "disabled" === a ? (this._toggleClass(this.label, null, "ui-state-disabled", b), void(this.element[0].disabled = b)) : void this.refresh() }, _updateIcon: function(b) { var c = "ui-icon ui-icon-background ";
                this.options.icon ? (this.icon || (this.icon = a("<span>"), this.iconSpace = a("<span> </span>"), this._addClass(this.iconSpace, "ui-checkboxradio-icon-space")), "checkbox" === this.type ? (c += b ? "ui-icon-check ui-state-checked" : "ui-icon-blank", this._removeClass(this.icon, null, b ? "ui-icon-blank" : "ui-icon-check")) : c += "ui-icon-blank", this._addClass(this.icon, "ui-checkboxradio-icon", c), b || this._removeClass(this.icon, null, "ui-icon-check ui-state-checked"), this.icon.prependTo(this.label).after(this.iconSpace)) : void 0 !== this.icon && (this.icon.remove(), this.iconSpace.remove(), delete this.icon) }, _updateLabel: function() { this.label.contents().not(this.element.add(this.icon).add(this.iconSpace)).remove(), this.label.append(this.options.label) }, refresh: function() { var a = this.element[0].checked,
                    b = this.element[0].disabled;
                this._updateIcon(a), this._toggleClass(this.label, "ui-checkboxradio-checked", "ui-state-active", a), null !== this.options.label && this._updateLabel(), b !== this.options.disabled && this._setOptions({ disabled: b }) } }]);
        a.ui.checkboxradio;
        a.widget("ui.button", { version: "1.12.0", defaultElement: "<button>", options: { classes: { "ui-button": "ui-corner-all" }, disabled: null, icon: null, iconPosition: "beginning", label: null, showLabel: !0 }, _getCreateOptions: function() { var a, b = this._super() || {}; return this.isInput = this.element.is("input"), a = this.element[0].disabled, null != a && (b.disabled = a), this.originalLabel = this.isInput ? this.element.val() : this.element.html(), this.originalLabel && (b.label = this.originalLabel), b }, _create: function() {!this.option.showLabel & !this.options.icon && (this.options.showLabel = !0), null == this.options.disabled && (this.options.disabled = this.element[0].disabled || !1), this.hasTitle = !!this.element.attr("title"), this.options.label && this.options.label !== this.originalLabel && (this.isInput ? this.element.val(this.options.label) : this.element.html(this.options.label)), this._addClass("ui-button", "ui-widget"), this._setOption("disabled", this.options.disabled), this._enhance(), this.element.is("a") && this._on({ keyup: function(b) { b.keyCode === a.ui.keyCode.SPACE && (b.preventDefault(), this.element[0].click ? this.element[0].click() : this.element.trigger("click")) } }) }, _enhance: function() { this.element.is("button") || this.element.attr("role", "button"), this.options.icon && (this._updateIcon("icon", this.options.icon), this._updateTooltip()) }, _updateTooltip: function() { this.title = this.element.attr("title"), this.options.showLabel || this.title || this.element.attr("title", this.options.label) }, _updateIcon: function(b, c) { var d = "iconPosition" !== b,
                    e = d ? this.options.iconPosition : c,
                    f = "top" === e || "bottom" === e;
                this.icon ? d && this._removeClass(this.icon, null, this.options.icon) : (this.icon = a("<span>"), this._addClass(this.icon, "ui-button-icon", "ui-icon"), this.options.showLabel || this._addClass("ui-button-icon-only")), d && this._addClass(this.icon, null, c), this._attachIcon(e), f ? (this._addClass(this.icon, null, "ui-widget-icon-block"), this.iconSpace && this.iconSpace.remove()) : (this.iconSpace || (this.iconSpace = a("<span> </span>"), this._addClass(this.iconSpace, "ui-button-icon-space")), this._removeClass(this.icon, null, "ui-wiget-icon-block"), this._attachIconSpace(e)) }, _destroy: function() { this.element.removeAttr("role"), this.icon && this.icon.remove(), this.iconSpace && this.iconSpace.remove(), this.hasTitle || this.element.removeAttr("title") }, _attachIconSpace: function(a) { this.icon[/^(?:end|bottom)/.test(a) ? "before" : "after"](this.iconSpace) }, _attachIcon: function(a) { this.element[/^(?:end|bottom)/.test(a) ? "append" : "prepend"](this.icon) }, _setOptions: function(a) { var b = void 0 === a.showLabel ? this.options.showLabel : a.showLabel,
                    c = void 0 === a.icon ? this.options.icon : a.icon;
                b || c || (a.showLabel = !0), this._super(a) }, _setOption: function(a, b) { "icon" === a && (b ? this._updateIcon(a, b) : this.icon && (this.icon.remove(), this.iconSpace && this.iconSpace.remove())), "iconPosition" === a && this._updateIcon(a, b), "showLabel" === a && (this._toggleClass("ui-button-icon-only", null, !b), this._updateTooltip()), "label" === a && (this.isInput ? this.element.val(b) : (this.element.html(b), this.icon && (this._attachIcon(this.options.iconPosition), this._attachIconSpace(this.options.iconPosition)))), this._super(a, b), "disabled" === a && (this._toggleClass(null, "ui-state-disabled", b), this.element[0].disabled = b, b && this.element.blur()) }, refresh: function() { var a = this.element.is("input, button") ? this.element[0].disabled : this.element.hasClass("ui-button-disabled");
                a !== this.options.disabled && this._setOptions({ disabled: a }), this._updateTooltip() } }), a.uiBackCompat !== !1 && (a.widget("ui.button", a.ui.button, { options: { text: !0, icons: { primary: null, secondary: null } }, _create: function() { this.options.showLabel && !this.options.text && (this.options.showLabel = this.options.text), !this.options.showLabel && this.options.text && (this.options.text = this.options.showLabel), this.options.icon || !this.options.icons.primary && !this.options.icons.secondary ? this.options.icon && (this.options.icons.primary = this.options.icon) : this.options.icons.primary ? this.options.icon = this.options.icons.primary : (this.options.icon = this.options.icons.secondary, this.options.iconPosition = "end"), this._super() }, _setOption: function(a, b) { return "text" === a ? void this._super("showLabel", b) : ("showLabel" === a && (this.options.text = b), "icon" === a && (this.options.icons.primary = b), "icons" === a && (b.primary ? (this._super("icon", b.primary), this._super("iconPosition", "beginning")) : b.secondary && (this._super("icon", b.secondary), this._super("iconPosition", "end"))), void this._superApply(arguments)) } }), a.fn.button = function(b) { return function() { return !this.length || this.length && "INPUT" !== this[0].tagName || this.length && "INPUT" === this[0].tagName && "checkbox" !== this.attr("type") && "radio" !== this.attr("type") ? b.apply(this, arguments) : (a.ui.checkboxradio || a.error("Checkboxradio widget missing"), 0 === arguments.length ? this.checkboxradio({ icon: !1 }) : this.checkboxradio.apply(this, arguments)) } }(a.fn.button), a.fn.buttonset = function() { return a.ui.controlgroup || a.error("Controlgroup widget missing"), "option" === arguments[0] && "items" === arguments[1] && arguments[2] ? this.controlgroup.apply(this, [arguments[0], "items.button", arguments[2]]) : "option" === arguments[0] && "items" === arguments[1] ? this.controlgroup.apply(this, [arguments[0], "items.button"]) : ("object" == typeof arguments[0] && arguments[0].items && (arguments[0].items = { button: arguments[0].items }), this.controlgroup.apply(this, arguments)) });
        a.ui.button;
        a.extend(a.ui, { datepicker: { version: "1.12.0" } });
        var q;
        a.extend(d.prototype, {
            markerClassName: "hasDatepicker",
            maxRows: 4,
            _widgetDatepicker: function() { return this.dpDiv },
            setDefaults: function(a) { return g(this._defaults, a || {}), this },
            _attachDatepicker: function(b, c) { var d, e, f;
                d = b.nodeName.toLowerCase(), e = "div" === d || "span" === d, b.id || (this.uuid += 1, b.id = "dp" + this.uuid), f = this._newInst(a(b), e), f.settings = a.extend({}, c || {}), "input" === d ? this._connectDatepicker(b, f) : e && this._inlineDatepicker(b, f) },
            _newInst: function(b, c) { var d = b[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1"); return { id: d, input: b, selectedDay: 0, selectedMonth: 0, selectedYear: 0, drawMonth: 0, drawYear: 0, inline: c, dpDiv: c ? e(a("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")) : this.dpDiv } },
            _connectDatepicker: function(b, c) { var d = a(b);
                c.append = a([]), c.trigger = a([]), d.hasClass(this.markerClassName) || (this._attachments(d, c), d.addClass(this.markerClassName).on("keydown", this._doKeyDown).on("keypress", this._doKeyPress).on("keyup", this._doKeyUp), this._autoSize(c), a.data(b, "datepicker", c), c.settings.disabled && this._disableDatepicker(b)) },
            _attachments: function(b, c) { var d, e, f, g = this._get(c, "appendText"),
                    h = this._get(c, "isRTL");
                c.append && c.append.remove(), g && (c.append = a("<span class='" + this._appendClass + "'>" + g + "</span>"), b[h ? "before" : "after"](c.append)), b.off("focus", this._showDatepicker), c.trigger && c.trigger.remove(), d = this._get(c, "showOn"), "focus" !== d && "both" !== d || b.on("focus", this._showDatepicker), "button" !== d && "both" !== d || (e = this._get(c, "buttonText"), f = this._get(c, "buttonImage"), c.trigger = a(this._get(c, "buttonImageOnly") ? a("<img/>").addClass(this._triggerClass).attr({ src: f, alt: e, title: e }) : a("<button type='button'></button>").addClass(this._triggerClass).html(f ? a("<img/>").attr({ src: f, alt: e, title: e }) : e)), b[h ? "before" : "after"](c.trigger), c.trigger.on("click", function() { return a.datepicker._datepickerShowing && a.datepicker._lastInput === b[0] ? a.datepicker._hideDatepicker() : a.datepicker._datepickerShowing && a.datepicker._lastInput !== b[0] ? (a.datepicker._hideDatepicker(), a.datepicker._showDatepicker(b[0])) : a.datepicker._showDatepicker(b[0]), !1 })) },
            _autoSize: function(a) { if (this._get(a, "autoSize") && !a.inline) { var b, c, d, e, f = new Date(2009, 11, 20),
                        g = this._get(a, "dateFormat");
                    g.match(/[DM]/) && (b = function(a) { for (c = 0, d = 0, e = 0; e < a.length; e++) a[e].length > c && (c = a[e].length, d = e); return d }, f.setMonth(b(this._get(a, g.match(/MM/) ? "monthNames" : "monthNamesShort"))), f.setDate(b(this._get(a, g.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - f.getDay())), a.input.attr("size", this._formatDate(a, f).length) } },
            _inlineDatepicker: function(b, c) { var d = a(b);
                d.hasClass(this.markerClassName) || (d.addClass(this.markerClassName).append(c.dpDiv), a.data(b, "datepicker", c), this._setDate(c, this._getDefaultDate(c), !0), this._updateDatepicker(c), this._updateAlternate(c), c.settings.disabled && this._disableDatepicker(b), c.dpDiv.css("display", "block")) },
            _dialogDatepicker: function(b, c, d, e, f) { var h, i, j, k, l, m = this._dialogInst; return m || (this.uuid += 1, h = "dp" + this.uuid, this._dialogInput = a("<input type='text' id='" + h + "' style='position: absolute; top: -100px; width: 0px;'/>"), this._dialogInput.on("keydown", this._doKeyDown), a("body").append(this._dialogInput), m = this._dialogInst = this._newInst(this._dialogInput, !1), m.settings = {}, a.data(this._dialogInput[0], "datepicker", m)), g(m.settings, e || {}), c = c && c.constructor === Date ? this._formatDate(m, c) : c, this._dialogInput.val(c), this._pos = f ? f.length ? f : [f.pageX, f.pageY] : null, this._pos || (i = document.documentElement.clientWidth, j = document.documentElement.clientHeight, k = document.documentElement.scrollLeft || document.body.scrollLeft, l = document.documentElement.scrollTop || document.body.scrollTop, this._pos = [i / 2 - 100 + k, j / 2 - 150 + l]), this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), m.settings.onSelect = d, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), a.blockUI && a.blockUI(this.dpDiv), a.data(this._dialogInput[0], "datepicker", m), this },
            _destroyDatepicker: function(b) { var c, d = a(b),
                    e = a.data(b, "datepicker");
                d.hasClass(this.markerClassName) && (c = b.nodeName.toLowerCase(), a.removeData(b, "datepicker"), "input" === c ? (e.append.remove(), e.trigger.remove(), d.removeClass(this.markerClassName).off("focus", this._showDatepicker).off("keydown", this._doKeyDown).off("keypress", this._doKeyPress).off("keyup", this._doKeyUp)) : "div" !== c && "span" !== c || d.removeClass(this.markerClassName).empty(), q === e && (q = null)) },
            _enableDatepicker: function(b) { var c, d, e = a(b),
                    f = a.data(b, "datepicker");
                e.hasClass(this.markerClassName) && (c = b.nodeName.toLowerCase(), "input" === c ? (b.disabled = !1, f.trigger.filter("button").each(function() { this.disabled = !1 }).end().filter("img").css({ opacity: "1.0", cursor: "" })) : "div" !== c && "span" !== c || (d = e.children("." + this._inlineClass), d.children().removeClass("ui-state-disabled"), d.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)), this._disabledInputs = a.map(this._disabledInputs, function(a) { return a === b ? null : a })) },
            _disableDatepicker: function(b) { var c, d, e = a(b),
                    f = a.data(b, "datepicker");
                e.hasClass(this.markerClassName) && (c = b.nodeName.toLowerCase(), "input" === c ? (b.disabled = !0, f.trigger.filter("button").each(function() { this.disabled = !0 }).end().filter("img").css({ opacity: "0.5", cursor: "default" })) : "div" !== c && "span" !== c || (d = e.children("." + this._inlineClass), d.children().addClass("ui-state-disabled"), d.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)), this._disabledInputs = a.map(this._disabledInputs, function(a) { return a === b ? null : a }), this._disabledInputs[this._disabledInputs.length] = b) },
            _isDisabledDatepicker: function(a) { if (!a) return !1; for (var b = 0; b < this._disabledInputs.length; b++)
                    if (this._disabledInputs[b] === a) return !0; return !1 },
            _getInst: function(b) { try { return a.data(b, "datepicker") } catch (c) { throw "Missing instance data for this datepicker" } },
            _optionDatepicker: function(b, c, d) {
                var e, f, h, i, j = this._getInst(b);
                return 2 === arguments.length && "string" == typeof c ? "defaults" === c ? a.extend({}, a.datepicker._defaults) : j ? "all" === c ? a.extend({}, j.settings) : this._get(j, c) : null : (e = c || {}, "string" == typeof c && (e = {}, e[c] = d), void(j && (this._curInst === j && this._hideDatepicker(), f = this._getDateDatepicker(b, !0), h = this._getMinMaxDate(j, "min"),
                    i = this._getMinMaxDate(j, "max"), g(j.settings, e), null !== h && void 0 !== e.dateFormat && void 0 === e.minDate && (j.settings.minDate = this._formatDate(j, h)), null !== i && void 0 !== e.dateFormat && void 0 === e.maxDate && (j.settings.maxDate = this._formatDate(j, i)), "disabled" in e && (e.disabled ? this._disableDatepicker(b) : this._enableDatepicker(b)), this._attachments(a(b), j), this._autoSize(j), this._setDate(j, f), this._updateAlternate(j), this._updateDatepicker(j))))
            },
            _changeDatepicker: function(a, b, c) { this._optionDatepicker(a, b, c) },
            _refreshDatepicker: function(a) { var b = this._getInst(a);
                b && this._updateDatepicker(b) },
            _setDateDatepicker: function(a, b) { var c = this._getInst(a);
                c && (this._setDate(c, b), this._updateDatepicker(c), this._updateAlternate(c)) },
            _getDateDatepicker: function(a, b) { var c = this._getInst(a); return c && !c.inline && this._setDateFromField(c, b), c ? this._getDate(c) : null },
            _doKeyDown: function(b) { var c, d, e, f = a.datepicker._getInst(b.target),
                    g = !0,
                    h = f.dpDiv.is(".ui-datepicker-rtl"); if (f._keyEvent = !0, a.datepicker._datepickerShowing) switch (b.keyCode) {
                    case 9:
                        a.datepicker._hideDatepicker(), g = !1; break;
                    case 13:
                        return e = a("td." + a.datepicker._dayOverClass + ":not(." + a.datepicker._currentClass + ")", f.dpDiv), e[0] && a.datepicker._selectDay(b.target, f.selectedMonth, f.selectedYear, e[0]), c = a.datepicker._get(f, "onSelect"), c ? (d = a.datepicker._formatDate(f), c.apply(f.input ? f.input[0] : null, [d, f])) : a.datepicker._hideDatepicker(), !1;
                    case 27:
                        a.datepicker._hideDatepicker(); break;
                    case 33:
                        a.datepicker._adjustDate(b.target, b.ctrlKey ? -a.datepicker._get(f, "stepBigMonths") : -a.datepicker._get(f, "stepMonths"), "M"); break;
                    case 34:
                        a.datepicker._adjustDate(b.target, b.ctrlKey ? +a.datepicker._get(f, "stepBigMonths") : +a.datepicker._get(f, "stepMonths"), "M"); break;
                    case 35:
                        (b.ctrlKey || b.metaKey) && a.datepicker._clearDate(b.target), g = b.ctrlKey || b.metaKey; break;
                    case 36:
                        (b.ctrlKey || b.metaKey) && a.datepicker._gotoToday(b.target), g = b.ctrlKey || b.metaKey; break;
                    case 37:
                        (b.ctrlKey || b.metaKey) && a.datepicker._adjustDate(b.target, h ? 1 : -1, "D"), g = b.ctrlKey || b.metaKey, b.originalEvent.altKey && a.datepicker._adjustDate(b.target, b.ctrlKey ? -a.datepicker._get(f, "stepBigMonths") : -a.datepicker._get(f, "stepMonths"), "M"); break;
                    case 38:
                        (b.ctrlKey || b.metaKey) && a.datepicker._adjustDate(b.target, -7, "D"), g = b.ctrlKey || b.metaKey; break;
                    case 39:
                        (b.ctrlKey || b.metaKey) && a.datepicker._adjustDate(b.target, h ? -1 : 1, "D"), g = b.ctrlKey || b.metaKey, b.originalEvent.altKey && a.datepicker._adjustDate(b.target, b.ctrlKey ? +a.datepicker._get(f, "stepBigMonths") : +a.datepicker._get(f, "stepMonths"), "M"); break;
                    case 40:
                        (b.ctrlKey || b.metaKey) && a.datepicker._adjustDate(b.target, 7, "D"), g = b.ctrlKey || b.metaKey; break;
                    default:
                        g = !1 } else 36 === b.keyCode && b.ctrlKey ? a.datepicker._showDatepicker(this) : g = !1;
                g && (b.preventDefault(), b.stopPropagation()) },
            _doKeyPress: function(b) { var c, d, e = a.datepicker._getInst(b.target); if (a.datepicker._get(e, "constrainInput")) return c = a.datepicker._possibleChars(a.datepicker._get(e, "dateFormat")), d = String.fromCharCode(null == b.charCode ? b.keyCode : b.charCode), b.ctrlKey || b.metaKey || d < " " || !c || c.indexOf(d) > -1 },
            _doKeyUp: function(b) { var c, d = a.datepicker._getInst(b.target); if (d.input.val() !== d.lastVal) try { c = a.datepicker.parseDate(a.datepicker._get(d, "dateFormat"), d.input ? d.input.val() : null, a.datepicker._getFormatConfig(d)), c && (a.datepicker._setDateFromField(d), a.datepicker._updateAlternate(d), a.datepicker._updateDatepicker(d)) } catch (e) {}
                return !0 },
            _showDatepicker: function(b) { if (b = b.target || b, "input" !== b.nodeName.toLowerCase() && (b = a("input", b.parentNode)[0]), !a.datepicker._isDisabledDatepicker(b) && a.datepicker._lastInput !== b) { var d, e, f, h, i, j, k;
                    d = a.datepicker._getInst(b), a.datepicker._curInst && a.datepicker._curInst !== d && (a.datepicker._curInst.dpDiv.stop(!0, !0), d && a.datepicker._datepickerShowing && a.datepicker._hideDatepicker(a.datepicker._curInst.input[0])), e = a.datepicker._get(d, "beforeShow"), f = e ? e.apply(b, [b, d]) : {}, f !== !1 && (g(d.settings, f), d.lastVal = null, a.datepicker._lastInput = b, a.datepicker._setDateFromField(d), a.datepicker._inDialog && (b.value = ""), a.datepicker._pos || (a.datepicker._pos = a.datepicker._findPos(b), a.datepicker._pos[1] += b.offsetHeight), h = !1, a(b).parents().each(function() { return h |= "fixed" === a(this).css("position"), !h }), i = { left: a.datepicker._pos[0], top: a.datepicker._pos[1] }, a.datepicker._pos = null, d.dpDiv.empty(), d.dpDiv.css({ position: "absolute", display: "block", top: "-1000px" }), a.datepicker._updateDatepicker(d), i = a.datepicker._checkOffset(d, i, h), d.dpDiv.css({ position: a.datepicker._inDialog && a.blockUI ? "static" : h ? "fixed" : "absolute", display: "none", left: i.left + "px", top: i.top + "px" }), d.inline || (j = a.datepicker._get(d, "showAnim"), k = a.datepicker._get(d, "duration"), d.dpDiv.css("z-index", c(a(b)) + 1), a.datepicker._datepickerShowing = !0, a.effects && a.effects.effect[j] ? d.dpDiv.show(j, a.datepicker._get(d, "showOptions"), k) : d.dpDiv[j || "show"](j ? k : null), a.datepicker._shouldFocusInput(d) && d.input.trigger("focus"), a.datepicker._curInst = d)) } },
            _updateDatepicker: function(b) { this.maxRows = 4, q = b, b.dpDiv.empty().append(this._generateHTML(b)), this._attachHandlers(b); var c, d = this._getNumberOfMonths(b),
                    e = d[1],
                    g = 17,
                    h = b.dpDiv.find("." + this._dayOverClass + " a");
                h.length > 0 && f.apply(h.get(0)), b.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), e > 1 && b.dpDiv.addClass("ui-datepicker-multi-" + e).css("width", g * e + "em"), b.dpDiv[(1 !== d[0] || 1 !== d[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi"), b.dpDiv[(this._get(b, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"), b === a.datepicker._curInst && a.datepicker._datepickerShowing && a.datepicker._shouldFocusInput(b) && b.input.trigger("focus"), b.yearshtml && (c = b.yearshtml, setTimeout(function() { c === b.yearshtml && b.yearshtml && b.dpDiv.find("select.ui-datepicker-year:first").replaceWith(b.yearshtml), c = b.yearshtml = null }, 0)) },
            _shouldFocusInput: function(a) { return a.input && a.input.is(":visible") && !a.input.is(":disabled") && !a.input.is(":focus") },
            _checkOffset: function(b, c, d) { var e = b.dpDiv.outerWidth(),
                    f = b.dpDiv.outerHeight(),
                    g = b.input ? b.input.outerWidth() : 0,
                    h = b.input ? b.input.outerHeight() : 0,
                    i = document.documentElement.clientWidth + (d ? 0 : a(document).scrollLeft()),
                    j = document.documentElement.clientHeight + (d ? 0 : a(document).scrollTop()); return c.left -= this._get(b, "isRTL") ? e - g : 0, c.left -= d && c.left === b.input.offset().left ? a(document).scrollLeft() : 0, c.top -= d && c.top === b.input.offset().top + h ? a(document).scrollTop() : 0, c.left -= Math.min(c.left, c.left + e > i && i > e ? Math.abs(c.left + e - i) : 0), c.top -= Math.min(c.top, c.top + f > j && j > f ? Math.abs(f + h) : 0), c },
            _findPos: function(b) { for (var c, d = this._getInst(b), e = this._get(d, "isRTL"); b && ("hidden" === b.type || 1 !== b.nodeType || a.expr.filters.hidden(b));) b = b[e ? "previousSibling" : "nextSibling"]; return c = a(b).offset(), [c.left, c.top] },
            _hideDatepicker: function(b) { var c, d, e, f, g = this._curInst;!g || b && g !== a.data(b, "datepicker") || this._datepickerShowing && (c = this._get(g, "showAnim"), d = this._get(g, "duration"), e = function() { a.datepicker._tidyDialog(g) }, a.effects && (a.effects.effect[c] || a.effects[c]) ? g.dpDiv.hide(c, a.datepicker._get(g, "showOptions"), d, e) : g.dpDiv["slideDown" === c ? "slideUp" : "fadeIn" === c ? "fadeOut" : "hide"](c ? d : null, e), c || e(), this._datepickerShowing = !1, f = this._get(g, "onClose"), f && f.apply(g.input ? g.input[0] : null, [g.input ? g.input.val() : "", g]), this._lastInput = null, this._inDialog && (this._dialogInput.css({ position: "absolute", left: "0", top: "-100px" }), a.blockUI && (a.unblockUI(), a("body").append(this.dpDiv))), this._inDialog = !1) },
            _tidyDialog: function(a) { a.dpDiv.removeClass(this._dialogClass).off(".ui-datepicker-calendar") },
            _checkExternalClick: function(b) { if (a.datepicker._curInst) { var c = a(b.target),
                        d = a.datepicker._getInst(c[0]);
                    (c[0].id === a.datepicker._mainDivId || 0 !== c.parents("#" + a.datepicker._mainDivId).length || c.hasClass(a.datepicker.markerClassName) || c.closest("." + a.datepicker._triggerClass).length || !a.datepicker._datepickerShowing || a.datepicker._inDialog && a.blockUI) && (!c.hasClass(a.datepicker.markerClassName) || a.datepicker._curInst === d) || a.datepicker._hideDatepicker() } },
            _adjustDate: function(b, c, d) { var e = a(b),
                    f = this._getInst(e[0]);
                this._isDisabledDatepicker(e[0]) || (this._adjustInstDate(f, c + ("M" === d ? this._get(f, "showCurrentAtPos") : 0), d), this._updateDatepicker(f)) },
            _gotoToday: function(b) { var c, d = a(b),
                    e = this._getInst(d[0]);
                this._get(e, "gotoCurrent") && e.currentDay ? (e.selectedDay = e.currentDay, e.drawMonth = e.selectedMonth = e.currentMonth, e.drawYear = e.selectedYear = e.currentYear) : (c = new Date, e.selectedDay = c.getDate(), e.drawMonth = e.selectedMonth = c.getMonth(), e.drawYear = e.selectedYear = c.getFullYear()), this._notifyChange(e), this._adjustDate(d) },
            _selectMonthYear: function(b, c, d) { var e = a(b),
                    f = this._getInst(e[0]);
                f["selected" + ("M" === d ? "Month" : "Year")] = f["draw" + ("M" === d ? "Month" : "Year")] = parseInt(c.options[c.selectedIndex].value, 10), this._notifyChange(f), this._adjustDate(e) },
            _selectDay: function(b, c, d, e) { var f, g = a(b);
                a(e).hasClass(this._unselectableClass) || this._isDisabledDatepicker(g[0]) || (f = this._getInst(g[0]), f.selectedDay = f.currentDay = a("a", e).html(), f.selectedMonth = f.currentMonth = c, f.selectedYear = f.currentYear = d, this._selectDate(b, this._formatDate(f, f.currentDay, f.currentMonth, f.currentYear))) },
            _clearDate: function(b) { var c = a(b);
                this._selectDate(c, "") },
            _selectDate: function(b, c) { var d, e = a(b),
                    f = this._getInst(e[0]);
                c = null != c ? c : this._formatDate(f), f.input && f.input.val(c), this._updateAlternate(f), d = this._get(f, "onSelect"), d ? d.apply(f.input ? f.input[0] : null, [c, f]) : f.input && f.input.trigger("change"), f.inline ? this._updateDatepicker(f) : (this._hideDatepicker(), this._lastInput = f.input[0], "object" != typeof f.input[0] && f.input.trigger("focus"), this._lastInput = null) },
            _updateAlternate: function(b) { var c, d, e, f = this._get(b, "altField");
                f && (c = this._get(b, "altFormat") || this._get(b, "dateFormat"), d = this._getDate(b), e = this.formatDate(c, d, this._getFormatConfig(b)), a(f).val(e)) },
            noWeekends: function(a) { var b = a.getDay(); return [b > 0 && b < 6, ""] },
            iso8601Week: function(a) { var b, c = new Date(a.getTime()); return c.setDate(c.getDate() + 4 - (c.getDay() || 7)), b = c.getTime(), c.setMonth(0), c.setDate(1), Math.floor(Math.round((b - c) / 864e5) / 7) + 1 },
            parseDate: function(b, c, d) { if (null == b || null == c) throw "Invalid arguments"; if (c = "object" == typeof c ? c.toString() : c + "", "" === c) return null; var e, f, g, h, i = 0,
                    j = (d ? d.shortYearCutoff : null) || this._defaults.shortYearCutoff,
                    k = "string" != typeof j ? j : (new Date).getFullYear() % 100 + parseInt(j, 10),
                    l = (d ? d.dayNamesShort : null) || this._defaults.dayNamesShort,
                    m = (d ? d.dayNames : null) || this._defaults.dayNames,
                    n = (d ? d.monthNamesShort : null) || this._defaults.monthNamesShort,
                    o = (d ? d.monthNames : null) || this._defaults.monthNames,
                    p = -1,
                    q = -1,
                    r = -1,
                    s = -1,
                    t = !1,
                    u = function(a) { var c = e + 1 < b.length && b.charAt(e + 1) === a; return c && e++, c },
                    v = function(a) { var b = u(a),
                            d = "@" === a ? 14 : "!" === a ? 20 : "y" === a && b ? 4 : "o" === a ? 3 : 2,
                            e = "y" === a ? d : 1,
                            f = new RegExp("^\\d{" + e + "," + d + "}"),
                            g = c.substring(i).match(f); if (!g) throw "Missing number at position " + i; return i += g[0].length, parseInt(g[0], 10) },
                    w = function(b, d, e) { var f = -1,
                            g = a.map(u(b) ? e : d, function(a, b) { return [
                                    [b, a]
                                ] }).sort(function(a, b) { return -(a[1].length - b[1].length) }); if (a.each(g, function(a, b) { var d = b[1]; if (c.substr(i, d.length).toLowerCase() === d.toLowerCase()) return f = b[0], i += d.length, !1 }), f !== -1) return f + 1; throw "Unknown name at position " + i },
                    x = function() { if (c.charAt(i) !== b.charAt(e)) throw "Unexpected literal at position " + i;
                        i++ }; for (e = 0; e < b.length; e++)
                    if (t) "'" !== b.charAt(e) || u("'") ? x() : t = !1;
                    else switch (b.charAt(e)) {
                        case "d":
                            r = v("d"); break;
                        case "D":
                            w("D", l, m); break;
                        case "o":
                            s = v("o"); break;
                        case "m":
                            q = v("m"); break;
                        case "M":
                            q = w("M", n, o); break;
                        case "y":
                            p = v("y"); break;
                        case "@":
                            h = new Date(v("@")), p = h.getFullYear(), q = h.getMonth() + 1, r = h.getDate(); break;
                        case "!":
                            h = new Date((v("!") - this._ticksTo1970) / 1e4), p = h.getFullYear(), q = h.getMonth() + 1, r = h.getDate(); break;
                        case "'":
                            u("'") ? x() : t = !0; break;
                        default:
                            x() }
                if (i < c.length && (g = c.substr(i), !/^\s+/.test(g))) throw "Extra/unparsed characters found in date: " + g; if (p === -1 ? p = (new Date).getFullYear() : p < 100 && (p += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (p <= k ? 0 : -100)), s > -1)
                    for (q = 1, r = s;;) { if (f = this._getDaysInMonth(p, q - 1), r <= f) break;
                        q++, r -= f }
                if (h = this._daylightSavingAdjust(new Date(p, q - 1, r)), h.getFullYear() !== p || h.getMonth() + 1 !== q || h.getDate() !== r) throw "Invalid date"; return h },
            ATOM: "yy-mm-dd",
            COOKIE: "D, dd M yy",
            ISO_8601: "yy-mm-dd",
            RFC_822: "D, d M y",
            RFC_850: "DD, dd-M-y",
            RFC_1036: "D, d M y",
            RFC_1123: "D, d M yy",
            RFC_2822: "D, d M yy",
            RSS: "D, d M y",
            TICKS: "!",
            TIMESTAMP: "@",
            W3C: "yy-mm-dd",
            _ticksTo1970: 24 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)) * 60 * 60 * 1e7,
            formatDate: function(a, b, c) { if (!b) return ""; var d, e = (c ? c.dayNamesShort : null) || this._defaults.dayNamesShort,
                    f = (c ? c.dayNames : null) || this._defaults.dayNames,
                    g = (c ? c.monthNamesShort : null) || this._defaults.monthNamesShort,
                    h = (c ? c.monthNames : null) || this._defaults.monthNames,
                    i = function(b) { var c = d + 1 < a.length && a.charAt(d + 1) === b; return c && d++, c },
                    j = function(a, b, c) { var d = "" + b; if (i(a))
                            for (; d.length < c;) d = "0" + d; return d },
                    k = function(a, b, c, d) { return i(a) ? d[b] : c[b] },
                    l = "",
                    m = !1; if (b)
                    for (d = 0; d < a.length; d++)
                        if (m) "'" !== a.charAt(d) || i("'") ? l += a.charAt(d) : m = !1;
                        else switch (a.charAt(d)) {
                            case "d":
                                l += j("d", b.getDate(), 2); break;
                            case "D":
                                l += k("D", b.getDay(), e, f); break;
                            case "o":
                                l += j("o", Math.round((new Date(b.getFullYear(), b.getMonth(), b.getDate()).getTime() - new Date(b.getFullYear(), 0, 0).getTime()) / 864e5), 3); break;
                            case "m":
                                l += j("m", b.getMonth() + 1, 2); break;
                            case "M":
                                l += k("M", b.getMonth(), g, h); break;
                            case "y":
                                l += i("y") ? b.getFullYear() : (b.getFullYear() % 100 < 10 ? "0" : "") + b.getFullYear() % 100; break;
                            case "@":
                                l += b.getTime(); break;
                            case "!":
                                l += 1e4 * b.getTime() + this._ticksTo1970; break;
                            case "'":
                                i("'") ? l += "'" : m = !0; break;
                            default:
                                l += a.charAt(d) }
                return l },
            _possibleChars: function(a) { var b, c = "",
                    d = !1,
                    e = function(c) { var d = b + 1 < a.length && a.charAt(b + 1) === c; return d && b++, d }; for (b = 0; b < a.length; b++)
                    if (d) "'" !== a.charAt(b) || e("'") ? c += a.charAt(b) : d = !1;
                    else switch (a.charAt(b)) {
                        case "d":
                        case "m":
                        case "y":
                        case "@":
                            c += "0123456789"; break;
                        case "D":
                        case "M":
                            return null;
                        case "'":
                            e("'") ? c += "'" : d = !0; break;
                        default:
                            c += a.charAt(b) }
                return c },
            _get: function(a, b) { return void 0 !== a.settings[b] ? a.settings[b] : this._defaults[b] },
            _setDateFromField: function(a, b) { if (a.input.val() !== a.lastVal) { var c = this._get(a, "dateFormat"),
                        d = a.lastVal = a.input ? a.input.val() : null,
                        e = this._getDefaultDate(a),
                        f = e,
                        g = this._getFormatConfig(a); try { f = this.parseDate(c, d, g) || e } catch (h) { d = b ? "" : d } a.selectedDay = f.getDate(), a.drawMonth = a.selectedMonth = f.getMonth(), a.drawYear = a.selectedYear = f.getFullYear(), a.currentDay = d ? f.getDate() : 0, a.currentMonth = d ? f.getMonth() : 0, a.currentYear = d ? f.getFullYear() : 0, this._adjustInstDate(a) } },
            _getDefaultDate: function(a) { return this._restrictMinMax(a, this._determineDate(a, this._get(a, "defaultDate"), new Date)) },
            _determineDate: function(b, c, d) { var e = function(a) { var b = new Date; return b.setDate(b.getDate() + a), b },
                    f = function(c) { try { return a.datepicker.parseDate(a.datepicker._get(b, "dateFormat"), c, a.datepicker._getFormatConfig(b)) } catch (d) {} for (var e = (c.toLowerCase().match(/^c/) ? a.datepicker._getDate(b) : null) || new Date, f = e.getFullYear(), g = e.getMonth(), h = e.getDate(), i = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, j = i.exec(c); j;) { switch (j[2] || "d") {
                                case "d":
                                case "D":
                                    h += parseInt(j[1], 10); break;
                                case "w":
                                case "W":
                                    h += 7 * parseInt(j[1], 10); break;
                                case "m":
                                case "M":
                                    g += parseInt(j[1], 10), h = Math.min(h, a.datepicker._getDaysInMonth(f, g)); break;
                                case "y":
                                case "Y":
                                    f += parseInt(j[1], 10), h = Math.min(h, a.datepicker._getDaysInMonth(f, g)) } j = i.exec(c) } return new Date(f, g, h) },
                    g = null == c || "" === c ? d : "string" == typeof c ? f(c) : "number" == typeof c ? isNaN(c) ? d : e(c) : new Date(c.getTime()); return g = g && "Invalid Date" === g.toString() ? d : g, g && (g.setHours(0), g.setMinutes(0), g.setSeconds(0), g.setMilliseconds(0)), this._daylightSavingAdjust(g) },
            _daylightSavingAdjust: function(a) { return a ? (a.setHours(a.getHours() > 12 ? a.getHours() + 2 : 0), a) : null },
            _setDate: function(a, b, c) { var d = !b,
                    e = a.selectedMonth,
                    f = a.selectedYear,
                    g = this._restrictMinMax(a, this._determineDate(a, b, new Date));
                a.selectedDay = a.currentDay = g.getDate(), a.drawMonth = a.selectedMonth = a.currentMonth = g.getMonth(), a.drawYear = a.selectedYear = a.currentYear = g.getFullYear(), e === a.selectedMonth && f === a.selectedYear || c || this._notifyChange(a), this._adjustInstDate(a), a.input && a.input.val(d ? "" : this._formatDate(a)) },
            _getDate: function(a) { var b = !a.currentYear || a.input && "" === a.input.val() ? null : this._daylightSavingAdjust(new Date(a.currentYear, a.currentMonth, a.currentDay)); return b },
            _attachHandlers: function(b) { var c = this._get(b, "stepMonths"),
                    d = "#" + b.id.replace(/\\\\/g, "\\");
                b.dpDiv.find("[data-handler]").map(function() { var b = { prev: function() { a.datepicker._adjustDate(d, -c, "M") }, next: function() { a.datepicker._adjustDate(d, +c, "M") }, hide: function() { a.datepicker._hideDatepicker() }, today: function() { a.datepicker._gotoToday(d) }, selectDay: function() { return a.datepicker._selectDay(d, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), !1 }, selectMonth: function() { return a.datepicker._selectMonthYear(d, this, "M"), !1 }, selectYear: function() { return a.datepicker._selectMonthYear(d, this, "Y"), !1 } };
                    a(this).on(this.getAttribute("data-event"), b[this.getAttribute("data-handler")]) }) },
            _generateHTML: function(a) { var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O = new Date,
                    P = this._daylightSavingAdjust(new Date(O.getFullYear(), O.getMonth(), O.getDate())),
                    Q = this._get(a, "isRTL"),
                    R = this._get(a, "showButtonPanel"),
                    S = this._get(a, "hideIfNoPrevNext"),
                    T = this._get(a, "navigationAsDateFormat"),
                    U = this._getNumberOfMonths(a),
                    V = this._get(a, "showCurrentAtPos"),
                    W = this._get(a, "stepMonths"),
                    X = 1 !== U[0] || 1 !== U[1],
                    Y = this._daylightSavingAdjust(a.currentDay ? new Date(a.currentYear, a.currentMonth, a.currentDay) : new Date(9999, 9, 9)),
                    Z = this._getMinMaxDate(a, "min"),
                    $ = this._getMinMaxDate(a, "max"),
                    _ = a.drawMonth - V,
                    aa = a.drawYear; if (_ < 0 && (_ += 12, aa--), $)
                    for (b = this._daylightSavingAdjust(new Date($.getFullYear(), $.getMonth() - U[0] * U[1] + 1, $.getDate())), b = Z && b < Z ? Z : b; this._daylightSavingAdjust(new Date(aa, _, 1)) > b;) _--, _ < 0 && (_ = 11, aa--); for (a.drawMonth = _, a.drawYear = aa, c = this._get(a, "prevText"), c = T ? this.formatDate(c, this._daylightSavingAdjust(new Date(aa, _ - W, 1)), this._getFormatConfig(a)) : c, d = this._canAdjustMonth(a, -1, aa, _) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + c + "'><span class='ui-icon ui-icon-circle-triangle-" + (Q ? "e" : "w") + "'>" + c + "</span></a>" : S ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + c + "'><span class='ui-icon ui-icon-circle-triangle-" + (Q ? "e" : "w") + "'>" + c + "</span></a>", e = this._get(a, "nextText"), e = T ? this.formatDate(e, this._daylightSavingAdjust(new Date(aa, _ + W, 1)), this._getFormatConfig(a)) : e, f = this._canAdjustMonth(a, 1, aa, _) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + e + "'><span class='ui-icon ui-icon-circle-triangle-" + (Q ? "w" : "e") + "'>" + e + "</span></a>" : S ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + e + "'><span class='ui-icon ui-icon-circle-triangle-" + (Q ? "w" : "e") + "'>" + e + "</span></a>", g = this._get(a, "currentText"), h = this._get(a, "gotoCurrent") && a.currentDay ? Y : P, g = T ? this.formatDate(g, h, this._getFormatConfig(a)) : g, i = a.inline ? "" : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(a, "closeText") + "</button>", j = R ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (Q ? i : "") + (this._isInRange(a, h) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + g + "</button>" : "") + (Q ? "" : i) + "</div>" : "", k = parseInt(this._get(a, "firstDay"), 10), k = isNaN(k) ? 0 : k, l = this._get(a, "showWeek"), m = this._get(a, "dayNames"), n = this._get(a, "dayNamesMin"), o = this._get(a, "monthNames"), p = this._get(a, "monthNamesShort"), q = this._get(a, "beforeShowDay"), r = this._get(a, "showOtherMonths"), s = this._get(a, "selectOtherMonths"), t = this._getDefaultDate(a), u = "", w = 0; w < U[0]; w++) { for (x = "", this.maxRows = 4, y = 0; y < U[1]; y++) { if (z = this._daylightSavingAdjust(new Date(aa, _, a.selectedDay)), A = " ui-corner-all", B = "", X) { if (B += "<div class='ui-datepicker-group", U[1] > 1) switch (y) {
                                case 0:
                                    B += " ui-datepicker-group-first", A = " ui-corner-" + (Q ? "right" : "left"); break;
                                case U[1] - 1:
                                    B += " ui-datepicker-group-last", A = " ui-corner-" + (Q ? "left" : "right"); break;
                                default:
                                    B += " ui-datepicker-group-middle", A = "" } B += "'>" } for (B += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + A + "'>" + (/all|left/.test(A) && 0 === w ? Q ? f : d : "") + (/all|right/.test(A) && 0 === w ? Q ? d : f : "") + this._generateMonthYearHeader(a, _, aa, Z, $, w > 0 || y > 0, o, p) + "</div><table class='ui-datepicker-calendar'><thead><tr>", C = l ? "<th class='ui-datepicker-week-col'>" + this._get(a, "weekHeader") + "</th>" : "", v = 0; v < 7; v++) D = (v + k) % 7, C += "<th scope='col'" + ((v + k + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + "><span title='" + m[D] + "'>" + n[D] + "</span></th>"; for (B += C + "</tr></thead><tbody>", E = this._getDaysInMonth(aa, _), aa === a.selectedYear && _ === a.selectedMonth && (a.selectedDay = Math.min(a.selectedDay, E)), F = (this._getFirstDayOfMonth(aa, _) - k + 7) % 7, G = Math.ceil((F + E) / 7), H = X && this.maxRows > G ? this.maxRows : G, this.maxRows = H, I = this._daylightSavingAdjust(new Date(aa, _, 1 - F)), J = 0; J < H; J++) { for (B += "<tr>", K = l ? "<td class='ui-datepicker-week-col'>" + this._get(a, "calculateWeek")(I) + "</td>" : "", v = 0; v < 7; v++) L = q ? q.apply(a.input ? a.input[0] : null, [I]) : [!0, ""], M = I.getMonth() !== _, N = M && !s || !L[0] || Z && I < Z || $ && I > $, K += "<td class='" + ((v + k + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (M ? " ui-datepicker-other-month" : "") + (I.getTime() === z.getTime() && _ === a.selectedMonth && a._keyEvent || t.getTime() === I.getTime() && t.getTime() === z.getTime() ? " " + this._dayOverClass : "") + (N ? " " + this._unselectableClass + " ui-state-disabled" : "") + (M && !r ? "" : " " + L[1] + (I.getTime() === Y.getTime() ? " " + this._currentClass : "") + (I.getTime() === P.getTime() ? " ui-datepicker-today" : "")) + "'" + (M && !r || !L[2] ? "" : " title='" + L[2].replace(/'/g, "&#39;") + "'") + (N ? "" : " data-handler='selectDay' data-event='click' data-month='" + I.getMonth() + "' data-year='" + I.getFullYear() + "'") + ">" + (M && !r ? "&#xa0;" : N ? "<span class='ui-state-default'>" + I.getDate() + "</span>" : "<a class='ui-state-default" + (I.getTime() === P.getTime() ? " ui-state-highlight" : "") + (I.getTime() === Y.getTime() ? " ui-state-active" : "") + (M ? " ui-priority-secondary" : "") + "' href='#'>" + I.getDate() + "</a>") + "</td>", I.setDate(I.getDate() + 1), I = this._daylightSavingAdjust(I);
                            B += K + "</tr>" } _++, _ > 11 && (_ = 0, aa++), B += "</tbody></table>" + (X ? "</div>" + (U[0] > 0 && y === U[1] - 1 ? "<div class='ui-datepicker-row-break'></div>" : "") : ""), x += B } u += x } return u += j, a._keyEvent = !1, u },
            _generateMonthYearHeader: function(a, b, c, d, e, f, g, h) { var i, j, k, l, m, n, o, p, q = this._get(a, "changeMonth"),
                    r = this._get(a, "changeYear"),
                    s = this._get(a, "showMonthAfterYear"),
                    t = "<div class='ui-datepicker-title'>",
                    u = ""; if (f || !q) u += "<span class='ui-datepicker-month'>" + g[b] + "</span>";
                else { for (i = d && d.getFullYear() === c, j = e && e.getFullYear() === c, u += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>", k = 0; k < 12; k++)(!i || k >= d.getMonth()) && (!j || k <= e.getMonth()) && (u += "<option value='" + k + "'" + (k === b ? " selected='selected'" : "") + ">" + h[k] + "</option>");
                    u += "</select>" } if (s || (t += u + (!f && q && r ? "" : "&#xa0;")), !a.yearshtml)
                    if (a.yearshtml = "", f || !r) t += "<span class='ui-datepicker-year'>" + c + "</span>";
                    else { for (l = this._get(a, "yearRange").split(":"), m = (new Date).getFullYear(), n = function(a) { var b = a.match(/c[+\-].*/) ? c + parseInt(a.substring(1), 10) : a.match(/[+\-].*/) ? m + parseInt(a, 10) : parseInt(a, 10); return isNaN(b) ? m : b }, o = n(l[0]), p = Math.max(o, n(l[1] || "")), o = d ? Math.max(o, d.getFullYear()) : o, p = e ? Math.min(p, e.getFullYear()) : p, a.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>"; o <= p; o++) a.yearshtml += "<option value='" + o + "'" + (o === c ? " selected='selected'" : "") + ">" + o + "</option>";
                        a.yearshtml += "</select>", t += a.yearshtml, a.yearshtml = null }
                return t += this._get(a, "yearSuffix"), s && (t += (!f && q && r ? "" : "&#xa0;") + u), t += "</div>" },
            _adjustInstDate: function(a, b, c) { var d = a.selectedYear + ("Y" === c ? b : 0),
                    e = a.selectedMonth + ("M" === c ? b : 0),
                    f = Math.min(a.selectedDay, this._getDaysInMonth(d, e)) + ("D" === c ? b : 0),
                    g = this._restrictMinMax(a, this._daylightSavingAdjust(new Date(d, e, f)));
                a.selectedDay = g.getDate(), a.drawMonth = a.selectedMonth = g.getMonth(), a.drawYear = a.selectedYear = g.getFullYear(), "M" !== c && "Y" !== c || this._notifyChange(a) },
            _restrictMinMax: function(a, b) { var c = this._getMinMaxDate(a, "min"),
                    d = this._getMinMaxDate(a, "max"),
                    e = c && b < c ? c : b; return d && e > d ? d : e },
            _notifyChange: function(a) { var b = this._get(a, "onChangeMonthYear");
                b && b.apply(a.input ? a.input[0] : null, [a.selectedYear, a.selectedMonth + 1, a]) },
            _getNumberOfMonths: function(a) { var b = this._get(a, "numberOfMonths"); return null == b ? [1, 1] : "number" == typeof b ? [1, b] : b },
            _getMinMaxDate: function(a, b) { return this._determineDate(a, this._get(a, b + "Date"), null) },
            _getDaysInMonth: function(a, b) { return 32 - this._daylightSavingAdjust(new Date(a, b, 32)).getDate() },
            _getFirstDayOfMonth: function(a, b) { return new Date(a, b, 1).getDay() },
            _canAdjustMonth: function(a, b, c, d) { var e = this._getNumberOfMonths(a),
                    f = this._daylightSavingAdjust(new Date(c, d + (b < 0 ? b : e[0] * e[1]), 1)); return b < 0 && f.setDate(this._getDaysInMonth(f.getFullYear(), f.getMonth())), this._isInRange(a, f) },
            _isInRange: function(a, b) { var c, d, e = this._getMinMaxDate(a, "min"),
                    f = this._getMinMaxDate(a, "max"),
                    g = null,
                    h = null,
                    i = this._get(a, "yearRange"); return i && (c = i.split(":"), d = (new Date).getFullYear(), g = parseInt(c[0], 10), h = parseInt(c[1], 10), c[0].match(/[+\-].*/) && (g += d), c[1].match(/[+\-].*/) && (h += d)), (!e || b.getTime() >= e.getTime()) && (!f || b.getTime() <= f.getTime()) && (!g || b.getFullYear() >= g) && (!h || b.getFullYear() <= h) },
            _getFormatConfig: function(a) { var b = this._get(a, "shortYearCutoff"); return b = "string" != typeof b ? b : (new Date).getFullYear() % 100 + parseInt(b, 10), { shortYearCutoff: b, dayNamesShort: this._get(a, "dayNamesShort"), dayNames: this._get(a, "dayNames"), monthNamesShort: this._get(a, "monthNamesShort"), monthNames: this._get(a, "monthNames") } },
            _formatDate: function(a, b, c, d) { b || (a.currentDay = a.selectedDay, a.currentMonth = a.selectedMonth, a.currentYear = a.selectedYear); var e = b ? "object" == typeof b ? b : this._daylightSavingAdjust(new Date(d, c, b)) : this._daylightSavingAdjust(new Date(a.currentYear, a.currentMonth, a.currentDay)); return this.formatDate(this._get(a, "dateFormat"), e, this._getFormatConfig(a)) }
        }), a.fn.datepicker = function(b) { if (!this.length) return this;
            a.datepicker.initialized || (a(document).on("mousedown", a.datepicker._checkExternalClick), a.datepicker.initialized = !0), 0 === a("#" + a.datepicker._mainDivId).length && a("body").append(a.datepicker.dpDiv); var c = Array.prototype.slice.call(arguments, 1); return "string" != typeof b || "isDisabled" !== b && "getDate" !== b && "widget" !== b ? "option" === b && 2 === arguments.length && "string" == typeof arguments[1] ? a.datepicker["_" + b + "Datepicker"].apply(a.datepicker, [this[0]].concat(c)) : this.each(function() { "string" == typeof b ? a.datepicker["_" + b + "Datepicker"].apply(a.datepicker, [this].concat(c)) : a.datepicker._attachDatepicker(this, b) }) : a.datepicker["_" + b + "Datepicker"].apply(a.datepicker, [this[0]].concat(c)) }, a.datepicker = new d, a.datepicker.initialized = !1, a.datepicker.uuid = (new Date).getTime(), a.datepicker.version = "1.12.0";
        var r = (a.datepicker, a.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), !1);
        a(document).on("mouseup", function() { r = !1 });
        a.widget("ui.mouse", { version: "1.12.0", options: { cancel: "input, textarea, button, select, option", distance: 1, delay: 0 }, _mouseInit: function() { var b = this;
                this.element.on("mousedown." + this.widgetName, function(a) { return b._mouseDown(a) }).on("click." + this.widgetName, function(c) { if (!0 === a.data(c.target, b.widgetName + ".preventClickEvent")) return a.removeData(c.target, b.widgetName + ".preventClickEvent"), c.stopImmediatePropagation(), !1 }), this.started = !1 }, _mouseDestroy: function() { this.element.off("." + this.widgetName), this._mouseMoveDelegate && this.document.off("mousemove." + this.widgetName, this._mouseMoveDelegate).off("mouseup." + this.widgetName, this._mouseUpDelegate) }, _mouseDown: function(b) { if (!r) { this._mouseMoved = !1, this._mouseStarted && this._mouseUp(b), this._mouseDownEvent = b; var c = this,
                        d = 1 === b.which,
                        e = !("string" != typeof this.options.cancel || !b.target.nodeName) && a(b.target).closest(this.options.cancel).length; return !(d && !e && this._mouseCapture(b)) || (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() { c.mouseDelayMet = !0 }, this.options.delay)), this._mouseDistanceMet(b) && this._mouseDelayMet(b) && (this._mouseStarted = this._mouseStart(b) !== !1, !this._mouseStarted) ? (b.preventDefault(), !0) : (!0 === a.data(b.target, this.widgetName + ".preventClickEvent") && a.removeData(b.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(a) { return c._mouseMove(a) }, this._mouseUpDelegate = function(a) { return c._mouseUp(a) }, this.document.on("mousemove." + this.widgetName, this._mouseMoveDelegate).on("mouseup." + this.widgetName, this._mouseUpDelegate), b.preventDefault(), r = !0, !0)) } }, _mouseMove: function(b) { if (this._mouseMoved) { if (a.ui.ie && (!document.documentMode || document.documentMode < 9) && !b.button) return this._mouseUp(b); if (!b.which)
                        if (b.originalEvent.altKey || b.originalEvent.ctrlKey || b.originalEvent.metaKey || b.originalEvent.shiftKey) this.ignoreMissingWhich = !0;
                        else if (!this.ignoreMissingWhich) return this._mouseUp(b) } return (b.which || b.button) && (this._mouseMoved = !0), this._mouseStarted ? (this._mouseDrag(b), b.preventDefault()) : (this._mouseDistanceMet(b) && this._mouseDelayMet(b) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, b) !== !1, this._mouseStarted ? this._mouseDrag(b) : this._mouseUp(b)), !this._mouseStarted) }, _mouseUp: function(b) { this.document.off("mousemove." + this.widgetName, this._mouseMoveDelegate).off("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, b.target === this._mouseDownEvent.target && a.data(b.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(b)), this._mouseDelayTimer && (clearTimeout(this._mouseDelayTimer), delete this._mouseDelayTimer), this.ignoreMissingWhich = !1, r = !1, b.preventDefault() }, _mouseDistanceMet: function(a) { return Math.max(Math.abs(this._mouseDownEvent.pageX - a.pageX), Math.abs(this._mouseDownEvent.pageY - a.pageY)) >= this.options.distance }, _mouseDelayMet: function() { return this.mouseDelayMet }, _mouseStart: function() {}, _mouseDrag: function() {}, _mouseStop: function() {}, _mouseCapture: function() { return !0 } }), a.ui.plugin = { add: function(b, c, d) { var e, f = a.ui[b].prototype; for (e in d) f.plugins[e] = f.plugins[e] || [], f.plugins[e].push([c, d[e]]) }, call: function(a, b, c, d) { var e, f = a.plugins[b]; if (f && (d || a.element[0].parentNode && 11 !== a.element[0].parentNode.nodeType))
                    for (e = 0; e < f.length; e++) a.options[f[e][0]] && f[e][1].apply(a.element, c) } }, a.ui.safeBlur = function(b) { b && "body" !== b.nodeName.toLowerCase() && a(b).trigger("blur") };
        a.widget("ui.draggable", a.ui.mouse, {
            version: "1.12.0",
            widgetEventPrefix: "drag",
            options: { addClasses: !0, appendTo: "parent", axis: !1, connectToSortable: !1, containment: !1, cursor: "auto", cursorAt: !1, grid: !1, handle: !1, helper: "original", iframeFix: !1, opacity: !1, refreshPositions: !1, revert: !1, revertDuration: 500, scope: "default", scroll: !0, scrollSensitivity: 20, scrollSpeed: 20, snap: !1, snapMode: "both", snapTolerance: 20, stack: !1, zIndex: !1, drag: null, start: null, stop: null },
            _create: function() { "original" === this.options.helper && this._setPositionRelative(), this.options.addClasses && this._addClass("ui-draggable"), this._setHandleClassName(), this._mouseInit() },
            _setOption: function(a, b) { this._super(a, b), "handle" === a && (this._removeHandleClassName(), this._setHandleClassName()) },
            _destroy: function() { return (this.helper || this.element).is(".ui-draggable-dragging") ? void(this.destroyOnClear = !0) : (this._removeHandleClassName(), void this._mouseDestroy()) },
            _mouseCapture: function(b) { var c = this.options; return this._blurActiveElement(b), !(this.helper || c.disabled || a(b.target).closest(".ui-resizable-handle").length > 0) && (this.handle = this._getHandle(b), !!this.handle && (this._blockFrames(c.iframeFix === !0 ? "iframe" : c.iframeFix), !0)) },
            _blockFrames: function(b) { this.iframeBlocks = this.document.find(b).map(function() { var b = a(this); return a("<div>").css("position", "absolute").appendTo(b.parent()).outerWidth(b.outerWidth()).outerHeight(b.outerHeight()).offset(b.offset())[0] }) },
            _unblockFrames: function() { this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks) },
            _blurActiveElement: function(b) {
                var c = a.ui.safeActiveElement(this.document[0]),
                    d = a(b.target);
                this._getHandle(b) && d.closest(c).length || a.ui.safeBlur(c);
            },
            _mouseStart: function(b) { var c = this.options; return this.helper = this._createHelper(b), this._addClass(this.helper, "ui-draggable-dragging"), this._cacheHelperProportions(), a.ui.ddmanager && (a.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(!0), this.offsetParent = this.helper.offsetParent(), this.hasFixedAncestor = this.helper.parents().filter(function() { return "fixed" === a(this).css("position") }).length > 0, this.positionAbs = this.element.offset(), this._refreshOffsets(b), this.originalPosition = this.position = this._generatePosition(b, !1), this.originalPageX = b.pageX, this.originalPageY = b.pageY, c.cursorAt && this._adjustOffsetFromHelper(c.cursorAt), this._setContainment(), this._trigger("start", b) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), a.ui.ddmanager && !c.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b), this._mouseDrag(b, !0), a.ui.ddmanager && a.ui.ddmanager.dragStart(this, b), !0) },
            _refreshOffsets: function(a) { this.offset = { top: this.positionAbs.top - this.margins.top, left: this.positionAbs.left - this.margins.left, scroll: !1, parent: this._getParentOffset(), relative: this._getRelativeOffset() }, this.offset.click = { left: a.pageX - this.offset.left, top: a.pageY - this.offset.top } },
            _mouseDrag: function(b, c) { if (this.hasFixedAncestor && (this.offset.parent = this._getParentOffset()), this.position = this._generatePosition(b, !0), this.positionAbs = this._convertPositionTo("absolute"), !c) { var d = this._uiHash(); if (this._trigger("drag", b, d) === !1) return this._mouseUp(new a.Event("mouseup", b)), !1;
                    this.position = d.position } return this.helper[0].style.left = this.position.left + "px", this.helper[0].style.top = this.position.top + "px", a.ui.ddmanager && a.ui.ddmanager.drag(this, b), !1 },
            _mouseStop: function(b) { var c = this,
                    d = !1; return a.ui.ddmanager && !this.options.dropBehaviour && (d = a.ui.ddmanager.drop(this, b)), this.dropped && (d = this.dropped, this.dropped = !1), "invalid" === this.options.revert && !d || "valid" === this.options.revert && d || this.options.revert === !0 || a.isFunction(this.options.revert) && this.options.revert.call(this.element, d) ? a(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() { c._trigger("stop", b) !== !1 && c._clear() }) : this._trigger("stop", b) !== !1 && this._clear(), !1 },
            _mouseUp: function(b) { return this._unblockFrames(), a.ui.ddmanager && a.ui.ddmanager.dragStop(this, b), this.handleElement.is(b.target) && this.element.trigger("focus"), a.ui.mouse.prototype._mouseUp.call(this, b) },
            cancel: function() { return this.helper.is(".ui-draggable-dragging") ? this._mouseUp(new a.Event("mouseup", { target: this.element[0] })) : this._clear(), this },
            _getHandle: function(b) { return !this.options.handle || !!a(b.target).closest(this.element.find(this.options.handle)).length },
            _setHandleClassName: function() { this.handleElement = this.options.handle ? this.element.find(this.options.handle) : this.element, this._addClass(this.handleElement, "ui-draggable-handle") },
            _removeHandleClassName: function() { this._removeClass(this.handleElement, "ui-draggable-handle") },
            _createHelper: function(b) { var c = this.options,
                    d = a.isFunction(c.helper),
                    e = d ? a(c.helper.apply(this.element[0], [b])) : "clone" === c.helper ? this.element.clone().removeAttr("id") : this.element; return e.parents("body").length || e.appendTo("parent" === c.appendTo ? this.element[0].parentNode : c.appendTo), d && e[0] === this.element[0] && this._setPositionRelative(), e[0] === this.element[0] || /(fixed|absolute)/.test(e.css("position")) || e.css("position", "absolute"), e },
            _setPositionRelative: function() { /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative") },
            _adjustOffsetFromHelper: function(b) { "string" == typeof b && (b = b.split(" ")), a.isArray(b) && (b = { left: +b[0], top: +b[1] || 0 }), "left" in b && (this.offset.click.left = b.left + this.margins.left), "right" in b && (this.offset.click.left = this.helperProportions.width - b.right + this.margins.left), "top" in b && (this.offset.click.top = b.top + this.margins.top), "bottom" in b && (this.offset.click.top = this.helperProportions.height - b.bottom + this.margins.top) },
            _isRootNode: function(a) { return /(html|body)/i.test(a.tagName) || a === this.document[0] },
            _getParentOffset: function() { var b = this.offsetParent.offset(),
                    c = this.document[0]; return "absolute" === this.cssPosition && this.scrollParent[0] !== c && a.contains(this.scrollParent[0], this.offsetParent[0]) && (b.left += this.scrollParent.scrollLeft(), b.top += this.scrollParent.scrollTop()), this._isRootNode(this.offsetParent[0]) && (b = { top: 0, left: 0 }), { top: b.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0), left: b.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0) } },
            _getRelativeOffset: function() { if ("relative" !== this.cssPosition) return { top: 0, left: 0 }; var a = this.element.position(),
                    b = this._isRootNode(this.scrollParent[0]); return { top: a.top - (parseInt(this.helper.css("top"), 10) || 0) + (b ? 0 : this.scrollParent.scrollTop()), left: a.left - (parseInt(this.helper.css("left"), 10) || 0) + (b ? 0 : this.scrollParent.scrollLeft()) } },
            _cacheMargins: function() { this.margins = { left: parseInt(this.element.css("marginLeft"), 10) || 0, top: parseInt(this.element.css("marginTop"), 10) || 0, right: parseInt(this.element.css("marginRight"), 10) || 0, bottom: parseInt(this.element.css("marginBottom"), 10) || 0 } },
            _cacheHelperProportions: function() { this.helperProportions = { width: this.helper.outerWidth(), height: this.helper.outerHeight() } },
            _setContainment: function() { var b, c, d, e = this.options,
                    f = this.document[0]; return this.relativeContainer = null, e.containment ? "window" === e.containment ? void(this.containment = [a(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, a(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, a(window).scrollLeft() + a(window).width() - this.helperProportions.width - this.margins.left, a(window).scrollTop() + (a(window).height() || f.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]) : "document" === e.containment ? void(this.containment = [0, 0, a(f).width() - this.helperProportions.width - this.margins.left, (a(f).height() || f.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]) : e.containment.constructor === Array ? void(this.containment = e.containment) : ("parent" === e.containment && (e.containment = this.helper[0].parentNode), c = a(e.containment), d = c[0], void(d && (b = /(scroll|auto)/.test(c.css("overflow")), this.containment = [(parseInt(c.css("borderLeftWidth"), 10) || 0) + (parseInt(c.css("paddingLeft"), 10) || 0), (parseInt(c.css("borderTopWidth"), 10) || 0) + (parseInt(c.css("paddingTop"), 10) || 0), (b ? Math.max(d.scrollWidth, d.offsetWidth) : d.offsetWidth) - (parseInt(c.css("borderRightWidth"), 10) || 0) - (parseInt(c.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (b ? Math.max(d.scrollHeight, d.offsetHeight) : d.offsetHeight) - (parseInt(c.css("borderBottomWidth"), 10) || 0) - (parseInt(c.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relativeContainer = c))) : void(this.containment = null) },
            _convertPositionTo: function(a, b) { b || (b = this.position); var c = "absolute" === a ? 1 : -1,
                    d = this._isRootNode(this.scrollParent[0]); return { top: b.top + this.offset.relative.top * c + this.offset.parent.top * c - ("fixed" === this.cssPosition ? -this.offset.scroll.top : d ? 0 : this.offset.scroll.top) * c, left: b.left + this.offset.relative.left * c + this.offset.parent.left * c - ("fixed" === this.cssPosition ? -this.offset.scroll.left : d ? 0 : this.offset.scroll.left) * c } },
            _generatePosition: function(a, b) { var c, d, e, f, g = this.options,
                    h = this._isRootNode(this.scrollParent[0]),
                    i = a.pageX,
                    j = a.pageY; return h && this.offset.scroll || (this.offset.scroll = { top: this.scrollParent.scrollTop(), left: this.scrollParent.scrollLeft() }), b && (this.containment && (this.relativeContainer ? (d = this.relativeContainer.offset(), c = [this.containment[0] + d.left, this.containment[1] + d.top, this.containment[2] + d.left, this.containment[3] + d.top]) : c = this.containment, a.pageX - this.offset.click.left < c[0] && (i = c[0] + this.offset.click.left), a.pageY - this.offset.click.top < c[1] && (j = c[1] + this.offset.click.top), a.pageX - this.offset.click.left > c[2] && (i = c[2] + this.offset.click.left), a.pageY - this.offset.click.top > c[3] && (j = c[3] + this.offset.click.top)), g.grid && (e = g.grid[1] ? this.originalPageY + Math.round((j - this.originalPageY) / g.grid[1]) * g.grid[1] : this.originalPageY, j = c ? e - this.offset.click.top >= c[1] || e - this.offset.click.top > c[3] ? e : e - this.offset.click.top >= c[1] ? e - g.grid[1] : e + g.grid[1] : e, f = g.grid[0] ? this.originalPageX + Math.round((i - this.originalPageX) / g.grid[0]) * g.grid[0] : this.originalPageX, i = c ? f - this.offset.click.left >= c[0] || f - this.offset.click.left > c[2] ? f : f - this.offset.click.left >= c[0] ? f - g.grid[0] : f + g.grid[0] : f), "y" === g.axis && (i = this.originalPageX), "x" === g.axis && (j = this.originalPageY)), { top: j - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.offset.scroll.top : h ? 0 : this.offset.scroll.top), left: i - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.offset.scroll.left : h ? 0 : this.offset.scroll.left) } },
            _clear: function() { this._removeClass(this.helper, "ui-draggable-dragging"), this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1, this.destroyOnClear && this.destroy() },
            _trigger: function(b, c, d) { return d = d || this._uiHash(), a.ui.plugin.call(this, b, [c, d, this], !0), /^(drag|start|stop)/.test(b) && (this.positionAbs = this._convertPositionTo("absolute"), d.offset = this.positionAbs), a.Widget.prototype._trigger.call(this, b, c, d) },
            plugins: {},
            _uiHash: function() { return { helper: this.helper, position: this.position, originalPosition: this.originalPosition, offset: this.positionAbs } }
        }), a.ui.plugin.add("draggable", "connectToSortable", { start: function(b, c, d) { var e = a.extend({}, c, { item: d.element });
                d.sortables = [], a(d.options.connectToSortable).each(function() { var c = a(this).sortable("instance");
                    c && !c.options.disabled && (d.sortables.push(c), c.refreshPositions(), c._trigger("activate", b, e)) }) }, stop: function(b, c, d) { var e = a.extend({}, c, { item: d.element });
                d.cancelHelperRemoval = !1, a.each(d.sortables, function() { var a = this;
                    a.isOver ? (a.isOver = 0, d.cancelHelperRemoval = !0, a.cancelHelperRemoval = !1, a._storedCSS = { position: a.placeholder.css("position"), top: a.placeholder.css("top"), left: a.placeholder.css("left") }, a._mouseStop(b), a.options.helper = a.options._helper) : (a.cancelHelperRemoval = !0, a._trigger("deactivate", b, e)) }) }, drag: function(b, c, d) { a.each(d.sortables, function() { var e = !1,
                        f = this;
                    f.positionAbs = d.positionAbs, f.helperProportions = d.helperProportions, f.offset.click = d.offset.click, f._intersectsWith(f.containerCache) && (e = !0, a.each(d.sortables, function() { return this.positionAbs = d.positionAbs, this.helperProportions = d.helperProportions, this.offset.click = d.offset.click, this !== f && this._intersectsWith(this.containerCache) && a.contains(f.element[0], this.element[0]) && (e = !1), e })), e ? (f.isOver || (f.isOver = 1, d._parent = c.helper.parent(), f.currentItem = c.helper.appendTo(f.element).data("ui-sortable-item", !0), f.options._helper = f.options.helper, f.options.helper = function() { return c.helper[0] }, b.target = f.currentItem[0], f._mouseCapture(b, !0), f._mouseStart(b, !0, !0), f.offset.click.top = d.offset.click.top, f.offset.click.left = d.offset.click.left, f.offset.parent.left -= d.offset.parent.left - f.offset.parent.left, f.offset.parent.top -= d.offset.parent.top - f.offset.parent.top, d._trigger("toSortable", b), d.dropped = f.element, a.each(d.sortables, function() { this.refreshPositions() }), d.currentItem = d.element, f.fromOutside = d), f.currentItem && (f._mouseDrag(b), c.position = f.position)) : f.isOver && (f.isOver = 0, f.cancelHelperRemoval = !0, f.options._revert = f.options.revert, f.options.revert = !1, f._trigger("out", b, f._uiHash(f)), f._mouseStop(b, !0), f.options.revert = f.options._revert, f.options.helper = f.options._helper, f.placeholder && f.placeholder.remove(), c.helper.appendTo(d._parent), d._refreshOffsets(b), c.position = d._generatePosition(b, !0), d._trigger("fromSortable", b), d.dropped = !1, a.each(d.sortables, function() { this.refreshPositions() })) }) } }), a.ui.plugin.add("draggable", "cursor", { start: function(b, c, d) { var e = a("body"),
                    f = d.options;
                e.css("cursor") && (f._cursor = e.css("cursor")), e.css("cursor", f.cursor) }, stop: function(b, c, d) { var e = d.options;
                e._cursor && a("body").css("cursor", e._cursor) } }), a.ui.plugin.add("draggable", "opacity", { start: function(b, c, d) { var e = a(c.helper),
                    f = d.options;
                e.css("opacity") && (f._opacity = e.css("opacity")), e.css("opacity", f.opacity) }, stop: function(b, c, d) { var e = d.options;
                e._opacity && a(c.helper).css("opacity", e._opacity) } }), a.ui.plugin.add("draggable", "scroll", { start: function(a, b, c) { c.scrollParentNotHidden || (c.scrollParentNotHidden = c.helper.scrollParent(!1)), c.scrollParentNotHidden[0] !== c.document[0] && "HTML" !== c.scrollParentNotHidden[0].tagName && (c.overflowOffset = c.scrollParentNotHidden.offset()) }, drag: function(b, c, d) { var e = d.options,
                    f = !1,
                    g = d.scrollParentNotHidden[0],
                    h = d.document[0];
                g !== h && "HTML" !== g.tagName ? (e.axis && "x" === e.axis || (d.overflowOffset.top + g.offsetHeight - b.pageY < e.scrollSensitivity ? g.scrollTop = f = g.scrollTop + e.scrollSpeed : b.pageY - d.overflowOffset.top < e.scrollSensitivity && (g.scrollTop = f = g.scrollTop - e.scrollSpeed)), e.axis && "y" === e.axis || (d.overflowOffset.left + g.offsetWidth - b.pageX < e.scrollSensitivity ? g.scrollLeft = f = g.scrollLeft + e.scrollSpeed : b.pageX - d.overflowOffset.left < e.scrollSensitivity && (g.scrollLeft = f = g.scrollLeft - e.scrollSpeed))) : (e.axis && "x" === e.axis || (b.pageY - a(h).scrollTop() < e.scrollSensitivity ? f = a(h).scrollTop(a(h).scrollTop() - e.scrollSpeed) : a(window).height() - (b.pageY - a(h).scrollTop()) < e.scrollSensitivity && (f = a(h).scrollTop(a(h).scrollTop() + e.scrollSpeed))), e.axis && "y" === e.axis || (b.pageX - a(h).scrollLeft() < e.scrollSensitivity ? f = a(h).scrollLeft(a(h).scrollLeft() - e.scrollSpeed) : a(window).width() - (b.pageX - a(h).scrollLeft()) < e.scrollSensitivity && (f = a(h).scrollLeft(a(h).scrollLeft() + e.scrollSpeed)))), f !== !1 && a.ui.ddmanager && !e.dropBehaviour && a.ui.ddmanager.prepareOffsets(d, b) } }), a.ui.plugin.add("draggable", "snap", { start: function(b, c, d) { var e = d.options;
                d.snapElements = [], a(e.snap.constructor !== String ? e.snap.items || ":data(ui-draggable)" : e.snap).each(function() { var b = a(this),
                        c = b.offset();
                    this !== d.element[0] && d.snapElements.push({ item: this, width: b.outerWidth(), height: b.outerHeight(), top: c.top, left: c.left }) }) }, drag: function(b, c, d) { var e, f, g, h, i, j, k, l, m, n, o = d.options,
                    p = o.snapTolerance,
                    q = c.offset.left,
                    r = q + d.helperProportions.width,
                    s = c.offset.top,
                    t = s + d.helperProportions.height; for (m = d.snapElements.length - 1; m >= 0; m--) i = d.snapElements[m].left - d.margins.left, j = i + d.snapElements[m].width, k = d.snapElements[m].top - d.margins.top, l = k + d.snapElements[m].height, r < i - p || q > j + p || t < k - p || s > l + p || !a.contains(d.snapElements[m].item.ownerDocument, d.snapElements[m].item) ? (d.snapElements[m].snapping && d.options.snap.release && d.options.snap.release.call(d.element, b, a.extend(d._uiHash(), { snapItem: d.snapElements[m].item })), d.snapElements[m].snapping = !1) : ("inner" !== o.snapMode && (e = Math.abs(k - t) <= p, f = Math.abs(l - s) <= p, g = Math.abs(i - r) <= p, h = Math.abs(j - q) <= p, e && (c.position.top = d._convertPositionTo("relative", { top: k - d.helperProportions.height, left: 0 }).top), f && (c.position.top = d._convertPositionTo("relative", { top: l, left: 0 }).top), g && (c.position.left = d._convertPositionTo("relative", { top: 0, left: i - d.helperProportions.width }).left), h && (c.position.left = d._convertPositionTo("relative", { top: 0, left: j }).left)), n = e || f || g || h, "outer" !== o.snapMode && (e = Math.abs(k - s) <= p, f = Math.abs(l - t) <= p, g = Math.abs(i - q) <= p, h = Math.abs(j - r) <= p, e && (c.position.top = d._convertPositionTo("relative", { top: k, left: 0 }).top), f && (c.position.top = d._convertPositionTo("relative", { top: l - d.helperProportions.height, left: 0 }).top), g && (c.position.left = d._convertPositionTo("relative", { top: 0, left: i }).left), h && (c.position.left = d._convertPositionTo("relative", { top: 0, left: j - d.helperProportions.width }).left)), !d.snapElements[m].snapping && (e || f || g || h || n) && d.options.snap.snap && d.options.snap.snap.call(d.element, b, a.extend(d._uiHash(), { snapItem: d.snapElements[m].item })), d.snapElements[m].snapping = e || f || g || h || n) } }), a.ui.plugin.add("draggable", "stack", { start: function(b, c, d) { var e, f = d.options,
                    g = a.makeArray(a(f.stack)).sort(function(b, c) { return (parseInt(a(b).css("zIndex"), 10) || 0) - (parseInt(a(c).css("zIndex"), 10) || 0) });
                g.length && (e = parseInt(a(g[0]).css("zIndex"), 10) || 0, a(g).each(function(b) { a(this).css("zIndex", e + b) }), this.css("zIndex", e + g.length)) } }), a.ui.plugin.add("draggable", "zIndex", { start: function(b, c, d) { var e = a(c.helper),
                    f = d.options;
                e.css("zIndex") && (f._zIndex = e.css("zIndex")), e.css("zIndex", f.zIndex) }, stop: function(b, c, d) { var e = d.options;
                e._zIndex && a(c.helper).css("zIndex", e._zIndex) } });
        a.ui.draggable;
        a.widget("ui.resizable", a.ui.mouse, { version: "1.12.0", widgetEventPrefix: "resize", options: { alsoResize: !1, animate: !1, animateDuration: "slow", animateEasing: "swing", aspectRatio: !1, autoHide: !1, classes: { "ui-resizable-se": "ui-icon ui-icon-gripsmall-diagonal-se" }, containment: !1, ghost: !1, grid: !1, handles: "e,s,se", helper: !1, maxHeight: null, maxWidth: null, minHeight: 10, minWidth: 10, zIndex: 90, resize: null, start: null, stop: null }, _num: function(a) { return parseFloat(a) || 0 }, _isNumber: function(a) { return !isNaN(parseFloat(a)) }, _hasScroll: function(b, c) { if ("hidden" === a(b).css("overflow")) return !1; var d = c && "left" === c ? "scrollLeft" : "scrollTop",
                    e = !1; return b[d] > 0 || (b[d] = 1, e = b[d] > 0, b[d] = 0, e) }, _create: function() { var b, c = this.options,
                    d = this;
                this._addClass("ui-resizable"), a.extend(this, { _aspectRatio: !!c.aspectRatio, aspectRatio: c.aspectRatio, originalElement: this.element, _proportionallyResizeElements: [], _helper: c.helper || c.ghost || c.animate ? c.helper || "ui-resizable-helper" : null }), this.element[0].nodeName.match(/^(canvas|textarea|input|select|button|img)$/i) && (this.element.wrap(a("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({ position: this.element.css("position"), width: this.element.outerWidth(), height: this.element.outerHeight(), top: this.element.css("top"), left: this.element.css("left") })), this.element = this.element.parent().data("ui-resizable", this.element.resizable("instance")), this.elementIsWrapper = !0, b = { marginTop: this.originalElement.css("marginTop"), marginRight: this.originalElement.css("marginRight"), marginBottom: this.originalElement.css("marginBottom"), marginLeft: this.originalElement.css("marginLeft") }, this.element.css(b), this.originalElement.css("margin", 0), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({ position: "static", zoom: 1, display: "block" })), this.originalElement.css(b), this._proportionallyResize()), this._setupHandles(), c.autoHide && a(this.element).on("mouseenter", function() { c.disabled || (d._removeClass("ui-resizable-autohide"), d._handles.show()) }).on("mouseleave", function() { c.disabled || d.resizing || (d._addClass("ui-resizable-autohide"), d._handles.hide()) }), this._mouseInit() }, _destroy: function() { this._mouseDestroy(); var b, c = function(b) { a(b).removeData("resizable").removeData("ui-resizable").off(".resizable").find(".ui-resizable-handle").remove() }; return this.elementIsWrapper && (c(this.element), b = this.element, this.originalElement.css({ position: b.css("position"), width: b.outerWidth(), height: b.outerHeight(), top: b.css("top"), left: b.css("left") }).insertAfter(b), b.remove()), this.originalElement.css("resize", this.originalResizeStyle), c(this.originalElement), this }, _setOption: function(a, b) { switch (this._super(a, b), a) {
                    case "handles":
                        this._removeHandles(), this._setupHandles() } }, _setupHandles: function() { var b, c, d, e, f, g = this.options,
                    h = this; if (this.handles = g.handles || (a(".ui-resizable-handle", this.element).length ? { n: ".ui-resizable-n", e: ".ui-resizable-e", s: ".ui-resizable-s", w: ".ui-resizable-w", se: ".ui-resizable-se", sw: ".ui-resizable-sw", ne: ".ui-resizable-ne", nw: ".ui-resizable-nw" } : "e,s,se"), this._handles = a(), this.handles.constructor === String)
                    for ("all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"), d = this.handles.split(","), this.handles = {}, c = 0; c < d.length; c++) b = a.trim(d[c]), e = "ui-resizable-" + b, f = a("<div>"), this._addClass(f, "ui-resizable-handle " + e), f.css({ zIndex: g.zIndex }), this.handles[b] = ".ui-resizable-" + b, this.element.append(f);
                this._renderAxis = function(b) { var c, d, e, f;
                    b = b || this.element; for (c in this.handles) this.handles[c].constructor === String ? this.handles[c] = this.element.children(this.handles[c]).first().show() : (this.handles[c].jquery || this.handles[c].nodeType) && (this.handles[c] = a(this.handles[c]), this._on(this.handles[c], { mousedown: h._mouseDown })), this.elementIsWrapper && this.originalElement[0].nodeName.match(/^(textarea|input|select|button)$/i) && (d = a(this.handles[c], this.element), f = /sw|ne|nw|se|n|s/.test(c) ? d.outerHeight() : d.outerWidth(), e = ["padding", /ne|nw|n/.test(c) ? "Top" : /se|sw|s/.test(c) ? "Bottom" : /^e$/.test(c) ? "Right" : "Left"].join(""), b.css(e, f), this._proportionallyResize()), this._handles = this._handles.add(this.handles[c]) }, this._renderAxis(this.element), this._handles = this._handles.add(this.element.find(".ui-resizable-handle")), this._handles.disableSelection(), this._handles.on("mouseover", function() { h.resizing || (this.className && (f = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)), h.axis = f && f[1] ? f[1] : "se") }), g.autoHide && (this._handles.hide(), this._addClass("ui-resizable-autohide")) }, _removeHandles: function() { this._handles.remove() }, _mouseCapture: function(b) { var c, d, e = !1; for (c in this.handles) d = a(this.handles[c])[0], (d === b.target || a.contains(d, b.target)) && (e = !0); return !this.options.disabled && e }, _mouseStart: function(b) { var c, d, e, f = this.options,
                    g = this.element; return this.resizing = !0, this._renderProxy(), c = this._num(this.helper.css("left")), d = this._num(this.helper.css("top")), f.containment && (c += a(f.containment).scrollLeft() || 0, d += a(f.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = { left: c, top: d }, this.size = this._helper ? { width: this.helper.width(), height: this.helper.height() } : { width: g.width(), height: g.height() }, this.originalSize = this._helper ? { width: g.outerWidth(), height: g.outerHeight() } : { width: g.width(), height: g.height() }, this.sizeDiff = { width: g.outerWidth() - g.width(), height: g.outerHeight() - g.height() }, this.originalPosition = { left: c, top: d }, this.originalMousePosition = { left: b.pageX, top: b.pageY }, this.aspectRatio = "number" == typeof f.aspectRatio ? f.aspectRatio : this.originalSize.width / this.originalSize.height || 1, e = a(".ui-resizable-" + this.axis).css("cursor"), a("body").css("cursor", "auto" === e ? this.axis + "-resize" : e), this._addClass("ui-resizable-resizing"), this._propagate("start", b), !0 }, _mouseDrag: function(b) { var c, d, e = this.originalMousePosition,
                    f = this.axis,
                    g = b.pageX - e.left || 0,
                    h = b.pageY - e.top || 0,
                    i = this._change[f]; return this._updatePrevProperties(), !!i && (c = i.apply(this, [b, g, h]), this._updateVirtualBoundaries(b.shiftKey), (this._aspectRatio || b.shiftKey) && (c = this._updateRatio(c, b)), c = this._respectSize(c, b), this._updateCache(c), this._propagate("resize", b), d = this._applyChanges(), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), a.isEmptyObject(d) || (this._updatePrevProperties(), this._trigger("resize", b, this.ui()), this._applyChanges()), !1) }, _mouseStop: function(b) { this.resizing = !1; var c, d, e, f, g, h, i, j = this.options,
                    k = this; return this._helper && (c = this._proportionallyResizeElements, d = c.length && /textarea/i.test(c[0].nodeName), e = d && this._hasScroll(c[0], "left") ? 0 : k.sizeDiff.height, f = d ? 0 : k.sizeDiff.width, g = { width: k.helper.width() - f, height: k.helper.height() - e }, h = parseFloat(k.element.css("left")) + (k.position.left - k.originalPosition.left) || null, i = parseFloat(k.element.css("top")) + (k.position.top - k.originalPosition.top) || null, j.animate || this.element.css(a.extend(g, { top: i, left: h })), k.helper.height(k.size.height), k.helper.width(k.size.width), this._helper && !j.animate && this._proportionallyResize()), a("body").css("cursor", "auto"), this._removeClass("ui-resizable-resizing"), this._propagate("stop", b), this._helper && this.helper.remove(), !1 }, _updatePrevProperties: function() { this.prevPosition = { top: this.position.top, left: this.position.left }, this.prevSize = { width: this.size.width, height: this.size.height } }, _applyChanges: function() { var a = {}; return this.position.top !== this.prevPosition.top && (a.top = this.position.top + "px"), this.position.left !== this.prevPosition.left && (a.left = this.position.left + "px"), this.size.width !== this.prevSize.width && (a.width = this.size.width + "px"), this.size.height !== this.prevSize.height && (a.height = this.size.height + "px"), this.helper.css(a), a }, _updateVirtualBoundaries: function(a) { var b, c, d, e, f, g = this.options;
                f = { minWidth: this._isNumber(g.minWidth) ? g.minWidth : 0, maxWidth: this._isNumber(g.maxWidth) ? g.maxWidth : 1 / 0, minHeight: this._isNumber(g.minHeight) ? g.minHeight : 0, maxHeight: this._isNumber(g.maxHeight) ? g.maxHeight : 1 / 0 }, (this._aspectRatio || a) && (b = f.minHeight * this.aspectRatio, d = f.minWidth / this.aspectRatio, c = f.maxHeight * this.aspectRatio, e = f.maxWidth / this.aspectRatio, b > f.minWidth && (f.minWidth = b), d > f.minHeight && (f.minHeight = d), c < f.maxWidth && (f.maxWidth = c), e < f.maxHeight && (f.maxHeight = e)), this._vBoundaries = f }, _updateCache: function(a) { this.offset = this.helper.offset(), this._isNumber(a.left) && (this.position.left = a.left), this._isNumber(a.top) && (this.position.top = a.top), this._isNumber(a.height) && (this.size.height = a.height), this._isNumber(a.width) && (this.size.width = a.width) }, _updateRatio: function(a) { var b = this.position,
                    c = this.size,
                    d = this.axis; return this._isNumber(a.height) ? a.width = a.height * this.aspectRatio : this._isNumber(a.width) && (a.height = a.width / this.aspectRatio), "sw" === d && (a.left = b.left + (c.width - a.width), a.top = null), "nw" === d && (a.top = b.top + (c.height - a.height), a.left = b.left + (c.width - a.width)), a }, _respectSize: function(a) { var b = this._vBoundaries,
                    c = this.axis,
                    d = this._isNumber(a.width) && b.maxWidth && b.maxWidth < a.width,
                    e = this._isNumber(a.height) && b.maxHeight && b.maxHeight < a.height,
                    f = this._isNumber(a.width) && b.minWidth && b.minWidth > a.width,
                    g = this._isNumber(a.height) && b.minHeight && b.minHeight > a.height,
                    h = this.originalPosition.left + this.originalSize.width,
                    i = this.originalPosition.top + this.originalSize.height,
                    j = /sw|nw|w/.test(c),
                    k = /nw|ne|n/.test(c); return f && (a.width = b.minWidth), g && (a.height = b.minHeight), d && (a.width = b.maxWidth), e && (a.height = b.maxHeight), f && j && (a.left = h - b.minWidth), d && j && (a.left = h - b.maxWidth), g && k && (a.top = i - b.minHeight), e && k && (a.top = i - b.maxHeight), a.width || a.height || a.left || !a.top ? a.width || a.height || a.top || !a.left || (a.left = null) : a.top = null, a }, _getPaddingPlusBorderDimensions: function(a) { for (var b = 0, c = [], d = [a.css("borderTopWidth"), a.css("borderRightWidth"), a.css("borderBottomWidth"), a.css("borderLeftWidth")], e = [a.css("paddingTop"), a.css("paddingRight"), a.css("paddingBottom"), a.css("paddingLeft")]; b < 4; b++) c[b] = parseFloat(d[b]) || 0, c[b] += parseFloat(e[b]) || 0; return { height: c[0] + c[2], width: c[1] + c[3] } }, _proportionallyResize: function() { if (this._proportionallyResizeElements.length)
                    for (var a, b = 0, c = this.helper || this.element; b < this._proportionallyResizeElements.length; b++) a = this._proportionallyResizeElements[b], this.outerDimensions || (this.outerDimensions = this._getPaddingPlusBorderDimensions(a)), a.css({ height: c.height() - this.outerDimensions.height || 0, width: c.width() - this.outerDimensions.width || 0 }) }, _renderProxy: function() { var b = this.element,
                    c = this.options;
                this.elementOffset = b.offset(), this._helper ? (this.helper = this.helper || a("<div style='overflow:hidden;'></div>"), this._addClass(this.helper, this._helper), this.helper.css({ width: this.element.outerWidth(), height: this.element.outerHeight(), position: "absolute", left: this.elementOffset.left + "px", top: this.elementOffset.top + "px", zIndex: ++c.zIndex }), this.helper.appendTo("body").disableSelection()) : this.helper = this.element }, _change: { e: function(a, b) { return { width: this.originalSize.width + b } }, w: function(a, b) { var c = this.originalSize,
                        d = this.originalPosition; return { left: d.left + b, width: c.width - b } }, n: function(a, b, c) { var d = this.originalSize,
                        e = this.originalPosition; return { top: e.top + c, height: d.height - c } }, s: function(a, b, c) { return { height: this.originalSize.height + c } }, se: function(b, c, d) { return a.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [b, c, d])) }, sw: function(b, c, d) { return a.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [b, c, d])) }, ne: function(b, c, d) { return a.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [b, c, d])) }, nw: function(b, c, d) { return a.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [b, c, d])) } }, _propagate: function(b, c) { a.ui.plugin.call(this, b, [c, this.ui()]), "resize" !== b && this._trigger(b, c, this.ui()) }, plugins: {}, ui: function() { return { originalElement: this.originalElement, element: this.element, helper: this.helper, position: this.position, size: this.size, originalSize: this.originalSize, originalPosition: this.originalPosition } } }), a.ui.plugin.add("resizable", "animate", { stop: function(b) { var c = a(this).resizable("instance"),
                    d = c.options,
                    e = c._proportionallyResizeElements,
                    f = e.length && /textarea/i.test(e[0].nodeName),
                    g = f && c._hasScroll(e[0], "left") ? 0 : c.sizeDiff.height,
                    h = f ? 0 : c.sizeDiff.width,
                    i = { width: c.size.width - h, height: c.size.height - g },
                    j = parseFloat(c.element.css("left")) + (c.position.left - c.originalPosition.left) || null,
                    k = parseFloat(c.element.css("top")) + (c.position.top - c.originalPosition.top) || null;
                c.element.animate(a.extend(i, k && j ? { top: k, left: j } : {}), { duration: d.animateDuration, easing: d.animateEasing, step: function() { var d = { width: parseFloat(c.element.css("width")), height: parseFloat(c.element.css("height")), top: parseFloat(c.element.css("top")), left: parseFloat(c.element.css("left")) };
                        e && e.length && a(e[0]).css({ width: d.width, height: d.height }), c._updateCache(d), c._propagate("resize", b) } }) } }), a.ui.plugin.add("resizable", "containment", {
            start: function() { var b, c, d, e, f, g, h, i = a(this).resizable("instance"),
                    j = i.options,
                    k = i.element,
                    l = j.containment,
                    m = l instanceof a ? l.get(0) : /parent/.test(l) ? k.parent().get(0) : l;
                m && (i.containerElement = a(m), /document/.test(l) || l === document ? (i.containerOffset = { left: 0, top: 0 }, i.containerPosition = { left: 0, top: 0 }, i.parentData = { element: a(document), left: 0, top: 0, width: a(document).width(), height: a(document).height() || document.body.parentNode.scrollHeight }) : (b = a(m), c = [], a(["Top", "Right", "Left", "Bottom"]).each(function(a, d) { c[a] = i._num(b.css("padding" + d)) }), i.containerOffset = b.offset(), i.containerPosition = b.position(), i.containerSize = { height: b.innerHeight() - c[3], width: b.innerWidth() - c[1] }, d = i.containerOffset, e = i.containerSize.height, f = i.containerSize.width, g = i._hasScroll(m, "left") ? m.scrollWidth : f, h = i._hasScroll(m) ? m.scrollHeight : e, i.parentData = { element: m, left: d.left, top: d.top, width: g, height: h })) },
            resize: function(b) { var c, d, e, f, g = a(this).resizable("instance"),
                    h = g.options,
                    i = g.containerOffset,
                    j = g.position,
                    k = g._aspectRatio || b.shiftKey,
                    l = { top: 0, left: 0 },
                    m = g.containerElement,
                    n = !0;
                m[0] !== document && /static/.test(m.css("position")) && (l = i), j.left < (g._helper ? i.left : 0) && (g.size.width = g.size.width + (g._helper ? g.position.left - i.left : g.position.left - l.left), k && (g.size.height = g.size.width / g.aspectRatio, n = !1), g.position.left = h.helper ? i.left : 0), j.top < (g._helper ? i.top : 0) && (g.size.height = g.size.height + (g._helper ? g.position.top - i.top : g.position.top), k && (g.size.width = g.size.height * g.aspectRatio, n = !1), g.position.top = g._helper ? i.top : 0), e = g.containerElement.get(0) === g.element.parent().get(0), f = /relative|absolute/.test(g.containerElement.css("position")), e && f ? (g.offset.left = g.parentData.left + g.position.left, g.offset.top = g.parentData.top + g.position.top) : (g.offset.left = g.element.offset().left, g.offset.top = g.element.offset().top), c = Math.abs(g.sizeDiff.width + (g._helper ? g.offset.left - l.left : g.offset.left - i.left)), d = Math.abs(g.sizeDiff.height + (g._helper ? g.offset.top - l.top : g.offset.top - i.top)), c + g.size.width >= g.parentData.width && (g.size.width = g.parentData.width - c, k && (g.size.height = g.size.width / g.aspectRatio, n = !1)), d + g.size.height >= g.parentData.height && (g.size.height = g.parentData.height - d, k && (g.size.width = g.size.height * g.aspectRatio, n = !1)), n || (g.position.left = g.prevPosition.left, g.position.top = g.prevPosition.top, g.size.width = g.prevSize.width, g.size.height = g.prevSize.height) },
            stop: function() {
                var b = a(this).resizable("instance"),
                    c = b.options,
                    d = b.containerOffset,
                    e = b.containerPosition,
                    f = b.containerElement,
                    g = a(b.helper),
                    h = g.offset(),
                    i = g.outerWidth() - b.sizeDiff.width,
                    j = g.outerHeight() - b.sizeDiff.height;
                b._helper && !c.animate && /relative/.test(f.css("position")) && a(this).css({ left: h.left - e.left - d.left, width: i, height: j }), b._helper && !c.animate && /static/.test(f.css("position")) && a(this).css({
                    left: h.left - e.left - d.left,
                    width: i,
                    height: j
                })
            }
        }), a.ui.plugin.add("resizable", "alsoResize", { start: function() { var b = a(this).resizable("instance"),
                    c = b.options;
                a(c.alsoResize).each(function() { var b = a(this);
                    b.data("ui-resizable-alsoresize", { width: parseFloat(b.width()), height: parseFloat(b.height()), left: parseFloat(b.css("left")), top: parseFloat(b.css("top")) }) }) }, resize: function(b, c) { var d = a(this).resizable("instance"),
                    e = d.options,
                    f = d.originalSize,
                    g = d.originalPosition,
                    h = { height: d.size.height - f.height || 0, width: d.size.width - f.width || 0, top: d.position.top - g.top || 0, left: d.position.left - g.left || 0 };
                a(e.alsoResize).each(function() { var b = a(this),
                        d = a(this).data("ui-resizable-alsoresize"),
                        e = {},
                        f = b.parents(c.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                    a.each(f, function(a, b) { var c = (d[b] || 0) + (h[b] || 0);
                        c && c >= 0 && (e[b] = c || null) }), b.css(e) }) }, stop: function() { a(this).removeData("ui-resizable-alsoresize") } }), a.ui.plugin.add("resizable", "ghost", { start: function() { var b = a(this).resizable("instance"),
                    c = b.size;
                b.ghost = b.originalElement.clone(), b.ghost.css({ opacity: .25, display: "block", position: "relative", height: c.height, width: c.width, margin: 0, left: 0, top: 0 }), b._addClass(b.ghost, "ui-resizable-ghost"), a.uiBackCompat !== !1 && "string" == typeof b.options.ghost && b.ghost.addClass(this.options.ghost), b.ghost.appendTo(b.helper) }, resize: function() { var b = a(this).resizable("instance");
                b.ghost && b.ghost.css({ position: "relative", height: b.size.height, width: b.size.width }) }, stop: function() { var b = a(this).resizable("instance");
                b.ghost && b.helper && b.helper.get(0).removeChild(b.ghost.get(0)) } }), a.ui.plugin.add("resizable", "grid", { resize: function() { var b, c = a(this).resizable("instance"),
                    d = c.options,
                    e = c.size,
                    f = c.originalSize,
                    g = c.originalPosition,
                    h = c.axis,
                    i = "number" == typeof d.grid ? [d.grid, d.grid] : d.grid,
                    j = i[0] || 1,
                    k = i[1] || 1,
                    l = Math.round((e.width - f.width) / j) * j,
                    m = Math.round((e.height - f.height) / k) * k,
                    n = f.width + l,
                    o = f.height + m,
                    p = d.maxWidth && d.maxWidth < n,
                    q = d.maxHeight && d.maxHeight < o,
                    r = d.minWidth && d.minWidth > n,
                    s = d.minHeight && d.minHeight > o;
                d.grid = i, r && (n += j), s && (o += k), p && (n -= j), q && (o -= k), /^(se|s|e)$/.test(h) ? (c.size.width = n, c.size.height = o) : /^(ne)$/.test(h) ? (c.size.width = n, c.size.height = o, c.position.top = g.top - m) : /^(sw)$/.test(h) ? (c.size.width = n, c.size.height = o, c.position.left = g.left - l) : ((o - k <= 0 || n - j <= 0) && (b = c._getPaddingPlusBorderDimensions(this)), o - k > 0 ? (c.size.height = o, c.position.top = g.top - m) : (o = k - b.height, c.size.height = o, c.position.top = g.top + f.height - o), n - j > 0 ? (c.size.width = n, c.position.left = g.left - l) : (n = j - b.width, c.size.width = n, c.position.left = g.left + f.width - n)) } });
        a.ui.resizable;
        a.widget("ui.dialog", { version: "1.12.0", options: { appendTo: "body", autoOpen: !0, buttons: [], classes: { "ui-dialog": "ui-corner-all", "ui-dialog-titlebar": "ui-corner-all" }, closeOnEscape: !0, closeText: "Close", draggable: !0, hide: null, height: "auto", maxHeight: null, maxWidth: null, minHeight: 150, minWidth: 150, modal: !1, position: { my: "center", at: "center", of: window, collision: "fit", using: function(b) { var c = a(this).css(b).offset().top;
                        c < 0 && a(this).css("top", b.top - c) } }, resizable: !0, show: null, title: null, width: 300, beforeClose: null, close: null, drag: null, dragStart: null, dragStop: null, focus: null, open: null, resize: null, resizeStart: null, resizeStop: null }, sizeRelatedOptions: { buttons: !0, height: !0, maxHeight: !0, maxWidth: !0, minHeight: !0, minWidth: !0, width: !0 }, resizableRelatedOptions: { maxHeight: !0, maxWidth: !0, minHeight: !0, minWidth: !0 }, _create: function() { this.originalCss = { display: this.element[0].style.display, width: this.element[0].style.width, minHeight: this.element[0].style.minHeight, maxHeight: this.element[0].style.maxHeight, height: this.element[0].style.height }, this.originalPosition = { parent: this.element.parent(), index: this.element.parent().children().index(this.element) }, this.originalTitle = this.element.attr("title"), null == this.options.title && null != this.originalTitle && (this.options.title = this.originalTitle), this.options.disabled && (this.options.disabled = !1), this._createWrapper(), this.element.show().removeAttr("title").appendTo(this.uiDialog), this._addClass("ui-dialog-content", "ui-widget-content"), this._createTitlebar(), this._createButtonPane(), this.options.draggable && a.fn.draggable && this._makeDraggable(), this.options.resizable && a.fn.resizable && this._makeResizable(), this._isOpen = !1, this._trackFocus() }, _init: function() { this.options.autoOpen && this.open() }, _appendTo: function() { var b = this.options.appendTo; return b && (b.jquery || b.nodeType) ? a(b) : this.document.find(b || "body").eq(0) }, _destroy: function() { var a, b = this.originalPosition;
                this._untrackInstance(), this._destroyOverlay(), this.element.removeUniqueId().css(this.originalCss).detach(), this.uiDialog.remove(), this.originalTitle && this.element.attr("title", this.originalTitle), a = b.parent.children().eq(b.index), a.length && a[0] !== this.element[0] ? a.before(this.element) : b.parent.append(this.element) }, widget: function() { return this.uiDialog }, disable: a.noop, enable: a.noop, close: function(b) { var c = this;
                this._isOpen && this._trigger("beforeClose", b) !== !1 && (this._isOpen = !1, this._focusedElement = null, this._destroyOverlay(), this._untrackInstance(), this.opener.filter(":focusable").trigger("focus").length || a.ui.safeBlur(a.ui.safeActiveElement(this.document[0])), this._hide(this.uiDialog, this.options.hide, function() { c._trigger("close", b) })) }, isOpen: function() { return this._isOpen }, moveToTop: function() { this._moveToTop() }, _moveToTop: function(b, c) { var d = !1,
                    e = this.uiDialog.siblings(".ui-front:visible").map(function() { return +a(this).css("z-index") }).get(),
                    f = Math.max.apply(null, e); return f >= +this.uiDialog.css("z-index") && (this.uiDialog.css("z-index", f + 1), d = !0), d && !c && this._trigger("focus", b), d }, open: function() { var b = this; return this._isOpen ? void(this._moveToTop() && this._focusTabbable()) : (this._isOpen = !0, this.opener = a(a.ui.safeActiveElement(this.document[0])), this._size(), this._position(), this._createOverlay(), this._moveToTop(null, !0), this.overlay && this.overlay.css("z-index", this.uiDialog.css("z-index") - 1), this._show(this.uiDialog, this.options.show, function() { b._focusTabbable(), b._trigger("focus") }), this._makeFocusTarget(), void this._trigger("open")) }, _focusTabbable: function() { var a = this._focusedElement;
                a || (a = this.element.find("[autofocus]")), a.length || (a = this.element.find(":tabbable")), a.length || (a = this.uiDialogButtonPane.find(":tabbable")), a.length || (a = this.uiDialogTitlebarClose.filter(":tabbable")), a.length || (a = this.uiDialog), a.eq(0).trigger("focus") }, _keepFocus: function(b) {
                function c() { var b = a.ui.safeActiveElement(this.document[0]),
                        c = this.uiDialog[0] === b || a.contains(this.uiDialog[0], b);
                    c || this._focusTabbable() } b.preventDefault(), c.call(this), this._delay(c) }, _createWrapper: function() { this.uiDialog = a("<div>").hide().attr({ tabIndex: -1, role: "dialog" }).appendTo(this._appendTo()), this._addClass(this.uiDialog, "ui-dialog", "ui-widget ui-widget-content ui-front"), this._on(this.uiDialog, { keydown: function(b) { if (this.options.closeOnEscape && !b.isDefaultPrevented() && b.keyCode && b.keyCode === a.ui.keyCode.ESCAPE) return b.preventDefault(), void this.close(b); if (b.keyCode === a.ui.keyCode.TAB && !b.isDefaultPrevented()) { var c = this.uiDialog.find(":tabbable"),
                                d = c.filter(":first"),
                                e = c.filter(":last");
                            b.target !== e[0] && b.target !== this.uiDialog[0] || b.shiftKey ? b.target !== d[0] && b.target !== this.uiDialog[0] || !b.shiftKey || (this._delay(function() { e.trigger("focus") }), b.preventDefault()) : (this._delay(function() { d.trigger("focus") }), b.preventDefault()) } }, mousedown: function(a) { this._moveToTop(a) && this._focusTabbable() } }), this.element.find("[aria-describedby]").length || this.uiDialog.attr({ "aria-describedby": this.element.uniqueId().attr("id") }) }, _createTitlebar: function() { var b;
                this.uiDialogTitlebar = a("<div>"), this._addClass(this.uiDialogTitlebar, "ui-dialog-titlebar", "ui-widget-header ui-helper-clearfix"), this._on(this.uiDialogTitlebar, { mousedown: function(b) { a(b.target).closest(".ui-dialog-titlebar-close") || this.uiDialog.trigger("focus") } }), this.uiDialogTitlebarClose = a("<button type='button'></button>").button({ label: a("<a>").text(this.options.closeText).html(), icon: "ui-icon-closethick", showLabel: !1 }).appendTo(this.uiDialogTitlebar), this._addClass(this.uiDialogTitlebarClose, "ui-dialog-titlebar-close"), this._on(this.uiDialogTitlebarClose, { click: function(a) { a.preventDefault(), this.close(a) } }), b = a("<span>").uniqueId().prependTo(this.uiDialogTitlebar), this._addClass(b, "ui-dialog-title"), this._title(b), this.uiDialogTitlebar.prependTo(this.uiDialog), this.uiDialog.attr({ "aria-labelledby": b.attr("id") }) }, _title: function(a) { this.options.title ? a.text(this.options.title) : a.html("&#160;") }, _createButtonPane: function() { this.uiDialogButtonPane = a("<div>"), this._addClass(this.uiDialogButtonPane, "ui-dialog-buttonpane", "ui-widget-content ui-helper-clearfix"), this.uiButtonSet = a("<div>").appendTo(this.uiDialogButtonPane), this._addClass(this.uiButtonSet, "ui-dialog-buttonset"), this._createButtons() }, _createButtons: function() { var b = this,
                    c = this.options.buttons; return this.uiDialogButtonPane.remove(), this.uiButtonSet.empty(), a.isEmptyObject(c) || a.isArray(c) && !c.length ? void this._removeClass(this.uiDialog, "ui-dialog-buttons") : (a.each(c, function(c, d) { var e, f;
                    d = a.isFunction(d) ? { click: d, text: c } : d, d = a.extend({ type: "button" }, d), e = d.click, f = { icon: d.icon, iconPosition: d.iconPosition, showLabel: d.showLabel }, delete d.click, delete d.icon, delete d.iconPosition, delete d.showLabel, a("<button></button>", d).button(f).appendTo(b.uiButtonSet).on("click", function() { e.apply(b.element[0], arguments) }) }), this._addClass(this.uiDialog, "ui-dialog-buttons"), void this.uiDialogButtonPane.appendTo(this.uiDialog)) }, _makeDraggable: function() {
                function b(a) { return { position: a.position, offset: a.offset } } var c = this,
                    d = this.options;
                this.uiDialog.draggable({ cancel: ".ui-dialog-content, .ui-dialog-titlebar-close", handle: ".ui-dialog-titlebar", containment: "document", start: function(d, e) { c._addClass(a(this), "ui-dialog-dragging"), c._blockFrames(), c._trigger("dragStart", d, b(e)) }, drag: function(a, d) { c._trigger("drag", a, b(d)) }, stop: function(e, f) { var g = f.offset.left - c.document.scrollLeft(),
                            h = f.offset.top - c.document.scrollTop();
                        d.position = { my: "left top", at: "left" + (g >= 0 ? "+" : "") + g + " top" + (h >= 0 ? "+" : "") + h, of: c.window }, c._removeClass(a(this), "ui-dialog-dragging"), c._unblockFrames(), c._trigger("dragStop", e, b(f)) } }) }, _makeResizable: function() {
                function b(a) { return { originalPosition: a.originalPosition, originalSize: a.originalSize, position: a.position, size: a.size } } var c = this,
                    d = this.options,
                    e = d.resizable,
                    f = this.uiDialog.css("position"),
                    g = "string" == typeof e ? e : "n,e,s,w,se,sw,ne,nw";
                this.uiDialog.resizable({ cancel: ".ui-dialog-content", containment: "document", alsoResize: this.element, maxWidth: d.maxWidth, maxHeight: d.maxHeight, minWidth: d.minWidth, minHeight: this._minHeight(), handles: g, start: function(d, e) { c._addClass(a(this), "ui-dialog-resizing"), c._blockFrames(), c._trigger("resizeStart", d, b(e)) }, resize: function(a, d) { c._trigger("resize", a, b(d)) }, stop: function(e, f) { var g = c.uiDialog.offset(),
                            h = g.left - c.document.scrollLeft(),
                            i = g.top - c.document.scrollTop();
                        d.height = c.uiDialog.height(), d.width = c.uiDialog.width(), d.position = { my: "left top", at: "left" + (h >= 0 ? "+" : "") + h + " top" + (i >= 0 ? "+" : "") + i, of: c.window }, c._removeClass(a(this), "ui-dialog-resizing"), c._unblockFrames(), c._trigger("resizeStop", e, b(f)) } }).css("position", f) }, _trackFocus: function() { this._on(this.widget(), { focusin: function(b) { this._makeFocusTarget(), this._focusedElement = a(b.target) } }) }, _makeFocusTarget: function() { this._untrackInstance(), this._trackingInstances().unshift(this) }, _untrackInstance: function() { var b = this._trackingInstances(),
                    c = a.inArray(this, b);
                c !== -1 && b.splice(c, 1) }, _trackingInstances: function() { var a = this.document.data("ui-dialog-instances"); return a || (a = [], this.document.data("ui-dialog-instances", a)), a }, _minHeight: function() { var a = this.options; return "auto" === a.height ? a.minHeight : Math.min(a.minHeight, a.height) }, _position: function() { var a = this.uiDialog.is(":visible");
                a || this.uiDialog.show(), this.uiDialog.position(this.options.position), a || this.uiDialog.hide() }, _setOptions: function(b) { var c = this,
                    d = !1,
                    e = {};
                a.each(b, function(a, b) { c._setOption(a, b), a in c.sizeRelatedOptions && (d = !0), a in c.resizableRelatedOptions && (e[a] = b) }), d && (this._size(), this._position()), this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", e) }, _setOption: function(b, c) { var d, e, f = this.uiDialog; "disabled" !== b && (this._super(b, c), "appendTo" === b && this.uiDialog.appendTo(this._appendTo()), "buttons" === b && this._createButtons(), "closeText" === b && this.uiDialogTitlebarClose.button({ label: a("<a>").text("" + this.options.closeText).html() }), "draggable" === b && (d = f.is(":data(ui-draggable)"), d && !c && f.draggable("destroy"), !d && c && this._makeDraggable()), "position" === b && this._position(), "resizable" === b && (e = f.is(":data(ui-resizable)"), e && !c && f.resizable("destroy"), e && "string" == typeof c && f.resizable("option", "handles", c), e || c === !1 || this._makeResizable()), "title" === b && this._title(this.uiDialogTitlebar.find(".ui-dialog-title"))) }, _size: function() { var a, b, c, d = this.options;
                this.element.show().css({ width: "auto", minHeight: 0, maxHeight: "none", height: 0 }), d.minWidth > d.width && (d.width = d.minWidth), a = this.uiDialog.css({ height: "auto", width: d.width }).outerHeight(), b = Math.max(0, d.minHeight - a), c = "number" == typeof d.maxHeight ? Math.max(0, d.maxHeight - a) : "none", "auto" === d.height ? this.element.css({ minHeight: b, maxHeight: c, height: "auto" }) : this.element.height(Math.max(0, d.height - a)), this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight()) }, _blockFrames: function() { this.iframeBlocks = this.document.find("iframe").map(function() { var b = a(this); return a("<div>").css({ position: "absolute", width: b.outerWidth(), height: b.outerHeight() }).appendTo(b.parent()).offset(b.offset())[0] }) }, _unblockFrames: function() { this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks) }, _allowInteraction: function(b) { return !!a(b.target).closest(".ui-dialog").length || !!a(b.target).closest(".ui-datepicker").length }, _createOverlay: function() { if (this.options.modal) { var b = !0;
                    this._delay(function() { b = !1 }), this.document.data("ui-dialog-overlays") || this._on(this.document, { focusin: function(a) { b || this._allowInteraction(a) || (a.preventDefault(), this._trackingInstances()[0]._focusTabbable()) } }), this.overlay = a("<div>").appendTo(this._appendTo()), this._addClass(this.overlay, null, "ui-widget-overlay ui-front"), this._on(this.overlay, { mousedown: "_keepFocus" }), this.document.data("ui-dialog-overlays", (this.document.data("ui-dialog-overlays") || 0) + 1) } }, _destroyOverlay: function() { if (this.options.modal && this.overlay) { var a = this.document.data("ui-dialog-overlays") - 1;
                    a ? this.document.data("ui-dialog-overlays", a) : (this._off(this.document, "focusin"), this.document.removeData("ui-dialog-overlays")), this.overlay.remove(), this.overlay = null } } }), a.uiBackCompat !== !1 && a.widget("ui.dialog", a.ui.dialog, { options: { dialogClass: "" }, _createWrapper: function() { this._super(), this.uiDialog.addClass(this.options.dialogClass) }, _setOption: function(a, b) { "dialogClass" === a && this.uiDialog.removeClass(this.options.dialogClass).addClass(b), this._superApply(arguments) } });
        a.ui.dialog;
        a.widget("ui.droppable", { version: "1.12.0", widgetEventPrefix: "drop", options: { accept: "*", addClasses: !0, greedy: !1, scope: "default", tolerance: "intersect", activate: null, deactivate: null, drop: null, out: null, over: null }, _create: function() { var b, c = this.options,
                    d = c.accept;
                this.isover = !1, this.isout = !0, this.accept = a.isFunction(d) ? d : function(a) { return a.is(d) }, this.proportions = function() { return arguments.length ? void(b = arguments[0]) : b ? b : b = { width: this.element[0].offsetWidth, height: this.element[0].offsetHeight } }, this._addToManager(c.scope), c.addClasses && this._addClass("ui-droppable") }, _addToManager: function(b) { a.ui.ddmanager.droppables[b] = a.ui.ddmanager.droppables[b] || [], a.ui.ddmanager.droppables[b].push(this) }, _splice: function(a) { for (var b = 0; b < a.length; b++) a[b] === this && a.splice(b, 1) }, _destroy: function() { var b = a.ui.ddmanager.droppables[this.options.scope];
                this._splice(b) }, _setOption: function(b, c) { if ("accept" === b) this.accept = a.isFunction(c) ? c : function(a) { return a.is(c) };
                else if ("scope" === b) { var d = a.ui.ddmanager.droppables[this.options.scope];
                    this._splice(d), this._addToManager(c) } this._super(b, c) }, _activate: function(b) { var c = a.ui.ddmanager.current;
                this._addActiveClass(), c && this._trigger("activate", b, this.ui(c)) }, _deactivate: function(b) { var c = a.ui.ddmanager.current;
                this._removeActiveClass(), c && this._trigger("deactivate", b, this.ui(c)) }, _over: function(b) { var c = a.ui.ddmanager.current;
                c && (c.currentItem || c.element)[0] !== this.element[0] && this.accept.call(this.element[0], c.currentItem || c.element) && (this._addHoverClass(), this._trigger("over", b, this.ui(c))) }, _out: function(b) { var c = a.ui.ddmanager.current;
                c && (c.currentItem || c.element)[0] !== this.element[0] && this.accept.call(this.element[0], c.currentItem || c.element) && (this._removeHoverClass(), this._trigger("out", b, this.ui(c))) }, _drop: function(b, c) { var d = c || a.ui.ddmanager.current,
                    e = !1; return !(!d || (d.currentItem || d.element)[0] === this.element[0]) && (this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function() { var c = a(this).droppable("instance"); if (c.options.greedy && !c.options.disabled && c.options.scope === d.options.scope && c.accept.call(c.element[0], d.currentItem || d.element) && s(d, a.extend(c, { offset: c.element.offset() }), c.options.tolerance, b)) return e = !0, !1 }), !e && (!!this.accept.call(this.element[0], d.currentItem || d.element) && (this._removeActiveClass(), this._removeHoverClass(), this._trigger("drop", b, this.ui(d)), this.element))) }, ui: function(a) { return { draggable: a.currentItem || a.element, helper: a.helper, position: a.position, offset: a.positionAbs } }, _addHoverClass: function() { this._addClass("ui-droppable-hover") }, _removeHoverClass: function() { this._removeClass("ui-droppable-hover") }, _addActiveClass: function() { this._addClass("ui-droppable-active") }, _removeActiveClass: function() { this._removeClass("ui-droppable-active") } });
        var s = a.ui.intersect = function() {
            function a(a, b, c) { return a >= b && a < b + c } return function(b, c, d, e) { if (!c.offset) return !1; var f = (b.positionAbs || b.position.absolute).left + b.margins.left,
                    g = (b.positionAbs || b.position.absolute).top + b.margins.top,
                    h = f + b.helperProportions.width,
                    i = g + b.helperProportions.height,
                    j = c.offset.left,
                    k = c.offset.top,
                    l = j + c.proportions().width,
                    m = k + c.proportions().height; switch (d) {
                    case "fit":
                        return j <= f && h <= l && k <= g && i <= m;
                    case "intersect":
                        return j < f + b.helperProportions.width / 2 && h - b.helperProportions.width / 2 < l && k < g + b.helperProportions.height / 2 && i - b.helperProportions.height / 2 < m;
                    case "pointer":
                        return a(e.pageY, k, c.proportions().height) && a(e.pageX, j, c.proportions().width);
                    case "touch":
                        return (g >= k && g <= m || i >= k && i <= m || g < k && i > m) && (f >= j && f <= l || h >= j && h <= l || f < j && h > l);
                    default:
                        return !1 } } }();
        a.ui.ddmanager = { current: null, droppables: { "default": [] }, prepareOffsets: function(b, c) { var d, e, f = a.ui.ddmanager.droppables[b.options.scope] || [],
                    g = c ? c.type : null,
                    h = (b.currentItem || b.element).find(":data(ui-droppable)").addBack();
                a: for (d = 0; d < f.length; d++)
                    if (!(f[d].options.disabled || b && !f[d].accept.call(f[d].element[0], b.currentItem || b.element))) { for (e = 0; e < h.length; e++)
                            if (h[e] === f[d].element[0]) { f[d].proportions().height = 0; continue a }
                        f[d].visible = "none" !== f[d].element.css("display"), f[d].visible && ("mousedown" === g && f[d]._activate.call(f[d], c), f[d].offset = f[d].element.offset(), f[d].proportions({ width: f[d].element[0].offsetWidth, height: f[d].element[0].offsetHeight })) } }, drop: function(b, c) { var d = !1; return a.each((a.ui.ddmanager.droppables[b.options.scope] || []).slice(), function() { this.options && (!this.options.disabled && this.visible && s(b, this, this.options.tolerance, c) && (d = this._drop.call(this, c) || d), !this.options.disabled && this.visible && this.accept.call(this.element[0], b.currentItem || b.element) && (this.isout = !0, this.isover = !1, this._deactivate.call(this, c))) }), d }, dragStart: function(b, c) { b.element.parentsUntil("body").on("scroll.droppable", function() { b.options.refreshPositions || a.ui.ddmanager.prepareOffsets(b, c) }) }, drag: function(b, c) { b.options.refreshPositions && a.ui.ddmanager.prepareOffsets(b, c), a.each(a.ui.ddmanager.droppables[b.options.scope] || [], function() { if (!this.options.disabled && !this.greedyChild && this.visible) { var d, e, f, g = s(b, this, this.options.tolerance, c),
                            h = !g && this.isover ? "isout" : g && !this.isover ? "isover" : null;
                        h && (this.options.greedy && (e = this.options.scope, f = this.element.parents(":data(ui-droppable)").filter(function() { return a(this).droppable("instance").options.scope === e }), f.length && (d = a(f[0]).droppable("instance"), d.greedyChild = "isover" === h)), d && "isover" === h && (d.isover = !1, d.isout = !0, d._out.call(d, c)), this[h] = !0, this["isout" === h ? "isover" : "isout"] = !1, this["isover" === h ? "_over" : "_out"].call(this, c), d && "isout" === h && (d.isout = !1, d.isover = !0, d._over.call(d, c))) } }) }, dragStop: function(b, c) { b.element.parentsUntil("body").off("scroll.droppable"), b.options.refreshPositions || a.ui.ddmanager.prepareOffsets(b, c) } }, a.uiBackCompat !== !1 && a.widget("ui.droppable", a.ui.droppable, { options: { hoverClass: !1, activeClass: !1 }, _addActiveClass: function() { this._super(), this.options.activeClass && this.element.addClass(this.options.activeClass) }, _removeActiveClass: function() { this._super(), this.options.activeClass && this.element.removeClass(this.options.activeClass) }, _addHoverClass: function() { this._super(), this.options.hoverClass && this.element.addClass(this.options.hoverClass) }, _removeHoverClass: function() { this._super(), this.options.hoverClass && this.element.removeClass(this.options.hoverClass) } });
        a.ui.droppable, a.widget("ui.progressbar", { version: "1.12.0", options: { classes: { "ui-progressbar": "ui-corner-all", "ui-progressbar-value": "ui-corner-left", "ui-progressbar-complete": "ui-corner-right" }, max: 100, value: 0, change: null, complete: null }, min: 0, _create: function() { this.oldValue = this.options.value = this._constrainedValue(), this.element.attr({ role: "progressbar", "aria-valuemin": this.min }), this._addClass("ui-progressbar", "ui-widget ui-widget-content"), this.valueDiv = a("<div>").appendTo(this.element), this._addClass(this.valueDiv, "ui-progressbar-value", "ui-widget-header"), this._refreshValue() }, _destroy: function() { this.element.removeAttr("role aria-valuemin aria-valuemax aria-valuenow"), this.valueDiv.remove() }, value: function(a) { return void 0 === a ? this.options.value : (this.options.value = this._constrainedValue(a), void this._refreshValue()) }, _constrainedValue: function(a) { return void 0 === a && (a = this.options.value), this.indeterminate = a === !1, "number" != typeof a && (a = 0), !this.indeterminate && Math.min(this.options.max, Math.max(this.min, a)) }, _setOptions: function(a) { var b = a.value;
                delete a.value, this._super(a), this.options.value = this._constrainedValue(b), this._refreshValue() }, _setOption: function(a, b) { "max" === a && (b = Math.max(this.min, b)), this._super(a, b) }, _setOptionDisabled: function(a) { this._super(a), this.element.attr("aria-disabled", a), this._toggleClass(null, "ui-state-disabled", !!a) }, _percentage: function() { return this.indeterminate ? 100 : 100 * (this.options.value - this.min) / (this.options.max - this.min) }, _refreshValue: function() { var b = this.options.value,
                    c = this._percentage();
                this.valueDiv.toggle(this.indeterminate || b > this.min).width(c.toFixed(0) + "%"), this._toggleClass(this.valueDiv, "ui-progressbar-complete", null, b === this.options.max)._toggleClass("ui-progressbar-indeterminate", null, this.indeterminate), this.indeterminate ? (this.element.removeAttr("aria-valuenow"), this.overlayDiv || (this.overlayDiv = a("<div>").appendTo(this.valueDiv), this._addClass(this.overlayDiv, "ui-progressbar-overlay"))) : (this.element.attr({ "aria-valuemax": this.options.max, "aria-valuenow": b }), this.overlayDiv && (this.overlayDiv.remove(), this.overlayDiv = null)), this.oldValue !== b && (this.oldValue = b, this._trigger("change")), b === this.options.max && this._trigger("complete") } }), a.widget("ui.selectable", a.ui.mouse, { version: "1.12.0", options: { appendTo: "body", autoRefresh: !0, distance: 0, filter: "*", tolerance: "touch", selected: null, selecting: null, start: null, stop: null, unselected: null, unselecting: null }, _create: function() { var b = this;
                this._addClass("ui-selectable"), this.dragged = !1, this.refresh = function() { b.elementPos = a(b.element[0]).offset(), b.selectees = a(b.options.filter, b.element[0]), b._addClass(b.selectees, "ui-selectee"), b.selectees.each(function() { var c = a(this),
                            d = c.offset(),
                            e = { left: d.left - b.elementPos.left, top: d.top - b.elementPos.top };
                        a.data(this, "selectable-item", { element: this, $element: c, left: e.left, top: e.top, right: e.left + c.outerWidth(), bottom: e.top + c.outerHeight(), startselected: !1, selected: c.hasClass("ui-selected"), selecting: c.hasClass("ui-selecting"), unselecting: c.hasClass("ui-unselecting") }) }) }, this.refresh(), this._mouseInit(), this.helper = a("<div>"), this._addClass(this.helper, "ui-selectable-helper") }, _destroy: function() { this.selectees.removeData("selectable-item"), this._mouseDestroy() }, _mouseStart: function(b) { var c = this,
                    d = this.options;
                this.opos = [b.pageX, b.pageY], this.elementPos = a(this.element[0]).offset(), this.options.disabled || (this.selectees = a(d.filter, this.element[0]), this._trigger("start", b), a(d.appendTo).append(this.helper), this.helper.css({ left: b.pageX, top: b.pageY, width: 0, height: 0 }), d.autoRefresh && this.refresh(), this.selectees.filter(".ui-selected").each(function() { var d = a.data(this, "selectable-item");
                    d.startselected = !0, b.metaKey || b.ctrlKey || (c._removeClass(d.$element, "ui-selected"), d.selected = !1, c._addClass(d.$element, "ui-unselecting"), d.unselecting = !0, c._trigger("unselecting", b, { unselecting: d.element })) }), a(b.target).parents().addBack().each(function() { var d, e = a.data(this, "selectable-item"); if (e) return d = !b.metaKey && !b.ctrlKey || !e.$element.hasClass("ui-selected"), c._removeClass(e.$element, d ? "ui-unselecting" : "ui-selected")._addClass(e.$element, d ? "ui-selecting" : "ui-unselecting"), e.unselecting = !d, e.selecting = d, e.selected = d, d ? c._trigger("selecting", b, { selecting: e.element }) : c._trigger("unselecting", b, { unselecting: e.element }), !1 })) }, _mouseDrag: function(b) { if (this.dragged = !0, !this.options.disabled) { var c, d = this,
                        e = this.options,
                        f = this.opos[0],
                        g = this.opos[1],
                        h = b.pageX,
                        i = b.pageY; return f > h && (c = h, h = f, f = c), g > i && (c = i, i = g, g = c), this.helper.css({ left: f, top: g, width: h - f, height: i - g }), this.selectees.each(function() { var c = a.data(this, "selectable-item"),
                            j = !1,
                            k = {};
                        c && c.element !== d.element[0] && (k.left = c.left + d.elementPos.left, k.right = c.right + d.elementPos.left, k.top = c.top + d.elementPos.top, k.bottom = c.bottom + d.elementPos.top, "touch" === e.tolerance ? j = !(k.left > h || k.right < f || k.top > i || k.bottom < g) : "fit" === e.tolerance && (j = k.left > f && k.right < h && k.top > g && k.bottom < i), j ? (c.selected && (d._removeClass(c.$element, "ui-selected"), c.selected = !1), c.unselecting && (d._removeClass(c.$element, "ui-unselecting"), c.unselecting = !1), c.selecting || (d._addClass(c.$element, "ui-selecting"), c.selecting = !0, d._trigger("selecting", b, { selecting: c.element }))) : (c.selecting && ((b.metaKey || b.ctrlKey) && c.startselected ? (d._removeClass(c.$element, "ui-selecting"), c.selecting = !1, d._addClass(c.$element, "ui-selected"), c.selected = !0) : (d._removeClass(c.$element, "ui-selecting"), c.selecting = !1, c.startselected && (d._addClass(c.$element, "ui-unselecting"), c.unselecting = !0), d._trigger("unselecting", b, { unselecting: c.element }))), c.selected && (b.metaKey || b.ctrlKey || c.startselected || (d._removeClass(c.$element, "ui-selected"), c.selected = !1, d._addClass(c.$element, "ui-unselecting"), c.unselecting = !0, d._trigger("unselecting", b, { unselecting: c.element }))))) }), !1 } }, _mouseStop: function(b) { var c = this; return this.dragged = !1, a(".ui-unselecting", this.element[0]).each(function() { var d = a.data(this, "selectable-item");
                    c._removeClass(d.$element, "ui-unselecting"), d.unselecting = !1, d.startselected = !1, c._trigger("unselected", b, { unselected: d.element }) }), a(".ui-selecting", this.element[0]).each(function() { var d = a.data(this, "selectable-item");
                    c._removeClass(d.$element, "ui-selecting")._addClass(d.$element, "ui-selected"), d.selecting = !1, d.selected = !0, d.startselected = !0, c._trigger("selected", b, { selected: d.element }) }), this._trigger("stop", b), this.helper.remove(), !1 } }), a.widget("ui.selectmenu", [a.ui.formResetMixin, {
            version: "1.12.0",
            defaultElement: "<select>",
            options: { appendTo: null, classes: { "ui-selectmenu-button-open": "ui-corner-top", "ui-selectmenu-button-closed": "ui-corner-all" }, disabled: null, icons: { button: "ui-icon-triangle-1-s" }, position: { my: "left top", at: "left bottom", collision: "none" }, width: !1, change: null, close: null, focus: null, open: null, select: null },
            _create: function() { var b = this.element.uniqueId().attr("id");
                this.ids = { element: b, button: b + "-button", menu: b + "-menu" }, this._drawButton(), this._drawMenu(), this._bindFormResetHandler(), this._rendered = !1, this.menuItems = a() },
            _drawButton: function() { var b, c = this,
                    d = this._parseOption(this.element.find("option:selected"), this.element[0].selectedIndex);
                this.labels = this.element.labels().attr("for", this.ids.button), this._on(this.labels, { click: function(a) { this.button.focus(), a.preventDefault() } }), this.element.hide(), this.button = a("<span>", { tabindex: this.options.disabled ? -1 : 0, id: this.ids.button, role: "combobox", "aria-expanded": "false", "aria-autocomplete": "list", "aria-owns": this.ids.menu, "aria-haspopup": "true", title: this.element.attr("title") }).insertAfter(this.element), this._addClass(this.button, "ui-selectmenu-button ui-selectmenu-button-closed", "ui-button ui-widget"), b = a("<span>").appendTo(this.button), this._addClass(b, "ui-selectmenu-icon", "ui-icon " + this.options.icons.button), this.buttonItem = this._renderButtonItem(d).appendTo(this.button), this.options.width !== !1 && this._resizeButton(), this._on(this.button, this._buttonEvents), this.button.one("focusin", function() { c._rendered || c._refreshMenu() }) },
            _drawMenu: function() { var b = this;
                this.menu = a("<ul>", { "aria-hidden": "true", "aria-labelledby": this.ids.button, id: this.ids.menu }), this.menuWrap = a("<div>").append(this.menu), this._addClass(this.menuWrap, "ui-selectmenu-menu", "ui-front"), this.menuWrap.appendTo(this._appendTo()), this.menuInstance = this.menu.menu({ classes: { "ui-menu": "ui-corner-bottom" }, role: "listbox", select: function(a, c) { a.preventDefault(), b._setSelection(), b._select(c.item.data("ui-selectmenu-item"), a) }, focus: function(a, c) { var d = c.item.data("ui-selectmenu-item");
                        null != b.focusIndex && d.index !== b.focusIndex && (b._trigger("focus", a, { item: d }), b.isOpen || b._select(d, a)), b.focusIndex = d.index, b.button.attr("aria-activedescendant", b.menuItems.eq(d.index).attr("id")) } }).menu("instance"), this.menuInstance._off(this.menu, "mouseleave"), this.menuInstance._closeOnDocumentClick = function() { return !1 }, this.menuInstance._isDivider = function() { return !1 } },
            refresh: function() { this._refreshMenu(), this.buttonItem.replaceWith(this.buttonItem = this._renderButtonItem(this._getSelectedItem().data("ui-selectmenu-item") || {})), null === this.options.width && this._resizeButton() },
            _refreshMenu: function() { var a, b = this.element.find("option");
                this.menu.empty(), this._parseOptions(b), this._renderMenu(this.menu, this.items), this.menuInstance.refresh(), this.menuItems = this.menu.find("li").not(".ui-selectmenu-optgroup").find(".ui-menu-item-wrapper"), this._rendered = !0, b.length && (a = this._getSelectedItem(), this.menuInstance.focus(null, a), this._setAria(a.data("ui-selectmenu-item")), this._setOption("disabled", this.element.prop("disabled"))) },
            open: function(a) { this.options.disabled || (this._rendered ? (this._removeClass(this.menu.find(".ui-state-active"), null, "ui-state-active"), this.menuInstance.focus(null, this._getSelectedItem())) : this._refreshMenu(), this.menuItems.length && (this.isOpen = !0, this._toggleAttr(), this._resizeMenu(), this._position(), this._on(this.document, this._documentClick), this._trigger("open", a))) },
            _position: function() { this.menuWrap.position(a.extend({ of: this.button }, this.options.position)) },
            close: function(a) { this.isOpen && (this.isOpen = !1, this._toggleAttr(), this.range = null, this._off(this.document), this._trigger("close", a)) },
            widget: function() { return this.button },
            menuWidget: function() { return this.menu },
            _renderButtonItem: function(b) { var c = a("<span>"); return this._setText(c, b.label), this._addClass(c, "ui-selectmenu-text"), c },
            _renderMenu: function(b, c) { var d = this,
                    e = "";
                a.each(c, function(c, f) { var g;
                    f.optgroup !== e && (g = a("<li>", { text: f.optgroup }), d._addClass(g, "ui-selectmenu-optgroup", "ui-menu-divider" + (f.element.parent("optgroup").prop("disabled") ? " ui-state-disabled" : "")), g.appendTo(b), e = f.optgroup), d._renderItemData(b, f) }) },
            _renderItemData: function(a, b) {
                return this._renderItem(a, b).data("ui-selectmenu-item", b);
            },
            _renderItem: function(b, c) { var d = a("<li>"),
                    e = a("<div>", { title: c.element.attr("title") }); return c.disabled && this._addClass(d, null, "ui-state-disabled"), this._setText(e, c.label), d.append(e).appendTo(b) },
            _setText: function(a, b) { b ? a.text(b) : a.html("&#160;") },
            _move: function(a, b) { var c, d, e = ".ui-menu-item";
                this.isOpen ? c = this.menuItems.eq(this.focusIndex).parent("li") : (c = this.menuItems.eq(this.element[0].selectedIndex).parent("li"), e += ":not(.ui-state-disabled)"), d = "first" === a || "last" === a ? c["first" === a ? "prevAll" : "nextAll"](e).eq(-1) : c[a + "All"](e).eq(0), d.length && this.menuInstance.focus(b, d) },
            _getSelectedItem: function() { return this.menuItems.eq(this.element[0].selectedIndex).parent("li") },
            _toggle: function(a) { this[this.isOpen ? "close" : "open"](a) },
            _setSelection: function() { var a;
                this.range && (window.getSelection ? (a = window.getSelection(), a.removeAllRanges(), a.addRange(this.range)) : this.range.select(), this.button.focus()) },
            _documentClick: { mousedown: function(b) { this.isOpen && (a(b.target).closest(".ui-selectmenu-menu, #" + a.ui.escapeSelector(this.ids.button)).length || this.close(b)) } },
            _buttonEvents: { mousedown: function() { var a;
                    window.getSelection ? (a = window.getSelection(), a.rangeCount && (this.range = a.getRangeAt(0))) : this.range = document.selection.createRange() }, click: function(a) { this._setSelection(), this._toggle(a) }, keydown: function(b) { var c = !0; switch (b.keyCode) {
                        case a.ui.keyCode.TAB:
                        case a.ui.keyCode.ESCAPE:
                            this.close(b), c = !1; break;
                        case a.ui.keyCode.ENTER:
                            this.isOpen && this._selectFocusedItem(b); break;
                        case a.ui.keyCode.UP:
                            b.altKey ? this._toggle(b) : this._move("prev", b); break;
                        case a.ui.keyCode.DOWN:
                            b.altKey ? this._toggle(b) : this._move("next", b); break;
                        case a.ui.keyCode.SPACE:
                            this.isOpen ? this._selectFocusedItem(b) : this._toggle(b); break;
                        case a.ui.keyCode.LEFT:
                            this._move("prev", b); break;
                        case a.ui.keyCode.RIGHT:
                            this._move("next", b); break;
                        case a.ui.keyCode.HOME:
                        case a.ui.keyCode.PAGE_UP:
                            this._move("first", b); break;
                        case a.ui.keyCode.END:
                        case a.ui.keyCode.PAGE_DOWN:
                            this._move("last", b); break;
                        default:
                            this.menu.trigger(b), c = !1 } c && b.preventDefault() } },
            _selectFocusedItem: function(a) { var b = this.menuItems.eq(this.focusIndex).parent("li");
                b.hasClass("ui-state-disabled") || this._select(b.data("ui-selectmenu-item"), a) },
            _select: function(a, b) { var c = this.element[0].selectedIndex;
                this.element[0].selectedIndex = a.index, this.buttonItem.replaceWith(this.buttonItem = this._renderButtonItem(a)), this._setAria(a), this._trigger("select", b, { item: a }), a.index !== c && this._trigger("change", b, { item: a }), this.close(b) },
            _setAria: function(a) { var b = this.menuItems.eq(a.index).attr("id");
                this.button.attr({ "aria-labelledby": b, "aria-activedescendant": b }), this.menu.attr("aria-activedescendant", b) },
            _setOption: function(a, b) { if ("icons" === a) { var c = this.button.find("span.ui-icon");
                    this._removeClass(c, null, this.options.icons.button)._addClass(c, null, b.button) } this._super(a, b), "appendTo" === a && this.menuWrap.appendTo(this._appendTo()), "width" === a && this._resizeButton() },
            _setOptionDisabled: function(a) { this._super(a), this.menuInstance.option("disabled", a), this.button.attr("aria-disabled", a), this._toggleClass(this.button, null, "ui-state-disabled", a), this.element.prop("disabled", a), a ? (this.button.attr("tabindex", -1), this.close()) : this.button.attr("tabindex", 0) },
            _appendTo: function() { var b = this.options.appendTo; return b && (b = b.jquery || b.nodeType ? a(b) : this.document.find(b).eq(0)), b && b[0] || (b = this.element.closest(".ui-front, dialog")), b.length || (b = this.document[0].body), b },
            _toggleAttr: function() { this.button.attr("aria-expanded", this.isOpen), this._removeClass(this.button, "ui-selectmenu-button-" + (this.isOpen ? "closed" : "open"))._addClass(this.button, "ui-selectmenu-button-" + (this.isOpen ? "open" : "closed"))._toggleClass(this.menuWrap, "ui-selectmenu-open", null, this.isOpen), this.menu.attr("aria-hidden", !this.isOpen) },
            _resizeButton: function() { var a = this.options.width; return a === !1 ? void this.button.css("width", "") : (null === a && (a = this.element.show().outerWidth(), this.element.hide()), void this.button.outerWidth(a)) },
            _resizeMenu: function() { this.menu.outerWidth(Math.max(this.button.outerWidth(), this.menu.width("").outerWidth() + 1)) },
            _getCreateOptions: function() { var a = this._super(); return a.disabled = this.element.prop("disabled"), a },
            _parseOptions: function(b) { var c = this,
                    d = [];
                b.each(function(b, e) { d.push(c._parseOption(a(e), b)) }), this.items = d },
            _parseOption: function(a, b) { var c = a.parent("optgroup"); return { element: a, index: b, value: a.val(), label: a.text(), optgroup: c.attr("label") || "", disabled: c.prop("disabled") || a.prop("disabled") } },
            _destroy: function() { this._unbindFormResetHandler(), this.menuWrap.remove(), this.button.remove(), this.element.show(), this.element.removeUniqueId(), this.labels.attr("for", this.ids.element) }
        }]), a.widget("ui.slider", a.ui.mouse, { version: "1.12.0", widgetEventPrefix: "slide", options: { animate: !1, classes: { "ui-slider": "ui-corner-all", "ui-slider-handle": "ui-corner-all", "ui-slider-range": "ui-corner-all ui-widget-header" }, distance: 0, max: 100, min: 0, orientation: "horizontal", range: !1, step: 1, value: 0, values: null, change: null, slide: null, start: null, stop: null }, numPages: 5, _create: function() { this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this._calculateNewMax(), this._addClass("ui-slider ui-slider-" + this.orientation, "ui-widget ui-widget-content"), this._refresh(), this._animateOff = !1 }, _refresh: function() { this._createRange(), this._createHandles(), this._setupEvents(), this._refreshValue() }, _createHandles: function() { var b, c, d = this.options,
                    e = this.element.find(".ui-slider-handle"),
                    f = "<span tabindex='0'></span>",
                    g = []; for (c = d.values && d.values.length || 1, e.length > c && (e.slice(c).remove(), e = e.slice(0, c)), b = e.length; b < c; b++) g.push(f);
                this.handles = e.add(a(g.join("")).appendTo(this.element)), this._addClass(this.handles, "ui-slider-handle", "ui-state-default"), this.handle = this.handles.eq(0), this.handles.each(function(b) { a(this).data("ui-slider-handle-index", b) }) }, _createRange: function() { var b = this.options;
                b.range ? (b.range === !0 && (b.values ? b.values.length && 2 !== b.values.length ? b.values = [b.values[0], b.values[0]] : a.isArray(b.values) && (b.values = b.values.slice(0)) : b.values = [this._valueMin(), this._valueMin()]), this.range && this.range.length ? (this._removeClass(this.range, "ui-slider-range-min ui-slider-range-max"), this.range.css({ left: "", bottom: "" })) : (this.range = a("<div>").appendTo(this.element), this._addClass(this.range, "ui-slider-range")), "min" !== b.range && "max" !== b.range || this._addClass(this.range, "ui-slider-range-" + b.range)) : (this.range && this.range.remove(), this.range = null) }, _setupEvents: function() { this._off(this.handles), this._on(this.handles, this._handleEvents), this._hoverable(this.handles), this._focusable(this.handles) }, _destroy: function() { this.handles.remove(), this.range && this.range.remove(), this._mouseDestroy() }, _mouseCapture: function(b) { var c, d, e, f, g, h, i, j, k = this,
                    l = this.options; return !l.disabled && (this.elementSize = { width: this.element.outerWidth(), height: this.element.outerHeight() }, this.elementOffset = this.element.offset(), c = { x: b.pageX, y: b.pageY }, d = this._normValueFromMouse(c), e = this._valueMax() - this._valueMin() + 1, this.handles.each(function(b) { var c = Math.abs(d - k.values(b));
                    (e > c || e === c && (b === k._lastChangedValue || k.values(b) === l.min)) && (e = c, f = a(this), g = b) }), h = this._start(b, g), h !== !1 && (this._mouseSliding = !0, this._handleIndex = g, this._addClass(f, null, "ui-state-active"), f.trigger("focus"), i = f.offset(), j = !a(b.target).parents().addBack().is(".ui-slider-handle"), this._clickOffset = j ? { left: 0, top: 0 } : { left: b.pageX - i.left - f.width() / 2, top: b.pageY - i.top - f.height() / 2 - (parseInt(f.css("borderTopWidth"), 10) || 0) - (parseInt(f.css("borderBottomWidth"), 10) || 0) + (parseInt(f.css("marginTop"), 10) || 0) }, this.handles.hasClass("ui-state-hover") || this._slide(b, g, d), this._animateOff = !0, !0)) }, _mouseStart: function() { return !0 }, _mouseDrag: function(a) { var b = { x: a.pageX, y: a.pageY },
                    c = this._normValueFromMouse(b); return this._slide(a, this._handleIndex, c), !1 }, _mouseStop: function(a) { return this._removeClass(this.handles, null, "ui-state-active"), this._mouseSliding = !1, this._stop(a, this._handleIndex), this._change(a, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1, !1 }, _detectOrientation: function() { this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal" }, _normValueFromMouse: function(a) { var b, c, d, e, f; return "horizontal" === this.orientation ? (b = this.elementSize.width, c = a.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (b = this.elementSize.height, c = a.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), d = c / b, d > 1 && (d = 1), d < 0 && (d = 0), "vertical" === this.orientation && (d = 1 - d), e = this._valueMax() - this._valueMin(), f = this._valueMin() + d * e, this._trimAlignValue(f) }, _uiHash: function(a, b, c) { var d = { handle: this.handles[a], handleIndex: a, value: void 0 !== b ? b : this.value() }; return this._hasMultipleValues() && (d.value = void 0 !== b ? b : this.values(a), d.values = c || this.values()), d }, _hasMultipleValues: function() { return this.options.values && this.options.values.length }, _start: function(a, b) { return this._trigger("start", a, this._uiHash(b)) }, _slide: function(a, b, c) { var d, e, f = this.value(),
                    g = this.values();
                this._hasMultipleValues() && (e = this.values(b ? 0 : 1), f = this.values(b), 2 === this.options.values.length && this.options.range === !0 && (c = 0 === b ? Math.min(e, c) : Math.max(e, c)), g[b] = c), c !== f && (d = this._trigger("slide", a, this._uiHash(b, c, g)), d !== !1 && (this._hasMultipleValues() ? this.values(b, c) : this.value(c))) }, _stop: function(a, b) { this._trigger("stop", a, this._uiHash(b)) }, _change: function(a, b) { this._keySliding || this._mouseSliding || (this._lastChangedValue = b, this._trigger("change", a, this._uiHash(b))) }, value: function(a) { return arguments.length ? (this.options.value = this._trimAlignValue(a), this._refreshValue(), void this._change(null, 0)) : this._value() }, values: function(b, c) { var d, e, f; if (arguments.length > 1) return this.options.values[b] = this._trimAlignValue(c), this._refreshValue(), void this._change(null, b); if (!arguments.length) return this._values(); if (!a.isArray(arguments[0])) return this._hasMultipleValues() ? this._values(b) : this.value(); for (d = this.options.values, e = arguments[0], f = 0; f < d.length; f += 1) d[f] = this._trimAlignValue(e[f]), this._change(null, f);
                this._refreshValue() }, _setOption: function(b, c) { var d, e = 0; switch ("range" === b && this.options.range === !0 && ("min" === c ? (this.options.value = this._values(0), this.options.values = null) : "max" === c && (this.options.value = this._values(this.options.values.length - 1), this.options.values = null)), a.isArray(this.options.values) && (e = this.options.values.length), this._super(b, c), b) {
                    case "orientation":
                        this._detectOrientation(), this._removeClass("ui-slider-horizontal ui-slider-vertical")._addClass("ui-slider-" + this.orientation), this._refreshValue(), this.options.range && this._refreshRange(c), this.handles.css("horizontal" === c ? "bottom" : "left", ""); break;
                    case "value":
                        this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1; break;
                    case "values":
                        for (this._animateOff = !0, this._refreshValue(), d = e - 1; d >= 0; d--) this._change(null, d);
                        this._animateOff = !1; break;
                    case "step":
                    case "min":
                    case "max":
                        this._animateOff = !0, this._calculateNewMax(), this._refreshValue(), this._animateOff = !1; break;
                    case "range":
                        this._animateOff = !0, this._refresh(), this._animateOff = !1 } }, _setOptionDisabled: function(a) { this._super(a), this._toggleClass(null, "ui-state-disabled", !!a) }, _value: function() { var a = this.options.value; return a = this._trimAlignValue(a) }, _values: function(a) { var b, c, d; if (arguments.length) return b = this.options.values[a], b = this._trimAlignValue(b); if (this._hasMultipleValues()) { for (c = this.options.values.slice(), d = 0; d < c.length; d += 1) c[d] = this._trimAlignValue(c[d]); return c } return [] }, _trimAlignValue: function(a) { if (a <= this._valueMin()) return this._valueMin(); if (a >= this._valueMax()) return this._valueMax(); var b = this.options.step > 0 ? this.options.step : 1,
                    c = (a - this._valueMin()) % b,
                    d = a - c; return 2 * Math.abs(c) >= b && (d += c > 0 ? b : -b), parseFloat(d.toFixed(5)) }, _calculateNewMax: function() { var a = this.options.max,
                    b = this._valueMin(),
                    c = this.options.step,
                    d = Math.round((a - b) / c) * c;
                a = d + b, a > this.options.max && (a -= c), this.max = parseFloat(a.toFixed(this._precision())) }, _precision: function() { var a = this._precisionOf(this.options.step); return null !== this.options.min && (a = Math.max(a, this._precisionOf(this.options.min))), a }, _precisionOf: function(a) { var b = a.toString(),
                    c = b.indexOf("."); return c === -1 ? 0 : b.length - c - 1 }, _valueMin: function() { return this.options.min }, _valueMax: function() { return this.max }, _refreshRange: function(a) { "vertical" === a && this.range.css({ width: "", left: "" }), "horizontal" === a && this.range.css({ height: "", bottom: "" }) }, _refreshValue: function() { var b, c, d, e, f, g = this.options.range,
                    h = this.options,
                    i = this,
                    j = !this._animateOff && h.animate,
                    k = {};
                this._hasMultipleValues() ? this.handles.each(function(d) { c = (i.values(d) - i._valueMin()) / (i._valueMax() - i._valueMin()) * 100, k["horizontal" === i.orientation ? "left" : "bottom"] = c + "%", a(this).stop(1, 1)[j ? "animate" : "css"](k, h.animate), i.options.range === !0 && ("horizontal" === i.orientation ? (0 === d && i.range.stop(1, 1)[j ? "animate" : "css"]({ left: c + "%" }, h.animate), 1 === d && i.range[j ? "animate" : "css"]({ width: c - b + "%" }, { queue: !1, duration: h.animate })) : (0 === d && i.range.stop(1, 1)[j ? "animate" : "css"]({ bottom: c + "%" }, h.animate), 1 === d && i.range[j ? "animate" : "css"]({ height: c - b + "%" }, { queue: !1, duration: h.animate }))), b = c }) : (d = this.value(), e = this._valueMin(), f = this._valueMax(), c = f !== e ? (d - e) / (f - e) * 100 : 0, k["horizontal" === this.orientation ? "left" : "bottom"] = c + "%", this.handle.stop(1, 1)[j ? "animate" : "css"](k, h.animate), "min" === g && "horizontal" === this.orientation && this.range.stop(1, 1)[j ? "animate" : "css"]({ width: c + "%" }, h.animate), "max" === g && "horizontal" === this.orientation && this.range.stop(1, 1)[j ? "animate" : "css"]({ width: 100 - c + "%" }, h.animate), "min" === g && "vertical" === this.orientation && this.range.stop(1, 1)[j ? "animate" : "css"]({ height: c + "%" }, h.animate), "max" === g && "vertical" === this.orientation && this.range.stop(1, 1)[j ? "animate" : "css"]({ height: 100 - c + "%" }, h.animate)) }, _handleEvents: { keydown: function(b) { var c, d, e, f, g = a(b.target).data("ui-slider-handle-index"); switch (b.keyCode) {
                        case a.ui.keyCode.HOME:
                        case a.ui.keyCode.END:
                        case a.ui.keyCode.PAGE_UP:
                        case a.ui.keyCode.PAGE_DOWN:
                        case a.ui.keyCode.UP:
                        case a.ui.keyCode.RIGHT:
                        case a.ui.keyCode.DOWN:
                        case a.ui.keyCode.LEFT:
                            if (b.preventDefault(), !this._keySliding && (this._keySliding = !0, this._addClass(a(b.target), null, "ui-state-active"), c = this._start(b, g), c === !1)) return } switch (f = this.options.step, d = e = this._hasMultipleValues() ? this.values(g) : this.value(), b.keyCode) {
                        case a.ui.keyCode.HOME:
                            e = this._valueMin(); break;
                        case a.ui.keyCode.END:
                            e = this._valueMax(); break;
                        case a.ui.keyCode.PAGE_UP:
                            e = this._trimAlignValue(d + (this._valueMax() - this._valueMin()) / this.numPages); break;
                        case a.ui.keyCode.PAGE_DOWN:
                            e = this._trimAlignValue(d - (this._valueMax() - this._valueMin()) / this.numPages); break;
                        case a.ui.keyCode.UP:
                        case a.ui.keyCode.RIGHT:
                            if (d === this._valueMax()) return;
                            e = this._trimAlignValue(d + f); break;
                        case a.ui.keyCode.DOWN:
                        case a.ui.keyCode.LEFT:
                            if (d === this._valueMin()) return;
                            e = this._trimAlignValue(d - f) } this._slide(b, g, e) }, keyup: function(b) { var c = a(b.target).data("ui-slider-handle-index");
                    this._keySliding && (this._keySliding = !1, this._stop(b, c), this._change(b, c), this._removeClass(a(b.target), null, "ui-state-active")) } } }), a.widget("ui.sortable", a.ui.mouse, {
            version: "1.12.0",
            widgetEventPrefix: "sort",
            ready: !1,
            options: { appendTo: "parent", axis: !1, connectWith: !1, containment: !1, cursor: "auto", cursorAt: !1, dropOnEmpty: !0, forcePlaceholderSize: !1, forceHelperSize: !1, grid: !1, handle: !1, helper: "original", items: "> *", opacity: !1, placeholder: !1, revert: !1, scroll: !0, scrollSensitivity: 20, scrollSpeed: 20, scope: "default", tolerance: "intersect", zIndex: 1e3, activate: null, beforeStop: null, change: null, deactivate: null, out: null, over: null, receive: null, remove: null, sort: null, start: null, stop: null, update: null },
            _isOverAxis: function(a, b, c) { return a >= b && a < b + c },
            _isFloating: function(a) { return /left|right/.test(a.css("float")) || /inline|table-cell/.test(a.css("display")) },
            _create: function() { this.containerCache = {}, this._addClass("ui-sortable"), this.refresh(), this.offset = this.element.offset(), this._mouseInit(), this._setHandleClassName(), this.ready = !0 },
            _setOption: function(a, b) { this._super(a, b), "handle" === a && this._setHandleClassName() },
            _setHandleClassName: function() { var b = this;
                this._removeClass(this.element.find(".ui-sortable-handle"), "ui-sortable-handle"), a.each(this.items, function() { b._addClass(this.instance.options.handle ? this.item.find(this.instance.options.handle) : this.item, "ui-sortable-handle") }) },
            _destroy: function() { this._mouseDestroy(); for (var a = this.items.length - 1; a >= 0; a--) this.items[a].item.removeData(this.widgetName + "-item"); return this },
            _mouseCapture: function(b, c) { var d = null,
                    e = !1,
                    f = this; return !this.reverting && (!this.options.disabled && "static" !== this.options.type && (this._refreshItems(b), a(b.target).parents().each(function() { if (a.data(this, f.widgetName + "-item") === f) return d = a(this), !1 }), a.data(b.target, f.widgetName + "-item") === f && (d = a(b.target)), !!d && (!(this.options.handle && !c && (a(this.options.handle, d).find("*").addBack().each(function() { this === b.target && (e = !0) }), !e)) && (this.currentItem = d, this._removeCurrentsFromItems(), !0)))) },
            _mouseStart: function(b, c, d) { var e, f, g = this.options; if (this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(b), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = { top: this.offset.top - this.margins.top, left: this.offset.left - this.margins.left }, a.extend(this.offset, { click: { left: b.pageX - this.offset.left, top: b.pageY - this.offset.top }, parent: this._getParentOffset(), relative: this._getRelativeOffset() }), this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), this.originalPosition = this._generatePosition(b), this.originalPageX = b.pageX, this.originalPageY = b.pageY, g.cursorAt && this._adjustOffsetFromHelper(g.cursorAt), this.domPosition = { prev: this.currentItem.prev()[0], parent: this.currentItem.parent()[0] }, this.helper[0] !== this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), g.containment && this._setContainment(), g.cursor && "auto" !== g.cursor && (f = this.document.find("body"), this.storedCursor = f.css("cursor"), f.css("cursor", g.cursor), this.storedStylesheet = a("<style>*{ cursor: " + g.cursor + " !important; }</style>").appendTo(f)), g.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", g.opacity)), g.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", g.zIndex)), this.scrollParent[0] !== this.document[0] && "HTML" !== this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()), this._trigger("start", b, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions(), !d)
                    for (e = this.containers.length - 1; e >= 0; e--) this.containers[e]._trigger("activate", b, this._uiHash(this)); return a.ui.ddmanager && (a.ui.ddmanager.current = this), a.ui.ddmanager && !g.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b), this.dragging = !0, this._addClass(this.helper, "ui-sortable-helper"), this._mouseDrag(b), !0 },
            _mouseDrag: function(b) { var c, d, e, f, g = this.options,
                    h = !1; for (this.position = this._generatePosition(b), this.positionAbs = this._convertPositionTo("absolute"), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll && (this.scrollParent[0] !== this.document[0] && "HTML" !== this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - b.pageY < g.scrollSensitivity ? this.scrollParent[0].scrollTop = h = this.scrollParent[0].scrollTop + g.scrollSpeed : b.pageY - this.overflowOffset.top < g.scrollSensitivity && (this.scrollParent[0].scrollTop = h = this.scrollParent[0].scrollTop - g.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - b.pageX < g.scrollSensitivity ? this.scrollParent[0].scrollLeft = h = this.scrollParent[0].scrollLeft + g.scrollSpeed : b.pageX - this.overflowOffset.left < g.scrollSensitivity && (this.scrollParent[0].scrollLeft = h = this.scrollParent[0].scrollLeft - g.scrollSpeed)) : (b.pageY - this.document.scrollTop() < g.scrollSensitivity ? h = this.document.scrollTop(this.document.scrollTop() - g.scrollSpeed) : this.window.height() - (b.pageY - this.document.scrollTop()) < g.scrollSensitivity && (h = this.document.scrollTop(this.document.scrollTop() + g.scrollSpeed)), b.pageX - this.document.scrollLeft() < g.scrollSensitivity ? h = this.document.scrollLeft(this.document.scrollLeft() - g.scrollSpeed) : this.window.width() - (b.pageX - this.document.scrollLeft()) < g.scrollSensitivity && (h = this.document.scrollLeft(this.document.scrollLeft() + g.scrollSpeed))), h !== !1 && a.ui.ddmanager && !g.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b)), this.positionAbs = this._convertPositionTo("absolute"), this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), c = this.items.length - 1; c >= 0; c--)
                    if (d = this.items[c], e = d.item[0], f = this._intersectsWithPointer(d), f && d.instance === this.currentContainer && !(e === this.currentItem[0] || this.placeholder[1 === f ? "next" : "prev"]()[0] === e || a.contains(this.placeholder[0], e) || "semi-dynamic" === this.options.type && a.contains(this.element[0], e))) { if (this.direction = 1 === f ? "down" : "up", "pointer" !== this.options.tolerance && !this._intersectsWithSides(d)) break;
                        this._rearrange(b, d), this._trigger("change", b, this._uiHash()); break }
                return this._contactContainers(b), a.ui.ddmanager && a.ui.ddmanager.drag(this, b), this._trigger("sort", b, this._uiHash()), this.lastPositionAbs = this.positionAbs, !1 },
            _mouseStop: function(b, c) { if (b) { if (a.ui.ddmanager && !this.options.dropBehaviour && a.ui.ddmanager.drop(this, b), this.options.revert) { var d = this,
                            e = this.placeholder.offset(),
                            f = this.options.axis,
                            g = {};
                        f && "x" !== f || (g.left = e.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollLeft)), f && "y" !== f || (g.top = e.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollTop)), this.reverting = !0, a(this.helper).animate(g, parseInt(this.options.revert, 10) || 500, function() { d._clear(b) }) } else this._clear(b, c); return !1 } },
            cancel: function() { if (this.dragging) { this._mouseUp({ target: null }), "original" === this.options.helper ? (this.currentItem.css(this._storedCSS), this._removeClass(this.currentItem, "ui-sortable-helper")) : this.currentItem.show(); for (var b = this.containers.length - 1; b >= 0; b--) this.containers[b]._trigger("deactivate", null, this._uiHash(this)), this.containers[b].containerCache.over && (this.containers[b]._trigger("out", null, this._uiHash(this)), this.containers[b].containerCache.over = 0) } return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), "original" !== this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(), a.extend(this, { helper: null, dragging: !1, reverting: !1, _noFinalSort: null }), this.domPosition.prev ? a(this.domPosition.prev).after(this.currentItem) : a(this.domPosition.parent).prepend(this.currentItem)), this },
            serialize: function(b) { var c = this._getItemsAsjQuery(b && b.connected),
                    d = []; return b = b || {}, a(c).each(function() { var c = (a(b.item || this).attr(b.attribute || "id") || "").match(b.expression || /(.+)[\-=_](.+)/);
                    c && d.push((b.key || c[1] + "[]") + "=" + (b.key && b.expression ? c[1] : c[2])) }), !d.length && b.key && d.push(b.key + "="), d.join("&") },
            toArray: function(b) { var c = this._getItemsAsjQuery(b && b.connected),
                    d = []; return b = b || {}, c.each(function() { d.push(a(b.item || this).attr(b.attribute || "id") || "") }), d },
            _intersectsWith: function(a) { var b = this.positionAbs.left,
                    c = b + this.helperProportions.width,
                    d = this.positionAbs.top,
                    e = d + this.helperProportions.height,
                    f = a.left,
                    g = f + a.width,
                    h = a.top,
                    i = h + a.height,
                    j = this.offset.click.top,
                    k = this.offset.click.left,
                    l = "x" === this.options.axis || d + j > h && d + j < i,
                    m = "y" === this.options.axis || b + k > f && b + k < g,
                    n = l && m; return "pointer" === this.options.tolerance || this.options.forcePointerForContainers || "pointer" !== this.options.tolerance && this.helperProportions[this.floating ? "width" : "height"] > a[this.floating ? "width" : "height"] ? n : f < b + this.helperProportions.width / 2 && c - this.helperProportions.width / 2 < g && h < d + this.helperProportions.height / 2 && e - this.helperProportions.height / 2 < i },
            _intersectsWithPointer: function(a) { var b, c, d = "x" === this.options.axis || this._isOverAxis(this.positionAbs.top + this.offset.click.top, a.top, a.height),
                    e = "y" === this.options.axis || this._isOverAxis(this.positionAbs.left + this.offset.click.left, a.left, a.width),
                    f = d && e; return !!f && (b = this._getDragVerticalDirection(), c = this._getDragHorizontalDirection(), this.floating ? "right" === c || "down" === b ? 2 : 1 : b && ("down" === b ? 2 : 1)) },
            _intersectsWithSides: function(a) { var b = this._isOverAxis(this.positionAbs.top + this.offset.click.top, a.top + a.height / 2, a.height),
                    c = this._isOverAxis(this.positionAbs.left + this.offset.click.left, a.left + a.width / 2, a.width),
                    d = this._getDragVerticalDirection(),
                    e = this._getDragHorizontalDirection(); return this.floating && e ? "right" === e && c || "left" === e && !c : d && ("down" === d && b || "up" === d && !b) },
            _getDragVerticalDirection: function() { var a = this.positionAbs.top - this.lastPositionAbs.top; return 0 !== a && (a > 0 ? "down" : "up") },
            _getDragHorizontalDirection: function() { var a = this.positionAbs.left - this.lastPositionAbs.left; return 0 !== a && (a > 0 ? "right" : "left") },
            refresh: function(a) { return this._refreshItems(a), this._setHandleClassName(), this.refreshPositions(), this },
            _connectWith: function() { var a = this.options; return a.connectWith.constructor === String ? [a.connectWith] : a.connectWith },
            _getItemsAsjQuery: function(b) {
                function c() { h.push(this) } var d, e, f, g, h = [],
                    i = [],
                    j = this._connectWith(); if (j && b)
                    for (d = j.length - 1; d >= 0; d--)
                        for (f = a(j[d], this.document[0]), e = f.length - 1; e >= 0; e--) g = a.data(f[e], this.widgetFullName), g && g !== this && !g.options.disabled && i.push([a.isFunction(g.options.items) ? g.options.items.call(g.element) : a(g.options.items, g.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), g]); for (i.push([a.isFunction(this.options.items) ? this.options.items.call(this.element, null, { options: this.options, item: this.currentItem }) : a(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]), d = i.length - 1; d >= 0; d--) i[d][0].each(c); return a(h) },
            _removeCurrentsFromItems: function() { var b = this.currentItem.find(":data(" + this.widgetName + "-item)");
                this.items = a.grep(this.items, function(a) { for (var c = 0; c < b.length; c++)
                        if (b[c] === a.item[0]) return !1; return !0 }) },
            _refreshItems: function(b) { this.items = [], this.containers = [this]; var c, d, e, f, g, h, i, j, k = this.items,
                    l = [
                        [a.isFunction(this.options.items) ? this.options.items.call(this.element[0], b, { item: this.currentItem }) : a(this.options.items, this.element), this]
                    ],
                    m = this._connectWith(); if (m && this.ready)
                    for (c = m.length - 1; c >= 0; c--)
                        for (e = a(m[c], this.document[0]), d = e.length - 1; d >= 0; d--) f = a.data(e[d], this.widgetFullName), f && f !== this && !f.options.disabled && (l.push([a.isFunction(f.options.items) ? f.options.items.call(f.element[0], b, { item: this.currentItem }) : a(f.options.items, f.element), f]), this.containers.push(f)); for (c = l.length - 1; c >= 0; c--)
                    for (g = l[c][1], h = l[c][0], d = 0, j = h.length; d < j; d++) i = a(h[d]), i.data(this.widgetName + "-item", g), k.push({ item: i, instance: g, width: 0, height: 0, left: 0, top: 0 }) },
            refreshPositions: function(b) { this.floating = !!this.items.length && ("x" === this.options.axis || this._isFloating(this.items[0].item)), this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset()); var c, d, e, f; for (c = this.items.length - 1; c >= 0; c--) d = this.items[c], d.instance !== this.currentContainer && this.currentContainer && d.item[0] !== this.currentItem[0] || (e = this.options.toleranceElement ? a(this.options.toleranceElement, d.item) : d.item, b || (d.width = e.outerWidth(), d.height = e.outerHeight()), f = e.offset(), d.left = f.left, d.top = f.top); if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this);
                else
                    for (c = this.containers.length - 1; c >= 0; c--) f = this.containers[c].element.offset(), this.containers[c].containerCache.left = f.left, this.containers[c].containerCache.top = f.top, this.containers[c].containerCache.width = this.containers[c].element.outerWidth(), this.containers[c].containerCache.height = this.containers[c].element.outerHeight(); return this },
            _createPlaceholder: function(b) { b = b || this; var c, d = b.options;
                d.placeholder && d.placeholder.constructor !== String || (c = d.placeholder, d.placeholder = { element: function() { var d = b.currentItem[0].nodeName.toLowerCase(),
                            e = a("<" + d + ">", b.document[0]); return b._addClass(e, "ui-sortable-placeholder", c || b.currentItem[0].className)._removeClass(e, "ui-sortable-helper"), "tbody" === d ? b._createTrPlaceholder(b.currentItem.find("tr").eq(0), a("<tr>", b.document[0]).appendTo(e)) : "tr" === d ? b._createTrPlaceholder(b.currentItem, e) : "img" === d && e.attr("src", b.currentItem.attr("src")), c || e.css("visibility", "hidden"), e }, update: function(a, e) { c && !d.forcePlaceholderSize || (e.height() || e.height(b.currentItem.innerHeight() - parseInt(b.currentItem.css("paddingTop") || 0, 10) - parseInt(b.currentItem.css("paddingBottom") || 0, 10)), e.width() || e.width(b.currentItem.innerWidth() - parseInt(b.currentItem.css("paddingLeft") || 0, 10) - parseInt(b.currentItem.css("paddingRight") || 0, 10))) } }), b.placeholder = a(d.placeholder.element.call(b.element, b.currentItem)), b.currentItem.after(b.placeholder), d.placeholder.update(b, b.placeholder) },
            _createTrPlaceholder: function(b, c) { var d = this;
                b.children().each(function() { a("<td>&#160;</td>", d.document[0]).attr("colspan", a(this).attr("colspan") || 1).appendTo(c) }) },
            _contactContainers: function(b) { var c, d, e, f, g, h, i, j, k, l, m = null,
                    n = null; for (c = this.containers.length - 1; c >= 0; c--)
                    if (!a.contains(this.currentItem[0], this.containers[c].element[0]))
                        if (this._intersectsWith(this.containers[c].containerCache)) { if (m && a.contains(this.containers[c].element[0], m.element[0])) continue;
                            m = this.containers[c], n = c } else this.containers[c].containerCache.over && (this.containers[c]._trigger("out", b, this._uiHash(this)), this.containers[c].containerCache.over = 0); if (m)
                    if (1 === this.containers.length) this.containers[n].containerCache.over || (this.containers[n]._trigger("over", b, this._uiHash(this)), this.containers[n].containerCache.over = 1);
                    else { for (e = 1e4, f = null, k = m.floating || this._isFloating(this.currentItem), g = k ? "left" : "top", h = k ? "width" : "height", l = k ? "pageX" : "pageY", d = this.items.length - 1; d >= 0; d--) a.contains(this.containers[n].element[0], this.items[d].item[0]) && this.items[d].item[0] !== this.currentItem[0] && (i = this.items[d].item.offset()[g], j = !1, b[l] - i > this.items[d][h] / 2 && (j = !0), Math.abs(b[l] - i) < e && (e = Math.abs(b[l] - i), f = this.items[d], this.direction = j ? "up" : "down")); if (!f && !this.options.dropOnEmpty) return; if (this.currentContainer === this.containers[n]) return void(this.currentContainer.containerCache.over || (this.containers[n]._trigger("over", b, this._uiHash()), this.currentContainer.containerCache.over = 1));
                        f ? this._rearrange(b, f, null, !0) : this._rearrange(b, null, this.containers[n].element, !0), this._trigger("change", b, this._uiHash()), this.containers[n]._trigger("change", b, this._uiHash(this)), this.currentContainer = this.containers[n], this.options.placeholder.update(this.currentContainer, this.placeholder), this.containers[n]._trigger("over", b, this._uiHash(this)), this.containers[n].containerCache.over = 1 } },
            _createHelper: function(b) { var c = this.options,
                    d = a.isFunction(c.helper) ? a(c.helper.apply(this.element[0], [b, this.currentItem])) : "clone" === c.helper ? this.currentItem.clone() : this.currentItem; return d.parents("body").length || a("parent" !== c.appendTo ? c.appendTo : this.currentItem[0].parentNode)[0].appendChild(d[0]), d[0] === this.currentItem[0] && (this._storedCSS = { width: this.currentItem[0].style.width, height: this.currentItem[0].style.height, position: this.currentItem.css("position"), top: this.currentItem.css("top"), left: this.currentItem.css("left") }), d[0].style.width && !c.forceHelperSize || d.width(this.currentItem.width()), d[0].style.height && !c.forceHelperSize || d.height(this.currentItem.height()), d },
            _adjustOffsetFromHelper: function(b) {
                "string" == typeof b && (b = b.split(" ")), a.isArray(b) && (b = { left: +b[0], top: +b[1] || 0 }), "left" in b && (this.offset.click.left = b.left + this.margins.left), "right" in b && (this.offset.click.left = this.helperProportions.width - b.right + this.margins.left), "top" in b && (this.offset.click.top = b.top + this.margins.top),
                    "bottom" in b && (this.offset.click.top = this.helperProportions.height - b.bottom + this.margins.top)
            },
            _getParentOffset: function() { this.offsetParent = this.helper.offsetParent(); var b = this.offsetParent.offset(); return "absolute" === this.cssPosition && this.scrollParent[0] !== this.document[0] && a.contains(this.scrollParent[0], this.offsetParent[0]) && (b.left += this.scrollParent.scrollLeft(), b.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === this.document[0].body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && a.ui.ie) && (b = { top: 0, left: 0 }), { top: b.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0), left: b.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0) } },
            _getRelativeOffset: function() { if ("relative" === this.cssPosition) { var a = this.currentItem.position(); return { top: a.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(), left: a.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft() } } return { top: 0, left: 0 } },
            _cacheMargins: function() { this.margins = { left: parseInt(this.currentItem.css("marginLeft"), 10) || 0, top: parseInt(this.currentItem.css("marginTop"), 10) || 0 } },
            _cacheHelperProportions: function() { this.helperProportions = { width: this.helper.outerWidth(), height: this.helper.outerHeight() } },
            _setContainment: function() { var b, c, d, e = this.options; "parent" === e.containment && (e.containment = this.helper[0].parentNode), "document" !== e.containment && "window" !== e.containment || (this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, "document" === e.containment ? this.document.width() : this.window.width() - this.helperProportions.width - this.margins.left, ("document" === e.containment ? this.document.height() || document.body.parentNode.scrollHeight : this.window.height() || this.document[0].body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]), /^(document|window|parent)$/.test(e.containment) || (b = a(e.containment)[0], c = a(e.containment).offset(), d = "hidden" !== a(b).css("overflow"), this.containment = [c.left + (parseInt(a(b).css("borderLeftWidth"), 10) || 0) + (parseInt(a(b).css("paddingLeft"), 10) || 0) - this.margins.left, c.top + (parseInt(a(b).css("borderTopWidth"), 10) || 0) + (parseInt(a(b).css("paddingTop"), 10) || 0) - this.margins.top, c.left + (d ? Math.max(b.scrollWidth, b.offsetWidth) : b.offsetWidth) - (parseInt(a(b).css("borderLeftWidth"), 10) || 0) - (parseInt(a(b).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, c.top + (d ? Math.max(b.scrollHeight, b.offsetHeight) : b.offsetHeight) - (parseInt(a(b).css("borderTopWidth"), 10) || 0) - (parseInt(a(b).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]) },
            _convertPositionTo: function(b, c) { c || (c = this.position); var d = "absolute" === b ? 1 : -1,
                    e = "absolute" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && a.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                    f = /(html|body)/i.test(e[0].tagName); return { top: c.top + this.offset.relative.top * d + this.offset.parent.top * d - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : f ? 0 : e.scrollTop()) * d, left: c.left + this.offset.relative.left * d + this.offset.parent.left * d - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : f ? 0 : e.scrollLeft()) * d } },
            _generatePosition: function(b) { var c, d, e = this.options,
                    f = b.pageX,
                    g = b.pageY,
                    h = "absolute" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && a.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                    i = /(html|body)/i.test(h[0].tagName); return "relative" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && this.scrollParent[0] !== this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset()), this.originalPosition && (this.containment && (b.pageX - this.offset.click.left < this.containment[0] && (f = this.containment[0] + this.offset.click.left), b.pageY - this.offset.click.top < this.containment[1] && (g = this.containment[1] + this.offset.click.top), b.pageX - this.offset.click.left > this.containment[2] && (f = this.containment[2] + this.offset.click.left), b.pageY - this.offset.click.top > this.containment[3] && (g = this.containment[3] + this.offset.click.top)), e.grid && (c = this.originalPageY + Math.round((g - this.originalPageY) / e.grid[1]) * e.grid[1], g = this.containment ? c - this.offset.click.top >= this.containment[1] && c - this.offset.click.top <= this.containment[3] ? c : c - this.offset.click.top >= this.containment[1] ? c - e.grid[1] : c + e.grid[1] : c, d = this.originalPageX + Math.round((f - this.originalPageX) / e.grid[0]) * e.grid[0], f = this.containment ? d - this.offset.click.left >= this.containment[0] && d - this.offset.click.left <= this.containment[2] ? d : d - this.offset.click.left >= this.containment[0] ? d - e.grid[0] : d + e.grid[0] : d)), { top: g - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : i ? 0 : h.scrollTop()), left: f - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : i ? 0 : h.scrollLeft()) } },
            _rearrange: function(a, b, c, d) { c ? c[0].appendChild(this.placeholder[0]) : b.item[0].parentNode.insertBefore(this.placeholder[0], "down" === this.direction ? b.item[0] : b.item[0].nextSibling), this.counter = this.counter ? ++this.counter : 1; var e = this.counter;
                this._delay(function() { e === this.counter && this.refreshPositions(!d) }) },
            _clear: function(a, b) {
                function c(a, b, c) { return function(d) { c._trigger(a, d, b._uiHash(b)) } } this.reverting = !1; var d, e = []; if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null, this.helper[0] === this.currentItem[0]) { for (d in this._storedCSS) "auto" !== this._storedCSS[d] && "static" !== this._storedCSS[d] || (this._storedCSS[d] = "");
                    this.currentItem.css(this._storedCSS), this._removeClass(this.currentItem, "ui-sortable-helper") } else this.currentItem.show(); for (this.fromOutside && !b && e.push(function(a) { this._trigger("receive", a, this._uiHash(this.fromOutside)) }), !this.fromOutside && this.domPosition.prev === this.currentItem.prev().not(".ui-sortable-helper")[0] && this.domPosition.parent === this.currentItem.parent()[0] || b || e.push(function(a) { this._trigger("update", a, this._uiHash()) }), this !== this.currentContainer && (b || (e.push(function(a) { this._trigger("remove", a, this._uiHash()) }), e.push(function(a) { return function(b) { a._trigger("receive", b, this._uiHash(this)) } }.call(this, this.currentContainer)), e.push(function(a) { return function(b) { a._trigger("update", b, this._uiHash(this)) } }.call(this, this.currentContainer)))), d = this.containers.length - 1; d >= 0; d--) b || e.push(c("deactivate", this, this.containers[d])), this.containers[d].containerCache.over && (e.push(c("out", this, this.containers[d])), this.containers[d].containerCache.over = 0); if (this.storedCursor && (this.document.find("body").css("cursor", this.storedCursor), this.storedStylesheet.remove()), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), this._storedZIndex && this.helper.css("zIndex", "auto" === this._storedZIndex ? "" : this._storedZIndex), this.dragging = !1, b || this._trigger("beforeStop", a, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.cancelHelperRemoval || (this.helper[0] !== this.currentItem[0] && this.helper.remove(), this.helper = null), !b) { for (d = 0; d < e.length; d++) e[d].call(this, a);
                    this._trigger("stop", a, this._uiHash()) } return this.fromOutside = !1, !this.cancelHelperRemoval },
            _trigger: function() { a.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel() },
            _uiHash: function(b) { var c = b || this; return { helper: c.helper, placeholder: c.placeholder || a([]), position: c.position, originalPosition: c.originalPosition, offset: c.positionAbs, item: c.currentItem, sender: b ? b.element : null } }
        });
        a.widget("ui.spinner", { version: "1.12.0", defaultElement: "<input>", widgetEventPrefix: "spin", options: { classes: { "ui-spinner": "ui-corner-all", "ui-spinner-down": "ui-corner-br", "ui-spinner-up": "ui-corner-tr" }, culture: null, icons: { down: "ui-icon-triangle-1-s", up: "ui-icon-triangle-1-n" }, incremental: !0, max: null, min: null, numberFormat: null, page: 10, step: 1, change: null, spin: null, start: null, stop: null }, _create: function() { this._setOption("max", this.options.max), this._setOption("min", this.options.min), this._setOption("step", this.options.step), "" !== this.value() && this._value(this.element.val(), !0), this._draw(), this._on(this._events), this._refresh(), this._on(this.window, { beforeunload: function() { this.element.removeAttr("autocomplete") } }) }, _getCreateOptions: function() { var b = this._super(),
                    c = this.element; return a.each(["min", "max", "step"], function(a, d) { var e = c.attr(d);
                    null != e && e.length && (b[d] = e) }), b }, _events: { keydown: function(a) { this._start(a) && this._keydown(a) && a.preventDefault() }, keyup: "_stop", focus: function() { this.previous = this.element.val() }, blur: function(a) { return this.cancelBlur ? void delete this.cancelBlur : (this._stop(), this._refresh(), void(this.previous !== this.element.val() && this._trigger("change", a))) }, mousewheel: function(a, b) { if (b) { if (!this.spinning && !this._start(a)) return !1;
                        this._spin((b > 0 ? 1 : -1) * this.options.step, a), clearTimeout(this.mousewheelTimer), this.mousewheelTimer = this._delay(function() { this.spinning && this._stop(a) }, 100), a.preventDefault() } }, "mousedown .ui-spinner-button": function(b) {
                    function c() { var b = this.element[0] === a.ui.safeActiveElement(this.document[0]);
                        b || (this.element.trigger("focus"), this.previous = d, this._delay(function() { this.previous = d })) } var d;
                    d = this.element[0] === a.ui.safeActiveElement(this.document[0]) ? this.previous : this.element.val(), b.preventDefault(), c.call(this), this.cancelBlur = !0, this._delay(function() { delete this.cancelBlur, c.call(this) }), this._start(b) !== !1 && this._repeat(null, a(b.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, b) }, "mouseup .ui-spinner-button": "_stop", "mouseenter .ui-spinner-button": function(b) { if (a(b.currentTarget).hasClass("ui-state-active")) return this._start(b) !== !1 && void this._repeat(null, a(b.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, b) }, "mouseleave .ui-spinner-button": "_stop" }, _enhance: function() { this.uiSpinner = this.element.attr("autocomplete", "off").wrap("<span>").parent().append("<a></a><a></a>") }, _draw: function() { this._enhance(), this._addClass(this.uiSpinner, "ui-spinner", "ui-widget ui-widget-content"), this._addClass("ui-spinner-input"), this.element.attr("role", "spinbutton"), this.buttons = this.uiSpinner.children("a").attr("tabIndex", -1).attr("aria-hidden", !0).button({ classes: { "ui-button": "" } }), this._removeClass(this.buttons, "ui-corner-all"), this._addClass(this.buttons.first(), "ui-spinner-button ui-spinner-up"), this._addClass(this.buttons.last(), "ui-spinner-button ui-spinner-down"), this.buttons.first().button({ icon: this.options.icons.up, showLabel: !1 }), this.buttons.last().button({ icon: this.options.icons.down, showLabel: !1 }), this.buttons.height() > Math.ceil(.5 * this.uiSpinner.height()) && this.uiSpinner.height() > 0 && this.uiSpinner.height(this.uiSpinner.height()) }, _keydown: function(b) { var c = this.options,
                    d = a.ui.keyCode; switch (b.keyCode) {
                    case d.UP:
                        return this._repeat(null, 1, b), !0;
                    case d.DOWN:
                        return this._repeat(null, -1, b), !0;
                    case d.PAGE_UP:
                        return this._repeat(null, c.page, b), !0;
                    case d.PAGE_DOWN:
                        return this._repeat(null, -c.page, b), !0 } return !1 }, _start: function(a) { return !(!this.spinning && this._trigger("start", a) === !1) && (this.counter || (this.counter = 1), this.spinning = !0, !0) }, _repeat: function(a, b, c) { a = a || 500, clearTimeout(this.timer), this.timer = this._delay(function() { this._repeat(40, b, c) }, a), this._spin(b * this.options.step, c) }, _spin: function(a, b) { var c = this.value() || 0;
                this.counter || (this.counter = 1), c = this._adjustValue(c + a * this._increment(this.counter)), this.spinning && this._trigger("spin", b, { value: c }) === !1 || (this._value(c), this.counter++) }, _increment: function(b) { var c = this.options.incremental; return c ? a.isFunction(c) ? c(b) : Math.floor(b * b * b / 5e4 - b * b / 500 + 17 * b / 200 + 1) : 1 }, _precision: function() { var a = this._precisionOf(this.options.step); return null !== this.options.min && (a = Math.max(a, this._precisionOf(this.options.min))), a }, _precisionOf: function(a) { var b = a.toString(),
                    c = b.indexOf("."); return c === -1 ? 0 : b.length - c - 1 }, _adjustValue: function(a) { var b, c, d = this.options; return b = null !== d.min ? d.min : 0, c = a - b, c = Math.round(c / d.step) * d.step, a = b + c, a = parseFloat(a.toFixed(this._precision())), null !== d.max && a > d.max ? d.max : null !== d.min && a < d.min ? d.min : a }, _stop: function(a) { this.spinning && (clearTimeout(this.timer), clearTimeout(this.mousewheelTimer), this.counter = 0, this.spinning = !1, this._trigger("stop", a)) }, _setOption: function(a, b) { var c, d, e; return "culture" === a || "numberFormat" === a ? (c = this._parse(this.element.val()), this.options[a] = b, void this.element.val(this._format(c))) : ("max" !== a && "min" !== a && "step" !== a || "string" == typeof b && (b = this._parse(b)), "icons" === a && (d = this.buttons.first().find(".ui-icon"), this._removeClass(d, null, this.options.icons.up), this._addClass(d, null, b.up), e = this.buttons.last().find(".ui-icon"), this._removeClass(e, null, this.options.icons.down), this._addClass(e, null, b.down)), void this._super(a, b)) }, _setOptionDisabled: function(a) { this._super(a), this._toggleClass(this.uiSpinner, null, "ui-state-disabled", !!a), this.element.prop("disabled", !!a), this.buttons.button(a ? "disable" : "enable") }, _setOptions: h(function(a) { this._super(a) }), _parse: function(a) { return "string" == typeof a && "" !== a && (a = window.Globalize && this.options.numberFormat ? Globalize.parseFloat(a, 10, this.options.culture) : +a), "" === a || isNaN(a) ? null : a }, _format: function(a) { return "" === a ? "" : window.Globalize && this.options.numberFormat ? Globalize.format(a, this.options.numberFormat, this.options.culture) : a }, _refresh: function() { this.element.attr({ "aria-valuemin": this.options.min, "aria-valuemax": this.options.max, "aria-valuenow": this._parse(this.element.val()) }) }, isValid: function() { var a = this.value(); return null !== a && a === this._adjustValue(a) }, _value: function(a, b) { var c; "" !== a && (c = this._parse(a), null !== c && (b || (c = this._adjustValue(c)), a = this._format(c))), this.element.val(a), this._refresh() }, _destroy: function() { this.element.prop("disabled", !1).removeAttr("autocomplete role aria-valuemin aria-valuemax aria-valuenow"), this.uiSpinner.replaceWith(this.element) }, stepUp: h(function(a) { this._stepUp(a) }), _stepUp: function(a) { this._start() && (this._spin((a || 1) * this.options.step), this._stop()) }, stepDown: h(function(a) { this._stepDown(a) }), _stepDown: function(a) { this._start() && (this._spin((a || 1) * -this.options.step), this._stop()) }, pageUp: h(function(a) { this._stepUp((a || 1) * this.options.page) }), pageDown: h(function(a) { this._stepDown((a || 1) * this.options.page) }), value: function(a) { return arguments.length ? void h(this._value).call(this, a) : this._parse(this.element.val()) }, widget: function() { return this.uiSpinner } }), a.uiBackCompat !== !1 && a.widget("ui.spinner", a.ui.spinner, { _enhance: function() { this.uiSpinner = this.element.attr("autocomplete", "off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml()) }, _uiSpinnerHtml: function() { return "<span>" }, _buttonHtml: function() { return "<a></a><a></a>" } });
        a.ui.spinner;
        a.widget("ui.tabs", { version: "1.12.0", delay: 300, options: { active: null, classes: { "ui-tabs": "ui-corner-all", "ui-tabs-nav": "ui-corner-all", "ui-tabs-panel": "ui-corner-bottom", "ui-tabs-tab": "ui-corner-top" }, collapsible: !1, event: "click", heightStyle: "content", hide: null, show: null, activate: null, beforeActivate: null, beforeLoad: null, load: null }, _isLocal: function() { var a = /#.*$/; return function(b) { var c, d;
                    c = b.href.replace(a, ""), d = location.href.replace(a, ""); try { c = decodeURIComponent(c) } catch (e) {} try { d = decodeURIComponent(d) } catch (e) {} return b.hash.length > 1 && c === d } }(), _create: function() { var b = this,
                    c = this.options;
                this.running = !1, this._addClass("ui-tabs", "ui-widget ui-widget-content"), this._toggleClass("ui-tabs-collapsible", null, c.collapsible), this._processTabs(), c.active = this._initialActive(), a.isArray(c.disabled) && (c.disabled = a.unique(c.disabled.concat(a.map(this.tabs.filter(".ui-state-disabled"), function(a) { return b.tabs.index(a) }))).sort()), this.options.active !== !1 && this.anchors.length ? this.active = this._findActive(c.active) : this.active = a(), this._refresh(), this.active.length && this.load(c.active) }, _initialActive: function() { var b = this.options.active,
                    c = this.options.collapsible,
                    d = location.hash.substring(1); return null === b && (d && this.tabs.each(function(c, e) { if (a(e).attr("aria-controls") === d) return b = c, !1 }), null === b && (b = this.tabs.index(this.tabs.filter(".ui-tabs-active"))), null !== b && b !== -1 || (b = !!this.tabs.length && 0)), b !== !1 && (b = this.tabs.index(this.tabs.eq(b)), b === -1 && (b = !c && 0)), !c && b === !1 && this.anchors.length && (b = 0), b }, _getCreateEventData: function() { return { tab: this.active, panel: this.active.length ? this._getPanelForTab(this.active) : a() } }, _tabKeydown: function(b) { var c = a(a.ui.safeActiveElement(this.document[0])).closest("li"),
                    d = this.tabs.index(c),
                    e = !0; if (!this._handlePageNav(b)) { switch (b.keyCode) {
                        case a.ui.keyCode.RIGHT:
                        case a.ui.keyCode.DOWN:
                            d++; break;
                        case a.ui.keyCode.UP:
                        case a.ui.keyCode.LEFT:
                            e = !1, d--; break;
                        case a.ui.keyCode.END:
                            d = this.anchors.length - 1; break;
                        case a.ui.keyCode.HOME:
                            d = 0; break;
                        case a.ui.keyCode.SPACE:
                            return b.preventDefault(), clearTimeout(this.activating), void this._activate(d);
                        case a.ui.keyCode.ENTER:
                            return b.preventDefault(), clearTimeout(this.activating), void this._activate(d !== this.options.active && d);
                        default:
                            return } b.preventDefault(), clearTimeout(this.activating), d = this._focusNextTab(d, e), b.ctrlKey || b.metaKey || (c.attr("aria-selected", "false"), this.tabs.eq(d).attr("aria-selected", "true"), this.activating = this._delay(function() { this.option("active", d) }, this.delay)) } }, _panelKeydown: function(b) { this._handlePageNav(b) || b.ctrlKey && b.keyCode === a.ui.keyCode.UP && (b.preventDefault(), this.active.trigger("focus")) }, _handlePageNav: function(b) { return b.altKey && b.keyCode === a.ui.keyCode.PAGE_UP ? (this._activate(this._focusNextTab(this.options.active - 1, !1)), !0) : b.altKey && b.keyCode === a.ui.keyCode.PAGE_DOWN ? (this._activate(this._focusNextTab(this.options.active + 1, !0)), !0) : void 0 }, _findNextTab: function(b, c) {
                function d() { return b > e && (b = 0), b < 0 && (b = e), b } for (var e = this.tabs.length - 1; a.inArray(d(), this.options.disabled) !== -1;) b = c ? b + 1 : b - 1; return b }, _focusNextTab: function(a, b) { return a = this._findNextTab(a, b), this.tabs.eq(a).trigger("focus"), a }, _setOption: function(a, b) { return "active" === a ? void this._activate(b) : (this._super(a, b), "collapsible" === a && (this._toggleClass("ui-tabs-collapsible", null, b), b || this.options.active !== !1 || this._activate(0)), "event" === a && this._setupEvents(b), void("heightStyle" === a && this._setupHeightStyle(b))) }, _sanitizeSelector: function(a) { return a ? a.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&") : "" }, refresh: function() { var b = this.options,
                    c = this.tablist.children(":has(a[href])");
                b.disabled = a.map(c.filter(".ui-state-disabled"), function(a) { return c.index(a) }), this._processTabs(), b.active !== !1 && this.anchors.length ? this.active.length && !a.contains(this.tablist[0], this.active[0]) ? this.tabs.length === b.disabled.length ? (b.active = !1, this.active = a()) : this._activate(this._findNextTab(Math.max(0, b.active - 1), !1)) : b.active = this.tabs.index(this.active) : (b.active = !1, this.active = a()), this._refresh() }, _refresh: function() { this._setOptionDisabled(this.options.disabled), this._setupEvents(this.options.event), this._setupHeightStyle(this.options.heightStyle), this.tabs.not(this.active).attr({ "aria-selected": "false", "aria-expanded": "false", tabIndex: -1 }), this.panels.not(this._getPanelForTab(this.active)).hide().attr({ "aria-hidden": "true" }), this.active.length ? (this.active.attr({ "aria-selected": "true", "aria-expanded": "true", tabIndex: 0 }), this._addClass(this.active, "ui-tabs-active", "ui-state-active"), this._getPanelForTab(this.active).show().attr({ "aria-hidden": "false" })) : this.tabs.eq(0).attr("tabIndex", 0) }, _processTabs: function() { var b = this,
                    c = this.tabs,
                    d = this.anchors,
                    e = this.panels;
                this.tablist = this._getList().attr("role", "tablist"), this._addClass(this.tablist, "ui-tabs-nav", "ui-helper-reset ui-helper-clearfix ui-widget-header"), this.tablist.on("mousedown" + this.eventNamespace, "> li", function(b) { a(this).is(".ui-state-disabled") && b.preventDefault() }).on("focus" + this.eventNamespace, ".ui-tabs-anchor", function() { a(this).closest("li").is(".ui-state-disabled") && this.blur() }), this.tabs = this.tablist.find("> li:has(a[href])").attr({ role: "tab", tabIndex: -1 }), this._addClass(this.tabs, "ui-tabs-tab", "ui-state-default"), this.anchors = this.tabs.map(function() { return a("a", this)[0] }).attr({ role: "presentation", tabIndex: -1 }), this._addClass(this.anchors, "ui-tabs-anchor"), this.panels = a(), this.anchors.each(function(c, d) { var e, f, g, h = a(d).uniqueId().attr("id"),
                        i = a(d).closest("li"),
                        j = i.attr("aria-controls");
                    b._isLocal(d) ? (e = d.hash, g = e.substring(1), f = b.element.find(b._sanitizeSelector(e))) : (g = i.attr("aria-controls") || a({}).uniqueId()[0].id, e = "#" + g, f = b.element.find(e), f.length || (f = b._createPanel(g), f.insertAfter(b.panels[c - 1] || b.tablist)), f.attr("aria-live", "polite")), f.length && (b.panels = b.panels.add(f)), j && i.data("ui-tabs-aria-controls", j), i.attr({ "aria-controls": g, "aria-labelledby": h }), f.attr("aria-labelledby", h) }), this.panels.attr("role", "tabpanel"), this._addClass(this.panels, "ui-tabs-panel", "ui-widget-content"), c && (this._off(c.not(this.tabs)), this._off(d.not(this.anchors)), this._off(e.not(this.panels))) }, _getList: function() { return this.tablist || this.element.find("ol, ul").eq(0) }, _createPanel: function(b) { return a("<div>").attr("id", b).data("ui-tabs-destroy", !0) }, _setOptionDisabled: function(b) { var c, d, e; for (a.isArray(b) && (b.length ? b.length === this.anchors.length && (b = !0) : b = !1), e = 0; d = this.tabs[e]; e++) c = a(d), b === !0 || a.inArray(e, b) !== -1 ? (c.attr("aria-disabled", "true"), this._addClass(c, null, "ui-state-disabled")) : (c.removeAttr("aria-disabled"), this._removeClass(c, null, "ui-state-disabled"));
                this.options.disabled = b, this._toggleClass(this.widget(), this.widgetFullName + "-disabled", null, b === !0) }, _setupEvents: function(b) { var c = {};
                b && a.each(b.split(" "), function(a, b) { c[b] = "_eventHandler" }), this._off(this.anchors.add(this.tabs).add(this.panels)), this._on(!0, this.anchors, { click: function(a) { a.preventDefault() } }), this._on(this.anchors, c), this._on(this.tabs, { keydown: "_tabKeydown" }), this._on(this.panels, { keydown: "_panelKeydown" }), this._focusable(this.tabs), this._hoverable(this.tabs) }, _setupHeightStyle: function(b) { var c, d = this.element.parent(); "fill" === b ? (c = d.height(), c -= this.element.outerHeight() - this.element.height(), this.element.siblings(":visible").each(function() { var b = a(this),
                        d = b.css("position"); "absolute" !== d && "fixed" !== d && (c -= b.outerHeight(!0)) }), this.element.children().not(this.panels).each(function() { c -= a(this).outerHeight(!0) }), this.panels.each(function() { a(this).height(Math.max(0, c - a(this).innerHeight() + a(this).height())) }).css("overflow", "auto")) : "auto" === b && (c = 0, this.panels.each(function() { c = Math.max(c, a(this).height("").height()) }).height(c)) }, _eventHandler: function(b) { var c = this.options,
                    d = this.active,
                    e = a(b.currentTarget),
                    f = e.closest("li"),
                    g = f[0] === d[0],
                    h = g && c.collapsible,
                    i = h ? a() : this._getPanelForTab(f),
                    j = d.length ? this._getPanelForTab(d) : a(),
                    k = { oldTab: d, oldPanel: j, newTab: h ? a() : f, newPanel: i };
                b.preventDefault(), f.hasClass("ui-state-disabled") || f.hasClass("ui-tabs-loading") || this.running || g && !c.collapsible || this._trigger("beforeActivate", b, k) === !1 || (c.active = !h && this.tabs.index(f), this.active = g ? a() : f, this.xhr && this.xhr.abort(), j.length || i.length || a.error("jQuery UI Tabs: Mismatching fragment identifier."), i.length && this.load(this.tabs.index(f), b), this._toggle(b, k)) }, _toggle: function(b, c) {
                function d() { f.running = !1, f._trigger("activate", b, c) }

                function e() { f._addClass(c.newTab.closest("li"), "ui-tabs-active", "ui-state-active"), g.length && f.options.show ? f._show(g, f.options.show, d) : (g.show(), d()) } var f = this,
                    g = c.newPanel,
                    h = c.oldPanel;
                this.running = !0, h.length && this.options.hide ? this._hide(h, this.options.hide, function() { f._removeClass(c.oldTab.closest("li"), "ui-tabs-active", "ui-state-active"), e() }) : (this._removeClass(c.oldTab.closest("li"), "ui-tabs-active", "ui-state-active"), h.hide(), e()), h.attr("aria-hidden", "true"), c.oldTab.attr({ "aria-selected": "false", "aria-expanded": "false" }), g.length && h.length ? c.oldTab.attr("tabIndex", -1) : g.length && this.tabs.filter(function() { return 0 === a(this).attr("tabIndex") }).attr("tabIndex", -1), g.attr("aria-hidden", "false"), c.newTab.attr({ "aria-selected": "true", "aria-expanded": "true", tabIndex: 0 }) }, _activate: function(b) { var c, d = this._findActive(b);
                d[0] !== this.active[0] && (d.length || (d = this.active), c = d.find(".ui-tabs-anchor")[0], this._eventHandler({ target: c, currentTarget: c, preventDefault: a.noop })) }, _findActive: function(b) { return b === !1 ? a() : this.tabs.eq(b) }, _getIndex: function(b) { return "string" == typeof b && (b = this.anchors.index(this.anchors.filter("[href$='" + a.ui.escapeSelector(b) + "']"))), b }, _destroy: function() { this.xhr && this.xhr.abort(), this.tablist.removeAttr("role").off(this.eventNamespace), this.anchors.removeAttr("role tabIndex").removeUniqueId(), this.tabs.add(this.panels).each(function() { a.data(this, "ui-tabs-destroy") ? a(this).remove() : a(this).removeAttr("role tabIndex aria-live aria-busy aria-selected aria-labelledby aria-hidden aria-expanded") }), this.tabs.each(function() { var b = a(this),
                        c = b.data("ui-tabs-aria-controls");
                    c ? b.attr("aria-controls", c).removeData("ui-tabs-aria-controls") : b.removeAttr("aria-controls") }), this.panels.show(), "content" !== this.options.heightStyle && this.panels.css("height", "") }, enable: function(b) { var c = this.options.disabled;
                c !== !1 && (void 0 === b ? c = !1 : (b = this._getIndex(b), c = a.isArray(c) ? a.map(c, function(a) { return a !== b ? a : null }) : a.map(this.tabs, function(a, c) { return c !== b ? c : null })), this._setOptionDisabled(c)) }, disable: function(b) { var c = this.options.disabled; if (c !== !0) { if (void 0 === b) c = !0;
                    else { if (b = this._getIndex(b), a.inArray(b, c) !== -1) return;
                        c = a.isArray(c) ? a.merge([b], c).sort() : [b] } this._setOptionDisabled(c) } }, load: function(b, c) { b = this._getIndex(b); var d = this,
                    e = this.tabs.eq(b),
                    f = e.find(".ui-tabs-anchor"),
                    g = this._getPanelForTab(e),
                    h = { tab: e, panel: g },
                    i = function(a, b) { "abort" === b && d.panels.stop(!1, !0), d._removeClass(e, "ui-tabs-loading"), g.removeAttr("aria-busy"), a === d.xhr && delete d.xhr };
                this._isLocal(f[0]) || (this.xhr = a.ajax(this._ajaxSettings(f, c, h)), this.xhr && "canceled" !== this.xhr.statusText && (this._addClass(e, "ui-tabs-loading"), g.attr("aria-busy", "true"), this.xhr.done(function(a, b, e) { setTimeout(function() { g.html(a), d._trigger("load", c, h), i(e, b) }, 1) }).fail(function(a, b) { setTimeout(function() { i(a, b) }, 1) }))) }, _ajaxSettings: function(b, c, d) { var e = this; return { url: b.attr("href"), beforeSend: function(b, f) { return e._trigger("beforeLoad", c, a.extend({ jqXHR: b, ajaxSettings: f }, d)) } } }, _getPanelForTab: function(b) { var c = a(b).attr("aria-controls"); return this.element.find(this._sanitizeSelector("#" + c)) } }), a.uiBackCompat !== !1 && a.widget("ui.tabs", a.ui.tabs, { _processTabs: function() { this._superApply(arguments), this._addClass(this.tabs, "ui-tab") } });
        a.ui.tabs;
        a.widget("ui.tooltip", {
            version: "1.12.0",
            options: { classes: { "ui-tooltip": "ui-corner-all ui-widget-shadow" }, content: function() { var b = a(this).attr("title") || ""; return a("<a>").text(b).html() }, hide: !0, items: "[title]:not([disabled])", position: { my: "left top+15", at: "left bottom", collision: "flipfit flip" }, show: !0, track: !1, close: null, open: null },
            _addDescribedBy: function(b, c) { var d = (b.attr("aria-describedby") || "").split(/\s+/);
                d.push(c), b.data("ui-tooltip-id", c).attr("aria-describedby", a.trim(d.join(" "))) },
            _removeDescribedBy: function(b) { var c = b.data("ui-tooltip-id"),
                    d = (b.attr("aria-describedby") || "").split(/\s+/),
                    e = a.inArray(c, d);
                e !== -1 && d.splice(e, 1), b.removeData("ui-tooltip-id"), d = a.trim(d.join(" ")), d ? b.attr("aria-describedby", d) : b.removeAttr("aria-describedby") },
            _create: function() { this._on({ mouseover: "open", focusin: "open" }), this.tooltips = {}, this.parents = {}, this.liveRegion = a("<div>").attr({ role: "log", "aria-live": "assertive", "aria-relevant": "additions" }).appendTo(this.document[0].body), this._addClass(this.liveRegion, null, "ui-helper-hidden-accessible"), this.disabledTitles = a([]) },
            _setOption: function(b, c) { var d = this;
                this._super(b, c), "content" === b && a.each(this.tooltips, function(a, b) { d._updateContent(b.element) }) },
            _setOptionDisabled: function(a) { this[a ? "_disable" : "_enable"]() },
            _disable: function() { var b = this;
                a.each(this.tooltips, function(c, d) { var e = a.Event("blur");
                    e.target = e.currentTarget = d.element[0], b.close(e, !0) }), this.disabledTitles = this.disabledTitles.add(this.element.find(this.options.items).addBack().filter(function() { var b = a(this); if (b.is("[title]")) return b.data("ui-tooltip-title", b.attr("title")).removeAttr("title") })) },
            _enable: function() { this.disabledTitles.each(function() { var b = a(this);
                    b.data("ui-tooltip-title") && b.attr("title", b.data("ui-tooltip-title")) }), this.disabledTitles = a([]) },
            open: function(b) { var c = this,
                    d = a(b ? b.target : this.element).closest(this.options.items);
                d.length && !d.data("ui-tooltip-id") && (d.attr("title") && d.data("ui-tooltip-title", d.attr("title")), d.data("ui-tooltip-open", !0), b && "mouseover" === b.type && d.parents().each(function() { var b, d = a(this);
                    d.data("ui-tooltip-open") && (b = a.Event("blur"), b.target = b.currentTarget = this, c.close(b, !0)), d.attr("title") && (d.uniqueId(), c.parents[this.id] = { element: this, title: d.attr("title") }, d.attr("title", "")) }), this._registerCloseHandlers(b, d), this._updateContent(d, b)) },
            _updateContent: function(a, b) { var c, d = this.options.content,
                    e = this,
                    f = b ? b.type : null; return "string" == typeof d || d.nodeType || d.jquery ? this._open(b, a, d) : (c = d.call(a[0], function(c) { e._delay(function() { a.data("ui-tooltip-open") && (b && (b.type = f), this._open(b, a, c)) }) }), void(c && this._open(b, a, c))) },
            _open: function(b, c, d) {
                function e(a) { j.of = a, g.is(":hidden") || g.position(j) } var f, g, h, i, j = a.extend({}, this.options.position); if (d) { if (f = this._find(c)) return void f.tooltip.find(".ui-tooltip-content").html(d);
                    c.is("[title]") && (b && "mouseover" === b.type ? c.attr("title", "") : c.removeAttr("title")), f = this._tooltip(c), g = f.tooltip, this._addDescribedBy(c, g.attr("id")), g.find(".ui-tooltip-content").html(d), this.liveRegion.children().hide(), i = a("<div>").html(g.find(".ui-tooltip-content").html()), i.removeAttr("name").find("[name]").removeAttr("name"), i.removeAttr("id").find("[id]").removeAttr("id"), i.appendTo(this.liveRegion), this.options.track && b && /^mouse/.test(b.type) ? (this._on(this.document, { mousemove: e }), e(b)) : g.position(a.extend({ of: c }, this.options.position)), g.hide(), this._show(g, this.options.show), this.options.track && this.options.show && this.options.show.delay && (h = this.delayedShow = setInterval(function() { g.is(":visible") && (e(j.of), clearInterval(h)) }, a.fx.interval)), this._trigger("open", b, { tooltip: g }) } },
            _registerCloseHandlers: function(b, c) { var d = { keyup: function(b) { if (b.keyCode === a.ui.keyCode.ESCAPE) { var d = a.Event(b);
                            d.currentTarget = c[0], this.close(d, !0) } } };
                c[0] !== this.element[0] && (d.remove = function() { this._removeTooltip(this._find(c).tooltip) }), b && "mouseover" !== b.type || (d.mouseleave = "close"), b && "focusin" !== b.type || (d.focusout = "close"), this._on(!0, c, d) },
            close: function(b) { var c, d = this,
                    e = a(b ? b.currentTarget : this.element),
                    f = this._find(e); return f ? (c = f.tooltip, void(f.closing || (clearInterval(this.delayedShow), e.data("ui-tooltip-title") && !e.attr("title") && e.attr("title", e.data("ui-tooltip-title")), this._removeDescribedBy(e), f.hiding = !0, c.stop(!0), this._hide(c, this.options.hide, function() { d._removeTooltip(a(this)) }), e.removeData("ui-tooltip-open"), this._off(e, "mouseleave focusout keyup"), e[0] !== this.element[0] && this._off(e, "remove"), this._off(this.document, "mousemove"), b && "mouseleave" === b.type && a.each(this.parents, function(b, c) { a(c.element).attr("title", c.title), delete d.parents[b] }), f.closing = !0, this._trigger("close", b, { tooltip: c }), f.hiding || (f.closing = !1)))) : void e.removeData("ui-tooltip-open") },
            _tooltip: function(b) { var c = a("<div>").attr("role", "tooltip"),
                    d = a("<div>").appendTo(c),
                    e = c.uniqueId().attr("id"); return this._addClass(d, "ui-tooltip-content"), this._addClass(c, "ui-tooltip", "ui-widget ui-widget-content"), c.appendTo(this._appendTo(b)), this.tooltips[e] = { element: b, tooltip: c } },
            _find: function(a) { var b = a.data("ui-tooltip-id"); return b ? this.tooltips[b] : null },
            _removeTooltip: function(a) { a.remove(), delete this.tooltips[a.attr("id")] },
            _appendTo: function(a) { var b = a.closest(".ui-front, dialog"); return b.length || (b = this.document[0].body), b },
            _destroy: function() {
                var b = this;
                a.each(this.tooltips, function(c, d) {
                    var e = a.Event("blur"),
                        f = d.element;
                    e.target = e.currentTarget = f[0], b.close(e, !0), a("#" + c).remove(), f.data("ui-tooltip-title") && (f.attr("title") || f.attr("title", f.data("ui-tooltip-title")),
                        f.removeData("ui-tooltip-title"))
                }), this.liveRegion.remove()
            }
        }), a.uiBackCompat !== !1 && a.widget("ui.tooltip", a.ui.tooltip, { options: { tooltipClass: null }, _tooltip: function() { var a = this._superApply(arguments); return this.options.tooltipClass && a.tooltip.addClass(this.options.tooltipClass), a } });
        a.ui.tooltip
    });
var levelItems, points = 0,
    clicking = !1,
    currentItem, nextItem, matchOpen, matchList = [],
    tutorial = !1,
    level = window.level;
if (ion.sound({ sounds: [{ name: "tada" }, { name: "wahwah" }], volume: .5, path: sfxPath, preload: !0 }), "*" == level) { var display = $("#time"),
        readyDisplay = $("#ready-timer"),
        counting = !1,
        countdown = null,
        timerSize;
    getReady() } else tutorial = !0;
$(".btn-handler").unbind("click").on("click", function(a) { a.bubbles = !1, a.stopImmediatePropagation(), a.preventDefault(), a.stopPropagation(), 1 != clicking && (clicking = !0) }), $(".item").hammer().on("swipeleft", function(a) { $(this).hasClass("gone") || $(this).hasClass("open") || 1 == clicking || !tutorial && 0 == counting || (clicking = !0, currentItem = $(this), 1 == swipeAlertLeft ? ($(".alert .msg").html("<h2>You are about to trash this item! Are you sure?</h2>"), $(".alert #alert-confirm, .alert #alert-abort, .alert .msg").show(), $(".alert").fadeIn(function() { swipeAlertLeft = !1, $(this).find("#alert-abort").on("click", function(a) { clicking = !1, $(".alert #alert-confirm, .alert #alert-abort, .alert .msg").hide() }), $(this).find("#alert-confirm").on("click", function(a) { a.stopPropagation(), a.preventDefault(), $(currentItem).addClass("gone").addClass("trashed"), CheckItem(currentItem, $(currentItem).hasClass("Trash"), "Trash"), $(this).unbind("click"), $(".alert").fadeOut(), $(".alert #alert-confirm, .alert #alert-abort, .alert .msg").hide(), clicking = !1 }) })) : (tutorial || 1 != counting || (free(), clearScreen()), $(currentItem).addClass("gone").addClass("trashed"), CheckItem(currentItem, $(currentItem).hasClass("Trash"), "Trash"), clicking = !1)) }), $("#trash").unbind("click").on("click", function(a) {
        (tutorial || 0 != counting) && (currentItem = $(document).find(".level .item:not(.gone)").last(), 1 == buttonAlertTrash ? ($(".alert .msg").html("<h2>You are about to trash this item! Are you sure?</h2>"), $(".alert #alert-confirm, .alert #alert-abort, .alert .msg").show(), $(".alert").fadeIn(function() { buttonAlertTrash = !1, $(this).find("#alert-abort").on("click", function(a) { clicking = !1, $(".alert #alert-confirm, .alert #alert-abort, .alert .msg").hide() }), $(this).find("#alert-confirm").on("click", function(a) { a.stopPropagation(), a.preventDefault(), $(currentItem).addClass("gone").addClass("trashed"), CheckItem(currentItem, $(currentItem).hasClass("Trash"), "Trash"), $(this).unbind("click"), $(".alert").fadeOut(), $(".alert #alert-confirm, .alert #alert-abort, .alert .msg").hide(), clicking = !1 }) })) : (tutorial || 1 != counting || (free(), clearScreen()), $(currentItem).addClass("gone").addClass("trashed"), CheckItem($(currentItem), $(currentItem).hasClass("Trash"), "Trash"), clicking = !1)) }), $(".item").hammer().on("swiperight", function(a) { $(this).hasClass("gone") || $(this).hasClass("open") || 1 == clicking || !tutorial && 0 == counting || (clicking = !0, currentItem = $(this), 1 == swipeAlertRight ? ($(".alert .msg").html("<h2>You are about to recycle this item! Are you sure?</h2>"), $(".alert #alert-confirm, .alert #alert-abort, .alert .msg").show(), $(".alert").fadeIn(function() { swipeAlertRight = !1, $(this).find("#alert-abort").on("click", function(a) { clicking = !1, $(".alert #alert-confirm, .alert #alert-abort, .alert .msg").hide() }), $(this).find("#alert-confirm").on("click", function(a) { a.stopPropagation(), a.preventDefault(), $(currentItem).addClass("gone").addClass("recycled"), CheckItem(currentItem, $(currentItem).hasClass("Recycle"), "Recycle"), $(this).unbind("click"), $(".alert").fadeOut(), $(".alert #alert-confirm, .alert #alert-abort, .alert .msg").hide(), clicking = !1 }) })) : (tutorial || 1 != counting || (free(), clearScreen()), $(currentItem).addClass("gone").addClass("recycled"), CheckItem(currentItem, $(currentItem).hasClass("Recycle"), "Recycle"), clicking = !1)) }), $("#recycle").unbind("click").on("click", function(a) {
        (tutorial || 0 != counting) && (currentItem = $(document).find(".level .item:not(.gone)").last(), 1 == buttonAlertRecycle ? ($(".alert .msg").html("<h2>You are about to recycle this item! Are you sure?</h2>"), $(".alert #alert-confirm, .alert #alert-abort, .alert .msg").show(), $(".alert").fadeIn(function() { buttonAlertRecycle = !1, $(this).find("#alert-abort").on("click", function(a) { clicking = !1, $(".alert #alert-confirm, .alert #alert-abort, .alert .msg").hide() }), $(this).find("#alert-confirm").on("click", function(a) { a.stopPropagation(), a.preventDefault(), $(currentItem).addClass("gone").addClass("recycled"), CheckItem(currentItem, $(currentItem).hasClass("Recycle"), "Recycle"), $(this).unbind("click"), $(".alert").fadeOut(), $(".alert #alert-confirm, .alert #alert-abort, .alert .msg").hide(), clicking = !1 }) })) : (tutorial || 1 != counting || (free(), clearScreen()), $(currentItem).addClass("gone").addClass("recycled"), CheckItem(currentItem, $(currentItem).hasClass("Recycle"), "Recycle"), clicking = !1)) }), $("#compost").unbind("click").on("click", function() {
        (tutorial || 0 != counting) && (currentItem = $(document).find(".level .item:not(.gone)").last(), 1 == buttonAlertSuper ? ($(".alert .msg").html("<h2>You are about to compost this item! Are you sure?</h2>"), $(".alert #alert-confirm, .alert #alert-abort, .alert .msg").show(), $(".alert").fadeIn(function() { buttonAlertSuper = !1, $(this).find("#alert-abort").on("click", function(a) { clicking = !1, $(".alert #alert-confirm, .alert #alert-abort, .alert .msg").hide() }), $(this).find("#alert-confirm").on("click", function(a) { a.stopPropagation(), $(currentItem).addClass("gone").addClass("composted"), CheckItem(currentItem, $(currentItem).hasClass("Compost"), "Compost"), $(this).unbind("click"), $(".alert").fadeOut(), $(".alert #alert-confirm, .alert #alert-abort, .alert .msg").hide(), clicking = !1 }) })) : (tutorial || 1 != counting || (free(), clearScreen()), $(currentItem).addClass("gone").addClass("composted"), CheckItem(currentItem, $(currentItem).hasClass("Compost"), "Compost"), clicking = !1)) }), $("#special").unbind("click").on("click", function() {
        (tutorial || 0 != counting) && (currentItem = $(document).find(".level .item:not(.gone)").last(), $(".modal.special").fadeIn(function() { $(this).find(".btn.close-special").unbind("click").on("click", function(a) { SpecialReset(), setTimeout(function() { $(".modal.special").fadeOut() }, 200) }), $('.option-select input[data-action="select"]').unbind("click").on("click", function(a) { if (0 != counting && !$(this).hasClass("open")) { var b = $(this).closest(".option-wrap").find(".option"); if (1 == buttonAlertSpecial) $(".alert .msg").html("<h2>You are about to choose a special option for this item! Are you sure?</h2>"), $(".alert #alert-confirm, .alert #alert-abort, .alert .msg").show(), $(".alert").fadeIn(function() { buttonAlertSpecial = !1, $(this).find("#alert-abort").on("click", function(a) { $(this).unbind("click"), $(".alert").fadeOut(), $(".alert #alert-confirm, .alert #alert-abort, .alert .msg").hide(), clicking = !1 }), $(this).find("#alert-confirm").on("click", function(a) { a.stopPropagation(), $(currentItem).addClass("gone").addClass("specialPick"); var c = b.attr("id");
                            CheckItem(currentItem, $(currentItem).hasClass(c), b.find("h3").text()), SpecialReset(), $(".modal.special").fadeOut(), $(this).unbind("click"), $(".alert #alert-confirm, .alert #alert-abort, .alert .msg").hide(), $(".alert").fadeOut(), clicking = !1 }) });
                    else { tutorial || 1 != counting || (free(), clearScreen()), $(currentItem).addClass("gone").addClass("specialPick"); var c = b.attr("id");
                        CheckItem(currentItem, $(currentItem).hasClass(c), b.find("h3").text()), SpecialReset(), $(".modal.special").fadeOut(), clicking = !1 } } }), $('.option-select input[data-action="info"]').unbind("click").on("click", function(a) { if (0 != counting && !$(this).hasClass("open")) { $(".special-scroll").css("overflow", "hidden"), $(".option-select").hide(), $(".option-wrap").css("visibility", "hidden"); var b = $(this).closest(".option-wrap").find(".option");
                    $(this).closest(".option-wrap").css("height", "100%").css("width", "100%"), $(".option-wrap").hide(function() { $(b).addClass("open"), $(b).closest(".col-xs-6").removeClass("col-xs-6").addClass("col-xs-12"), $(b).find(".profile").css("visibility", "visible").removeClass("hidden") }), $(b).closest(".option-wrap").fadeIn(function() { $(this).css("visibility", "visible"), $(this).find(".btn").unbind("click").on("click", function(a) { if (a.stopImmediatePropagation(), a.bubble = !1, "select" === $(this).data("action"))
                                if (1 == buttonAlertSpecial) $(".alert .msg").html("<h2>You are about to choose a special option for this item! Are you sure?</h2>"), $(".alert #alert-confirm, .alert #alert-abort, .alert .msg").show(), $(".alert").fadeIn(function() { buttonAlertSpecial = !1, $(this).find("#alert-abort").on("click", function(a) { $(this).unbind("click"), $(".alert").fadeOut(), $(".alert #alert-confirm, .alert #alert-abort, .alert .msg").hide(), clicking = !1 }), $(this).find("#alert-confirm").on("click", function(a) { a.stopPropagation(), $(currentItem).addClass("gone").addClass("specialPick"); var c = b.attr("id");
                                        CheckItem(currentItem, $(currentItem).hasClass(c), b.find("h3").text()), SpecialReset(), $(".modal.special").fadeOut(), $(this).unbind("click"), $(".alert #alert-confirm, .alert #alert-abort, .alert .msg").hide(), $(".alert").fadeOut(), clicking = !1 }) });
                                else { tutorial || 1 != counting || (free(), clearScreen()), $(currentItem).addClass("gone").addClass("specialPick"); var c = b.attr("id");
                                    CheckItem(currentItem, $(currentItem).hasClass(c), b.find("h3").text()), SpecialReset(), $(".modal.special").fadeOut(), clicking = !1 } else "back" === $(this).data("action") && (SpecialReset(), setTimeout(function() { $(".option-wrap").css("visibility", "visible") }, 100)) }) }) } }) })) }), $(".item.open").on("click", function(a) { a.preventDefault(), a.stopPropagation(), a.stopImmediatePropagation(), a.bubbles = !1 }), $(".item:not(.open)").on("click", function(a) { a.stopImmediatePropagation(), a.stopPropagation(), a.bubbles = !1; var b = $(this); "#" + $(this).find(".item-pane").attr("id") + "-glide";
        $(b).addClass("open"), $(b).find(".btn-close, .image-glider, .glide__arrows").css("visibility", "visible"), $(b).find(".item-bio").show(function() { setTimeout(function() {}, 500), $(".material").unbind("click").on("click", function(a) { a.stopPropagation(), a.stopImmediatePropagation(), a.bubbles = !1, $.get("/api/game/material", { material: $(this).attr("id") }, function(a) { $(".modal.material-profile").html(a.html).fadeIn(function() { $(this).find("#back-btn").on("click", function() { $(".modal.material-profile .modal-wrap").remove(), $(".modal.material-profile").fadeOut() }) }) }) }) }), $(b).on("click", function(a) { a.preventDefault(), a.stopPropagation(), a.stopImmediatePropagation(), a.bubbles = !1 }), $(b).find(".btn-close").on("click", function(a) { a.bubbles = !1, a.preventDefault(), a.stopImmediatePropagation(), a.stopPropagation(), $(b).removeClass("open").animate({ height: slideheight }, 200), $(b).find(".item-bio").hide(), $(this).css("visibility", "hidden") }) }), ! function(a, b, c, d) { "use strict";

        function e(a, b, c) { return setTimeout(j(a, c), b) }

        function f(a, b, c) { return !!Array.isArray(a) && (g(a, c[b], c), !0) }

        function g(a, b, c) { var e; if (a)
                if (a.forEach) a.forEach(b, c);
                else if (a.length !== d)
                for (e = 0; e < a.length;) b.call(c, a[e], e, a), e++;
            else
                for (e in a) a.hasOwnProperty(e) && b.call(c, a[e], e, a) }

        function h(b, c, d) { var e = "DEPRECATED METHOD: " + c + "\n" + d + " AT \n"; return function() { var c = new Error("get-stack-trace"),
                    d = c && c.stack ? c.stack.replace(/^[^\(]+?[\n$]/gm, "").replace(/^\s+at\s+/gm, "").replace(/^Object.<anonymous>\s*\(/gm, "{anonymous}()@") : "Unknown Stack Trace",
                    f = a.console && (a.console.warn || a.console.log); return f && f.call(a.console, e, d), b.apply(this, arguments) } }

        function i(a, b, c) { var d, e = b.prototype;
            d = a.prototype = Object.create(e), d.constructor = a, d._super = e, c && la(d, c) }

        function j(a, b) { return function() { return a.apply(b, arguments) } }

        function k(a, b) { return typeof a == oa ? a.apply(b ? b[0] || d : d, b) : a }

        function l(a, b) { return a === d ? b : a }

        function m(a, b, c) { g(q(b), function(b) { a.addEventListener(b, c, !1) }) }

        function n(a, b, c) { g(q(b), function(b) { a.removeEventListener(b, c, !1) }) }

        function o(a, b) { for (; a;) { if (a == b) return !0;
                a = a.parentNode } return !1 }

        function p(a, b) { return a.indexOf(b) > -1 }

        function q(a) { return a.trim().split(/\s+/g) }

        function r(a, b, c) { if (a.indexOf && !c) return a.indexOf(b); for (var d = 0; d < a.length;) { if (c && a[d][c] == b || !c && a[d] === b) return d;
                d++ } return -1 }

        function s(a) { return Array.prototype.slice.call(a, 0) }

        function t(a, b, c) { for (var d = [], e = [], f = 0; f < a.length;) { var g = b ? a[f][b] : a[f];
                r(e, g) < 0 && d.push(a[f]), e[f] = g, f++ } return c && (d = b ? d.sort(function(a, c) { return a[b] > c[b] }) : d.sort()), d }

        function u(a, b) { for (var c, e, f = b[0].toUpperCase() + b.slice(1), g = 0; g < ma.length;) { if (c = ma[g], e = c ? c + f : b, e in a) return e;
                g++ } return d }

        function v() { return ua++ }

        function w(b) { var c = b.ownerDocument || b; return c.defaultView || c.parentWindow || a }

        function x(a, b) { var c = this;
            this.manager = a, this.callback = b, this.element = a.element, this.target = a.options.inputTarget, this.domHandler = function(b) { k(a.options.enable, [a]) && c.handler(b) }, this.init() }

        function y(a) { var b, c = a.options.inputClass; return new(b = c ? c : xa ? M : ya ? P : wa ? R : L)(a, z) }

        function z(a, b, c) { var d = c.pointers.length,
                e = c.changedPointers.length,
                f = b & Ea && d - e === 0,
                g = b & (Ga | Ha) && d - e === 0;
            c.isFirst = !!f, c.isFinal = !!g, f && (a.session = {}), c.eventType = b, A(a, c), a.emit("hammer.input", c), a.recognize(c), a.session.prevInput = c }

        function A(a, b) { var c = a.session,
                d = b.pointers,
                e = d.length;
            c.firstInput || (c.firstInput = D(b)), e > 1 && !c.firstMultiple ? c.firstMultiple = D(b) : 1 === e && (c.firstMultiple = !1); var f = c.firstInput,
                g = c.firstMultiple,
                h = g ? g.center : f.center,
                i = b.center = E(d);
            b.timeStamp = ra(), b.deltaTime = b.timeStamp - f.timeStamp, b.angle = I(h, i), b.distance = H(h, i), B(c, b), b.offsetDirection = G(b.deltaX, b.deltaY); var j = F(b.deltaTime, b.deltaX, b.deltaY);
            b.overallVelocityX = j.x, b.overallVelocityY = j.y, b.overallVelocity = qa(j.x) > qa(j.y) ? j.x : j.y, b.scale = g ? K(g.pointers, d) : 1, b.rotation = g ? J(g.pointers, d) : 0, b.maxPointers = c.prevInput ? b.pointers.length > c.prevInput.maxPointers ? b.pointers.length : c.prevInput.maxPointers : b.pointers.length, C(c, b); var k = a.element;
            o(b.srcEvent.target, k) && (k = b.srcEvent.target), b.target = k }

        function B(a, b) { var c = b.center,
                d = a.offsetDelta || {},
                e = a.prevDelta || {},
                f = a.prevInput || {};
            b.eventType !== Ea && f.eventType !== Ga || (e = a.prevDelta = { x: f.deltaX || 0, y: f.deltaY || 0 }, d = a.offsetDelta = { x: c.x, y: c.y }), b.deltaX = e.x + (c.x - d.x), b.deltaY = e.y + (c.y - d.y) }

        function C(a, b) { var c, e, f, g, h = a.lastInterval || b,
                i = b.timeStamp - h.timeStamp; if (b.eventType != Ha && (i > Da || h.velocity === d)) { var j = b.deltaX - h.deltaX,
                    k = b.deltaY - h.deltaY,
                    l = F(i, j, k);
                e = l.x, f = l.y, c = qa(l.x) > qa(l.y) ? l.x : l.y, g = G(j, k), a.lastInterval = b } else c = h.velocity, e = h.velocityX, f = h.velocityY, g = h.direction;
            b.velocity = c, b.velocityX = e, b.velocityY = f, b.direction = g }

        function D(a) { for (var b = [], c = 0; c < a.pointers.length;) b[c] = { clientX: pa(a.pointers[c].clientX), clientY: pa(a.pointers[c].clientY) }, c++; return { timeStamp: ra(), pointers: b, center: E(b), deltaX: a.deltaX, deltaY: a.deltaY } }

        function E(a) { var b = a.length; if (1 === b) return { x: pa(a[0].clientX), y: pa(a[0].clientY) }; for (var c = 0, d = 0, e = 0; b > e;) c += a[e].clientX, d += a[e].clientY, e++; return { x: pa(c / b), y: pa(d / b) } }

        function F(a, b, c) { return { x: b / a || 0, y: c / a || 0 } }

        function G(a, b) { return a === b ? Ia : qa(a) >= qa(b) ? 0 > a ? Ja : Ka : 0 > b ? La : Ma }

        function H(a, b, c) { c || (c = Qa); var d = b[c[0]] - a[c[0]],
                e = b[c[1]] - a[c[1]]; return Math.sqrt(d * d + e * e) }

        function I(a, b, c) { c || (c = Qa); var d = b[c[0]] - a[c[0]],
                e = b[c[1]] - a[c[1]]; return 180 * Math.atan2(e, d) / Math.PI }

        function J(a, b) { return I(b[1], b[0], Ra) + I(a[1], a[0], Ra) }

        function K(a, b) { return H(b[0], b[1], Ra) / H(a[0], a[1], Ra) }

        function L() { this.evEl = Ta, this.evWin = Ua, this.pressed = !1, x.apply(this, arguments) }

        function M() { this.evEl = Xa, this.evWin = Ya, x.apply(this, arguments), this.store = this.manager.session.pointerEvents = [] }

        function N() { this.evTarget = $a, this.evWin = _a, this.started = !1, x.apply(this, arguments) }

        function O(a, b) { var c = s(a.touches),
                d = s(a.changedTouches); return b & (Ga | Ha) && (c = t(c.concat(d), "identifier", !0)), [c, d] }

        function P() { this.evTarget = bb, this.targetIds = {}, x.apply(this, arguments) }

        function Q(a, b) { var c = s(a.touches),
                d = this.targetIds; if (b & (Ea | Fa) && 1 === c.length) return d[c[0].identifier] = !0, [c, c]; var e, f, g = s(a.changedTouches),
                h = [],
                i = this.target; if (f = c.filter(function(a) { return o(a.target, i) }), b === Ea)
                for (e = 0; e < f.length;) d[f[e].identifier] = !0, e++; for (e = 0; e < g.length;) d[g[e].identifier] && h.push(g[e]), b & (Ga | Ha) && delete d[g[e].identifier], e++; return h.length ? [t(f.concat(h), "identifier", !0), h] : void 0 }

        function R() { x.apply(this, arguments); var a = j(this.handler, this);
            this.touch = new P(this.manager, a), this.mouse = new L(this.manager, a), this.primaryTouch = null, this.lastTouches = [] }

        function S(a, b) { a & Ea ? (this.primaryTouch = b.changedPointers[0].identifier, T.call(this, b)) : a & (Ga | Ha) && T.call(this, b) }

        function T(a) { var b = a.changedPointers[0]; if (b.identifier === this.primaryTouch) { var c = { x: b.clientX, y: b.clientY };
                this.lastTouches.push(c); var d = this.lastTouches,
                    e = function() { var a = d.indexOf(c);
                        a > -1 && d.splice(a, 1) };
                setTimeout(e, cb) } }

        function U(a) { for (var b = a.srcEvent.clientX, c = a.srcEvent.clientY, d = 0; d < this.lastTouches.length; d++) { var e = this.lastTouches[d],
                    f = Math.abs(b - e.x),
                    g = Math.abs(c - e.y); if (db >= f && db >= g) return !0 } return !1 }

        function V(a, b) { this.manager = a, this.set(b) }

        function W(a) { if (p(a, jb)) return jb; var b = p(a, kb),
                c = p(a, lb); return b && c ? jb : b || c ? b ? kb : lb : p(a, ib) ? ib : hb }

        function X() { if (!fb) return !1; var b = {},
                c = a.CSS && a.CSS.supports; return ["auto", "manipulation", "pan-y", "pan-x", "pan-x pan-y", "none"].forEach(function(d) { b[d] = !c || a.CSS.supports("touch-action", d) }), b }

        function Y(a) { this.options = la({}, this.defaults, a || {}), this.id = v(), this.manager = null, this.options.enable = l(this.options.enable, !0), this.state = nb, this.simultaneous = {}, this.requireFail = [] }

        function Z(a) { return a & sb ? "cancel" : a & qb ? "end" : a & pb ? "move" : a & ob ? "start" : "" }

        function $(a) { return a == Ma ? "down" : a == La ? "up" : a == Ja ? "left" : a == Ka ? "right" : "" }

        function _(a, b) { var c = b.manager; return c ? c.get(a) : a }

        function aa() { Y.apply(this, arguments) }

        function ba() { aa.apply(this, arguments), this.pX = null, this.pY = null }

        function ca() { aa.apply(this, arguments) }

        function da() { Y.apply(this, arguments), this._timer = null, this._input = null }

        function ea() { aa.apply(this, arguments) }

        function fa() { aa.apply(this, arguments) }

        function ga() { Y.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0 }

        function ha(a, b) { return b = b || {}, b.recognizers = l(b.recognizers, ha.defaults.preset), new ia(a, b) }

        function ia(a, b) { this.options = la({}, ha.defaults, b || {}), this.options.inputTarget = this.options.inputTarget || a, this.handlers = {}, this.session = {}, this.recognizers = [], this.oldCssProps = {}, this.element = a, this.input = y(this), this.touchAction = new V(this, this.options.touchAction), ja(this, !0), g(this.options.recognizers, function(a) { var b = this.add(new a[0](a[1]));
                a[2] && b.recognizeWith(a[2]), a[3] && b.requireFailure(a[3]) }, this) }

        function ja(a, b) { var c = a.element; if (c.style) { var d;
                g(a.options.cssProps, function(e, f) { d = u(c.style, f), b ? (a.oldCssProps[d] = c.style[d], c.style[d] = e) : c.style[d] = a.oldCssProps[d] || "" }), b || (a.oldCssProps = {}) } }

        function ka(a, c) { var d = b.createEvent("Event");
            d.initEvent(a, !0, !0), d.gesture = c, c.target.dispatchEvent(d) } var la, ma = ["", "webkit", "Moz", "MS", "ms", "o"],
            na = b.createElement("div"),
            oa = "function",
            pa = Math.round,
            qa = Math.abs,
            ra = Date.now;
        la = "function" != typeof Object.assign ? function(a) { if (a === d || null === a) throw new TypeError("Cannot convert undefined or null to object"); for (var b = Object(a), c = 1; c < arguments.length; c++) { var e = arguments[c]; if (e !== d && null !== e)
                    for (var f in e) e.hasOwnProperty(f) && (b[f] = e[f]) } return b } : Object.assign; var sa = h(function(a, b, c) { for (var e = Object.keys(b), f = 0; f < e.length;)(!c || c && a[e[f]] === d) && (a[e[f]] = b[e[f]]), f++; return a }, "extend", "Use `assign`."),
            ta = h(function(a, b) { return sa(a, b, !0) }, "merge", "Use `assign`."),
            ua = 1,
            va = /mobile|tablet|ip(ad|hone|od)|android/i,
            wa = "ontouchstart" in a,
            xa = u(a, "PointerEvent") !== d,
            ya = wa && va.test(navigator.userAgent),
            za = "touch",
            Aa = "pen",
            Ba = "mouse",
            Ca = "kinect",
            Da = 25,
            Ea = 1,
            Fa = 2,
            Ga = 4,
            Ha = 8,
            Ia = 1,
            Ja = 2,
            Ka = 4,
            La = 8,
            Ma = 16,
            Na = Ja | Ka,
            Oa = La | Ma,
            Pa = Na | Oa,
            Qa = ["x", "y"],
            Ra = ["clientX", "clientY"];
        x.prototype = { handler: function() {}, init: function() { this.evEl && m(this.element, this.evEl, this.domHandler), this.evTarget && m(this.target, this.evTarget, this.domHandler), this.evWin && m(w(this.element), this.evWin, this.domHandler) }, destroy: function() { this.evEl && n(this.element, this.evEl, this.domHandler), this.evTarget && n(this.target, this.evTarget, this.domHandler), this.evWin && n(w(this.element), this.evWin, this.domHandler) } }; var Sa = { mousedown: Ea, mousemove: Fa, mouseup: Ga },
            Ta = "mousedown",
            Ua = "mousemove mouseup";
        i(L, x, { handler: function(a) { var b = Sa[a.type];
                b & Ea && 0 === a.button && (this.pressed = !0), b & Fa && 1 !== a.which && (b = Ga), this.pressed && (b & Ga && (this.pressed = !1), this.callback(this.manager, b, { pointers: [a], changedPointers: [a], pointerType: Ba, srcEvent: a })) } }); var Va = { pointerdown: Ea, pointermove: Fa, pointerup: Ga, pointercancel: Ha, pointerout: Ha },
            Wa = { 2: za, 3: Aa, 4: Ba, 5: Ca },
            Xa = "pointerdown",
            Ya = "pointermove pointerup pointercancel";
        a.MSPointerEvent && !a.PointerEvent && (Xa = "MSPointerDown", Ya = "MSPointerMove MSPointerUp MSPointerCancel"), i(M, x, { handler: function(a) { var b = this.store,
                    c = !1,
                    d = a.type.toLowerCase().replace("ms", ""),
                    e = Va[d],
                    f = Wa[a.pointerType] || a.pointerType,
                    g = f == za,
                    h = r(b, a.pointerId, "pointerId");
                e & Ea && (0 === a.button || g) ? 0 > h && (b.push(a), h = b.length - 1) : e & (Ga | Ha) && (c = !0), 0 > h || (b[h] = a, this.callback(this.manager, e, { pointers: b, changedPointers: [a], pointerType: f, srcEvent: a }), c && b.splice(h, 1)) } }); var Za = { touchstart: Ea, touchmove: Fa, touchend: Ga, touchcancel: Ha },
            $a = "touchstart",
            _a = "touchstart touchmove touchend touchcancel";
        i(N, x, { handler: function(a) { var b = Za[a.type]; if (b === Ea && (this.started = !0), this.started) { var c = O.call(this, a, b);
                    b & (Ga | Ha) && c[0].length - c[1].length === 0 && (this.started = !1), this.callback(this.manager, b, { pointers: c[0], changedPointers: c[1], pointerType: za, srcEvent: a }) } } }); var ab = { touchstart: Ea, touchmove: Fa, touchend: Ga, touchcancel: Ha },
            bb = "touchstart touchmove touchend touchcancel";
        i(P, x, { handler: function(a) { var b = ab[a.type],
                    c = Q.call(this, a, b);
                c && this.callback(this.manager, b, { pointers: c[0], changedPointers: c[1], pointerType: za, srcEvent: a }) } }); var cb = 2500,
            db = 25;
        i(R, x, { handler: function(a, b, c) { var d = c.pointerType == za,
                    e = c.pointerType == Ba; if (!(e && c.sourceCapabilities && c.sourceCapabilities.firesTouchEvents)) { if (d) S.call(this, b, c);
                    else if (e && U.call(this, c)) return;
                    this.callback(a, b, c) } }, destroy: function() { this.touch.destroy(), this.mouse.destroy() } }); var eb = u(na.style, "touchAction"),
            fb = eb !== d,
            gb = "compute",
            hb = "auto",
            ib = "manipulation",
            jb = "none",
            kb = "pan-x",
            lb = "pan-y",
            mb = X();
        V.prototype = { set: function(a) { a == gb && (a = this.compute()), fb && this.manager.element.style && mb[a] && (this.manager.element.style[eb] = a), this.actions = a.toLowerCase().trim() }, update: function() { this.set(this.manager.options.touchAction) }, compute: function() { var a = []; return g(this.manager.recognizers, function(b) { k(b.options.enable, [b]) && (a = a.concat(b.getTouchAction())) }), W(a.join(" ")) }, preventDefaults: function(a) { var b = a.srcEvent,
                    c = a.offsetDirection; if (this.manager.session.prevented) return void b.preventDefault(); var d = this.actions,
                    e = p(d, jb) && !mb[jb],
                    f = p(d, lb) && !mb[lb],
                    g = p(d, kb) && !mb[kb]; if (e) { var h = 1 === a.pointers.length,
                        i = a.distance < 2,
                        j = a.deltaTime < 250; if (h && i && j) return } return g && f ? void 0 : e || f && c & Na || g && c & Oa ? this.preventSrc(b) : void 0 }, preventSrc: function(a) { this.manager.session.prevented = !0, a.preventDefault() } }; var nb = 1,
            ob = 2,
            pb = 4,
            qb = 8,
            rb = qb,
            sb = 16,
            tb = 32;
        Y.prototype = { defaults: {}, set: function(a) { return la(this.options, a), this.manager && this.manager.touchAction.update(), this }, recognizeWith: function(a) { if (f(a, "recognizeWith", this)) return this; var b = this.simultaneous; return a = _(a, this), b[a.id] || (b[a.id] = a, a.recognizeWith(this)), this }, dropRecognizeWith: function(a) { return f(a, "dropRecognizeWith", this) ? this : (a = _(a, this), delete this.simultaneous[a.id], this) }, requireFailure: function(a) { if (f(a, "requireFailure", this)) return this; var b = this.requireFail; return a = _(a, this), -1 === r(b, a) && (b.push(a), a.requireFailure(this)), this }, dropRequireFailure: function(a) { if (f(a, "dropRequireFailure", this)) return this;
                a = _(a, this); var b = r(this.requireFail, a); return b > -1 && this.requireFail.splice(b, 1), this }, hasRequireFailures: function() { return this.requireFail.length > 0 }, canRecognizeWith: function(a) { return !!this.simultaneous[a.id] }, emit: function(a) {
                function b(b) { c.manager.emit(b, a) } var c = this,
                    d = this.state;
                qb > d && b(c.options.event + Z(d)), b(c.options.event), a.additionalEvent && b(a.additionalEvent), d >= qb && b(c.options.event + Z(d)) }, tryEmit: function(a) { return this.canEmit() ? this.emit(a) : void(this.state = tb) }, canEmit: function() { for (var a = 0; a < this.requireFail.length;) { if (!(this.requireFail[a].state & (tb | nb))) return !1;
                    a++ } return !0 }, recognize: function(a) { var b = la({}, a); return k(this.options.enable, [this, b]) ? (this.state & (rb | sb | tb) && (this.state = nb), this.state = this.process(b), void(this.state & (ob | pb | qb | sb) && this.tryEmit(b))) : (this.reset(), void(this.state = tb)) }, process: function(a) {}, getTouchAction: function() {}, reset: function() {} }, i(aa, Y, { defaults: { pointers: 1 }, attrTest: function(a) { var b = this.options.pointers; return 0 === b || a.pointers.length === b }, process: function(a) { var b = this.state,
                    c = a.eventType,
                    d = b & (ob | pb),
                    e = this.attrTest(a); return d && (c & Ha || !e) ? b | sb : d || e ? c & Ga ? b | qb : b & ob ? b | pb : ob : tb } }), i(ba, aa, { defaults: { event: "pan", threshold: 10, pointers: 1, direction: Pa }, getTouchAction: function() { var a = this.options.direction,
                    b = []; return a & Na && b.push(lb), a & Oa && b.push(kb), b }, directionTest: function(a) { var b = this.options,
                    c = !0,
                    d = a.distance,
                    e = a.direction,
                    f = a.deltaX,
                    g = a.deltaY; return e & b.direction || (b.direction & Na ? (e = 0 === f ? Ia : 0 > f ? Ja : Ka, c = f != this.pX, d = Math.abs(a.deltaX)) : (e = 0 === g ? Ia : 0 > g ? La : Ma, c = g != this.pY, d = Math.abs(a.deltaY))), a.direction = e, c && d > b.threshold && e & b.direction }, attrTest: function(a) { return aa.prototype.attrTest.call(this, a) && (this.state & ob || !(this.state & ob) && this.directionTest(a)) }, emit: function(a) { this.pX = a.deltaX, this.pY = a.deltaY; var b = $(a.direction);
                b && (a.additionalEvent = this.options.event + b), this._super.emit.call(this, a) } }), i(ca, aa, { defaults: { event: "pinch", threshold: 0, pointers: 2 }, getTouchAction: function() { return [jb] }, attrTest: function(a) { return this._super.attrTest.call(this, a) && (Math.abs(a.scale - 1) > this.options.threshold || this.state & ob) }, emit: function(a) { if (1 !== a.scale) { var b = a.scale < 1 ? "in" : "out";
                    a.additionalEvent = this.options.event + b } this._super.emit.call(this, a) } }), i(da, Y, { defaults: { event: "press", pointers: 1, time: 251, threshold: 9 }, getTouchAction: function() { return [hb] }, process: function(a) { var b = this.options,
                    c = a.pointers.length === b.pointers,
                    d = a.distance < b.threshold,
                    f = a.deltaTime > b.time; if (this._input = a, !d || !c || a.eventType & (Ga | Ha) && !f) this.reset();
                else if (a.eventType & Ea) this.reset(), this._timer = e(function() { this.state = rb, this.tryEmit() }, b.time, this);
                else if (a.eventType & Ga) return rb; return tb }, reset: function() { clearTimeout(this._timer) }, emit: function(a) { this.state === rb && (a && a.eventType & Ga ? this.manager.emit(this.options.event + "up", a) : (this._input.timeStamp = ra(), this.manager.emit(this.options.event, this._input))) } }), i(ea, aa, { defaults: { event: "rotate", threshold: 0, pointers: 2 }, getTouchAction: function() { return [jb] }, attrTest: function(a) { return this._super.attrTest.call(this, a) && (Math.abs(a.rotation) > this.options.threshold || this.state & ob) } }), i(fa, aa, { defaults: { event: "swipe", threshold: 10, velocity: .3, direction: Na | Oa, pointers: 1 }, getTouchAction: function() { return ba.prototype.getTouchAction.call(this) }, attrTest: function(a) { var b, c = this.options.direction; return c & (Na | Oa) ? b = a.overallVelocity : c & Na ? b = a.overallVelocityX : c & Oa && (b = a.overallVelocityY), this._super.attrTest.call(this, a) && c & a.offsetDirection && a.distance > this.options.threshold && a.maxPointers == this.options.pointers && qa(b) > this.options.velocity && a.eventType & Ga }, emit: function(a) { var b = $(a.offsetDirection);
                b && this.manager.emit(this.options.event + b, a), this.manager.emit(this.options.event, a) } }), i(ga, Y, { defaults: { event: "tap", pointers: 1, taps: 1, interval: 300, time: 250, threshold: 9, posThreshold: 10 }, getTouchAction: function() { return [ib] }, process: function(a) { var b = this.options,
                    c = a.pointers.length === b.pointers,
                    d = a.distance < b.threshold,
                    f = a.deltaTime < b.time; if (this.reset(), a.eventType & Ea && 0 === this.count) return this.failTimeout(); if (d && f && c) { if (a.eventType != Ga) return this.failTimeout(); var g = !this.pTime || a.timeStamp - this.pTime < b.interval,
                        h = !this.pCenter || H(this.pCenter, a.center) < b.posThreshold;
                    this.pTime = a.timeStamp, this.pCenter = a.center, h && g ? this.count += 1 : this.count = 1, this._input = a; var i = this.count % b.taps; if (0 === i) return this.hasRequireFailures() ? (this._timer = e(function() { this.state = rb, this.tryEmit() }, b.interval, this), ob) : rb } return tb }, failTimeout: function() { return this._timer = e(function() { this.state = tb }, this.options.interval, this), tb }, reset: function() { clearTimeout(this._timer) }, emit: function() { this.state == rb && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input)) } }), ha.VERSION = "2.0.8", ha.defaults = { domEvents: !1, touchAction: gb, enable: !0, inputTarget: null, inputClass: null, preset: [
                [ea, { enable: !1 }],
                [ca, { enable: !1 },
                    ["rotate"]
                ],
                [fa, { direction: Na }],
                [ba, { direction: Na },
                    ["swipe"]
                ],
                [ga],
                [ga, { event: "doubletap", taps: 2 },
                    ["tap"]
                ],
                [da]
            ], cssProps: { userSelect: "none", touchSelect: "none", touchCallout: "none", contentZooming: "none", userDrag: "none", tapHighlightColor: "rgba(0,0,0,0)" } }; var ub = 1,
            vb = 2;
        ia.prototype = { set: function(a) { return la(this.options, a), a.touchAction && this.touchAction.update(), a.inputTarget && (this.input.destroy(), this.input.target = a.inputTarget, this.input.init()), this }, stop: function(a) { this.session.stopped = a ? vb : ub }, recognize: function(a) { var b = this.session; if (!b.stopped) { this.touchAction.preventDefaults(a); var c, d = this.recognizers,
                        e = b.curRecognizer;
                    (!e || e && e.state & rb) && (e = b.curRecognizer = null); for (var f = 0; f < d.length;) c = d[f], b.stopped === vb || e && c != e && !c.canRecognizeWith(e) ? c.reset() : c.recognize(a), !e && c.state & (ob | pb | qb) && (e = b.curRecognizer = c), f++ } }, get: function(a) { if (a instanceof Y) return a; for (var b = this.recognizers, c = 0; c < b.length; c++)
                    if (b[c].options.event == a) return b[c]; return null }, add: function(a) { if (f(a, "add", this)) return this; var b = this.get(a.options.event); return b && this.remove(b), this.recognizers.push(a), a.manager = this, this.touchAction.update(), a }, remove: function(a) { if (f(a, "remove", this)) return this; if (a = this.get(a)) { var b = this.recognizers,
                        c = r(b, a); - 1 !== c && (b.splice(c, 1), this.touchAction.update()) } return this }, on: function(a, b) { if (a !== d && b !== d) { var c = this.handlers; return g(q(a), function(a) { c[a] = c[a] || [], c[a].push(b) }), this } }, off: function(a, b) { if (a !== d) { var c = this.handlers; return g(q(a), function(a) { b ? c[a] && c[a].splice(r(c[a], b), 1) : delete c[a] }), this } }, emit: function(a, b) { this.options.domEvents && ka(a, b); var c = this.handlers[a] && this.handlers[a].slice(); if (c && c.length) { b.type = a, b.preventDefault = function() { b.srcEvent.preventDefault() }; for (var d = 0; d < c.length;) c[d](b), d++ } }, destroy: function() { this.element && ja(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null } }, la(ha, { INPUT_START: Ea, INPUT_MOVE: Fa, INPUT_END: Ga, INPUT_CANCEL: Ha, STATE_POSSIBLE: nb, STATE_BEGAN: ob, STATE_CHANGED: pb, STATE_ENDED: qb, STATE_RECOGNIZED: rb, STATE_CANCELLED: sb, STATE_FAILED: tb, DIRECTION_NONE: Ia, DIRECTION_LEFT: Ja, DIRECTION_RIGHT: Ka, DIRECTION_UP: La, DIRECTION_DOWN: Ma, DIRECTION_HORIZONTAL: Na, DIRECTION_VERTICAL: Oa, DIRECTION_ALL: Pa, Manager: ia, Input: x, TouchAction: V, TouchInput: P, MouseInput: L, PointerEventInput: M, TouchMouseInput: R, SingleTouchInput: N, Recognizer: Y, AttrRecognizer: aa, Tap: ga, Pan: ba, Swipe: fa, Pinch: ca, Rotate: ea, Press: da, on: m, off: n, each: g, merge: ta, extend: sa, assign: la, inherit: i, bindFn: j, prefixed: u }); var wb = "undefined" != typeof a ? a : "undefined" != typeof self ? self : {};
        wb.Hammer = ha, "function" == typeof define && define.amd ? define(function() { return ha }) : "undefined" != typeof module && module.exports ? module.exports = ha : a[c] = ha }(window, document, "Hammer"),
    function(a) { "function" == typeof define && define.amd ? define(["jquery", "hammerjs"], a) : "object" == typeof exports ? a(require("jquery"), require("hammerjs")) : a(jQuery, Hammer) }(function(a, b) {
        function c(c, d) { var e = a(c);
            e.data("hammer") || e.data("hammer", new b(e[0], d)) } a.fn.hammer = function(a) { return this.each(function() { c(this, a) }) }, b.Manager.prototype.emit = function(b) { return function(c, d) { b.call(this, c, d), a(this.element).trigger({ type: c, gesture: d }) } }(b.Manager.prototype.emit) }), ! function(a) {
        function b(a, b) {
            if (!(a.originalEvent.touches.length > 1)) {
                a.preventDefault();
                var c = a.originalEvent.changedTouches[0],
                    d = document.createEvent("MouseEvents");
                d.initMouseEvent(b, !0, !0, window, 1, c.screenX, c.screenY, c.clientX, c.clientY, !1, !1, !1, !1, 0, null),
                    a.target.dispatchEvent(d)
            }
        }
        if (a.support.touch = "ontouchend" in document, a.support.touch) { var c, d = a.ui.mouse.prototype,
                e = d._mouseInit,
                f = d._mouseDestroy;
            d._touchStart = function(a) { var d = this;!c && d._mouseCapture(a.originalEvent.changedTouches[0]) && (c = !0, d._touchMoved = !1, b(a, "mouseover"), b(a, "mousemove"), b(a, "mousedown")) }, d._touchMove = function(a) { c && (this._touchMoved = !0, b(a, "mousemove")) }, d._touchEnd = function(a) { c && (b(a, "mouseup"), b(a, "mouseout"), this._touchMoved || b(a, "click"), c = !1) }, d._mouseInit = function() { var b = this;
                b.element.bind({ touchstart: a.proxy(b, "_touchStart"), touchmove: a.proxy(b, "_touchMove"), touchend: a.proxy(b, "_touchEnd") }), e.call(b) }, d._mouseDestroy = function() { var b = this;
                b.element.unbind({ touchstart: a.proxy(b, "_touchStart"), touchmove: a.proxy(b, "_touchMove"), touchend: a.proxy(b, "_touchEnd") }), f.call(b) } }
    }(jQuery), ! function(a, b) { "function" == typeof define && define.amd ? define([], b) : "object" == typeof module && module.exports ? module.exports = b() : a.Papa = b() }(this, function() { "use strict";

        function a(a, b) { b = b || {}; var c = b.dynamicTyping || !1; if (r(c) && (b.dynamicTypingFunction = c, c = {}), b.dynamicTyping = c, b.worker && z.WORKERS_SUPPORTED) { var h = k(); return h.userStep = b.step, h.userChunk = b.chunk, h.userComplete = b.complete, h.userError = b.error, b.step = r(b.step), b.chunk = r(b.chunk), b.complete = r(b.complete), b.error = r(b.error), delete b.worker, void h.postMessage({ input: a, config: b, workerId: h.id }) } var i = null; return "string" == typeof a ? i = b.download ? new d(b) : new f(b) : a.readable === !0 && r(a.read) && r(a.on) ? i = new g(b) : (t.File && a instanceof File || a instanceof Object) && (i = new e(b)), i.stream(a) }

        function b(a, b) {
            function c() { "object" == typeof b && ("string" == typeof b.delimiter && 1 === b.delimiter.length && z.BAD_DELIMITERS.indexOf(b.delimiter) === -1 && (j = b.delimiter), ("boolean" == typeof b.quotes || b.quotes instanceof Array) && (h = b.quotes), "string" == typeof b.newline && (k = b.newline), "string" == typeof b.quoteChar && (l = b.quoteChar), "boolean" == typeof b.header && (i = b.header)) }

            function d(a) { if ("object" != typeof a) return []; var b = []; for (var c in a) b.push(c); return b }

            function e(a, b) { var c = ""; "string" == typeof a && (a = JSON.parse(a)), "string" == typeof b && (b = JSON.parse(b)); var d = a instanceof Array && a.length > 0,
                    e = !(b[0] instanceof Array); if (d && i) { for (var g = 0; g < a.length; g++) g > 0 && (c += j), c += f(a[g], g);
                    b.length > 0 && (c += k) } for (var h = 0; h < b.length; h++) { for (var l = d ? a.length : b[h].length, m = 0; m < l; m++) { m > 0 && (c += j); var n = d && e ? a[m] : m;
                        c += f(b[h][n], m) } h < b.length - 1 && (c += k) } return c }

            function f(a, b) { if ("undefined" == typeof a || null === a) return "";
                a = a.toString().replace(m, l + l); var c = "boolean" == typeof h && h || h instanceof Array && h[b] || g(a, z.BAD_DELIMITERS) || a.indexOf(j) > -1 || " " === a.charAt(0) || " " === a.charAt(a.length - 1); return c ? l + a + l : a }

            function g(a, b) { for (var c = 0; c < b.length; c++)
                    if (a.indexOf(b[c]) > -1) return !0; return !1 } var h = !1,
                i = !0,
                j = ",",
                k = "\r\n",
                l = '"';
            c(); var m = new RegExp(l, "g"); if ("string" == typeof a && (a = JSON.parse(a)), a instanceof Array) { if (!a.length || a[0] instanceof Array) return e(null, a); if ("object" == typeof a[0]) return e(d(a[0]), a) } else if ("object" == typeof a) return "string" == typeof a.data && (a.data = JSON.parse(a.data)), a.data instanceof Array && (a.fields || (a.fields = a.meta && a.meta.fields), a.fields || (a.fields = a.data[0] instanceof Array ? a.fields : d(a.data[0])), a.data[0] instanceof Array || "object" == typeof a.data[0] || (a.data = [a.data])), e(a.fields || [], a.data || []); throw "exception: Unable to serialize unrecognized input" }

        function c(a) {
            function b(a) { var b = p(a);
                b.chunkSize = parseInt(b.chunkSize), a.step || a.chunk || (b.chunkSize = null), this._handle = new h(b), this._handle.streamer = this, this._config = b } this._handle = null, this._paused = !1, this._finished = !1, this._input = null, this._baseIndex = 0, this._partialLine = "", this._rowCount = 0, this._start = 0, this._nextChunk = null, this.isFirstChunk = !0, this._completeResults = { data: [], errors: [], meta: {} }, b.call(this, a), this.parseChunk = function(a) { if (this.isFirstChunk && r(this._config.beforeFirstChunk)) { var b = this._config.beforeFirstChunk(a);
                    void 0 !== b && (a = b) } this.isFirstChunk = !1; var c = this._partialLine + a;
                this._partialLine = ""; var d = this._handle.parse(c, this._baseIndex, !this._finished); if (!this._handle.paused() && !this._handle.aborted()) { var e = d.meta.cursor;
                    this._finished || (this._partialLine = c.substring(e - this._baseIndex), this._baseIndex = e), d && d.data && (this._rowCount += d.data.length); var f = this._finished || this._config.preview && this._rowCount >= this._config.preview; if (v) t.postMessage({ results: d, workerId: z.WORKER_ID, finished: f });
                    else if (r(this._config.chunk)) { if (this._config.chunk(d, this._handle), this._paused) return;
                        d = void 0, this._completeResults = void 0 } return this._config.step || this._config.chunk || (this._completeResults.data = this._completeResults.data.concat(d.data), this._completeResults.errors = this._completeResults.errors.concat(d.errors), this._completeResults.meta = d.meta), !f || !r(this._config.complete) || d && d.meta.aborted || this._config.complete(this._completeResults, this._input), f || d && d.meta.paused || this._nextChunk(), d } }, this._sendError = function(a) { r(this._config.error) ? this._config.error(a) : v && this._config.error && t.postMessage({ workerId: z.WORKER_ID, error: a, finished: !1 }) } }

        function d(a) {
            function b(a) { var b = a.getResponseHeader("Content-Range"); return null === b ? -1 : parseInt(b.substr(b.lastIndexOf("/") + 1)) } a = a || {}, a.chunkSize || (a.chunkSize = z.RemoteChunkSize), c.call(this, a); var d;
            u ? this._nextChunk = function() { this._readChunk(), this._chunkLoaded() } : this._nextChunk = function() { this._readChunk() }, this.stream = function(a) { this._input = a, this._nextChunk() }, this._readChunk = function() { if (this._finished) return void this._chunkLoaded(); if (d = new XMLHttpRequest, this._config.withCredentials && (d.withCredentials = this._config.withCredentials), u || (d.onload = q(this._chunkLoaded, this), d.onerror = q(this._chunkError, this)), d.open("GET", this._input, !u), this._config.downloadRequestHeaders) { var a = this._config.downloadRequestHeaders; for (var b in a) d.setRequestHeader(b, a[b]) } if (this._config.chunkSize) { var c = this._start + this._config.chunkSize - 1;
                    d.setRequestHeader("Range", "bytes=" + this._start + "-" + c), d.setRequestHeader("If-None-Match", "webkit-no-cache") } try { d.send() } catch (a) { this._chunkError(a.message) } u && 0 === d.status ? this._chunkError() : this._start += this._config.chunkSize }, this._chunkLoaded = function() { if (4 == d.readyState) { if (d.status < 200 || d.status >= 400) return void this._chunkError();
                    this._finished = !this._config.chunkSize || this._start > b(d), this.parseChunk(d.responseText) } }, this._chunkError = function(a) { var b = d.statusText || a;
                this._sendError(b) } }

        function e(a) { a = a || {}, a.chunkSize || (a.chunkSize = z.LocalChunkSize), c.call(this, a); var b, d, e = "undefined" != typeof FileReader;
            this.stream = function(a) { this._input = a, d = a.slice || a.webkitSlice || a.mozSlice, e ? (b = new FileReader, b.onload = q(this._chunkLoaded, this), b.onerror = q(this._chunkError, this)) : b = new FileReaderSync, this._nextChunk() }, this._nextChunk = function() { this._finished || this._config.preview && !(this._rowCount < this._config.preview) || this._readChunk() }, this._readChunk = function() { var a = this._input; if (this._config.chunkSize) { var c = Math.min(this._start + this._config.chunkSize, this._input.size);
                    a = d.call(a, this._start, c) } var f = b.readAsText(a, this._config.encoding);
                e || this._chunkLoaded({ target: { result: f } }) }, this._chunkLoaded = function(a) { this._start += this._config.chunkSize, this._finished = !this._config.chunkSize || this._start >= this._input.size, this.parseChunk(a.target.result) }, this._chunkError = function() { this._sendError(b.error) } }

        function f(a) { a = a || {}, c.call(this, a); var b, d;
            this.stream = function(a) { return b = a, d = a, this._nextChunk() }, this._nextChunk = function() { if (!this._finished) { var a = this._config.chunkSize,
                        b = a ? d.substr(0, a) : d; return d = a ? d.substr(a) : "", this._finished = !d, this.parseChunk(b) } } }

        function g(a) { a = a || {}, c.call(this, a); var b = [],
                d = !0;
            this.stream = function(a) { this._input = a, this._input.on("data", this._streamData), this._input.on("end", this._streamEnd), this._input.on("error", this._streamError) }, this._nextChunk = function() { b.length ? this.parseChunk(b.shift()) : d = !0 }, this._streamData = q(function(a) { try { b.push("string" == typeof a ? a : a.toString(this._config.encoding)), d && (d = !1, this.parseChunk(b.shift())) } catch (a) { this._streamError(a) } }, this), this._streamError = q(function(a) { this._streamCleanUp(), this._sendError(a.message) }, this), this._streamEnd = q(function() { this._streamCleanUp(), this._finished = !0, this._streamData("") }, this), this._streamCleanUp = q(function() { this._input.removeListener("data", this._streamData), this._input.removeListener("end", this._streamEnd), this._input.removeListener("error", this._streamError) }, this) }

        function h(a) {
            function b() { if (x && o && (l("Delimiter", "UndetectableDelimiter", "Unable to auto-detect delimiting character; defaulted to '" + z.DefaultDelimiter + "'"), o = !1), a.skipEmptyLines)
                    for (var b = 0; b < x.data.length; b++) 1 === x.data[b].length && "" === x.data[b][0] && x.data.splice(b--, 1); return c() && d(), g() }

            function c() { return a.header && 0 === w.length }

            function d() { if (x) { for (var a = 0; c() && a < x.data.length; a++)
                        for (var b = 0; b < x.data[a].length; b++) w.push(x.data[a][b]);
                    x.data.splice(0, 1) } }

            function e(b) { return a.dynamicTypingFunction && void 0 === a.dynamicTyping[b] && (a.dynamicTyping[b] = a.dynamicTypingFunction(b)), (a.dynamicTyping[b] || a.dynamicTyping) === !0 }

            function f(a, b) { return e(a) ? "true" === b || "TRUE" === b || "false" !== b && "FALSE" !== b && k(b) : b }

            function g() { if (!x || !a.header && !a.dynamicTyping) return x; for (var b = 0; b < x.data.length; b++) { for (var c = a.header ? {} : [], d = 0; d < x.data[b].length; d++) { var e = d,
                            g = x.data[b][d];
                        a.header && (e = d >= w.length ? "__parsed_extra" : w[d]), g = f(e, g), "__parsed_extra" === e ? (c[e] = c[e] || [], c[e].push(g)) : c[e] = g } x.data[b] = c, a.header && (d > w.length ? l("FieldMismatch", "TooManyFields", "Too many fields: expected " + w.length + " fields but parsed " + d, b) : d < w.length && l("FieldMismatch", "TooFewFields", "Too few fields: expected " + w.length + " fields but parsed " + d, b)) } return a.header && x.meta && (x.meta.fields = w), x }

            function h(b, c) { for (var d, e, f, g = [",", "\t", "|", ";", z.RECORD_SEP, z.UNIT_SEP], h = 0; h < g.length; h++) { var j = g[h],
                        k = 0,
                        l = 0;
                    f = void 0; for (var m = new i({ delimiter: j, newline: c, preview: 10 }).parse(b), n = 0; n < m.data.length; n++) { var o = m.data[n].length;
                        l += o, "undefined" != typeof f ? o > 1 && (k += Math.abs(o - f), f = o) : f = o } m.data.length > 0 && (l /= m.data.length), ("undefined" == typeof e || k < e) && l > 1.99 && (e = k, d = j) } return a.delimiter = d, { successful: !!d, bestDelimiter: d } }

            function j(a) { a = a.substr(0, 1048576); var b = a.split("\r"),
                    c = a.split("\n"),
                    d = c.length > 1 && c[0].length < b[0].length; if (1 === b.length || d) return "\n"; for (var e = 0, f = 0; f < b.length; f++) "\n" === b[f][0] && e++; return e >= b.length / 2 ? "\r\n" : "\r" }

            function k(a) { var b = q.test(a); return b ? parseFloat(a) : a }

            function l(a, b, c, d) { x.errors.push({ type: a, code: b, message: c, row: d }) } var m, n, o, q = /^\s*-?(\d*\.?\d+|\d+\.?\d*)(e[-+]?\d+)?\s*$/i,
                s = this,
                t = 0,
                u = !1,
                v = !1,
                w = [],
                x = { data: [], errors: [], meta: {} }; if (r(a.step)) { var y = a.step;
                a.step = function(d) { if (x = d, c()) b();
                    else { if (b(), 0 === x.data.length) return;
                        t += d.data.length, a.preview && t > a.preview ? n.abort() : y(x, s) } } } this.parse = function(c, d, e) { if (a.newline || (a.newline = j(c)), o = !1, a.delimiter) r(a.delimiter) && (a.delimiter = a.delimiter(c), x.meta.delimiter = a.delimiter);
                else { var f = h(c, a.newline);
                    f.successful ? a.delimiter = f.bestDelimiter : (o = !0, a.delimiter = z.DefaultDelimiter), x.meta.delimiter = a.delimiter } var g = p(a); return a.preview && a.header && g.preview++, m = c, n = new i(g), x = n.parse(m, d, e), b(), u ? { meta: { paused: !0 } } : x || { meta: { paused: !1 } } }, this.paused = function() { return u }, this.pause = function() { u = !0, n.abort(), m = m.substr(n.getCharIndex()) }, this.resume = function() { u = !1, s.streamer.parseChunk(m) }, this.aborted = function() { return v }, this.abort = function() { v = !0, n.abort(), x.meta.aborted = !0, r(a.complete) && a.complete(x), m = "" } }

        function i(a) { a = a || {}; var b = a.delimiter,
                c = a.newline,
                d = a.comments,
                e = a.step,
                f = a.preview,
                g = a.fastMode,
                h = a.quoteChar || '"'; if (("string" != typeof b || z.BAD_DELIMITERS.indexOf(b) > -1) && (b = ","), d === b) throw "Comment character same as delimiter";
            d === !0 ? d = "#" : ("string" != typeof d || z.BAD_DELIMITERS.indexOf(d) > -1) && (d = !1), "\n" != c && "\r" != c && "\r\n" != c && (c = "\n"); var i = 0,
                j = !1;
            this.parse = function(a, k, l) {
                function m(a) { x.push(a), A = i }

                function n(b) { return l ? p() : ("undefined" == typeof b && (b = a.substr(i)), z.push(b), i = s, m(z), w && q(), p()) }

                function o(b) { i = b, m(z), z = [], E = a.indexOf(c, i) }

                function p(a) { return { data: x, errors: y, meta: { delimiter: b, linebreak: c, aborted: j, truncated: !!a, cursor: A + (k || 0) } } }

                function q() { e(p()), x = [], y = [] } if ("string" != typeof a) throw "Input must be a string"; var s = a.length,
                    t = b.length,
                    u = c.length,
                    v = d.length,
                    w = r(e);
                i = 0; var x = [],
                    y = [],
                    z = [],
                    A = 0; if (!a) return p(); if (g || g !== !1 && a.indexOf(h) === -1) { for (var B = a.split(c), C = 0; C < B.length; C++) { var z = B[C]; if (i += z.length, C !== B.length - 1) i += c.length;
                        else if (l) return p(); if (!d || z.substr(0, v) !== d) { if (w) { if (x = [], m(z.split(b)), q(), j) return p() } else m(z.split(b)); if (f && C >= f) return x = x.slice(0, f), p(!0) } } return p() } for (var D = a.indexOf(b, i), E = a.indexOf(c, i), F = new RegExp(h + h, "g");;)
                    if (a[i] !== h)
                        if (d && 0 === z.length && a.substr(i, v) === d) { if (E === -1) return p();
                            i = E + u, E = a.indexOf(c, i), D = a.indexOf(b, i) } else if (D !== -1 && (D < E || E === -1)) z.push(a.substring(i, D)), i = D + t, D = a.indexOf(b, i);
                else { if (E === -1) break; if (z.push(a.substring(i, E)), o(E + u), w && (q(), j)) return p(); if (f && x.length >= f) return p(!0) } else { var G = i; for (i++;;) { var G = a.indexOf(h, G + 1); if (G === -1) return l || y.push({ type: "Quotes", code: "MissingQuotes", message: "Quoted field unterminated", row: x.length, index: i }), n(); if (G === s - 1) { var H = a.substring(i, G).replace(F, h); return n(H) } if (a[G + 1] !== h) { if (a[G + 1] === b) { z.push(a.substring(i, G).replace(F, h)), i = G + 1 + t, D = a.indexOf(b, i), E = a.indexOf(c, i); break } if (a.substr(G + 1, u) === c) { if (z.push(a.substring(i, G).replace(F, h)), o(G + 1 + u), D = a.indexOf(b, i), w && (q(), j)) return p(); if (f && x.length >= f) return p(!0); break } } else G++ } } return n() }, this.abort = function() { j = !0 }, this.getCharIndex = function() { return i } }

        function j() { var a = document.getElementsByTagName("script"); return a.length ? a[a.length - 1].src : "" }

        function k() { if (!z.WORKERS_SUPPORTED) return !1; if (!w && null === z.SCRIPT_PATH) throw new Error("Script path cannot be determined automatically when Papa Parse is loaded asynchronously. You need to set Papa.SCRIPT_PATH manually."); var a = z.SCRIPT_PATH || s;
            a += (a.indexOf("?") !== -1 ? "&" : "?") + "papaworker"; var b = new t.Worker(a); return b.onmessage = l, b.id = y++, x[b.id] = b, b }

        function l(a) { var b = a.data,
                c = x[b.workerId],
                d = !1; if (b.error) c.userError(b.error, b.file);
            else if (b.results && b.results.data) { var e = function() { d = !0, m(b.workerId, { data: [], errors: [], meta: { aborted: !0 } }) },
                    f = { abort: e, pause: n, resume: n }; if (r(c.userStep)) { for (var g = 0; g < b.results.data.length && (c.userStep({ data: [b.results.data[g]], errors: b.results.errors, meta: b.results.meta }, f), !d); g++);
                    delete b.results } else r(c.userChunk) && (c.userChunk(b.results, f, b.file), delete b.results) } b.finished && !d && m(b.workerId, b.results) }

        function m(a, b) { var c = x[a];
            r(c.userComplete) && c.userComplete(b), c.terminate(), delete x[a] }

        function n() { throw "Not implemented." }

        function o(a) { var b = a.data; if ("undefined" == typeof z.WORKER_ID && b && (z.WORKER_ID = b.workerId), "string" == typeof b.input) t.postMessage({ workerId: z.WORKER_ID, results: z.parse(b.input, b.config), finished: !0 });
            else if (t.File && b.input instanceof File || b.input instanceof Object) { var c = z.parse(b.input, b.config);
                c && t.postMessage({ workerId: z.WORKER_ID, results: c, finished: !0 }) } }

        function p(a) { if ("object" != typeof a) return a; var b = a instanceof Array ? [] : {}; for (var c in a) b[c] = p(a[c]); return b }

        function q(a, b) { return function() { a.apply(b, arguments) } }

        function r(a) { return "function" == typeof a } var s, t = function() { return "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof t ? t : {} }(),
            u = !t.document && !!t.postMessage,
            v = u && /(\?|&)papaworker(=|&|$)/.test(t.location.search),
            w = !1,
            x = {},
            y = 0,
            z = {}; if (z.parse = a, z.unparse = b, z.RECORD_SEP = String.fromCharCode(30), z.UNIT_SEP = String.fromCharCode(31), z.BYTE_ORDER_MARK = "\ufeff", z.BAD_DELIMITERS = ["\r", "\n", '"', z.BYTE_ORDER_MARK], z.WORKERS_SUPPORTED = !u && !!t.Worker, z.SCRIPT_PATH = null, z.LocalChunkSize = 10485760, z.RemoteChunkSize = 5242880, z.DefaultDelimiter = ",", z.Parser = i, z.ParserHandle = h, z.NetworkStreamer = d, z.FileStreamer = e, z.StringStreamer = f, z.ReadableStreamStreamer = g, t.jQuery) { var A = t.jQuery;
            A.fn.parse = function(a) {
                function b() { if (0 === f.length) return void(r(a.complete) && a.complete()); var b = f[0]; if (r(a.before)) { var e = a.before(b.file, b.inputElem); if ("object" == typeof e) { if ("abort" === e.action) return void c("AbortError", b.file, b.inputElem, e.reason); if ("skip" === e.action) return void d(); "object" == typeof e.config && (b.instanceConfig = A.extend(b.instanceConfig, e.config)) } else if ("skip" === e) return void d() } var g = b.instanceConfig.complete;
                    b.instanceConfig.complete = function(a) { r(g) && g(a, b.file, b.inputElem), d() }, z.parse(b.file, b.instanceConfig) }

                function c(b, c, d, e) { r(a.error) && a.error({ name: b }, c, d, e) }

                function d() { f.splice(0, 1), b() } var e = a.config || {},
                    f = []; return this.each(function(a) { var b = "INPUT" === A(this).prop("tagName").toUpperCase() && "file" === A(this).attr("type").toLowerCase() && t.FileReader; if (!b || !this.files || 0 === this.files.length) return !0; for (var c = 0; c < this.files.length; c++) f.push({ file: this.files[c], inputElem: this, instanceConfig: A.extend({}, e) }) }), b(), this } } return v ? t.onmessage = o : z.WORKERS_SUPPORTED && (s = j(), document.body ? document.addEventListener("DOMContentLoaded", function() { w = !0 }, !0) : w = !0), d.prototype = Object.create(c.prototype), d.prototype.constructor = d, e.prototype = Object.create(c.prototype), e.prototype.constructor = e, f.prototype = Object.create(f.prototype), f.prototype.constructor = f, g.prototype = Object.create(c.prototype), g.prototype.constructor = g, z }), ! function(a) { if ("object" == typeof exports && "undefined" != typeof module) module.exports = a();
        else if ("function" == typeof define && define.amd) define([], a);
        else { var b;
            b = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, b.ProgressBar = a() } }(function() {
        var a;
        return function b(a, c, d) {
            function e(g, h) { if (!c[g]) { if (!a[g]) { var i = "function" == typeof require && require; if (!h && i) return i(g, !0); if (f) return f(g, !0); var j = new Error("Cannot find module '" + g + "'"); throw j.code = "MODULE_NOT_FOUND", j } var k = c[g] = { exports: {} };
                    a[g][0].call(k.exports, function(b) { var c = a[g][1][b]; return e(c ? c : b) }, k, k.exports, b, a, c, d) } return c[g].exports } for (var f = "function" == typeof require && require, g = 0; g < d.length; g++) e(d[g]); return e }({
            1: [function(b, c, d) {
                (function() { var b = this || Function("return this")(),
                        e = function() { "use strict";

                            function e() {}

                            function f(a, b) { var c; for (c in a) Object.hasOwnProperty.call(a, c) && b(c) }

                            function g(a, b) { return f(b, function(c) { a[c] = b[c] }), a }

                            function h(a, b) { f(b, function(c) { "undefined" == typeof a[c] && (a[c] = b[c]) }) }

                            function i(a, b, c, d, e, f, g) { var h, i, k, l = f > a ? 0 : (a - f) / e; for (h in b) b.hasOwnProperty(h) && (i = g[h], k = "function" == typeof i ? i : o[i], b[h] = j(c[h], d[h], k, l)); return b }

                            function j(a, b, c, d) { return a + (b - a) * c(d) }

                            function k(a, b) { var c = n.prototype.filter,
                                    d = a._filterArgs;
                                f(c, function(e) { "undefined" != typeof c[e][b] && c[e][b].apply(a, d) }) }

                            function l(a, b, c, d, e, f, g, h, j, l, m) { v = b + c + d, w = Math.min(m || u(), v), x = w >= v, y = d - (v - w), a.isPlaying() && (x ? (j(g, a._attachment, y), a.stop(!0)) : (a._scheduleId = l(a._timeoutHandler, s), k(a, "beforeTween"), b + c > w ? i(1, e, f, g, 1, 1, h) : i(w, e, f, g, d, b + c, h), k(a, "afterTween"), j(e, a._attachment, y))) }

                            function m(a, b) { var c = {},
                                    d = typeof b; return "string" === d || "function" === d ? f(a, function(a) { c[a] = b }) : f(a, function(a) { c[a] || (c[a] = b[a] || q) }), c }

                            function n(a, b) { this._currentState = a || {}, this._configured = !1, this._scheduleFunction = p, "undefined" != typeof b && this.setConfig(b) } var o, p, q = "linear",
                                r = 500,
                                s = 1e3 / 60,
                                t = Date.now ? Date.now : function() { return +new Date },
                                u = "undefined" != typeof SHIFTY_DEBUG_NOW ? SHIFTY_DEBUG_NOW : t;
                            p = "undefined" != typeof window ? window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || window.mozCancelRequestAnimationFrame && window.mozRequestAnimationFrame || setTimeout : setTimeout; var v, w, x, y; return n.prototype.tween = function(a) { return this._isTweening ? this : (void 0 === a && this._configured || this.setConfig(a), this._timestamp = u(), this._start(this.get(), this._attachment), this.resume()) }, n.prototype.setConfig = function(a) { a = a || {}, this._configured = !0, this._attachment = a.attachment, this._pausedAtTime = null, this._scheduleId = null, this._delay = a.delay || 0, this._start = a.start || e, this._step = a.step || e, this._finish = a.finish || e, this._duration = a.duration || r, this._currentState = g({}, a.from) || this.get(), this._originalState = this.get(), this._targetState = g({}, a.to) || this.get(); var b = this;
                                this._timeoutHandler = function() { l(b, b._timestamp, b._delay, b._duration, b._currentState, b._originalState, b._targetState, b._easing, b._step, b._scheduleFunction) }; var c = this._currentState,
                                    d = this._targetState; return h(d, c), this._easing = m(c, a.easing || q), this._filterArgs = [c, this._originalState, d, this._easing], k(this, "tweenCreated"), this }, n.prototype.get = function() { return g({}, this._currentState) }, n.prototype.set = function(a) { this._currentState = a }, n.prototype.pause = function() { return this._pausedAtTime = u(), this._isPaused = !0, this }, n.prototype.resume = function() { return this._isPaused && (this._timestamp += u() - this._pausedAtTime), this._isPaused = !1, this._isTweening = !0, this._timeoutHandler(), this }, n.prototype.seek = function(a) { a = Math.max(a, 0); var b = u(); return this._timestamp + a === 0 ? this : (this._timestamp = b - a, this.isPlaying() || (this._isTweening = !0, this._isPaused = !1, l(this, this._timestamp, this._delay, this._duration, this._currentState, this._originalState, this._targetState, this._easing, this._step, this._scheduleFunction, b), this.pause()), this) }, n.prototype.stop = function(a) { return this._isTweening = !1, this._isPaused = !1, this._timeoutHandler = e, (b.cancelAnimationFrame || b.webkitCancelAnimationFrame || b.oCancelAnimationFrame || b.msCancelAnimationFrame || b.mozCancelRequestAnimationFrame || b.clearTimeout)(this._scheduleId), a && (k(this, "beforeTween"), i(1, this._currentState, this._originalState, this._targetState, 1, 0, this._easing), k(this, "afterTween"), k(this, "afterTweenEnd"), this._finish.call(this, this._currentState, this._attachment)), this }, n.prototype.isPlaying = function() { return this._isTweening && !this._isPaused }, n.prototype.setScheduleFunction = function(a) { this._scheduleFunction = a }, n.prototype.dispose = function() { var a; for (a in this) this.hasOwnProperty(a) && delete this[a] }, n.prototype.filter = {}, n.prototype.formula = { linear: function(a) { return a } }, o = n.prototype.formula, g(n, { now: u, each: f, tweenProps: i, tweenProp: j, applyFilter: k, shallowCopy: g, defaults: h, composeEasingObject: m }), "function" == typeof SHIFTY_DEBUG_NOW && (b.timeoutHandler = l), "object" == typeof d ? c.exports = n : "function" == typeof a && a.amd ? a(function() { return n }) : "undefined" == typeof b.Tweenable && (b.Tweenable = n), n }();! function() { e.shallowCopy(e.prototype.formula, { easeInQuad: function(a) { return Math.pow(a, 2) }, easeOutQuad: function(a) { return -(Math.pow(a - 1, 2) - 1) }, easeInOutQuad: function(a) { return (a /= .5) < 1 ? .5 * Math.pow(a, 2) : -.5 * ((a -= 2) * a - 2) }, easeInCubic: function(a) { return Math.pow(a, 3) }, easeOutCubic: function(a) { return Math.pow(a - 1, 3) + 1 }, easeInOutCubic: function(a) { return (a /= .5) < 1 ? .5 * Math.pow(a, 3) : .5 * (Math.pow(a - 2, 3) + 2) }, easeInQuart: function(a) { return Math.pow(a, 4) }, easeOutQuart: function(a) { return -(Math.pow(a - 1, 4) - 1) }, easeInOutQuart: function(a) { return (a /= .5) < 1 ? .5 * Math.pow(a, 4) : -.5 * ((a -= 2) * Math.pow(a, 3) - 2) }, easeInQuint: function(a) { return Math.pow(a, 5) }, easeOutQuint: function(a) { return Math.pow(a - 1, 5) + 1 }, easeInOutQuint: function(a) { return (a /= .5) < 1 ? .5 * Math.pow(a, 5) : .5 * (Math.pow(a - 2, 5) + 2) }, easeInSine: function(a) { return -Math.cos(a * (Math.PI / 2)) + 1 }, easeOutSine: function(a) { return Math.sin(a * (Math.PI / 2)) }, easeInOutSine: function(a) { return -.5 * (Math.cos(Math.PI * a) - 1) }, easeInExpo: function(a) { return 0 === a ? 0 : Math.pow(2, 10 * (a - 1)) }, easeOutExpo: function(a) { return 1 === a ? 1 : -Math.pow(2, -10 * a) + 1 }, easeInOutExpo: function(a) { return 0 === a ? 0 : 1 === a ? 1 : (a /= .5) < 1 ? .5 * Math.pow(2, 10 * (a - 1)) : .5 * (-Math.pow(2, -10 * --a) + 2) }, easeInCirc: function(a) { return -(Math.sqrt(1 - a * a) - 1) }, easeOutCirc: function(a) { return Math.sqrt(1 - Math.pow(a - 1, 2)) }, easeInOutCirc: function(a) { return (a /= .5) < 1 ? -.5 * (Math.sqrt(1 - a * a) - 1) : .5 * (Math.sqrt(1 - (a -= 2) * a) + 1) }, easeOutBounce: function(a) { return 1 / 2.75 > a ? 7.5625 * a * a : 2 / 2.75 > a ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : 2.5 / 2.75 > a ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375 }, easeInBack: function(a) { var b = 1.70158; return a * a * ((b + 1) * a - b) }, easeOutBack: function(a) { var b = 1.70158; return (a -= 1) * a * ((b + 1) * a + b) + 1 }, easeInOutBack: function(a) { var b = 1.70158; return (a /= .5) < 1 ? .5 * (a * a * (((b *= 1.525) + 1) * a - b)) : .5 * ((a -= 2) * a * (((b *= 1.525) + 1) * a + b) + 2) }, elastic: function(a) { return -1 * Math.pow(4, -8 * a) * Math.sin((6 * a - 1) * (2 * Math.PI) / 2) + 1 }, swingFromTo: function(a) { var b = 1.70158; return (a /= .5) < 1 ? .5 * (a * a * (((b *= 1.525) + 1) * a - b)) : .5 * ((a -= 2) * a * (((b *= 1.525) + 1) * a + b) + 2) }, swingFrom: function(a) { var b = 1.70158; return a * a * ((b + 1) * a - b) }, swingTo: function(a) { var b = 1.70158; return (a -= 1) * a * ((b + 1) * a + b) + 1 }, bounce: function(a) { return 1 / 2.75 > a ? 7.5625 * a * a : 2 / 2.75 > a ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : 2.5 / 2.75 > a ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375 }, bouncePast: function(a) { return 1 / 2.75 > a ? 7.5625 * a * a : 2 / 2.75 > a ? 2 - (7.5625 * (a -= 1.5 / 2.75) * a + .75) : 2.5 / 2.75 > a ? 2 - (7.5625 * (a -= 2.25 / 2.75) * a + .9375) : 2 - (7.5625 * (a -= 2.625 / 2.75) * a + .984375) }, easeFromTo: function(a) { return (a /= .5) < 1 ? .5 * Math.pow(a, 4) : -.5 * ((a -= 2) * Math.pow(a, 3) - 2) }, easeFrom: function(a) { return Math.pow(a, 4) }, easeTo: function(a) { return Math.pow(a, .25) } }) }(),
                    function() {
                        function a(a, b, c, d, e, f) {
                            function g(a) { return ((n * a + o) * a + p) * a }

                            function h(a) { return ((q * a + r) * a + s) * a }

                            function i(a) { return (3 * n * a + 2 * o) * a + p }

                            function j(a) { return 1 / (200 * a) }

                            function k(a, b) { return h(m(a, b)) }

                            function l(a) { return a >= 0 ? a : 0 - a }

                            function m(a, b) { var c, d, e, f, h, j; for (e = a, j = 0; 8 > j; j++) { if (f = g(e) - a, l(f) < b) return e; if (h = i(e), l(h) < 1e-6) break;
                                    e -= f / h } if (c = 0, d = 1, e = a, c > e) return c; if (e > d) return d; for (; d > c;) { if (f = g(e), l(f - a) < b) return e;
                                    a > f ? c = e : d = e, e = .5 * (d - c) + c } return e } var n = 0,
                                o = 0,
                                p = 0,
                                q = 0,
                                r = 0,
                                s = 0; return p = 3 * b, o = 3 * (d - b) - p, n = 1 - p - o, s = 3 * c, r = 3 * (e - c) - s, q = 1 - s - r, k(a, j(f)) }

                        function b(b, c, d, e) { return function(f) { return a(f, b, c, d, e, 1) } } e.setBezierFunction = function(a, c, d, f, g) { var h = b(c, d, f, g); return h.displayName = a, h.x1 = c, h.y1 = d, h.x2 = f, h.y2 = g, e.prototype.formula[a] = h }, e.unsetBezierFunction = function(a) { delete e.prototype.formula[a] } }(),
                    function() {
                        function a(a, b, c, d, f, g) { return e.tweenProps(d, b, a, c, 1, g, f) } var b = new e;
                        b._filterArgs = [], e.interpolate = function(c, d, f, g, h) { var i = e.shallowCopy({}, c),
                                j = h || 0,
                                k = e.composeEasingObject(c, g || "linear");
                            b.set({}); var l = b._filterArgs;
                            l.length = 0, l[0] = i, l[1] = c, l[2] = d, l[3] = k, e.applyFilter(b, "tweenCreated"), e.applyFilter(b, "beforeTween"); var m = a(c, i, d, f, k, j); return e.applyFilter(b, "afterTween"), m } }(),
                    function(a) {
                        function b(a, b) { var c, d = [],
                                e = a.length; for (c = 0; e > c; c++) d.push("_" + b + "_" + c); return d }

                        function c(a) { var b = a.match(v); return b ? (1 === b.length || a[0].match(u)) && b.unshift("") : b = ["", ""], b.join(A) }

                        function d(b) { a.each(b, function(a) { var c = b[a]; "string" == typeof c && c.match(z) && (b[a] = e(c)) }) }

                        function e(a) { return i(z, a, f) }

                        function f(a) { var b = g(a); return "rgb(" + b[0] + "," + b[1] + "," + b[2] + ")" }

                        function g(a) { return a = a.replace(/#/, ""), 3 === a.length && (a = a.split(""), a = a[0] + a[0] + a[1] + a[1] + a[2] + a[2]), B[0] = h(a.substr(0, 2)), B[1] = h(a.substr(2, 2)), B[2] = h(a.substr(4, 2)), B }

                        function h(a) { return parseInt(a, 16) }

                        function i(a, b, c) { var d = b.match(a),
                                e = b.replace(a, A); if (d)
                                for (var f, g = d.length, h = 0; g > h; h++) f = d.shift(), e = e.replace(A, c(f)); return e }

                        function j(a) { return i(x, a, k) }

                        function k(a) { for (var b = a.match(w), c = b.length, d = a.match(y)[0], e = 0; c > e; e++) d += parseInt(b[e], 10) + ","; return d = d.slice(0, -1) + ")" }

                        function l(d) { var e = {}; return a.each(d, function(a) { var f = d[a]; if ("string" == typeof f) { var g = r(f);
                                    e[a] = { formatString: c(f), chunkNames: b(g, a) } } }), e }

                        function m(b, c) { a.each(c, function(a) { for (var d = b[a], e = r(d), f = e.length, g = 0; f > g; g++) b[c[a].chunkNames[g]] = +e[g];
                                delete b[a] }) }

                        function n(b, c) { a.each(c, function(a) { var d = b[a],
                                    e = o(b, c[a].chunkNames),
                                    f = p(e, c[a].chunkNames);
                                d = q(c[a].formatString, f), b[a] = j(d) }) }

                        function o(a, b) { for (var c, d = {}, e = b.length, f = 0; e > f; f++) c = b[f], d[c] = a[c], delete a[c]; return d }

                        function p(a, b) { C.length = 0; for (var c = b.length, d = 0; c > d; d++) C.push(a[b[d]]); return C }

                        function q(a, b) { for (var c = a, d = b.length, e = 0; d > e; e++) c = c.replace(A, +b[e].toFixed(4)); return c }

                        function r(a) { return a.match(w) }

                        function s(b, c) { a.each(c, function(a) { var d, e = c[a],
                                    f = e.chunkNames,
                                    g = f.length,
                                    h = b[a]; if ("string" == typeof h) { var i = h.split(" "),
                                        j = i[i.length - 1]; for (d = 0; g > d; d++) b[f[d]] = i[d] || j } else
                                    for (d = 0; g > d; d++) b[f[d]] = h;
                                delete b[a] }) }

                        function t(b, c) { a.each(c, function(a) { var d = c[a],
                                    e = d.chunkNames,
                                    f = e.length,
                                    g = b[e[0]],
                                    h = typeof g; if ("string" === h) { for (var i = "", j = 0; f > j; j++) i += " " + b[e[j]], delete b[e[j]];
                                    b[a] = i.substr(1) } else b[a] = g }) } var u = /(\d|\-|\.)/,
                            v = /([^\-0-9\.]+)/g,
                            w = /[0-9.\-]+/g,
                            x = new RegExp("rgb\\(" + w.source + /,\s*/.source + w.source + /,\s*/.source + w.source + "\\)", "g"),
                            y = /^.*\(/,
                            z = /#([0-9]|[a-f]){3,6}/gi,
                            A = "VAL",
                            B = [],
                            C = [];
                        a.prototype.filter.token = { tweenCreated: function(a, b, c, e) { d(a), d(b), d(c), this._tokenData = l(a) }, beforeTween: function(a, b, c, d) { s(d, this._tokenData), m(a, this._tokenData), m(b, this._tokenData), m(c, this._tokenData) }, afterTween: function(a, b, c, d) { n(a, this._tokenData), n(b, this._tokenData), n(c, this._tokenData), t(d, this._tokenData) } } }(e) }).call(null) }, {}],
            2: [function(a, b, c) { var d = a("./shape"),
                    e = a("./utils"),
                    f = function(a, b) { this._pathTemplate = "M 50,50 m 0,-{radius} a {radius},{radius} 0 1 1 0,{2radius} a {radius},{radius} 0 1 1 0,-{2radius}", this.containerAspectRatio = 1, d.apply(this, arguments) };
                f.prototype = new d, f.prototype.constructor = f, f.prototype._pathString = function(a) { var b = a.strokeWidth;
                    a.trailWidth && a.trailWidth > a.strokeWidth && (b = a.trailWidth); var c = 50 - b / 2; return e.render(this._pathTemplate, { radius: c, "2radius": 2 * c }) }, f.prototype._trailString = function(a) { return this._pathString(a) }, b.exports = f }, { "./shape": 7, "./utils": 8 }],
            3: [function(a, b, c) { var d = a("./shape"),
                    e = a("./utils"),
                    f = function(a, b) { this._pathTemplate = "M 0,{center} L 100,{center}", d.apply(this, arguments) };
                f.prototype = new d, f.prototype.constructor = f, f.prototype._initializeSvg = function(a, b) { a.setAttribute("viewBox", "0 0 100 " + b.strokeWidth), a.setAttribute("preserveAspectRatio", "none") }, f.prototype._pathString = function(a) { return e.render(this._pathTemplate, { center: a.strokeWidth / 2 }) }, f.prototype._trailString = function(a) { return this._pathString(a) }, b.exports = f }, { "./shape": 7, "./utils": 8 }],
            4: [function(a, b, c) { b.exports = { Line: a("./line"), Circle: a("./circle"), SemiCircle: a("./semicircle"), Path: a("./path"), Shape: a("./shape"), utils: a("./utils") } }, { "./circle": 2, "./line": 3, "./path": 5, "./semicircle": 6, "./shape": 7, "./utils": 8 }],
            5: [function(a, b, c) {
                var d = a("shifty"),
                    e = a("./utils"),
                    f = { easeIn: "easeInCubic", easeOut: "easeOutCubic", easeInOut: "easeInOutCubic" },
                    g = function h(a, b) { if (!(this instanceof h)) throw new Error("Constructor was called without new keyword");
                        b = e.extend({ duration: 800, easing: "linear", from: {}, to: {}, step: function() {} }, b); var c;
                        c = e.isString(a) ? document.querySelector(a) : a, this.path = c, this._opts = b, this._tweenable = null; var d = this.path.getTotalLength();
                        this.path.style.strokeDasharray = d + " " + d, this.set(0) };
                g.prototype.value = function() { var a = this._getComputedDashOffset(),
                        b = this.path.getTotalLength(),
                        c = 1 - a / b; return parseFloat(c.toFixed(6), 10) }, g.prototype.set = function(a) { this.stop(), this.path.style.strokeDashoffset = this._progressToOffset(a); var b = this._opts.step; if (e.isFunction(b)) { var c = this._easing(this._opts.easing),
                            d = this._calculateTo(a, c),
                            f = this._opts.shape || this;
                        b(d, f, this._opts.attachment) } }, g.prototype.stop = function() { this._stopTween(), this.path.style.strokeDashoffset = this._getComputedDashOffset() }, g.prototype.animate = function(a, b, c) { b = b || {}, e.isFunction(b) && (c = b, b = {}); var f = e.extend({}, b),
                        g = e.extend({}, this._opts);
                    b = e.extend(g, b); var h = this._easing(b.easing),
                        i = this._resolveFromAndTo(a, h, f);
                    this.stop(), this.path.getBoundingClientRect(); var j = this._getComputedDashOffset(),
                        k = this._progressToOffset(a),
                        l = this;
                    this._tweenable = new d, this._tweenable.tween({ from: e.extend({ offset: j }, i.from), to: e.extend({ offset: k }, i.to), duration: b.duration, easing: h, step: function(a) { l.path.style.strokeDashoffset = a.offset; var c = b.shape || l;
                            b.step(a, c, b.attachment) }, finish: function(a) { e.isFunction(c) && c() } }) }, g.prototype._getComputedDashOffset = function() { var a = window.getComputedStyle(this.path, null); return parseFloat(a.getPropertyValue("stroke-dashoffset"), 10) }, g.prototype._progressToOffset = function(a) { var b = this.path.getTotalLength(); return b - a * b }, g.prototype._resolveFromAndTo = function(a, b, c) {
                    return c.from && c.to ? { from: c.from, to: c.to } : {
                        from: this._calculateFrom(b),
                        to: this._calculateTo(a, b)
                    }
                }, g.prototype._calculateFrom = function(a) { return d.interpolate(this._opts.from, this._opts.to, this.value(), a) }, g.prototype._calculateTo = function(a, b) { return d.interpolate(this._opts.from, this._opts.to, a, b) }, g.prototype._stopTween = function() { null !== this._tweenable && (this._tweenable.stop(), this._tweenable = null) }, g.prototype._easing = function(a) { return f.hasOwnProperty(a) ? f[a] : a }, b.exports = g
            }, { "./utils": 8, shifty: 1 }],
            6: [function(a, b, c) { var d = a("./shape"),
                    e = a("./circle"),
                    f = a("./utils"),
                    g = function(a, b) { this._pathTemplate = "M 50,50 m -{radius},0 a {radius},{radius} 0 1 1 {2radius},0", this.containerAspectRatio = 2, d.apply(this, arguments) };
                g.prototype = new d, g.prototype.constructor = g, g.prototype._initializeSvg = function(a, b) { a.setAttribute("viewBox", "0 0 100 50") }, g.prototype._initializeTextContainer = function(a, b, c) { a.text.style && (c.style.top = "auto", c.style.bottom = "0", a.text.alignToBottom ? f.setStyle(c, "transform", "translate(-50%, 0)") : f.setStyle(c, "transform", "translate(-50%, 50%)")) }, g.prototype._pathString = e.prototype._pathString, g.prototype._trailString = e.prototype._trailString, b.exports = g }, { "./circle": 2, "./shape": 7, "./utils": 8 }],
            7: [function(a, b, c) { var d = a("./path"),
                    e = a("./utils"),
                    f = "Object is destroyed",
                    g = function h(a, b) { if (!(this instanceof h)) throw new Error("Constructor was called without new keyword"); if (0 !== arguments.length) { this._opts = e.extend({ color: "#555", strokeWidth: 1, trailColor: null, trailWidth: null, fill: null, text: { style: { color: null, position: "absolute", left: "50%", top: "50%", padding: 0, margin: 0, transform: { prefix: !0, value: "translate(-50%, -50%)" } }, autoStyleContainer: !0, alignToBottom: !0, value: null, className: "progressbar-text" }, svgStyle: { display: "block", width: "100%" }, warnings: !1 }, b, !0), e.isObject(b) && void 0 !== b.svgStyle && (this._opts.svgStyle = b.svgStyle), e.isObject(b) && e.isObject(b.text) && void 0 !== b.text.style && (this._opts.text.style = b.text.style); var c, f = this._createSvgView(this._opts); if (c = e.isString(a) ? document.querySelector(a) : a, !c) throw new Error("Container does not exist: " + a);
                            this._container = c, this._container.appendChild(f.svg), this._opts.warnings && this._warnContainerAspectRatio(this._container), this._opts.svgStyle && e.setStyles(f.svg, this._opts.svgStyle), this.svg = f.svg, this.path = f.path, this.trail = f.trail, this.text = null; var g = e.extend({ attachment: void 0, shape: this }, this._opts);
                            this._progressPath = new d(f.path, g), e.isObject(this._opts.text) && null !== this._opts.text.value && this.setText(this._opts.text.value) } };
                g.prototype.animate = function(a, b, c) { if (null === this._progressPath) throw new Error(f);
                    this._progressPath.animate(a, b, c) }, g.prototype.stop = function() { if (null === this._progressPath) throw new Error(f);
                    void 0 !== this._progressPath && this._progressPath.stop() }, g.prototype.destroy = function() { if (null === this._progressPath) throw new Error(f);
                    this.stop(), this.svg.parentNode.removeChild(this.svg), this.svg = null, this.path = null, this.trail = null, this._progressPath = null, null !== this.text && (this.text.parentNode.removeChild(this.text), this.text = null) }, g.prototype.set = function(a) { if (null === this._progressPath) throw new Error(f);
                    this._progressPath.set(a) }, g.prototype.value = function() { if (null === this._progressPath) throw new Error(f); return void 0 === this._progressPath ? 0 : this._progressPath.value() }, g.prototype.setText = function(a) { if (null === this._progressPath) throw new Error(f);
                    null === this.text && (this.text = this._createTextContainer(this._opts, this._container), this._container.appendChild(this.text)), e.isObject(a) ? (e.removeChildren(this.text), this.text.appendChild(a)) : this.text.innerHTML = a }, g.prototype._createSvgView = function(a) { var b = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                    this._initializeSvg(b, a); var c = null;
                    (a.trailColor || a.trailWidth) && (c = this._createTrail(a), b.appendChild(c)); var d = this._createPath(a); return b.appendChild(d), { svg: b, path: d, trail: c } }, g.prototype._initializeSvg = function(a, b) { a.setAttribute("viewBox", "0 0 100 100") }, g.prototype._createPath = function(a) { var b = this._pathString(a); return this._createPathElement(b, a) }, g.prototype._createTrail = function(a) { var b = this._trailString(a),
                        c = e.extend({}, a); return c.trailColor || (c.trailColor = "#eee"), c.trailWidth || (c.trailWidth = c.strokeWidth), c.color = c.trailColor, c.strokeWidth = c.trailWidth, c.fill = null, this._createPathElement(b, c) }, g.prototype._createPathElement = function(a, b) { var c = document.createElementNS("http://www.w3.org/2000/svg", "path"); return c.setAttribute("d", a), c.setAttribute("stroke", b.color), c.setAttribute("stroke-width", b.strokeWidth), b.fill ? c.setAttribute("fill", b.fill) : c.setAttribute("fill-opacity", "0"), c }, g.prototype._createTextContainer = function(a, b) { var c = document.createElement("div");
                    c.className = a.text.className; var d = a.text.style; return d && (a.text.autoStyleContainer && (b.style.position = "relative"), e.setStyles(c, d), d.color || (c.style.color = a.color)), this._initializeTextContainer(a, b, c), c }, g.prototype._initializeTextContainer = function(a, b, c) {}, g.prototype._pathString = function(a) { throw new Error("Override this function for each progress bar") }, g.prototype._trailString = function(a) { throw new Error("Override this function for each progress bar") }, g.prototype._warnContainerAspectRatio = function(a) { if (this.containerAspectRatio) { var b = window.getComputedStyle(a, null),
                            c = parseFloat(b.getPropertyValue("width"), 10),
                            d = parseFloat(b.getPropertyValue("height"), 10);
                        e.floatEquals(this.containerAspectRatio, c / d) || (console.warn("Incorrect aspect ratio of container", "#" + a.id, "detected:", b.getPropertyValue("width") + "(width)", "/", b.getPropertyValue("height") + "(height)", "=", c / d), console.warn("Aspect ratio of should be", this.containerAspectRatio)) } }, b.exports = g }, { "./path": 5, "./utils": 8 }],
            8: [function(a, b, c) {
                function d(a, b, c) { a = a || {}, b = b || {}, c = c || !1; for (var e in b)
                        if (b.hasOwnProperty(e)) { var f = a[e],
                                g = b[e];
                            c && l(f) && l(g) ? a[e] = d(f, g, c) : a[e] = g }
                    return a }

                function e(a, b) { var c = a; for (var d in b)
                        if (b.hasOwnProperty(d)) { var e = b[d],
                                f = "\\{" + d + "\\}",
                                g = new RegExp(f, "g");
                            c = c.replace(g, e) }
                    return c }

                function f(a, b, c) { for (var d = a.style, e = 0; e < p.length; ++e) { var f = p[e];
                        d[f + h(b)] = c } d[b] = c }

                function g(a, b) { m(b, function(b, c) { null !== b && void 0 !== b && (l(b) && b.prefix === !0 ? f(a, c, b.value) : a.style[c] = b) }) }

                function h(a) { return a.charAt(0).toUpperCase() + a.slice(1) }

                function i(a) { return "string" == typeof a || a instanceof String }

                function j(a) { return "function" == typeof a }

                function k(a) { return "[object Array]" === Object.prototype.toString.call(a) }

                function l(a) { if (k(a)) return !1; var b = typeof a; return "object" === b && !!a }

                function m(a, b) { for (var c in a)
                        if (a.hasOwnProperty(c)) { var d = a[c];
                            b(d, c) } }

                function n(a, b) { return Math.abs(a - b) < q }

                function o(a) { for (; a.firstChild;) a.removeChild(a.firstChild) } var p = "Webkit Moz O ms".split(" "),
                    q = .001;
                b.exports = { extend: d, render: e, setStyle: f, setStyles: g, capitalize: h, isString: i, isFunction: j, isObject: l, forEachObject: m, floatEquals: n, removeChildren: o } }, {}]
        }, {}, [4])(4)
    }),
    function() {
        function a(a) {
            function b(b, c, d, e, f, g) { for (; f >= 0 && f < g; f += a) { var h = e ? e[f] : f;
                    d = c(d, b[h], h, b) } return d } return function(c, d, e, f) { d = t(d, f, 4); var g = !A(c) && s.keys(c),
                    h = (g || c).length,
                    i = a > 0 ? 0 : h - 1; return arguments.length < 3 && (e = c[g ? g[i] : i], i += a), b(c, d, e, g, i, h) } }

        function b(a) { return function(b, c, d) { c = u(c, d); for (var e = z(b), f = a > 0 ? 0 : e - 1; f >= 0 && f < e; f += a)
                    if (c(b[f], f, b)) return f; return -1 } }

        function c(a, b, c) { return function(d, e, f) { var g = 0,
                    h = z(d); if ("number" == typeof f) a > 0 ? g = f >= 0 ? f : Math.max(f + h, g) : h = f >= 0 ? Math.min(f + 1, h) : f + h + 1;
                else if (c && f && h) return f = c(d, e), d[f] === e ? f : -1; if (e !== e) return f = b(k.call(d, g, h), s.isNaN), f >= 0 ? f + g : -1; for (f = a > 0 ? g : h - 1; f >= 0 && f < h; f += a)
                    if (d[f] === e) return f; return -1 } }

        function d(a, b) { var c = F.length,
                d = a.constructor,
                e = s.isFunction(d) && d.prototype || h,
                f = "constructor"; for (s.has(a, f) && !s.contains(b, f) && b.push(f); c--;) f = F[c], f in a && a[f] !== e[f] && !s.contains(b, f) && b.push(f) } var e = this,
            f = e._,
            g = Array.prototype,
            h = Object.prototype,
            i = Function.prototype,
            j = g.push,
            k = g.slice,
            l = h.toString,
            m = h.hasOwnProperty,
            n = Array.isArray,
            o = Object.keys,
            p = i.bind,
            q = Object.create,
            r = function() {},
            s = function(a) { return a instanceof s ? a : this instanceof s ? void(this._wrapped = a) : new s(a) }; "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = s), exports._ = s) : e._ = s, s.VERSION = "1.8.3"; var t = function(a, b, c) { if (void 0 === b) return a; switch (null == c ? 3 : c) {
                    case 1:
                        return function(c) { return a.call(b, c) };
                    case 2:
                        return function(c, d) { return a.call(b, c, d) };
                    case 3:
                        return function(c, d, e) { return a.call(b, c, d, e) };
                    case 4:
                        return function(c, d, e, f) { return a.call(b, c, d, e, f) } } return function() { return a.apply(b, arguments) } },
            u = function(a, b, c) { return null == a ? s.identity : s.isFunction(a) ? t(a, b, c) : s.isObject(a) ? s.matcher(a) : s.property(a) };
        s.iteratee = function(a, b) { return u(a, b, 1 / 0) }; var v = function(a, b) { return function(c) { var d = arguments.length; if (d < 2 || null == c) return c; for (var e = 1; e < d; e++)
                        for (var f = arguments[e], g = a(f), h = g.length, i = 0; i < h; i++) { var j = g[i];
                            b && void 0 !== c[j] || (c[j] = f[j]) }
                    return c } },
            w = function(a) { if (!s.isObject(a)) return {}; if (q) return q(a);
                r.prototype = a; var b = new r; return r.prototype = null, b },
            x = function(a) { return function(b) { return null == b ? void 0 : b[a] } },
            y = Math.pow(2, 53) - 1,
            z = x("length"),
            A = function(a) { var b = z(a); return "number" == typeof b && b >= 0 && b <= y };
        s.each = s.forEach = function(a, b, c) { b = t(b, c); var d, e; if (A(a))
                for (d = 0, e = a.length; d < e; d++) b(a[d], d, a);
            else { var f = s.keys(a); for (d = 0, e = f.length; d < e; d++) b(a[f[d]], f[d], a) } return a }, s.map = s.collect = function(a, b, c) { b = u(b, c); for (var d = !A(a) && s.keys(a), e = (d || a).length, f = Array(e), g = 0; g < e; g++) { var h = d ? d[g] : g;
                f[g] = b(a[h], h, a) } return f }, s.reduce = s.foldl = s.inject = a(1), s.reduceRight = s.foldr = a(-1), s.find = s.detect = function(a, b, c) { var d; if (d = A(a) ? s.findIndex(a, b, c) : s.findKey(a, b, c), void 0 !== d && d !== -1) return a[d] }, s.filter = s.select = function(a, b, c) { var d = []; return b = u(b, c), s.each(a, function(a, c, e) { b(a, c, e) && d.push(a) }), d }, s.reject = function(a, b, c) { return s.filter(a, s.negate(u(b)), c) }, s.every = s.all = function(a, b, c) { b = u(b, c); for (var d = !A(a) && s.keys(a), e = (d || a).length, f = 0; f < e; f++) { var g = d ? d[f] : f; if (!b(a[g], g, a)) return !1 } return !0 }, s.some = s.any = function(a, b, c) { b = u(b, c); for (var d = !A(a) && s.keys(a), e = (d || a).length, f = 0; f < e; f++) { var g = d ? d[f] : f; if (b(a[g], g, a)) return !0 } return !1 }, s.contains = s.includes = s.include = function(a, b, c, d) { return A(a) || (a = s.values(a)), ("number" != typeof c || d) && (c = 0), s.indexOf(a, b, c) >= 0 }, s.invoke = function(a, b) { var c = k.call(arguments, 2),
                d = s.isFunction(b); return s.map(a, function(a) { var e = d ? b : a[b]; return null == e ? e : e.apply(a, c) }) }, s.pluck = function(a, b) { return s.map(a, s.property(b)) }, s.where = function(a, b) { return s.filter(a, s.matcher(b)) }, s.findWhere = function(a, b) { return s.find(a, s.matcher(b)) }, s.max = function(a, b, c) { var d, e, f = -(1 / 0),
                g = -(1 / 0); if (null == b && null != a) { a = A(a) ? a : s.values(a); for (var h = 0, i = a.length; h < i; h++) d = a[h], d > f && (f = d) } else b = u(b, c), s.each(a, function(a, c, d) { e = b(a, c, d), (e > g || e === -(1 / 0) && f === -(1 / 0)) && (f = a, g = e) }); return f }, s.min = function(a, b, c) { var d, e, f = 1 / 0,
                g = 1 / 0; if (null == b && null != a) { a = A(a) ? a : s.values(a); for (var h = 0, i = a.length; h < i; h++) d = a[h], d < f && (f = d) } else b = u(b, c), s.each(a, function(a, c, d) { e = b(a, c, d), (e < g || e === 1 / 0 && f === 1 / 0) && (f = a, g = e) }); return f }, s.shuffle = function(a) { for (var b, c = A(a) ? a : s.values(a), d = c.length, e = Array(d), f = 0; f < d; f++) b = s.random(0, f), b !== f && (e[f] = e[b]), e[b] = c[f]; return e }, s.sample = function(a, b, c) { return null == b || c ? (A(a) || (a = s.values(a)), a[s.random(a.length - 1)]) : s.shuffle(a).slice(0, Math.max(0, b)) }, s.sortBy = function(a, b, c) { return b = u(b, c), s.pluck(s.map(a, function(a, c, d) { return { value: a, index: c, criteria: b(a, c, d) } }).sort(function(a, b) { var c = a.criteria,
                    d = b.criteria; if (c !== d) { if (c > d || void 0 === c) return 1; if (c < d || void 0 === d) return -1 } return a.index - b.index }), "value") }; var B = function(a) { return function(b, c, d) { var e = {}; return c = u(c, d), s.each(b, function(d, f) { var g = c(d, f, b);
                    a(e, d, g) }), e } };
        s.groupBy = B(function(a, b, c) { s.has(a, c) ? a[c].push(b) : a[c] = [b] }), s.indexBy = B(function(a, b, c) { a[c] = b }), s.countBy = B(function(a, b, c) { s.has(a, c) ? a[c]++ : a[c] = 1 }), s.toArray = function(a) { return a ? s.isArray(a) ? k.call(a) : A(a) ? s.map(a, s.identity) : s.values(a) : [] }, s.size = function(a) { return null == a ? 0 : A(a) ? a.length : s.keys(a).length }, s.partition = function(a, b, c) { b = u(b, c); var d = [],
                e = []; return s.each(a, function(a, c, f) {
                (b(a, c, f) ? d : e).push(a) }), [d, e] }, s.first = s.head = s.take = function(a, b, c) { if (null != a) return null == b || c ? a[0] : s.initial(a, a.length - b) }, s.initial = function(a, b, c) { return k.call(a, 0, Math.max(0, a.length - (null == b || c ? 1 : b))) }, s.last = function(a, b, c) { if (null != a) return null == b || c ? a[a.length - 1] : s.rest(a, Math.max(0, a.length - b)) }, s.rest = s.tail = s.drop = function(a, b, c) { return k.call(a, null == b || c ? 1 : b) }, s.compact = function(a) { return s.filter(a, s.identity) }; var C = function(a, b, c, d) { for (var e = [], f = 0, g = d || 0, h = z(a); g < h; g++) { var i = a[g]; if (A(i) && (s.isArray(i) || s.isArguments(i))) { b || (i = C(i, b, c)); var j = 0,
                        k = i.length; for (e.length += k; j < k;) e[f++] = i[j++] } else c || (e[f++] = i) } return e };
        s.flatten = function(a, b) { return C(a, b, !1) }, s.without = function(a) { return s.difference(a, k.call(arguments, 1)) }, s.uniq = s.unique = function(a, b, c, d) { s.isBoolean(b) || (d = c, c = b, b = !1), null != c && (c = u(c, d)); for (var e = [], f = [], g = 0, h = z(a); g < h; g++) { var i = a[g],
                    j = c ? c(i, g, a) : i;
                b ? (g && f === j || e.push(i), f = j) : c ? s.contains(f, j) || (f.push(j), e.push(i)) : s.contains(e, i) || e.push(i) } return e }, s.union = function() { return s.uniq(C(arguments, !0, !0)) }, s.intersection = function(a) { for (var b = [], c = arguments.length, d = 0, e = z(a); d < e; d++) { var f = a[d]; if (!s.contains(b, f)) { for (var g = 1; g < c && s.contains(arguments[g], f); g++);
                    g === c && b.push(f) } } return b }, s.difference = function(a) { var b = C(arguments, !0, !0, 1); return s.filter(a, function(a) { return !s.contains(b, a) }) }, s.zip = function() { return s.unzip(arguments) }, s.unzip = function(a) { for (var b = a && s.max(a, z).length || 0, c = Array(b), d = 0; d < b; d++) c[d] = s.pluck(a, d); return c }, s.object = function(a, b) { for (var c = {}, d = 0, e = z(a); d < e; d++) b ? c[a[d]] = b[d] : c[a[d][0]] = a[d][1]; return c }, s.findIndex = b(1), s.findLastIndex = b(-1), s.sortedIndex = function(a, b, c, d) { c = u(c, d, 1); for (var e = c(b), f = 0, g = z(a); f < g;) { var h = Math.floor((f + g) / 2);
                c(a[h]) < e ? f = h + 1 : g = h } return f }, s.indexOf = c(1, s.findIndex, s.sortedIndex), s.lastIndexOf = c(-1, s.findLastIndex), s.range = function(a, b, c) { null == b && (b = a || 0, a = 0), c = c || 1; for (var d = Math.max(Math.ceil((b - a) / c), 0), e = Array(d), f = 0; f < d; f++, a += c) e[f] = a; return e }; var D = function(a, b, c, d, e) { if (!(d instanceof b)) return a.apply(c, e); var f = w(a.prototype),
                g = a.apply(f, e); return s.isObject(g) ? g : f };
        s.bind = function(a, b) { if (p && a.bind === p) return p.apply(a, k.call(arguments, 1)); if (!s.isFunction(a)) throw new TypeError("Bind must be called on a function"); var c = k.call(arguments, 2),
                d = function() { return D(a, d, b, this, c.concat(k.call(arguments))) }; return d }, s.partial = function(a) { var b = k.call(arguments, 1),
                c = function() { for (var d = 0, e = b.length, f = Array(e), g = 0; g < e; g++) f[g] = b[g] === s ? arguments[d++] : b[g]; for (; d < arguments.length;) f.push(arguments[d++]); return D(a, c, this, this, f) }; return c }, s.bindAll = function(a) { var b, c, d = arguments.length; if (d <= 1) throw new Error("bindAll must be passed function names"); for (b = 1; b < d; b++) c = arguments[b], a[c] = s.bind(a[c], a); return a }, s.memoize = function(a, b) { var c = function(d) { var e = c.cache,
                    f = "" + (b ? b.apply(this, arguments) : d); return s.has(e, f) || (e[f] = a.apply(this, arguments)), e[f] }; return c.cache = {}, c }, s.delay = function(a, b) { var c = k.call(arguments, 2); return setTimeout(function() { return a.apply(null, c) }, b) }, s.defer = s.partial(s.delay, s, 1), s.throttle = function(a, b, c) { var d, e, f, g = null,
                h = 0;
            c || (c = {}); var i = function() { h = c.leading === !1 ? 0 : s.now(), g = null, f = a.apply(d, e), g || (d = e = null) }; return function() { var j = s.now();
                h || c.leading !== !1 || (h = j); var k = b - (j - h); return d = this, e = arguments, k <= 0 || k > b ? (g && (clearTimeout(g), g = null), h = j, f = a.apply(d, e), g || (d = e = null)) : g || c.trailing === !1 || (g = setTimeout(i, k)), f } }, s.debounce = function(a, b, c) { var d, e, f, g, h, i = function() { var j = s.now() - g;
                j < b && j >= 0 ? d = setTimeout(i, b - j) : (d = null, c || (h = a.apply(f, e), d || (f = e = null))) }; return function() { f = this, e = arguments, g = s.now(); var j = c && !d; return d || (d = setTimeout(i, b)), j && (h = a.apply(f, e), f = e = null), h } }, s.wrap = function(a, b) { return s.partial(b, a) }, s.negate = function(a) { return function() { return !a.apply(this, arguments) } }, s.compose = function() { var a = arguments,
                b = a.length - 1; return function() { for (var c = b, d = a[b].apply(this, arguments); c--;) d = a[c].call(this, d); return d } }, s.after = function(a, b) { return function() { if (--a < 1) return b.apply(this, arguments) } }, s.before = function(a, b) { var c; return function() { return --a > 0 && (c = b.apply(this, arguments)), a <= 1 && (b = null), c } }, s.once = s.partial(s.before, 2); var E = !{ toString: null }.propertyIsEnumerable("toString"),
            F = ["valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"];
        s.keys = function(a) { if (!s.isObject(a)) return []; if (o) return o(a); var b = []; for (var c in a) s.has(a, c) && b.push(c); return E && d(a, b), b }, s.allKeys = function(a) { if (!s.isObject(a)) return []; var b = []; for (var c in a) b.push(c); return E && d(a, b), b }, s.values = function(a) { for (var b = s.keys(a), c = b.length, d = Array(c), e = 0; e < c; e++) d[e] = a[b[e]]; return d }, s.mapObject = function(a, b, c) { b = u(b, c); for (var d, e = s.keys(a), f = e.length, g = {}, h = 0; h < f; h++) d = e[h], g[d] = b(a[d], d, a); return g }, s.pairs = function(a) { for (var b = s.keys(a), c = b.length, d = Array(c), e = 0; e < c; e++) d[e] = [b[e], a[b[e]]]; return d }, s.invert = function(a) { for (var b = {}, c = s.keys(a), d = 0, e = c.length; d < e; d++) b[a[c[d]]] = c[d]; return b }, s.functions = s.methods = function(a) { var b = []; for (var c in a) s.isFunction(a[c]) && b.push(c); return b.sort() }, s.extend = v(s.allKeys), s.extendOwn = s.assign = v(s.keys), s.findKey = function(a, b, c) { b = u(b, c); for (var d, e = s.keys(a), f = 0, g = e.length; f < g; f++)
                if (d = e[f], b(a[d], d, a)) return d }, s.pick = function(a, b, c) { var d, e, f = {},
                g = a; if (null == g) return f;
            s.isFunction(b) ? (e = s.allKeys(g), d = t(b, c)) : (e = C(arguments, !1, !1, 1), d = function(a, b, c) { return b in c }, g = Object(g)); for (var h = 0, i = e.length; h < i; h++) { var j = e[h],
                    k = g[j];
                d(k, j, g) && (f[j] = k) } return f }, s.omit = function(a, b, c) { if (s.isFunction(b)) b = s.negate(b);
            else { var d = s.map(C(arguments, !1, !1, 1), String);
                b = function(a, b) { return !s.contains(d, b) } } return s.pick(a, b, c) }, s.defaults = v(s.allKeys, !0), s.create = function(a, b) { var c = w(a); return b && s.extendOwn(c, b), c }, s.clone = function(a) { return s.isObject(a) ? s.isArray(a) ? a.slice() : s.extend({}, a) : a }, s.tap = function(a, b) { return b(a), a }, s.isMatch = function(a, b) { var c = s.keys(b),
                d = c.length; if (null == a) return !d; for (var e = Object(a), f = 0; f < d; f++) { var g = c[f]; if (b[g] !== e[g] || !(g in e)) return !1 } return !0 }; var G = function(a, b, c, d) { if (a === b) return 0 !== a || 1 / a === 1 / b; if (null == a || null == b) return a === b;
            a instanceof s && (a = a._wrapped), b instanceof s && (b = b._wrapped); var e = l.call(a); if (e !== l.call(b)) return !1; switch (e) {
                case "[object RegExp]":
                case "[object String]":
                    return "" + a == "" + b;
                case "[object Number]":
                    return +a !== +a ? +b !== +b : 0 === +a ? 1 / +a === 1 / b : +a === +b;
                case "[object Date]":
                case "[object Boolean]":
                    return +a === +b } var f = "[object Array]" === e; if (!f) { if ("object" != typeof a || "object" != typeof b) return !1; var g = a.constructor,
                    h = b.constructor; if (g !== h && !(s.isFunction(g) && g instanceof g && s.isFunction(h) && h instanceof h) && "constructor" in a && "constructor" in b) return !1 } c = c || [], d = d || []; for (var i = c.length; i--;)
                if (c[i] === a) return d[i] === b; if (c.push(a), d.push(b), f) { if (i = a.length, i !== b.length) return !1; for (; i--;)
                    if (!G(a[i], b[i], c, d)) return !1 } else { var j, k = s.keys(a); if (i = k.length, s.keys(b).length !== i) return !1; for (; i--;)
                    if (j = k[i], !s.has(b, j) || !G(a[j], b[j], c, d)) return !1 } return c.pop(), d.pop(), !0 };
        s.isEqual = function(a, b) { return G(a, b) }, s.isEmpty = function(a) { return null == a || (A(a) && (s.isArray(a) || s.isString(a) || s.isArguments(a)) ? 0 === a.length : 0 === s.keys(a).length) }, s.isElement = function(a) { return !(!a || 1 !== a.nodeType) }, s.isArray = n || function(a) { return "[object Array]" === l.call(a) }, s.isObject = function(a) { var b = typeof a; return "function" === b || "object" === b && !!a }, s.each(["Arguments", "Function", "String", "Number", "Date", "RegExp", "Error"], function(a) { s["is" + a] = function(b) { return l.call(b) === "[object " + a + "]" } }), s.isArguments(arguments) || (s.isArguments = function(a) { return s.has(a, "callee") }), "function" != typeof /./ && "object" != typeof Int8Array && (s.isFunction = function(a) { return "function" == typeof a || !1 }), s.isFinite = function(a) { return isFinite(a) && !isNaN(parseFloat(a)) }, s.isNaN = function(a) { return s.isNumber(a) && a !== +a }, s.isBoolean = function(a) { return a === !0 || a === !1 || "[object Boolean]" === l.call(a) }, s.isNull = function(a) { return null === a }, s.isUndefined = function(a) { return void 0 === a }, s.has = function(a, b) { return null != a && m.call(a, b) }, s.noConflict = function() { return e._ = f, this }, s.identity = function(a) { return a }, s.constant = function(a) { return function() { return a } }, s.noop = function() {}, s.property = x, s.propertyOf = function(a) { return null == a ? function() {} : function(b) { return a[b] } }, s.matcher = s.matches = function(a) { return a = s.extendOwn({}, a),
                function(b) { return s.isMatch(b, a) } }, s.times = function(a, b, c) { var d = Array(Math.max(0, a));
            b = t(b, c, 1); for (var e = 0; e < a; e++) d[e] = b(e); return d }, s.random = function(a, b) { return null == b && (b = a, a = 0), a + Math.floor(Math.random() * (b - a + 1)) }, s.now = Date.now || function() { return (new Date).getTime() }; var H = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;", "`": "&#x60;" },
            I = s.invert(H),
            J = function(a) { var b = function(b) { return a[b] },
                    c = "(?:" + s.keys(a).join("|") + ")",
                    d = RegExp(c),
                    e = RegExp(c, "g"); return function(a) { return a = null == a ? "" : "" + a, d.test(a) ? a.replace(e, b) : a } };
        s.escape = J(H), s.unescape = J(I), s.result = function(a, b, c) { var d = null == a ? void 0 : a[b]; return void 0 === d && (d = c), s.isFunction(d) ? d.call(a) : d }; var K = 0;
        s.uniqueId = function(a) { var b = ++K + ""; return a ? a + b : b }, s.templateSettings = { evaluate: /<%([\s\S]+?)%>/g, interpolate: /<%=([\s\S]+?)%>/g, escape: /<%-([\s\S]+?)%>/g }; var L = /(.)^/,
            M = { "'": "'", "\\": "\\", "\r": "r", "\n": "n", "\u2028": "u2028", "\u2029": "u2029" },
            N = /\\|'|\r|\n|\u2028|\u2029/g,
            O = function(a) { return "\\" + M[a] };
        s.template = function(a, b, c) {!b && c && (b = c), b = s.defaults({}, b, s.templateSettings); var d = RegExp([(b.escape || L).source, (b.interpolate || L).source, (b.evaluate || L).source].join("|") + "|$", "g"),
                e = 0,
                f = "__p+='";
            a.replace(d, function(b, c, d, g, h) { return f += a.slice(e, h).replace(N, O), e = h + b.length, c ? f += "'+\n((__t=(" + c + "))==null?'':_.escape(__t))+\n'" : d ? f += "'+\n((__t=(" + d + "))==null?'':__t)+\n'" : g && (f += "';\n" + g + "\n__p+='"), b }), f += "';\n", b.variable || (f = "with(obj||{}){\n" + f + "}\n"), f = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + f + "return __p;\n"; try { var g = new Function(b.variable || "obj", "_", f) } catch (h) { throw h.source = f, h } var i = function(a) { return g.call(this, a, s) },
                j = b.variable || "obj"; return i.source = "function(" + j + "){\n" + f + "}", i }, s.chain = function(a) { var b = s(a); return b._chain = !0, b }; var P = function(a, b) { return a._chain ? s(b).chain() : b };
        s.mixin = function(a) { s.each(s.functions(a), function(b) { var c = s[b] = a[b];
                s.prototype[b] = function() { var a = [this._wrapped]; return j.apply(a, arguments), P(this, c.apply(s, a)) } }) }, s.mixin(s), s.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(a) { var b = g[a];
            s.prototype[a] = function() { var c = this._wrapped; return b.apply(c, arguments), "shift" !== a && "splice" !== a || 0 !== c.length || delete c[0], P(this, c) } }), s.each(["concat", "join", "slice"], function(a) { var b = g[a];
            s.prototype[a] = function() { return P(this, b.apply(this._wrapped, arguments)) } }), s.prototype.value = function() { return this._wrapped }, s.prototype.valueOf = s.prototype.toJSON = s.prototype.value, s.prototype.toString = function() { return "" + this._wrapped }, "function" == typeof define && define.amd && define("underscore", [], function() { return s }) }.call(this),
    function(a, b, c, d) {
        function e(b, c) { this.element = b, this.settings = a.extend({}, g, c), this._defaults = g, this._name = f, this.init(b) } var f = "jTinder",
            g = { onDislike: null, onLike: null, animationRevertSpeed: 200, animationSpeed: 400, threshold: 1, likeSelector: ".like", dislikeSelector: ".dislike" },
            h = null,
            i = null,
            j = null,
            k = 0,
            l = 0,
            m = !1,
            n = 0,
            o = 0,
            p = 0,
            q = 0,
            r = 0,
            s = 0,
            t = 0;
        e.prototype = { init: function(b) { h = a(">ul", b), i = a(">ul>li", b), r = h.width(), s = i.length, t = i.length - 1, j = this, a(b).bind("touchstart mousedown", this.handler), a(b).bind("touchmove mousemove", this.handler), a(b).bind("touchend mouseup", this.handler) }, showPane: function(a) { i.eq(t).hide(), t = a }, next: function() { return this.showPane(t - 1) }, dislike: function() { i.eq(t).animate({ transform: "translate(-" + r + "px," + r * -1.5 + "px) rotate(-60deg)" }, j.settings.animationSpeed, function() { j.settings.onDislike && j.settings.onDislike(i.eq(t)), j.next() }) }, like: function() { i.eq(t).animate({ transform: "translate(" + r + "px," + r * -1.5 + "px) rotate(60deg)" }, j.settings.animationSpeed, function() { j.settings.onLike && j.settings.onLike(i.eq(t)), j.next() }) }, handler: function(a) { switch (a.preventDefault(), a.type) {
                    case "touchstart":
                        m === !1 && (m = !0, k = a.originalEvent.touches[0].pageX, l = a.originalEvent.touches[0].pageY);
                    case "mousedown":
                        m === !1 && (m = !0, k = a.pageX, l = a.pageY);
                    case "mousemove":
                    case "touchmove":
                        if (m === !0) { var b = "undefined" == typeof a.pageX ? a.originalEvent.touches[0].pageX : a.pageX,
                                c = "undefined" == typeof a.pageY ? a.originalEvent.touches[0].pageY : a.pageY,
                                d = parseInt(b) - parseInt(k),
                                e = parseInt(c) - parseInt(l),
                                f = 100 / r * d / s;
                            n = d + p, o = e + q, i.eq(t).css("transform", "translate(" + n + "px," + o + "px) rotate(" + f / 2 + "deg)"); var g = Math.abs(d) / j.settings.threshold / 100 + .2;
                            g > 1 && (g = 1), n >= 0 ? (i.eq(t).find(j.settings.likeSelector).css("opacity", g), i.eq(t).find(j.settings.dislikeSelector).css("opacity", 0)) : n < 0 && (i.eq(t).find(j.settings.dislikeSelector).css("opacity", g), i.eq(t).find(j.settings.likeSelector).css("opacity", 0)) } break;
                    case "mouseup":
                    case "touchend":
                        m = !1; var b = "undefined" == typeof a.pageX ? a.originalEvent.changedTouches[0].pageX : a.pageX,
                            c = "undefined" == typeof a.pageY ? a.originalEvent.changedTouches[0].pageY : a.pageY,
                            d = parseInt(b) - parseInt(k),
                            e = parseInt(c) - parseInt(l);
                        n = d + p, o = e + q; var g = Math.abs(Math.abs(d) / j.settings.threshold / 100 + .2);
                        g >= 1 ? n > 0 ? i.eq(t).animate({ transform: "translate(" + r + "px," + (o + r) + "px) rotate(60deg)" }, j.settings.animationSpeed, function() { j.settings.onLike && j.settings.onLike(i.eq(t)), j.next() }) : i.eq(t).animate({ transform: "translate(-" + r + "px," + (o + r) + "px) rotate(-60deg)" }, j.settings.animationSpeed, function() { j.settings.onDislike && j.settings.onDislike(i.eq(t)), j.next() }) : (p = 0, q = 0, i.eq(t).animate({ transform: "translate(0px,0px) rotate(0deg)" }, j.settings.animationRevertSpeed), i.eq(t).find(j.settings.likeSelector).animate({ opacity: 0 }, j.settings.animationRevertSpeed), i.eq(t).find(j.settings.dislikeSelector).animate({ opacity: 0 }, j.settings.animationRevertSpeed)) } } }, a.fn[f] = function(b) { return this.each(function() { a.data(this, "plugin_" + f) ? a.isFunction(e.prototype[b]) && a.data(this, "plugin_" + f)[b]() : a.data(this, "plugin_" + f, new e(this, b)) }), this } }(jQuery, window, document), ! function(a, b) { "object" == typeof module && "object" == typeof module.exports ? module.exports = a.document ? b(a, !0) : function(a) { if (!a.document) throw new Error("jQuery requires a window with a document"); return b(a) } : b(a) }("undefined" != typeof window ? window : this, function(a, b) {
        function c(a) { var b = a.length,
                c = ea.type(a); return "function" !== c && !ea.isWindow(a) && (!(1 !== a.nodeType || !b) || ("array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a)) }

        function d(a, b, c) { if (ea.isFunction(b)) return ea.grep(a, function(a, d) { return !!b.call(a, d, a) !== c }); if (b.nodeType) return ea.grep(a, function(a) { return a === b !== c }); if ("string" == typeof b) { if (ma.test(b)) return ea.filter(b, a, c);
                b = ea.filter(b, a) } return ea.grep(a, function(a) { return ea.inArray(a, b) >= 0 !== c }) }

        function e(a, b) { do a = a[b]; while (a && 1 !== a.nodeType); return a }

        function f(a) { var b = ua[a] = {}; return ea.each(a.match(ta) || [], function(a, c) { b[c] = !0 }), b }

        function g() { oa.addEventListener ? (oa.removeEventListener("DOMContentLoaded", h, !1), a.removeEventListener("load", h, !1)) : (oa.detachEvent("onreadystatechange", h), a.detachEvent("onload", h)) }

        function h() {
            (oa.addEventListener || "load" === event.type || "complete" === oa.readyState) && (g(), ea.ready()) }

        function i(a, b, c) { if (void 0 === c && 1 === a.nodeType) { var d = "data-" + b.replace(za, "-$1").toLowerCase(); if (c = a.getAttribute(d), "string" == typeof c) { try { c = "true" === c || "false" !== c && ("null" === c ? null : +c + "" === c ? +c : ya.test(c) ? ea.parseJSON(c) : c) } catch (e) {} ea.data(a, b, c) } else c = void 0 } return c }

        function j(a) { var b; for (b in a)
                if (("data" !== b || !ea.isEmptyObject(a[b])) && "toJSON" !== b) return !1; return !0 }

        function k(a, b, c, d) { if (ea.acceptData(a)) { var e, f, g = ea.expando,
                    h = a.nodeType,
                    i = h ? ea.cache : a,
                    j = h ? a[g] : a[g] && g; if (j && i[j] && (d || i[j].data) || void 0 !== c || "string" != typeof b) return j || (j = h ? a[g] = W.pop() || ea.guid++ : g), i[j] || (i[j] = h ? {} : { toJSON: ea.noop }), ("object" == typeof b || "function" == typeof b) && (d ? i[j] = ea.extend(i[j], b) : i[j].data = ea.extend(i[j].data, b)), f = i[j], d || (f.data || (f.data = {}), f = f.data), void 0 !== c && (f[ea.camelCase(b)] = c), "string" == typeof b ? (e = f[b], null == e && (e = f[ea.camelCase(b)])) : e = f, e } }

        function l(a, b, c) { if (ea.acceptData(a)) { var d, e, f = a.nodeType,
                    g = f ? ea.cache : a,
                    h = f ? a[ea.expando] : ea.expando; if (g[h]) { if (b && (d = c ? g[h] : g[h].data)) { ea.isArray(b) ? b = b.concat(ea.map(b, ea.camelCase)) : b in d ? b = [b] : (b = ea.camelCase(b), b = b in d ? [b] : b.split(" ")), e = b.length; for (; e--;) delete d[b[e]]; if (c ? !j(d) : !ea.isEmptyObject(d)) return }(c || (delete g[h].data, j(g[h]))) && (f ? ea.cleanData([a], !0) : ca.deleteExpando || g != g.window ? delete g[h] : g[h] = null) } } }

        function m() { return !0 }

        function n() { return !1 }

        function o() { try { return oa.activeElement } catch (a) {} }

        function p(a) { var b = Ka.split("|"),
                c = a.createDocumentFragment(); if (c.createElement)
                for (; b.length;) c.createElement(b.pop()); return c }

        function q(a, b) { var c, d, e = 0,
                f = typeof a.getElementsByTagName !== xa ? a.getElementsByTagName(b || "*") : typeof a.querySelectorAll !== xa ? a.querySelectorAll(b || "*") : void 0; if (!f)
                for (f = [], c = a.childNodes || a; null != (d = c[e]); e++) !b || ea.nodeName(d, b) ? f.push(d) : ea.merge(f, q(d, b)); return void 0 === b || b && ea.nodeName(a, b) ? ea.merge([a], f) : f }

        function r(a) { Ea.test(a.type) && (a.defaultChecked = a.checked) }

        function s(a, b) { return ea.nodeName(a, "table") && ea.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a }

        function t(a) { return a.type = (null !== ea.find.attr(a, "type")) + "/" + a.type, a }

        function u(a) { var b = Va.exec(a.type); return b ? a.type = b[1] : a.removeAttribute("type"), a }

        function v(a, b) { for (var c, d = 0; null != (c = a[d]); d++) ea._data(c, "globalEval", !b || ea._data(b[d], "globalEval")) }

        function w(a, b) { if (1 === b.nodeType && ea.hasData(a)) { var c, d, e, f = ea._data(a),
                    g = ea._data(b, f),
                    h = f.events; if (h) { delete g.handle, g.events = {}; for (c in h)
                        for (d = 0, e = h[c].length; e > d; d++) ea.event.add(b, c, h[c][d]) } g.data && (g.data = ea.extend({}, g.data)) } }

        function x(a, b) { var c, d, e; if (1 === b.nodeType) { if (c = b.nodeName.toLowerCase(), !ca.noCloneEvent && b[ea.expando]) { e = ea._data(b); for (d in e.events) ea.removeEvent(b, d, e.handle);
                    b.removeAttribute(ea.expando) } "script" === c && b.text !== a.text ? (t(b).text = a.text, u(b)) : "object" === c ? (b.parentNode && (b.outerHTML = a.outerHTML), ca.html5Clone && a.innerHTML && !ea.trim(b.innerHTML) && (b.innerHTML = a.innerHTML)) : "input" === c && Ea.test(a.type) ? (b.defaultChecked = b.checked = a.checked, b.value !== a.value && (b.value = a.value)) : "option" === c ? b.defaultSelected = b.selected = a.defaultSelected : ("input" === c || "textarea" === c) && (b.defaultValue = a.defaultValue) } }

        function y(b, c) { var d, e = ea(c.createElement(b)).appendTo(c.body),
                f = a.getDefaultComputedStyle && (d = a.getDefaultComputedStyle(e[0])) ? d.display : ea.css(e[0], "display"); return e.detach(), f }

        function z(a) { var b = oa,
                c = _a[a]; return c || (c = y(a, b), "none" !== c && c || ($a = ($a || ea("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement), b = ($a[0].contentWindow || $a[0].contentDocument).document, b.write(), b.close(), c = y(a, b), $a.detach()), _a[a] = c), c }

        function A(a, b) { return { get: function() { var c = a(); if (null != c) return c ? void delete this.get : (this.get = b).apply(this, arguments) } } }

        function B(a, b) { if (b in a) return b; for (var c = b.charAt(0).toUpperCase() + b.slice(1), d = b, e = mb.length; e--;)
                if (b = mb[e] + c, b in a) return b; return d }

        function C(a, b) { for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++) d = a[g], d.style && (f[g] = ea._data(d, "olddisplay"), c = d.style.display, b ? (f[g] || "none" !== c || (d.style.display = ""), "" === d.style.display && Ca(d) && (f[g] = ea._data(d, "olddisplay", z(d.nodeName)))) : (e = Ca(d), (c && "none" !== c || !e) && ea._data(d, "olddisplay", e ? c : ea.css(d, "display")))); for (g = 0; h > g; g++) d = a[g], d.style && (b && "none" !== d.style.display && "" !== d.style.display || (d.style.display = b ? f[g] || "" : "none")); return a }

        function D(a, b, c) { var d = ib.exec(b); return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b }

        function E(a, b, c, d, e) {
            for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, g = 0; 4 > f; f += 2) "margin" === c && (g += ea.css(a, c + Ba[f], !0, e)), d ? ("content" === c && (g -= ea.css(a, "padding" + Ba[f], !0, e)), "margin" !== c && (g -= ea.css(a, "border" + Ba[f] + "Width", !0, e))) : (g += ea.css(a, "padding" + Ba[f], !0, e), "padding" !== c && (g += ea.css(a, "border" + Ba[f] + "Width", !0, e)));
            return g
        }

        function F(a, b, c) { var d = !0,
                e = "width" === b ? a.offsetWidth : a.offsetHeight,
                f = ab(a),
                g = ca.boxSizing && "border-box" === ea.css(a, "boxSizing", !1, f); if (0 >= e || null == e) { if (e = bb(a, b, f), (0 > e || null == e) && (e = a.style[b]), db.test(e)) return e;
                d = g && (ca.boxSizingReliable() || e === a.style[b]), e = parseFloat(e) || 0 } return e + E(a, b, c || (g ? "border" : "content"), d, f) + "px" }

        function G(a, b, c, d, e) { return new G.prototype.init(a, b, c, d, e) }

        function H() { return setTimeout(function() { nb = void 0 }), nb = ea.now() }

        function I(a, b) { var c, d = { height: a },
                e = 0; for (b = b ? 1 : 0; 4 > e; e += 2 - b) c = Ba[e], d["margin" + c] = d["padding" + c] = a; return b && (d.opacity = d.width = a), d }

        function J(a, b, c) { for (var d, e = (tb[b] || []).concat(tb["*"]), f = 0, g = e.length; g > f; f++)
                if (d = e[f].call(c, b, a)) return d }

        function K(a, b, c) { var d, e, f, g, h, i, j, k, l = this,
                m = {},
                n = a.style,
                o = a.nodeType && Ca(a),
                p = ea._data(a, "fxshow");
            c.queue || (h = ea._queueHooks(a, "fx"), null == h.unqueued && (h.unqueued = 0, i = h.empty.fire, h.empty.fire = function() { h.unqueued || i() }), h.unqueued++, l.always(function() { l.always(function() { h.unqueued--, ea.queue(a, "fx").length || h.empty.fire() }) })), 1 === a.nodeType && ("height" in b || "width" in b) && (c.overflow = [n.overflow, n.overflowX, n.overflowY], j = ea.css(a, "display"), k = "none" === j ? ea._data(a, "olddisplay") || z(a.nodeName) : j, "inline" === k && "none" === ea.css(a, "float") && (ca.inlineBlockNeedsLayout && "inline" !== z(a.nodeName) ? n.zoom = 1 : n.display = "inline-block")), c.overflow && (n.overflow = "hidden", ca.shrinkWrapBlocks() || l.always(function() { n.overflow = c.overflow[0], n.overflowX = c.overflow[1], n.overflowY = c.overflow[2] })); for (d in b)
                if (e = b[d], pb.exec(e)) { if (delete b[d], f = f || "toggle" === e, e === (o ? "hide" : "show")) { if ("show" !== e || !p || void 0 === p[d]) continue;
                        o = !0 } m[d] = p && p[d] || ea.style(a, d) } else j = void 0; if (ea.isEmptyObject(m)) "inline" === ("none" === j ? z(a.nodeName) : j) && (n.display = j);
            else { p ? "hidden" in p && (o = p.hidden) : p = ea._data(a, "fxshow", {}), f && (p.hidden = !o), o ? ea(a).show() : l.done(function() { ea(a).hide() }), l.done(function() { var b;
                    ea._removeData(a, "fxshow"); for (b in m) ea.style(a, b, m[b]) }); for (d in m) g = J(o ? p[d] : 0, d, l), d in p || (p[d] = g.start, o && (g.end = g.start, g.start = "width" === d || "height" === d ? 1 : 0)) } }

        function L(a, b) { var c, d, e, f, g; for (c in a)
                if (d = ea.camelCase(c), e = b[d], f = a[c], ea.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = ea.cssHooks[d], g && "expand" in g) { f = g.expand(f), delete a[d]; for (c in f) c in a || (a[c] = f[c], b[c] = e) } else b[d] = e }

        function M(a, b, c) { var d, e, f = 0,
                g = sb.length,
                h = ea.Deferred().always(function() { delete i.elem }),
                i = function() { if (e) return !1; for (var b = nb || H(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; i > g; g++) j.tweens[g].run(f); return h.notifyWith(a, [j, f, c]), 1 > f && i ? c : (h.resolveWith(a, [j]), !1) },
                j = h.promise({ elem: a, props: ea.extend({}, b), opts: ea.extend(!0, { specialEasing: {} }, c), originalProperties: b, originalOptions: c, startTime: nb || H(), duration: c.duration, tweens: [], createTween: function(b, c) { var d = ea.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing); return j.tweens.push(d), d }, stop: function(b) { var c = 0,
                            d = b ? j.tweens.length : 0; if (e) return this; for (e = !0; d > c; c++) j.tweens[c].run(1); return b ? h.resolveWith(a, [j, b]) : h.rejectWith(a, [j, b]), this } }),
                k = j.props; for (L(k, j.opts.specialEasing); g > f; f++)
                if (d = sb[f].call(j, a, k, j.opts)) return d; return ea.map(k, J, j), ea.isFunction(j.opts.start) && j.opts.start.call(a, j), ea.fx.timer(ea.extend(i, { elem: a, anim: j, queue: j.opts.queue })), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always) }

        function N(a) { return function(b, c) { "string" != typeof b && (c = b, b = "*"); var d, e = 0,
                    f = b.toLowerCase().match(ta) || []; if (ea.isFunction(c))
                    for (; d = f[e++];) "+" === d.charAt(0) ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c) } }

        function O(a, b, c, d) {
            function e(h) { var i; return f[h] = !0, ea.each(a[h] || [], function(a, h) { var j = h(b, c, d); return "string" != typeof j || g || f[j] ? g ? !(i = j) : void 0 : (b.dataTypes.unshift(j), e(j), !1) }), i } var f = {},
                g = a === Rb; return e(b.dataTypes[0]) || !f["*"] && e("*") }

        function P(a, b) { var c, d, e = ea.ajaxSettings.flatOptions || {}; for (d in b) void 0 !== b[d] && ((e[d] ? a : c || (c = {}))[d] = b[d]); return c && ea.extend(!0, a, c), a }

        function Q(a, b, c) { for (var d, e, f, g, h = a.contents, i = a.dataTypes;
                "*" === i[0];) i.shift(), void 0 === e && (e = a.mimeType || b.getResponseHeader("Content-Type")); if (e)
                for (g in h)
                    if (h[g] && h[g].test(e)) { i.unshift(g); break }
            if (i[0] in c) f = i[0];
            else { for (g in c) { if (!i[0] || a.converters[g + " " + i[0]]) { f = g; break } d || (d = g) } f = f || d } return f ? (f !== i[0] && i.unshift(f), c[f]) : void 0 }

        function R(a, b, c, d) { var e, f, g, h, i, j = {},
                k = a.dataTypes.slice(); if (k[1])
                for (g in a.converters) j[g.toLowerCase()] = a.converters[g]; for (f = k.shift(); f;)
                if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift())
                    if ("*" === f) f = i;
                    else if ("*" !== i && i !== f) { if (g = j[i + " " + f] || j["* " + f], !g)
                    for (e in j)
                        if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) { g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1])); break }
                if (g !== !0)
                    if (g && a["throws"]) b = g(b);
                    else try { b = g(b) } catch (l) { return { state: "parsererror", error: g ? l : "No conversion from " + i + " to " + f } } } return { state: "success", data: b } }

        function S(a, b, c, d) { var e; if (ea.isArray(b)) ea.each(b, function(b, e) { c || Vb.test(a) ? d(a, e) : S(a + "[" + ("object" == typeof e ? b : "") + "]", e, c, d) });
            else if (c || "object" !== ea.type(b)) d(a, b);
            else
                for (e in b) S(a + "[" + e + "]", b[e], c, d) }

        function T() { try { return new a.XMLHttpRequest } catch (b) {} }

        function U() { try { return new a.ActiveXObject("Microsoft.XMLHTTP") } catch (b) {} }

        function V(a) { return ea.isWindow(a) ? a : 9 === a.nodeType && (a.defaultView || a.parentWindow) }
        var W = [],
            X = W.slice,
            Y = W.concat,
            Z = W.push,
            $ = W.indexOf,
            _ = {},
            aa = _.toString,
            ba = _.hasOwnProperty,
            ca = {},
            da = "1.11.1",
            ea = function(a, b) { return new ea.fn.init(a, b) },
            fa = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
            ga = /^-ms-/,
            ha = /-([\da-z])/gi,
            ia = function(a, b) { return b.toUpperCase() };
        ea.fn = ea.prototype = { jquery: da, constructor: ea, selector: "", length: 0, toArray: function() { return X.call(this) }, get: function(a) { return null != a ? 0 > a ? this[a + this.length] : this[a] : X.call(this) }, pushStack: function(a) { var b = ea.merge(this.constructor(), a); return b.prevObject = this, b.context = this.context, b }, each: function(a, b) { return ea.each(this, a, b) }, map: function(a) { return this.pushStack(ea.map(this, function(b, c) { return a.call(b, c, b) })) }, slice: function() { return this.pushStack(X.apply(this, arguments)) }, first: function() { return this.eq(0) }, last: function() { return this.eq(-1) }, eq: function(a) { var b = this.length,
                    c = +a + (0 > a ? b : 0); return this.pushStack(c >= 0 && b > c ? [this[c]] : []) }, end: function() { return this.prevObject || this.constructor(null) }, push: Z, sort: W.sort, splice: W.splice }, ea.extend = ea.fn.extend = function() { var a, b, c, d, e, f, g = arguments[0] || {},
                h = 1,
                i = arguments.length,
                j = !1; for ("boolean" == typeof g && (j = g, g = arguments[h] || {}, h++), "object" == typeof g || ea.isFunction(g) || (g = {}), h === i && (g = this, h--); i > h; h++)
                if (null != (e = arguments[h]))
                    for (d in e) a = g[d], c = e[d], g !== c && (j && c && (ea.isPlainObject(c) || (b = ea.isArray(c))) ? (b ? (b = !1, f = a && ea.isArray(a) ? a : []) : f = a && ea.isPlainObject(a) ? a : {}, g[d] = ea.extend(j, f, c)) : void 0 !== c && (g[d] = c)); return g }, ea.extend({ expando: "jQuery" + (da + Math.random()).replace(/\D/g, ""), isReady: !0, error: function(a) { throw new Error(a) }, noop: function() {}, isFunction: function(a) { return "function" === ea.type(a) }, isArray: Array.isArray || function(a) { return "array" === ea.type(a) }, isWindow: function(a) { return null != a && a == a.window }, isNumeric: function(a) { return !ea.isArray(a) && a - parseFloat(a) >= 0 }, isEmptyObject: function(a) { var b; for (b in a) return !1; return !0 }, isPlainObject: function(a) { var b; if (!a || "object" !== ea.type(a) || a.nodeType || ea.isWindow(a)) return !1; try { if (a.constructor && !ba.call(a, "constructor") && !ba.call(a.constructor.prototype, "isPrototypeOf")) return !1 } catch (c) { return !1 } if (ca.ownLast)
                    for (b in a) return ba.call(a, b); for (b in a); return void 0 === b || ba.call(a, b) }, type: function(a) { return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? _[aa.call(a)] || "object" : typeof a }, globalEval: function(b) { b && ea.trim(b) && (a.execScript || function(b) { a.eval.call(a, b) })(b) }, camelCase: function(a) { return a.replace(ga, "ms-").replace(ha, ia) }, nodeName: function(a, b) { return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase() }, each: function(a, b, d) { var e, f = 0,
                    g = a.length,
                    h = c(a); if (d) { if (h)
                        for (; g > f && (e = b.apply(a[f], d), e !== !1); f++);
                    else
                        for (f in a)
                            if (e = b.apply(a[f], d), e === !1) break } else if (h)
                    for (; g > f && (e = b.call(a[f], f, a[f]), e !== !1); f++);
                else
                    for (f in a)
                        if (e = b.call(a[f], f, a[f]), e === !1) break; return a }, trim: function(a) { return null == a ? "" : (a + "").replace(fa, "") }, makeArray: function(a, b) { var d = b || []; return null != a && (c(Object(a)) ? ea.merge(d, "string" == typeof a ? [a] : a) : Z.call(d, a)), d }, inArray: function(a, b, c) { var d; if (b) { if ($) return $.call(b, a, c); for (d = b.length, c = c ? 0 > c ? Math.max(0, d + c) : c : 0; d > c; c++)
                        if (c in b && b[c] === a) return c } return -1 }, merge: function(a, b) { for (var c = +b.length, d = 0, e = a.length; c > d;) a[e++] = b[d++]; if (c !== c)
                    for (; void 0 !== b[d];) a[e++] = b[d++]; return a.length = e, a }, grep: function(a, b, c) { for (var d, e = [], f = 0, g = a.length, h = !c; g > f; f++) d = !b(a[f], f), d !== h && e.push(a[f]); return e }, map: function(a, b, d) { var e, f = 0,
                    g = a.length,
                    h = c(a),
                    i = []; if (h)
                    for (; g > f; f++) e = b(a[f], f, d), null != e && i.push(e);
                else
                    for (f in a) e = b(a[f], f, d), null != e && i.push(e); return Y.apply([], i) }, guid: 1, proxy: function(a, b) { var c, d, e; return "string" == typeof b && (e = a[b], b = a, a = e), ea.isFunction(a) ? (c = X.call(arguments, 2), d = function() { return a.apply(b || this, c.concat(X.call(arguments))) }, d.guid = a.guid = a.guid || ea.guid++, d) : void 0 }, now: function() { return +new Date }, support: ca }), ea.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(a, b) { _["[object " + b + "]"] = b.toLowerCase() });
        var ja = function(a) {
            function b(a, b, c, d) { var e, f, g, h, i, j, l, n, o, p; if ((b ? b.ownerDocument || b : O) !== G && F(b), b = b || G, c = c || [], !a || "string" != typeof a) return c; if (1 !== (h = b.nodeType) && 9 !== h) return []; if (I && !d) { if (e = sa.exec(a))
                        if (g = e[1]) { if (9 === h) { if (f = b.getElementById(g), !f || !f.parentNode) return c; if (f.id === g) return c.push(f), c } else if (b.ownerDocument && (f = b.ownerDocument.getElementById(g)) && M(b, f) && f.id === g) return c.push(f), c } else { if (e[2]) return _.apply(c, b.getElementsByTagName(a)), c; if ((g = e[3]) && v.getElementsByClassName && b.getElementsByClassName) return _.apply(c, b.getElementsByClassName(g)), c }
                    if (v.qsa && (!J || !J.test(a))) { if (n = l = N, o = b, p = 9 === h && a, 1 === h && "object" !== b.nodeName.toLowerCase()) { for (j = z(a), (l = b.getAttribute("id")) ? n = l.replace(ua, "\\$&") : b.setAttribute("id", n), n = "[id='" + n + "'] ", i = j.length; i--;) j[i] = n + m(j[i]);
                            o = ta.test(a) && k(b.parentNode) || b, p = j.join(",") } if (p) try { return _.apply(c, o.querySelectorAll(p)), c } catch (q) {} finally { l || b.removeAttribute("id") } } } return B(a.replace(ia, "$1"), b, c, d) }

            function c() {
                function a(c, d) { return b.push(c + " ") > w.cacheLength && delete a[b.shift()], a[c + " "] = d } var b = []; return a }

            function d(a) { return a[N] = !0, a }

            function e(a) { var b = G.createElement("div"); try { return !!a(b) } catch (c) { return !1 } finally { b.parentNode && b.parentNode.removeChild(b), b = null } }

            function f(a, b) { for (var c = a.split("|"), d = a.length; d--;) w.attrHandle[c[d]] = b }

            function g(a, b) { var c = b && a,
                    d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || W) - (~a.sourceIndex || W); if (d) return d; if (c)
                    for (; c = c.nextSibling;)
                        if (c === b) return -1; return a ? 1 : -1 }

            function h(a) { return function(b) { var c = b.nodeName.toLowerCase(); return "input" === c && b.type === a } }

            function i(a) { return function(b) { var c = b.nodeName.toLowerCase(); return ("input" === c || "button" === c) && b.type === a } }

            function j(a) { return d(function(b) { return b = +b, d(function(c, d) { for (var e, f = a([], c.length, b), g = f.length; g--;) c[e = f[g]] && (c[e] = !(d[e] = c[e])) }) }) }

            function k(a) { return a && typeof a.getElementsByTagName !== V && a }

            function l() {}

            function m(a) { for (var b = 0, c = a.length, d = ""; c > b; b++) d += a[b].value; return d }

            function n(a, b, c) { var d = b.dir,
                    e = c && "parentNode" === d,
                    f = Q++; return b.first ? function(b, c, f) { for (; b = b[d];)
                        if (1 === b.nodeType || e) return a(b, c, f) } : function(b, c, g) { var h, i, j = [P, f]; if (g) { for (; b = b[d];)
                            if ((1 === b.nodeType || e) && a(b, c, g)) return !0 } else
                        for (; b = b[d];)
                            if (1 === b.nodeType || e) { if (i = b[N] || (b[N] = {}), (h = i[d]) && h[0] === P && h[1] === f) return j[2] = h[2]; if (i[d] = j, j[2] = a(b, c, g)) return !0 } } }

            function o(a) { return a.length > 1 ? function(b, c, d) { for (var e = a.length; e--;)
                        if (!a[e](b, c, d)) return !1; return !0 } : a[0] }

            function p(a, c, d) { for (var e = 0, f = c.length; f > e; e++) b(a, c[e], d); return d }

            function q(a, b, c, d, e) { for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++)(f = a[h]) && (!c || c(f, d, e)) && (g.push(f), j && b.push(h)); return g }

            function r(a, b, c, e, f, g) { return e && !e[N] && (e = r(e)), f && !f[N] && (f = r(f, g)), d(function(d, g, h, i) { var j, k, l, m = [],
                        n = [],
                        o = g.length,
                        r = d || p(b || "*", h.nodeType ? [h] : h, []),
                        s = !a || !d && b ? r : q(r, m, a, h, i),
                        t = c ? f || (d ? a : o || e) ? [] : g : s; if (c && c(s, t, h, i), e)
                        for (j = q(t, n), e(j, [], h, i), k = j.length; k--;)(l = j[k]) && (t[n[k]] = !(s[n[k]] = l)); if (d) { if (f || a) { if (f) { for (j = [], k = t.length; k--;)(l = t[k]) && j.push(s[k] = l);
                                f(null, t = [], j, i) } for (k = t.length; k--;)(l = t[k]) && (j = f ? ba.call(d, l) : m[k]) > -1 && (d[j] = !(g[j] = l)) } } else t = q(t === g ? t.splice(o, t.length) : t), f ? f(null, g, t, i) : _.apply(g, t) }) }

            function s(a) { for (var b, c, d, e = a.length, f = w.relative[a[0].type], g = f || w.relative[" "], h = f ? 1 : 0, i = n(function(a) { return a === b }, g, !0), j = n(function(a) { return ba.call(b, a) > -1 }, g, !0), k = [function(a, c, d) { return !f && (d || c !== C) || ((b = c).nodeType ? i(a, c, d) : j(a, c, d)) }]; e > h; h++)
                    if (c = w.relative[a[h].type]) k = [n(o(k), c)];
                    else { if (c = w.filter[a[h].type].apply(null, a[h].matches), c[N]) { for (d = ++h; e > d && !w.relative[a[d].type]; d++); return r(h > 1 && o(k), h > 1 && m(a.slice(0, h - 1).concat({ value: " " === a[h - 2].type ? "*" : "" })).replace(ia, "$1"), c, d > h && s(a.slice(h, d)), e > d && s(a = a.slice(d)), e > d && m(a)) } k.push(c) }
                return o(k) }

            function t(a, c) { var e = c.length > 0,
                    f = a.length > 0,
                    g = function(d, g, h, i, j) { var k, l, m, n = 0,
                            o = "0",
                            p = d && [],
                            r = [],
                            s = C,
                            t = d || f && w.find.TAG("*", j),
                            u = P += null == s ? 1 : Math.random() || .1,
                            v = t.length; for (j && (C = g !== G && g); o !== v && null != (k = t[o]); o++) { if (f && k) { for (l = 0; m = a[l++];)
                                    if (m(k, g, h)) { i.push(k); break }
                                j && (P = u) } e && ((k = !m && k) && n--, d && p.push(k)) } if (n += o, e && o !== n) { for (l = 0; m = c[l++];) m(p, r, g, h); if (d) { if (n > 0)
                                    for (; o--;) p[o] || r[o] || (r[o] = Z.call(i));
                                r = q(r) } _.apply(i, r), j && !d && r.length > 0 && n + c.length > 1 && b.uniqueSort(i) } return j && (P = u, C = s), p }; return e ? d(g) : g } var u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N = "sizzle" + -new Date,
                O = a.document,
                P = 0,
                Q = 0,
                R = c(),
                S = c(),
                T = c(),
                U = function(a, b) { return a === b && (E = !0), 0 },
                V = "undefined",
                W = 1 << 31,
                X = {}.hasOwnProperty,
                Y = [],
                Z = Y.pop,
                $ = Y.push,
                _ = Y.push,
                aa = Y.slice,
                ba = Y.indexOf || function(a) { for (var b = 0, c = this.length; c > b; b++)
                        if (this[b] === a) return b; return -1 },
                ca = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                da = "[\\x20\\t\\r\\n\\f]",
                ea = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                fa = ea.replace("w", "w#"),
                ga = "\\[" + da + "*(" + ea + ")(?:" + da + "*([*^$|!~]?=)" + da + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + fa + "))|)" + da + "*\\]",
                ha = ":(" + ea + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + ga + ")*)|.*)\\)|)",
                ia = new RegExp("^" + da + "+|((?:^|[^\\\\])(?:\\\\.)*)" + da + "+$", "g"),
                ja = new RegExp("^" + da + "*," + da + "*"),
                ka = new RegExp("^" + da + "*([>+~]|" + da + ")" + da + "*"),
                la = new RegExp("=" + da + "*([^\\]'\"]*?)" + da + "*\\]", "g"),
                ma = new RegExp(ha),
                na = new RegExp("^" + fa + "$"),
                oa = { ID: new RegExp("^#(" + ea + ")"), CLASS: new RegExp("^\\.(" + ea + ")"), TAG: new RegExp("^(" + ea.replace("w", "w*") + ")"), ATTR: new RegExp("^" + ga), PSEUDO: new RegExp("^" + ha), CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + da + "*(even|odd|(([+-]|)(\\d*)n|)" + da + "*(?:([+-]|)" + da + "*(\\d+)|))" + da + "*\\)|)", "i"), bool: new RegExp("^(?:" + ca + ")$", "i"), needsContext: new RegExp("^" + da + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + da + "*((?:-\\d)?\\d*)" + da + "*\\)|)(?=[^-]|$)", "i") },
                pa = /^(?:input|select|textarea|button)$/i,
                qa = /^h\d$/i,
                ra = /^[^{]+\{\s*\[native \w/,
                sa = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                ta = /[+~]/,
                ua = /'|\\/g,
                va = new RegExp("\\\\([\\da-f]{1,6}" + da + "?|(" + da + ")|.)", "ig"),
                wa = function(a, b, c) { var d = "0x" + b - 65536; return d !== d || c ? b : 0 > d ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320) }; try { _.apply(Y = aa.call(O.childNodes), O.childNodes), Y[O.childNodes.length].nodeType } catch (xa) { _ = { apply: Y.length ? function(a, b) { $.apply(a, aa.call(b)) } : function(a, b) { for (var c = a.length, d = 0; a[c++] = b[d++];);
                        a.length = c - 1 } } } v = b.support = {}, y = b.isXML = function(a) { var b = a && (a.ownerDocument || a).documentElement; return !!b && "HTML" !== b.nodeName }, F = b.setDocument = function(a) { var b, c = a ? a.ownerDocument || a : O,
                    d = c.defaultView; return c !== G && 9 === c.nodeType && c.documentElement ? (G = c, H = c.documentElement, I = !y(c), d && d !== d.top && (d.addEventListener ? d.addEventListener("unload", function() { F() }, !1) : d.attachEvent && d.attachEvent("onunload", function() { F() })), v.attributes = e(function(a) { return a.className = "i", !a.getAttribute("className") }), v.getElementsByTagName = e(function(a) { return a.appendChild(c.createComment("")), !a.getElementsByTagName("*").length }), v.getElementsByClassName = ra.test(c.getElementsByClassName) && e(function(a) { return a.innerHTML = "<div class='a'></div><div class='a i'></div>", a.firstChild.className = "i", 2 === a.getElementsByClassName("i").length }), v.getById = e(function(a) { return H.appendChild(a).id = N, !c.getElementsByName || !c.getElementsByName(N).length }), v.getById ? (w.find.ID = function(a, b) { if (typeof b.getElementById !== V && I) { var c = b.getElementById(a); return c && c.parentNode ? [c] : [] } }, w.filter.ID = function(a) { var b = a.replace(va, wa); return function(a) { return a.getAttribute("id") === b } }) : (delete w.find.ID, w.filter.ID = function(a) { var b = a.replace(va, wa); return function(a) { var c = typeof a.getAttributeNode !== V && a.getAttributeNode("id"); return c && c.value === b } }), w.find.TAG = v.getElementsByTagName ? function(a, b) { return typeof b.getElementsByTagName !== V ? b.getElementsByTagName(a) : void 0 } : function(a, b) { var c, d = [],
                        e = 0,
                        f = b.getElementsByTagName(a); if ("*" === a) { for (; c = f[e++];) 1 === c.nodeType && d.push(c); return d } return f }, w.find.CLASS = v.getElementsByClassName && function(a, b) { return typeof b.getElementsByClassName !== V && I ? b.getElementsByClassName(a) : void 0 }, K = [], J = [], (v.qsa = ra.test(c.querySelectorAll)) && (e(function(a) { a.innerHTML = "<select msallowclip=''><option selected=''></option></select>", a.querySelectorAll("[msallowclip^='']").length && J.push("[*^$]=" + da + "*(?:''|\"\")"), a.querySelectorAll("[selected]").length || J.push("\\[" + da + "*(?:value|" + ca + ")"), a.querySelectorAll(":checked").length || J.push(":checked") }), e(function(a) { var b = c.createElement("input");
                    b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("name", "D"), a.querySelectorAll("[name=d]").length && J.push("name" + da + "*[*^$|!~]?="), a.querySelectorAll(":enabled").length || J.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), J.push(",.*:") })), (v.matchesSelector = ra.test(L = H.matches || H.webkitMatchesSelector || H.mozMatchesSelector || H.oMatchesSelector || H.msMatchesSelector)) && e(function(a) { v.disconnectedMatch = L.call(a, "div"), L.call(a, "[s!='']:x"), K.push("!=", ha) }), J = J.length && new RegExp(J.join("|")), K = K.length && new RegExp(K.join("|")), b = ra.test(H.compareDocumentPosition), M = b || ra.test(H.contains) ? function(a, b) { var c = 9 === a.nodeType ? a.documentElement : a,
                        d = b && b.parentNode; return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d))) } : function(a, b) { if (b)
                        for (; b = b.parentNode;)
                            if (b === a) return !0; return !1 }, U = b ? function(a, b) { if (a === b) return E = !0, 0; var d = !a.compareDocumentPosition - !b.compareDocumentPosition; return d ? d : (d = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & d || !v.sortDetached && b.compareDocumentPosition(a) === d ? a === c || a.ownerDocument === O && M(O, a) ? -1 : b === c || b.ownerDocument === O && M(O, b) ? 1 : D ? ba.call(D, a) - ba.call(D, b) : 0 : 4 & d ? -1 : 1) } : function(a, b) { if (a === b) return E = !0, 0; var d, e = 0,
                        f = a.parentNode,
                        h = b.parentNode,
                        i = [a],
                        j = [b]; if (!f || !h) return a === c ? -1 : b === c ? 1 : f ? -1 : h ? 1 : D ? ba.call(D, a) - ba.call(D, b) : 0; if (f === h) return g(a, b); for (d = a; d = d.parentNode;) i.unshift(d); for (d = b; d = d.parentNode;) j.unshift(d); for (; i[e] === j[e];) e++; return e ? g(i[e], j[e]) : i[e] === O ? -1 : j[e] === O ? 1 : 0 }, c) : G }, b.matches = function(a, c) { return b(a, null, null, c) }, b.matchesSelector = function(a, c) { if ((a.ownerDocument || a) !== G && F(a), c = c.replace(la, "='$1']"), !(!v.matchesSelector || !I || K && K.test(c) || J && J.test(c))) try { var d = L.call(a, c); if (d || v.disconnectedMatch || a.document && 11 !== a.document.nodeType) return d } catch (e) {}
                return b(c, G, null, [a]).length > 0 }, b.contains = function(a, b) { return (a.ownerDocument || a) !== G && F(a), M(a, b) }, b.attr = function(a, b) {
                (a.ownerDocument || a) !== G && F(a); var c = w.attrHandle[b.toLowerCase()],
                    d = c && X.call(w.attrHandle, b.toLowerCase()) ? c(a, b, !I) : void 0; return void 0 !== d ? d : v.attributes || !I ? a.getAttribute(b) : (d = a.getAttributeNode(b)) && d.specified ? d.value : null }, b.error = function(a) { throw new Error("Syntax error, unrecognized expression: " + a) }, b.uniqueSort = function(a) { var b, c = [],
                    d = 0,
                    e = 0; if (E = !v.detectDuplicates, D = !v.sortStable && a.slice(0), a.sort(U), E) { for (; b = a[e++];) b === a[e] && (d = c.push(e)); for (; d--;) a.splice(c[d], 1) } return D = null, a }, x = b.getText = function(a) { var b, c = "",
                    d = 0,
                    e = a.nodeType; if (e) { if (1 === e || 9 === e || 11 === e) { if ("string" == typeof a.textContent) return a.textContent; for (a = a.firstChild; a; a = a.nextSibling) c += x(a) } else if (3 === e || 4 === e) return a.nodeValue } else
                    for (; b = a[d++];) c += x(b); return c }, w = b.selectors = { cacheLength: 50, createPseudo: d, match: oa, attrHandle: {}, find: {}, relative: { ">": { dir: "parentNode", first: !0 }, " ": { dir: "parentNode" }, "+": { dir: "previousSibling", first: !0 }, "~": { dir: "previousSibling" } }, preFilter: { ATTR: function(a) { return a[1] = a[1].replace(va, wa), a[3] = (a[3] || a[4] || a[5] || "").replace(va, wa), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4) }, CHILD: function(a) { return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || b.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && b.error(a[0]), a }, PSEUDO: function(a) { var b, c = !a[6] && a[2]; return oa.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || "" : c && ma.test(c) && (b = z(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3)) } }, filter: { TAG: function(a) { var b = a.replace(va, wa).toLowerCase(); return "*" === a ? function() { return !0 } : function(a) { return a.nodeName && a.nodeName.toLowerCase() === b } }, CLASS: function(a) { var b = R[a + " "]; return b || (b = new RegExp("(^|" + da + ")" + a + "(" + da + "|$)")) && R(a, function(a) { return b.test("string" == typeof a.className && a.className || typeof a.getAttribute !== V && a.getAttribute("class") || "") }) }, ATTR: function(a, c, d) { return function(e) { var f = b.attr(e, a); return null == f ? "!=" === c : !c || (f += "", "=" === c ? f === d : "!=" === c ? f !== d : "^=" === c ? d && 0 === f.indexOf(d) : "*=" === c ? d && f.indexOf(d) > -1 : "$=" === c ? d && f.slice(-d.length) === d : "~=" === c ? (" " + f + " ").indexOf(d) > -1 : "|=" === c && (f === d || f.slice(0, d.length + 1) === d + "-")) } }, CHILD: function(a, b, c, d, e) { var f = "nth" !== a.slice(0, 3),
                            g = "last" !== a.slice(-4),
                            h = "of-type" === b; return 1 === d && 0 === e ? function(a) { return !!a.parentNode } : function(b, c, i) { var j, k, l, m, n, o, p = f !== g ? "nextSibling" : "previousSibling",
                                q = b.parentNode,
                                r = h && b.nodeName.toLowerCase(),
                                s = !i && !h; if (q) { if (f) { for (; p;) { for (l = b; l = l[p];)
                                            if (h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType) return !1;
                                        o = p = "only" === a && !o && "nextSibling" } return !0 } if (o = [g ? q.firstChild : q.lastChild], g && s) { for (k = q[N] || (q[N] = {}), j = k[a] || [], n = j[0] === P && j[1], m = j[0] === P && j[2], l = n && q.childNodes[n]; l = ++n && l && l[p] || (m = n = 0) || o.pop();)
                                        if (1 === l.nodeType && ++m && l === b) { k[a] = [P, n, m]; break } } else if (s && (j = (b[N] || (b[N] = {}))[a]) && j[0] === P) m = j[1];
                                else
                                    for (;
                                        (l = ++n && l && l[p] || (m = n = 0) || o.pop()) && ((h ? l.nodeName.toLowerCase() !== r : 1 !== l.nodeType) || !++m || (s && ((l[N] || (l[N] = {}))[a] = [P, m]), l !== b));); return m -= e, m === d || m % d === 0 && m / d >= 0 } } }, PSEUDO: function(a, c) { var e, f = w.pseudos[a] || w.setFilters[a.toLowerCase()] || b.error("unsupported pseudo: " + a); return f[N] ? f(c) : f.length > 1 ? (e = [a, a, "", c], w.setFilters.hasOwnProperty(a.toLowerCase()) ? d(function(a, b) { for (var d, e = f(a, c), g = e.length; g--;) d = ba.call(a, e[g]), a[d] = !(b[d] = e[g]) }) : function(a) { return f(a, 0, e) }) : f } }, pseudos: { not: d(function(a) { var b = [],
                            c = [],
                            e = A(a.replace(ia, "$1")); return e[N] ? d(function(a, b, c, d) { for (var f, g = e(a, null, d, []), h = a.length; h--;)(f = g[h]) && (a[h] = !(b[h] = f)) }) : function(a, d, f) { return b[0] = a, e(b, null, f, c), !c.pop() } }), has: d(function(a) { return function(c) { return b(a, c).length > 0 } }), contains: d(function(a) { return function(b) { return (b.textContent || b.innerText || x(b)).indexOf(a) > -1 } }), lang: d(function(a) { return na.test(a || "") || b.error("unsupported lang: " + a), a = a.replace(va, wa).toLowerCase(),
                            function(b) { var c;
                                do
                                    if (c = I ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang")) return c = c.toLowerCase(), c === a || 0 === c.indexOf(a + "-"); while ((b = b.parentNode) && 1 === b.nodeType); return !1 } }), target: function(b) { var c = a.location && a.location.hash; return c && c.slice(1) === b.id }, root: function(a) { return a === H }, focus: function(a) { return a === G.activeElement && (!G.hasFocus || G.hasFocus()) && !!(a.type || a.href || ~a.tabIndex) }, enabled: function(a) { return a.disabled === !1 }, disabled: function(a) { return a.disabled === !0 }, checked: function(a) { var b = a.nodeName.toLowerCase(); return "input" === b && !!a.checked || "option" === b && !!a.selected }, selected: function(a) { return a.parentNode && a.parentNode.selectedIndex, a.selected === !0 }, empty: function(a) { for (a = a.firstChild; a; a = a.nextSibling)
                            if (a.nodeType < 6) return !1; return !0 }, parent: function(a) { return !w.pseudos.empty(a) }, header: function(a) { return qa.test(a.nodeName) }, input: function(a) { return pa.test(a.nodeName) }, button: function(a) { var b = a.nodeName.toLowerCase(); return "input" === b && "button" === a.type || "button" === b }, text: function(a) { var b; return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase()) }, first: j(function() { return [0] }), last: j(function(a, b) { return [b - 1] }), eq: j(function(a, b, c) { return [0 > c ? c + b : c] }), even: j(function(a, b) { for (var c = 0; b > c; c += 2) a.push(c); return a }), odd: j(function(a, b) { for (var c = 1; b > c; c += 2) a.push(c); return a }), lt: j(function(a, b, c) { for (var d = 0 > c ? c + b : c; --d >= 0;) a.push(d); return a }), gt: j(function(a, b, c) { for (var d = 0 > c ? c + b : c; ++d < b;) a.push(d); return a }) } }, w.pseudos.nth = w.pseudos.eq; for (u in { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }) w.pseudos[u] = h(u); for (u in { submit: !0, reset: !0 }) w.pseudos[u] = i(u); return l.prototype = w.filters = w.pseudos, w.setFilters = new l, z = b.tokenize = function(a, c) { var d, e, f, g, h, i, j, k = S[a + " "]; if (k) return c ? 0 : k.slice(0); for (h = a, i = [], j = w.preFilter; h;) {
                    (!d || (e = ja.exec(h))) && (e && (h = h.slice(e[0].length) || h), i.push(f = [])), d = !1, (e = ka.exec(h)) && (d = e.shift(), f.push({ value: d, type: e[0].replace(ia, " ") }), h = h.slice(d.length)); for (g in w.filter) !(e = oa[g].exec(h)) || j[g] && !(e = j[g](e)) || (d = e.shift(), f.push({ value: d, type: g, matches: e }), h = h.slice(d.length)); if (!d) break } return c ? h.length : h ? b.error(a) : S(a, i).slice(0) }, A = b.compile = function(a, b) { var c, d = [],
                    e = [],
                    f = T[a + " "]; if (!f) { for (b || (b = z(a)), c = b.length; c--;) f = s(b[c]), f[N] ? d.push(f) : e.push(f);
                    f = T(a, t(e, d)), f.selector = a } return f }, B = b.select = function(a, b, c, d) { var e, f, g, h, i, j = "function" == typeof a && a,
                    l = !d && z(a = j.selector || a); if (c = c || [], 1 === l.length) { if (f = l[0] = l[0].slice(0), f.length > 2 && "ID" === (g = f[0]).type && v.getById && 9 === b.nodeType && I && w.relative[f[1].type]) { if (b = (w.find.ID(g.matches[0].replace(va, wa), b) || [])[0], !b) return c;
                        j && (b = b.parentNode), a = a.slice(f.shift().value.length) } for (e = oa.needsContext.test(a) ? 0 : f.length; e-- && (g = f[e], !w.relative[h = g.type]);)
                        if ((i = w.find[h]) && (d = i(g.matches[0].replace(va, wa), ta.test(f[0].type) && k(b.parentNode) || b))) { if (f.splice(e, 1), a = d.length && m(f), !a) return _.apply(c, d), c; break } } return (j || A(a, l))(d, b, !I, c, ta.test(a) && k(b.parentNode) || b), c }, v.sortStable = N.split("").sort(U).join("") === N, v.detectDuplicates = !!E, F(), v.sortDetached = e(function(a) { return 1 & a.compareDocumentPosition(G.createElement("div")) }), e(function(a) { return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href") }) || f("type|href|height|width", function(a, b, c) { return c ? void 0 : a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2) }), v.attributes && e(function(a) { return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value") }) || f("value", function(a, b, c) { return c || "input" !== a.nodeName.toLowerCase() ? void 0 : a.defaultValue }), e(function(a) { return null == a.getAttribute("disabled") }) || f(ca, function(a, b, c) { var d; return c ? void 0 : a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null }), b }(a);
        ea.find = ja, ea.expr = ja.selectors, ea.expr[":"] = ea.expr.pseudos, ea.unique = ja.uniqueSort, ea.text = ja.getText, ea.isXMLDoc = ja.isXML, ea.contains = ja.contains;
        var ka = ea.expr.match.needsContext,
            la = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
            ma = /^.[^:#\[\.,]*$/;
        ea.filter = function(a, b, c) { var d = b[0]; return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === d.nodeType ? ea.find.matchesSelector(d, a) ? [d] : [] : ea.find.matches(a, ea.grep(b, function(a) { return 1 === a.nodeType })) }, ea.fn.extend({ find: function(a) { var b, c = [],
                    d = this,
                    e = d.length; if ("string" != typeof a) return this.pushStack(ea(a).filter(function() { for (b = 0; e > b; b++)
                        if (ea.contains(d[b], this)) return !0 })); for (b = 0; e > b; b++) ea.find(a, d[b], c); return c = this.pushStack(e > 1 ? ea.unique(c) : c), c.selector = this.selector ? this.selector + " " + a : a, c }, filter: function(a) { return this.pushStack(d(this, a || [], !1)) }, not: function(a) { return this.pushStack(d(this, a || [], !0)) }, is: function(a) { return !!d(this, "string" == typeof a && ka.test(a) ? ea(a) : a || [], !1).length } });
        var na, oa = a.document,
            pa = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
            qa = ea.fn.init = function(a, b) { var c, d; if (!a) return this; if ("string" == typeof a) { if (c = "<" === a.charAt(0) && ">" === a.charAt(a.length - 1) && a.length >= 3 ? [null, a, null] : pa.exec(a), !c || !c[1] && b) return !b || b.jquery ? (b || na).find(a) : this.constructor(b).find(a); if (c[1]) { if (b = b instanceof ea ? b[0] : b, ea.merge(this, ea.parseHTML(c[1], b && b.nodeType ? b.ownerDocument || b : oa, !0)), la.test(c[1]) && ea.isPlainObject(b))
                            for (c in b) ea.isFunction(this[c]) ? this[c](b[c]) : this.attr(c, b[c]); return this } if (d = oa.getElementById(c[2]), d && d.parentNode) { if (d.id !== c[2]) return na.find(a);
                        this.length = 1, this[0] = d } return this.context = oa, this.selector = a, this } return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : ea.isFunction(a) ? "undefined" != typeof na.ready ? na.ready(a) : a(ea) : (void 0 !== a.selector && (this.selector = a.selector, this.context = a.context), ea.makeArray(a, this)) };
        qa.prototype = ea.fn, na = ea(oa);
        var ra = /^(?:parents|prev(?:Until|All))/,
            sa = { children: !0, contents: !0, next: !0, prev: !0 };
        ea.extend({ dir: function(a, b, c) { for (var d = [], e = a[b]; e && 9 !== e.nodeType && (void 0 === c || 1 !== e.nodeType || !ea(e).is(c));) 1 === e.nodeType && d.push(e), e = e[b]; return d }, sibling: function(a, b) { for (var c = []; a; a = a.nextSibling) 1 === a.nodeType && a !== b && c.push(a); return c } }), ea.fn.extend({ has: function(a) { var b, c = ea(a, this),
                    d = c.length; return this.filter(function() { for (b = 0; d > b; b++)
                        if (ea.contains(this, c[b])) return !0 }) }, closest: function(a, b) { for (var c, d = 0, e = this.length, f = [], g = ka.test(a) || "string" != typeof a ? ea(a, b || this.context) : 0; e > d; d++)
                    for (c = this[d]; c && c !== b; c = c.parentNode)
                        if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && ea.find.matchesSelector(c, a))) { f.push(c); break }
                return this.pushStack(f.length > 1 ? ea.unique(f) : f) }, index: function(a) { return a ? "string" == typeof a ? ea.inArray(this[0], ea(a)) : ea.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1 }, add: function(a, b) { return this.pushStack(ea.unique(ea.merge(this.get(), ea(a, b)))) }, addBack: function(a) { return this.add(null == a ? this.prevObject : this.prevObject.filter(a)) } }), ea.each({ parent: function(a) { var b = a.parentNode; return b && 11 !== b.nodeType ? b : null }, parents: function(a) { return ea.dir(a, "parentNode") }, parentsUntil: function(a, b, c) { return ea.dir(a, "parentNode", c) }, next: function(a) { return e(a, "nextSibling") }, prev: function(a) { return e(a, "previousSibling") }, nextAll: function(a) { return ea.dir(a, "nextSibling") }, prevAll: function(a) { return ea.dir(a, "previousSibling") }, nextUntil: function(a, b, c) { return ea.dir(a, "nextSibling", c) }, prevUntil: function(a, b, c) { return ea.dir(a, "previousSibling", c) }, siblings: function(a) { return ea.sibling((a.parentNode || {}).firstChild, a) }, children: function(a) { return ea.sibling(a.firstChild) }, contents: function(a) { return ea.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : ea.merge([], a.childNodes) } }, function(a, b) { ea.fn[a] = function(c, d) { var e = ea.map(this, b, c); return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = ea.filter(d, e)), this.length > 1 && (sa[a] || (e = ea.unique(e)), ra.test(a) && (e = e.reverse())), this.pushStack(e) } });
        var ta = /\S+/g,
            ua = {};
        ea.Callbacks = function(a) {
            a = "string" == typeof a ? ua[a] || f(a) : ea.extend({}, a);
            var b, c, d, e, g, h, i = [],
                j = !a.once && [],
                k = function(f) {
                    for (c = a.memory && f, d = !0, g = h || 0, h = 0, e = i.length, b = !0; i && e > g; g++)
                        if (i[g].apply(f[0], f[1]) === !1 && a.stopOnFalse) { c = !1; break }
                    b = !1, i && (j ? j.length && k(j.shift()) : c ? i = [] : l.disable());
                },
                l = { add: function() { if (i) { var d = i.length;! function f(b) { ea.each(b, function(b, c) { var d = ea.type(c); "function" === d ? a.unique && l.has(c) || i.push(c) : c && c.length && "string" !== d && f(c) }) }(arguments), b ? e = i.length : c && (h = d, k(c)) } return this }, remove: function() { return i && ea.each(arguments, function(a, c) { for (var d;
                                (d = ea.inArray(c, i, d)) > -1;) i.splice(d, 1), b && (e >= d && e--, g >= d && g--) }), this }, has: function(a) { return a ? ea.inArray(a, i) > -1 : !(!i || !i.length) }, empty: function() { return i = [], e = 0, this }, disable: function() { return i = j = c = void 0, this }, disabled: function() { return !i }, lock: function() { return j = void 0, c || l.disable(), this }, locked: function() { return !j }, fireWith: function(a, c) { return !i || d && !j || (c = c || [], c = [a, c.slice ? c.slice() : c], b ? j.push(c) : k(c)), this }, fire: function() { return l.fireWith(this, arguments), this }, fired: function() { return !!d } };
            return l
        }, ea.extend({ Deferred: function(a) { var b = [
                        ["resolve", "done", ea.Callbacks("once memory"), "resolved"],
                        ["reject", "fail", ea.Callbacks("once memory"), "rejected"],
                        ["notify", "progress", ea.Callbacks("memory")]
                    ],
                    c = "pending",
                    d = { state: function() { return c }, always: function() { return e.done(arguments).fail(arguments), this }, then: function() { var a = arguments; return ea.Deferred(function(c) { ea.each(b, function(b, f) { var g = ea.isFunction(a[b]) && a[b];
                                    e[f[1]](function() { var a = g && g.apply(this, arguments);
                                        a && ea.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[f[0] + "With"](this === d ? c.promise() : this, g ? [a] : arguments) }) }), a = null }).promise() }, promise: function(a) { return null != a ? ea.extend(a, d) : d } },
                    e = {}; return d.pipe = d.then, ea.each(b, function(a, f) { var g = f[2],
                        h = f[3];
                    d[f[1]] = g.add, h && g.add(function() { c = h }, b[1 ^ a][2].disable, b[2][2].lock), e[f[0]] = function() { return e[f[0] + "With"](this === e ? d : this, arguments), this }, e[f[0] + "With"] = g.fireWith }), d.promise(e), a && a.call(e, e), e }, when: function(a) { var b, c, d, e = 0,
                    f = X.call(arguments),
                    g = f.length,
                    h = 1 !== g || a && ea.isFunction(a.promise) ? g : 0,
                    i = 1 === h ? a : ea.Deferred(),
                    j = function(a, c, d) { return function(e) { c[a] = this, d[a] = arguments.length > 1 ? X.call(arguments) : e, d === b ? i.notifyWith(c, d) : --h || i.resolveWith(c, d) } }; if (g > 1)
                    for (b = new Array(g), c = new Array(g), d = new Array(g); g > e; e++) f[e] && ea.isFunction(f[e].promise) ? f[e].promise().done(j(e, d, f)).fail(i.reject).progress(j(e, c, b)) : --h; return h || i.resolveWith(d, f), i.promise() } });
        var va;
        ea.fn.ready = function(a) { return ea.ready.promise().done(a), this }, ea.extend({ isReady: !1, readyWait: 1, holdReady: function(a) { a ? ea.readyWait++ : ea.ready(!0) }, ready: function(a) { if (a === !0 ? !--ea.readyWait : !ea.isReady) { if (!oa.body) return setTimeout(ea.ready);
                    ea.isReady = !0, a !== !0 && --ea.readyWait > 0 || (va.resolveWith(oa, [ea]), ea.fn.triggerHandler && (ea(oa).triggerHandler("ready"), ea(oa).off("ready"))) } } }), ea.ready.promise = function(b) { if (!va)
                if (va = ea.Deferred(), "complete" === oa.readyState) setTimeout(ea.ready);
                else if (oa.addEventListener) oa.addEventListener("DOMContentLoaded", h, !1), a.addEventListener("load", h, !1);
            else { oa.attachEvent("onreadystatechange", h), a.attachEvent("onload", h); var c = !1; try { c = null == a.frameElement && oa.documentElement } catch (d) {} c && c.doScroll && ! function e() { if (!ea.isReady) { try { c.doScroll("left") } catch (a) { return setTimeout(e, 50) } g(), ea.ready() } }() } return va.promise(b) };
        var wa, xa = "undefined";
        for (wa in ea(ca)) break;
        ca.ownLast = "0" !== wa, ca.inlineBlockNeedsLayout = !1, ea(function() { var a, b, c, d;
                c = oa.getElementsByTagName("body")[0], c && c.style && (b = oa.createElement("div"), d = oa.createElement("div"), d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", c.appendChild(d).appendChild(b), typeof b.style.zoom !== xa && (b.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", ca.inlineBlockNeedsLayout = a = 3 === b.offsetWidth, a && (c.style.zoom = 1)), c.removeChild(d)) }),
            function() { var a = oa.createElement("div"); if (null == ca.deleteExpando) { ca.deleteExpando = !0; try { delete a.test } catch (b) { ca.deleteExpando = !1 } } a = null }(), ea.acceptData = function(a) { var b = ea.noData[(a.nodeName + " ").toLowerCase()],
                    c = +a.nodeType || 1; return (1 === c || 9 === c) && (!b || b !== !0 && a.getAttribute("classid") === b) };
        var ya = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
            za = /([A-Z])/g;
        ea.extend({ cache: {}, noData: { "applet ": !0, "embed ": !0, "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" }, hasData: function(a) { return a = a.nodeType ? ea.cache[a[ea.expando]] : a[ea.expando], !!a && !j(a) }, data: function(a, b, c) { return k(a, b, c) }, removeData: function(a, b) { return l(a, b) }, _data: function(a, b, c) { return k(a, b, c, !0) }, _removeData: function(a, b) { return l(a, b, !0) } }), ea.fn.extend({ data: function(a, b) { var c, d, e, f = this[0],
                    g = f && f.attributes; if (void 0 === a) { if (this.length && (e = ea.data(f), 1 === f.nodeType && !ea._data(f, "parsedAttrs"))) { for (c = g.length; c--;) g[c] && (d = g[c].name, 0 === d.indexOf("data-") && (d = ea.camelCase(d.slice(5)), i(f, d, e[d])));
                        ea._data(f, "parsedAttrs", !0) } return e } return "object" == typeof a ? this.each(function() { ea.data(this, a) }) : arguments.length > 1 ? this.each(function() { ea.data(this, a, b) }) : f ? i(f, a, ea.data(f, a)) : void 0 }, removeData: function(a) { return this.each(function() { ea.removeData(this, a) }) } }), ea.extend({ queue: function(a, b, c) { var d; return a ? (b = (b || "fx") + "queue", d = ea._data(a, b), c && (!d || ea.isArray(c) ? d = ea._data(a, b, ea.makeArray(c)) : d.push(c)), d || []) : void 0 }, dequeue: function(a, b) { b = b || "fx"; var c = ea.queue(a, b),
                    d = c.length,
                    e = c.shift(),
                    f = ea._queueHooks(a, b),
                    g = function() { ea.dequeue(a, b) }; "inprogress" === e && (e = c.shift(), d--), e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire() }, _queueHooks: function(a, b) { var c = b + "queueHooks"; return ea._data(a, c) || ea._data(a, c, { empty: ea.Callbacks("once memory").add(function() { ea._removeData(a, b + "queue"), ea._removeData(a, c) }) }) } }), ea.fn.extend({ queue: function(a, b) { var c = 2; return "string" != typeof a && (b = a, a = "fx", c--), arguments.length < c ? ea.queue(this[0], a) : void 0 === b ? this : this.each(function() { var c = ea.queue(this, a, b);
                    ea._queueHooks(this, a), "fx" === a && "inprogress" !== c[0] && ea.dequeue(this, a) }) }, dequeue: function(a) { return this.each(function() { ea.dequeue(this, a) }) }, clearQueue: function(a) { return this.queue(a || "fx", []) }, promise: function(a, b) { var c, d = 1,
                    e = ea.Deferred(),
                    f = this,
                    g = this.length,
                    h = function() {--d || e.resolveWith(f, [f]) }; for ("string" != typeof a && (b = a, a = void 0), a = a || "fx"; g--;) c = ea._data(f[g], a + "queueHooks"), c && c.empty && (d++, c.empty.add(h)); return h(), e.promise(b) } });
        var Aa = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            Ba = ["Top", "Right", "Bottom", "Left"],
            Ca = function(a, b) { return a = b || a, "none" === ea.css(a, "display") || !ea.contains(a.ownerDocument, a) },
            Da = ea.access = function(a, b, c, d, e, f, g) { var h = 0,
                    i = a.length,
                    j = null == c; if ("object" === ea.type(c)) { e = !0; for (h in c) ea.access(a, b, h, c[h], !0, f, g) } else if (void 0 !== d && (e = !0, ea.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), b = null) : (j = b, b = function(a, b, c) { return j.call(ea(a), c) })), b))
                    for (; i > h; h++) b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c))); return e ? a : j ? b.call(a) : i ? b(a[0], c) : f },
            Ea = /^(?:checkbox|radio)$/i;
        ! function() { var a = oa.createElement("input"),
                b = oa.createElement("div"),
                c = oa.createDocumentFragment(); if (b.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", ca.leadingWhitespace = 3 === b.firstChild.nodeType, ca.tbody = !b.getElementsByTagName("tbody").length, ca.htmlSerialize = !!b.getElementsByTagName("link").length, ca.html5Clone = "<:nav></:nav>" !== oa.createElement("nav").cloneNode(!0).outerHTML, a.type = "checkbox", a.checked = !0, c.appendChild(a), ca.appendChecked = a.checked, b.innerHTML = "<textarea>x</textarea>", ca.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue, c.appendChild(b), b.innerHTML = "<input type='radio' checked='checked' name='t'/>", ca.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked, ca.noCloneEvent = !0, b.attachEvent && (b.attachEvent("onclick", function() { ca.noCloneEvent = !1 }), b.cloneNode(!0).click()), null == ca.deleteExpando) { ca.deleteExpando = !0; try { delete b.test } catch (d) { ca.deleteExpando = !1 } } }(),
        function() { var b, c, d = oa.createElement("div"); for (b in { submit: !0, change: !0, focusin: !0 }) c = "on" + b, (ca[b + "Bubbles"] = c in a) || (d.setAttribute(c, "t"), ca[b + "Bubbles"] = d.attributes[c].expando === !1);
            d = null }();
        var Fa = /^(?:input|select|textarea)$/i,
            Ga = /^key/,
            Ha = /^(?:mouse|pointer|contextmenu)|click/,
            Ia = /^(?:focusinfocus|focusoutblur)$/,
            Ja = /^([^.]*)(?:\.(.+)|)$/;
        ea.event = { global: {}, add: function(a, b, c, d, e) { var f, g, h, i, j, k, l, m, n, o, p, q = ea._data(a); if (q) { for (c.handler && (i = c, c = i.handler, e = i.selector), c.guid || (c.guid = ea.guid++), (g = q.events) || (g = q.events = {}), (k = q.handle) || (k = q.handle = function(a) { return typeof ea === xa || a && ea.event.triggered === a.type ? void 0 : ea.event.dispatch.apply(k.elem, arguments) }, k.elem = a), b = (b || "").match(ta) || [""], h = b.length; h--;) f = Ja.exec(b[h]) || [], n = p = f[1], o = (f[2] || "").split(".").sort(), n && (j = ea.event.special[n] || {}, n = (e ? j.delegateType : j.bindType) || n, j = ea.event.special[n] || {}, l = ea.extend({ type: n, origType: p, data: d, handler: c, guid: c.guid, selector: e, needsContext: e && ea.expr.match.needsContext.test(e), namespace: o.join(".") }, i), (m = g[n]) || (m = g[n] = [], m.delegateCount = 0, j.setup && j.setup.call(a, d, o, k) !== !1 || (a.addEventListener ? a.addEventListener(n, k, !1) : a.attachEvent && a.attachEvent("on" + n, k))), j.add && (j.add.call(a, l), l.handler.guid || (l.handler.guid = c.guid)), e ? m.splice(m.delegateCount++, 0, l) : m.push(l), ea.event.global[n] = !0);
                    a = null } }, remove: function(a, b, c, d, e) { var f, g, h, i, j, k, l, m, n, o, p, q = ea.hasData(a) && ea._data(a); if (q && (k = q.events)) { for (b = (b || "").match(ta) || [""], j = b.length; j--;)
                        if (h = Ja.exec(b[j]) || [], n = p = h[1], o = (h[2] || "").split(".").sort(), n) { for (l = ea.event.special[n] || {}, n = (d ? l.delegateType : l.bindType) || n, m = k[n] || [], h = h[2] && new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)"), i = f = m.length; f--;) g = m[f], !e && p !== g.origType || c && c.guid !== g.guid || h && !h.test(g.namespace) || d && d !== g.selector && ("**" !== d || !g.selector) || (m.splice(f, 1), g.selector && m.delegateCount--, l.remove && l.remove.call(a, g));
                            i && !m.length && (l.teardown && l.teardown.call(a, o, q.handle) !== !1 || ea.removeEvent(a, n, q.handle), delete k[n]) } else
                            for (n in k) ea.event.remove(a, n + b[j], c, d, !0);
                    ea.isEmptyObject(k) && (delete q.handle, ea._removeData(a, "events")) } }, trigger: function(b, c, d, e) { var f, g, h, i, j, k, l, m = [d || oa],
                    n = ba.call(b, "type") ? b.type : b,
                    o = ba.call(b, "namespace") ? b.namespace.split(".") : []; if (h = k = d = d || oa, 3 !== d.nodeType && 8 !== d.nodeType && !Ia.test(n + ea.event.triggered) && (n.indexOf(".") >= 0 && (o = n.split("."), n = o.shift(), o.sort()), g = n.indexOf(":") < 0 && "on" + n, b = b[ea.expando] ? b : new ea.Event(n, "object" == typeof b && b), b.isTrigger = e ? 2 : 3, b.namespace = o.join("."), b.namespace_re = b.namespace ? new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, b.result = void 0, b.target || (b.target = d), c = null == c ? [b] : ea.makeArray(c, [b]), j = ea.event.special[n] || {}, e || !j.trigger || j.trigger.apply(d, c) !== !1)) { if (!e && !j.noBubble && !ea.isWindow(d)) { for (i = j.delegateType || n, Ia.test(i + n) || (h = h.parentNode); h; h = h.parentNode) m.push(h), k = h;
                        k === (d.ownerDocument || oa) && m.push(k.defaultView || k.parentWindow || a) } for (l = 0;
                        (h = m[l++]) && !b.isPropagationStopped();) b.type = l > 1 ? i : j.bindType || n, f = (ea._data(h, "events") || {})[b.type] && ea._data(h, "handle"), f && f.apply(h, c), f = g && h[g], f && f.apply && ea.acceptData(h) && (b.result = f.apply(h, c), b.result === !1 && b.preventDefault()); if (b.type = n, !e && !b.isDefaultPrevented() && (!j._default || j._default.apply(m.pop(), c) === !1) && ea.acceptData(d) && g && d[n] && !ea.isWindow(d)) { k = d[g], k && (d[g] = null), ea.event.triggered = n; try { d[n]() } catch (p) {} ea.event.triggered = void 0, k && (d[g] = k) } return b.result } }, dispatch: function(a) { a = ea.event.fix(a); var b, c, d, e, f, g = [],
                    h = X.call(arguments),
                    i = (ea._data(this, "events") || {})[a.type] || [],
                    j = ea.event.special[a.type] || {}; if (h[0] = a, a.delegateTarget = this, !j.preDispatch || j.preDispatch.call(this, a) !== !1) { for (g = ea.event.handlers.call(this, a, i), b = 0;
                        (e = g[b++]) && !a.isPropagationStopped();)
                        for (a.currentTarget = e.elem, f = 0;
                            (d = e.handlers[f++]) && !a.isImmediatePropagationStopped();)(!a.namespace_re || a.namespace_re.test(d.namespace)) && (a.handleObj = d, a.data = d.data, c = ((ea.event.special[d.origType] || {}).handle || d.handler).apply(e.elem, h), void 0 !== c && (a.result = c) === !1 && (a.preventDefault(), a.stopPropagation())); return j.postDispatch && j.postDispatch.call(this, a), a.result } }, handlers: function(a, b) { var c, d, e, f, g = [],
                    h = b.delegateCount,
                    i = a.target; if (h && i.nodeType && (!a.button || "click" !== a.type))
                    for (; i != this; i = i.parentNode || this)
                        if (1 === i.nodeType && (i.disabled !== !0 || "click" !== a.type)) { for (e = [], f = 0; h > f; f++) d = b[f], c = d.selector + " ", void 0 === e[c] && (e[c] = d.needsContext ? ea(c, this).index(i) >= 0 : ea.find(c, this, null, [i]).length), e[c] && e.push(d);
                            e.length && g.push({ elem: i, handlers: e }) }
                return h < b.length && g.push({ elem: this, handlers: b.slice(h) }), g }, fix: function(a) { if (a[ea.expando]) return a; var b, c, d, e = a.type,
                    f = a,
                    g = this.fixHooks[e]; for (g || (this.fixHooks[e] = g = Ha.test(e) ? this.mouseHooks : Ga.test(e) ? this.keyHooks : {}), d = g.props ? this.props.concat(g.props) : this.props, a = new ea.Event(f), b = d.length; b--;) c = d[b], a[c] = f[c]; return a.target || (a.target = f.srcElement || oa), 3 === a.target.nodeType && (a.target = a.target.parentNode), a.metaKey = !!a.metaKey, g.filter ? g.filter(a, f) : a }, props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "), fixHooks: {}, keyHooks: { props: "char charCode key keyCode".split(" "), filter: function(a, b) { return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), a } }, mouseHooks: { props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "), filter: function(a, b) { var c, d, e, f = b.button,
                        g = b.fromElement; return null == a.pageX && null != b.clientX && (d = a.target.ownerDocument || oa, e = d.documentElement, c = d.body, a.pageX = b.clientX + (e && e.scrollLeft || c && c.scrollLeft || 0) - (e && e.clientLeft || c && c.clientLeft || 0), a.pageY = b.clientY + (e && e.scrollTop || c && c.scrollTop || 0) - (e && e.clientTop || c && c.clientTop || 0)), !a.relatedTarget && g && (a.relatedTarget = g === a.target ? b.toElement : g), a.which || void 0 === f || (a.which = 1 & f ? 1 : 2 & f ? 3 : 4 & f ? 2 : 0), a } }, special: { load: { noBubble: !0 }, focus: { trigger: function() { if (this !== o() && this.focus) try { return this.focus(), !1 } catch (a) {} }, delegateType: "focusin" }, blur: { trigger: function() { return this === o() && this.blur ? (this.blur(), !1) : void 0 }, delegateType: "focusout" }, click: { trigger: function() { return ea.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0 }, _default: function(a) { return ea.nodeName(a.target, "a") } }, beforeunload: { postDispatch: function(a) { void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result) } } }, simulate: function(a, b, c, d) { var e = ea.extend(new ea.Event, c, { type: a, isSimulated: !0, originalEvent: {} });
                d ? ea.event.trigger(e, null, b) : ea.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault() } }, ea.removeEvent = oa.removeEventListener ? function(a, b, c) { a.removeEventListener && a.removeEventListener(b, c, !1) } : function(a, b, c) { var d = "on" + b;
            a.detachEvent && (typeof a[d] === xa && (a[d] = null), a.detachEvent(d, c)) }, ea.Event = function(a, b) { return this instanceof ea.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && a.returnValue === !1 ? m : n) : this.type = a, b && ea.extend(this, b), this.timeStamp = a && a.timeStamp || ea.now(), void(this[ea.expando] = !0)) : new ea.Event(a, b) }, ea.Event.prototype = { isDefaultPrevented: n, isPropagationStopped: n, isImmediatePropagationStopped: n, preventDefault: function() { var a = this.originalEvent;
                this.isDefaultPrevented = m, a && (a.preventDefault ? a.preventDefault() : a.returnValue = !1) }, stopPropagation: function() { var a = this.originalEvent;
                this.isPropagationStopped = m, a && (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0) }, stopImmediatePropagation: function() { var a = this.originalEvent;
                this.isImmediatePropagationStopped = m, a && a.stopImmediatePropagation && a.stopImmediatePropagation(), this.stopPropagation() } }, ea.each({ mouseenter: "mouseover", mouseleave: "mouseout", pointerenter: "pointerover", pointerleave: "pointerout" }, function(a, b) { ea.event.special[a] = { delegateType: b, bindType: b, handle: function(a) { var c, d = this,
                        e = a.relatedTarget,
                        f = a.handleObj; return (!e || e !== d && !ea.contains(d, e)) && (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c } } }), ca.submitBubbles || (ea.event.special.submit = { setup: function() { return !ea.nodeName(this, "form") && void ea.event.add(this, "click._submit keypress._submit", function(a) { var b = a.target,
                        c = ea.nodeName(b, "input") || ea.nodeName(b, "button") ? b.form : void 0;
                    c && !ea._data(c, "submitBubbles") && (ea.event.add(c, "submit._submit", function(a) { a._submit_bubble = !0 }), ea._data(c, "submitBubbles", !0)) }) }, postDispatch: function(a) { a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && ea.event.simulate("submit", this.parentNode, a, !0)) }, teardown: function() { return !ea.nodeName(this, "form") && void ea.event.remove(this, "._submit") } }), ca.changeBubbles || (ea.event.special.change = { setup: function() { return Fa.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (ea.event.add(this, "propertychange._change", function(a) { "checked" === a.originalEvent.propertyName && (this._just_changed = !0) }), ea.event.add(this, "click._change", function(a) { this._just_changed && !a.isTrigger && (this._just_changed = !1), ea.event.simulate("change", this, a, !0) })), !1) : void ea.event.add(this, "beforeactivate._change", function(a) { var b = a.target;
                    Fa.test(b.nodeName) && !ea._data(b, "changeBubbles") && (ea.event.add(b, "change._change", function(a) {!this.parentNode || a.isSimulated || a.isTrigger || ea.event.simulate("change", this.parentNode, a, !0) }), ea._data(b, "changeBubbles", !0)) }) }, handle: function(a) { var b = a.target; return this !== b || a.isSimulated || a.isTrigger || "radio" !== b.type && "checkbox" !== b.type ? a.handleObj.handler.apply(this, arguments) : void 0 }, teardown: function() { return ea.event.remove(this, "._change"), !Fa.test(this.nodeName) } }), ca.focusinBubbles || ea.each({ focus: "focusin", blur: "focusout" }, function(a, b) { var c = function(a) { ea.event.simulate(b, a.target, ea.event.fix(a), !0) };
            ea.event.special[b] = { setup: function() { var d = this.ownerDocument || this,
                        e = ea._data(d, b);
                    e || d.addEventListener(a, c, !0), ea._data(d, b, (e || 0) + 1) }, teardown: function() { var d = this.ownerDocument || this,
                        e = ea._data(d, b) - 1;
                    e ? ea._data(d, b, e) : (d.removeEventListener(a, c, !0), ea._removeData(d, b)) } } }), ea.fn.extend({ on: function(a, b, c, d, e) { var f, g; if ("object" == typeof a) { "string" != typeof b && (c = c || b, b = void 0); for (f in a) this.on(f, b, c, a[f], e); return this } if (null == c && null == d ? (d = b, c = b = void 0) : null == d && ("string" == typeof b ? (d = c, c = void 0) : (d = c, c = b, b = void 0)), d === !1) d = n;
                else if (!d) return this; return 1 === e && (g = d, d = function(a) { return ea().off(a), g.apply(this, arguments) }, d.guid = g.guid || (g.guid = ea.guid++)), this.each(function() { ea.event.add(this, a, d, c, b) }) }, one: function(a, b, c, d) { return this.on(a, b, c, d, 1) }, off: function(a, b, c) { var d, e; if (a && a.preventDefault && a.handleObj) return d = a.handleObj, ea(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), this; if ("object" == typeof a) { for (e in a) this.off(e, b, a[e]); return this } return (b === !1 || "function" == typeof b) && (c = b, b = void 0), c === !1 && (c = n), this.each(function() { ea.event.remove(this, a, c, b) }) }, trigger: function(a, b) { return this.each(function() { ea.event.trigger(a, b, this) }) }, triggerHandler: function(a, b) { var c = this[0]; return c ? ea.event.trigger(a, b, c, !0) : void 0 } });
        var Ka = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
            La = / jQuery\d+="(?:null|\d+)"/g,
            Ma = new RegExp("<(?:" + Ka + ")[\\s/>]", "i"),
            Na = /^\s+/,
            Oa = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
            Pa = /<([\w:]+)/,
            Qa = /<tbody/i,
            Ra = /<|&#?\w+;/,
            Sa = /<(?:script|style|link)/i,
            Ta = /checked\s*(?:[^=]|=\s*.checked.)/i,
            Ua = /^$|\/(?:java|ecma)script/i,
            Va = /^true\/(.*)/,
            Wa = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
            Xa = { option: [1, "<select multiple='multiple'>", "</select>"], legend: [1, "<fieldset>", "</fieldset>"], area: [1, "<map>", "</map>"], param: [1, "<object>", "</object>"], thead: [1, "<table>", "</table>"], tr: [2, "<table><tbody>", "</tbody></table>"], col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], _default: ca.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"] },
            Ya = p(oa),
            Za = Ya.appendChild(oa.createElement("div"));
        Xa.optgroup = Xa.option, Xa.tbody = Xa.tfoot = Xa.colgroup = Xa.caption = Xa.thead, Xa.th = Xa.td, ea.extend({ clone: function(a, b, c) { var d, e, f, g, h, i = ea.contains(a.ownerDocument, a); if (ca.html5Clone || ea.isXMLDoc(a) || !Ma.test("<" + a.nodeName + ">") ? f = a.cloneNode(!0) : (Za.innerHTML = a.outerHTML, Za.removeChild(f = Za.firstChild)), !(ca.noCloneEvent && ca.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || ea.isXMLDoc(a)))
                    for (d = q(f), h = q(a), g = 0; null != (e = h[g]); ++g) d[g] && x(e, d[g]); if (b)
                    if (c)
                        for (h = h || q(a), d = d || q(f), g = 0; null != (e = h[g]); g++) w(e, d[g]);
                    else w(a, f); return d = q(f, "script"), d.length > 0 && v(d, !i && q(a, "script")), d = h = e = null, f }, buildFragment: function(a, b, c, d) { for (var e, f, g, h, i, j, k, l = a.length, m = p(b), n = [], o = 0; l > o; o++)
                    if (f = a[o], f || 0 === f)
                        if ("object" === ea.type(f)) ea.merge(n, f.nodeType ? [f] : f);
                        else if (Ra.test(f)) { for (h = h || m.appendChild(b.createElement("div")), i = (Pa.exec(f) || ["", ""])[1].toLowerCase(), k = Xa[i] || Xa._default, h.innerHTML = k[1] + f.replace(Oa, "<$1></$2>") + k[2], e = k[0]; e--;) h = h.lastChild; if (!ca.leadingWhitespace && Na.test(f) && n.push(b.createTextNode(Na.exec(f)[0])), !ca.tbody)
                        for (f = "table" !== i || Qa.test(f) ? "<table>" !== k[1] || Qa.test(f) ? 0 : h : h.firstChild, e = f && f.childNodes.length; e--;) ea.nodeName(j = f.childNodes[e], "tbody") && !j.childNodes.length && f.removeChild(j); for (ea.merge(n, h.childNodes), h.textContent = ""; h.firstChild;) h.removeChild(h.firstChild);
                    h = m.lastChild } else n.push(b.createTextNode(f)); for (h && m.removeChild(h), ca.appendChecked || ea.grep(q(n, "input"), r), o = 0; f = n[o++];)
                    if ((!d || -1 === ea.inArray(f, d)) && (g = ea.contains(f.ownerDocument, f), h = q(m.appendChild(f), "script"), g && v(h), c))
                        for (e = 0; f = h[e++];) Ua.test(f.type || "") && c.push(f); return h = null, m }, cleanData: function(a, b) { for (var c, d, e, f, g = 0, h = ea.expando, i = ea.cache, j = ca.deleteExpando, k = ea.event.special; null != (c = a[g]); g++)
                    if ((b || ea.acceptData(c)) && (e = c[h], f = e && i[e])) { if (f.events)
                            for (d in f.events) k[d] ? ea.event.remove(c, d) : ea.removeEvent(c, d, f.handle);
                        i[e] && (delete i[e], j ? delete c[h] : typeof c.removeAttribute !== xa ? c.removeAttribute(h) : c[h] = null, W.push(e)) } } }), ea.fn.extend({ text: function(a) { return Da(this, function(a) { return void 0 === a ? ea.text(this) : this.empty().append((this[0] && this[0].ownerDocument || oa).createTextNode(a)) }, null, a, arguments.length) }, append: function() { return this.domManip(arguments, function(a) { if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) { var b = s(this, a);
                        b.appendChild(a) } }) }, prepend: function() { return this.domManip(arguments, function(a) { if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) { var b = s(this, a);
                        b.insertBefore(a, b.firstChild) } }) }, before: function() { return this.domManip(arguments, function(a) { this.parentNode && this.parentNode.insertBefore(a, this) }) }, after: function() { return this.domManip(arguments, function(a) { this.parentNode && this.parentNode.insertBefore(a, this.nextSibling) }) }, remove: function(a, b) { for (var c, d = a ? ea.filter(a, this) : this, e = 0; null != (c = d[e]); e++) b || 1 !== c.nodeType || ea.cleanData(q(c)), c.parentNode && (b && ea.contains(c.ownerDocument, c) && v(q(c, "script")), c.parentNode.removeChild(c)); return this }, empty: function() { for (var a, b = 0; null != (a = this[b]); b++) { for (1 === a.nodeType && ea.cleanData(q(a, !1)); a.firstChild;) a.removeChild(a.firstChild);
                    a.options && ea.nodeName(a, "select") && (a.options.length = 0) } return this }, clone: function(a, b) { return a = null != a && a, b = null == b ? a : b, this.map(function() { return ea.clone(this, a, b) }) }, html: function(a) { return Da(this, function(a) { var b = this[0] || {},
                        c = 0,
                        d = this.length; if (void 0 === a) return 1 === b.nodeType ? b.innerHTML.replace(La, "") : void 0; if (!("string" != typeof a || Sa.test(a) || !ca.htmlSerialize && Ma.test(a) || !ca.leadingWhitespace && Na.test(a) || Xa[(Pa.exec(a) || ["", ""])[1].toLowerCase()])) { a = a.replace(Oa, "<$1></$2>"); try { for (; d > c; c++) b = this[c] || {}, 1 === b.nodeType && (ea.cleanData(q(b, !1)), b.innerHTML = a);
                            b = 0 } catch (e) {} } b && this.empty().append(a) }, null, a, arguments.length) }, replaceWith: function() { var a = arguments[0]; return this.domManip(arguments, function(b) { a = this.parentNode, ea.cleanData(q(this)), a && a.replaceChild(b, this) }), a && (a.length || a.nodeType) ? this : this.remove() }, detach: function(a) { return this.remove(a, !0) }, domManip: function(a, b) { a = Y.apply([], a); var c, d, e, f, g, h, i = 0,
                    j = this.length,
                    k = this,
                    l = j - 1,
                    m = a[0],
                    n = ea.isFunction(m); if (n || j > 1 && "string" == typeof m && !ca.checkClone && Ta.test(m)) return this.each(function(c) { var d = k.eq(c);
                    n && (a[0] = m.call(this, c, d.html())), d.domManip(a, b) }); if (j && (h = ea.buildFragment(a, this[0].ownerDocument, !1, this), c = h.firstChild, 1 === h.childNodes.length && (h = c), c)) { for (f = ea.map(q(h, "script"), t), e = f.length; j > i; i++) d = h, i !== l && (d = ea.clone(d, !0, !0), e && ea.merge(f, q(d, "script"))), b.call(this[i], d, i); if (e)
                        for (g = f[f.length - 1].ownerDocument, ea.map(f, u), i = 0; e > i; i++) d = f[i], Ua.test(d.type || "") && !ea._data(d, "globalEval") && ea.contains(g, d) && (d.src ? ea._evalUrl && ea._evalUrl(d.src) : ea.globalEval((d.text || d.textContent || d.innerHTML || "").replace(Wa, "")));
                    h = c = null } return this } }), ea.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function(a, b) { ea.fn[a] = function(a) { for (var c, d = 0, e = [], f = ea(a), g = f.length - 1; g >= d; d++) c = d === g ? this : this.clone(!0), ea(f[d])[b](c), Z.apply(e, c.get()); return this.pushStack(e) } });
        var $a, _a = {};
        ! function() { var a;
            ca.shrinkWrapBlocks = function() { if (null != a) return a;
                a = !1; var b, c, d; return c = oa.getElementsByTagName("body")[0], c && c.style ? (b = oa.createElement("div"), d = oa.createElement("div"), d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", c.appendChild(d).appendChild(b), typeof b.style.zoom !== xa && (b.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", b.appendChild(oa.createElement("div")).style.width = "5px", a = 3 !== b.offsetWidth), c.removeChild(d), a) : void 0 } }();
        var ab, bb, cb = /^margin/,
            db = new RegExp("^(" + Aa + ")(?!px)[a-z%]+$", "i"),
            eb = /^(top|right|bottom|left)$/;
        a.getComputedStyle ? (ab = function(a) { return a.ownerDocument.defaultView.getComputedStyle(a, null) }, bb = function(a, b, c) { var d, e, f, g, h = a.style; return c = c || ab(a), g = c ? c.getPropertyValue(b) || c[b] : void 0, c && ("" !== g || ea.contains(a.ownerDocument, a) || (g = ea.style(a, b)), db.test(g) && cb.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f)), void 0 === g ? g : g + "" }) : oa.documentElement.currentStyle && (ab = function(a) { return a.currentStyle }, bb = function(a, b, c) { var d, e, f, g, h = a.style; return c = c || ab(a), g = c ? c[b] : void 0, null == g && h && h[b] && (g = h[b]), db.test(g) && !eb.test(b) && (d = h.left, e = a.runtimeStyle, f = e && e.left, f && (e.left = a.currentStyle.left), h.left = "fontSize" === b ? "1em" : g, g = h.pixelLeft + "px", h.left = d, f && (e.left = f)), void 0 === g ? g : g + "" || "auto" }), ! function() {
            function b() { var b, c, d, e;
                c = oa.getElementsByTagName("body")[0], c && c.style && (b = oa.createElement("div"), d = oa.createElement("div"), d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", c.appendChild(d).appendChild(b), b.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", f = g = !1, i = !0, a.getComputedStyle && (f = "1%" !== (a.getComputedStyle(b, null) || {}).top, g = "4px" === (a.getComputedStyle(b, null) || { width: "4px" }).width, e = b.appendChild(oa.createElement("div")), e.style.cssText = b.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", e.style.marginRight = e.style.width = "0", b.style.width = "1px", i = !parseFloat((a.getComputedStyle(e, null) || {}).marginRight)), b.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", e = b.getElementsByTagName("td"), e[0].style.cssText = "margin:0;border:0;padding:0;display:none", h = 0 === e[0].offsetHeight, h && (e[0].style.display = "", e[1].style.display = "none", h = 0 === e[0].offsetHeight), c.removeChild(d)) } var c, d, e, f, g, h, i;
            c = oa.createElement("div"), c.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", e = c.getElementsByTagName("a")[0], (d = e && e.style) && (d.cssText = "float:left;opacity:.5", ca.opacity = "0.5" === d.opacity, ca.cssFloat = !!d.cssFloat, c.style.backgroundClip = "content-box", c.cloneNode(!0).style.backgroundClip = "", ca.clearCloneStyle = "content-box" === c.style.backgroundClip, ca.boxSizing = "" === d.boxSizing || "" === d.MozBoxSizing || "" === d.WebkitBoxSizing, ea.extend(ca, { reliableHiddenOffsets: function() { return null == h && b(), h }, boxSizingReliable: function() { return null == g && b(), g }, pixelPosition: function() { return null == f && b(), f }, reliableMarginRight: function() { return null == i && b(), i } })) }(), ea.swap = function(a, b, c, d) { var e, f, g = {}; for (f in b) g[f] = a.style[f], a.style[f] = b[f];
            e = c.apply(a, d || []); for (f in b) a.style[f] = g[f]; return e };
        var fb = /alpha\([^)]*\)/i,
            gb = /opacity\s*=\s*([^)]*)/,
            hb = /^(none|table(?!-c[ea]).+)/,
            ib = new RegExp("^(" + Aa + ")(.*)$", "i"),
            jb = new RegExp("^([+-])=(" + Aa + ")", "i"),
            kb = { position: "absolute", visibility: "hidden", display: "block" },
            lb = { letterSpacing: "0", fontWeight: "400" },
            mb = ["Webkit", "O", "Moz", "ms"];
        ea.extend({ cssHooks: { opacity: { get: function(a, b) { if (b) { var c = bb(a, "opacity"); return "" === c ? "1" : c } } } }, cssNumber: { columnCount: !0, fillOpacity: !0, flexGrow: !0, flexShrink: !0, fontWeight: !0, lineHeight: !0, opacity: !0, order: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0 }, cssProps: { "float": ca.cssFloat ? "cssFloat" : "styleFloat" }, style: function(a, b, c, d) { if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) { var e, f, g, h = ea.camelCase(b),
                        i = a.style; if (b = ea.cssProps[h] || (ea.cssProps[h] = B(i, h)), g = ea.cssHooks[b] || ea.cssHooks[h], void 0 === c) return g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b]; if (f = typeof c, "string" === f && (e = jb.exec(c)) && (c = (e[1] + 1) * e[2] + parseFloat(ea.css(a, b)), f = "number"), null != c && c === c && ("number" !== f || ea.cssNumber[h] || (c += "px"), ca.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (i[b] = "inherit"), !(g && "set" in g && void 0 === (c = g.set(a, c, d))))) try { i[b] = c } catch (j) {} } }, css: function(a, b, c, d) { var e, f, g, h = ea.camelCase(b); return b = ea.cssProps[h] || (ea.cssProps[h] = B(a.style, h)), g = ea.cssHooks[b] || ea.cssHooks[h], g && "get" in g && (f = g.get(a, !0, c)), void 0 === f && (f = bb(a, b, d)), "normal" === f && b in lb && (f = lb[b]), "" === c || c ? (e = parseFloat(f), c === !0 || ea.isNumeric(e) ? e || 0 : f) : f } }), ea.each(["height", "width"], function(a, b) { ea.cssHooks[b] = { get: function(a, c, d) { return c ? hb.test(ea.css(a, "display")) && 0 === a.offsetWidth ? ea.swap(a, kb, function() { return F(a, b, d) }) : F(a, b, d) : void 0 }, set: function(a, c, d) { var e = d && ab(a); return D(a, c, d ? E(a, b, d, ca.boxSizing && "border-box" === ea.css(a, "boxSizing", !1, e), e) : 0) } } }), ca.opacity || (ea.cssHooks.opacity = { get: function(a, b) { return gb.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : b ? "1" : "" }, set: function(a, b) { var c = a.style,
                    d = a.currentStyle,
                    e = ea.isNumeric(b) ? "alpha(opacity=" + 100 * b + ")" : "",
                    f = d && d.filter || c.filter || "";
                c.zoom = 1, (b >= 1 || "" === b) && "" === ea.trim(f.replace(fb, "")) && c.removeAttribute && (c.removeAttribute("filter"), "" === b || d && !d.filter) || (c.filter = fb.test(f) ? f.replace(fb, e) : f + " " + e) } }), ea.cssHooks.marginRight = A(ca.reliableMarginRight, function(a, b) { return b ? ea.swap(a, { display: "inline-block" }, bb, [a, "marginRight"]) : void 0 }), ea.each({ margin: "", padding: "", border: "Width" }, function(a, b) { ea.cssHooks[a + b] = { expand: function(c) { for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; 4 > d; d++) e[a + Ba[d] + b] = f[d] || f[d - 2] || f[0]; return e } }, cb.test(a) || (ea.cssHooks[a + b].set = D) }), ea.fn.extend({ css: function(a, b) { return Da(this, function(a, b, c) { var d, e, f = {},
                        g = 0; if (ea.isArray(b)) { for (d = ab(a), e = b.length; e > g; g++) f[b[g]] = ea.css(a, b[g], !1, d); return f } return void 0 !== c ? ea.style(a, b, c) : ea.css(a, b) }, a, b, arguments.length > 1) }, show: function() { return C(this, !0) }, hide: function() { return C(this) }, toggle: function(a) { return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function() { Ca(this) ? ea(this).show() : ea(this).hide() }) } }), ea.Tween = G, G.prototype = {
            constructor: G,
            init: function(a, b, c, d, e, f) { this.elem = a, this.prop = c, this.easing = e || "swing", this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || (ea.cssNumber[c] ? "" : "px") },
            cur: function() { var a = G.propHooks[this.prop]; return a && a.get ? a.get(this) : G.propHooks._default.get(this) },
            run: function(a) {
                var b, c = G.propHooks[this.prop];
                return this.pos = b = this.options.duration ? ea.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this),
                    c && c.set ? c.set(this) : G.propHooks._default.set(this), this
            }
        }, G.prototype.init.prototype = G.prototype, G.propHooks = { _default: { get: function(a) { var b; return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (b = ea.css(a.elem, a.prop, ""), b && "auto" !== b ? b : 0) : a.elem[a.prop] }, set: function(a) { ea.fx.step[a.prop] ? ea.fx.step[a.prop](a) : a.elem.style && (null != a.elem.style[ea.cssProps[a.prop]] || ea.cssHooks[a.prop]) ? ea.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now } } }, G.propHooks.scrollTop = G.propHooks.scrollLeft = { set: function(a) { a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now) } }, ea.easing = { linear: function(a) { return a }, swing: function(a) { return .5 - Math.cos(a * Math.PI) / 2 } }, ea.fx = G.prototype.init, ea.fx.step = {};
        var nb, ob, pb = /^(?:toggle|show|hide)$/,
            qb = new RegExp("^(?:([+-])=|)(" + Aa + ")([a-z%]*)$", "i"),
            rb = /queueHooks$/,
            sb = [K],
            tb = { "*": [function(a, b) { var c = this.createTween(a, b),
                        d = c.cur(),
                        e = qb.exec(b),
                        f = e && e[3] || (ea.cssNumber[a] ? "" : "px"),
                        g = (ea.cssNumber[a] || "px" !== f && +d) && qb.exec(ea.css(c.elem, a)),
                        h = 1,
                        i = 20; if (g && g[3] !== f) { f = f || g[3], e = e || [], g = +d || 1;
                        do h = h || ".5", g /= h, ea.style(c.elem, a, g + f); while (h !== (h = c.cur() / d) && 1 !== h && --i) } return e && (g = c.start = +g || +d || 0, c.unit = f, c.end = e[1] ? g + (e[1] + 1) * e[2] : +e[2]), c }] };
        ea.Animation = ea.extend(M, { tweener: function(a, b) { ea.isFunction(a) ? (b = a, a = ["*"]) : a = a.split(" "); for (var c, d = 0, e = a.length; e > d; d++) c = a[d], tb[c] = tb[c] || [], tb[c].unshift(b) }, prefilter: function(a, b) { b ? sb.unshift(a) : sb.push(a) } }), ea.speed = function(a, b, c) { var d = a && "object" == typeof a ? ea.extend({}, a) : { complete: c || !c && b || ea.isFunction(a) && a, duration: a, easing: c && b || b && !ea.isFunction(b) && b }; return d.duration = ea.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in ea.fx.speeds ? ea.fx.speeds[d.duration] : ea.fx.speeds._default, (null == d.queue || d.queue === !0) && (d.queue = "fx"), d.old = d.complete, d.complete = function() { ea.isFunction(d.old) && d.old.call(this), d.queue && ea.dequeue(this, d.queue) }, d }, ea.fn.extend({ fadeTo: function(a, b, c, d) { return this.filter(Ca).css("opacity", 0).show().end().animate({ opacity: b }, a, c, d) }, animate: function(a, b, c, d) { var e = ea.isEmptyObject(a),
                        f = ea.speed(b, c, d),
                        g = function() { var b = M(this, ea.extend({}, a), f);
                            (e || ea._data(this, "finish")) && b.stop(!0) }; return g.finish = g, e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g) }, stop: function(a, b, c) { var d = function(a) { var b = a.stop;
                        delete a.stop, b(c) }; return "string" != typeof a && (c = b, b = a, a = void 0), b && a !== !1 && this.queue(a || "fx", []), this.each(function() { var b = !0,
                            e = null != a && a + "queueHooks",
                            f = ea.timers,
                            g = ea._data(this); if (e) g[e] && g[e].stop && d(g[e]);
                        else
                            for (e in g) g[e] && g[e].stop && rb.test(e) && d(g[e]); for (e = f.length; e--;) f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), b = !1, f.splice(e, 1));
                        (b || !c) && ea.dequeue(this, a) }) }, finish: function(a) { return a !== !1 && (a = a || "fx"), this.each(function() { var b, c = ea._data(this),
                            d = c[a + "queue"],
                            e = c[a + "queueHooks"],
                            f = ea.timers,
                            g = d ? d.length : 0; for (c.finish = !0, ea.queue(this, a, []), e && e.stop && e.stop.call(this, !0), b = f.length; b--;) f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1)); for (b = 0; g > b; b++) d[b] && d[b].finish && d[b].finish.call(this);
                        delete c.finish }) } }), ea.each(["toggle", "show", "hide"], function(a, b) { var c = ea.fn[b];
                ea.fn[b] = function(a, d, e) { return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(I(b, !0), a, d, e) } }), ea.each({ slideDown: I("show"), slideUp: I("hide"), slideToggle: I("toggle"), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle" } }, function(a, b) { ea.fn[a] = function(a, c, d) { return this.animate(b, a, c, d) } }), ea.timers = [], ea.fx.tick = function() { var a, b = ea.timers,
                    c = 0; for (nb = ea.now(); c < b.length; c++) a = b[c], a() || b[c] !== a || b.splice(c--, 1);
                b.length || ea.fx.stop(), nb = void 0 }, ea.fx.timer = function(a) { ea.timers.push(a), a() ? ea.fx.start() : ea.timers.pop() }, ea.fx.interval = 13, ea.fx.start = function() { ob || (ob = setInterval(ea.fx.tick, ea.fx.interval)) }, ea.fx.stop = function() { clearInterval(ob), ob = null }, ea.fx.speeds = { slow: 600, fast: 200, _default: 400 }, ea.fn.delay = function(a, b) { return a = ea.fx ? ea.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function(b, c) { var d = setTimeout(b, a);
                    c.stop = function() { clearTimeout(d) } }) },
            function() { var a, b, c, d, e;
                b = oa.createElement("div"), b.setAttribute("className", "t"), b.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", d = b.getElementsByTagName("a")[0], c = oa.createElement("select"), e = c.appendChild(oa.createElement("option")), a = b.getElementsByTagName("input")[0], d.style.cssText = "top:1px", ca.getSetAttribute = "t" !== b.className, ca.style = /top/.test(d.getAttribute("style")), ca.hrefNormalized = "/a" === d.getAttribute("href"), ca.checkOn = !!a.value, ca.optSelected = e.selected, ca.enctype = !!oa.createElement("form").enctype, c.disabled = !0, ca.optDisabled = !e.disabled, a = oa.createElement("input"), a.setAttribute("value", ""), ca.input = "" === a.getAttribute("value"), a.value = "t", a.setAttribute("type", "radio"), ca.radioValue = "t" === a.value }();
        var ub = /\r/g;
        ea.fn.extend({ val: function(a) { var b, c, d, e = this[0]; return arguments.length ? (d = ea.isFunction(a), this.each(function(c) { var e;
                    1 === this.nodeType && (e = d ? a.call(this, c, ea(this).val()) : a, null == e ? e = "" : "number" == typeof e ? e += "" : ea.isArray(e) && (e = ea.map(e, function(a) { return null == a ? "" : a + "" })), b = ea.valHooks[this.type] || ea.valHooks[this.nodeName.toLowerCase()], b && "set" in b && void 0 !== b.set(this, e, "value") || (this.value = e)) })) : e ? (b = ea.valHooks[e.type] || ea.valHooks[e.nodeName.toLowerCase()], b && "get" in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value, "string" == typeof c ? c.replace(ub, "") : null == c ? "" : c)) : void 0 } }), ea.extend({ valHooks: { option: { get: function(a) { var b = ea.find.attr(a, "value"); return null != b ? b : ea.trim(ea.text(a)) } }, select: { get: function(a) { for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || 0 > e, g = f ? null : [], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++)
                            if (c = d[i], !(!c.selected && i !== e || (ca.optDisabled ? c.disabled : null !== c.getAttribute("disabled")) || c.parentNode.disabled && ea.nodeName(c.parentNode, "optgroup"))) { if (b = ea(c).val(), f) return b;
                                g.push(b) }
                        return g }, set: function(a, b) { for (var c, d, e = a.options, f = ea.makeArray(b), g = e.length; g--;)
                            if (d = e[g], ea.inArray(ea.valHooks.option.get(d), f) >= 0) try { d.selected = c = !0 } catch (h) { d.scrollHeight } else d.selected = !1; return c || (a.selectedIndex = -1), e } } } }), ea.each(["radio", "checkbox"], function() { ea.valHooks[this] = { set: function(a, b) { return ea.isArray(b) ? a.checked = ea.inArray(ea(a).val(), b) >= 0 : void 0 } }, ca.checkOn || (ea.valHooks[this].get = function(a) { return null === a.getAttribute("value") ? "on" : a.value }) });
        var vb, wb, xb = ea.expr.attrHandle,
            yb = /^(?:checked|selected)$/i,
            zb = ca.getSetAttribute,
            Ab = ca.input;
        ea.fn.extend({ attr: function(a, b) { return Da(this, ea.attr, a, b, arguments.length > 1) }, removeAttr: function(a) { return this.each(function() { ea.removeAttr(this, a) }) } }), ea.extend({ attr: function(a, b, c) { var d, e, f = a.nodeType; if (a && 3 !== f && 8 !== f && 2 !== f) return typeof a.getAttribute === xa ? ea.prop(a, b, c) : (1 === f && ea.isXMLDoc(a) || (b = b.toLowerCase(), d = ea.attrHooks[b] || (ea.expr.match.bool.test(b) ? wb : vb)), void 0 === c ? d && "get" in d && null !== (e = d.get(a, b)) ? e : (e = ea.find.attr(a, b), null == e ? void 0 : e) : null !== c ? d && "set" in d && void 0 !== (e = d.set(a, c, b)) ? e : (a.setAttribute(b, c + ""), c) : void ea.removeAttr(a, b)) }, removeAttr: function(a, b) { var c, d, e = 0,
                    f = b && b.match(ta); if (f && 1 === a.nodeType)
                    for (; c = f[e++];) d = ea.propFix[c] || c, ea.expr.match.bool.test(c) ? Ab && zb || !yb.test(c) ? a[d] = !1 : a[ea.camelCase("default-" + c)] = a[d] = !1 : ea.attr(a, c, ""), a.removeAttribute(zb ? c : d) }, attrHooks: { type: { set: function(a, b) { if (!ca.radioValue && "radio" === b && ea.nodeName(a, "input")) { var c = a.value; return a.setAttribute("type", b), c && (a.value = c), b } } } } }), wb = { set: function(a, b, c) { return b === !1 ? ea.removeAttr(a, c) : Ab && zb || !yb.test(c) ? a.setAttribute(!zb && ea.propFix[c] || c, c) : a[ea.camelCase("default-" + c)] = a[c] = !0, c } }, ea.each(ea.expr.match.bool.source.match(/\w+/g), function(a, b) { var c = xb[b] || ea.find.attr;
            xb[b] = Ab && zb || !yb.test(b) ? function(a, b, d) { var e, f; return d || (f = xb[b], xb[b] = e, e = null != c(a, b, d) ? b.toLowerCase() : null, xb[b] = f), e } : function(a, b, c) { return c ? void 0 : a[ea.camelCase("default-" + b)] ? b.toLowerCase() : null } }), Ab && zb || (ea.attrHooks.value = { set: function(a, b, c) { return ea.nodeName(a, "input") ? void(a.defaultValue = b) : vb && vb.set(a, b, c) } }), zb || (vb = { set: function(a, b, c) { var d = a.getAttributeNode(c); return d || a.setAttributeNode(d = a.ownerDocument.createAttribute(c)), d.value = b += "", "value" === c || b === a.getAttribute(c) ? b : void 0 } }, xb.id = xb.name = xb.coords = function(a, b, c) { var d; return c ? void 0 : (d = a.getAttributeNode(b)) && "" !== d.value ? d.value : null }, ea.valHooks.button = { get: function(a, b) { var c = a.getAttributeNode(b); return c && c.specified ? c.value : void 0 }, set: vb.set }, ea.attrHooks.contenteditable = { set: function(a, b, c) { vb.set(a, "" !== b && b, c) } }, ea.each(["width", "height"], function(a, b) { ea.attrHooks[b] = { set: function(a, c) { return "" === c ? (a.setAttribute(b, "auto"), c) : void 0 } } })), ca.style || (ea.attrHooks.style = { get: function(a) { return a.style.cssText || void 0 }, set: function(a, b) { return a.style.cssText = b + "" } });
        var Bb = /^(?:input|select|textarea|button|object)$/i,
            Cb = /^(?:a|area)$/i;
        ea.fn.extend({ prop: function(a, b) { return Da(this, ea.prop, a, b, arguments.length > 1) }, removeProp: function(a) { return a = ea.propFix[a] || a, this.each(function() { try { this[a] = void 0, delete this[a] } catch (b) {} }) } }), ea.extend({ propFix: { "for": "htmlFor", "class": "className" }, prop: function(a, b, c) { var d, e, f, g = a.nodeType; if (a && 3 !== g && 8 !== g && 2 !== g) return f = 1 !== g || !ea.isXMLDoc(a), f && (b = ea.propFix[b] || b, e = ea.propHooks[b]), void 0 !== c ? e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get" in e && null !== (d = e.get(a, b)) ? d : a[b] }, propHooks: { tabIndex: { get: function(a) { var b = ea.find.attr(a, "tabindex"); return b ? parseInt(b, 10) : Bb.test(a.nodeName) || Cb.test(a.nodeName) && a.href ? 0 : -1 } } } }), ca.hrefNormalized || ea.each(["href", "src"], function(a, b) { ea.propHooks[b] = { get: function(a) { return a.getAttribute(b, 4) } } }), ca.optSelected || (ea.propHooks.selected = { get: function(a) { var b = a.parentNode; return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null } }), ea.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() { ea.propFix[this.toLowerCase()] = this }), ca.enctype || (ea.propFix.enctype = "encoding");
        var Db = /[\t\r\n\f]/g;
        ea.fn.extend({ addClass: function(a) { var b, c, d, e, f, g, h = 0,
                    i = this.length,
                    j = "string" == typeof a && a; if (ea.isFunction(a)) return this.each(function(b) { ea(this).addClass(a.call(this, b, this.className)) }); if (j)
                    for (b = (a || "").match(ta) || []; i > h; h++)
                        if (c = this[h], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(Db, " ") : " ")) { for (f = 0; e = b[f++];) d.indexOf(" " + e + " ") < 0 && (d += e + " ");
                            g = ea.trim(d), c.className !== g && (c.className = g) }
                return this }, removeClass: function(a) { var b, c, d, e, f, g, h = 0,
                    i = this.length,
                    j = 0 === arguments.length || "string" == typeof a && a; if (ea.isFunction(a)) return this.each(function(b) { ea(this).removeClass(a.call(this, b, this.className)) }); if (j)
                    for (b = (a || "").match(ta) || []; i > h; h++)
                        if (c = this[h], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(Db, " ") : "")) { for (f = 0; e = b[f++];)
                                for (; d.indexOf(" " + e + " ") >= 0;) d = d.replace(" " + e + " ", " ");
                            g = a ? ea.trim(d) : "", c.className !== g && (c.className = g) }
                return this }, toggleClass: function(a, b) { var c = typeof a; return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : this.each(ea.isFunction(a) ? function(c) { ea(this).toggleClass(a.call(this, c, this.className, b), b) } : function() { if ("string" === c)
                        for (var b, d = 0, e = ea(this), f = a.match(ta) || []; b = f[d++];) e.hasClass(b) ? e.removeClass(b) : e.addClass(b);
                    else(c === xa || "boolean" === c) && (this.className && ea._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : ea._data(this, "__className__") || "") }) }, hasClass: function(a) { for (var b = " " + a + " ", c = 0, d = this.length; d > c; c++)
                    if (1 === this[c].nodeType && (" " + this[c].className + " ").replace(Db, " ").indexOf(b) >= 0) return !0; return !1 } }), ea.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, b) { ea.fn[b] = function(a, c) { return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b) } }), ea.fn.extend({ hover: function(a, b) { return this.mouseenter(a).mouseleave(b || a) }, bind: function(a, b, c) { return this.on(a, null, b, c) }, unbind: function(a, b) { return this.off(a, null, b) }, delegate: function(a, b, c, d) { return this.on(b, a, c, d) }, undelegate: function(a, b, c) { return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c) } });
        var Eb = ea.now(),
            Fb = /\?/,
            Gb = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
        ea.parseJSON = function(b) { if (a.JSON && a.JSON.parse) return a.JSON.parse(b + ""); var c, d = null,
                e = ea.trim(b + ""); return e && !ea.trim(e.replace(Gb, function(a, b, e, f) { return c && b && (d = 0), 0 === d ? a : (c = e || b, d += !f - !e, "") })) ? Function("return " + e)() : ea.error("Invalid JSON: " + b) }, ea.parseXML = function(b) { var c, d; if (!b || "string" != typeof b) return null; try { a.DOMParser ? (d = new DOMParser, c = d.parseFromString(b, "text/xml")) : (c = new ActiveXObject("Microsoft.XMLDOM"), c.async = "false", c.loadXML(b)) } catch (e) { c = void 0 } return c && c.documentElement && !c.getElementsByTagName("parsererror").length || ea.error("Invalid XML: " + b), c };
        var Hb, Ib, Jb = /#.*$/,
            Kb = /([?&])_=[^&]*/,
            Lb = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
            Mb = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
            Nb = /^(?:GET|HEAD)$/,
            Ob = /^\/\//,
            Pb = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
            Qb = {},
            Rb = {},
            Sb = "*/".concat("*");
        try { Ib = location.href } catch (Tb) { Ib = oa.createElement("a"), Ib.href = "", Ib = Ib.href } Hb = Pb.exec(Ib.toLowerCase()) || [], ea.extend({ active: 0, lastModified: {}, etag: {}, ajaxSettings: { url: Ib, type: "GET", isLocal: Mb.test(Hb[1]), global: !0, processData: !0, async: !0, contentType: "application/x-www-form-urlencoded; charset=UTF-8", accepts: { "*": Sb, text: "text/plain", html: "text/html", xml: "application/xml, text/xml", json: "application/json, text/javascript" }, contents: { xml: /xml/, html: /html/, json: /json/ }, responseFields: { xml: "responseXML", text: "responseText", json: "responseJSON" }, converters: { "* text": String, "text html": !0, "text json": ea.parseJSON, "text xml": ea.parseXML }, flatOptions: { url: !0, context: !0 } }, ajaxSetup: function(a, b) { return b ? P(P(a, ea.ajaxSettings), b) : P(ea.ajaxSettings, a) }, ajaxPrefilter: N(Qb), ajaxTransport: N(Rb), ajax: function(a, b) {
                function c(a, b, c, d) { var e, k, r, s, u, w = b;
                    2 !== t && (t = 2, h && clearTimeout(h), j = void 0, g = d || "", v.readyState = a > 0 ? 4 : 0, e = a >= 200 && 300 > a || 304 === a, c && (s = Q(l, v, c)), s = R(l, s, v, e), e ? (l.ifModified && (u = v.getResponseHeader("Last-Modified"), u && (ea.lastModified[f] = u), u = v.getResponseHeader("etag"), u && (ea.etag[f] = u)), 204 === a || "HEAD" === l.type ? w = "nocontent" : 304 === a ? w = "notmodified" : (w = s.state, k = s.data, r = s.error, e = !r)) : (r = w, (a || !w) && (w = "error", 0 > a && (a = 0))), v.status = a, v.statusText = (b || w) + "", e ? o.resolveWith(m, [k, w, v]) : o.rejectWith(m, [v, w, r]), v.statusCode(q), q = void 0, i && n.trigger(e ? "ajaxSuccess" : "ajaxError", [v, l, e ? k : r]), p.fireWith(m, [v, w]), i && (n.trigger("ajaxComplete", [v, l]), --ea.active || ea.event.trigger("ajaxStop"))) } "object" == typeof a && (b = a, a = void 0), b = b || {}; var d, e, f, g, h, i, j, k, l = ea.ajaxSetup({}, b),
                    m = l.context || l,
                    n = l.context && (m.nodeType || m.jquery) ? ea(m) : ea.event,
                    o = ea.Deferred(),
                    p = ea.Callbacks("once memory"),
                    q = l.statusCode || {},
                    r = {},
                    s = {},
                    t = 0,
                    u = "canceled",
                    v = { readyState: 0, getResponseHeader: function(a) { var b; if (2 === t) { if (!k)
                                    for (k = {}; b = Lb.exec(g);) k[b[1].toLowerCase()] = b[2];
                                b = k[a.toLowerCase()] } return null == b ? null : b }, getAllResponseHeaders: function() { return 2 === t ? g : null }, setRequestHeader: function(a, b) { var c = a.toLowerCase(); return t || (a = s[c] = s[c] || a, r[a] = b), this }, overrideMimeType: function(a) { return t || (l.mimeType = a), this }, statusCode: function(a) { var b; if (a)
                                if (2 > t)
                                    for (b in a) q[b] = [q[b], a[b]];
                                else v.always(a[v.status]); return this }, abort: function(a) { var b = a || u; return j && j.abort(b), c(0, b), this } }; if (o.promise(v).complete = p.add, v.success = v.done, v.error = v.fail, l.url = ((a || l.url || Ib) + "").replace(Jb, "").replace(Ob, Hb[1] + "//"), l.type = b.method || b.type || l.method || l.type, l.dataTypes = ea.trim(l.dataType || "*").toLowerCase().match(ta) || [""], null == l.crossDomain && (d = Pb.exec(l.url.toLowerCase()), l.crossDomain = !(!d || d[1] === Hb[1] && d[2] === Hb[2] && (d[3] || ("http:" === d[1] ? "80" : "443")) === (Hb[3] || ("http:" === Hb[1] ? "80" : "443")))), l.data && l.processData && "string" != typeof l.data && (l.data = ea.param(l.data, l.traditional)), O(Qb, l, b, v), 2 === t) return v;
                i = l.global, i && 0 === ea.active++ && ea.event.trigger("ajaxStart"), l.type = l.type.toUpperCase(), l.hasContent = !Nb.test(l.type), f = l.url, l.hasContent || (l.data && (f = l.url += (Fb.test(f) ? "&" : "?") + l.data, delete l.data), l.cache === !1 && (l.url = Kb.test(f) ? f.replace(Kb, "$1_=" + Eb++) : f + (Fb.test(f) ? "&" : "?") + "_=" + Eb++)), l.ifModified && (ea.lastModified[f] && v.setRequestHeader("If-Modified-Since", ea.lastModified[f]), ea.etag[f] && v.setRequestHeader("If-None-Match", ea.etag[f])), (l.data && l.hasContent && l.contentType !== !1 || b.contentType) && v.setRequestHeader("Content-Type", l.contentType), v.setRequestHeader("Accept", l.dataTypes[0] && l.accepts[l.dataTypes[0]] ? l.accepts[l.dataTypes[0]] + ("*" !== l.dataTypes[0] ? ", " + Sb + "; q=0.01" : "") : l.accepts["*"]); for (e in l.headers) v.setRequestHeader(e, l.headers[e]); if (l.beforeSend && (l.beforeSend.call(m, v, l) === !1 || 2 === t)) return v.abort();
                u = "abort"; for (e in { success: 1, error: 1, complete: 1 }) v[e](l[e]); if (j = O(Rb, l, b, v)) { v.readyState = 1, i && n.trigger("ajaxSend", [v, l]), l.async && l.timeout > 0 && (h = setTimeout(function() { v.abort("timeout") }, l.timeout)); try { t = 1, j.send(r, c) } catch (w) { if (!(2 > t)) throw w;
                        c(-1, w) } } else c(-1, "No Transport"); return v }, getJSON: function(a, b, c) { return ea.get(a, b, c, "json") }, getScript: function(a, b) { return ea.get(a, void 0, b, "script") } }), ea.each(["get", "post"], function(a, b) { ea[b] = function(a, c, d, e) { return ea.isFunction(c) && (e = e || d, d = c, c = void 0), ea.ajax({ url: a, type: b, dataType: e, data: c, success: d }) } }), ea.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(a, b) { ea.fn[b] = function(a) { return this.on(b, a) } }), ea._evalUrl = function(a) { return ea.ajax({ url: a, type: "GET", dataType: "script", async: !1, global: !1, "throws": !0 }) }, ea.fn.extend({ wrapAll: function(a) { if (ea.isFunction(a)) return this.each(function(b) { ea(this).wrapAll(a.call(this, b)) }); if (this[0]) { var b = ea(a, this[0].ownerDocument).eq(0).clone(!0);
                    this[0].parentNode && b.insertBefore(this[0]), b.map(function() { for (var a = this; a.firstChild && 1 === a.firstChild.nodeType;) a = a.firstChild; return a }).append(this) } return this }, wrapInner: function(a) { return this.each(ea.isFunction(a) ? function(b) { ea(this).wrapInner(a.call(this, b)) } : function() { var b = ea(this),
                        c = b.contents();
                    c.length ? c.wrapAll(a) : b.append(a) }) }, wrap: function(a) { var b = ea.isFunction(a); return this.each(function(c) { ea(this).wrapAll(b ? a.call(this, c) : a) }) }, unwrap: function() { return this.parent().each(function() { ea.nodeName(this, "body") || ea(this).replaceWith(this.childNodes) }).end() } }), ea.expr.filters.hidden = function(a) { return a.offsetWidth <= 0 && a.offsetHeight <= 0 || !ca.reliableHiddenOffsets() && "none" === (a.style && a.style.display || ea.css(a, "display")) }, ea.expr.filters.visible = function(a) { return !ea.expr.filters.hidden(a) };
        var Ub = /%20/g,
            Vb = /\[\]$/,
            Wb = /\r?\n/g,
            Xb = /^(?:submit|button|image|reset|file)$/i,
            Yb = /^(?:input|select|textarea|keygen)/i;
        ea.param = function(a, b) { var c, d = [],
                e = function(a, b) { b = ea.isFunction(b) ? b() : null == b ? "" : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b) }; if (void 0 === b && (b = ea.ajaxSettings && ea.ajaxSettings.traditional), ea.isArray(a) || a.jquery && !ea.isPlainObject(a)) ea.each(a, function() { e(this.name, this.value) });
            else
                for (c in a) S(c, a[c], b, e); return d.join("&").replace(Ub, "+") }, ea.fn.extend({ serialize: function() { return ea.param(this.serializeArray()) }, serializeArray: function() { return this.map(function() { var a = ea.prop(this, "elements"); return a ? ea.makeArray(a) : this }).filter(function() { var a = this.type; return this.name && !ea(this).is(":disabled") && Yb.test(this.nodeName) && !Xb.test(a) && (this.checked || !Ea.test(a)) }).map(function(a, b) { var c = ea(this).val(); return null == c ? null : ea.isArray(c) ? ea.map(c, function(a) { return { name: b.name, value: a.replace(Wb, "\r\n") } }) : { name: b.name, value: c.replace(Wb, "\r\n") } }).get() } }), ea.ajaxSettings.xhr = void 0 !== a.ActiveXObject ? function() { return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && T() || U() } : T;
        var Zb = 0,
            $b = {},
            _b = ea.ajaxSettings.xhr();
        a.ActiveXObject && ea(a).on("unload", function() { for (var a in $b) $b[a](void 0, !0) }), ca.cors = !!_b && "withCredentials" in _b, _b = ca.ajax = !!_b, _b && ea.ajaxTransport(function(a) { if (!a.crossDomain || ca.cors) { var b; return { send: function(c, d) { var e, f = a.xhr(),
                            g = ++Zb; if (f.open(a.type, a.url, a.async, a.username, a.password), a.xhrFields)
                            for (e in a.xhrFields) f[e] = a.xhrFields[e];
                        a.mimeType && f.overrideMimeType && f.overrideMimeType(a.mimeType), a.crossDomain || c["X-Requested-With"] || (c["X-Requested-With"] = "XMLHttpRequest"); for (e in c) void 0 !== c[e] && f.setRequestHeader(e, c[e] + "");
                        f.send(a.hasContent && a.data || null), b = function(c, e) { var h, i, j; if (b && (e || 4 === f.readyState))
                                if (delete $b[g], b = void 0, f.onreadystatechange = ea.noop, e) 4 !== f.readyState && f.abort();
                                else { j = {}, h = f.status, "string" == typeof f.responseText && (j.text = f.responseText); try { i = f.statusText } catch (k) { i = "" } h || !a.isLocal || a.crossDomain ? 1223 === h && (h = 204) : h = j.text ? 200 : 404 }
                            j && d(h, i, j, f.getAllResponseHeaders()) }, a.async ? 4 === f.readyState ? setTimeout(b) : f.onreadystatechange = $b[g] = b : b() }, abort: function() { b && b(void 0, !0) } } } }), ea.ajaxSetup({ accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" }, contents: { script: /(?:java|ecma)script/ }, converters: { "text script": function(a) { return ea.globalEval(a), a } } }), ea.ajaxPrefilter("script", function(a) { void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1) }), ea.ajaxTransport("script", function(a) { if (a.crossDomain) { var b, c = oa.head || ea("head")[0] || oa.documentElement; return { send: function(d, e) { b = oa.createElement("script"), b.async = !0, a.scriptCharset && (b.charset = a.scriptCharset), b.src = a.url, b.onload = b.onreadystatechange = function(a, c) {
                            (c || !b.readyState || /loaded|complete/.test(b.readyState)) && (b.onload = b.onreadystatechange = null, b.parentNode && b.parentNode.removeChild(b), b = null, c || e(200, "success")) }, c.insertBefore(b, c.firstChild) }, abort: function() { b && b.onload(void 0, !0) } } } });
        var ac = [],
            bc = /(=)\?(?=&|$)|\?\?/;
        ea.ajaxSetup({ jsonp: "callback", jsonpCallback: function() { var a = ac.pop() || ea.expando + "_" + Eb++; return this[a] = !0, a } }), ea.ajaxPrefilter("json jsonp", function(b, c, d) { var e, f, g, h = b.jsonp !== !1 && (bc.test(b.url) ? "url" : "string" == typeof b.data && !(b.contentType || "").indexOf("application/x-www-form-urlencoded") && bc.test(b.data) && "data"); return h || "jsonp" === b.dataTypes[0] ? (e = b.jsonpCallback = ea.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, h ? b[h] = b[h].replace(bc, "$1" + e) : b.jsonp !== !1 && (b.url += (Fb.test(b.url) ? "&" : "?") + b.jsonp + "=" + e), b.converters["script json"] = function() { return g || ea.error(e + " was not called"), g[0] }, b.dataTypes[0] = "json", f = a[e], a[e] = function() { g = arguments }, d.always(function() { a[e] = f, b[e] && (b.jsonpCallback = c.jsonpCallback, ac.push(e)), g && ea.isFunction(f) && f(g[0]), g = f = void 0 }), "script") : void 0 }), ea.parseHTML = function(a, b, c) { if (!a || "string" != typeof a) return null; "boolean" == typeof b && (c = b, b = !1), b = b || oa; var d = la.exec(a),
                e = !c && []; return d ? [b.createElement(d[1])] : (d = ea.buildFragment([a], b, e), e && e.length && ea(e).remove(), ea.merge([], d.childNodes)) };
        var cc = ea.fn.load;
        ea.fn.load = function(a, b, c) { if ("string" != typeof a && cc) return cc.apply(this, arguments); var d, e, f, g = this,
                h = a.indexOf(" "); return h >= 0 && (d = ea.trim(a.slice(h, a.length)), a = a.slice(0, h)), ea.isFunction(b) ? (c = b, b = void 0) : b && "object" == typeof b && (f = "POST"), g.length > 0 && ea.ajax({ url: a, type: f, dataType: "html", data: b }).done(function(a) { e = arguments, g.html(d ? ea("<div>").append(ea.parseHTML(a)).find(d) : a) }).complete(c && function(a, b) { g.each(c, e || [a.responseText, b, a]) }), this }, ea.expr.filters.animated = function(a) { return ea.grep(ea.timers, function(b) { return a === b.elem }).length };
        var dc = a.document.documentElement;
        ea.offset = { setOffset: function(a, b, c) { var d, e, f, g, h, i, j, k = ea.css(a, "position"),
                    l = ea(a),
                    m = {}; "static" === k && (a.style.position = "relative"), h = l.offset(), f = ea.css(a, "top"), i = ea.css(a, "left"), j = ("absolute" === k || "fixed" === k) && ea.inArray("auto", [f, i]) > -1, j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0), ea.isFunction(b) && (b = b.call(a, c, h)), null != b.top && (m.top = b.top - h.top + g), null != b.left && (m.left = b.left - h.left + e), "using" in b ? b.using.call(a, m) : l.css(m) } }, ea.fn.extend({ offset: function(a) { if (arguments.length) return void 0 === a ? this : this.each(function(b) { ea.offset.setOffset(this, a, b) }); var b, c, d = { top: 0, left: 0 },
                    e = this[0],
                    f = e && e.ownerDocument; return f ? (b = f.documentElement, ea.contains(b, e) ? (typeof e.getBoundingClientRect !== xa && (d = e.getBoundingClientRect()), c = V(f), { top: d.top + (c.pageYOffset || b.scrollTop) - (b.clientTop || 0), left: d.left + (c.pageXOffset || b.scrollLeft) - (b.clientLeft || 0) }) : d) : void 0 }, position: function() { if (this[0]) { var a, b, c = { top: 0, left: 0 },
                        d = this[0]; return "fixed" === ea.css(d, "position") ? b = d.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), ea.nodeName(a[0], "html") || (c = a.offset()), c.top += ea.css(a[0], "borderTopWidth", !0), c.left += ea.css(a[0], "borderLeftWidth", !0)), { top: b.top - c.top - ea.css(d, "marginTop", !0), left: b.left - c.left - ea.css(d, "marginLeft", !0) } } }, offsetParent: function() { return this.map(function() { for (var a = this.offsetParent || dc; a && !ea.nodeName(a, "html") && "static" === ea.css(a, "position");) a = a.offsetParent; return a || dc }) } }), ea.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function(a, b) { var c = /Y/.test(b);
            ea.fn[a] = function(d) { return Da(this, function(a, d, e) { var f = V(a); return void 0 === e ? f ? b in f ? f[b] : f.document.documentElement[d] : a[d] : void(f ? f.scrollTo(c ? ea(f).scrollLeft() : e, c ? e : ea(f).scrollTop()) : a[d] = e) }, a, d, arguments.length, null) } }), ea.each(["top", "left"], function(a, b) { ea.cssHooks[b] = A(ca.pixelPosition, function(a, c) { return c ? (c = bb(a, b), db.test(c) ? ea(a).position()[b] + "px" : c) : void 0 }) }), ea.each({ Height: "height", Width: "width" }, function(a, b) { ea.each({ padding: "inner" + a, content: b, "": "outer" + a }, function(c, d) { ea.fn[d] = function(d, e) { var f = arguments.length && (c || "boolean" != typeof d),
                        g = c || (d === !0 || e === !0 ? "margin" : "border"); return Da(this, function(b, c, d) { var e; return ea.isWindow(b) ? b.document.documentElement["client" + a] : 9 === b.nodeType ? (e = b.documentElement, Math.max(b.body["scroll" + a], e["scroll" + a], b.body["offset" + a], e["offset" + a], e["client" + a])) : void 0 === d ? ea.css(b, c, g) : ea.style(b, c, d, g) }, b, f ? d : void 0, f, null) } }) }), ea.fn.size = function() { return this.length }, ea.fn.andSelf = ea.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() { return ea });
        var ec = a.jQuery,
            fc = a.$;
        return ea.noConflict = function(b) { return a.$ === ea && (a.$ = fc), b && a.jQuery === ea && (a.jQuery = ec), ea }, typeof b === xa && (a.jQuery = a.$ = ea), ea
    }),
    function(a, b, c, d, e) {
        function f(b) { b = b.split(")"); var c, e, f, g = a.trim,
                h = -1,
                i = b.length - 1,
                j = x ? new Float32Array(6) : [],
                k = x ? new Float32Array(6) : [],
                l = x ? new Float32Array(6) : [1, 0, 0, 1, 0, 0]; for (j[0] = j[3] = l[0] = l[3] = 1, j[1] = j[2] = j[4] = j[5] = 0; ++h < i;) { switch (c = b[h].split("("), e = g(c[0]), f = c[1], k[0] = k[3] = 1, k[1] = k[2] = k[4] = k[5] = 0, e) {
                    case C + "X":
                        k[4] = parseInt(f, 10); break;
                    case C + "Y":
                        k[5] = parseInt(f, 10); break;
                    case C:
                        f = f.split(","), k[4] = parseInt(f[0], 10), k[5] = parseInt(f[1] || 0, 10); break;
                    case D:
                        f = m(f), k[0] = d.cos(f), k[1] = d.sin(f), k[2] = -d.sin(f), k[3] = d.cos(f); break;
                    case E + "X":
                        k[0] = +f; break;
                    case E + "Y":
                        k[3] = f; break;
                    case E:
                        f = f.split(","), k[0] = f[0], k[3] = f.length > 1 ? f[1] : f[0]; break;
                    case F + "X":
                        k[2] = d.tan(m(f)); break;
                    case F + "Y":
                        k[1] = d.tan(m(f)); break;
                    case G:
                        f = f.split(","), k[0] = f[0], k[1] = f[1], k[2] = f[2], k[3] = f[3], k[4] = parseInt(f[4], 10), k[5] = parseInt(f[5], 10) } l[0] = j[0] * k[0] + j[2] * k[1], l[1] = j[1] * k[0] + j[3] * k[1], l[2] = j[0] * k[2] + j[2] * k[3], l[3] = j[1] * k[2] + j[3] * k[3], l[4] = j[0] * k[4] + j[2] * k[5] + j[4], l[5] = j[1] * k[4] + j[3] * k[5] + j[5], j = [l[0], l[1], l[2], l[3], l[4], l[5]] } return l }

        function g(a) { var b, c, e, f = a[0],
                g = a[1],
                h = a[2],
                i = a[3]; return f * i - g * h ? (b = d.sqrt(f * f + g * g), f /= b, g /= b, e = f * h + g * i, h -= f * e, i -= g * e, c = d.sqrt(h * h + i * i), h /= c, i /= c, e /= c, f * i < g * h && (f = -f, g = -g, e = -e, b = -b)) : b = c = e = 0, [
                [C, [+a[4], +a[5]]],
                [D, d.atan2(g, f)],
                [F + "X", d.atan(e)],
                [E, [b, c]]
            ] }

        function h(b, c) { var d, e, h, m, o = { start: [], end: [] },
                p = -1; if (("none" == b || j(b)) && (b = ""), ("none" == c || j(c)) && (c = ""), b && c && !c.indexOf("matrix") && n(b).join() == n(c.split(")")[0]).join() && (o.origin = b, b = "", c = c.slice(c.indexOf(")") + 1)), b || c) { if (b && c && k(b) != k(c)) o.start = g(f(b)), o.end = g(f(c));
                else
                    for (b && (b = b.split(")")) && (d = b.length), c && (c = c.split(")")) && (d = c.length); ++p < d - 1;) b[p] && (e = b[p].split("(")), c[p] && (h = c[p].split("(")), m = a.trim((e || h)[0]), l(o.start, i(m, e ? e[1] : 0)), l(o.end, i(m, h ? h[1] : 0)); return o } }

        function i(a, b) { var c, d = +!a.indexOf(E),
                e = a.replace(/e[XY]/, "e"); switch (a) {
                case C + "Y":
                case E + "Y":
                    b = [d, b ? parseFloat(b) : d]; break;
                case C + "X":
                case C:
                case E + "X":
                    c = 1;
                case E:
                    b = b ? (b = b.split(",")) && [parseFloat(b[0]), parseFloat(b.length > 1 ? b[1] : a == E ? c || b[0] : d + "")] : [d, d]; break;
                case F + "X":
                case F + "Y":
                case D:
                    b = b ? m(b) : 0; break;
                case G:
                    return g(b ? n(b) : [1, 0, 0, 1, 0, 0]) } return [
                [e, b]
            ] }

        function j(a) { return z.test(a) }

        function k(a) { return a.replace(/(?:\([^)]*\))|\s/g, "") }

        function l(a, b, c) { for (; c = b.shift();) a.push(c) }

        function m(a) { return ~a.indexOf("deg") ? parseInt(a, 10) * (2 * d.PI / 360) : ~a.indexOf("grad") ? parseInt(a, 10) * (d.PI / 200) : parseFloat(a) }

        function n(a) { return a = /([^,]*),([^,]*),([^,]*),([^,]*),([^,p]*)(?:px)?,([^)p]*)(?:px)?/.exec(a), [a[1], a[2], a[3], a[4], a[5], a[6]] } for (var o, p, q, r, s = c.createElement("div"), t = s.style, u = "Transform", v = ["O" + u, "ms" + u, "Webkit" + u, "Moz" + u], w = v.length, x = ("Float32Array" in b), y = /Matrix([^)]*)/, z = /^\s*matrix\(\s*1\s*,\s*0\s*,\s*0\s*,\s*1\s*(?:,\s*0(?:px)?\s*){2}\)\s*$/, A = "transform", B = "transformOrigin", C = "translate", D = "rotate", E = "scale", F = "skew", G = "matrix"; w--;) v[w] in t && (a.support[A] = o = v[w], a.support[B] = o + "Origin");
        o || (a.support.matrixFilter = p = "" === t.filter), a.cssNumber[A] = a.cssNumber[B] = !0, o && o != A ? (a.cssProps[A] = o, a.cssProps[B] = o + "Origin", o == "Moz" + u ? q = { get: function(b, c) { return c ? a.css(b, o).split("px").join("") : b.style[o] }, set: function(a, b) { a.style[o] = /matrix\([^)p]*\)/.test(b) ? b.replace(/matrix((?:[^,]*,){4})([^,]*),([^)]*)/, G + "$1$2px,$3px") : b } } : /^1\.[0-5](?:\.|$)/.test(a.fn.jquery) && (q = { get: function(b, c) { return c ? a.css(b, o.replace(/^ms/, "Ms")) : b.style[o] } })) : p && (q = { get: function(b, c, d) { var f, g, h = c && b.currentStyle ? b.currentStyle : b.style; return h && y.test(h.filter) ? (f = RegExp.$1.split(","), f = [f[0].split("=")[1], f[2].split("=")[1], f[1].split("=")[1], f[3].split("=")[1]]) : f = [1, 0, 0, 1], a.cssHooks[B] ? (g = a._data(b, "transformTranslate", e), f[4] = g ? g[0] : 0, f[5] = g ? g[1] : 0) : (f[4] = h ? parseInt(h.left, 10) || 0 : 0, f[5] = h ? parseInt(h.top, 10) || 0 : 0), d ? f : G + "(" + f + ")" }, set: function(b, c, d) { var e, g, h, i, j = b.style;
                d || (j.zoom = 1), c = f(c), g = ["Matrix(M11=" + c[0], "M12=" + c[2], "M21=" + c[1], "M22=" + c[3], "SizingMethod='auto expand'"].join(), h = (e = b.currentStyle) && e.filter || j.filter || "", j.filter = y.test(h) ? h.replace(y, g) : h + " progid:DXImageTransform.Microsoft." + g + ")", a.cssHooks[B] ? a.cssHooks[B].set(b, c) : ((i = a.transform.centerOrigin) && (j["margin" == i ? "marginLeft" : "left"] = -(b.offsetWidth / 2) + b.clientWidth / 2 + "px", j["margin" == i ? "marginTop" : "top"] = -(b.offsetHeight / 2) + b.clientHeight / 2 + "px"), j.left = c[4] + "px", j.top = c[5] + "px") } }), q && (a.cssHooks[A] = q), r = q && q.get || a.css, a.fx.step.transform = function(b) { var c, e, f, g, i = b.elem,
                j = b.start,
                k = b.end,
                l = b.pos,
                m = "",
                n = 1e5; for (j && "string" != typeof j || (j || (j = r(i, o)), p && (i.style.zoom = 1), k = k.split("+=").join(j), a.extend(b, h(j, k)), j = b.start, k = b.end), c = j.length; c--;) switch (e = j[c], f = k[c], g = 0, e[0]) {
                case C:
                    g = "px";
                case E:
                    g || (g = ""), m = e[0] + "(" + d.round((e[1][0] + (f[1][0] - e[1][0]) * l) * n) / n + g + "," + d.round((e[1][1] + (f[1][1] - e[1][1]) * l) * n) / n + g + ")" + m; break;
                case F + "X":
                case F + "Y":
                case D:
                    m = e[0] + "(" + d.round((e[1] + (f[1] - e[1]) * l) * n) / n + "rad)" + m } b.origin && (m = b.origin + m), q && q.set ? q.set(i, m, 1) : i.style[o] = m }, a.transform = { centerOrigin: "margin" } }(jQuery, window, document, Math), $("#tinderslide").jTinder({ onDislike: function(a) { $("#status").html("Dislike image " + (a.index() + 1)) }, onLike: function(a) { $("#status").html("Like image " + (a.index() + 1)) }, animationRevertSpeed: 200, animationSpeed: 400, threshold: 1, likeSelector: ".like", dislikeSelector: ".dislike" }), $(".actions .like, .actions .dislike").click(function(a) { a.preventDefault(), $("#tinderslide").jTinder($(this).attr("class")) });