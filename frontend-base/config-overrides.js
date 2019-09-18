const { override, fixBabelImports } = require('customize-cra');

const externals = (config) => {
    config.optimization.runtimeChunk = false;
    config.optimization.splitChunks = {
        cacheGroups: {
        default: false,
        },
    }

    config.externals = {
        react: 'React',
        'react-dom': 'ReactDOM'
    }
    return config;
}

module.exports = override(
    externals,
    fixBabelImports('import', {
        libraryName: 'element-ui',
        libraryDirectory: 'es',
        style: 'element-ui',
    })
);