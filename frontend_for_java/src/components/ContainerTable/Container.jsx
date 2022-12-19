import './ContainerTable.css';
import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

function ContainerTable() {

    const [infoToAdd, setInfoToAdd] = useState({id: '', name: '', appId: ''})

    const [data, setData] = useState([])

    const getData = useCallback(async () => {
        try {
            await axios.get('/api/containerstable', {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                setData(res.data)
            })
        } catch (err) {
            console.log(err)
        }
    }, [])

    const sendInfo = useCallback(async() => {
        try {
            await axios.post('', 
            {id: infoToAdd.id, name: infoToAdd.name, appId: infoToAdd.appId},
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(() => setData(...infoToAdd, infoToAdd))
            .then(setInfoToAdd({id: '', name: ''}))
        } catch (err) {
            console.log(err)
        }
    }, [infoToAdd])


    useEffect(() => {
        getData()
    }, [getData])

    return (
        <div className="containertable">
            <form className='input-part-2' onSubmit={e => e.preventDefault()}>
                <span>
                    <label className='id' htmlFor='id'>Id</label>
                    <input id='id' type="text" value={infoToAdd.id} onChange={e => setInfoToAdd({...infoToAdd, id: e.target.value})}></input>
                </span>
                <span>
                    <label className='name' htmlFor='name'>Name</label>
                    <input id='name' type="text" value={infoToAdd.name} onChange={e => setInfoToAdd({...infoToAdd, name: e.target.value})}></input>
                </span>
                <span>
                    <label className='app_id' htmlFor='app_id'>App id</label>
                    <input id='app_id' type="text" value={infoToAdd.appId} onChange={e => setInfoToAdd({...infoToAdd, appId: e.target.value})}></input>
                </span>
                <span>
                    <button className='btn-for-submit' type='submit' onClick={(e) => {
                        e.preventDefault()
                        sendInfo(infoToAdd)
                    }}>Submit</button>
                    </span>
            </form>
            <div className='table-wrapper'>
                <div className='table'>
                    <table>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>name</th>
                                <th>app_id</th>
                                <th>triggers_id</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(info => 
                                <tr>
                                    <th>{info.id}</th>
                                    <th>{info.name}</th>
                                    <th>{info.appId}</th>
                                    <th>{JSON.stringify(info.triggersId)}</th>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ContainerTable;