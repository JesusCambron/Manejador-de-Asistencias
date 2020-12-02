import React, {Component} from 'react';
import './FormGrupo.css'

class FormGrupo extends Component{
    constructor(props){
        super(props);
        this.state = {
            grupos:[],
            cursos: this.props.listaCursos,
            
            nuevoGrupo:{
                idCurso:"",
                curso:"",
                nombreGrupo:"",
            }
        }

        

    }

    componentWillMount(){
        this.mostrarGrupo()
    }

    mostrarGrupo=()=>{
        fetch(`http://localhost:3000/manejador/grupos/${this.props.usuario.id}`,{
                method:'get',
                headers: new Headers ({"authorization": this.props.usuario.token, 'Content-Type':'application/json'
            })
               
            }).then(response=>response.json())
            .then(listaGrupos=>{
                this.setState({grupos: listaGrupos})
                
               
                }).catch(err=>console.log(err))
        
                
    }
    
handleChange =e=>{
    const index = e.target.selectedIndex
   const value = e.target.options[index].value;
   const nombre= e.target.options[index].text

    this.setState({
        nuevoGrupo:{
            ...this.state.nuevoGrupo,
            idCurso: value,
            
    
        }
    })
    console.log(this.state.nuevoGrupo)
    
}

handleNombre = e =>{
    this.setState({
        nuevoGrupo:{
            ...this.state.nuevoGrupo,
            nombreGrupo: e.target.value

        }
        
    })
    console.log(this.state.nuevoGrupo)
}
insertar=()=>{
/* Para que no se pueda agregar el mismo curso
    const lista = this.state.cursos;
    const obj = {nombre: this.state.form.nombre.trim().replace(/\s\s+/g, ' '), horas: hor, unidades:uni}
    lista.push(obj)
    this.setState({cursos: lista})
*/
    fetch(`http://localhost:3000/manejador/grupos/${this.props.usuario.id}`,{
            headers: new Headers ({"authorization": this.props.usuario.token, 'Content-Type':'application/json'
            }),
            method:'post',
            body:JSON.stringify({

                idCurso: this.state.nuevoGrupo.idCurso,
                nombreGrupo: this.state.nuevoGrupo.nombreGrupo.trim().replace(/\s\s+/g, ' '),
                
            })
            
        }).then(response=>response.json())
        .then()
        .catch(err => console.log(err))

        console.log(this.state.nuevoGrupo)

            
}




limpiarCampos=()=>{
    document.getElementById("nombre").value=""
  
   

}
ventanaConfirmacion=()=>{
    
    if(this.state.nuevoGrupo.idCurso == "" || this.validarNombre()===false || this.validarGrupoRepetido() === false){
        return false
    }
    
   
    this.insertar()
    this.setState({})
    this.limpiarCampos()
    


    document.getElementById("nombre").style.border = "1px solid black"
    document.getElementsByClassName("confirmar")[0].style.display = "block";
   
}    



validarNombre=()=>{
    const expNombreGrupo= RegExp(/^[0-9a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,-]{1,35}$/)

    const nombretrima = this.state.nuevoGrupo.nombreGrupo.trim().replace(/\s\s+/g, ' ');
    console.log(nombretrima)

    if(nombretrima === "" || !expNombreGrupo.test(nombretrima)){
        document.getElementById("nombre").style.border = "1px solid red"
        return false
    }
    else{
        document.getElementById("nombre").style.border = "1px solid black"
        
        return true
        
    }
}

validarGrupoRepetido=()=>{
    const lista = this.state.grupos.filter(grupo => grupo.idCurso._id === this.state.nuevoGrupo.idCurso)
    console.log(lista)
    if(lista.length === 1 && lista[0].nombreGrupo === this.state.nuevoGrupo.nombreGrupo){
      return false
    }
}




    render(){
        return(
            
            <div>
                
                <h2>Grupo Nuevo</h2>
                  

                  
                     <div className="modal-entradas">


                         <div className="segmento"> 
                         <label className="labelito">Curso: </label>
                         <select name = "curso" onChange={this.handleChange}  id = "combo-cursos" className="combo-cursos">
                             <option  value="">Seleccione un curso</option>
                             {this.state.cursos.map(cur=> 
                                <option value={cur._id}>{cur.nombre}</option>
                                )}

                         </select>
                         </div>
                        <div className="segmento">
                            <label className="labelito">Grupo: </label>
                            <input className="grupo-nombre" required type="text" onChange={this.handleNombre} name="nombreGrupo" id="nombre"  placeholder="Nombre del grupo"></input> 
                               
                        </div>

                            
                    </div>

                            <div className="botones">
                            <button  className="boton-agregar" onClick={this.ventanaConfirmacion} value="Agregar">Agregar</button>
                            <button className="boton-limpiar" onClick={()=>this.limpiarCampos()} >Limpiar</button>
                            </div>
                    
                    <div className="confirmar">
                        <div className="confirmar-centro">
                            <h1>Se ha guardado un nuevo grupo</h1>
                            <div className="confirmar-btns">
                                <button className="si" onClick={()=>document.getElementsByClassName("confirmar")[0].style.display = "none"}>Aceptar</button>
                            </div>

                        </div>
                        
                    </div>
                            
             </div>
            
        );
    }
    
    
}

export default FormGrupo;