import { Button, Form, Input, message } from "antd";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authService";

function Login() {
    const { setToken } = useContext(AuthContext);
    const navigate = useNavigate();

    async function onFinish(values) {
        try {
            const response = await login(values);
            setToken(response.data.token);
            console.log(response);
            message.success(response.data.message);
            navigate('/');
        } catch (error) {
            message.error(error.response?.data?.message);
        }
    }

    return (
        <div>
            <Form
                onFinish={onFinish}>
                <Form.Item label="Email" name="email" rules={[{ required: true, message: "Email is required" }]} ><Input /></Form.Item>

                <Form.Item label="Password" name="password" rules={[{ required: true, message: "password is required" }]}><Input /></Form.Item>

                <Button type="primary" htmlType="submit" >Login</Button>

            </Form>
        </div>
    );
}

export default Login;
