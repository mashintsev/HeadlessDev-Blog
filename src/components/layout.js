import React from 'react'
import Helmet from 'react-helmet'

import Navbar from './Navbar'
import './all.sass'
import '@atlaskit/css-reset';

const TemplateWrapper = ({ children }) => (
    <div>
        <Helmet>
            <title>HeadlessDev Blog</title>
            <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/site.webmanifest" />
            <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
            <meta name="msapplication-TileColor" content="#da532c" />
            <meta name="theme-color" content="#ffffff" />

            <meta name="p:domain_verify" content="c4c08ea61657758018e4a392781b7cfd" />
        </Helmet>

        <Navbar />
        <div>{children}</div>
    </div>
);

export default TemplateWrapper
