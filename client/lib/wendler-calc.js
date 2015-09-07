var calc = module.exports = {
    mround: function (weight, nearest) {
        return (nearest * Math.round(weight/nearest));
    },
    warmup_1: function (weight) {
        return String(calc.mround(weight * 0.4, 5)) + ' lb';
    },
    warmup_2: function (weight) {
        return String(calc.mround(weight * 0.5, 5)) + ' lb';
    },
    warmup_3: function (weight) {
        return String(calc.mround(weight * 0.6, 5)) + ' lb';
    },
    wave1_1: function (weight) {
        return String(calc.mround(weight * 0.65, 5)) + ' lb';
    },
    wave1_2: function (weight) {
        return String(calc.mround(weight * 0.75, 5)) + ' lb';
    },
    wave1_3: function (weight) {
        return String(calc.mround(weight * 0.85, 5)) + ' lb';
    },
    wave2_1: function (weight) {
        return String(calc.mround(weight * 0.7, 5)) + ' lb';
    },
    wave2_2: function (weight) {
        return String(calc.mround(weight * 0.8, 5)) + ' lb';
    },
    wave2_3: function (weight) {
        return String(calc.mround(weight * 0.9, 5)) + ' lb';
    },
    wave3_1: function (weight) {
        return String(calc.mround(weight * 0.75, 5)) + ' lb';
    },
    wave3_2: function (weight) {
        return String(calc.mround(weight * 0.85, 5)) + ' lb';
    },
    wave3_3: function (weight) {
        return String(calc.mround(weight * 0.95, 5)) + ' lb';
    }
};
