/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

import React from "react"
import PropTypes from "prop-types"
import Layout from "./src/components/Layout"

export const wrapPageElement = ({ element, props }) => (
  <Layout {...props}>{element}</Layout>
)

wrapPageElement.propTypes = {
  element: PropTypes.shape(),
  props: PropTypes.shape(),
}