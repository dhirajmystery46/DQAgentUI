
        const welcmMessg = document.querySelector('.welcome-message');
        const chatMessages = document.querySelector('.chat-messages');
        const chatInput = document.querySelector('.chat-input textarea');
        const sidebar = document.querySelector('.sidebar');
        const newChatBtn = document.getElementById('newChatBtn');
        const chatHistory = document.getElementById('chatHistory');
        let latestMessage = null;
        let currentChatId = null;
        let chats = JSON.parse(localStorage.getItem('chats')) || {};
    
//         function addMessage(text, isUser = false, save = true) {
//     const messageDiv = document.createElement('div');
//     messageDiv.className = isUser ? 'message user' : 'message system';

//     const contentDiv = document.createElement('div');
//     contentDiv.className = 'message-content';

//     if (!isUser) {
//         const messageWrapper = document.createElement('div');
//         messageWrapper.className = 'message-wrapper';

//         // Create the first table from response.answer
//         const answerTable = document.createElement('div');
//         answerTable.className = 'message-content';
//         answerTable.innerHTML = text.answer;
//         messageWrapper.appendChild(answerTable);

//         const actionDiv = document.createElement('div');
//         actionDiv.className = 'message-actions';
//         actionDiv.innerHTML = `
//             <button class="action-btn copy-btn" title="Copy">📋</button>
//             <button class="action-btn report-btn" onclick="generateExcel.call(this)"><span style="color: red;"><img src="static/save.jpg" alt="save" class="save-logo"></span></button>
//         `;
//         messageWrapper.appendChild(actionDiv);
//         if(text?.suggestion){
//         // Create the second table from response.suggestion
//         const suggestionWrapper = document.createElement('div');
//         suggestionWrapper.className = 'message2-wrapper';

//         const suggestionHeader = document.createElement('div');
//         suggestionHeader.innerHTML = `
//             <div><br>  DQ Execution Agent has prepared the recommended suggestions based on combined knowledge: <br><br></div>
//         `;
//         suggestionWrapper.appendChild(suggestionHeader);

//         const suggestionTable = document.createElement('div');
//         suggestionTable.className = 'message2-content';
//         suggestionTable.innerHTML = text.suggestion;
//         suggestionWrapper.appendChild(suggestionTable);

//         const suggestionActions = document.createElement('div');
//         suggestionActions.className = 'message2-actions';
//         suggestionActions.innerHTML = `
//             <button class="action-btn copy-btn" title="Copy">📋</button>
//             <button class="action-btn report-btn" onclick="generateExcel.call(this)"><span style="color: red;"><img src="static/save.jpg" alt="save" class="save-logo"></span></button>
//         `;
//         suggestionWrapper.appendChild(suggestionActions);

//         messageWrapper.appendChild(suggestionWrapper); 
//         }
//         messageDiv.appendChild(messageWrapper);
//     } else {
//         contentDiv.textContent = text;
//         messageDiv.appendChild(contentDiv);
//     }

//     chatMessages.appendChild(messageDiv);
//     chatMessages.scrollTop = chatMessages.scrollHeight;

//     if (currentChatId && save) {
//         if (!chats[currentChatId].messages.some(msg => msg.content === text)) {
//             chats[currentChatId].messages.push({ role: isUser ? 'user' : 'system', content: text });
//             saveChats();
//         }
//     }
// }

// function addMessage(response, isUser = false, save = true) {
//     const messageDiv = document.createElement('div');
//     messageDiv.className = isUser ? 'message user' : 'message system';

//     if (isUser) {
//         const contentDiv = document.createElement('div');
//         contentDiv.className = 'message-content';
//         contentDiv.textContent = response;
//         messageDiv.appendChild(contentDiv);
//     } else {
//         const parsedResponse = typeof response === 'string' ? JSON.parse(response) : response;
        
