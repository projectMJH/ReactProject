import React,{useState} from "react";
// jsx => javascript+xml, tsx => typescript+xml => html 을 생성할 때 XML  형식으로
function Counter() {
    const [count, setCount] = useState<number>(0);
    //이벤트
    const onIncrement = () => setCount(count + 1);
    const onDecrement = () => setCount(count - 1);
    return (
        <div>
            <h1>{count}</h1>
            <div>
                <button onClick={onIncrement}>+1</button>
                <button onClick={onDecrement}>-1</button>
            </div>
        </div>
    )
}

export default Counter;