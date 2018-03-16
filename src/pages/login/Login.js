
import React, {Component} from 'react';

import '../../styles/login.css';

export default class Login extends Component{

    render(){
        return (
            <div className="page" id="login">
                <div className="loginBox">
                    <div className="user">
                        <input type="text" placeholder="输入手机号/邮箱" />
                        <div></div>
                    </div>
                    <div className="psd">
                        <input type="password" placeholder="输入密码/验证码" />
                        <div></div>
                    </div>
                    <button>登录</button>
                </div>
            </div>
        )
    }
}