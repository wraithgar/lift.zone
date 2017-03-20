#!/usr/bin/env node
'use strict';

var Pug = require('pug');
var Fs = require('fs');
var Path = require('path');
var ChildProcess = require('child_process');
var log = require('debug')('lift.zone');
var Config = require('../configs/production.js');

//This is a little hard coded but whatever
//[pug, html]
var pages = [
    ['pages/static.pug', 'index.html'],
    ['pages/about.pug', 'about'],
    ['pages/privacy.pug', 'privacy'],
    ['pages/tools.pug', 'tools'],
    ['pages/login.pug', 'login'],
    ['pages/news.pug', 'news'],
    ['pages/old-news.pug', 'old-news']
];

var bodyPug = Fs.readFileSync('./client/templates/body.pug').toString();
var indexPug = Fs.readFileSync('./client/templates/index.pug').toString();

ChildProcess.execSync('mkdir -p production');
ChildProcess.execSync('mkdir -p production-assets');
ChildProcess.execSync('rsync -a --delete assets/ production-assets/');
ChildProcess.execSync('rsync -a --delete public/ production/');

pages.forEach((page) => {

    log('building %s to %s', page[0], page[1]);
    var pageHtml = Pug.renderFile(Path.join('./client/templates/', page[0]), { assetsUrl: Config.ASSETSURL });
    //replace body page w/ html
    var pageBodyPug = bodyPug.replace('block page', pageHtml);
    var pageBodyHtml = Pug.render(pageBodyPug, { assetsUrl: Config.ASSETSURL });
    var pageIndexHtml = Pug.render(indexPug.replace('block body', pageBodyHtml), { assetsUrl: Config.ASSETSURL });
    Fs.writeFileSync(Path.join('./production', page[1]), pageIndexHtml);
});
