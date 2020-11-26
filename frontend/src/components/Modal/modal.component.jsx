import React from 'react';

import './modal.styles.scss'

const formData = new FormData();
class Modal extends React.Component {
    constructor(props){
        super(props)
        this.state={
            fecha:'',
            nombreArchivo:''
        }
    }
    
    onClose = e => {
        this.props.onClose && this.props.onClose(e);
    }
    onAccept=e=>{
        this.props.onAccept && this.props.onAccept(e);
    }
    onAdd=(e)=>{
        fetch(`http://localhost:3000/manejador/archivos/${this.props.user.id}`,{
            method:'post',
            headers: new Headers ({"authorization": this.props.user.token}),
            body: formData
        })
        .then(response=>
            response.json()
        )
        .then(file=>{
            console.log(file);
            this.onClose(e)
        })
        formData.delete('csv')
        formData.delete('idGrupo')
        formData.delete('unidad')
        formData.delete('fecha')    
    }

    onChangeArchivo=(e)=>{
        this.setState({nombreArchivo:e.target.files[0].name})
        formData.append('csv',e.target.files[0])
        formData.append('idGrupo',this.props.grupo)
        formData.append('unidad',this.props.unidad)
        formData.append('fecha',this.state.fecha)
    }

    formatDate=(e)=>{
        const fechaArreglo=e.target.value.split('-')
        this.setState({fecha:`${fechaArreglo[1]}/${fechaArreglo[2]}/${fechaArreglo[0]}`})
        
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
                            <input type="date" name="" id="" onChange={this.formatDate}/>
                            <input type="file" name="csv" id="file" onChange={this.onChangeArchivo} accept='.csv'/>
                            <label htmlFor="file" className='lbl-file'><i class="fas fa-file-upload"></i><span>Elige un archivo</span>
                                <span>{this.state.nombreArchivo}</span>
                            </label>
                            
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