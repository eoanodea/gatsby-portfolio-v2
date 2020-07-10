import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"

import MainNav from "./mainnav"
import style from "./header.module.css"

const Header = ({ siteTitle, menuLinks }) => (
  <header id="site-header" className={style.masthead} role="banner">
    <div className={style.masthead_info}>
      <Link to="/">
        <img
          src="/logo.png"
          width="100"
          height="100"
          alt={siteTitle}
          className={style.site_logo}
        />
      </Link>
    </div>
    <MainNav menuLinks={menuLinks} />
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
  siteDescription: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
  siteDescription: ``,
}

export default Header
