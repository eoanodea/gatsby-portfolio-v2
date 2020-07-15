import React from "react"
import { graphql, Link } from "gatsby"

import styled from "styled-components"
import Triangle from "../components/Triangle"
import { Heading, Text } from "rebass/styled-components"

import Fade from "react-reveal/Fade"
import { CardContainer, Card } from "../components/Card"
import Section from "../components/Section"
import ImageSubtitle from "../components/ImageSubtitle"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import Pagination from "../components/Pagination"
import SubLandingPage from "../sections/SubPageLanding"

const Background = () => (
  <div>
    <Triangle
      color="secondaryLight"
      height={["50vh", "20vh"]}
      width={["50vw", "50vw"]}
      invertY
    />

    <Triangle
      color="primaryDark"
      height={["20vh", "40vh"]}
      width={["75vw", "70vw"]}
      invertX
    />

    <Triangle
      color="secondary"
      height={["25vh", "20vh"]}
      width={["100vw", "100vw"]}
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
        {frontmatter.description}
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
  const allTools = getToolsArrFromQuery(data.toolsResult.group)

  const { tools } = pageContext
  console.log(pageContext)

  let pageHeader = `Projects`
  if (tools) {
    pageHeader = `Built with ${tools}`
  }

  return (
    <Layout>
      <SEO
        title={`All projects built using ${tools}`}
        description={`All projects built using ${tools}.`}
        image="/logo.png"
        pathname={`/tools/${tools}`}
        // Boolean indicating whether this is an project:
        // project
      />
      <SubLandingPage name={pageHeader} scrollTo={pageHeader} loop={allTools} />
      <Section.Container id={pageHeader} Background={Background}>
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
  query($tools: String!, $skip: Int!, $limit: Int!) {
    postsResult: allMarkdownRemark(
      filter: {
        frontmatter: { tools: { in: [$tools] } }
        fields: { slug: { ne: "/projects/" } }
      }

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
