import React from 'react'
import MainLayout from '@theme/layouts/MainLayout'

const Home = () => {
  return (
    <div>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac
      suscipit purus. Nunc tristique, nunc non sollicitudin auctor, neque nunc
      ultricies purus, a vehicula ligula augue vitae libero. Maecenas est enim,
      porta in erat id, imperdiet sollicitudin nibh. Aenean aliquet enim eget
      vestibulum porta. Ut consectetur, ipsum ac laoreet viverra, lacus quam
      vehicula nibh, non facilisis felis nibh in purus. Lorem ipsum dolor sit
      amet, consectetur adipiscing elit.
    </div>
  )
}

Home.displayName = 'Home Page'
Home.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>

export default Home
