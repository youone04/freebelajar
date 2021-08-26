import { useState } from "react";

const Login = () => {
    const[username , setUsername] = useState('');
    const[password , setPassword] = useState('');


    const handleKirim = () => {
       if(username === '' || password === ''){
           alert('nama atau password tdk boleh kosong')
       }else{
        console.log('username =>',username);
        console.log('password => ',password)
       }
    }
    return(
        <>
        <h1 style={{textAlign:'center'}}>Login admin</h1>
       <div> <input onChange={(e) => setUsername(e.target.value)} type="text" placeholder="usernam"/></div>
       <div> <input onChange={(e) => setPassword(e.target.value) } type="text" placeholder="usernam"/></div>
       <button onClick={handleKirim}>KIRIM</button>
        </>
    )
}
export default Login;