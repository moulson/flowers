module.exports = function(grunt) { // the general grunt function that is run

  grunt.initConfig({ // here we setup our config object with package.json and all the tasks

    pkg: grunt.file.readJSON('package.json'),

    sass: { // sass tasks
      dist: {
        options: {
          compass: true, // enable the combass lib, more on this later
          style: 'expanded' // we don't want to compress it
        },
        files: {
          'dist/css/style.css': 'sass/application.scss'
        }
      }
    },

    copy: {
      build: {
        cwd: 'src',
        src: [ '**' ],
        dest: 'dist/',
        expand: true
      },
    },

    cssmin: { // minifying css task
      dist: {
        files: {
          'dist/css/style.min.css': 'dist/css/style.css'
        }
      }
    },

    watch: { // watch task for general work
      sass: {
        files: ['sass/**/*.scss'],
        tasks: ['sass']
      },
      styles: {
        files: ['dist/css/style.css'],
        tasks: ['cssmin']
      },
    }
  });

  // all the plugins that is needed for above tasks
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // registering the default task that we're going to use along with watch
  grunt.registerTask('default', ['copy', 'sass', 'cssmin']);
};