var postcss = require('postcss');

var cssUnits = [
    'em',
    'ex',
    'ch',
    'rem',
    'vh',
    'vw',
    'vmin',
    'vmax',
    'px',
    'mm',
    'cm',
    'in',
    'pt',
    'pc',
    'mozmm'
];

var regex = new RegExp('(top|right|bottom|left) ([^ ;,\\n]*(?:' + cssUnits.join('|') + '))', 'igm'); // eslint-disable-line max-len

module.exports = postcss.plugin('postcss-background-offsets', function (opts) {
    opts = opts || {};

    if (opts.method !== 'replace' && opts.method !== 'prepend') {
        opts.method = 'prepend';
    }

    var replaceFunc = function (match, g1, g2, offset, string) { // eslint-disable-line no-unused-vars,max-len
        if (g1 === 'right' || g1 === 'bottom') {
            return 'calc(100%-' + g2 + ')';
        }
        return match;
    };

    return function (css, result) { // eslint-disable-line no-unused-vars

        css.walkRules(function (rule) {

            rule.walkDecls('background-position', function (decl) {
                var oldValue = decl.value;
                var newValue = oldValue.replace(regex, replaceFunc);
                if (opts.method === 'prepend') {
                    decl.cloneBefore({
                        value: newValue
                    });
                }
                if (opts.method === 'replace') {
                    decl.value = newValue;
                }
            });
        });
    };
});
