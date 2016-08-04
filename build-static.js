'use strict';

var Jade = require('jade');
var Fs = require('fs');
var Path = require('path');
var log = require('debug')('lift.zone');

//This is a little hard coded but whatever
//[jade, html]
var pages = [
    ['pages/static.jade', 'index.html']
];

var bodyJade = Fs.readFileSync('./client/templates/body.jade').toString();
var indexJade = Fs.readFileSync('./client/templates/index.jade').toString();

pages.forEach((page) => {

    log('building %s to %s', page[0], page[1]);
    var pageHtml = Jade.renderFile(Path.join('./client/templates/', page[0]));
    //replace body page w/ html
    var pageBodyJade = bodyJade.replace('block page', pageHtml);
    var pageBodyHtml = Jade.render(pageBodyJade);
    var pageIndexHtml = Jade.render(indexJade.replace('block body', pageBodyHtml));
    Fs.writeFileSync('./public/' + page[1], pageIndexHtml);
});
