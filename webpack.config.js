const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'human-readable-duration.js',
    library: '',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
};
