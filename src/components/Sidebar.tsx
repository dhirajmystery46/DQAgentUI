"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Box, List, ListItem, ListItemText, Typography, IconButton, TextField,Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HistoryIcon from '@mui/icons-material/History';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import StarIcon from '@mui/icons-material/Star';
import { Chat } from '../types';
import AddIcon from '@mui/icons-material/Add';
import { Link } from '@mui/material';
const MenuLink = styled(Typography)(() => ({
  fontFamily: 'Source Sans Pro',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '24px',
  letterSpacing: '-0.25%',
  color: '#01151D',
  cursor: 'pointer',
  padding: '8px 16px',
  display: 'flex',
  alignItems: 'center',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, )',
  },
}));

interface SidebarProps {
  onCollapse?: (collapsed: boolean) => void;
  onNewChat: () => void;
  onLoadChat: (chatId: string) => void;
  onDeleteChat: (chatId: string) => void;
  onRenameChat: (chatId: string, newName: string) => void;
  recentChats: Chat[];
  onPromptLibraryClick: () => void;
  onFavouriteClick: (question: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  onCollapse, 
  onNewChat, 
  onLoadChat, 
  onDeleteChat, 
  onRenameChat, 
  recentChats,
  onPromptLibraryClick,
  onFavouriteClick
}) => {
  const [showRecents, setShowRecents] = useState(false);
  const [showWorkflows, setShowWorkflows] = useState(false);
  const [showPromptLibrary, setShowPromptLibrary] = useState(false);
  const [showFavourites, setShowFavourites] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [editingChatName, setEditingChatName] = useState('');
  const editInputRef = useRef<HTMLInputElement>(null);

  const favouriteQuestions = [
    "Run DQ Check for property hub",
    "Run DQ Check for portfolio",
    "Run DQ Check for the property Chicago -333 Wacker Dr in property hub",
  ];

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    if (onCollapse) {
      onCollapse(!isCollapsed);
    }
  };

  const handleEditClick = (chatId: string, currentName: string) => {
    setEditingChatId(chatId);
    setEditingChatName(currentName);
  };

  const handleEditSubmit = (chatId: string) => {
    onRenameChat(chatId, editingChatName);
    setEditingChatId(null);
  };

  useEffect(() => {
    if (editingChatId && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editingChatId]);

  return (
    <Box sx={{
      width: isCollapsed ? '60px' : '220px',
      backgroundColor: '#689CAE',
      height: '100vh',
      color: 'black',
      display: 'flex',
      flexDirection: 'column',
      transition: 'widths ease',
      flexShrink: 0,
      overflow: 'hidden',
      backgroundImage: 'url("/Side_bar_bg.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'bottom',
      backgroundRepeat: 'no-repeat',
    }}>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {!isCollapsed && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              sx={{
                fontSize: '18.3px',
                fontWeight: 'bold',
                lineHeight: '27.11px',
                color: 'black',
                mr: 1, 
              }}
            >
              JLL
            </Typography>
            <Typography
              sx={{
                fontSize: '18.3px',
                fontWeight: 400,
                lineHeight: '26.88px',
                color: '#DE0614', 
              }}
            >
              Azara
            </Typography>
          </Box>
        )}
        <IconButton onClick={handleCollapse} sx={{ color: 'grey', padding: '4px'}}>
          {isCollapsed ? <ArrowForwardIosIcon fontSize="small" /> : <ArrowBackIosNewIcon fontSize="small" />}
        </IconButton>
      </Box>
      
      {!isCollapsed && (
        <>
        <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      backgroundColor: '#09779E', 
      borderRadius: '4px', 
      padding: '5px 10px', 
      margin: '10px 15px 2px 8px', 
      cursor: 'pointer' 
    }} onClick={onNewChat}>
      <AddIcon sx={{ color: 'white', mr: 1 }} />
      <Typography sx={{ 
        color: 'white', 
        fontFamily: 'Source Sans Pro', 
        fontWeight: 400, 
        fontSize: '15px' 
      }}>
        New Conversation
      </Typography>
</Box>
          <Box sx={{ mt: 3, overflowY: 'auto', overflowX: 'hidden' }}>
            <MenuLink variant="body1" onClick={onNewChat}>
              <HomeOutlinedIcon sx={{ mr: 1, color: 'black', fontSize: '1.3rem' }} />
              Home
            </MenuLink>
            
            <MenuLink variant="body1" onClick={() => setShowRecents(!showRecents)}>
              <HistoryIcon sx={{ mr: 1, color: 'black', fontSize: '1.3rem' }} />
              Recents
              {showRecents ? 
                <ExpandLessIcon sx={{ ml: 'auto', color: 'grey', fontSize: '1rem' }} /> : 
                <ExpandMoreIcon sx={{ ml: 'auto', color: 'grey', fontSize: '1rem' }} />
              }
            </MenuLink>
            
            {showRecents && (
              <List sx={{ mt: 1, flexGrow: 1, paddingLeft: '16px' }}>
                {recentChats.map((chat) => (
                  <ListItem 
                    key={chat.id} 
                    sx={{
                      position: 'relative',
                      cursor: 'pointer',
                      padding: '4px 8px 4px 16px',
                      borderLeft: '1px solid black',
                      marginLeft: '8px',
                    }}
                  >
                    {editingChatId === chat.id ? (
                      <TextField
                        ref={editInputRef}
                        value={editingChatName}
                        onChange={(e) => setEditingChatName(e.target.value)}
                        onBlur={() => handleEditSubmit(chat.id)}
                        onKeyPress={(e) => e.key === 'Enter' && handleEditSubmit(chat.id)}
                        size="small"
                        fullWidth
                        sx={{ fontSize: '0.8rem' }}
                      />
                    ) : (
                      <ListItemText 
                        primary={chat.name || "Untitled Chat"}
                        onClick={() => onLoadChat(chat.id)}
                        primaryTypographyProps={{ 
                          sx: { 
                            fontSize: '14px',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            fontFamily: 'Source Sans Pro',
                            color: '#01151D',
                          } 
                        }}
                      />
                    )}
                    <Box sx={{ display: 'flex', flexShrink: 0, marginRight: '10px' }}>
                      <IconButton 
                        onClick={() => handleEditClick(chat.id, chat.name)}
                        size="small" 
                        sx={{ padding: '2px' ,color:'grey'}}
                      >
                        <EditIcon fontSize="small" sx={{ fontSize: '0.8rem' }} />
                      </IconButton>
                      <IconButton 
                        onClick={() => onDeleteChat(chat.id)}
                        size="small" 
                        sx={{ color: 'black', padding: '2px' }}
                      >
                        <DeleteIcon fontSize="small" sx={{ fontSize: '0.8rem', color:'grey' }} />
                      </IconButton>
                    </Box>
                  </ListItem>
                ))}
              </List>
            )}

            <MenuLink variant="body1" onClick={() => setShowWorkflows(!showWorkflows)}>
              <Box
                component="img"
                src="/family_history.png" 
                alt="Custom Workflow Icon"
                sx={{ mr: 1, width: '1.3rem', height: '1.3rem' }}
              />
              Workflows
              {showWorkflows ? 
                <ExpandLessIcon sx={{ ml: 'auto', color: 'grey', fontSize: '1rem' }} /> : 
                <ExpandMoreIcon sx={{ ml: 'auto', color: 'grey', fontSize: '1rem' }} />
              }
            </MenuLink>

            {showWorkflows && (
  <List sx={{ mt: 1, flexGrow: 1, paddingLeft: '16px' }}>
    <ListItem sx={{ padding: '4px 16px 4px 32px', borderLeft: '1px solid black', marginLeft: '8px' }}>
      <Link
        href="https://polite-river-0ec56390f.6.azurestaticapps.net/"
        underline="none"
        sx={{
          fontSize: '14px',
          fontFamily: 'Source Sans Pro',
          color: '#01151D',
          '&:hover': {
            textDecoration: 'underline',
          },
        }}
      >
        <ListItemText 
          primary="Lease Navigator"
          primaryTypographyProps={{ 
            sx: { 
              fontSize: '14px',
              fontFamily: 'Source Sans Pro',
              color: '#01151D',
            } 
          }}
        />
      </Link>
    </ListItem>
    <ListItem sx={{ padding: '4px 16px 4px 32px', borderLeft: '1px solid black', marginLeft: '8px' }}>
      <Link
        href="https://salmon-desert-03626b210-preview.centralus.6.azurestaticapps.net"
        underline="none"
        sx={{
          fontSize: '14px',
          fontFamily: 'Source Sans Pro',
          color: '#01151D',
          '&:hover': {
            textDecoration: 'underline',
          },
        }}
      >
        <ListItemText 
          primary="Project Budget Estimator"
          primaryTypographyProps={{ 
            sx: { 
              fontSize: '14px',
              fontFamily: 'Source Sans Pro',
              color: '#01151D',
            } 
          }}
        />
      </Link>
    </ListItem>
  </List>
)}

            <MenuLink variant="body1" onClick={() => {
              setShowPromptLibrary(!showPromptLibrary);
              onPromptLibraryClick();
            }}>
              <LibraryBooksIcon sx={{ mr: 1, color: 'black', fontSize: '1rem' }} />
              Prompt Library
              {showPromptLibrary ? 
                <ExpandLessIcon sx={{ ml: 'auto', color: 'grey', fontSize: '1rem' }} /> : 
                <ExpandMoreIcon sx={{ ml: 'auto', color: 'grey', fontSize: '1rem' }} />
              }
            </MenuLink>

            <MenuLink variant="body1" onClick={() => setShowFavourites(!showFavourites)}>
              <StarIcon sx={{ mr: 1, color: 'black', fontSize: '1.1rem' }} />
              Favourites
              {showFavourites ? 
                <ExpandLessIcon sx={{ ml: 'auto', color: 'grey', fontSize: '1rem' }} /> : 
                <ExpandMoreIcon sx={{ ml: 'auto', color: 'grey', fontSize: '1rem' }} />
              }
            </MenuLink>

            {showFavourites && (
              <List sx={{ mt: 1, flexGrow: 1, paddingLeft: '16px' }}>
                {favouriteQuestions.map((question, index) => (
                  <Tooltip title={question} key={index} placement="right" arrow>
                  <ListItem 
                    key={index}
                    onClick={() => onFavouriteClick(question)}
                    sx={{
                      cursor: 'pointer',
                      padding: '4px 8px 4px 16px',
                      borderLeft: '1px solid black',
                      marginLeft: '8px',
                    }}
                  >
                    <ListItemText 
                      primary={question}
                      primaryTypographyProps={{ 
                        sx: { 
                          fontSize: '14px',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          fontFamily: 'Source Sans Pro',
                          color: '#01151D',
                        } 
                      }}
                    />
                  </ListItem>
                  </Tooltip>
                ))}
              </List>
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export default Sidebar;