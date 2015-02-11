var config = require('getconfig');
var templatizer = require('templatizer');
var jade = require('jade');

module.exports = {
    appPath: '/{p*}',
    appConfig: {
        handler: function(request, reply) {
            var ctx = this.htmlContext();
            ctx.accountsUrl = config.accountsUrl;
            ctx.apiUrl = config.apiUrl;
            return reply.view('index', ctx);
        },
    },
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
        },
    },
    public: __dirname + '/public',
    directory: __dirname + '/static',
    htmlSource: function (context) {
        context.accountsUrl = config.accountsUrl;
        context.apiUrl = config.apiUrl;
        context.pretty = true;
        console.log(context);
        return jade.renderFile(__dirname + '/views/index.jade', context);
    }
};
