import React, { Component } from 'react';
import './Menu.css';



class Menu extends Component{

    constructor(props){
        super(props);
        this.state = {
            showAdminCursos: false,
        }
    }

    
    render(){
        return(
        
            <div className="full-width">
                <nav className= "menu-head">
                    <ul className="menu-opciones">
                        <li className="menu-opciones-listado"><a href = "1"><i className="fas fa-home"></i>inicio</a></li>
                        <li className="menu-opciones-listado"><a href = "2"><i className="fas fa-book"></i>mis cursos</a></li>
                        <li className="menu-opciones-listado"><a href = "3"><i className="fas fa-book-medical"></i>administrar mis cursos</a>
                                <ul className="menu-cursos">
                                    <li>
                                        <a onClick={()=>this.props.onRouteChange('TablaCursoGrupos')} >administrar cursos</a>
                                    </li>
                                    <li>
                                    <a href="3.2">administrar grupos</a>
                                    </li> 
                                </ul>
                        </li>
                        <li><a href = "4"><i className="fas fa-clipboard-check"></i>ver asistencia</a></li>
                        <li className="opcion-profesor">
                            <div className = "info-profesor">
                                <h4>juan perez</h4>
                                <h4>profesor</h4>
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