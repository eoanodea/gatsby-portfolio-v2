import React from "react"
import { Text, Heading } from "rebass/styled-components"
import { SectionLink } from "react-scroll-section"
import Section from "../components/Section"
import Triangle from "../components/Triangle"
import styled from "styled-components"
import MouseIcon from "../components/MouseIcon"
import { Fade, Flip } from "react-reveal"
import RouteLink from "../components/RouteLink"
import _ from "lodash"

const Background = () => (
  <div>
    <Triangle
      color="primary"
      height={["20vh", "125vh"]}
      width={["100vw", "100vw"]}
      invertX
    />

    <Triangle
      color="text"
      height={["20vh", "125vh"]}
      width={["100vw", "100vw"]}
      invertY
    />
  </div>
)

const StyledToolHeading = styled(Heading)`
  font-size: 2.5em;
  font-weight: 700;
`

const StyledToolText = styled(Text)`
  font-size: 2em;
`

const ProjectTools = ({ tools, scrollTo }) => {
  return (
    <Section.Container id="tools" Background={Background}>
      <div
        style={{
          textAlign: "center",
          backgroundColor: "#000",
          padding: 12,
          borderRadius: 12,
        }}
      >
        <Fade>
          <StyledToolHeading color="white">Built with:</StyledToolHeading>
        </Fade>
        <Flip top cascade>
          <div>
            {tools.map((dat, i) => {
              return (
                <StyledToolText color="white" mb={2} key={i}>
                  <RouteLink
                    link={`/tools/${_.kebabCase(dat)}`}
                    name={dat}
                    selected={false}
                  />
                </StyledToolText>
              )
            })}
          </div>
        </Flip>

        <SectionLink section={scrollTo}>
          {({ onClick }) => <MouseIcon onClick={onClick} />}
        </SectionLink>
      </div>
    </Section.Container>
  )
}

export default ProjectTools
