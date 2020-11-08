import React from 'react'
import Lottie from 'react-lottie'

import animationData from '../../assets/lotties/signin'
import './sign-in.styles.scss'

const initialState={
    isStopped:true,
    signedEmail:'',
    signedPassword:'',
    isSignedIn:false,
    emailError:'',
    passwordError:'',
    userNotFoundError:''
}
class Signin extends React.Component{
    constructor(props){
        super(props)
        this.state=initialState
    }


    validateUser = () =>{
            // if(!this.state.isSignedIn){
            //     this.setState({userNotFoundError:'Usuario no valido'})
            // }else{
            //     console.log(initialState);
            // }
        const expEmail= RegExp(/^[a-zA-Z0-9.!#$%&'+=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$/)
        const expPassword= RegExp(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/)
        if(expPassword.test(this.state.signedPassword) && expEmail.test(this.state.signedEmail)){
            if(!this.state.isSignedIn){
                this.setState({userNotFoundError:'Usuario no registrado'})
            }else{
                this.setState({userNotFoundError:initialState.userNotFoundError})
            }
        }
        else{
            this.setState({userNotFoundError:initialState.userNotFoundError})
        }
        }

    validateForm=()=>{
        const expEmail= RegExp(/^[a-zA-Z0-9.!#$%&'+=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$/)
        const expPassword= RegExp(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/)
        if(this.state.signedEmail){
            if(!expEmail.test(this.state.signedEmail)){
                this.setState({emailError:'Email inválido'})
            }
            else{
                this.setState({emailError:initialState.emailError})
            }    
        }else{
            this.setState({emailError:'Ingrese un correo'})
        }

        if(this.state.signedPassword){
            if(!expPassword.test(this.state.signedPassword)){
                this.setState({passwordError:'Contraseña inválida'})
            }
            else{
                this.setState({passwordError:initialState.passwordError})
            }  
        }else{
            this.setState({passwordError:'Ingrese una constraseña'})
        }
    }
        
    onemailChange=(e)=>{
        this.setState({signedEmail:e.target.value})
    }
    onpasswordChange=(e)=>{
        this.setState({signedPassword:e.target.value})
    }

    //fetch
    Signin=()=>{
        fetch('http://localhost:3000/manejador/usuario/signIn',{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                correo: this.state.signedEmail,
                password:this.state.signedPassword,
            }) 
        })
        .then(response=>
            response.json()
        )
        .then(user=>{
            this.props.loadUser(user)
            this.setState({isSignedIn:true})
            const validateUser=this.validateUser()
            this.props.onRouteChange('homepage')
          })
          .catch(err=>{
            this.setState({isSignedIn:false})
            const validateUser=this.validateUser()
          })
          const validateForm=this.validateForm()
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
                <div className='signin-box'>
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
                        <div className='signin-input'>
                            <input className='input-mail' placeholder='Correo Electrónico' type="email" name="email" id="email" onChange={this.onemailChange}/>
                            <label htmlFor="email" className='email-label'>Correo Electrónico</label>
                        </div>
                        <div className='signin-input'>
                            <input className='input-pass' placeholder='Constraseña' type="password" name="password" id="password" onChange={this.onpasswordChange}/>
                            <label htmlFor="password" className='pass-label'>Constraseña</label>
                        </div>
                        <div className='errors'>
                            { 
                                this.state.emailError?
                                    this.state.emailError
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
                                this.state.userNotFoundError?
                                    this.state.userNotFoundError
                                :null
                            }
                        </div>
                        <div className='signin-input'>
                            <input className="input-btn" type="submit" value="Iniciar Sesión" onClick={this.Signin}/>
                        </div>
                        <div className='signin-input'>
                            <p className='register-txt'>¿No tienes una cuenta? <span className='txt-span' onClick={()=>this.props.onRouteChange('register')}>Regístrate</span></p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Signin