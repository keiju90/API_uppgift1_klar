import React, { Component } from 'react';

class StudentsComponent extends Component {

constructor(props) {
    super(props)
        this.state = {
        items: null,
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


refreshTable = (id) => {
    let studentsArr = this.state.items;
    let newStudentArr = studentsArr.filter(student => student._id !== id)
    this.setState({
      students: newStudentArr
    })
  }

  deleteById = (id) => {
    fetch('http://localhost:3000/students/' + id, {
      method: 'delete',
      headers: {'Content-Type':'application/json'},
    }).then(() => {
      this.refreshTable(id);
    })
  }


render() {

    // const deleteById = (id) => {
    //     fetch('http://localhost:3000/students/' + id ,
    //     { method: 'delete',
    //     headers: {'Content-Type':'application/json'},
    //   }).then(() => {
    //     this.refreshTable(id);
    //   })
    // }
    // const student = {
    //     email: this.state.email,
    //     name: this.state.name,
    //       address: {
    //         gata: this.state.address.gata,
    //         postnummer: this.state.address.postnummer,
    //         ort: this.state.address.ort
    //       }
    //     }

    const { items } = this.state;
    return (
        <div>
                <h2>List of students</h2>
                    <ul> 
                        {items.map(item => (
                            <li key={item.id}>
                                <p>{item._id}</p>
                                <p>{item.email}</p>
                                <p>{item.name}</p>
                                <p> {item.address && item.address.gata}</p>
                                <p> {item.address && item.address.postnummer}</p>
                                <p> {item.address && item.address.ort}</p>

                                <button onClick={() => this.deleteById(item._id)}>Delete student</button>
                            </li>
                        ))}
                    </ul>
        </div>

    );
}
}

export default StudentsComponent;