//         // Task and Plan
//         // const infoDiv = document.createElement('div');
//         // infoDiv.innerHTML = `<strong>Task:</strong> ${parsedResponse.task}<br><strong>Plan:</strong> ${parsedResponse.plan}`;
//         // messageDiv.appendChild(infoDiv);

//         // Analysis expander
//         const analysisExpander = createExpander("Analysis", createTable(parsedResponse.results.analyze.data));
//         messageDiv.appendChild(analysisExpander);

//         // Summary expander
//         const summaryExpander = createExpander("Summary", createTable(parsedResponse.summary.data));
//         messageDiv.appendChild(summaryExpander);

//         // Suggestion expander
//         const suggestionExpander = createExpander("Suggestion", beautifyText(parsedResponse.final_result));
//         messageDiv.appendChild(suggestionExpander);

        
//     }

//     chatMessages.appendChild(messageDiv);
//     chatMessages.scrollTop = chatMessages.scrollHeight;

//     if (currentChatId && save) {
//         if (!chats[currentChatId].messages.some(msg => msg.content === JSON.stringify(response))) {
//             chats[currentChatId].messages.push({ role: isUser ? 'user' : 'system', content: JSON.stringify(response) });
//             saveChats();
//         }
//     }
// }

// function createExpander(title, content) {
//     const expander = document.createElement("details");
//     const summary = document.createElement("summary");
//     summary.textContent = title;
//     // Action buttons
//     const actionDiv = document.createElement('div');
//     actionDiv.className = 'message-actions';
//     actionDiv.innerHTML = `
//         <button class="action-btn copy-btn" title="Copy">📋</button>
//         <button class="action-btn report-btn" onclick="generateExcel.call(this)"><span style="color: red;"><img src="static/save.jpg" alt="save" class="save-logo"></span></button>
//     `;
    
//     expander.appendChild(summary);
//     expander.appendChild(content);
//     expander.appendChild(actionDiv);
//     return expander;
// }

// function createTable(data) {
//     const table = document.createElement("table");
//     table.style.width = "100%";
//     table.style.borderCollapse = "collapse";

//     for (const [key, value] of Object.entries(data)) {
//         const row = table.insertRow();
//         const cell1 = row.insertCell(0);
//         const cell2 = row.insertCell(1);
//         cell1.textContent = key;
//         cell2.textContent = value;
//         cell1.style.border = "1px solid #ddd";
//         cell2.style.border = "1px solid #ddd";
//         cell1.style.padding = "8px";
//         cell2.style.padding = "8px";
//     }

//     return table;
// }

// function beautifyText(text) {
//     const div = document.createElement("div");
//     div.style.whiteSpace = "pre-wrap";
//     div.style.wordWrap = "break-word";
//     div.style.padding = "10px";
//     div.style.backgroundColor = "#f5f5f5";
//     div.style.borderRadius = "5px";
//     div.textContent = text;
//     return div;
// }


