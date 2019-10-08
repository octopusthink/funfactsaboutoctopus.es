import { Icon, Link, interfaceUI, useTheme } from '@octopusthink/nautilus';
import React from 'react';
import { css } from '@emotion/core';

const Header = (props) => {
  const { nextSlug, previousSlug, randomSlug } = props;
  const theme = useTheme();

  return (
    <nav
      role="navigation"
      css={css`
        display: grid;
        grid-template-columns: 1fr 1fr;
        background: ${theme.colors.neutral.black};
        position: fixed;
        left: 0;
        right: 0;
        top: 0;

        @media screen and (min-width: 460px) {
          grid-template-columns: auto auto auto auto;
          align-items: center;
          justify-content: space-between;
        }

        @media screen and (min-width: 640px) {
          position: absolute;
          border-radius: 6px;
          top: auto;
          bottom: 2.4rem;
          max-width: 640px;
          margin: 0 auto;
        }

        .navigation-link {
          ${interfaceUI.small(theme)};
          color: ${theme.colors.neutral.white};
          border: 0;
          font-size: 1.5rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          vertical-align: center;
          display: block;
          padding: 1.6rem;
          line-height: 1;
          width: 100%;
        }
      `}
    >
      <Link
        className="navigation-link"
        to="/about"
        css={css`
          @media screen and (max-width: 459px) {
            text-align: right;
          }
        `}
      >
        About
      </Link>
      <Link
        className="navigation-link"
        to={randomSlug()}
        css={css`
          @media screen and (max-width: 459px) {
            text-align: left;
          }
        `}
      >
        Random
      </Link>

      <Link
        className="navigation-link"
        to={previousSlug}
        css={css`
          text-align: left;

          @media screen and (min-width: 460px) {
            order: -1;
          }
        `}
      >
        <Icon small name="arrow-left" />
        Previous
      </Link>
      <Link
        className="navigation-link"
        to={nextSlug}
        css={css`
          text-align: right;
        `}
      >
        Next <Icon small name="arrow-right" />
      </Link>
    </nav>
  );
};

export default Header;
