module.exports = {
  plugins: {
   vitest: {}},
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
  },
};
