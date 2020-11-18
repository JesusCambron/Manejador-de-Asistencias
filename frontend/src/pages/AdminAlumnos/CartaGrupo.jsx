import React, { Component } from 'react'
import './CartaGrupo.css'

export default class CartaGrupo extends Component {
    render() {
        return (
            <div>
                
                <div className="tamaño-carta">
                <h3>{this.props.grupo.idCurso.nombre}</h3>
                <h3>{this.props.grupo.nombreGrupo}</h3>
                <button className="botonCarta">Administrar Alumnos</button>
                </div>
            </div>
        )
    }
}
