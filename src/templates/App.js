import { css, Global } from '@emotion/core';
import Nautilus from '@octopusthink/nautilus';
import { Link } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';

//import Header from '../components/Header';
import theme from '../../config/theme';

export const App = (props) => {
  const siteDescription = 'whatever';
  const { children } = props;
  return (
    <Nautilus config={{ LinkComponent: Link }} theme={theme}>
      <Global
        styles={css`
          body {
            margin: 0;
            padding: 0;
          }
        `}
      />
      <Helmet>
        <meta name="description" content={siteDescription} />
        <title>Octopus Think</title>
        <link rel="stylesheet" href="https://use.typekit.net/zhd4uqh.css" />
      </Helmet>

      {children}
    </Nautilus>
  );
};

export default App;
