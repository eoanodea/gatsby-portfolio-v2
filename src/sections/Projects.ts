import React from "react"
import { Image, Text, Flex, Heading } from "rebass/styled-components"
import { StaticQuery, graphql, Link } from "gatsby"
import styled from "styled-components"
import Fade from "react-reveal/Fade"
import Section from "../components/Section"
import { CardContainer, Card } from "../components/Card"
import Triangle from "../components/Triangle"
import ImageSubtitle from "../components/ImageSubtitle"
import Hide from "../components/Hide"
import { motion } from "framer-motion"

const Background = () => (
  <div>
    <Triangle
      color="secondaryLight"
      height={["80vh", "80vh"]}
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

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 100%;
  width: calc(100% - ${CARD_HEIGHT});

  ${MEDIA_QUERY_SMALL} {
    width: calc(100% - (${CARD_HEIGHT} / 2));
  }
`

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

const Project = ({ fields, frontmatter }) => {
  return (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 1 }}>
      <Card p={0} m={1}>
        <Link to={fields.slug}>
          <Flex style={{ height: CARD_HEIGHT }}>
            <TextContainer>
              <Heading
                style={{ fontSize: "1.5em", fontWeight: 500 }}
                color="secondaryDark"
                m={1}
                mb={4}
              >
                {frontmatter.title}.
              </Heading>
              <Text m={1} width={[1]} style={{ overflow: "auto" }} color="text">
                {frontmatter.description}.
              </Text>
            </TextContainer>

            <ImageContainer>
              <ProjectImage
                src={frontmatter.logo.publicURL}
                alt={frontmatter.title}
              />
              <ProjectTag>
                <ImageSubtitle
                  bg="primary"
                  color="white"
                  y="bottom"
                  x="right"
                  round
                >
                  {frontmatter.platform.join(", ")}
                </ImageSubtitle>
                <Hide query={MEDIA_QUERY_SMALL}>
                  <ImageSubtitle bg="backgroundDark" color="text">
                    {frontmatter.date}
                  </ImageSubtitle>
                </Hide>
              </ProjectTag>
            </ImageContainer>
          </Flex>
        </Link>
      </Card>
    </motion.div>
  )
}

const Projects = () => (
  <Section.Container id="projects" Background={Background}>
    <Section.Header name="Projects" label="notebook" />
    <StaticQuery
      query={graphql`
        query ProjectsQuery {
          allMarkdownRemark(
            limit: 3
            filter: { fields: { slug: { ne: "/projects/" } } }
          ) {
            nodes {
              fields {
                slug
              }
              frontmatter {
                platform
                description
                date(formatString: "MM / YYYY")
                repositoryUrl
                projectUrl
                title
                logo {
                  publicURL
                }
              }
            }
          }
        }
      `}
      render={({ allMarkdownRemark }) => (
        <CardContainer minWidth="350px" maxWidth="90%">
          {allMarkdownRemark.nodes.map((p, i) => (
            <Fade bottom delay={i * 200} key={i}>
              <Project {...p} />
            </Fade>
          ))}
        </CardContainer>
      )}
    />
  </Section.Container>
)

export default Projects
