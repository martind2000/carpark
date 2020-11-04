export default {
  input: 'lib/carpark.js',
  output: [
    {
      file: 'dist/carpark.js',
      format: 'umd',
      name: 'carpark',
      sourcemap: true
    },
    {
      file: 'dist/carpark.mjs',
      format: 'es',
      sourcemap: true
    }
  ],
  plugins: []
};