function addMessage(response, isUser = false, save = true) {
    const messageDiv = document.createElement('div');
    messageDiv.className = isUser ? 'message user' : 'message system';

    if (isUser) {
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.textContent = response;
        messageDiv.appendChild(contentDiv);
    } else {
        console.log('Received response:', response);
        if(response.final_result ==  null){
            const infoDiv = document.createElement('div');
            infoDiv.className = 'message-content';
            infoDiv.innerHTML = `${response.plan}`;
            infoDiv.style.backgroundColor = "whitesmoke";
            messageDiv.appendChild(infoDiv);
        } else{
        // console.log(typeof response);
        const parsedResponse = typeof response === 'string' ? JSON.parse(response) : response;
        
        // // Task and Plan
        const infoDiv = document.createElement('div');
        infoDiv.className = 'expander-container';
        // infoDiv.innerHTML = `<strong>Task:</strong> ${parsedResponse.task}<br><strong>Plan:</strong> ${parsedResponse.plan}`;
        // messageDiv.appendChild(infoDiv);

        // Analysis expander
        const analysisExpander = createExpander("Analysis", createTable(parsedResponse.results.analyze.data));
        analysisExpander.style.marginBottom = "10px"; // Add space between expanders
        // analysisExpander.style.padding = "10px"; // Add padding to the message div
        infoDiv.appendChild(analysisExpander);
        
        // Summary expander
        if(parsedResponse.summary != null && parsedResponse.summary != undefined && parsedResponse.summary != ""){
        const summaryExpander = createExpander("Summary", createTable(parsedResponse.summary.data));
        summaryExpander.style.marginBottom = "10px"; // Add space between expanders
        // summaryExpander.style.padding = "10px"; // Add padding to the message div
        infoDiv.appendChild(summaryExpander);
        }
        
        // Suggestion expander
        const suggestionExpander = createExpander("Suggestion", beautifyText(parsedResponse.final_result));
        infoDiv.appendChild(suggestionExpander);
        messageDiv.appendChild(infoDiv);

        } 
    }

    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    if (currentChatId && save) {
        if (!chats[currentChatId].messages.some(msg => msg.content === JSON.stringify(response))) {
            chats[currentChatId].messages.push({ role: isUser ? 'user' : 'system', content: JSON.stringify(response) });
            saveChats();
        }
    }
}

// function createExpander(title, content) {
//     const expander = document.createElement("details");
//     const summary = document.createElement("summary");
//     summary.textContent = title;
//     // Action buttons
//     const actionDiv = document.createElement('div');
//     actionDiv.className = 'message-actions';
//     actionDiv.innerHTML = `
//         <button class="action-btn copy-btn" title="Copy">📋</button>
//         <button class="action-btn report-btn" onclick="generateExcel.call(this)"><span style="color: red;"><img src="static/save.jpg" alt="save" class="save-logo"></span></button>
//     `;
    
//     expander.appendChild(summary);
//     expander.appendChild(content);
//     expander.appendChild(actionDiv);
//     return expander;
// }

function createExpander(title, content) {
    const expander = document.createElement('div');
    expander.className = 'expander';
  
    const header = document.createElement('div');
    header.className = 'expander-header';
    header.innerHTML = `
      <span>${title}</span>
      <span class="expander-icon">▼</span>
    `;
  
    const contentDiv = document.createElement('div');
    contentDiv.className = 'expander-content';
    contentDiv.appendChild(content);
  
    expander.appendChild(header);
    expander.appendChild(contentDiv);
  
    header.addEventListener('click', () => {
      expander.classList.toggle('active');
    });
  
    return expander;
  }

// function createTable(data) {
//     if (!Array.isArray(data) || data.length === 0) {
//         return document.createTextNode("No data available");
//     }

//     const table = document.createElement("table");
//     table.style.width = "100%";
//     table.style.borderCollapse = "collapse";

//     // Create header row
//     const headerRow = table.insertRow();
//     for (const key of Object.keys(data[0])) {
//         const th = document.createElement("th");
//         th.textContent = key;
//         th.style.border = "1px solid #ddd";
//         th.style.padding = "8px";
//         th.style.backgroundColor = "#f2f2f2";
//         headerRow.appendChild(th);
//     }

//     // Create data rows
//     for (const item of data) {
//         const row = table.insertRow();
//         for (const key of Object.keys(item)) {
//             const cell = row.insertCell();
//             cell.textContent = item[key];
//             cell.style.border = "1px solid #ddd";
//             cell.style.padding = "8px";
//         }
//     }

//     return table;
// }

