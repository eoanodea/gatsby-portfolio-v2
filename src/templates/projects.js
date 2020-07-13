import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import _ from "lodash"

import style from "./projects.module.css"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import Pagination from "../components/Pagination"

// Component to place a conditional wrapper around content.
const ConditionalWrapper = ({ condition, wrapper, children }) =>
  condition ? wrapper(children) : children

const ProjectIndex = ({ data, pageContext }) => {
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout>
      <SEO
        title="Projects"
        description="All projects published by the Project"
        image="/logo.png"
        pathname="/projects"
        // Boolean indicating whether this is an project:
        // project
      />
      <section className={style.projectlist}>
        <h2>Projects</h2>
        <ul>
          {posts.map(({ node }, index) => (
            <li key={index} className={style.listitem}>
              {node.frontmatter.featimg && (
                <figure className={style.featimg}>
                  <Link to={node.fields.slug}>
                    <Img
                      fixed={node.frontmatter.featimg.childImageSharp.fixed}
                      alt={node.frontmatter.title}
                    />
                  </Link>
                </figure>
              )}
              <ConditionalWrapper
                // If featured image, wrap content in <div>.
                condition={node.frontmatter.featimg}
                wrapper={children => (
                  <div className={style.project__wrap}>{children}</div>
                )}
              >
                <Link to={node.fields.slug}>
                  <h1 className={style.project__title}>
                    {node.frontmatter.title}
                  </h1>
                </Link>

                <div className={style.project__meta}>
                  by {node.frontmatter.author}. Published{" "}
                  {new Date(node.frontmatter.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}{" "}
                </div>
                <div className={style.project__tax}>
                  Filed under:{" "}
                  {node.frontmatter.subject.map((subject, index) => [
                    index > 0 && ", ",
                    <Link key={index} to={`/subjects/${_.kebabCase(subject)}`}>
                      {subject}
                    </Link>,
                  ])}
                </div>
                <div
                  className={style.project__content}
                  dangerouslySetInnerHTML={{ __html: node.excerpt }}
                />
              </ConditionalWrapper>
            </li>
          ))}
        </ul>
      </section>
      <Pagination pageContext={pageContext} />
    </Layout>
  )
}

export default ProjectIndex

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          excerpt
          id
          frontmatter {
            platform
            description
            date(locale: "YYYY MMMM DD")
            repositoryUrl
            title
            featimg {
              childImageSharp {
                fixed(width: 400, height: 400, cropFocus: ATTENTION) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
