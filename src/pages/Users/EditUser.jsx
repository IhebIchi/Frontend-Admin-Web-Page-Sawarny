import { Divider, Form, Input, Button, DatePicker, Select, message, Avatar, Upload } from 'antd'
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from "dayjs";
import { CameraOutlined, UserOutlined } from '@ant-design/icons';
import { getUserById, updateUser } from '../../api/userService';
import { uploadFile } from '../../api/fileService';

const EditUser = () => {
    const [form] = Form.useForm();
    const [avatar, setAvatar] = useState(null);
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function getById() {
            try {
                const response = await getUserById(id);

                form.setFieldsValue({
                    ...response.data.user,
                    ...(response.data.user.dateOfBirth && { dateOfBirth: dayjs(response.data.user.dateOfBirth) })

                });
                setAvatar(response.data.user.avatar);
            } catch (error) {
                message.error(error.response.data.message);
            }

        }
        if (id) {
            getById();
        }
    }, [id])

    const beforeUpload = (file) => {
        setAvatarFile(file);
        setAvatarPreview(URL.createObjectURL(file));
        return false;
    }

    async function onFinish(values) {
        try {
            let avatarFilename = avatar;
            if (avatarFile) {
                const uploadRes = await uploadFile(avatarFile);
                avatarFilename = uploadRes.data.file.fileName;
            }

            await updateUser(id, values, avatarFilename);
            message.success("User updated successfully");
            navigate('/users');
        } catch (error) {
            console.log(error);
            message.error(error.response?.data?.message || "Failed to update user");
        }
    }
    return (
        <div>
            <h4>Edit User</h4>
            <Divider />
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 23 }}>
                <Avatar
                    size={64}
                    src={avatarPreview || (avatar ? `http://localhost:3000/uploads/${avatar}` : undefined)}
                    icon={!avatarPreview && !avatar && <UserOutlined />}
                />
                <Upload
                    beforeUpload={beforeUpload}
                    showUploadList={false}
                    accept={"image/*"}>
                    <Button icon={<CameraOutlined />}>{avatarPreview ? 'Change profile picture' : "Add profile picture"}</Button>
                </Upload>
            </div>
            <Form onFinish={onFinish} form={form}>

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

                <Button type='primary' htmlType='submit'>Edit User</Button>

            </Form>
        </div>
    )
}

export default EditUser;