function createTable(data, itemsPerPage = 10) {
    if (!Array.isArray(data) || data.length === 0) {
        return document.createTextNode("No data available");
    }

    const tableContainer = document.createElement("div");
    tableContainer.style.maxHeight = "300px"; // Adjust as needed
    tableContainer.style.overflowY = "auto";
    tableContainer.style.width = "100%";

    const table = document.createElement("table");
    table.style.width = "100%";
    table.style.borderCollapse = "collapse";

    // Create header row
    const headerRow = table.insertRow();
    for (const key of Object.keys(data[0])) {
        const th = document.createElement("th");
        th.textContent = key;
        th.style.border = "1px solid #ddd";
        th.style.padding = "8px";
        th.style.backgroundColor = "#f2f2f2";
        th.style.position = "sticky";
        th.style.top = "0";
        headerRow.appendChild(th);
    }

    function renderPage(pageNum) {
        // Clear existing rows
        while (table.rows.length > 1) {
            table.deleteRow(1);
        }

        // Create data rows for the current page
        const startIndex = (pageNum - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, data.length);

        for (let i = startIndex; i < endIndex; i++) {
            const item = data[i];
            const row = table.insertRow();
            for (const key of Object.keys(item)) {
                const cell = row.insertCell();
                cell.textContent = item[key];
                cell.style.border = "1px solid #ddd";
                cell.style.padding = "8px";
            }
        }
    }

    // Create pagination controls
    const paginationContainer = document.createElement("div");
    paginationContainer.style.marginTop = "10px";
    const totalPages = Math.ceil(data.length / itemsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement("button");
        pageButton.textContent = i;
        pageButton.onclick = () => renderPage(i);
        paginationContainer.appendChild(pageButton);
    }

    tableContainer.appendChild(table);
    renderPage(1); // Render the first page initially

    const wrapper = document.createElement("div");
    wrapper.appendChild(tableContainer);
    wrapper.appendChild(paginationContainer);

    return wrapper;
}

function beautifyText(text) {
    const div = document.createElement("div");
    div.style.whiteSpace = "pre-wrap";
    div.style.wordWrap = "break-word";
    div.style.padding = "10px";
    div.style.backgroundColor = " #3b3a3a";
    div.style.borderRadius = "5px";
    div.style.maxHeight = "300px"; // Set a maximum height
    div.style.overflow = "auto"; // Add scrollbar when content exceeds maxHeight
    div.style.color = "white"; // Add text color for better visibility
    div.textContent = text;
    return div;
}
        async function sendMessage() {
            const message = chatInput.value.trim();
    if (message) {
        console.log('Sending message:', message);
        if (!currentChatId) {
            createNewChat(message);
        }
        addMessage(message, true);
        chatInput.value = '';
                
                const loadingContainer = document.createElement('div');
loadingContainer.className = 'message system loading-container';
loadingContainer.innerHTML = `
    <div class="loading-spinner"></div>
    <div class="loading-text">Searching through the database...</div>
`;
                chatMessages.appendChild(loadingContainer);
                chatMessages.scrollTop = chatMessages.scrollHeight;

                const loadingTexts = [
                    "Searching through the database...",
                    "Querying the database...",
                    "Analyzing results...",
                    "Preparing response..."
                ];
                let textIndex = 0;

                const textInterval = setInterval(() => {
                    loadingContainer.querySelector('.loading-text').textContent = loadingTexts[textIndex];
                    textIndex = (textIndex + 1) % loadingTexts.length;
                }, 1000);

                try {
            console.log('Calling createChatCompletion');
            const response = await createChatCompletion(message);
            console.log('Received response:', response.answer);
            console.log('Received suggestion:', response.suggestion);
            // Remove loading animation
            clearInterval(textInterval);
            loadingContainer.remove();
            
            addMessage(response);
                } catch (error) {
                    // Remove loading animation
                    clearInterval(textInterval);
                    loadingContainer.remove();
                    
                    addMessage("Sorry, there was an error processing your request.");
                    console.error('Error:', error);
                }
            }
        }

        function askQuestion(question) {
            chatInput.value = question;
            sendMessage();
        }
        function navigateToFixPage() {
    // Navigate to the fix page
    // window.location.href = '/fix-page';
    console.log(latestMessage);
    const messageWrapper = this.closest('.message2-wrapper');
    const suggestionContent = messageWrapper.querySelector('.message2-content').innerHTML;
    // const suggestionWrapper = messageWrapper.nextElementSibling;
    // const suggestionContent = suggestionWrapper ? suggestionWrapper.querySelector('.message2-content').innerHTML : '';

    fetch('/api/fix', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ suggestion: suggestionContent , latestMessage: latestMessage})
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert('Table updated successfully');
            // Open chat with the last message
            // const lastMessage = data.latest_message;
            // chatInput.value = lastMessage;
            // sendMessage();
            // Create a new div to show the table
