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

module.exports = nextConfig;
