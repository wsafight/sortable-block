import svelte from 'rollup-plugin-svelte';
import { terser } from "rollup-plugin-terser";
import resolve from '@rollup/plugin-node-resolve';
import pkg from './package.json';

// 是否是生产环境
const isProduction = process.env.NODE_ENV === 'production';

const name = pkg.name
	.replace(/^(@\S+\/)?(svelte-)?(\S+)/, '$3')
	.replace(/^\w/, m => m.toUpperCase())
	.replace(/-\w/g, m => m[1].toUpperCase());

export default {
	input: 'src/index.js',
	output: [
		{ file: pkg.module, 'format': 'es' },
		{ file: pkg.main, 'format': 'umd', name }
	],
	plugins: [
		svelte({
			compilerOptions: {
				customElement: true,
				dev: false,
				immutable: true,
				tag: 'sortable-block',
			},
		}),
		resolve(),
		isProduction && terser(),
	]
};
