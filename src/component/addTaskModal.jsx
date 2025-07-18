import React, { useState, useEffect } from 'react';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default function AddTaskModal({
  open,
  handleClose,
  handleAddTask,
  handleEditTask,
  mode = 'add',
  initialTask = {},
}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (mode === 'edit' && initialTask) {
      setTitle(initialTask.title || '');
      setDescription(initialTask.description || '');
    } else {
      setTitle('');
      setDescription('');
    }
  }, [mode, initialTask, open]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (mode === 'edit') {
      handleEditTask({ ...initialTask, title, description });
    } else {
      handleAddTask({ title, description });
    }
    setTitle('');
    setDescription('');
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" component="h2" gutterBottom>
          {mode === 'edit' ? 'Edit Task' : 'Add New Task'}
        </Typography>
        <form onSubmit={onSubmit}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            {mode === 'edit' ? 'Update Task' : 'Add Task'}
          </Button>
        </form>
      </Box>
    </Modal>
  );
}
