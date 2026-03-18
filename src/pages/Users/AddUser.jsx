import { Divider, Form, Input, Button, DatePicker, Select, message, Upload, Avatar } from 'antd'
import { UserOutlined, CameraOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { createUser } from '../../api/userService';
import { uploadFile } from '../../api/fileService';

const AddUser = () => {
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);

    const beforeUpload = (file) => {
        setAvatarFile(file);
        setAvatarPreview(URL.createObjectURL(file));
        return false;
    }

    async function onFinish(values) {
        try {
            let avatarFilename = null;
            if (avatarFile) {
                const uploadRes = await uploadFile(avatarFile);
                avatarFilename = uploadRes.data.file.fileName;
            }
            const response = await createUser(values, avatarFilename);
            message.success(response.data.message);
        } catch (error) {
            message.error(error.message);
        }
    }
    return (
        <div>
            <h4>Create New User</h4>
            <Divider />
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 23 }}>
                <Avatar
                    size={64}
                    src={avatarPreview || undefined}
                    icon={!avatarPreview && <UserOutlined />}
                />
                <Upload
                    beforeUpload={beforeUpload}
                    showUploadList={false}
                    accept={"image/*"}>
                    <Button icon={<CameraOutlined />}>{avatarPreview ? 'Change profile picture' : "Add profile picture"}</Button>
                </Upload>
            </div>
            <Form onFinish={onFinish}>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input the email!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="First Name"
                    name="firstName"
                    rules={[{ required: true, message: 'Please input the first name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Last Name"
                    name="lastName"
                    rules={[{ required: true, message: 'Please input the last name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input the password!' },
                    { min: 8, message: 'Password must be at least 8 characters long' },
                    { max: 32, message: 'Password must be less than 32 characters long' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    rules={[{ required: true, message: 'Please confirm the password!' },
                    { min: 8, message: 'Password must be at least 8 characters long' },
                    { max: 32, message: 'Password must be less than 32 characters long' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Date of Birth"
                    name="dateOfBirth">
                    <DatePicker style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item
                    label="Account type"
                    name="role"
                    rules={[{ required: true, message: 'Please select the account type!' }]}
                >
                    <Select
                        options={[
                            { value: 'ADMIN', label: 'Admin' },
                            { value: 'USER', label: 'Client' },
                            { value: 'PHOTOGRAPHER', label: 'Photographer' },
                            { value: 'VIDEOGRAPHER', label: 'Videographer' },
                            { value: 'HYBRID', label: 'Hybrid' },
                            { value: 'STUDIO', label: 'Studio' },
                        ]}
                    />
                </Form.Item>

                <Button type='primary' htmlType='submit'>Create User</Button>

            </Form>
        </div>
    )
}

export default AddUser;
