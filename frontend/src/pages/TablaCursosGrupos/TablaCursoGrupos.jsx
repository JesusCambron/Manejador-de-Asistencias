import React,{Component} from 'react';
import './TablaCursoGrupos.css'
import {cursos} from '../Cursos'


class TablaCursoGrupos extends Component{
    constructor(props){
        super(props);
        this.state = {
            cursos: cursos,
            seleccion: "",
            form: {
                id: "",
                nombre: "",
                horas: "",
                unidad:""
              }
        }
    }


    handleChange=(e)=>{
        if(e.target.checked){
            this.setState({seleccion: e.target.value})
        }
        else{
            this.setState({seleccion: ""})
        }
    }

    editarCurso=(e)=>{
        this.state.cursos.map((user)=>{
            if (user.id==this.state.seleccion) {
                this.props.loadCurso(user)
                this.props.onRouteChange("FormCursoEditar")
             
            }
        })
    }


    llenarCampos=()=>{
    
        this.setState({})
    }


    eliminarCurso=()=>{
        const lista=[]
        this.state.cursos.map((user,i)=>{
            if(user.id != this.state.seleccion){
                lista.push(user);
            }
        })
        this.setState({cursos: lista});
    }


    
    render(){
        return (
            <div>
                <h2>Administrar Curso</h2>
                <table className="tabla">
                    <thead>
                        <tr>
                            <th className="table nombre-curso">Nombre del curso</th>
                            <th className="table nombre"></th>
                        </tr>
                        
                    </thead>
                    <tbody> 
                        {
                            this.state.cursos.map((elemento)=>(
                                <tr key={elemento.id}>
                                    <td>{elemento.nombre}</td>
                                    <td><input className="checkbox"type="checkbox" onChange={this.handleChange} value={elemento.id}></input></td>
                                </tr>
                        ))}
                    </tbody>
                </table>
                <div className="botones">
                    <button onClick={()=>this.props.onRouteChange('FormCurso')}  className="boton-agregar">Agregar</button>
                    <button onClick={this.editarCurso}  className="boton-editar">Editar</button>
                    <button className="boton-eliminar" onClick={()=>this.eliminarCurso()}>Eliminar</button>
                </div>

              
              
            </div>
            
           
        );
    }
}



export default TablaCursoGrupos;