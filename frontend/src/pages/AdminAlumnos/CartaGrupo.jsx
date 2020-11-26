import React, { Component } from 'react'
import './CartaGrupo.css'

export default class CartaGrupo extends Component {

    mostrarTabla=()=>{

        fetch(`http://localhost:3000/manejador/alumnos/${this.props.grupo._id}`,{
            method:'get',
            headers: new Headers ({"authorization": this.props.usuario.token, 'Content-Type':'application/json'
        })
           
        }).then(response=>response.json())
        .then(listaAlumnos=>{
            

            this.props.loadListaAlumnos(listaAlumnos)
            this.props.loadGrupoSeleccionado(this.props.grupo._id)
            this.props.onRouteChange('TablaAlumnos')
            
            }).catch(err=>console.log(err))


            /*
        this.props.loadGrupoSeleccionado(this.props.grupo._id)
        this.props.onRouteChange('TablaAlumnos')
        */

    }

    render() {
        return (
            <div>
                
                <div className="tamaño-carta">
                <h3>{this.props.grupo.idCurso.nombre}</h3>
                <h3>{this.props.grupo.nombreGrupo}</h3>
                <button onClick={this.mostrarTabla}  className="botonCarta">Administrar Alumnos</button>
                </div>
            </div>
        )
    }

}
