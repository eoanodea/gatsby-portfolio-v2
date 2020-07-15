import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/Layout"
import { Image, Flex, Box, Card } from "rebass/styled-components"
import SEO from "../components/SEO"
import styled from "styled-components"
import ReactMarkdown from "react-markdown"
import markdownRenderer from "../components/MarkdownRenderer"
import ProjectHero from "../sections/ProjectHero"
import ProjectTools from "../sections/ProjectTools"
import Section from "../components/Section"
import ImageSubtitle from "../components/ImageSubtitle"
import Hide from "../components/Hide"
import SocialLink from "../components/SocialLink"
import Triangle from "../components/Triangle"

const Background = () => (
  <div>
    <Triangle
      color="text"
      height={["80vh", "40vh"]}
      width={["100vw", "100vw"]}
      invertX
    />

    <Triangle
      color="background"
      height={["50vh", "20vh"]}
      width={["50vw", "50vw"]}
      invertX
    />

    <Triangle
      color="primaryDark"
      height={["25vh", "40vh"]}
      width={["75vw", "60vw"]}
      invertX
      invertY
    />

    <Triangle
      color="backgroundDark"
      height={["25vh", "20vh"]}
      width={["100vw", "100vw"]}
      invertY
    />
  </div>
)

const CARD_HEIGHT = "200px"

const MEDIA_QUERY_SMALL = "@media (max-width: 400px)"

const ImageContainer = styled.div`
  margin: auto;
  width: ${CARD_HEIGHT};

  ${MEDIA_QUERY_SMALL} {
    width: calc(${CARD_HEIGHT} / 2);
  }
`

const ProjectImage = styled(Image)`
  width: ${CARD_HEIGHT};
  height: ${CARD_HEIGHT};
  padding: 20px;
  margin-top: 0px;

  ${MEDIA_QUERY_SMALL} {
    height: calc(${CARD_HEIGHT} / 2);
    width: calc(${CARD_HEIGHT} / 2);
    margin-top: calc(${CARD_HEIGHT} / 4);
    padding: 10px;
  }
`

const ProjectTag = styled.div`
  position: relative;
  height: ${CARD_HEIGHT};
  top: calc(
    -${CARD_HEIGHT} - 3.5px
  ); /*don't know why I have to add 3.5px here ... */

  ${MEDIA_QUERY_SMALL} {
    top: calc(-${CARD_HEIGHT} - 3.5px + (${CARD_HEIGHT} / 4));
  }
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
        scrollTo="tools"
        imgSrc={project.frontmatter.featimg.childImageSharp.fluid}
      />
      <ProjectTools
        tools={project.frontmatter.tools}
        scrollTo={"content-container"}
      />

      <Section.Container id="content-container" Background={Background}>
        <Card
          m={2}
          style={{ maxWidth: "50%", margin: "auto", maxHeight: "240px" }}
        >
          <ImageSubtitle bg="backgroundDark" x="right" y="top" round>
            {project.frontmatter.platform.join(", ")}
          </ImageSubtitle>
          <ImageContainer>
            <ProjectImage
              src={project.frontmatter.logo.publicURL}
              alt={project.frontmatter.title}
            />
            <ProjectTag>
              <Flex
                style={{
                  float: "right",
                }}
              >
                {project.frontmatter.repositoryUrl &&
                  project.frontmatter.repositoryUrl !== "" && (
                    <Box mx={1} fontSize={5}>
                      <SocialLink
                        name="Check repository"
                        icon="github"
                        link={project.frontmatter.repositoryUrl}
                      />
                    </Box>
                  )}
                <Box mx={1} fontSize={5}>
                  <SocialLink
                    name="See live project"
                    icon="globe"
                    link={project.frontmatter.projectUrl}
                  />
                </Box>
              </Flex>
              <ImageSubtitle
                bg="primary"
                color="white"
                y="bottom"
                x="right"
                round
              >
                {project.frontmatter.platform.join(", ")}
              </ImageSubtitle>
              <Hide query={MEDIA_QUERY_SMALL}>
                <ImageSubtitle bg="backgroundDark">
                  {project.frontmatter.date}
                </ImageSubtitle>
              </Hide>
            </ProjectTag>
          </ImageContainer>
        </Card>
        <ReactMarkdown
          source={project.rawMarkdownBody}
          renderers={markdownRenderer}
        />
      </Section.Container>
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
