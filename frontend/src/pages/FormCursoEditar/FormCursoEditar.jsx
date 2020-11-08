import React,{Component} from 'react'
import {cursos} from '../Cursos'
import './FormCursoEditar.css'

class FormCursoEditar extends Component{
    constructor(props){
        super(props);
        this.state = {
            cursos: cursos,
            nombreIngresado:"",
            horasIngresado:"",
            unidadIngresado:"",
            
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
    var valorNuevo={id: this.props.curso.id, nombre: this.state.nombreIngresado, horas: this.state.horasIngresado, unidad: this.state.unidadIngresado};
    var lista =this.state.cursos;

    lista.map((user)=>{
        if(user.id === valorNuevo.id){
            console.log(user);
        }
    })
}
limpiarCampos=()=>{
    document.getElementById("nombre").value=""
    document.getElementById("horas").value=""
    document.getElementById("unidad").value=""
}
onenombreChange=(e)=>{
    this.setState({nombreIngresado:e.target.value})
}
onehorasChange=(e)=>{
    this.setState({horasIngresado:e.target.value})
}
oneunidadChange=(e)=>{
    this.setState({unidadIngresado:e.target.value})
}
    

    render(){
        return(
            
            <div>
                
                <h2>Editar Curso </h2>
                  

                  
                     <div className="modal-entradas">
                         
                            <div>
                                <label>Nombre del curso: </label>
                                <input className="curso-nombre" value={this.props.curso.nombre} type="text" name="nombre"  id="nombre" onChange={this.onenombreChange} placeholder="Nombre del curso"></input> 
                            </div>

                            <div>
                            <label>Horas a la semana: </label>         
                            <input className="curso-horas" value={this.props.curso.horas} type="text" name="horas"  id="horas" onChange={this.onehorasChange} placeholder="Horas a la semana"></input>
                            </div>

                            <div>
                            <label>Número de unidades: </label>
                            <input className="curso-unidades" value={this.props.curso.unidad} type="text" name="unidad" id="unidad" onChange={this.oneunidadChange}  placeholder="Número de unidades"></input>
                            </div>
                            </div>
                            <div className="botones">
                            <button type ="submit"  className="boton-agregar">Agregar</button>
                            <button className="boton-limpiar"  onClick={()=>this.limpiarCampos()}>Limpiar</button>
                            </div>
                         
             </div>
            
        );
    }
    
    
}

export default FormCursoEditar;