import React from 'react';
import './SignIn.css'

class SignIn extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            SignInEmail:'',
            SignInPassword:''
        }
    }
    onEmailChange = (event) =>{
        this.setState({
            SignInEmail: event.target.value
        })
    }
    onPasswordChange = (event) =>{
        this.setState({
            SignInPassword: event.target.value
        })
    }
    onSubmitSignIn = () => {
        fetch('http://localhost:3001/signin' , {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.SignInEmail,
                password: this.state.SignInPassword
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data === 'success'){
                this.props.onRouteChange('home')
            }
        })
    }
    render(){
        const {onRouteChange} = this.props;
        return(
            <div className='SignIn_Container'>
                <div className='Inner_SignInForm'>
                    <h1>Sign In</h1>
                    <div className='Signin_Form'>
                        <div>
                            <label>Email</label>
                            <input onChange={this.onEmailChange} type='email' placeholder='Email'/>
                        </div>
                        <div>
                            <label>Password</label>
                            <input onChange={this.onPasswordChange} type='password' placeholder='Password'/>
                        </div>
                        <button onClick={this.onSubmitSignIn}>Sign In</button>
                    </div>
                    <span onClick={() => onRouteChange('register')}> Register </span>
                </div>
             </div> 
         )
    }
}

export default SignIn;