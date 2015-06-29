module.exports = function(config) {
	return {
		// base path, that will be used to resolve files and exclude
		basePath: '..',

		// testing framework to use (jasmine/mocha/qunit/...)
		frameworks: ['mocha', 'chai-sinon'],

		// list of files / patterns to load in the browser
		files: [
		  'src/bower_components/jquery/jquery.js',
		  'src/bower_components/angular/angular.js',
		  'src/bower_components/angular-mocks/angular-mocks.js',
		  'src/bower_components/angular-ui-router/release/angular-ui-router.js',
		  'src/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
		  'src/bower_components/lodash/dist/lodash.compat.js',
		  'src/bower_components/ng-grid/build/ng-grid.js',
		  'src/app/*.js',
		  'src/app/**/*.js',
		  'test/mocha.conf.js'
		  //'test/mock/**/*.js',
		  //'test/spec/**/*.js'
		],

		// list of files / patterns to exclude
		exclude: [],

		// test results reporter to use
		// possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
		reporters: [
			'progress',
			'junit'
		],

		junitReporter : {
			outputFile: 'test-results.xml'
		},

		// web server port
		port: 8080,

		// level of logging
		// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
		logLevel: config.LOG_INFO,

		colors: true,


		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: false,


		// Start these browsers, currently available:
		// - Chrome
		// - ChromeCanary
		// - Firefox
		// - Opera
		// - Safari (only Mac)
		// - PhantomJS
		// - IE (only Windows)
		browsers: ['PhantomJS'],


		// Continuous Integration mode
		// if true, it capture browsers, run tests and exit
		singleRun: false,

		plugins: [
			'karma-phantomjs-launcher',
			'karma-mocha',
			'karma-chai-sinon',
			'karma-spec-reporter',
			'karma-junit-reporter'
		]
	};
};

