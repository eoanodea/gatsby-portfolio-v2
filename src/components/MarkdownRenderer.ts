import React from "react"
import { SectionLink } from "react-scroll-section"
import styled from "styled-components"
import PropTypes from "prop-types"

const StyledLink = styled.a`
  display: inline-block;
  transition: color 250ms, text-shadow 250ms;
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  position: relative;
  text-decoration: none;

  &:after {
    position: absolute;
    z-index: -1;
    bottom: 1px;
    left: 50%;
    transform: translateX(-50%);
    content: "";
    width: 100%;
    height: 3px;
    background-color: ${props => props.theme.colors.primaryLight};
    transition: all 250ms;
  }

  &:hover {
    color: white;

    &::after {
      height: 110%;
      width: 110%;
    }
  }
`

const MarkdownParagraph = styled.p`
  line-height: 2em;
  font-size: 1.3em;
  &:first-child {
    margin-top: 0em;
  }
`

const MarkdownHeading = styled.h2`
  font-family: inherit;
  border-bottom: 5px solid #fa26a0;
  font-size: 2.5em;
  font-weight: 600;
  max-width: fit-content;
`

const MarkdownList = styled.ul`
  margin: 0;
`

const MarkdownListItem = styled.li`
  margin: 1em 0;
  line-height: 2em;
`

const MarkdownLink = ({ href, children }) => {
  const isInnerLink = href.startsWith("#")
  return isInnerLink ? (
    <SectionLink section={href.substring(1, href.length)}>
      {({ onClick }) => <StyledLink onClick={onClick}>{children}</StyledLink>}
    </SectionLink>
  ) : (
    <StyledLink href={href} target="_blank" rel="noreferrer">
      {children}
    </StyledLink>
  )
}

MarkdownLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node,
}

export default {
  paragraph: MarkdownParagraph,
  heading: MarkdownHeading,
  list: MarkdownList,
  listItem: MarkdownListItem,
  link: MarkdownLink,
}