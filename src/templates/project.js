import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import _ from "lodash"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import style from "./project.module.css"

export default ({ data }) => {
  const project = data.markdownRemark
  return (
    <Layout>
      <SEO
        title={project.frontmatter.title}
        description={project.excerpt}
        image="/icon.png"
        pathname={project.fields.slug}
        // Boolean indicating whether this is an project:
        project
      />
      <project className={style.project}>
        {project.frontmatter.featimg && (
          <figure className={style.featimg}>
            <Img
              fluid={project.frontmatter.featimg.childImageSharp.fluid}
              alt={project.frontmatter.title}
            />
          </figure>
        )}

        <h1 className={style.project__title}>{project.frontmatter.title}</h1>

        <div className={style.project__meta}>
          by {project.frontmatter.author}. Published{" "}
          {new Date(project.frontmatter.date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}{" "}
        </div>
        <div className={style.project__tax}>
          Filed under:{" "}
          {project.frontmatter.subject.map((subject, index) => [
            index > 0 && ", ",
            <Link key={index} to={`/subjects/${_.kebabCase(subject)}`}>
              {subject}
            </Link>,
          ])}
        </div>
        <div
          className={style.project__content}
          // See https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml
          dangerouslySetInnerHTML={{ __html: project.html }}
        />
      </project>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      fields {
        slug
      }
      frontmatter {
        title
        date
        subject
        author
        featimg {
          childImageSharp {
            fluid(maxWidth: 1360) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
