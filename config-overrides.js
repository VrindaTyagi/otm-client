const { override } = require('customize-cra');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = override((config) => {
  config.plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: 'static', // Generates HTML report file
      reportFilename: 'bundle-report.html',
      openAnalyzer: false, // Don't automatically open the report
    }),
  );
  return config;
});
