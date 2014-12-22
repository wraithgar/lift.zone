var Hapi = require('hapi');
var Moonboots = require('moonboots_hapi');
var config = require('getconfig');
var templatizer = require('templatizer');
var Good = require('good');
var ElectricFence = require('electricfence');
var server = new Hapi.Server();

server.connection({port: 8080, host: 'localhost'});

server.register([
    {
        register: Moonboots,
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
                },
                browserify: {
                    'paths': ['./node_modules', './client']
                }
            }
        }
    }, {
        register: Good,
        options: {
            reporters: [{
                reporter: require('good-console'),
                args:[{ log: '*', request: '*' }]
            }]
        }
    }, {
        register: ElectricFence,
        options: config.electricfence
    }
], function () {
    server.start(function () {
        server.log(['info'], 'lift.zone running on the year ' + server.info.port);
    });
});
