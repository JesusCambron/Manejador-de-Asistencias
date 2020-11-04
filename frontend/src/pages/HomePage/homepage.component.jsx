import React from 'react'

import './homepage.styles.scss'
const Homepage = props =>(
    <div>
        <h1>
            {`Bienvenido ${props.usuario.nombre} ${props.usuario.apellido}`}
        </h1>
    </div>
)

export default Homepage