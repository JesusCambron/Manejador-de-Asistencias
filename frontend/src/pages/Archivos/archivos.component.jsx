import React from 'react';

import Menu from '../Menu/Menu'

import './archivos.styles.scss'

import {archivos} from '../archivos'

class Archivos extends React.Component{
    render(){
        return (
            <>
                <Menu />
                <div className='Titulos'>
                    <h1 className='titulo-clase'>Clase</h1>
                    <p className='titulo-hora'>Hora</p>
                </div>
                <div className='box-archivos'>
                    <div className='box-agregar'>
                        <i class="fas fa-plus"></i>
                    </div>
                    <table className='tabla-archivos'>
                        {
                            archivos.map(({id,nombre,fecha})=>(
                            <tr className='table-row' key={id}>
                                <td className='row-fecha'>{fecha}</td>
                                <div className='detalles-item'>
                                    <td className='row-nombre'>{nombre}</td>
                                    <i class="fas fa-file-csv"></i>
                                </div>
                                <td className='delete-row'>
                                    <input type="radio" onChange={(e)=> console.log(e.target.value)} name='delete' id={`delete-btn-${id}`} value={id} className='radio-delete'/>
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