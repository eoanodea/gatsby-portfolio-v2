import React, { Fragment } from "react"
import { Box } from "rebass/styled-components"
import TextLoop from "react-text-loop"
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
      color="text"
      height={["15vh", "20vh"]}
      width={["100vw", "100vw"]}
      invertX
    />

    <Triangle
      color="primaryDark"
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
          <Fade>
            <TextLoop interval={4000}>
              {loop.map(text => (
                <Box p={2} pl={3} pr={3} style={{ backgroundColor: "#000" }}>
                  <RouteLink
                    key={text}
                    link={`/tools/${_.kebabCase(text)}`}
                    selected={false}
                    name={text}
                    disableMargin={true}
                  />
                </Box>
              ))}
            </TextLoop>
          </Fade>
        )}

        <SectionLink section={scrollTo}>
          {({ onClick }) => {
            // console.log("scroll")
            // if (window.location.href.includes("#content")) {
            //   window.location.href = window.location.href.replace(
            //     "#content",
            //     ""
            //   )
            //   setTimeout(() => {
            //     onClick()
            //   }, 2000)
            // }

            return <MouseIcon onClick={onClick} />
          }}
        </SectionLink>
      </Fragment>
    </Section.Container>
  )
}

export default SubLandingPage
