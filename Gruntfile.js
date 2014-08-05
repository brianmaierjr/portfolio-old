module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {   
            dist: {
                src: [
                    'assets/js/lib/*.js', // All JS in the libs folder
                    'assets/js/scripts.js'  // This specific file
                ],
                dest: 'assets/js/build/production.js'
            } 
        },

        uglify: {
            build: {
                src: 'assets/js/build/production.js',
                dest: 'assets/js/build/production.min.js'
            }
        },

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'assets/img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'assets/img/'
                }]
            }
        },

        watch: {
            options: {
                livereload: true,
            },
            scripts: {
                files: ['assets/js/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false,
                },
            },
            css: {
                files: ['assets/scss/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false,
                }
            }
        },

        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'assets/css/style.css': 'assets/scss/style.scss'
                }
            }
        },

        penthouse: {
            extract : {
                outfile : 'assets/css/critical.css',
                css : 'assets/css/style.css',
                url : 'http://0.0.0.0:4000/',
                width : 1300,
                height : 900
            },
        }

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-penthouse');


    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['concat', 'uglify', 'imagemin', 'sass', 'watch']);

    grunt.registerTask('dev', ['watch']);

};
