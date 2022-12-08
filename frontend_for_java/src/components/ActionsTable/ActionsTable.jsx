import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import './ActionsTable.css';

function ActionsTable() {

    const [data, setData] = useState([{user_id: 1, event: 'moveup', element: '543 643', app_name: 'present', app_id: 1, event_params:'', server_timestamp: '2022-01-01 01:00:00', misisdn: '8005553536'},
    {user_id: 1, event: 'moveup', element: '543 643', app_name: 'present', app_id: 1, event_params:'', server_timestamp: '2022-01-01 01:00:00', misisdn: '8005553536'},
    {user_id: 1, event: 'moveup', element: '543 643', app_name: 'present', app_id: 1, event_params:'', server_timestamp: '2022-01-01 01:00:00', misisdn: '8005553536'},
    {user_id: 1, event: 'moveup', element: '543 643', app_name: 'present', app_id: 1, event_params:'', server_timestamp: '2022-01-01 01:00:00', misisdn: '8005553536'},
    {user_id: 1, event: 'moveup', element: '543 643', app_name: 'present', app_id: 1, event_params:'', server_timestamp: '2022-01-01 01:00:00', misisdn: '8005553536'},
    {user_id: 1, event: 'moveup', element: '543 643', app_name: 'present', app_id: 1, event_params:'', server_timestamp: '2022-01-01 01:00:00', misisdn: '8005553536'}])

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

    //useEffect(() => {
    //    getData()
    //}, [getData])

    return (
        <div className="actionstable">
            <div className='input-part-1'></div>

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
                                <th>misisdn</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(info => 
                                <tr>
                                    <th>{info.user_id}</th>
                                    <th>{info.event}</th>
                                    <th>{info.element}</th>
                                    <th>{info.app_name}</th>
                                    <th>{info.app_id}</th>
                                    <th>{info.event_params}</th>
                                    <th>{info.server_timestamp}</th>
                                    <th>{info.misisdn}</th>
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
