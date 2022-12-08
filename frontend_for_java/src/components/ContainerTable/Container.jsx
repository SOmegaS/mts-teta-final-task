import './ContainerTable.css';
import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

function ContainerTable() {

    const [infoToAdd, setInfoToAdd] = useState({id: '', name: '', app_id: ''})

    const [data, setData] = useState([{id: 1, name: 'name', app_id: 'app_id'}, {id: 1, name: 'name', app_id: 'app_id'}, {id: 1, name: 'name', app_id: 'app_id'}, 
    {id: 1, name: 'name', app_id: 'app_id'}, {id: 1, name: 'name', app_id: 'app_id'}, {id: 1, name: 'name', app_id: 'app_id'},
    {id: 1, name: 'name', app_id: 'app_id'}, {id: 1, name: 'name', app_id: 'app_id'}])

    const getData = useCallback(async () => {
        try {
            await axios.get('', {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                res = JSON.parse(res.data)
                setData(res)
            })
        } catch (err) {
            console.log(err)
        }
    }, [])

    const sendInfo = useCallback(async() => {
        try {
            await axios.post('', 
            {id: infoToAdd.id, name: infoToAdd.name, app_id: infoToAdd.app_id},
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


    //useEffect(() => {
    //    getData()
    //}, [getData])

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
                    <input id='app_id' type="text" value={infoToAdd.app_id} onChange={e => setInfoToAdd({...infoToAdd, app_id: e.target.value})}></input>
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
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(info => 
                                <tr>
                                    <th>{info.id}</th>
                                    <th>{info.name}</th>
                                    <th>{info.app_id}</th>
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