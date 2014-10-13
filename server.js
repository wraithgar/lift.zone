var hapi = require('hapi');
var moonboots = require('moonboots_hapi');
var config = require('getconfig');
var templatizer = require('templatizer');
var Good = require('good');
var ElectricFence = require('electricfence');
var server = hapi.createServer(8080, 'localhost');

server.pack.register([
    {
        plugin: moonboots,
        options: {
            appPath: '/{p*}',
            moonboots: {
                main: __dirname + '/client/app.js',
                developmentMode: config.isDev,
                stylesheets: [
                    __dirname + '/public/css/local.css',
                    __dirname + '/public/css/bootstrap.css'
                ],
                beforeBuildJS: function () {
                    templatizer(__dirname + '/templates', __dirname + '/client/templates.js');
                }
            }
        }
    }, {
        plugin: Good,
        options: {
            reporters: [{
                reporter: Good.GoodConsole
            }]
        }
    }, {
        plugin: ElectricFence,
        options: config.electricfence
    }
], function () {
    server.start(function () {
        server.log(['info'], 'lift.zone running on the year ' + server.info.port);
    });
});
