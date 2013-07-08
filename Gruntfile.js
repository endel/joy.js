module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-yuidoc');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    meta: {
      name: "joy.js",
      banner: '/* \n' +
        ' * <%= meta.name %> v<%= pkg.version %> \n' +
        ' * <%= pkg.homepage %>\n' +
        ' * \n' +
        ' * @copyright 2012-<%= grunt.template.today("yyyy") %> <%= pkg.author.name %> \n' +
        ' * @license <%= pkg.licenses[0].type %>\n' +
        ' * @build <%= grunt.template.today("m/d/yyyy") %>\n' +
        ' */\n\n'
    },

    concat: {
      options: {
        banner: '<%= meta.banner %>'
      },
      dist: {
        src: [
          'lib/joy.js',
          'lib/consts/*.js',
          'lib/core/**.js',
          'lib/math/*.js',
          'lib/util/*.js',
          'lib/render/*.js',
          'lib/geom/**.js',
          'lib/vendor/**.js',
          'lib/modules/**.js',
          'lib/behaviour/behaviour.js',
          'lib/**/**.js'
        ],
        dest: 'dist/joy.js'
      }
    },

    uglify: {
      exportAll: {
        src: 'dist/joy.js',
        dest: 'dist/joy.min.js',
        options: {
          preserveComments: 'some'
        }
      }
    },

    qunit: {
      all: ['test/index.html']
    },

    jshint: {
      all: [
        'Gruntfile.js',

        //
        // Core
        //
        'lib/joy.js',
        'lib/behaviour/**.js',
        'lib/collider/**.js',
        'lib/consts/*.js',
        'lib/core/**.js',
        'lib/geom/**.js',
        'lib/init/**.js',
        'lib/input/**.js',
        'lib/math/*.js',
        'lib/render/*.js',
        'lib/transitions/*.js',
        'lib/util/*.js'

        //
        // 3rd party modules
        //
        'bower_components/howler/howler.js',
        'bower_components/tweenjs/src/Tween.js',
        'lib/modules/**.js',
      ],
      options: {
        "browser": true,
        "evil" : true // TODO: don't allow eval! (used on markup.js)
        // "es5": true
      }
    },

    watch: {
      scripts: {
        files: '<%= concat.dist.src %>',
        tasks: ['jshint', 'concat'],
        options: {
          interrupt: true
        }
      }
    },

    yuidoc: {
      compile: {
        name: '<%= pkg.name %>',
        description: '<%= pkg.description %>',
        version: '<%= pkg.version %>',
        url: '<%= pkg.homepage %>',
        nocode: 'true',
        themedir: '../joy.js-site/default/',
        options: {
          paths: 'lib/',
          outdir: '../joy.js-site/api/'
        }
      }
    }

  });

  // Default task.
  grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'qunit']);

  // Test task
  grunt.registerTask('test', ['concat', 'jshint', 'qunit']);

  // Minify
  grunt.registerTask('min', ['concat', 'uglify']);

  // Travis CI task.
  grunt.registerTask('travis', 'default');

  // Generate only documentation.
  grunt.registerTask('docs', 'yuidoc');
};
