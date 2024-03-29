const fs = require('fs');
const ejs = require('ejs');
const rimraf = require('rimraf');
const webpack = require('webpack');
const Browsersync = require('browser-sync');
const moment = require('moment');
const task = require('./task');
const config = require('./config');

global.HMR = !process.argv.includes('--no-hmr'); // Hot Module Replacement (HMR)

// Build the app and launch it in a browser for testing via Browsersync
module.exports = task('run', () => new Promise(resolve => {
  rimraf.sync('public/dist/*', { nosort: true, dot: true });
  let count = 0;
  const bs = Browsersync.create();
  const webpackConfig = require('./webpack.config');
  const compiler = webpack(webpackConfig);

  const webpackDevMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: webpackConfig.stats,
  });

  compiler.plugin('done', stats => {
    const bundle = stats.compilation.chunks.find(x => x.name === 'main').files[0];
    const template = fs.readFileSync('./public/index.ejs', 'utf8');
    const render = ejs.compile(template, { filename: './public/index.ejs' });
    const output = render({
      debug: true,
      bundle: `/dist/${bundle}`,
      config,
      environment: process.env.NODE_ENV,
      apiUser: process.env.API_USER,
      apiPass: process.env.API_PASS,
      infuraToken: process.env.INFURA_TOKEN,
      updatedLast: moment().format('x'),
    });

    fs.writeFileSync('./public/index.html', output, 'utf8');

    count += 1;
    if (count === 1) {
      bs.init({
        port: process.env.PORT || 3000,
        ui: { port: Number(process.env.PORT || 3000) + 1 },
        server: {
          baseDir: 'public',
          middleware: [
            webpackDevMiddleware,
            require('webpack-hot-middleware')(compiler),
            require('connect-history-api-fallback')(),
          ],
        },
      }, resolve);
    }
  });
}));
