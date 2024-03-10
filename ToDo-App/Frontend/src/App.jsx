import { Alert, Backdrop, Box, Button, CircularProgress, Grid, Snackbar, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const App = () => {

  const [todos, setTodos] = useState([]);
  const [fetch, setFetch] = useState(true);
  const [loader, setLoderOpen] = React.useState(false);
  const [alert, setAlertOpen] = React.useState({ open: false, vertical: 'top', horizontal: 'center', });
  const [alertType, setAlertType] = React.useState();
  const [alertMsg, setAlertMsg] = React.useState();
  const { vertical, horizontal, open } = alert;
  const [inputValue, setInputValue] = useState('');


  // UseEffect
  useEffect(() => {

    if (fetch) {
      axios.get('https://blushing-bass-train.cyclic.app/todos')
        .then((res) => {
          setTodos(res.data.todos);

          console.log(res.data.todos);
          setFetch(false);
        })
        .catch((err) => {
          console.log(err);
        })
    }

  }, [fetch])


  // BackDrop Open & CLose Function
  const loaderShow = () => {
    setLoderOpen(true);
  };
  const loaderClose = () => {
    setLoderOpen(false);
  };

  // Alert Show & Close Function
  const alertShow = (newState) => {
    setAlertOpen({ ...newState, open: true });
  };
  const alertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen({ ...alert, open: false });
  };


  // Todo Add Function
  const addTodo = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    // Todo Add in DB
    await axios.post('https://blushing-bass-train.cyclic.app/todos/add', { todo: data.get('todo') })
      .then((res) => {
        setInputValue('');

        loaderShow();
        setFetch(true);
        loaderClose();

        setAlertType('success');
        setAlertMsg(res.data.message);
        alertShow({ vertical: 'top', horizontal: 'right' });
      })
      .catch((err) => {
        setAlertType('error');
        setAlertMsg(err.message);
        alertShow({ vertical: 'top', horizontal: 'right' });
      })

  }

  // Edit Todo Function
  const editTodo = async (id) => {
    console.log(id);

    await axios.put(`https://blushing-bass-train.cyclic.app/todos/${id}`, { todo: prompt("Enter Edited Value") })
      .then((res) => {
        loaderShow();
        setFetch(true);
        loaderClose();

        setAlertType('success');
        setAlertMsg(res.data.message);
        alertShow({ vertical: 'top', horizontal: 'right' });
      })
      .catch((err) => {
        setAlertType('error');
        setAlertMsg(err.message);
        alertShow({ vertical: 'top', horizontal: 'right' });
      })


  }

  // Delete Todo Function
  const deleteTodo = async (id) => {
    console.log(id);
    axios.delete(`https://blushing-bass-train.cyclic.app/todos/${id}`)
      .then((res) => {
        loaderShow();
        setFetch(true);
        loaderClose();

        setAlertType('success');
        setAlertMsg(res.data.message);
        alertShow({ vertical: 'top', horizontal: 'right' });
      })
      .catch((err) => {
        setAlertType('error');
        setAlertMsg(err.message);
        alertShow({ vertical: 'top', horizontal: 'right' });
      })
  }



  return (
    <>
      <Box>

        <Typography variant='h3' sx={{ marginY: '30px', textAlign: 'center' }}> Todo App </Typography>

        {/* Todo Form */}
        <Box component="form" onSubmit={addTodo}>
          <Grid sx={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <TextField sx={{ width: '25%' }} value={inputValue} onChange={(e) => setInputValue(e.target.value)} name='todo' label="Enter Todo" variant="outlined" size="small" />
            <Button type='submit' variant="contained" size="small" > Add Todo</Button>
          </Grid>
        </Box>

        {/* Todo List */}
        <Box sx={{ marginY: '30px', display: 'flex', justifyContent: 'center' }}>
          <Box>
            {todos.length > 0 ?
              todos.map((todo, i) => {

                return <li key={i} style={{ width: '400px', padding: '10px', display: 'flex', justifyContent: 'space-between', border: '1px solid #e7e3e3', backgroundColor: '#f3f3f3' }}>
                  <Box>
                    <Typography> {todo.todo} </Typography>
                  </Box>

                  <Box>
                    <EditIcon sx={{ cursor: 'pointer' }} onClick={() => editTodo(todo._id)} />
                    &nbsp; &nbsp;
                    <DeleteIcon sx={{ cursor: 'pointer' }} onClick={() => deleteTodo(todo._id)} />
                  </Box>
                </li>
              })
              : <Typography> - </Typography>}
          </Box>
        </Box>


        {/* Backdrop */}
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loader}  >
          <CircularProgress color="inherit" />
        </Backdrop>

        {/* Alert */}
        <Snackbar open={open} autoHideDuration={2000} onClose={alertClose} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal} >
          <Alert severity={alertType} variant="filled" sx={{ width: '100%' }} > {alertMsg} </Alert>
        </Snackbar>

      </Box>
    </>
  )
}

export default App