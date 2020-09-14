import React, { Component } from 'react'

export default class App extends Component {

    constructor(props) {
      super(props)
          this.state = {
            items: [],
            _id: "",
              email: "", 
              name: "",
              address: {
                gata: "",
                postnummer: "",
                ort: ""
          }
      }
  }

  componentDidMount = () => {
    fetch("http://localhost:3000/students/")
        .then(res => res.json())
        .then(result => {
        this.setState({
            items: result
        });
    });
}

refresh= (id) => {
  let studentsarray = this.state.items;
  let newStudentarray = studentsarray.filter(student => student._id !== id)
  this.setState({
    items: newStudentarray
  })
}

deleteById = (id) => {
  fetch('http://localhost:3000/students/' + id, {
    method: 'delete',
    headers: {'Content-Type':'application/json'},
  }).then(() => {
    this.refresh(id);
  })
}

    changeHandler = e => {
      this.setState({[e.target.name]: e.target.value})
  }

    submitHandler = e => {
      e.preventDefault();

      const student = {
        _id: this.state._id,
        email: this.state.email,
        name: this.state.name,
          address: {
            gata: this.state.address.gata,
            postnummer: this.state.address.postnummer,
            ort: this.state.address.ort
          }
        }
      
      fetch('http://localhost:3000/students', {
          method: 'post',
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify(student)
      }).then((res) => {
        this.setState(prevState => ({
          items: [...prevState.items, student]
        }))
      });
      }

    render() {
      const {items} = this.state;
        // const { email, name, gata, postnummer, ort} = this.state
        return ( 
        <div>
              <h2>List of students</h2>
                      <ul> 
                      {items.map(student=> 
                              <li key={student.id}>
                                  <p>{student._id}</p>
                                  <p>{student.email}</p>
                                  <p>{student.name}</p>
                                  <p> {student.address && student.address.gata}</p>
                                  <p> {student.address && student.address.postnummer}</p>
                                  <p> {student.address && student.ort}</p>
                                  <button onClick={() => this.deleteById(student._id)}>Delete student</button>
                              </li>
                          )}
                      </ul>
      
            <form onSubmit={this.submitHandler}>
              <label>
                Namn:
                <input type="text" 
                      name="name"
                      value={this.state.name}
                      onChange={this.changeHandler}>
                </input>
              </label>

              <label>
                E-mail:
                <input type="text" 
                      name="email" 
                      value={this.state.email} 
                      onChange={this.changeHandler}>
                </input>
              </label>

              <label>
                <p>Adress</p>
                Gata:
                  <input type="text" 
                      name="gata" 
                      value={this.state.gata}
                      onChange={this.changeHandler}/>
              </label>

              <label>
                Postnummer:
                  <input type="text" 
                    name="postnummer" 
                    value={this.state.postnummer}
                    onChange={this.changeHandler}/>
              </label>

            <label>
              Ort:
              <input type="text" 
                    name="ort" 
                    value={this.state.ort}
                    onChange={this.changeHandler}/>
            </label>
  
            <button type='submit'>
                Add a new user
            </button> 
            </form>
        </div>
        );
    }
}

