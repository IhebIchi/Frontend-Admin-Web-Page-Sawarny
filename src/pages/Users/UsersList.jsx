import { useState, useEffect } from 'react'
import { Divider, Table, message, Tag, Space, Button, Avatar } from 'antd';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import EditUserDrawer from '../../components/EditUserDrawer';
import { UserOutlined } from '@ant-design/icons';
import { listUsers } from '../../api/userService';



const roleColors = {
    ADMIN: "red",
    USER: "blue",
    PHOTOGRAPHER: "purple",
    VIDEOGRAPHER: "green",
    HYBRID: "orange",
    STUDIO: "cyan"
};

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [refresh, SetRefresh] = useState(false);
    const navigate = useNavigate();

    const columns = [
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            render: avatar => (
                <Avatar
                    src={avatar ? "http://localhost:3000/uploads/" + avatar : undefined}
                    icon={!avatar && <UserOutlined />} />
            )
        },
        {
            title: 'Create At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: text => format(text, "yyyy-MM-dd HH:mm")
        },
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName'
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Date of Birth',
            dataIndex: 'dateOfBirth',
            key: 'dateOfBirth',
            render: text => text && format(new Date(text), "yyyy-MM-dd")
        },

        {
            title: 'Account Type',
            dataIndex: 'role',
            key: 'role',
            render: text => (<Tag color={roleColors[text]}>{text}</Tag>)
        },
        {
            title: 'Actions',
            render: (_, record) => (
                <Space>
                    <EditUserDrawer userDetails={record} refresh={refresh} SetRefresh={SetRefresh} />
                    <Button type="link" size='small'>Details</Button>
                </Space>
            )
        }

    ]

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await listUsers();
                setUsers(response.data.users)
            } catch (error) {
                message.error(error.message || "Failed to fetch users");
            }

        }
        fetchData();
    }, [refresh])

    return (
        <div>
            <h4>Users List</h4>
            <Divider />
            <Table columns={columns} dataSource={users} scroll={{ x: 'max-content' }} />
        </div>
    )
}

export default UsersList;
