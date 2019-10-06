import { css } from '@emotion/core';
import { Button, Heading, Icon, Link, Paragraph } from '@octopusthink/nautilus';
import { graphql } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';

import { markdown } from '../utils/markdown';

import App from './app';

export const Page = (props) => {
  const { data } = props;

  const { page } = data;
  const { htmlAst } = page;
  const { title, source, sourceUrl } = page.fields;

  const content = markdown(htmlAst);

  return (
    <App>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <section
        css={css`
          max-width: 48rem;
          margin: 3.2rem auto;
          letter-spacing: -0.0125em;
        `}
      >
        <Heading>{title}</Heading>
        {content}

        {sourceUrl && (
          <Paragraph
            css={css`
              font-style: italic;
              font-family: Pulpo-LightItalic;
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
              //font-family: Pulpo-Regular;
              font-family: Pulpo-LightItalic;
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
    </App>
  );
};

export const pageQuery = graphql`
  query($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      fields {
        slug
        title
        sourceUrl
        source
      }
      htmlAst
      rawMarkdownBody
      id
    }
  }
`;

export default Page;
