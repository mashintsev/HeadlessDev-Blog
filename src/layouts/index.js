import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Navbar from '../components/Navbar'
import './all.sass'
import '@atlaskit/css-reset';

const TemplateWrapper = ({ children }) => (
  <div>
      <Helmet>
          <title>HeadlessDev Blog</title>
      </Helmet>
    <Helmet title="" />

    <Navbar />
    <div>{children()}</div>
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
