import React,{Component} from 'react'

import './FormGrupoEditar.css'

class FormGrupoEditar extends Component{
    constructor(props){
        super(props);
        this.state = {
            cursos: this.props.listaCursos,
              
                idCurso: this.props.grupo.idCurso,
                nombreGrupo: this.props.grupo.nombreGrupo
            
    
        }
     
    }
    
editar=()=>{
   
    fetch(`http://localhost:3000/manejador/grupos/${this.props.grupo.idGrupo}`,{
        method:'put',
        headers: new Headers ({"authorization": this.props.usuario.token, 'Content-Type':'application/json'
    }),
        body:JSON.stringify({
            idCurso: this.state.idCurso,
            nombreGrupo: this.state.nombreGrupo.trim().replace(/\s\s+/g, ' '),
        }) 
    }).then(response=>response.json())
    .then(user=>{
        }).catch(err=>console.log(err))

}


limpiarCampos=()=>{
    document.getElementById("nombre").value=""
    this.setState({ nuevoGrupo:{
        nombreGrupo: ""
        }
    })
}

handleChange =e=>{
    const index = e.target.selectedIndex
   const value = e.target.options[index].value;
   const nombre= e.target.options[index].text

    this.setState({
       
            idCurso: value,
            curso: nombre,
    
        
    })    
}

handleNombre = e =>{
    this.setState({
       
            
            nombreGrupo: e.target.value

        
        
    })
}
    
ventanaConfirmacion=()=>{
    
    if(this.validarNombre()===false){
        return false
    }
    

    this.editar()
    
  
    document.getElementById("nombre").style.border = "1px solid black"
    document.getElementsByClassName("confirmar")[0].style.display = "block";
}   


validarNombre=()=>{
    const expNombreCurso= RegExp(/^.{1,35}$/)
    const nombretrim = this.state.nombreGrupo.trim()
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




    render(){
        return(
            
            <div>
                
                <h2>Editar Grupo </h2>
                  

                  
                     <div className="modal-entradas">
                     <div className="segmento"> 
                         <label className="labelito">Curso: </label>
                         <select name = "curso" onChange={this.handleChange}  id = "combo-cursos" className="combo-cursos">
                         {this.state.cursos.map(cur=>
                                
                                cur._id === this.state.idCurso ? <option  defaultValue={true} selected key={cur._id} value={cur._id}>{cur.nombre}</option>:
                                <option key={cur._id} value={cur._id}>{cur.nombre}</option> 
                                )}
                                
                         </select>
                         </div>

                        <div className="segmento">
                            <label className="labelito">Grupo: </label>
                            <input className="grupo-nombre"  value={this.state.nombreGrupo}  type="text" onChange={this.handleNombre} name="nombreGrupo" id="nombre"  placeholder="Nombre del grupo"></input> 
                               
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

export default FormGrupoEditar;