import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import styled from "styled-components"
import ReactMarkdown from "react-markdown"
import markdownRenderer from "../components/MarkdownRenderer"
import ProjectHero from "../sections/ProjectHero"
import ProjectTools from "../sections/ProjectTools"
import Section from "../components/Section"
import Triangle from "../components/Triangle"
import ProjectStats from "../sections/ProjectPlatforms"
import ProjectDescription from "../sections/ProjectDescription"

const Background = () => (
  <div>
    <Triangle
      color="secondary"
      height={["100vh", "125vh"]}
      width={["100vw", "100vw"]}
    />
    <Triangle
      color="backgroundDark"
      height={["100vh", "125vh"]}
      width={["80vw", "100vw"]}
      invertX
    />
    <Triangle
      color="backgroundDark"
      height={["40vh", "100vh"]}
      width={["120vw", "80vw"]}
      invertX
    />
    <Triangle
      color="text"
      height={["15vh", "15vh"]}
      width={["100vw", "100vw"]}
      invertY
    />
  </div>
)

const MarkDownContainer = styled.div`
  max-width: 90%;
  margin: 50px auto 120px auto;
`

export default ({ data }) => {
  const project = data.markdownRemark
  return (
    <Layout>
      <SEO
        title={project.frontmatter.title}
        description={project.frontmatter.description}
        image="/icon.png"
        pathname={project.fields.slug}
        // Boolean indicating whether this is an project:
        project
      />
      <ProjectHero
        name={project.frontmatter.title}
        scrollTo="description"
        imgSrc={project.frontmatter.featimg.childImageSharp.fluid}
      />
      <ProjectDescription
        description={project.frontmatter.description}
        scrollTo="tools"
      />
      <ProjectTools
        tools={project.frontmatter.tools}
        scrollTo={"content-container"}
      />
      <Section.Container id="content-container" Background={Background}>
        <MarkDownContainer>
          <ReactMarkdown
            source={project.rawMarkdownBody}
            renderers={markdownRenderer}
          />
        </MarkDownContainer>
      </Section.Container>

      <ProjectStats
        platforms={project.frontmatter.platforms}
        scrollTo={"content-container"}
        repoUrl={project.frontmatter.repositoryUrl}
      />
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      rawMarkdownBody
      fields {
        slug
      }
      frontmatter {
        platform
        description
        date(formatString: "YYYY MM DD")
        repositoryUrl
        projectUrl
        tools
        platforms {
          name
          link
        }
        title
        logo {
          publicURL
        }
        featimg {
          publicURL
          childImageSharp {
            fluid(maxWidth: 2880) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
