'use client';

import CodeIcon from '@mui/icons-material/Code';
import DownloadIcon from '@mui/icons-material/Download';
import EditIcon from '@mui/icons-material/Edit';
import ImageIcon from '@mui/icons-material/Image';
import PublishIcon from '@mui/icons-material/Publish';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Tab,
  Tabs,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';

const LPEditPreviewPage = () => {
  const [mode, setMode] = useState('edit');
  const [rightTab, setRightTab] = useState('prompt');
  const [selectedImage, setSelectedImage] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [generatedImages, setGeneratedImages] = useState([]);

  const handleModeChange = (event, newMode) => {
    if (newMode !== null) {
      setMode(newMode);
    }
  };

  const handleRightTabChange = (event, newValue) => {
    setRightTab(newValue);
  };

  const handleImageClick = (imageId) => {
    setSelectedImage(imageId);
    setRightTab('image');
  };

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleGenerate = () => {
    // Here you would typically call an API to generate new content
    console.log('Generating new content with prompt:', prompt);
  };

  const handlePublish = () => {
    // Here you would typically call an API to publish the LP
    console.log('Publishing LP');
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ cursor: 'pointer' }}
            as={Link}
            href="/projects"
            passHref
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            LP自動生成システム
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Grid container spacing={2}>
          {/* Left side: Edit/Preview area */}
          <Grid item xs={8}>
            <Paper elevation={3} sx={{ p: 2, minHeight: '80vh' }}>
              <ToggleButtonGroup value={mode} exclusive onChange={handleModeChange} aria-label="edit or preview mode">
                <ToggleButton value="edit" aria-label="edit mode">
                  <EditIcon /> Edit
                </ToggleButton>
                <ToggleButton value="preview" aria-label="preview mode">
                  <VisibilityIcon /> Preview
                </ToggleButton>
              </ToggleButtonGroup>
              <Box sx={{ mt: 2, height: '70vh', border: '1px solid #ccc' }}>
                {mode === 'edit' ? (
                  <div>
                    {/* Placeholder for editable content */}
                    <div
                      onClick={() => handleImageClick(1)}
                      style={{
                        width: 200,
                        height: 200,
                        backgroundColor: '#eee',
                        margin: 10,
                        display: 'inline-block',
                      }}
                    >
                      Clickable Image Placeholder
                    </div>
                    <Typography variant="body1" sx={{ m: 2 }} onClick={() => setRightTab('prompt')}>
                      Editable text content. Click to edit.
                    </Typography>
                  </div>
                ) : (
                  <iframe
                    src="about:blank"
                    style={{ width: '100%', height: '100%', border: 'none' }}
                    title="LP Preview"
                  >
                    {/* In a real implementation, this would be the actual LP preview */}
                  </iframe>
                )}
              </Box>
            </Paper>
          </Grid>

          {/* Right side: Prompt/Code/Image tabs */}
          <Grid item xs={4}>
            <Paper elevation={3} sx={{ p: 2, minHeight: '80vh' }}>
              <Tabs value={rightTab} onChange={handleRightTabChange} aria-label="right side tabs">
                <Tab label="Prompt" value="prompt" icon={<EditIcon />} />
                <Tab label="Code" value="code" icon={<CodeIcon />} />
                <Tab label="Image" value="image" icon={<ImageIcon />} />
              </Tabs>
              <Box sx={{ mt: 2 }}>
                {rightTab === 'prompt' && (
                  <>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      variant="outlined"
                      label="Prompt"
                      value={prompt}
                      onChange={handlePromptChange}
                    />
                    <Button variant="contained" onClick={handleGenerate} sx={{ mt: 2 }}>
                      Generate
                    </Button>
                  </>
                )}
                {rightTab === 'code' && (
                  <>
                    <Typography variant="body1" sx={{ mt: 2, mb: 2 }}>
                      HTML Code Viewer
                    </Typography>
                    <pre
                      style={{
                        backgroundColor: '#f5f5f5',
                        padding: 10,
                        overflowX: 'auto',
                      }}
                    >
                      {/* Placeholder for HTML code */}
                      {'<div>Your HTML code here</div>'}
                    </pre>
                    <Button variant="outlined" startIcon={<DownloadIcon />} sx={{ mt: 2 }}>
                      Download HTML
                    </Button>
                  </>
                )}
                {rightTab === 'image' && (
                  <>
                    <Typography variant="body1" sx={{ mt: 2, mb: 2 }}>
                      Image Generation
                    </Typography>
                    <TextField
                      fullWidth
                      multiline
                      rows={2}
                      variant="outlined"
                      label="Image Prompt"
                      value={prompt}
                      onChange={handlePromptChange}
                    />
                    <Button variant="contained" onClick={handleGenerate} sx={{ mt: 2, mb: 2 }}>
                      Generate Images
                    </Button>
                    <Grid container spacing={1}>
                      {generatedImages.map((img, index) => (
                        <Grid item xs={4} key={index}>
                          <img src={img} alt={`Generated ${index}`} style={{ width: '100%', height: 'auto' }} />
                        </Grid>
                      ))}
                    </Grid>
                    <Typography variant="body2" sx={{ mt: 2 }}>
                      Project Images
                    </Typography>
                    {/* Placeholder for project images */}
                    <div
                      style={{
                        height: 100,
                        backgroundColor: '#eee',
                        marginTop: 10,
                      }}
                    >
                      Project images would be listed here
                    </div>
                  </>
                )}
              </Box>
            </Paper>
          </Grid>
        </Grid>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" color="primary" startIcon={<PublishIcon />} onClick={handlePublish}>
            Publish
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default LPEditPreviewPage;
