// Karma configuration
// Generated on Mon Aug 31 2015 18:06:13 GMT+0800 (HKT)

module.exports = function(config) {

  function isCoverage(argument) {
    return argument === '--coverage';
  }

  // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
  var reporters = ['nyan'];

  if(process.argv.some(isCoverage)){
    reporters.push('coverage');
  }

  var testConfig = {

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      './config/tests.webpack.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      './config/tests.webpack.js': [ 'webpack', 'sourcemap' ] //preprocess with webpack and our sourcemap loader
    },


    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
          { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
          {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loaders: [
                'file?hash=sha512&digest=hex&name=[hash].[ext]',
                'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
            ]
          }
        ]
      },
      resolve: {
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: ["node_modules", "vendor"]
      }
    },


    webpackMiddleware: {
      noInfo: true,
      stats: {
        colors: true
      }
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: reporters,


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  }

  // Generate code coverage report if --coverage is specified
  if (process.argv.some(isCoverage)) {
    // Generate a code coverage report using `lcov` format. Result will be output to coverage/lcov.info
    // run using `npm coveralls`
    testConfig['webpack']['module']['postLoaders'] = [{
      test: /\.jsx?$/,
      exclude: /(test|node_modules)\//,
      loader: 'istanbul-instrumenter'
    }];

    testConfig['coverageReporter'] = {
      dir: 'coverage/',
      reporters: [
        { type: 'lcovonly', subdir: '.', file: 'lcov.info' },
        { type: 'html', subdir: 'html' }
      ]
    };
  }

  config.set(testConfig);
}
