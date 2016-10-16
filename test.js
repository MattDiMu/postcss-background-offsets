import postcss from 'postcss';
import test    from 'ava';

import plugin from './';

function run(t, input, expectedOutput, opts = { }) {
    return postcss([ plugin(opts) ]).process(input)
        .then( result => {
            t.deepEqual(result.css, expectedOutput);
            t.deepEqual(result.warnings().length, 0);
        });
}
/* eslint-disable max-len */

test('fallback right bottom', t => {
    return run(t,
        'a{background-position:right 10px bottom 20px;}',
        'a{background-position:calc(100%-10px) calc(100%-20px);background-position:right 10px bottom 20px;}',
    { });
});

test('fallback right bottom (replace)', t => {
    return run(t,
        'a{background-position:right 10px bottom 20px;}',
        'a{background-position:calc(100%-10px) calc(100%-20px);}',
    { method: 'replace' });
});

test('length unit vh', t => {
    return run(t,
        'a{background-position:right 100vh bottom 20px;}',
        'a{background-position:calc(100%-100vh) calc(100%-20px);}',
    { method: 'replace' });
});
