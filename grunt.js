module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-yuidoc');

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      name: "Joy.js",
      banner: '/*! <%= meta.name %> - v<%= pkg.version %> - <%= grunt.template.today("m/d/yyyy") %>\n' +
        '* <%= pkg.homepage %>\n' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
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
      all: ['grunt.js', 'lib/**/*.js', 'test/**/*.js']
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

  // Travis CI task.
  grunt.registerTask('travis', 'lint qunit');

  // Generate only documentation.
  grunt.registerTask('gendocs', 'yuidoc');
};
