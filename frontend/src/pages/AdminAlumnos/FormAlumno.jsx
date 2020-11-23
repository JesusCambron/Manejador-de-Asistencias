import React, {Component} from 'react';
import './FormAlumno.css'


class FormAlumno extends Component{
    constructor(props){
        super(props);
        this.state = {
            //cursos: this.props.listaCursos,
            idGrupo: this.props.idGrupo,
            alumnoNuevo:{
                id: "",
                nombre:"",

            },
        }
       
        
    }
    
handleChange =e=>{
    this.setState({
        alumnoNuevo:{
            ...this.state.alumnoNuevo,
            [e.target.name]: e.target.value,
        }
    })
}
insertar=()=>{
   
    /*
    const lista = this.state.cursos;
    const obj = {nombre: this.state.form.nombre.trim().replace(/\s\s+/g, ' '), horas: hor, unidades:uni}
    lista.push(obj)
    this.setState({cursos: lista})
    */

    fetch(`http://localhost:3000/manejador/alumnos/${this.props.usuario.id}`,{
            headers: new Headers ({"authorization": this.props.usuario.token, 'Content-Type':'application/json'
            }),
            method:'post',
            body:JSON.stringify({
                id: this.state.alumnoNuevo.id,
                nombre: this.state.alumnoNuevo.nombre.trim().replace(/\s\s+/g, ' '),
                idGrupo: this.state.idGrupo
            })
            
        }).then(response=>response.json())
        .then()
        .catch(err => console.log(err))

            
}




limpiarCampos=()=>{
    document.getElementById("nombre").value=""
    document.getElementById("id").value=""
    
    this.setState({form:{nombre:"",horas:"",unidad:""}})

}
ventanaConfirmacion=()=>{
    
    if(this.validarID()===false ||this.validarNombre()===false ) {
        return false
    }
    
    
   
    this.insertar()
    this.limpiarCampos()
    


    document.getElementById("nombre").style.border = "1px solid black"
    document.getElementById("id").style.border = "1px solid black"
    
    document.getElementsByClassName("confirmar")[0].style.display = "block";
   
}    

/*
nombreRepetido=()=>{
    const lista = this.state.cursos.filter(curs => curs.nombre === this.state.form.nombre)
    if(lista.length === 1){
        return false
    }
}
*/


validarNombre=()=>{
    const expNombreCurso= RegExp(/^[0-9a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,-]{1,35}$/)
    const nombretrim = this.state.alumnoNuevo.nombre.trim().replace(/\s\s+/g, ' ')

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
    if(this.state.alumnoNuevo.id === ""){
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
                
                <h2>Alumno Nuevo</h2>
                  

                  
                     <div className="modal-entradas">

                            <div>
                                <label>ID del alumno: </label>         
                                <input className="alumno-id" required type="text" name="id"  id="id" onChange={this.handleChange} placeholder="ID del alumno"></input>
                            
                            </div>
                         
                            <div>
                                <label>Nombre del Alumno: </label>
                                <input className="alumno-nombre" required type="text" name="nombre" id="nombre" onChange={this.handleChange} placeholder="Nombre del alumno"></input> 
                               
                            </div>

                           

                          
                    </div>

                            <div className="botones">
                            <button  className="boton-agregar" onClick={this.ventanaConfirmacion} value="Agregar">Agregar</button>
                            <button className="boton-limpiar" onClick={()=>this.limpiarCampos()} >Limpiar</button>
                            </div>
                    
                    <div className="confirmar">
                        <div className="confirmar-centro">
                            <h1>Se ha guardado un nuevo alumno</h1>
                            <div className="confirmar-btns">
                                <button className="si" onClick={()=>document.getElementsByClassName("confirmar")[0].style.display = "none"}>Aceptar</button>
                            </div>

                        </div>
                        
                    </div>
                            
             </div>
            
        );
    }
    
    
}

export default FormAlumno;