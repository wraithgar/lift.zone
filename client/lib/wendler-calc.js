var calc = module.exports = {
    mround: function (weight, nearest) {

        return (nearest * Math.round(weight / nearest));
    },
    warmup1: function (weight) {

        return String(calc.mround(weight * 0.4, 5)) + ' lb';
    },
    warmup2: function (weight) {

        return String(calc.mround(weight * 0.5, 5)) + ' lb';
    },
    warmup3: function (weight) {

        return String(calc.mround(weight * 0.6, 5)) + ' lb';
    },
    wave1Set1: function (weight) {

        return String(calc.mround(weight * 0.65, 5)) + ' lb';
    },
    wave1Set2: function (weight) {

        return String(calc.mround(weight * 0.75, 5)) + ' lb';
    },
    wave1Set3: function (weight) {

        return String(calc.mround(weight * 0.85, 5)) + ' lb';
    },
    wave2Set1: function (weight) {

        return String(calc.mround(weight * 0.7, 5)) + ' lb';
    },
    wave2Set2: function (weight) {

        return String(calc.mround(weight * 0.8, 5)) + ' lb';
    },
    wave2Set3: function (weight) {

        return String(calc.mround(weight * 0.9, 5)) + ' lb';
    },
    wave3Set1: function (weight) {

        return String(calc.mround(weight * 0.75, 5)) + ' lb';
    },
    wave3Set2: function (weight) {

        return String(calc.mround(weight * 0.85, 5)) + ' lb';
    },
    wave3Set3: function (weight) {

        return String(calc.mround(weight * 0.95, 5)) + ' lb';
    }
};
