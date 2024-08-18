import { Box, Container, Typography } from '@mui/material';

export default function Home() {
  return (
    <Container
      maxWidth={false}
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ height: '100%' }}>
        <Typography variant="h4">開発がんばろう！！</Typography>
      </Box>
    </Container>
  );
}
