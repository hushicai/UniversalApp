const exts = ['jsx', 'js', 'json', 'ts', 'tsx'];
const envExts = process.env.CONTAINER
  ? exts.map(ext => `${process.env.CONTAINER.toLowerCase()}.${ext}`)
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
