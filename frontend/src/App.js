import React from 'react'

import './App.css';
import Signin from './pages/Sign-in/sing-in.component';
import Register from './pages/Register/register.component';
import Homepage from './pages/HomePage/homepage.component'
import TablaCursoGrupos from './pages/TablaCursosGrupos/TablaCursoGrupos';
import FormCurso from './pages/FormCurso/FormCurso';
import FormCursoEditar from './pages/FormCursoEditar/FormCursoEditar';
import Menu from './pages/Menu/Menu'
import TablaGrupos from './pages/AdminGrupos/TablaGrupos'
import FormGrupo from './pages/AdminGrupos/FormGrupo'
import FormGrupoEditar from './pages/AdminGrupos/FormGrupoEditar'
import SeccionGrupos from './pages/AdminAlumnos/SeccionGrupos'

const initialState=
{
  user:{
    id:"",
    nombre:"",
    apellido:"",
    password:"",
    correo:"",
    token:'',
  },
  route:'signin',
  form: {
    id: "",
    nombre: "",
    horas: "",
    unidad:""
  },
  grupo:{
    idGrupo: "",
    idCurso: "",
    nombreGrupo: ""
  },
  cursos:[],
  grupos:[]
}

class App extends React.Component{
  constructor(){
    super()
    this.state=initialState
  }

  loadUser=(data)=>{
      this.setState({
        user:{
        id:data.id,
        nombre:data.nombre,
        apellido: data.apellido,
        correo:data.correo,
        token:data.token
      }})
  }
  loadCurso=(data)=>{
    this.setState({
      form:{
      id:data._id,
      nombre:data.nombre,
      horas: data.horas,
      unidad: data.unidades,
    }})
  }
  loadGrupo=(data)=>{
    this.setState({
      grupo:{
        idGrupo: data._id,
        idCurso:data.idCurso._id,
        nombreGrupo: data.nombreGrupo
      }
    })
  }

  loadListaCurso=(data)=>{
    this.setState({
      cursos:data})

  }
  loadListaGrupo=data=>{
    this.setState({
      grupos:data
    })
  }

  onRouteChange = (route) =>{
    if(route==='signout'){
      localStorage.removeItem('token')
      this.setState(initialState)
    }else{
      this.setState({route:route});
    }
  }

  

  componentDidMount(){
    if(localStorage.getItem('token')){
      const user=localStorage.getItem('token')
      console.log(JSON.parse(user));
      this.loadUser(JSON.parse(user))
      this.setState({route:'Menu'})
     
    }

    
      
              
  

  }

  render(){
    const {route,user,cursos,grupos}=this.state
  
    
    return (
      <>
          {
            route==='homepage'?<Homepage onRouteChange={this.onRouteChange  } usuario={user}/>
            :route==='signin'?<Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
            :(route==='register'? <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
            :route==="TablaCursoGrupos"?  <div><Menu nombreUsuario={this.state.user.nombre} onRouteChange={this.onRouteChange} loadListaGrupo={this.loadListaGrupo} loadListaCurso={this.loadListaCurso} usuario={user} ></Menu>   <TablaCursoGrupos loadListaCurso={this.loadListaCurso} usuario={user} listaCursos={cursos} loadCurso={this.loadCurso} onRouteChange={this.onRouteChange}></TablaCursoGrupos>  </div>  
            :route==="SeccionGrupos"?  <div><Menu nombreUsuario={this.state.user.nombre} onRouteChange={this.onRouteChange} loadListaGrupo={this.loadListaGrupo} loadListaCurso={this.loadListaCurso} usuario={user} ></Menu>   <SeccionGrupos grupos={grupos}></SeccionGrupos>  </div>
            :route==="Menu"?           <div>  <Menu nombreUsuario={this.state.user.nombre} onRouteChange={this.onRouteChange} loadListaCurso={this.loadListaCurso} loadListaGrupo={this.loadListaGrupo} usuario={user}></Menu> </div>
            :route==="TablaGrupos"?       <div><Menu nombreUsuario={this.state.user.nombre} onRouteChange={this.onRouteChange}  loadListaCurso={this.loadListaCurso} loadListaGrupo={this.loadListaGrupo}  usuario={user} ></Menu>   <TablaGrupos  loadListaGrupo={this.loadListaGrupo} loadListaCurso={this.loadListaCurso} usuario={user}  listaGrupos={grupos} loadCurso={this.loadCurso} loadGrupo={this.loadGrupo}onRouteChange={this.onRouteChange}></TablaGrupos>  </div>
            :route==="FormGrupo"?         <div><Menu nombreUsuario={this.state.user.nombre} onRouteChange={this.onRouteChange} loadListaCurso={this.loadListaCurso} loadListaGrupo={this.loadListaGrupo} usuario={user}></Menu> <FormGrupo usuario={user} onRouteChange={this.onRouteChange} listaCursos={cursos}></FormGrupo></div>
            :route==="FormGrupoEditar"?   <div> <Menu nombreUsuario={this.state.user.nombre} onRouteChange={this.onRouteChange} loadListaCurso={this.loadListaCurso} loadListaGrupo={this.loadListaGrupo} usuario={user}></Menu>  <FormGrupoEditar  usuario={user}  listaCursos={cursos} onRouteChange={this.onRouteChange} loadListaCurso={this.loadListaCurso} grupo={this.state.grupo} ></FormGrupoEditar></div>
            :route==="FormCurso"?         <div><Menu nombreUsuario={this.state.user.nombre} onRouteChange={this.onRouteChange} loadListaCurso={this.loadListaCurso} loadListaGrupo={this.loadListaGrupo} usuario={user}></Menu> <FormCurso usuario={user} onRouteChange={this.onRouteChange} listaCursos={cursos} loadListaCurso={this.loadListaCurso}></FormCurso></div>
            :route==="FormCursoEditar"?   <div> <Menu nombreUsuario={this.state.user.nombre} onRouteChange={this.onRouteChange} loadListaCurso={this.loadListaCurso} loadListaGrupo={this.loadListaGrupo} usuario={user}></Menu>  <FormCursoEditar  usuario={user}  listaCursos={cursos} onRouteChange={this.onRouteChange} loadListaCurso={this.loadListaCurso} curso={this.state.form} ></FormCursoEditar></div>:
              <></>
            ) 
          }
      </>
    );
  }
}

export default App;