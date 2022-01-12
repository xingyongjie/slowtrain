!function(t, n) {
    "function" == typeof define && define.amd ? define(n) : "object" == typeof exports ? module.exports = n() : t.ScrollMagic = n()
}(this, function() {
    "use strict";
    var t = function() {
        a.log(2, "(COMPATIBILITY NOTICE) -> As of ScrollMagic 2.0.0 you need to use 'new ScrollMagic.Controller()' to create a new controller instance. Use 'new ScrollMagic.Scene()' to instance a scene.")
    };
    t.version = "2.0.5",
    window.addEventListener("mousewheel", function() {});
    var n = "data-scrollmagic-pin-spacer";
    t.Controller = function(e) {
        var s, o, l = "ScrollMagic.Controller", r = "FORWARD", p = "REVERSE", g = "PAUSED", d = i.defaults, c = this, m = a.extend({}, d, e), f = [], h = !1, x = 0, y = g, u = !0, v = 0, w = !0, b = function() {
            for (var n in m)
                d.hasOwnProperty(n) || (I(2, 'WARNING: Unknown option "' + n + '"'),
                delete m[n]);
            if (m.container = a.get.elements(m.container)[0],
            !m.container)
                throw I(1, "ERROR creating object " + l + ": No valid scroll container supplied"),
                l + " init failed.";
            u = m.container === window || m.container === document.body || !document.body.contains(m.container),
            u && (m.container = window),
            v = P(),
            m.container.addEventListener("resize", L),
            m.container.addEventListener("scroll", L),
            m.refreshInterval = parseInt(m.refreshInterval) || d.refreshInterval,
            T(),
            I(3, "added new " + l + " controller (v" + t.version + ")")
        }, T = function() {
            m.refreshInterval > 0 && (o = window.setTimeout(G, m.refreshInterval))
        }, A = function() {
            return m.vertical ? a.get.scrollTop(m.container) : a.get.scrollLeft(m.container)
        }, P = function() {
            return m.vertical ? a.get.height(m.container) : a.get.width(m.container)
        }, k = this._setScrollPos = function(t) {
            m.vertical ? u ? window.scrollTo(a.get.scrollLeft(), t) : m.container.scrollTop = t : u ? window.scrollTo(t, a.get.scrollTop()) : m.container.scrollLeft = t
        }
        , S = function() {
            if (w && h) {
                var t = a.type.Array(h) ? h : f.slice(0);
                h = !1;
                var n = x;
                x = c.scrollPos();
                var i = x - n;
                0 !== i && (y = i > 0 ? r : p),
                y === p && t.reverse(),
                t.forEach(function(n, i) {
                    I(3, "updating Scene " + (i + 1) + "/" + t.length + " (" + f.length + " total)"),
                    n.update(!0)
                }),
                0 === t.length && m.loglevel >= 3 && I(3, "updating 0 Scenes (nothing added to controller)")
            }
        }, R = function() {
            s = a.rAF(S)
        }, L = function(t) {
            I(3, "event fired causing an update:", t.type),
            "resize" == t.type && (v = P(),
            y = g),
            h !== !0 && (h = !0,
            R())
        }, G = function() {
            if (!u && v != P()) {
                var t;
                try {
                    t = new Event("resize",{
                        bubbles: !1,
                        cancelable: !1
                    })
                } catch (n) {
                    t = document.createEvent("Event"),
                    t.initEvent("resize", !1, !1)
                }
                m.container.dispatchEvent(t)
            }
            f.forEach(function(t, n) {
                t.refresh()
            }),
            T()
        }, I = this._log = function(t, n) {
            m.loglevel >= t && (Array.prototype.splice.call(arguments, 1, 0, "(" + l + ") ->"),
            a.log.apply(window, arguments))
        }
        ;
        this._options = m;
        var z = function(t) {
            if (t.length <= 1)
                return t;
            var n = t.slice(0);
            return n.sort(function(t, n) {
                return t.scrollOffset() > n.scrollOffset() ? 1 : -1
            }),
            n
        };
        return this.addScene = function(n) {
            if (a.type.Array(n))
                n.forEach(function(t, n) {
                    c.addScene(t)
                });
            else if (n instanceof t.Scene) {
                if (n.controller() !== c)
                    n.addTo(c);
                else if (f.indexOf(n) < 0) {
                    f.push(n),
                    f = z(f),
                    n.on("shift.controller_sort", function() {
                        f = z(f)
                    });
                    for (var i in m.globalSceneOptions)
                        n[i] && n[i].call(n, m.globalSceneOptions[i]);
                    I(3, "adding Scene (now " + f.length + " total)")
                }
            } else
                I(1, "ERROR: invalid argument supplied for '.addScene()'");
            return c
        }
        ,
        this.removeScene = function(t) {
            if (a.type.Array(t))
                t.forEach(function(t, n) {
                    c.removeScene(t)
                });
            else {
                var n = f.indexOf(t);
                n > -1 && (t.off("shift.controller_sort"),
                f.splice(n, 1),
                I(3, "removing Scene (now " + f.length + " left)"),
                t.remove())
            }
            return c
        }
        ,
        this.updateScene = function(n, i) {
            return a.type.Array(n) ? n.forEach(function(t, n) {
                c.updateScene(t, i)
            }) : i ? n.update(!0) : h !== !0 && n instanceof t.Scene && (h = h || [],
            h.indexOf(n) == -1 && h.push(n),
            h = z(h),
            R()),
            c
        }
        ,
        this.update = function(t) {
            return L({
                type: "resize"
            }),
            t && S(),
            c
        }
        ,
        this.scrollTo = function(i, e) {
            if (a.type.Number(i))
                k.call(m.container, i, e);
            else if (i instanceof t.Scene)
                i.controller() === c ? c.scrollTo(i.scrollOffset(), e) : I(2, "scrollTo(): The supplied scene does not belong to this controller. Scroll cancelled.", i);
            else if (a.type.Function(i))
                k = i;
            else {
                var s = a.get.elements(i)[0];
                if (s) {
                    for (; s.parentNode.hasAttribute(n); )
                        s = s.parentNode;
                    var o = m.vertical ? "top" : "left"
                      , l = a.get.offset(m.container)
                      , r = a.get.offset(s);
                    u || (l[o] -= c.scrollPos()),
                    c.scrollTo(r[o] - l[o], e)
                } else
                    I(2, "scrollTo(): The supplied argument is invalid. Scroll cancelled.", i)
            }
            return c
        }
        ,
        this.scrollPos = function(t) {
            return arguments.length ? (a.type.Function(t) ? A = t : I(2, "Provided value for method 'scrollPos' is not a function. To change the current scroll position use 'scrollTo()'."),
            c) : A.call(c)
        }
        ,
        this.info = function(t) {
            var n = {
                size: v,
                vertical: m.vertical,
                scrollPos: x,
                scrollDirection: y,
                container: m.container,
                isDocument: u
            };
            return arguments.length ? void 0 !== n[t] ? n[t] : void I(1, 'ERROR: option "' + t + '" is not available') : n
        }
        ,
        this.loglevel = function(t) {
            return arguments.length ? (m.loglevel != t && (m.loglevel = t),
            c) : m.loglevel
        }
        ,
        this.enabled = function(t) {
            return arguments.length ? (w != t && (w = !!t,
            c.updateScene(f, !0)),
            c) : w
        }
        ,
        this.destroy = function(t) {
            window.clearTimeout(o);
            for (var n = f.length; n--; )
                f[n].destroy(t);
            return m.container.removeEventListener("resize", L),
            m.container.removeEventListener("scroll", L),
            a.cAF(s),
            I(3, "destroyed " + l + " (reset: " + (t ? "true" : "false") + ")"),
            null
        }
        ,
        b(),
        c
    }
    ;
    var i = {
        defaults: {
            container: window,
            vertical: !0,
            globalSceneOptions: {},
            loglevel: 2,
            refreshInterval: 100
        }
    };
    t.Controller.addOption = function(t, n) {
        i.defaults[t] = n
    }
    ,
    t.Controller.extend = function(n) {
        var i = this;
        t.Controller = function() {
            return i.apply(this, arguments),
            this.$super = a.extend({}, this),
            n.apply(this, arguments) || this
        }
        ,
        a.extend(t.Controller, i),
        t.Controller.prototype = i.prototype,
        t.Controller.prototype.constructor = t.Controller
    }
    ,
    t.Scene = function(i) {
        var s, o, l = "ScrollMagic.Scene", r = "BEFORE", p = "DURING", g = "AFTER", d = e.defaults, c = this, m = a.extend({}, d, i), f = r, h = 0, x = {
            start: 0,
            end: 0
        }, y = 0, u = !0, v = function() {
            for (var t in m)
                d.hasOwnProperty(t) || (b(2, 'WARNING: Unknown option "' + t + '"'),
                delete m[t]);
            for (var n in d)
                G(n);
            R()
        }, w = {};
        this.on = function(t, n) {
            return a.type.Function(n) ? (t = t.trim().split(" "),
            t.forEach(function(t) {
                var i = t.split(".")
                  , e = i[0]
                  , a = i[1];
                "*" != e && (w[e] || (w[e] = []),
                w[e].push({
                    namespace: a || "",
                    callback: n
                }))
            })) : b(1, "ERROR when calling '.on()': Supplied callback for '" + t + "' is not a valid function!"),
            c
        }
        ,
        this.off = function(t, n) {
            return t ? (t = t.trim().split(" "),
            t.forEach(function(t, i) {
                var e = t.split(".")
                  , a = e[0]
                  , s = e[1] || ""
                  , o = "*" === a ? Object.keys(w) : [a];
                o.forEach(function(t) {
                    for (var i = w[t] || [], e = i.length; e--; ) {
                        var a = i[e];
                        !a || s !== a.namespace && "*" !== s || n && n != a.callback || i.splice(e, 1)
                    }
                    i.length || delete w[t]
                })
            }),
            c) : (b(1, "ERROR: Invalid event name supplied."),
            c)
        }
        ,
        this.trigger = function(n, i) {
            if (n) {
                var e = n.trim().split(".")
                  , a = e[0]
                  , s = e[1]
                  , o = w[a];
                b(3, "event fired:", a, i ? "->" : "", i || ""),
                o && o.forEach(function(n, e) {
                    s && s !== n.namespace || n.callback.call(c, new t.Event(a,n.namespace,c,i))
                })
            } else
                b(1, "ERROR: Invalid event name supplied.");
            return c
        }
        ,
        c.on("change.internal", function(t) {
            "loglevel" !== t.what && "tweenChanges" !== t.what && ("triggerElement" === t.what ? P() : "reverse" === t.what && c.update())
        }).on("shift.internal", function(t) {
            T(),
            c.update()
        });
        var b = this._log = function(t, n) {
            m.loglevel >= t && (Array.prototype.splice.call(arguments, 1, 0, "(" + l + ") ->"),
            a.log.apply(window, arguments))
        }
        ;
        this.addTo = function(n) {
            return n instanceof t.Controller ? o != n && (o && o.removeScene(c),
            o = n,
            R(),
            A(!0),
            P(!0),
            T(),
            o.info("container").addEventListener("resize", k),
            n.addScene(c),
            c.trigger("add", {
                controller: o
            }),
            b(3, "added " + l + " to controller"),
            c.update()) : b(1, "ERROR: supplied argument of 'addTo()' is not a valid ScrollMagic Controller"),
            c
        }
        ,
        this.enabled = function(t) {
            return arguments.length ? (u != t && (u = !!t,
            c.update(!0)),
            c) : u
        }
        ,
        this.remove = function() {
            if (o) {
                o.info("container").removeEventListener("resize", k);
                var t = o;
                o = void 0,
                t.removeScene(c),
                c.trigger("remove"),
                b(3, "removed " + l + " from controller")
            }
            return c
        }
        ,
        this.destroy = function(t) {
            return c.trigger("destroy", {
                reset: t
            }),
            c.remove(),
            c.off("*.*"),
            b(3, "destroyed " + l + " (reset: " + (t ? "true" : "false") + ")"),
            null
        }
        ,
        this.update = function(t) {
            if (o)
                if (t)
                    if (o.enabled() && u) {
                        var n, i = o.info("scrollPos");
                        n = m.duration > 0 ? (i - x.start) / (x.end - x.start) : i >= x.start ? 1 : 0,
                        c.trigger("update", {
                            startPos: x.start,
                            endPos: x.end,
                            scrollPos: i
                        }),
                        c.progress(n)
                    } else
                        I && f === p && C(!0);
                else
                    o.updateScene(c, !1);
            return c
        }
        ,
        this.refresh = function() {
            return A(),
            P(),
            c
        }
        ,
        this.progress = function(t) {
            if (arguments.length) {
                var n = !1
                  , i = f
                  , e = o ? o.info("scrollDirection") : "PAUSED"
                  , a = m.reverse || t >= h;
                if (0 === m.duration ? (n = h != t,
                h = t < 1 && a ? 0 : 1,
                f = 0 === h ? r : p) : t < 0 && f !== r && a ? (h = 0,
                f = r,
                n = !0) : t >= 0 && t < 1 && a ? (h = t,
                f = p,
                n = !0) : t >= 1 && f !== g ? (h = 1,
                f = g,
                n = !0) : f !== p || a || C(),
                n) {
                    var s = {
                        progress: h,
                        state: f,
                        scrollDirection: e
                    }
                      , l = f != i
                      , d = function(t) {
                        c.trigger(t, s)
                    };
                    l && i !== p && (d("enter"),
                    d(i === r ? "start" : "end")),
                    d("progress"),
                    l && f !== p && (d(f === r ? "start" : "end"),
                    d("leave"))
                }
                return c
            }
            return h
        }
        ;
        var T = function() {
            x = {
                start: y + m.offset
            },
            o && m.triggerElement && (x.start -= o.info("size") * m.triggerHook),
            x.end = x.start + m.duration
        }
          , A = function(t) {
            if (s) {
                var n = "duration";
                L(n, s.call(c)) && !t && (c.trigger("change", {
                    what: n,
                    newval: m[n]
                }),
                c.trigger("shift", {
                    reason: n
                }))
            }
        }
          , P = function(t) {
            var i = 0
              , e = m.triggerElement;
            if (o && e) {
                for (var s = o.info(), l = a.get.offset(s.container), r = s.vertical ? "top" : "left"; e.parentNode.hasAttribute(n); )
                    e = e.parentNode;
                var p = a.get.offset(e);
                s.isDocument || (l[r] -= o.scrollPos()),
                i = p[r] - l[r]
            }
            var g = i != y;
            y = i,
            g && !t && c.trigger("shift", {
                reason: "triggerElementPosition"
            })
        }
          , k = function(t) {
            m.triggerHook > 0 && c.trigger("shift", {
                reason: "containerResize"
            })
        }
          , S = a.extend(e.validate, {
            duration: function(t) {
                if (a.type.String(t) && t.match(/^(\.|\d)*\d+%$/)) {
                    var n = parseFloat(t) / 100;
                    t = function() {
                        return o ? o.info("size") * n : 0
                    }
                }
                if (a.type.Function(t)) {
                    s = t;
                    try {
                        t = parseFloat(s())
                    } catch (i) {
                        t = -1
                    }
                }
                if (t = parseFloat(t),
                !a.type.Number(t) || t < 0)
                    throw s ? (s = void 0,
                    ['Invalid return value of supplied function for option "duration":', t]) : ['Invalid value for option "duration":', t];
                return t
            }
        })
          , R = function(t) {
            t = arguments.length ? [t] : Object.keys(S),
            t.forEach(function(t, n) {
                var i;
                if (S[t])
                    try {
                        i = S[t](m[t])
                    } catch (e) {
                        i = d[t];
                        var s = a.type.String(e) ? [e] : e;
                        a.type.Array(s) ? (s[0] = "ERROR: " + s[0],
                        s.unshift(1),
                        b.apply(this, s)) : b(1, "ERROR: Problem executing validation callback for option '" + t + "':", e.message)
                    } finally {
                        m[t] = i
                    }
            })
        }
          , L = function(t, n) {
            var i = !1
              , e = m[t];
            return m[t] != n && (m[t] = n,
            R(t),
            i = e != m[t]),
            i
        }
          , G = function(t) {
            c[t] || (c[t] = function(n) {
                return arguments.length ? ("duration" === t && (s = void 0),
                L(t, n) && (c.trigger("change", {
                    what: t,
                    newval: m[t]
                }),
                e.shifts.indexOf(t) > -1 && c.trigger("shift", {
                    reason: t
                })),
                c) : m[t]
            }
            )
        };
        this.controller = function() {
            return o
        }
        ,
        this.state = function() {
            return f
        }
        ,
        this.scrollOffset = function() {
            return x.start
        }
        ,
        this.triggerPosition = function() {
            var t = m.offset;
            return o && (t += m.triggerElement ? y : o.info("size") * c.triggerHook()),
            t
        }
        ;
        var I, z;
        c.on("shift.internal", function(t) {
            var n = "duration" === t.reason;
            (f === g && n || f === p && 0 === m.duration) && C(),
            n && M()
        }).on("progress.internal", function(t) {
            C()
        }).on("add.internal", function(t) {
            M()
        }).on("destroy.internal", function(t) {
            c.removePin(t.reset)
        });
        var C = function(t) {
            if (I && o) {
                var n = o.info()
                  , i = z.spacer.firstChild;
                if (t || f !== p) {
                    var e = {
                        position: z.inFlow ? "relative" : "absolute",
                        top: 0,
                        left: 0
                    }
                      , s = a.css(i, "position") != e.position;
                    z.pushFollowers ? m.duration > 0 && (f === g && 0 === parseFloat(a.css(z.spacer, "padding-top")) ? s = !0 : f === r && 0 === parseFloat(a.css(z.spacer, "padding-bottom")) && (s = !0)) : e[n.vertical ? "top" : "left"] = m.duration * h,
                    a.css(i, e),
                    s && M()
                } else {
                    "fixed" != a.css(i, "position") && (a.css(i, {
                        position: "fixed"
                    }),
                    M());
                    var l = a.get.offset(z.spacer, !0)
                      , d = m.reverse || 0 === m.duration ? n.scrollPos - x.start : Math.round(h * m.duration * 10) / 10;
                    l[n.vertical ? "top" : "left"] += d,
                    a.css(z.spacer.firstChild, {
                        top: l.top,
                        left: l.left
                    })
                }
            }
        }
          , M = function() {
            if (I && o && z.inFlow) {
                var t = f === p
                  , n = o.info("vertical")
                  , i = z.spacer.firstChild
                  , e = a.isMarginCollapseType(a.css(z.spacer, "display"))
                  , s = {};
                z.relSize.width || z.relSize.autoFullWidth ? t ? a.css(I, {
                    width: a.get.width(z.spacer)
                }) : a.css(I, {
                    width: "100%"
                }) : (s["min-width"] = a.get.width(n ? I : i, !0, !0),
                s.width = t ? s["min-width"] : "auto"),
                z.relSize.height ? t ? a.css(I, {
                    height: a.get.height(z.spacer) - (z.pushFollowers ? m.duration : 0)
                }) : a.css(I, {
                    height: "100%"
                }) : (s["min-height"] = a.get.height(n ? i : I, !0, !e),
                s.height = t ? s["min-height"] : "auto"),
                z.pushFollowers && (s["padding" + (n ? "Top" : "Left")] = m.duration * h,
                s["padding" + (n ? "Bottom" : "Right")] = m.duration * (1 - h)),
                a.css(z.spacer, s)
            }
        }
          , E = function() {
            o && I && f === p && !o.info("isDocument") && C()
        }
          , D = function() {
            o && I && f === p && ((z.relSize.width || z.relSize.autoFullWidth) && a.get.width(window) != a.get.width(z.spacer.parentNode) || z.relSize.height && a.get.height(window) != a.get.height(z.spacer.parentNode)) && M()
        }
          , _ = function(t) {
            o && I && f === p && !o.info("isDocument") && (t.preventDefault(),
            o._setScrollPos(o.info("scrollPos") - ((t.wheelDelta || t[o.info("vertical") ? "wheelDeltaY" : "wheelDeltaX"]) / 3 || 30 * -t.detail)))
        };
        this.setPin = function(t, i) {
            var e = {
                pushFollowers: !0,
                spacerClass: "scrollmagic-pin-spacer"
            };
            if (i = a.extend({}, e, i),
            t = a.get.elements(t)[0],
            !t)
                return b(1, "ERROR calling method 'setPin()': Invalid pin element supplied."),
                c;
            if ("fixed" === a.css(t, "position"))
                return b(1, "ERROR calling method 'setPin()': Pin does not work with elements that are positioned 'fixed'."),
                c;
            if (I) {
                if (I === t)
                    return c;
                c.removePin()
            }
            I = t;
            var s = I.parentNode.style.display
              , o = ["top", "left", "bottom", "right", "margin", "marginLeft", "marginRight", "marginTop", "marginBottom"];
            I.parentNode.style.display = "none";
            var l = "absolute" != a.css(I, "position")
              , r = a.css(I, o.concat(["display"]))
              , p = a.css(I, ["width", "height"]);
            I.parentNode.style.display = s,
            !l && i.pushFollowers && (b(2, "WARNING: If the pinned element is positioned absolutely pushFollowers will be disabled."),
            i.pushFollowers = !1),
            window.setTimeout(function() {
                I && 0 === m.duration && i.pushFollowers && b(2, "WARNING: pushFollowers =", !0, "has no effect, when scene duration is 0.")
            }, 0);
            var g = I.parentNode.insertBefore(document.createElement("div"), I)
              , d = a.extend(r, {
                position: l ? "relative" : "absolute",
                boxSizing: "content-box",
                mozBoxSizing: "content-box",
                webkitBoxSizing: "content-box"
            });
            if (l || a.extend(d, a.css(I, ["width", "height"])),
            a.css(g, d),
            g.setAttribute(n, ""),
            a.addClass(g, i.spacerClass),
            z = {
                spacer: g,
                relSize: {
                    width: "%" === p.width.slice(-1),
                    height: "%" === p.height.slice(-1),
                    autoFullWidth: "auto" === p.width && l && a.isMarginCollapseType(r.display)
                },
                pushFollowers: i.pushFollowers,
                inFlow: l
            },
            !I.___origStyle) {
                I.___origStyle = {};
                var f = I.style
                  , h = o.concat(["width", "height", "position", "boxSizing", "mozBoxSizing", "webkitBoxSizing"]);
                h.forEach(function(t) {
                    I.___origStyle[t] = f[t] || ""
                })
            }
            return z.relSize.width && a.css(g, {
                width: p.width
            }),
            z.relSize.height && a.css(g, {
                height: p.height
            }),
            g.appendChild(I),
            a.css(I, {
                position: l ? "relative" : "absolute",
                margin: "auto",
                top: "auto",
                left: "auto",
                bottom: "auto",
                right: "auto"
            }),
            (z.relSize.width || z.relSize.autoFullWidth) && a.css(I, {
                boxSizing: "border-box",
                mozBoxSizing: "border-box",
                webkitBoxSizing: "border-box"
            }),
            window.addEventListener("scroll", E),
            window.addEventListener("resize", E),
            window.addEventListener("resize", D),
            I.addEventListener("mousewheel", _),
            I.addEventListener("DOMMouseScroll", _),
            b(3, "added pin"),
            C(),
            c
        }
        ,
        this.removePin = function(t) {
            if (I) {
                if (f === p && C(!0),
                t || !o) {
                    var i = z.spacer.firstChild;
                    if (i.hasAttribute(n)) {
                        var e = z.spacer.style
                          , s = ["margin", "marginLeft", "marginRight", "marginTop", "marginBottom"];
                        margins = {},
                        s.forEach(function(t) {
                            margins[t] = e[t] || ""
                        }),
                        a.css(i, margins)
                    }
                    z.spacer.parentNode.insertBefore(i, z.spacer),
                    z.spacer.parentNode.removeChild(z.spacer),
                    I.parentNode.hasAttribute(n) || (a.css(I, I.___origStyle),
                    delete I.___origStyle)
                }
                window.removeEventListener("scroll", E),
                window.removeEventListener("resize", E),
                window.removeEventListener("resize", D),
                I.removeEventListener("mousewheel", _),
                I.removeEventListener("DOMMouseScroll", _),
                I = void 0,
                b(3, "removed pin (reset: " + (t ? "true" : "false") + ")")
            }
            return c
        }
        ;
        var O, H = [];
        return c.on("destroy.internal", function(t) {
            c.removeClassToggle(t.reset)
        }),
        this.setClassToggle = function(t, n) {
            var i = a.get.elements(t);
            return 0 !== i.length && a.type.String(n) ? (H.length > 0 && c.removeClassToggle(),
            O = n,
            H = i,
            c.on("enter.internal_class leave.internal_class", function(t) {
                var n = "enter" === t.type ? a.addClass : a.removeClass;
                H.forEach(function(t, i) {
                    n(t, O)
                })
            }),
            c) : (b(1, "ERROR calling method 'setClassToggle()': Invalid " + (0 === i.length ? "element" : "classes") + " supplied."),
            c)
        }
        ,
        this.removeClassToggle = function(t) {
            return t && H.forEach(function(t, n) {
                a.removeClass(t, O)
            }),
            c.off("start.internal_class end.internal_class"),
            O = void 0,
            H = [],
            c
        }
        ,
        v(),
        c
    }
    ;
    var e = {
        defaults: {
            duration: 0,
            offset: 0,
            triggerElement: void 0,
            triggerHook: .5,
            reverse: !0,
            loglevel: 2
        },
        validate: {
            offset: function(t) {
                if (t = parseFloat(t),
                !a.type.Number(t))
                    throw ['Invalid value for option "offset":', t];
                return t
            },
            triggerElement: function(t) {
                if (t = t || void 0) {
                    var n = a.get.elements(t)[0];
                    if (!n)
                        throw ['Element defined in option "triggerElement" was not found:', t];
                    t = n
                }
                return t
            },
            triggerHook: function(t) {
                var n = {
                    onCenter: .5,
                    onEnter: 1,
                    onLeave: 0
                };
                if (a.type.Number(t))
                    t = Math.max(0, Math.min(parseFloat(t), 1));
                else {
                    if (!(t in n))
                        throw ['Invalid value for option "triggerHook": ', t];
                    t = n[t]
                }
                return t
            },
            reverse: function(t) {
                return !!t
            },
            loglevel: function(t) {
                if (t = parseInt(t),
                !a.type.Number(t) || t < 0 || t > 3)
                    throw ['Invalid value for option "loglevel":', t];
                return t
            }
        },
        shifts: ["duration", "offset", "triggerHook"]
    };
    t.Scene.addOption = function(n, i, a, s) {
        n in e.defaults ? t._util.log(1, "[static] ScrollMagic.Scene -> Cannot add Scene option '" + n + "', because it already exists.") : (e.defaults[n] = i,
        e.validate[n] = a,
        s && e.shifts.push(n))
    }
    ,
    t.Scene.extend = function(n) {
        var i = this;
        t.Scene = function() {
            return i.apply(this, arguments),
            this.$super = a.extend({}, this),
            n.apply(this, arguments) || this
        }
        ,
        a.extend(t.Scene, i),
        t.Scene.prototype = i.prototype,
        t.Scene.prototype.constructor = t.Scene
    }
    ,
    t.Event = function(t, n, i, e) {
        e = e || {};
        for (var a in e)
            this[a] = e[a];
        return this.type = t,
        this.target = this.currentTarget = i,
        this.namespace = n || "",
        this.timeStamp = this.timestamp = Date.now(),
        this
    }
    ;
    var a = t._util = function(t) {
        var n, i = {}, e = function(t) {
            return parseFloat(t) || 0
        }, a = function(n) {
            return n.currentStyle ? n.currentStyle : t.getComputedStyle(n)
        }, s = function(n, i, s, o) {
            if (i = i === document ? t : i,
            i === t)
                o = !1;
            else if (!f.DomElement(i))
                return 0;
            n = n.charAt(0).toUpperCase() + n.substr(1).toLowerCase();
            var l = (s ? i["offset" + n] || i["outer" + n] : i["client" + n] || i["inner" + n]) || 0;
            if (s && o) {
                var r = a(i);
                l += "Height" === n ? e(r.marginTop) + e(r.marginBottom) : e(r.marginLeft) + e(r.marginRight)
            }
            return l
        }, o = function(t) {
            return t.replace(/^[^a-z]+([a-z])/g, "$1").replace(/-([a-z])/g, function(t) {
                return t[1].toUpperCase()
            })
        };
        i.extend = function(t) {
            for (t = t || {},
            n = 1; n < arguments.length; n++)
                if (arguments[n])
                    for (var i in arguments[n])
                        arguments[n].hasOwnProperty(i) && (t[i] = arguments[n][i]);
            return t
        }
        ,
        i.isMarginCollapseType = function(t) {
            return ["block", "flex", "list-item", "table", "-webkit-box"].indexOf(t) > -1
        }
        ;
        var l = 0
          , r = ["ms", "moz", "webkit", "o"]
          , p = t.requestAnimationFrame
          , g = t.cancelAnimationFrame;
        for (n = 0; !p && n < r.length; ++n)
            p = t[r[n] + "RequestAnimationFrame"],
            g = t[r[n] + "CancelAnimationFrame"] || t[r[n] + "CancelRequestAnimationFrame"];
        p || (p = function(n) {
            var i = (new Date).getTime()
              , e = Math.max(0, 16 - (i - l))
              , a = t.setTimeout(function() {
                n(i + e)
            }, e);
            return l = i + e,
            a
        }
        ),
        g || (g = function(n) {
            t.clearTimeout(n)
        }
        ),
        i.rAF = p.bind(t),
        i.cAF = g.bind(t);
        var d = ["error", "warn", "log"]
          , c = t.console || {};
        for (c.log = c.log || function() {}
        ,
        n = 0; n < d.length; n++) {
            var m = d[n];
            c[m] || (c[m] = c.log)
        }
        i.log = function(t) {
            (t > d.length || t <= 0) && (t = d.length);
            var n = new Date
              , i = ("0" + n.getHours()).slice(-2) + ":" + ("0" + n.getMinutes()).slice(-2) + ":" + ("0" + n.getSeconds()).slice(-2) + ":" + ("00" + n.getMilliseconds()).slice(-3)
              , e = d[t - 1]
              , a = Array.prototype.splice.call(arguments, 1)
              , s = Function.prototype.bind.call(c[e], c);
            a.unshift(i),
            s.apply(c, a)
        }
        ;
        var f = i.type = function(t) {
            return Object.prototype.toString.call(t).replace(/^\[object (.+)\]$/, "$1").toLowerCase()
        }
        ;
        f.String = function(t) {
            return "string" === f(t)
        }
        ,
        f.Function = function(t) {
            return "function" === f(t)
        }
        ,
        f.Array = function(t) {
            return Array.isArray(t)
        }
        ,
        f.Number = function(t) {
            return !f.Array(t) && t - parseFloat(t) + 1 >= 0
        }
        ,
        f.DomElement = function(t) {
            return "object" == typeof HTMLElement ? t instanceof HTMLElement : t && "object" == typeof t && null !== t && 1 === t.nodeType && "string" == typeof t.nodeName
        }
        ;
        var h = i.get = {};
        return h.elements = function(n) {
            var i = [];
            if (f.String(n))
                try {
                    n = document.querySelectorAll(n)
                } catch (e) {
                    return i
                }
            if ("nodelist" === f(n) || f.Array(n))
                for (var a = 0, s = i.length = n.length; a < s; a++) {
                    var o = n[a];
                    i[a] = f.DomElement(o) ? o : h.elements(o)
                }
            else
                (f.DomElement(n) || n === document || n === t) && (i = [n]);
            return i
        }
        ,
        h.scrollTop = function(n) {
            return n && "number" == typeof n.scrollTop ? n.scrollTop : t.pageYOffset || 0
        }
        ,
        h.scrollLeft = function(n) {
            return n && "number" == typeof n.scrollLeft ? n.scrollLeft : t.pageXOffset || 0
        }
        ,
        h.width = function(t, n, i) {
            return s("width", t, n, i)
        }
        ,
        h.height = function(t, n, i) {
            return s("height", t, n, i)
        }
        ,
        h.offset = function(t, n) {
            var i = {
                top: 0,
                left: 0
            };
            if (t && t.getBoundingClientRect) {
                var e = t.getBoundingClientRect();
                i.top = e.top,
                i.left = e.left,
                n || (i.top += h.scrollTop(),
                i.left += h.scrollLeft())
            }
            return i
        }
        ,
        i.addClass = function(t, n) {
            n && (t.classList ? t.classList.add(n) : t.className += " " + n)
        }
        ,
        i.removeClass = function(t, n) {
            n && (t.classList ? t.classList.remove(n) : t.className = t.className.replace(new RegExp("(^|\\b)" + n.split(" ").join("|") + "(\\b|$)","gi"), " "))
        }
        ,
        i.css = function(t, n) {
            if (f.String(n))
                return a(t)[o(n)];
            if (f.Array(n)) {
                var i = {}
                  , e = a(t);
                return n.forEach(function(t, n) {
                    i[t] = e[o(t)]
                }),
                i
            }
            for (var s in n) {
                var l = n[s];
                l == parseFloat(l) && (l += "px"),
                t.style[o(s)] = l
            }
        }
        ,
        i
    }(window || {});
    return t.Scene.prototype.addIndicators = function() {
        return t._util.log(1, "(ScrollMagic.Scene) -> ERROR calling addIndicators() due to missing Plugin 'debug.addIndicators'. Please make sure to include plugins/debug.addIndicators.js"),
        this
    }
    ,
    t.Scene.prototype.removeIndicators = function() {
        return t._util.log(1, "(ScrollMagic.Scene) -> ERROR calling removeIndicators() due to missing Plugin 'debug.addIndicators'. Please make sure to include plugins/debug.addIndicators.js"),
        this
    }
    ,
    t.Scene.prototype.setTween = function() {
        return t._util.log(1, "(ScrollMagic.Scene) -> ERROR calling setTween() due to missing Plugin 'animation.gsap'. Please make sure to include plugins/animation.gsap.js"),
        this
    }
    ,
    t.Scene.prototype.removeTween = function() {
        return t._util.log(1, "(ScrollMagic.Scene) -> ERROR calling removeTween() due to missing Plugin 'animation.gsap'. Please make sure to include plugins/animation.gsap.js"),
        this
    }
    ,
    t.Scene.prototype.setVelocity = function() {
        return t._util.log(1, "(ScrollMagic.Scene) -> ERROR calling setVelocity() due to missing Plugin 'animation.velocity'. Please make sure to include plugins/animation.velocity.js"),
        this
    }
    ,
    t.Scene.prototype.removeVelocity = function() {
        return t._util.log(1, "(ScrollMagic.Scene) -> ERROR calling removeVelocity() due to missing Plugin 'animation.velocity'. Please make sure to include plugins/animation.velocity.js"),
        this
    }
    ,
    t
}),
function(t, n) {
    "function" == typeof define && define.amd ? define(["ScrollMagic", "jquery"], n) : "object" == typeof exports ? n(require("scrollmagic"), require("jquery")) : n(t.ScrollMagic, t.jQuery)
}(this, function(t, n) {
    "use strict";
    var i = "jquery.ScrollMagic"
      , e = window.console || {}
      , a = Function.prototype.bind.call(e.error || e.log || function() {}
    , e);
    t || a("(" + i + ") -> ERROR: The ScrollMagic main module could not be found. Please make sure it's loaded before this plugin or use an asynchronous loader like requirejs."),
    n || a("(" + i + ") -> ERROR: jQuery could not be found. Please make sure it's loaded before ScrollMagic or use an asynchronous loader like requirejs."),
    t._util.get.elements = function(t) {
        return n(t).toArray()
    }
    ,
    t._util.addClass = function(t, i) {
        n(t).addClass(i)
    }
    ,
    t._util.removeClass = function(t, i) {
        n(t).removeClass(i)
    }
    ,
    n.ScrollMagic = t
}),
function(t, n) {
    "function" == typeof define && define.amd ? define(["ScrollMagic"], n) : n("object" == typeof exports ? require("scrollmagic") : t.ScrollMagic || t.jQuery && t.jQuery.ScrollMagic)
}(this, function(t) {
    "use strict";
    var n = "debug.addIndicators"
      , i = window.console || {}
      , e = Function.prototype.bind.call(i.error || i.log || function() {}
    , i);
    t || e("(" + n + ") -> ERROR: The ScrollMagic main module could not be found. Please make sure it's loaded before this plugin or use an asynchronous loader like requirejs.");
    var a = "0.85em"
      , s = "9999"
      , o = 15
      , l = t._util
      , r = 0;
    t.Scene.extend(function() {
        var t, n = this;
        n.addIndicators = function(i) {
            if (!t) {
                var e = {
                    name: "",
                    indent: 0,
                    parent: void 0,
                    colorStart: "green",
                    colorEnd: "red",
                    colorTrigger: "blue"
                };
                i = l.extend({}, e, i),
                r++,
                t = new p(n,i),
                n.on("add.plugin_addIndicators", t.add),
                n.on("remove.plugin_addIndicators", t.remove),
                n.on("destroy.plugin_addIndicators", n.removeIndicators),
                n.controller() && t.add()
            }
            return n
        }
        ,
        n.removeIndicators = function() {
            return t && (t.remove(),
            this.off("*.plugin_addIndicators"),
            t = void 0),
            n
        }
    }),
    t.Controller.addOption("addIndicators", !1),
    t.Controller.extend(function() {
        var i = this
          , e = i.info()
          , a = e.container
          , s = e.isDocument
          , r = e.vertical
          , p = {
            groups: []
        }
          , g = function() {
            i._log && (Array.prototype.splice.call(arguments, 1, 0, "(" + n + ")", "->"),
            i._log.apply(this, arguments))
        };
        i._indicators && g(2, "WARNING: Scene already has a property '_indicators', which will be overwritten by plugin."),
        this._indicators = p;
        var d = function() {
            p.updateBoundsPositions()
        }
          , c = function() {
            p.updateTriggerGroupPositions()
        };
        return a.addEventListener("resize", c),
        s || (window.addEventListener("resize", c),
        window.addEventListener("scroll", c)),
        a.addEventListener("resize", d),
        a.addEventListener("scroll", d),
        this._indicators.updateBoundsPositions = function(t) {
            for (var n, i, e, s = t ? [l.extend({}, t.triggerGroup, {
                members: [t]
            })] : p.groups, g = s.length, d = {}, c = r ? "left" : "top", m = r ? "width" : "height", f = r ? l.get.scrollLeft(a) + l.get.width(a) - o : l.get.scrollTop(a) + l.get.height(a) - o; g--; )
                for (e = s[g],
                n = e.members.length,
                i = l.get[m](e.element.firstChild); n--; )
                    d[c] = f - i,
                    l.css(e.members[n].bounds, d)
        }
        ,
        this._indicators.updateTriggerGroupPositions = function(t) {
            for (var n, e, g, d, c, m = t ? [t] : p.groups, f = m.length, h = s ? document.body : a, x = s ? {
                top: 0,
                left: 0
            } : l.get.offset(h, !0), y = r ? l.get.width(a) - o : l.get.height(a) - o, u = r ? "width" : "height", v = r ? "Y" : "X"; f--; )
                n = m[f],
                e = n.element,
                g = n.triggerHook * i.info("size"),
                d = l.get[u](e.firstChild.firstChild),
                c = g > d ? "translate" + v + "(-100%)" : "",
                l.css(e, {
                    top: x.top + (r ? g : y - n.members[0].options.indent),
                    left: x.left + (r ? y - n.members[0].options.indent : g)
                }),
                l.css(e.firstChild.firstChild, {
                    "-ms-transform": c,
                    "-webkit-transform": c,
                    transform: c
                })
        }
        ,
        this._indicators.updateTriggerGroupLabel = function(t) {
            var n = "trigger" + (t.members.length > 1 ? "" : " " + t.members[0].options.name)
              , i = t.element.firstChild.firstChild
              , e = i.textContent !== n;
            e && (i.textContent = n,
            r && p.updateBoundsPositions())
        }
        ,
        this.addScene = function(n) {
            this._options.addIndicators && n instanceof t.Scene && n.controller() === i && n.addIndicators(),
            this.$super.addScene.apply(this, arguments)
        }
        ,
        this.destroy = function() {
            a.removeEventListener("resize", c),
            s || (window.removeEventListener("resize", c),
            window.removeEventListener("scroll", c)),
            a.removeEventListener("resize", d),
            a.removeEventListener("scroll", d),
            this.$super.destroy.apply(this, arguments)
        }
        ,
        i
    });
    var p = function(t, i) {
        var e, a, s = this, o = g.bounds(), p = g.start(i.colorStart), d = g.end(i.colorEnd), c = i.parent && l.get.elements(i.parent)[0], m = function() {
            t._log && (Array.prototype.splice.call(arguments, 1, 0, "(" + n + ")", "->"),
            t._log.apply(this, arguments))
        };
        i.name = i.name || r,
        p.firstChild.textContent += " " + i.name,
        d.textContent += " " + i.name,
        o.appendChild(p),
        o.appendChild(d),
        s.options = i,
        s.bounds = o,
        s.triggerGroup = void 0,
        this.add = function() {
            a = t.controller(),
            e = a.info("vertical");
            var n = a.info("isDocument");
            c || (c = n ? document.body : a.info("container")),
            n || "static" !== l.css(c, "position") || l.css(c, {
                position: "relative"
            }),
            t.on("change.plugin_addIndicators", h),
            t.on("shift.plugin_addIndicators", f),
            b(),
            u(),
            setTimeout(function() {
                a._indicators.updateBoundsPositions(s)
            }, 0),
            m(3, "added indicators")
        }
        ,
        this.remove = function() {
            if (s.triggerGroup) {
                if (t.off("change.plugin_addIndicators", h),
                t.off("shift.plugin_addIndicators", f),
                s.triggerGroup.members.length > 1) {
                    var n = s.triggerGroup;
                    n.members.splice(n.members.indexOf(s), 1),
                    a._indicators.updateTriggerGroupLabel(n),
                    a._indicators.updateTriggerGroupPositions(n),
                    s.triggerGroup = void 0
                } else
                    w();
                y(),
                m(3, "removed indicators")
            }
        }
        ;
        var f = function() {
            u()
        }
          , h = function(t) {
            "triggerHook" === t.what && b()
        }
          , x = function() {
            var t = a.info("vertical");
            l.css(p.firstChild, {
                "border-bottom-width": t ? 1 : 0,
                "border-right-width": t ? 0 : 1,
                bottom: t ? -1 : i.indent,
                right: t ? i.indent : -1,
                padding: t ? "0 8px" : "2px 4px"
            }),
            l.css(d, {
                "border-top-width": t ? 1 : 0,
                "border-left-width": t ? 0 : 1,
                top: t ? "100%" : "",
                right: t ? i.indent : "",
                bottom: t ? "" : i.indent,
                left: t ? "" : "100%",
                padding: t ? "0 8px" : "2px 4px"
            }),
            c.appendChild(o)
        }
          , y = function() {
            o.parentNode.removeChild(o)
        }
          , u = function() {
            o.parentNode !== c && x();
            var n = {};
            n[e ? "top" : "left"] = t.triggerPosition(),
            n[e ? "height" : "width"] = t.duration(),
            l.css(o, n),
            l.css(d, {
                display: t.duration() > 0 ? "" : "none"
            })
        }
          , v = function() {
            var n = g.trigger(i.colorTrigger)
              , o = {};
            o[e ? "right" : "bottom"] = 0,
            o[e ? "border-top-width" : "border-left-width"] = 1,
            l.css(n.firstChild, o),
            l.css(n.firstChild.firstChild, {
                padding: e ? "0 8px 3px 8px" : "3px 4px"
            }),
            document.body.appendChild(n);
            var r = {
                triggerHook: t.triggerHook(),
                element: n,
                members: [s]
            };
            a._indicators.groups.push(r),
            s.triggerGroup = r,
            a._indicators.updateTriggerGroupLabel(r),
            a._indicators.updateTriggerGroupPositions(r)
        }
          , w = function() {
            a._indicators.groups.splice(a._indicators.groups.indexOf(s.triggerGroup), 1),
            s.triggerGroup.element.parentNode.removeChild(s.triggerGroup.element),
            s.triggerGroup = void 0
        }
          , b = function() {
            var n = t.triggerHook()
              , i = 1e-4;
            if (!(s.triggerGroup && Math.abs(s.triggerGroup.triggerHook - n) < i)) {
                for (var e, o = a._indicators.groups, l = o.length; l--; )
                    if (e = o[l],
                    Math.abs(e.triggerHook - n) < i)
                        return s.triggerGroup && (1 === s.triggerGroup.members.length ? w() : (s.triggerGroup.members.splice(s.triggerGroup.members.indexOf(s), 1),
                        a._indicators.updateTriggerGroupLabel(s.triggerGroup),
                        a._indicators.updateTriggerGroupPositions(s.triggerGroup))),
                        e.members.push(s),
                        s.triggerGroup = e,
                        void a._indicators.updateTriggerGroupLabel(e);
                if (s.triggerGroup) {
                    if (1 === s.triggerGroup.members.length)
                        return s.triggerGroup.triggerHook = n,
                        void a._indicators.updateTriggerGroupPositions(s.triggerGroup);
                    s.triggerGroup.members.splice(s.triggerGroup.members.indexOf(s), 1),
                    a._indicators.updateTriggerGroupLabel(s.triggerGroup),
                    a._indicators.updateTriggerGroupPositions(s.triggerGroup),
                    s.triggerGroup = void 0
                }
                v()
            }
        }
    }
      , g = {
        start: function(t) {
            var n = document.createElement("div");
            n.textContent = "start",
            l.css(n, {
                position: "absolute",
                overflow: "visible",
                "border-width": 0,
                "border-style": "solid",
                color: t,
                "border-color": t
            });
            var i = document.createElement("div");
            return l.css(i, {
                position: "absolute",
                overflow: "visible",
                width: 0,
                height: 0
            }),
            i.appendChild(n),
            i
        },
        end: function(t) {
            var n = document.createElement("div");
            return n.textContent = "end",
            l.css(n, {
                position: "absolute",
                overflow: "visible",
                "border-width": 0,
                "border-style": "solid",
                color: t,
                "border-color": t
            }),
            n
        },
        bounds: function() {
            var t = document.createElement("div");
            return l.css(t, {
                position: "absolute",
                overflow: "visible",
                "white-space": "nowrap",
                "pointer-events": "none",
                "font-size": a
            }),
            t.style.zIndex = s,
            t
        },
        trigger: function(t) {
            var n = document.createElement("div");
            n.textContent = "trigger",
            l.css(n, {
                position: "relative"
            });
            var i = document.createElement("div");
            l.css(i, {
                position: "absolute",
                overflow: "visible",
                "border-width": 0,
                "border-style": "solid",
                color: t,
                "border-color": t
            }),
            i.appendChild(n);
            var e = document.createElement("div");
            return l.css(e, {
                position: "fixed",
                overflow: "visible",
                "white-space": "nowrap",
                "pointer-events": "none",
                "font-size": a
            }),
            e.style.zIndex = s,
            e.appendChild(i),
            e
        }
    }
}),
function() {
    window.Reuters = window.Reuters || {},
    window.Reuters.Graphics = window.Reuters.Graphics || {},
    window.Reuters.Graphics.Template = window.Reuters.Graphics.Template || {},
    window.Reuters.Graphics.Template.areabb = function(t) {
        var n = "";
        return n += '<!-- Generated by ai2html v0.65.4 - 2017-12-04 09:49 -->\n<!-- ai file: areabb.ai -->\n<style type=\'text/css\' media=\'screen,print\'>\n\t#g-areabb-box .g-artboard {\n\t\tmargin:0 auto;\n\t}\n\t#g-areabb-box .g-artboard p {\n\t\tmargin:0;\n\t}\n\t.g-aiAbs {\n\t\tposition:absolute;\n\t}\n\t.g-aiImg {\n\t\tdisplay:block;\n\t\twidth:100% !important;\n\t}\n\t.g-aiPointText p { white-space: nowrap; }\n\t#g-areabb-lg {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-areabb-lg p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:400;\n\t\tfont-size:15px;\n\t\tline-height:18px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(0,0,0);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-areabb-lg .g-pstyle0 {\n\t\tfont-weight:100;\n\t\tfont-size:12px;\n\t\tline-height:14px;\n\t}\n\t#g-areabb-lg .g-pstyle1 {\n\t\tfont-weight:100;\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t}\n\t#g-areabb-lg .g-pstyle2 {\n\t\ttext-align:center;\n\t}\n\n\t\t/* Custom CSS */\n\t\t\t\t#g-areabb-lg {\n\t\tdisplay:block;\n\t\tmargin:0 auto;\n\t\t}\n\n\n</style>\n\n<div id="g-areabb-box" class="ai2html">\n\n\t<!-- Artboard: lg -->\n\t<div id="g-areabb-lg" class="g-artboard g-artboard-v3" data-min-width=\'450\'>\n\t\t<img id="g-ai0-0" class="g-aiImg" src="images/graphics/areabb-lg.png"/>\n\t\t<div id="g-ai0-1" class="g-ai2html-full g-aiAbs g-aiPointText" style="transform: matrix(0.4484,-0.8938,0.8938,0.4484,0,0);transform-origin: 50% 56.4919009731512%;-webkit-transform: matrix(0.4484,-0.8938,0.8938,0.4484,0,0);-webkit-transform-origin: 50% 56.4919009731512%;-ms-transform: matrix(0.4484,-0.8938,0.8938,0.4484,0,0);-ms-transform-origin: 50% 56.4919009731512%;top:8.772%;margin-top:-7.7px;left:15.1724%;width:46px;">\n\t\t\t<p class="g-pstyle0">Footpath</p>\n\t\t</div>\n\t\t<div id="g-ai0-2" class="g-ai2html-full g-aiAbs g-aiPointText" style="top:15.234%;margin-top:-9.3px;left:63.2301%;width:42px;">\n\t\t\t<p class="g-pstyle1">Zone B</p>\n\t\t</div>\n\t\t<div id="g-ai0-3" class="g-ai2html-full g-aiAbs g-aiPointText" style="top:44.0912%;margin-top:-9.3px;left:26.5055%;width:48px;">\n\t\t\t<p class="g-pstyle1">Shelters</p>\n\t\t</div>\n\t\t<div id="g-ai0-4" class="g-ai2html-full g-aiAbs" style="top:80.8571%;left:52.8511%;margin-left:-22.5556%;width:45.1111%;">\n\t\t\t<p class="g-pstyle2">Water pumps very close to toilets or open defecation areas</p>\n\t\t</div>\n\t\t<div id="g-ai0-5" class="g-ai2html-full g-aiAbs g-aiPointText" style="transform: matrix(0.3758,-0.9267,0.9267,0.3758,0,0);transform-origin: 50% 56.4919009731512%;-webkit-transform: matrix(0.3758,-0.9267,0.9267,0.3758,0,0);-webkit-transform-origin: 50% 56.4919009731512%;-ms-transform: matrix(0.3758,-0.9267,0.9267,0.3758,0,0);-ms-transform-origin: 50% 56.4919009731512%;top:91.6291%;margin-top:-7.7px;left:15.9362%;width:50px;">\n\t\t\t<p class="g-pstyle0">Main path</p>\n\t\t</div>\n\t\t<div id="g-ai0-6" class="g-Layer1 g-aiAbs g-aiPointText" style="top:95.6291%;margin-top:-7.7px;left:89.7856%;width:26px;">\n\t\t\t<p class="g-pstyle0">10 m</p>\n\t\t</div>\n\t</div>\n\n</div>\n\n<!-- End ai2html - 2017-12-04 09:49 -->\n';
    }
}(),
function() {
    window.Reuters = window.Reuters || {},
    window.Reuters.Graphics = window.Reuters.Graphics || {},
    window.Reuters.Graphics.Template = window.Reuters.Graphics.Template || {},
    window.Reuters.Graphics.Template.bangladesh = function(t) {
        var n = "";
        return n += '<!-- Generated by ai2html v0.65.4 - 2017-10-17 15:24 -->\n<!-- ai file: bangladesh.ai -->\n<style type=\'text/css\' media=\'screen,print\'>\n\t#g-bangladesh-box .g-artboard {\n\t\tmargin:0 auto;\n\t}\n\t#g-bangladesh-box .g-artboard p {\n\t\tmargin:0;\n\t}\n\t.g-aiAbs {\n\t\tposition:absolute;\n\t}\n\t.g-aiImg {\n\t\tdisplay:block;\n\t\twidth:100% !important;\n\t}\n\t.g-aiPointText p { white-space: nowrap; }\n\t#g-bangladesh-lg {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t\twidth:160px;\n\t}\n\t#g-bangladesh-lg p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-size:14px;\n\t\tline-height:14px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(0,0,0);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-bangladesh-lg .g-pstyle0 {\n\t\tfont-weight:bold;\n\t\tline-height:17px;\n\t}\n\t#g-bangladesh-lg .g-pstyle1 {\n\t\ttext-align:right;\n\t}\n\n\t\t/* Custom CSS */\n\t\t\t\t#g-bangladesh-lg {\n\t\tdisplay:block;\n\t\tmargin:0 auto;\n\t\t}\n\n\n</style>\n\n<div id="g-bangladesh-box" class="ai2html">\n\n\t<!-- Artboard: lg -->\n\t<div id="g-bangladesh-lg" class="g-artboard g-artboard-v3" data-min-width=\'160\'>\n\t\t<img id="g-ai0-0" class="g-aiImg" src="images/graphics/bangladesh-lg.png"/>\n\t\t<div id="g-ai0-1" class="g-Layer1 g-aiAbs g-aiPointText" style="top:48.8753%;margin-top:-10px;left:19.3507%;width:86px;">\n\t\t\t<p class="g-pstyle0">BANGLADESH</p>\n\t\t</div>\n\t\t<div id="g-ai0-2" class="g-Layer1 g-aiAbs g-aiPointText" style="top:88.2422%;margin-top:-15.1px;right:28.9678%;width:35px;">\n\t\t\t<p class="g-pstyle1">Cox&rsquo;s</p>\n\t\t\t<p class="g-pstyle1">Bazar</p>\n\t\t</div>\n\t</div>\n\n</div>\n\n<!-- End ai2html - 2017-10-17 15:24 -->\n'
    }
}(),
function() {
    window.Reuters = window.Reuters || {},
    window.Reuters.Graphics = window.Reuters.Graphics || {},
    window.Reuters.Graphics.Template = window.Reuters.Graphics.Template || {},
    window.Reuters.Graphics.Template.closeto = function(t) {
        var n = "";
        return n += '<!-- Generated by ai2html v0.65.4 - 2017-11-22 15:12 -->\n<!-- ai file: closeto.ai -->\n<style type=\'text/css\' media=\'screen,print\'>\n\t#g-closeto-box .g-artboard {\n\t\tmargin:0 auto;\n\t}\n\t#g-closeto-box .g-artboard p {\n\t\tmargin:0;\n\t}\n\t.g-aiAbs {\n\t\tposition:absolute;\n\t}\n\t.g-aiImg {\n\t\tdisplay:block;\n\t\twidth:100% !important;\n\t}\n\t.g-aiPointText p { white-space: nowrap; }\n\t#g-closeto-lg {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-closeto-lg p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:400;\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(255,255,255);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\n\t\t/* Custom CSS */\n\t\t\t\t#g-selfmade-lg {\n\t\tdisplay:block;\n\t\tmargin:0 auto;\n\t\ttext-shadow: 0px 0px 2px black;\n\t\t}\n\n\n</style>\n\n<div id="g-closeto-box" class="ai2html">\n\n\t<!-- Artboard: lg -->\n\t<div id="g-closeto-lg" class="g-artboard g-artboard-v3" data-min-width=\'240\'>\n\t\t<img id="g-ai0-0" class="g-aiImg" src="images/graphics/closeto-lg.jpg"/>\n\t\t<div id="g-ai0-1" class="g-Layer1 g-aiAbs g-aiPointText" style="top:12.6031%;margin-top:-9.6px;left:44.8768%;width:50px;">\n\t\t\t<p>Shelters</p>\n\t\t</div>\n\t\t<div id="g-ai0-2" class="g-Layer1 g-aiAbs g-aiPointText" style="top:28.9013%;margin-top:-9.6px;left:62.7076%;width:40px;">\n\t\t\t<p>Toilets</p>\n\t\t</div>\n\t\t<div id="g-ai0-3" class="g-Layer1 g-aiAbs g-aiPointText" style="top:86.2993%;margin-top:-9.6px;left:4.8829%;width:44px;">\n\t\t\t<p>Shelter</p>\n\t\t</div>\n\t\t<div id="g-ai0-4" class="g-Layer1 g-aiAbs g-aiPointText" style="top:86.2993%;margin-top:-9.6px;left:62.7076%;width:74px;">\n\t\t\t<p>Water pump</p>\n\t\t</div>\n\t</div>\n\n</div>\n\n<!-- End ai2html - 2017-11-22 15:12 -->\n'
    }
}(),
function() {
    window.Reuters = window.Reuters || {},
    window.Reuters.Graphics = window.Reuters.Graphics || {},
    window.Reuters.Graphics.Template = window.Reuters.Graphics.Template || {},
    window.Reuters.Graphics.Template.closness = function(t) {
        var n = "";
        return n += '<!-- Generated by ai2html v0.65.4 - 2017-11-29 16:15 -->\n<!-- ai file: closness.ai -->\n<style type=\'text/css\' media=\'screen,print\'>\n\t#g-closness-box .g-artboard {\n\t\tmargin:0 auto;\n\t}\n\t#g-closness-box .g-artboard p {\n\t\tmargin:0;\n\t}\n\t.g-aiAbs {\n\t\tposition:absolute;\n\t}\n\t.g-aiImg {\n\t\tdisplay:block;\n\t\twidth:100% !important;\n\t}\n\t.g-aiPointText p { white-space: nowrap; }\n\t#g-closness-sm {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-closness-sm p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:400;\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(255,255,255);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-closness-md {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-closness-md p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:400;\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(255,255,255);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-closness-lg {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-closness-lg p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:400;\n\t\tfont-size:16px;\n\t\tline-height:19px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(255,255,255);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-closness-xl {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-closness-xl p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:400;\n\t\tfont-size:16px;\n\t\tline-height:19px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(255,255,255);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-closness-xs {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-closness-xs p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:400;\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(255,255,255);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\n\t\t/* Custom CSS */\n\t\t\t\t#g-closness-xl {\n\t\tdisplay:block;\n\t\tmargin:0 auto;\n\t\ttext-shadow:0px 0px 3px black;\n\t\t}\n\t\t#g-closness-lg,\n\t\t#g-closness-xs,\n\t\t#g-closness-sm,\n\t\t#g-closness-md{\n\t\tdisplay:none;\n\t\tmargin:0;\n\t\t}\n\t\t@media (max-width: 1200px) {\n\t\t\t#g-closness-xl,\n\t\t\t#g-closness-md,\n\t\t\t#g-closness-xs,\n\t\t\t#g-closness-sm{\n\t\t\tdisplay:none;\n\t\t\t}\n\t\t\t#g-closness-lg{\n\t\t\tdisplay:block;\n\t\t\tmargin: 0 auto;\n\t\t\t}\n\t\t }\n\t\t@media (max-width: 992px) {\n\t\t\t#g-closness-lg,\n\t\t\t#g-closness-xl,\n\t\t\t#g-closness-xs,\n\t\t\t#g-closness-sm{\n\t\t\tdisplay:none;\n\t\t\t}\n\t\t\t#g-closness-md{\n\t\t\tdisplay:block;\n\t\t\tmargin: 0 auto;\n\t\t\t}\n\t\t }\n\t\t@media (max-width: 760px) {\n\t\t\t#g-closness-lg,\n\t\t\t#g-closness-xl,\n\t\t\t#g-closness-xs,\n\t\t\t#g-closness-md{\n\t\t\tdisplay:none;\n\t\t\t}\n\t\t\t#g-closness-sm{\n\t\t\tdisplay:block;\n\t\t\tmargin: 0 auto;\n\t\t\t}\n\t\t }\n\t\t@media (max-width: 575px) {\n\t\t\t#g-closness-lg,\n\t\t\t#g-closness-xl,\n\t\t\t#g-closness-sm,\n\t\t\t#g-closness-md{\n\t\t\tdisplay:none;\n\t\t\t}\n\t\t\t#g-closness-xs{\n\t\t\tdisplay:block;\n\t\t\tmargin: 0 auto;\n\t\t\t}\n\t\t }\n\n\n</style>\n\n<div id="g-closness-box" class="ai2html">\n\n\t<!-- Artboard: sm -->\n\t<div id="g-closness-sm" class="g-artboard g-artboard-v3" data-min-width=\'510\' data-max-width=\'689\'>\n\t\t<img id="g-ai0-0" class="g-aiImg" src="images/graphics/closness-sm.jpg"/>\n\t\t<div id="g-ai0-1" class="g-Layer1 g-aiAbs g-aiPointText" style="top:48.3179%;margin-top:-9.6px;left:60.1024%;width:49px;">\n\t\t\t<p>Latrines</p>\n\t\t</div>\n\t\t<div id="g-ai0-2" class="g-Layer1 g-aiAbs g-aiPointText" style="top:75.4811%;margin-top:-9.6px;left:25.8531%;width:44px;">\n\t\t\t<p>Shelter</p>\n\t\t</div>\n\t\t<div id="g-ai0-3" class="g-Layer1 g-aiAbs g-aiPointText" style="top:77.3211%;margin-top:-18px;left:67.647%;width:71px;">\n\t\t\t<p>Tube well</p>\n\t\t\t<p>with hand pump</p>\n\t\t</div>\n\t</div>\n\n\t<!-- Artboard: md -->\n\t<div id="g-closness-md" class="g-artboard g-artboard-v3" data-min-width=\'690\' data-max-width=\'929\'>\n\t\t<img id="g-ai1-0" class="g-aiImg" src="images/graphics/closness-md.jpg"/>\n\t\t<div id="g-ai1-1" class="g-Layer1 g-aiAbs g-aiPointText" style="top:47.9502%;margin-top:-9.6px;left:44.4235%;width:49px;">\n\t\t\t<p>Latrines</p>\n\t\t</div>\n\t\t<div id="g-ai1-2" class="g-Layer1 g-aiAbs g-aiPointText" style="top:47.9502%;margin-top:-9.6px;left:75.4997%;width:44px;">\n\t\t\t<p>Shelter</p>\n\t\t</div>\n\t\t<div id="g-ai1-3" class="g-Layer1 g-aiAbs g-aiPointText" style="top:76.7328%;margin-top:-18px;left:50.0001%;width:71px;">\n\t\t\t<p>Tube well</p>\n\t\t\t<p>with hand pump</p>\n\t\t</div>\n\t</div>\n\n\t<!-- Artboard: lg -->\n\t<div id="g-closness-lg" class="g-artboard g-artboard-v3" data-min-width=\'930\' data-max-width=\'1109\'>\n\t\t<img id="g-ai2-0" class="g-aiImg" src="images/graphics/closness-lg.jpg"/>\n\t\t<div id="g-ai2-1" class="g-Layer1 g-aiAbs g-aiPointText" style="top:46.7297%;margin-top:-10.7px;left:44.5333%;width:56px;">\n\t\t\t<p>Latrines</p>\n\t\t</div>\n\t\t<div id="g-ai2-2" class="g-Layer1 g-aiAbs g-aiPointText" style="top:46.7297%;margin-top:-10.7px;left:75.9794%;width:50px;">\n\t\t\t<p>Shelter</p>\n\t\t</div>\n\t\t<div id="g-ai2-3" class="g-Layer1 g-aiAbs g-aiPointText" style="top:76.02%;margin-top:-20.3px;left:50.501%;width:81px;">\n\t\t\t<p>Tube well</p>\n\t\t\t<p>with hand pump</p>\n\t\t</div>\n\t</div>\n\n\t<!-- Artboard: xl -->\n\t<div id="g-closness-xl" class="g-artboard g-artboard-v3" data-min-width=\'1110\'>\n\t\t<img id="g-ai3-0" class="g-aiImg" src="images/graphics/closness-xl.jpg"/>\n\t\t<div id="g-ai3-1" class="g-Layer1 g-aiAbs g-aiPointText" style="top:47.8006%;margin-top:-10.7px;left:45.2703%;width:56px;">\n\t\t\t<p>Latrines</p>\n\t\t</div>\n\t\t<div id="g-ai3-2" class="g-Layer1 g-aiAbs g-aiPointText" style="top:47.8006%;margin-top:-10.7px;left:77.6531%;width:50px;">\n\t\t\t<p>Shelter</p>\n\t\t</div>\n\t\t<div id="g-ai3-3" class="g-Layer1 g-aiAbs g-aiPointText" style="top:78.2871%;margin-top:-20.3px;left:50.8108%;width:81px;">\n\t\t\t<p>Tube well</p>\n\t\t\t<p>with hand pump</p>\n\t\t</div>\n\t</div>\n\n\t<!-- Artboard: xs -->\n\t<div id="g-closness-xs" class="g-artboard g-artboard-v3" data-min-width=\'290\' data-max-width=\'509\'>\n\t\t<img id="g-ai4-0" class="g-aiImg" src="images/graphics/closness-xs.jpg"/>\n\t\t<div id="g-ai4-1" class="g-Layer1 g-aiAbs g-aiPointText" style="top:47.5193%;margin-top:-9.6px;left:58.1112%;width:49px;">\n\t\t\t<p>Latrines</p>\n\t\t</div>\n\t\t<div id="g-ai4-2" class="g-Layer1 g-aiAbs g-aiPointText" style="top:77.1933%;margin-top:-9.6px;left:7.7646%;width:44px;">\n\t\t\t<p>Shelter</p>\n\t\t</div>\n\t\t<div id="g-ai4-3" class="g-Layer1 g-aiAbs g-aiPointText" style="top:79.2035%;margin-top:-18px;left:71.3793%;width:71px;">\n\t\t\t<p>Tube well</p>\n\t\t\t<p>with hand pump</p>\n\t\t</div>\n\t</div>\n\n</div>\n\n<!-- End ai2html - 2017-11-29 16:15 -->\n'
    }
}(),
function() {
    window.Reuters = window.Reuters || {},
    window.Reuters.Graphics = window.Reuters.Graphics || {},
    window.Reuters.Graphics.Template = window.Reuters.Graphics.Template || {},
    window.Reuters.Graphics.Template.deathchart = function(t) {
        var n = "";
        return n += '<!-- Generated by ai2html v0.65.4 - 2017-11-17 15:41 -->\n<!-- ai file: deathchart.ai -->\n<style type=\'text/css\' media=\'screen,print\'>\n\t#g-deathchart-box .g-artboard {\n\t\tmargin:0 auto;\n\t}\n\t#g-deathchart-box .g-artboard p {\n\t\tmargin:0;\n\t}\n\t.g-aiAbs {\n\t\tposition:absolute;\n\t}\n\t.g-aiImg {\n\t\tdisplay:block;\n\t\twidth:100% !important;\n\t}\n\t.g-aiPointText p { white-space: nowrap; }\n\t#g-deathchart-sm {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-deathchart-sm p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:100;\n\t\tfont-size:12px;\n\t\tline-height:15px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(0,0,0);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-deathchart-md {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-deathchart-md p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:100;\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(0,0,0);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-deathchart-xs {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-deathchart-xs p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:100;\n\t\tfont-size:12px;\n\t\tline-height:14px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(0,0,0);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\n\t\t/* Custom CSS */\n\t\t\t\t#g-deathchart-md {\n\t\tdisplay:block;\n\t\tmargin:0 auto;\n\t\t}\n\t\t#g-deathchart-sm, \n\t\t#g-deathchart-xs{\n\t\tdisplay:none;\n\t\tmargin:0;\n\t\t}\n\t\t@media (max-width: 765px) {\n\t\t\t#g-deathchart-md,\n\t\t\t#g-deathchart-xs{\n\t\t\tdisplay:none;\n\t\t\t}\n\t\t\t#g-deathchart-sm{\n\t\t\tdisplay:block;\n\t\t\tmargin: 0 auto;\n\t\t\t}\n\t\t }\n\t\t@media (max-width: 520px) {\n\t\t\t#g-deathchart-md,\n\t\t\t#g-deathchart-sm{\n\t\t\tdisplay:none;\n\t\t\t}\n\t\t\t#g-deathchart-xs{\n\t\t\tdisplay:block;\n\t\t\tmargin: 0 auto;\n\t\t\t}\n\t\t }\n\n\n</style>\n\n<div id="g-deathchart-box" class="ai2html">\n\n\t<!-- Artboard: sm -->\n\t<div id="g-deathchart-sm" class="g-artboard g-artboard-v3" data-min-width=\'510\' data-max-width=\'689\'>\n\t\t<img id="g-ai0-0" class="g-aiImg" src="images/graphics/deathchart-sm.png"/>\n\t\t<div id="g-ai0-1" class="g-Layer1 g-aiAbs g-aiPointText" style="top:11.5614%;margin-top:-8.4px;left:0.9752%;width:14px;">\n\t\t\t<p>15</p>\n\t\t</div>\n\t\t<div id="g-ai0-2" class="g-Layer1 g-aiAbs g-aiPointText" style="top:34.7757%;margin-top:-8.4px;left:0.9752%;width:14px;">\n\t\t\t<p>10</p>\n\t\t</div>\n\t\t<div id="g-ai0-3" class="g-Layer1 g-aiAbs g-aiPointText" style="top:57.3947%;margin-top:-8.4px;left:1.9514%;width:8px;">\n\t\t\t<p>5</p>\n\t\t</div>\n\t\t<div id="g-ai0-4" class="g-Layer1 g-aiAbs g-aiPointText" style="top:77.0376%;margin-top:-8.4px;left:1.9514%;width:8px;">\n\t\t\t<p>0</p>\n\t\t</div>\n\t\t<div id="g-ai0-5" class="g-Layer1 g-aiAbs g-aiPointText" style="top:86.5614%;margin-top:-8.4px;left:8.3692%;width:58px;">\n\t\t\t<p>September</p>\n\t\t</div>\n\t\t<div id="g-ai0-6" class="g-Layer1 g-aiAbs g-aiPointText" style="top:86.5614%;margin-top:-8.4px;left:49.4336%;width:43px;">\n\t\t\t<p>October</p>\n\t\t</div>\n\t\t<div id="g-ai0-7" class="g-Layer1 g-aiAbs g-aiPointText" style="top:86.5614%;margin-top:-8.4px;left:88.2881%;width:55px;">\n\t\t\t<p>November</p>\n\t\t</div>\n\t</div>\n\n\t<!-- Artboard: md -->\n\t<div id="g-deathchart-md" class="g-artboard g-artboard-v3" data-min-width=\'690\'>\n\t\t<img id="g-ai1-0" class="g-aiImg" src="images/graphics/deathchart-md.png"/>\n\t\t<div id="g-ai1-1" class="g-Layer1 g-aiAbs g-aiPointText" style="top:12.343%;margin-top:-9.3px;left:1.0806%;width:15px;">\n\t\t\t<p>15</p>\n\t\t</div>\n\t\t<div id="g-ai1-2" class="g-Layer1 g-aiAbs g-aiPointText" style="top:35.8369%;margin-top:-9.3px;left:1.0806%;width:15px;">\n\t\t\t<p>10</p>\n\t\t</div>\n\t\t<div id="g-ai1-3" class="g-Layer1 g-aiAbs g-aiPointText" style="top:59.3309%;margin-top:-9.3px;left:2.0525%;width:9px;">\n\t\t\t<p>5</p>\n\t\t</div>\n\t\t<div id="g-ai1-4" class="g-Layer1 g-aiAbs g-aiPointText" style="top:79.2104%;margin-top:-9.3px;left:2.0525%;width:9px;">\n\t\t\t<p>0</p>\n\t\t</div>\n\t\t<div id="g-ai1-5" class="g-Layer1 g-aiAbs g-aiPointText" style="top:88.6984%;margin-top:-9.3px;left:8.4418%;width:65px;">\n\t\t\t<p>September</p>\n\t\t</div>\n\t\t<div id="g-ai1-6" class="g-Layer1 g-aiAbs g-aiPointText" style="top:88.6984%;margin-top:-9.3px;left:49.3242%;width:48px;">\n\t\t\t<p>October</p>\n\t\t</div>\n\t\t<div id="g-ai1-7" class="g-Layer1 g-aiAbs g-aiPointText" style="top:88.6984%;margin-top:-9.3px;left:88.0063%;width:61px;">\n\t\t\t<p>November</p>\n\t\t</div>\n\t</div>\n\n\t<!-- Artboard: xs -->\n\t<div id="g-deathchart-xs" class="g-artboard g-artboard-v3" data-min-width=\'300\' data-max-width=\'509\'>\n\t\t<img id="g-ai2-0" class="g-aiImg" src="images/graphics/deathchart-xs.png"/>\n\t\t<div id="g-ai2-1" class="g-Layer1 g-aiAbs g-aiPointText" style="top:5.8907%;margin-top:-7.7px;left:1.5303%;width:13px;">\n\t\t\t<p>15</p>\n\t\t</div>\n\t\t<div id="g-ai2-2" class="g-Layer1 g-aiAbs g-aiPointText" style="top:32.2913%;margin-top:-7.7px;left:1.5303%;width:13px;">\n\t\t\t<p>10</p>\n\t\t</div>\n\t\t<div id="g-ai2-3" class="g-Layer1 g-aiAbs g-aiPointText" style="top:58.015%;margin-top:-7.7px;left:3.4461%;width:8px;">\n\t\t\t<p>5</p>\n\t\t</div>\n\t\t<div id="g-ai2-4" class="g-Layer1 g-aiAbs g-aiPointText" style="top:79.6771%;margin-top:-7.7px;left:3.4461%;width:8px;">\n\t\t\t<p>0</p>\n\t\t</div>\n\t\t<div id="g-ai2-5" class="g-Layer1 g-aiAbs g-aiPointText" style="top:91.1851%;margin-top:-7.7px;left:11.1293%;width:27px;">\n\t\t\t<p>Sept.</p>\n\t\t</div>\n\t\t<div id="g-ai2-6" class="g-Layer1 g-aiAbs g-aiPointText" style="top:91.1851%;margin-top:-7.7px;left:50%;width:22px;">\n\t\t\t<p>Oct.</p>\n\t\t</div>\n\t\t<div id="g-ai2-7" class="g-Layer1 g-aiAbs g-aiPointText" style="top:91.1851%;margin-top:-7.7px;left:90.0327%;width:24px;">\n\t\t\t<p>Nov.</p>\n\t\t</div>\n\t</div>\n\n</div>\n\n<!-- End ai2html - 2017-11-17 15:41 -->\n'
    }
}(),
function() {
    window.Reuters = window.Reuters || {},
    window.Reuters.Graphics = window.Reuters.Graphics || {},
    window.Reuters.Graphics.Template = window.Reuters.Graphics.Template || {},
    window.Reuters.Graphics.Template.diseasechart = function(t) {
        var n = "";
        return n += '<?xml version="1.0" encoding="utf-8"?>\r\n<!-- Generator: Adobe Illustrator 17.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->\r\n<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\r\n<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\r\n\t width="540px" height="127.527px" viewBox="0 0 540 127.527" enable-background="new 0 0 540 127.527" xml:space="preserve">\r\n<rect id="otherbar" x="468.5" y="52.833" fill="#BCBCBC" stroke="#FFFFFF" stroke-miterlimit="10" width="69" height="20"/>\r\n<rect id="skinbar" x="264.5" y="52.833" fill="#C4A264" stroke="#FFFFFF" stroke-miterlimit="10" width="47" height="20"/>\r\n<rect id="awdbar" x="154.5" y="52.833" fill="#8A4C2D" stroke="#FFFFFF" stroke-miterlimit="10" width="110" height="20"/>\r\n<rect id="feverbar" x="311.5" y="52.833" fill="#919191" stroke="#FFFFFF" stroke-miterlimit="10" width="157" height="20"/>\r\n<rect id="aribar" x="2.5" y="52.833" fill="#3B2D2D" stroke="#FFFFFF" stroke-miterlimit="10" width="152" height="20"/>\r\n<text transform="matrix(1 0 0 1 3.9658 21.288)"><tspan x="0" y="0" font-family="Source Sans Pro" font-weight="300" font-size="14">Acute Respiratory Infection</tspan><tspan x="61.143" y="16.8" font-family="Source Sans Pro" font-weight="700" font-size="14">29%</tspan></text>\r\n<text transform="matrix(1 0 0 1 146.9422 98.2882)"><tspan x="0" y="0" font-family="Source Sans Pro" font-weight="300" font-size="14">Acute Watery Diarrhoea</tspan><tspan x="49.167" y="16.8" font-family="Source Sans Pro" font-weight="700" font-size="14">21%</tspan></text>\r\n<text transform="matrix(1 0 0 1 250.2637 21.288)"><tspan x="0" y="0" font-family="Source Sans Pro" font-weight="300" font-size="14">Skin diseases</tspan><tspan x="28.042" y="16.8" font-family="Source Sans Pro" font-weight="700" font-size="14">9%</tspan></text>\r\n<text transform="matrix(1 0 0 1 345 98.2885)"><tspan x="0" y="0" font-family="Source Sans Pro" font-weight="300" font-size="14">Unexplained fever</tspan><tspan x="40.11" y="16.8" font-family="Source Sans Pro" font-weight="700" font-size="14">28%</tspan></text>\r\n<text transform="matrix(1 0 0 1 484.1704 21.2881)"><tspan x="0" y="0" font-family="Source Sans Pro" font-weight="300" font-size="14">Others</tspan><tspan x="5.438" y="16.8" font-family="Source Sans Pro" font-weight="700" font-size="14">13%</tspan></text>\r\n<line fill="none" stroke="#000000" stroke-miterlimit="10" x1="77.5" y1="52.333" x2="77.5" y2="41.333"/>\r\n<line fill="none" stroke="#000000" stroke-miterlimit="10" x1="284.5" y1="52.333" x2="284.5" y2="41.333"/>\r\n<line fill="none" stroke="#000000" stroke-miterlimit="10" x1="503.5" y1="52.333" x2="503.5" y2="41.333"/>\r\n<line fill="none" stroke="#000000" stroke-miterlimit="10" x1="209.5" y1="86.333" x2="209.5" y2="75.333"/>\r\n<line fill="none" stroke="#000000" stroke-miterlimit="10" x1="390.5" y1="86.333" x2="390.5" y2="75.333"/>\r\n</svg>\r\n'
    }
}(),
function() {
    window.Reuters = window.Reuters || {},
    window.Reuters.Graphics = window.Reuters.Graphics || {},
    window.Reuters.Graphics.Template = window.Reuters.Graphics.Template || {},
    window.Reuters.Graphics.Template.diseasechartsm = function(t) {
        var n = "";
        return n += '<!-- Generated by ai2html v0.65.4 - 2017-11-29 16:18 -->\n<!-- ai file: diseasechartsm.ai -->\n<style type=\'text/css\' media=\'screen,print\'>\n\t#g-diseasechartsm-box .g-artboard {\n\t\tmargin:0 auto;\n\t}\n\t#g-diseasechartsm-box .g-artboard p {\n\t\tmargin:0;\n\t}\n\t.g-aiAbs {\n\t\tposition:absolute;\n\t}\n\t.g-aiImg {\n\t\tdisplay:block;\n\t\twidth:100% !important;\n\t}\n\t.g-aiPointText p { white-space: nowrap; }\n\t#g-diseasechartsm-sm {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-diseasechartsm-sm p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:100;\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(0,0,0);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-diseasechartsm-sm .g-pstyle0 {\n\t\ttext-align:center;\n\t}\n\t#g-diseasechartsm-sm .g-pstyle1 {\n\t\tfont-weight:bold;\n\t\ttext-align:center;\n\t}\n\t#g-diseasechartsm-xs {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-diseasechartsm-xs p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:100;\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(0,0,0);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-diseasechartsm-xs .g-pstyle0 {\n\t\tfont-weight:bold;\n\t}\n\t#g-diseasechartsm-xs .g-pstyle1 {\n\t\ttext-align:right;\n\t}\n\t#g-diseasechartsm-xs .g-pstyle2 {\n\t\tfont-weight:bold;\n\t\ttext-align:right;\n\t}\n\n\t\t/* Custom CSS */\n\t\t\t\t#g-diseasechartsm-sm {\n\t\tdisplay:block;\n\t\tmargin:0 auto;\n\t\t}\n\t\t#g-diseasechartsm-xs{\n\t\tdisplay:none;\n\t\tmargin:0;\n\t\t}\n\t\t@media (max-width: 520px) {\n\t\t\t#g-diseasechartsm-sm{\n\t\t\tdisplay:none;\n\t\t\t}\n\t\t\t#g-diseasechartsm-xs{\n\t\t\tdisplay:block;\n\t\t\tmargin: 0 auto;\n\t\t\t}\n\t\t }\n\n\n</style>\n\n<div id="g-diseasechartsm-box" class="ai2html">\n\n\t<!-- Artboard: sm -->\n\t<div id="g-diseasechartsm-sm" class="g-artboard g-artboard-v3" data-min-width=\'510\'>\n\t\t<img id="g-ai0-0" class="g-aiImg" src="images/graphics/diseasechartsm-sm.png"/>\n\t\t<div id="g-ai0-1" class="g-Layer1 g-aiAbs g-aiPointText" style="top:21.2032%;margin-top:-18.4px;left:15.5088%;margin-left:-14.902%;width:154px;">\n\t\t\t<p class="g-pstyle0">Acute Respiratory Infection</p>\n\t\t\t<p class="g-pstyle1">29%</p>\n\t\t</div>\n\t\t<div id="g-ai0-2" class="g-Layer1 g-aiAbs g-aiPointText" style="top:21.2032%;margin-top:-18.4px;left:53.2259%;margin-left:-7.3529%;width:77px;">\n\t\t\t<p class="g-pstyle0">Skin diseases</p>\n\t\t\t<p class="g-pstyle1">9%</p>\n\t\t</div>\n\t\t<div id="g-ai0-3" class="g-Layer1 g-aiAbs g-aiPointText" style="top:21.2032%;margin-top:-18.4px;left:93.0459%;margin-left:-3.7255%;width:40px;">\n\t\t\t<p class="g-pstyle0">Others</p>\n\t\t\t<p class="g-pstyle1">13%</p>\n\t\t</div>\n\t\t<div id="g-ai0-4" class="g-Layer1 g-aiAbs g-aiPointText" style="top:80.6409%;margin-top:-18.4px;left:38.7174%;margin-left:-12.3529%;width:128px;">\n\t\t\t<p class="g-pstyle0">Acute Water Diarrhoea</p>\n\t\t\t<p class="g-pstyle1">21%</p>\n\t\t</div>\n\t\t<div id="g-ai0-5" class="g-Layer1 g-aiAbs g-aiPointText" style="top:80.6409%;margin-top:-18.4px;left:72.9544%;margin-left:-10%;width:104px;">\n\t\t\t<p class="g-pstyle0">Unexplained fever</p>\n\t\t\t<p class="g-pstyle1">28%</p>\n\t\t</div>\n\t</div>\n\n\t<!-- Artboard: xs -->\n\t<div id="g-diseasechartsm-xs" class="g-artboard g-artboard-v3" data-min-width=\'300\' data-max-width=\'509\'>\n\t\t<img id="g-ai1-0" class="g-aiImg" src="images/graphics/diseasechartsm-xs.png"/>\n\t\t<div id="g-ai1-1" class="g-Layer1 g-aiAbs g-aiPointText" style="top:19.0897%;margin-top:-26.8px;left:1.6937%;width:101px;">\n\t\t\t<p>Acute Respiratory</p>\n\t\t\t<p>Infection</p>\n\t\t\t<p class="g-pstyle0">29%</p>\n\t\t</div>\n\t\t<div id="g-ai1-2" class="g-Layer1 g-aiAbs g-aiPointText" style="top:24.4202%;margin-top:-18.4px;left:49.027%;width:77px;">\n\t\t\t<p>Skin diseases</p>\n\t\t\t<p class="g-pstyle0">9%</p>\n\t\t</div>\n\t\t<div id="g-ai1-3" class="g-Layer1 g-aiAbs g-aiPointText" style="top:24.4202%;margin-top:-18.4px;left:85.3604%;width:40px;">\n\t\t\t<p>Others</p>\n\t\t\t<p class="g-pstyle0">13%</p>\n\t\t</div>\n\t\t<div id="g-ai1-4" class="g-Layer1 g-aiAbs g-aiPointText" style="top:79.8335%;margin-top:-26.8px;right:58.3206%;width:76px;">\n\t\t\t<p class="g-pstyle1">Acute Watery</p>\n\t\t\t<p class="g-pstyle1">Diarrhoea</p>\n\t\t\t<p class="g-pstyle2">21%</p>\n\t\t</div>\n\t\t<div id="g-ai1-5" class="g-Layer1 g-aiAbs g-aiPointText" style="top:79.8335%;margin-top:-26.8px;left:64.1402%;width:74px;">\n\t\t\t<p>Unexplained</p>\n\t\t\t<p>fever</p>\n\t\t\t<p class="g-pstyle0">28%</p>\n\t\t</div>\n\t</div>\n\n</div>\n\n<!-- End ai2html - 2017-11-29 16:18 -->\n'
    }
}(),
function() {
    window.Reuters = window.Reuters || {},
    window.Reuters.Graphics = window.Reuters.Graphics || {},
    window.Reuters.Graphics.Template = window.Reuters.Graphics.Template || {},
    window.Reuters.Graphics.Template.example = function(t) {
        var n = "";
        return n += '<!-- Generated by ai2html v0.65.4 - 2017-12-04 13:16 -->\n<!-- ai file: example.ai -->\n<style type=\'text/css\' media=\'screen,print\'>\n\t#g-example-box .g-artboard {\n\t\tmargin:0 auto;\n\t}\n\t#g-example-box .g-artboard p {\n\t\tmargin:0;\n\t}\n\t.g-aiAbs {\n\t\tposition:absolute;\n\t}\n\t.g-aiImg {\n\t\tdisplay:block;\n\t\twidth:100% !important;\n\t}\n\t.g-aiPointText p { white-space: nowrap; }\n\t#g-example-sm {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-example-sm p {\n\t\tfont-family:knowledge,helvetica,sans-serif;\n\t\tfont-weight:300;\n\t\tfont-size:13px;\n\t\tline-height:16px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(170,170,170);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-example-sm .g-pstyle0 {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:400;\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t\tcolor:rgb(0,0,0);\n\t}\n\t#g-example-sm .g-pstyle1 {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:100;\n\t\tfont-size:12px;\n\t\tline-height:14px;\n\t\tcolor:rgb(0,0,0);\n\t}\n\t#g-example-sm .g-pstyle2 {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:100;\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t\tcolor:rgb(0,0,0);\n\t}\n\t#g-example-xl {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-example-xl p {\n\t\tfont-family:knowledge,helvetica,sans-serif;\n\t\tfont-weight:300;\n\t\tfont-size:13px;\n\t\tline-height:16px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(170,170,170);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-example-xl .g-pstyle0 {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:400;\n\t\tfont-size:16px;\n\t\tline-height:19px;\n\t\tcolor:rgb(0,0,0);\n\t}\n\t#g-example-xl .g-pstyle1 {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:100;\n\t\tfont-size:12px;\n\t\tline-height:14px;\n\t\tcolor:rgb(0,0,0);\n\t}\n\t#g-example-xl .g-pstyle2 {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:100;\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t\tcolor:rgb(0,0,0);\n\t}\n\t#g-example-md {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-example-md p {\n\t\tfont-family:knowledge,helvetica,sans-serif;\n\t\tfont-weight:300;\n\t\tfont-size:13px;\n\t\tline-height:16px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(170,170,170);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-example-md .g-pstyle0 {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:400;\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t\tcolor:rgb(0,0,0);\n\t}\n\t#g-example-md .g-pstyle1 {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:100;\n\t\tfont-size:12px;\n\t\tline-height:14px;\n\t\tcolor:rgb(0,0,0);\n\t}\n\t#g-example-md .g-pstyle2 {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:100;\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t\tcolor:rgb(0,0,0);\n\t}\n\t#g-example-xs {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-example-xs p {\n\t\tfont-family:knowledge,helvetica,sans-serif;\n\t\tfont-weight:300;\n\t\tfont-size:13px;\n\t\tline-height:16px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(170,170,170);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-example-xs .g-pstyle0 {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:400;\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t\tcolor:rgb(0,0,0);\n\t}\n\t#g-example-xs .g-pstyle1 {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:100;\n\t\tfont-size:12px;\n\t\tline-height:14px;\n\t\tcolor:rgb(0,0,0);\n\t}\n\t#g-example-xs .g-pstyle2 {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:100;\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t\tcolor:rgb(0,0,0);\n\t}\n\n\t\t/* Custom CSS */\n\t\t\t\t#g-example-xl{\n\t\tdisplay:block;\n\t\tmargin:0 auto;\n\t\t}\n\t\t#g-example-xs, \n\t\t#g-example-sm, \n\t\t#g-example-md{\n\t\tdisplay:none;\n\t\tmargin:0;\n\t\t}\n\t\t@media (max-width: 992px) {\n\t\t\t#g-example-xl,\n\t\t\t#g-example-xs,\n\t\t\t#g-example-sm{\n\t\t\tdisplay:none;\n\t\t\t}\n\t\t\t#g-example-md{\n\t\t\tdisplay:block;\n\t\t\tmargin: 0 auto;\n\t\t\t}\n\t\t }\n\t\t@media (max-width: 765px) {\n\t\t\t#g-example-xl,\n\t\t\t#g-example-xs,\n\t\t\t#g-example-md{\n\t\t\tdisplay:none;\n\t\t\t}\n\t\t\t#g-example-sm{\n\t\t\tdisplay:block;\n\t\t\tmargin: 0 auto;\n\t\t\t}\n\t\t }\n\t\t@media (max-width: 576px) {\n\t\t\t#g-example-xl,\n\t\t\t#g-example-sm,\n\t\t\t#g-example-md{\n\t\t\tdisplay:none;\n\t\t\t}\n\t\t\t#g-example-xs{\n\t\t\tdisplay:block;\n\t\t\tmargin: 0 auto;\n\t\t\t}\n\t\t }\n\n\n</style>\n\n<div id="g-example-box" class="ai2html">\n\n\t<!-- Artboard: sm -->\n\t<div id="g-example-sm" class="g-artboard g-artboard-v3" data-min-width=\'510\' data-max-width=\'689\'>\n\t\t<img id="g-ai0-0" class="g-aiImg" src="images/graphics/example-sm.jpg"/>\n\t\t<div id="g-ai0-1" class="g-Layer1 g-aiAbs g-aiPointText" style="top:2.8353%;margin-top:-9.6px;left:33.6966%;width:64px;">\n\t\t\t<p class="g-pstyle0">Tube wells</p>\n\t\t</div>\n\t\t<div id="g-ai0-2" class="g-Layer1 g-aiAbs g-aiPointText" style="top:2.8353%;margin-top:-9.6px;left:53.4798%;width:84px;">\n\t\t\t<p class="g-pstyle0">Latrine blocks</p>\n\t\t</div>\n\t\t<div id="g-ai0-3" class="g-Layer1 g-aiAbs g-aiPointText" style="transform: matrix(0.9734,-0.2291,0.2291,0.9734,0,0);transform-origin: 50% 56.4919009731512%;-webkit-transform: matrix(0.9734,-0.2291,0.2291,0.9734,0,0);-webkit-transform-origin: 50% 56.4919009731512%;-ms-transform: matrix(0.9734,-0.2291,0.2291,0.9734,0,0);-ms-transform-origin: 50% 56.4919009731512%;top:12.9316%;margin-top:-7.7px;left:69.2496%;width:46px;">\n\t\t\t<p class="g-pstyle1">Footpath</p>\n\t\t</div>\n\t\t<div id="g-ai0-4" class="g-Layer1 g-aiAbs g-aiPointText" style="top:16.2319%;margin-top:-9.3px;left:46.4239%;width:41px;">\n\t\t\t<p class="g-pstyle2">Zone E</p>\n\t\t</div>\n\t\t<div id="g-ai0-5" class="g-Layer1 g-aiAbs g-aiPointText" style="top:36.443%;margin-top:-7.7px;left:71.4147%;width:26px;">\n\t\t\t<p class="g-pstyle1">10 m</p>\n\t\t</div>\n\t\t<div id="g-ai0-6" class="g-Layer1 g-aiAbs g-aiPointText" style="top:97.945%;margin-top:-8.5px;left:0.4485%;width:201px;">\n\t\t\t<p>REUTERS/Mohammad Ponir Hossain</p>\n\t\t</div>\n\t</div>\n\n\t<!-- Artboard: xl -->\n\t<div id="g-example-xl" class="g-artboard g-artboard-v3" data-min-width=\'933\'>\n\t\t<img id="g-ai1-0" class="g-aiImg" src="images/graphics/example-xl.jpg"/>\n\t\t<div id="g-ai1-1" class="g-Layer1 g-aiAbs g-aiPointText" style="top:4.692%;margin-top:-10.7px;left:70.6571%;width:73px;">\n\t\t\t<p class="g-pstyle0">Tube wells</p>\n\t\t</div>\n\t\t<div id="g-ai1-2" class="g-Layer1 g-aiAbs g-aiPointText" style="top:4.692%;margin-top:-10.7px;left:81.7926%;width:96px;">\n\t\t\t<p class="g-pstyle0">Latrine blocks</p>\n\t\t</div>\n\t\t<div id="g-ai1-3" class="g-Layer1 g-aiAbs g-aiPointText" style="transform: matrix(0.9734,-0.2291,0.2291,0.9734,0,0);transform-origin: 50% 56.4919009731512%;-webkit-transform: matrix(0.9734,-0.2291,0.2291,0.9734,0,0);-webkit-transform-origin: 50% 56.4919009731512%;-ms-transform: matrix(0.9734,-0.2291,0.2291,0.9734,0,0);-ms-transform-origin: 50% 56.4919009731512%;top:41.6203%;margin-top:-7.7px;left:94.7842%;width:46px;">\n\t\t\t<p class="g-pstyle1">Footpath</p>\n\t\t</div>\n\t\t<div id="g-ai1-4" class="g-Layer1 g-aiAbs g-aiPointText" style="top:47.8011%;margin-top:-9.3px;left:82.3071%;width:41px;">\n\t\t\t<p class="g-pstyle2">Zone E</p>\n\t\t</div>\n\t\t<div id="g-ai1-5" class="g-Layer1 g-aiAbs g-aiPointText" style="top:90.6484%;margin-top:-7.7px;left:95.575%;width:26px;">\n\t\t\t<p class="g-pstyle1">10 m</p>\n\t\t</div>\n\t\t<div id="g-ai1-6" class="g-Layer1 g-aiAbs g-aiPointText" style="top:96.6608%;margin-top:-8.5px;left:0%;width:201px;">\n\t\t\t<p>REUTERS/Mohammad Ponir Hossain</p>\n\t\t</div>\n\t</div>\n\n\t<!-- Artboard: md -->\n\t<div id="g-example-md" class="g-artboard g-artboard-v3" data-min-width=\'690\' data-max-width=\'932\'>\n\t\t<img id="g-ai2-0" class="g-aiImg" src="images/graphics/example-md.jpg"/>\n\t\t<div id="g-ai2-1" class="g-Layer1 g-aiAbs g-aiPointText" style="top:8.5536%;margin-top:-9.6px;left:60.5572%;width:64px;">\n\t\t\t<p class="g-pstyle0">Tube wells</p>\n\t\t</div>\n\t\t<div id="g-ai2-2" class="g-Layer1 g-aiAbs g-aiPointText" style="top:8.5536%;margin-top:-9.6px;left:74.3825%;width:84px;">\n\t\t\t<p class="g-pstyle0">Latrine blocks</p>\n\t\t</div>\n\t\t<div id="g-ai2-3" class="g-Layer1 g-aiAbs g-aiPointText" style="transform: matrix(0.9734,-0.2291,0.2291,0.9734,0,0);transform-origin: 50% 56.4919009731512%;-webkit-transform: matrix(0.9734,-0.2291,0.2291,0.9734,0,0);-webkit-transform-origin: 50% 56.4919009731512%;-ms-transform: matrix(0.9734,-0.2291,0.2291,0.9734,0,0);-ms-transform-origin: 50% 56.4919009731512%;top:37.4463%;margin-top:-7.7px;left:93.3096%;width:46px;">\n\t\t\t<p class="g-pstyle1">Footpath</p>\n\t\t</div>\n\t\t<div id="g-ai2-4" class="g-Layer1 g-aiAbs g-aiPointText" style="top:43.8425%;margin-top:-9.3px;left:76.4384%;width:41px;">\n\t\t\t<p class="g-pstyle2">Zone E</p>\n\t\t</div>\n\t\t<div id="g-ai2-5" class="g-Layer1 g-aiAbs g-aiPointText" style="top:88.9458%;margin-top:-7.7px;left:94.9097%;width:26px;">\n\t\t\t<p class="g-pstyle1">10 m</p>\n\t\t</div>\n\t\t<div id="g-ai2-6" class="g-Layer1 g-aiAbs g-aiPointText" style="top:96.0309%;margin-top:-8.5px;left:0.3623%;width:201px;">\n\t\t\t<p>REUTERS/Mohammad Ponir Hossain</p>\n\t\t</div>\n\t</div>\n\n\t<!-- Artboard: xs -->\n\t<div id="g-example-xs" class="g-artboard g-artboard-v3" data-min-width=\'290\' data-max-width=\'509\'>\n\t\t<img id="g-ai3-0" class="g-aiImg" src="images/graphics/example-xs.jpg"/>\n\t\t<div id="g-ai3-1" class="g-Layer1 g-aiAbs g-aiPointText" style="top:2.5288%;margin-top:-9.6px;left:20.497%;width:64px;">\n\t\t\t<p class="g-pstyle0">Tube wells</p>\n\t\t</div>\n\t\t<div id="g-ai3-2" class="g-Layer1 g-aiAbs g-aiPointText" style="top:2.5288%;margin-top:-9.6px;left:55.2882%;width:84px;">\n\t\t\t<p class="g-pstyle0">Latrine blocks</p>\n\t\t</div>\n\t\t<div id="g-ai3-3" class="g-Layer1 g-aiAbs g-aiPointText" style="transform: matrix(0.9734,-0.2291,0.2291,0.9734,0,0);transform-origin: 50% 56.4919009731512%;-webkit-transform: matrix(0.9734,-0.2291,0.2291,0.9734,0,0);-webkit-transform-origin: 50% 56.4919009731512%;-ms-transform: matrix(0.9734,-0.2291,0.2291,0.9734,0,0);-ms-transform-origin: 50% 56.4919009731512%;top:17.0873%;margin-top:-7.7px;left:84.3119%;width:46px;">\n\t\t\t<p class="g-pstyle1">Footpath</p>\n\t\t</div>\n\t\t<div id="g-ai3-4" class="g-Layer1 g-aiAbs g-aiPointText" style="top:20.929%;margin-top:-9.3px;left:44.1701%;width:41px;">\n\t\t\t<p class="g-pstyle2">Zone E</p>\n\t\t</div>\n\t\t<div id="g-ai3-5" class="g-Layer1 g-aiAbs g-aiPointText" style="top:45.5966%;margin-top:-7.7px;left:88.1193%;width:26px;">\n\t\t\t<p class="g-pstyle1">10 m</p>\n\t\t</div>\n\t\t<div id="g-ai3-6" class="g-Layer1 g-aiAbs g-aiPointText" style="top:97.554%;margin-top:-8.5px;left:1.0281%;width:201px;">\n\t\t\t<p>REUTERS/Mohammad Ponir Hossain</p>\n\t\t</div>\n\t</div>\n\n</div>\n\n<!-- End ai2html - 2017-12-04 13:16 -->\n';
    }
}(),
function() {
    window.Reuters = window.Reuters || {},
    window.Reuters.Graphics = window.Reuters.Graphics || {},
    window.Reuters.Graphics.Template = window.Reuters.Graphics.Template || {},
    window.Reuters.Graphics.Template.featureLayout = function(t) {
        var n, i = "";
        return i += '\n<div class="pg-header mb-3">\n    <img src="images/postersm.jpg" id="theposter"/>\n  <video autoplay muted loop playsinline class="topvideo hidden-sm-down" id="thevideo">\n    <source src="//fingfx.thomsonreuters.com/gfx/rngs/MYANMAR-ROHINGYA/010051TF4K2/desktopvideonofade.mp4" type="video/mp4">\n\n  </video>\n\n  <video autoplay muted loop playsinline class="topvideo hidden-md-up" id="thevideosm" poster="images/postersm.jpg">\n    <source src="//fingfx.thomsonreuters.com/gfx/rngs/MYANMAR-ROHINGYA/010051TF44G/campmobile.mp4" type="video/mp4">\n\n  </video>\n\n\n\n  <div class="pg-headline">\n    <p class="text-center uppercase sig">' + (null == (n = "The Rohingya crisis") ? "" : n) + '</p>\n    <h1 class="display-3 text-center">' + (null == (n = "Life in the camps") ? "" : n) + '</h1>\n    <hr class="topdivider">\n    <p class="graphic-subhead text-center">' + (null == (n = "Makeshift huts crammed onto muddy hillsides. Water wells fouled by nearby latrines. Rapidly-spreading diseases. Health experts say overcrowding, poor sanitation and limited health care in the Rohingya refugee areas of Bangladesh is a “recipe for disaster”. This is a closer look at life in the camps.") ? "" : n) + '</p>\n    <p class="graphic-timestamp text-center">' + (null == (n = "December 4, 2017") ? "" : n) + '</p>\n  </div>\n</div>\n\n<div class="container graphic-section-container my-3" id="pt1">\n\n    <div class="row">\n    <div class="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-12">\n      <div id="bangladesh"></div>\n      <h3 class="text-center mt-1">' + (null == (n = "The camps") ? "" : n) + "</h3>\n      <p>" + (null == (n = "More than 800,000 Rohingya Muslims live in two official camps and several extension sites around Cox’s Bazar on the southern tip of Bangladesh. They include 625,000 refugees who fled a military crackdown in Myanmar’s Rakhine state in late August. The speed and scale of the exodus has created the world’s most densely-populated settlement of refugees and tested governments and the international aid community.") ? "" : n) + '</p>\n    </div>\n  </div>\n\n\n</div>\n\n\n\n<div class="bigmapstuff" id="areamap">\n      <div class="satemap" id="areamaps">\n        <div class="themaps" id="map1"></div>\n        <div class="themaps" id="map2" style="display:none;"></div>\n        <div class="themaps" id="map3" style="display:none;"></div>\n      </div>\n\n      <div class="maptext">\n            <div class="maps1 mapsections">\n              <div class="mapwords">\n                <div id="locator" class="mb-2 hidden-md-down"></div>\n              <h5>' + (null == (n = "Before the exodus") ? "" : n) + '</h5>\n              <p class="graphic-subhead">' + (null == (n = "Kutupalong is the largest official refugee camp in the Cox’s Bazar area. It was home to 13,901 refugees before the latest surge. Another 99,705 people lived in two nearby makeshift camps. In this satellite image, taken May 26, the green, hilly areas around the camps are relatively unoccupied. ") ? "" : n) + '</p>\n            </div>\n          </div>\n\n            <div class="maps2 mapsections">\n              <div class="mapwords">\n              <h5>' + (null == (n = "Three months later") ? "" : n) + '</h5>\n              <p class="graphic-subhead">' + (null == (n = "By Nov 8, 598,035 people are living in a contiguous area that includes the new Kutupalong and Balukhali extension sites and unofficial camps to the south. The green areas in the previous image are now muddy hills and fields crowded with tents and shelters. This sprawling informal settlement would dwarf the Bidi Bidi camp in Uganda, considered the world’s largest refugee camp with 272,000 people.  ") ? "" : n) + '</p>\n            </div>\n          </div>\n\n            <div class="maps3 mapsections">\n              <div class="mapwords">\n              <h5>' + (null == (n = "Limited access") ? "" : n) + '</h5>\n              <p class="graphic-subhead">' + (null == (n = "The hostile terrain makes access difficult. Refugees walk for hours on narrow paths and cross flimsy bamboo bridges, often carrying heavy loads back to their shelters. The few roads are badly congested and restrict the delivery of aid and health care. ") ? "" : n) + '</p>\n            </div>\n          </div>\n      </div>\n</div>\n\n<div class="container graphic-section-container mt-3" id="aftermap">\n\n  <div class="row">\n    <div class="col-lg-2 offset-lg-5 col-md-4 offset-md-4 col-6 offset-3 hidden-sm-down">\n          <hr class="mt-2 smdivide">\n    </div>\n  </div>\n\n  <div class="row">\n  <div class="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-12 mt-3">\n    <h3 class="text-center">' + (null == (n = "Kutupalong in focus") ? "" : n) + "</h3>\n    <p>" + (null == (n = "The Kutupalong camp cluster accounts for more than half of the Rohingya population in the Cox’s Bazar area.") ? "" : n) + '</p>\n  </div>\n</div>\n</div>\n\n\n<div class="kutumapstuff mt-1" id="kutupalongmap">\n\n    <div class="satemap" id="kutumaps">\n      <div class="themaps" id="kutupalong1"></div>\n      <div class="themaps" id="kutupalong2" style="display:none;"></div>\n      <div class="themaps" id="kutubase" style="display:none;"></div>\n      <div class="themaps" id="latrineall" style="display:none;"></div>\n      <!-- <div class="themaps" id="unlatrine" style="display:none;"></div> -->\n      <!-- <div class="themaps" id="locallatrine" style="display:none;"></div> -->\n      <div class="themaps" id="selflatrine" style="display:none;"></div>\n      <!-- <div class="themaps" id="otherlatrine" style="display:none;"></div> -->\n      <div class="themaps" id="fiftybuffer" style="display:none;"></div>\n      <div class="themaps" id="sixbuffer" style="display:none;"></div>\n      <div class="themaps" id="open" style="display:none;"></div>\n      <div class="themaps" id="wateronly" style="display:none;"></div>\n      <div class="themaps" id="openwater" style="display:none;"></div>\n\n      <div class="zonesimg themaps hidden-sm-down">\n        <img id="zonecc" src="images/zones/zonecc.png"    style="display:none"/>\n        <img id="zonekms" src="images/zones/kms.png"  style="display:none"/>\n        <img id="zoneaa" src="images/zones/zoneaa.png"  style="display:none" />\n        <img id="zonebb" src="images/zones/zonebb.png"    style="display:none"/>\n        <img id="zonedd" src="images/zones/zonedd.png"  style="display:none"/>\n        <img id="zoneee" src="images/zones/zonee.png"  style="display:none" />\n        <img id="zoneff" src="images/zones/zoneff.png"  style="display:none" />\n        <img id="zonegg" src="images/zones/zonegg.png"    style="display:none"/>\n        <img id="zonehh" src="images/zones/zonehh.png"  style="display:none"/>\n        <img id="zoneii" src="images/zones/zoneii.png"  style="display:none" />\n        <img id="zonejj" src="images/zones/zonejj.png"  style="display:none"/>\n        <img id="zonekk" src="images/zones/zonekk.png"  style="display:none" />\n      </div>\n        <!-- <div class="themaps hidden-sm-down" id="zonesoverlay" style="display:none;"></div> -->\n    </div>\n\n\n\n    <div class="maptext">\n          <div class="kutupalongs1 mapsections">\n            <div class="mapwords">\n            <h5>' + (null == (n = "Kutupalong") ? "" : n) + '</h5>\n            <p class="graphic-subhead">' + (null == (n = "This satellite image shows the contrast between the formal camp and expansion areas. The ramshackle huts in the formal camp have been replaced in recent years by new shelters with more space between dwellings. The red, blue, black and white colours reflect the cheap plastic sheeting available to make shelters at the time.") ? "" : n) + '</p>\n          </div>\n        </div>\n\n          <div class="kutupalongs2 mapsections">\n            <div class="mapwords">\n            <h5>' + (null == (n = "Footprint") ? "" : n) + "</h5>\n            <p>" + (null == (n = "This shelter analysis of the Kutupalong extension sites was based on clear satellite imagery taken on days with no cloud cover (Sept 21 and 25, Oct 6 and 11). It shows more than 40,000 shelters in the sites outside the official Kutupalong camp.") ? "" : n) + '</p>\n          </div>\n        </div>\n\n          <div class="kutupalongs3 mapsections">\n            <div class="mapwords">\n            <img class="hidden-sm-down" src="images/latrineicon.png" style="margin-left:-10px"/>\n            <h5>' + (null == (n = "Latrines") ? "" : n) + "</h5>\n            <p>" + (null == (n = "Latrines prevent people from defecating in the open and spreading communicable diseases. There are 7,839 latrine blocks in the camp cluster, with up to five latrines per block. The following data was collected and analysed by the U.N. migration agency IOM, the ISCG coordinating body and disaster assessment agency REACH.") ? "" : n) + '</p>\n\n            <h6 class="mt-3 hidden-sm-down">' + (null == (n = "Latrine usage") ? "" : n) + '</h6>\n            <p class="hidden-sm-down">' + (null == (n = "A communal latrine should be shared by no more than 20 people during the emergency phase of a camp, according to UNHCR standards. Many sites are operating beyond the U.N. guideline.") ? "" : n) + '</p>\n            <div class="hidden-sm-down" id="latrinechart"></div>\n            <div class="hidden-md-up" id="latrinechartsm"></div>\n          </div>\n        </div>\n\n\n    <div class="kutupalongs4 mapsections">\n      <div class="mapwords">\n      <h5>' + (null == (n = "Makeshift latrines") ? "" : n) + "</h5>\n      <p>" + (null == (n = "Some latrines are made by refugees themselves and pose a health risk. Most are too shallow, too close to a water source and poorly protected by cheap plastic sheeting, health experts say.") ? "" : n) + '</p>\n\n    </div>\n  </div>\n\n\n    <div class="kutupalongs5 mapsections">\n      <div class="mapwords">\n      <h5>' + (null == (n = "Too far from a latrine") ? "" : n) + "</h5>\n      <p>" + (null == (n = "Refugee households should be within 50 metres of a latrine. “Close enough to encourage their use but far enough to prevent problems with smells and pests,” the UNHCR guideline says. This map shows refugee shelters that are too far from a latrine.") ? "" : n) + '</p>\n    </div>\n    </div>\n\n    <div class="kutupalongs6 mapsections">\n      <div class="mapwords">\n      <h5>' + (null == (n = "Too close to a latrine") ? "" : n) + "</h5>\n      <p>" + (null == (n = "The UNHCR guideline also specifies that latrine blocks should not be closer than six metres to where people are living. This map shows the latrines located too close to shelters.") ? "" : n) + '</p>\n      <!-- <div id="closeto" class="hidden-md-down"></div> -->\n    </div>\n    </div>\n\n    <div class="kutupalongs7 mapsections">\n      <div class="mapwords">\n\n        <img class="hidden-sm-down" src="images/openicon.png"/>\n      <h5 >' + (null == (n = "Open defecation areas") ? "" : n) + "</h5>\n\n      <p>" + (null == (n = "Open defecation is common in outlying areas where most new arrivals end up. People defecate on the ground or in a shallow pit with no covering shelter. The health risks are “incredibly high” if faecal matter left on the ground is allowed to contaminate sources of water and food, according to REACH.") ? "" : n) + '</p>\n    </div>\n    </div>\n\n    <div class="kutupalongs8 mapsections">\n      <div class="mapwords">\n\n        <img class="hidden-sm-down" src="images/watericon.png"/>\n      <h5>' + (null == (n = "Water pumps") ? "" : n) + "</h5>\n\n      <p>" + (null == (n = "Access to clean water is critical in congested refugee sites. Tube wells should be drilled to a depth of at least 150 metres to reach aquifers free of contamination. By mid-October, more than 4,800 tube wells with hand pumps were installed. As of Nov 26, a third of wells were broken or dried up.") ? "" : n) + '</p>\n    </div>\n    </div>\n\n    <div class="kutupalongs9 mapsections">\n      <div class="mapwords">\n      <h5>' + (null == (n = "Water pumps and latrines") ? "" : n) + "</h5>\n      <p>" + (null == (n = "Health experts worry that some wells in the refugee areas are too shallow and too close to latrines, making them susceptible to contamination. ") ? "" : n) + '</p>\n    </div>\n    </div>\n\n\n    </div>\n\n</div>\n\n\n<div class="container graphic-section-container mt-3" style="position:relative;">\n\n  <!-- <div class="row">\n    <div class="col-lg-2 offset-lg-5 col-md-4 offset-md-4 col-6 offset-3 hidden-sm-down">\n          <hr class="mt-2 smdivide">\n    </div>\n  </div> -->\n\n  <div class="row">\n    <div class="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-12 mt-3">\n      <h5 class="text-center">' + (null == (n = "Examples of problem areas") ? "" : n) + "</h5>\n      <p>" + (null == (n = "A Reuters photographer visited several sites in the extension areas where latrines and water wells were located close together. Latrines should be at least 30 metres from a water source, according to sanitation guidelines. ") ? "" : n) + '</p>\n\n    </div>\n  </div>\n\n  <!-- <div class="flex-row d-flex justify-content-center align-items-center mt-1">\n\n      <div class="key water align-self-center"></div>\n      <p class="align-self-center keytxt">' + (null == (n = "Water pumps") ? "" : n) + '</p>\n      <div class="key latrine align-self-center ml-1"></div>\n      <p class="align-self-center keytxt">' + (null == (n = "Toilets") ? "" : n) + '</p>\n      <div class="key defecation align-self-center ml-1"></div>\n      <p class="align-self-center keytxt">' + (null == (n = "Open defecation areas") ? "" : n) + '</p>\n\n  </div> -->\n\n  <div class="row">\n    <div class="col-xl-10 offset-xl-1 col-12">\n      <div id="example"></div>\n    </div>\n  </div>\n\n  <div class="row">\n    <div class="col-lg-2 offset-lg-5 col-md-4 offset-md-4 col-6 offset-3">\n      <hr class=\'small my-3\'>\n    </div>\n  </div>\n\n\n  <div class="row hidden-sm-down">\n    <!-- <div class="col-lg-6" id="areabb"></div> -->\n    <div class="col-lg-5 col-md-6 offset-lg-1 col-12 leftstuff">\n      <!-- <h6 class="text-center">' + (null == (n = "XXXXX") ? "" : n) + '</h6> -->\n      <p class="mx-2 text-center">' + (null == (n = "The map below shows a number of latrines with tube wells nearby in a northern area of the Kutupalong camp cluster.") ? "" : n) + '</p>\n    </div>\n    <div class="col-lg-5 col-md-6 col-12 mt-1 mt-md-0">\n      <!-- <h6 class="text-center">' + (null == (n = "XXXXX") ? "" : n) + '</h6> -->\n      <p class="mx-2 text-center">' + (null == (n = "In a densely-populated area near the centre of the camp cluster, there are many examples of tube wells and latrines close to each other.") ? "" : n) + '</p>\n    </div>\n\n  </div>\n\n  <div class="row hidden-sm-down">\n    <div class="col-lg-5 col-md-6 offset-lg-1 col-12 leftstuff">\n      <div class="areabb"></div>\n    </div>\n    <div class="col-lg-5 col-md-6 col-12 mt-1 mt-md-0">\n      <div class="areaff2"></div>\n    </div>\n\n  </div>\n\n\n  <div class="row hidden-md-up">\n    <div class="col-12">\n      <p class="mx-2 text-center">' + (null == (n = "On the northern edge of the Kutupalong camp cluster, the map below shows a  large number of open defecation areas and latrines, with tube wells nearby.") ? "" : n) + '</p>\n      <div class="areabb"></div>\n    </div>\n  </div>\n\n  <div class="row hidden-md-up">\n    <div class="col-12 mt-3">\n      <p class="mx-2 text-center">' + (null == (n = "In a densely-populated area near the centre of the camp cluster, there are many examples of tube wells and latrines close to each other.") ? "" : n) + '</p>\n      <div class="areaff2"></div>\n    </div>\n  </div>\n\n  <div class="row">\n    <div class="col-lg-2 offset-lg-5 col-md-4 offset-md-4 col-6 offset-3">\n      <hr class=\'small my-3\'>\n    </div>\n  </div>\n  <div class="row">\n    <div class="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-12">\n      <h5 class="text-center">' + (null == (n = "Contaminated water") ? "" : n) + "</h5>\n      <p>" + (null == (n = "Health teams are monitoring water quality and looking for signs of contamination from human waste. The WHO and Bangladesh Department of Public Health collected 1,018 samples from tube wells and households in the Kutupalong and Balukhali extension sites between Sept 18 and Nov 1. More than 86 percent of water samples tested positive for E. coli, an indicator for faecal contamination.") ? "" : n) + '</p>\n    </div>\n  </div>\n\n  <div class="row">\n    <div class="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-12 my-1">\n      <h6>' + (null == (n = "Water testing results") ? "" : n) + '</h6>\n      <div id="waterchart"></div>\n    </div>\n  </div>\n\n  <div class="row">\n    <div class="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-12">\n      <p>' + (null == (n = "Sanitary latrines and the safe disposal of waste are urgent priorities, along with the testing and treatment of water supplies, said the U.S.-based Centers for Disease Control and Prevention. ") ? "" : n) + "</p>\n      <p>" + (null == (n = "“Too few latrines in the camps poses a risk of faecal contamination of water in the wells and increased risk of waterborne diseases, including cholera,” the CDC said.") ? "" : n) + '</p>\n    </div>\n  </div>\n\n  <div class="row">\n    <div class="col-12">\n      <!-- <img src=\'images/campwater2.jpg\' class="img-fluid mt-1"/> -->\n      <div id=\'closeness\'></div>\n      <p class="text-muted">' + (null == (n = "REUTERS/Navesh Chitrakar") ? "" : n) + '</p>\n    </div>\n  </div>\n\n  <div class="row">\n    <div class="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-12 mt-1">\n      <p>' + (null == (n = "The image above shows a Rohingya refugee woman pumping water from a tube well and washing her clothes at Kutupalong refugee camp. The picture shows how water sources, sanitation and shelter exist in such a confined living space.") ? "" : n) + '</p>\n    </div>\n  </div>\n\n\n\n  <div class="row">\n    <div class="col-lg-2 offset-lg-5 col-md-4 offset-md-4 col-6 offset-3">\n          <hr class="mt-2 smdivide">\n    </div>\n  </div>\n\n  <div class="row">\n    <div class="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-12 mt-3">\n      <h3 class="text-center">' + (null == (n = "Related illnesses") ? "" : n) + "</h3>\n      <p>" + (null == (n = 'Most refugee illnesses are related to poor hygiene and harsh living conditions. <span id="aritxt">Respiratory infections</span> and <span id="diarr">Acute Watery Diarrhoea</span> account for more than half of all illnesses. <span id="skin">Skin infections</span> and injuries due to unsafe camp conditions are also common.') ? "" : n) + '</p>\n      <p class="hidden-sm-down">' + (null == (n = "Cholera has not been confirmed, but the risk is high. Cholera spreads through the ingestion of faecal matter and causes acute watery diarrhoea. Once symptoms start, it can kill within hours if the patient does not get treatment.") ? "" : n) + "</p>\n      <!-- <p>" + (null == (n = "Health teams are watching for other waterborne diseases such as hepatitis E, as well as measles, tuberculosis and dengue.") ? "" : n) + "</p> -->\n      <p>" + (null == (n = "From August 25 to November 4, 2017, a total of 129,218 consultations reported through the Early Warning and Response System (EWARS), a disease surveillance programme in the Cox’s Bazar camps, were deemed worthy of monitoring.") ? "" : n) + '</p>\n    </div>\n  </div>\n\n  <div class="row">\n    <div class="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-12 my-1">\n      <h6>' + (null == (n = "Medical conditions") ? "" : n) + '</h6>\n      <div class="hidden-sm-down" id="diseasechart"></div>\n      <div class="hidden-md-up" id="diseasechartsm"></div>\n    </div>\n  </div>\n\n  <div class="row">\n    <div class="col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-12">\n      <p class="text-md-center">' + (null == (n = "During the same period, there were 143 reported deaths. Most of the deaths were related to respiratory infections and diarrhoea.") ? "" : n) + '</p>\n    </div>\n  </div>\n\n  <div class="row">\n    <div class="col-md-10 offset-md-1 col-12 mb-2">\n      <h6>' + (null == (n = "Daily reported deaths") ? "" : n) + '</h6>\n      <div class="hidden-md-down" id="deathchart"></div>\n      <div class="hidden-lg-up" id="deathchartsm"></div>\n    </div>\n  </div>\n\n\n\n\n  <div class="row">\n    <div class="col-lg-2 offset-lg-5 col-md-4 offset-md-4 col-6 offset-3">\n          <hr class="mt-2 smdivide">\n    </div>\n  </div>\n\n      <div class="row">\n      <div class="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-12 mt-3">\n\n        <h3 class="text-center">' + (null == (n = "Hostile terrain") ? "" : n) + "</h3>\n        <p>" + (null == (n = "The flood-prone, southern tip of Bangladesh is a hostile place for a refugee crisis. ") ? "" : n) + "</p>\n        <p>" + (null == (n = "Refugees arriving in the extension sites face “inhospitable, hilly terrain with insufficient drainage and little or no road access,” said the IOM, which coordinates management of the sites.") ? "" : n) + "</p>\n        <p>" + (null == (n = "Refugees avoid settling on flat areas that can easily flood and build their makeshift bamboo and tarpaulin shelters on steep slopes. Mud is the only flooring for most huts.") ? "" : n) + '</p>\n      </div>\n      </div>\n\n    </div>\n      <div class="row">\n        <div class="col-12">\n          <img style="width:100%" src=\'images/hill2.jpg\'/>\n          <p class=\'text-muted\'>' + (null == (n = "REUTERS/Navesh Chitrakar") ? "" : n) + '</p>\n        </div>\n      </div>\n\n      <div class="container graphic-section-container">\n\n      <div class="row">\n        <div class="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-12 mt-2">\n          <p>' + (null == (n = "As the camps grow, so does the risk of landslides that can bury or wash away flimsy huts. Bags filled with soil are being used as shelter floors and to build retaining walls against potential landslides.") ? "" : n) + "\n          <p>" + (null == (n = "A closer look at a central portion of the camp cluster shows the pattern of makeshift shelters and how refugees prefer to build on hills and slopes instead of low-lying areas. The shelters marked in orange are at risk from landslides, based on elevation data.") ? "" : n) + '</p>\n        </div>\n      </div>\n\n      <div class="row">\n        <div class="col-lg-8 offset-lg-2 col-12 my-1" id=\'footprint\'>\n        </div>\n      </div>\n<!--\n      <div class="row">\n      <div class="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-12 mt-3">\n        <h5 class="text-center">' + (null == (n = "Standing water") ? "" : n) + "</h5>\n        <p>" + (null == (n = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc a metus laoreet, fermentum justo in, mattis leo. Morbi commodo nulla dui, in rutrum tellus euismod maximus. Cras quis mollis orci. Integer sed pulvinar leo, id dictum nibh. Aliquam mollis elit dapibus gravida interdum. Mauris rhoncus pellentesque mi, ut consectetur metus cursus eget. Integer interdum erat nec arcu faucibus, sit amet maximus odio dignissim. ") ? "" : n) + '</p>\n      </div>\n      </div>\n\n      <div class="row">\n        <div class="col-lg-10 offset-lg-1 col-12" id=\'stillwater\'>\n        </div>\n      </div>\n\n      <div class="row">\n      <div class="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-12 mt-3">\n        <p>' + (null == (n = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc a metus laoreet, fermentum justo in, mattis leo. Morbi commodo nulla dui, in rutrum tellus euismod maximus. Cras quis mollis orci. ") ? "" : n) + '</p>\n      </div>\n      </div> -->\n\n      <div class="row">\n        <div class="col-lg-2 offset-lg-5 col-md-4 offset-md-4 col-6 offset-3 my-1">\n              <hr class="mt-2 smdivide">\n        </div>\n      </div>\n\n      <div class="row">\n      <div class="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-12 mt-3">\n        <h3 class="text-center">' + (null == (n = "A lack of space") ? "" : n) + "</h3>\n        <p>" + (null == (n = 'The U.N. sets international guidelines for the density of a refugee camp. It takes into account the number of people and allowances for roads, gardens, health and sanitation facilities, and shared as well as personal space. The recommended "acceptable" space per person is 35 square metres.') ? "" : n) + "</p>\n        <p>" + (null == (n = "The graphic below shows the space available to a refugee in some camps and extension sites.") ? "" : n) + '</p>\n      </div>\n      </div>\n\n      <!-- <div class="row">\n        <div class="col-12 my-1" id="unspace"></div>\n      </div> -->\n\n      <!-- <div class="row">\n      <div class="col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-10 offset-1 mt-3">\n        <h5 class="text-center">' + (null == (n = "The Rohingya reality") ? "" : n) + '</h5>\n        <p class="text-center">' + (null == (n = "Calculating the amount of space available per person in some of the Rohingya camps shows us just how desparately short of space they are, even by refugee standards.") ? "" : n) + '</p>\n      </div>\n      </div> -->\n\n      <div class="row">\n        <div class="col-12 my-1" id="campspace"></div>\n      </div>\n\n      <div class="row">\n      <div class="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-12 mt-3">\n        <p>' + (null == (n = "The trend of new arrivals, estimated at 15,000-17,000 people per month, and lack of space is the main constraint to upgrading shelters to international standards.  The ISCG site management team says another 1,000-1,200 acres of land will be needed for new arrivals and relocating refugees from overcrowded zones. ") ? "" : n) + '</p>\n      </div>\n      </div>\n\n      <div class="row">\n        <div class="col-lg-2 offset-lg-5 col-md-4 offset-md-4 col-6 offset-3 my-1">\n              <hr class="mt-2 smdivide">\n        </div>\n      </div>\n\n\n      <div class="row">\n      <div class="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-12 mt-3">\n        <h3 class="text-center">' + (null == (n = "The future") ? "" : n) + "</h3>\n        <p>" + (null == (n = "On November 23, Bangladesh and Myanmar signed an agreement to begin repatriating Rohingya within two months. Many refugees are pessimistic they will ever go home. ") ? "" : n) + "</p>\n        <p>" + (null == (n = "While the violence in Rakhine has subsided, Rohingya continue to leave, saying they have largely lost their livelihoods and will not go back until their safety and rights to citizenship are guaranteed.") ? "" : n) + "</p>\n        <p>" + (null == (n = "“Repatriation at this point seems hasty and reckless as the conditions which led to the refugees fleeing have not yet been addressed,” Su-Ann Oh, a visiting research fellow at the Institute for Southeast Asian Studies, wrote in a November 30 commentary. ") ? "" : n) + "</p>\n        <p>" + (null == (n = "While the repatriation issue drags on, aid agencies are scaling up operations as the crisis continues to grow with more arrivals from Myanmar each day. ") ? "" : n) + "</p>\n        <p>" + (null == (n = "The map below compares the current refugee areas to some of the world’s major cities. It also shows the space needed if the refugees are moved to a camp that meets international standards.") ? "" : n) + '</p>\n\n      </div>\n      </div>\n\n      <div class="row mt-1">\n        <div class="col-lg-4 col-md-6 col-sm-8 offset-sm-2 offset-md-0 col-12" >\n          <h6 class="text-center mt-1">' + (null == (n = "New York") ? "" : n) + '</h6>\n          <div class="nyc"></div>\n        </div>\n        <div class="col-lg-4 col-md-6 col-sm-8 offset-sm-2 offset-md-0 col-12">\n          <h6 class="text-center mt-md-1 mt-2">' + (null == (n = "London") ? "" : n) + '</h6>\n          <div class="london"></div>\n        </div>\n        <div class="col-lg-4 hidden-md-down">\n          <h6 class="text-center mt-1">' + (null == (n = "Hong Kong") ? "" : n) + '</h6>\n          <div class="hk"></div>\n        </div>\n      </div>\n\n      <div class="row">\n      <div class="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-12 mt-3">\n        <p>' + (null == (n = "In September, Robert Watkins, the then U.N. resident coordinator in Bangladesh, was asked by a local news website how long the crisis would last.") ? "" : n) + "</p>\n        <p>" + (null == (n = "“Every time I have seen the refugee situation like this, it lasts longer than we think,” he replied. ") ? "" : n) + '</p>\n      </div>\n      </div>\n\n\n      <div class="credit">\n        <p>' + (null == (n = "Satellite image: Planet Labs") ? "" : n) + '</p>\n      </div>\n\n      <div class="credit2">\n        <p>' + (null == (n = "Satellite image: Planet Labs") ? "" : n) + '</p>\n      </div>\n\n\n\n\n      <div class="row">\n          <div class="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-12 mt-3">\n            <hr class="end mb-1">\n              <p class="graphic-source">' + (null == (n = "* Includes Kutupalong Refugee Camp, Nayapara Refugee Camp, Kutupalong Makeshift Camp and its occupied expansion zones, Bulukhali Makeshift Camp, Leda Makeshift Camp, Burma Para, Chakmarkul, Hakimpara, Jamtoli, Potibonia, Shamlapur and Urchinprang sponteaous sites.") ? "" : n) + "<br /><br />" + (null == (n = "Note: Camp population data as of Oct 17.") ? "" : n) + "<br /><br />" + (null == (n = "Satellite images: Planet Labs") ? "" : n) + "<br /><br />" + (null == (n = "Sources: Inter Sector Coordination Group (ISCG); REACH Initiative; OpenStreetMap; World Health Organization; UNHCR; Reuters") ? "" : n) + "<br /><br />" + (null == (n = "By Weiyi Cai and Simon Scarr | REUTERS GRAPHICS") ? "" : n) + "<br>" + (null == (n = "Additional editing and reporting by Darren Schuettler") ? "" : n) + "</p>\n          </div>\n      </div>\n\n</div>\n"
    }
}(),
function() {
    window.Reuters = window.Reuters || {},
    window.Reuters.Graphics = window.Reuters.Graphics || {},
    window.Reuters.Graphics.Template = window.Reuters.Graphics.Template || {},
    window.Reuters.Graphics.Template.ff1 = function(t) {
        var n = "";
        return n += '<!-- Generated by ai2html v0.65.4 - 2017-11-22 17:54 -->\n<!-- ai file: ff1.ai -->\n<style type=\'text/css\' media=\'screen,print\'>\n\t#g-ff1-box .g-artboard {\n\t\tmargin:0 auto;\n\t}\n\t#g-ff1-box .g-artboard p {\n\t\tmargin:0;\n\t}\n\t.g-aiAbs {\n\t\tposition:absolute;\n\t}\n\t.g-aiImg {\n\t\tdisplay:block;\n\t\twidth:100% !important;\n\t}\n\t.g-aiPointText p { white-space: nowrap; }\n\t#g-ff1-lg {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-ff1-lg p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:100;\n\t\tfont-size:12px;\n\t\tline-height:14px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(0,0,0);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\n</style>\n\n<div id="g-ff1-box" class="ai2html">\n\n\t<!-- Artboard: lg -->\n\t<div id="g-ff1-lg" class="g-artboard g-artboard-v3" data-min-width=\'350\'>\n\t\t<img id="g-ai0-0" class="g-aiImg" src="images/graphics/ff1-lg.png"/>\n\t\t<div id="g-ai0-1" class="g-Layer1 g-aiAbs g-aiPointText" style="top:5.6291%;margin-top:-7.7px;left:3.1772%;width:26px;">\n\t\t\t<p>10 m</p>\n\t\t</div>\n\t\t<div id="g-ai0-2" class="g-Layer1 g-aiAbs g-aiPointText" style="transform: matrix(0.9795,0.2016,-0.2016,0.9795,0,0);transform-origin: 50% 56.4919009731512%;-webkit-transform: matrix(0.9795,0.2016,-0.2016,0.9795,0,0);-webkit-transform-origin: 50% 56.4919009731512%;-ms-transform: matrix(0.9795,0.2016,-0.2016,0.9795,0,0);-ms-transform-origin: 50% 56.4919009731512%;top:51.6291%;margin-top:-7.7px;left:14.0327%;width:46px;">\n\t\t\t<p>Footpath</p>\n\t\t</div>\n\t</div>\n\n</div>\n\n<!-- End ai2html - 2017-11-22 17:54 -->\n'
    }
}(),
function() {
    window.Reuters = window.Reuters || {},
    window.Reuters.Graphics = window.Reuters.Graphics || {},
    window.Reuters.Graphics.Template = window.Reuters.Graphics.Template || {},
    window.Reuters.Graphics.Template.ff2 = function(t) {
        var n = "";
        return n += '<!-- Generated by ai2html v0.65.4 - 2017-12-01 16:59 -->\n<!-- ai file: ff2.ai -->\n<style type=\'text/css\' media=\'screen,print\'>\n\t#g-ff2-box .g-artboard {\n\t\tmargin:0 auto;\n\t}\n\t#g-ff2-box .g-artboard p {\n\t\tmargin:0;\n\t}\n\t.g-aiAbs {\n\t\tposition:absolute;\n\t}\n\t.g-aiImg {\n\t\tdisplay:block;\n\t\twidth:100% !important;\n\t}\n\t.g-aiPointText p { white-space: nowrap; }\n\t#g-ff2-lg {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-ff2-lg p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:100;\n\t\tfont-size:13px;\n\t\tline-height:16px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(0,0,0);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-ff2-lg .g-pstyle0 {\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t}\n\t#g-ff2-lg .g-pstyle1 {\n\t\tfont-size:12px;\n\t\tline-height:14px;\n\t}\n\n\t\t/* Custom CSS */\n\t\t\t\t#g-ff2-lg {\n\t\tdisplay:block;\n\t\tmargin:0 auto;\n\t\t}\n\n\n</style>\n\n<div id="g-ff2-box" class="ai2html">\n\n\t<!-- Artboard: lg -->\n\t<div id="g-ff2-lg" class="g-artboard g-artboard-v3" data-min-width=\'450\'>\n\t\t<img id="g-ai0-0" class="g-aiImg" src="images/graphics/ff2-lg.png"/>\n\t\t<div id="g-ai0-1" class="g-Layer1 g-aiAbs g-aiPointText" style="top:11.1452%;margin-top:-9px;left:70.2442%;width:120px;">\n\t\t\t<p>Kutupalong Makeshift</p>\n\t\t</div>\n\t\t<div id="g-ai0-2" class="g-Layer1 g-aiAbs g-aiPointText" style="top:64.3769%;margin-top:-9.3px;left:44.048%;width:40px;">\n\t\t\t<p class="g-pstyle0">Zone F</p>\n\t\t</div>\n\t\t<div id="g-ai0-3" class="g-Layer1 g-aiAbs g-aiPointText" style="top:65.8055%;margin-top:-9.3px;left:2.7444%;width:41px;">\n\t\t\t<p class="g-pstyle0">Zone E</p>\n\t\t</div>\n\t\t<div id="g-ai0-4" class="g-Layer1 g-aiAbs g-aiPointText" style="top:94.772%;margin-top:-7.7px;left:2.4924%;width:26px;">\n\t\t\t<p class="g-pstyle1">10 m</p>\n\t\t</div>\n\t</div>\n\n</div>\n\n<!-- End ai2html - 2017-12-01 16:59 -->\n';
    }
}(),
function() {
    window.Reuters = window.Reuters || {},
    window.Reuters.Graphics = window.Reuters.Graphics || {},
    window.Reuters.Graphics.Template = window.Reuters.Graphics.Template || {},
    window.Reuters.Graphics.Template.fiftybuffer = function(t) {
        var n = "";
        return n += '<!-- Generated by ai2html v0.65.4 - 2017-11-30 18:48 -->\n<!-- ai file: fiftybuffer.ai -->\n<style type=\'text/css\' media=\'screen,print\'>\n\t#g-fiftybuffer-box .g-artboard {\n\t\tmargin:0 auto;\n\t}\n\t#g-fiftybuffer-box .g-artboard p {\n\t\tmargin:0;\n\t}\n\t.g-aiAbs {\n\t\tposition:absolute;\n\t}\n\t.g-aiImg {\n\t\tdisplay:block;\n\t\twidth:100% !important;\n\t}\n\t.g-aiPointText p { white-space: nowrap; }\n\t#g-fiftybuffer-sm {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-fiftybuffer-sm p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:400;\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(0,0,0);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-fiftybuffer-sm .g-pstyle0 {\n\t\tfont-weight:bold;\n\t\tfont-size:12px;\n\t\tline-height:14px;\n\t\tfilter:alpha(opacity=60);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=60);\n\t\topacity:0.6;\n\t\tletter-spacing:0.2em;\n\t\tcolor:rgb(117,117,117);\n\t}\n\t#g-fiftybuffer-sm .g-pstyle1 {\n\t\tfont-size:12px;\n\t\tline-height:14px;\n\t\tfilter:alpha(opacity=60);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=60);\n\t\topacity:0.6;\n\t\ttext-align:center;\n\t\tcolor:rgb(117,117,117);\n\t}\n\t#g-fiftybuffer-sm .g-pstyle2 {\n\t\ttext-align:center;\n\t}\n\t#g-fiftybuffer-sm .g-pstyle3 {\n\t\tfont-weight:100;\n\t\tfont-size:11px;\n\t\tline-height:13px;\n\t\ttext-align:center;\n\t\tcolor:rgb(117,117,117);\n\t}\n\t#g-fiftybuffer-sm .g-pstyle4 {\n\t\tfont-size:12px;\n\t\tline-height:14px;\n\t\tfilter:alpha(opacity=60);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=60);\n\t\topacity:0.6;\n\t\tcolor:rgb(117,117,117);\n\t}\n\t#g-fiftybuffer-md {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-fiftybuffer-md p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:400;\n\t\tfont-size:15px;\n\t\tline-height:18px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(0,0,0);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-fiftybuffer-md .g-pstyle0 {\n\t\tfont-weight:bold;\n\t\tfilter:alpha(opacity=60);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=60);\n\t\topacity:0.6;\n\t\tletter-spacing:0.2em;\n\t\tcolor:rgb(117,117,117);\n\t}\n\t#g-fiftybuffer-md .g-pstyle1 {\n\t\tfilter:alpha(opacity=60);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=60);\n\t\topacity:0.6;\n\t\ttext-align:center;\n\t\tcolor:rgb(117,117,117);\n\t}\n\t#g-fiftybuffer-md .g-pstyle2 {\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t\tfilter:alpha(opacity=60);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=60);\n\t\topacity:0.6;\n\t\tcolor:rgb(117,117,117);\n\t}\n\t#g-fiftybuffer-md .g-pstyle3 {\n\t\ttext-align:center;\n\t}\n\t#g-fiftybuffer-md .g-pstyle4 {\n\t\tfont-weight:100;\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t\ttext-align:center;\n\t\tcolor:rgb(117,117,117);\n\t}\n\t#g-fiftybuffer-lg {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-fiftybuffer-lg p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:400;\n\t\tfont-size:15px;\n\t\tline-height:18px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(0,0,0);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-fiftybuffer-lg .g-pstyle0 {\n\t\tfont-weight:bold;\n\t\tfont-size:16px;\n\t\tline-height:19px;\n\t\tfilter:alpha(opacity=60);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=60);\n\t\topacity:0.6;\n\t\tletter-spacing:0.2em;\n\t\tcolor:rgb(117,117,117);\n\t}\n\t#g-fiftybuffer-lg .g-pstyle1 {\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t\tfilter:alpha(opacity=60);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=60);\n\t\topacity:0.6;\n\t\ttext-align:center;\n\t\tcolor:rgb(117,117,117);\n\t}\n\t#g-fiftybuffer-lg .g-pstyle2 {\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t\tfilter:alpha(opacity=60);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=60);\n\t\topacity:0.6;\n\t\tcolor:rgb(117,117,117);\n\t}\n\t#g-fiftybuffer-lg .g-pstyle3 {\n\t\ttext-align:center;\n\t}\n\n\t\t/* Custom CSS */\n\t\t\t\t#g-fiftybuffer-lg {\n\t\tdisplay:block;\n\t\tmargin:0 auto;\n\t\t}\n\t\t#g-fiftybuffer-sm, \n\t\t#g-fiftybuffer-md{\n\t\tdisplay:none;\n\t\tmargin:0;\n\t\t}\n\t\t@media (max-width: 992px) {\n\t\t\t#g-fiftybuffer-lg,\n\t\t\t#g-fiftybuffer-sm{\n\t\t\tdisplay:none;\n\t\t\t}\n\t\t\t#g-fiftybuffer-md{\n\t\t\tdisplay:block;\n\t\t\tmargin: 0 auto;\n\t\t\t}\n\t\t }\n\t\t@media (max-width: 750px) {\n\t\t\t#g-fiftybuffer-lg,\n\t\t\t#g-fiftybuffer-md{\n\t\t\tdisplay:none;\n\t\t\t}\n\t\t\t#g-fiftybuffer-sm{\n\t\t\tdisplay:block;\n\t\t\tmargin: 0 auto;\n\t\t\t}\n\t\t }\n\n\n</style>\n\n<div id="g-fiftybuffer-box" class="ai2html">\n\n\t<!-- Artboard: sm -->\n\t<div id="g-fiftybuffer-sm" class="g-artboard g-artboard-v3" data-min-width=\'410\' data-max-width=\'749\'>\n\t\t<img id="g-ai0-0" class="g-aiImg" src="images/graphics/fiftybuffer-sm.jpg"/>\n\t\t<div id="g-ai0-1" class="g-Layer_21 g-aiAbs g-aiPointText" style="top:5.1045%;margin-top:-8.3px;left:73.1824%;width:98px;">\n\t\t\t<p class="g-pstyle0">BANGLADESH</p>\n\t\t</div>\n\t\t<div id="g-ai0-2" class="g-Layer_21 g-aiAbs g-aiPointText" style="top:16.8157%;margin-top:-15.1px;left:74.6444%;margin-left:-8.7805%;width:74px;">\n\t\t\t<p class="g-pstyle1">Kutupalong</p>\n\t\t\t<p class="g-pstyle1">Refugee Camp</p>\n\t\t</div>\n\t\t<div id="g-ai0-3" class="g-SM g-aiAbs g-aiPointText" style="top:27.5961%;margin-top:-18px;left:41.2021%;margin-left:-17.561%;width:146px;">\n\t\t\t<p class="g-pstyle2">Few areas are more than</p>\n\t\t\t<p class="g-pstyle2">50m away from toilets</p>\n\t\t</div>\n\t\t<div id="g-ai0-4" class="g-Layer_21 g-aiAbs g-aiPointText" style="top:51.4858%;margin-top:-7.1px;left:5.499%;margin-left:-3.2927%;width:29px;">\n\t\t\t<p class="g-pstyle3">200 m</p>\n\t\t</div>\n\t\t<div id="g-ai0-5" class="g-Layer_21 g-aiAbs g-aiPointText" style="top:76.8424%;margin-top:-22.3px;left:82.9702%;width:59px;">\n\t\t\t<p class="g-pstyle4">Cox&rsquo;s Bazar</p>\n\t\t\t<p class="g-pstyle4">- Teknaf</p>\n\t\t\t<p class="g-pstyle4">Highway</p>\n\t\t</div>\n\t</div>\n\n\t<!-- Artboard: md -->\n\t<div id="g-fiftybuffer-md" class="g-artboard g-artboard-v3" data-min-width=\'750\' data-max-width=\'919\'>\n\t\t<img id="g-ai1-0" class="g-aiImg" src="images/graphics/fiftybuffer-md.jpg"/>\n\t\t<div id="g-ai1-1" class="g-MD g-aiAbs g-aiPointText" style="top:5.8672%;margin-top:-10.6px;left:82.3154%;width:121px;">\n\t\t\t<p class="g-pstyle0">BANGLADESH</p>\n\t\t</div>\n\t\t<div id="g-ai1-2" class="g-MD g-aiAbs g-aiPointText" style="top:17.1569%;margin-top:-19.1px;left:72.5279%;margin-left:-6%;width:92px;">\n\t\t\t<p class="g-pstyle1">Kutupalong</p>\n\t\t\t<p class="g-pstyle1">Refugee Camp</p>\n\t\t</div>\n\t\t<div id="g-ai1-3" class="g-MD g-aiAbs g-aiPointText" style="top:24.702%;margin-top:-26.4px;left:87.7059%;width:68px;">\n\t\t\t<p class="g-pstyle2">Cox&rsquo;s Bazar</p>\n\t\t\t<p class="g-pstyle2">- Teknaf</p>\n\t\t\t<p class="g-pstyle2">Highway</p>\n\t\t</div>\n\t\t<div id="g-ai1-4" class="g-MD g-aiAbs g-aiPointText" style="top:28.7759%;margin-top:-19.1px;left:41.3603%;margin-left:-10.2667%;width:156px;">\n\t\t\t<p class="g-pstyle3">Few areas are more than</p>\n\t\t\t<p class="g-pstyle3">50m away from toilets</p>\n\t\t</div>\n\t\t<div id="g-ai1-5" class="g-MD g-aiAbs g-aiPointText" style="top:57.2685%;margin-top:-9.3px;left:9.7209%;margin-left:-2.2667%;width:36px;">\n\t\t\t<p class="g-pstyle4">200 m</p>\n\t\t</div>\n\t</div>\n\n\t<!-- Artboard: lg -->\n\t<div id="g-fiftybuffer-lg" class="g-artboard g-artboard-v3" data-min-width=\'920\'>\n\t\t<img id="g-ai2-0" class="g-aiImg" src="images/graphics/fiftybuffer-lg.jpg"/>\n\t\t<div id="g-ai2-1" class="g-kutupalong_official_camp_outline g-aiAbs g-aiPointText" style="top:5.9394%;margin-top:-11.2px;left:83.8153%;width:129px;">\n\t\t\t<p class="g-pstyle0">BANGLADESH</p>\n\t\t</div>\n\t\t<div id="g-ai2-2" class="g-Refugee_camp_footprint g-aiAbs g-aiPointText" style="top:17.4593%;margin-top:-18px;left:72.787%;margin-left:-4.5652%;width:86px;">\n\t\t\t<p class="g-pstyle1">Kutupalong</p>\n\t\t\t<p class="g-pstyle1">Refugee Camp</p>\n\t\t</div>\n\t\t<div id="g-ai2-3" class="g-kutupalong_official_camp_outline g-aiAbs g-aiPointText" style="top:25.4901%;margin-top:-26.4px;left:89.7169%;width:68px;">\n\t\t\t<p class="g-pstyle2">Cox&rsquo;s Bazar</p>\n\t\t\t<p class="g-pstyle2">- Teknaf</p>\n\t\t\t<p class="g-pstyle2">Highway</p>\n\t\t</div>\n\t\t<div id="g-ai2-4" class="g-Layer_19 g-aiAbs g-aiPointText" style="top:29.5498%;margin-top:-19.1px;left:40.5482%;margin-left:-8.3696%;width:156px;">\n\t\t\t<p class="g-pstyle3">Few areas are more than</p>\n\t\t\t<p class="g-pstyle3">50m away from toilets</p>\n\t\t</div>\n\t\t<div id="g-ai2-5" class="g-kutupalong_official_camp_outline g-aiAbs g-aiPointText" style="top:59.7362%;margin-top:-9.6px;left:7.8294%;margin-left:-1.9022%;width:37px;">\n\t\t\t<p class="g-pstyle1">200 m</p>\n\t\t</div>\n\t</div>\n\n</div>\n\n<!-- End ai2html - 2017-11-30 18:48 -->\n'
    }
}(),
function() {
    window.Reuters = window.Reuters || {},
    window.Reuters.Graphics = window.Reuters.Graphics || {},
    window.Reuters.Graphics.Template = window.Reuters.Graphics.Template || {},
    window.Reuters.Graphics.Template.footprint = function(t) {
        var n = "";
        return n += '<!-- Generated by ai2html v0.65.4 - 2017-11-13 11:12 -->\n<!-- ai file: footprint.ai -->\n<style type=\'text/css\' media=\'screen,print\'>\n\t#g-footprint-box .g-artboard {\n\t\tmargin:0 auto;\n\t}\n\t#g-footprint-box .g-artboard p {\n\t\tmargin:0;\n\t}\n\t.g-aiAbs {\n\t\tposition:absolute;\n\t}\n\t.g-aiImg {\n\t\tdisplay:block;\n\t\twidth:100% !important;\n\t}\n\t.g-aiPointText p { white-space: nowrap; }\n\t#g-footprint-sm {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-footprint-sm p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:400;\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(0,0,0);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-footprint-sm .g-pstyle0 {\n\t\tcolor:rgb(166,168,171);\n\t}\n\t#g-footprint-sm .g-pstyle1 {\n\t\tfont-weight:bold;\n\t}\n\t#g-footprint-sm .g-pstyle2 {\n\t\ttext-align:right;\n\t}\n\t#g-footprint-sm .g-pstyle3 {\n\t\tcolor:rgb(175,199,231);\n\t}\n\t#g-footprint-sm .g-pstyle4 {\n\t\tfont-weight:bold;\n\t\ttext-align:center;\n\t}\n\t#g-footprint-md {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-footprint-md p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:400;\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(0,0,0);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-footprint-md .g-pstyle0 {\n\t\tfont-weight:bold;\n\t}\n\t#g-footprint-md .g-pstyle1 {\n\t\ttext-align:right;\n\t}\n\t#g-footprint-md .g-pstyle2 {\n\t\tcolor:rgb(166,168,171);\n\t}\n\t#g-footprint-md .g-pstyle3 {\n\t\tcolor:rgb(175,199,231);\n\t}\n\t#g-footprint-md .g-pstyle4 {\n\t\tfont-weight:bold;\n\t\ttext-align:center;\n\t}\n\t#g-footprint-lg {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-footprint-lg p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:400;\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(0,0,0);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-footprint-lg .g-pstyle0 {\n\t\tfont-weight:bold;\n\t}\n\t#g-footprint-lg .g-pstyle1 {\n\t\ttext-align:right;\n\t}\n\t#g-footprint-lg .g-pstyle2 {\n\t\tcolor:rgb(166,168,171);\n\t}\n\t#g-footprint-lg .g-pstyle3 {\n\t\tcolor:rgb(175,199,231);\n\t}\n\t#g-footprint-lg .g-pstyle4 {\n\t\tfont-weight:bold;\n\t\ttext-align:center;\n\t}\n\t#g-footprint-xs {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-footprint-xs p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:400;\n\t\tfont-size:12px;\n\t\tline-height:14px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(0,0,0);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-footprint-xs .g-pstyle0 {\n\t\tfont-size:9px;\n\t\tline-height:10px;\n\t\tcolor:rgb(166,168,171);\n\t}\n\t#g-footprint-xs .g-pstyle1 {\n\t\tfont-weight:bold;\n\t}\n\t#g-footprint-xs .g-pstyle2 {\n\t\ttext-align:right;\n\t}\n\t#g-footprint-xs .g-pstyle3 {\n\t\tfont-weight:bold;\n\t\tline-height:15px;\n\t}\n\t#g-footprint-xs .g-pstyle4 {\n\t\tfont-weight:bold;\n\t\ttext-align:center;\n\t}\n\n\t\t/* Custom CSS */\n\t\t\t\t#g-footprint-lg {\n\t\tdisplay:block;\n\t\tmargin:0 auto;\n\t\t}\n\t\t#g-footprint-xs, \n\t\t#g-footprint-sm, \n\t\t#g-footprint-md{\n\t\tdisplay:none;\n\t\tmargin:0;\n\t\t}\n\t\t@media (max-width: 992px) {\n\t\t\t#g-footprint-lg,\n\t\t\t#g-footprint-xs, \n\t\t\t#g-footprint-sm{\n\t\t\tdisplay:none;\n\t\t\t}\n\t\t\t#g-footprint-md{\n\t\t\tdisplay:block;\n\t\t\tmargin: 0 auto;\n\t\t\t}\n\t\t }\n\t\t@media (max-width: 768px) {\n\t\t\t#g-footprint-lg,\n\t\t\t#g-footprint-xs,\n\t\t\t#g-footprint-md{\n\t\t\tdisplay:none;\n\t\t\t}\n\t\t\t#g-footprint-sm{\n\t\t\tdisplay:block;\n\t\t\tmargin: 0 auto;\n\t\t\t}\n\t\t }\n\t\t@media (max-width: 768px) {\n\t\t\t#g-footprint-lg,\n\t\t\t#g-footprint-sm,\n\t\t\t#g-footprint-md{\n\t\t\tdisplay:none;\n\t\t\t}\n\t\t\t#g-footprint-xs{\n\t\t\tdisplay:block;\n\t\t\tmargin: 0 auto;\n\t\t\t}\n\t\t }\n\n\n</style>\n\n<div id="g-footprint-box" class="ai2html">\n\n\t<!-- Artboard: sm -->\n\t<div id="g-footprint-sm" class="g-artboard g-artboard-v3" data-min-width=\'510\' data-max-width=\'689\'>\n\t\t<img id="g-ai0-0" class="g-aiImg" src="images/graphics/footprint-sm.png"/>\n\t\t<div id="g-ai0-1" class="g-Layer1 g-aiAbs g-aiPointText" style="top:3.2626%;margin-top:-9.6px;left:40.6472%;width:95px;">\n\t\t\t<p>Hillside shelters</p>\n\t\t</div>\n\t\t<div id="g-ai0-2" class="g-Layer1 g-aiAbs g-aiPointText" style="transform: matrix(0.6103,-0.7922,0.7922,0.6103,0,0);transform-origin: 50% 55.2242232539156%;-webkit-transform: matrix(0.6103,-0.7922,0.7922,0.6103,0,0);-webkit-transform-origin: 50% 55.2242232539156%;-ms-transform: matrix(0.6103,-0.7922,0.7922,0.6103,0,0);-ms-transform-origin: 50% 55.2242232539156%;top:16.921%;margin-top:-9.6px;left:87.5006%;width:53px;">\n\t\t\t<p class="g-pstyle0">Highway</p>\n\t\t</div>\n\t\t<div id="g-ai0-3" class="g-Layer1 g-aiAbs g-aiPointText" style="top:15.2253%;margin-top:-10px;left:60.7992%;width:107px;">\n\t\t\t<p class="g-pstyle1">Hakimpara camp</p>\n\t\t</div>\n\t\t<div id="g-ai0-4" class="g-Layer1 g-aiAbs g-aiPointText" style="top:17.0105%;margin-top:-18px;right:73.1094%;width:74px;">\n\t\t\t<p class="g-pstyle2">Structures</p>\n\t\t\t<p class="g-pstyle2">along ridges</p>\n\t\t</div>\n\t\t<div id="g-ai0-5" class="g-Layer1 g-aiAbs g-aiPointText" style="transform: matrix(0.7183,-0.6958,0.6958,0.7183,0,0);transform-origin: 50% 55.2239567391083%;-webkit-transform: matrix(0.7183,-0.6958,0.6958,0.7183,0,0);-webkit-transform-origin: 50% 55.2239567391083%;-ms-transform: matrix(0.7183,-0.6958,0.6958,0.7183,0,0);-ms-transform-origin: 50% 55.2239567391083%;top:33.9381%;margin-top:-9.6px;left:94.3501%;width:32px;">\n\t\t\t<p class="g-pstyle3">River</p>\n\t\t</div>\n\t\t<div id="g-ai0-6" class="g-Layer1 g-aiAbs g-aiPointText" style="top:48.4921%;margin-top:-9.6px;left:74.9117%;width:71px;">\n\t\t\t<p>Packed hills</p>\n\t\t</div>\n\t\t<div id="g-ai0-7" class="g-Layer1 g-aiAbs g-aiPointText" style="top:49.4834%;margin-top:-10px;left:6.6173%;width:86px;">\n\t\t\t<p class="g-pstyle1">Jamtoli camp</p>\n\t\t</div>\n\t\t<div id="g-ai0-8" class="g-Layer1 g-aiAbs g-aiPointText" style="top:67.1661%;margin-top:-18px;right:79.3974%;width:100px;">\n\t\t\t<p class="g-pstyle2">Flat, flood-prone</p>\n\t\t\t<p class="g-pstyle2">areas left empty</p>\n\t\t</div>\n\t\t<div id="g-ai0-9" class="g-Layer1 g-aiAbs g-aiPointText" style="top:92.1095%;margin-top:-26.4px;right:47.2274%;width:88px;">\n\t\t\t<p class="g-pstyle2">Hill covered</p>\n\t\t\t<p class="g-pstyle2">with makeshift</p>\n\t\t\t<p class="g-pstyle2">structures</p>\n\t\t</div>\n\t\t<div id="g-ai0-10" class="g-Layer1 g-aiAbs g-aiPointText" style="top:92.2051%;margin-top:-26.8px;left:70.4519%;margin-left:-5.8824%;width:62px;">\n\t\t\t<p class="g-pstyle4">Baggoha</p>\n\t\t\t<p class="g-pstyle4">Potibonia</p>\n\t\t\t<p class="g-pstyle4">camp</p>\n\t\t</div>\n\t</div>\n\n\t<!-- Artboard: md -->\n\t<div id="g-footprint-md" class="g-artboard g-artboard-v3" data-min-width=\'690\' data-max-width=\'729\'>\n\t\t<img id="g-ai1-0" class="g-aiImg" src="images/graphics/footprint-md.png"/>\n\t\t<div id="g-ai1-1" class="g-Layer1 g-aiAbs g-aiPointText" style="top:3.1712%;margin-top:-9.6px;left:40.6846%;width:95px;">\n\t\t\t<p>Hillside shelters</p>\n\t\t</div>\n\t\t<div id="g-ai1-2" class="g-Layer1 g-aiAbs g-aiPointText" style="top:15.1974%;margin-top:-10px;left:61.9683%;width:107px;">\n\t\t\t<p class="g-pstyle0">Hakimpara camp</p>\n\t\t</div>\n\t\t<div id="g-ai1-3" class="g-Layer1 g-aiAbs g-aiPointText" style="top:16.7296%;margin-top:-18px;right:73.0432%;width:74px;">\n\t\t\t<p class="g-pstyle1">Structures</p>\n\t\t\t<p class="g-pstyle1">along ridges</p>\n\t\t</div>\n\t\t<div id="g-ai1-4" class="g-Layer1 g-aiAbs g-aiPointText" style="transform: matrix(0.6103,-0.7922,0.7922,0.6103,0,0);transform-origin: 50% 55.2239567391083%;-webkit-transform: matrix(0.6103,-0.7922,0.7922,0.6103,0,0);-webkit-transform-origin: 50% 55.2239567391083%;-ms-transform: matrix(0.6103,-0.7922,0.7922,0.6103,0,0);-ms-transform-origin: 50% 55.2239567391083%;top:18.1982%;margin-top:-9.6px;left:88.0149%;width:53px;">\n\t\t\t<p class="g-pstyle2">Highway</p>\n\t\t</div>\n\t\t<div id="g-ai1-5" class="g-Layer1 g-aiAbs g-aiPointText" style="transform: matrix(0.7183,-0.6958,0.6958,0.7183,0,0);transform-origin: 50% 55.2239567391083%;-webkit-transform: matrix(0.7183,-0.6958,0.6958,0.7183,0,0);-webkit-transform-origin: 50% 55.2239567391083%;-ms-transform: matrix(0.7183,-0.6958,0.6958,0.7183,0,0);-ms-transform-origin: 50% 55.2239567391083%;top:33.2252%;margin-top:-9.6px;left:95.6865%;width:32px;">\n\t\t\t<p class="g-pstyle3">River</p>\n\t\t</div>\n\t\t<div id="g-ai1-6" class="g-Layer1 g-aiAbs g-aiPointText" style="top:49.6183%;margin-top:-9.6px;left:74.8286%;width:71px;">\n\t\t\t<p>Packed hills</p>\n\t\t</div>\n\t\t<div id="g-ai1-7" class="g-Layer1 g-aiAbs g-aiPointText" style="top:50.7158%;margin-top:-10px;left:9.9808%;width:86px;">\n\t\t\t<p class="g-pstyle0">Jamtoli camp</p>\n\t\t</div>\n\t\t<div id="g-ai1-8" class="g-Layer1 g-aiAbs g-aiPointText" style="top:68.2995%;margin-top:-18px;right:85.2259%;width:100px;">\n\t\t\t<p class="g-pstyle1">Flat, flood-prone</p>\n\t\t\t<p class="g-pstyle1">areas left empty</p>\n\t\t</div>\n\t\t<div id="g-ai1-9" class="g-Layer1 g-aiAbs g-aiPointText" style="top:93.299%;margin-top:-26.4px;left:41.0079%;width:88px;">\n\t\t\t<p>Hill covered</p>\n\t\t\t<p>with makeshift</p>\n\t\t\t<p>structures</p>\n\t\t</div>\n\t\t<div id="g-ai1-10" class="g-Layer1 g-aiAbs g-aiPointText" style="top:93.3719%;margin-top:-26.8px;left:70.3925%;margin-left:-4.3478%;width:62px;">\n\t\t\t<p class="g-pstyle4">Baggoha</p>\n\t\t\t<p class="g-pstyle4">Potibonia</p>\n\t\t\t<p class="g-pstyle4">camp</p>\n\t\t</div>\n\t</div>\n\n\t<!-- Artboard: lg -->\n\t<div id="g-footprint-lg" class="g-artboard g-artboard-v3" data-min-width=\'730\'>\n\t\t<img id="g-ai2-0" class="g-aiImg" src="images/graphics/footprint-lg.png"/>\n\t\t<div id="g-ai2-1" class="g-Layer1 g-aiAbs g-aiPointText" style="top:2.9543%;margin-top:-9.6px;left:40.6688%;width:95px;">\n\t\t\t<p>Hillside shelters</p>\n\t\t</div>\n\t\t<div id="g-ai2-2" class="g-Layer1 g-aiAbs g-aiPointText" style="top:14.9532%;margin-top:-10px;left:61.9525%;width:107px;">\n\t\t\t<p class="g-pstyle0">Hakimpara camp</p>\n\t\t</div>\n\t\t<div id="g-ai2-3" class="g-Layer1 g-aiAbs g-aiPointText" style="top:16.3806%;margin-top:-18px;right:73.0621%;width:74px;">\n\t\t\t<p class="g-pstyle1">Structures</p>\n\t\t\t<p class="g-pstyle1">along ridges</p>\n\t\t</div>\n\t\t<div id="g-ai2-4" class="g-Layer1 g-aiAbs g-aiPointText" style="transform: matrix(0.6103,-0.7922,0.7922,0.6103,0,0);transform-origin: 50% 55.2239567391083%;-webkit-transform: matrix(0.6103,-0.7922,0.7922,0.6103,0,0);-webkit-transform-origin: 50% 55.2239567391083%;-ms-transform: matrix(0.6103,-0.7922,0.7922,0.6103,0,0);-ms-transform-origin: 50% 55.2239567391083%;top:18.0669%;margin-top:-9.6px;left:88.0999%;width:53px;">\n\t\t\t<p class="g-pstyle2">Highway</p>\n\t\t</div>\n\t\t<div id="g-ai2-5" class="g-Layer1 g-aiAbs g-aiPointText" style="transform: matrix(0.7183,-0.6958,0.6958,0.7183,0,0);transform-origin: 50% 55.2239567391083%;-webkit-transform: matrix(0.7183,-0.6958,0.6958,0.7183,0,0);-webkit-transform-origin: 50% 55.2239567391083%;-ms-transform: matrix(0.7183,-0.6958,0.6958,0.7183,0,0);-ms-transform-origin: 50% 55.2239567391083%;top:32.7022%;margin-top:-9.6px;left:95.7232%;width:32px;">\n\t\t\t<p class="g-pstyle3">River</p>\n\t\t</div>\n\t\t<div id="g-ai2-6" class="g-Layer1 g-aiAbs g-aiPointText" style="top:48.7693%;margin-top:-9.6px;left:74.8127%;width:71px;">\n\t\t\t<p>Packed hills</p>\n\t\t</div>\n\t\t<div id="g-ai2-7" class="g-Layer1 g-aiAbs g-aiPointText" style="top:49.9508%;margin-top:-10px;left:9.965%;width:86px;">\n\t\t\t<p class="g-pstyle0">Jamtoli camp</p>\n\t\t</div>\n\t\t<div id="g-ai2-8" class="g-Layer1 g-aiAbs g-aiPointText" style="top:67.1271%;margin-top:-18px;right:85.2381%;width:100px;">\n\t\t\t<p class="g-pstyle1">Flat, flood-prone</p>\n\t\t\t<p class="g-pstyle1">areas left empty</p>\n\t\t</div>\n\t\t<div id="g-ai2-9" class="g-Layer1 g-aiAbs g-aiPointText" style="top:91.7569%;margin-top:-26.8px;left:70.3778%;margin-left:-4.1096%;width:62px;">\n\t\t\t<p class="g-pstyle4">Baggoha</p>\n\t\t\t<p class="g-pstyle4">Potibonia</p>\n\t\t\t<p class="g-pstyle4">camp</p>\n\t\t</div>\n\t\t<div id="g-ai2-10" class="g-Layer1 g-aiAbs g-aiPointText" style="top:91.8481%;margin-top:-26.4px;left:42.4287%;width:88px;">\n\t\t\t<p>Hill covered</p>\n\t\t\t<p>with makeshift</p>\n\t\t\t<p>structures</p>\n\t\t</div>\n\t</div>\n\n\t<!-- Artboard: xs -->\n\t<div id="g-footprint-xs" class="g-artboard g-artboard-v3" data-min-width=\'300\' data-max-width=\'509\'>\n\t\t<img id="g-ai3-0" class="g-aiImg" src="images/graphics/footprint-xs.png"/>\n\t\t<div id="g-ai3-1" class="g-Layer1 g-aiAbs g-aiPointText" style="top:6.0077%;margin-top:-7.9px;left:36.5429%;width:81px;">\n\t\t\t<p>Hillside shelters</p>\n\t\t</div>\n\t\t<div id="g-ai3-2" class="g-Layer1 g-aiAbs g-aiPointText" style="transform: matrix(0.6103,-0.7922,0.7922,0.6103,0,0);transform-origin: 50% 59.1453067786014%;-webkit-transform: matrix(0.6103,-0.7922,0.7922,0.6103,0,0);-webkit-transform-origin: 50% 59.1453067786014%;-ms-transform: matrix(0.6103,-0.7922,0.7922,0.6103,0,0);-ms-transform-origin: 50% 59.1453067786014%;top:18.5975%;margin-top:-5.5px;left:90.0529%;width:33px;">\n\t\t\t<p class="g-pstyle0">Highway</p>\n\t\t</div>\n\t\t<div id="g-ai3-3" class="g-Layer1 g-aiAbs g-aiPointText" style="top:16.8596%;margin-top:-8.3px;left:62.1183%;width:92px;">\n\t\t\t<p class="g-pstyle1">Hakimpara camp</p>\n\t\t</div>\n\t\t<div id="g-ai3-4" class="g-Layer1 g-aiAbs g-aiPointText" style="top:19.1509%;margin-top:-15.1px;right:73.5632%;width:63px;">\n\t\t\t<p class="g-pstyle2">Structures</p>\n\t\t\t<p class="g-pstyle2">along ridges</p>\n\t\t</div>\n\t\t<div id="g-ai3-5" class="g-Layer1 g-aiAbs g-aiPointText" style="top:47.5833%;margin-top:-7.9px;left:76.8826%;width:61px;">\n\t\t\t<p>Packed hills</p>\n\t\t</div>\n\t\t<div id="g-ai3-6" class="g-Layer1 g-aiAbs g-aiPointText" style="top:48.2986%;margin-top:-9.1px;left:1.4591%;width:77px;">\n\t\t\t<p class="g-pstyle3">Jamtoli camp</p>\n\t\t</div>\n\t\t<div id="g-ai3-7" class="g-Layer1 g-aiAbs g-aiPointText" style="top:65.4205%;margin-top:-15.1px;left:1.4591%;width:86px;">\n\t\t\t<p>Flat, flood-prone</p>\n\t\t\t<p>areas left empty</p>\n\t\t</div>\n\t\t<div id="g-ai3-8" class="g-Layer1 g-aiAbs g-aiPointText" style="top:88.9576%;margin-top:-22.3px;right:46.2089%;width:76px;">\n\t\t\t<p class="g-pstyle2">Hill covered</p>\n\t\t\t<p class="g-pstyle2">with makeshift</p>\n\t\t\t<p class="g-pstyle2">structures</p>\n\t\t</div>\n\t\t<div id="g-ai3-9" class="g-Layer1 g-aiAbs g-aiPointText" style="top:89.0803%;margin-top:-22.7px;left:72.2994%;margin-left:-8.6667%;width:54px;">\n\t\t\t<p class="g-pstyle4">Baggoha</p>\n\t\t\t<p class="g-pstyle4">Potibonia</p>\n\t\t\t<p class="g-pstyle4">camp</p>\n\t\t</div>\n\t</div>\n\n</div>\n\n<!-- End ai2html - 2017-11-13 11:12 -->\n'
    }
}(),
function() {
    window.Reuters = window.Reuters || {},
    window.Reuters.Graphics = window.Reuters.Graphics || {},
    window.Reuters.Graphics.Template = window.Reuters.Graphics.Template || {},
    window.Reuters.Graphics.Template.footprintnew = function(t) {
        var n = "";
        return n += '<!-- Generated by ai2html v0.65.4 - 2017-12-03 21:11 -->\n<!-- ai file: footprintnew.ai -->\n<style type=\'text/css\' media=\'screen,print\'>\n\t#g-footprintnew-box .g-artboard {\n\t\tmargin:0 auto;\n\t}\n\t#g-footprintnew-box .g-artboard p {\n\t\tmargin:0;\n\t}\n\t.g-aiAbs {\n\t\tposition:absolute;\n\t}\n\t.g-aiImg {\n\t\tdisplay:block;\n\t\twidth:100% !important;\n\t}\n\t.g-aiPointText p { white-space: nowrap; }\n\t#g-footprintnew-sm {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-footprintnew-sm p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:400;\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(0,0,0);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-footprintnew-sm .g-pstyle0 {\n\t\tfont-weight:bold;\n\t\tfont-size:16px;\n\t\tline-height:19px;\n\t\ttext-align:center;\n\t}\n\t#g-footprintnew-sm .g-pstyle1 {\n\t\ttext-align:center;\n\t}\n\t#g-footprintnew-md {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-footprintnew-md p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:400;\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(0,0,0);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-footprintnew-md .g-pstyle0 {\n\t\ttext-align:center;\n\t}\n\t#g-footprintnew-md .g-pstyle1 {\n\t\tfont-weight:bold;\n\t\tfont-size:16px;\n\t\tline-height:19px;\n\t\ttext-align:center;\n\t}\n\t#g-footprintnew-lg {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-footprintnew-lg p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:400;\n\t\tfont-size:16px;\n\t\tline-height:19px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(0,0,0);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-footprintnew-lg .g-pstyle0 {\n\t\ttext-align:center;\n\t}\n\t#g-footprintnew-lg .g-pstyle1 {\n\t\tfont-weight:bold;\n\t\ttext-align:center;\n\t}\n\t#g-footprintnew-lg .g-pstyle2 {\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t}\n\t#g-footprintnew-xs {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-footprintnew-xs p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:400;\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(0,0,0);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-footprintnew-xs .g-pstyle0 {\n\t\ttext-align:center;\n\t}\n\t#g-footprintnew-xs .g-pstyle1 {\n\t\tfont-weight:bold;\n\t\ttext-align:center;\n\t}\n\t#g-footprintnew-xs .g-pstyle2 {\n\t\tfont-size:12px;\n\t\tline-height:14px;\n\t}\n\n\t\t/* Custom CSS */\n\t\t\t\t#g-footprintnew-lg {\n\t\tdisplay:block;\n\t\tmargin:0 auto;\n\t\t}\n\t\t#g-footprintnew-xs, \n\t\t#g-footprintnew-sm, \n\t\t#g-footprintnew-md{\n\t\tdisplay:none;\n\t\tmargin:0;\n\t\t}\n\t\t@media (max-width: 992px) {\n\t\t\t#g-footprintnew-lg,\n\t\t\t#g-footprintnew-xs, \n\t\t\t#g-footprintnew-sm{\n\t\t\tdisplay:none;\n\t\t\t}\n\t\t\t#g-footprintnew-md{\n\t\t\tdisplay:block;\n\t\t\tmargin: 0 auto;\n\t\t\t}\n\t\t }\n\t\t@media (max-width: 768px) {\n\t\t\t#g-footprintnew-lg,\n\t\t\t#g-footprintnew-xs,\n\t\t\t#g-footprintnew-md{\n\t\t\tdisplay:none;\n\t\t\t}\n\t\t\t#g-footprintnew-sm{\n\t\t\tdisplay:block;\n\t\t\tmargin: 0 auto;\n\t\t\t}\n\t\t }\n\t\t@media (max-width: 768px) {\n\t\t\t#g-footprintnew-lg,\n\t\t\t#g-footprintnew-sm,\n\t\t\t#g-footprintnew-md{\n\t\t\tdisplay:none;\n\t\t\t}\n\t\t\t#g-footprintnew-xs{\n\t\t\tdisplay:block;\n\t\t\tmargin: 0 auto;\n\t\t\t}\n\t\t }\n\n\n</style>\n\n<div id="g-footprintnew-box" class="ai2html">\n\n\t<!-- Artboard: sm -->\n\t<div id="g-footprintnew-sm" class="g-artboard g-artboard-v3" data-min-width=\'510\' data-max-width=\'689\'>\n\t\t<img id="g-ai0-0" class="g-aiImg" src="images/graphics/footprintnew-sm.png"/>\n\t\t<div id="g-ai0-1" class="g-Layer1 g-aiAbs g-aiPointText" style="top:8.1419%;margin-top:-26.4px;left:8.4172%;width:163px;">\n\t\t\t<p>Flat areas that are</p>\n\t\t\t<p>flood-prone or waterlogged</p>\n\t\t\t<p>are left empty</p>\n\t\t</div>\n\t\t<div id="g-ai0-2" class="g-Layer1 g-aiAbs g-aiPointText" style="top:8.1419%;margin-top:-26.4px;left:47.3403%;width:88px;">\n\t\t\t<p>Hills covered</p>\n\t\t\t<p>with makeshift</p>\n\t\t\t<p>structures</p>\n\t\t</div>\n\t\t<div id="g-ai0-3" class="g-Layer1 g-aiAbs g-aiPointText" style="top:6.3118%;margin-top:-18px;left:78.386%;width:94px;">\n\t\t\t<p>Structures at</p>\n\t\t\t<p>risk of landslide</p>\n\t\t</div>\n\t\t<div id="g-ai0-4" class="g-Layer1 g-aiAbs g-aiPointText" style="top:56.3861%;margin-top:-20.8px;left:77.8816%;margin-left:-14.8039%;width:153px;">\n\t\t\t<p class="g-pstyle0">Kutupalong</p>\n\t\t\t<p class="g-pstyle0">makeshift settlement</p>\n\t\t</div>\n\t\t<div id="g-ai0-5" class="g-Layer1 g-aiAbs g-aiPointText" style="top:93.8063%;margin-top:-9.6px;left:9.2038%;margin-left:-3.1373%;width:34px;">\n\t\t\t<p class="g-pstyle1">100m</p>\n\t\t</div>\n\t</div>\n\n\t<!-- Artboard: md -->\n\t<div id="g-footprintnew-md" class="g-artboard g-artboard-v3" data-min-width=\'690\' data-max-width=\'729\'>\n\t\t<img id="g-ai1-0" class="g-aiImg" src="images/graphics/footprintnew-md.png"/>\n\t\t<div id="g-ai1-1" class="g-Layer1 g-aiAbs g-aiPointText" style="top:5.1862%;margin-top:-26.4px;left:19.3687%;margin-left:-11.6667%;width:163px;">\n\t\t\t<p class="g-pstyle0">Flat areas that are</p>\n\t\t\t<p class="g-pstyle0">flood-prone or waterlogged</p>\n\t\t\t<p class="g-pstyle0">are left empty</p>\n\t\t</div>\n\t\t<div id="g-ai1-2" class="g-Layer1 g-aiAbs g-aiPointText" style="top:5.1862%;margin-top:-26.4px;left:49.069%;margin-left:-6.2319%;width:88px;">\n\t\t\t<p class="g-pstyle0">Hills covered</p>\n\t\t\t<p class="g-pstyle0">with makeshift</p>\n\t\t\t<p class="g-pstyle0">structures</p>\n\t\t</div>\n\t\t<div id="g-ai1-3" class="g-Layer1 g-aiAbs g-aiPointText" style="top:3.7518%;margin-top:-18px;left:80.5121%;width:94px;">\n\t\t\t<p>Structures at</p>\n\t\t\t<p>risk of landslide</p>\n\t\t</div>\n\t\t<div id="g-ai1-4" class="g-Layer1 g-aiAbs g-aiPointText" style="top:51.7086%;margin-top:-20.8px;left:79.4486%;margin-left:-10.942%;width:153px;">\n\t\t\t<p class="g-pstyle1">Kutupalong</p>\n\t\t\t<p class="g-pstyle1">makeshift settlement</p>\n\t\t</div>\n\t\t<div id="g-ai1-5" class="g-Layer1 g-aiAbs g-aiPointText" style="top:96.2361%;margin-top:-9.6px;left:5.4541%;width:34px;">\n\t\t\t<p>100m</p>\n\t\t</div>\n\t</div>\n\n\t<!-- Artboard: lg -->\n\t<div id="g-footprintnew-lg" class="g-artboard g-artboard-v3" data-min-width=\'730\'>\n\t\t<img id="g-ai2-0" class="g-aiImg" src="images/graphics/footprintnew-lg.png"/>\n\t\t<div id="g-ai2-1" class="g-Layer1 g-aiAbs g-aiPointText" style="top:7.4647%;margin-top:-29.9px;left:19.9016%;margin-left:-12.6027%;width:186px;">\n\t\t\t<p class="g-pstyle0">Flat areas that are</p>\n\t\t\t<p class="g-pstyle0">flood-prone or waterlogged</p>\n\t\t\t<p class="g-pstyle0">are left empty</p>\n\t\t</div>\n\t\t<div id="g-ai2-2" class="g-Layer1 g-aiAbs g-aiPointText" style="top:7.4646%;margin-top:-29.9px;left:47.6907%;margin-left:-6.7808%;width:101px;">\n\t\t\t<p class="g-pstyle0">Hills covered</p>\n\t\t\t<p class="g-pstyle0">with makeshift</p>\n\t\t\t<p class="g-pstyle0">structures</p>\n\t\t</div>\n\t\t<div id="g-ai2-3" class="g-Layer1 g-aiAbs g-aiPointText" style="top:5.9375%;margin-top:-20.3px;left:75.22%;width:107px;">\n\t\t\t<p>Structures at</p>\n\t\t\t<p>risk of landslide</p>\n\t\t</div>\n\t\t<div id="g-ai2-4" class="g-Layer1 g-aiAbs g-aiPointText" style="top:49.7621%;margin-top:-20.8px;left:76.1912%;margin-left:-10.3425%;width:153px;">\n\t\t\t<p class="g-pstyle1">Kutupalong</p>\n\t\t\t<p class="g-pstyle1">makeshift settlement</p>\n\t\t</div>\n\t\t<div id="g-ai2-5" class="g-Layer1 g-aiAbs g-aiPointText" style="top:92.6753%;margin-top:-9.6px;left:6.2511%;width:34px;">\n\t\t\t<p class="g-pstyle2">100m</p>\n\t\t</div>\n\t</div>\n\n\t<!-- Artboard: xs -->\n\t<div id="g-footprintnew-xs" class="g-artboard g-artboard-v3" data-min-width=\'300\' data-max-width=\'509\'>\n\t\t<img id="g-ai3-0" class="g-aiImg" src="images/graphics/footprintnew-xs.png"/>\n\t\t<div id="g-ai3-1" class="g-Layer1 g-aiAbs g-aiPointText" style="top:12.5186%;margin-top:-26.4px;left:79.3414%;width:63px;">\n\t\t\t<p>Structures</p>\n\t\t\t<p>at risk of</p>\n\t\t\t<p>landslide</p>\n\t\t</div>\n\t\t<div id="g-ai3-2" class="g-Layer1 g-aiAbs g-aiPointText" style="top:12.8366%;margin-top:-26.4px;left:17.8896%;margin-left:-16.3333%;width:100px;">\n\t\t\t<p class="g-pstyle0">Flat, flood-prone</p>\n\t\t\t<p class="g-pstyle0">areas are left</p>\n\t\t\t<p class="g-pstyle0">empty</p>\n\t\t</div>\n\t\t<div id="g-ai3-3" class="g-Layer1 g-aiAbs g-aiPointText" style="top:12.8366%;margin-top:-26.4px;left:55.378%;margin-left:-14.3333%;width:88px;">\n\t\t\t<p class="g-pstyle0">Hills covered</p>\n\t\t\t<p class="g-pstyle0">with makeshift</p>\n\t\t\t<p class="g-pstyle0">structures</p>\n\t\t</div>\n\t\t<div id="g-ai3-4" class="g-Layer1 g-aiAbs g-aiPointText" style="top:59.268%;margin-top:-18.4px;left:72.0387%;margin-left:-22%;width:134px;">\n\t\t\t<p class="g-pstyle1">Kutupalong</p>\n\t\t\t<p class="g-pstyle1">makeshift settlement</p>\n\t\t</div>\n\t\t<div id="g-ai3-5" class="g-Layer1 g-aiAbs g-aiPointText" style="top:94.4095%;margin-top:-7.9px;left:7.7501%;width:30px;">\n\t\t\t<p class="g-pstyle2">100m</p>\n\t\t</div>\n\t</div>\n\n</div>\n\n<!-- End ai2html - 2017-12-03 21:11 -->\n';
    }
}(),
function() {
    window.Reuters = window.Reuters || {},
    window.Reuters.Graphics = window.Reuters.Graphics || {},
    window.Reuters.Graphics.Template = window.Reuters.Graphics.Template || {},
    window.Reuters.Graphics.Template.hongkong = function(t) {
        var n = "";
        return n += '<!-- Generated by ai2html v0.65.4 - 2017-12-01 21:20 -->\n<!-- ai file: hongkong.ai -->\n<style type=\'text/css\' media=\'screen,print\'>\n\t#g-hongkong-box .g-artboard {\n\t\tmargin:0 auto;\n\t}\n\t#g-hongkong-box .g-artboard p {\n\t\tmargin:0;\n\t}\n\t.g-aiAbs {\n\t\tposition:absolute;\n\t}\n\t.g-aiImg {\n\t\tdisplay:block;\n\t\twidth:100% !important;\n\t}\n\t.g-aiPointText p { white-space: nowrap; }\n\t#g-hongkong-md {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-hongkong-md p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:100;\n\t\tfont-size:12px;\n\t\tline-height:14px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(255,255,255);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-hongkong-md .g-pstyle0 {\n\t\tfont-size:10px;\n\t\tline-height:12px;\n\t\ttext-align:center;\n\t}\n\t#g-hongkong-md .g-pstyle1 {\n\t\tfont-size:10px;\n\t\tline-height:12px;\n\t\ttext-align:right;\n\t}\n\t#g-hongkong-lg {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-hongkong-lg p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:100;\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(255,255,255);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-hongkong-lg .g-pstyle0 {\n\t\tfont-size:10px;\n\t\tline-height:12px;\n\t\ttext-align:center;\n\t}\n\t#g-hongkong-lg .g-pstyle1 {\n\t\tfont-size:10px;\n\t\tline-height:12px;\n\t\ttext-align:right;\n\t}\n\n\t\t/* Custom CSS */\n\t\t\t\t#g-hongkong-lg {\n\t\ttext-shadow: 2px 2px 2px black;\n\t\tdisplay:block;\n\t\tmargin:0 auto;\n\t\t}\n\t\t#g-hongkong-md{\n\t\tdisplay:none;\n\t\tmargin:0;\n\t\t}\n\t\t@media (max-width: 1200px) {\n\t\t\t#g-hongkong-lg{\n\t\t\tdisplay:none;\n\t\t\t}\n\t\t\t#g-hongkong-md{\n\t\t\ttext-shadow: 2px 2px 2px black;\n\t\t\tdisplay:block;\n\t\t\tmargin: 0 auto;\n\t\t\t}\n\t\t }\n\n\n</style>\n\n<div id="g-hongkong-box" class="ai2html">\n\n\t<!-- Artboard: md -->\n\t<div id="g-hongkong-md" class="g-artboard g-artboard-v3" data-min-width=\'330\' data-max-width=\'349\'>\n\t\t<img id="g-ai0-0" class="g-aiImg" src="images/graphics/hongkong-md.jpg"/>\n\t\t<div id="g-ai0-1" class="g-Layer_3 g-aiAbs g-aiPointText" style="top:49.4893%;margin-top:-7.7px;left:40.7369%;width:53px;">\n\t\t\t<p>KOWLOON</p>\n\t\t</div>\n\t\t<div id="g-ai0-2" class="g-Layer_3 g-aiAbs g-aiPointText" style="top:65.7115%;margin-top:-7.7px;left:38.5985%;width:68px;">\n\t\t\t<p>Tsim Sha Tsui</p>\n\t\t</div>\n\t\t<div id="g-ai0-3" class="g-Layer_3 g-aiAbs g-aiPointText" style="top:79.0449%;margin-top:-7.7px;left:36.5007%;width:81px;">\n\t\t\t<p>Victoria Harbour</p>\n\t\t</div>\n\t\t<div id="g-ai0-4" class="g-Layer_3 g-aiAbs g-aiPointText" style="top:88.6004%;margin-top:-7.7px;left:33.508%;width:101px;">\n\t\t\t<p>HONG KONG ISLAND</p>\n\t\t</div>\n\t\t<div id="g-ai0-5" class="g-Layer_3 g-aiAbs g-aiPointText" style="transform: matrix(1,-0.0012,0.0012,1,0,0);transform-origin: 50% 57.593059469079%;-webkit-transform: matrix(1,-0.0012,0.0012,1,0,0);-webkit-transform-origin: 50% 57.593059469079%;-ms-transform: matrix(1,-0.0012,0.0012,1,0,0);-ms-transform-origin: 50% 57.593059469079%;top:97.6855%;margin-top:-6.6px;left:6.1199%;margin-left:-3.0303%;width:22px;">\n\t\t\t<p class="g-pstyle0">1 km</p>\n\t\t</div>\n\t\t<div id="g-ai0-6" class="g-Layer_3 g-aiAbs g-aiPointText" style="top:98.3522%;margin-top:-6.6px;right:2.4369%;width:113px;">\n\t\t\t<p class="g-pstyle1">Satellite image: Planet Labs</p>\n\t\t</div>\n\t</div>\n\n\t<!-- Artboard: lg -->\n\t<div id="g-hongkong-lg" class="g-artboard g-artboard-v3" data-min-width=\'350\'>\n\t\t<img id="g-ai1-0" class="g-aiImg" src="images/graphics/hongkong-lg.jpg"/>\n\t\t<div id="g-ai1-1" class="g-Layer_3 g-aiAbs g-aiPointText" style="top:47.8638%;margin-top:-9.3px;left:38.2766%;width:62px;">\n\t\t\t<p>KOWLOON</p>\n\t\t</div>\n\t\t<div id="g-ai1-2" class="g-Layer_3 g-aiAbs g-aiPointText" style="top:66.8638%;margin-top:-9.3px;left:35.9244%;width:79px;">\n\t\t\t<p>Tsim Sha Tsui</p>\n\t\t</div>\n\t\t<div id="g-ai1-3" class="g-Layer_3 g-aiAbs g-aiPointText" style="top:81.0638%;margin-top:-9.3px;left:33.6164%;width:95px;">\n\t\t\t<p>Victoria Harbour</p>\n\t\t</div>\n\t\t<div id="g-ai1-4" class="g-Layer_3 g-aiAbs g-aiPointText" style="top:91.8638%;margin-top:-9.3px;left:30.3246%;width:118px;">\n\t\t\t<p>HONG KONG ISLAND</p>\n\t\t</div>\n\t\t<div id="g-ai1-5" class="g-Layer_3 g-aiAbs g-aiPointText" style="transform: matrix(1,-0.0012,0.0012,1,0,0);transform-origin: 50% 57.593059469079%;-webkit-transform: matrix(1,-0.0012,0.0012,1,0,0);-webkit-transform-origin: 50% 57.593059469079%;-ms-transform: matrix(1,-0.0012,0.0012,1,0,0);-ms-transform-origin: 50% 57.593059469079%;top:97.717%;margin-top:-6.6px;left:5.211%;margin-left:-3.4286%;width:26px;">\n\t\t\t<p class="g-pstyle0">500 m</p>\n\t\t</div>\n\t\t<div id="g-ai1-6" class="g-Layer_3 g-aiAbs g-aiPointText" style="top:98.317%;margin-top:-6.6px;right:1.6339%;width:113px;">\n\t\t\t<p class="g-pstyle1">Satellite image: Planet Labs</p>\n\t\t</div>\n\t</div>\n\n</div>\n\n<!-- End ai2html - 2017-12-01 21:20 -->\n'
    }
}(),
function() {
    window.Reuters = window.Reuters || {},
    window.Reuters.Graphics = window.Reuters.Graphics || {},
    window.Reuters.Graphics.Template = window.Reuters.Graphics.Template || {},
    window.Reuters.Graphics.Template.kutu1 = function(t) {
        var n = "";
        return n += '<!-- Generated by ai2html v0.65.4 - 2017-12-01 21:12 -->\n<!-- ai file: kutu1.ai -->\n<style type=\'text/css\' media=\'screen,print\'>\n\t#g-kutu1-box .g-artboard {\n\t\tmargin:0 auto;\n\t}\n\t#g-kutu1-box .g-artboard p {\n\t\tmargin:0;\n\t}\n\t.g-aiAbs {\n\t\tposition:absolute;\n\t}\n\t.g-aiImg {\n\t\tdisplay:block;\n\t\twidth:100% !important;\n\t}\n\t.g-aiPointText p { white-space: nowrap; }\n\t#g-kutu1-sm {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-kutu1-sm p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:400;\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(255,255,255);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-kutu1-sm .g-pstyle0 {\n\t\tfont-weight:bold;\n\t\tfont-size:12px;\n\t\tline-height:14px;\n\t\tletter-spacing:0.2em;\n\t}\n\t#g-kutu1-sm .g-pstyle1 {\n\t\ttext-align:center;\n\t}\n\t#g-kutu1-sm .g-pstyle2 {\n\t\tfont-size:11px;\n\t\tline-height:13px;\n\t\ttext-align:center;\n\t}\n\t#g-kutu1-sm .g-pstyle3 {\n\t\tfont-size:12px;\n\t\tline-height:14px;\n\t}\n\t#g-kutu1-md {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-kutu1-md p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:400;\n\t\tfont-size:15px;\n\t\tline-height:18px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(255,255,255);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-kutu1-md .g-pstyle0 {\n\t\tfont-weight:bold;\n\t\tletter-spacing:0.2em;\n\t}\n\t#g-kutu1-md .g-pstyle1 {\n\t\ttext-align:center;\n\t}\n\t#g-kutu1-md .g-pstyle2 {\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t}\n\t#g-kutu1-md .g-pstyle3 {\n\t\tfont-weight:100;\n\t\tfont-size:12px;\n\t\tline-height:14px;\n\t\ttext-align:center;\n\t}\n\t#g-kutu1-lg {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-kutu1-lg p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:400;\n\t\tfont-size:16px;\n\t\tline-height:19px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(255,255,255);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-kutu1-lg .g-pstyle0 {\n\t\tfont-weight:bold;\n\t\tletter-spacing:0.2em;\n\t}\n\t#g-kutu1-lg .g-pstyle1 {\n\t\ttext-align:center;\n\t}\n\t#g-kutu1-lg .g-pstyle2 {\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t}\n\t#g-kutu1-lg .g-pstyle3 {\n\t\tfont-weight:100;\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t\ttext-align:center;\n\t}\n\n\t\t/* Custom CSS */\n\t\t\t\t#g-kutu1-lg {\n\t\tdisplay:block;\n\t\tmargin:0 auto;\n\t\ttext-shadow: 2px 2px 2px black;\n\t\t}\n\t\t#g-kutu1-sm,\n\t\t#g-kutu1-md{\n\t\tdisplay:none;\n\t\tmargin:0;\n\t\ttext-shadow: 2px 2px 2px black;\n\t\t}\n\t\t@media (max-width: 992px) {\n\t\t\t#g-kutu1-lg,\n\t\t\t#g-kutu1-sm{\n\t\t\tdisplay:none;\n\t\t\t}\n\t\t\t#g-kutu1-md{\n\t\t\tdisplay:block;\n\t\t\tmargin: 0 auto;\n\t\t\ttext-shadow: 2px 2px 2px black;\n\t\t\t}\n\t\t }\n\t\t@media (max-width: 750px) {\n\t\t\t#g-kutu1-lg,\n\t\t\t#g-kutu1-md{\n\t\t\tdisplay:none;\n\t\t\t}\n\t\t\t#g-kutu1-sm{\n\t\t\tdisplay:block;\n\t\t\tmargin: 0 auto;\n\t\t\ttext-shadow: 2px 2px 2px black;\n\t\t\t}\n\t\t }\n\n\n</style>\n\n<div id="g-kutu1-box" class="ai2html">\n\n\t<!-- Artboard: sm -->\n\t<div id="g-kutu1-sm" class="g-artboard g-artboard-v3" data-min-width=\'410\' data-max-width=\'749\'>\n\t\t<img id="g-ai0-0" class="g-aiImg" src="images/graphics/kutu1-sm.jpg"/>\n\t\t<div id="g-ai0-1" class="g-highway g-aiAbs g-aiPointText" style="top:5.1045%;margin-top:-8.3px;left:73.1824%;width:98px;">\n\t\t\t<p class="g-pstyle0">BANGLADESH</p>\n\t\t</div>\n\t\t<div id="g-ai0-2" class="g-highway g-aiAbs g-aiPointText" style="top:16.9295%;margin-top:-18px;left:74.6372%;margin-left:-10.2439%;width:86px;">\n\t\t\t<p class="g-pstyle1">Kutupalong</p>\n\t\t\t<p class="g-pstyle1">Refugee Camp</p>\n\t\t</div>\n\t\t<div id="g-ai0-3" class="g-highway g-aiAbs g-aiPointText" style="top:38.3428%;margin-top:-9.6px;left:50.0795%;margin-left:-24.3902%;width:202px;">\n\t\t\t<p class="g-pstyle1">Camp expansion areas </p>\n\t\t</div>\n\t\t<div id="g-ai0-4" class="g-highway g-aiAbs g-aiPointText" style="top:51.5122%;margin-top:-7.3px;left:5.5216%;margin-left:-3.4146%;width:30px;">\n\t\t\t<p class="g-pstyle2">200 m</p>\n\t\t</div>\n\t\t<div id="g-ai0-5" class="g-highway g-aiAbs g-aiPointText" style="top:76.8424%;margin-top:-22.3px;left:82.9702%;width:59px;">\n\t\t\t<p class="g-pstyle3">Cox&rsquo;s Bazar</p>\n\t\t\t<p class="g-pstyle3">- Teknaf</p>\n\t\t\t<p class="g-pstyle3">Highway</p>\n\t\t</div>\n\t</div>\n\n\t<!-- Artboard: md -->\n\t<div id="g-kutu1-md" class="g-artboard g-artboard-v3" data-min-width=\'750\' data-max-width=\'919\'>\n\t\t<img id="g-ai1-0" class="g-aiImg" src="images/graphics/kutu1-md.jpg"/>\n\t\t<div id="g-ai1-1" class="g-highway g-aiAbs g-aiPointText" style="top:5.8672%;margin-top:-10.6px;left:82.3154%;width:121px;">\n\t\t\t<p class="g-pstyle0">BANGLADESH</p>\n\t\t</div>\n\t\t<div id="g-ai1-2" class="g-highway g-aiAbs g-aiPointText" style="top:17.1569%;margin-top:-19.1px;left:72.5279%;margin-left:-6%;width:92px;">\n\t\t\t<p class="g-pstyle1">Kutupalong</p>\n\t\t\t<p class="g-pstyle1">Refugee Camp</p>\n\t\t</div>\n\t\t<div id="g-ai1-3" class="g-highway g-aiAbs g-aiPointText" style="top:24.702%;margin-top:-26.4px;left:87.7059%;width:68px;">\n\t\t\t<p class="g-pstyle2">Cox&rsquo;s Bazar</p>\n\t\t\t<p class="g-pstyle2">- Teknaf</p>\n\t\t\t<p class="g-pstyle2">Highway</p>\n\t\t</div>\n\t\t<div id="g-ai1-4" class="g-highway g-aiAbs g-aiPointText" style="top:42.1093%;margin-top:-10.1px;left:48.9524%;margin-left:-14.3333%;width:217px;">\n\t\t\t<p class="g-pstyle1">Camp expansion areas </p>\n\t\t</div>\n\t\t<div id="g-ai1-5" class="g-highway g-aiAbs g-aiPointText" style="top:57.3049%;margin-top:-7.7px;left:9.714%;margin-left:-1.9333%;width:31px;">\n\t\t\t<p class="g-pstyle3">200 m</p>\n\t\t</div>\n\t</div>\n\n\t<!-- Artboard: lg -->\n\t<div id="g-kutu1-lg" class="g-artboard g-artboard-v3" data-min-width=\'920\'>\n\t\t<img id="g-ai2-0" class="g-aiImg" src="images/graphics/kutu1-lg.jpg"/>\n\t\t<div id="g-ai2-1" class="g-highway g-aiAbs g-aiPointText" style="top:5.9394%;margin-top:-11.2px;left:83.8153%;width:129px;">\n\t\t\t<p class="g-pstyle0">BANGLADESH</p>\n\t\t</div>\n\t\t<div id="g-ai2-2" class="g-highway g-aiAbs g-aiPointText" style="top:17.4865%;margin-top:-20.3px;left:73.6533%;margin-left:-5.2174%;width:98px;">\n\t\t\t<p class="g-pstyle1">Kutupalong</p>\n\t\t\t<p class="g-pstyle1">Refugee Camp</p>\n\t\t</div>\n\t\t<div id="g-ai2-3" class="g-highway g-aiAbs g-aiPointText" style="top:25.4901%;margin-top:-26.4px;left:89.7169%;width:68px;">\n\t\t\t<p class="g-pstyle2">Cox&rsquo;s Bazar</p>\n\t\t\t<p class="g-pstyle2">- Teknaf</p>\n\t\t\t<p class="g-pstyle2">Highway</p>\n\t\t</div>\n\t\t<div id="g-ai2-4" class="g-highway g-aiAbs g-aiPointText" style="top:43.748%;margin-top:-10.7px;left:48.5577%;margin-left:-12.4457%;width:231px;">\n\t\t\t<p class="g-pstyle1">Camp expansion areas </p>\n\t\t</div>\n\t\t<div id="g-ai2-5" class="g-highway g-aiAbs g-aiPointText" style="top:59.563%;margin-top:-9.3px;left:7.3651%;margin-left:-1.8478%;width:36px;">\n\t\t\t<p class="g-pstyle3">200 m</p>\n\t\t</div>\n\t</div>\n\n</div>\n\n<!-- End ai2html - 2017-12-01 21:12 -->\n'
    }
}(),
function() {
    window.Reuters = window.Reuters || {},
    window.Reuters.Graphics = window.Reuters.Graphics || {},
    window.Reuters.Graphics.Template = window.Reuters.Graphics.Template || {},
    window.Reuters.Graphics.Template.kutu2 = function(t) {
        var n = "";
        return n += '<!-- Generated by ai2html v0.65.4 - 2017-11-30 18:53 -->\n<!-- ai file: kutu2.ai -->\n<style type=\'text/css\' media=\'screen,print\'>\n\t#g-kutu2-box .g-artboard {\n\t\tmargin:0 auto;\n\t}\n\t#g-kutu2-box .g-artboard p {\n\t\tmargin:0;\n\t}\n\t.g-aiAbs {\n\t\tposition:absolute;\n\t}\n\t.g-aiImg {\n\t\tdisplay:block;\n\t\twidth:100% !important;\n\t}\n\t.g-aiPointText p { white-space: nowrap; }\n\t#g-kutu2-sm {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-kutu2-sm p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:400;\n\t\tfont-size:12px;\n\t\tline-height:14px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(117,117,117);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-kutu2-sm .g-pstyle0 {\n\t\tfont-weight:bold;\n\t\tfilter:alpha(opacity=60);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=60);\n\t\topacity:0.6;\n\t\tletter-spacing:0.2em;\n\t}\n\t#g-kutu2-sm .g-pstyle1 {\n\t\tfont-weight:bold;\n\t\tletter-spacing:0.2em;\n\t}\n\t#g-kutu2-sm .g-pstyle2 {\n\t\tfilter:alpha(opacity=60);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=60);\n\t\topacity:0.6;\n\t\ttext-align:center;\n\t}\n\t#g-kutu2-sm .g-pstyle3 {\n\t\ttext-align:center;\n\t}\n\t#g-kutu2-sm .g-pstyle4 {\n\t\tfont-weight:100;\n\t}\n\t#g-kutu2-sm .g-pstyle5 {\n\t\tfont-weight:100;\n\t\tfont-size:11px;\n\t\tline-height:13px;\n\t\ttext-align:center;\n\t}\n\t#g-kutu2-md {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-kutu2-md p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:400;\n\t\tfont-size:15px;\n\t\tline-height:18px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(117,117,117);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-kutu2-md .g-pstyle0 {\n\t\tfont-weight:bold;\n\t\tfilter:alpha(opacity=60);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=60);\n\t\topacity:0.6;\n\t\tletter-spacing:0.2em;\n\t}\n\t#g-kutu2-md .g-pstyle1 {\n\t\tfilter:alpha(opacity=60);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=60);\n\t\topacity:0.6;\n\t\ttext-align:center;\n\t}\n\t#g-kutu2-md .g-pstyle2 {\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t\tfilter:alpha(opacity=60);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=60);\n\t\topacity:0.6;\n\t}\n\t#g-kutu2-md .g-pstyle3 {\n\t\ttext-align:center;\n\t}\n\t#g-kutu2-md .g-pstyle4 {\n\t\tfont-weight:100;\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t\ttext-align:center;\n\t}\n\t#g-kutu2-lg {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-kutu2-lg p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:400;\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(117,117,117);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-kutu2-lg .g-pstyle0 {\n\t\tfont-weight:bold;\n\t\tfont-size:16px;\n\t\tline-height:19px;\n\t\tfilter:alpha(opacity=60);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=60);\n\t\topacity:0.6;\n\t\tletter-spacing:0.2em;\n\t}\n\t#g-kutu2-lg .g-pstyle1 {\n\t\tfilter:alpha(opacity=60);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=60);\n\t\topacity:0.6;\n\t\ttext-align:center;\n\t}\n\t#g-kutu2-lg .g-pstyle2 {\n\t\tfilter:alpha(opacity=60);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=60);\n\t\topacity:0.6;\n\t}\n\t#g-kutu2-lg .g-pstyle3 {\n\t\ttext-align:center;\n\t}\n\t#g-kutu2-lg .g-pstyle4 {\n\t\tfont-weight:100;\n\t\ttext-align:center;\n\t}\n\n\t\t/* Custom CSS */\n\t\t\t\t#g-kutu2-lg {\n\t\tdisplay:block;\n\t\tmargin:0 auto;\n\t\t}\n\t\t#g-kutu2-sm,\n\t\t#g-kutu2-md{\n\t\tdisplay:none;\n\t\tmargin:0;\n\t\t}\n\t\t@media (max-width: 992px) {\n\t\t\t#g-kutu2-lg,\n\t\t\t#g-kutu2-sm{\n\t\t\tdisplay:none;\n\t\t\t}\n\t\t\t#g-kutu2-md{\n\t\t\tdisplay:block;\n\t\t\tmargin: 0 auto;\n\t\t\t}\n\t\t }\n\t\t@media (max-width: 768px) {\n\t\t\t#g-kutu2-lg,\n\t\t\t#g-kutu2-md{\n\t\t\tdisplay:none;\n\t\t\t}\n\t\t\t#g-kutu2-sm{\n\t\t\tdisplay:block;\n\t\t\tmargin: 0 auto;\n\t\t\t}\n\t\t }\n\n\n</style>\n\n<div id="g-kutu2-box" class="ai2html">\n\n\t<!-- Artboard: sm -->\n\t<div id="g-kutu2-sm" class="g-artboard g-artboard-v3" data-min-width=\'410\' data-max-width=\'749\'>\n\t\t<img id="g-ai0-0" class="g-aiImg" src="images/graphics/kutu2-sm.jpg"/>\n\t\t<div id="g-ai0-1" class="g-Layer_29 g-aiAbs g-aiPointText" style="top:5.1045%;margin-top:-8.3px;left:73.1825%;width:98px;">\n\t\t\t<p class="g-pstyle0">BANGLADESH</p>\n\t\t</div>\n\t\t<div id="g-ai0-2" class="g-Layer_29 g-aiAbs g-aiPointText" style="top:5.1045%;margin-top:-8.3px;left:73.1825%;width:98px;">\n\t\t\t<p class="g-pstyle1">BANGLADESH</p>\n\t\t</div>\n\t\t<div id="g-ai0-3" class="g-Layer_29 g-aiAbs g-aiPointText" style="top:13.5891%;margin-top:-7.9px;left:38.4766%;width:36px;">\n\t\t\t<p>Zone C</p>\n\t\t</div>\n\t\t<div id="g-ai0-4" class="g-Layer_29 g-aiAbs g-aiPointText" style="top:16.8157%;margin-top:-15.1px;left:74.6445%;margin-left:-8.7805%;width:74px;">\n\t\t\t<p class="g-pstyle2">Kutupalong</p>\n\t\t\t<p class="g-pstyle2">Refugee Camp</p>\n\t\t</div>\n\t\t<div id="g-ai0-5" class="g-Layer_29 g-aiAbs g-aiPointText" style="top:20.9224%;margin-top:-7.9px;left:21.1894%;width:37px;">\n\t\t\t<p>Zone B</p>\n\t\t</div>\n\t\t<div id="g-ai0-6" class="g-Layer_29 g-aiAbs g-aiPointText" style="top:22.5224%;margin-top:-7.9px;left:0.3385%;width:37px;">\n\t\t\t<p>Zone D</p>\n\t\t</div>\n\t\t<div id="g-ai0-7" class="g-Layer_29 g-aiAbs g-aiPointText" style="top:28.9491%;margin-top:-15.1px;left:59.3306%;margin-left:-9.7561%;width:95px;">\n\t\t\t<p class="g-pstyle3">Kutupalong</p>\n\t\t\t<p class="g-pstyle3">Makeshift Settlement</p>\n\t\t</div>\n\t\t<div id="g-ai0-8" class="g-Layer_29 g-aiAbs g-aiPointText" style="top:37.5891%;margin-top:-7.9px;left:15.8475%;width:36px;">\n\t\t\t<p>Zone E</p>\n\t\t</div>\n\t\t<div id="g-ai0-9" class="g-Layer_29 g-aiAbs g-aiPointText" style="top:39.5603%;margin-top:-7.7px;left:79.7476%;width:36px;">\n\t\t\t<p class="g-pstyle4">Zone G</p>\n\t\t</div>\n\t\t<div id="g-ai0-10" class="g-Layer_29 g-aiAbs g-aiPointText" style="top:42.2557%;margin-top:-7.9px;left:50.4949%;width:35px;">\n\t\t\t<p>Zone F</p>\n\t\t</div>\n\t\t<div id="g-ai0-11" class="g-Layer_29 g-aiAbs g-aiPointText" style="top:51.1891%;margin-top:-7.9px;left:43.5214%;width:37px;">\n\t\t\t<p>Zone H</p>\n\t\t</div>\n\t\t<div id="g-ai0-12" class="g-Layer_29 g-aiAbs g-aiPointText" style="top:51.4858%;margin-top:-7.1px;left:5.4989%;margin-left:-3.2927%;width:29px;">\n\t\t\t<p class="g-pstyle5">200 m</p>\n\t\t</div>\n\t\t<div id="g-ai0-13" class="g-Layer_29 g-aiAbs g-aiPointText" style="top:56.3891%;margin-top:-7.9px;left:81.3973%;width:33px;">\n\t\t\t<p>Zone I</p>\n\t\t</div>\n\t\t<div id="g-ai0-14" class="g-Layer_29 g-aiAbs g-aiPointText" style="top:64.6557%;margin-top:-7.9px;left:32.925%;width:35px;">\n\t\t\t<p>Zone J</p>\n\t\t</div>\n\t\t<div id="g-ai0-15" class="g-Layer_29 g-aiAbs g-aiPointText" style="top:64.6557%;margin-top:-7.9px;left:67.8235%;width:36px;">\n\t\t\t<p>Zone K</p>\n\t\t</div>\n\t\t<div id="g-ai0-16" class="g-Layer_29 g-aiAbs g-aiPointText" style="top:68.4157%;margin-top:-15.1px;left:53.0562%;margin-left:-9.7561%;width:95px;">\n\t\t\t<p class="g-pstyle3">Balukhali</p>\n\t\t\t<p class="g-pstyle3">Makeshift Settlement</p>\n\t\t</div>\n\t\t<div id="g-ai0-17" class="g-Layer_29 g-aiAbs g-aiPointText" style="top:76.8424%;margin-top:-22.3px;left:82.9701%;width:59px;">\n\t\t\t<p>Cox&rsquo;s Bazar</p>\n\t\t\t<p>- Teknaf</p>\n\t\t\t<p>Highway</p>\n\t\t</div>\n\t\t<div id="g-ai0-18" class="g-Layer_29 g-aiAbs g-aiPointText" style="top:75.0557%;margin-top:-7.9px;left:28.9536%;margin-left:-4.3902%;width:38px;">\n\t\t\t<p class="g-pstyle3">Zone M</p>\n\t\t</div>\n\t\t<div id="g-ai0-19" class="g-Layer_29 g-aiAbs g-aiPointText" style="top:75.0557%;margin-top:-7.9px;left:66.3393%;margin-left:-4.0244%;width:35px;">\n\t\t\t<p class="g-pstyle3">Zone L</p>\n\t\t</div>\n\t\t<div id="g-ai0-20" class="g-Layer_29 g-aiAbs g-aiPointText" style="top:87.3224%;margin-top:-7.9px;left:39.155%;margin-left:-4.2683%;width:37px;">\n\t\t\t<p class="g-pstyle3">Zone N</p>\n\t\t</div>\n\t\t<div id="g-ai0-21" class="g-Layer_29 g-aiAbs g-aiPointText" style="top:92.1224%;margin-top:-7.9px;left:21.9802%;margin-left:-4.1463%;width:36px;">\n\t\t\t<p class="g-pstyle3">Zone T</p>\n\t\t</div>\n\t</div>\n\n\t<!-- Artboard: md -->\n\t<div id="g-kutu2-md" class="g-artboard g-artboard-v3" data-min-width=\'750\' data-max-width=\'919\'>\n\t\t<img id="g-ai1-0" class="g-aiImg" src="images/graphics/kutu2-md.jpg"/>\n\t\t<div id="g-ai1-1" class="g-MD g-aiAbs g-aiPointText" style="top:5.8672%;margin-top:-10.6px;left:82.3154%;width:121px;">\n\t\t\t<p class="g-pstyle0">BANGLADESH</p>\n\t\t</div>\n\t\t<div id="g-ai1-2" class="g-MD g-aiAbs g-aiPointText" style="top:13.7284%;margin-top:-10.1px;left:38.7275%;width:45px;">\n\t\t\t<p>Zone C</p>\n\t\t</div>\n\t\t<div id="g-ai1-3" class="g-MD g-aiAbs g-aiPointText" style="top:13.7284%;margin-top:-10.1px;left:1.5367%;width:45px;">\n\t\t\t<p>Zone A</p>\n\t\t</div>\n\t\t<div id="g-ai1-4" class="g-MD g-aiAbs g-aiPointText" style="top:17.1569%;margin-top:-19.1px;left:72.5279%;margin-left:-6%;width:92px;">\n\t\t\t<p class="g-pstyle1">Kutupalong</p>\n\t\t\t<p class="g-pstyle1">Refugee Camp</p>\n\t\t</div>\n\t\t<div id="g-ai1-5" class="g-MD g-aiAbs g-aiPointText" style="top:22.1093%;margin-top:-10.1px;left:23.5335%;width:45px;">\n\t\t\t<p>Zone B</p>\n\t\t</div>\n\t\t<div id="g-ai1-6" class="g-MD g-aiAbs g-aiPointText" style="top:24.702%;margin-top:-26.4px;left:87.7059%;width:68px;">\n\t\t\t<p class="g-pstyle2">Cox&rsquo;s Bazar</p>\n\t\t\t<p class="g-pstyle2">- Teknaf</p>\n\t\t\t<p class="g-pstyle2">Highway</p>\n\t\t</div>\n\t\t<div id="g-ai1-7" class="g-MD g-aiAbs g-aiPointText" style="top:23.9188%;margin-top:-10.1px;left:5.2124%;width:46px;">\n\t\t\t<p>Zone D</p>\n\t\t</div>\n\t\t<div id="g-ai1-8" class="g-MD g-aiAbs g-aiPointText" style="top:31.0617%;margin-top:-19.1px;left:57.0559%;margin-left:-6.6667%;width:120px;">\n\t\t\t<p class="g-pstyle3">Kutupalong</p>\n\t\t\t<p class="g-pstyle3">Makeshift Settlement</p>\n\t\t</div>\n\t\t<div id="g-ai1-9" class="g-MD g-aiAbs g-aiPointText" style="top:41.2522%;margin-top:-10.1px;left:18.8404%;width:44px;">\n\t\t\t<p>Zone E</p>\n\t\t</div>\n\t\t<div id="g-ai1-10" class="g-MD g-aiAbs g-aiPointText" style="top:43.5379%;margin-top:-10.1px;left:74.9933%;width:46px;">\n\t\t\t<p>Zone G</p>\n\t\t</div>\n\t\t<div id="g-ai1-11" class="g-MD g-aiAbs g-aiPointText" style="top:46.5855%;margin-top:-10.1px;left:49.2871%;width:44px;">\n\t\t\t<p>Zone F</p>\n\t\t</div>\n\t\t<div id="g-ai1-12" class="g-MD g-aiAbs g-aiPointText" style="top:56.8712%;margin-top:-10.1px;left:43.1611%;width:46px;">\n\t\t\t<p>Zone H</p>\n\t\t</div>\n\t\t<div id="g-ai1-13" class="g-MD g-aiAbs g-aiPointText" style="top:57.2685%;margin-top:-9.3px;left:9.7209%;margin-left:-2.2667%;width:36px;">\n\t\t\t<p class="g-pstyle4">200 m</p>\n\t\t</div>\n\t\t<div id="g-ai1-14" class="g-MD g-aiAbs g-aiPointText" style="top:62.776%;margin-top:-10.1px;left:76.4426%;width:40px;">\n\t\t\t<p>Zone I</p>\n\t\t</div>\n\t\t<div id="g-ai1-15" class="g-MD g-aiAbs g-aiPointText" style="top:72.2998%;margin-top:-10.1px;left:33.847%;width:44px;">\n\t\t\t<p>Zone J</p>\n\t\t</div>\n\t\t<div id="g-ai1-16" class="g-MD g-aiAbs g-aiPointText" style="top:72.2998%;margin-top:-10.1px;left:64.5141%;width:45px;">\n\t\t\t<p>Zone K</p>\n\t\t</div>\n\t\t<div id="g-ai1-17" class="g-MD g-aiAbs g-aiPointText" style="top:78.0141%;margin-top:-19.1px;left:51.7989%;margin-left:-6.6667%;width:120px;">\n\t\t\t<p class="g-pstyle3">Balukhali</p>\n\t\t\t<p class="g-pstyle3">Makeshift Settlement</p>\n\t\t</div>\n\t\t<div id="g-ai1-18" class="g-MD g-aiAbs g-aiPointText" style="top:84.2045%;margin-top:-10.1px;left:30.3658%;margin-left:-3%;width:47px;">\n\t\t\t<p class="g-pstyle3">Zone M</p>\n\t\t</div>\n\t\t<div id="g-ai1-19" class="g-MD g-aiAbs g-aiPointText" style="top:84.2045%;margin-top:-10.1px;left:63.2686%;margin-left:-2.8%;width:44px;">\n\t\t\t<p class="g-pstyle3">Zone L</p>\n\t\t</div>\n\t</div>\n\n\t<!-- Artboard: lg -->\n\t<div id="g-kutu2-lg" class="g-artboard g-artboard-v3" data-min-width=\'920\'>\n\t\t<img id="g-ai2-0" class="g-aiImg" src="images/graphics/kutu2-lg.jpg"/>\n\t\t<div id="g-ai2-1" class="g-highway g-aiAbs g-aiPointText" style="top:5.9394%;margin-top:-11.2px;left:83.8153%;width:129px;">\n\t\t\t<p class="g-pstyle0">BANGLADESH</p>\n\t\t</div>\n\t\t<div id="g-ai2-2" class="g-boundary g-aiAbs g-aiPointText" style="top:13.5824%;margin-top:-9.6px;left:39.5016%;width:42px;">\n\t\t\t<p>Zone C</p>\n\t\t</div>\n\t\t<div id="g-ai2-3" class="g-boundary g-aiAbs g-aiPointText" style="top:15.3516%;margin-top:-9.6px;left:4.6477%;width:42px;">\n\t\t\t<p>Zone A</p>\n\t\t</div>\n\t\t<div id="g-ai2-4" class="g-bigoutline g-aiAbs g-aiPointText" style="top:17.4593%;margin-top:-18px;left:72.787%;margin-left:-4.5652%;width:86px;">\n\t\t\t<p class="g-pstyle1">Kutupalong</p>\n\t\t\t<p class="g-pstyle1">Refugee Camp</p>\n\t\t</div>\n\t\t<div id="g-ai2-5" class="g-boundary g-aiAbs g-aiPointText" style="top:19.6593%;margin-top:-9.6px;left:23.977%;width:42px;">\n\t\t\t<p>Zone B</p>\n\t\t</div>\n\t\t<div id="g-ai2-6" class="g-highway g-aiAbs g-aiPointText" style="top:25.4901%;margin-top:-26.4px;left:89.7169%;width:68px;">\n\t\t\t<p class="g-pstyle2">Cox&rsquo;s Bazar</p>\n\t\t\t<p class="g-pstyle2">- Teknaf</p>\n\t\t\t<p class="g-pstyle2">Highway</p>\n\t\t</div>\n\t\t<div id="g-ai2-7" class="g-boundary g-aiAbs g-aiPointText" style="top:25.2747%;margin-top:-9.6px;left:4.6477%;width:43px;">\n\t\t\t<p>Zone D</p>\n\t\t</div>\n\t\t<div id="g-ai2-8" class="g-boundary g-aiAbs g-aiPointText" style="top:32.3055%;margin-top:-18px;left:57.7711%;margin-left:-5.0543%;width:120px;">\n\t\t\t<p class="g-pstyle3">Kutupalong</p>\n\t\t\t<p class="g-pstyle3">Makeshift Settlement</p>\n\t\t</div>\n\t\t<div id="g-ai2-9" class="g-boundary g-aiAbs g-aiPointText" style="top:41.0439%;margin-top:-9.6px;left:15.8242%;width:42px;">\n\t\t\t<p>Zone E</p>\n\t\t</div>\n\t\t<div id="g-ai2-10" class="g-boundary g-aiAbs g-aiPointText" style="top:46.1978%;margin-top:-9.6px;left:77.3429%;width:43px;">\n\t\t\t<p>Zone G</p>\n\t\t</div>\n\t\t<div id="g-ai2-11" class="g-boundary g-aiAbs g-aiPointText" style="top:48.1978%;margin-top:-9.6px;left:50.2699%;width:41px;">\n\t\t\t<p>Zone F</p>\n\t\t</div>\n\t\t<div id="g-ai2-12" class="g-boundary g-aiAbs g-aiPointText" style="top:57.5055%;margin-top:-9.6px;left:50.2699%;width:43px;">\n\t\t\t<p>Zone H</p>\n\t\t</div>\n\t\t<div id="g-ai2-13" class="g-boundary g-aiAbs g-aiPointText" style="top:57.5055%;margin-top:-9.6px;left:77.5084%;width:38px;">\n\t\t\t<p>Zone I</p>\n\t\t</div>\n\t\t<div id="g-ai2-14" class="g-highway g-aiAbs g-aiPointText" style="top:59.7362%;margin-top:-9.6px;left:7.8294%;margin-left:-1.9022%;width:37px;">\n\t\t\t<p class="g-pstyle1">200 m</p>\n\t\t</div>\n\t\t<div id="g-ai2-15" class="g-boundary g-aiAbs g-aiPointText" style="top:75.2747%;margin-top:-9.6px;left:32.6479%;width:41px;">\n\t\t\t<p>Zone J</p>\n\t\t</div>\n\t\t<div id="g-ai2-16" class="g-boundary g-aiAbs g-aiPointText" style="top:75.2747%;margin-top:-9.6px;left:64.9456%;width:42px;">\n\t\t\t<p>Zone K</p>\n\t\t</div>\n\t\t<div id="g-ai2-17" class="g-boundary g-aiAbs g-aiPointText" style="top:80.9978%;margin-top:-18px;left:51.5381%;margin-left:-5.0543%;width:105px;">\n\t\t\t<p class="g-pstyle3">Balukhali</p>\n\t\t\t<p class="g-pstyle3">Makeshift Settlement</p>\n\t\t</div>\n\t\t<div id="g-ai2-18" class="g-boundary g-aiAbs g-aiPointText" style="top:87.7169%;margin-top:-9.3px;left:27.5594%;margin-left:-2.2283%;width:43px;">\n\t\t\t<p class="g-pstyle4">Zone M</p>\n\t\t</div>\n\t\t<div id="g-ai2-19" class="g-boundary g-aiAbs g-aiPointText" style="top:87.7169%;margin-top:-9.3px;left:63.6142%;margin-left:-2.0652%;width:40px;">\n\t\t\t<p class="g-pstyle4">Zone L</p>\n\t\t</div>\n\t</div>\n\n</div>\n\n<!-- End ai2html - 2017-11-30 18:53 -->\n'
    }
}(),
function() {
    window.Reuters = window.Reuters || {},
    window.Reuters.Graphics = window.Reuters.Graphics || {},
    window.Reuters.Graphics.Template = window.Reuters.Graphics.Template || {},
    window.Reuters.Graphics.Template.kutubase = function(t) {
        var n = "";
        return n += '<!-- Generated by ai2html v0.65.4 - 2017-11-30 18:56 -->\n<!-- ai file: kutubase.ai -->\n<style type=\'text/css\' media=\'screen,print\'>\n\t#g-kutubase-box .g-artboard {\n\t\tmargin:0 auto;\n\t}\n\t#g-kutubase-box .g-artboard p {\n\t\tmargin:0;\n\t}\n\t.g-aiAbs {\n\t\tposition:absolute;\n\t}\n\t.g-aiImg {\n\t\tdisplay:block;\n\t\twidth:100% !important;\n\t}\n\t.g-aiPointText p { white-space: nowrap; }\n\t#g-kutubase-sm {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-kutubase-sm p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:400;\n\t\tfont-size:12px;\n\t\tline-height:14px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(117,117,117);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-kutubase-sm .g-pstyle0 {\n\t\tfont-weight:bold;\n\t\tfilter:alpha(opacity=60);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=60);\n\t\topacity:0.6;\n\t\tletter-spacing:0.2em;\n\t}\n\t#g-kutubase-sm .g-pstyle1 {\n\t\tfilter:alpha(opacity=60);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=60);\n\t\topacity:0.6;\n\t\ttext-align:center;\n\t}\n\t#g-kutubase-sm .g-pstyle2 {\n\t\tfont-weight:100;\n\t\tfont-size:11px;\n\t\tline-height:13px;\n\t\ttext-align:center;\n\t}\n\t#g-kutubase-sm .g-pstyle3 {\n\t\tfilter:alpha(opacity=60);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=60);\n\t\topacity:0.6;\n\t}\n\t#g-kutubase-md {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-kutubase-md p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:400;\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(117,117,117);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-kutubase-md .g-pstyle0 {\n\t\tfont-weight:bold;\n\t\tfont-size:15px;\n\t\tline-height:18px;\n\t\tfilter:alpha(opacity=60);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=60);\n\t\topacity:0.6;\n\t\tletter-spacing:0.2em;\n\t}\n\t#g-kutubase-md .g-pstyle1 {\n\t\tfont-size:15px;\n\t\tline-height:18px;\n\t\tfilter:alpha(opacity=60);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=60);\n\t\topacity:0.6;\n\t\ttext-align:center;\n\t}\n\t#g-kutubase-md .g-pstyle2 {\n\t\tfilter:alpha(opacity=60);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=60);\n\t\topacity:0.6;\n\t}\n\t#g-kutubase-md .g-pstyle3 {\n\t\tfont-weight:100;\n\t\tfont-size:12px;\n\t\tline-height:14px;\n\t\ttext-align:center;\n\t}\n\t#g-kutubase-lg {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-kutubase-lg p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:400;\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(117,117,117);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-kutubase-lg .g-pstyle0 {\n\t\tfont-weight:bold;\n\t\tfont-size:16px;\n\t\tline-height:19px;\n\t\tfilter:alpha(opacity=60);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=60);\n\t\topacity:0.6;\n\t\tletter-spacing:0.2em;\n\t}\n\t#g-kutubase-lg .g-pstyle1 {\n\t\tfilter:alpha(opacity=60);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=60);\n\t\topacity:0.6;\n\t\ttext-align:center;\n\t}\n\t#g-kutubase-lg .g-pstyle2 {\n\t\tfilter:alpha(opacity=60);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=60);\n\t\topacity:0.6;\n\t}\n\n\t\t/* Custom CSS */\n\t\t\t\t#g-kutubase-lg {\n\t\tdisplay:block;\n\t\tmargin:0 auto;\n\t\t}\n\t\t#g-kutubase-sm, \n\t\t#g-kutubase-md{\n\t\tdisplay:none;\n\t\tmargin:0;\n\t\t}\n\t\t@media (max-width: 992px) {\n\t\t\t#g-kutubase-lg,\n\t\t\t#g-kutubase-sm{\n\t\t\tdisplay:none;\n\t\t\t}\n\t\t\t#g-kutubase-md{\n\t\t\tdisplay:block;\n\t\t\tmargin: 0 auto;\n\t\t\t}\n\t\t }\n\t\t@media (max-width: 750px) {\n\t\t\t#g-kutubase-lg,\n\t\t\t#g-kutubase-md{\n\t\t\tdisplay:none;\n\t\t\t}\n\t\t\t#g-kutubase-sm{\n\t\t\tdisplay:block;\n\t\t\tmargin: 0 auto;\n\t\t\t}\n\t\t }\n\n\n</style>\n\n<div id="g-kutubase-box" class="ai2html">\n\n\t<!-- Artboard: sm -->\n\t<div id="g-kutubase-sm" class="g-artboard g-artboard-v3" data-min-width=\'410\' data-max-width=\'749\'>\n\t\t<img id="g-ai0-0" class="g-aiImg" src="images/graphics/kutubase-sm.jpg"/>\n\t\t<div id="g-ai0-1" class="g-SM g-aiAbs g-aiPointText" style="top:5.1045%;margin-top:-8.3px;left:73.1824%;width:98px;">\n\t\t\t<p class="g-pstyle0">BANGLADESH</p>\n\t\t</div>\n\t\t<div id="g-ai0-2" class="g-SM g-aiAbs g-aiPointText" style="top:16.8157%;margin-top:-15.1px;left:74.6444%;margin-left:-8.7805%;width:74px;">\n\t\t\t<p class="g-pstyle1">Kutupalong</p>\n\t\t\t<p class="g-pstyle1">Refugee Camp</p>\n\t\t</div>\n\t\t<div id="g-ai0-3" class="g-SM g-aiAbs g-aiPointText" style="top:51.4858%;margin-top:-7.1px;left:5.499%;margin-left:-3.2927%;width:29px;">\n\t\t\t<p class="g-pstyle2">200 m</p>\n\t\t</div>\n\t\t<div id="g-ai0-4" class="g-SM g-aiAbs g-aiPointText" style="top:76.8424%;margin-top:-22.3px;left:82.9702%;width:59px;">\n\t\t\t<p class="g-pstyle3">Cox&rsquo;s Bazar</p>\n\t\t\t<p class="g-pstyle3">- Teknaf</p>\n\t\t\t<p class="g-pstyle3">Highway</p>\n\t\t</div>\n\t</div>\n\n\t<!-- Artboard: md -->\n\t<div id="g-kutubase-md" class="g-artboard g-artboard-v3" data-min-width=\'750\' data-max-width=\'919\'>\n\t\t<img id="g-ai1-0" class="g-aiImg" src="images/graphics/kutubase-md.jpg"/>\n\t\t<div id="g-ai1-1" class="g-Layer_23 g-aiAbs g-aiPointText" style="top:5.8672%;margin-top:-10.6px;left:82.3154%;width:121px;">\n\t\t\t<p class="g-pstyle0">BANGLADESH</p>\n\t\t</div>\n\t\t<div id="g-ai1-2" class="g-Layer_23 g-aiAbs g-aiPointText" style="top:17.1569%;margin-top:-19.1px;left:72.5279%;margin-left:-6%;width:92px;">\n\t\t\t<p class="g-pstyle1">Kutupalong</p>\n\t\t\t<p class="g-pstyle1">Refugee Camp</p>\n\t\t</div>\n\t\t<div id="g-ai1-3" class="g-Layer_23 g-aiAbs g-aiPointText" style="top:24.702%;margin-top:-26.4px;left:87.7059%;width:68px;">\n\t\t\t<p class="g-pstyle2">Cox&rsquo;s Bazar</p>\n\t\t\t<p class="g-pstyle2">- Teknaf</p>\n\t\t\t<p class="g-pstyle2">Highway</p>\n\t\t</div>\n\t\t<div id="g-ai1-4" class="g-Layer_23 g-aiAbs g-aiPointText" style="top:57.3049%;margin-top:-7.7px;left:9.714%;margin-left:-1.9333%;width:31px;">\n\t\t\t<p class="g-pstyle3">200 m</p>\n\t\t</div>\n\t</div>\n\n\t<!-- Artboard: lg -->\n\t<div id="g-kutubase-lg" class="g-artboard g-artboard-v3" data-min-width=\'920\'>\n\t\t<img id="g-ai2-0" class="g-aiImg" src="images/graphics/kutubase-lg.jpg"/>\n\t\t<div id="g-ai2-1" class="g-highway g-aiAbs g-aiPointText" style="top:5.9394%;margin-top:-11.2px;left:83.8153%;width:129px;">\n\t\t\t<p class="g-pstyle0">BANGLADESH</p>\n\t\t</div>\n\t\t<div id="g-ai2-2" class="g-bigoutline g-aiAbs g-aiPointText" style="top:17.4593%;margin-top:-18px;left:72.787%;margin-left:-4.5652%;width:86px;">\n\t\t\t<p class="g-pstyle1">Kutupalong</p>\n\t\t\t<p class="g-pstyle1">Refugee Camp</p>\n\t\t</div>\n\t\t<div id="g-ai2-3" class="g-highway g-aiAbs g-aiPointText" style="top:25.4901%;margin-top:-26.4px;left:89.7169%;width:68px;">\n\t\t\t<p class="g-pstyle2">Cox&rsquo;s Bazar</p>\n\t\t\t<p class="g-pstyle2">- Teknaf</p>\n\t\t\t<p class="g-pstyle2">Highway</p>\n\t\t</div>\n\t\t<div id="g-ai2-4" class="g-highway g-aiAbs g-aiPointText" style="top:59.7362%;margin-top:-9.6px;left:7.8294%;margin-left:-1.9022%;width:37px;">\n\t\t\t<p class="g-pstyle1">200 m</p>\n\t\t</div>\n\t</div>\n\n</div>\n\n<!-- End ai2html - 2017-11-30 18:56 -->\n';
    }
}(),
function() {
    window.Reuters = window.Reuters || {},
    window.Reuters.Graphics = window.Reuters.Graphics || {},
    window.Reuters.Graphics.Template = window.Reuters.Graphics.Template || {},
    window.Reuters.Graphics.Template.lactrineall = function(t) {
        var n = "";
        return n += '<!-- Generated by ai2html v0.65.4 - 2017-11-30 09:54 -->\n<!-- ai file: lactrineall.ai -->\n<style type=\'text/css\' media=\'screen,print\'>\n\t#g-lactrineall-box .g-artboard {\n\t\tmargin:0 auto;\n\t}\n\t#g-lactrineall-box .g-artboard p {\n\t\tmargin:0;\n\t}\n\t.g-aiAbs {\n\t\tposition:absolute;\n\t}\n\t.g-aiImg {\n\t\tdisplay:block;\n\t\twidth:100% !important;\n\t}\n\t.g-aiPointText p { white-space: nowrap; }\n\t#g-lactrineall-sm {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-lactrineall-sm p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:400;\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(0,0,0);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-lactrineall-sm .g-pstyle0 {\n\t\ttext-align:center;\n\t}\n\t#g-lactrineall-md {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-lactrineall-md p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:400;\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(0,0,0);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-lactrineall-md .g-pstyle0 {\n\t\ttext-align:center;\n\t}\n\t#g-lactrineall-lg {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-lactrineall-lg p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:400;\n\t\tfont-size:15px;\n\t\tline-height:18px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(0,0,0);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-lactrineall-lg .g-pstyle0 {\n\t\ttext-align:center;\n\t}\n\n\t\t/* Custom CSS */\n\t\t\t\t#g-lactrineall-lg {\n\t\tdisplay:block;\n\t\tmargin:0 auto;\n\t\t}\n\t\t#g-lactrineall-sm, \n\t\t#g-lactrineall-md{\n\t\tdisplay:none;\n\t\tmargin:0;\n\t\t}\n\t\t@media (max-width: 992px) {\n\t\t\t#g-lactrineall-lg,\n\t\t\t#g-lactrineall-sm{\n\t\t\tdisplay:none;\n\t\t\t}\n\t\t\t#g-lactrineall-md{\n\t\t\tdisplay:block;\n\t\t\tmargin: 0 auto;\n\t\t\t}\n\t\t }\n\t\t@media (max-width: 768px) {\n\t\t\t#g-lactrineall-lg,\n\t\t\t#g-lactrineall-md{\n\t\t\tdisplay:none;\n\t\t\t}\n\t\t\t#g-lactrineall-sm{\n\t\t\tdisplay:block;\n\t\t\tmargin: 0 auto;\n\t\t\t}\n\t\t }\n\n\n</style>\n\n<div id="g-lactrineall-box" class="ai2html">\n\n\t<!-- Artboard: sm -->\n\t<div id="g-lactrineall-sm" class="g-artboard g-artboard-v3" data-min-width=\'410\' data-max-width=\'749\'>\n\t\t<img id="g-ai0-0" class="g-aiImg" src="images/graphics/lactrineall-sm.png"/>\n\t\t<div id="g-ai0-1" class="g-SM g-aiAbs g-aiPointText" style="top:48.6628%;margin-top:-18px;left:16.275%;margin-left:-5.122%;width:44px;">\n\t\t\t<p class="g-pstyle0">Latrine</p>\n\t\t\t<p class="g-pstyle0">blocks</p>\n\t\t</div>\n\t</div>\n\n\t<!-- Artboard: md -->\n\t<div id="g-lactrineall-md" class="g-artboard g-artboard-v3" data-min-width=\'750\' data-max-width=\'919\'>\n\t\t<img id="g-ai1-0" class="g-aiImg" src="images/graphics/lactrineall-md.png"/>\n\t\t<div id="g-ai1-1" class="g-SM g-aiAbs g-aiPointText" style="top:51.0449%;margin-top:-18px;left:20.322%;margin-left:-2.8%;width:44px;">\n\t\t\t<p class="g-pstyle0">Latrine</p>\n\t\t\t<p class="g-pstyle0">blocks</p>\n\t\t</div>\n\t</div>\n\n\t<!-- Artboard: lg -->\n\t<div id="g-lactrineall-lg" class="g-artboard g-artboard-v3" data-min-width=\'920\'>\n\t\t<img id="g-ai2-0" class="g-aiImg" src="images/graphics/lactrineall-lg.png"/>\n\t\t<div id="g-ai2-1" class="g-SM g-aiAbs g-aiPointText" style="top:44.8575%;margin-top:-19.1px;left:14.8923%;margin-left:-2.4457%;width:47px;">\n\t\t\t<p class="g-pstyle0">Latrine</p>\n\t\t\t<p class="g-pstyle0">blocks</p>\n\t\t</div>\n\t</div>\n\n</div>\n\n<!-- End ai2html - 2017-11-30 09:54 -->\n'
    }
}(),
function() {
    window.Reuters = window.Reuters || {},
    window.Reuters.Graphics = window.Reuters.Graphics || {},
    window.Reuters.Graphics.Template = window.Reuters.Graphics.Template || {},
    window.Reuters.Graphics.Template.latrinechartsm = function(t) {
        var n = "";
        return n += '<!-- Generated by ai2html v0.65.4 - 2017-12-01 21:17 -->\n<!-- ai file: latrinechartsm.ai -->\n<style type=\'text/css\' media=\'screen,print\'>\n\t#g-latrinechartsm-box .g-artboard {\n\t\tmargin:0 auto;\n\t}\n\t#g-latrinechartsm-box .g-artboard p {\n\t\tmargin:0;\n\t}\n\t.g-aiAbs {\n\t\tposition:absolute;\n\t}\n\t.g-aiImg {\n\t\tdisplay:block;\n\t\twidth:100% !important;\n\t}\n\t.g-aiPointText p { white-space: nowrap; }\n\t#g-latrinechartsm-lg {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-latrinechartsm-lg p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:400;\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(0,0,0);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-latrinechartsm-lg .g-pstyle0 {\n\t\tfont-weight:bold;\n\t\ttext-align:right;\n\t}\n\t#g-latrinechartsm-lg .g-pstyle1 {\n\t\ttext-align:right;\n\t}\n\t#g-latrinechartsm-lg .g-cstyle0 {\n\t\tfont-weight:bold;\n\t\tcolor:rgb(198,89,14);\n\t}\n\n\t\t/* Custom CSS */\n\t\t\t\t#g-latrinechartsm-lg {\n\t\tdisplay:block;\n\t\tmargin:0 auto;\n\t\t}\n\n\n</style>\n\n<div id="g-latrinechartsm-box" class="ai2html">\n\n\t<!-- Artboard: lg -->\n\t<div id="g-latrinechartsm-lg" class="g-artboard g-artboard-v3" data-min-width=\'320\'>\n\t\t<img id="g-ai0-0" class="g-aiImg" src="images/graphics/latrinechartsm-lg.png"/>\n\t\t<div id="g-ai0-1" class="g-Layer1 g-aiAbs g-aiPointText" style="top:27.9814%;margin-top:-26.4px;right:9.2062%;width:163px;">\n\t\t\t<p class="g-pstyle0">Balukhali Makeshift Camp</p>\n\t\t\t<p class="g-pstyle1">Average <span class="g-cstyle0">115</span> people</p>\n\t\t\t<p class="g-pstyle1">share a toilet</p>\n\t\t</div>\n\t\t<div id="g-ai0-2" class="g-Layer1 g-aiAbs g-aiPointText" style="top:39.0781%;margin-top:-9.6px;right:56.6113%;width:72px;">\n\t\t\t<p class="g-pstyle1">Other zones</p>\n\t\t</div>\n\t\t<div id="g-ai0-3" class="g-Layer1 g-aiAbs g-aiPointText" style="top:79.9813%;margin-top:-18px;left:7.1308%;width:115px;">\n\t\t\t<p>U.N. guideline</p>\n\t\t\t<p>20 people per toilet</p>\n\t\t</div>\n\t</div>\n\n</div>\n\n<!-- End ai2html - 2017-12-01 21:17 -->\n'
    }
}(),
function() {
    window.Reuters = window.Reuters || {},
    window.Reuters.Graphics = window.Reuters.Graphics || {},
    window.Reuters.Graphics.Template = window.Reuters.Graphics.Template || {},
    window.Reuters.Graphics.Template.locator = function(t) {
        var n = "";
        return n += '<!-- Generated by ai2html v0.65.4 - 2017-11-14 16:12 -->\n<!-- ai file: locator.ai -->\n<style type=\'text/css\' media=\'screen,print\'>\n\t#g-locator-box .g-artboard {\n\t\tmargin:0 auto;\n\t}\n\t#g-locator-box .g-artboard p {\n\t\tmargin:0;\n\t}\n\t.g-aiAbs {\n\t\tposition:absolute;\n\t}\n\t.g-aiImg {\n\t\tdisplay:block;\n\t\twidth:100% !important;\n\t}\n\t.g-aiPointText p { white-space: nowrap; }\n\t#g-locator-lg {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t\twidth:180px;\n\t}\n\t#g-locator-lg p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:100;\n\t\tfont-size:12px;\n\t\tline-height:14px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(0,0,0);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-locator-lg .g-pstyle0 {\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t}\n\t#g-locator-lg .g-pstyle1 {\n\t\tfont-weight:bold;\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t}\n\t#g-locator-lg .g-pstyle2 {\n\t\tline-height:15px;\n\t}\n\t#g-locator-lg .g-pstyle3 {\n\t\tfont-family:arial,helvetica,sans-serif;\n\t\tfont-size:4px;\n\t\tline-height:5px;\n\t\tcolor:rgb(129,131,133);\n\t}\n\n\t\t/* Custom CSS */\n\t\t\t\t#g-locator-lg {\n\t\tdisplay:block;\n\t\t}\n\n\n</style>\n\n<div id="g-locator-box" class="ai2html">\n\n\t<!-- Artboard: lg -->\n\t<div id="g-locator-lg" class="g-artboard g-artboard-v3" data-min-width=\'180\'>\n\t\t<img id="g-ai0-0" class="g-aiImg" src="images/graphics/locator-lg.jpg"/>\n\t\t<div id="g-ai0-1" class="g-Layer1 g-aiAbs g-aiPointText" style="top:23.0905%;margin-top:-9.3px;left:64.8363%;width:59px;">\n\t\t\t<p class="g-pstyle0">MYANMAR</p>\n\t\t</div>\n\t\t<div id="g-ai0-2" class="g-Layer1 g-aiAbs g-aiPointText" style="top:52.886%;margin-top:-7.7px;left:40.203%;width:55px;">\n\t\t\t<p>Camp sites</p>\n\t\t</div>\n\t\t<div id="g-ai0-3" class="g-Layer_4 g-aiAbs g-aiPointText" style="top:63.8621%;margin-top:-10px;left:22.0031%;width:86px;">\n\t\t\t<p class="g-pstyle1">BANGLADESH</p>\n\t\t</div>\n\t\t<div id="g-ai0-4" class="g-Layer1 g-aiAbs g-aiPointText" style="top:89.9121%;margin-top:-8.4px;left:42.3921%;width:26px;">\n\t\t\t<p class="g-pstyle2">5 km</p>\n\t\t</div>\n\t\t<div id="g-ai0-5" class="g-Layer1 g-aiAbs g-aiPointText" style="top:91.3212%;margin-top:-2.8px;left:17.6254%;width:3px;">\n\t\t\t<p class="g-pstyle3"> </p>\n\t\t</div>\n\t</div>\n\n</div>\n\n<!-- End ai2html - 2017-11-14 16:12 -->\n'
    }
}(),
function() {
    window.Reuters = window.Reuters || {},
    window.Reuters.Graphics = window.Reuters.Graphics || {},
    window.Reuters.Graphics.Template = window.Reuters.Graphics.Template || {},
    window.Reuters.Graphics.Template.london = function(t) {
        var n = "";
        return n += '<!-- Generated by ai2html v0.65.4 - 2017-12-04 13:33 -->\n<!-- ai file: london.ai -->\n<style type=\'text/css\' media=\'screen,print\'>\n\t#g-london-box .g-artboard {\n\t\tmargin:0 auto;\n\t}\n\t#g-london-box .g-artboard p {\n\t\tmargin:0;\n\t}\n\t.g-aiAbs {\n\t\tposition:absolute;\n\t}\n\t.g-aiImg {\n\t\tdisplay:block;\n\t\twidth:100% !important;\n\t}\n\t.g-aiPointText p { white-space: nowrap; }\n\t#g-london-md {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-london-md p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:400;\n\t\tfont-size:12px;\n\t\tline-height:14px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\ttext-transform:none;\n\t\tcolor:rgb(255,255,255);\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-london-md .g-pstyle0 {\n\t\ttext-transform:uppercase;\n\t}\n\t#g-london-md .g-pstyle1 {\n\t\tfont-size:10px;\n\t\tline-height:12px;\n\t\ttext-align:center;\n\t}\n\t#g-london-md .g-pstyle2 {\n\t\tfont-weight:100;\n\t\tfont-size:10px;\n\t\tline-height:12px;\n\t\ttext-align:right;\n\t}\n\t#g-london-lg {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-london-lg p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:100;\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\ttext-transform:none;\n\t\tcolor:rgb(255,255,255);\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-london-lg .g-pstyle0 {\n\t\ttext-transform:uppercase;\n\t}\n\t#g-london-lg .g-pstyle1 {\n\t\tfont-size:10px;\n\t\tline-height:12px;\n\t\ttext-align:center;\n\t}\n\t#g-london-lg .g-pstyle2 {\n\t\tfont-size:10px;\n\t\tline-height:12px;\n\t\ttext-align:right;\n\t}\n\n\t\t/* Custom CSS */\n\t\t\t\t#g-london-lg {\n\t\ttext-shadow: 2px 2px 2px black;\n\t\tdisplay:block;\n\t\tmargin:0 auto;\n\t\t}\n\t\t#g-london-md{\n\t\tdisplay:none;\n\t\tmargin:0;\n\t\t}\n\t\t@media (max-width: 1200px) {\n\t\t\t#g-london-lg{\n\t\t\tdisplay:none;\n\t\t\t}\n\t\t\t#g-london-md{\n\t\t\ttext-shadow: 2px 2px 2px black;\n\t\t\tdisplay:block;\n\t\t\tmargin: 0 auto;\n\t\t\t}\n\t\t }\n\n\n</style>\n\n<div id="g-london-box" class="ai2html">\n\n\t<!-- Artboard: md -->\n\t<div id="g-london-md" class="g-artboard g-artboard-v3" data-min-width=\'330\' data-max-width=\'349\'>\n\t\t<img id="g-ai0-0" class="g-aiImg" src="images/graphics/london-md.jpg"/>\n\t\t<div id="g-ai0-1" class="g-Layer_3 g-aiAbs g-aiPointText" style="top:8.8707%;margin-top:-7.9px;left:8.534%;width:45px;">\n\t\t\t<p class="g-pstyle0">Camden</p>\n\t\t</div>\n\t\t<div id="g-ai0-2" class="g-Layer_3 g-aiAbs g-aiPointText" style="top:17.3151%;margin-top:-7.9px;left:32.9783%;width:70px;">\n\t\t\t<p class="g-pstyle0">Kings Cross</p>\n\t\t</div>\n\t\t<div id="g-ai0-3" class="g-Layer_3 g-aiAbs g-aiPointText" style="top:40.6484%;margin-top:-7.9px;left:32.9783%;width:32px;">\n\t\t\t<p class="g-pstyle0">Soho</p>\n\t\t</div>\n\t\t<div id="g-ai0-4" class="g-Layer_3 g-aiAbs g-aiPointText" style="top:48.4706%;margin-top:-15.1px;left:24.3363%;width:65px;">\n\t\t\t<p>Buckingham</p>\n\t\t\t<p>Palace</p>\n\t\t</div>\n\t\t<div id="g-ai0-5" class="g-Layer_3 g-aiAbs g-aiPointText" style="top:49.9818%;margin-top:-7.9px;left:49.1004%;width:61px;">\n\t\t\t<p>London Eye</p>\n\t\t</div>\n\t\t<div id="g-ai0-6" class="g-Layer_3 g-aiAbs g-aiPointText" style="top:54.8707%;margin-top:-7.9px;left:52.6483%;width:69px;">\n\t\t\t<p class="g-pstyle0">South bank</p>\n\t\t</div>\n\t\t<div id="g-ai0-7" class="g-Layer_3 g-aiAbs g-aiPointText" style="top:58.204%;margin-top:-7.9px;left:23.0398%;width:75px;">\n\t\t\t<p class="g-pstyle0">Westminster</p>\n\t\t</div>\n\t\t<div id="g-ai0-8" class="g-Layer_3 g-aiAbs g-aiPointText" style="transform: matrix(1,-0.0012,0.0012,1,0,0);transform-origin: 50% 57.3911003645025%;-webkit-transform: matrix(1,-0.0012,0.0012,1,0,0);-webkit-transform-origin: 50% 57.3911003645025%;-ms-transform: matrix(1,-0.0012,0.0012,1,0,0);-ms-transform-origin: 50% 57.3911003645025%;top:97.7255%;margin-top:-6.8px;left:6.0151%;margin-left:-3.0303%;width:22px;">\n\t\t\t<p class="g-pstyle1">1 km</p>\n\t\t</div>\n\t\t<div id="g-ai0-9" class="g-Layer_3 g-aiAbs g-aiPointText" style="top:98.3522%;margin-top:-6.6px;right:2.4369%;width:113px;">\n\t\t\t<p class="g-pstyle2">Satellite image: Planet Labs</p>\n\t\t</div>\n\t</div>\n\n\t<!-- Artboard: lg -->\n\t<div id="g-london-lg" class="g-artboard g-artboard-v3" data-min-width=\'350\'>\n\t\t<img id="g-ai1-0" class="g-aiImg" src="images/graphics/london-lg.jpg"/>\n\t\t<div id="g-ai1-1" class="g-Layer_3 g-aiAbs g-aiPointText" style="top:13.2638%;margin-top:-9.3px;left:12.4147%;width:51px;">\n\t\t\t<p class="g-pstyle0">Camden</p>\n\t\t</div>\n\t\t<div id="g-ai1-2" class="g-Layer_3 g-aiAbs g-aiPointText" style="top:20.8638%;margin-top:-9.3px;left:35.4621%;width:79px;">\n\t\t\t<p class="g-pstyle0">Kings Cross</p>\n\t\t</div>\n\t\t<div id="g-ai1-3" class="g-Layer_3 g-aiAbs g-aiPointText" style="top:41.6638%;margin-top:-9.3px;left:35.4621%;width:36px;">\n\t\t\t<p class="g-pstyle0">Soho</p>\n\t\t</div>\n\t\t<div id="g-ai1-4" class="g-Layer_3 g-aiAbs g-aiPointText" style="top:49.7438%;margin-top:-17.7px;left:22.002%;width:73px;">\n\t\t\t<p>Buckingham</p>\n\t\t\t<p>Palace</p>\n\t\t</div>\n\t\t<div id="g-ai1-5" class="g-Layer_3 g-aiAbs g-aiPointText" style="top:51.0638%;margin-top:-9.3px;left:48.6867%;width:69px;">\n\t\t\t<p>London Eye</p>\n\t\t</div>\n\t\t<div id="g-ai1-6" class="g-Layer_3 g-aiAbs g-aiPointText" style="top:59.6638%;margin-top:-9.3px;left:20.605%;width:85px;">\n\t\t\t<p class="g-pstyle0">Westminster</p>\n\t\t</div>\n\t\t<div id="g-ai1-7" class="g-Layer_3 g-aiAbs g-aiPointText" style="transform: matrix(1,-0.0012,0.0012,1,0,0);transform-origin: 50% 57.593059469079%;-webkit-transform: matrix(1,-0.0012,0.0012,1,0,0);-webkit-transform-origin: 50% 57.593059469079%;-ms-transform: matrix(1,-0.0012,0.0012,1,0,0);-ms-transform-origin: 50% 57.593059469079%;top:97.717%;margin-top:-6.6px;left:5.211%;margin-left:-3.4286%;width:26px;">\n\t\t\t<p class="g-pstyle1">500 m</p>\n\t\t</div>\n\t\t<div id="g-ai1-8" class="g-Layer_3 g-aiAbs g-aiPointText" style="top:98.317%;margin-top:-6.6px;right:1.6339%;width:113px;">\n\t\t\t<p class="g-pstyle2">Satellite image: Planet Labs</p>\n\t\t</div>\n\t</div>\n\n</div>\n\n<!-- End ai2html - 2017-12-04 13:33 -->\n'
    }
}(),
function() {
    window.Reuters = window.Reuters || {},
    window.Reuters.Graphics = window.Reuters.Graphics || {},
    window.Reuters.Graphics.Template = window.Reuters.Graphics.Template || {},
    window.Reuters.Graphics.Template.map1 = function(t) {
        var n = "";
        return n += '<!-- Generated by ai2html v0.65.4 - 2017-12-01 21:07 -->\n<!-- ai file: map1.ai -->\n<style type=\'text/css\' media=\'screen,print\'>\n\t#g-map1-box .g-artboard {\n\t\tmargin:0 auto;\n\t}\n\t#g-map1-box .g-artboard p {\n\t\tmargin:0;\n\t}\n\t.g-aiAbs {\n\t\tposition:absolute;\n\t}\n\t.g-aiImg {\n\t\tdisplay:block;\n\t\twidth:100% !important;\n\t}\n\t.g-aiPointText p { white-space: nowrap; }\n\t#g-map1-sm {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-map1-sm p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:400;\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(255,255,255);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-map1-sm .g-pstyle0 {\n\t\tfont-weight:100;\n\t\tfont-size:12px;\n\t\tline-height:14px;\n\t}\n\t#g-map1-sm .g-pstyle1 {\n\t\ttext-align:right;\n\t}\n\t#g-map1-sm .g-pstyle2 {\n\t\tfont-weight:bold;\n\t\tfont-size:12px;\n\t\tline-height:14px;\n\t\tletter-spacing:0.2em;\n\t\ttext-transform:uppercase;\n\t}\n\t#g-map1-md {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-map1-md p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:400;\n\t\tfont-size:15px;\n\t\tline-height:18px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(255,255,255);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-map1-md .g-pstyle0 {\n\t\tfont-weight:100;\n\t\tfont-size:14px;\n\t\tline-height:16px;\n\t}\n\t#g-map1-md .g-pstyle1 {\n\t\ttext-align:right;\n\t}\n\t#g-map1-md .g-pstyle2 {\n\t\tfont-weight:bold;\n\t\tfont-size:16px;\n\t\tline-height:19px;\n\t\tletter-spacing:0.2em;\n\t\ttext-transform:uppercase;\n\t}\n\t#g-map1-md .g-pstyle3 {\n\t\tfont-size:16px;\n\t\tline-height:19px;\n\t}\n\t#g-map1-md .g-pstyle4 {\n\t\tfont-size:16px;\n\t\tline-height:19px;\n\t\tletter-spacing:0.2em;\n\t\ttext-transform:uppercase;\n\t}\n\t#g-map1-lg {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-map1-lg p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:400;\n\t\tfont-size:15px;\n\t\tline-height:18px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(255,255,255);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-map1-lg .g-pstyle0 {\n\t\tfont-weight:100;\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t}\n\t#g-map1-lg .g-pstyle1 {\n\t\ttext-align:right;\n\t}\n\t#g-map1-lg .g-pstyle2 {\n\t\tfont-weight:bold;\n\t\tletter-spacing:0.2em;\n\t\ttext-transform:uppercase;\n\t}\n\t#g-map1-lg .g-pstyle3 {\n\t\tletter-spacing:0.2em;\n\t\ttext-transform:uppercase;\n\t}\n\t#g-map1-xl {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-map1-xl p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:400;\n\t\tfont-size:15px;\n\t\tline-height:18px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(255,255,255);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-map1-xl .g-pstyle0 {\n\t\tfont-weight:100;\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t}\n\t#g-map1-xl .g-pstyle1 {\n\t\ttext-align:right;\n\t}\n\t#g-map1-xl .g-pstyle2 {\n\t\tfont-weight:bold;\n\t\tletter-spacing:0.2em;\n\t\ttext-transform:uppercase;\n\t}\n\t#g-map1-xl .g-pstyle3 {\n\t\tletter-spacing:0.2em;\n\t\ttext-transform:uppercase;\n\t}\n\t#g-map1-xs {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-map1-xs p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:400;\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(255,255,255);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-map1-xs .g-pstyle0 {\n\t\tfont-size:12px;\n\t\tline-height:14px;\n\t}\n\t#g-map1-xs .g-pstyle1 {\n\t\ttext-align:center;\n\t}\n\t#g-map1-xs .g-pstyle2 {\n\t\ttext-align:right;\n\t}\n\t#g-map1-xs .g-pstyle3 {\n\t\tfont-weight:bold;\n\t\tfont-size:12px;\n\t\tline-height:14px;\n\t\tletter-spacing:0.2em;\n\t\ttext-transform:uppercase;\n\t}\n\n\t\t/* Custom CSS */\n\t\t\t\t#g-map1-xl {\n\t\tdisplay:block;\n\t\tmargin:0 auto;\n\t\ttext-shadow: 2px 2px 2px black;\n\t\t}\n\t\t#g-map1-lg,\n\t\t#g-map1-xs,\n\t\t#g-map1-sm,\n\t\t#g-map1-md{\n\t\tdisplay:none;\n\t\tmargin:0;\n\t\t}\n\t\t@media (max-width: 1100px) {\n\t\t\t#g-map1-xl,\n\t\t\t#g-map1-md,\n\t\t\t#g-map1-xs,\n\t\t\t#g-map1-sm{\n\t\t\tdisplay:none;\n\t\t\t}\n\t\t\t#g-map1-lg{\n\t\t\ttext-shadow: 2px 2px 2px black;\n\t\t\tdisplay:block;\n\t\t\tmargin: 0 auto;\n\t\t\t}\n\t\t }\n\t\t@media (max-width: 992px) {\n\t\t\t#g-map1-xl,\n\t\t\t#g-map1-lg,\n\t\t\t#g-map1-xs,\n\t\t\t#g-map1-sm{\n\t\t\tdisplay:none;\n\t\t\t}\n\t\t\t#g-map1-md{\n\t\t\ttext-shadow: 2px 2px 2px black;\n\t\t\tdisplay:block;\n\t\t\tmargin: 0 auto;\n\t\t\t}\n\t\t }\n\t\t@media (max-width: 765px) {\n\t\t\t#g-map1-xl,\n\t\t\t#g-map1-lg,\n\t\t\t#g-map1-xs,\n\t\t\t#g-map1-md{\n\t\t\tdisplay:none;\n\t\t\t}\n\t\t\t#g-map1-sm{\n\t\t\ttext-shadow: 2px 2px 2px black;\n\t\t\tdisplay:block;\n\t\t\tmargin: 0 auto;\n\t\t\t}\n\t\t }\n\t\t@media (max-width: 575px) {\n\t\t\t#g-map1-xl,\n\t\t\t#g-map1-lg,\n\t\t\t#g-map1-sm,\n\t\t\t#g-map1-md{\n\t\t\tdisplay:none;\n\t\t\t}\n\t\t\t#g-map1-xs{\n\t\t\ttext-shadow: 2px 2px 2px black;\n\t\t\tdisplay:block;\n\t\t\tmargin: 0 auto;\n\t\t\t}\n\t\t }\n\n\n</style>\n\n<div id="g-map1-box" class="ai2html">\n\n\t<!-- Artboard: sm -->\n\t<div id="g-map1-sm" class="g-artboard g-artboard-v3" data-min-width=\'510\' data-max-width=\'749\'>\n\t\t<img id="g-ai0-0" class="g-aiImg" src="images/graphics/map1-sm.jpg"/>\n\t\t<div id="g-ai0-1" class="g-Layer_16 g-aiAbs g-aiPointText" style="top:8.7695%;margin-top:-7.7px;left:5.9919%;width:31px;">\n\t\t\t<p class="g-pstyle0">500 m</p>\n\t\t</div>\n\t\t<div id="g-ai0-2" class="g-Layer_16 g-aiAbs g-aiPointText" style="top:25.3106%;margin-top:-18px;left:72.6864%;width:82px;">\n\t\t\t<p>Kutupalong</p>\n\t\t\t<p>Refugee Camp</p>\n\t\t</div>\n\t\t<div id="g-ai0-3" class="g-Layer_16 g-aiAbs .g-pstyle1 g-aiPointText" style="top:32.8631%;margin-top:-18px;right:53.1697%;width:95px;">\n\t\t\t<p class="g-pstyle1">Kutupalong</p>\n\t\t\t<p class="g-pstyle1">Makeshift<br>Settlement</p>\n\t\t</div>\n\t\t<div id="g-ai0-4" class="g-Layer_16 g-aiAbs g-aiPointText" style="top:51.0887%;margin-top:-8.3px;left:5.9919%;width:98px;">\n\t\t\t<p class="g-pstyle2">Bangladesh</p>\n\t\t</div>\n\t\t<div id="g-ai0-5" class="g-Layer_16 g-aiAbs g-aiPointText" style="top:60.6952%;margin-top:-18px;right:46.6243%;width:95px;">\n\t\t\t<p class="g-pstyle1">Balukhali</p>\n\t\t\t<p class="g-pstyle1">Makeshift<br>Settlement</p>\n\t\t</div>\n\t\t<div id="g-ai0-6" class="g-Layer_16 g-aiAbs g-aiPointText" style="top:70.4854%;margin-top:-18px;left:72.938%;width:118px;">\n\t\t\t<p>Cox&rsquo;s Bazar - Teknaf</p>\n\t\t\t<p>Highway</p>\n\t\t</div>\n\t</div>\n\n\t<!-- Artboard: md -->\n\t<div id="g-map1-md" class="g-artboard g-artboard-v3" data-min-width=\'750\' data-max-width=\'899\'>\n\t\t<img id="g-ai1-0" class="g-aiImg" src="images/graphics/map1-md.jpg"/>\n\t\t<div id="g-ai1-1" class="g-Layer_16 g-aiAbs g-aiPointText" style="top:2.763%;margin-top:-8.6px;left:8.9052%;width:34px;">\n\t\t\t<p class="g-pstyle0">500 m</p>\n\t\t</div>\n\t\t<div id="g-ai1-2" class="g-Layer_16 g-aiAbs g-aiPointText" style="top:20.2147%;margin-top:-19.1px;left:75.4552%;width:87px;">\n\t\t\t<p>Kutupalong</p>\n\t\t\t<p>Refugee Camp</p>\n\t\t</div>\n\t\t<div id="g-ai1-3" class="g-Layer_16 g-aiAbs g-aiPointText" style="top:32.5147%;margin-top:-19.1px;right:67.0936%;width:130px;">\n\t\t\t<p class="g-pstyle1">Kutupalong</p>\n\t\t\t<p class="g-pstyle1">Makeshift Settlement</p>\n\t\t</div>\n\t\t<div id="g-ai1-4" class="g-Layer_16 g-aiAbs g-aiPointText" style="top:35.4068%;margin-top:-11.1px;left:79.4529%;width:121px;">\n\t\t\t<p class="g-pstyle2">Bangladesh</p>\n\t\t</div>\n\t\t<div id="g-ai1-5" class="g-Layer_16 g-aiAbs g-aiPointText" style="top:58.4147%;margin-top:-19.1px;right:61.8169%;width:130px;">\n\t\t\t<p class="g-pstyle1">Balukhali</p>\n\t\t\t<p class="g-pstyle1">Makeshift Settlement</p>\n\t\t</div>\n\t\t<div id="g-ai1-6" class="g-Layer_16 g-aiAbs g-aiPointText" style="top:59.5045%;margin-top:-20px;left:65.8554%;width:126px;">\n\t\t\t<p class="g-pstyle3">Cox&rsquo;s Bazar - Teknaf</p>\n\t\t\t<p class="g-pstyle3">Highway</p>\n\t\t</div>\n\t\t<div id="g-ai1-7" class="g-Layer_16 g-aiAbs g-aiPointText" style="top:74.4587%;margin-top:-10.6px;left:81.9679%;width:86px;">\n\t\t\t<p class="g-pstyle4">Myanmar</p>\n\t\t</div>\n\t</div>\n\n\t<!-- Artboard: lg -->\n\t<div id="g-map1-lg" class="g-artboard g-artboard-v3" data-min-width=\'900\' data-max-width=\'1069\'>\n\t\t<img id="g-ai2-0" class="g-aiImg" src="images/graphics/map1-lg.jpg"/>\n\t\t<div id="g-ai2-1" class="g-scale g-aiAbs g-aiPointText" style="top:4.7583%;margin-top:-9.3px;left:7.3342%;width:36px;">\n\t\t\t<p class="g-pstyle0">500 m</p>\n\t\t</div>\n\t\t<div id="g-ai2-2" class="g-Layer_7 g-aiAbs g-aiPointText" style="top:15.6865%;margin-top:-19.1px;left:80.3307%;width:87px;">\n\t\t\t<p>Kutupalong</p>\n\t\t\t<p>Refugee Camp</p>\n\t\t</div>\n\t\t<div id="g-ai2-3" class="g-Layer_7 g-aiAbs g-aiPointText" style="top:26.3952%;margin-top:-19.1px;right:59.3275%;width:130px;">\n\t\t\t<p class="g-pstyle1">Kutupalong</p>\n\t\t\t<p class="g-pstyle1">Makeshift Settlement</p>\n\t\t</div>\n\t\t<div id="g-ai2-4" class="g-Layer_15 g-aiAbs g-aiPointText" style="top:28.8363%;margin-top:-10.6px;left:81.6289%;width:121px;">\n\t\t\t<p class="g-pstyle2">Bangladesh</p>\n\t\t</div>\n\t\t<div id="g-ai2-5" class="g-Layer_7 g-aiAbs g-aiPointText" style="top:48.8213%;margin-top:-19.1px;right:54.4093%;width:130px;">\n\t\t\t<p class="g-pstyle1">Balukhali</p>\n\t\t\t<p class="g-pstyle1">Makeshift Settlement</p>\n\t\t</div>\n\t\t<div id="g-ai2-6" class="g-Layer_7 g-aiAbs g-aiPointText" style="top:51.4597%;margin-top:-19.1px;left:71.5354%;width:126px;">\n\t\t\t<p>Cox&rsquo;s Bazar - Teknaf</p>\n\t\t\t<p>Highway</p>\n\t\t</div>\n\t\t<div id="g-ai2-7" class="g-Layer_15 g-aiAbs g-aiPointText" style="top:62.9444%;margin-top:-10.1px;left:85.5126%;width:86px;">\n\t\t\t<p class="g-pstyle3">Myanmar</p>\n\t\t</div>\n\t</div>\n\n\t<!-- Artboard: xl -->\n\t<div id="g-map1-xl" class="g-artboard g-artboard-v3" data-min-width=\'1070\'>\n\t\t<img id="g-ai3-0" class="g-aiImg" src="images/graphics/map1-xl.jpg"/>\n\t\t<div id="g-ai3-1" class="g-scale g-aiAbs g-aiPointText" style="top:4.2766%;margin-top:-9.3px;left:12.2438%;width:36px;">\n\t\t\t<p class="g-pstyle0">500 m</p>\n\t\t</div>\n\t\t<div id="g-ai3-2" class="g-Layer_16 g-aiAbs g-aiPointText" style="top:17.0956%;margin-top:-19.1px;left:74.0354%;width:87px;">\n\t\t\t<p>Kutupalong</p>\n\t\t\t<p>Refugee Camp</p>\n\t\t</div>\n\t\t<div id="g-ai3-3" class="g-Layer_7 g-aiAbs .g-pstyle1 g-aiPointText" style="top:27.5123%;margin-top:-19.1px;right:59.7147%;width:130px;">\n\t\t\t<p class="g-pstyle1">Kutupalong</p>\n\t\t\t<p class="g-pstyle1">Makeshift Settlement</p>\n\t\t</div>\n\t\t<div id="g-ai3-4" class="g-Layer_15 g-aiAbs g-aiPointText" style="top:30.1338%;margin-top:-10.6px;left:83.0519%;width:121px;">\n\t\t\t<p class="g-pstyle2">Bangladesh</p>\n\t\t</div>\n\t\t<div id="g-ai3-5" class="g-Layer_7 g-aiAbs g-aiPointText" style="top:51.5956%;margin-top:-19.1px;right:55.5779%;width:130px;">\n\t\t\t<p class="g-pstyle1">Balukhali</p>\n\t\t\t<p class="g-pstyle1">Makeshift Settlement</p>\n\t\t</div>\n\t\t<div id="g-ai3-6" class="g-Layer_7 g-aiAbs g-aiPointText" style="top:54.429%;margin-top:-19.1px;left:66.2447%;width:126px;">\n\t\t\t<p>Cox&rsquo;s Bazar - Teknaf</p>\n\t\t\t<p>Highway</p>\n\t\t</div>\n\t\t<div id="g-ai3-7" class="g-Layer_15 g-aiAbs g-aiPointText" style="top:64.7623%;margin-top:-10.1px;left:84.8148%;width:86px;">\n\t\t\t<p class="g-pstyle3">Myanmar</p>\n\t\t</div>\n\t</div>\n\n\t<!-- Artboard: xs -->\n\t<div id="g-map1-xs" class="g-artboard g-artboard-v3" data-min-width=\'450\' data-max-width=\'509\'>\n\t\t<img id="g-ai4-0" class="g-aiImg" src="images/graphics/map1-xs.jpg"/>\n\t\t<div id="g-ai4-1" class="g-Layer_16 g-aiAbs g-aiPointText" style="top:6.9751%;margin-top:-7.9px;left:80.3207%;width:32px;">\n\t\t\t<p class="g-pstyle0">500 m</p>\n\t\t</div>\n\t\t<div id="g-ai4-2" class="g-Layer_16 g-aiAbs g-aiPointText" style="top:23.6947%;margin-top:-18px;left:66.4698%;margin-left:-8.8889%;width:82px;">\n\t\t\t<p class="g-pstyle1">Kutupalong</p>\n\t\t\t<p class="g-pstyle1">Refugee Camp</p>\n\t\t</div>\n\t\t<div id="g-ai4-3" class="g-Layer_16 g-aiAbs g-aiPointText" style="top:32.1878%;margin-top:-18px;right:65.7328%;width:95px;">\n\t\t\t<p class="g-pstyle2">Kutupalong</p>\n\t\t\t<p class="g-pstyle2">Makeshift<br>Settlement</p>\n\t\t</div>\n\t\t<div id="g-ai4-4" class="g-Layer_16 g-aiAbs g-aiPointText" style="top:57.5303%;margin-top:-18px;right:59.4079%;width:95px;">\n\t\t\t<p class="g-pstyle2">Balukhali</p>\n\t\t\t<p class="g-pstyle2">Makeshift<br>Settlement</p>\n\t\t</div>\n\t\t<div id="g-ai4-5" class="g-Layer_16 g-aiAbs g-aiPointText" style="top:66.8453%;margin-top:-18px;left:61.0832%;width:118px;">\n\t\t\t<p>Cox&rsquo;s Bazar - Teknaf</p>\n\t\t\t<p>Highway</p>\n\t\t</div>\n\t\t<div id="g-ai4-6" class="g-Layer_16 g-aiAbs g-aiPointText" style="top:82.2307%;margin-top:-8.3px;left:57.0112%;width:98px;">\n\t\t\t<p class="g-pstyle3">Bangladesh</p>\n\t\t</div>\n\t</div>\n\n</div>\n\n<!-- End ai2html - 2017-12-01 21:07 -->\n'
    }
}(),
function() {
    window.Reuters = window.Reuters || {},
    window.Reuters.Graphics = window.Reuters.Graphics || {},
    window.Reuters.Graphics.Template = window.Reuters.Graphics.Template || {},
    window.Reuters.Graphics.Template.map2 = function(t) {
        var n = "";
        return n += '<!-- Generated by ai2html v0.65.4 - 2017-12-01 21:10 -->\n<!-- ai file: map2.ai -->\n<style type=\'text/css\' media=\'screen,print\'>\n\t#g-map2-box .g-artboard {\n\t\tmargin:0 auto;\n\t}\n\t#g-map2-box .g-artboard p {\n\t\tmargin:0;\n\t}\n\t.g-aiAbs {\n\t\tposition:absolute;\n\t}\n\t.g-aiImg {\n\t\tdisplay:block;\n\t\twidth:100% !important;\n\t}\n\t.g-aiPointText p { white-space: nowrap; }\n\t#g-map2-sm {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-map2-sm p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:400;\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(255,255,255);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-map2-sm .g-pstyle0 {\n\t\tfont-size:24px;\n\t\tline-height:29px;\n\t\tcolor:rgb(0,0,0);\n\t}\n\t#g-map2-sm .g-pstyle1 {\n\t\tfont-weight:100;\n\t\tfont-size:12px;\n\t\tline-height:14px;\n\t}\n\t#g-map2-sm .g-pstyle2 {\n\t\ttext-align:center;\n\t}\n\t#g-map2-sm .g-pstyle3 {\n\t\tfont-weight:bold;\n\t\tfont-size:12px;\n\t\tline-height:14px;\n\t\tletter-spacing:0.2em;\n\t\ttext-transform:uppercase;\n\t}\n\t#g-map2-sm .g-pstyle4 {\n\t\tfont-size:13px;\n\t\tline-height:16px;\n\t}\n\t#g-map2-sm .g-pstyle5 {\n\t\ttext-align:right;\n\t}\n\t#g-map2-md {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-map2-md p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:400;\n\t\tfont-size:15px;\n\t\tline-height:18px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(255,255,255);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-map2-md .g-pstyle0 {\n\t\tfont-weight:100;\n\t\tfont-size:13px;\n\t\tline-height:16px;\n\t}\n\t#g-map2-md .g-pstyle1 {\n\t\tfont-weight:100;\n\t}\n\t#g-map2-md .g-pstyle2 {\n\t\ttext-align:center;\n\t}\n\t#g-map2-md .g-pstyle3 {\n\t\tfont-weight:bold;\n\t\tletter-spacing:0.2em;\n\t\ttext-transform:uppercase;\n\t}\n\t#g-map2-md .g-pstyle4 {\n\t\tletter-spacing:0.2em;\n\t\ttext-transform:uppercase;\n\t}\n\t#g-map2-md .g-pstyle5 {\n\t\ttext-align:right;\n\t}\n\t#g-map2-lg {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-map2-lg p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:400;\n\t\tfont-size:15px;\n\t\tline-height:18px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(255,255,255);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-map2-lg .g-pstyle0 {\n\t\tfont-weight:100;\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t}\n\t#g-map2-lg .g-pstyle1 {\n\t\ttext-align:center;\n\t}\n\t#g-map2-lg .g-pstyle2 {\n\t\tfont-weight:bold;\n\t\tletter-spacing:0.2em;\n\t\ttext-transform:uppercase;\n\t}\n\t#g-map2-lg .g-pstyle3 {\n\t\tletter-spacing:0.2em;\n\t\ttext-transform:uppercase;\n\t}\n\t#g-map2-lg .g-pstyle4 {\n\t\ttext-align:right;\n\t}\n\t#g-map2-xl {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-map2-xl p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:400;\n\t\tfont-size:15px;\n\t\tline-height:18px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(255,255,255);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-map2-xl .g-pstyle0 {\n\t\tfont-weight:100;\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t}\n\t#g-map2-xl .g-pstyle1 {\n\t\ttext-align:right;\n\t}\n\t#g-map2-xl .g-pstyle2 {\n\t\tfont-weight:bold;\n\t\tletter-spacing:0.2em;\n\t\ttext-transform:uppercase;\n\t}\n\t#g-map2-xl .g-pstyle3 {\n\t\ttext-align:center;\n\t}\n\t#g-map2-xl .g-pstyle4 {\n\t\tletter-spacing:0.2em;\n\t\ttext-transform:uppercase;\n\t}\n\t#g-map2-xs {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-map2-xs p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:400;\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(255,255,255);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-map2-xs .g-pstyle0 {\n\t\tfont-size:12px;\n\t\tline-height:14px;\n\t}\n\t#g-map2-xs .g-pstyle1 {\n\t\ttext-align:center;\n\t}\n\t#g-map2-xs .g-pstyle2 {\n\t\tfont-weight:bold;\n\t\tletter-spacing:0.2em;\n\t\ttext-transform:uppercase;\n\t}\n\t#g-map2-xs .g-pstyle3 {\n\t\ttext-align:right;\n\t}\n\n\t\t/* Custom CSS */\n\t\t\t\t#g-map2-xl {\n\t\tdisplay:block;\n\t\tmargin:0 auto;\n\t\ttext-shadow: 2px 2px 2px black;\n\t\t}\n\t\t#g-map2-lg,\n\t\t#g-map2-xs,\n\t\t#g-map2-sm,\n\t\t#g-map2-md{\n\t\tdisplay:none;\n\t\tmargin:0;\n\t\t}\n\t\t@media (max-width: 1100px) {\n\t\t\t#g-map2-xl,\n\t\t\t#g-map2-md,\n\t\t\t#g-map2-xs,\n\t\t\t#g-map2-sm{\n\t\t\tdisplay:none;\n\t\t\t}\n\t\t\t#g-map2-lg{\n\t\t\ttext-shadow: 2px 2px 2px black;\n\t\t\tdisplay:block;\n\t\t\tmargin: 0 auto;\n\t\t\t}\n\t\t }\n\t\t@media (max-width: 992px) {\n\t\t\t#g-map2-xl,\n\t\t\t#g-map2-lg,\n\t\t\t#g-map2-xs,\n\t\t\t#g-map2-sm{\n\t\t\tdisplay:none;\n\t\t\t}\n\t\t\t#g-map2-md{\n\t\t\ttext-shadow: 2px 2px 2px black;\n\t\t\tdisplay:block;\n\t\t\tmargin: 0 auto;\n\t\t\t}\n\t\t }\n\t\t@media (max-width: 765px) {\n\t\t\t#g-map2-xl,\n\t\t\t#g-map2-lg,\n\t\t\t#g-map2-xs,\n\t\t\t#g-map2-md{\n\t\t\tdisplay:none;\n\t\t\t}\n\t\t\t#g-map2-sm{\n\t\t\ttext-shadow: 2px 2px 2px black;\n\t\t\tdisplay:block;\n\t\t\tmargin: 0 auto;\n\t\t\t}\n\t\t }\n\t\t@media (max-width: 575px) {\n\t\t\t#g-map2-xl,\n\t\t\t#g-map2-lg,\n\t\t\t#g-map2-sm,\n\t\t\t#g-map2-md{\n\t\t\tdisplay:none;\n\t\t\t}\n\t\t\t#g-map2-xs{\n\t\t\ttext-shadow: 2px 2px 2px black;\n\t\t\tdisplay:block;\n\t\t\tmargin: 0 auto;\n\t\t\t}\n\t\t }\n\n\n</style>\n\n<div id="g-map2-box" class="ai2html">\n\n\t<!-- Artboard: sm -->\n\t<div id="g-map2-sm" class="g-artboard g-artboard-v3" data-min-width=\'510\' data-max-width=\'749\'>\n\t\t<img id="g-ai0-0" class="g-aiImg" src="images/graphics/map2-sm.jpg"/>\n\t\t<div id="g-ai0-1" class="g-ai2html-full g-aiAbs g-aiPointText" style="top:-0.5125%;margin-top:-16.3px;left:1.6678%;width:32px;">\n\t\t\t<p class="g-pstyle0">SM</p>\n\t\t</div>\n\t\t<div id="g-ai0-2" class="g-scale g-aiAbs g-aiPointText" style="top:8.7695%;margin-top:-7.7px;left:5.9919%;width:31px;">\n\t\t\t<p class="g-pstyle1">500 m</p>\n\t\t</div>\n\t\t<div id="g-ai0-3" class="g-nov17anno g-aiAbs g-aiPointText" style="top:22.5134%;margin-top:-18px;left:72.9381%;width:82px;">\n\t\t\t<p>Kutupalong</p>\n\t\t\t<p>Refugee Camp</p>\n\t\t</div>\n\t\t<div id="g-ai0-4" class="g-nov17anno g-aiAbs g-aiPointText" style="top:35.4924%;margin-top:-34.8px;left:56.1127%;margin-left:-9.1176%;width:95px;">\n\t\t\t<p class="g-pstyle2">Kutupalong</p>\n\t\t\t<p class="g-pstyle2">makeshift<br>settlement</p>\n\t\t\t<p class="g-pstyle2">and expansion</p>\n\t\t\t<p class="g-pstyle2">zones</p>\n\t\t</div>\n\t\t<div id="g-ai0-5" class="g-scale g-aiAbs g-aiPointText" style="top:51.0887%;margin-top:-8.3px;left:5.9919%;width:98px;">\n\t\t\t<p class="g-pstyle3">Bangladesh</p>\n\t\t</div>\n\t\t<div id="g-ai0-6" class="g-nov17anno g-aiAbs g-aiPointText" style="top:56.6393%;margin-top:-18px;left:64.842%;margin-left:-9.1176%;width:95px;">\n\t\t\t<p class="g-pstyle2">Balukhali</p>\n\t\t\t<p class="g-pstyle2">Makeshift Settlement</p>\n\t\t</div>\n\t\t<div id="g-ai0-7" class="g-scale g-aiAbs g-aiPointText" style="top:70.4608%;margin-top:-16.8px;left:72.9381%;width:109px;">\n\t\t\t<p class="g-pstyle4">Cox&rsquo;s Bazar - Teknaf</p>\n\t\t\t<p class="g-pstyle4">Highway</p>\n\t\t</div>\n\t\t<div id="g-ai0-8" class="g-nov17anno g-aiAbs g-aiPointText" style="top:80.3596%;margin-top:-9.6px;right:71.9502%;width:70px;">\n\t\t\t<p class="g-pstyle5">Burma Para</p>\n\t\t</div>\n\t\t<div id="g-ai0-9" class="g-nov17anno g-aiAbs g-aiPointText" style="top:96.3036%;margin-top:-9.6px;right:65.2445%;width:67px;">\n\t\t\t<p class="g-pstyle5">Hakimpara</p>\n\t\t</div>\n\t</div>\n\n\t<!-- Artboard: md -->\n\t<div id="g-map2-md" class="g-artboard g-artboard-v3" data-min-width=\'750\' data-max-width=\'899\'>\n\t\t<img id="g-ai1-0" class="g-aiImg" src="images/graphics/map2-md.jpg"/>\n\t\t<div id="g-ai1-1" class="g-scale g-aiAbs g-aiPointText" style="top:7.576%;margin-top:-8.8px;left:8.9052%;width:34px;">\n\t\t\t<p class="g-pstyle0">500 m</p>\n\t\t</div>\n\t\t<div id="g-ai1-2" class="g-nov17anno g-aiAbs g-aiPointText" style="top:19.8878%;margin-top:-18.9px;left:77.8755%;width:84px;">\n\t\t\t<p class="g-pstyle1">Kutupalong</p>\n\t\t\t<p class="g-pstyle1">Refugee Camp</p>\n\t\t</div>\n\t\t<div id="g-ai1-3" class="g-nov17anno g-aiAbs g-aiPointText" style="top:34.6147%;margin-top:-37.1px;left:40.968%;margin-left:-6.6667%;width:130px;">\n\t\t\t<p class="g-pstyle2">Kutupalong</p>\n\t\t\t<p class="g-pstyle2">Makeshift Settlement</p>\n\t\t\t<p class="g-pstyle2">and expansion zones</p>\n\n\t\t</div>\n\t\t<div id="g-ai1-4" class="g-Layer_15 g-aiAbs g-aiPointText" style="top:38.5605%;margin-top:-10.6px;left:79.4529%;width:121px;">\n\t\t\t<p class="g-pstyle3">Bangladesh</p>\n\t\t</div>\n\t\t<div id="g-ai1-5" class="g-nov17anno g-aiAbs g-aiPointText" style="top:54.3147%;margin-top:-19.1px;left:48.5752%;margin-left:-6.6667%;width:102px;">\n\t\t\t<p class="g-pstyle2">Balukhali</p>\n\t\t\t<p class="g-pstyle2">makeshift<br>settlement</p>\n\t\t</div>\n\t\t<div id="g-ai1-6" class="g-nov17anno g-aiAbs g-aiPointText" style="top:61.5147%;margin-top:-19.1px;left:65.8554%;width:126px;">\n\t\t\t<p>Cox&rsquo;s Bazar - Teknaf</p>\n\t\t\t<p>Highway</p>\n\t\t</div>\n\t\t<div id="g-ai1-7" class="g-Layer_15 g-aiAbs g-aiPointText" style="top:75.8147%;margin-top:-10.1px;left:81.9679%;width:86px;">\n\t\t\t<p class="g-pstyle4">Myanmar</p>\n\t\t</div>\n\t\t<div id="g-ai1-8" class="g-nov17anno g-aiAbs g-aiPointText" style="top:76.3147%;margin-top:-10.1px;right:82.2549%;width:75px;">\n\t\t\t<p class="g-pstyle5">Burma Para</p>\n\t\t</div>\n\t\t<div id="g-ai1-9" class="g-nov17anno g-aiAbs g-aiPointText" style="top:90.9147%;margin-top:-10.1px;right:76.5399%;width:71px;">\n\t\t\t<p class="g-pstyle5">Hakimpara</p>\n\t\t</div>\n\t</div>\n\n\t<!-- Artboard: lg -->\n\t<div id="g-map2-lg" class="g-artboard g-artboard-v3" data-min-width=\'900\' data-max-width=\'1069\'>\n\t\t<img id="g-ai2-0" class="g-aiImg" src="images/graphics/map2-lg.jpg"/>\n\t\t<div id="g-ai2-1" class="g-scale g-aiAbs g-aiPointText" style="top:5.5745%;margin-top:-9.3px;left:7.3342%;width:36px;">\n\t\t\t<p class="g-pstyle0">500 m</p>\n\t\t</div>\n\t\t<div id="g-ai2-2" class="g-nov17anno g-aiAbs g-aiPointText" style="top:18.0134%;margin-top:-19.1px;left:81.1092%;width:87px;">\n\t\t\t<p>Kutupalong</p>\n\t\t\t<p>Refugee Camp</p>\n\t\t</div>\n\t\t<div id="g-ai2-3" class="g-nov17anno g-aiAbs g-aiPointText" style="top:27.0134%;margin-top:-37.1px;left:10.088%;margin-left:-5.5556%;width:130px;">\n\t\t\t<p class="g-pstyle1">Kutupalong</p>\n\t\t\t<p class="g-pstyle1">Makeshift Settlement</p>\n\t\t\t<p class="g-pstyle1">and expansion zones</p>\n\t\t</div>\n\t\t<div id="g-ai2-4" class="g-Layer_15 g-aiAbs g-aiPointText" style="top:33.7823%;margin-top:-10.6px;left:81.6289%;width:121px;">\n\t\t\t<p class="g-pstyle2">Bangladesh</p>\n\t\t</div>\n\t\t<div id="g-ai2-5" class="g-nov17anno g-aiAbs g-aiPointText" style="top:53.0134%;margin-top:-19.1px;left:55.4291%;margin-left:-5.5556%;width:102px;">\n\t\t\t<p class="g-pstyle1">Balukhali</p>\n\t\t\t<p class="g-pstyle1">makeshift<br>settlement</p>\n\t\t</div>\n\t\t<div id="g-ai2-6" class="g-nov17anno g-aiAbs g-aiPointText" style="top:60.2861%;margin-top:-19.1px;left:71.5354%;width:126px;">\n\t\t\t<p>Cox&rsquo;s Bazar - Teknaf</p>\n\t\t\t<p>Highway</p>\n\t\t</div>\n\t\t<div id="g-ai2-7" class="g-Layer_15 g-aiAbs g-aiPointText" style="top:73.7407%;margin-top:-10.1px;left:85.5126%;width:86px;">\n\t\t\t<p class="g-pstyle3">Myanmar</p>\n\t\t</div>\n\t\t<div id="g-ai2-8" class="g-nov17anno g-aiAbs g-aiPointText" style="top:77.0134%;margin-top:-10.1px;right:83.1794%;width:75px;">\n\t\t\t<p class="g-pstyle4">Burma Para</p>\n\t\t</div>\n\t\t<div id="g-ai2-9" class="g-nov17anno g-aiAbs g-aiPointText" style="top:90.2861%;margin-top:-10.1px;right:68.7211%;width:71px;">\n\t\t\t<p class="g-pstyle4">Hakimpara</p>\n\t\t</div>\n\t</div>\n\n\t<!-- Artboard: xl -->\n\t<div id="g-map2-xl" class="g-artboard g-artboard-v3" data-min-width=\'1070\'>\n\t\t<img id="g-ai3-0" class="g-aiImg" src="images/graphics/map2-xl.jpg"/>\n\t\t<div id="g-ai3-1" class="g-scale g-aiAbs g-aiPointText" style="top:4.2766%;margin-top:-9.3px;left:12.2438%;width:36px;">\n\t\t\t<p class="g-pstyle0">500 m</p>\n\t\t</div>\n\t\t<div id="g-ai3-2" class="g-nov17anno g-aiAbs g-aiPointText" style="top:17.0956%;margin-top:-19.1px;left:74.0354%;width:87px;">\n\t\t\t<p>Kutupalong</p>\n\t\t\t<p>Refugee Camp</p>\n\t\t</div>\n\t\t<div id="g-ai3-3" class="g-nov17anno g-aiAbs g-aiPointText" style="top:23.3456%;margin-top:-37.1px;right:79.4546%;width:130px;">\n\t\t\t<p class="g-pstyle1">Kutupalong</p>\n\t\t\t<p class="g-pstyle1">Makeshift Settlement</p>\n\t\t\t<p class="g-pstyle1">and expansion zones</p>\n\t\t</div>\n\t\t<div id="g-ai3-4" class="g-Layer_15 g-aiAbs g-aiPointText" style="top:30.1338%;margin-top:-10.6px;left:83.0519%;width:121px;">\n\t\t\t<p class="g-pstyle2">Bangladesh</p>\n\t\t</div>\n\t\t<div id="g-ai3-5" class="g-nov17anno g-aiAbs g-aiPointText" style="top:47.7623%;margin-top:-19.1px;left:52.6974%;margin-left:-4.6729%;width:105px;">\n\t\t\t<p class="g-pstyle3">Balukhali</p>\n\t\t\t<p class="g-pstyle3">makeshift<br>settlement</p>\n\t\t</div>\n\t\t<div id="g-ai3-6" class="g-nov17anno g-aiAbs g-aiPointText" style="top:54.429%;margin-top:-19.1px;left:66.2447%;width:126px;">\n\t\t\t<p>Cox&rsquo;s Bazar - Teknaf</p>\n\t\t\t<p>Highway</p>\n\t\t</div>\n\t\t<div id="g-ai3-7" class="g-Layer_15 g-aiAbs g-aiPointText" style="top:64.7623%;margin-top:-10.1px;left:84.8148%;width:86px;">\n\t\t\t<p class="g-pstyle4">Myanmar</p>\n\t\t</div>\n\t\t<div id="g-ai3-8" class="g-nov17anno g-aiAbs g-aiPointText" style="top:68.7623%;margin-top:-10.1px;right:79.4967%;width:75px;">\n\t\t\t<p class="g-pstyle1">Burma Para</p>\n\t\t</div>\n\t\t<div id="g-ai3-9" class="g-nov17anno g-aiAbs g-aiPointText" style="top:83.3456%;margin-top:-10.1px;right:67.616%;width:71px;">\n\t\t\t<p class="g-pstyle1">Hakimpara</p>\n\t\t</div>\n\t</div>\n\n\t<!-- Artboard: xs -->\n\t<div id="g-map2-xs" class="g-artboard g-artboard-v3" data-min-width=\'450\' data-max-width=\'509\'>\n\t\t<img id="g-ai4-0" class="g-aiImg" src="images/graphics/map2-xs.jpg"/>\n\t\t<div id="g-ai4-1" class="g-scale g-aiAbs g-aiPointText" style="top:6.9751%;margin-top:-7.9px;left:80.3207%;width:32px;">\n\t\t\t<p class="g-pstyle0">500 m</p>\n\t\t</div>\n\t\t<div id="g-ai4-2" class="g-nov17anno g-aiAbs g-aiPointText" style="top:23.0097%;margin-top:-18px;left:65.804%;margin-left:-8.8889%;width:82px;">\n\t\t\t<p class="g-pstyle1">Kutupalong</p>\n\t\t\t<p class="g-pstyle1">Refugee Camp</p>\n\t\t</div>\n\t\t<div id="g-ai4-3" class="g-nov17anno g-aiAbs g-aiPointText" style="top:34.6262%;margin-top:-34.8px;left:43.9651%;margin-left:-10.3333%;width:95px;">\n\t\t\t<p class="g-pstyle1">Kutupalong</p>\n\t\t\t<p class="g-pstyle1">makeshift<br>settlement</p>\n\t\t\t<p class="g-pstyle1">and expansion</p>\n\t\t\t<p class="g-pstyle1">zones</p>\n\t\t</div>\n\t\t<div id="g-ai4-4" class="g-nov17anno g-aiAbs g-aiPointText" style="top:53.5577%;margin-top:-18px;left:53.0832%;margin-left:-10.3333%;width:95px;">\n\t\t\t<p class="g-pstyle1">Balukhali</p>\n\t\t\t<p class="g-pstyle1">makeshift<br>settlement</p>\n\t\t</div>\n\t\t<div id="g-ai4-5" class="g-nov17anno g-aiAbs g-aiPointText" style="top:66.8453%;margin-top:-18px;left:61.0832%;width:118px;">\n\t\t\t<p>Cox&rsquo;s Bazar - Teknaf</p>\n\t\t\t<p>Highway</p>\n\t\t</div>\n\t\t<div id="g-ai4-6" class="g-nov17anno g-aiAbs g-aiPointText" style="top:72.0508%;margin-top:-18px;left:8.2874%;margin-left:-4.3333%;width:41px;">\n\t\t\t<p class="g-pstyle1">Burma</p>\n\t\t\t<p class="g-pstyle1">Para</p>\n\t\t</div>\n\t\t<div id="g-ai4-7" class="g-scale g-aiAbs g-aiPointText" style="top:82.1915%;margin-top:-10px;left:57.0112%;width:113px;">\n\t\t\t<p class="g-pstyle2">Bangladesh</p>\n\t\t</div>\n\t\t<div id="g-ai4-8" class="g-nov17anno g-aiAbs g-aiPointText" style="top:89.2563%;margin-top:-9.6px;right:72.2667%;width:67px;">\n\t\t\t<p class="g-pstyle3">Hakimpara</p>\n\t\t</div>\n\t</div>\n\n</div>\n\n<!-- End ai2html - 2017-12-01 21:10 -->\n';
    }
}(),
function() {
    window.Reuters = window.Reuters || {},
    window.Reuters.Graphics = window.Reuters.Graphics || {},
    window.Reuters.Graphics.Template = window.Reuters.Graphics.Template || {},
    window.Reuters.Graphics.Template.map3 = function(t) {
        var n = "";
        return n += '<!-- Generated by ai2html v0.65.4 - 2017-12-01 21:11 -->\n<!-- ai file: map3.ai -->\n<style type=\'text/css\' media=\'screen,print\'>\n\t#g-map3-box .g-artboard {\n\t\tmargin:0 auto;\n\t}\n\t#g-map3-box .g-artboard p {\n\t\tmargin:0;\n\t}\n\t.g-aiAbs {\n\t\tposition:absolute;\n\t}\n\t.g-aiImg {\n\t\tdisplay:block;\n\t\twidth:100% !important;\n\t}\n\t.g-aiPointText p { white-space: nowrap; }\n\t#g-map3-sm {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-map3-sm p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:100;\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(255,255,255);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-map3-sm .g-pstyle0 {\n\t\tfont-size:12px;\n\t\tline-height:14px;\n\t}\n\t#g-map3-sm .g-pstyle1 {\n\t\ttext-align:center;\n\t}\n\t#g-map3-sm .g-pstyle2 {\n\t\tfont-weight:bold;\n\t\tletter-spacing:0.2em;\n\t\ttext-transform:uppercase;\n\t}\n\t#g-map3-md {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-map3-md p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:400;\n\t\tfont-size:15px;\n\t\tline-height:18px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(255,255,255);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-map3-md .g-pstyle0 {\n\t\tfont-weight:100;\n\t\tfont-size:13px;\n\t\tline-height:16px;\n\t}\n\t#g-map3-md .g-pstyle1 {\n\t\tfont-weight:bold;\n\t\tletter-spacing:0.2em;\n\t\ttext-transform:uppercase;\n\t}\n\t#g-map3-md .g-pstyle2 {\n\t\tletter-spacing:0.2em;\n\t\ttext-transform:uppercase;\n\t}\n\t#g-map3-lg {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-map3-lg p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:400;\n\t\tfont-size:15px;\n\t\tline-height:18px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(255,255,255);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-map3-lg .g-pstyle0 {\n\t\tfont-weight:100;\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t}\n\t#g-map3-lg .g-pstyle1 {\n\t\tfont-weight:bold;\n\t\tletter-spacing:0.2em;\n\t\ttext-transform:uppercase;\n\t}\n\t#g-map3-lg .g-pstyle2 {\n\t\tletter-spacing:0.2em;\n\t\ttext-transform:uppercase;\n\t}\n\t#g-map3-xl {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-map3-xl p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:400;\n\t\tfont-size:15px;\n\t\tline-height:18px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(255,255,255);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-map3-xl .g-pstyle0 {\n\t\tfont-weight:100;\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t}\n\t#g-map3-xl .g-pstyle1 {\n\t\tfont-weight:bold;\n\t\tletter-spacing:0.2em;\n\t\ttext-transform:uppercase;\n\t}\n\t#g-map3-xl .g-pstyle2 {\n\t\tletter-spacing:0.2em;\n\t\ttext-transform:uppercase;\n\t}\n\t#g-map3-xs {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-map3-xs p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:400;\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(255,255,255);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-map3-xs .g-pstyle0 {\n\t\tfont-size:12px;\n\t\tline-height:14px;\n\t}\n\t#g-map3-xs .g-pstyle1 {\n\t\ttext-align:center;\n\t}\n\t#g-map3-xs .g-pstyle2 {\n\t\tfont-weight:bold;\n\t\tletter-spacing:0.2em;\n\t\ttext-transform:uppercase;\n\t}\n\n\t\t/* Custom CSS */\n\t\t\t\t#g-map3-xl {\n\t\tdisplay:block;\n\t\tmargin:0 auto;\n\t\ttext-shadow: 2px 2px 2px black;\n\t\t}\n\t\t#g-map3-lg,\n\t\t#g-map3-xs,\n\t\t#g-map3-sm, \n\t\t#g-map3-md{\n\t\tdisplay:none;\n\t\tmargin:0;\n\t\t}\n\t\t@media (max-width: 1100px) {\n\t\t\t#g-map3-xl,\n\t\t\t#g-map3-md,\n\t\t\t#g-map3-xs,\n\t\t\t#g-map3-sm{\n\t\t\tdisplay:none;\n\t\t\t}\n\t\t\t#g-map3-lg{\n\t\t\ttext-shadow: 2px 2px 2px black;\n\t\t\tdisplay:block;\n\t\t\tmargin: 0 auto;\n\t\t\t}\n\t\t }\n\t\t@media (max-width: 992px) {\n\t\t\t#g-map3-xl,\n\t\t\t#g-map3-lg,\n\t\t\t#g-map3-xs,\n\t\t\t#g-map3-sm{\n\t\t\tdisplay:none;\n\t\t\t}\n\t\t\t#g-map3-md{\n\t\t\ttext-shadow: 2px 2px 2px black;\n\t\t\tdisplay:block;\n\t\t\tmargin: 0 auto;\n\t\t\t}\n\t\t }\n\t\t@media (max-width: 765px) {\n\t\t\t#g-map3-xl,\n\t\t\t#g-map3-lg,\n\t\t\t#g-map3-xs,\n\t\t\t#g-map3-md{\n\t\t\tdisplay:none;\n\t\t\t}\n\t\t\t#g-map3-sm{\n\t\t\ttext-shadow: 2px 2px 2px black;\n\t\t\tdisplay:block;\n\t\t\tmargin: 0 auto;\n\t\t\t}\n\t\t }\n\t\t@media (max-width: 575px) {\n\t\t\t#g-map3-xl,\n\t\t\t#g-map3-lg,\n\t\t\t#g-map3-sm,\n\t\t\t#g-map3-md{\n\t\t\tdisplay:none;\n\t\t\t}\n\t\t\t#g-map3-xs{\n\t\t\ttext-shadow: 2px 2px 2px black;\n\t\t\tdisplay:block;\n\t\t\tmargin: 0 auto;\n\t\t\t}\n\t\t }\n\n\n</style>\n\n<div id="g-map3-box" class="ai2html">\n\n\t<!-- Artboard: sm -->\n\t<div id="g-map3-sm" class="g-artboard g-artboard-v3" data-min-width=\'510\' data-max-width=\'749\'>\n\t\t<img id="g-ai0-0" class="g-aiImg" src="images/graphics/map3-sm.jpg"/>\n\t\t<div id="g-ai0-1" class="g-Layer_41 g-aiAbs g-aiPointText" style="top:8.7695%;margin-top:-7.7px;left:5.9919%;width:31px;">\n\t\t\t<p class="g-pstyle0">500 m</p>\n\t\t</div>\n\t\t<div id="g-ai0-2" class="g-Layer_41 g-aiAbs g-aiPointText" style="top:45.2754%;margin-top:-17.7px;left:54.3887%;margin-left:-6.4706%;width:68px;">\n\t\t\t<p class="g-pstyle1">Area lacks</p>\n\t\t\t<p class="g-pstyle1">road access</p>\n\t\t</div>\n\t\t<div id="g-ai0-3" class="g-Layer_41 g-aiAbs g-aiPointText" style="top:51.0487%;margin-top:-10px;left:5.9919%;width:113px;">\n\t\t\t<p class="g-pstyle2">Bangladesh</p>\n\t\t</div>\n\t\t<div id="g-ai0-4" class="g-Layer_41 g-aiAbs g-aiPointText" style="top:70.4502%;margin-top:-17.7px;left:72.9382%;width:113px;">\n\t\t\t<p>Cox&rsquo;s Bazar - Teknaf</p>\n\t\t\t<p>Highway</p>\n\t\t</div>\n\t</div>\n\n\t<!-- Artboard: md -->\n\t<div id="g-map3-md" class="g-artboard g-artboard-v3" data-min-width=\'750\' data-max-width=\'899\'>\n\t\t<img id="g-ai1-0" class="g-aiImg" src="images/graphics/map3-md.jpg"/>\n\t\t<div id="g-ai1-1" class="g-Layer_41 g-aiAbs g-aiPointText" style="top:7.576%;margin-top:-8.8px;left:8.9053%;width:34px;">\n\t\t\t<p class="g-pstyle0">500 m</p>\n\t\t</div>\n\t\t<div id="g-ai1-2" class="g-Layer_41 g-aiAbs g-aiPointText" style="top:38.5605%;margin-top:-10.6px;left:79.4529%;width:121px;">\n\t\t\t<p class="g-pstyle1">Bangladesh</p>\n\t\t</div>\n\t\t<div id="g-ai1-3" class="g-Layer_41 g-aiAbs g-aiPointText" style="top:45.9147%;margin-top:-10.1px;left:25.797%;width:141px;">\n\t\t\t<p>Area lacks road access</p>\n\t\t</div>\n\t\t<div id="g-ai1-4" class="g-Layer_41 g-aiAbs g-aiPointText" style="top:61.5147%;margin-top:-19.1px;left:65.8554%;width:126px;">\n\t\t\t<p>Cox&rsquo;s Bazar - Teknaf</p>\n\t\t\t<p>Highway</p>\n\t\t</div>\n\t\t<div id="g-ai1-5" class="g-Layer_41 g-aiAbs g-aiPointText" style="top:75.8147%;margin-top:-10.1px;left:81.9679%;width:86px;">\n\t\t\t<p class="g-pstyle2">Myanmar</p>\n\t\t</div>\n\t</div>\n\n\t<!-- Artboard: lg -->\n\t<div id="g-map3-lg" class="g-artboard g-artboard-v3" data-min-width=\'900\' data-max-width=\'1069\'>\n\t\t<img id="g-ai2-0" class="g-aiImg" src="images/graphics/map3-lg.jpg"/>\n\t\t<div id="g-ai2-1" class="g-scale g-aiAbs g-aiPointText" style="top:5.5745%;margin-top:-9.3px;left:7.3342%;width:36px;">\n\t\t\t<p class="g-pstyle0">500 m</p>\n\t\t</div>\n\t\t<div id="g-ai2-2" class="g-Layer_15 g-aiAbs g-aiPointText" style="top:33.7823%;margin-top:-10.6px;left:81.6289%;width:121px;">\n\t\t\t<p class="g-pstyle1">Bangladesh</p>\n\t\t</div>\n\t\t<div id="g-ai2-3" class="g-biganno g-aiAbs g-aiPointText" style="top:44.5589%;margin-top:-10.1px;left:34.2%;width:141px;">\n\t\t\t<p>Area lacks road access</p>\n\t\t</div>\n\t\t<div id="g-ai2-4" class="g-Layer_15 g-aiAbs g-aiPointText" style="top:60.2861%;margin-top:-19.1px;left:71.5354%;width:126px;">\n\t\t\t<p>Cox&rsquo;s Bazar - Teknaf</p>\n\t\t\t<p>Highway</p>\n\t\t</div>\n\t\t<div id="g-ai2-5" class="g-Layer_15 g-aiAbs g-aiPointText" style="top:73.7407%;margin-top:-10.1px;left:85.5126%;width:86px;">\n\t\t\t<p class="g-pstyle2">Myanmar</p>\n\t\t</div>\n\t</div>\n\n\t<!-- Artboard: xl -->\n\t<div id="g-map3-xl" class="g-artboard g-artboard-v3" data-min-width=\'1070\'>\n\t\t<img id="g-ai3-0" class="g-aiImg" src="images/graphics/map3-xl.jpg"/>\n\t\t<div id="g-ai3-1" class="g-scale g-aiAbs g-aiPointText" style="top:4.2766%;margin-top:-9.3px;left:12.2437%;width:36px;">\n\t\t\t<p class="g-pstyle0">500 m</p>\n\t\t</div>\n\t\t<div id="g-ai3-2" class="g-Layer_15 g-aiAbs g-aiPointText" style="top:30.1338%;margin-top:-10.6px;left:83.0519%;width:121px;">\n\t\t\t<p class="g-pstyle1">Bangladesh</p>\n\t\t</div>\n\t\t<div id="g-ai3-3" class="g-biganno g-aiAbs g-aiPointText" style="top:40.0123%;margin-top:-10.1px;left:33.4439%;width:141px;">\n\t\t\t<p>Area lacks road access</p>\n\t\t</div>\n\t\t<div id="g-ai3-4" class="g-Layer_15 g-aiAbs g-aiPointText" style="top:54.429%;margin-top:-19.1px;left:66.2447%;width:126px;">\n\t\t\t<p>Cox&rsquo;s Bazar - Teknaf</p>\n\t\t\t<p>Highway</p>\n\t\t</div>\n\t\t<div id="g-ai3-5" class="g-Layer_15 g-aiAbs g-aiPointText" style="top:64.7623%;margin-top:-10.1px;left:84.8147%;width:86px;">\n\t\t\t<p class="g-pstyle2">Myanmar</p>\n\t\t</div>\n\t</div>\n\n\t<!-- Artboard: xs -->\n\t<div id="g-map3-xs" class="g-artboard g-artboard-v3" data-min-width=\'450\' data-max-width=\'509\'>\n\t\t<img id="g-ai4-0" class="g-aiImg" src="images/graphics/map3-xs.jpg"/>\n\t\t<div id="g-ai4-1" class="g-Layer_41 g-aiAbs g-aiPointText" style="top:13.5504%;margin-top:-7.9px;left:11.9645%;width:32px;">\n\t\t\t<p class="g-pstyle0">500 m</p>\n\t\t</div>\n\t\t<div id="g-ai4-2" class="g-Layer_41 g-aiAbs g-aiPointText" style="top:43.1467%;margin-top:-18px;left:51.0372%;margin-left:-7.5556%;width:70px;">\n\t\t\t<p class="g-pstyle1">Area lacks</p>\n\t\t\t<p class="g-pstyle1">road access</p>\n\t\t</div>\n\t\t<div id="g-ai4-3" class="g-Layer_41 g-aiAbs g-aiPointText" style="top:51.0956%;margin-top:-10px;left:9.63%;width:113px;">\n\t\t\t<p class="g-pstyle2">Bangladesh</p>\n\t\t</div>\n\t\t<div id="g-ai4-4" class="g-Layer_41 g-aiAbs g-aiPointText" style="top:66.8453%;margin-top:-18px;left:61.0832%;width:118px;">\n\t\t\t<p>Cox&rsquo;s Bazar - Teknaf</p>\n\t\t\t<p>Highway</p>\n\t\t</div>\n\t</div>\n\n</div>\n\n<!-- End ai2html - 2017-12-01 21:11 -->\n'
    }
}(),
function() {
    window.Reuters = window.Reuters || {},
    window.Reuters.Graphics = window.Reuters.Graphics || {},
    window.Reuters.Graphics.Template = window.Reuters.Graphics.Template || {},
    window.Reuters.Graphics.Template.nyc = function(t) {
        var n = "";
        return n += '<!-- Generated by ai2html v0.65.4 - 2017-12-04 13:32 -->\n<!-- ai file: nyc.ai -->\n<style type=\'text/css\' media=\'screen,print\'>\n\t#g-nyc-box .g-artboard {\n\t\tmargin:0 auto;\n\t}\n\t#g-nyc-box .g-artboard p {\n\t\tmargin:0;\n\t}\n\t.g-aiAbs {\n\t\tposition:absolute;\n\t}\n\t.g-aiImg {\n\t\tdisplay:block;\n\t\twidth:100% !important;\n\t}\n\t.g-aiPointText p { white-space: nowrap; }\n\t#g-nyc-md {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-nyc-md p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:400;\n\t\tfont-size:12px;\n\t\tline-height:14px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(255,255,255);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-nyc-md .g-pstyle0 {\n\t\tfont-weight:bold;\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t\ttext-align:right;\n\t}\n\t#g-nyc-md .g-pstyle1 {\n\t\tfont-weight:bold;\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t}\n\t#g-nyc-md .g-pstyle2 {\n\t\ttext-align:center;\n\t}\n\t#g-nyc-md .g-pstyle3 {\n\t\tfont-size:10px;\n\t\tline-height:12px;\n\t\ttext-align:center;\n\t}\n\t#g-nyc-md .g-pstyle4 {\n\t\tfont-weight:100;\n\t\tfont-size:10px;\n\t\tline-height:12px;\n\t\ttext-align:right;\n\t}\n\t#g-nyc-lg {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-nyc-lg p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:100;\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(255,255,255);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-nyc-lg .g-pstyle0 {\n\t\tfont-weight:bold;\n\t\tfont-size:16px;\n\t\tline-height:19px;\n\t\ttext-align:center;\n\t}\n\t#g-nyc-lg .g-pstyle1 {\n\t\tfont-weight:bold;\n\t\tfont-size:16px;\n\t\tline-height:19px;\n\t}\n\t#g-nyc-lg .g-pstyle2 {\n\t\ttext-align:center;\n\t}\n\t#g-nyc-lg .g-pstyle3 {\n\t\tfont-size:10px;\n\t\tline-height:12px;\n\t\ttext-align:center;\n\t}\n\t#g-nyc-lg .g-pstyle4 {\n\t\tfont-size:10px;\n\t\tline-height:12px;\n\t\ttext-align:right;\n\t}\n\n\t\t/* Custom CSS */\n\t\t\t\t#g-nyc-lg {\n\t\ttext-shadow: 2px 2px 2px black;\n\t\tdisplay:block;\n\t\tmargin:0 auto;\n\t\t}\n\t\t#g-nyc-md{\n\t\tdisplay:none;\n\t\tmargin:0;\n\t\t}\n\t\t@media (max-width: 1200px) {\n\t\t\t#g-nyc-lg{\n\t\t\tdisplay:none;\n\t\t\t}\n\t\t\t#g-nyc-md{\n\t\t\ttext-shadow: 2px 2px 2px black;\n\t\t\tdisplay:block;\n\t\t\tmargin: 0 auto;\n\t\t\t}\n\t\t }\n\n\n</style>\n\n<div id="g-nyc-box" class="ai2html">\n\n\t<!-- Artboard: md -->\n\t<div id="g-nyc-md" class="g-artboard g-artboard-v3" data-min-width=\'330\' data-max-width=\'349\'>\n\t\t<img id="g-ai0-0" class="g-aiImg" src="images/graphics/nyc-md.jpg"/>\n\t\t<div id="g-ai0-1" class="g-Layer_3 g-aiAbs g-aiPointText" style="top:20.4262%;margin-top:-7.9px;left:55.3593%;width:63px;">\n\t\t\t<p>Central Park</p>\n\t\t</div>\n\t\t<div id="g-ai0-2" class="g-Layer_3 g-aiAbs g-aiPointText" style="top:25.4218%;margin-top:-18.4px;right:69.1574%;width:99px;">\n\t\t\t<p class="g-pstyle0">UN minimum</p>\n\t\t\t<p class="g-pstyle0">acceptable area</p>\n\t\t</div>\n\t\t<div id="g-ai0-3" class="g-Layer_3 g-aiAbs g-aiPointText" style="top:45.9818%;margin-top:-7.9px;left:37.1521%;width:46px;">\n\t\t\t<p>Midtown</p>\n\t\t</div>\n\t\t<div id="g-ai0-4" class="g-Layer_3 g-aiAbs g-aiPointText" style="top:52.204%;margin-top:-7.9px;left:71.3528%;width:44px;">\n\t\t\t<p>QUEENS</p>\n\t\t</div>\n\t\t<div id="g-ai0-5" class="g-Layer_3 g-aiAbs g-aiPointText" style="top:58.6484%;margin-top:-7.9px;left:29.1978%;width:65px;">\n\t\t\t<p>MANHATTAN</p>\n\t\t</div>\n\t\t<div id="g-ai0-6" class="g-Layer_3 g-aiAbs g-aiPointText" style="top:71.5551%;margin-top:-10px;left:58.8877%;width:115px;">\n\t\t\t<p class="g-pstyle1">Existing camp size</p>\n\t\t</div>\n\t\t<div id="g-ai0-7" class="g-Layer_3 g-aiAbs g-aiPointText" style="top:78.0262%;margin-top:-15.1px;left:27.6599%;margin-left:-8.3333%;width:57px;">\n\t\t\t<p class="g-pstyle2">Lower</p>\n\t\t\t<p class="g-pstyle2">Manhattan</p>\n\t\t</div>\n\t\t<div id="g-ai0-8" class="g-Layer_3 g-aiAbs g-aiPointText" style="top:81.0929%;margin-top:-7.9px;left:69.7698%;width:57px;">\n\t\t\t<p>BROOKLYN</p>\n\t\t</div>\n\t\t<div id="g-ai0-9" class="g-Layer_3 g-aiAbs g-aiPointText" style="transform: matrix(1,-0.0012,0.0012,1,0,0);transform-origin: 50% 57.3911003645025%;-webkit-transform: matrix(1,-0.0012,0.0012,1,0,0);-webkit-transform-origin: 50% 57.3911003645025%;-ms-transform: matrix(1,-0.0012,0.0012,1,0,0);-ms-transform-origin: 50% 57.3911003645025%;top:97.7255%;margin-top:-6.8px;left:6.0151%;margin-left:-3.0303%;width:22px;">\n\t\t\t<p class="g-pstyle3">1 km</p>\n\t\t</div>\n\t\t<div id="g-ai0-10" class="g-Layer_3 g-aiAbs g-aiPointText" style="top:98.3522%;margin-top:-6.6px;right:2.4369%;width:113px;">\n\t\t\t<p class="g-pstyle4">Satellite image: Planet Labs</p>\n\t\t</div>\n\t</div>\n\n\t<!-- Artboard: lg -->\n\t<div id="g-nyc-lg" class="g-artboard g-artboard-v3" data-min-width=\'350\'>\n\t\t<img id="g-ai1-0" class="g-aiImg" src="images/graphics/nyc-lg.jpg"/>\n\t\t<div id="g-ai1-1" class="g-Layer_3 g-aiAbs g-aiPointText" style="top:21.8638%;margin-top:-9.3px;left:58.4147%;width:71px;">\n\t\t\t<p>Central Park</p>\n\t\t</div>\n\t\t<div id="g-ai1-2" class="g-Layer_3 g-aiAbs g-aiPointText" style="top:28.3625%;margin-top:-20.8px;left:25.6108%;margin-left:-15.8571%;width:113px;">\n\t\t\t<p class="g-pstyle0">UN minimum</p>\n\t\t\t<p class="g-pstyle0">acceptable area</p>\n\t\t</div>\n\t\t<div id="g-ai1-3" class="g-Layer_3 g-aiAbs g-aiPointText" style="top:48.0638%;margin-top:-9.3px;left:38.7955%;width:51px;">\n\t\t\t<p>Midtown</p>\n\t\t</div>\n\t\t<div id="g-ai1-4" class="g-Layer_3 g-aiAbs g-aiPointText" style="top:54.4638%;margin-top:-9.3px;left:75.6485%;width:50px;">\n\t\t\t<p>QUEENS</p>\n\t\t</div>\n\t\t<div id="g-ai1-5" class="g-Layer_3 g-aiAbs g-aiPointText" style="top:61.0638%;margin-top:-9.3px;left:30.2241%;width:73px;">\n\t\t\t<p>MANHATTAN</p>\n\t\t</div>\n\t\t<div id="g-ai1-6" class="g-Layer_3 g-aiAbs g-aiPointText" style="top:77.0424%;margin-top:-11.2px;left:57.7196%;width:131px;">\n\t\t\t<p class="g-pstyle1">Existing camp size</p>\n\t\t</div>\n\t\t<div id="g-ai1-7" class="g-Layer_3 g-aiAbs g-aiPointText" style="top:80.9438%;margin-top:-17.7px;left:28.4423%;margin-left:-8.7143%;width:63px;">\n\t\t\t<p class="g-pstyle2">Lower</p>\n\t\t\t<p class="g-pstyle2">Manhattan</p>\n\t\t</div>\n\t\t<div id="g-ai1-8" class="g-Layer_3 g-aiAbs g-aiPointText" style="top:81.8638%;margin-top:-9.3px;left:73.9429%;width:64px;">\n\t\t\t<p>BROOKLYN</p>\n\t\t</div>\n\t\t<div id="g-ai1-9" class="g-Layer_3 g-aiAbs g-aiPointText" style="transform: matrix(1,-0.0012,0.0012,1,0,0);transform-origin: 50% 57.593059469079%;-webkit-transform: matrix(1,-0.0012,0.0012,1,0,0);-webkit-transform-origin: 50% 57.593059469079%;-ms-transform: matrix(1,-0.0012,0.0012,1,0,0);-ms-transform-origin: 50% 57.593059469079%;top:97.717%;margin-top:-6.6px;left:5.211%;margin-left:-3.4286%;width:26px;">\n\t\t\t<p class="g-pstyle3">500 m</p>\n\t\t</div>\n\t\t<div id="g-ai1-10" class="g-Layer_3 g-aiAbs g-aiPointText" style="top:98.317%;margin-top:-6.6px;right:1.6339%;width:113px;">\n\t\t\t<p class="g-pstyle4">Satellite image: Planet Labs</p>\n\t\t</div>\n\t</div>\n\n</div>\n\n<!-- End ai2html - 2017-12-04 13:32 -->\n'
    }
}(),
function() {
    window.Reuters = window.Reuters || {},
    window.Reuters.Graphics = window.Reuters.Graphics || {},
    window.Reuters.Graphics.Template = window.Reuters.Graphics.Template || {},
    window.Reuters.Graphics.Template.open = function(t) {
        var n = "";
        return n += '<!-- Generated by ai2html v0.65.4 - 2017-11-30 10:00 -->\n<!-- ai file: open.ai -->\n<style type=\'text/css\' media=\'screen,print\'>\n\t#g-open-box .g-artboard {\n\t\tmargin:0 auto;\n\t}\n\t#g-open-box .g-artboard p {\n\t\tmargin:0;\n\t}\n\t.g-aiAbs {\n\t\tposition:absolute;\n\t}\n\t.g-aiImg {\n\t\tdisplay:block;\n\t\twidth:100% !important;\n\t}\n\t.g-aiPointText p { white-space: nowrap; }\n\t#g-open-sm {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-open-md {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-open-lg {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\n\t\t/* Custom CSS */\n\t\t\t\t#g-open-lg {\n\t\tdisplay:block;\n\t\tmargin:0 auto;\n\t\t}\n\t\t#g-open-sm, \n\t\t#g-open-md{\n\t\tdisplay:none;\n\t\tmargin:0;\n\t\t}\n\t\t@media (max-width: 992px) {\n\t\t\t#g-open-lg,\n\t\t\t#g-open-sm{\n\t\t\tdisplay:none;\n\t\t\t}\n\t\t\t#g-open-md{\n\t\t\tdisplay:block;\n\t\t\tmargin: 0 auto;\n\t\t\t}\n\t\t }\n\t\t@media (max-width: 750px) {\n\t\t\t#g-open-lg,\n\t\t\t#g-open-md{\n\t\t\tdisplay:none;\n\t\t\t}\n\t\t\t#g-open-sm{\n\t\t\tdisplay:block;\n\t\t\tmargin: 0 auto;\n\t\t\t}\n\t\t }\n\n\n</style>\n\n<div id="g-open-box" class="ai2html">\n\n\t<!-- Artboard: sm -->\n\t<div id="g-open-sm" class="g-artboard g-artboard-v3" data-min-width=\'410\' data-max-width=\'749\'>\n\t\t<img id="g-ai0-0" class="g-aiImg" src="images/graphics/open-sm.png"/>\n\t</div>\n\n\t<!-- Artboard: md -->\n\t<div id="g-open-md" class="g-artboard g-artboard-v3" data-min-width=\'750\' data-max-width=\'919\'>\n\t\t<img id="g-ai1-0" class="g-aiImg" src="images/graphics/open-md.png"/>\n\t</div>\n\n\t<!-- Artboard: lg -->\n\t<div id="g-open-lg" class="g-artboard g-artboard-v3" data-min-width=\'920\'>\n\t\t<img id="g-ai2-0" class="g-aiImg" src="images/graphics/open-lg.png"/>\n\t</div>\n\n</div>\n\n<!-- End ai2html - 2017-11-30 10:00 -->\n'
    }
}(),
function() {
    window.Reuters = window.Reuters || {},
    window.Reuters.Graphics = window.Reuters.Graphics || {},
    window.Reuters.Graphics.Template = window.Reuters.Graphics.Template || {},
    window.Reuters.Graphics.Template.openwater = function(t) {
        var n = "";
        return n += '<!-- Generated by ai2html v0.65.4 - 2017-12-04 13:23 -->\n<!-- ai file: openwater.ai -->\n<style type=\'text/css\' media=\'screen,print\'>\n\t#g-openwater-box .g-artboard {\n\t\tmargin:0 auto;\n\t}\n\t#g-openwater-box .g-artboard p {\n\t\tmargin:0;\n\t}\n\t.g-aiAbs {\n\t\tposition:absolute;\n\t}\n\t.g-aiImg {\n\t\tdisplay:block;\n\t\twidth:100% !important;\n\t}\n\t.g-aiPointText p { white-space: nowrap; }\n\t#g-openwater-sm {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-openwater-sm p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:400;\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(0,0,0);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-openwater-sm .g-pstyle0 {\n\t\ttext-align:center;\n\t}\n\t#g-openwater-md {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-openwater-md p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:400;\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(0,0,0);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-openwater-md .g-pstyle0 {\n\t\ttext-align:center;\n\t}\n\t#g-openwater-lg {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-openwater-lg p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:400;\n\t\tfont-size:16px;\n\t\tline-height:19px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(0,0,0);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-openwater-lg .g-pstyle0 {\n\t\ttext-align:center;\n\t}\n\n\t\t/* Custom CSS */\n\t\t\t\t#g-openwater-lg {\n\t\tdisplay:block;\n\t\tmargin:0 auto;\n\t\t}\n\t\t#g-openwater-sm, \n\t\t#g-openwater-md{\n\t\tdisplay:none;\n\t\tmargin:0;\n\t\t}\n\t\t@media (max-width: 992px) {\n\t\t\t#g-openwater-lg,\n\t\t\t#g-openwater-sm{\n\t\t\tdisplay:none;\n\t\t\t}\n\t\t\t#g-openwater-md{\n\t\t\tdisplay:block;\n\t\t\tmargin: 0 auto;\n\t\t\t}\n\t\t }\n\t\t@media (max-width: 750px) {\n\t\t\t#g-openwater-lg,\n\t\t\t#g-openwater-md{\n\t\t\tdisplay:none;\n\t\t\t}\n\t\t\t#g-openwater-sm{\n\t\t\tdisplay:block;\n\t\t\tmargin: 0 auto;\n\t\t\t}\n\t\t }\n\n\n</style>\n\n<div id="g-openwater-box" class="ai2html">\n\n\t<!-- Artboard: sm -->\n\t<div id="g-openwater-sm" class="g-artboard g-artboard-v3" data-min-width=\'410\' data-max-width=\'749\'>\n\t\t<img id="g-ai0-0" class="g-aiImg" src="images/graphics/openwater-sm.png"/>\n\t\t<div id="g-ai0-1" class="g-MD g-aiAbs g-aiPointText" style="top:38.5828%;margin-top:-26.4px;left:10.307%;margin-left:-4.3902%;width:38px;">\n\t\t\t<p class="g-pstyle0">See</p>\n\t\t\t<p class="g-pstyle0">insets</p>\n\t\t\t<p class="g-pstyle0">below</p>\n\t\t</div>\n\t</div>\n\n\t<!-- Artboard: md -->\n\t<div id="g-openwater-md" class="g-artboard g-artboard-v3" data-min-width=\'750\' data-max-width=\'919\'>\n\t\t<img id="g-ai1-0" class="g-aiImg" src="images/graphics/openwater-md.png"/>\n\t\t<div id="g-ai1-1" class="g-MD g-aiAbs g-aiPointText" style="top:39.5211%;margin-top:-18px;left:13.646%;margin-left:-3.8667%;width:60px;">\n\t\t\t<p class="g-pstyle0">See insets</p>\n\t\t\t<p class="g-pstyle0">below</p>\n\t\t</div>\n\t</div>\n\n\t<!-- Artboard: lg -->\n\t<div id="g-openwater-lg" class="g-artboard g-artboard-v3" data-min-width=\'920\'>\n\t\t<img id="g-ai2-0" class="g-aiImg" src="images/graphics/openwater-lg.png"/>\n\t\t<div id="g-ai2-1" class="g-MD g-aiAbs g-aiPointText" style="top:40.1019%;margin-top:-20.3px;left:11.7939%;margin-left:-3.6413%;width:69px;">\n\t\t\t<p class="g-pstyle0">See insets</p>\n\t\t\t<p class="g-pstyle0">below</p>\n\t\t</div>\n\t</div>\n\n</div>\n\n<!-- End ai2html - 2017-12-04 13:23 -->\n'
    }
}(),
function() {
    window.Reuters = window.Reuters || {},
    window.Reuters.Graphics = window.Reuters.Graphics || {},
    window.Reuters.Graphics.Template = window.Reuters.Graphics.Template || {},
    window.Reuters.Graphics.Template.sample = function(t) {
        var n, i = "";
        return i += "<h2>This is a header from a template</h2>\n<h3>" + (null == (n = "This is a translation") ? "" : n) + "</h3>\n\n "
    }
}(),
function() {
    window.Reuters = window.Reuters || {},
    window.Reuters.Graphics = window.Reuters.Graphics || {},
    window.Reuters.Graphics.Template = window.Reuters.Graphics.Template || {},
    window.Reuters.Graphics.Template.scatterSetupTemplate = function(t) {
        var n, i = "";
        Array.prototype.join;
        return t.self.dataType && (i += '\n\t<div class="chart-nav">\n\t\t\t',
        t.self.multiDataSlider ? i += '\n\t\t\t\t<div class="slider-container">\n                    <div class="slider-holder">\n        \t\t\t\t<div class="slider" data-slider="true"></div>\n                    </div>\n\n                    <div class="slider-controls">\n                        <div class="btn-group animation-control" data-toggle="buttons">\n                            <label class="btn btn-primary smaller animation-play">\n                                <input type="radio" name="animation-control-group" id="animation-play" autocomplete="off" >\n                                <i class="fa fa-play" aria-hidden="true"></i>\n                            </label>\n                            <label class="btn btn-primary smaller active animation-pause">\n                                <input type="radio" name="animation-control-group" id="animation-pause" autocomplete="off" checked>\n                                <i class="fa fa-pause" aria-hidden="true"></i>\n                            </label>\n                        </div>\n                    </div>\n\t\t\t\t</div>\n\t\t\t' : (i += '\n            \t\t<div class="navContainer">\n                        <div class="btn-group nav-options horizontal" data-toggle="buttons">\n                            ',
        t.self.multiDataLabels.forEach(function(e, a) {
            i += '\n                                <label dataid="' + (null == (n = t.self.multiDataColumns[a]) ? "" : n) + '" class="btn btn-primary ',
            a == t.self.multiDataLabels.length - 1 && (i += "active"),
            i += ' smaller">\n                                    <input type="radio" name="nav-options" autocomplete="off">\n                                    ' + (null == (n = e) ? "" : n) + "\n                                </label>\n                            "
        }),
        i += "\n                        </div>\n            \t\t</div>\n\t\t\t"),
        i += "\n\t</div>\n"),
        i += '\n\n\n<div class="chart-holder">\n    ',
        t.self.colorDomain && t.self.colorDomain.length > 1 ? (i += '\n    \t<div class="scatter-nested-legend">\n            ',
        t.self.colorDomain.forEach(function(e, a) {
            i += '\n                <div class ="scatter-legend-item" data-id="' + (null == (n = e) ? "" : n) + '">\n                \t<div class = "scatter-legend-circle circle" style="background-color:' + (null == (n = t.self.colors[a]) ? "" : n) + ';"></div>\n                \t<p class = "scatter-legend-text">' + (null == (n = e) ? "" : n) + "</p>\n                </div>\n            "
        }),
        i += "\n        \t",
        t.self.rvalue && (i += '\n                <br>\n                <div class ="scatter-legend-size">\n                    <div class = "scatter-legend-circle scatter-size circle order-legend"></div>\n                    <p class = "scatter-legend-text">' + (null == (n = "Size indicates Orders") ? "" : n) + "</p>\n                 </div>\n        \t"),
        i += "\n            ",
        t.self.dropdown && (i += '\n                <div class="mt-2 hidden-sm-down">\n                    <select class="custom-select scatter-select">\n                        <option selected>Show All ...   </option>\n                    </select>\n                    <small class="text-muted text-uppercase d-block">Choose to highlight</small>\n                </div>\n            '),
        i += '\n    \t</div>\n        <div class="scatter-nested-chart" id="' + (null == (n = t.self.targetDiv) ? "" : n) + '-chart"></div>\n    ') : (i += "\n        ",
        t.self.dropdown && (i += '\n            <div class="mt-2 hidden-sm-down">\n                <select class="custom-select scatter-select">\n                    <option selected>Show All ...   </option>\n                </select>\n                <small class="text-muted text-uppercase d-block">Choose to highlight</small>\n            </div>\n        '),
        i += '\n        <div class="" id="' + (null == (n = t.self.targetDiv) ? "" : n) + '-chart"></div>\n    '),
        i += "\n</div>\n"
    }
}(),
function() {
    window.Reuters = window.Reuters || {},
    window.Reuters.Graphics = window.Reuters.Graphics || {},
    window.Reuters.Graphics.Template = window.Reuters.Graphics.Template || {},
    window.Reuters.Graphics.Template.scattertooltip = function(t) {
        var n, i = "";
        return i += '<p class="tooltip-title"><strong>' + (null == (n = t.data.camp) ? "" : n) + '</strong></p>\n<p class="tooltip-text">' + (null == (n = "Average ") ? "" : n) + '<span style="color:#c6590e"><strong> ' + (null == (n = t.data.share) ? "" : n) + "</strong></span>" + (null == (n = " people share a latrine") ? "" : n) + '</p>\n<!-- <hr>\n<p class="tooltip-text"><strong>' + (null == (n = "Population:") ? "" : n) + " </strong>" + (null == (n = t.data.population) ? "" : n) + '</p>\n<p class="tooltip-text"><strong>' + (null == (n = "Number of latrine blocks:") ? "" : n) + " </strong>" + (null == (n = t.data.latrines) ? "" : n) + "</p> -->\n"
    }
}(),
function() {
    window.Reuters = window.Reuters || {},
    window.Reuters.Graphics = window.Reuters.Graphics || {},
    window.Reuters.Graphics.Template = window.Reuters.Graphics.Template || {},
    window.Reuters.Graphics.Template.scattertooltip2 = function(t) {
        var n, i = "";
        return i += '<p class="tooltip-text"><strong>' + (null == (n = t.data.displayDate) ? "" : n) + '</strong></p>\n<p class="tooltip-text">' + (null == (n = "Cause of death: ") ? "" : n) + "<strong> " + (null == (n = t.data.displayname) ? "" : n) + '</strong></p>\n<!-- <hr>\n<p class="tooltip-text"><strong>' + (null == (n = "Population:") ? "" : n) + " </strong>" + (null == (n = t.data.population) ? "" : n) + '</p>\n<p class="tooltip-text"><strong>' + (null == (n = "Number of latrine blocks:") ? "" : n) + " </strong>" + (null == (n = t.data.latrines) ? "" : n) + "</p> -->\n"
    }
}(),
function() {
    window.Reuters = window.Reuters || {},
    window.Reuters.Graphics = window.Reuters.Graphics || {},
    window.Reuters.Graphics.Template = window.Reuters.Graphics.Template || {},
    window.Reuters.Graphics.Template.selflactrine = function(t) {
        var n = "";
        return n += '<!-- Generated by ai2html v0.65.4 - 2017-11-30 09:55 -->\n<!-- ai file: selflactrine.ai -->\n<style type=\'text/css\' media=\'screen,print\'>\n\t#g-selflactrine-box .g-artboard {\n\t\tmargin:0 auto;\n\t}\n\t#g-selflactrine-box .g-artboard p {\n\t\tmargin:0;\n\t}\n\t.g-aiAbs {\n\t\tposition:absolute;\n\t}\n\t.g-aiImg {\n\t\tdisplay:block;\n\t\twidth:100% !important;\n\t}\n\t.g-aiPointText p { white-space: nowrap; }\n\t#g-selflactrine-sm {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-selflactrine-md {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-selflactrine-lg {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\n\t\t/* Custom CSS */\n\t\t\t\t#g-selflactrine-lg {\n\t\tdisplay:block;\n\t\tmargin:0 auto;\n\t\t}\n\t\t#g-selflactrine-sm, \n\t\t#g-selflactrine-md{\n\t\tdisplay:none;\n\t\tmargin:0;\n\t\t}\n\t\t@media (max-width: 992px) {\n\t\t\t#g-selflactrine-lg,\n\t\t\t#g-selflactrine-sm{\n\t\t\tdisplay:none;\n\t\t\t}\n\t\t\t#g-selflactrine-md{\n\t\t\tdisplay:block;\n\t\t\tmargin: 0 auto;\n\t\t\t}\n\t\t }\n\t\t@media (max-width: 750px) {\n\t\t\t#g-selflactrine-lg,\n\t\t\t#g-selflactrine-md{\n\t\t\tdisplay:none;\n\t\t\t}\n\t\t\t#g-selflactrine-sm{\n\t\t\tdisplay:block;\n\t\t\tmargin: 0 auto;\n\t\t\t}\n\t\t }\n\n\n</style>\n\n<div id="g-selflactrine-box" class="ai2html">\n\n\t<!-- Artboard: sm -->\n\t<div id="g-selflactrine-sm" class="g-artboard g-artboard-v3" data-min-width=\'410\' data-max-width=\'749\'>\n\t\t<img id="g-ai0-0" class="g-aiImg" src="images/graphics/selflactrine-sm.png"/>\n\t</div>\n\n\t<!-- Artboard: md -->\n\t<div id="g-selflactrine-md" class="g-artboard g-artboard-v3" data-min-width=\'750\' data-max-width=\'919\'>\n\t\t<img id="g-ai1-0" class="g-aiImg" src="images/graphics/selflactrine-md.png"/>\n\t</div>\n\n\t<!-- Artboard: lg -->\n\t<div id="g-selflactrine-lg" class="g-artboard g-artboard-v3" data-min-width=\'920\'>\n\t\t<img id="g-ai2-0" class="g-aiImg" src="images/graphics/selflactrine-lg.png"/>\n\t</div>\n\n</div>\n\n<!-- End ai2html - 2017-11-30 09:55 -->\n'
    }
}(),
function() {
    window.Reuters = window.Reuters || {},
    window.Reuters.Graphics = window.Reuters.Graphics || {},
    window.Reuters.Graphics.Template = window.Reuters.Graphics.Template || {},
    window.Reuters.Graphics.Template.selfmade = function(t) {
        var n = "";
        return n += '<!-- Generated by ai2html v0.65.4 - 2017-11-22 15:09 -->\n<!-- ai file: selfmade.ai -->\n<style type=\'text/css\' media=\'screen,print\'>\n\t#g-selfmade-box .g-artboard {\n\t\tmargin:0 auto;\n\t}\n\t#g-selfmade-box .g-artboard p {\n\t\tmargin:0;\n\t}\n\t.g-aiAbs {\n\t\tposition:absolute;\n\t}\n\t.g-aiImg {\n\t\tdisplay:block;\n\t\twidth:100% !important;\n\t}\n\t.g-aiPointText p { white-space: nowrap; }\n\t#g-selfmade-lg {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-selfmade-lg p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:400;\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(255,255,255);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\n\t\t/* Custom CSS */\n\t\t\t\t#g-selfmade-lg {\n\t\tdisplay:block;\n\t\tmargin:0 auto;\n\t\ttext-shadow: 0px 0px 2px black;\n\t\t}\n\n\n</style>\n\n<div id="g-selfmade-box" class="ai2html">\n\n\t<!-- Artboard: lg -->\n\t<div id="g-selfmade-lg" class="g-artboard g-artboard-v3" data-min-width=\'240\'>\n\t\t<img id="g-ai0-0" class="g-aiImg" src="images/graphics/selfmade-lg.jpg"/>\n\t\t<div id="g-ai0-1" class="g-Layer1 g-aiAbs g-aiPointText" style="top:31.3815%;margin-top:-9.6px;left:19.7714%;width:62px;">\n\t\t\t<p>Self-made</p>\n\t\t</div>\n\t</div>\n\n</div>\n\n<!-- End ai2html - 2017-11-22 15:09 -->\n'
    }
}(),
function() {
    window.Reuters = window.Reuters || {},
    window.Reuters.Graphics = window.Reuters.Graphics || {},
    window.Reuters.Graphics.Template = window.Reuters.Graphics.Template || {},
    window.Reuters.Graphics.Template.sixbuffer = function(t) {
        var n = "";
        return n += '<!-- Generated by ai2html v0.65.4 - 2017-11-30 18:51 -->\n<!-- ai file: sixbuffer.ai -->\n<style type=\'text/css\' media=\'screen,print\'>\n\t#g-sixbuffer-box .g-artboard {\n\t\tmargin:0 auto;\n\t}\n\t#g-sixbuffer-box .g-artboard p {\n\t\tmargin:0;\n\t}\n\t.g-aiAbs {\n\t\tposition:absolute;\n\t}\n\t.g-aiImg {\n\t\tdisplay:block;\n\t\twidth:100% !important;\n\t}\n\t.g-aiPointText p { white-space: nowrap; }\n\t#g-sixbuffer-sm {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-sixbuffer-sm p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:400;\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(0,0,0);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-sixbuffer-sm .g-pstyle0 {\n\t\tfont-weight:bold;\n\t\tfont-size:12px;\n\t\tline-height:14px;\n\t\tfilter:alpha(opacity=60);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=60);\n\t\topacity:0.6;\n\t\tletter-spacing:0.2em;\n\t\tcolor:rgb(117,117,117);\n\t}\n\t#g-sixbuffer-sm .g-pstyle1 {\n\t\tfont-size:12px;\n\t\tline-height:14px;\n\t\tfilter:alpha(opacity=60);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=60);\n\t\topacity:0.6;\n\t\ttext-align:center;\n\t\tcolor:rgb(117,117,117);\n\t}\n\t#g-sixbuffer-sm .g-pstyle2 {\n\t\ttext-align:center;\n\t}\n\t#g-sixbuffer-sm .g-pstyle3 {\n\t\tfont-weight:100;\n\t\tfont-size:11px;\n\t\tline-height:13px;\n\t\ttext-align:center;\n\t\tcolor:rgb(117,117,117);\n\t}\n\t#g-sixbuffer-sm .g-pstyle4 {\n\t\tfont-size:12px;\n\t\tline-height:14px;\n\t\tfilter:alpha(opacity=60);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=60);\n\t\topacity:0.6;\n\t\tcolor:rgb(117,117,117);\n\t}\n\t#g-sixbuffer-md {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-sixbuffer-md p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:400;\n\t\tfont-size:15px;\n\t\tline-height:18px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(0,0,0);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-sixbuffer-md .g-pstyle0 {\n\t\tfont-weight:bold;\n\t\tfilter:alpha(opacity=60);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=60);\n\t\topacity:0.6;\n\t\tletter-spacing:0.2em;\n\t\tcolor:rgb(117,117,117);\n\t}\n\t#g-sixbuffer-md .g-pstyle1 {\n\t\tfilter:alpha(opacity=60);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=60);\n\t\topacity:0.6;\n\t\ttext-align:center;\n\t\tcolor:rgb(117,117,117);\n\t}\n\t#g-sixbuffer-md .g-pstyle2 {\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t\tfilter:alpha(opacity=60);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=60);\n\t\topacity:0.6;\n\t\tcolor:rgb(117,117,117);\n\t}\n\t#g-sixbuffer-md .g-pstyle3 {\n\t\ttext-align:center;\n\t}\n\t#g-sixbuffer-md .g-pstyle4 {\n\t\tfont-weight:100;\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t\ttext-align:center;\n\t\tcolor:rgb(117,117,117);\n\t}\n\t#g-sixbuffer-lg {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-sixbuffer-lg p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:400;\n\t\tfont-size:15px;\n\t\tline-height:18px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(0,0,0);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-sixbuffer-lg .g-pstyle0 {\n\t\tfont-weight:bold;\n\t\tfont-size:16px;\n\t\tline-height:19px;\n\t\tfilter:alpha(opacity=60);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=60);\n\t\topacity:0.6;\n\t\tletter-spacing:0.2em;\n\t\tcolor:rgb(117,117,117);\n\t}\n\t#g-sixbuffer-lg .g-pstyle1 {\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t\tfilter:alpha(opacity=60);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=60);\n\t\topacity:0.6;\n\t\ttext-align:center;\n\t\tcolor:rgb(117,117,117);\n\t}\n\t#g-sixbuffer-lg .g-pstyle2 {\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t\tfilter:alpha(opacity=60);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=60);\n\t\topacity:0.6;\n\t\tcolor:rgb(117,117,117);\n\t}\n\t#g-sixbuffer-lg .g-pstyle3 {\n\t\ttext-align:center;\n\t}\n\n\t\t/* Custom CSS */\n\t\t\t\t#g-sixbuffer-lg {\n\t\tdisplay:block;\n\t\tmargin:0 auto;\n\t\t}\n\t\t#g-sixbuffer-sm, \n\t\t#g-sixbuffer-md{\n\t\tdisplay:none;\n\t\tmargin:0;\n\t\t}\n\t\t@media (max-width: 992px) {\n\t\t\t#g-sixbuffer-lg,\n\t\t\t#g-sixbuffer-sm{\n\t\t\tdisplay:none;\n\t\t\t}\n\t\t\t#g-sixbuffer-md{\n\t\t\tdisplay:block;\n\t\t\tmargin: 0 auto;\n\t\t\t}\n\t\t }\n\t\t@media (max-width: 750px) {\n\t\t\t#g-sixbuffer-lg,\n\t\t\t#g-sixbuffer-md{\n\t\t\tdisplay:none;\n\t\t\t}\n\t\t\t#g-sixbuffer-sm{\n\t\t\tdisplay:block;\n\t\t\tmargin: 0 auto;\n\t\t\t}\n\t\t }\n\n\n</style>\n\n<div id="g-sixbuffer-box" class="ai2html">\n\n\t<!-- Artboard: sm -->\n\t<div id="g-sixbuffer-sm" class="g-artboard g-artboard-v3" data-min-width=\'410\' data-max-width=\'749\'>\n\t\t<img id="g-ai0-0" class="g-aiImg" src="images/graphics/sixbuffer-sm.jpg"/>\n\t\t<div id="g-ai0-1" class="g-Layer_29 g-aiAbs g-aiPointText" style="top:5.1045%;margin-top:-8.3px;left:73.1824%;width:98px;">\n\t\t\t<p class="g-pstyle0">BANGLADESH</p>\n\t\t</div>\n\t\t<div id="g-ai0-2" class="g-Layer_29 g-aiAbs g-aiPointText" style="top:16.8157%;margin-top:-15.1px;left:74.6444%;margin-left:-8.7805%;width:74px;">\n\t\t\t<p class="g-pstyle1">Kutupalong</p>\n\t\t\t<p class="g-pstyle1">Refugee Camp</p>\n\t\t</div>\n\t\t<div id="g-ai0-3" class="g-sm g-aiAbs g-aiPointText" style="top:41.1961%;margin-top:-18px;left:12.5645%;margin-left:-10.6098%;width:89px;">\n\t\t\t<p class="g-pstyle2">Shelters within</p>\n\t\t\t<p class="g-pstyle2">6m of a latrine</p>\n\t\t</div>\n\t\t<div id="g-ai0-4" class="g-Layer_29 g-aiAbs g-aiPointText" style="top:51.4858%;margin-top:-7.1px;left:5.499%;margin-left:-3.2927%;width:29px;">\n\t\t\t<p class="g-pstyle3">200 m</p>\n\t\t</div>\n\t\t<div id="g-ai0-5" class="g-Layer_29 g-aiAbs g-aiPointText" style="top:76.8424%;margin-top:-22.3px;left:82.9702%;width:59px;">\n\t\t\t<p class="g-pstyle4">Cox&rsquo;s Bazar</p>\n\t\t\t<p class="g-pstyle4">- Teknaf</p>\n\t\t\t<p class="g-pstyle4">Highway</p>\n\t\t</div>\n\t</div>\n\n\t<!-- Artboard: md -->\n\t<div id="g-sixbuffer-md" class="g-artboard g-artboard-v3" data-min-width=\'750\' data-max-width=\'919\'>\n\t\t<img id="g-ai1-0" class="g-aiImg" src="images/graphics/sixbuffer-md.jpg"/>\n\t\t<div id="g-ai1-1" class="g-MD g-aiAbs g-aiPointText" style="top:5.8672%;margin-top:-10.6px;left:82.3154%;width:121px;">\n\t\t\t<p class="g-pstyle0">BANGLADESH</p>\n\t\t</div>\n\t\t<div id="g-ai1-2" class="g-MD g-aiAbs g-aiPointText" style="top:17.1569%;margin-top:-19.1px;left:72.5279%;margin-left:-6%;width:92px;">\n\t\t\t<p class="g-pstyle1">Kutupalong</p>\n\t\t\t<p class="g-pstyle1">Refugee Camp</p>\n\t\t</div>\n\t\t<div id="g-ai1-3" class="g-MD g-aiAbs g-aiPointText" style="top:24.702%;margin-top:-26.4px;left:87.7059%;width:68px;">\n\t\t\t<p class="g-pstyle2">Cox&rsquo;s Bazar</p>\n\t\t\t<p class="g-pstyle2">- Teknaf</p>\n\t\t\t<p class="g-pstyle2">Highway</p>\n\t\t</div>\n\t\t<div id="g-ai1-4" class="g-MD g-aiAbs g-aiPointText" style="top:44.8712%;margin-top:-19.1px;left:16.0289%;margin-left:-7.8%;width:119px;">\n\t\t\t<p class="g-pstyle3">Shelters within 6m</p>\n\t\t\t<p class="g-pstyle3">of a latrine</p>\n\t\t</div>\n\t\t<div id="g-ai1-5" class="g-MD g-aiAbs g-aiPointText" style="top:57.2685%;margin-top:-9.3px;left:9.7209%;margin-left:-2.2667%;width:36px;">\n\t\t\t<p class="g-pstyle4">200 m</p>\n\t\t</div>\n\t</div>\n\n\t<!-- Artboard: lg -->\n\t<div id="g-sixbuffer-lg" class="g-artboard g-artboard-v3" data-min-width=\'920\'>\n\t\t<img id="g-ai2-0" class="g-aiImg" src="images/graphics/sixbuffer-lg.jpg"/>\n\t\t<div id="g-ai2-1" class="g-highway g-aiAbs g-aiPointText" style="top:5.9394%;margin-top:-11.2px;left:83.8153%;width:129px;">\n\t\t\t<p class="g-pstyle0">BANGLADESH</p>\n\t\t</div>\n\t\t<div id="g-ai2-2" class="g-Layer_27 g-aiAbs g-aiPointText" style="top:17.4593%;margin-top:-18px;left:72.787%;margin-left:-4.5652%;width:86px;">\n\t\t\t<p class="g-pstyle1">Kutupalong</p>\n\t\t\t<p class="g-pstyle1">Refugee Camp</p>\n\t\t</div>\n\t\t<div id="g-ai2-3" class="g-highway g-aiAbs g-aiPointText" style="top:25.4901%;margin-top:-26.4px;left:89.7169%;width:68px;">\n\t\t\t<p class="g-pstyle2">Cox&rsquo;s Bazar</p>\n\t\t\t<p class="g-pstyle2">- Teknaf</p>\n\t\t\t<p class="g-pstyle2">Highway</p>\n\t\t</div>\n\t\t<div id="g-ai2-4" class="g-Layer_23 g-aiAbs g-aiPointText" style="top:46.396%;margin-top:-19.1px;left:13.8758%;margin-left:-6.3587%;width:119px;">\n\t\t\t<p class="g-pstyle3">Shelters within 6m</p>\n\t\t\t<p class="g-pstyle3">of a latrine</p>\n\t\t</div>\n\t\t<div id="g-ai2-5" class="g-highway g-aiAbs g-aiPointText" style="top:59.7362%;margin-top:-9.6px;left:7.8294%;margin-left:-1.9022%;width:37px;">\n\t\t\t<p class="g-pstyle1">200 m</p>\n\t\t</div>\n\t</div>\n\n</div>\n\n<!-- End ai2html - 2017-11-30 18:51 -->\n'
    }
}(),
function() {
    window.Reuters = window.Reuters || {},
    window.Reuters.Graphics = window.Reuters.Graphics || {},
    window.Reuters.Graphics.Template = window.Reuters.Graphics.Template || {},
    window.Reuters.Graphics.Template.spaceperperson = function(t) {
        var n = "";
        return n += '<!-- Generated by ai2html v0.65.4 - 2017-12-04 15:16 -->\n<!-- ai file: spaceperperson.ai -->\n<style type=\'text/css\' media=\'screen,print\'>\n\t#g-spaceperperson-box .g-artboard {\n\t\tmargin:0 auto;\n\t}\n\t#g-spaceperperson-box .g-artboard p {\n\t\tmargin:0;\n\t}\n\t.g-aiAbs {\n\t\tposition:absolute;\n\t}\n\t.g-aiImg {\n\t\tdisplay:block;\n\t\twidth:100% !important;\n\t}\n\t.g-aiPointText p { white-space: nowrap; }\n\t#g-spaceperperson-sm {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t\twidth:510px;\n\t}\n\t#g-spaceperperson-sm p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:bold;\n\t\tfont-size:15px;\n\t\tline-height:18px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(0,0,0);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-spaceperperson-sm .g-pstyle0 {\n\t\tfont-weight:100;\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t}\n\t#g-spaceperperson-sm .g-pstyle1 {\n\t\tfont-weight:100;\n\t}\n\t#g-spaceperperson-lg {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t\twidth:920px;\n\t}\n\t#g-spaceperperson-lg p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:bold;\n\t\tfont-size:15px;\n\t\tline-height:18px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(0,0,0);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-spaceperperson-lg .g-pstyle0 {\n\t\tfont-weight:100;\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t}\n\t#g-spaceperperson-lg .g-pstyle1 {\n\t\tfont-weight:100;\n\t}\n\t#g-spaceperperson-xl {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t\twidth:1110px;\n\t}\n\t#g-spaceperperson-xl p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:bold;\n\t\tfont-size:16px;\n\t\tline-height:19px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(0,0,0);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-spaceperperson-xl .g-pstyle0 {\n\t\tfont-weight:100;\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t}\n\t#g-spaceperperson-xl .g-pstyle1 {\n\t\tfont-weight:100;\n\t}\n\t#g-spaceperperson-xs {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t\twidth:290px;\n\t}\n\t#g-spaceperperson-xs p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:bold;\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(0,0,0);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-spaceperperson-xs .g-pstyle0 {\n\t\tfont-weight:100;\n\t\tfont-size:13px;\n\t\tline-height:16px;\n\t}\n\t#g-spaceperperson-xs .g-pstyle1 {\n\t\tfont-weight:100;\n\t}\n\n\t\t/* Custom CSS */\n\t\t\t\t#g-spaceperperson-xl {\n\t\tdisplay:block;\n\t\tmargin:0 auto;\n\t\t}\n\t\t#g-spaceperperson-lg, \n\t\t#g-spaceperperson-sm, \n\t\t#g-spaceperperson-xs{\n\t\tdisplay:none;\n\t\tmargin:0;\n\t\t}\n\t\t@media (max-width: 1200px) {\n\t\t\t#g-spaceperperson-xl,\n\t\t\t#g-spaceperperson-xs,\n\t\t\t#g-spaceperperson-sm{\n\t\t\tdisplay:none;\n\t\t\t}\n\t\t\t#g-spaceperperson-lg{\n\t\t\tdisplay:block;\n\t\t\tmargin: 0 auto;\n\t\t\t}\n\t\t }\n\t\t@media (max-width: 992px) {\n\t\t\t#g-spaceperperson-lg,\n\t\t\t#g-spaceperperson-xs,\n\t\t\t#g-spaceperperson-xl{\n\t\t\tdisplay:none;\n\t\t\t}\n\t\t\t#g-spaceperperson-sm{\n\t\t\tdisplay:block;\n\t\t\tmargin: 0 auto;\n\t\t\t}\n\t\t }\n\t\t@media (max-width: 576px) {\n\t\t\t#g-spaceperperson-lg,\n\t\t\t#g-spaceperperson-sm,\n\t\t\t#g-spaceperperson-xl{\n\t\t\tdisplay:none;\n\t\t\t}\n\t\t\t#g-spaceperperson-xs{\n\t\t\tdisplay:block;\n\t\t\tmargin: 0 auto;\n\t\t\t}\n\t\t }\n\n\n</style>\n\n<div id="g-spaceperperson-box" class="ai2html">\n\n\t<!-- Artboard: sm -->\n\t<div id="g-spaceperperson-sm" class="g-artboard g-artboard-v3" data-min-width=\'510\' data-max-width=\'919\'>\n\t\t<img id="g-ai0-0" class="g-aiImg" src="images/graphics/spaceperperson-sm.png"/>\n\t\t<div id="g-ai0-1" class="g-Layer1 g-aiAbs g-aiPointText" style="top:11.7653%;margin-top:-17.7px;left:38.584%;width:92px;">\n\t\t\t<p class="g-pstyle0">UN minimum</p>\n\t\t\t<p class="g-pstyle0">acceptable area</p>\n\t\t</div>\n\t\t<div id="g-ai0-2" class="g-Layer1 g-aiAbs g-aiPointText" style="top:28.8804%;margin-top:-9.3px;left:38.584%;width:65px;">\n\t\t\t<p class="g-pstyle0">Actual area</p>\n\t\t</div>\n\t\t<div id="g-ai0-3" class="g-Layer1 g-aiAbs g-aiPointText" style="top:40.1227%;margin-top:-10.6px;left:11.2847%;width:144px;">\n\t\t\t<p>Average of all camps*</p>\n\t\t</div>\n\t\t<div id="g-ai0-4" class="g-Layer1 g-aiAbs g-aiPointText" style="top:40.1227%;margin-top:-10.6px;left:57.6124%;width:177px;">\n\t\t\t<p>Kutupalong Refugee Camp</p>\n\t\t</div>\n\t\t<div id="g-ai0-5" class="g-Layer1 g-aiAbs g-aiPointText" style="top:43.8365%;margin-top:-9.9px;left:11.9247%;width:131px;">\n\t\t\t<p class="g-pstyle1">20.8 sq. m per person</p>\n\t\t</div>\n\t\t<div id="g-ai0-6" class="g-Layer1 g-aiAbs g-aiPointText" style="top:43.8365%;margin-top:-9.9px;left:68.1903%;width:70px;">\n\t\t\t<p class="g-pstyle1">17.15 sq. m</p>\n\t\t</div>\n\t\t<div id="g-ai0-7" class="g-Layer1 g-aiAbs g-aiPointText" style="top:90.6509%;margin-top:-10.6px;left:4.9108%;width:225px;">\n\t\t\t<p>Kutupalong Makeshift Settlement</p>\n\t\t</div>\n\t\t<div id="g-ai0-8" class="g-Layer1 g-aiAbs g-aiPointText" style="top:90.6509%;margin-top:-10.6px;left:56.3689%;width:210px;">\n\t\t\t<p>Balukhali Makeshift Settlement</p>\n\t\t</div>\n\t\t<div id="g-ai0-9" class="g-Layer1 g-aiAbs g-aiPointText" style="top:94.5797%;margin-top:-9.9px;left:18.942%;width:62px;">\n\t\t\t<p class="g-pstyle1">7.78 sq. m</p>\n\t\t</div>\n\t\t<div id="g-ai0-10" class="g-Layer1 g-aiAbs g-aiPointText" style="top:94.5797%;margin-top:-9.9px;left:68.8948%;width:62px;">\n\t\t\t<p class="g-pstyle1">4.47 sq. m</p>\n\t\t</div>\n\t</div>\n\n\t<!-- Artboard: lg -->\n\t<div id="g-spaceperperson-lg" class="g-artboard g-artboard-v3" data-min-width=\'920\' data-max-width=\'1109\'>\n\t\t<img id="g-ai1-0" class="g-aiImg" src="images/graphics/spaceperperson-lg.png"/>\n\t\t<div id="g-ai1-1" class="g-Layer1 g-aiAbs g-aiPointText" style="top:18.1781%;margin-top:-17.7px;left:17.7649%;width:92px;">\n\t\t\t<p class="g-pstyle0">UN minimum</p>\n\t\t\t<p class="g-pstyle0">acceptable area</p>\n\t\t</div>\n\t\t<div id="g-ai1-2" class="g-Layer1 g-aiAbs g-aiPointText" style="top:57.7317%;margin-top:-9.3px;left:17.7649%;width:65px;">\n\t\t\t<p class="g-pstyle0">Actual area</p>\n\t\t</div>\n\t\t<div id="g-ai1-3" class="g-Layer1 g-aiAbs g-aiPointText" style="top:77.0559%;margin-top:-10.6px;left:3.9904%;width:144px;">\n\t\t\t<p>Average of all camps*</p>\n\t\t</div>\n\t\t<div id="g-ai1-4" class="g-Layer1 g-aiAbs g-aiPointText" style="top:77.0559%;margin-top:-10.6px;left:26.8253%;width:177px;">\n\t\t\t<p>Kutupalong Refugee Camp</p>\n\t\t</div>\n\t\t<div id="g-ai1-5" class="g-Layer1 g-aiAbs g-aiPointText" style="top:77.0559%;margin-top:-10.6px;left:50.8148%;width:225px;">\n\t\t\t<p>Kutupalong Makeshift Settlement</p>\n\t\t</div>\n\t\t<div id="g-ai1-6" class="g-Layer1 g-aiAbs g-aiPointText" style="top:77.0559%;margin-top:-10.6px;left:76.7821%;width:210px;">\n\t\t\t<p>Balukhali Makeshift Settlement</p>\n\t\t</div>\n\t\t<div id="g-ai1-7" class="g-Layer1 g-aiAbs g-aiPointText" style="top:85.2133%;margin-top:-9.9px;left:3.9548%;width:138px;">\n\t\t\t<p class="g-pstyle1">15.46 sq. m per person</p>\n\t\t</div>\n\t\t<div id="g-ai1-8" class="g-Layer1 g-aiAbs g-aiPointText" style="top:85.2133%;margin-top:-9.9px;left:32.6892%;width:70px;">\n\t\t\t<p class="g-pstyle1">17.15 sq. m</p>\n\t\t</div>\n\t\t<div id="g-ai1-9" class="g-Layer1 g-aiAbs g-aiPointText" style="top:85.2133%;margin-top:-9.9px;left:59.6337%;width:62px;">\n\t\t\t<p class="g-pstyle1">7.78 sq. m</p>\n\t\t</div>\n\t\t<div id="g-ai1-10" class="g-Layer1 g-aiAbs g-aiPointText" style="top:85.2133%;margin-top:-9.9px;left:85.4047%;width:62px;">\n\t\t\t<p class="g-pstyle1">4.47 sq. m</p>\n\t\t</div>\n\t</div>\n\n\t<!-- Artboard: xl -->\n\t<div id="g-spaceperperson-xl" class="g-artboard g-artboard-v3" data-min-width=\'1110\'>\n\t\t<img id="g-ai2-0" class="g-aiImg" src="images/graphics/spaceperperson-xl.png"/>\n\t\t<div id="g-ai2-1" class="g-Layer1 g-aiAbs g-aiPointText" style="top:17.4527%;margin-top:-17.7px;left:19.9506%;width:92px;">\n\t\t\t<p class="g-pstyle0">UN minimum</p>\n\t\t\t<p class="g-pstyle0">acceptable area</p>\n\t\t</div>\n\t\t<div id="g-ai2-2" class="g-Layer1 g-aiAbs g-aiPointText" style="top:58.4109%;margin-top:-9.3px;left:19.9506%;width:73px;">\n\t\t\t<p class="g-pstyle0">Actual space</p>\n\t\t</div>\n\t\t<div id="g-ai2-3" class="g-Layer1 g-aiAbs g-aiPointText" style="top:79.5259%;margin-top:-11.2px;left:6.2725%;width:153px;">\n\t\t\t<p>Average of all camps*</p>\n\t\t</div>\n\t\t<div id="g-ai2-4" class="g-Layer1 g-aiAbs g-aiPointText" style="top:79.5259%;margin-top:-11.2px;left:29.2264%;width:189px;">\n\t\t\t<p>Kutupalong Refugee Camp</p>\n\t\t</div>\n\t\t<div id="g-ai2-5" class="g-Layer1 g-aiAbs g-aiPointText" style="top:79.5259%;margin-top:-11.2px;left:52.2412%;width:240px;">\n\t\t\t<p>Kutupalong Makeshift Settlement</p>\n\t\t</div>\n\t\t<div id="g-ai2-6" class="g-Layer1 g-aiAbs g-aiPointText" style="top:79.5259%;margin-top:-11.2px;left:78.5783%;width:224px;">\n\t\t\t<p>Balukhali Makeshift Settlement</p>\n\t\t</div>\n\t\t<div id="g-ai2-7" class="g-Layer1 g-aiAbs g-aiPointText" style="top:88.3977%;margin-top:-10.4px;left:6.55%;width:147px;">\n\t\t\t<p class="g-pstyle1">15.46 sq. m per person</p>\n\t\t</div>\n\t\t<div id="g-ai2-8" class="g-Layer1 g-aiAbs g-aiPointText" style="top:88.3977%;margin-top:-10.4px;left:34.4106%;width:74px;">\n\t\t\t<p class="g-pstyle1">17.15 sq. m</p>\n\t\t</div>\n\t\t<div id="g-ai2-9" class="g-Layer1 g-aiAbs g-aiPointText" style="top:88.3977%;margin-top:-10.4px;left:59.8625%;width:66px;">\n\t\t\t<p class="g-pstyle1">7.78 sq. m</p>\n\t\t</div>\n\t\t<div id="g-ai2-10" class="g-Layer1 g-aiAbs g-aiPointText" style="top:88.3977%;margin-top:-10.4px;left:84.9692%;width:66px;">\n\t\t\t<p class="g-pstyle1">4.47 sq. m</p>\n\t\t</div>\n\t</div>\n\n\t<!-- Artboard: xs -->\n\t<div id="g-spaceperperson-xs" class="g-artboard g-artboard-v3" data-min-width=\'290\' data-max-width=\'509\'>\n\t\t<img id="g-ai3-0" class="g-aiImg" src="images/graphics/spaceperperson-xs.png"/>\n\t\t<div id="g-ai3-1" class="g-Layer1 g-aiAbs g-aiPointText" style="top:5.6757%;margin-top:-16.6px;left:67.827%;width:85px;">\n\t\t\t<p class="g-pstyle0">UN minimum</p>\n\t\t\t<p class="g-pstyle0">acceptable area</p>\n\t\t</div>\n\t\t<div id="g-ai3-2" class="g-Layer1 g-aiAbs g-aiPointText" style="top:15.5357%;margin-top:-8.8px;left:67.827%;width:61px;">\n\t\t\t<p class="g-pstyle0">Actual area</p>\n\t\t</div>\n\t\t<div id="g-ai3-3" class="g-Layer1 g-aiAbs g-aiPointText" style="top:19.9382%;margin-top:-10px;left:29.9689%;width:134px;">\n\t\t\t<p>Average of all camps*</p>\n\t\t</div>\n\t\t<div id="g-ai3-4" class="g-Layer1 g-aiAbs g-aiPointText" style="top:22.0305%;margin-top:-9.3px;left:29.7431%;width:129px;">\n\t\t\t<p class="g-pstyle1">15.46 sq. m per person</p>\n\t\t</div>\n\t\t<div id="g-ai3-5" class="g-Layer1 g-aiAbs g-aiPointText" style="top:44.9295%;margin-top:-10px;left:21.7093%;width:166px;">\n\t\t\t<p>Kutupalong Refugee Camp</p>\n\t\t</div>\n\t\t<div id="g-ai3-6" class="g-Layer1 g-aiAbs g-aiPointText" style="top:47.0218%;margin-top:-9.3px;left:39.0718%;width:65px;">\n\t\t\t<p class="g-pstyle1">17.15 sq. m</p>\n\t\t</div>\n\t\t<div id="g-ai3-7" class="g-Layer1 g-aiAbs g-aiPointText" style="top:69.7843%;margin-top:-10px;left:16.657%;width:210px;">\n\t\t\t<p>Kutupalong Makeshift Settlement</p>\n\t\t</div>\n\t\t<div id="g-ai3-8" class="g-Layer1 g-aiAbs g-aiPointText" style="top:71.8766%;margin-top:-9.3px;left:40.2278%;width:58px;">\n\t\t\t<p class="g-pstyle1">7.78 sq. m</p>\n\t\t</div>\n\t\t<div id="g-ai3-9" class="g-Layer1 g-aiAbs g-aiPointText" style="top:94.639%;margin-top:-10px;left:18.7948%;width:196px;">\n\t\t\t<p>Balukhali Makeshift Settlement</p>\n\t\t</div>\n\t\t<div id="g-ai3-10" class="g-Layer1 g-aiAbs g-aiPointText" style="top:96.7313%;margin-top:-9.3px;left:40.228%;width:58px;">\n\t\t\t<p class="g-pstyle1">4.47 sq. m</p>\n\t\t</div>\n\t</div>\n\n</div>\n\n<!-- End ai2html - 2017-12-04 15:16 -->\n'
    }
}(),
function() {
    window.Reuters = window.Reuters || {},
    window.Reuters.Graphics = window.Reuters.Graphics || {},
    window.Reuters.Graphics.Template = window.Reuters.Graphics.Template || {},
    window.Reuters.Graphics.Template.tooltip = function(t) {
        function n() {
            e += a.call(arguments, "")
        }
        var i, e = "", a = Array.prototype.join;
        if (e += "<!-- ",
        e += t.data[0].quarters ? "\n\t<div class='dateTip'> " + (null == (i = t.data[0].quarters) ? "" : i) + " " + (null == (i = t.data[0].displayDate) ? "" : i) + " </div>\n" : t.data[0].displayDate ? "\n\t<div class='dateTip'> " + (null == (i = t.data[0].displayDate) ? "" : i) + " </div>\n" : "\n\t<div class='dateTip'> " + (null == (i = t.data[0].category) ? "" : i) + " </div>\n",
        e += "\n\n<!-- ",
        t.data.forEach(function(a, s) {
            e += " -->\n\t\t<div class=\"tipHolder\">\n\t\t\t\t\t\t\t<div class='nameTip'>" + (null == (i = a.displayName) ? "" : i) + "</div>\n\t\t\t<!-- ",
            t.data.length > 1 && (e += "\n\t\t\t\t<div class='circleTip " + (null == (i = t.self.chartType) ? "" : i) + " ",
            "outlineBar" == t.self.chartLayout && 1 == s && (e += "outline"),
            e += "' style='background-color:",
            n(t.self.colorScale(a.name)),
            e += ";'></div>\n\n\t\t\t"),
            e += " -->\n\t\t\t<div class='valueTip'>\n\t\t\t\t",
            "stackPercent" == t.self.chartLayout ? (e += "\n\t\t\t\t\t",
            n(t.self.tipNumbFormat(a.y1Percent - a.y0Percent)),
            e += "\n\t\t\t\t") : (e += "\n\t\t\t\t\t",
            n(t.self.tipNumbFormat(a[t.self.dataType])),
            e += "\n\t\t\t\t"),
            e += "\n\t\t\t</div>\n\n\t\t</div>\n<!-- "
        }),
        e += " -->\n",
        t.self.timelineData) {
            var s = t.self.timelineDataGrouped[t.self.timelineDate(t.data[0].date)];
            n(t.self.timelineTemplate({
                data: s,
                self: t.self
            }))
        }
        return e += " -->\n"
    }
}(),
function() {
    window.Reuters = window.Reuters || {},
    window.Reuters.Graphics = window.Reuters.Graphics || {},
    window.Reuters.Graphics.Template = window.Reuters.Graphics.Template || {},
    window.Reuters.Graphics.Template.unspace = function(t) {
        var n = "";
        return n += '<!-- Generated by ai2html v0.65.4 - 2017-11-13 15:25 -->\n<!-- ai file: unspace.ai -->\n<style type=\'text/css\' media=\'screen,print\'>\n\t#g-unspace-box .g-artboard {\n\t\tmargin:0 auto;\n\t}\n\t#g-unspace-box .g-artboard p {\n\t\tmargin:0;\n\t}\n\t.g-aiAbs {\n\t\tposition:absolute;\n\t}\n\t.g-aiImg {\n\t\tdisplay:block;\n\t\twidth:100% !important;\n\t}\n\t.g-aiPointText p { white-space: nowrap; }\n\t#g-unspace-xs {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t\twidth:290px;\n\t}\n\t#g-unspace-xs p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:100;\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(0,0,0);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-unspace-xs .g-pstyle0 {\n\t\tfont-weight:bold;\n\t}\n\t#g-unspace-xs .g-pstyle1 {\n\t\ttext-align:center;\n\t}\n\t#g-unspace-sm {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t\twidth:522px;\n\t}\n\t#g-unspace-sm p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:100;\n\t\tfont-size:16px;\n\t\tline-height:19px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(0,0,0);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-unspace-sm .g-pstyle0 {\n\t\tfont-weight:bold;\n\t}\n\t#g-unspace-sm .g-pstyle1 {\n\t\ttext-align:center;\n\t}\n\t#g-unspace-lg {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t\twidth:566px;\n\t}\n\t#g-unspace-lg p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:100;\n\t\tfont-size:16px;\n\t\tline-height:19px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(0,0,0);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-unspace-lg .g-pstyle0 {\n\t\tfont-weight:bold;\n\t}\n\t#g-unspace-lg .g-pstyle1 {\n\t\ttext-align:center;\n\t}\n\n\t\t/* Custom CSS */\n\t\t\t\t#g-unspace-lg {\n\t\tdisplay:block;\n\t\tmargin:0 auto;\n\t\t}\n\t\t#g-unspace-sm, \n\t\t#g-unspace-xs{\n\t\tdisplay:none;\n\t\tmargin:0;\n\t\t}\n\t\t@media (max-width: 1200px) {\n\t\t\t#g-unspace-lg,\n\t\t\t#g-unspace-xs{\n\t\t\tdisplay:none;\n\t\t\t}\n\t\t\t#g-unspace-sm{\n\t\t\tdisplay:block;\n\t\t\tmargin: 0 auto;\n\t\t\t}\n\t\t }\n\t\t@media (max-width: 576px) {\n\t\t\t#g-unspace-lg,\n\t\t\t#g-unspace-sm{\n\t\t\tdisplay:none;\n\t\t\t}\n\t\t\t#g-unspace-xs{\n\t\t\tdisplay:block;\n\t\t\tmargin: 0 auto;\n\t\t\t}\n\t\t }\n\n\n</style>\n\n<div id="g-unspace-box" class="ai2html">\n\n\t<!-- Artboard: xs -->\n\t<div id="g-unspace-xs" class="g-artboard g-artboard-v3" data-min-width=\'290\' data-max-width=\'521\'>\n\t\t<img id="g-ai0-0" class="g-aiImg" src="images/graphics/unspace-xs.png"/>\n\t\t<div id="g-ai0-1" class="g-Layer1 g-aiAbs g-aiPointText" style="top:7.4359%;margin-top:-9.9px;left:40.7201%;width:52px;">\n\t\t\t<p class="g-pstyle0">45 sq. m</p>\n\t\t</div>\n\t\t<div id="g-ai0-2" class="g-Layer1 g-aiAbs g-aiPointText" style="top:17.1333%;margin-top:-17.5px;left:49.3455%;margin-left:-21.0345%;width:124px;">\n\t\t\t<p class="g-pstyle1">U.N. standard average</p>\n\t\t\t<p class="g-pstyle1">camp area per person</p>\n\t\t</div>\n\t\t<div id="g-ai0-3" class="g-Layer1 g-aiAbs g-aiPointText" style="top:69.0026%;margin-top:-10px;left:5.7471%;width:75px;">\n\t\t\t<p class="g-pstyle0">35 - 45 sq.m</p>\n\t\t</div>\n\t\t<div id="g-ai0-4" class="g-Layer1 g-aiAbs g-aiPointText" style="top:69.0026%;margin-top:-10px;left:67.5545%;width:71px;">\n\t\t\t<p class="g-pstyle0"><= 29 sq. m</p>\n\t\t</div>\n\t\t<div id="g-ai0-5" class="g-Layer1 g-aiAbs g-aiPointText" style="top:73.8609%;margin-top:-9.3px;left:67.5545%;width:76px;">\n\t\t\t<p>Critical range</p>\n\t\t</div>\n\t\t<div id="g-ai0-6" class="g-Layer1 g-aiAbs g-aiPointText" style="top:74.6495%;margin-top:-9.3px;left:5.7471%;width:99px;">\n\t\t\t<p>Acceptable range</p>\n\t\t</div>\n\t\t<div id="g-ai0-7" class="g-Layer1 g-aiAbs g-aiPointText" style="top:85.5634%;margin-top:-10px;left:36.1799%;width:78px;">\n\t\t\t<p class="g-pstyle0">30 - 34 sq.m </p>\n\t\t</div>\n\t\t<div id="g-ai0-8" class="g-Layer1 g-aiAbs g-aiPointText" style="top:90.4217%;margin-top:-9.3px;left:30.049%;width:114px;">\n\t\t\t<p>unacceptable range</p>\n\t\t</div>\n\t</div>\n\n\t<!-- Artboard: sm -->\n\t<div id="g-unspace-sm" class="g-artboard g-artboard-v3" data-min-width=\'522\' data-max-width=\'565\'>\n\t\t<img id="g-ai1-0" class="g-aiImg" src="images/graphics/unspace-sm.png"/>\n\t\t<div id="g-ai1-1" class="g-Layer1 g-aiAbs g-aiPointText" style="top:18.5787%;margin-top:-11.2px;left:65.104%;width:86px;">\n\t\t\t<p class="g-pstyle0">35 - 45 sq.m</p>\n\t\t</div>\n\t\t<div id="g-ai1-2" class="g-Layer1 g-aiAbs g-aiPointText" style="top:27.6405%;margin-top:-10.4px;left:65.104%;width:113px;">\n\t\t\t<p>Acceptable range</p>\n\t\t</div>\n\t\t<div id="g-ai1-3" class="g-Layer1 g-aiAbs g-aiPointText" style="top:46.5549%;margin-top:-11.2px;left:73.0728%;width:89px;">\n\t\t\t<p class="g-pstyle0">30 - 34 sq.m </p>\n\t\t</div>\n\t\t<div id="g-ai1-4" class="g-Layer1 g-aiAbs g-aiPointText" style="top:48.9358%;margin-top:-11.2px;left:10.8382%;width:60px;">\n\t\t\t<p class="g-pstyle0">45 sq. m</p>\n\t\t</div>\n\t\t<div id="g-ai1-5" class="g-Layer1 g-aiAbs g-aiPointText" style="top:55.6167%;margin-top:-10.4px;left:73.0728%;width:130px;">\n\t\t\t<p>unacceptable range</p>\n\t\t</div>\n\t\t<div id="g-ai1-6" class="g-Layer1 g-aiAbs g-aiPointText" style="top:66.0929%;margin-top:-20px;left:15.4696%;margin-left:-13.6015%;width:144px;">\n\t\t\t<p class="g-pstyle1">U.N. standard average</p>\n\t\t\t<p class="g-pstyle1">camp area per person</p>\n\t\t</div>\n\t\t<div id="g-ai1-7" class="g-Layer1 g-aiAbs g-aiPointText" style="top:74.531%;margin-top:-11.2px;left:65.1042%;width:81px;">\n\t\t\t<p class="g-pstyle0"><= 29 sq. m</p>\n\t\t</div>\n\t\t<div id="g-ai1-8" class="g-Layer1 g-aiAbs g-aiPointText" style="top:84.1881%;margin-top:-10.4px;left:65.1042%;width:87px;">\n\t\t\t<p>Critical range</p>\n\t\t</div>\n\t</div>\n\n\t<!-- Artboard: lg -->\n\t<div id="g-unspace-lg" class="g-artboard g-artboard-v3" data-min-width=\'566\'>\n\t\t<img id="g-ai2-0" class="g-aiImg" src="images/graphics/unspace-lg.png"/>\n\t\t<div id="g-ai2-1" class="g-Layer1 g-aiAbs g-aiPointText" style="top:23.3159%;margin-top:-11.2px;left:66.6794%;width:86px;">\n\t\t\t<p class="g-pstyle0">35 - 45 sq.m</p>\n\t\t</div>\n\t\t<div id="g-ai2-2" class="g-Layer1 g-aiAbs g-aiPointText" style="top:32.0698%;margin-top:-10.4px;left:66.6794%;width:113px;">\n\t\t\t<p>Acceptable range</p>\n\t\t</div>\n\t\t<div id="g-ai2-3" class="g-Layer1 g-aiAbs g-aiPointText" style="top:49.7547%;margin-top:-11.2px;left:76.004%;width:89px;">\n\t\t\t<p class="g-pstyle0">30 - 34 sq.m </p>\n\t\t</div>\n\t\t<div id="g-ai2-4" class="g-Layer1 g-aiAbs g-aiPointText" style="top:50.8338%;margin-top:-11.2px;left:9.2556%;width:60px;">\n\t\t\t<p class="g-pstyle0">45 sq. m</p>\n\t\t</div>\n\t\t<div id="g-ai2-5" class="g-Layer1 g-aiAbs g-aiPointText" style="top:57.969%;margin-top:-10.4px;left:76.0042%;width:130px;">\n\t\t\t<p>unacceptable range</p>\n\t\t</div>\n\t\t<div id="g-ai2-6" class="g-Layer1 g-aiAbs g-aiPointText" style="top:67.4654%;margin-top:-20px;left:14.4121%;margin-left:-12.5442%;width:144px;">\n\t\t\t<p class="g-pstyle1">U.N. standard average</p>\n\t\t\t<p class="g-pstyle1">camp area per person</p>\n\t\t</div>\n\t\t<div id="g-ai2-7" class="g-Layer1 g-aiAbs g-aiPointText" style="top:75.1144%;margin-top:-11.2px;left:66.6794%;width:81px;">\n\t\t\t<p class="g-pstyle0"><= 29 sq. m</p>\n\t\t</div>\n\t\t<div id="g-ai2-8" class="g-Layer1 g-aiAbs g-aiPointText" style="top:84.4078%;margin-top:-10.4px;left:66.6794%;width:87px;">\n\t\t\t<p>Critical range</p>\n\t\t</div>\n\t</div>\n\n</div>\n\n<!-- End ai2html - 2017-11-13 15:25 -->\n';
    }
}(),
function() {
    window.Reuters = window.Reuters || {},
    window.Reuters.Graphics = window.Reuters.Graphics || {},
    window.Reuters.Graphics.Template = window.Reuters.Graphics.Template || {},
    window.Reuters.Graphics.Template.waterchart = function(t) {
        var n = "";
        return n += '<!-- Generated by ai2html v0.65.4 - 2017-12-04 13:25 -->\n<!-- ai file: waterchart.ai -->\n<style type=\'text/css\' media=\'screen,print\'>\n\t#g-waterchart-box .g-artboard {\n\t\tmargin:0 auto;\n\t}\n\t#g-waterchart-box .g-artboard p {\n\t\tmargin:0;\n\t}\n\t.g-aiAbs {\n\t\tposition:absolute;\n\t}\n\t.g-aiImg {\n\t\tdisplay:block;\n\t\twidth:100% !important;\n\t}\n\t.g-aiPointText p { white-space: nowrap; }\n\t#g-waterchart-sm {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-waterchart-sm p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:100;\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(0,0,0);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-waterchart-sm .g-pstyle0 {\n\t\ttext-align:center;\n\t}\n\t#g-waterchart-sm .g-pstyle1 {\n\t\tfont-weight:bold;\n\t\ttext-align:center;\n\t}\n\t#g-waterchart-sm .g-pstyle2 {\n\t\ttext-align:center;\n\t\tcolor:rgb(187,187,187);\n\t}\n\t#g-waterchart-sm .g-pstyle3 {\n\t\tfont-weight:bold;\n\t\ttext-align:center;\n\t\tcolor:rgb(187,187,187);\n\t}\n\t#g-waterchart-md {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-waterchart-md p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:100;\n\t\tfont-size:13px;\n\t\tline-height:16px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(0,0,0);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-waterchart-md .g-pstyle0 {\n\t\ttext-align:center;\n\t}\n\t#g-waterchart-md .g-pstyle1 {\n\t\tfont-weight:bold;\n\t\ttext-align:center;\n\t}\n\t#g-waterchart-md .g-pstyle2 {\n\t\ttext-align:center;\n\t\tcolor:rgb(187,187,187);\n\t}\n\t#g-waterchart-md .g-pstyle3 {\n\t\tfont-weight:bold;\n\t\ttext-align:center;\n\t\tcolor:rgb(187,187,187);\n\t}\n\t#g-waterchart-xs {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-waterchart-xs p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:100;\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(0,0,0);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-waterchart-xs .g-pstyle0 {\n\t\tfont-weight:bold;\n\t}\n\t#g-waterchart-xs .g-pstyle1 {\n\t\ttext-align:center;\n\t}\n\t#g-waterchart-lg {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-waterchart-lg p {\n\t\tfont-family:Source Sans Pro,helvetica,sans-serif;\n\t\tfont-weight:100;\n\t\tfont-size:14px;\n\t\tline-height:17px;\n\t\tfilter:alpha(opacity=100);\n\t\t-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);\n\t\topacity:1;\n\t\tletter-spacing:0em;\n\t\ttext-align:left;\n\t\tcolor:rgb(0,0,0);\n\t\ttext-transform:none;\n\t\tpadding-bottom:0;\n\t\tpadding-top:0;\n\t\tmix-blend-mode:normal;\n\t\tfont-style:normal;\n\t}\n\t#g-waterchart-lg .g-pstyle0 {\n\t\ttext-align:center;\n\t}\n\t#g-waterchart-lg .g-pstyle1 {\n\t\tfont-weight:bold;\n\t\ttext-align:center;\n\t}\n\t#g-waterchart-lg .g-pstyle2 {\n\t\ttext-align:center;\n\t\tcolor:rgb(187,187,187);\n\t}\n\t#g-waterchart-lg .g-pstyle3 {\n\t\tfont-weight:bold;\n\t\ttext-align:center;\n\t\tcolor:rgb(187,187,187);\n\t}\n\n\t\t/* Custom CSS */\n\t\t\t\t#g-waterchart-lg {\n\t\tdisplay:block;\n\t\tmargin:0 auto;\n\t\t}\n\t\t#g-waterchart-md, \n\t\t#g-waterchart-sm, \n\t\t#g-waterchart-xs{\n\t\tdisplay:none;\n\t\tmargin:0;\n\t\t}\n\t\t@media (max-width: 1200px) {\n\t\t\t#g-waterchart-lg,\n\t\t\t#g-waterchart-sm,\n\t\t\t#g-waterchart-xs{\n\t\t\tdisplay:none;\n\t\t\t}\n\t\t\t#g-waterchart-md{\n\t\t\tdisplay:block;\n\t\t\tmargin: 0 auto;\n\t\t\t}\n\t\t }\n\t\t@media (max-width: 765px) {\n\t\t\t#g-waterchart-md,\n\t\t\t#g-waterchart-lg,\n\t\t\t#g-waterchart-xs{\n\t\t\tdisplay:none;\n\t\t\t}\n\t\t\t#g-waterchart-sm{\n\t\t\tdisplay:block;\n\t\t\tmargin: 0 auto;\n\t\t\t}\n\t\t }\n\t\t@media (max-width: 520px) {\n\t\t\t#g-waterchart-md,\n\t\t\t#g-waterchart-lg,\n\t\t\t#g-waterchart-sm{\n\t\t\tdisplay:none;\n\t\t\t}\n\t\t\t#g-waterchart-xs{\n\t\t\tdisplay:block;\n\t\t\tmargin: 0 auto;\n\t\t\t}\n\t\t }\n\n\n</style>\n\n<div id="g-waterchart-box" class="ai2html">\n\n\t<!-- Artboard: sm -->\n\t<div id="g-waterchart-sm" class="g-artboard g-artboard-v3" data-min-width=\'510\' data-max-width=\'539\'>\n\t\t<img id="g-ai0-0" class="g-aiImg" src="images/graphics/waterchart-sm.png"/>\n\t\t<div id="g-ai0-1" class="g-Layer1 g-aiAbs g-aiPointText" style="top:21.9036%;margin-top:-26.8px;left:18.6025%;margin-left:-7.8431%;width:82px;">\n\t\t\t<p class="g-pstyle0">Very highly</p>\n\t\t\t<p class="g-pstyle0">contaminated</p>\n\t\t\t<p class="g-pstyle1">36%</p>\n\t\t</div>\n\t\t<div id="g-ai0-2" class="g-Layer1 g-aiAbs g-aiPointText" style="top:21.9036%;margin-top:-26.8px;left:47.3455%;margin-left:-7.8431%;width:82px;">\n\t\t\t<p class="g-pstyle0">Highly</p>\n\t\t\t<p class="g-pstyle0">contaminated</p>\n\t\t\t<p class="g-pstyle1">22%</p>\n\t\t</div>\n\t\t<div id="g-ai0-3" class="g-Layer1 g-aiAbs g-aiPointText" style="top:21.9036%;margin-top:-26.8px;left:71.8126%;margin-left:-8.2353%;width:86px;">\n\t\t\t<p class="g-pstyle0">Intermediate</p>\n\t\t\t<p class="g-pstyle0">contamination</p>\n\t\t\t<p class="g-pstyle1">27%</p>\n\t\t</div>\n\t\t<div id="g-ai0-4" class="g-Layer1 g-aiAbs g-aiPointText" style="top:21.9036%;margin-top:-26.8px;left:92.0379%;margin-left:-5.1961%;width:55px;">\n\t\t\t<p class="g-pstyle2">Negative</p>\n\t\t\t<p class="g-pstyle2">for E. Coli</p>\n\t\t\t<p class="g-pstyle3">15%</p>\n\t\t</div>\n\t\t<div id="g-ai0-5" class="g-Layer1 g-aiAbs g-aiPointText" style="top:76.9756%;margin-top:-9.3px;left:43.295%;margin-left:-9.8039%;width:102px;">\n\t\t\t<p class="g-pstyle0">Positive for E. Coli</p>\n\t\t</div>\n\t</div>\n\n\t<!-- Artboard: md -->\n\t<div id="g-waterchart-md" class="g-artboard g-artboard-v3" data-min-width=\'450\' data-max-width=\'509\'>\n\t\t<img id="g-ai1-0" class="g-aiImg" src="images/graphics/waterchart-md.png"/>\n\t\t<div id="g-ai1-1" class="g-Layer1 g-aiAbs g-aiPointText" style="top:28.308%;margin-top:-25px;left:18.653%;margin-left:-8.2222%;width:76px;">\n\t\t\t<p class="g-pstyle0">Very highly</p>\n\t\t\t<p class="g-pstyle0">contaminated</p>\n\t\t\t<p class="g-pstyle1">36%</p>\n\t\t</div>\n\t\t<div id="g-ai1-2" class="g-Layer1 g-aiAbs g-aiPointText" style="top:28.308%;margin-top:-25px;left:47.5864%;margin-left:-8.2222%;width:76px;">\n\t\t\t<p class="g-pstyle0">Highly</p>\n\t\t\t<p class="g-pstyle0">contaminated</p>\n\t\t\t<p class="g-pstyle1">22%</p>\n\t\t</div>\n\t\t<div id="g-ai1-3" class="g-Layer1 g-aiAbs g-aiPointText" style="top:28.308%;margin-top:-25px;left:72.2481%;margin-left:-8.6667%;width:80px;">\n\t\t\t<p class="g-pstyle0">Intermediate</p>\n\t\t\t<p class="g-pstyle0">contamination</p>\n\t\t\t<p class="g-pstyle1">27%</p>\n\t\t</div>\n\t\t<div id="g-ai1-4" class="g-Layer1 g-aiAbs g-aiPointText" style="top:28.308%;margin-top:-25px;left:92.6463%;margin-left:-5.2222%;width:49px;">\n\t\t\t<p class="g-pstyle2">Negative</p>\n\t\t\t<p class="g-pstyle2">for E.Coli</p>\n\t\t\t<p class="g-pstyle3">15%</p>\n\t\t</div>\n\t\t<div id="g-ai1-5" class="g-Layer1 g-aiAbs g-aiPointText" style="top:76.9642%;margin-top:-8.8px;left:43.5554%;margin-left:-10.3333%;width:95px;">\n\t\t\t<p class="g-pstyle0">Positive for E. Coli</p>\n\t\t</div>\n\t</div>\n\n\t<!-- Artboard: xs -->\n\t<div id="g-waterchart-xs" class="g-artboard g-artboard-v3" data-min-width=\'300\' data-max-width=\'449\'>\n\t\t<img id="g-ai2-0" class="g-aiImg" src="images/graphics/waterchart-xs.png"/>\n\t\t<div id="g-ai2-1" class="g-Layer1 g-aiAbs g-aiPointText" style="top:23.5562%;margin-top:-26.8px;left:1.0397%;width:82px;">\n\t\t\t<p>Very highly</p>\n\t\t\t<p>contaminated</p>\n\t\t\t<p class="g-pstyle0">36%</p>\n\t\t</div>\n\t\t<div id="g-ai2-2" class="g-Layer1 g-aiAbs g-aiPointText" style="top:23.5562%;margin-top:-26.8px;left:36.6489%;width:82px;">\n\t\t\t<p>Highly</p>\n\t\t\t<p>contaminated</p>\n\t\t\t<p class="g-pstyle0">22%</p>\n\t\t</div>\n\t\t<div id="g-ai2-3" class="g-Layer1 g-aiAbs g-aiPointText" style="top:23.5562%;margin-top:-26.8px;left:71.027%;width:86px;">\n\t\t\t<p>Intermediate</p>\n\t\t\t<p>contamination</p>\n\t\t\t<p class="g-pstyle0">27%</p>\n\t\t</div>\n\t\t<div id="g-ai2-4" class="g-Layer1 g-aiAbs g-aiPointText" style="top:78.741%;margin-top:-9.3px;left:43.6957%;margin-left:-16.6667%;width:102px;">\n\t\t\t<p class="g-pstyle1">Positive for E. Coli</p>\n\t\t</div>\n\t</div>\n\n\t<!-- Artboard: lg -->\n\t<div id="g-waterchart-lg" class="g-artboard g-artboard-v3" data-min-width=\'540\'>\n\t\t<img id="g-ai3-0" class="g-aiImg" src="images/graphics/waterchart-lg.png"/>\n\t\t<div id="g-ai3-1" class="g-Layer1 g-aiAbs g-aiPointText" style="top:26.2627%;margin-top:-26.8px;left:18.2923%;margin-left:-7.4074%;width:82px;">\n\t\t\t<p class="g-pstyle0">Very highly</p>\n\t\t\t<p class="g-pstyle0">contaminated</p>\n\t\t\t<p class="g-pstyle1">36%</p>\n\t\t</div>\n\t\t<div id="g-ai3-2" class="g-Layer1 g-aiAbs g-aiPointText" style="top:26.2627%;margin-top:-26.8px;left:47.3158%;margin-left:-7.4074%;width:82px;">\n\t\t\t<p class="g-pstyle0">Highly</p>\n\t\t\t<p class="g-pstyle0">contaminated</p>\n\t\t\t<p class="g-pstyle1">22%</p>\n\t\t</div>\n\t\t<div id="g-ai3-3" class="g-Layer1 g-aiAbs g-aiPointText" style="top:26.2627%;margin-top:-26.8px;left:72.021%;margin-left:-7.7778%;width:86px;">\n\t\t\t<p class="g-pstyle0">Intermediate</p>\n\t\t\t<p class="g-pstyle0">contamination</p>\n\t\t\t<p class="g-pstyle1">27%</p>\n\t\t</div>\n\t\t<div id="g-ai3-4" class="g-Layer1 g-aiAbs g-aiPointText" style="top:26.2627%;margin-top:-26.8px;left:92.4264%;margin-left:-4.6296%;width:52px;">\n\t\t\t<p class="g-pstyle2">Negative</p>\n\t\t\t<p class="g-pstyle2">for E.Coli</p>\n\t\t\t<p class="g-pstyle3">15%</p>\n\t\t</div>\n\t\t<div id="g-ai3-5" class="g-Layer1 g-aiAbs g-aiPointText" style="top:75.9994%;margin-top:-9.3px;left:43.2274%;margin-left:-9.2593%;width:102px;">\n\t\t\t<p class="g-pstyle0">Positive for E. Coli</p>\n\t\t</div>\n\t</div>\n\n</div>\n\n<!-- End ai2html - 2017-12-04 13:25 -->\n'
    }
}(),
function() {
    window.Reuters = window.Reuters || {},
    window.Reuters.Graphics = window.Reuters.Graphics || {},
    window.Reuters.Graphics.Template = window.Reuters.Graphics.Template || {},
    window.Reuters.Graphics.Template.wateronly = function(t) {
        var n = "";
        return n += '<!-- Generated by ai2html v0.65.4 - 2017-11-30 10:02 -->\n<!-- ai file: wateronly.ai -->\n<style type=\'text/css\' media=\'screen,print\'>\n\t#g-wateronly-box .g-artboard {\n\t\tmargin:0 auto;\n\t}\n\t#g-wateronly-box .g-artboard p {\n\t\tmargin:0;\n\t}\n\t.g-aiAbs {\n\t\tposition:absolute;\n\t}\n\t.g-aiImg {\n\t\tdisplay:block;\n\t\twidth:100% !important;\n\t}\n\t.g-aiPointText p { white-space: nowrap; }\n\t#g-wateronly-sm {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-wateronly-md {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\t#g-wateronly-lg {\n\t\tposition:relative;\n\t\toverflow:hidden;\n\t}\n\n\t\t/* Custom CSS */\n\t\t\t\t#g-wateronly-lg {\n\t\tdisplay:block;\n\t\tmargin:0 auto;\n\t\t}\n\t\t#g-wateronly-sm, \n\t\t#g-wateronly-md{\n\t\tdisplay:none;\n\t\tmargin:0;\n\t\t}\n\t\t@media (max-width: 992px) {\n\t\t\t#g-wateronly-lg,\n\t\t\t#g-wateronly-sm{\n\t\t\tdisplay:none;\n\t\t\t}\n\t\t\t#g-wateronly-md{\n\t\t\tdisplay:block;\n\t\t\tmargin: 0 auto;\n\t\t\t}\n\t\t }\n\t\t@media (max-width: 750px) {\n\t\t\t#g-wateronly-lg,\n\t\t\t#g-wateronly-md{\n\t\t\tdisplay:none;\n\t\t\t}\n\t\t\t#g-wateronly-sm{\n\t\t\tdisplay:block;\n\t\t\tmargin: 0 auto;\n\t\t\t}\n\t\t }\n\n\n</style>\n\n<div id="g-wateronly-box" class="ai2html">\n\n\t<!-- Artboard: sm -->\n\t<div id="g-wateronly-sm" class="g-artboard g-artboard-v3" data-min-width=\'410\' data-max-width=\'749\'>\n\t\t<img id="g-ai0-0" class="g-aiImg" src="images/graphics/wateronly-sm.png"/>\n\t</div>\n\n\t<!-- Artboard: md -->\n\t<div id="g-wateronly-md" class="g-artboard g-artboard-v3" data-min-width=\'750\' data-max-width=\'919\'>\n\t\t<img id="g-ai1-0" class="g-aiImg" src="images/graphics/wateronly-md.png"/>\n\t</div>\n\n\t<!-- Artboard: lg -->\n\t<div id="g-wateronly-lg" class="g-artboard g-artboard-v3" data-min-width=\'920\'>\n\t\t<img id="g-ai2-0" class="g-aiImg" src="images/graphics/wateronly-lg.png"/>\n\t</div>\n\n</div>\n\n<!-- End ai2html - 2017-11-30 10:02 -->\n'
    }
}(),
function() {
    window.Reuters = window.Reuters || {},
    window.Reuters.Graphics = window.Reuters.Graphics || {},
    window.Reuters.Graphics.Template = window.Reuters.Graphics.Template || {},
    window.Reuters.Graphics.Template.zones = function(t) {
        var n = "";
        return n += '<?xml version="1.0" encoding="utf-8"?>\r\n<!-- Generator: Adobe Illustrator 17.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->\r\n<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\r\n<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="980px"\r\n\t height="1202.02px" viewBox="0 0 980 1202.02" enable-background="new 0 0 980 1202.02" xml:space="preserve">\r\n<pattern  x="-2424.549" y="3793.667" width="22.263" height="22.263" patternUnits="userSpaceOnUse" id="Nueva_muestra_de_motivo_6" viewBox="0 -22.263 22.263 22.263" overflow="visible">\r\n\t<g>\r\n\t\t<polygon fill="none" points="0,-22.263 22.263,-22.263 22.263,0 0,0 \t\t"/>\r\n\t\t<polygon fill="#FFFFFF" points="4.152,-22.263 0,-18.11 0,-16.696 5.566,-22.263 \t\t"/>\r\n\t\t<polygon fill="#FFFFFF" points="9.718,-22.263 0,-12.544 0,-11.13 11.132,-22.263 \t\t"/>\r\n\t\t<polygon fill="#FFFFFF" points="15.283,-22.263 0,-6.979 0,-5.564 16.697,-22.263 \t\t"/>\r\n\t\t<polygon fill="#FFFFFF" points="22.263,-22.263 20.85,-22.263 0,-1.413 0,0 0.002,0 22.263,-22.261 \t\t"/>\r\n\t\t<polygon fill="#FFFFFF" points="22.263,-18.109 4.153,0 5.567,0 22.263,-16.695 \t\t"/>\r\n\t\t<polygon fill="#FFFFFF" points="22.263,-12.544 9.719,0 11.133,0 22.263,-11.13 \t\t"/>\r\n\t\t<polygon fill="#FFFFFF" points="22.263,-6.978 15.285,0 16.699,0 22.263,-5.563 \t\t"/>\r\n\t\t<polygon fill="#FFFFFF" points="22.263,-1.412 20.851,0 22.263,0 \t\t"/>\r\n\t</g>\r\n</pattern>\r\n<g id="boundary">\r\n</g>\r\n<g id="zaa">\r\n\t<polygon opacity="0" fill="#443619" points="-62.083,307.778 -60.914,305.914 -53.318,284.167 -56.824,251.233 -56.824,233.835\r\n\t\t-41.632,202.144 -63.836,185.989 -76.107,178.532 -77.86,172.319 -69.095,149.327 -69.095,128.201 -67.342,118.88 -57.993,98.376\r\n\t\t-59.161,94.026 -39.295,90.298 -31.114,90.298 -24.684,90.917 -18.844,93.402 -14.751,96.509 -11.247,100.861 -2.48,113.288\r\n\t\t8.037,121.987 20.308,132.55 29.657,132.55 31.994,133.792 39.009,143.113 41.346,144.356 44.849,144.977 65.303,144.977\r\n\t\t69.98,146.22 74.655,148.708 119.647,184.125 124.906,198.416 123.153,220.166 120.818,226.379 112.635,233.835 112.635,236.942\r\n\t\t99.78,235.699 75.239,235.699 56.538,235.699 -8.323,267.388 -31.114,295.973 -40.463,305.914 \t"/>\r\n</g>\r\n<g id="zjj">\r\n\t<polygon opacity="0" fill="#443619" points="372.668,832.843 382.602,842.785 396.625,842.164 424.09,835.329 454.477,852.727\r\n\t\t469.67,852.727 460.318,889.389 473.758,903.059 463.24,942.828 450.969,955.255 443.957,958.362 429.349,978.866 425.843,982.597\r\n\t\t420.585,980.733 419.413,981.354 419.413,982.597 415.91,995.024 412.402,998.752 411.235,998.752 408.898,1000.616\r\n\t\t404.806,1009.936 405.39,1011.8 403.053,1018.635 403.053,1026.094 403.053,1027.337 403.639,1029.198 404.806,1038.518\r\n\t\t406.561,1043.492 408.898,1045.977 408.898,1046.596 398.965,1059.647 403.639,1065.86 399.547,1072.074 393.706,1072.074\r\n\t\t384.355,1081.394 377.927,1083.88 377.927,1093.824 366.238,1096.309 365.656,1095.685 360.397,1090.714 355.72,1083.88\r\n\t\t355.139,1082.016 300.208,1050.327 290.275,1030.441 266.902,1017.392 244.695,1022.985 235.349,1009.315 210.221,990.053\r\n\t\t206.13,980.733 209.636,973.277 221.907,947.799 231.256,924.187 224.244,896.845 217.817,883.175 221.323,870.748\r\n\t\t229.503,862.049 241.774,862.049 254.044,867.02 261.641,865.154 269.823,851.484 272.161,843.406 278.588,843.406\r\n\t\t278.588,842.785 310.728,834.708 327.673,850.863 348.709,839.057 \t"/>\r\n</g>\r\n<g id="zkk">\r\n\t<polygon opacity="0" fill="#443619" points="592.382,840.921 622.182,859.562 616.923,880.069 622.182,907.408 636.205,931.644\r\n\t\t669.514,957.119 672.435,954.012 687.628,956.498 700.483,951.527 729.701,956.498 742.558,979.488 742.558,1024.228\r\n\t\t752.492,1048.463 761.841,1050.948 768.85,1043.492 786.966,1043.492 802.159,1050.327 804.496,1053.431 815.6,1067.725\r\n\t\t786.385,1080.152 758.335,1108.736 753.076,1105.63 716.846,1083.258 673.604,1072.074 646.141,1055.298 602.899,1055.298\r\n\t\t589.46,1038.519 591.797,1023.606 571.93,1008.073 564.916,995.645 556.736,990.053 559.657,983.84 556.736,975.138\r\n\t\t553.23,963.954 552.645,955.876 550.308,950.906 543.296,940.964 538.038,940.343 529.27,944.071 524.012,951.527 515.247,947.799\r\n\t\t504.729,944.692 499.47,945.935 489.537,959.604 481.941,963.954 475.511,970.168 474.929,970.789 472.592,969.546\r\n\t\t466.162,969.546 461.487,967.682 459.15,967.682 458.566,967.682 455.644,959.604 450.969,955.255 463.24,942.828 473.758,903.059\r\n\t\t460.318,889.389 469.67,852.727 497.717,852.727 521.674,857.698 531.026,860.183 551.477,848.999 578.355,855.215 \t"/>\r\n</g>\r\n<g id="zhh">\r\n\t<polygon opacity="0" fill="#443619" points="369.746,657.614 367.993,663.207 369.746,674.391 379.679,683.714 380.851,684.957\r\n\t\t421.168,711.675 429.349,712.917 434.023,710.432 435.776,701.112 438.698,694.277 447.463,689.306 463.826,694.898\r\n\t\t504.144,683.092 517.586,685.578 520.507,690.549 520.507,698.626 539.208,700.49 578.941,694.898 589.459,699.248\r\n\t\t590.628,702.976 591.796,707.947 592.965,709.81 605.82,734.043 616.922,738.395 617.509,738.395 625.105,738.395 625.105,765.113\r\n\t\t601.73,799.909 592.381,840.921 578.357,855.214 551.479,848.998 531.025,860.185 521.673,857.7 497.719,852.726 469.669,852.726\r\n\t\t454.477,852.726 424.09,835.328 396.625,842.163 382.601,842.785 372.668,832.843 348.708,839.057 327.673,850.865\r\n\t\t310.728,834.707 278.59,842.785 272.16,843.406 271.576,843.406 278.59,828.494 296.12,806.125 308.975,777.54 314.818,753.308\r\n\t\t306.053,728.451 281.512,717.267 240.023,701.733 233.593,689.306 225.997,675.634 210.804,663.828 221.322,658.857\r\n\t\t249.372,658.236 272.745,664.449 280.927,664.449 303.131,664.449 328.841,650.78 \t"/>\r\n</g>\r\n<g id="zii">\r\n\t<polygon opacity="0" fill="#443619" points="834.299,654.508 837.221,661.343 850.076,656.373 862.933,658.858 865.27,665.693\r\n\t\t865.852,681.848 868.19,688.683 879.878,690.547 892.149,696.142 897.408,702.976 897.408,709.19 893.318,712.918 868.774,713.539\r\n\t\t860.012,709.19 848.907,698.627 840.727,704.219 831.962,713.539 836.636,718.51 844.817,718.51 848.907,722.86 835.465,736.529\r\n\t\t837.221,745.231 847.739,755.794 837.221,763.247 831.378,769.464 829.04,781.269 824.948,794.318 826.119,799.91 829.04,803.016\r\n\t\t837.803,804.883 854.75,803.016 862.933,812.961 877.541,819.174 886.89,828.494 886.304,833.465 876.37,838.436 861.178,842.786\r\n\t\t855.335,848.378 854.166,853.349 860.594,874.474 863.515,876.962 879.292,872.613 896.824,884.419 919.03,884.419\r\n\t\t925.455,891.253 926.042,897.467 921.949,903.68 917.859,903.68 873.448,907.409 868.19,916.729 867.021,929.156 864.099,932.884\r\n\t\t852.997,937.857 848.323,942.207 847.154,955.877 840.14,963.333 823.782,970.789 821.444,978.245 822.029,985.083\r\n\t\t827.869,988.808 835.465,990.675 851.829,987.568 863.515,987.568 876.37,996.267 837.221,1053.431 815.599,1067.725\r\n\t\t804.497,1053.431 802.159,1050.327 786.967,1043.492 768.851,1043.492 761.839,1050.946 752.49,1048.463 742.557,1024.228\r\n\t\t742.557,979.488 729.702,956.498 700.483,951.527 687.628,956.498 672.436,954.012 669.512,957.119 636.206,931.641\r\n\t\t622.182,907.409 616.924,880.069 622.182,859.562 592.382,840.922 601.731,799.91 625.104,765.114 625.104,738.393\r\n\t\t630.363,733.423 635.037,706.705 644.386,701.11 675.358,708.569 696.98,705.462 697.562,705.462 703.992,698.627 708.664,693.656\r\n\t\t711.588,690.547 726.196,685.576 739.051,693.656 743.725,693.032 746.647,692.414 753.077,673.149 758.336,671.285\r\n\t\t764.761,665.071 770.606,659.479 777.618,659.479 785.799,650.159 784.63,642.7 786.383,638.975 793.395,635.865 802.159,635.865\r\n\t\t825.532,643.943 \t"/>\r\n</g>\r\n<g id="zgg">\r\n\t<polygon opacity="0" fill="#443619" points="840.141,425.841 862.347,427.083 879.877,424.598 888.06,420.87 890.397,433.918\r\n\t\t887.473,463.746 885.136,478.658 889.81,496.056 890.397,523.398 888.642,525.883 889.226,550.116 876.955,571.245\r\n\t\t861.179,576.837 859.426,582.429 865.269,591.749 867.022,609.768 869.359,614.739 872.865,618.467 870.528,625.302\r\n\t\t858.255,637.732 850.077,656.372 837.222,661.343 834.3,654.508 825.533,643.945 802.158,635.868 793.396,635.868 786.384,638.974\r\n\t\t784.628,642.702 785.8,650.159 777.617,659.479 770.605,659.479 764.762,665.071 758.334,671.285 753.075,673.149 746.648,692.413\r\n\t\t743.724,693.034 739.052,693.656 726.194,685.578 711.586,690.549 708.665,693.656 683.539,637.11 662.501,598.584\r\n\t\t647.309,583.671 643.219,575.594 682.368,547.631 713.924,532.718 754.828,550.737 768.852,538.31 765.933,521.534\r\n\t\t730.287,486.736 725.61,483.008 739.052,469.338 740.802,466.852 742.557,464.988 745.479,463.124 752.491,456.908 765.933,443.86\r\n\t\t772.358,445.726 774.111,445.726 775.866,446.969 777.032,446.969 793.98,443.238 805.666,432.054 813.262,415.278 \t"/>\r\n</g>\r\n<g id="zff">\r\n\t<polygon opacity="0" fill="#443619" points="353.384,424.598 353.384,425.841 362.151,423.355 363.319,423.355 365.072,423.976\r\n\t\t359.227,429.569 361.564,431.433 369.747,431.433 377.927,429.569 382.017,433.297 383.186,440.753 381.433,446.969\r\n\t\t350.464,438.892 350.464,445.726 357.476,452.559 357.476,455.665 349.88,457.532 346.372,464.367 346.372,471.823\r\n\t\t347.543,474.309 355.139,475.551 358.642,483.007 362.735,484.25 360.98,486.736 361.564,501.027 386.108,509.726 452.14,533.961\r\n\t\t465.577,538.932 472.591,541.417 474.929,543.281 477.266,544.524 481.941,544.524 483.109,544.524 491.874,542.66\r\n\t\t496.549,542.038 498.301,543.902 498.301,545.766 498.886,547.63 500.639,548.873 502.392,549.494 504.729,549.494\r\n\t\t507.066,549.494 508.819,549.494 511.156,548.873 513.496,548.252 518.755,548.252 519.921,549.494 520.508,551.98\r\n\t\t519.921,555.087 519.337,557.572 518.171,560.681 516.415,565.031 515.247,568.135 512.909,572.487 512.325,574.972\r\n\t\t512.325,576.837 512.909,578.079 515.247,578.079 517,576.837 518.755,574.972 521.092,572.487 523.43,571.866 526.933,573.108\r\n\t\t531.026,576.837 531.026,578.079 533.363,578.698 534.529,578.698 535.7,577.455 535.7,574.972 535.7,572.487 534.529,569.378\r\n\t\t532.779,563.786 531.608,561.3 531.026,558.196 531.026,555.708 530.441,553.223 532.192,547.63 534.529,543.902 536.866,542.038\r\n\t\t558.489,543.902 561.41,546.388 563.163,547.009 563.163,548.252 563.163,550.116 566.085,550.737 568.422,551.359\r\n\t\t569.593,552.601 568.422,554.465 568.422,556.329 574.852,556.329 584.785,562.543 621.013,585.535 630.949,584.293\r\n\t\t643.219,575.594 647.31,583.671 662.502,598.584 683.537,637.107 708.666,693.656 696.979,705.461 675.357,708.568\r\n\t\t644.386,701.112 635.039,706.704 630.365,733.422 625.103,738.396 617.507,738.396 616.923,738.396 605.821,734.043\r\n\t\t592.963,709.811 590.626,702.976 589.46,698.626 578.942,694.898 539.206,700.49 520.508,698.626 520.508,690.549 517.584,685.578\r\n\t\t504.145,683.093 463.824,694.898 447.463,689.306 438.699,694.277 435.777,701.112 434.024,710.432 429.35,712.918\r\n\t\t421.169,711.675 380.849,684.954 369.747,674.391 367.994,663.207 369.747,657.615 376.172,636.489 366.238,620.952\r\n\t\t353.384,608.525 346.956,608.525 347.543,625.926 342.281,627.787 335.27,611.011 325.334,601.069 308.391,581.807\r\n\t\t306.638,575.594 308.391,558.196 311.897,554.465 320.662,550.737 325.334,544.524 323.583,536.446 318.324,535.203\r\n\t\t307.804,533.961 306.054,528.369 311.897,510.968 310.142,504.755 311.897,497.301 315.4,491.706 316.571,482.386 317.156,455.047\r\n\t\t314.819,450.697 307.222,446.345 296.118,440.753 287.937,441.996 282.094,445.726 278.588,450.697 273.914,453.183\r\n\t\t272.745,446.345 272.745,440.132 276.835,423.976 276.835,423.355 279.757,414.035 280.926,412.792 283.847,409.685\r\n\t\t283.847,402.229 296.118,389.802 300.793,392.906 307.222,392.906 322.999,412.792 325.921,412.792 326.505,412.792\r\n\t\t331.179,407.821 336.438,407.821 339.944,411.549 337.023,411.549 332.348,415.899 333.517,417.763 336.438,422.734\r\n\t\t342.868,422.734 343.45,428.326 \t"/>\r\n</g>\r\n<g id="zee">\r\n\t<polygon opacity="0" fill="#443619" points="266.901,388.559 276.834,409.063 280.927,412.791 279.756,414.034 276.834,423.354\r\n\t\t272.744,440.133 272.744,446.347 273.915,453.182 278.59,450.696 282.093,445.726 287.939,441.997 296.119,440.755\r\n\t\t307.224,446.347 314.82,450.696 317.157,455.046 316.57,482.385 315.402,491.708 311.896,497.3 310.143,504.756 311.896,510.97\r\n\t\t306.053,528.368 307.806,533.962 318.323,535.205 323.582,536.448 325.335,544.525 320.661,550.739 311.896,554.467\r\n\t\t308.39,558.195 306.637,575.593 308.39,581.806 325.335,601.068 335.269,611.012 342.283,627.789 347.542,625.925 346.957,608.524\r\n\t\t353.382,608.524 366.24,620.954 376.173,636.488 369.746,657.614 328.841,650.779 303.131,664.449 280.927,664.449\r\n\t\t272.744,664.449 249.371,658.238 221.322,658.857 210.804,663.83 183.925,641.459 140.684,617.847 105.04,596.1 89.845,575.593\r\n\t\t87.508,557.574 78.743,547.011 61.798,544.525 37.839,535.824 29.074,527.125 27.321,512.834 40.176,514.698 44.851,514.698\r\n\t\t47.19,512.834 47.19,501.028 49.528,497.921 54.202,502.271 61.214,502.271 64.136,499.164 70.561,499.164 80.496,488.601\r\n\t\t85.171,489.844 87.508,487.359 87.508,483.006 92.77,464.366 92.183,402.228 103.869,390.423 113.221,386.073 127.244,386.073\r\n\t\t148.866,394.772 159.966,405.956 179.251,405.956 183.925,400.986 192.106,371.161 210.222,345.061 225.996,339.469\r\n\t\t251.709,352.518 258.723,361.838 \t"/>\r\n</g>\r\n<g id="zdd">\r\n\t<polygon opacity="0" fill="#443619" points="40.176,514.698 37.839,514.698 27.321,512.834 26.737,502.89 22.062,478.036\r\n\t\t5.701,461.881 -49.811,414.655 -59.163,400.986 -59.163,391.665 -52.148,380.481 -45.139,373.646 -39.878,361.217 -43.968,352.518\r\n\t\t-65.59,330.771 -66.759,318.962 -62.082,307.778 -40.462,305.914 -31.113,295.972 -8.325,267.39 56.539,235.699 74.069,235.699\r\n\t\t99.779,235.699 112.636,236.941 112.636,246.262 119.648,255.584 123.154,257.446 148.28,254.961 176.914,265.523 197.365,261.795\r\n\t\t203.208,269.876 203.792,288.516 204.377,303.429 213.141,318.341 218.4,332.013 225.996,339.469 210.222,345.062 192.106,371.161\r\n\t\t183.926,400.986 179.251,405.957 159.966,405.957 148.866,394.772 127.244,386.073 113.221,386.073 103.869,390.423\r\n\t\t92.183,402.228 92.77,464.366 87.508,483.007 87.508,487.356 85.171,489.842 80.496,488.599 70.561,499.164 64.136,499.164\r\n\t\t61.214,502.271 54.202,502.271 49.528,497.922 47.19,501.028 47.19,512.834 44.851,514.698 \t"/>\r\n</g>\r\n<g id="zbb">\r\n\t<polygon opacity="0" fill="#443619" points="362.735,387.316 362.15,388.559 352.217,408.442 346.958,411.548 339.946,411.548\r\n\t\t336.438,407.82 331.179,407.82 326.504,412.791 325.92,412.791 322.999,412.791 307.222,392.908 300.794,392.908 296.12,389.801\r\n\t\t283.849,402.228 283.849,409.684 280.925,412.791 276.835,409.063 266.902,388.559 258.721,361.838 251.707,352.518\r\n\t\t225.997,339.469 218.401,332.013 213.142,318.341 204.377,303.428 203.793,288.516 203.209,269.875 197.365,261.798\r\n\t\t176.914,265.526 148.28,254.96 123.155,257.446 119.646,255.584 112.635,246.264 112.635,236.941 113.221,233.834 120.817,226.378\r\n\t\t123.737,219.543 123.737,217.058 123.737,215.194 132.504,215.194 176.914,208.359 187.43,181.638 189.769,166.105 178.08,153.056\r\n\t\t185.677,140.008 197.365,131.928 199.703,118.879 190.351,102.724 173.406,108.317 161.722,95.889 185.677,84.705 190.351,74.761\r\n\t\t202.04,55.499 211.389,53.014 246.448,94.647 313.65,121.986 315.402,141.872 315.987,172.318 333.516,189.716 327.089,266.766\r\n\t\t323.583,289.137 331.763,313.37 333.516,317.722 334.101,319.586 331.763,322.071 330.013,322.693 328.257,325.178\r\n\t\t328.257,328.906 330.013,332.634 332.35,334.498 337.022,335.12 341.112,337.605 342.283,341.333 341.697,345.061 341.697,346.304\r\n\t\t341.697,350.032 339.946,354.382 339.359,358.11 339.946,363.081 342.868,364.326 349.88,366.187 351.63,367.43 356.305,370.539\r\n\t\t360.397,371.161 365.072,371.782 367.409,370.539 367.409,375.508 363.901,381.724 363.319,384.209 \t"/>\r\n</g>\r\n<g id="zcc">\r\n\t<polygon opacity="0" fill="#443619" points="521.093,100.238 509.988,108.937 502.392,156.783 493.625,187.853 479.604,205.872\r\n\t\t467.915,212.086 462.072,228.241 442.787,231.969 442.205,231.969 434.025,245.02 431.687,260.554 426.429,262.418\r\n\t\t422.336,263.661 418.832,266.146 416.495,267.389 412.403,269.874 408.312,271.738 404.806,272.36 397.795,277.33 391.952,280.437\r\n\t\t390.783,281.68 387.861,284.168 386.108,286.029 382.602,289.136 377.344,289.76 374.42,292.864 369.16,294.731 365.073,294.731\r\n\t\t362.149,294.731 352.215,294.731 349.294,295.974 346.372,299.08 344.035,301.566 342.866,304.673 341.113,308.401 339.36,310.886\r\n\t\t338.189,313.371 337.023,317.721 334.102,319.585 333.517,317.721 331.764,313.371 323.581,289.136 327.09,266.767\r\n\t\t333.517,189.717 315.985,172.317 315.401,141.871 313.648,121.985 322.997,89.054 314.819,85.325 317.156,74.762 321.246,43.692\r\n\t\t339.36,36.236 397.21,18.217 457.397,33.129 487.2,38.721 515.247,57.365 539.788,83.461 \t"/>\r\n</g>\r\n<g id="krc_1_">\r\n\t<polygon opacity="0" fill="#443619" points="836.052,162.377 836.636,217.058 791.641,220.165 793.981,245.641 793.981,259.934\r\n\t\t800.406,261.177 812.677,261.177 817.351,272.983 813.848,285.409 803.914,297.837 786.385,300.943 794.563,305.914\r\n\t\t787.551,313.37 788.722,327.043 768.85,329.528 765.931,336.363 753.658,339.469 736.129,356.246 714.509,360.595 713.925,382.343\r\n\t\t698.732,382.343 691.721,346.926 680.032,345.062 668.346,343.819 660.165,328.285 653.738,318.341 639.127,315.237\r\n\t\t623.351,317.722 611.08,307.778 605.819,287.273 591.797,275.468 578.356,271.118 571.344,276.089 556.736,272.361 542.126,271.74\r\n\t\t535.701,264.281 535.114,254.961 535.701,236.32 543.881,209.602 549.14,203.386 573.097,214.573 580.109,211.466 556.152,176.668\r\n\t\t571.931,164.862 590.044,168.59 601.147,164.241 601.731,136.28 629.194,124.472 619.845,107.695 616.923,91.54 617.507,73.518\r\n\t\t628.028,67.305 636.79,71.033 642.636,65.441 646.141,61.091 663.671,72.276 691.134,76.625 711.587,80.353 729.701,89.055\r\n\t\t757.167,107.695 785.798,123.229 803.33,138.142 818.522,140.006 837.805,121.986 846.57,128.821 833.715,148.086 \t"/>\r\n</g>\r\n<g id="zkms">\r\n\t<polygon opacity="0" fill="#443619" points="816.183,345.682 803.329,361.839 798.07,389.179 788.137,398.499 776.448,396.637\r\n\t\t766.514,381.723 764.761,371.16 755.996,377.373 751.322,383.587 754.243,396.637 765.932,410.929 771.773,415.899 782.878,411.55\r\n\t\t803.913,406.576 813.262,415.278 805.666,432.054 793.98,443.239 777.032,446.967 775.866,446.967 772.357,445.724 765.932,443.86\r\n\t\t752.491,456.909 742.557,465.61 739.051,469.338 725.61,483.008 730.286,486.736 765.932,521.534 768.851,538.311 754.828,550.738\r\n\t\t713.923,532.718 682.368,547.631 643.218,575.594 630.948,584.291 621.012,585.533 584.784,562.543 574.851,556.33 568.423,556.33\r\n\t\t568.423,554.466 569.592,552.602 568.423,551.359 566.086,550.738 563.164,550.116 563.164,548.252 563.164,547.01\r\n\t\t561.411,546.388 558.49,543.903 536.868,542.039 534.53,543.903 532.193,547.631 530.44,553.223 531.024,555.708 531.024,558.194\r\n\t\t531.609,561.3 532.778,563.786 534.53,569.378 535.699,572.485 535.699,574.97 535.699,577.456 534.53,578.698 533.362,578.698\r\n\t\t531.024,578.08 531.024,576.837 526.934,573.109 523.429,571.866 521.091,572.485 518.754,574.97 517.001,576.837 515.248,578.08\r\n\t\t512.911,578.08 512.326,576.837 512.326,574.97 512.911,572.485 515.248,568.135 516.414,565.029 518.17,560.679 519.338,557.572\r\n\t\t519.922,555.087 520.507,551.98 519.922,549.495 518.754,548.252 513.495,548.252 511.155,548.874 508.818,549.495\r\n\t\t507.068,549.495 504.73,549.495 502.393,549.495 500.64,548.874 498.885,547.631 498.303,545.767 498.303,543.903 496.547,542.039\r\n\t\t491.873,542.66 483.111,544.524 481.94,545.145 481.94,544.524 477.265,544.524 474.928,543.281 472.59,541.417 465.578,538.932\r\n\t\t452.139,533.961 386.109,509.726 361.565,501.027 360.981,486.736 362.734,484.251 358.644,483.008 355.138,475.552\r\n\t\t347.542,474.309 346.373,471.823 346.373,464.367 349.879,457.532 357.475,455.666 357.475,452.559 350.463,445.724\r\n\t\t350.463,438.889 381.432,446.967 383.187,440.753 382.016,433.297 377.929,429.569 369.746,431.433 361.565,431.433\r\n\t\t359.228,429.569 365.071,423.977 362.15,423.356 353.385,425.841 353.385,424.598 343.449,428.326 342.867,422.734 336.44,422.734\r\n\t\t333.516,417.763 332.349,415.899 337.024,411.55 339.946,411.55 346.957,411.55 352.216,408.443 362.15,388.557 362.734,387.315\r\n\t\t363.903,381.723 367.408,375.509 367.408,370.538 365.071,371.781 360.397,371.16 356.306,370.538 351.632,367.431\r\n\t\t349.879,366.189 342.867,364.325 339.946,363.082 339.361,358.111 339.946,354.383 341.699,350.034 341.699,346.306\r\n\t\t341.699,345.063 342.283,341.335 341.112,337.604 337.024,335.119 332.349,334.5 330.012,332.633 328.257,328.905 328.257,325.177\r\n\t\t330.012,322.692 331.765,322.07 334.102,319.585 337.024,317.721 338.19,313.371 339.361,310.886 341.112,308.401 342.867,304.673\r\n\t\t344.036,301.566 346.373,299.08 349.295,295.973 352.216,294.731 362.15,294.731 365.071,294.731 369.161,294.731 374.42,292.864\r\n\t\t377.342,289.76 382.601,289.139 386.109,286.029 387.862,284.168 390.784,281.68 391.95,280.437 397.795,277.33 404.807,272.36\r\n\t\t408.313,271.738 412.403,269.874 416.493,267.389 418.831,266.146 422.337,263.661 426.427,262.418 431.688,260.554\r\n\t\t434.025,245.02 442.206,231.972 442.788,231.972 462.073,228.244 467.913,212.086 479.602,205.872 493.626,187.853\r\n\t\t502.393,156.783 509.989,108.939 521.091,100.238 539.789,83.461 566.67,80.354 570.761,94.645 556.153,139.385 539.789,157.405\r\n\t\t517.001,158.026 526.35,173.56 525.766,213.95 522.26,240.671 494.21,248.748 491.288,253.719 493.044,261.175 513.495,258.69\r\n\t\t533.362,262.418 535.699,264.282 542.127,271.738 556.737,272.36 571.345,276.09 578.357,271.117 591.796,275.466 605.82,287.272\r\n\t\t611.078,307.779 623.349,317.721 639.128,315.235 653.739,318.342 668.346,343.82 691.719,346.924 698.731,382.344\r\n\t\t713.923,382.344 714.51,360.597 736.13,356.247 753.659,339.468 765.932,336.361 768.851,329.527 788.721,327.041 787.552,313.371\r\n\t\t794.564,305.915 786.383,300.944 803.913,297.838 820.858,297.216 823.78,327.663 \t"/>\r\n</g>\r\n</svg>\r\n';
    }
}(),
window.gettext = function(t) {
    return t
}
,
window.Reuters = window.Reuters || {},
window.Reuters.Graphics = window.Reuters.Graphics || {},
window.Reuters.Graphics.Model = window.Reuters.Graphics.Model || {},
window.Reuters.Graphics.View = window.Reuters.Graphics.View || {},
window.Reuters.Graphics.Collection = window.Reuters.Graphics.Collection || {},
window.Reuters.LANGUAGE = "en",
window.Reuters.BASE_STATIC_URL = window.reuters_base_static_url || "",
Reuters.addCommas = function(t) {
    return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
,
Reuters.getJsonFromUrl = function(t) {
    var n = void 0;
    if (t) {
        var i = location.href.indexOf("?");
        if (i == -1)
            return [];
        n = location.href.substr(i + 1)
    } else
        n = location.search.substr(1);
    var e = {};
    return n.split("&").forEach(function(t) {
        if (t) {
            t = t.split("+").join(" ");
            var n = t.indexOf("=")
              , i = n > -1 ? t.substr(0, n) : t
              , a = n > -1 ? decodeURIComponent(t.substr(n + 1)) : "";
            "false" == a ? a = !1 : "true" == a && (a = !0);
            var s = i.indexOf("[");
            if (s == -1)
                e[decodeURIComponent(i)] = a;
            else {
                var o = i.indexOf("]")
                  , l = decodeURIComponent(i.substring(s + 1, o));
                i = decodeURIComponent(i.substring(0, s)),
                e[i] || (e[i] = []),
                l ? e[i][l] = a : e[i].push(a)
            }
        }
    }),
    e
}
,
Reuters.trackEvent = function(t, n, i) {
    t = t || "Page click";
    var e = n;
    i && (e += ": " + i);
    var a = {
        nonInteraction: !1,
        page: PAGE_TO_TRACK
    };
    ga("send", "event", "Default", t, e, a)
}
,
Reuters.generateSliders = function() {
    $("[data-slider]").each(function() {
        var t = $(this)
          , n = function(t) {
            if (!t)
                return [0];
            var n = []
              , i = t.split(",");
            return i.forEach(function(t) {
                n.push(parseFloat(t))
            }),
            n
        }
          , i = void 0
          , e = n(t.attr("data-start"))
          , a = n(t.attr("data-min"))
          , s = n(t.attr("data-max"))
          , o = t.attr("data-orientation") || "horizontal"
          , l = t.attr("data-step") ? parseFloat(t.attr("data-step")) : 1
          , r = "true" === t.attr("data-tooltips")
          , p = !!t.attr("data-connect") && t.attr("data-connect")
          , g = "true" === t.attr("data-snap")
          , d = t.attr("data-pip-mode")
          , c = t.attr("data-pip-values") ? n(t.attr("data-pip-values")) : void 0
          , m = "true" === t.attr("data-pip-stepped")
          , f = t.attr("data-pip-density") ? parseFloat(t.attr("data-pip-density")) : 1;
        if ("count" === d && (c = c[0]),
        d && (i = {
            mode: d,
            values: c,
            stepped: m,
            density: f
        }),
        p) {
            var h = [];
            p.split(",").forEach(function(t) {
                t = "true" === t,
                h.push(t)
            }),
            p = h
        }
        noUiSlider.create(this, {
            start: e,
            range: {
                min: a,
                max: s
            },
            snap: g,
            orientation: o,
            step: l,
            tooltips: r,
            connect: p,
            pips: i
        }),
        $(this).find("div.noUi-marker-large:last").addClass("last"),
        $(this).find("div.noUi-marker-large:first").addClass("first")
    })
}
,
Reuters.getRealImageSize = function(t, n) {
    var i = $(t)
      , e = void 0
      , a = void 0;
    if ("image" === n) {
        if (void 0 == i.prop("naturalWidth")) {
            var s = $("<img/>").attr("src", i.attr("src"));
            i.prop("naturalWidth", s[0].width),
            i.prop("naturalHeight", s[0].height)
        }
        e = i.prop("naturalWidth"),
        a = i.prop("naturalHeight")
    } else
        "video" === n && (e = i.prop("videoWidth"),
        a = i.prop("videoHeight"));
    return {
        width: e,
        height: a
    }
}
,
Reuters.autoCropMedia = function(t, n, i) {
    var e = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3]
      , a = t.find("img:first")
      , s = "image";
    a.length || (a = t.find("video:first"),
    s = "video");
    var o = t.find(".caption-container")
      , l = window.innerHeight
      , r = window.innerWidth
      , p = r
      , g = l;
    n && n.length && (g -= n.outerHeight()),
    i && (g -= i),
    o.length && (g -= o.outerHeight());
    var d = g
      , c = Reuters.getRealImageSize(a, s)
      , m = c.width / c.height;
    if (0 == c.width)
        return void _.delay(function() {
            Reuters.autoCropMedia(t, n, i, e)
        }, 800);
    if (e) {
        var f = function() {
            Reuters.autoCropMedia(t, n, i, !1)
        };
        $(window).on("resize", f)
    }
    var h = (r - g * m) / 2
      , x = 0;
    return g < 400 || r < 768 ? (t.css({
        height: "auto",
        width: "100%"
    }),
    void a.css({
        width: "100%",
        height: "auto",
        "margin-top": 0,
        "margin-left": 0
    })) : (t.height(g),
    h > 0 ? (h = 0,
    p = r,
    g = p / m,
    x = (d - g) / 2) : p = g * m,
    a.height(g),
    a.width(p),
    void a.css({
        "margin-left": h + "px",
        "margin-top": x + "px",
        opacity: 1
    }))
}
,
Reuters.centerFullSizeMedia = function(t, n, i) {
    var e = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3]
      , a = Reuters.getRealImageSize(n, i);
    if (0 == a.width)
        return void _.delay(function() {
            Reuters.centerFullSizeMedia(t, n, i, e)
        }, 800);
    if (e) {
        var s = function() {
            Reuters.centerFullSizeMedia(t, n, i, !1)
        };
        $(window).on("resize", s)
    }
    var o = n.parent();
    o.removeClass("wide tall");
    var l = a.width / a.height;
    t.width() / t.height() < l ? o.addClass("wide") : o.addClass("tall")
}
,
Reuters.popupGallery = function() {
    var t = this
      , n = function() {
        var t = $(".popup-gallery .media-item.selected");
        if (t.length) {
            var n = t.find("img:first")
              , i = "image";
            n.length || (n = t.find("video:first"),
            i = "video"),
            Reuters.centerFullSizeMedia(t.find(".media-container"), n, i, !1)
        }
    }
      , i = function() {
        $item = $(".popup-gallery .media-item.selected"),
        l.find(".next, .prev, .page-button").prop("disabled", !1),
        $item.next().length || l.find(".next").prop("disabled", !0),
        $item.prev().length || l.find(".prev").prop("disabled", !0)
    }
      , e = function(t) {
        t = t.split("/")[t.split("/").length - 1],
        console.log(t),
        l.children().find(".selected").removeClass("selected");
        var e = l.find('img[src*="' + t + '"], video[src*="' + t + '"]').parents(".media-item");
        e.addClass("selected"),
        n(),
        i(e)
    }
      , a = ""
      , s = $(".popup-gallery-item");
    s.each(function(t) {
        var n = $(this);
        n.on("click", function() {
            $(".popup-gallery").addClass("show-gallery");
            var t = n.find("img").prop("src");
            t || (t = n.find("video").prop("src")),
            e(t)
        }),
        n = n.clone(),
        n.find(".caption").append('<span class="count">' + (t + 1) + " / " + s.length + "</span>"),
        a += $("<div />").append(n.clone()).html()
    });
    var o = '\n        <div class="popup-gallery">\n            <div class="controls hidden-lg-up">\n                <div class="btn-group flex-row d-flex justify-content-end" role="group">\n                    <button type="button" class="btn btn-primary prev">\n                        <i class="fa fa-arrow-left"></i>\n                    </button>\n                    <button type="button" class="btn btn-primary next">\n                        <i class="fa fa-arrow-right"></i>\n                    </button>\n                    <button type="button" class="btn btn-primary close-button">\n                        <i class="fa fa-times"></i>\n                    </button>\n                </div>\n            </div>\n            <div class="row">\n                <div class="media-items-container">\n                    ' + a + '\n                </div>\n                <div class="controls hidden-md-down">\n                    <div class="btn-group-vertical col-12" role="group">\n                        <button type="button" class="btn btn-primary close-button">\n                            <i class="fa fa-times"></i>\n                        </button>\n                        <button type="button" class="btn btn-primary next">\n                            <i class="fa fa-arrow-right"></i>\n                        </button>\n                        <button type="button" class="btn btn-primary prev">\n                            <i class="fa fa-arrow-left"></i>\n                        </button>\n                    </div>\n                    \n                </div>\n            </div>\n        </div>\n    '
      , l = $(o);
    $("body").append(l),
    l.find(".close-button").on("click", function() {
        l.removeClass("show-gallery")
    }),
    l.find(".prev").on("click", function() {
        var t = l.children().find(".selected")
          , e = t.prev();
        e.length && (e.addClass("selected"),
        t.removeClass("selected"),
        n(),
        i(e))
    }),
    l.find(".next").on("click", function() {
        var t = l.children().find(".selected")
          , e = t.next();
        e.length && (e.addClass("selected"),
        t.removeClass("selected"),
        n(),
        i(e))
    }),
    l.find(".page-button").on("click", function() {
        var n = $(t)
          , i = n.attr("data-id");
        n.addClass("selected").siblings.removeClass("selected"),
        e(i)
    }),
    window.$gallery = l,
    $(window).on("resize", n),
    l.find(".media-item:first").addClass("selected"),
    i()
}
,
Reuters.enableTooltips = function() {
    $('[data-toggle="tooltip"]').tooltip()
}
,
Reuters.initAds = function() {
    var t = $("iframe.lazy-ad");
    t.prop("src", t.attr("data-src"))
}
,
Reuters.initStatTracking = function() {
    var t = $("article[id], section[id]")
      , n = [];
    _.each(t, function(t) {
        try {
            $(t.tagName.toLowerCase() + "#" + t.id),
            n.push(t.tagName.toLowerCase() + "#" + t.id)
        } catch (i) {}
    });
    var i = {
        elements: n
    }
      , e = {
        reportInterval: 20,
        idleTimeout: 60,
        nonInteraction: !1
    };
    try {
        void 0 !== PAGE_TO_TRACK && (i.page = PAGE_TO_TRACK,
        e.page = PAGE_TO_TRACK)
    } catch (a) {}
    try {
        $.scrollDepth(i),
        riveted.init(e)
    } catch (a) {
        console.log("scrolldepth or rivited undefined")
    }
    $(".social.navbar-nav a, .share.share-in-article a").on("click", function() {
        var t = $(this)
          , n = t.attr("data-id");
        Reuters.trackEvent("Article Event", "Share Clicked", n)
    })
}
,
Reuters.hasPym = !1;
try {
    Reuters.pymChild = new pym.Child({
        polling: 500
    }),
    Reuters.pymChild.id && (Reuters.hasPym = !0,
    $("body").addClass("pym"))
} catch (err) {}
Reuters.Graphics.Parameters = Reuters.getJsonFromUrl(),
Reuters.Graphics.Parameters.media && $("html").addClass("media-flat"),
Reuters.Graphics.Parameters.eikon && $("html").addClass("eikon"),
"no" == Reuters.Graphics.Parameters.header && $("html").addClass("remove-header"),
$(document).ready(function() {
    $("body").css({
        visibility: "visible"
    })
}),
$(".main").html(Reuters.Graphics.Template.featureLayout()),
$("#bangladesh").html(Reuters.Graphics.Template.bangladesh()),
$("#map1").html(Reuters.Graphics.Template.map1()),
$("#map2").html(Reuters.Graphics.Template.map2()),
$("#map3").html(Reuters.Graphics.Template.map3()),
$("#locator").html(Reuters.Graphics.Template.locator()),
$("#footprint").html(Reuters.Graphics.Template.footprintnew()),
$("#kutupalong1").html(Reuters.Graphics.Template.kutu1()),
$("#kutupalong2").html(Reuters.Graphics.Template.kutu2()),
$("#kutubase").html(Reuters.Graphics.Template.kutubase()),
$("#latrineall").html(Reuters.Graphics.Template.lactrineall()),
$("#selflatrine").html(Reuters.Graphics.Template.selflactrine()),
$("#fiftybuffer").html(Reuters.Graphics.Template.fiftybuffer()),
$("#sixbuffer").html(Reuters.Graphics.Template.sixbuffer()),
$("#open").html(Reuters.Graphics.Template.open()),
$("#openwater").html(Reuters.Graphics.Template.openwater()),
$("#wateronly").html(Reuters.Graphics.Template.wateronly()),
$("#campspace").html(Reuters.Graphics.Template.spaceperperson()),
$(".nyc").html(Reuters.Graphics.Template.nyc()),
$(".london").html(Reuters.Graphics.Template.london()),
$(".hk").html(Reuters.Graphics.Template.hongkong()),
$(".areabb").html(Reuters.Graphics.Template.areabb()),
$("#example").html(Reuters.Graphics.Template.example()),
$(".areaff2").html(Reuters.Graphics.Template.ff2()),
$("#diseasechart").html(Reuters.Graphics.Template.diseasechart()),
$("#diseasechartsm").html(Reuters.Graphics.Template.diseasechartsm()),
$("#deathchartsm").html(Reuters.Graphics.Template.deathchart()),
$("#waterchart").html(Reuters.Graphics.Template.waterchart()),
$("#closeness").html(Reuters.Graphics.Template.closness()),
$("#latrinechartsm").html(Reuters.Graphics.Template.latrinechartsm());
var winW = $(window).width()
  , winH = $(window).height();
$(".pg-header,.mapsections,.satemap").css("height", winH + "px");
var isSafari = /constructor/i.test(window.HTMLElement) || function(t) {
    return "[object SafariRemoteNotification]" === t.toString()
}(!window.safari || "undefined" != typeof safari && safari.pushNotification)
  , triggerH = 58 / winH
  , stayput = 2 * winH + 100
  , mapH = 3 * winH + 100
  , kutuslides = 9
  , stayputkutu = winH * (kutuslides - 1)
  , mapHkutu = winH * kutuslides
  , sceneduration = "100%";
winW < 600 ? $("#thevideo source").attr("src", "") : $("#thevideosm source").attr("src", "");
var before = $(window).width()
  , beforeH = $(window).height();
if ($(window).resize(function() {
    var t = $(this).width()
      , n = $(this).height()
      , i = Math.abs(t - before)
      , e = Math.abs(n - beforeH);
    i >= 100 && location.reload(),
    e >= 200 && location.reload()
}),
winW < 575 || winH < 500) {
    $(".pg-header,.mapsections,.satemap").css("height", winH + 60 + "px"),
    $(".mapsections").css("height", "1300px");
    var stayput = 4200 - winH
      , mapH = 4200
      , triggerH = .07
      , mapHkutu = 1300 * kutuslides + 200
      , stayputkutu = 1300 * kutuslides - winH + 200
      , sceneduration = "1300px"
}
$(".bigmapstuff").css("height", mapH + "px"),
$(".kutumapstuff").css("height", mapHkutu + "px");
var controller = new ScrollMagic.Controller
  , areapin = new ScrollMagic.Scene({
    triggerElement: "#areamap",
    triggerHook: triggerH,
    duration: stayput
}).setPin("#areamaps", {
    pushFollowers: !1
}).addTo(controller);
areapin.on("enter", function() {
    $(".credit").fadeIn(200)
}),
areapin.on("leave", function() {
    $(".credit").fadeOut(200)
});
var expansion = new ScrollMagic.Scene({
    triggerElement: ".maps2",
    triggerHook: .5,
    duration: sceneduration
}).addTo(controller);
expansion.on("enter", function() {
    $("#map2").fadeIn(500)
}),
expansion.on("leave", function() {
    $("#map2").fadeOut(500)
});
var roadaccess = new ScrollMagic.Scene({
    triggerElement: ".maps3",
    triggerHook: .5,
    duration: "300%"
}).addTo(controller);
roadaccess.on("enter", function() {
    $("#map3").fadeIn(500)
}),
roadaccess.on("leave", function() {
    $("#map3").fadeOut(500)
});
var kutupalongpin = new ScrollMagic.Scene({
    triggerElement: "#kutupalongmap",
    triggerHook: triggerH,
    duration: stayputkutu
}).setPin("#kutumaps", {
    pushFollowers: !1
}).addTo(controller);
kutupalongpin.on("enter", function() {
    $(".credit2").fadeIn(300)
}),
kutupalongpin.on("leave", function() {
    $(".credit2").fadeOut(300)
});
var kutu2 = new ScrollMagic.Scene({
    triggerElement: ".kutupalongs2",
    triggerHook: .5,
    duration: sceneduration
}).addTo(controller);
kutu2.on("enter", function() {
    $("#kutupalong2").fadeIn(500),
    $(".credit2").fadeOut(300)
}),
kutu2.on("leave", function() {
    var t = controller.info("scrollDirection");
    "REVERSE" == t && ($("#kutupalong2").fadeOut(500),
    $(".credit2").fadeIn(300))
});
var kutu3 = new ScrollMagic.Scene({
    triggerElement: ".kutupalongs3",
    triggerHook: .5,
    duration: sceneduration
}).addTo(controller);
kutu3.on("enter", function() {
    $("#kutubase").fadeIn(500),
    $("#latrineall").fadeIn(500)
}),
kutu3.on("leave", function() {
    $("#latrineall").fadeOut(500);
    var t = controller.info("scrollDirection");
    "REVERSE" == t && ($("#kutupalong2").fadeIn(500),
    $("#kutubase").fadeOut(500))
});
var kutu6 = new ScrollMagic.Scene({
    triggerElement: ".kutupalongs4",
    triggerHook: .5,
    duration: sceneduration
}).addTo(controller);
kutu6.on("enter", function() {
    $("#selflatrine").fadeIn(500)
}),
kutu6.on("leave", function() {
    $("#selflatrine").fadeOut(500);
    var t = controller.info("scrollDirection");
    "REVERSE" == t && $("#locallatrine").fadeIn(500)
});
var kutu8 = new ScrollMagic.Scene({
    triggerElement: ".kutupalongs5",
    triggerHook: .5,
    duration: sceneduration
}).addTo(controller);
kutu8.on("enter", function() {
    $("#fiftybuffer").fadeIn(500)
}),
kutu8.on("leave", function() {
    $("#fiftybuffer").fadeOut(500);
    var t = controller.info("scrollDirection");
    "REVERSE" == t && $("#otherlatrine").fadeIn(500)
});
var kutu9 = new ScrollMagic.Scene({
    triggerElement: ".kutupalongs6",
    triggerHook: .5,
    duration: sceneduration
}).addTo(controller);
kutu9.on("enter", function() {
    $("#sixbuffer").fadeIn(500)
}),
kutu9.on("leave", function() {
    $("#sixbuffer").fadeOut(500);
    var t = controller.info("scrollDirection");
    "REVERSE" == t && $("#fiftybuffer").fadeIn(500)
});
var kutu10 = new ScrollMagic.Scene({
    triggerElement: ".kutupalongs7",
    triggerHook: .5,
    duration: sceneduration
}).addTo(controller);
kutu10.on("enter", function() {
    $("#open").fadeIn(500)
}),
kutu10.on("leave", function() {
    $("#open").fadeOut(500);
    var t = controller.info("scrollDirection");
    "REVERSE" == t && $("#sixbuffer").fadeIn(500)
});
var kutux = new ScrollMagic.Scene({
    triggerElement: ".kutupalongs8",
    triggerHook: .5,
    duration: sceneduration
}).addTo(controller);
kutux.on("enter", function() {
    $("#wateronly").fadeIn(500)
}),
kutux.on("leave", function() {
    $("#wateronly").fadeOut(500);
    var t = controller.info("scrollDirection");
    "REVERSE" == t && $("#open").fadeIn(500)
});
var kutu11 = new ScrollMagic.Scene({
    triggerElement: ".kutupalongs9",
    triggerHook: .5,
    duration: "300%"
}).addTo(controller);
kutu11.on("enter", function() {
    $("#openwater").fadeIn(500)
}),
kutu11.on("leave", function() {
    $("#openwater").fadeOut(500);
    var t = controller.info("scrollDirection");
    "REVERSE" == t && $("#wateronly").fadeIn(500)
}),
Reuters.Graphics.lactrinechart = new Reuters.Graphics.ScatterPlot({
    el: "#latrinechart",
    dataURL: "//d3sl9l9bcxfb5q.cloudfront.net/json/persons-per-lactrine",
    xvalue: "share",
    yvalue: "y",
    hardRadius: 6,
    yticks: 1,
    xticks: 3,
    height: 20,
    margin: {
        left: 5,
        right: 10,
        top: 50,
        bottom: 60
    },
    xvalues: [0, 50, 100, 150],
    yvalues: [0, 1],
    tooltipTemplate: Reuters.Graphics.Template.scattertooltip
}),
Reuters.Graphics.lactrinechart.on("renderChart:end", function(t) {
    var n = this;
    n.svg.selectAll(".scatter-dot").attr("id", function(t) {
        return t.id
    }),
    n.hakim = n.svg.append("text").attr("x", n.x(115)).attr("y", -20).text("Balukhali").attr("text-anchor", "middle").attr("class", "graphic-chart-subhead").style("font-weight", 700),
    n.otherzones = n.svg.append("text").attr("x", n.x(50)).attr("y", -5).text("Other zones").attr("text-anchor", "middle").attr("class", "graphic-chart-subhead"),
    n.label = n.svg.append("text").attr("x", n.x(115)).attr("y", -5).text("115 per latrine").attr("text-anchor", "middle").attr("class", "graphic-chart-subhead"),
    n.labelline2 = n.svg.append("line").attr("x1", n.x(57)).attr("x2", n.x(57)).attr("y1", 0).attr("y2", 17).style("stroke", "#555"),
    n.labelline = n.svg.append("line").attr("x1", n.x(115)).attr("x2", n.x(115)).attr("y1", 0).attr("y2", 20).style("stroke", "#c6590e"),
    n.line = n.svg.append("line").attr("x1", n.x(20)).attr("x2", n.x(20)).attr("y1", 5).attr("y2", 35).style("stroke", "black").style("stroke-width", "2px"),
    n.explain = n.svg.append("text").attr("x", n.x(0)).attr("y", 50).text("U.N. guideline").attr("text-anchor", "start").attr("class", "graphic-chart-subhead"),
    n.explain2 = n.svg.append("text").attr("x", n.x(0)).attr("y", 67).text("20 people per latrine").attr("text-anchor", "start").attr("class", "graphic-chart-subhead")
}),
Reuters.Graphics.deathchart = new Reuters.Graphics.ScatterPlot({
    el: "#deathchart",
    dataURL: "//d3sl9l9bcxfb5q.cloudfront.net/json/rohingya-disease-deaths",
    xvalue: "date",
    yvalue: "number",
    rvalue: "size",
    radiusModifier: 4,
    xticks: 5,
    height: 150,
    margin: {
        left: 30,
        right: 50,
        top: 50,
        bottom: 50
    },
    yvalues: [0, 5, 10, 15],
    dateFormat: d3.time.format("%b %d, %Y"),
    tooltipTemplate: Reuters.Graphics.Template.scattertooltip2
}),
Reuters.Graphics.deathchart.on("renderChart:end", function(t) {
    var n = this;
    n.svg.selectAll(".scatter-dot").attr("class", function(t) {
        return t.disease
    });
    var i = ($("#diseasechartari-bar,#diseasechartunfev-bar,#diseasechartawd-bar,#diseasechartskin-bar,#diseasechartinjury-bar,#diseasechartmalaria-bar,#diseasecharteyes-bar,#diseasechartothers-bar"),
    [{
        selector: "#aribar",
        others: "#awdbar,#skinbar,#feverbar,#otherbar",
        dotclass: ".awd,.other,.inj,.nds,.cvd,.unk,.smn"
    }, {
        selector: "#awdbar",
        others: "#skinbar,#aribar,#feverbar,#otherbar",
        dotclass: ".ari,.other,.inj,.nds,.cvd,.unk,.smn"
    }, {
        selector: "#skinbar",
        others: "#awdbar,#aribar,#feverbar,#otherbar",
        dotclass: ""
    }, {
        selector: "#feverbar",
        others: "#awdbar,#skinbar,#aribar,#otherbar",
        dotclass: ""
    }, {
        selector: "#otherbar",
        others: "#awdbar,#skinbar,#feverbar,#aribar",
        dotclass: ".awd,.other,.ari,.nds,.cvd,.unk,.smn"
    }]);
    $.each(i, function(t) {
        $(i[t].selector).on("mouseenter", function() {
            $(i[t].others).css("opacity", .3),
            $(i[t].dotclass).css("opacity", .3)
        }),
        $(i[t].selector).on("mouseleave", function() {
            $(i[t].others).css("opacity", 1),
            $(i[t].dotclass).css("opacity", 1)
        })
    });
    var e = [{
        txt: "#aritxt",
        chart: "#aribar"
    }, {
        txt: "#diarr",
        chart: "#awdbar"
    }, {
        txt: "#skin",
        chart: "#skinbar"
    }];
    $.each(e, function(t) {
        $(e[t].txt).on("mouseenter", function() {
            $(e[t].chart).mouseenter()
        }),
        $(e[t].txt).on("mouseleave", function() {
            $(e[t].chart).mouseleave()
        })
    })
}),
Reuters.Graphics.deathchart.on("update:end", function(t) {
    var n = this;
    n.yAxis.orient("left").tickSize(5),
    n.xAxis.orient("bottom").tickSize(5),
    n.svg.selectAll(".x.axis").transition().attr("transform", "translate(0," + 1.05 * n.height + ")").call(n.xAxis),
    n.svg.selectAll(".y.axis").transition().call(n.yAxis)
});
