import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Avatar, Button, Card, Descriptions, Divider, Tag } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const Profile = () => {
    const { user } = useContext(AuthContext);

    return (
        <div>
            <h4>My Profile</h4>
            <Divider />
            <Card style={{ maxWidth: 600 }}>
                <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:24 }}>
                    <Avatar
                        src={user?.avatar ? `http://localhost:3000/uploads/${user.avatar}` : undefined}
                        icon={!user?.avatar && <UserOutlined />}
                        size={80}
                    />
                    <div>
                        <h3>{user?.firstName} {user?.lastName}</h3>
                        <Tag color={user?.role === 'admin' ? 'red' : user?.role === 'photographer' ? 'purple' : 'blue'}>{user?.role}</Tag>
                    </div>
                </div>
                <Descriptions column={1}bordered>
                    <Descriptions.Item label="Email">{user?.email}</Descriptions.Item>
                    <Descriptions.Item label="First Name">{user?.firstName}</Descriptions.Item>
                    <Descriptions.Item label="Last Name">{user?.lastName}</Descriptions.Item>
                    <Descriptions.Item label="Date of Birth">{user?.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : 'N/A'}</Descriptions.Item>
                    <Descriptions.Item label="Role"><Tag color={user?.role === 'admin' ? 'red' : user?.role === 'photographer' ? 'purple' : 'blue'}>{user?.role}</Tag></Descriptions.Item>
                    <Descriptions.Item label="Created At">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</Descriptions.Item>
                    <Descriptions.Item label="Phone">{user?.phone || 'N/A'}</Descriptions.Item>
                    <Descriptions.Item label="Address">{user?.address || 'N/A'}</Descriptions.Item>
                    
                </Descriptions>
                <div style={{marginTop:16}}>
                    <Link to="/change-password" style={{color: '#25c5ff', textDecoration: 'none'}}>
                        <Button icon={<LockOutlined/>}>Change Password</Button>
                    </Link>
                </div>
            </Card>
        </div>
    )
}
export default Profile;