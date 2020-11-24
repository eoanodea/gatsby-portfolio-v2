import * as React from 'react';
import { graphql } from 'gatsby';
import PageProps from '../models/PageProps';
import DefaultLayout from '../layouts';
import { ScrollingProvider } from 'react-scroll-section';

import { Hero } from '../sections/Hero';
import { Projects } from '../sections/Projects';

import './index.scss';
import { Contact } from '../sections/Contact';

class IndexPage extends React.Component<PageProps> {
  public render() {
    const { data } = this.props;
    const { edges } = data.allMarkdownRemark;

    return (
      <>
        <ScrollingProvider className="container">
          <DefaultLayout showMenu={true} />

          <Hero />
          <Projects edges={edges} />
          <Contact />
        </ScrollingProvider>
      </>
    );
  }
}

export default IndexPage;

export const query = graphql`
  query IndexQuery {
    allMarkdownRemark {
      totalCount
      edges {
        node {
          id
          html
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
            categories
            tags
            excerpt
            featureImg {
              publicURL
            }
          }
        }
      }
    }
  }
`;
