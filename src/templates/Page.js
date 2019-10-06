import { css } from '@emotion/core';
import { Heading, Paragraph, Link } from '@octopusthink/nautilus';
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
