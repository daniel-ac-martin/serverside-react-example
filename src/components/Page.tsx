'use strict';

require('@skatejs/ssr/register');

import { define, props, withComponent } from 'skatejs';
import withRenderer from '@skatejs/renderer-preact';
import { h } from 'preact';

const Component = withComponent(withRenderer());

export enum PageType {
    Simple,
    Blog,
    Gallery,
    Contact
};

export interface PageProps { type: PageType; }

export class Page extends Component<PageProps> {
    static get is() { return 'Page'; }

    static get props() {
        return {
            type: props.string
        };
    }

    render(props: PageProps) {
        return <div>
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
        </div>;
    }
};

//export const component = define(Page as any) as typeof Page;
export const component = define(Page as any);
