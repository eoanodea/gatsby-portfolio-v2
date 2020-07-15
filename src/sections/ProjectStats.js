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
      color="primary"
      height={["20vh", "125vh"]}
      width={["100vw", "100vw"]}
    />

    <Triangle
      color="text"
      height={["20vh", "125vh"]}
      width={["100vw", "100vw"]}
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
              console.log(platforms)
              if (dat.link) {
                return (
                  <StyledToolText color="background" mb={2}>
                    <a
                      href={dat.link}
                      style={{ color: "#05dfd7" }}
                      target="__blank"
                      key={i}
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
