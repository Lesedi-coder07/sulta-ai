# AI Chat Widget Documentation

## Overview
The AI Chat Widget is a customizable chat interface that can be embedded into web pages. It provides real-time interaction with an AI assistant powered by OpenAI's GPT models.

## Components

### 1. Frontend Widget (agent-widget.js)
The main frontend component implemented as a JavaScript class `AIAgentWidget` that handles:

This js file is located in the public folder and is accessable to the client via its url. It is responsible for rendering the chat widget UI, handling user interactions, and managing the chat history.

- Widget UI rendering and styling
- Message handling and display
- Chat interaction management
- API communication

Key features:
- Customizable positioning (bottom-right or bottom-left)
- Configurable primary color
- Typing indicators
- Message history tracking
- Responsive design

### 2. Backend API Routes

#### a. Embedded Prompt Handler (/api/LLM/openai/embedded-prompt/route.ts)
Handles chat message processing:
- Receives messages, prompts and system messages
- Communicates with OpenAI API
- Implements CORS headers for cross-origin requests
- Returns AI responses

#### b. Main OpenAI Handler (/api/LLM/openai/route.ts) 
Provides core OpenAI integration:
- Manages chat completions
- Handles system messages and user context
- Error handling and response formatting

## Integration Flow

1. Widget Initialization:
   - Client creates new `AIAgentWidget` instance with configuration
   - Widget renders on page and fetches initial system message
   
2. User Interaction:
   - User enters message
   - Frontend disables input and shows typing indicator
   - Message sent to backend API

3. Backend Processing:
   - API receives request with messages and context
   - Communicates with OpenAI
   - Returns formatted response

4. Response Display:
   - Widget receives response
   - Removes typing indicator
   - Displays AI message
   - Re-enables user input

## Usage
To use the widget, you need to include the `agent-widget.js` file in your HTML and initialize the `AIAgentWidget` class with the desired configuration.
```
<script src="https://your-domain.com/cdn/agent-widget.js"></script>
<div id="ai-widget-container"></div>
<script>
  const widget = new AIAgentWidget({ containerId: 'ai-widget-container' });
</script>
```
