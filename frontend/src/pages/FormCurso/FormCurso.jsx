import React, {Component} from 'react';
import './FormCurso.css'
import {cursos} from '../Cursos'

class FormCurso extends Component{
    constructor(props){
        super(props);
        this.state = {
            cursos: cursos,
            form:{
                id: "",
                nombre:"",
                horas:"",
                unidad:""
            },
        }
    }
handleChange =e=>{
    this.setState({
        form:{
            ...this.state.form,
            [e.target.name]: e.target.value,
        }
    })
}
insertar=()=>{
    var valorNuevo={...this.state.form};
    valorNuevo.id=this.state.cursos.length+1;
    var lista =this.state.cursos;
    lista.push(valorNuevo);
    this.setState({cursos:lista})
    console.log(lista)
    this.props.onRouteChange('TablaCursoGrupos')

}
limpiarCampos=()=>{
    document.getElementById("nombre").value=""
    document.getElementById("horas").value=""
    document.getElementById("unidad").value=""

}
    

    render(){
        return(
            
            <div>
                
                <h2>Curso Nuevo</h2>
                  

                  
                     <div className="modal-entradas">
                         
                            <div>
                                <label>Nombre del curso: </label>
                                <input className="curso-nombre" type="text" name="nombre"  id="nombre" onChange={this.handleChange} placeholder="Nombre del curso"></input> 
                            </div>

                            <div>
                            <label>Horas a la semana: </label>         
                            <input className="curso-horas" type="text" name="horas"  id="horas" onChange={this.handleChange} placeholder="Horas a la semana"></input>
                            </div>

                            <div>
                            <label>Número de unidades: </label>
                            <input className="curso-unidades" type="text" name="unidad" id="unidad" onChange={this.handleChange}  placeholder="Número de unidades"></input>
                            </div>
                            </div>
                            <div className="botones">
                            <button  className="boton-agregar" onClick={()=>this.insertar()} value="Agregar">Agregar</button>
                            <button className="boton-limpiar" onClick={()=>this.limpiarCampos()} >Limpiar</button>
                            </div>
                            
             </div>
            
        );
    }
    
    
}

export default FormCurso;