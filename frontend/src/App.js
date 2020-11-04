import React from 'react'

import './App.css';
import Signin from './pages/Sign-in/sing-in.component';
import Register from './pages/Register/register.component';
import Homepage from './pages/HomePage/homepage.component';

const initialState={
  user:{
    id:"",
    nombre:"",
    apellido:"",
    password:"",
    correo:"",
    token:''
  },
  route:'signin'
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
          :
          route==='signin'
          ?
          <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
          :(
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