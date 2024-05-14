import { join } from 'path'
import nodeExternals from 'webpack-node-externals'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default (env, argv) => {
  return ({
    entry: {
      server: './src/server.js',
    },
    output: {
      path: join(__dirname, 'dist'),
      publicPath: '/',
      filename: '[name].js'
    },
    mode: argv.mode,
    target: 'node',
    node: {
      // Need this when working with express, otherwise the build fails
      __dirname: false,   // if you don't put this is, __dirname
      __filename: false,  // and __filename return blank or /
    },
    externals: [nodeExternals()], // Need this to avoid error when working with Express
    module: {
      rules: [
        {
          // Transpiles ES6-8 into ES5
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        }
      ]
    }
  })
}
