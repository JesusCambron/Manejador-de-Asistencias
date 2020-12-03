import React,{Component} from 'react'

import './FormAlumnoEditar.css'

class FormAlumnoEditar extends Component{
    constructor(props){
        super(props);
        this.state = {
            alumnos: this.props.listaAlumnos,
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
            idGrupo: this.props.grupo.id,
            id: this.state.id.trim().replace(/\s\s+/g, ' '),
            nombre: this.state.nombre.trim().replace(/\s\s+/g, ' '),
        }) 
    }).then(response=>response.json())
    .then(user=>{
       console.log(user)
        }).catch(err=>console.log(err))

}


limpiarCampos=()=>{
    document.getElementById("id").value=""
    document.getElementById("nombre").value=""
    this.setState({ nombre:"",
        id:"",})
}
onenombreChange=(e)=>{
    this.setState({nombre:e.target.value})
}
oneidChange=(e)=>{
    this.setState({id:e.target.value})
}

    
ventanaConfirmacion=()=>{
    if(this.validarID() === false ||this.validarNombre()===false ){
        return false
    }
    this.editar()
    
    document.getElementById("nombre").style.border = "1px solid black"
    document.getElementById("id").style.border = "1px solid black"
  

    document.getElementsByClassName("confirmar")[0].style.display = "block";
}   


validarNombre=()=>{
    const expNombreAlumno= RegExp(/^[0-9a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,-]{1,35}$/)
    const nombretrim = this.state.nombre.trim()
    nombretrim.replaceAll("\\s{2,}", " ");
    if(nombretrim === "" || !expNombreAlumno.test(nombretrim)){
        document.getElementById("nombre").style.border = "1px solid red"
        return false
    }
    else{
        document.getElementById("nombre").style.border = "1px solid black"
        return true
    }
}

validarID=()=>{

    const expidAlumno= RegExp(/^[0-9a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,-]{1,15}$/)
    const idtrim = this.state.id.trim().replace(/\s\s+/g, ' ')

    


    if(this.state.id === "" || !expidAlumno.test(idtrim) || this.validarIDRepetido()===false){
        document.getElementById("id").style.border = "1px solid red"
        return false
    }
    else{
        document.getElementById("id").style.border = "1px solid black"
        return true
    }
}

validarIDRepetido=()=>{
    const lista = this.state.alumnos.filter(alum => alum.id !== this.props.alumno.id)

    let valor = true
    lista.map(alumno => {
        if(alumno.id===this.state.id.trim().replace(/\s\s+/g, ' ')){
            document.getElementById("id").style.border = "1px solid red"
            valor = false
            
        }
    })
    console.log(valor)
    return valor
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