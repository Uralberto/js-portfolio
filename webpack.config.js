const path = require("path");
//path está disponible en node. solo hay que llmarlo
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin"); // Clase 12
const DotEnv = require("dotEnv-webpack"); // Clase 14
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // Clase 16

module.exports = {
  entry: "./src/index.js", //punto de entrada de la app
  output: {
    path: path.resolve(__dirname, "dist"), //aqií es donde se indica  la carpeta donde se guardará el proyecto optimizado
    // filename: "main.js", nombre del archivo que va a unificar el proyecto.
    filename: "[name].[contenthash].js", //Esta línea reemplaza la linea precedente comentada. La idea es que el main.js tenga un hash que lo identifique. Clase 12
  },
  resolve: {
    extensions: [".js"], // se indocan las extensiones de los archivos a leer
    alias: {
      "@utils": path.resolve(__dirname, "src/utils/"),
      "@templates": path.resolve(__dirname, "src/templates/"),
      "@styles": path.resolve(__dirname, "src/styles/"),
      "@images": path.resolve(__dirname, "src/assets/images/"),
    },
  },
  module: {
    rules: [
      {
        test: /\.m?js$/, //usar cualquier extensión js de los módulos
        exclude: /node_modules/, //No utilizar node_modules
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css|styl$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "stylus-loader"],
      },
      {
        test: /\.png/,
        type: "asset/resource",
        generator: {
          filename: "assets/images/[hash][ext][query]", //Aqui lo hago segun  mi criterio.
        },
      },

      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[hash][ext][query]",
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: true, //para que haga la inserción de los elementos
      template: "./public/index.html", // Aquí se define la ubicación del html
      filename: "./index.html", // Aquí decimos cual va a  ser el resultado de la preparación del html. Utilizamos el mismo nombre en este caso. Este quedará en la carpera dist.
    }),
    new MiniCssExtractPlugin({
      filename: "assets/[name].[contenthash].css", // Aquí se configura como queda el css en la carpeta dist. Queda con un hash que lo identifica
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "assets/images"),
          to: "assets/images",
        },
      ],
    }),
    new DotEnv(), // Clase 14
    new CleanWebpackPlugin(), // Clase 16
  ],
  optimization: {
    // Clase 12
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
  },
};
