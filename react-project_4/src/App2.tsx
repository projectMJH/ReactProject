import {useState,createContext,useContext} from "react";
// 면접 => TypeScript / NodeJS
// 적극적 ...
// constr [name,setName] = useState<string|null>(null)
const UserContext = createContext("Hello");
// 공통 사용변수
// style 전송
function App2():any {
    const [user, setUser] = useState<string>("Hello Context");
    return (
        <UserContext.Provider value={user}>
            <h1>App2</h1>
            <Component1/>
        </UserContext.Provider>
    )
}
function Component1():any {
    return (
        <>
            <h1>Component1</h1>
            <Component2/>

        </>
    )
}
function Component2():any {
    const user=useContext(UserContext);
    return (
        <>
            <h1>Component2</h1>
            <h2>{user}</h2>
        </>
    )
}

export default App2;