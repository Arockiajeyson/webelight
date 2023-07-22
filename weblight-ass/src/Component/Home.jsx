import React, { useEffect } from 'react'
import { actionss, thunk } from '../Store/Slice.js'
import { useDispatch, useSelector } from 'react-redux'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Loader from './Loader.jsx';
export default function Home() {
    const dispatch = useDispatch()
    const user = useSelector(x => x.counter)
    useEffect(() => {
        console.log(user.count)
        dispatch(thunk(user.count))
    }, [user.count])
    const handleChange = (value) => {
        console.log(value)
        if(user.count >5){
            dispatch(actionss.resetState())
        }
        dispatch(actionss.add())
    }
    return (
        <div className='container-sm'>
            <h1 className='heading'>Most starred repos</h1>
            {user.value ? user.value.map((e) => {
                return (
                    <div class="flex-div box">
                        <img class="img-avatr" src={e.owner.avatar_url} />
                        <div class="content-repos">
                            <div>
                                <p>Repo name : {e.name}</p>
                                <p>Description : <span style={{fontSize:'.8em'}}>{e.description}</span></p>
                            </div>
                            <div className='star-issue'>
                                <span className='star-cont'><img src="/asset/star.png" className='star-img' /> {e.stargazers_count}</span>
                                <span className='issue-con'>{e.open_issues}</span>
                                {/* <div> */}
                                    <span className='updated-by'>Last pushed {e.updated_at} by {e.name}</span>
                                {/* </div> */}
                            </div>
                        </div>
                    </div>
                )
            }) : <Loader/>}
            <div className='pagination-con'>
                <Pagination count={5} color="primary" onChange={handleChange} />
            </div>
        </div>
    )
}
