import { useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import './App.css'

function App() {
  const [list, setList] = useState([]);
  const [completedList, setCompletedList] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false); // Step 1

  const initialValues = {
    title: "",
    description: "",
    completed: false,
    status:"pending"
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('title is required'),
    description: Yup.string().required('description is required'),
  });

  const completeTask = (index) => {
    const completedTask = list[index];
    completedTask.completed = true;
    setCompletedList([...completedList, completedTask]);
    remove(index);
  };
  const removeCompleteTask = (index) => {
    completedList.splice(index, 1);
    setCompletedList([...completedList])
  };
  const task = (index) => {
    const a = completedList[index];
    a.completed = false;
    setList([...list, a]);
    removeCompleteTask(index);
  };
  const onSubmit = (values) => {
    console.log(values);
    const newTask = { ...values, completed: false};
    setList([...list, newTask]);
    console.log(list);
    setFormSubmitted(true);
  };

  const remove = (index) => {
    list.splice(index, 1);
    setList([...list])
  }
 
  

  const resetForm = () => {
    setFormSubmitted(false);
  };

  return (
    <>
      <div className='container'>
        <div className='pt1'>
          <h1>To Do</h1>
          <div>
            <Formik
              initialValues={formSubmitted ? {} : initialValues} // Step 3
              validationSchema={validationSchema}
              onSubmit={(values, { resetForm }) => {
                onSubmit(values);
                resetForm();
              }}
            >
              <Form className="form" >
                <>
                  <div className="formControl">
                    <p>Title</p>
                    <Field
                      type="text"
                      name="title"
                      className="formInputText input"
                    />
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="errorMessage" />
                  </div>

                  <div className="formControl">
                    <p>Description</p>
                    <Field
                      type="text"
                      name="description"
                      className="formInputDescription input"
                      as="textarea"
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="errorMessage"
                    />
                  </div>

                  <div className='btn'>
                    <button type="submit" className='btnAdd'>Add Task</button>
                  </div>
                </>
              </Form>
            </Formik>
          </div>
        </div>

        <div className='pt2'>
          <div className='tasks'>
            {list.length !== 0 ? (
              list.map((item, index) => (
                <div key={index} className='task'>
                  <p><b>Title: </b>{item.title}</p>
                  <p><b>Description:</b> {item.description}</p>
                  <p className='pending'> Pending</p>
                  <div className='btn'>
                    <button className='btnRemove' onClick={() => { remove(index) }}>Remove</button>
                      <button className='btnComplete' onClick={() => { completeTask(index) }}>Complete</button>
                  </div>
                </div>
              ))
            ) : (
              <p className='noItems'>No items in the doing list.</p>
            )}
          </div>
          <div className='tasks'>
            {completedList.length !== 0 ? (
              completedList.map((item, index) => (
                <div key={index} className='task'>
                  <p><b>Title: </b>{item.title}</p>
                  <p><b>Description:</b> {item.description}</p>
                  <p className='complete'>Complete</p>
                  <div className='btn'>
                    <button className='btnRemove' onClick={() => { removeCompleteTask(index) }}>Remove</button>
                    <button className='btnPending' onClick={() => { task(index) }}>Pending</button>
                  </div>
                </div>
              ))
            ) : (
              <p className='noItems'>No items in the completed list.</p>
            )}
          </div>
        </div>

      </div>
    </>
  )
}

export default App
