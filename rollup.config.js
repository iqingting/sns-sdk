import buble from 'rollup-plugin-buble'
 
 export default {
   entry: './src/sns-sdk.js',
   format: 'umd',
   moduleName: 'sns',
   dest: 'sns-sdk.js',
   plugins: [ buble() ]
 }