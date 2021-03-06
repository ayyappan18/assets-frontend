'use strict';

/*
- Clean all generated dirs
- Copy error pages
- Styles
- Scripts
- Images

Dev:
- Sourcemaps
- BrowserSync
- Watch

Build:
- Image compression

Test:
- Continuous
- Spec reporter
*/

var src = './assets/',
    dest = src + 'public/',
    distDir = src + 'dist/',
    snapshotDir = dest + '999-SNAPSHOT/',
    govuk = {
      elements: src + 'govuk_elements',
      template: src + 'govuk_elements/govuk',
      images: src + 'govuk_elements/govuk/public/images/'
    };

module.exports = {
  dest: dest,
  distDir: distDir,

  dev: {
    dest: snapshotDir,
  },
  prod: {
    dest: distDir,
  },

  production: {
    jsSrc: distDir + 'javascripts/*.js',
    jsDest: distDir + 'javascripts/',
    imagesDir: distDir + 'images',
    cssSrc: distDir + 'stylesheets',
    dest: distDir
  },

  scripts: {
    dev: {
      dest: snapshotDir + 'javascripts'
    },
    prod: {
      dest: distDir + 'javascripts'
    },
    src: src + 'javascripts/modules/**/*.js',
    dest: snapshotDir + 'javascripts',
    entryPoint: src + 'javascripts/application.js',
    jshintExclude: '!' + src + 'javascripts/**/{base64v1_0,details.polyfill,mdtpdf}.js',
    jscsSrc: '.jscsrc',
    gulpTasks: 'gulpfile.js/**/*.js',
    encryptionSrc: src + 'javascripts/encryption/**/*.js',
    encryptionDest: {
      dev: snapshotDir + 'javascripts/',
      prod: distDir + 'javascripts/'
    },
    vendorDest: {
      dev: snapshotDir + 'javascripts/vendor/',
      prod: distDir + 'javascripts/vendor/'
    },

    modernizr: {
      options: [
        'setClasses',
        'html5printshiv',
        'testProp'
      ],
      tests: [
        'touchevents'
      ],
      excludeTests: [
        'flash',
        'hidden'
      ],
      files : {
        src: [
          src + '{javascripts,scss,govuk_*}/**/*.{js,scss}',
          '!**[^node_modules]/**/modernizr.js'
        ]
      }
    }
  },

  images: {
    govuk: govuk.images + '**/*',
    dev: {
      src: src + 'images/**/*',
      dest: snapshotDir + 'images'
    },
    prod: {
      dest: distDir + 'images'
    }
  },

  sass: {
    src: src + 'scss/**/*.scss',
    govukSrc: govuk.template + '/public/sass/**/*.scss',
    govukElementsSrc: govuk.elements + '/public/sass/**/*.scss',
    dev: {
      dest: snapshotDir + 'stylesheets/',
      settings: {
        sourceComments: true,
        includePaths: [govuk.template + '/public/sass'],
        outputStyle: 'expanded'
      },
      sourceMapsDir: './maps'
    },
    prod: {
      dest: distDir + 'stylesheets/',
      settings: {
        includePaths: [govuk.template + '/public/sass'],
        outputStyle: 'compressed'
      }
    }
  },

  browserify: {
    bundleConfigs: [{
      entries: [
        src + 'javascripts/application.js'
      ],
      dev: {
        dest: snapshotDir + 'javascripts'
      },
      prod: {
        dest: distDir + 'javascripts'
      },
      outputName: 'application.js'
    },{
      entries: [
        src + 'javascripts/export/fingerprint.js'
      ],
      dev: {
        dest: snapshotDir + 'javascripts'
      },
      prod: {
        dest: distDir + 'javascripts'
      },
      outputName: 'mdtpdf.js'
    }]
  },

  test: {
    specsScr: src + 'test/specs/unit/**/*.js',
    fixturesScr: src + 'test/specs/fixtures/*.html',
    karmaConfig: src + 'test/config/karma.conf.js'
  },

  browserSync: {
    ui: false,
    port: 9032,
    open: false,
    server: {
      baseDir: '.',
      routes: {
        '/assets': dest,
        '/component-library': './component-library'
      }
    }
  }
};
