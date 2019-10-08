import { Heading } from '@octopusthink/nautilus';
import { graphql } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';

import { markdown } from '../utils/markdown';

import App from './App';
import PageWrapper from '../components/PageWrapper';

export const Page = (props) => {
  const { data } = props;

  const { page } = data;
  const { htmlAst } = page;
  const { image, title } = page.fields;

  const content = markdown(htmlAst);

  return (
    <App>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <PageWrapper image={image}>
        <Heading>{title}</Heading>
        {content}
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
