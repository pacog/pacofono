const path = require('path');
const TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;

module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"],
        plugins: [
            new TsConfigPathsPlugin()
        ]
    },

    module: {
        rules: [
            {
              test: /\.css$/,
              // include: path.join(__dirname, 'src/components'),
              use: [
                "style-loader",
                {
                  loader: "typings-for-css-modules-loader",
                  options: {
                    modules: true,
                    namedExport: true
                  }
                }
              ]
            },

            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader",
                options: {
                    configFileName: 'tsconfig.json'
                },
            },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ],
    },

};