// Create the second table from response.suggestion
            const newWrapper = document.createElement('div');
            newWrapper.className = 'new-wrapper';

            const newHeader = document.createElement('div');
            newHeader.innerHTML = `<div><br>         Based on your input the <b>DQ Execution Agent</b> has applied the recommended corrections to Property Hub data.
                This is how your data looks after you applied changes. <br><br></div>`;
            newWrapper.appendChild(newHeader);

            const newTableDiv = document.createElement('div');
            newTableDiv.className = 'new-table-wrapper';
            newTableDiv.innerHTML = data.new_table;
            
            newWrapper.appendChild(newTableDiv);
            const newline = document.createElement('div');
            newline.innerHTML = `<button class="action-btn copy-btn" title="Copy">📋</button>
                <div><br></div>
            `;
            newWrapper.appendChild(newline);

            // Append the new div to the chat messages or any other desired location
            chatMessages.appendChild(newWrapper);
            chatMessages.scrollTop = chatMessages.scrollHeight;
             // Change the opacity of elements with the class 'part2nd' to 1
            document.querySelectorAll('.part2nd').forEach(element => {
                element.style.opacity = '1';
            });

        } else {
            alert('Error updating table: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error updating table');
    });

}


function generateExcel() {
    // Get the content of the current message
    const messageWrapper = this.closest('.message-wrapper');
    const answerContent = messageWrapper.querySelector('.message-content');
    const suggestionWrapper = messageWrapper.nextElementSibling;
    const suggestionContent = suggestionWrapper ? suggestionWrapper.querySelector('.message-content') : null;

    // Create a new workbook
    const wb = XLSX.utils.book_new();

    // Function to convert HTML table to worksheet
    function html_to_sheet(element) {
        const table = element.querySelector('table');
        if (table) {
            return XLSX.utils.table_to_sheet(table);
        } else {
            // If no table, create a sheet with the text content
            return XLSX.utils.aoa_to_sheet([[element.textContent]]);
        }
    }

    // Create worksheets from the HTML content
    const wsAnswer = html_to_sheet(answerContent);
    XLSX.utils.book_append_sheet(wb, wsAnswer, "Answer");

    if (suggestionContent) {
        const wsSuggestion = html_to_sheet(suggestionContent);
        XLSX.utils.book_append_sheet(wb, wsSuggestion, "Suggestion");
    }

    // Generate Excel file
    XLSX.writeFile(wb, 'report.xlsx');
}
function generatePDF() {
    // Get the content of the current message
    const messageWrapper = this.closest('.message-wrapper');
    const answerContent = messageWrapper.querySelector('.message-content').innerHTML;
    const suggestionWrapper = messageWrapper.nextElementSibling;
    const suggestionContent = suggestionWrapper ? suggestionWrapper.querySelector('.message-content').innerHTML : '';

    // Create a new jsPDF instance
    const pdf = new jsPDF();

    // Add content to the PDF
    pdf.fromHTML(answerContent, 15, 15);
    if (suggestionContent) {
        pdf.addPage();
        pdf.fromHTML(suggestionContent, 15, 15);
    }

    // Save the PDF
    pdf.save('report.pdf');
}

        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    
        chatInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    
        document.addEventListener('click', function(e) {
    if (e.target.classList.contains('report-btn')) {
        // Handle report button click
        console.log('Report button clicked');
        // You can add your report functionality here
        alert('Report functionality will be implemented here.');
    } 
});
        function createNewChat(firstMessage) {
            const chatId = Date.now().toString();
            currentChatId = chatId;
            chats[chatId] = {
                id: chatId,
                name: firstMessage,
                messages: []
            };
            saveChats();
            updateChatHistory();
        }
    
        function saveChats() {
            localStorage.setItem('chats', JSON.stringify(chats));
        }
    
        function updateChatHistory() {
    chatHistory.innerHTML = '';
    Object.values(chats).forEach(chat => {
        const chatElement = document.createElement('div');
        chatElement.className = 'history-item';
        
        const chatName = document.createElement('span');
        chatName.textContent = chat.name;
        chatName.onclick = () => loadChat(chat.id);
        
        const deleteButton = document.createElement('span');
        deleteButton.className = 'delete-chat';
        deleteButton.innerHTML = '&times;'; // This creates an "×" symbol
        deleteButton.onclick = (e) => {
            e.stopPropagation();
            deleteChat(chat.id);
        };
        
        chatElement.appendChild(chatName);
        chatElement.appendChild(deleteButton);
        chatHistory.appendChild(chatElement);
    });
}
    
        function loadChat(chatId) {
            currentChatId = chatId;
            chatMessages.innerHTML = '';
            chats[chatId].messages.forEach(msg => {
                addMessage(msg.content, msg.role === 'user', false);
            });
        }

        function formatResponse(text) {
    // Replace code blocks with syntax-highlighted versions
    text = text.replace(/```(\w+)?\n([\s\S]*?)```/g, function(match, language, code) {
        language = language || 'plaintext';
        return `<pre><code class="language-${language}">${escapeHtml(code.trim())}</code></pre>`;
    });

    // Format inline code
    text = text.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Convert newlines to <br> tags
    text = text.replace(/\n/g, '<br>');

    return text;
}
async function createChatCompletion(message) {
    try {
        console.log('Sending request to server...');
        latestMessage = message;
        const response = await fetch('http://127.0.0.1:8000/DQ_Agent/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ task: message }),
        });
        console.log('Received response from server:', response);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Parsed response data:', data);
        return data;
    } catch (error) {
        console.error('Error creating chat completion:', error);
        throw error;
    }
}

