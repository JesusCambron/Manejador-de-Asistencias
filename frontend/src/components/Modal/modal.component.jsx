import React from 'react';

import './moda.styles.scss'

const formData = new FormData();
class Modal extends React.Component {
    constructor(props){
        super(props)
        this.state={
            csv:null,
        }
    }
    
    onClose = e => {
        this.props.onClose && this.props.onClose(e);
    }
    onAccept=e=>{
        this.props.onAccept && this.props.onAccept(e);
    }
    onAdd=(e)=>{
        console.log(this.state.csv);
        fetch(`http://localhost:3000/manejador/usuarios/${this.props.user.id}`,{
            method:'post',
            headers: new Headers ({"authorization": this.props.user.token, 'Content-Type':'multipart/form-data'}),
            body: formData
        })
        .then(response=>
            response.json()
        )
        .then(file=>{
            console.log(file);
        })
    }

    onChangeArchivo=(e)=>{
        formData.append('csv',e.target.files[0])
        formData.append('idGrupo',1)
        formData.append('unidad',1  )
        formData.append('fecha','09/01/1999')
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
                        <div className="file-upload">
                            <input type="file" name="csv" id="file" onChange={this.onChangeArchivo} accept='.csv'/>
                            <label htmlFor="file" className='lbl-file'><i class="fas fa-file-upload"></i>Elige un archivo</label>
                        </div>
                        <div className='btn-box'>
                                <button className='btn-accept btn' onClick={(e)=>{this.onAdd(e)}}>Si</button>
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