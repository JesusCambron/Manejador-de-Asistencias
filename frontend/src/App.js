import React from 'react'

import './App.css';
import Signin from './pages/Sign-in/sing-in.component';
import Register from './pages/Register/register.component';
import Homepage from './pages/HomePage/homepage.component';
import TablaCursoGrupos from './pages/TablaCursosGrupos/TablaCursoGrupos';
import Menu from './pages/Menu/Menu';
import FormCurso from './pages/FormCurso/FormCurso';
import FormCursoEditar from './pages/FormCursoEditar/FormCursoEditar';

console.log("Niaaaa")
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
  }
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
      id:data.id,
      nombre:data.nombre,
      horas: data.horas,
      unidad:data.unidad,
    }})
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
          route==='homepage'?<Homepage usuario={this.state.user}/>
          :route==='signin'?<Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
          :route==="TablaCursoGrupos"?<TablaCursoGrupos loadCurso={this.loadCurso} onRouteChange={this.onRouteChange}></TablaCursoGrupos>
          :route==="Menu"?<Menu onRouteChange={this.onRouteChange} ></Menu>
          :route==="FormCurso"?<FormCurso onRouteChange={this.onRouteChange}></FormCurso>
          :route==="FormCursoEditar"?<FormCursoEditar  onRouteChange={this.onRouteChange} curso={this.state.form} ></FormCursoEditar>:
          (
            route==='register'?
            <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>:
            <></>
          )
          }
      </>
    );
  }
}

export default App;