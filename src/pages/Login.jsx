import React, {useState} from 'react'
import { NavLink } from 'react-router-dom'
import Navbar from './Navbar';
import FootBar from '../home/FootBar';
import { useContext } from 'react';
import { LanguageContext } from '../App';

export default function Login() {

    let dic_data = require('../assets/dictionary.json');
    const {currentlang, setCurrentlang} = useContext(LanguageContext);

    if(localStorage.getItem('username')){
        window.location.href = `${process.env.REACT_APP_CLIENT_URL}/dashboard`;
    }
    const [user, setUser] = useState({
        username : '',
        password : ''
    });

    const handleChange = (event) => {
        let name = event.target.name
        let value = event.target.value
        
        setUser({...user, [name]:value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const {username, password} = user;
        console.log(username, password)
        try {
            const res = await fetch('/api/login', {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({
                    username, password
                })
            });
            console.log(res);
            const data = await res.json();
            if (res.status === 200) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', data.username);
                console.log(data.token);
                window.location.href = `${process.env.REACT_APP_CLIENT_URL}/dashboard`;
            } else {
            alert(dic_data.alert_login[currentlang]);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <Navbar />
            <div className="container shadow my-5">
                <div className="row"　style={{ marginTop: "100px" }}>
                    <div className="col-md-5 d-flex flex-column align-items-center form justify-content-center text-white">
                        <h1 className="display-4 fw-bolder text-center">{dic_data.greeting[currentlang]}</h1>
                        <p className="lead text-center">{dic_data.login_head[currentlang]}</p>
                        <h5 className='mb-4'>{dic_data.login_sub[currentlang]}</h5>
                        <NavLink to="/register" className="btn btn-outline-light rounded-pill pb-2 w-50">{dic_data.signup[currentlang]}</NavLink>
                    </div>
                    <div className="col-md-6 p-5">
                        <h1 className="display-6 fw-bolder mb-5">{dic_data.signin[currentlang]}</h1>
                        <form onSubmit={handleSubmit}>
                        <div class="mb-3">
                                <label for="name" class="form-label">{dic_data.username[currentlang]}</label>
                                <input type="text" class="form-control" id="name" name='username' value={user.username} onChange={handleChange} />
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">{dic_data.password[currentlang]}</label>
                                <input type="password" class="form-control" id="exampleInputPassword1" name='password' value={user.password} onChange={handleChange} />
                            </div>
                            <div class="mb-3 form-check">
                                <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                <label class="form-check-label" for="exampleCheck1">{dic_data.reg_check[currentlang]}</label>
                            </div>
                            <button type="submit" class="btn btn-primary w-100 mt-4 rounded-pill">{dic_data.signin[currentlang]}</button>
                        </form>
                    </div>
                </div>
            </div>
            <FootBar />
        </div>
    )
}
