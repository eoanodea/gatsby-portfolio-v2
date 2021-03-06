module.exports = {
  siteMetadata: {
    title: `Eoan O'Dea Portfolio`,
    titleTemplate: `%s · Full Stack Developer, Designer, Engineer & Entrepreneur`,
    logo: `/logo.png`,
    author: {
      name: `Eoan O'Dea`,
      summary: `A Computer Science student and Freelance Web Developer`
    },
    description: `Some description`,
    url: `https://something.or.other`,
    logo: `/logo.png`
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-offline',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-typescript',
    'gatsby-plugin-sass',
    'gatsby-plugin-manifest',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages'
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 1080,
              quality: 100
            }
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `The Project`,
        short_name: `The Project`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#ffffff`,
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: `standalone`,
        icon: `static/icon.png` // This path is relative to the root of the site.
      }
    },
    `gatsby-plugin-offline`
  ]
};
