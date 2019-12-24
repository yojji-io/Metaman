const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color': '#fa8c16',
      '@error-color': '#fa541c',
      '@font-family': '"Space Mono", monospace, "Roboto", sans-serif',
      '@btn-default-color': 'rgba(0, 0, 0, 0.7)',
      '@font-size-base': '16px',
    },
  })
);
