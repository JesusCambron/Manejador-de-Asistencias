import React,{Component} from 'react'

import './FormAlumnoEditar.css'

class FormAlumnoEditar extends Component{
    constructor(props){
        super(props);
        this.state = {
            id: this.props.alumno.id,
            nombre:this.props.alumno.nombre,
            
        }
    }
    
editar=()=>{
    
    fetch(`http://localhost:3000/manejador/alumnos/${this.props.alumno.idAlumno}`,{
        method:'put',
        headers: new Headers ({"authorization": this.props.usuario.token, 'Content-Type':'application/json'
    }),
        body:JSON.stringify({
            idUsuario: this.props.usuario.id,
            id: this.state.id,
            nombre: this.state.nombre.trim().replace(/\s\s+/g, ' '),
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
}
oneidChange=(e)=>{
    this.setState({id:e.target.value})
}

    
ventanaConfirmacion=()=>{
    if(this.validarID() === false ||this.validarNombre()===false){
        return false
    }
    this.editar()
    
  
    document.getElementById("nombre").style.border = "1px solid black"
    document.getElementsByClassName("confirmar")[0].style.display = "block";
}   

/*
nombreRepetido=()=>{
    const lista = this.state.cursos.filter(curs => curs.nombre === this.state.nombre)
    if(lista.length === 1){
        return false
    }
    
}
*/

validarNombre=()=>{
    const expNombreCurso= RegExp(/^.{1,35}$/)
    const nombretrim = this.state.nombre.trim()
    nombretrim.replaceAll("\\s{2,}", " ");
    if(nombretrim === "" || !expNombreCurso.test(nombretrim)){
        document.getElementById("nombre").style.border = "1px solid red"
        return false
    }
    else{
        document.getElementById("nombre").style.border = "1px solid black"
        return true
    }
}

validarID=()=>{
    if(this.state.id === ""){
        document.getElementById("id").style.border = "1px solid red"
        return false
    }
    else{
        document.getElementById("id").style.border = "1px solid black"
        return true
    }
}





    render(){
        return(
            
            <div>
                
                <h2>Editar Curso </h2>
                  

                  
                     <div className="modal-entradas">


                            <div>
                                <label>ID: </label>
                                <input className="alumno-id" value={this.state.id} type="text" name="id"  id="id" onChange={this.oneidChange} placeholder="ID del alumno"></input> 
                            </div>
                            <div>
                                <label>Nombre del alumno: </label>
                                <input className="alumno-nombre" value={this.state.nombre} type="text" name="nombre"  id="nombre" onChange={this.onenombreChange} placeholder="Nombre del curso"></input> 
                            </div>

                            
                            </div>
                            <div className="botones">
                            <button type ="submit" onClick={this.ventanaConfirmacion} className="boton-agregar">Editar</button>
                            <button className="boton-limpiar"  onClick={this.limpiarCampos}>Limpiar</button>
                            </div>

                            <div className="confirmar">
                                 <div className="confirmar-centro">
                                <h1>Se ha editado el curso</h1>
                                <div className="confirmar-btns">
                                    <button className="si" onClick={()=>document.getElementsByClassName("confirmar")[0].style.display = "none"}>Aceptar</button>
                                </div>

                        </div>
                        
                    </div>
                         
             </div>
            
        );
    }
    
    
}

export default FormAlumnoEditar;