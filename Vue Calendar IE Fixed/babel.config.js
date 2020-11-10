// babel.config.js
module.exports = {
    presets: [
        "@babel/preset-env",
        ['@vue/app', {
            "targets": {
                "browsers": ["last 2 versions", "ie >= 11"]
            },
            "useBuiltIns": true,
            polyfills: [
                'es6.promise',
                'es6.symbol'
            ]
        }]
    ]
}