async function createdqCompletion() {
    try {
        console.log('Sending request to server...');
        latestMessage = 'message';
        const response = await fetch('http://127.0.0.1:8000/DQ_Agent/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ task: "Run DQ Check for all rules in property hub" }),
        });
        console.log('Received response from server:', response);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Parsed response data:', data);
        return data;
    } catch (error) {
        console.error('Error creating chat completion:', error);
        throw error;
    }
}

function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
}
        function deleteChat(chatId) {
            delete chats[chatId];
            saveChats();
            updateChatHistory();
            if (currentChatId === chatId) {
                currentChatId = null;
                chatMessages.innerHTML = '';
                chatInput.value = '';
                showWelcomeMessage();
            }
        }
    
        function showWelcomeMessage() {
            welcmMessg.innerHTML = `
            <div class="welcome-content">
            <p><b>REMS Agentic AI: Data Governance Agents Team.👋</b><br><br>
            <p class="part1st">     1. DQ Analytical Agent performs data quality checks following earlier defined set of rules and identifies data issues.<br>
                                    2. DQ Execution Agent creates necessary data change recommendations and obtains approval to act from Data Governance stakeholders. 
            </p> 
            </p>
        </div>
        <button id="newChatBtn-2" onclick="runDQCheck()">Run DQ Check for all rules</button>
    `;
}
        function displayTable(tableData) {
    const outerContainer = document.createElement('div');
    outerContainer.style.maxWidth = '800px';
    outerContainer.style.margin = '0 auto';

    const tableContainer = document.createElement('div');
    tableContainer.className = 'table-container';

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    // Create table header
    const headerRow = document.createElement('tr');
    Object.keys(tableData.data[0]).forEach(key => {
        const th = document.createElement('th');
        th.textContent = key.replace(/_/g, ' ');
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);
    table.appendChild(tbody);

    // Pagination variables
    const rowsPerPage = 7;
    let currentPage = 1;
    const totalPages = Math.ceil(tableData.data.length / rowsPerPage);

    function displayTablePage(page) {
        tbody.innerHTML = '';
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const pageData = tableData.data.slice(start, end);

        pageData.forEach(row => {
            const tr = document.createElement('tr');
            Object.values(row).forEach(value => {
                const td = document.createElement('td');
                td.textContent = value;
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });
    }

    function updatePagination() {
        paginationDiv.innerHTML = `
            <button ${currentPage === 1 ? 'disabled' : ''} onclick="changePage(${currentPage - 1})">←</button>
            <span>Page ${currentPage} of ${totalPages}</span>
            <button ${currentPage === totalPages ? 'disabled' : ''} onclick="changePage(${currentPage + 1})">→</button>
        `;
    }

    // Initial display
    displayTablePage(currentPage);

    // Create pagination controls
    const paginationDiv = document.createElement('div');
    paginationDiv.className = 'pagination';
    updatePagination();

    // Add table to table container
    tableContainer.appendChild(table);

    // Add table container and pagination to outer container
    outerContainer.appendChild(tableContainer);
    outerContainer.appendChild(paginationDiv);

    // Add outer container to chat messages
    return outerContainer;
}
function toggleWelcomeMessage() {
    const welcomeMessage = document.querySelector('.welcome-message');
    welcomeMessage.classList.toggle('expanded');
}
    
        newChatBtn.addEventListener('click', () => {
            currentChatId = null;
            chatMessages.innerHTML = '';
            chatInput.value = '';
            showWelcomeMessage();
        });
    
        updateChatHistory();
        
        
        if (!currentChatId) {
            showWelcomeMessage();
        }

        let isResizing = false;
        sidebar.addEventListener('mousedown', (e) => {
            if (e.offsetX > sidebar.offsetWidth - 11) {
                isResizing = true;
            }
        });
    
        document.addEventListener('mousemove', (e) => {
            if (!isResizing) return;
            sidebar.style.width = e.clientX + 'px';
        });
    
        document.addEventListener('mouseup', () => {
            isResizing = false;
        });

        async function runDQCheck() {
           
			if (!currentChatId) {
            createNewChat('Running all DQ Checks');
        }
           
           
             addMessage('Running all DQ Checks', true);
        chatInput.value = '';
                
                const loadingContainer = document.createElement('div');
loadingContainer.className = 'message system loading-container';
loadingContainer.innerHTML = `
    <div class="loading-spinner"></div>
    <div class="loading-text">Searching through the database...</div>
`;
                chatMessages.appendChild(loadingContainer);
                chatMessages.scrollTop = chatMessages.scrollHeight;

                const loadingTexts = [
                    "Searching through the database...",
                    "Querying the database...",
                    "Analyzing results...",
                    "Preparing response..."
                ];
                let textIndex = 0;

                const textInterval = setInterval(() => {
                    loadingContainer.querySelector('.loading-text').textContent = loadingTexts[textIndex];
                    textIndex = (textIndex + 1) % loadingTexts.length;
                }, 1000);

                try{
            console.log('Calling createChatCompletion');
            const streamingResponse = await createdqCompletion();
            console.log('Received response:', streamingResponse.answer);
            console.log('Received suggestion:', streamingResponse.suggestion);
            // Remove loading animation
            clearInterval(textInterval);
            loadingContainer.remove();
            
            addMessage(streamingResponse);
                } catch (error) {
                    // Remove loading animation
                    clearInterval(textInterval);
                    loadingContainer.remove();
                    console.error('Error:', error);
                    addMessage("Sorry, there was an error processing your request.");
                    
                }


            
        }
