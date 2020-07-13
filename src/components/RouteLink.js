import React from "react"
import { Box } from "rebass/styled-components"
import PropTypes from "prop-types"
import LinkAnimated from "./LinkAnimated"
import { Link } from "gatsby"

const RouteLink = ({ link, selected, name }) => (
  <Box ml={[2, 3]} color="background" fontSize={[2, 3]}>
    <LinkAnimated selected={selected} tabIndex={0}>
      <Link to={link}>{name}</Link>
    </LinkAnimated>
  </Box>
)

RouteLink.propTypes = {
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  name: PropTypes.string,
}

export default RouteLink
