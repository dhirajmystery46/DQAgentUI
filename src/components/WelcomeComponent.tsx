import React from 'react';
import { Box, Typography } from '@mui/material';

interface WelcomeComponentProps {
  onQuestionClick: (question: string) => void;
}

const textStyle = {
  fontFamily: 'Source Sans Pro',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '24px',
  letterSpacing: '-0.25%',
  color: '#00151D'
};

const WelcomeComponent: React.FC<WelcomeComponentProps> = ({ onQuestionClick }) => (
  <Box sx={{ paddingLeft: '30px', paddingRight: '40px', marginTop: '-2px' }}>
    <Typography variant="body1" sx={{ ...textStyle, marginBottom: '20px', fontWeight: "bold" }}>
      Welcome to Data Quality AI
    </Typography>
    <Typography variant="body1" sx={{ ...textStyle, marginBottom: '20px' }}>
    I can help you with Data Quality checks for your Property Hub and Portfolio.
    </Typography>
    <Typography variant="body1" sx={{ ...textStyle, marginBottom: '20px' }}>
      Ask about a property or portfolio to begin.
    </Typography>
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {[
        "Run DQ Check for Property Hub",
        "Run DQ Check for Portfolio"
      ].map((question, index) => (
        <Box 
          key={index} 
          sx={{ 
            border: '1px solid #ccc', 
            borderRadius: '4px', 
            padding: '10px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: '#f5f5f5',
              borderColor: 'rgb(37, 107, 164)',
            },
          }}
          onClick={() => onQuestionClick(question)}
        >
          <Typography variant="body2" sx={textStyle}>{question}</Typography>
        </Box>
      ))}
    </Box>
  </Box>
);

export default WelcomeComponent;