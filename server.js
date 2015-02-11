var ElectricFence = require('electricfence');
var Good = require('good');
var Hapi = require('hapi');
var Moonboots = require('moonboots_hapi');
var config = require('getconfig');
var moonbootsConfig = require('./moonbootsConfig');
var server = new Hapi.Server();

server.connection({port: 8080, host: 'localhost'});

server.views({
  engines: {
    jade: require('jade')
  },
  isCached: process.env.node === 'production',
  path: __dirname + '/views',
  compileOptions: {
    pretty: true
  }
});

server.register([
    {
        register: Moonboots,
        options: moonbootsConfig
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
