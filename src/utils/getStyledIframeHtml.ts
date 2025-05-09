export const getStyledIframeHtml = (htmlContent: string): string => {
    const docContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body {
              font-family: 'Source Sans Pro', Arial, sans-serif;
              padding: 0;
              margin: 0;
              color: #000;
            }
          h1, h2, h3, h4, h5, h6 {
        margin-top: 0;
        margin-bottom: 0.5em;
        line-height: 1.2;
        display: flex;
        align-items: center;
        min-height: 43px;
      }
      b, strong { font-weight: bold; color: #2c3e50; }
      h1 { font-size: 24px; color: #2c3e50; }
      h2 { font-size: 20px; color: #2c3e50; }
      h3 { font-size: 16px; color: #34495e; }
      h4 { font-size: 13px; color: #7f8c8d; }
      h5 { font-size: 10px; color: #95a5a6; }
      h6 { font-size: 8px; color: #bdc3c7; }
      p, ul, ol, li {
        margin-top: 0.5em;
        margin-bottom: 0.5em;
        line-height: 1.5;
      }
      p { text-align: justify; }
      ul, ol { padding-left: 1.5em; }
      li { margin-bottom: 0.3em; }
      code {
        background-color: #f0f0f0;
        padding: 2px 4px;
        border-radius: 3px;
        font-family: monospace;
      }
      pre {
        background-color: #f0f0f0;
        padding: 1em;
        border-radius: 5px;
        overflow-x: auto;
      }
      pre code {
        background-color: transparent;
        padding: 0;
      }
      blockquote {
        border-left: 3px solid #ccc;
        padding-left: 1em;
        margin-left: 0;
        font-style: italic;
      }
      table {
        border-collapse: collapse;
        width: 100%;
        margin-top: 0.5em;
        margin-bottom: 0.5em;
      }
      th, td {
        border: 1px solid #ccc;
        padding: 8px;
        text-align: left;
      }
      th {
        background-color: #f0f0f0;
        font-weight: bold;
      }
          </style>
        </head>
        <body>
          ${htmlContent}
        </body>
      </html>
    `;
    return docContent;
  };
  