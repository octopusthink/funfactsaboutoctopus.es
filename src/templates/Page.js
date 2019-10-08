import { css } from '@emotion/core';
import { Heading } from '@octopusthink/nautilus';
import { graphql } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';

import Navigation from 'components/Navigation';
import PageWrapper from 'components/PageWrapper';
import App from 'templates/App';
import { markdown } from 'utils/markdown';

export const Page = (props) => {
  const { data, pageContext } = props;
  const { allFactSlugs } = pageContext;

  const { page } = data;
  const { htmlAst } = page;
  const { image, title } = page.fields;

  const content = markdown(htmlAst);
  const randomSlug = () => {
    return allFactSlugs[Math.floor(Math.random() * allFactSlugs.length)];
  };

  return (
    <App>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <PageWrapper image={image}>
        <Heading>{title}</Heading>
        <div
          css={css`
            padding-bottom: 6rem;
          `}
        >
          {content}
        </div>
      </PageWrapper>

      <Navigation randomSlug={randomSlug()} />
    </App>
  );
};

export const pageQuery = graphql`
  query($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      fields {
        image
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
