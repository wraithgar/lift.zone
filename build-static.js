'use strict';

const Jade = require('jade');
const Fs = require('fs');
const Path = require('path');
const log = require('debug')('lift.zone');

//This is a little hard coded but whatever
//[jade, html]
const pages = [
    ['pages/static.jade', 'index.html']
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
