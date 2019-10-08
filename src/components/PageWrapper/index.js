import React from 'react';
import { css } from '@emotion/core';

const PageWrapper = (props) => {
  const { className, image, children } = props;
  return (
    <main
      className={className}
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
        {children}
      </section>
    </main>
  );
};

export default PageWrapper;
