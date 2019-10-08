const fs = require('fs');
const path = require('path');

const invariant = require('invariant');
const { kebabCase } = require('lodash');
const moment = require('moment');
const { singular } = require('pluralize');

const config = require('./config');

const { useDatesInSlugs } = config;

const makeFacts = ({ actions, facts }) => {
  const { createPage } = actions;

  const allFactSlugs = facts.edges.map((edge) => {
    return edge.node.fields.slug;
  });

  if (facts) {
    facts.edges.forEach((edge, index) => {
      createPage({
        path: edge.node.fields.slug,
        component: path.resolve(
          `src/templates/${edge.node.fields.component}.js`,
        ),
        context: {
          id: edge.node.id,
          slug: edge.node.fields.slug,
          allFactSlugs: allFactSlugs.filter((slug) => {
            return slug !== edge.node.fields.slug;
          }),
          nextSlug: edge.next
            ? edge.next.fields.slug
            : facts.edges[0].node.fields.slug,
          previousSlug: edge.previous
            ? edge.previous.fields.slug
            : facts.edges[facts.edges.length - 1].node.fields.slug,
        },
      });
    });
  }
};

const makePages = ({ actions, pages }) => {
  const { createPage } = actions;

  if (pages) {
    pages.edges.forEach((edge, index) => {
      createPage({
        path: edge.node.fields.slug,
        component: path.resolve(
          `src/templates/${edge.node.fields.component}.js`,
        ),
        context: {
          id: edge.node.id,
          slug: edge.node.fields.slug,
        },
      });
    });
  }
};

const onCreateNode = ({ actions, node, getNode }) => {
  const { createNodeField } = actions;
  let slug;

  if (node.internal.type === 'MarkdownRemark') {
    const fileNode = getNode(node.parent);
    const parsedFilePath = path.parse(fileNode.relativePath);

    // If this node contains date info, load the date and set it in the fields.
    const dateMatch = parsedFilePath.name.match(/^(\d{4}-\d{2}-\d{2})-(.*)/);

    let date;
    if (dateMatch) {
      date = moment.utc(dateMatch[1]);

      if (!date || !date.isValid) {
        console.warn(`WARNING: Invalid date for ${parsedFilePath.name}`);
      }

      createNodeField({
        node,
        name: 'date',
        value: date.toISOString(),
      });
    }

    const rootFolder = parsedFilePath.dir.split('/')[0];

    // "Page" is the default, fallback component if nothing else can be found.
    let component = 'Page';
    if (node.frontmatter && node.frontmatter.component) {
      component = node.frontmatter.component;
    } else if (rootFolder) {
      try {
        fs.statSync(`src/templates/${rootFolder}.js`);
      } catch (error) {
        // This means we don't have a template file that matches the name
        // of the component's root folder, which is fine. We'll use the `Page`
        // component default defined above.
        if (error.code !== 'ENOENT') {
          throw error;
        }
      }
      component = singular(kebabCase(rootFolder));
      component = `${component.charAt(0).toUpperCase()}${component.slice(1)}`;
    }

    createNodeField({
      node,
      name: 'component',
      value: component,
    });

    // We try to create slugs automatically to reduce the amount of frontmatter
    // authors need to write. Frontmatter support, however, still exists for
    // overrides, if the user desires it.
    //
    // For pages, we use:
    //
    //   1. The page's path + `slug` field in frontmatter. If the `slug` field
    //      were set to `"hello"` in `pages/foo.md` the slug would be `/hello`.
    //      If it were in `pages/something/foo.md` the slug would be
    //      `/something/hello`.
    //   2. The page's path + filename; eg. `pages/about.md` -> `/about`,
    //      `pages/projects/nautilus.md` -> `/projects/nautilus`.
    const datePrefix = date && useDatesInSlugs ? `${dateMatch[1]}-` : '';
    const fileName = date ? dateMatch[2] : parsedFilePath.name;

    if (parsedFilePath.dir === 'pages') {
      const pathWithoutPagesFolder = parsedFilePath.dir.replace(
        /^pages\/?/,
        '',
      );

      if (node.frontmatter && node.frontmatter.slug) {
        slug = `/${pathWithoutPagesFolder}/${node.frontmatter.slug}`;
      } else {
        slug = `/${pathWithoutPagesFolder}/${fileName}`;
      }
    } else {
      if (node.frontmatter && node.frontmatter.slug) {
        slug = `/${parsedFilePath.dir}/${datePrefix}${node.frontmatter.slug}`;
      } else if (parsedFilePath.name !== 'index' && parsedFilePath.dir !== '') {
        slug = `/${parsedFilePath.dir}/${datePrefix}${fileName}`;
      } else {
        slug = `/${parsedFilePath.dir}`;
      }
    }

    // Handle facts/ slugs specially; don't include the number in the URL
    // and omit the `/facts/` prefix in the slug.
    if (parsedFilePath.dir === 'facts') {
      if (node.frontmatter && node.frontmatter.slug) {
        slug = `/${node.frontmatter.slug}`;
      } else {
        slug = `/${fileName}`;
      }

      createNodeField({
        node,
        name: 'fact',
        value: slug.match(/(\d*)-/)[1],
      });

      slug = slug.replace(/\d+-/, '');
    }

    // Create the slug, changing `/index` to `/` and removing any double
    // slashes in slugs.
    createNodeField({
      node,
      name: 'slug',
      value: slug.replace(/\/index$/, '/').replace(/\/{2,}/g, '/'),
    });

    // Create the tags for this post.
    if (node.frontmatter && node.frontmatter.tags) {
      invariant(
        Array.isArray(node.frontmatter.tags),
        `Tags for file ${parsedFilePath.name} has invalid tags. Tags should be a YAML-list, not a string.`,
      );

      // Add the array of tags to this node.
      createNodeField({
        node,
        name: 'tags',
        value: node.frontmatter.tags,
      });
    }

    // Create fields for every other frontmatter prop; this makes it easier to
    // query for fields instead of needing to know what's in `node.fields` and
    // what's in `node.frontmatter`.
    Object.keys(node.frontmatter)
      .filter((key) => {
        return ['component', 'date', 'slug', 'tags'].indexOf(key) === -1;
      })
      .forEach((key) => {
        createNodeField({
          node,
          name: key,
          value: node.frontmatter[key],
        });
      });
  }
};

const createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  const markdownQueryResult = await graphql(`
    query {
      facts: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "//content/facts/.+?/" } }
        sort: { fields: fields___fact, order: ASC }
      ) {
        edges {
          node {
            id
            fields {
              component
              slug
              title
            }
          }
          next {
            fields {
              slug
            }
          }
          previous {
            fields {
              slug
            }
          }
        }
        totalCount
      }
      pages: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "//content/(?!blog|facts).+?/" } }
      ) {
        edges {
          node {
            id
            fields {
              component
              slug
              title
            }
          }
        }
      }
    }
  `);

  if (markdownQueryResult.errors) {
    console.error(markdownQueryResult.errors);
    throw markdownQueryResult.errors;
  }

  const { facts, pages } = markdownQueryResult.data;

  makeFacts({ actions, facts });
  makePages({ actions, pages });
};

module.exports = { createPages, onCreateNode };
