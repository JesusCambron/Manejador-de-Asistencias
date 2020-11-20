import React from 'react';

import Menu from '../Menu/Menu'

import './archivos.styles.scss'

import {archivos} from '../archivos'

class Archivos extends React.Component{
    constructor(){
        super()
        this.state={
            archivos:archivos,
            unidadActual:1
        }
    }

    siguienteUnidad=()=>{
        this.setState({unidadActual:this.state.unidadActual+1})
    }

    anteriorUnidad=()=>{
        if(this.state.unidadActual>1){
            this.setState({unidadActual:this.state.unidadActual-1})
        }
    }

    onChange=(e)=>{
            const a=this.state.archivos.findIndex(archivo=>archivo.id==e.target.value)
            this.state.archivos.splice(a,1)
            this.setState({archivos:archivos})
    }

    render(){
        const {archivos,unidadActual}=this.state
        console.log(archivos)
        return (
            <>
                <Menu />
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
                        <i class="fas fa-plus"></i>
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
                                    <input type="checkbox" value={id} onChange={this.onChange} name='delete' id={`delete-btn-${id}`} className='radio-delete'/>
                                    <label htmlFor={`delete-btn-${id}`}>
                                            <i class="fas fa-trash-alt"></i>
                                    </label>
                                </td>
                            </tr>
                            ))
                        }
                    </table>
                </div>
            </>
        );
    }
};
export default Archivos;