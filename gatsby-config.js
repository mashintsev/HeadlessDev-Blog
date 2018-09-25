module.exports = {
    siteMetadata: {
        title: 'The HeadlessDev Blog',
        description: `Blazing fast serverless personal blog`,
        siteUrl: `https://blog.headlessdev.com`,
    },
    plugins: [
        {
            resolve: 'gatsby-plugin-styled-components',
            options: {
                displayName: true,
                preprocess: true,
                minify: false,
                transpileTemplateLiterals: false,
            },
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: "The HeadlessDev Blog",
                short_name: "The HeadlessDev Blog",
                start_url: "/",
                "background_color": "#fff",
                theme_color: "#fff",
                display: "minimal-ui",
                icon: "src/img/logo.png",
            },
        },
        'gatsby-plugin-offline',
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-sass',
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/src/pages`,
                name: 'pages',
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/src/img`,
                name: 'images',
            },
        },
        `gatsby-transformer-json`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `./src/data/`,
            },
        },
        {
            resolve: 'gatsby-source-apiserver',
            options: {
                // Type prefix of entities from server
                typePrefix: 'atlas__',

                // The url, this should be the endpoint you are attempting to pull data from
                url: `https://api.bitbucket.org/2.0/repositories/atlassian?sort=-updated_on&pagelen=100`,

                method: 'get',
                //
                headers: {
                    'Content-Type': 'application/json'
                },

                // Request body
                // data: {},

                // Name of the data to be downloaded.  Will show in graphQL or be saved to a file
                // using this name. i.e. posts.json
                name: `repos`,

                // Nested level of entities in repsonse object, example: `data.posts`
                // entityLevel: `values`,

                // Define schemaType to normalize blank values
                // example:
                // const postType = {
                //   id: 1,
                //   name: 'String',
                //   published: true,
                //   object: {a: 1, b: '2', c: false},
                //   array: [{a: 1, b: '2', c: false}]
                // }
                schemaType: {},

                // Simple authentication, if optional, set it null
                auth: null,

                // Optional payload key name if your api returns your payload in a different key
                // Default will use the full response from the http request of the url
                payloadKey: `values`,

                // Optionally save the JSON data to a file locally
                // Default is false
                // localSave: true,

                //  Required folder path where the data should be saved if using localSave option
                //  This folder must already exist
                // path: `${__dirname}/src/data/auth/`,

                // Optionally include some output when building
                // Default is false
                verboseOutput: false, // For debugging purposes

                // Optionally skip creating nodes in graphQL.  Use this if you only want
                // The data to be saved locally
                // Default is false
                // skipCreateNode: true, // skip import to graphQL, only use if localSave is all you want
            }
        },
        {
            resolve: 'gatsby-source-apiserver',
            options: {
                typePrefix: 'atlas__',
                url: `https://api.bitbucket.org/2.0/repositories/atlassianlabs?sort=-updated_on&pagelen=100`,
                method: 'get',
                headers: {
                    'Content-Type': 'application/json'
                },
                name: `labsRepos`,
                auth: null,
                payloadKey: `values`,
            }
        },
        // {
        //     resolve: 'gatsby-source-apiserver',
        //     options: {
        //         typePrefix: 'stroi_mos__',
        //         url: `https://stroi.mos.ru/api/construction?search=&adm_unit=&func_type%5B%5D=renov-bld&func_type%5B%5D=renov-1719&func_type%5B%5D=renov-2023&finish_year=2025`,
        //         method: 'get',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         name: `renovation`,
        //         auth: null,
        //     }
        // },
        'gatsby-plugin-sharp',
        'gatsby-transformer-sharp',
        {
            resolve: 'gatsby-transformer-remark',
            options: {
                plugins: [],
            },
        },
        {
            resolve: 'gatsby-plugin-netlify-cms',
            options: {
                modulePath: `${__dirname}/src/cms/cms.js`,
            },
        },
        {
            resolve: `gatsby-plugin-sitemap`
        },
        {
            resolve: `gatsby-plugin-feed`,
            options: {
                query: `{
                  site {
                    siteMetadata {
                      title
                      description
                      siteUrl
                      site_url: siteUrl
                    }
                  }
                }`,
                feeds: [
                    {
                        serialize: ({ query: { site, allMarkdownRemark } }) => {
                            return allMarkdownRemark.edges.map(edge => {
                                return Object.assign({}, edge.node.frontmatter, {
                                    description: edge.node.excerpt,
                                    url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                                    guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                                    custom_elements: [{ 'content:encoded': edge.node.html }],
                                })
                            })
                        },
                        query: `{
                              allMarkdownRemark(
                                limit: 1000,
                                sort: { order: DESC, fields: [frontmatter___date] },
                                filter: { frontmatter: { templateKey: { eq: "blog-post" }, tags: {ne:"Old posts"} }}
                              ) {
                                edges {
                                  node {
                                    excerpt
                                    html
                                    fields { slug }
                                    frontmatter {
                                      title
                                      date
                                    }
                                  }
                                }
                              }
                            }`,
                        output: '/rss.xml',
                    },
                ],
            },
        },
        'gatsby-plugin-netlify', // make sure to keep it last in the array
    ],
}
