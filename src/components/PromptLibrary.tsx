import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow'; // Changed to PlayArrowIcon for "start"

interface PromptLibraryProps {
  onRunPrompt: (prompt: string) => void;
}

const prompts = [
    "Run DQ Check for property '107 Northern Blvd, Suite 201' in property hub.", 
    "Run DQ Check for Troy Hill_Campus property in portfolio.",
    "Run DQ Check for property hub",
    "Run Data Profiling for portfolio",
    "Run Anomaly Detection for portfolio",
];

const PromptLibrary: React.FC<PromptLibraryProps> = ({ onRunPrompt }) => {
  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h5" sx={{ 
        marginBottom: '20px',
        fontFamily: 'Source Sans Pro',
        fontWeight: 600,
        fontSize: '20px',
        lineHeight: '24px',
        letterSpacing: '-0.25%',
        color: '#00151D'
      }}>
        Prompt Library
      </Typography>
      {prompts.map((prompt, index) => (
        <Box key={index} sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '10px',
          paddingBottom: '10px',
          borderBottom: '1px solid #e0e0e0'
        }}>
          <Typography sx={{ 
            flex: 1, 
            marginRight: '10px',
            fontFamily: 'Source Sans Pro',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '24px',
            letterSpacing: '-0.25%',
            color: '#00151D'
          }}>
            {prompt}
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => onRunPrompt(prompt)}
            sx={{
              backgroundColor: '#ecf1f5',
              '&:hover': {
                backgroundColor: '#ecf1f6',
              },
              color: '#00151D',
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '24px',
              letterSpacing: '-0.25%',
              fontFamily: 'Source Sans Pro',
              textTransform: 'none',
              padding: '6px 16px',
              boxShadow: 'none',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            Run
            <PlayArrowIcon sx={{ marginLeft: '8px', fontSize: '18px', color: '#000000' }} />
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default PromptLibrary;