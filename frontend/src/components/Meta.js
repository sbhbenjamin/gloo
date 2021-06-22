import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Welcome To Gloo',
  description:
    'A one-stop platform connecting handymen and customers looking for services.',
  keywords:
    'platform, ecommerce, handymen, services, electrical, plumbing, air-conditioning, computer',
}

export default Meta
