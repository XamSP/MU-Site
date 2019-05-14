import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../auth/auth-service';

class Navbar extends Component {
  constructor(props){
    super(props);
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({...this.state, loggedInUser: nextProps["userInSession"]});
  }

  logoutUser = () =>{
    this.service.logout()
    .then(() => {
      this.setState({ loggedInUser: null });
      this.props.getUser(null);  
    })
  }

  render(){
    if(this.state.loggedInUser){
      console.log(this.state.loggedInUser)
      return(
        <nav className="nav-style">
          <img src={this.state.loggedInUser.imgPath} style={{width: "120px", height:"150px"}} />
          <ul style={{ textDecoration: 'none' }}>
            <li>Welcome, {this.state.loggedInUser.username} from {this.state.loggedInUser.campus} studying {this.state.loggedInUser.course}</li>
            <li><Link to='/projects' style={{ textDecoration: 'none' }}>Projects</Link></li>
            <li><Link to='/aboutme' style={{ textDecoration: 'none' }}>Projects</Link></li>
            <li><Link to='/edit' style={{ textDecoration: 'none' }}>Edit your profile</Link></li>
            <li>
              <Link to='/'>
                <button onClick={() => this.logoutUser()}>Logout</button>
              </Link>
            </li>
            {/* <li>
              <Link to='/'>
                <button onClick={() => this.logoutUser()}>Logout</button>
              </Link>
            </li> */}
          </ul>
        </nav>
      )
    } else {
      return ( 
        <nav className="nav-style">
          <ul style={{ textDecoration: 'none' }}>
            <li><Link to='/' style={{ textDecoration: 'none' }}>Login</Link></li>
            <li><Link to='/signup' style={{ textDecoration: 'none' }}>Signup</Link></li>
          </ul>
        </nav>
      )
    }
  }
}

export default Navbar;