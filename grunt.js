module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-yuidoc');

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      name: "Joy.js",
      banner: '/* \n' +
        ' * <%= meta.name %> - v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> \n' +
        ' * Build date: <%= grunt.template.today("m/d/yyyy") %>\n' +
        ' */'
    },
    concat: {
      dist: {
        src: ['<banner>', 'lib/*.js', 'lib/*/**.js'],
        dest: 'dist/joy.js'
      }
    },
    min: {
      dist: {
        src: ['<banner>', 'dist/joy.js'],
        dest: 'dist/joy.min.js'
      }
    },
    test: {
      files: ['test/**/*.js']
    },
    lint: {
      all: ['grunt.js', 'lib/**/*.js']
    },
    jshint: {
      options: {
        browser: true
      }
    },
    yuidoc: {
      compile: {
        name: '<%= pkg.name %>',
        description: '<%= pkg.description %>',
        version: '<%= pkg.version %>',
        url: '<%= pkg.homepage %>',
        nocode: 'true',
        themedir: 'doctheme/',
        options: {
          paths: 'lib/',
          outdir: 'doc/'
        }
      }
    }
  });

  // Default task.
  grunt.registerTask('default', 'lint test concat min yuidoc');

  // Dev build
  grunt.registerTask('dev', 'lint concat min');

  // Travis CI task.
  grunt.registerTask('travis', 'lint qunit');

  // Generate only documentation.
  grunt.registerTask('docs', 'yuidoc');
};
