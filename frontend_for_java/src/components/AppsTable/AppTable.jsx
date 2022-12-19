import './AppTable.css';
import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

function AppTable() {

    const [infoToAdd, setInfoToAdd] = useState({id: '', name: ''})

    const [data, setData] = useState([])

    const getData = useCallback(async () => {
        try {
            await axios.get('/api/appsstable', {
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
            {id: infoToAdd.id, name: infoToAdd.name, containersId: infoToAdd.containersId},
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(() => setData(...infoToAdd, infoToAdd))
            .then(setInfoToAdd({id: '', name: '', containersId: ''}))
        } catch (err) {
            console.log(err)
        }
    }, [infoToAdd])

    useEffect(() => {
        getData()
    }, [getData])

    return (
        <div className="apptable">
            <form className='input-part-2' onSubmit={e => e.preventDefault()}>
                <span>
                    <label className='app_id' htmlFor='app_id'>Id</label>
                    <input id='app_id' type="text" value={infoToAdd.id} onChange={e => setInfoToAdd({...infoToAdd, id: e.target.value})}></input>
                </span>
                <span>
                    <label className='name' htmlFor='name'>Name</label>
                    <input id='name' type="text" value={infoToAdd.name} onChange={e => setInfoToAdd({...infoToAdd, name: e.target.value})}></input>
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
                                <th>containers_id</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(info => 
                                <tr >
                                    <th>{info.id}</th>
                                    <th>{info.name}</th>
                                    <th>{JSON.stringify(info.containersId)}</th>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AppTable;