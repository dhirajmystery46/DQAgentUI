import React, { useRef, useState } from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import Image from 'next/image';
import '../styles/AIAgentsPanel.css'; // Ensure you have this CSS file for styling
// import { run } from 'node:test';

interface AIAgentsPanelProps {
  isOpen: boolean;
  runningRules: string[]; // Add this prop
  isLoading?: boolean; // Optional prop to indicate loading state
}
type UploadType = 'data' | 'schema' | null;

const AIAgentsPanel: React.FC<AIAgentsPanelProps> = ({ isOpen, runningRules, isLoading }) => {
  if (!isOpen) return null;

  const dataFileInputRef = useRef<HTMLInputElement>(null);
  const schemaFileInputRef = useRef<HTMLInputElement>(null);
  // const [uploading, setUploading] = useState(false);
  const [uploadingType, setUploadingType] = useState<UploadType>(null);
  // runningRules = ['City is blank','State is blank','Invalid Postal Code', 'Invalid State Format'];

  // Placeholder handlers for file upload
  const handleDataFileUpload = () => {
    dataFileInputRef.current?.click();
  };

  const handleSchemaFileUpload = () => {
    schemaFileInputRef.current?.click();
  };

  const uploadFileToBackend = async (file: File, endpoint: string, type: UploadType) => {
    //  setUploading(true);
    setUploadingType(type);
    const formData = new FormData();
    formData.append('file', file);
   
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('File uploaded successfully:', data);
        // Store table_name and schema_name in localStorage as a client-side alternative
        if (typeof window !== 'undefined') {
          // Store table_name and schema_name in localStorage
          localStorage.setItem('table_name', ((data?.table_name ? data?.table_name : localStorage.getItem('table_name') ? localStorage.getItem('table_name') : '') || ''));
          localStorage.setItem('schema_name', ((data?.schema_name ? data?.schema_name : localStorage.getItem('schema_name') ? localStorage.getItem('schema_name') : '') || ''));
        }
        // Optionally, you can handle the response data here
        console.log('Table Name:', localStorage.getItem('table_name'));
        console.log('Schema Name:', localStorage.getItem('schema_name'));
        

        alert('File uploaded successfully!');
      } else {
        alert('File upload failed.');
      }
    } catch (error) {
      alert('Error uploading file.');
    } finally {
      // setUploading(false);
      setUploadingType(null);
    }
  };

  const handleDataFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    alert('Data file selected: ' + e.target.files?.[0]?.name);
    if (e.target.files && e.target.files[0]) {
      uploadFileToBackend(e.target.files[0], 'https://dqagent-fucjdkcxa5chcfbx.eastus2-01.azurewebsites.net/upload_data_file/', 'data');
    }
  };

  const handleSchemaFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    alert('Schema file selected: ' + e.target.files?.[0]?.name);
    if (e.target.files && e.target.files[0]) {
      uploadFileToBackend(e.target.files[0], 'https://dqagent-fucjdkcxa5chcfbx.eastus2-01.azurewebsites.net/upload_schema_file/', 'schema');
    }
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
      <input
        type="file"
        ref={dataFileInputRef}
        className="hidden-file-input"
        onChange={handleDataFileChange}
        accept="*"
        title="Upload Data File"
        placeholder="Upload Data File"
        aria-label="Upload Data File"
      />
      <input
        type="file"
        ref={schemaFileInputRef}
        className="hidden-file-input"
        onChange={handleSchemaFileChange}
        accept="*"
        title="Upload Schema File"
        placeholder="Upload Schema File"
        aria-label="Upload Schema File"
      />
      </Typography>
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-start', mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ width: '220px', fontFamily: 'Source Sans Pro', fontWeight: 500 }}
          onClick={handleDataFileUpload}
          disabled={uploadingType !== null}
          startIcon={uploadingType === 'data'  ? <CircularProgress size={18} color="inherit" /> : null}
        >
          Upload Data File
        </Button>
        <Button
          variant="contained"
          color="secondary"
          sx={{ width: '220px', fontFamily: 'Source Sans Pro', fontWeight: 500 }}
          onClick={handleSchemaFileUpload}
          disabled={uploadingType !== null}
          startIcon={uploadingType === 'schema' ? <CircularProgress size={18} color="inherit" /> : null}
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