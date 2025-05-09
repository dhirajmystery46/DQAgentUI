import React from 'react';
import { Box, TextField, Button } from '@mui/material';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading, message, setMessage }) => {
  const [isFocused, setIsFocused] = React.useState(false);

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      maxWidth: '2000px',
      minHeight: '20px',
      backgroundColor: 'white',
      borderRadius: '4px',
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      padding: '8px',
      border: isFocused ? '1px solid rgb(37, 107, 164)' : '1px solid #E0E0E0',
      zIndex: 1000,
      boxSizing: 'border-box',
    }}>
      <TextField
        fullWidth
        multiline
        variant="outlined"
        placeholder="Ask me anything!"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        sx={{
          mt: 0,
          mb: 2,
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'transparent',
            },
            '&:hover fieldset': {
              borderColor: 'transparent',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'transparent',
            },
          },
        }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 'auto' }}>
        <Button 
          variant="contained"
          color="primary"
          endIcon={
            <SendOutlinedIcon 
              sx={{ 
                fontSize: 'small',
                color: isLoading || message.trim() === '' ? 'grey' : 'inherit',
              }} 
            />
          }
          onClick={handleSendMessage}
          disabled={isLoading || message.trim() === ''}
          sx={{
            backgroundColor: isLoading || message.trim() === '' ? '#f0f0f0' : '#ecf1f5',
            color: 'black',
            '&:hover': {
              backgroundColor: '#D0E8FF',
            },
            padding: '4px 12px',
            minWidth: '100px',
            textTransform: 'none',
            border: 'none',
            borderRadius: '4px',
          }}
        >
          Start Chat
        </Button>
      </Box>
    </Box>
  );
};

export default ChatInput;