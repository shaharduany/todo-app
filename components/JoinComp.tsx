import { signIn } from "next-auth/react";

function JoinPage(){
    
    return (<div>
        <div>
            <h1>Welcome to TodoApp</h1>
            <h5>You need to register in order to join us</h5>
        </div>
        <div>
            <button onClick={() => signIn()}>Join us using Google</button>
        </div>
    </div>)
}

export default JoinPage;