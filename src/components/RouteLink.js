import React from "react"
import { Box } from "rebass/styled-components"
import PropTypes from "prop-types"
import LinkAnimated from "./LinkAnimated"
import { Link } from "gatsby"
import FontAwesomeIcon from "react-fontawesome"

const RouteLink = ({
  link,
  selected,
  name,
  disableMargin = false,
  fontSize = [2, 3],
  icon = null,
}) => (
  <Link to={link}>
    <Box ml={disableMargin ? 0 : [2, 3]} color="background" fontSize={fontSize}>
      <LinkAnimated
        alt="true"
        selected={selected}
        tabIndex={0}
        onClick={() => {}}
      >
        {name}{" "}
        {icon && (
          <FontAwesomeIcon
            style={{
              transform: "scale(var(--inner-display))",
              marginLeft: "var(--inner-margin)",
            }}
            name={icon}
          />
        )}
      </LinkAnimated>
    </Box>
  </Link>
)

RouteLink.propTypes = {
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  name: PropTypes.string,
}

export default RouteLink
