import { Delete, Add } from "@mui/icons-material";
import { Card, CardContent, CardMedia, Typography, IconButton, Button, Grid, CircularProgress } from "@mui/material";
import useDeleteBook from '../../hooks/useDeleteBook';
import { useRef,useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import useUpdateBook from "../../hooks/useUpdateBook";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";


const EditButton = ({book,books,setBooks}) => {

    const [newBook,setNewBook] = useState(book);
    const {loading,updateBook} = useUpdateBook();
    const [open,setOpen] = useState(false);
    const handleChange = (e)=>{
      setNewBook({...newBook, [e.target.name] : e.target.value})
    }
    const handleDialogOpen = () => setOpen(true);
    const handleDialogClose = () => setOpen(false);
    const handleUpdate = ()=>{
      updateBook({books,setBooks,book_id:book._id,newBook})
    }

    return (
        <>
            <IconButton
                sx={{ position: "absolute", bottom: 10, right: 10, color: "primary" }}
                onClick={handleDialogOpen}
            >
                <EditIcon />
            </IconButton>
            <Dialog open={open} onClose={handleDialogClose}>
    <DialogTitle>Edit Book</DialogTitle>
    <DialogContent>
        <TextField fullWidth margin="dense" label="Title" name="title" value={newBook.title} onChange={handleChange} />
        <TextField fullWidth margin="dense" label="Author" name="author" value={newBook.author} onChange={handleChange} />
        <TextField fullWidth margin="dense" label="Genre" name="genre" value={newBook.genre} onChange={handleChange} />
    </DialogContent>
    <DialogActions>
        <Button onClick={handleDialogClose} color="secondary">Cancel</Button>
        <Button onClick={handleUpdate} disabled={loading} color="primary" variant="contained">{loading ? <CircularProgress size={20} color="primary" /> : <span>Update</span>}</Button>
    </DialogActions>
</Dialog>
        </>
    )

}

const Book = ({ books, setBooks }) => {

    const { deleteBook, loading } = useDeleteBook();
    const delId = useRef();
    const handleDelete = (e, delbook) => {
        delId.current = delbook._id
        e.preventDefault();
        deleteBook({ book_id: delbook._id, books, setBooks })

    }



    return (
        <Grid container spacing={3}>
            {books.map((book) => (
                <Grid item xs={12} sm={6} md={4} key={book.id}>
                    <Card sx={{ maxWidth: 345, position: "relative" }}>


                        <CardContent>

                            <Typography variant="h6" gutterBottom>
                                {book.title}
                            </Typography>

                            <Typography variant="body2" color="text.secondary">
                                {book.author}
                            </Typography>

                            <Typography variant="body2" color="text.secondary">
                                {book.genre}
                            </Typography>
                        </CardContent>


                        <IconButton
                            sx={{ position: "absolute", top: 10, right: 10, color: "red" }}
                            onClick={(e) => { handleDelete(e, book) }}
                        >
                            {loading && book._id === delId.current ? <CircularProgress size={25} color="secondary" /> : <Delete />}
                        </IconButton>
                        <EditButton books={books} setBooks={setBooks} book={book} />
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default Book;