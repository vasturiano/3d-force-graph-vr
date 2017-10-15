import commonJs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import postCss from 'rollup-plugin-postcss';
import postCssSimpleVars from 'postcss-simple-vars';
import postCssNested from 'postcss-nested';
import babel from 'rollup-plugin-babel';

export default {
    strict: false, // a-frame 0.5 not 'strict' compatible
    input: 'src/index.js',
    output: [
        {
            format: 'umd',
            name: 'ForceGraphVR',
            file: 'dist/3d-force-graph-vr.js',
            sourcemap: true
        },
        {
            format: 'es',
            file: 'dist/3d-force-graph-vr.mjs'
        }
    ],
    plugins: [
        commonJs(),
        nodeResolve(),
        postCss({
            plugins: [
                postCssSimpleVars(),
                postCssNested()
            ]
        }),
        babel({
            presets: [
                ["es2015", { "modules": false }]
            ],
            plugins: ["external-helpers"],
            babelrc: false
        })
    ]
};