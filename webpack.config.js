module.exports = {
    // Other webpack configurations...
    resolve: {
      fallback: {
        url: require.resolve("url/"),
      },
    },
  };