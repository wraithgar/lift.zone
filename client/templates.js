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
        return '<div><div class="contain-to-grid"><nav data-topbar="data-topbar" role="navigation" class="top-bar"><ul class="title-area"><li class="name"><h1><a href="/">lift.zone</a></h1></li><li class="toggle-topbar menu-icon"><a href="#">Menu</a></li></ul><section class="top-bar-section"><ul data-hook="menu" class="right"><li><a href="/log">Log</a></li><li><a href="/utils">Utils</a></li><li><a href="/login" data-hook="name" class="button"></a></li><li data-hook="logout"><a href="/logout">Logout</a></li></ul></section></nav></div><div data-hook="page-container"></div><div class="row"><hr/><div class="left"><dl class="sub-nav"><dd><a href="/privacy">Privacy</a></dd><dd><a href="/about">About</a></dd><dd><a href="/">lift.zone</a></dd><dd><a href="//accounts.lift.zone">Accounts</a></dd><dd><a href="https://twitter.com/wraithgar"><i class="fa fa-twitter"></i></a></dd></dl></div><div class="right"><dl class="sub-nav"><dd>© 2015 Michael Garvin</dd></dl></div></div></div>';
    };

    // includes/activity.jade compiled template
    templatizer["includes"]["activity"] = function tmpl_includes_activity() {
        return '<div class="row"><h6><span data-hook="name"></span><span>&#xa0;</span><span data-hook="new" class="circle alert-bg-color"><i class="fa fa-question"></i></span></h6><ul data-hook="sets" class="no-bullet"></ul><button data-hook="comment" class="label secondary radius"></button><br/><div data-hook="chooseAlias" data-reveal="data-reveal" class="reveal-modal"><ul class="pricing-table"><li class="title">New activity</li><li class="description">This is the first time you\'ve done this activity.</li><li class="bullet-item cta-button"><div class="row"><div class="small-12 medium-6 medium-centered columns"><div class="text-left">I meant what I typed</div><br/><ul data-hook="newActivity" class="stack button-group"></ul><br/></div></div></li><li class="bullet-item cta-button"><div class="row"><div class="small-12 medium-6 medium-centered columns"><div class="text-left">I really meant</div><br/><ul data-hook="suggestions" class="stack button-group"></ul><br/></div></div></li><li class="bullet-item cta-button"><div class="row"><div class="small-12 medium-6 medium-centered columns"><div class="text-left">No, let me go back and edit that</div><br/><ul class="stack button-group"><li class="text-left"><a href="#" data-hook="close" class="dismiss-reveal-modal button tiny radius"><i class="fa fa-arrow-left"></i></a></li></ul><br/></div></div></li></ul></div></div>';
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

    // includes/set.jade compiled template
    templatizer["includes"]["set"] = function tmpl_includes_set() {
        return '<li data-hook="set"></li>';
    };

    // includes/suggestion.jade compiled template
    templatizer["includes"]["suggestion"] = function tmpl_includes_suggestion() {
        return '<li><a href="#" data-hook="name" class="button tiny radius"></a></li>';
    };

    // pages/about.jade compiled template
    templatizer["pages"]["about"] = function tmpl_pages_about() {
        return '<section><div class="row"><div class="small-12 columns"><h1>What the heck even is this?</h1></div></div><hr/><div class="row panel"><p>I like to log my workouts in more than one place, and they all take different formats. One takes bbcode, the next markdown.  Typing them up even once in any of those formats is a chore, let alone more than one.</p><p>This little utility site is an attempt to solve that problem: I can type my workout in what feels to my like natural typing, and it easily converts to the formats I need.</p><p>There is also a function to translate the workouts as they print out on Fitocracy, since that\'s a common thing people seem to want.</p><p>If you find something that\'s not working, or have a different format you would like to see hit me up on <a href="https://github.com/wraithgar/lift.zone">github</a></p><p>I also added a 531 calculator that auto-saves cause I wanted that too.</p><p>Feedback is welcome, you can also email me <a href="mailto:gar+code@danger.computer">here</a></p><p>Powered with love from:</p><p class="text-center"><a href="http://danger.computer"><img src="/img/danger-computer.png"/><br/>The Danger Computer</a></p></div></section>';
    };

    // pages/fitocracy.jade compiled template
    templatizer["pages"]["fitocracy"] = function tmpl_pages_fitocracy() {
        return '<section><div class="row"><div class="small-12 columns"><h1>Workout Log from Fitocracy</h1></div></div><hr/><div class="row"><p>Copy your workout from fitocracy and paste it into the box, then select a format</p></div><div class="row"><div class="small-6 columns"><form role="form"><div class="form-group"><label class="radio">Format</label><input type="radio" name="format" value="md" data-hook="format"/> Markdown <input type="radio" name="format" value="mdFull" data-hook="format"/> Markdown Long<br/><input type="radio" name="format" value="bb" data-hook="format"/> BBCode <input type="radio" name="format" value="bbFull" data-hook="format"/> BBCode Long</div><div class="form-group"><label>Workout</label><textarea data-hook="raw" rows="50" placeholder="Paste fitocracy workout here" title="fitocracy workout" id="rawInput" class="form-control"></textarea></div></form></div><div class="small-6 columns"><div data-hook="formatted"></div><div data-hook="credits"></div></div></div></section>';
    };

    // pages/home.jade compiled template
    templatizer["pages"]["home"] = function tmpl_pages_home() {
        return '<section><div class="row"><div class="small-12 columns"><h1>Welcome to the lift zone</h1></div></div><hr/><div class="row panel"><p>Coming soon: the ability to actually log your workouts instead of just parse them!</p></div></section>';
    };

    // pages/log.jade compiled template
    templatizer["pages"]["log"] = function tmpl_pages_log() {
        return '<section><div class="row"><div class="small-12 columns"><h5>Enter your workout in the box below.  You can start with a workout name, date, or just start typing your activities!</h5><!--h5//small If you want to manually set the name and date, turn smart mode off--></div></div><hr/><form><div class="row"><div class="small-12 medium-6 columns"><div class="row"><div class="small-12 columns"><label data-hook="nameLabel">Name&#xa0;<input id="workoutName" data-hook="nameInput" placeholder="name your workout" name="name"/></label><label data-hook="dateLabel">Date&#xa0;<input data-hook="dateInput" placeholder="Dec 12, 2014"/></label><textarea data-hook="workoutInput" rows="5" placeholder="Enter your workout here." title="Workout" id="rawInput"></textarea><br/></div></div></div><div data-hook="workout" class="small-12 medium-6 columns"><h3 data-hook="workoutName">Workout Name</h3><h4 data-hook="workoutDate">Workout Date</h4><input value="Save" data-hook="saveWorkout" class="radius button"/><hr/><p data-hook="workoutActivities"></p></div></div></form></section>';
    };

    // pages/me.jade compiled template
    templatizer["pages"]["me"] = function tmpl_pages_me(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(accountsUrl) {
            buf.push('<section><div class="row"><div class="small-12 columns"><h1>Settings for&#xao;<span data-hook="name"></span></h1></div></div><hr/><div data-hook="invalid" class="row error"><div class="alert-box alert round">Your email is not validated! You will not be able to send invites or recover from a lost password.  You should go validate your email now.</div></div><div class="row panel"><span>To change your account settings (name, password, email)&#xao;</span><span data-hook="invalid">or to validate your email&#xao;</span><span>please go to&#xao;</span><a' + jade.attr("href", "" + accountsUrl + "/me", true, false) + ' target="_blank">the accounts server</a><!-- Preferred date format--><!-- Time zone?--></div></section>');
        }).call(this, "accountsUrl" in locals_for_with ? locals_for_with.accountsUrl : typeof accountsUrl !== "undefined" ? accountsUrl : undefined);
        return buf.join("");
    };

    // pages/notFound.jade compiled template
    templatizer["pages"]["notFound"] = function tmpl_pages_notFound() {
        return '<section><div class="row"><div class="small-12 columns"><h1>Page not found</h1></div></div><hr/><div class="row panel"><P>Hmm not sure how you got here.  Try one of those links up above?</P></div></section>';
    };

    // pages/parser.jade compiled template
    templatizer["pages"]["parser"] = function tmpl_pages_parser() {
        return '<section><div class="row"><div class="small-12 columns"><h1>Workout Parser</h1></div></div><hr/><div class="row"><p>Type your workout in the box, then select a format</p></div><div class="row"><div class="small-6 columns"><form role="form"><div class="form-group"><label class="radio">Format</label><input type="radio" name="format" value="md" data-hook="format"/> Markdown <input type="radio" name="format" value="mdFull" data-hook="format"/> Markdown Long<br/><input type="radio" name="format" value="bb" data-hook="format"/> BBCode <input type="radio" name="format" value="bbFull" data-hook="format"/> BBCode Long</div><div class="form-group"><label>Workout</label><textarea data-hook="raw" rows="50" placeholder="Squat 255x5x4 315x1*" title="workout" id="rawInput" class="form-control"></textarea></div></form></div><div class="small-6 columns"><div data-hook="formatted"></div><div data-hook="credits"></div></div></div></section>';
    };

    // pages/privacy.jade compiled template
    templatizer["pages"]["privacy"] = function tmpl_pages_privacy() {
        return '<section><div class="row"><div class="small-12 columns"><h1>Security and Privacy</h1></div></div><hr/><div class="row panel"><article><p>Your privacy and security is very important here at lift.zone. We\'re going to do everything we can to make sure that your information stays safe and private. The legalese below basically says that we do actually collect your personal information, that we\'ll be very careful with it and that if somebody tries to mess with us or you, we can do what we need to to stop them and make sure it doesn\'t happen again.</p></article><h2>PRIVACY POLICY</h2><article><p>We embrace the privacy guidelines as developed by the Online Privacy Alliance (OPA) and the Federal Trade Commission (FTC), and this privacy policy adheres to the principles addressed in those guidelines. To view these guidelines, please visit the web sites of the corresponding organization,&#xa0;<a href="http://www.privacyalliance.org/resources/ppguidelines.shtml">http://www.privacyalliance.org/resources/ppguidelines.shtml</a> and&#xa0;<a href="http://www.ftc.gov/reports/privacy-online-fair-information-practices-electronic-marketplace-federal-trade-commission">http://www.ftc.gov/reports/privacy-online-fair-information-practices-electronic-marketplace-federal-trade-commission</a>.</p></article><h3>Collection and use of non-personal information</h3><article><p>We collect non-personally-identifiable (anonymous) information about you, such as the server your computer is logged into or your browser type. Other examples of non-personally-identifiable information include:</p><ol><li>Your IP address (a unique number that is automatically assigned to your computer whenever you are surfing the Web; many Web servers automatically identify your computer by its IP address).</li><li>Your "top level" domain (i.e., .com, .net, .edu, etc.).</li><li>Standard information included with every communication sent on the Internet, such as browser type, operating system, browser language, service provider, and local time.</li></ol><p>We collect data from the Web logs of the servers -- the computers that "serve up" Web pages -- delivering content on lift.zone. This includes information about what you view and, along with information gathered from our other users, we create "aggregate data" reports that we may disclose to third parties. We may also study aggregate data in order to enhance our existing services or develop new services.</p><p>We will not disclose any personal information to a third party without your express prior written authorization, as described under \'Collection of personal information\' below. We can and will use IP addresses to identify a user when we feel it is necessary to enforce compliance with our or terms of use or to protect our service, site, customers, or others.</p></article><h3>Use of cookies</h3><article><p>We use cookies on lift.zone. Cookies are used for record keeping, to track your movements when you visit lift.zone and to help us determine what type of information to present to you, to collect additional website usage data and to improve our services. The use of cookies is an industry standard - you\'ll find them used at most websites. The first time you visit lift.zone, it assigns you a unique identifier, which is stored in the cookie on your computer.</p></article><h3>Collection of personal information</h3><article><p>You must register in order to use many features of lift.zone. We will, and you expressly authorize us to, use the information you provide for the purposes listed in your Registration, including to:</p><ol><li>provide and administer lift.zone.</li></ol><p>We do not share this information with other users of lift.zone nor with outside parties. We never use or share the personally identifiable information provided to us in ways unrelated to the ones described above without also providing you an opportunity to opt-out or otherwise prohibit such unrelated uses.</p></article><h3>How You Can Access Or Correct Your Information</h3><article><p>You can access all your personally identifiable information that we collect online and maintain by logging in and editing your information through our Profile function. We use this procedure to better safeguard your information. To protect your privacy and security, we will also take reasonable steps to verify your identity before granting access or making corrections. You may remove yourself from our database at any time by selecting the Delete function or by contacting us and requesting to be removed.</p></article><h3> Retention of information</h3><article><p>Any information we collect may be retained for an indeterminate period of time.</p></article><h3>Confidentiality and Security</h3><article><p>We have implemented generally accepted standards of technology security in order to protect information from loss, misuse and unauthorized access, disclosure, alteration or destruction. Only our operators have access to the information we collect, and these operators are made aware of and required to comply with our privacy policy.</p></article><h3>Links to Other Sites</h3><article><p>lift.zone may provide links to an external Web site. When you click on such a link, you will leave lift.zone. The privacy policy of the external website will then be in effect, not our policy. We do not control or make an endorsement of any kind regarding the external site or its privacy policy. Our policy does not extend to anything that is inherent in the operation of the Internet, and therefore beyond our control, and is not to be applied in any manner contrary to applicable law or governmental regulation. We do not control cookies from the other sites that you may link to from lift.zone.</p></article><h3>Children</h3><article><p>lift.zone is not a commercial website or an online service directed to children under 13 years of age and our content and other services are not written, intended, or designed for children under the age of 13.</p></article><h3>Changes to this privacy policy</h3><article><p>All versions of this privacy policy are dated with the effective date (the date on which the policy was posted to lift.zone) in source control. We will only use the information we learn about you in the manner described in the Privacy Policy in effect when the information was collected from you. However, we reserve the right to change the terms of this Privacy Policy at any time by posting revisions to lift.zone.</p></article><h3>Changes in corporate structure</h3><article><p>If lift.zone is sold, merged or otherwise transferred to another entity, the personal information you have provided to lift.zone may be transferred as part of that transaction. However, we will take steps to assure that any personal information is used in a manner consistent with the Best Practical privacy policy under which it was collected.</p></article><h3>Effect of Legal Obligations upon this Privacy Policy</h3><article><p>We may disclose user information in special cases when we have reason to believe that disclosing this information is necessary to identify, contact or bring legal action against someone who may be causing injury to or interference with (either intentionally or unintentionally) our rights or property, other users, or anyone else that could be harmed by such activities. We may disclose user information when we believe in good faith that the law requires it.</p></article><h3>Effect of Privacy Policy</h3><article><p>This privacy policy is not intended to and does not create any contractual or legal rights in or on behalf of any party. As noted above, we may revise this privacy policy from time to time in our sole discretion.</p></article><h3>Security issues</h3><article><p>If you are a lift.zone user and have a concern regarding the security of your account, please contact us via email at gar+security@danger.computer.</p></article><article><p>If you have found a security vulnerability in lift.zone or have a security incident to report, please email gar+security@danger.computer. Please include a detailed summary of the issue you\'ve discovered. It\'d be helpful if you can also include an email address where we can reach you if we need more information.</p></article><h3>Effective Date</h3><article><p>This privacy policy is effective February 12, 2015</p></article></div></section>';
    };

    // pages/utils.jade compiled template
    templatizer["pages"]["utils"] = function tmpl_pages_utils() {
        return '<section><div class="row"><div class="small-12 columns"><h1>Utils</h1><p>These utils don\'t need a login, they\'re just a few utility functions</p></div></div><hr/><div class="row panel"><ul><li><a href="/utils/parser">Workout Parser</a></li><li><a href="/utils/fitocracy">Fitocracy Parser</a></li><li><a href="/utils/531">531 Calculator</a></li></ul></div></section>';
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