//vue.config.js

module.exports = {
    outputDir: __dirname + '/../server/web',
    publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : '/'
}