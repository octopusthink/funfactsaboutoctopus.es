import { css, Global } from '@emotion/core';
import Nautilus from '@octopusthink/nautilus';
import { Link } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';

import theme from 'config/theme';

export const App = (props) => {
  const siteDescription =
    'Everything you didn’t know about octopuses, the ocean’s cleverest creature.';
  const { children } = props;
  return (
    <Nautilus config={{ LinkComponent: Link }} theme={theme}>
      <Global
        styles={css`
          body {
            margin: 0;
            padding: 0;
            position: relative;
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
