import Dotenv from 'dotenv-webpack';
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin'

export default {
    plugins: [
        new Dotenv(),
        new NodePolyfillPlugin()
    ]
};
