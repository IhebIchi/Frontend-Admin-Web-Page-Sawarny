import React from 'react'
import { useState } from 'react';
import { Button, Drawer, Form, Input, DatePicker, Select, message, Avatar, Upload } from 'antd';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import { format } from 'date-fns';
import axiosClient from "../utils/axiosClient";
import { CameraOutlined, UserOutlined } from '@ant-design/icons';

const EditUserDrawer = (props) => {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [avatar, setAvatar] = useState(null);
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const { userDetails, refresh, SetRefresh } = props;
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        form.setFieldsValue({
            ...userDetails,
            ...(userDetails.dateOfBirth && { dateOfBirth: dayjs(userDetails.dateOfBirth) })

        });
        setAvatar(userDetails.avatar);
    }, [])
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
                avatarFilename = response.data.file.fileName;
            }
            const payload = {
                ...values,
                dateOfBirth: values.dateOfBirth ? format(values.dateOfBirth, "yyyy-MM-dd") : undefined,
                avatar: avatarFilename
            }
            const response = await axiosClient.put('/user/update/' + userDetails._id, payload);
            message.success(response.data.message);
            SetRefresh(!refresh);
            onclose();
        } catch (error) {
            console.log(error);
            message.error(error.response.data.message);
        }
    }
    return (
        <>
            <Button type="primary" size='small' onClick={showDrawer}>
                Edit
            </Button>
            <Drawer
                title="Edit User"
                closable={{ 'aria-label': 'Close Button' }}
                onClose={onClose}
                open={open}
            >
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
                <Form onFinish={onFinish} form={form} layout='vertical'>

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
                                { value: 'PHOTOGRAPHER', label: 'Photographer' },]}
                        />
                    </Form.Item>

                    <Button type='primary' htmlType='submit'>Edit User</Button>

                </Form>
            </Drawer>
        </>
    );


}
export default EditUserDrawer