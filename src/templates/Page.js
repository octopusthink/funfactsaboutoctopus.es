import { css } from '@emotion/core';
import { Button, Heading, Icon, Link, Paragraph } from '@octopusthink/nautilus';
import { graphql } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';

import { markdown } from '../utils/markdown';

import App from './App';

export const Page = (props) => {
  const { data } = props;

  const { page } = data;
  const { htmlAst } = page;
  const { image, number, title, source, sourceUrl } = page.fields;

  const content = markdown(htmlAst);

  const twoDigitNumber = number < 10 ? '0' + number : number;

  return (
    <App>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <section
        css={css`
          display: grid;
          grid-gap: 4.8rem;
          align-items: center;
          justify-content: center;
          min-height: 100vh;

          @media screen and (min-width: 640px) {
            grid-template-columns: 1fr 48rem 4.8rem;
          }
        `}
      >
        <div
          css={css`
            height: 100vh;
            overflow: hidden;
          `}
        >
          <img
            alt=""
            src={image}
            css={css`
              width: 100%;
              height: 100%;
              max-height: 100%;
              max-width: 100%;
              display: block;
              object-fit: cover;
              filter: grayscale(90%) brightness(110%) contrast(90%);

              @media screen and (max-width: 639px) {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
              }
            `}
          />
        </div>
        <section
          css={css`
            @media screen and (max-width: 639px) {
              background: rgba(255, 255, 255, 0.95);
              margin: 0 2.4rem;
              padding: 2.4rem;
              position: absolute;
              top: 32rem;
              box-shadow: 0 4px 10px rgba(0, 0, 0, 0.125);
            }
            letter-spacing: -0.0125em;
          `}
        >
          <Heading
            css={css`
              position: relative;
            `}
          >
            <span
              css={css`
                position: absolute;
                top: -12rem;
                left: -8rem;
                font-size: 23rem;
                letter-spacing: -0.07em;
                opacity: 0.15;
                color: #fefefe;
                text-shadow:-4px -4px 0 #666,
                -4px 4px 0 #666,4px -4px 0 #666,
                4px 4px 0 #666; }

                @media screen and (min-width: 640px) {
                  top: -10rem;
                  left: -18rem;
                }
              `}
            >
              {twoDigitNumber}
            </span>{' '}
            <span
              css={css`
                position: relative;
              `}
            >
              {title}
            </span>
          </Heading>
          {content}

          {sourceUrl && (
            <Paragraph
              css={css`
                font-style: italic;
              `}
            >
              <Link href={sourceUrl} as="a" external>
                Source: {source}
              </Link>
            </Paragraph>
          )}

          <div
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
              to="#"
              css={css`
                justify-self: start;
              `}
            >
              <Icon name="arrow-left-circle" />
              Previous
            </Button>
            <Button
              minimal
              to="random"
              css={css`
                justify-self: center;
              `}
            >
              Random
            </Button>
            <Button
              minimal
              to="#"
              css={css`
                justify-self: end;
              `}
            >
              Next <Icon name="arrow-right-circle" />
            </Button>
          </div>
        </section>
      </section>
    </App>
  );
};

export const pageQuery = graphql`
  query($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      fields {
        image
        number
        slug
        sourceUrl
        source
        title
      }
      htmlAst
      rawMarkdownBody
      id
    }
  }
`;

export default Page;
