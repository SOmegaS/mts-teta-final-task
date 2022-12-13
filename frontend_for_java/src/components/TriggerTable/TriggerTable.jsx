import './TriggerTable.css';
import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

function TriggerTable() {

    const [infoToAdd, setInfoToAdd] = useState({id: '', name: '', type: '', attributes: '', container_id: ''})

    const [data, setData] = useState([{id: 1, name: 'name', type: 'type', attributes: 'attributes', container_id: 'container_id'}, 
    {id: 1, name: 'name', type: 'type', attributes: 'attributes', container_id: 'container_id'}, {id: 1, name: 'name', type: 'type', attributes: 'attributes', container_id: 'container_id'}, {id: 1, name: 'name', type: 'type', attributes: 'attributes', container_id: 'container_id'},
    {id: 1, name: 'name', type: 'type', attributes: 'attributes', container_id: 'container_id'}, {id: 1, name: 'name', type: 'type', attributes: 'attributes', container_id: 'container_id'}])

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
            {id: infoToAdd.id, name: infoToAdd.name, type: infoToAdd.type, attributes: infoToAdd.attributes, container_id: infoToAdd.container_id},
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(() => setData(...infoToAdd, infoToAdd))
            .then(setInfoToAdd({id: '', name: '', type: '', attributes: '', container_id: ''}))
        } catch (err) {
            console.log(err)
        }
    }, [infoToAdd])

    //useEffect(() => {
    //    getData()
    //}, [getData])

    return (
        <div className="triggertable">
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
                    <label className='type' htmlFor='type'>Type</label>
                    <input id='type' type="text" value={infoToAdd.type} onChange={e => setInfoToAdd({...infoToAdd, type: e.target.value})}></input>
                </span>
                <span>
                    <label className='container_id' htmlFor='container_id'>Container id</label>
                    <input id='container_id' type="text" value={infoToAdd.container_id} onChange={e => setInfoToAdd({...infoToAdd, container_id: e.target.value})}></input>
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
                                <th>type</th>
                                <th>attributes</th>
                                <th>container_id</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(info => 
                                <tr>
                                    <th>{info.id}</th>
                                    <th>{info.name}</th>
                                    <th>{info.type}</th>
                                    <th>{info.attributes}</th>
                                    <th>{info.container_id}</th>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default TriggerTable;