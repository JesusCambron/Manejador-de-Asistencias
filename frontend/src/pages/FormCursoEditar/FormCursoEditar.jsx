import React,{Component} from 'react'

import './FormCursoEditar.css'

class FormCursoEditar extends Component{
    constructor(props){
        super(props);
        this.state = {
            cursos: this.props.listaCursos,
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
            idUsuario: this.props.usuario.id,
            nombre: this.state.nombre.trim().replace(/\s\s+/g, ' '),
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
    
ventanaConfirmacion=()=>{
    if(this.validarNombre()===false || this.validarHoras()===false || this.validarUnidades()===false || this.validarNombreRepetido()===false){
        return false
    }
    this.editar()
    
  
    document.getElementById("nombre").style.border = "1px solid black"
    document.getElementById("horas").style.border = "1px solid black"
    document.getElementById("unidad").style.border = "1px solid black"
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

validarHoras=()=>{
    const expNumero = RegExp(/^\d{1,3}$/)

    if(!expNumero.test(this.state.horas)){
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
    if(!expNumero.test(this.state.unidad)){
        document.getElementById("unidad").style.border = "1px solid red"
        return false
    }
    else{
        document.getElementById("unidad").style.border = "1px solid black"
        return true
    }
}

validarNombreRepetido=()=>{

    const lista = this.state.cursos.filter(cur => cur.nombre !== this.props.curso.nombre);

    
    let valor = true
    lista.map(curso => {
        if(curso.nombre===this.state.nombre){
            document.getElementById("nombre").style.border = "1px solid red"
            valor = false
            
        }
        /*
        else{
            document.getElementById("nombre").style.border = "1px solid black"
            valor = true
        }
        */
    })
    return valor
    
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

export default FormCursoEditar;