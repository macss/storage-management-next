import React from 'react'

const MainLayout = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <div>
      Layout
      {children}
    </div>
  )
}

export default MainLayout
