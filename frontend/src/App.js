import React from 'react'

import './App.css';
import Signin from './pages/Sign-in/sing-in.component';
import Register from './pages/Register/register.component';
import Homepage from './pages/HomePage/homepage.component'
import TablaCursoGrupos from './pages/TablaCursosGrupos/TablaCursoGrupos';
import FormCurso from './pages/FormCurso/FormCurso';
import FormCursoEditar from './pages/FormCursoEditar/FormCursoEditar';
import Menu from './pages/Menu/Menu'

const initialState={
  user:{
    id:"",
    nombre:"",
    apellido:"",
    password:"",
    correo:"",
    token:''
  },
  route:'signin',
  form: {
    id: "",
    nombre: "",
    horas: "",
    unidad:""
  },
  cursos:[]
  

  
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

  loadListaCurso=(data)=>{
    this.setState({
      cursos:data})

  }

 
  
  
  
  onRouteChange = (route) =>{
    // if(route==='signout'){
    //   this.setState(initialstate)
    // }else if(route === 'home'){
    //   this.setState({isSignedIn:true})
    // }
    this.setState({route:route});
  }

  render(){
    const {route,user}=this.state
    
    return (
      <>
          {
            route==='homepage'?<Homepage onRouteChange={this.onRouteChange  } usuario={user}/>
            :route==='signin'?<Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
            :(route==='register'? <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
            :route==="TablaCursoGrupos"? <div><Menu onRouteChange={this.onRouteChange}  loadListaCurso={this.loadListaCurso} usuario={user} ></Menu>  <TablaCursoGrupos loadListaCurso={this.loadListaCurso} usuario={user} cursos={this.state.cursos} loadCurso={this.loadCurso} onRouteChange={this.onRouteChange}></TablaCursoGrupos></div>  
            :route==="Menu"?<Menu onRouteChange={this.onRouteChange} loadListaCurso={this.loadListaCurso} usuario={user}></Menu>
            :route==="FormCurso"? <div> <Menu onRouteChange={this.onRouteChange} loadListaCurso={this.loadListaCurso} usuario={user}></Menu> <FormCurso usuario={user} onRouteChange={this.onRouteChange}></FormCurso></div>
            :route==="FormCursoEditar"?<div> <Menu onRouteChange={this.onRouteChange} loadListaCurso={this.loadListaCurso} usuario={user}></Menu>  <FormCursoEditar  usuario={user} onRouteChange={this.onRouteChange} curso={this.state.form} ></FormCursoEditar></div>:
              <></>
          ) 

          
          
          }
      </>
    );
  }
}

export default App;