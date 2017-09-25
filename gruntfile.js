/*This is purely a development asset*/
module.exports = function (grunt) {
    grunt.initConfig({
        //We are configuring nodemon to restart whenever any js is modified
        //just js files because in node.js they are cached in memory. Css, html, etc they are not and node reloads them when they are changed
        nodemon: {
            all: {
                script: 'server.js',
                options: {watchedExtensions: ['js']}
            }
        }
    });
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.registerTask('default', ['nodemon']);
};