# Performance Optimization Guide

## Current Bottlenecks (5+ seconds delay)

The delay breakdown is typically:
1. **Audio Upload**: Large WAV files (can be 1-5 MB for 10s recording)
2. **STT Processing**: Gemini speech-to-text (~1-2s)
3. **Tool Calling**: Database operations (~50-200ms)
4. **TTS Processing**: Gemini text-to-speech (~1-2s)
5. **Response Download**: Base64 encoded audio

## Frontend Optimizations (RECOMMENDED)

### 1. Use Compressed Audio Format ⚡ (BIGGEST IMPACT)

**Current:** Recording as WAV (uncompressed, ~1 MB for 10s)
**Better:** Use Opus or WebM format (~50 KB for 10s)

```typescript
// Frontend MediaRecorder configuration
const mediaRecorder = new MediaRecorder(stream, {
  mimeType: 'audio/webm;codecs=opus', // or 'audio/ogg;codecs=opus'
  audioBitsPerSecond: 16000 // Low bitrate for voice
});
```

**Expected improvement:** 2-3 seconds faster upload

### 2. Lower Sample Rate

**Current:** Probably 48kHz
**Better:** 16kHz is sufficient for voice

```typescript
const audioContext = new AudioContext({ sampleRate: 16000 });
```

**Expected improvement:** 500ms-1s faster

### 3. Shorter Recording Buffer

- Stop recording sooner (don't wait for silence)
- Send audio chunks while speaking (streaming - requires WebSocket)

## Backend Optimizations

### Already Implemented ✅
- Efficient WAV header generation
- Session management (avoids re-initialization)
- Direct base64 encoding

### Future Improvements (Optional)

#### 1. Add Audio Format Support

Update controller to accept compressed formats:

```typescript
// Backend accepts webm/opus
if (audioFile.mimetype === 'audio/webm' || audioFile.mimetype === 'audio/ogg') {
  // Gemini can handle these directly
}
```

#### 2. Parallel Processing (Limited benefit)

TTS can't start until STT completes, but we can optimize:

```typescript
// Pre-warm TTS model (if provider supports)
```

#### 3. WebSocket Implementation (Advanced)

For truly low latency (<1s), implement WebSocket streaming:
- Stream audio chunks during recording
- Get partial transcriptions
- Start TTS before user finishes speaking

## Monitoring

With the new logging, check:

```
🎤 Processing audio (1024.5 KB, audio/wav)
⏱️  STT took 1850ms
🔧 Executing tool: create_user_full_data
⏱️  Tool execution took 120ms
⏱️  Tool feedback to LLM took 1200ms
💬 AI Response: "Great! I've saved your information..."
⏱️  TTS took 1650ms (256.3 KB)
✅ Total processing time: 4820ms
```

**Target breakdown:**
- Upload: <500ms (with opus)
- STT: 1000-1500ms
- Tools: 100-300ms
- TTS: 1000-1500ms
- **Total: 2.5-3.5s**

## Quick Wins (Do These First)

1. **Frontend:** Use `audio/webm;codecs=opus` for MediaRecorder
2. **Frontend:** Set `audioBitsPerSecond: 16000`
3. **Frontend:** Use `sampleRate: 16000` in AudioContext
4. **Test:** Check the logs to see where time is being spent

## Expected Results

| Optimization | Time Saved |
|-------------|------------|
| Opus format | 2-3s |
| Lower sample rate | 0.5-1s |
| Total | **~3-4s reduction** |

**Target:** 2-3 seconds total (from current 5+ seconds)

