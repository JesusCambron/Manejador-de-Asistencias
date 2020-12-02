import React from 'react';


import Modal from '../../components/Modal/modal.component'

import './archivos.styles.scss'

class Archivos extends React.Component{
    constructor(props){
        super(props)
        this.state={
            archivos:[],
            unidades:0,
            unidadActual:1,
            modal:false,
            respuesta:false,
            accion:'',
            elementoTemporal:{}
        }
    }

    setRespuesta=()=>{
        this.setState({respuesta:!this.state.respuesta})
    }

    siguienteUnidad=()=>{
        if(this.state.unidadActual<this.state.unidades){
            this.setState({unidadActual:this.state.unidadActual+1})
        }
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
        // console.log(this.state.archivos.find(archivo=>archivo._id==e.target.value));
        this.setState({elementoTemporal:this.state.archivos.find(archivo=>archivo._id==e.target.value)})
    }

    eliminar = () => {
        // this.state.archivos.splice(this.state.elementoTemporal,1)
        // this.setState({archivos:archivos})
        // this.setState({modal:!this.state.modal})
        // /${this.state.elementoTemporal.path}
        fetch(`http://localhost:3000/manejador/archivos/${this.state.elementoTemporal._id}`,{
            method:'delete',
            headers: new Headers ({
                "authorization": this.props.user.token,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }),
            body:JSON.stringify({
                path:this.state.elementoTemporal.path
            })
        })
        .then(res=>
            console.log(res)
        )
        .then(()=>{
            this.setState({modal:!this.state.modal})
        })
    }

    fetchArhivos = () => {
        fetch(`http://localhost:3000/manejador/archivos/${this.props.grupo}/${this.state.unidadActual}`,{
            headers: {"authorization": this.props.user.token}
        })
        .then(res=>res.json())
        .then(archivos=>{
            this.setState({archivos:archivos})
        }
        )}
    

    componentDidMount(){
        const unidad=this.props.grupos.find(grupo=>grupo._id==this.props.grupo)
        // console.log(unidad);
        this.setState({unidades:unidad.idCurso.unidades})
        this.fetchArhivos()
    }

    componentDidUpdate(prevProps,prevState){
        if (prevState.unidadActual !== this.state.unidadActual || prevState.modal !== this.state.modal) {
            this.fetchArhivos()
          }
    }

    render(){
        const {archivos,unidadActual,accion}=this.state
        return (
            <> 
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
                            .map(({_id,fecha})=>(
                            <tr className='table-row' key={_id}>
                                <td className='row-fecha'>{fecha}</td>
                                <div className='detalles-item'>
                                    <td className='row-nombre'>Archivo.csv</td>
                                    <i class="fas fa-file-csv"></i>
                                </div>
                                <td className='delete-row'>
                                    <input type="checkbox" value={_id} onChange={this.onChange} onClick={(e)=>{this.mostrarModal(e,'eliminar')}} name='delete' id={`delete-btn-${_id}`} className='radio-delete'/>
                                    <label htmlFor={`delete-btn-${_id}`}>
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
                    :(accion==='agregar'?<Modal grupo={this.props.grupo} unidad={this.state.unidadActual} onClose={this.mostrarModal} mostrar={this.state.modal} accion={this.state.accion} user={this.props.user}/>
                    :<></>)
                }
            </>
        );
    }
};
export default Archivos;