import React from "react"
import { graphql, Link } from "gatsby"

import Fade from "react-reveal/Fade"

import { Heading, Text } from "rebass/styled-components"

import styled from "styled-components"
import Triangle from "../components/Triangle"
import { CardContainer, Card } from "../components/Card"
import Section from "../components/Section"
import ImageSubtitle from "../components/ImageSubtitle"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import Pagination from "../components/Pagination"

import SubPageLanding from "../sections/SubPageLanding"

const Background = () => (
  <div>
    <Triangle
      color="secondary"
      height={["20vh", "20vh"]}
      width={["100vw", "100vw"]}
    />

    <Triangle
      color="backgroundDark"
      height={["50vh", "40vh"]}
      width={["70vw", "80vw"]}
      invertY
    />

    <Triangle
      color="primaryDark"
      height={["40vh", "15vh"]}
      width={["100vw", "100vw"]}
      invertX
      invertY
    />
  </div>
)

const CoverImage = styled.img`
  width: 100%;
  object-fit: cover;
`

const Post = ({ fields, frontmatter }) => (
  <Link to={fields.slug}>
    <Card m={2} pb={4}>
      <Heading
        style={{ fontSize: "1.5em", fontWeight: 500, cursor: "pointer" }}
        color="secondaryDark"
        m={3}
        mb={4}
      >
        {frontmatter.title}.
      </Heading>
      <ImageSubtitle bg="backgroundDark" x="right" y="top" round>
        {frontmatter.platform.join(", ")}
      </ImageSubtitle>
      {frontmatter.featimg && (
        <CoverImage
          src={frontmatter.featimg.publicURL}
          height="200px"
          alt={frontmatter.title}
        />
      )}
      <Text m={3} color="text">
        {frontmatter.description}.
      </Text>
      <ImageSubtitle bg="primary" color="white" x="right" y="bottom" round>
        {frontmatter.date}
      </ImageSubtitle>
    </Card>
  </Link>
)

const getToolsArrFromQuery = tools => {
  let result = []
  tools.map(dat => result.push(dat.fieldValue))
  return result
}

const ProjectIndex = ({ data, pageContext }) => {
  const posts = data.postsResult.edges
  const tools = getToolsArrFromQuery(data.toolsResult.group)
  return (
    <Layout>
      <SEO
        title="Projects"
        description="All projects I have worked on"
        image="/logo.png"
        pathname="/projects"
        // Boolean indicating whether this is an project:
        // project
      />
      <SubPageLanding name="Projects" scrollTo="projects" loop={tools} />
      <Section.Container id="projects" Background={Background}>
        <CardContainer minWidth="300px">
          {posts.map(({ node }, i) => (
            <Fade bottom key={i}>
              <Post {...node} key={i} />
            </Fade>
          ))}
        </CardContainer>
      </Section.Container>
      <Pagination pageContext={pageContext} />
    </Layout>
  )
}

export default ProjectIndex

export const query = graphql`
  query getAllToolsAndGetProjects($skip: Int!, $limit: Int!) {
    postsResult: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { slug: { ne: "/projects/" } } }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          id
          frontmatter {
            platform
            description
            date(formatString: "MM / YYYY")
            repositoryUrl
            projectUrl
            title
            featimg {
              publicURL
            }
          }
          fields {
            slug
          }
        }
      }
    }

    toolsResult: allMarkdownRemark {
      group(field: frontmatter___tools) {
        fieldValue
      }
    }
  }
`
