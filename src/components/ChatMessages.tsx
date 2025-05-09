import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, IconButton, Button } from '@mui/material';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import EmailIcon from '@mui/icons-material/Email';
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import { generatePDF } from '../utils/pdfUtils';
import {HtmlIframeRenderer} from './HtmlIframeRenderer';
import html2canvas from 'html2canvas';
interface Message {
    query: string;
    is_user: boolean;
    type?: string;
}

interface ChatMessagesProps {
    messages: Message[];
    isAgentsPanelOpen: boolean;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, isAgentsPanelOpen }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const lastMessageRef = useRef<HTMLDivElement>(null);
    const [renderedContent, setRenderedContent] = useState<{ [key: string]: string }>({});
    const [contentReady, setContentReady] = useState(false);
    // const [chartImages, setChartImages] = useState<{ [key: string]: string }>({});
    useEffect(() => {
        if (lastMessageRef.current) {
            setTimeout(() => {
                lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }, [messages]);

    const renderContent = async (query: string, type?: string) => {
        if (type === 'html') {
            try {
                const parsedContent = JSON.parse(query);
                if (parsedContent.result) {
                    const htmlContent = parsedContent.result.replace(/```html\n|```$/g, '');
                    return htmlContent;
                }
            } catch (error) {
                console.error("Error parsing HTML content:", error);
            }
        } else {
            // Assume markdown for other types or when type is not specified
            
            const htmlContent = await marked(query);
            const sanitizedContent = DOMPurify.sanitize(htmlContent);
            return addTargetBlankToLinks(sanitizedContent);;
        }
        return query; // Return original content if parsing fails
    };
    const captureChart = async (iframeDocument: Document) => {
        const canvas = iframeDocument.querySelector('canvas');
        if (canvas) {
            const image = await html2canvas(canvas);
            return image.toDataURL('image/png');
        }
        return null;
    };

    const handleSaveAsPDF = async (content: string) => {
        if (renderedContent[content]) {
            let chartImage = null;
            if (messages.find(m => m.query === content)?.type === 'html') {
                const iframe = document.querySelector('iframe') as HTMLIFrameElement;
                if (iframe && iframe.contentDocument) {
                    chartImage = await captureChart(iframe.contentDocument);
                }
            }
            await generatePDF(content, chartImage);
        } else {
            console.error("Content not available for PDF generation.");
        }
    };
    const addTargetBlankToLinks = (html: string) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const links = doc.getElementsByTagName('a');
        for (let i = 0; i < links.length; i++) {
          links[i].setAttribute('target', '_blank');
          links[i].setAttribute('rel', 'noopener noreferrer');
        }
        return doc.body.innerHTML;
      };

    useEffect(() => {
        const renderAllContent = async () => {
            const contentMap: { [key: string]: string } = {};
            for (const message of messages) {
                if (!message.is_user && !renderedContent[message.query]) {
                    try {
                        const sanitizedContent = await renderContent(message.query, message.type);
                        contentMap[message.query] = sanitizedContent;
                    } catch (error) {
                        console.error("Error rendering content:", error);
                    }
                }
            }
            setRenderedContent(prev => ({ ...prev, ...contentMap }));
            setContentReady(true);
        };

        renderAllContent();
    }, [messages]);

    return (
        <Box
            ref={containerRef}
            sx={{
                flexGrow: 1,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {messages.map((message, index) => (
                <Box
                    key={index}
                    ref={index === messages.length - 1 ? lastMessageRef : null}
                    sx={{
                        width: '100%',
                        padding: '16px 0',
                        marginBottom: '6px',
                        backgroundColor: 'transparent',
                        display: 'flex',
                        justifyContent: message.is_user ? 'flex-end' : 'flex-start',
                    }}
                >
                    <Box
                        sx={{
                            maxWidth: message.is_user ? '70%' : '100%',
                            boxSizing: 'border-box',
                            display: 'flex',
                            alignItems: 'flex-start',
                        }}
                    >
                        {!message.is_user && (
                            <Box sx={{
                                marginRight: '16px',
                                flexShrink: 0,
                                width: '24px',
                                height: '43px',
                                display: 'flex',
                                alignItems: 'center',
                            }}>
                                <img src="/logo2.png" alt="JLL Logo" style={{ width: '24px', height: '43px', objectFit: 'contain' }} />
                            </Box>
                        )}
                        <Box sx={{
                            flexGrow: 1,
                            maxWidth: '100%',
                            display: 'flex',
                            alignItems: 'flex-start',
                            backgroundColor: message.is_user ? '#f0f0f0' : 'transparent',
                            borderRadius: message.is_user ? '12px' : '0',
                            padding: message.is_user ? '12px' : '0',
                            overflowX: 'hidden', 
                        }}>
                            {message.is_user ? (
                                <Typography
                                    variant="body1"
                                    align="left"
                                    sx={{
                                        fontFamily: 'Source Sans Pro',
                                        color: '#000',
                                        overflowWrap: 'break-word',
                                        wordWrap: 'break-word',
                                        whiteSpace: 'pre-wrap',
                                    }}
                                >
                                    {message.query}
                                </Typography>
                            ) : (
                                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                    {renderedContent[message.query] ? (
                                        message.type === 'html' ? (
                                            <Box sx={{ width: '100%', height: '100%', overflow: 'hidden' }}>
    <HtmlIframeRenderer htmlContent={renderedContent[message.query]} isAgentsPanelOpen={isAgentsPanelOpen} />
</Box>
                                        ) : (
                                            <Box
                                                dangerouslySetInnerHTML={{ __html: renderedContent[message.query] }}
                                                sx={{
                                                    fontFamily: 'Source Sans Pro',
                                                    '& h1, & h2, & h3, & h4, & h5, & h6': {
                                                        marginTop: 0,
                                                        marginBottom: '0.5em',
                                                        lineHeight: 1.2,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        minHeight: '43px',
                                                    },
                                                    '& b, & strong': { fontWeight: 'bold', color: '#2c3e50'},
                                                    '& h1': { fontSize: '24px', color: '#2c3e50' },
                                                    '& h2': { fontSize: '20px', color: '#2c3e50' },
                                                    '& h3': { fontSize: '16px', color: '#34495e' },
                                                    '& h4': { fontSize: '13px', color: '#7f8c8d' },
                                                    '& h5': { fontSize: '10px', color: '#95a5a6' },
                                                    '& h6': { fontSize: '8px', color: '#bdc3c7' },
                                                    '& p, & ul, & ol, & li': {
                                                        marginTop: '0.5em',
                                                        marginBottom: '0.5em',
                                                        lineHeight: 1.5,
                                                    },
                                                    '& p': { textAlign: 'justify' },
                                                    '& ul, & ol': { paddingLeft: '1.5em' },
                                                    '& li': { marginBottom: '0.3em' },
                                                    '& code': {
                                                        backgroundColor: '#f0f0f0',
                                                        padding: '2px 4px',
                                                        borderRadius: '3px',
                                                        fontFamily: 'monospace',
                                                    },
                                                    '& pre': {
                                                        backgroundColor: '#f0f0f0',
                                                        padding: '1em',
                                                        borderRadius: '5px',
                                                        overflowX: 'auto',
                                                        '& code': {
                                                            backgroundColor: 'transparent',
                                                            padding: 0,
                                                        },
                                                    },
                                                    '& blockquote': {
                                                        borderLeft: '3px solid #ccc',
                                                        paddingLeft: '1em',
                                                        marginLeft: 0,
                                                        fontStyle: 'italic',
                                                    },
                                                    '& table': {
                                                        borderCollapse: 'collapse',
                                                        width: '100%',
                                                        marginTop: '0.5em',
                                                        marginBottom: '0.5em',
                                                    },
                                                    '& th, & td': {
                                                        border: '1px solid #ccc',
                                                        padding: '8px',
                                                        textAlign: 'left',
                                                    },
                                                    '& th': {
                                                        backgroundColor: '#f0f0f0',
                                                        fontWeight: 'bold',
                                                    },
                                                }}
                                            />
                                        )
                                    ) : (
                                        <Typography>Loading...</Typography>
                                    )}
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                                        <Box>
                                            <IconButton size="small" sx={{ color: 'grey.500', padding: '4px' }}>
                                                <ThumbUpAltOutlinedIcon fontSize="small" sx={{ fontSize: '1rem' }} />
                                            </IconButton>
                                            <IconButton size="small" sx={{ color: 'grey.500', padding: '4px' }}>
                                                <ThumbDownAltOutlinedIcon fontSize="small" sx={{ fontSize: '1rem' }} />
                                            </IconButton>
                                        </Box>
                                        <Box>
                                            <Button
                                                variant="contained"
                                                size="small"
                                                endIcon={<PictureAsPdfIcon />}
                                                onClick={() => handleSaveAsPDF(message.query)}
                                                disabled={!contentReady}
                                                sx={{
                                                    color: 'white',
                                                    backgroundColor: '#09779E',
                                                    marginRight: '8px',
                                                    '&:hover': {
                                                        backgroundColor: '#178195',
                                                    },
                                                    padding: '6px 12px',
                                                    fontSize: '14px',
                                                    textTransform: 'none',
                                                    fontFamily: 'Source Sans Pro',
                                                    fontWeight: 400,
                                                    lineHeight: '20px',
                                                    letterSpacing: '0%',
                                                    verticalAlign: 'middle',
                                                }}
                                            >
                                                Save as PDF
                                            </Button>
                                            <Button
                                                variant="contained"
                                                size="small"
                                                endIcon={<EmailIcon />}
                                                sx={{
                                                    color: 'white',
                                                    backgroundColor: '#09779E',
                                                    '&:hover': {
                                                        backgroundColor: '#178195',
                                                    },
                                                    padding: '6px 12px',
                                                    fontSize: '14px',
                                                    textTransform: 'none',
                                                    fontFamily: 'Source Sans Pro',
                                                    fontWeight: 400,
                                                    lineHeight: '20px',
                                                    letterSpacing: '0%',
                                                    verticalAlign: 'middle',
                                                }}
                                            >
                                                Send email
                                            </Button>
                                        </Box>
                                    </Box>
                                </Box>
                            )}
                        </Box>
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

export default ChatMessages;