import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

interface AIAgentsPanelProps {
  isOpen: boolean;
}

const AIAgentsPanel: React.FC<AIAgentsPanelProps> = ({ isOpen }) => {
  if (!isOpen) return null;

  const agents = [
    'Portfolio DQ Agent',
    'Property Hub DQ Agent'
  ];

  return (
    <Box
      sx={{
        marginTop: '50px',
        width: '350px', 
        paddingLeft:'10px',
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
        <span style={{
           fontFamily: 'Source Sans Pro',
           fontWeight: 600,
           fontSize: '16px',
           lineHeight: '20px',
           letterSpacing: '-0.25%',
           color:"#01151D" }}>Data Quality</span>{' '}
        <span style={{ 
          fontFamily: 'Source Sans Pro',
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: '20px',
          letterSpacing: '-0.25%',
          color: 'black' }}>AI Agents</span>
      </Typography>
      <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
      {agents.map((agent, index) => (
  <Box key={index} sx={{ 
    backgroundColor: 'white', 
    padding: '5px 16px',  // Increased top and bottom padding from 10px to 12px
    borderRadius: '4px', 
    marginTop: index > 0 ? '12px' : '0',
    border: '1px solid #e0e0e0',
    width: "260px"
  }}>
    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}> 
    <Image
  src={`/logos/${agent.replace(/\s+/g, '_')}.jpg`}
  alt={`${agent} icon`}
  width={24}  
  height={24} 
  style={{ borderRadius: '20%' }} 
/>
      <Typography variant="subtitle1" sx={{ 
        fontWeight: 'bold', 
        fontFamily: 'Source Sans Pro',
        fontSize: '14px',
        lineHeight: '20px',
        letterSpacing: '-0.25%',
        color:'#00151D',
        marginLeft: '8px'
      }}>
        {agent}
      </Typography>
    </Box>
    <Typography variant="body2" sx={{ 
      color: '#01151D',
      fontFamily: 'Source Sans Pro',
      fontWeight: '400',
      fontSize: '14px',
      lineHeight: '20px', // Reduced line height
      letterSpacing: '-0.25%',
      
    }}>
      {getAgentDescription(agent)}
    </Typography>
    
  </Box>
))}
      </Box>
      <Typography variant="caption" sx={{
        fontFamily: 'Source Sans Pro',
        fontSize: '10px',
        lineHeight: '14px',
        color: '#01151D',
        paddingRight: '16px',  // Add right padding
        paddingLeft:'2px',
        width: '310px',  // Set a specific width (350px panel width - 32px total padding)
        boxSizing: 'border-box',
        marginTop: '40px',
        textAlign:'justify',
        
      }}>
        <span style={{ fontWeight: 'bold' }}>DISCLAIMER:</span> The information presented is AI-generated based on abstracted data from multiple sources. This information is intended for preliminary guidance only. Please consult with your JLL advisor before making any decisions or taking action based on these recommendations.
      </Typography>
    </Box>
    
  );
};

function getAgentDescription(agent: string): string {
  switch (agent) {
    case 'Portfolio DQ Agent':
      return 'Provides a summary of the portfolio data quality';
    case 'Property Hub DQ Agent':
      return 'Summarizes the property hub data quality.';
    default:
      return '';
  }
}

export default AIAgentsPanel;