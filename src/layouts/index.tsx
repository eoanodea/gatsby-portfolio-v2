import * as React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';

import './index.scss';

class Header extends React.PureComponent<{}> {
  public render() {
    return (
      <header className="header">
        <div>
          <Link to="/">
            <h1>Eoan O'Dea</h1>
            <span className="date">Portfolio</span>
          </Link>
        </div>
        <div className="header-links">
          <Link to="/">Home</Link>
          <Link to="/tags">About</Link>
          <Link to="/categories">Projects</Link>
          <Link to="/tags">Contact</Link>
        </div>
      </header>
    );
  }
}

interface DefaultLayoutProps extends React.HTMLProps<HTMLDivElement> {
  location?: {
    pathname: string;
  };
}

class DefaultLayout extends React.Component<DefaultLayoutProps> {
  public render() {
    return (
      <div>
        <Helmet
          title={`Home`}
          meta={[
            { name: 'description', content: 'Full Stack Developer, Designer, Engineer & Entrepreneur' },
            { name: 'keywords', content: 'Full Stack Developer, Designer, Engineer & Entrepreneur' }
          ]}
        />
        <Header />
      </div>
    );
  }
}

export default DefaultLayout;
