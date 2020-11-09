import React from 'react'
import Lottie from 'react-lottie'

import animationData from '../../assets/lotties/register.json'
import './register.styles.scss'


class Register extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            isStopped:true,
            nombre:'',
            apellido:'',
            correo:'',
            password:'',
            nombreInstitucion:''
        }
    }

    Register=()=>{
        fetch('http://localhost:3000/manejador/usuario/signUp',{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                nombre:this.state.nombre,
                apellido:this.state.apellido,
                correo: this.state.correo,
                password:this.state.password,
                nombreInstitucion:this.state.nombreInstitucion
            }) 
        })
        .then(response=>response.json())
        .then(user=>{
            if(user){
                this.props.loadUser(user)
                this.props.onRouteChange('signin')
            }
            })
    }
    
    onnameChange=(e)=>{
        this.setState({nombre:e.target.value})
    }
    onapellidoChange=(e)=>{
        this.setState({apellido:e.target.value})
    }
    onemailChange=(e)=>{
        this.setState({correo:e.target.value})        
    }
    onpasswordChange=(e)=>{
        this.setState({password:e.target.value})
    }
    oninstitucionChange=(e)=>{
        this.setState({nombreInstitucion:e.target.value})
    }

    //animacion hover para el lottie
    animate=()=>{
        this.setState({isStopped:true})
    }
    stop=()=>{
        this.setState({isStopped:false})
    }

    render(){
        const defaultOptions = {
            loop: false,
            autoplay: true,
            animationData: animationData,
            rendererSettings: {
              preserveAspectRatio: "xMidYMid slice"
            }
        };

        return (
            <div className='signin'>
                <div className='register-box'>
                    <div onMouseOver={this.animate}
                         onMouseLeave={this.stop}
                         className='signin-icon'
                    >
                        <Lottie 
                            options={defaultOptions}
                            isStopped={this.state.isStopped}
                            height={200}
                            width={200}
                        />
                    </div>
                    <div className='signin-form'>
                        <h3>Registro de usuario</h3>
                        <div className='signin-input'>
                            <input className='input-name' placeholder='Nombre' type="text" name="name" id="name" onChange={this.onnameChange}/>
                            <label htmlFor="name" className='name-label'>Nombre</label>
                        </div>
                        <div className='signin-input'>
                            <input className='input-apellido' placeholder='Apellido' type="text" name="apellido" id="apellido" onChange={this.onapellidoChange}/>
                            <label htmlFor="apellido" className='apellido-label'>Apellido</label>
                        </div>
                        <div className='signin-input'>
                            <input className='input-mail' placeholder='Correo Electrónico' type="email" name="email" id="email" onChange={this.onemailChange}/>
                            <label htmlFor="email" className='email-label'>Correo Electrónico</label>
                        </div>  
                        <div className='signin-input'>
                            <input className='input-pass' title="La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula." placeholder='Constraseña' type="password" name="password" id="password" onChange={this.onpasswordChange}/>
                            <label htmlFor="password" className='pass-label'>Constraseña</label>
                        </div>
                        <div className='signin-input'>
                            <input className='input-institucion' placeholder='Nombre de la institución' type="text" name="institucion" id="institucion" onChange={this.oninstitucionChange}/>
                            <label htmlFor="institucion" className='institucion-label'>Institución</label>
                        </div>
                        <div className='signin-input'>
                            <input className="input-btn" type="submit" value="Regístrate" onClick={this.Register}/>
                        </div>
                        <div className='signin-input'>
                            <p className='register-txt'>¿Ya tienes una cuenta? <span className='txt-span' onClick={()=>this.props.onRouteChange('signin')}>Inicia Sesión</span></p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register