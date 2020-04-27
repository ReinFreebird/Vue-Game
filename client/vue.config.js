const path=	require('path');
const __dirName= path.resolve();

module.exports = {
  css: {
    requireModuleExtension: false
  },
  outputDir:path.resolve(__dirName,'../public'),
}