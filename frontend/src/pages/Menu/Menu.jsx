import React, { Component } from 'react';
import './Menu.css';



class Menu extends Component{

    constructor(props){
        super(props);
       
    }
    mostrar=()=>{

            fetch(`http://localhost:3000/manejador/cursos/${this.props.usuario.id}`,{
                method:'get',
                headers: new Headers ({"authorization": this.props.usuario.token, 'Content-Type':'application/json'
            })
               
            }).then(response=>response.json())
            .then(listaCursos=>{
                
        
                this.props.loadListaCurso(listaCursos);
                this.props.onRouteChange('TablaCursoGrupos')
                
               
                }).catch(err=>console.log(err))
    }


    mostrarGrupo=()=>{

        this.props.onRouteChange('TablaGrupos')

    }

    cerrarSesion=()=>{
        localStorage.removeItem('token')
        this.props.onRouteChange('signout')
    }

    
    render(){
        return(
            <div className="full-width">
                <nav className= "menu-head">
                    <ul className="menu-opciones">
                        <li className="menu-opciones-listado"><a ><i className="fas fa-home"></i>inicio</a></li>
                        <li className="menu-opciones-listado"><a ><i className="fas fa-book"></i>mis cursos</a></li>
                        <li className="menu-opciones-listado"><a ><i className="fas fa-book-medical"></i>administrar mis cursos</a>
                                <ul className="menu-cursos">
                                    <li>
                                        <a onClick={this.mostrar}  >administrar cursos</a>
                                    </li>
                                    <li>
                                    <a onClick={this.mostrarGrupo}>administrar grupos</a>
                                    </li> 
                                </ul>
                        </li>
                        <li><i className="fas fa-clipboard-check"></i>ver asistencia</li>
                        <li className="opcion-profesor">
                            <div className = "info-profesor">
                                <h4>{this.props.nombreUsuario}</h4>
                                <h4>profesor</h4>
                                <p className="cerrar-sesion" onClick={this.cerrarSesion}>Cerrar Sesión</p>
                            </div>
                            <div className="img-profesor" /*src="https://1.bp.blogspot.com/_FlLnLokhtwA/SuNmXwyQw9I/AAAAAAAAH-Q/XPftAOkwiwc/s320/Manuel%2520Domitsu%2520Kono%252025.jpg"*/></div>
                        </li>
                    </ul>
                </nav>
            </div>  
            
        );
        
    }
   
    
}

export default Menu;