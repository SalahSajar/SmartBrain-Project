import React from 'react';
import './Register.css'

class Register extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            email:'',
            name: '',
            password:''
        }
    }
    onNameChange = (event) =>{
        this.setState({
            name: event.target.value
        })
    }
    onEmailChange = (event) =>{
        this.setState({
            email: event.target.value
        })
    }
    onPasswordChange = (event) =>{
        this.setState({
            password: event.target.value
        })
    }
    onSubmitRegister = () => {
        fetch('http://localhost:3001/register' , {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                name: this.state.name,
                password: this.state.password
            })
        })
        .then(response => response.json())
        .then(user => {
            if(user){
                this.props.loadUser(user)
                this.props.onRouteChange('home')
            }
        })
    }
    render(){
        const { onRouteChange} = this.props;
        return(
            <div className='Register_Container'>
                <div className='Inner_RegisterForm'>
                    <h1>Register</h1>
                    <div className='register_Form'>
                        <div>
                            <label>Username</label>
                            <input onChange={this.onNameChange} type='text' placeholder='Username'/>
                        </div>
                        <div>
                            <label>Email</label>
                            <input onChange={this.onEmailChange} type='email' placeholder='Email'/>
                        </div>
                        <div>
                            <label>Password</label>
                            <input onChange={this.onPasswordChange} type='password' placeholder='Password'/>
                        </div>
                        <button onClick={this.onSubmitRegister}>Register</button>
                    </div>
                    <span onClick={() => onRouteChange('signin')}> Sign In </span>
                </div>
            </div> 
        )
    }
    
    
}

export default Register;
