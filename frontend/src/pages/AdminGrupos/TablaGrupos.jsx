import React, { Component } from 'react';
import './TablaGrupos.css'
//import {cursos} from '../Cursos'


class TablaGrupos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cursos: this.props.listaCursos,
            grupos: this.props.listaGrupos,
            seleccion: "",
            form: {
                id: "",
                nombre: "",
                horas: "",
                unidad: ""
            }
        }
    

    }


    handleChange = (e) => {
            this.setState({ seleccion: e.target.value })
         
    }

    editarGrupo = () => {
        this.state.grupos.map((grup) => {
            if (grup._id == this.state.seleccion) {
                this.props.loadGrupo(grup)
            
                this.recuperarCursos()

            }
        })
    }



    actualizarTabla = () => {
        this.setState({ grupos: this.state.grupos.filter(gru => gru._id != this.state.seleccion) })
        this.props.loadListaGrupo(this.state.grupos.filter(gru => gru._id != this.state.seleccion));
        this.setState({seleccion: ""})
    }


    eliminarCurso = () => {
       
        fetch(`http://localhost:3000/manejador/grupos/${this.state.seleccion}`, {
            method: 'delete',
            headers: new Headers({
                "authorization": this.props.usuario.token, 'Content-Type': 'application/json'
            })

        }).then(response => response.json()).
            then(
                this.actualizarTabla()


            )

            .catch(err => console.log(err))

        document.getElementsByClassName("confir-eliminar")[0].style.display = "none"
    }

    confirmarEliminar = () => {
            if(this.state.seleccion !== ""){
                document.getElementsByClassName("confir-eliminar")[0].style.display = "block"
            }
            
    }

    nuevoGrupo=()=>{
        fetch(`http://localhost:3000/manejador/cursos/${this.props.usuario.id}`,{
                method:'get',
                headers: new Headers ({"authorization": this.props.usuario.token, 'Content-Type':'application/json'
            })
               
            }).then(response=>response.json())
            .then(listaCursos=>{
                
        
                this.props.loadListaCurso(listaCursos);
                this.props.onRouteChange('FormGrupo')
                
               
                }).catch(err=>console.log(err))
    }

    recuperarCursos=()=>{
        fetch(`http://localhost:3000/manejador/cursos/${this.props.usuario.id}`,{
                method:'get',
                headers: new Headers ({"authorization": this.props.usuario.token, 'Content-Type':'application/json'
            })
               
            }).then(response=>response.json())
            .then(listaCursos=>{
                
        
                this.props.loadListaCurso(listaCursos);
                this.props.onRouteChange("FormGrupoEditar")
               
                }).catch(err=>console.log(err))
    }

    



    render() {
        return (
            <div>
                <h2>Administrar Grupo</h2>

                <div className="tamaño">
                    <table className="tabla">
                        <thead>
                            <tr>
                                <th className="table nombre-curso">Nombre del grupo</th>
                                <th className="table nombre"></th>
                            </tr>

                        </thead>
                        <tbody>

                            {
                                this.state.grupos.map((elemento) => (
                                    <tr key={elemento._id}>
                                        <td>{elemento.idCurso.nombre} {elemento.nombreGrupo}</td>

                                        <td> <input type="radio" name="radio" onChange={this.handleChange} value={elemento._id}></input> </td>
                                    </tr>
                                ))}


                        </tbody>
                    </table>
                </div>
                <div className="botones">
                    <button onClick={this.nuevoGrupo} className="boton-agregar">Agregar</button>
                    <button onClick={this.editarGrupo} className="boton-editar">Editar</button>
                    <button className="boton-eliminar" onClick={this.confirmarEliminar}>Eliminar</button>

                </div>


                <div className="confir-eliminar">
                    <div className="confir-centro">
                        <h1>¿Estas seguro que quieres eliminar este grupo?</h1>
                        <div className="confir-btns">
                            <button className="si" onClick={this.eliminarCurso}>Si</button>
                            <button className="no" onClick={() => document.getElementsByClassName("confir-eliminar")[0].style.display = "none"}>No</button>
                        </div>

                    </div>

                </div>






            </div>


        );
    }
}



export default TablaGrupos;