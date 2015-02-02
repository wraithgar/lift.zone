var config = require('getconfig');
var templatizer = require('templatizer');

module.exports = {
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
        },
    },
    public: __dirname + '/public',
    directory: __dirname + '/static'
};
