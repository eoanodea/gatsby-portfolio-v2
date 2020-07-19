/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require(`path`)
const _ = require(`lodash`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const { paginate } = require(`gatsby-awesome-pagination`)

/**
 * Events
 */

// Define the "Event" node type with a "collection" field.
exports.sourceNodes = ({ actions }) => {
  actions.createTypes(`
      type Event implements Node @dontInfer {
      id: ID!
      name: String!
      location: String!
      startDate: Date! @dateformat @proxy(from: "start_date")
      endDate: Date! @dateformat @proxy(from: "end_date")
      url: String!
      collection: String!
      }
    `)
}

// Add and populate a "collection" field based on the file directory name.
exports.createResolvers = ({ createResolvers, getNode }) => {
  // Get the containing directory for the event (past or future)
  const collection = source => getNode(source.parent).relativeDirectory

  // Add a "collection" field to each node.
  createResolvers({
    Event: {
      collection: {
        resolve: source => collection(source),
      },
    },
  })
}

/**
 * Projects
 */

// Default tools taxonomy to "random" if no tools provided.
exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions
  const typeDefs = [
    "type MarkdownRemark implements Node { frontmatter: Frontmatter }",
    schema.buildObjectType({
      name: "Frontmatter",
      fields: {
        tools: {
          type: "[String!]",
          resolve(source, args, context, info) {
            const { tools } = source
            if (
              source.tools == null ||
              (Array.isArray(tools) && !tools.length)
            ) {
              return ["random"]
            }
            return tools
          },
        },
      },
    }),
  ]
  createTypes(typeDefs)
}

// Markdown items: Create slug nodes based on folder
exports.onCreateNode = ({ node, getNode, actions }) => {
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `content` })

    actions.createNodeField({
      node,
      name: `slug`,
      value: `/projects${slug}`,
    })
  }
}

// Generate pages for each project.

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  // Query all the data
  const queryResult = await graphql(`
    {
      postQuery: allMarkdownRemark(
        sort: { order: ASC, fields: [frontmatter___date] }
        filter: { fields: { slug: { ne: "/projects/" } } }
      ) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
      taxQuery: allMarkdownRemark {
        group(field: frontmatter___tools) {
          nodes {
            id
          }
          fieldValue
        }
      }
    }
  `)
  if (queryResult.errors) {
    reporter.panic("error loading events", queryResult.errors)
    return
  }

  // Generate single post pages
  const posts = queryResult.data.postQuery.edges
  posts.forEach(post => {
    createPage({
      path: post.node.fields.slug,
      component: path.resolve(`./src/templates/Project.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: post.node.fields.slug,
      },
    })
  })

  // Create your paginated pages
  paginate({
    createPage, // The Gatsby `createPage` function
    items: posts, // An array of objects
    itemsPerPage: 2, // How many items you want per page
    pathPrefix: "/projects", // Creates pages like `/blog`, `/blog/2`, etc
    component: path.resolve(`./src/templates/Projects.js`), // Just like `createPage()`
  })

  const taxonomies = queryResult.data.taxQuery.group
  taxonomies.map(({ nodes: nodes, fieldValue: fieldValue }) => {
    paginate({
      createPage, // The Gatsby `createPage` function
      items: nodes, // An array of objects
      itemsPerPage: 2, // How many items you want per page
      pathPrefix: `/projects/tools/${_.kebabCase(fieldValue)}`, // Creates pages like `/blog`, `/blog/2`, etc
      component: path.resolve(`./src/templates/Tools.js`), // Just like `createPage()`
      context: { tools: fieldValue },
    })
  })
}
