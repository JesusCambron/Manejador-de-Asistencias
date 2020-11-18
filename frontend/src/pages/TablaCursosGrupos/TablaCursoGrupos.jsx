import React,{Component} from 'react';
import './TablaCursoGrupos.css'
//import {cursos} from '../Cursos'


class TablaCursoGrupos extends Component{
    constructor(props){
        super(props);
        this.state = {
            seleccion: "",
            form: {
                id: "",
                nombre: "",
                horas: "",
                unidad:""
              }
        }
        console.log(this.state.seleccion);
    }


    handleChange=(e)=>{
        if(e.target.checked){
            this.setState({seleccion: e.target.value})
        }
    }

    editarCurso=(e)=>{
        this.props.cursos.map((user)=>{
            if (user._id==this.state.seleccion) {
                this.props.loadCurso(user)
                this.props.onRouteChange("FormCursoEditar")
             
            }
        })
    }

    


    eliminarCurso=()=>{
        fetch(`http://localhost:3000/manejador/cursos/${this.state.seleccion}`,{
            method:'delete',
            headers: new Headers ({"authorization": this.props.usuario.token, 'Content-Type':'application/json'
        })
           
        }).then(response=>response.json())
        .then(cur=>{

           console.log(cur)
           
            }).catch(err=>console.log(err))

        fetch(`http://localhost:3000/manejador/cursos/${this.props.usuario.id}`,{
                method:'get',
                headers: new Headers ({"authorization": this.props.usuario.token, 'Content-Type':'application/json'
            })
               
            }).then(response=>response.json())
            .then(listaCursos=>{
                /*if(user){
                    this.props.loadUser(user)
                    this.props.onRouteChange('signin')
                }*/
               
                console.log("Lista de menu:", listaCursos[0]._id)
                this.props.loadListaCurso(listaCursos);
               
                
               
                }).catch(err=>console.log(err))
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
                            this.props.cursos.map((elemento)=>(
                                <tr key={elemento._id}>
                                    <td>{elemento.nombre}</td>
                                    <td><input className="checkbox"type="checkbox" onChange={this.handleChange} value={elemento._id}></input></td>
                                </tr>
                        ))}
                    </tbody>
                </table>
                <div className="botones">
                    <button onClick={()=>this.props.onRouteChange('FormCurso')}  className="boton-agregar">Agregar</button>
                    <button onClick={this.editarCurso}  className="boton-editar">Editar</button>
                    <button className="boton-eliminar" onClick={this.eliminarCurso}>Eliminar</button>
                
                </div>

              
              
            </div>
            
           
        );
    }
}



export default TablaCursoGrupos;