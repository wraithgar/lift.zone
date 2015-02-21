var app = require('ampersand-app');
var Model = require('./base');
var Activities = require('./activities');
var moment = require('moment');

module.exports = Model.extend({
    urlRoot: function () { return app.apiUrl + '/workouts'; },
    props: {
        id: 'number',
        name: ['string', true, 'My Workout'],
        date: ['date', true, function () { return new Date(); }],
        raw: 'string'
    },
    collections: {
        activities: Activities
    },
    parse: function (resp) {
        if (resp.date) {
            resp.date = moment(resp.date, 'YYYY-MM-DD');
        }
        return resp;
    },
    serialize: function () {
        var res = Model.prototype.serialize.apply(this, arguments);
        res.date = this.dateId;
        return res;
    },
    derived: {
        formattedDate: {
            deps: ['date'],
            fn: function () {
                return moment(this.date).format(app.me.dateFormat);
            }
        },
        dateId: {
            deps: ['date'],
            fn: function () {
                return moment(this.date).format('YYYY-MM-DD');
            }
        }
    }
});
