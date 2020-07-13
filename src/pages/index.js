import React, { Fragment } from "react"
import { StaticQuery, graphql } from "gatsby"

import Layout from "../components/Layout"
import Landing from "../sections/Landing"
import About from "../sections/About"

import SEO from "../components/SEO"

const IndexPage = () => {
  return (
    <Layout>
      <SEO
        title="Home"
        description="Eoan O'Dea Portfolio Website - Build using Gatsby & React.js"
        image="/logo.png"
        pathname="/"
        // Boolean indicating whether this is an project:
        // project
      />
      <StaticQuery
        query={graphql`
          query AboutSectionQuery {
            allMarkdownRemark(
              filter: { frontmatter: { title: { eq: "About" } } }
            ) {
              edges {
                node {
                  id
                  frontmatter {
                    title
                    name
                    roles
                    socialLinks {
                      name
                      link
                      icon
                    }
                  }
                  rawMarkdownBody
                }
              }
            }
          }
        `}
        render={({ allMarkdownRemark }) => {
          const {
            name,
            socialLinks,
            roles,
          } = allMarkdownRemark.edges[0].node.frontmatter
          const { rawMarkdownBody } = allMarkdownRemark.edges[0].node

          return (
            <Fragment>
              <Landing socialLinks={socialLinks} name={name} roles={roles} />
              <About markDown={rawMarkdownBody} />
            </Fragment>
          )
        }}
      />
    </Layout>
  )
}

export default IndexPage
