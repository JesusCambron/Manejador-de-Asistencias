import React, {Component} from 'react';
import './FormCurso.css'
//import {cursos} from '../Cursos'

class FormCurso extends Component{
    constructor(props){
        super(props);
        this.state = {
            cursos: this.props.listaCursos,
            form:{
               
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
    console.log(this.state.form.nombre)
}
insertar=()=>{

    

    const hor = Number(this.state.form.horas);
    const uni = Number(this.state.form.unidad);

    
    
    fetch(`http://localhost:3000/manejador/cursos/${this.props.usuario.id}`,{
            method:'post',
            headers: new Headers ({"authorization": this.props.usuario.token, 'Content-Type':'application/json'
        }),
            body:JSON.stringify({
                nombre: this.state.form.nombre.trim(),
                horas: hor,
                unidades : uni
            })
            
        }).then(response=>response.json())
        .then(
            ).catch()

            
}
limpiarCampos=()=>{
    document.getElementById("nombre").value=""
    document.getElementById("horas").value=""
    document.getElementById("unidad").value=""
    this.setState({form:{nombre:"",horas:"",unidad:""}})

}
ventanaConfirmacion=()=>{
    
    if(this.validarNombre()===false || this.validarHoras()===false  || this.validarUnidades()===false) {
        return false
    }
    
    this.insertar()
    this.limpiarCampos()
    


    document.getElementById("nombre").style.border = "1px solid black"
    document.getElementById("horas").style.border = "1px solid black"
    document.getElementById("unidad").style.border = "1px solid black"
    document.getElementsByClassName("confirmar")[0].style.display = "block";
   
}    

validarNombre=()=>{
    const expNombreCurso= RegExp(/^[0-9a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,-]{1,35}$/)
    const nombretrim = this.state.form.nombre.trim()
    nombretrim.replaceAll("\\s{2,}", " ");
    if(nombretrim === "" || !expNombreCurso.test(nombretrim) ){
        document.getElementById("nombre").style.border = "1px solid red"
        return false
    }
    else{
        document.getElementById("nombre").style.border = "1px solid black"
        return true
    }
}
validarHoras=()=>{
    const expNumero = RegExp(/^\d{1,3}$/)

    if(!expNumero.test(this.state.form.horas)){
        document.getElementById("horas").style.border = "1px solid red"
        return false
    }
    else{
        document.getElementById("horas").style.border = "1px solid black"
        return true
       
    }

}

    validarUnidades=()=>{
        const expNumero = RegExp(/^\d{1,3}$/)
        if(!expNumero.test(this.state.form.unidad)){
            document.getElementById("unidad").style.border = "1px solid red"
            return false
        }
        else{
            document.getElementById("unidad").style.border = "1px solid black"
            return true
        }
    }


    render(){
        return(
            
            <div>
                
                <h2>Curso Nuevo</h2>
                  

                  
                     <div className="modal-entradas">
                         
                            <div>
                                <label>Nombre del curso: </label>
                                <input className="curso-nombre" required type="text" name="nombre" id="nombre" onChange={this.handleChange} placeholder="Nombre del curso"></input> 
                               
                            </div>

                            <div>
                            <label>Horas a la semana: </label>         
                            <input className="curso-horas" required type="text" name="horas"  id="horas" onChange={this.handleChange} placeholder="Horas a la semana"></input>
                            
                            </div>

                            <div>
                            <label>Número de unidades: </label>
                            <input className="curso-unidades"  required type="text" name="unidad" id="unidad" onChange={this.handleChange}  placeholder="Número de unidades"></input>
                            
                            </div>
                    </div>

                            <div className="botones">
                            <button  className="boton-agregar" onClick={this.ventanaConfirmacion} value="Agregar">Agregar</button>
                            <button className="boton-limpiar" onClick={()=>this.limpiarCampos()} >Limpiar</button>
                            </div>
                    
                    <div className="confirmar">
                        <div className="confirmar-centro">
                            <h1>Se ha guardado un nuevo curso</h1>
                            <div className="confirmar-btns">
                                <button className="si" onClick={()=>document.getElementsByClassName("confirmar")[0].style.display = "none"}>Aceptar</button>
                            </div>

                        </div>
                        
                    </div>
                            
             </div>
            
        );
    }
    
    
}

export default FormCurso;