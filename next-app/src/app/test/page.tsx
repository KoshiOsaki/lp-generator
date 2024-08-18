'use client';

import { Box, Button, Container, TextField } from '@mui/material';
import { useState } from 'react';

import { LpGenerateTestApiRequest, LpGenerateTestApiResponse } from '../api/lp-generate-test/route';

export default function TestPage() {
  const [prompt, setPrompt] = useState<string>('');
  const [response, setResponse] = useState<LpGenerateTestApiResponse | null>(null);

  const handleClaudeTest = async () => {
    const req: LpGenerateTestApiRequest = {
      question: prompt,
    };

    const res = await fetch('/api/lp-generate-test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req),
    });
    const data: LpGenerateTestApiResponse = await res.json();
    setResponse(data);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 4,
        }}
      >
        <TextField
          fullWidth
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="プロンプトを入力"
          variant="outlined"
          margin="normal"
        />
        <Button variant="contained" onClick={() => void handleClaudeTest()} sx={{ mt: 2 }}>
          claudeテスト
        </Button>
        {response && (
          <Box mt={4}>
            {response.content.map((message, index) => (
              <Box key={index}>{message.text as string}</Box>
            ))}
          </Box>
        )}
      </Box>
    </Container>
  );
}
