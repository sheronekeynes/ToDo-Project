import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

export default {
  mode: "production", // Set mode to production
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve("dist"),
    clean: true,
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/todo_main.html",
    }),
  ],
};
