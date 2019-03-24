const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const extractPlugin = new MiniCssExtractPlugin({
  filename: "main.css",
  publicPath: "/dist",
  chunkFilename: "[id].css"
});

module.exports = {
  entry: "./src/js/index.js",
  devtool: "inline-source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/dist/"
  },
  watch: true,
  devServer: {
    writeToDisk: true,
    contentBase: "./src",
    compress: true,
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.s?[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { url: false, sourceMap: true } },
          { loader: "sass-loader", options: { sourceMap: true } }
        ]
      }
    ]
  },
  plugins: [extractPlugin]
};
