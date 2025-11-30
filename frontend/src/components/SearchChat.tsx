import React, { useState, useRef, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { Textarea } from './ui/textarea';
import TypingText from './ui/shadcn-io/typing-text';
import NASA_LOGO from '../assets/images/nasa.svg';
import { useAppContext } from '../AppContext';
import { formatDate, getHistoryFromLocalStorage, saveHistoryToLocalStorage } from '../lib/utils';

interface Message {
    id: number;
    text: string;
    isUser: boolean;
}

const SYSTEM_MESSAGES = [
    "I found some relevant NASA images for",
    "Retrieving the latest space imagery for",
    "Pulling satellite images related to",
    "Here are some NASA photos of",
    "Accessing telescope imagery for",
    "Loaded high-resolution images for",
    "Gathering visual data from NASA for",
    "Fetching space imagery relevant to",
    "Compiling image resources for",
    "Extracting mission photos for",
    "Found visual datasets for",
    "Rendering NASA image results for",
    "Collecting observational imagery of",
    "Delivering space-agency images for",
    "Querying image archives for",
    "Scanned NASA’s image repository for",
    "Fetching astrophotography related to",
    "Prepared visual assets for",
    "Acquired image samples for",
    "Loaded celestial imagery for",
];

const SearchChat: React.FC<{ onSearch: (query: string) => void }> = ({ onSearch }: { onSearch: (query: string) => void }) => {
    const { searchQuery: initialSearchQuery } = useAppContext();
    const [messages, setMessages] = useState<Message[]>([
        {
            id: Date.now(),
            text: `${SYSTEM_MESSAGES[Math.floor(Math.random() * SYSTEM_MESSAGES.length)]}: "${initialSearchQuery}"`,
            isUser: false,
        },
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { setHistory } = useAppContext();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleSendMessage = () => {
        if (!inputValue.trim()) return;

        const userMessage: Message = {
            id: Date.now(),
            text: inputValue.trim(),
            isUser: true,
        };
        setMessages((prev) => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);
        saveHistoryToLocalStorage(inputValue.trim());
        setHistory(getHistoryFromLocalStorage());

        // Simulate response after 1.5 seconds
        setTimeout(() => {
            const responseMessage: Message = {
                id: Date.now() + 1,
                text: `${SYSTEM_MESSAGES[Math.floor(Math.random() * SYSTEM_MESSAGES.length)]}: "${userMessage.text}"`,
                isUser: false,
            };
            setMessages((prev) => [...prev, responseMessage]);
            setIsLoading(false);
        }, 1500);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            e.stopPropagation();
            onSearch(inputValue.trim());

            handleSendMessage();
            return false;
        }
    };

    const handleChangeInputValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(e.target.value);
        if (e.nativeEvent instanceof InputEvent && e.nativeEvent.inputType === "insertLineBreak") {
            e.preventDefault();
            e.stopPropagation();
            onSearch(inputValue.trim());

            handleSendMessage();
            return false;
        }
    };

    return (
        <div className="flex w-[500px] flex-col items-center bg-[#FCFCFC] h-full border-t border-r border-[#E9E7E1] justify-between p-[24px]">
            <div className="flex flex-col items-start justify-start bg-transparent w-full flex-1 overflow-y-auto mb-4">
                {messages.length > 0 && (
                    <div className="w-full space-y-4 mb-4">
                        <div className="flex w-full items-center justify-center text-sm text-[#616264]">{formatDate(new Date())}</div>
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`text-sm p-3 rounded-lg ${message.isUser
                                    ? 'text-[#616264] bg-[#EEEDED] ml-auto max-w-[80%]'
                                    : 'bg-transparent text-gray-800 mr-auto max-w-[80%]'
                                    }`}
                            >
                                {!message.isUser && <img src={NASA_LOGO} alt="NASA image" className="w-10 h-10 rounded-full mb-2" />}
                                {message.isUser ? (
                                    message.text
                                ) : (
                                    <TypingText
                                        text={message.text}
                                        typingSpeed={30}
                                        showCursor={false}
                                        loop={false}
                                        className="text-gray-800"
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                )}
                {isLoading && (
                    <div className="flex items-center justify-start mb-4">
                        <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <div className="flex flex-col items-center justify-center w-full">
                <Textarea
                    value={inputValue}
                    onChange={handleChangeInputValue}
                    onKeyDown={handleKeyDown}
                    placeholder="What would you like to change?"
                    className="w-full h-[150px] bg-white border border-[#B7B7B7] rounded-[16px] p-[16px] outline-none resize-none"
                />
            </div>
        </div>
    );
};

export default SearchChat;
