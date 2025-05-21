"use client"
import React, { useState, useEffect } from 'react'
import { Box, Typography, Button, CircularProgress } from '@mui/material'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import ChatInput from '../components/ChatInput'
import ChatMessages from '../components/ChatMessages'
import AIAgentsPanel from '../components/AIAgentsPanel'
import WelcomeComponent from '../components/WelcomeComponent'
import PromptLibrary from '../components/PromptLibrary'
import { useChat } from '../hooks/useChat'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export default function Home() {
  const [isAgentsPanelOpen, setIsAgentsPanelOpen] = useState(true);
  const [isInitialState, setIsInitialState] = useState(true);
  const [inputMessage, setInputMessage] = useState('');
  const [showHeading, setShowHeading] = useState(true);
  const [showPromptLibrary, setShowPromptLibrary] = useState(false);
  const { 
    messages, 
    isLoading, 
    handleSendMessage, 
    handleNewChat: originalHandleNewChat, 
    handleLoadChat, 
    handleDeleteChat, 
    handleRenameChat,
    recentChats 
  } = useChat();

  useEffect(() => {
    if (messages.length > 0) {
      setIsInitialState(false);
      setShowHeading(false);
      setShowPromptLibrary(false);
    }
  }, [messages]);

  const toggleAgentsPanel = () => {
    setIsAgentsPanelOpen(!isAgentsPanelOpen);
  };

  const handleSendMessageWrapper = async (message: string) => {
    setIsInitialState(false);
    setShowHeading(false);
    setShowPromptLibrary(false);
    await handleSendMessage(message);
    setInputMessage('');
  };

  const handleQuestionClick = (question: string) => {
    setInputMessage(question);
  };

  const handleNewChat = () => {
    originalHandleNewChat();
    setIsInitialState(true);
    setShowHeading(true);
    setShowPromptLibrary(false);
    setInputMessage('');
  };

  const handlePromptLibraryClick = () => {
    setShowPromptLibrary(true);
    setIsInitialState(false);
    setShowHeading(false);
  };

  const handleRunPrompt = (prompt: string) => {
    handleNewChat();
    handleSendMessageWrapper(prompt);
  };
  const handleFavouriteClick = (question: string) => {
    setInputMessage(question);
  };
  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100%', maxWidth: '100vw' }}>
      <Sidebar 
        onNewChat={handleNewChat} 
        onLoadChat={handleLoadChat} 
        onDeleteChat={handleDeleteChat}
        onRenameChat={handleRenameChat}
        recentChats={recentChats}
        onPromptLibraryClick={handlePromptLibraryClick}
        onFavouriteClick={handleFavouriteClick}
      />
      <Box component="main" sx={{ 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        width: 'calc(100% - 220px)',
        overflow: 'hidden',
      }}>
        <Header />
        <Box sx={{ 
          flexGrow: 1, 
          display: 'flex',
          overflow: 'hidden',
        }}>
          <Box sx={{ 
            flexGrow: 1, 
            display: 'flex', 
            flexDirection: 'column',
            overflow: 'auto',
            borderRight: isAgentsPanelOpen ? '1px solid #e0e0e0' : 'none',
            transition: 'alls ease',
            paddingRight: isAgentsPanelOpen ? 'px' : '120px',
          }}>
            {showHeading && (
              <Box sx={{ 
                position: 'sticky',
                top: 0,
                zIndex: 1000,
                backgroundColor: 'white',
                paddingTop: '8px',
                paddingBottom: '30px',
                paddingLeft: '50px',
              }}>
                <Typography variant="h5" sx={{ 
                  textAlign: 'left',
                  fontFamily: 'Source Sans Pro',
                  fontWeight: 400,
                  fontSize: '20px',
                  lineHeight: '40px',
                  letterSpacing: '-.5%',
                  color: '#00151D',
                  width: '404px',
                }}>
                  Data Quality AI Agent
                </Typography>
                <Typography variant="body1" sx={{
                  textAlign: 'left',
                  fontFamily: 'Source Sans Pro',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '24px',
                  letterSpacing: '-0.25%',
                  color: '#00151D',
                  marginTop: '4px',
                }}>
                  A Multi-Agent AI assistant expediting Data Quality processes.
                </Typography>
              </Box>
            )}
            <Box sx={{ paddingLeft: '45px', paddingRight: '40px', flexGrow: 1 }}> 
              {isInitialState ? (
                <WelcomeComponent onQuestionClick={handleQuestionClick} />
              ) : showPromptLibrary ? (
                <PromptLibrary onRunPrompt={handleRunPrompt} />
              ) : (
                <ChatMessages messages={messages} isAgentsPanelOpen={isAgentsPanelOpen} />
              )}
            </Box>
            {!showPromptLibrary && (
  <Box sx={{ 
    position: 'sticky',
    bottom: 0,
    width: '100%',
    display: 'flex', 
    justifyContent: 'flex-start',
    padding: '16px 24px',
    backgroundColor: 'white',
    boxSizing: 'border-box',
  }}>
    <ChatInput 
      onSendMessage={handleSendMessageWrapper} 
      isLoading={isLoading}
      message={inputMessage}
      setMessage={setInputMessage}
    />
  </Box>
)}
          </Box>
          {isAgentsPanelOpen && (
            <Box sx={{ 
              width: '320px',
              flexShrink: 0,
              overflowY: 'auto',
              overflowX: 'hidden',
              backgroundColor: '#FAFAFA',
              borderLeft: '1px solid #e0e0e0',
            }}>
              <AIAgentsPanel isOpen={isAgentsPanelOpen} runningRules={ isLoading ? inputMessage.toLowerCase().includes("run dq check for property hub") ? ['City is blank', 'State is blank', 'Postal Code void', 'State format invalid' ] :  inputMessage.toLowerCase().includes("run dq check for portfolio") ? ['Notice date blank', 'Rentable Area Blank/Zero'] :[] :[] } isLoading={isLoading} />
            </Box>
          )}
        </Box>
      </Box>
      <Box sx={{ 
        position: 'fixed', 
        top: '70px',
        right: '20px',
        zIndex: 1001,
      }}>
        <Button 
          variant="contained" 
          onClick={toggleAgentsPanel}
          sx={{ 
            backgroundColor: '#F1F1F1',
            '&:hover': {
              backgroundColor: '#D0E8FF',
            },
            color:'#00151D',
            fontWeight: 600, 
            fontSize: '14px', 
            lineHeight: '20px', 
            letterSpacing: '0%', 
            verticalAlign: 'middle', 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '6px 16px',
            fontFamily: 'Source Sans Pro', 
            textTransform: 'none',
            boxShadow: 'none',
            border: 'none',
          }}
        >
          {isLoading && <CircularProgress size={20} sx={{ marginRight: '8px', color: 'black' }} />}
          AI Agents
          {isAgentsPanelOpen ? (
            <ExpandMoreIcon sx={{ color: 'black', marginLeft: '8px' }} />
          ) : (
            <ExpandLessIcon sx={{ color: 'black', marginLeft: '8px' }} />
          )}
        </Button>
      </Box>
    </Box>
  )
}