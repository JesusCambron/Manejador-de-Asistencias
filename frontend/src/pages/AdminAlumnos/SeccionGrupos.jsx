import React, { Component } from 'react'

import CartaGrupo from './CartaGrupo'
import './SeccionGrupos.css'

export default class SeccionGrupos extends Component {


    render() {
        return (
            <div>
                <h1 className="titulo-miscursos">Mis cursos</h1>
                <div className="carta-grupos">
                {this.props.grupos.map((grup) => (
                    <CartaGrupo usuario = {this.props.usuario} loadListaAlumnos={this.props.loadListaAlumnos} loadGrupoSeleccionado={this.props.loadGrupoSeleccionado} onRouteChange={this.props.onRouteChange} grupo={grup} ></CartaGrupo>
                ))}
                </div>
            </div>
        )
    }
}
