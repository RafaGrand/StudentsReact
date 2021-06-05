import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const url="http://localhost:3000/students/";

class App extends Component {

  state={
    data:[],
    modalInsertar: false,
    modalEliminar: false,
    form:{
      id: '',
      complete_name: '',
      document: '',
      age: '',
      gender: '',
      note: '',
      autoevaluation: ''
    }
  }

  modalInsertar=()=>{
    this.setState({modalInsertar: !this.state.modalInsertar});
  }

  seleccionarAlumno=(students)=>{
    this.setState({
      tipoModal: 'actualizar',
      form: {
        id: students.id,
        complete_name: students.complete_name,
        document: students.document,
        age: students.age,
        gender: students.gender,
        note: students.note,
        autoevaluation: students.autoevaluation
      }
    })
  }

  peticionGet=()=>{
    axios.get(url).then(response=>{
      this.setState({data: response.data});
    }).catch(error=>{
      console.log(error.message);
    })
    }

  peticionPost=async()=>{
    delete this.state.form.id;
   await axios.post(url,this.state.form).then(response=>{
      this.modalInsertar();
      this.peticionGet();
    }).catch(error=>{
      console.log(error.message);
    })
  }

  componentDidMount(){
    this.peticionGet();
  }

  handleChange=async e=>{
    e.persist();
    await this.setState({
      form:{
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
    console.log(this.state.form);
    }
    
  render(){
    const {form}=this.state;
  return (
    <div className="App">
    <br />
    <button className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar Alumno</button>
  <br /><br />
  <table className="table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Nombre Completo</th>
        <th>Documento</th>
        <th>Edad</th>
        <th>Genero</th>
        <th>Nota</th>
        <th>Autoevaluación</th>
      </tr>
    </thead>
    <tbody>
      {this.state.data.map(students=>{
          return(
            <tr>
          <td>{students.id}</td>
          <td>{students.complete_name}</td>
          <td>{students.document}</td>
          <td>{students.age}</td>
          <td>{students.gender}</td>
          <td>{students.note}</td>
          <td>{students.autoevaluation}</td>
          <td>
                <button className="btn btn-primary" onClick={()=>{this.seleccionarEmpresa(students); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                {"   "}
                <button className="btn btn-danger" onClick={()=>{this.seleccionarEmpresa(students); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
                </td>
          </tr>
          )
        })}
    </tbody>
  </table>

  <Modal isOpen={this.state.modalInsertar}>
                <ModalHeader style={{display: 'block'}}>
                  <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
                </ModalHeader>
                <ModalBody>
                  <div className="form-group">
                    <label htmlFor="id">ID</label>
                    <input className="form-control" type="text" name="id" id="id" readOnly onChange={this.handleChange} value={form?form.id: this.state.data.length+1}/>
                    <br />
                    <label htmlFor="nombre">Nombre Completo</label>
                    <input className="form-control" type="text" name="complete_name" id="complete_name" onChange={this.handleChange} value={form?form.complete_name: ''}/>
                    <br />
                    <label htmlFor="nombre">Documento</label>
                    <input className="form-control" type="text" name="document" id="document" onChange={this.handleChange} value={form?form.document: ''}/>
                    <br />
                    <label htmlFor="capital_bursatil">Edad</label>
                    <input className="form-control" type="text" name="age" id="age" onChange={this.handleChange} value={form?form.age:''}/>
                  </div>
                </ModalBody>

                <ModalFooter>
                  {this.state.tipoModal=='insertar'?
                    <button className="btn btn-success" onClick={()=>this.peticionPost()}>
                    Insertar
                  </button>: <button className="btn btn-primary" onClick={()=>this.peticionPut()}>
                    Actualizar
                  </button>
  }
                    <button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>
                </ModalFooter>
          </Modal>


          <Modal isOpen={this.state.modalEliminar}>
            <ModalBody>
               Estás seguro que deseas eliminar al alumno {form && form.nombre}
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-danger" onClick={()=>this.peticionDelete()}>Sí</button>
              <button className="btn btn-secundary" onClick={()=>this.setState({modalEliminar: false})}>No</button>
            </ModalFooter>
          </Modal>

    </div>
  );
  }
}

export default App;
