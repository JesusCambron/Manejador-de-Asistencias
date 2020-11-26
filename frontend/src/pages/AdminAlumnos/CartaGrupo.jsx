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
    }

    onRouteArchivos = () => {
        this.props.loadGrupoSeleccionado(this.props.grupo._id)
        // console.log(this.props)
        this.props.onRouteChange('archivos')
    }
    

    render() {
        return (
            <>
                
                <div className="tamaño-carta">
                <h3>{this.props.grupo.idCurso.nombre}</h3>
                <h3>{this.props.grupo.nombreGrupo}</h3>
                <button onClick={this.mostrarTabla}  className="botonCarta">Administrar Alumnos</button>
                <button onClick={this.onRouteArchivos}  className="botonCarta">Ver archivos</button>
                {/* <button onClick={this.props.onRouteChange('archivos')}  className="botonCarta">Ver asistencia</button> */}
                </div>
            </>
        )
    }

}
