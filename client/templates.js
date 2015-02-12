(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof root === 'undefined' || root !== Object(root)) {
        throw new Error('templatizer: window does not exist or is not an object');
    } else {
        root.templatizer = factory();
    }
}(this, function () {
    var jade=function(){function e(e){return null!=e&&""!==e}function n(t){return(Array.isArray(t)?t.map(n):t&&"object"==typeof t?Object.keys(t).filter(function(e){return t[e]}):[t]).filter(e).join(" ")}var t={};return t.merge=function r(n,t){if(1===arguments.length){for(var a=n[0],i=1;i<n.length;i++)a=r(a,n[i]);return a}var o=n["class"],s=t["class"];(o||s)&&(o=o||[],s=s||[],Array.isArray(o)||(o=[o]),Array.isArray(s)||(s=[s]),n["class"]=o.concat(s).filter(e));for(var l in t)"class"!=l&&(n[l]=t[l]);return n},t.joinClasses=n,t.cls=function(e,r){for(var a=[],i=0;i<e.length;i++)a.push(r&&r[i]?t.escape(n([e[i]])):n(e[i]));var o=n(a);return o.length?' class="'+o+'"':""},t.style=function(e){return e&&"object"==typeof e?Object.keys(e).map(function(n){return n+":"+e[n]}).join(";"):e},t.attr=function(e,n,r,a){return"style"===e&&(n=t.style(n)),"boolean"==typeof n||null==n?n?" "+(a?e:e+'="'+e+'"'):"":0==e.indexOf("data")&&"string"!=typeof n?(-1!==JSON.stringify(n).indexOf("&")&&console.warn("Since Jade 2.0.0, ampersands (`&`) in data attributes will be escaped to `&amp;`"),n&&"function"==typeof n.toISOString&&console.warn("Jade will eliminate the double quotes around dates in ISO form after 2.0.0")," "+e+"='"+JSON.stringify(n).replace(/'/g,"&apos;")+"'"):r?(n&&"function"==typeof n.toISOString&&console.warn("Jade will stringify dates in ISO form after 2.0.0")," "+e+'="'+t.escape(n)+'"'):(n&&"function"==typeof n.toISOString&&console.warn("Jade will stringify dates in ISO form after 2.0.0")," "+e+'="'+n+'"')},t.attrs=function(e,r){var a=[],i=Object.keys(e);if(i.length)for(var o=0;o<i.length;++o){var s=i[o],l=e[s];"class"==s?(l=n(l))&&a.push(" "+s+'="'+l+'"'):a.push(t.attr(s,l,!1,r))}return a.join("")},t.escape=function(e){var n=String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");return n===""+e?e:n},t.rethrow=function a(e,n,t,r){if(!(e instanceof Error))throw e;if(!("undefined"==typeof window&&n||r))throw e.message+=" on line "+t,e;try{r=r||require("fs").readFileSync(n,"utf8")}catch(i){a(e,null,t)}var o=3,s=r.split("\n"),l=Math.max(t-o,0),f=Math.min(s.length,t+o),o=s.slice(l,f).map(function(e,n){var r=n+l+1;return(r==t?"  > ":"    ")+r+"| "+e}).join("\n");throw e.path=n,e.message=(n||"Jade")+":"+t+"\n"+o+"\n\n"+e.message,e},t}();

    var templatizer = {};
    templatizer["includes"] = {};
    templatizer["pages"] = {};

    // body.jade compiled template
    templatizer["body"] = function tmpl_body() {
        return '<div><div class="contain-to-grid"><nav data-topbar="data-topbar" role="navigation" class="top-bar"><ul class="title-area"><li class="name"><h1><a href="/">lift.zone</a></h1></li><li menu-icon="menu-icon" class="toggle-topbar"><a href="#">Menu</a></li></ul><section class="top-bar-section"><ul class="right"><li><a href="/fitocracy">Fitocracy</a></li><li><a href="/531">531</a></li><li><a href="/about">About</a></li><li data-hook="me"></li></ul></section></nav></div><div data-hook="page-container"></div></div>';
    };

    // includes/bbcode.jade compiled template
    templatizer["includes"]["bbcode"] = function tmpl_includes_bbcode() {
        return '<div class="section"><div class="row"><div class="col-md-12"><br/><span>[b]</span><span data-hook="name"></span><span>[/b]</span></div></div><div class="row"><div class="col-md-12"><span>[list]</span><span data-hook="sets"></span><span>[/list]</span></div></div><div class="row"><div class="col-md-12"><span data-hook="commentLabel">[i]Comments[/i]&nbsp;</span><span data-hook="comment"></span></div></div></div>';
    };

    // includes/bbcodeCredits.jade compiled template
    templatizer["includes"]["bbcodeCredits"] = function tmpl_includes_bbcodeCredits() {
        return '<div class="section"><br/>[sub][url=http://lift.zone]lift.zone[/url][/sub]</div>';
    };

    // includes/bbcodeRep.jade compiled template
    templatizer["includes"]["bbcodeRep"] = function tmpl_includes_bbcodeRep() {
        return '<div class="rep"><span>[*]</span><span data-hook="pr">[b]</span><span data-hook="rep"></span><span data-hook="pr">[/b]</span></div>';
    };

    // includes/bbcodeRepGroup.jade compiled template
    templatizer["includes"]["bbcodeRepGroup"] = function tmpl_includes_bbcodeRepGroup() {
        return '<div><span>[*]</span><span data-hook="repGroup"></span></div>';
    };

    // includes/bbcodeRepItem.jade compiled template
    templatizer["includes"]["bbcodeRepItem"] = function tmpl_includes_bbcodeRepItem() {
        return '<span class="rep"><span data-hook="pr">[b]</span><span data-hook="rep"></span><span class="repsep">, </span><span data-hook="pr">[/b]</span></span>';
    };

    // includes/lift531.jade compiled template
    templatizer["includes"]["lift531"] = function tmpl_includes_lift531() {
        return '<table class="table"><tr><th data-hook="name"></th><th>Weight</th><th>Reps</th></tr><tr><td>Warmup</td><td data-hook="warmup_1"></td><td>5</td></tr><tr><td></td><td data-hook="warmup_2"></td><td>5</td></tr><tr><td></td><td data-hook="warmup_3"></td><td>3</td></tr><tr><td>Wave 1</td><td data-hook="wave1_1"></td><td>5</td></tr><tr><td></td><td data-hook="wave1_2"></td><td>5</td></tr><tr><td></td><td data-hook="wave1_3"></td><td>5+</td></tr><tr><td>Wave 2</td><td data-hook="wave2_1"></td><td>3</td></tr><tr><td></td><td data-hook="wave2_2"></td><td>3</td></tr><tr><td></td><td data-hook="wave2_3"></td><td>3+</td></tr><tr><td>Wave 3</td><td data-hook="wave3_1"></td><td>5</td></tr><tr><td></td><td data-hook="wave3_2"></td><td>3</td></tr><tr><td></td><td data-hook="wave3_3"></td><td>1+</td></tr></table>';
    };

    // includes/markdown.jade compiled template
    templatizer["includes"]["markdown"] = function tmpl_includes_markdown() {
        return '<div class="section"><div class="row"><div class="col-md-12"><br/>###<span data-hook="name"></span></div></div><div class="row"><div data-hook="sets" class="col-md-12"></div></div><div class="row"><div class="col-md-12"><span data-hook="commentLabel">*Comments:*&nbsp;</span><span data-hook="comment"></span></div></div></div>';
    };

    // includes/markdownCredits.jade compiled template
    templatizer["includes"]["markdownCredits"] = function tmpl_includes_markdownCredits() {
        return '<div class="section"><br/>&lt;sub&gt;[lift.zone](http://lift.zone)&lt;/sub&gt;</div>';
    };

    // includes/markdownRep.jade compiled template
    templatizer["includes"]["markdownRep"] = function tmpl_includes_markdownRep() {
        return '<div>&gt;<span data-hook="pr">**</span><span data-hook="rep"></span><span data-hook="pr">**</span></div>';
    };

    // includes/markdownRepGroup.jade compiled template
    templatizer["includes"]["markdownRepGroup"] = function tmpl_includes_markdownRepGroup() {
        return '<div>&gt;<span data-hook="repGroup"></span></div>';
    };

    // includes/markdownRepItem.jade compiled template
    templatizer["includes"]["markdownRepItem"] = function tmpl_includes_markdownRepItem() {
        return '<span class="rep"><span data-hook="pr">**</span><span data-hook="rep"></span><span class="repsep">, </span><span data-hook="pr">**</span></span>';
    };

    // includes/me.jade compiled template
    templatizer["includes"]["me"] = function tmpl_includes_me() {
        return '<a href="/login" class="button"></a>';
    };

    // pages/about.jade compiled template
    templatizer["pages"]["about"] = function tmpl_pages_about() {
        return '<section><div class="row"><div class="small-12 columns"><h1>What the heck even is this?</h1></div></div><hr/><div class="row panel"><p>I like to log my workouts in more than one place, and they all take different formats. One takes bbcode, the next markdown.  Typing them up even once in any of those formats is a chore, let alone more than one.</p><p>This little utility site is an attempt to solve that problem: I can type my workout in what feels to my like natural typing, and it easily converts to the formats I need.</p><p>There is also a function to translate the workouts as they print out on Fitocracy, since that\'s a common thing people seem to want.</p><p>If you find something that\'s not working, or have a different format you would like to see hit me up on <a href="https://github.com/wraithgar/lift.zone">github</a></p><p>I also added a 531 calculator that auto-saves cause I wanted that too.</p><p>Feedback is welcome, you can also email me <a href="mailto:gar+lifts@danger.computer">here</a></p><p>Powered with love from:</p><p class="text-center"><a href="http://danger.computer"><img src="http://danger.computer/danger-computer.png"/><br/>The Danger Computer</a></p></div></section>';
    };

    // pages/fitocracy.jade compiled template
    templatizer["pages"]["fitocracy"] = function tmpl_pages_fitocracy() {
        return '<section><row><div class="small-6 columns"><form role="form"><div class="form-group"><label class="radio">Format</label><input type="radio" name="format" value="md" data-hook="format"/> Markdown <input type="radio" name="format" value="mdFull" data-hook="format"/> Markdown Long<br/><input type="radio" name="format" value="bb" data-hook="format"/> BBCode <input type="radio" name="format" value="bbFull" data-hook="format"/> BBCode Long</div><div class="form-group"><label>Workout</label><textarea data-hook="raw" rows="50" placeholder="Paste fitocracy workout here" title="fitocracy workout" id="rawInput" class="form-control"></textarea></div></form></div><div class="small-6 columns"><h1>Workout Log from Fitocracy</h1><div data-hook="formatted" class="workout"></div><div data-hook="credits" class="credits"></div><div class="instructions"><ol><li>Copy your workout on fitocracy</li><li>Paste your workout in the box</li><li>Select an output format</li><li>Copy and paste it wherever</li><li>Have a great day</li></ol></div></div></row></section>';
    };

    // pages/home.jade compiled template
    templatizer["pages"]["home"] = function tmpl_pages_home() {
        return '<section><row><div class="small-6 columns"><form role="form"><div class="form-group"><label class="radio">Format</label><input type="radio" name="format" value="md" data-hook="format"/> Markdown <input type="radio" name="format" value="mdFull" data-hook="format"/> Markdown Long<br/><input type="radio" name="format" value="bb" data-hook="format"/> BBCode <input type="radio" name="format" value="bbFull" data-hook="format"/> BBCode Long</div><div class="form-group"><label>Workout</label><textarea data-hook="raw" rows="50" placeholder="Squat 255x5x4 315x1*" title="workout" id="rawInput" class="form-control"></textarea></div></form></div><div class="small-6 columns"><h1>Workout Log</h1><div data-hook="formatted" class="workout"></div><div data-hook="credits" class="credits"></div><div class="instructions"><ol><li>Type your workout in the box</li><li>Select an output format</li><li>Copy and paste it wherever</li><li>Have a great day</li></ol></div></div></row></section>';
    };

    // pages/wendler531.jade compiled template
    templatizer["pages"]["wendler531"] = function tmpl_pages_wendler531(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        buf.push('<section><div class="row"><div class="small-12 columns"><h1>531 Calculator</h1></div><hr/></div><div class="row"><div class="small-8 columns"><div data-hook="results" class="workout"></div></div><div class="small-4 columns"><form role="form" class="form-horizontal"><div class="row"><label class="small-3 columns">OHP</label><div class="small-3 columns"><input type="number" step="5" data-hook="ohp-weight" placeholder="weight" title="weight"' + jade.attr("value", locals.model.ohp.weight, true, false) + ' class="form-control"/></div><div class="small-3 columns"><input type="number" data-hook="ohp-reps" placeholder="reps" title="reps"' + jade.attr("value", locals.model.ohp.reps, true, false) + ' class="form-control"/></div><div class="small-3 columns"><input type="number" step="5" data-hook="ohp-extra" placeholder="+" title="extra"' + jade.attr("value", locals.model.ohp.extra, true, false) + ' class="form-control"/></div></div><div class="row"><label class="small-3 columns">Squat</label><div class="small-3 columns"><input type="number" step="5" data-hook="squat-weight" placeholder="weight" title="weight"' + jade.attr("value", locals.model.squat.weight, true, false) + ' class="form-control"/></div><div class="small-3 columns"><input type="number" data-hook="squat-reps" placeholder="reps" title="reps"' + jade.attr("value", locals.model.squat.reps, true, false) + ' class="form-control"/></div><div class="small-3 columns"><input type="number" step="5" data-hook="squat-extra" placeholder="+" title="extra"' + jade.attr("value", locals.model.squat.extra, true, false) + ' class="form-control"/></div></div><div class="row"><label class="small-3 columns">Bench</label><div class="small-3 columns"><input type="number" step="5" data-hook="bench-weight" placeholder="weight" title="weight"' + jade.attr("value", locals.model.bench.weight, true, false) + ' class="form-control"/></div><div class="small-3 columns"><input type="number" data-hook="bench-reps" placeholder="reps" title="reps"' + jade.attr("value", locals.model.bench.reps, true, false) + ' class="form-control"/></div><div class="small-3 columns"><input type="number" step="5" data-hook="bench-extra" placeholder="+" title="extra"' + jade.attr("value", locals.model.bench.extra, true, false) + ' class="form-control"/></div></div><div class="row"><label class="small-3 columns">Deadlift</label><div class="small-3 columns"><input type="number" step="5" data-hook="deadlift-weight" placeholder="weight" title="weight"' + jade.attr("value", locals.model.deadlift.weight, true, false) + ' class="form-control"/></div><div class="small-3 columns"><input type="number" data-hook="deadlift-reps" placeholder="reps" title="reps"' + jade.attr("value", locals.model.deadlift.reps, true, false) + ' class="form-control"/></div><div class="small-3 columns"><input type="number" step="5" data-hook="deadlift-extra" placeholder="+" title="extra"' + jade.attr("value", locals.model.deadlift.extra, true, false) + ' class="form-control"/></div></div></form></div></div></section>');
        return buf.join("");
    };

    return templatizer;
}));