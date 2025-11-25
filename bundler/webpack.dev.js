const path = require('path')
const { merge } = require('webpack-merge')
const commonConfiguration = require('./webpack.common.js')
const internalIp = require('internal-ip')
const portFinderSync = require('portfinder-sync')

const infoColor = (_message) =>
{
    return `\u001b[1m\u001b[34m${_message}\u001b[39m\u001b[22m`
}

module.exports = merge(
    commonConfiguration,
    {
        stats: 'errors-warnings',
        mode: 'development',
        devServer:
        {
            host: '0.0.0.0',
            port: 8080,
            open: false,
            https: false,
            allowedHosts: 'all',
            hot: false,
            watchFiles: ['src/**', 'static/**'],
            historyApiFallback: true,
            client:
            {
                logging: 'none',
                overlay: true,
                progress: false
            },
            onAfterSetupMiddleware: function(devServer)
            {
                const port = devServer.options.port
                const https = devServer.options.https ? 's' : ''
                const domain1 = `http${https}://localhost:${port}`
                
                console.log(`Project running at:\n  - ${infoColor(domain1)}`)
            }
        }
    }
)
