import * as React from 'react';
import { graphql } from 'gatsby';
import PageProps from '../models/PageProps';
import DefaultLayout from '../layouts';

import { Hero } from '../sections/Hero';
import { Projects } from '../sections/Projects';

import './index.scss';

class IndexPage extends React.Component<PageProps> {
  public render() {
    const { data } = this.props;
    const { edges } = data.allMarkdownRemark;

    return (
      <>
        <DefaultLayout />

        <div className="container">
          <Hero />
          <Projects edges={edges} />
        </div>
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
