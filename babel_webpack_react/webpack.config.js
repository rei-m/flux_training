module.exports = {
  entry: "./entry.jsx",
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  resolve: {
    // 読み込む際に拡張子を省略する
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};
