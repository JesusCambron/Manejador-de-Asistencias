import React from 'react'

import Menu from '../Menu/Menu';

import './homepage.styles.scss'
const Homepage = props =>(
    <div>
        {/* {console.log(props)} */}
        <Menu onRouteChange={props.onRouteChange}/>
        <h1>
            {`Bienvenido ${props.usuario.nombre} ${props.usuario.apellido}`}
        </h1>
    </div>
)

export default Homepage