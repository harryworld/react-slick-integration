var fs                = require('fs');
var React             = require('react');
var path              = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var webpack           = require('webpack');
var merge             = require('webpack-merge');
var Clean             = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var Loading           = require('../app/components/main/Loading.jsx');
var pkg               = require('../package.json');

var clientAppPath     = path.join(__dirname, '../app/');
var nodeModulesPath = path.join(__dirname, '../node_modules/');
var bowerComponentsPath = path.join(__dirname, '../bower_components/');

var TARGET = process.env.npm_lifecycle_event;
var CONFIG_PATH = path.resolve(__dirname);
var ROOT_PATH = path.resolve(CONFIG_PATH, '../');

// module.exports = {
  var autoprefix = '{browsers:["Android 2.3", "Android >= 4", "Chrome >= 20", "Firefox >= 24", "Explorer >= 8", "iOS >= 6", "Opera >= 12", "Safari >= 6"]}';
  var cssLoaders = ['css-loader', 'autoprefixer-loader?' + autoprefix];

  var scssLoaders = cssLoaders.slice(0);
    scssLoaders.push('sass-loader?outputStyle=expanded&includePaths[]=' + (path.resolve(__dirname, '../bower_components/foundation-apps/scss')));

// }

var common = {
  entry: clientAppPath + 'main',
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss'],
    root: [nodeModulesPath, bowerComponentsPath, clientAppPath]
  },
  output: {
    path: path.resolve(CONFIG_PATH, '../build'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', cssLoaders.join('!')),
        include: clientAppPath
      },
      {
        test: /\.scss$/,
        // loader: "style!css!sass",
        loader: ExtractTextPlugin.extract('style', scssLoaders.join('!')),
        include: clientAppPath
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }
    ]
  }
};

if (TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true
    },
    module: {
      preLoaders: [
        {
          test: /\.css$/,
          loader: 'csslint',
          exclude: /\.min.css$/
        },
        {
          test: /\.jsx?$/,
          // we are using `eslint-loader` explicitly since
          // we have ESLint module installed. This way we
          // can be certain that it uses the right loader
          loader: 'eslint-loader',
          include: clientAppPath
        }
      ],
      loaders: [
        {
          test: /\.jsx?$/,
          loaders: ['react-hot', 'babel'],
          include: clientAppPath
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin('styles.css'),
      new webpack.HotModuleReplacementPlugin(),
      new HtmlwebpackPlugin({
        title: pkg.title,
        templateContent: renderTemplate(
          fs.readFileSync(clientAppPath + 'templates/index.tpl', 'utf8'),
          {
            app: React.renderToStaticMarkup(<Loading />)
          }
        )
      }),
      new webpack.ResolverPlugin(
        new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('../bower.json', ['main'])
      )
    ]
  });
}

if (TARGET === 'build') {
  module.exports = merge(common, {
    entry: {
      app: clientAppPath + 'main',
      vendor: Object.keys(pkg.dependencies)
    },
    output: {
      path: path.resolve(CONFIG_PATH, '../build'),
      filename: 'app.[chunkhash].js'
    },
    devtool: 'source-map',
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loaders: ['babel'],
          include: clientAppPath
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin('styles.css'),
      new Clean(['build'], ROOT_PATH),
      new webpack.optimize.CommonsChunkPlugin(
        'vendor',
        'vendor.[chunkhash].js'
      ),
      new webpack.DefinePlugin({
        'process.env': {
          // This affects react lib size
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new HtmlwebpackPlugin({
        title: pkg.title,
        templateContent: renderTemplate(
          fs.readFileSync(clientAppPath + 'templates/index.tpl', 'utf8'),
          {
            app: React.renderToStaticMarkup(<Loading />)
          }
        )
      })
    ]
  });
}

function renderTemplate(template, replacements) {
  return function() {
    return template.replace(/%(\w*)%/g, function(match) {
      var key = match.slice(1, -1);

      return replacements[key] ? replacements[key] : match;
    });
  };
}
