import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import useAddBook from "../../hooks/useAddBook"
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions,Button } from "@mui/material";
import { Add } from "@mui/icons-material";

const AddBook = ({books,setBooks}) => {

    const { addBook, loading, book } = useAddBook();

    const [open, setOpen] = useState(false);
    const [newBook, setNewBook] = useState({ title: "", author: "", genre: "" });

    const handleChange = (e) => {
        setNewBook({ ...newBook, [e.target.name]: e.target.value });
    };

   
    const handleAddBook = async () => {
        if (newBook.title && newBook.author && newBook.genre) {
            await addBook(newBook);
           
            setNewBook({ title: "", author: "", genre: "" });
            handleDialogClose();
        }
    };

    const handleDialogOpen = () => setOpen(true);
    const handleDialogClose = () => setOpen(false);


    useEffect(()=>{
        if(Object.keys(book).length !== 0){
      setBooks([...books,book]);
        }
    },[book])

    return (<>
    <Button variant="contained" color="primary" startIcon={<Add />} onClick={handleDialogOpen} sx={{ mb: 2 }}>
    Add Book
</Button>
<Dialog open={open} onClose={handleDialogClose}>
    <DialogTitle>Add a New Book</DialogTitle>
    <DialogContent>
        <TextField fullWidth margin="dense" label="Title" name="title" value={newBook.title} onChange={handleChange} />
        <TextField fullWidth margin="dense" label="Author" name="author" value={newBook.author} onChange={handleChange} />
        <TextField fullWidth margin="dense" label="Genre" name="genre" value={newBook.genre} onChange={handleChange} />
    </DialogContent>
    <DialogActions>
        <Button onClick={handleDialogClose} color="secondary">Cancel</Button>
        <Button onClick={handleAddBook} disabled={loading} color="primary" variant="contained">{loading ? <CircularProgress size={20} color="secondary" /> : <span>Add</span>}</Button>
    </DialogActions>
</Dialog></>)

}

export default AddBook;