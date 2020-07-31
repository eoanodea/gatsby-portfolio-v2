import * as React from 'react';
import Helmet from 'react-helmet';

import './index.scss';
import Header from '../components/Header';

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
