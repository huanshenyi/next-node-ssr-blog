/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    env: {
      GITHUBCLIENTID: process.env['GITHUBCLIENTID'],
      GITHUBSECRET: process.env['GITHUBSECRET'],
    },
  },
};

const removeImports = require('next-remove-imports')();
module.exports = removeImports(nextConfig);
