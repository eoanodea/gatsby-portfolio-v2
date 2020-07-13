import React from "react"

import Layout from "../components/Layout"
import Landing from "../sections/Landing"
// import About from "../sections/About"

import SEO from "../components/SEO"

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO
        title="Homepage"
        description="A Gatsby site to be proud of."
        image="/logo.png"
        pathname="/"
        // Boolean indicating whether this is an project:
        // project
      />

      <Landing />
      {/* <About /> */}
    </Layout>
  )
}

export default IndexPage
