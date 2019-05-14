import React, { Component } from 'react';
import AuthService from './auth-service';
//import UploadFileService from '../services/uploadFile'
import { Link } from 'react-router-dom';

class EditAuth extends Component {
  constructor(props){
    super(props);
    this.state = { username: '', campus: '', course: '' };
    this.service = new AuthService();
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const {username, campus, course} = this.state
    this.service.edit(username, campus, course /*, formData*/)
    .then( response => {
        this.setState({
            username: "", 
            campus: "",
            course: "",
        });
         //this.props.getUser(response)
    })
    .catch( error => console.log(error) )
  }

  handleFileSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("photo", this.state.selectedFile)
    console.log('DEBUG formData', formData.get("photo"));
    this.service.upload(formData)
    .then(res => res.data)
    .catch(err=> err);
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  handleChange2 = (event) => {  
    const {name, value} = event.target;
    console.log(event.target.name)
    this.setState({[name]: value});
  }

  handleFileChange = (e) => {
    console.log('handleChange');
    let eventFile = e.target.files[0];
    console.log('DEBUG e.target.files[0]', eventFile);
    
    this.setState({selectedFile: eventFile})
    setTimeout(()=>{console.log(this.state.selectedFile)}, 1000)
  }

  render(){
    return(
    <div>
      <form onSubmit={this.handleFormSubmit}> 
        <label>Username:</label>
        <input type="text" name="username" value={this.state.username} onChange={ e => this.handleChange(e)}/>
        
        <label> Campus </label> 
        <select name="campus" onChange={ e => this.handleChange2(e)}>
          <option value=""></option>
          <option value="Madrid">Madrid</option>
          <option value="Barcelona">Barcelona</option>
          <option value="Miami">Miami</option>
          <option value="Paris">Paris</option>
          <option value="Berlin">Berlin</option>
          <option value="Amsterdam">Amsterdam</option>
          <option value="México">México</option>
          <option value="Sao Paulo">Sao Paulo</option>
        </select> <br /> 

        <label> Course </label> 
        <select name="course" onChange={ e => this.handleChange2(e)} >
          <option value=""></option>
          <option value="WebDev">WebDev</option>
          <option value="UX/UI">UX/UI</option>
          <option value="Data Analytics">Data Analytics</option>
        </select> <br />
        
        <input type="submit" value="Submit changes!" />
      </form>

      <form onSubmit={this.handleFileSubmit}>
        
        <label>Upload an Image:</label>
        <input type="file" onChange={(e)=>this.handleFileChange(e)} /> <br/>

        <input type="submit" value="Upload!" />
      </form>

      <p>Already have account? 
          <Link to={"/"}> Login</Link>
      </p>

    </div>
    )
  }
}

export default EditAuth;