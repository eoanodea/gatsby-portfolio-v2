import React from 'react';
import Link from 'gatsby-link';
import './AllCategory.scss';
import PageProps from '../models/PageProps';
import DefaultLayout from '../layouts';
import { Section } from '../components/Section';

class AllCategoryTemplate extends React.PureComponent<PageProps> {
  public render() {
    const { categories } = this.props.pathContext;

    if (categories) {
      return (
        <>
          <DefaultLayout />

          <Section id={'categories'}>
            <div className="all-categories-content">
              <p> Category List </p>
              <ul>
                {categories.map((category: any, index: number) => (
                  <li key={index}>
                    <Link to={`/categories/${category}`}>{category}</Link>
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

export default AllCategoryTemplate;
