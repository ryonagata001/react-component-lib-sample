import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import tailwindcss from 'tailwindcss';

const packageJson = require('./package.json');
const tailwindConfig = require('./tailwind.config.js');

export default [
    // npmで配布するための設定
    {
        input: 'src/index.ts',
        output: [
            {
                file: packageJson.main,
                format: 'cjs', // CommonJS: Node.jsで採用されているモジュールシステム。そのままではブラウザで動かない
                sourcemap: true,
            },
            {
                file: packageJson.module,
                format: 'esm', // ES Modules: JavaScriptにおけるスタンダードなモジュールシステム. Node.jsのデフォルトはCommonJSだが、設定次第でESMもサポート可能
                sourcemap: true,
            },
            // UMD: Universal Module Definition : ブラウザでもNode.jsでも動くようにするためのモジュールシステム
        ],
        plugins: [
            resolve(), //
            commonjs(),
            typescript({ tsconfig: './tsconfig.json' }),
            postcss({
                config: {
                    path: './postcss.config.js',
                },
                extensions: ['.css', '.scss'],
                minimize: true,
                inject: {
                    insertAt: 'top',
                },
                plugins: [tailwindcss(tailwindConfig)],
            }),
            terser(),
        ],
    },
    // CDNで配布するための設定
    {
        input: 'src/index.ts',
        output: [
            {
                // CDNで配布するための設定
                file: 'dist/umd/index.umd.js',
                format: 'umd', // UMD: Universal Module Definition : ブラウザでもNode.jsでも動くようにするためのモジュールシステム
                name: packageJson.name,
            },
        ],
        plugins: [
            resolve(), //
            commonjs(),
            typescript({ tsconfig: './tsconfig.json' }),
            postcss({
                config: {
                    path: './postcss.config.js',
                },
                extensions: ['.css', '.scss'],
                minimize: true,
                inject: {
                    insertAt: 'top',
                },
                plugins: [tailwindcss(tailwindConfig)],
            }),
            terser(),
            replace({
                'process.env.NODE_ENV': JSON.stringify('production'),
            }),
        ],
    },
    // 2つ目の出力設定
    // ライブラリの型定義ファイルをどのように配布するかを設定している
    {
        input: 'dist/esm/types/index.d.ts',
        output: [{ file: 'dist/types/index.d.ts', format: 'esm' }],
        plugins: [dts.default()],
        external: [/\.css$/],
    },
];
