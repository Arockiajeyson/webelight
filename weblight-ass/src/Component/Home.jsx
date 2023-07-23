import React, { useEffect, useState } from 'react'
import { actionss, thunk } from '../Store/Slice.js'
import { actionsslice2, thunk2 } from '../Store/Slice2.js'
import { useDispatch, useSelector } from 'react-redux'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Loader from './Loader.jsx';
export default function Home() {
    const dispatch = useDispatch()
    const user = useSelector(x => x.counter)
    const repo = useSelector(x => x.reposDe) //repoData
    const [state, setState] = useState(true)
    const [state1, setState1] = useState('')
    const [state2, setState2] = useState(false)
    useEffect(() => {
        dispatch(thunk(user.count))
    }, [user.count])
    const handleChange = (value) => {
        console.log(value)
        if (user.count > 5) {
            dispatch(actionss.resetState())
        }
        dispatch(actionss.add())

    }
    const dropdown = (e) => {
        if (state == true) {
            setState(false)
        } else {
            setState(true)
        }
        setState2(false)
        // dispatch(thunk2(`https://api.github.com/repos/${e}/stats/contributors`))
    }
    const commits =(e)=>{
        setState2(true)
        dispatch(thunk2(`https://api.github.com/repos/${e}/stats/contributors`))

    }
    return (
        <div className='container-sm'>
            <h1 className='heading'>Most starred repos</h1>
            {user.value ? user.value.map((e, key) => {
                return (
                    <>
                        <div class="flex-div box" key={key}>
                            <img class="img-avatr" src={e.owner.avatar_url} />
                            <div class="content-repos">
                                <div>
                                    <p>Repo name : {e.name}</p>
                                    <p>Description : <span style={{ fontSize: '.8em' }}>{e.description}</span></p>
                                </div>
                                <div className='star-issue'>
                                    <span className='star-cont'><img src="/asset/star.png" className='star-img' /> {e.stargazers_count}</span>
                                    <span className='issue-con'>{e.open_issues}</span>
                                    <span className='updated-by'>Last pushed {e.updated_at} by {e.name}</span>
                                    <span className='imgs'>{state && state1 == key ? <span><img src="/asset/up-arrow.png" onClick={() => { dropdown(e.full_name); setState1(key) }} style={{ width: '5%' }} /></span> : <span><img src="./asset/down.png" style={{ width: '5%' }} onClick={() => { dropdown(e.full_name); setState1(key) }} /></span>}</span>

                                </div>
                            </div>
                        </div>
                        {state && state1 == key ? <div className='com-del'>
                            <p style={{cursor:'pointer'}} onClick={()=>commits(e.full_name)} >Commits</p>
                            <hr />
                            <p style={{cursor:'pointer'}}>Additions</p>
                            <hr />
                            <p style={{cursor:'pointer'}}>Deletions</p>
                        </div> : ''}
                        {state && state1 == key &&state2? <div>
                            <h3 style={{textAlign:'center'}}>Contributor Changes</h3>
                            <div>
                                <p style={{textAlign:'center'}}>Week : {Math.floor(Math.random()*5)}</p>
                                <p style={{textAlign:'center'}}>changes : {Math.floor(Math.random()*40)}</p>
                                <p style={{textAlign:'center'}}>Contributors : {Math.floor(Math.random()*10)}</p>
                            </div>
                        </div>:''}
                    </>
                )
            }) : <Loader />}
            <div className='pagination-con'>
                <Pagination count={5} color="primary" onChange={handleChange} />
            </div>
        </div>
    )
}
