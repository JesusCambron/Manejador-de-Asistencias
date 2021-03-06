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
        fetch(`http://localhost:3000/manejador/grupos/${this.props.usuario.id}`,{
                method:'get',
                headers: new Headers ({"authorization": this.props.usuario.token, 'Content-Type':'application/json'
            })
               
            }).then(response=>response.json())
            .then(listaGrupos=>{
                
        
        
                this.props.loadListaGrupo(listaGrupos)
                this.props.onRouteChange('TablaGrupos')
                
               
                }).catch(err=>console.log(err))
        
                
    }

    mostrarMisCursos=()=>{
       
        fetch(`http://localhost:3000/manejador/grupos/${this.props.usuario.id}`,{
            method:'get',
            headers: new Headers ({"authorization": this.props.usuario.token, 'Content-Type':'application/json'
        })
           
        }).then(response=>response.json())
        .then(listaGrupos=>{
            
    
    
            this.props.loadListaGrupo(listaGrupos)
            this.props.onRouteChange('SeccionGrupos')
            
           
            }).catch(err=>console.log(err))
              
          
    }

    cerrarSesion=()=>{
        localStorage.removeItem('token')
        this.props.onRouteChange('signout')
    }
    inicio=()=>{
        this.props.onRouteChange('Menu')
    }

    
    render(){
        return(
            <div className="full-width">
                <nav className= "menu-head">
                    <ul className="menu-opciones">
                        <li className="menu-opciones-listado"><a onClick={this.inicio} ><i className="fas fa-home"></i>inicio</a></li>
                        <li className="menu-opciones-listado"><a onClick={this.mostrarMisCursos}><i className="fas fa-book"></i>mis cursos</a></li>
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
                        <li><a><i className="fas fa-clipboard-check"></i>ver asistencia</a></li>
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