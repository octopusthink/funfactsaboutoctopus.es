import { Button, Heading, Icon, Link, Paragraph } from '@octopusthink/nautilus';
import React from 'react';
import { css } from '@emotion/core';

const Header = (props) => {
  const { nextSlug, previousSlug, randomSlug } = props;
  return (
    <nav
      role="navigation"
      css={css`
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        align-items: center;
        justify-content: space-between;

        button {
          font-style: italic;
          //font-size: 1.7rem;
          //letter-spacing: 0.05em;
          //text-transform: uppercase;
          vertical-align: center;
        }
      `}
    >
      <Button
        minimal
        navigation
        to={previousSlug}
        css={css`
          justify-self: start;
        `}
      >
        <Icon name="arrow-left-circle" />
        Previous
      </Button>
      <Button
        minimal
        navigation
        to={randomSlug()}
        css={css`
          justify-self: center;
        `}
      >
        Random
      </Button>
      <Button
        navigation
        minimal
        to={nextSlug}
        css={css`
          justify-self: end;
        `}
      >
        Next <Icon name="arrow-right-circle" />
      </Button>
    </nav>
  );
};

export default Header;
