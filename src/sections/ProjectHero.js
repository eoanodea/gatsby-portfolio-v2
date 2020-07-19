import React from "react"
import { Heading } from "rebass/styled-components"
import { SectionLink } from "react-scroll-section"
import Section from "../components/Section"
import Triangle from "../components/Triangle"
import BackgroundImage from "gatsby-background-image"
import styled from "styled-components"
import LinkAnimated from "../components/LinkAnimated"

const StyledBackgroundImage = styled(BackgroundImage)`
  width: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute !important;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -50;
`

const Background = imgSrc => (
  <StyledBackgroundImage fluid={imgSrc}>
    <Triangle
      color="primaryDark"
      height={["20vh", "20vh"]}
      width={["100vw", "130vw"]}
      invertX
    />

    <Triangle
      color="secondary"
      height={["40vh", "30vh"]}
      width={["70vw", "90vw"]}
      invertX
      invertY
    />

    <Triangle
      color="text"
      height={["40vh", "35vh"]}
      width={["100vw", "100vw"]}
      invertY
    />
  </StyledBackgroundImage>
)

const StyledHeroHeading = styled(Heading)`
  font-size: 4em;
  font-weight: 900;
  z-index: 0;
  position: absolute;
  left: 15px;
  bottom: 30px;
`

const ProjectHero = ({ name, scrollTo, imgSrc }) => {
  return (
    <Section.Container id="hero" Background={() => Background(imgSrc)}>
      <SectionLink section={scrollTo}>
        {({ onClick }) => (
          <StyledHeroHeading color="white" onClick={onClick}>
            <LinkAnimated selected onClick={() => {}}>
              {name}
            </LinkAnimated>
          </StyledHeroHeading>
        )}
      </SectionLink>
    </Section.Container>
  )
}

export default ProjectHero
