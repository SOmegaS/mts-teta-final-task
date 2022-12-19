import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import './ActionsTable.css';

function ActionsTable() {

    const [data, setData] = useState([])

    const getData = useCallback(async () => {
        try {
            await axios.get('/api/actionstable', {
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

    useEffect(() => {
        getData()
    }, [getData])


    return (
        <div className="actionstable">
            <div className='table-wrapper'>
                <div className='table'>
                    <table>
                        <thead>
                            <tr>
                                <th>user_id</th>
                                <th>event</th>
                                <th>element</th>
                                <th>app_name</th>
                                <th>app_id</th>
                                <th>event_params</th>
                                <th>server_timestamp</th>
                                <th>msisdn</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(info => 
                                <tr>
                                    <th>{info.userId}</th>
                                    <th>{info.event}</th>
                                    <th>{info.element === '' ? "NULL" : info.element}</th>
                                    <th>{info.appName}</th>
                                    <th>{info.appId}</th>
                                    <th>{JSON.stringify(info.eventParams)}</th>
                                    <th>{info.timestamp}</th>
                                    <th>{info.msisdn === "" ? "NULL" : info.msisdn}</th>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ActionsTable;
