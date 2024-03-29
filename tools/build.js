/* eslint-disable no-console, global-require */

const fs = require('fs');
const rimraf = require('rimraf');
const ejs = require('ejs');
const webpack = require('webpack');
const moment = require('moment');
const task = require('./task');
const config = require('./config');

// Copy ./index.html into the /public folder
const html = task('html', () => {
  const webpackConfig = require('./webpack.config');
  const assets = JSON.parse(fs.readFileSync('./public/dist/assets.json', 'utf8'));
  const template = fs.readFileSync('./public/index.ejs', 'utf8');
  const render = ejs.compile(template, { filename: './public/index.ejs' });
  const output = render({
    debug: webpackConfig.debug,
    bundle: assets.main.js,
    config,
    environment: process.env.NODE_ENV,
    apiUser: process.env.API_USER,
    apiPass: process.env.API_PASS,
    infuraToken: process.env.INFURA_TOKEN,
    updatedLast: moment().format('x'),
  });

  fs.writeFileSync('./public/index.html', output, 'utf8');
  fs.writeFileSync('./public/404.html', output, 'utf8');
});

// Generate sitemap.xml
const sitemap = task('sitemap', () => {
  const urls = require('../src/routes.json')
    .filter(x => !x.path.includes(':'))
    .map(x => ({ loc: x.path }));
  const template = fs.readFileSync('./public/sitemap.ejs', 'utf8');
  const render = ejs.compile(template, { filename: './public/sitemap.ejs' });
  const output = render({ config, urls });
  fs.writeFileSync('public/sitemap.xml', output, 'utf8');
});

// Bundle JavaScript, CSS and image files with Webpack
const bundle = task('bundle', () => {
  const webpackConfig = require('./webpack.config');
  return new Promise((resolve, reject) => {
    webpack(webpackConfig).run((err, stats) => {
      if (err) {
        reject(err);
      } else {
        console.log(stats.toString(webpackConfig.stats));
        resolve();
      }
    });
  });
});


// Build website into a distributable format
module.exports = task('build', () => {
  global.DEBUG = process.argv.includes('--debug') || false;
  rimraf.sync('public/dist/*', { nosort: true, dot: true });
  return Promise.resolve()
    .then(bundle)
    .then(html)
    .then(sitemap);
});
