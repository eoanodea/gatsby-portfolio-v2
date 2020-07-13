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
  const { subject } = pageContext
  console.log(pageContext)

  let pageHeader = `Projects`
  if (subject) {
    pageHeader = `Filed under ${subject}:`
  }

  return (
    <Layout>
      <SEO
        title={`All projects on the subject "${subject}"`}
        description="All projects filed under this subject."
        image="/logo.png"
        pathname={`/subjects/${subject}`}
        // Boolean indicating whether this is an project:
        // project
      />
      <section className={style.projectlist}>
        <h2>{pageHeader}</h2>
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
                  {new Date(node.frontmatter.date)}
                </div>
                <div className={style.project__tax}>
                  Filed under:{" "}
                  {node.frontmatter.tools.map((subject, index) => [
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
  query($subject: String!, $skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      filter: { frontmatter: { subject: { in: [$subject] } } }
      sort: { fields: [frontmatter___date], order: DESC }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          excerpt
          id
          frontmatter {
            title
            date
            tools
            platform
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
