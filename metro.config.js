const exts = ['jsx', 'js', 'json', 'ts', 'tsx'];
const envExts = process.env.PLATFORM
  ? exts.map(ext => `${process.env.PLATFORM.toLowerCase()}.${ext}`)
  : [];
const sourceExts = envExts.concat(exts);

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    sourceExts,
  },
};
