/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-plugin-matomo',
      options: {
        siteId: '5',
        matomoUrl: 'https://analytics.octopusth.ink',
        siteUrl: 'https://funfactsaboutoctopus.es',
        requireConsent: false,
        disableCookies: true,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/src/content/`,
        ignore: [`**/*\.js`],
      },
    },
    'gatsby-transformer-remark',
  ],
};
