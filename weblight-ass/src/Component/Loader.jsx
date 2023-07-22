import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
export default function Loader() {
    return (

        <div className='progess-cont'>
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        </div>

    )
}
