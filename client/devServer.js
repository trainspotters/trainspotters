var express = require('express');
var webpack = require('webpack');
var history = require('connect-history-api-fallback');
var config = require('./webpack.config');

var app = express();
var compiler = webpack(config);

app.use(history());
app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

if (process.env.NODE_ENV !== 'production') {
    app.use(require('webpack-hot-middleware')(compiler, {
        reload: true
    }));
}


app.listen(3000, 'localhost', function (err) {
    if (err) {
        console.log(err);
        return;
    }

    console.log('Listening at http://localhost:3000');
});
