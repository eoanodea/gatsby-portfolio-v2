import React from "react"
// import PropTypes from "prop-types"
import { Image, Text, Flex, Box, Heading } from "rebass/styled-components"
import { StaticQuery, graphql, Link } from "gatsby"
import styled from "styled-components"
import Fade from "react-reveal/Fade"
import Section from "../components/Section"
import { CardContainer, Card } from "../components/Card"
import SocialLink from "../components/SocialLink"
import Triangle from "../components/Triangle"
import ImageSubtitle from "../components/ImageSubtitle"
import Hide from "../components/Hide"
import LinkAnimated from "../components/LinkAnimated"

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
  padding: 40px;
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
    <Card p={0}>
      <Flex style={{ height: CARD_HEIGHT }}>
        <TextContainer>
          <Link to={fields.slug}>
            <Heading
              style={{ fontSize: "1.5em", fontWeight: 500 }}
              color="secondaryDark"
              mb={4}
            >
              <LinkAnimated alt selected>
                {frontmatter.title}
              </LinkAnimated>
            </Heading>
            <Text width={[1]} style={{ overflow: "auto" }} color="text">
              {frontmatter.description}
            </Text>
          </Link>
        </TextContainer>

        <ImageContainer>
          <ProjectImage
            src={frontmatter.featimg.publicURL}
            alt={frontmatter.title}
          />
          <ProjectTag>
            <Flex
              style={{
                float: "right",
              }}
            >
              {frontmatter.repositoryUrl && frontmatter.repositoryUrl !== "" && (
                <Box mx={1} fontSize={5}>
                  <SocialLink
                    name="Check repository"
                    icon="github"
                    link={frontmatter.repositoryUrl}
                  />
                </Box>
              )}
              <Box mx={1} fontSize={5}>
                <SocialLink
                  name="See live project"
                  icon="globe"
                  link={frontmatter.projectUrl}
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
              {frontmatter.platform.join(", ")}
            </ImageSubtitle>
            <Hide query={MEDIA_QUERY_SMALL}>
              <ImageSubtitle bg="backgroundDark">
                {frontmatter.date}
              </ImageSubtitle>
            </Hide>
          </ProjectTag>
        </ImageContainer>
      </Flex>
    </Card>
  )
}

// Project.propTypes = {
//   frontmatter: {
//     description: PropTypes.string.isRequired,
//     projectUrl: PropTypes.string.isRequired,
//     repositoryUrl: PropTypes.string.isRequired,
//     platform: PropTypes.array.isRequired,
//     date: PropTypes.string.isRequired,
//     featimg: {
//       publicURL: PropTypes.string.isRequired,
//     },
//   },
// }

const Projects = () => (
  <Section.Container id="projects" Background={Background}>
    <Section.Header name="Projects" label="notebook" />
    <StaticQuery
      query={graphql`
        query ProjectsQuery {
          allMarkdownRemark(
            filter: { fields: { slug: { ne: "/projects/" } } }
          ) {
            nodes {
              fields {
                slug
              }
              frontmatter {
                platform
                description
                date(formatString: "YYYY")
                repositoryUrl
                projectUrl
                title
                featimg {
                  publicURL
                }
              }
            }
          }
        }
      `}
      render={({ allMarkdownRemark }) => (
        <CardContainer minWidth="350px">
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
