//Gruntfile
module.exports = function(grunt) {
    'use strict';

    var fs = require('fs');

    grunt.initConfig({
        requirejs: {
            compileApp: {
                options: {
                    baseUrl: ".",
                    mainConfigFile: 'app/js/main.js',
                    name: "app/js/ng-bootstrap",
                    out: "<%= build.dir %>/app/js/app.js",
                    optimize: "uglify2"
                }
            }
        },
        watch: {
            requirejs: {
                files: ['app/js/**/*.js'],
                tasks: ['requirejs'],
                options: {
                    livereload: true
                }
            }
        },

        protractor: {
            options: {
                configFile: "protractor.conf.js",
                keepAlive: true,
                noColor: false,
                args: {
                }
            },
            app: {
                options: {
                    args: {
                        specs: ['test/app/*.spec.js']
                    }
                }
            }
        },
        shell: {
            clean: {
                command: 'rm -fR <%= build.dir %>'
            },
            'copy': {
                command: [
                    'mkdir -p <%= build.dir %>/app/js',
                    'cp index.html <%= build.dir %>/index.html',
                    'cp app/js/main.js <%= build.dir %>/app/js',
                    'cp -R app/views <%= build.dir %>/app/',
                    'cp components/requirejs/require.js <%= build.dir %>/app/js'
                ].join('&&')
            }
        },
        build: {
            time: "<%= grunt.template.today('yyyy_mm_dd__HH_MM_ss') %>",
            version: grunt.option('build.version') || "nightly-<%= grunt.template.today('yyyymmdd') %>",
            dir: 'build'
        }
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask('require-ng-bootstrap', 'Include the correct app file in index.html', function() {
        var contents = fs.readFileSync(grunt.config('build.dir') + '/index.html').toString('utf-8')
            .replace('<!-- grunt:dist-path -->', "<script>requirejs.config({paths: {'app/js/ng-bootstrap': 'app/js/app'}});</script>");

        fs.writeFileSync(grunt.config('build.dir') + '/index.html', contents);
    });

    grunt.registerTask('require-app', 'Include the correct app file in index.html', function() {
        var contents = fs.readFileSync(grunt.config('build.dir') + '/index.html').toString('utf-8')
            .replace('components/requirejs/require.js', 'app/js/require.js')

        fs.writeFileSync(grunt.config('build.dir') + '/index.html', contents);
    });

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['shell:clean', 'shell:copy', 'requirejs', 'require-ng-bootstrap', 'require-app']);
};
