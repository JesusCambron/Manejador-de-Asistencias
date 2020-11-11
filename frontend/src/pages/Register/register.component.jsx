import React from 'react'
import Lottie from 'react-lottie'

import animationData from '../../assets/lotties/register.json'
import './register.styles.scss'

const initialState={
    isStopped:true,
    nombre:'',
    nombreError:'',
    apellido:'',
    apellidoError:'',
    correo:'',
    correoError:'',
    password:'',
    passwordError:'',
    nombreInstitucion:'',
    InstitutcionError:'',
    isRegistred:true,
    userError:''
}

class Register extends React.Component{
    constructor(props){
        super(props)
        this.state =initialState
    }

    validateUser=()=>{
        const checkForm=this.checkForm()
        if(checkForm){
            if(this.state.isRegistred){
                this.setState({userError:'Error al registrar este usuario'})
            }else{
                this.setState({userError:initialState.userError})
            }
        }
    }

    validateForm=()=>{
        const expNombre=RegExp(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,-]+$/)
        const expEmail= RegExp(/^[a-zA-Z0-9.!#$%&'+=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$/)
        const expPassword= RegExp(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/)
        if(this.state.nombre){
            if(!expNombre.test(this.state.nombre)){
                this.setState({nombreError:'Nombre inválido'})
            }else{
                this.setState({nombreError:initialState.nombreError})
            }    
        }else{
            this.setState({nombreError:'Ingrese un nombre'})
        }

        if(this.state.apellido){
            if(!expNombre.test(this.state.apellido)){
                this.setState({apellidoError:'Apellido inválido'})
            }else{
                this.setState({apellidoError:initialState.apellidoError})
            }    
        }else{
            this.setState({apellidoError:'Ingrese un Apellido'})
        }

        if(this.state.correo){
            if(!expEmail.test(this.state.correo)){
                this.setState({correoError:'Email inválido'})
            }
            else{
                this.setState({correoError:initialState.correoError})
            }    
        }else{
            this.setState({correoError:'Ingrese un correo'})
        }

        if(this.state.password){
            if(!expPassword.test(this.state.password)){
                this.setState({passwordError:'Contraseña inválida'})
            }
            else{
                this.setState({passwordError:initialState.passwordError})
            }  
        }else{
            this.setState({passwordError:'Ingrese una constraseña'})
        }

        if(this.state.nombreInstitucion){
            if(!expNombre.test(this.state.nombreInstitucion)){
                this.setState({InstitutcionError:'Nombre de institución invalido'})
            }
            else{
                this.setState({InstitutcionError:initialState.nombreInstitucion})
            }  
        }
    }

    checkForm=()=>{
        if(!this.state.nombreError && !this.state.apellidoError && !this.state.correoError && !this.state.passwordError && !this.state.InstitutcionError){
            return true
        }
        return false
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
        .then(response=>
            response.json()
        )
        .then(user=>{
            console.log(user);
            if(user.id){
                this.props.loadUser(user)
                this.setState({isRegistred:false})
                const validateUser=this.validateUser()
                this.props.onRouteChange('signin')
            }
            else{
                this.setState({isRegistred:true})
                const validateUser=this.validateUser()    
            }
        })
        .catch(err=>{
            this.setState({isRegistred:true})
            const validateUser=this.validateUser()
        })
        const validateForm=this.validateForm()
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
                        <div className='errors'>
                            { 
                                this.state.userError?
                                    this.state.userError
                                :null
                            }
                        </div>
                        <div className='errors'>
                            { 
                                this.state.nombreError?
                                    this.state.nombreError
                                :null
                            }
                        </div>
                        <div className='errors'>
                            { 
                                this.state.apellidoError?
                                    this.state.apellidoError
                                :null
                            }
                        </div>
                        <div className='errors'>
                            { 
                                this.state.correoError?
                                    this.state.correoError
                                :null
                            }
                        </div>
                        <div className='errors'>
                            { 
                                this.state.passwordError?
                                    this.state.passwordError
                                :null
                            }
                        </div>
                        <div className='errors'>
                            { 
                                this.state.InstitutcionError?
                                    this.state.InstitutcionError
                                :null
                            }
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