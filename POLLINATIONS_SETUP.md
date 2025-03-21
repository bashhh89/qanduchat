# Pollinations Integration for LibreChat

This guide explains how to properly configure Pollinations text models and image generation in LibreChat.

## Root Issues and Solutions

When integrating Pollinations with LibreChat, we encountered several challenges:

1. **Configuration Location**: Changes to `librechat.new.yaml` weren't being applied because the system uses `librechat.yaml`.
2. **Text Model Endpoint**: Using the wrong URL format for the Pollinations API.
3. **Image Generation**: Token limits were causing errors with image generation.
4. **Environment Variables**: Missing or incorrect environment variables for enabling custom endpoints.

## Step-by-Step Configuration

### 1. Edit the correct configuration file

Always make changes to `librechat.yaml`, not `librechat.new.yaml`.

### 2. Configure Pollinations Text Models

```yaml
- name: "pollinations"
  baseURL: "https://text.pollinations.ai/v1/chat/completions"
  apiKey: "pollinations"
  requestBuilder: {
    type: "openai",
    initialPrompt: "",
    mapMessage: "text",
    promptPrefix: ""
  }
  models:
    default:
      - "gemini"
      - "gemini-thinking" 
      - "openai"
      - "mistral"
      - "claude"
      - "claude-haiku"
      - "llama3"
      - "mixtral"
      - "qwen"
    fetch: false
  titleConvo: true
  titleModel: "mistral"
  modelDisplayLabel: "Pollinations"
  maxTokens: 8000
  maxOutputTokens: 2048
  contextWindow: 8000
```

**Key Points**:
- Use the OpenAI-compatible endpoint: `https://text.pollinations.ai/v1/chat/completions`
- Set up proper `requestBuilder` with `type: "openai"`
- List all desired models under `models.default`

### 3. Configure Pollinations Image Generation

```yaml
- name: "pollinations-image"
  baseURL: "https://pollinations.ai"
  apiKey: "none"
  promptPrefix: "Generate an image of"
  models:
    default:
      - "flux"
      - "turbo"
      - "flux-realism"
      - "any-dark"
      - "flux-anime"
      - "flux-3d"
    fetch: false
  titleConvo: true
  titleModel: "flux"
  modelDisplayLabel: "Pollinations Image"
  chatGptLabel: "Image Generator"
  maxTokens: 4096
  maxOutputTokens: 1024
  contextWindow: 4096
  responseProcessor: {
    type: "markdown",
    markdownTemplate: "![{{message}}](https://pollinations.ai/p/{{message}})"
  }
```

**Key Points**:
- Use the direct image endpoint: `https://pollinations.ai`
- Use a simple markdown template for image generation
- The URL format is `https://pollinations.ai/p/{{message}}`
- Keep token limits reasonably high (4096) to avoid token limit errors

### 4. Set Environment Variables

In `.env`, make sure you have:

```
# Enabling services
ENDPOINTS=openai,custom
```

This ensures that both OpenAI and custom endpoints (like Pollinations) are enabled.

## Troubleshooting

If models or image generation stops working:

1. **Check Logs**: Run `docker compose logs api --tail 300` to see any errors.
2. **Verify Configuration Loading**: Look for "Custom config file loaded" in the logs.
3. **Check Environment Variables**: Ensure `ENDPOINTS` includes `custom`.
4. **Restart Containers**: After any configuration changes, run:
   ```
   docker compose down; docker compose up -d
   ```
5. **Clear Browser Cache**: Completely refresh the browser page after configuration changes.

## URL Structure Reference

### Text Generation
- Format: `https://text.pollinations.ai/v1/chat/completions`
- This uses the OpenAI-compatible API endpoint

### Image Generation
- Format: `https://pollinations.ai/p/{prompt}`
- Example: `https://pollinations.ai/p/beautiful_sunset_mountains`
- Add parameters: `https://pollinations.ai/p/{prompt}?width=1024&height=1024&model=flux`

## Available Models

### Text Models
- gemini
- gemini-thinking
- openai
- mistral
- claude
- claude-haiku
- llama3
- mixtral
- qwen

### Image Models
- flux (default)
- turbo
- flux-realism
- any-dark
- flux-anime
- flux-3d

## Common Errors

1. **Token Limit Errors**: If you get "The latest message token count is too long, exceeding the token limit", try reducing token limits or using a simpler responseProcessor.

2. **API Connection Issues**: If the API isn't responsive, check your internet connection and verify the Pollinations service is operational.

3. **Model Not Found**: Make sure the model you're trying to use is listed in the models configuration. 