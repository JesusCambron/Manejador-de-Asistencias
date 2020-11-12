import React, { Component } from 'react';
import './TablaCursoGrupos.css'
//import {cursos} from '../Cursos'


class TablaCursoGrupos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cursos: this.props.listaCursos,
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

    editarCurso = () => {
        this.state.cursos.map((user) => {
            if (user._id == this.state.seleccion) {
                this.props.loadCurso(user)
                this.props.onRouteChange("FormCursoEditar")

            }
        })
    }

    
        
        
    

    actualizarTabla = () => {
        this.setState({ cursos: this.state.cursos.filter(cur => cur._id != this.state.seleccion) })
        this.props.loadListaCurso(this.state.cursos.filter(cur => cur._id != this.state.seleccion));
        this.setState({seleccion: ""})
    }


    eliminarCurso = () => {
        console.log(this.state.seleccion)
        fetch(`http://localhost:3000/manejador/cursos/${this.state.seleccion}`, {
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



    render() {
        return (
            <div>
                <h2>Administrar Curso</h2>

                <div className="tamaño">
                    <table className="tabla">
                        <thead>
                            <tr>
                                <th className="table nombre-curso">Nombre del curso</th>
                                <th className="table nombre"></th>
                            </tr>

                        </thead>
                        <tbody>

                            {
                                this.state.cursos.map((elemento) => (
                                    <tr key={elemento._id}>
                                        <td>{elemento.nombre}</td>

                                        <td> <input type="radio" name="radio" onChange={this.handleChange} value={elemento._id}></input> </td>
                                    </tr>
                                ))}


                        </tbody>
                    </table>
                </div>
                <div className="botones">
                    <button onClick={() => this.props.onRouteChange('FormCurso')} className="boton-agregar">Agregar</button>
                    <button onClick={this.editarCurso} className="boton-editar">Editar</button>
                    <button className="boton-eliminar" onClick={this.confirmarEliminar}>Eliminar</button>

                </div>


                <div className="confir-eliminar">
                    <div className="confir-centro">
                        <h1>¿Estas seguro que quieres eliminar este curso?</h1>
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



export default TablaCursoGrupos;