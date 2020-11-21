import React from 'react';

import Accept from '../Dropzone/dropzone.component'

import './moda.styles.scss'

class Modal extends React.Component {
    onClose = e => {
        this.props.onClose && this.props.onClose(e);
    }
    onAccept=e=>{
        this.props.onAccept && this.props.onAccept(e);
    }
    
    render() {
        if(!this.props.mostrar){
            return null
        }
        return(
            <div className='overlay' >
                <div className='modal-archivos'> 
                    <button className='close-btn' onClick={(e)=>{this.onClose(e)}}>
                        <i class="fas fa-times"></i>
                    </button>
                {
                    this.props.accion=='agregar'?
                    <div className='modal-content'>
                        <Accept />
                        <div className='btn-box'>
                                <button className='btn-accept btn' onClick={(e)=>{this.onAccept(e)}}>Si</button>
                                <button className='btn-cancel btn' onClick={(e)=>{this.onClose(e)}}>No</button>
                        </div>
                    </div>
                    :
                    <div className='modal-content'>
                        <span className='title-alert'>¿Seguro de que quieres eliminar la selección?</span>
                        <div className='btn-box'>
                            <button className='btn-accept btn' onClick={(e)=>{this.onAccept(e)}}>Si</button>
                            <button className='btn-cancel btn' onClick={(e)=>{this.onClose(e)}}>No</button>
                        </div>
                    </div>

                }
                    
                    
                </div>
            </div>
        )  
    }
}

export default Modal;