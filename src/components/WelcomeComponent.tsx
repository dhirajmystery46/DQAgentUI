import React, { useState } from 'react';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

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
let selectedQuestion : string = '';
const WelcomeComponent: React.FC<WelcomeComponentProps> = ({ onQuestionClick }) => {
  const [open, setOpen] = useState(false);

  const handleRunDQClick = (question: string) => {setOpen(true); 
    selectedQuestion = question;
  };

  const handleSelect = (question: string, dataset: string) => {
    setOpen(false);
    if (dataset === 'Property Hub') {
      onQuestionClick(question+' for Property Hub');
    } else if (dataset === 'Portfolio') {
      onQuestionClick(question+' for Portfolio');
    }
  };

  return (
    <Box sx={{ paddingLeft: '30px', paddingRight: '40px', marginTop: '-2px' }}>
      <Typography variant="body1" sx={{ ...textStyle, marginBottom: '20px', fontWeight: "bold" }}>
        Welcome to Data Quality AI
      </Typography>
      <Typography variant="body1" sx={{ ...textStyle, marginBottom: '20px' }}>
        I can help you with Data Quality checks for Property Hub and Portfolio.
      </Typography>
      <Typography variant="body1" sx={{ ...textStyle, marginBottom: '20px' }}>
        Click below to get started.
      </Typography>
       <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {[
        "Run DQ Check",
        "Run Data Profiling",
        "Run Anomaly Detection",
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
          onClick={() => handleRunDQClick(question)}
        >
          <Typography variant="body2" sx={textStyle }>{question}</Typography>
        </Box>
      ))}
    </Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Select Source System</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <Button
              variant="outlined"
              onClick={() => handleSelect(selectedQuestion,'Property Hub')}
              sx={{ fontWeight: 500, fontFamily: 'Source Sans Pro' }}
            >
              Property Hub
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleSelect(selectedQuestion,'Portfolio')}
              sx={{ fontWeight: 500, fontFamily: 'Source Sans Pro' }}
            >
              Portfolio
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default WelcomeComponent;