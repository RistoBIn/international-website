module.exports = {
  siteMetadata: {
    title: 'SEALAB',
    description:
      'Ta merden med inn i kontrollrommet; SEALAB sine undervannskamera kombinert med maskinsyn og spesialutviklet software gir deg en unik innsikt i miljøforhold, fiskevelferd, fôringsprosess og biomasse.',
    email: 'contact@sealab.no',
    phone: '+47 729 09 111',
    siteUrl: `https://www.sealab.no/`,
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/img`,
        name: 'uploads',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/img`,
        name: 'images',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-relative-images',
          },
          'gatsby-remark-unwrap-images',
          {
            resolve: 'gatsby-remark-images',
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 2048,
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static',
            },
          },
        ],
      },
    },
    `gatsby-plugin-styled-components`,
    'gatsby-plugin-netlify-cache',
    'gatsby-plugin-robots-txt',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        exclude: [`/404/*`, `/admin/*`, '/privacy-policy/*', '*/thanks/*'],
        serialize: ({ site, allSitePage }) =>
          allSitePage.edges.map(edge => {
            let path = edge.node.path;
            let priority = 0.6;
            if (path.match(/products/)) {
              priority = 1.0;
            } else if (path.match(/about/)) {
              priority = 0.6;
            } else if (path.match(/contact/)) {
              priority = 1.0;
            } else if (path.match(/history/)) {
              priority = 0.8;
            } else if (path.match(/press/)) {
              priority = 0.8;
            } else if (path.match(/investors/)) {
              priority = 1.0;
            } else if (path.match(/leadership/)) {
              priority = 0.8;
            } else if (path.match(/research-laboratories/)) {
              priority = 0.8;
            } else if (path.match(/about\/partnership/)) {
              priority = 1.0;
            } else if (path.match(/sealab-tv-channel/)) {
              priority = 0.8;
            }

            return {
              url: site.siteMetadata.siteUrl + edge.node.path,
              changefreq: `daily`,
              priority,
            };
          }),
      },
    },
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /\.inline\.svg$/, // See below to configure properly
        },
      },
    },
    {
      resolve: 'gatsby-plugin-purgecss', // purges all unused/unreferenced css rules
      options: {
        develop: true, // Activates purging in npm run develop
        ignoreOrder: true,
        purgeOnly: ['/all.scss'], // applies purging only on the bulma css file
      },
    }, // must be after other CSS plugins
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // replace "UA-XXXXXXXXX-X" with your own Tracking ID
        trackingId: process.env.GOOGLE_ANALYTICS_KEY,
      },
    },
    // {
    //   resolve: "gatsby-plugin-google-tagmanager",
    //   options: {
    //     id: process.env.GOOGLE_TAG_MANAGER_ID,

    //     // Include GTM in development.
    //     // Defaults to false meaning GTM will only be loaded in production.
    //     includeInDevelopment: false,

    //     // datalayer to be set before GTM is loaded
    //     // should be an object or a function that is executed in the browser
    //     // Defaults to null
    //     defaultDataLayer: { platform: "gatsby" },

    //     // Specify optional GTM environment details.
    //     // gtmAuth: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_AUTH_STRING",
    //     // gtmPreview: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_PREVIEW_NAME",
    //     // dataLayerName: "YOUR_DATA_LAYER_NAME",
    //   },
    // },
    'gatsby-plugin-netlify', // make sure to keep it last in the array
  ],
};
