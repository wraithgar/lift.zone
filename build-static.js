'use strict';

const Jade = require('jade');
const Fs = require('fs');
const Path = require('path');
const log = require('debug')('lift.zone');

//This is a little hard coded but whatever
//[jade, html]
const pages = [
    ['pages/static.jade', 'index.html'],
    ['pages/utils.jade', 'utils.html'],
    ['pages/parser.jade', 'utils/parser.html'],
    ['pages/fitocracy.jade', 'utils/fitocracy.html'],
    ['pages/about.jade', 'about.html'],
    ['pages/login.jade', 'login.html'],
    ['pages/signup.jade', 'signup.html'],
    ['pages/privacy.jade', 'privacy.html'],
    ['pages/recover.jade', 'recover.html']
];

const bodyJade = Fs.readFileSync('./client/templates/body.jade').toString();
const indexJade = Fs.readFileSync('./client/templates/index.jade').toString();

pages.forEach((page) => {

    log('building %s to %s', page[0], page[1]);
    const pageHtml = Jade.renderFile(Path.join('./client/templates/', page[0]));
    //replace body page w/ html
    const pageBodyJade = bodyJade.replace('block page', pageHtml);
    const pageBodyHtml = Jade.render(pageBodyJade);
    const pageIndexHtml = Jade.render(indexJade.replace('block body', pageBodyHtml));
    Fs.writeFileSync('./public/' + page[1], pageIndexHtml);
});
