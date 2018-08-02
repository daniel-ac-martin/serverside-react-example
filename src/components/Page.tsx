'use strict';

import * as React from "react";

export enum PageType {
    Simple,
    Blog,
    Gallery,
    Contact
};

export interface PageProps { type: PageType; }

export const Page = (props: PageProps): JSX.Element => {
    return <html>
          <head>
              <title>{props.type}</title>
          </head>
          <body>
              <header id="top">
                  <ul>
                      <li><a href="/" title="Home">Home</a></li>
                      <li><a href="/gallery" title="Gallery">Gallery</a></li>
                      <li><a href="/about" title="About us">About us</a></li>
                      <li><a href="/contact" title="Contact us">Contact us</a></li>
                  </ul>
              </header>
              <main id="content">
                  <h1>{props.type}</h1>
              </main>
              <script src="./node_modules/react/umd/react.development.js"></script>
              <script src="./node_modules/react-dom/umd/react-dom.development.js"></script>
              <script src="./dist/bundle.js"></script>
          </body>
      </html>;
};
