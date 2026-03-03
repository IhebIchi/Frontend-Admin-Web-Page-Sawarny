import React from "react";
import { format } from 'date-fns';
import {useState,useEffect} from 'react';
import axiosClient from "../../utils/axiosClient";
import { Divider, Table } from "antd";


const Security=()=>{
    const [logs,setLogs]=useState([]);

    const columns = [
        {
          title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text) => format(text, "yyyy-MM-dd HH:mm")
        },
        {
          title: 'Action',
            dataIndex: 'action',
            key: 'action'
        },

    ];
    useEffect(()=>{
        async function fetchLogs(){
            try {
                const response = await axiosClient.get('/logs');
                setLogs(response.data.logs);
            }catch(error){
                console.error(error.response.data.message);
            }
        };
        fetchLogs();
    },[])
    return(
        <div><h4>Historique</h4>
        <Divider />
        <Table columns={columns} dataSource={logs} scroll={{x:'max-content'}} />
        </div>
    )
}   
export default Security;