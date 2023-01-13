const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js",
    clean: true,
    publicPath: "/",
  },
  devtool: "inline-source-map",
  devServer: {
    static: "./dist",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      templateParameters: {
        title: "Webpack 러닝 가이드", // 문서 타이틀
        lang: "ko-KR", // 주 언어 명시
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/, // .css 확장자로 끝나는 모든 파일을 의미한다
        use: ["style-loader", "css-loader"], // ✅ style-loader를 앞에 추가하자. 아니면 에러가 난다
      },
      {
        test: /\.png\.jpg$/, // .png 확장자로 마치는 모든 파일
        loader: "file-loader",
        options: {
          publicPath: "./dist/", // prefix를 아웃풋 경로로 지정
          name: "[name].[ext]?[hash]", // 파일명 형식
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.png\.jpg$/,
        use: {
          loader: "url-loader", // url 로더를 설정한다
          options: {
            publicPath: "./dist/", // file-loader와 동일
            name: "[name].[ext]?[hash]", // file-loader와 동일
            limit: 5000, // 5kb 미만 파일만 data url로 처리
          },
        },
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
};
