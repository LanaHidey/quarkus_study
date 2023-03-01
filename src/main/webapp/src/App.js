
import React, {Component} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import axios from "axios";

class App extends Component {
  state = {
    students: []
  }

  componentDidMount() {
    fetch('/students')
        .then(res => res.json())
        .then((data) => {
          this.setState({ students: data })
        })
        .catch(console.log)
  }



  render () {
      const style = {
          outline : '1px solid'
      }
      const HeaderStyle = {
          outline : '1px solid',
          background : '#F7CAC9',
          fontWeight: 'bold'
      }
      let data = [];


      data.push(<Row >
            <Col style={HeaderStyle}>
                № зачетки
            </Col>
            <Col style={HeaderStyle}>
                Имя
            </Col>
            <Col style={HeaderStyle}>
                Фамилия
            </Col>
            <Col style={HeaderStyle}>
                Отчество
            </Col>
            <Col style={HeaderStyle}>
                Группа
            </Col>
            <Col style={HeaderStyle}>
                Факультет
            </Col>
            <Col style={HeaderStyle}>
                Курс
            </Col>
        </Row>);
      this.state.students.forEach(value => {
          data.push(<Row>
              <Col style={style}>
                  {value.studentCardNumber}
              </Col>
              <Col style={style}>
                  {value.firstName}
              </Col>
              <Col style={style}>
                  {value.lastName}
              </Col>
              <Col style={style}>
                  {value.surname}
              </Col>
              <Col style={style}>
                  {value.groupId}
              </Col>
             <Col style={style}>
                 {value.faculty}
             </Col>
             <Col style={style}>
                 {value.course}
             </Col>
          </Row>)
      })

      const add = e => {
          const form = e.currentTarget;
          if (form.checkValidity() === false) {
              e.preventDefault();
              e.stopPropagation();
          } else {
              e.preventDefault()
              const formData = new FormData(e.target),
                  formDataObj = Object.fromEntries(formData.entries())

              axios.post('/students', formDataObj)
                  .then(function (response) {
                      console.log(response);
                      window.location.reload();
                      alert('Запись добавлена!')
                  })
                  .catch(function (error) {
                      console.log(error);
                  });
              console.log(formDataObj)
          }
      }
    return (
        <div>
            <Form onSubmit={add}>
                <Form.Label>№ зачетки</Form.Label>
                <Form.Control type="text" name="studentCardNumber" required />
                <Form.Label>Имя</Form.Label>
                <Form.Control type="text" name="firstName" required />
                <Form.Label>Фамилия</Form.Label>
                <Form.Control type="text" name="lastName" required />
                <Form.Label>Отчество</Form.Label>
                <Form.Control type="text" name="surname" required />
                <Form.Label>Группа</Form.Label>
                <Form.Control type="text" name="groupId" required />
                <Form.Label>Факультет</Form.Label>
                <Form.Control type="text" name="faculty" required />
                <Form.Label>Курс</Form.Label>
                <Form.Control type="text" name="course" required />
                <Button variant="primary" type="submit">
                    Добавить
                </Button>
            </Form>
            <Container fluid='md'>
                {data}
            </Container>
        </div>
    );
  }
}

export default App;