/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: `Eoan O'Dea`,
    titleTemplate: `%s · Full Stack Developer, Designer, Engineer & Entrepreneur`,
    author: {
      name: `Eoan O'Dea`,
      summary: `A Computer Science student and Freelance Web Developer`,
    },
    description: `Some description`,
    url: `https://something.or.other`,
    logo: `/logo.png`,
    menuLinks: [
      {
        name: `Home`,
        link: `/`,
      },
      {
        name: `Projects`,
        link: `/projects`,
      },
    ],
  },
  proxy: [
    {
      prefix: "/api",
      url: "https://www.toggl.com",
    },
    {
      prefix: "/reports/api",
      url: "https://www.toggl.com",
    },
  ],
  plugins: [
    `gatsby-plugin-ts`,
    `gatsby-env-variables`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/content/images/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `projects`,
        path: `${__dirname}/content/projects/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `about`,
        path: `${__dirname}/content/about/`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 1080,
              quality: 100,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Eoan O Dea Portfolio`,
        short_name: `Portfolio`,
        start_url: `/`,
        background_color: `#05dfd7`,
        theme_color: `#fa26a0`,
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: `standalone`,
        icon: `static/icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-offline`,
  ],
}
