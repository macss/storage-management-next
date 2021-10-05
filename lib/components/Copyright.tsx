import { Link, Typography } from '@material-ui/core'
import React from 'react'

const Copyright = (props: any) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="mailto:macsoares1@gmail.com">
        Marco Antônio Chaves Soares
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

Copyright.displayName = 'Copyright Component'

export default Copyright
