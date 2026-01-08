# Neurio Home Backend 🚀

A Node.js backend built with TypeScript, Express, and MongoDB, powering AI-driven voice interactions.

## 🛠️ Tech Stack

- **Runtime**: Node.js (v20+)
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB
- **AI Services**: Google Gemini (STT & LLM), OpenAI (TTS)
- **Deployment**: Render.com & MongoDB Atlas

---

## 💻 Local Setup

Follow these steps to get the project running on your local machine.

### 1. Clone the Repository
```bash
git clone https://github.com/NikolozR/neurio-home-back.git
cd neurio-home-back
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory and fill in the following values (refer to `.env.example`):

```env
# Server
PORT=4000
NODE_ENV=development

# Database
MONGODB_URI=your_mongodb_connection_string

# AI API Keys
GEMINI_API_KEY=your_google_gemini_key
OPENAI_API_KEY=your_openai_key

# API Configuration
CORS_ORIGIN=*
API_VERSION=v1
```

### 4. Run the Project

**Development Mode (with auto-reload):**
```bash
npm run dev
```

**Production Build:**
```bash
npm run build
npm start
```

---

## 📡 API Endpoints

### Voice Processing
- `POST /api/v1/voice`: Uploads an audio file, processes it through Gemini, and returns AI response data.

### User Management
- `GET /api/v1/users`: List all users.
- `GET /api/v1/users/email/:email`: Find user by email.
- `DELETE /api/v1/users/:id`: Remove a user.

---

## ⚙️ How It Works

The core of the system is the **Voice Processing Pipeline**, which handles the transition from user speech to AI action and back to speech.

### 1. The Voice Pipeline (`POST /api/v1/voice`)
When an audio file is uploaded:
1. **STT & Intent Recognition**: The audio is sent to **Google Gemini**. Gemini performs Speech-to-Text and simultaneously analyzes the intent of the user.
2. **Autonomous Tool Execution**: If Gemini decides it needs to perform an action (like "save user details"), it triggers a **Function Call**. 
   - The backend catches this, executes the corresponding local logic (e.g., interacting with **MongoDB**), and sends the result back to Gemini.
3. **Reasoning**: Gemini receives the tool result, "thinks," and generates a final natural language response.
4. **TTS (Text-to-Speech)**: The final text is sent to **OpenAI TTS**, which generates a high-quality voice response.
5. **Response**: The client receives both the text and the audio (as base64) in a single JSON response.

### 2. Session Management
The system uses a `sessionId` (passed in headers or body) to maintain conversation context. This allows Gemini to "remember" previous parts of the conversation, making the interaction feel natural rather than like isolated commands.

### 3. Tool System
The backend defines strict JSON schemas for "Tools". These are shared with Gemini so it knows exactly what functions it can call (e.g., `save_user_data`) and what arguments they require.

---

## 🧠 Design Decisions & Journey

This project was developed during a particularly intense period—the **Christmas holidays combined with university finals**. Because of this, my primary goal at the start was to build a **functional, stable, and simple foundation** using a classic **REST API** architecture.

### REST vs. WebSockets
As the development progressed, I realized the potential for **real-time streaming** communication. Integrating WebSockets would allow for faster, lower-latency interactions between the LLM and the user, especially for voice-based experiences where every millisecond counts.

### The Final Choice
Despite the realization that a streaming/WebSocket approach would be "better" and "faster" for a production-scale voice assistant:
1. **Stability First**: I chose to stick with the current **REST-based implementation** to ensure reliability within the limited time I had during my exams.
2. **Predictability**: The REST approach provided a more predictable debugging environment while working with complex AI integrations (Gemini + OpenAI).
3. **Future Scalability**: The current architecture is decoupled enough that migrating to WebSockets or adding streaming support is a clear next step for the next version.

---