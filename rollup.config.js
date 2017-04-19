import commonJs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import postCss from 'rollup-plugin-postcss';
import postCssSimpleVars from 'postcss-simple-vars';
import postCssNested from 'postcss-nested';

export default {
    entry: 'src/index.js',
    dest: 'dist/3d-force-graph-vr.js',
    useStrict: false, // a-frame 0.5 not 'strict' compatible
    format: 'umd',
    moduleName: 'ForceGraphVR',
    plugins: [
        commonJs(),
        nodeResolve({
            jsnext: true,
            main: true
        }),
        postCss({
            plugins: [
                postCssSimpleVars(),
                postCssNested()
            ]
        })
    ]
};