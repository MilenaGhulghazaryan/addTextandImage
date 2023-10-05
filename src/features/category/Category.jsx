import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { GetCategories, addValue } from "./CategorySlice";
import { GetGenders } from "./GenderSlice";
import { useSearchParams } from "react-router-dom";
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import ImageUpload from "./ImageUploading";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Category = () => {
    const dispatch = useDispatch()
    const category = useSelector(state => state.category.category)
    const genders = useSelector(state => state.genders.genders)
    const values = useSelector(state => state.category.values)
    const changeGender = ""
    useEffect(() => {
        dispatch(GetCategories())
        dispatch(GetGenders())
    }, [])
    const [searchParams, setSearchParams] = useSearchParams()
    const genderQuery = +searchParams.get('gender')
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [value, setValue] = useState('')

    return (
        <div >
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {
                    genders.map(({ id, title }) => {
                        return (
                            <Stack direction="row" spacing={2}>
                                <Button variant="contained" size="small" onClick={() => {
                                    setSearchParams({
                                        gender: id
                                    })
                                }}>
                                    {title}
                                </Button>
                            </Stack>
                        )
                    })
                }
                <Button variant="contained" size="small" style={{ background: 'red' }} onClick={handleOpen}>+</Button>

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Text in a modal
                        </Typography>
                        <input type="text" value={value} onChange={(e) => {
                            setValue(e.target.value)
                        }} />
                        <ImageUpload />
                        <button onClick={() => {
                            handleClose()
                            dispatch(addValue(value))
                            setValue('')
                        }}>Add</button>
                    </Box>
                </Modal>
            </div>

            <div>
                {
                    category?.map(({ id, title, parentId, element }) => {
                        if (parentId === genderQuery) {
                            return (
                                <div key={id}>
                                    {title}
                                    {/* {element} */}
                                </div>
                            )
                        }
                    })
                }
                {
                    values.map(({ id, element }) => {
                        return (
                            <div key={id}>
                                {element}
                            </div>
                        )
                    })
                }
            </div>
            <div>
            </div>
        </div>
    )
}
export default Category