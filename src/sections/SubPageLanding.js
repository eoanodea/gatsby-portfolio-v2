import React, { Fragment } from "react"
import { Box } from "rebass/styled-components"
import { SectionLink } from "react-scroll-section"
import Section from "../components/Section"
import MouseIcon from "../components/MouseIcon"
import Triangle from "../components/Triangle"
import Fade from "react-reveal/Fade"
import _ from "lodash"
import RouteLink from "../components/RouteLink"

const Background = () => (
  <div>
    <Triangle
      color="primaryDark"
      height={["15vh", "20vh"]}
      width={["100vw", "100vw"]}
      invertX
    />

    <Triangle
      color="text"
      height={["50vh", "40vh"]}
      width={["70vw", "40vw"]}
      invertY
    />

    <Triangle
      color="secondary"
      height={["40vh", "15vh"]}
      width={["100vw", "100vw"]}
      invertX
      invertY
    />
  </div>
)

const SubLandingPage = ({ name, loop = [], scrollTo }) => {
  return (
    <Section.Container id="home" Background={Background}>
      <Fragment>
        <Section.Header name={name} label={name} />
        {loop.length > 0 && (
          <Fade top cascade>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {loop.map((text, i) => (
                <Box
                  p={2}
                  pl={3}
                  pr={3}
                  m={1}
                  key={i}
                  style={{ backgroundColor: "#000" }}
                >
                  <RouteLink
                    key={text}
                    link={`/projects/tools/${_.kebabCase(text)}`}
                    selected={false}
                    name={text}
                    disableMargin={true}
                  />
                </Box>
              ))}
            </div>
          </Fade>
        )}

        <SectionLink section={scrollTo}>
          {({ onClick }) => {
            return <MouseIcon onClick={onClick} />
          }}
        </SectionLink>
      </Fragment>
    </Section.Container>
  )
}

export default SubLandingPage
