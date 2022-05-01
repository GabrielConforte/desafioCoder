module.exports = {
    apps : [{
      name: "Mi server 1",
      script: "./index.js",
      watch: true,
      max_memory_restart: "1000M",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      }
    }],
  }