import React from 'react';
import Navigation from './Navigation';
import ImageLinkForm from './ImageLinkForm';
import FaceDetection from './FaceDetection.js';
import SignIn from './SignIn';
import Register from './Register.js'
import Clarifai from 'clarifai';
import './App.css';

const app = new Clarifai.App({
  apiKey: '16ed23f2081945908afcfe814c2437f9'
 });

class App extends React.Component{
  constructor(){
    super();
    this.state ={
      input: '',
      imageURL: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user:{
          id:'',
          name:'',
          email:'',
          entries:0
      }
    }
  }

  loadUser = (data)=>{
    this.setState({user:{
        id:data.id,
        name:data.name,
        email:data.email,
        entries:data.entries
      }
    })
    console.log('to Test Some Stuff')
  }

  calculateFaceLocation = (data) =>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const imageElement = document.querySelector('.Img_Container img');
    const imageHeight = Number(imageElement.height);
    const imageWidth = Number(imageElement.width)

    return{
      leftCol: clarifaiFace.left_col * imageWidth,
      topRow: clarifaiFace.top_row * imageHeight,
      rightCol: imageWidth - (clarifaiFace.right_col * imageWidth),
      bottomRow: imageHeight - (clarifaiFace.bottom_row * imageHeight)
    }
  }

  displayFaceBox = (box) =>{
    this.setState({box: box})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }
  onPictureSubmit = () => {
    this.setState({imageURL: this.state.input})
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response =>  this.displayFaceBox(this.calculateFaceLocation(response))
    .catch(err => console.error(err))
    );
  }
  
  onRouteChange = (route) =>{
    if(route === 'signin' || route === 'register'){
      this.setState({isSignedIn:false})
    } else if(route === 'home'){
      this.setState({isSignedIn:true})  
    }
    this.setState({route: route})
  }

  render(){
    const {imageURL,box,route,isSignedIn} = this.state;
    return (
      <div className="App">
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>

        {route === 'home'
        ? <div>
            <ImageLinkForm onInputChange={this.onInputChange} onPictureSubmit={this.onPictureSubmit} />
            <FaceDetection box={box} imageURL={imageURL}/>
          </div> 
        : (route === 'signin'
            ?<SignIn onRouteChange={this.onRouteChange} />
            :<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          )
        }
        </div>
    );
  }
}
  


export default App;
