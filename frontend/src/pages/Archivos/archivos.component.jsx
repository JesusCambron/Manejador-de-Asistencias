import React from 'react';

import Menu from '../Menu/Menu'
import Modal from '../../components/Modal/modal.component'

import './archivos.styles.scss'

import {archivos} from '../archivos'

class Archivos extends React.Component{
    constructor(){
        super()
        this.state={
            archivos:archivos,
            unidadActual:1,
            modal:false,
            respuesta:false,
            accion:'',
            elementoTemporal:0
        }
    }

    setRespuesta=()=>{
        this.setState({respuesta:!this.state.respuesta})
    }

    siguienteUnidad=()=>{
        this.setState({unidadActual:this.state.unidadActual+1})
    }

    anteriorUnidad=()=>{
        if(this.state.unidadActual>1){
            this.setState({unidadActual:this.state.unidadActual-1})
        }
    }

    mostrarModal=(e,action)=>{
        this.setState({accion:action})
        this.setState({modal:!this.state.modal})
    }

    onChange=(e)=>{
        this.setState({elementoTemporal:this.state.archivos.findIndex(archivo=>archivo.id==e.target.value)})
    }

    eliminar = () => {
        this.state.archivos.splice(this.state.elementoTemporal,1)
        this.setState({archivos:archivos})
        this.setState({modal:!this.state.modal})
    }
    
    render(){
        const {archivos,unidadActual,accion}=this.state
        return (
            <>
                <Menu token={this.props.user.token} nombreUsuario={this.props.user.nombre} onRouteChange={this.props.onRouteChange}/>
                <div className='Titulos'>
                    <h1 className='titulo-clase'>Clase</h1>
                    <p className='titulo-hora'>Hora</p>
                </div>
                <div className='box-archivos'>
                    <div className='box-agregar'>
                        <div className='box-agregar-titulo'>
                            <i class="fas fa-chevron-left" onClick={this.anteriorUnidad}></i>
                            <h3 >Unidad {unidadActual}</h3>
                            <i class="fas fa-chevron-right" onClick={this.siguienteUnidad}></i>
                        </div>
                        <i class="fas fa-plus" onClick={(e)=>{this.mostrarModal(e,'agregar')}}></i>
                    </div>
                    <table className='tabla-archivos'>
                        {
                            archivos
                            .filter(({unidad})=>unidad==this.state.unidadActual)
                            .map(({id,nombre,fecha})=>(
                            <tr className='table-row' key={id}>
                                <td className='row-fecha'>{fecha}</td>
                                <div className='detalles-item'>
                                    <td className='row-nombre'>{nombre}</td>
                                    <i class="fas fa-file-csv"></i>
                                </div>
                                <td className='delete-row'>
                                    <input type="checkbox" value={id} onChange={this.onChange} onClick={(e)=>{this.mostrarModal(e,'eliminar')}} name='delete' id={`delete-btn-${id}`} className='radio-delete'/>
                                    <label htmlFor={`delete-btn-${id}`}>
                                            <i class="fas fa-trash-alt"></i>
                                    </label>
                                </td>
                            </tr>
                            ))
                        }
                    </table>
                </div>
                {
                    accion==='eliminar'?
                        <Modal onAccept={this.eliminar} onClose={this.mostrarModal} mostrar={this.state.modal} accion={this.state.accion}/>
                    :(accion==='agregar'?<Modal onAccept={this.agregar} onClose={this.mostrarModal} mostrar={this.state.modal} accion={this.state.accion} user={this.props.user}/>
                    :<></>)
                }
            </>
        );
    }
};
export default Archivos;