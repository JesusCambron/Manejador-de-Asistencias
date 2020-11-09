import React,{Component} from 'react'

import './FormCursoEditar.css'

class FormCursoEditar extends Component{
    constructor(props){
        super(props);
        this.state = {
            nombre:this.props.curso.nombre,
            horas:this.props.curso.horas,
            unidad:this.props.curso.unidad,
            
        }

    
    }
    
editar=()=>{
    const hor = Number(this.state.horas);
    const uni = Number(this.state.unidad);
    fetch(`http://localhost:3000/manejador/cursos/${this.props.curso.id}`,{
        method:'put',
        headers: new Headers ({"authorization": this.props.usuario.token, 'Content-Type':'application/json'
    }),
        body:JSON.stringify({
            
            nombre: this.state.nombre,
            horas: hor,
            unidades : uni
        }) 
    }).then(response=>response.json())
    .then(user=>{
       console.log(user)
        }).catch(err=>console.log(err))

}
limpiarCampos=()=>{
    document.getElementById("nombre").value=""
    document.getElementById("horas").value=""
    document.getElementById("unidad").value=""
    this.setState({ nombre:"",
        horas:"",
        unidad: "",})
}
onenombreChange=(e)=>{
    this.setState({nombre:e.target.value})
    console.log(this.state.nombre)
}
onehorasChange=(e)=>{
    this.setState({horas:e.target.value})
}
oneunidadChange=(e)=>{
    this.setState({unidad:e.target.value})
}
    

    render(){
        return(
            
            <div>
                
                <h2>Editar Curso </h2>
                  

                  
                     <div className="modal-entradas">
                            <div>
                                <label>Nombre del curso: </label>
                                <input className="curso-nombre" value={this.state.nombre} type="text" name="nombre"  id="nombre" onChange={this.onenombreChange} placeholder="Nombre del curso"></input> 
                            </div>

                            <div>
                            <label>Horas a la semana: </label>         
                            <input className="curso-horas" value={this.state.horas} type="text" name="horas"  id="horas" onChange={this.onehorasChange} placeholder="Horas a la semana"></input>
                            </div>

                            <div>
                            <label>Número de unidades: </label>
                            <input className="curso-unidades" value={this.state.unidad} type="text" name="unidad" id="unidad" onChange={this.oneunidadChange}  placeholder="Número de unidades"></input>
                            </div>
                            </div>
                            <div className="botones">
                            <button type ="submit" onClick={this.editar} className="boton-agregar">Editar</button>
                            <button className="boton-limpiar"  onClick={this.limpiarCampos}>Limpiar</button>
                            </div>
                         
             </div>
            
        );
    }
    
    
}

export default FormCursoEditar;