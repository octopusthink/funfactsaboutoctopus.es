import { css } from '@emotion/core';
import { Heading, Link, Paragraph } from '@octopusthink/nautilus';
import { graphql } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';

import { markdown } from '../utils/markdown';

import App from './App';
import PageWrapper from '../components/PageWrapper';

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
  const twoDigitNumber = number < 10 ? '0' + number : number;

  return (
    <App>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <PageWrapper image={image}>
        <Heading
          css={css`
            position: relative;
          `}
        >
          {number && (
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
            </span>
          )}
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
      </PageWrapper>
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
