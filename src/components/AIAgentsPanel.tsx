import React from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import Image from 'next/image';
import { run } from 'node:test';

interface AIAgentsPanelProps {
  isOpen: boolean;
  runningRules: string[]; // Add this prop
  isLoading?: boolean; // Optional prop to indicate loading state
}


const AIAgentsPanel: React.FC<AIAgentsPanelProps> = ({ isOpen, runningRules, isLoading }) => {
  if (!isOpen) return null;

  // runningRules = ['City is blank','State is blank','Invalid Postal Code', 'Invalid State Format'];

  // Placeholder handlers for file upload
  const handleDataFileUpload = () => {
    // TODO: Implement file upload logic
    alert('Upload Data File clicked');
  };

  const handleSchemaFileUpload = () => {
    // TODO: Implement file upload logic
    alert('Upload Schema File clicked');
  };

  return (
    <Box
      sx={{
        marginTop: '50px',
        width: '350px',
        paddingLeft: '10px',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#FAFAFA',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontFamily: 'Source Sans Pro',
          fontWeight: 600,
          fontSize: '14px',
          lineHeight: '20px',
          letterSpacing: '-0.25%',
          marginBottom: '16px',
        }}
      > 
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
      <Image
          src={`/logos/Property_Hub_DQ_Agent.jpg`}
          alt={`Property_Hub_DQ_Agent icon`}
          width={24}  
          height={24} 
          style={{ borderRadius: '20%' }} 
        />
        <Typography style={{
          fontFamily: 'Source Sans Pro',
          fontWeight: 600,
          fontSize: '16px',
          lineHeight: '20px',
          letterSpacing: '-0.25%',
          color: "#01151D"
        }}>Data Quality Agent</Typography>{' '}
       </Box> 
      </Typography>
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-start', mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ width: '220px', fontFamily: 'Source Sans Pro', fontWeight: 500 }}
          onClick={handleDataFileUpload}
        >
          Upload Data File
        </Button>
        <Button
          variant="contained"
          color="secondary"
          sx={{ width: '220px', fontFamily: 'Source Sans Pro', fontWeight: 500 }}
          onClick={handleSchemaFileUpload}
        >
          Upload Schema File
        </Button>
      </Box>
      {isLoading && runningRules && runningRules.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
            Running Rules:
          </Typography>
          {runningRules.map((rule, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              <CircularProgress size={20} sx={{ mr: 1 }} />
              <Typography variant="body2">{rule}</Typography>
            </Box>
          ))}
        </Box>
      )}
      <Typography variant="caption" sx={{
        fontFamily: 'Source Sans Pro',
        fontSize: '10px',
        lineHeight: '14px',
        color: '#01151D',
        paddingRight: '16px',
        paddingLeft: '2px',
        width: '310px',
        boxSizing: 'border-box',
        marginTop: '40px',
        textAlign: 'justify',
      }}>
        <span style={{ fontWeight: 'bold' }}>DISCLAIMER:</span> The information presented is AI-generated based on abstracted data from multiple sources. This information is intended for preliminary guidance only. Please consult with your JLL advisor before making any decisions or taking action based on these recommendations.
      </Typography>
    </Box>
  );
};

export default AIAgentsPanel;