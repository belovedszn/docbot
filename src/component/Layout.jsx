import React from 'react'
import Header from './Header'

function Layout({pages}) {
  return (
    <>
        <Header />
        {pages}
    </>
  )
}

export default Layout