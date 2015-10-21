/*global module:false*/
module.exports = function (grunt) {

    grunt.initConfig({
        concat: {
            css: {
                src: [
                    'www/lib/bootstrap/dist/css/bootstrap.css',
                    'www/lib/angular-motion/dist/angular-motion.css',
                    'www/lib/bootstrap-additions/dist/bootstrap-additions.css',
                    'www/css/style.css'
                ],
                dest: 'www-built/css/all.css'
            }
        },
        cssmin: {
            css: {
                src: 'www-built/css/all.css',
                dest: 'www-built/css/all.min.css'
            }
        },

        requirejs: {
            std: {
                options: {
                    appDir: 'www',
                    mainConfigFile: 'www/js/main.js',
                    dir: 'www-built',
                    removeCombined: true,
                    modules: [
                        {
                            name: 'app'
                        }
                    ]
                }
            }
        },

        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                eqnull: true,
                browser: true,
                nomen: true,
                globals: {
                    define: true,
                    requirejs: true,
                    require: true,
                    angular: true
                }
            },
            all: ['www/js/*.js']
        }
    });

    grunt.loadNpmTasks("grunt-contrib-requirejs");
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-css');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['jshint', 'build']);
    grunt.registerTask('build', ['requirejs', 'concat', 'cssmin']);
};
