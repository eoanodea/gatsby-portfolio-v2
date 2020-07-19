import React from "react"
import { Text, Heading } from "rebass/styled-components"
import { SectionLink } from "react-scroll-section"
import Section from "../components/Section"
import Triangle from "../components/Triangle"
import styled from "styled-components"
import MouseIcon from "../components/MouseIcon"
import { Fade, Flip } from "react-reveal"
import LinkAnimated from "../components/LinkAnimated"
import Tippy from "@tippy.js/react"

const Background = () => (
  <div>
    <Triangle
      color="backgroundDark"
      height={["20vh", "20vh"]}
      width={["100vw", "80vw"]}
      invertY
      invertX
    />

    <Triangle
      color="text"
      height={["50vh", "125vh"]}
      width={["150vw", "100vw"]}
      invertX
    />
    <Triangle
      color="text"
      height={["20vh", "125vh"]}
      width={["150vw", "100vw"]}
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

const ProjectStats = ({ platforms, scrollTo, repoUrl = "" }) => {
  return (
    <Section.Container id="platforms" Background={Background}>
      <div
        style={{
          textAlign: "center",
          backgroundColor: "#000",
          padding: 12,
          borderRadius: 12,
        }}
      >
        <Fade>
          <StyledToolHeading color="white">Available on:</StyledToolHeading>
        </Fade>
        <Flip top cascade>
          <div>
            {platforms.map((dat, i) => {
              if (dat.link) {
                return (
                  <StyledToolText color="background" mb={2} key={i}>
                    <a
                      href={dat.link}
                      style={{ color: "#05dfd7" }}
                      target="__blank"
                    >
                      <LinkAnimated selected={false} onClick={() => {}}>
                        {dat.name}
                      </LinkAnimated>
                    </a>
                  </StyledToolText>
                )
              }
              return (
                <StyledToolText color="background" mb={2} key={i}>
                  <Tippy
                    content={"Work in progress 🛠"}
                    trigger="mouseenter"
                    arrow={false}
                    placement="bottom"
                  >
                    <LinkAnimated selected={false} onClick={() => {}}>
                      {dat.name}
                    </LinkAnimated>
                  </Tippy>
                </StyledToolText>
              )
            })}
            {repoUrl !== "" && (
              <React.Fragment>
                {" "}
                <hr style={{ margin: 12 }} />
                <a href={repoUrl} target="__blank">
                  <Fade up>
                    <StyledToolText color="background" mb={2}>
                      <LinkAnimated selected={false} onClick={() => {}}>
                        View Code on Github
                      </LinkAnimated>
                    </StyledToolText>
                  </Fade>
                </a>
              </React.Fragment>
            )}
          </div>
        </Flip>

        <SectionLink section={scrollTo}>
          {({ onClick }) => <MouseIcon onClick={onClick} />}
        </SectionLink>
      </div>
    </Section.Container>
  )
}

export default ProjectStats
