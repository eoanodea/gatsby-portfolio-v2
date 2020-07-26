import React from "react"
import { Heading, Card, Text } from "rebass/styled-components"
import { SectionLink } from "react-scroll-section"
import Section from "../components/Section"
import styled from "styled-components"
import MouseIcon from "../components/MouseIcon"
import { Fade } from "react-reveal"

const StyledToolHeading = styled(Heading)`
  font-size: 2.5em;
  font-weight: 700;
`

const StyledToolText = styled(Heading)`
  font-size: 2.5em;
  font-weight: 700;
`

const ProjectDescription = ({ description }) => {
  return (
    <Card>
      <Heading>{description}</Heading>
      <Text>Howdy</Text>
      {/* <StyledToolHeading color="white">{description}</StyledToolHeading> */}
    </Card>
  )
}

export default ProjectDescription
