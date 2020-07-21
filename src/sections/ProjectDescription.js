import React from "react"
import { Heading } from "rebass/styled-components"
import { SectionLink } from "react-scroll-section"
import Section from "../components/Section"
import styled from "styled-components"
import MouseIcon from "../components/MouseIcon"
import { Fade } from "react-reveal"

const StyledToolHeading = styled(Heading)`
  font-size: 2.5em;
  font-weight: 700;
`

const ProjectDescription = ({ description, scrollTo }) => {
  return (
    <div style={{ backgroundColor: "#000" }}>
      <Section.Container id="description">
        <div
          style={{
            textAlign: "center",
            padding: 12,
            borderRadius: 12,
          }}
        >
          <Fade cascade>
            <StyledToolHeading color="white">{description}</StyledToolHeading>
          </Fade>

          <SectionLink section={scrollTo}>
            {({ onClick }) => <MouseIcon onClick={onClick} />}
          </SectionLink>
        </div>
      </Section.Container>
    </div>
  )
}

export default ProjectDescription
