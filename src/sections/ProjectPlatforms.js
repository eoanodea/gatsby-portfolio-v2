import React from "react"
import { Text, Heading, Box } from "rebass/styled-components"
import Section from "../components/Section"
import styled from "styled-components"
import { Fade, Flip } from "react-reveal"
import LinkAnimated from "../components/LinkAnimated"
import Tippy from "@tippy.js/react"
import { motion } from "framer-motion"
import RouteLink from "../components/RouteLink"

const StyledToolHeading = styled(Heading)`
  font-size: 2.5em;
  font-weight: 700;
`

const StyledToolText = styled(Text)`
  font-size: 2em;
`

const ProjectPlatforms = ({ platforms, repoUrl = "" }) => {
  return (
    <div style={{ backgroundColor: "#000" }}>
      <Section.Container id="platforms">
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
          <Flip top cascade delay={300}>
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
        </div>
        <motion.div
          initial={{ "--inner-margin": "5px", "--inner-display": "1" }}
          whileHover={{
            scale: 1.1,
            "--inner-margin": "15px",
            "--inner-display": "1.1",
          }}
          whileTap={{ scale: 1 }}
        >
          <Box
            p={2}
            pl={3}
            pr={3}
            m={1}
            style={{
              backgroundColor: "#000",
              width: "fit-content",
              margin: "80px auto 0 auto",
            }}
          >
            <RouteLink
              link={`/projects`}
              name={"Back to Projects"}
              disableMargin={true}
              icon={"arrow-right"}
            />
          </Box>
        </motion.div>
      </Section.Container>
    </div>
  )
}

export default ProjectPlatforms
