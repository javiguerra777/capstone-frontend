import React, { FormEvent, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import convertToDate from '../functions/ConvertToDate';
import switchSpriteSheet from '../../../common/functions/SwitchSpriteSheet';
import { socket } from '../../../common/service/socket';
import { Message } from '../../../common/models';
import {
  disableKeyBoard,
  enableKeyBoard,
} from '../../../app/redux/GameSlice';
import useChatScroll from '../hooks/UseChatScroll';
import GetReduxStore from '../../../common/hooks/GetStore';

type ChatProps = {
  toggleAside: () => void;
  messages: Message[];
};
function GameChat({ toggleAside, messages }: ChatProps) {
  const dispatch = useDispatch();
  const {
    user: { username, playerSprite },
    game: { id },
  } = GetReduxStore();
  const [msg, setMessage] = useState('');
  const [hasFocus, setFocus] = useState(false);
  const ref = useChatScroll(messages);

  useEffect(() => {
    if (hasFocus) {
      dispatch(disableKeyBoard());
    } else {
      dispatch(enableKeyBoard());
    }
  }, [hasFocus]);
  const sendChat = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit('chat', {
      username,
      message: msg,
      date: Date.now(),
      room: id,
      sprite: playerSprite,
    });
    setMessage('');
  };
  return (
    <aside className="chat-bar background-color">
      <header className="chat-header">
        <h1>Chat</h1>
        <div>
          <button type="button" onClick={toggleAside}>
            x
          </button>
        </div>
      </header>
      <div className="main-chat" ref={ref}>
        {messages.length > 0 &&
          messages.map((message: Message) => (
            <section key={nanoid()} className="ind-message">
              <header className="ind-msg-header">
                <img
                  src={switchSpriteSheet(message.sprite)}
                  alt={message.sprite}
                />
                <h5>
                  {convertToDate(Date.now(), true) ===
                  convertToDate(message.date, true)
                    ? convertToDate(message.date, false)
                    : convertToDate(message.date, true)}
                </h5>
              </header>
              <div className="ind-msg-h3">
                <h3>{message.username} to room</h3>
                <p>{message.message}</p>
              </div>
            </section>
          ))}
      </div>
      <form className="message-form" onSubmit={sendChat}>
        <input
          type="text"
          value={msg}
          placeholder="Message..."
          onChange={(e) => setMessage(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
      </form>
    </aside>
  );
}

export default GameChat;
