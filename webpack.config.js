const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopywebpackPlugin = require('copy-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// local variables
let env = 'development';
let watch = true;
let outputPath = './dist/';
if (process.env.NODE_ENV === 'PRODUCTION') {
  env = 'production';
  watch = false;
  outputPath = './build/';
}

const NAMES = {
  user: '@hiyoko3',
  title: 'Portfolio',
  desc: 'Portfolio | Hiyoko3',
};

let baseWebpack = {
  // If mode is "production", the app is optimized.
  // If mode is "development", javascript files output with adding source map.
  watch: watch,
  mode: env,
  entry: {
    'public/app': path.resolve(__dirname, 'src/app.ts'), // The main javascript file
    'public/data': path.resolve(__dirname, 'src/assets/data/index.ts'), // The main javascript file
  },
  optimization: {
    // optimization chunks (Referecne: https://qiita.com/soarflat/items/1b5aa7163c087a91877d)
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'public/vendor',
          chunks: 'initial', // initial, async, all
        },
      },
    },
    minimizer: [],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    // === Compile `index.pug` === //
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/index.pug'),
      minify: {
        html5: true,
        minifyCSS: true,
        collapseWhitespace: true,
        removeComments: true,
        removeEmptyAttributes: true,
      },
      inject: true,
      chunksSortMode: 'auto',
      meta: {
        viewport: 'width=device-width, initial-scale=1.0',
        title: NAMES.title,
        keywords: 'Portfolio',
        author: NAMES.user,
        description: NAMES.desc,
        'theme-color': '#f7f6f5',
        'format-detection': 'telephone=no', //- Disabled phone number (iOS)
        //- /* ==== Windows Theme ==== */
        'msapplication-TileImage': 'public/static/images/apple-touch-icon.png',
        'msapplication-TileColor': '#f7f6f5',
      },
    }),
    new PreloadWebpackPlugin({
      rel: 'preload',
      as(entry) {
        if (/\.css$/.test(entry)) return 'style';
        if (/\.(woff2?|woff|ttf|otf)$/.test(entry)) return 'font';
        if (/\.(png|jpe?g|gif)$/.test(entry)) return 'image';
        return 'script';
      },
      include: 'allAssets', // or 'initial', 'allChunks'
      fileBlacklist: [/\.(eot|svg)/],
    }),
    new WebpackPwaManifest({
      filename: 'manifest.json',
      name: `PWA ${NAMES.title}`,
      short_name: NAMES.title,
      description: `${NAMES.desc} for PWA`,
      background_color: '#efefef',
      theme_color: '#fff',
      display: 'standalone',
      orientation: 'portrait',
      crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
      ios: {
        'apple-mobile-web-app-title': NAMES.title,
        'apple-mobile-web-app-status-bar-style': 'black',
      },
      icons: [
        {
          src: path.resolve('src/assets/icons/apple-touch-icon.png'),
          sizes: [128, 144, 152, 192, 256, 512], // multiple sizes
          destination: path.join('public/icons', 'ios'),
          ios: true,
        },
        {
          src: path.resolve('src/assets/icons/icon.png'),
          sizes: [128, 144, 152, 192, 256, 512], // multiple sizes
          destination: path.join('public/icons', 'default'),
        },
      ],
    }),
    new CopywebpackPlugin({
      patterns: [
        {
          toType: 'dir',
          from: path.join(__dirname, 'src/assets/images'),
          to: path.join(__dirname, `${outputPath}public/static/images`),
        }
      ]
    })
  ],
  // Output config
  output: {
    path: path.resolve(__dirname, outputPath), //  Output directory name
    filename: '[name].js', // Output filename
    publicPath: '/',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
      },
      {
        test: /(\.css$)/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.s(c|a)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]',
          outputPath: 'public/media',
          publicPath: '/public/media/',
        },
      },
      {
        test: /\.(woff2?|woff|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]',
          outputPath: 'public/fonts',
          publicPath: '/public/fonts/',
        },
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.pug$/,
        oneOf: [
          // this applies to pug imports inside JavaScript
          {
            use: ['raw-loader', 'pug-plain-loader'],
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
  devtool: 'inline-source-map',
  devServer: {
    host: '0.0.0.0',
    port: 7777, // port number
    contentBase: path.join(__dirname, 'dist/'), // Document root on server
    // publicPath: path.join(__dirname, 'dist/'),                     // Temporary path on virtual memory
    progress: false, // Show progress on console.
    inline: true, // The mode of inline.
    hot: false, // use HMR
    clientLogLevel: 'info', // The log level(none, error, warning, info)
    historyApiFallback: true,
  },
};

module.exports = baseWebpack;
