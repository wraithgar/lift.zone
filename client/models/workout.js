var app = require('ampersand-app');
var Model = require('./base');
var Activities = require('./activities');
var moment = require('moment');

var dateId = function (date) {
    return moment(date).format('YYYY-MM-DD');
};

module.exports = Model.extend({
    urlRoot: function () { return app.apiUrl + '/workouts'; },
    props: {
        id: 'number',
        name: ['string', true, 'My Workout'],
        date: ['date', true, function () { return new Date(); }],
        raw: 'string'
    },
    session: {
        exists: 'boolean'
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
                return dateId(this.date);
            }
        }
    },
    checkExisting: function (date, callback) {
        var self = this;
        date = date || self.date;
        self.sync('read', self, {
            url: app.apiUrl + '/search/workouts/' + dateId(date),
            success: function () {
                self.exists = true;
                callback();
            },
            error: function () {
                self.exists = false;
                callback();
            }
        });
    }
});
