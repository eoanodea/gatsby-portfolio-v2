import React from 'react';
import Link from 'gatsby-link';
import './AllTag.scss';
import PageProps from '../models/PageProps';
import DefaultLayout from '../layouts';
import { Section } from '../components/Section';

class AllTagTemplate extends React.PureComponent<PageProps> {
  public render() {
    const { tags } = this.props.pathContext;

    if (tags) {
      return (
        <>
          <DefaultLayout />

          <Section id={'tags'}>
            <div className="all-tags-content">
              <p> Tag List </p>
              <ul>
                {tags.map((tag: any, index: number) => (
                  <li key={index}>
                    <Link to={`/tags/${tag}`}>{tag}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </Section>
        </>
      );
    }
  }
}

export default AllTagTemplate;
