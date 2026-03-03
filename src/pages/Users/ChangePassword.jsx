import { Button, Divider, Form, Input,message } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    async function onFinish(values) { 
        try {
           const response=await changePassword(values);
           message.success(response.data.message || "Password changed successfully");
        } catch (error) {
            message.error(error.message || "Failed to change password");
        }
    }
    return (
        <div>
            <h4> Change Password </h4>
            <Divider />
            <Form
                form={form}
                layout='vertical'
                onFinish={onFinish}
                style={{ maxWidth: 400 }}

            >
                <Form.Item name="currentPassword" label="Current Password" rules={[
                    { required: true, message: 'Please enter your current password' },
                    { min: 8, message: 'Password must be at least 8 characters' },
                    { max: 32, message: 'Password must be less than 32 characters' }
                    ]}>
                    <Input.Password placeholder='Current Password' />
                </Form.Item>
                <Form.Item name="newPassword" label="New Password" rules={[
                    { required: true, message: 'Please enter your new password' },
                    { min: 8, message: 'Password must be at least 8 characters' },
                    { max: 32, message: 'Password must be less than 32 characters' }]}>
                    <Input.Password placeholder='New Password' />
                </Form.Item>
                <Form.Item name="confirmNewPassword" label="Confirm New Password" rules={[
                    { required: true, message: 'Please confirm your new password' },
                    { min: 8, message: 'Password must be at least 8 characters' },
                    { max: 32, message: 'Password must be less than 32 characters' }]}>
                    <Input.Password placeholder='Confirm New Password' />
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit'>Change Password</Button>
                </Form.Item>
            </Form>
        </div>

    )
}

export default ChangePassword