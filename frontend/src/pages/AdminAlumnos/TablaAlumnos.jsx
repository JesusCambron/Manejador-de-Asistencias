import React, { Component } from 'react';
import './TablaAlumnos.css'
//import {cursos} from '../Cursos'


class TablaAlumnos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alumnos: this.props.listaAlumnos,
            idGrupo: this.props.idGrupo,
            seleccion: "",
            
        }
        

    }


    handleChange = (e) => {
            this.setState({ seleccion: e.target.value })
    }

    editarCurso = () => {
        this.state.alumnos.map((alum) => {
            if (alum._id == this.state.seleccion) {
                this.props.loadAlumno(alum);
                console.log(alum)
                this.props.onRouteChange("FormAlumnoEditar");

            }
        })
    }

    actualizarTabla = () => {
        this.setState({ alumnos: this.state.alumnos.filter(alum => alum._id != this.state.seleccion) })
        this.props.loadListaAlumnos(this.state.alumnos.filter(alum => alum._id != this.state.seleccion));
        this.setState({seleccion: ""})
    }


    eliminarAlumno = () => {
        console.log(this.state.seleccion)
        fetch(`http://localhost:3000/manejador/alumnos/${this.state.seleccion}`, {
            method: 'delete',
            headers: new Headers({
                "authorization": this.props.usuario.token, 'Content-Type': 'application/json'
            })

        }).then(response => response.json()).
            then(
                this.actualizarTabla()
            ).catch(err => console.log(err))

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
                <h2>Administrar Alumnos</h2>

                <div className="tamaño">
                    <table className="tabla">
                        <thead>
                            <tr>
                                <th className="table id-alumno">ID</th>
                                <th className="table nombre-alumno">Nombre del alumno</th>
                                
                                <th className="table nombre"></th>
                            </tr>

                        </thead>
                        <tbody>

                        {
                            this.state.alumnos.map((alumno) => (
                                <tr key={alumno._id}>
                                    <td>{alumno.id}</td>
                                    <td>{alumno.nombre}</td>

                                    <td> <input type="radio" name="radio" onChange={this.handleChange} value={alumno._id}></input> </td>
                                </tr>
                            ))}


                        


                        </tbody>
                    </table>
                </div>
                <div className="botones">
                    <button onClick={() => this.props.onRouteChange('FormAlumno')} className="boton-agregar">Agregar</button>
                    <button onClick={this.editarCurso} className="boton-editar">Editar</button>
                    <button className="boton-eliminar" onClick={this.confirmarEliminar}>Eliminar</button>

                </div>


                <div className="confir-eliminar">
                    <div className="confir-centro">
                        <h1>¿Estas seguro que quieres eliminar este alumno?</h1>
                        <div className="confir-btns">
                            <button className="si" onClick={this.eliminarAlumno}>Si</button>
                            <button className="no" onClick={() => document.getElementsByClassName("confir-eliminar")[0].style.display = "none"}>No</button>
                        </div>

                    </div>

                </div>






            </div>


        );
    }
}



export default TablaAlumnos;