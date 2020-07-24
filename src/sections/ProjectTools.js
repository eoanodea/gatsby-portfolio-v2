import React from "react"
import { Text, Heading, Card, Box, Flex } from "rebass/styled-components"
import { SectionLink } from "react-scroll-section"
import Section from "../components/Section"
import Triangle from "../components/Triangle"
import styled from "styled-components"
import MouseIcon from "../components/MouseIcon"
import { Fade, Flip } from "react-reveal"
import RouteLink from "../components/RouteLink"
import _ from "lodash"
import ProjectDetails from "../components/Toggl/ProjectDetails"

const Background = () => (
  <div>
    <Triangle
      color="text"
      height={["50vh", "125vh"]}
      width={["150vw", "100vw"]}
    />

    <Triangle
      color="backgroundDark"
      height={["50vh", "125vh"]}
      width={["150vw", "100vw"]}
      invertY
      invertX
    />
  </div>
)

const StyledToolHeading = styled(Heading)`
  font-size: 2.5em;
  font-weight: 700;
  margin: 20px 0;
  @media (max-width: 400px) {
    font-size: 2.4em;
  }
`

const StyledToolSubHeading = styled(Heading)`
  font-size: 1.8em;
  font-weight: 600;
  margin: 20px 0;
  @media (max-width: 400px) {
    font-size: 1.5em;
  }
`
const StyledToolText = styled(Text)`
  font-size: 1.5em;
  margin: 20px;
  @media (max-width: 400px) {
    font-size: 1.4em;
  }
`

const ProjectTools = ({ togglId, description, tools, scrollTo }) => {
  return (
    <Section.Container id="tools" Background={Background}>
      <Card
        style={{
          textAlign: "left",
          backgroundColor: "#000",
          padding: 24,
          borderRadius: 12,
          margin: [0, 12],
        }}
      >
        <Flex
          justifyContent="space-between"
          alignItems="baseline"
          flexWrap="wrap"
        >
          <Box width={[1, 2 / 3]}>
            <StyledToolHeading color="white">{description}.</StyledToolHeading>
          </Box>
          <Box width={[2 / 4, 1 / 3]}>
            <Fade bottom>
              <div>
                <Fade>
                  <StyledToolSubHeading color="white">
                    Built with:
                  </StyledToolSubHeading>
                </Fade>
                <Flip bottom cascade delay={500}>
                  {tools.map((dat, i) => {
                    return (
                      <StyledToolText color="white" mb={2} key={i}>
                        <RouteLink
                          link={`/projects/tools/${_.kebabCase(dat)}`}
                          name={dat}
                          selected={false}
                          fontSize={[3, 4]}
                        />
                      </StyledToolText>
                    )
                  })}
                </Flip>
              </div>
            </Fade>
          </Box>
          <Box width={1}>
            {/* <Flex justifyContent="space-between"> */}
            <ProjectDetails togglId={togglId} />
            {/* </Flex> */}
          </Box>

          <Box width={1}>
            <SectionLink section={scrollTo}>
              {({ onClick }) => <MouseIcon onClick={onClick} />}
            </SectionLink>
          </Box>
        </Flex>
      </Card>
    </Section.Container>
  )
}

export default ProjectTools
