module.exports = {
    devtool: "source-map", // any "source-map"-like devtool is possible
    module: {
        rules: [
            {
                test: /\.less$/i,
                use: ["style-loader", "css-loader", "less-loader"],
            },
        ],
    },
    resolve: {
        byDependency: {
            // More options can be found here https://webpack.js.org/configuration/resolve/
            less: {
                mainFiles: ["custom"],
            },
        },
    },
};