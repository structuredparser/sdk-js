# Structured Parser SDK for JS, TS & Node

Structured Parser is a platform that allows you to parse structured data from unstructured documents (e.g., PDF, DOCX, XLSX, CSV). This is the official SDK for JavaScript, TypeScript, and Node.js.

## Installation

```bash
npm install @structuredparser/sdk
```

## Usage

```typescript
import { StructuredParser } from '@structuredparser/sdk';

const parser = new StructuredParser({ apiKey: process.env.STRUCTURED_PARSER_API_KEY })

const job = await parser.start.fromUrl("https://example.com/candidate-resumes/mark-zuckerberg-cv.pdf")
```

*This SDK is a work in progress.*