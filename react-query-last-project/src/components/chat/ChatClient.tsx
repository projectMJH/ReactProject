import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState,Fragment } from 'react';
import axios from 'axios';

// Message 타입 정의
interface Message {
  id: number;
  user: string;
  text: string;
  timestamp: string;
}

// 메시지 가져오기 함수
const fetchMessages = async (): Promise<Message[]> => {
  const res = await axios.get<Message[]>('http://localhost:4000/messages');
  return res.data;
};

// 메시지 전송 함수
const sendMessage = async (message: { user: string; text: string }): Promise<Message> => {
  const res = await axios.post<Message>('http://localhost:4000/messages', message);
  return res.data;
};

const Chat = () => {
  const queryClient = useQueryClient();
  const [text, setText] = useState('');
  const [user] = useState('User1'); // 실제 사용자 이름과 연동 가능

  const { data: messages } = useQuery<Message[]>({
    queryKey: ['messages'],
    queryFn: fetchMessages,
    refetchInterval: 3000, // 3초마다 polling
  });

  const mutation = useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
      setText('');
    },
  });

  const handleSend = () => {
    if (text.trim()) {
      mutation.mutate({ user, text });
    }
  };

  return (
    <Fragment>
      <div className="breadcumb-area" style={{"backgroundImage": "url(/img/bg-img/breadcumb.jpg)"}}>
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-12">
              <div className="bradcumb-title text-center">
                <h2>채팅</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="archive-area section_padding_80">
        <div className="container">
          <div className="row">
            <table className={"table"}>
              <tr>
                <td>
                  <div style={{ width: 450,height: 300, overflowY: 'scroll' }}>
                    {messages?.map((msg) => (
                      <div key={msg.id}>
                        <strong>{msg.user}:</strong> {msg.text}
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
              <tr>
                <input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter your message"
                  className={"input-sm"}
                  size={50}
                  style={{"float":"left"}}
                />
                <button onClick={handleSend} className={"btn-sm btn-primary"}>Send</button>
              </tr>
            </table>



          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Chat;
