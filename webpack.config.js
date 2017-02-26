module.exports = {
    entry: {
        "js/app.js": "./src/app.ts",
        "js/GCounterWorker.js": "./src/GCounterWorker.ts"
    },
    output: {
        path: "docs/",
        filename: "[name]"
    },
    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".css"]
    },
    module: {
        loaders: [
            { test: /\.tsx?$/, loader: "ts-loader" },
            { test: /\.css$/, loader: "style-loader!css-loader" }
        ]
    }
}