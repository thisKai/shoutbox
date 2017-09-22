const path = require('path');

module.exports = {
    entry: './client/index.js',
    output: {
        filename: 'client',
        path: path.resolve(__dirname, 'dist'),
    },
};