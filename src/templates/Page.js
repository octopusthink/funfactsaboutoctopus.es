import { css } from '@emotion/core';
import { Button, Heading, Icon, Link, Paragraph } from '@octopusthink/nautilus';
import { graphql } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';

import { markdown } from '../utils/markdown';

import App from './App';

export const Page = (props) => {
  const { data, pageContext } = props;
  const { allFactSlugs, nextSlug, previousSlug } = pageContext;

  const { page } = data;
  const { htmlAst } = page;
  const { image, number, title, source, sourceUrl } = page.fields;

  const content = markdown(htmlAst);

  const randomSlug = () => {
    return allFactSlugs[Math.floor(Math.random() * allFactSlugs.length)];
  };

  return (
    <App>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <section
        css={css`
          display: grid;
          grid-template-columns: 1fr 48rem 4.8rem;
          //border: 10px solid black;
          grid-gap: 4.8rem;
          //padding: 4.8rem;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
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
            `}
          />
        </div>
        <section
          css={css`
            //margin: 3.2rem auto;
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
                top: -10rem;
                left: -18rem;
                font-size: 23rem;
                letter-spacing: -0.07em;
                opacity: 0.25;
                color: #333;
              `}
            >
              {number}
            </span>{' '}
            {title}
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
