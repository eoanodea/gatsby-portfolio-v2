import React from "react"
import { Heading, Box, Text } from "rebass/styled-components"
import Layout from "../components/Layout"
import Section from "../components/Section"
import Triangle from "../components/Triangle"
import LinkAnimated from "../components/LinkAnimated"
import { Link } from "gatsby"
import styled from "styled-components"

const Background = () => (
  <div>
    <Triangle
      color="backgroundDark"
      height={["35vh", "80vh"]}
      width={["95vw", "60vw"]}
    />

    <Triangle
      color="primaryDark"
      height={["25vh", "35vh"]}
      width={["75vw", "60vw"]}
      invertX
    />

    <Triangle
      color="secondaryLight"
      height={["10vh", "20vh"]}
      width={["50vw", "50vw"]}
      invertX
      invertY
    />
  </div>
)

const LinkText = styled(Text)`
  color: ${props => props.theme.colors.primaryLight};
  margin: 20px;
`

const NotFoundPage = () => (
  <Layout>
    <Section.Container id="404" Background={Background}>
      <Box width={[320, 400, 600]} m="auto">
        <Heading color="primary" fontSize={["8rem", "12rem", "14rem"]} as="h1">
          404.
        </Heading>
        <Heading color="text" fontSize={["3rem", "4rem", "5rem"]} as="h2">
          There isn&apos;t anything here
        </Heading>
        <Link to="/">
          <LinkText fontSize={["2rem", "3rem"]}>
            <LinkAnimated onClick={() => {}}>Home</LinkAnimated>
          </LinkText>
        </Link>
      </Box>
    </Section.Container>
  </Layout>
)

export default NotFoundPage
