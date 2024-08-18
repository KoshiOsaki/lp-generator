'use client';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
  AppBar,
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';

const NewProject = () => {
  const [projectName, setProjectName] = useState('');
  const [industry, setIndustry] = useState('');
  const [productGenre, setProductGenre] = useState('');
  const [additionalPrompt, setAdditionalPrompt] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // ここでフォームデータを処理します
    console.log({ projectName, industry, productGenre, additionalPrompt });
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
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          新規プロジェクト作成
        </Typography>
        <Paper elevation={3} sx={{ p: 3 }}>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="プロジェクト名"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              margin="normal"
              required
            />
            <Typography variant="body2" color="textSecondary" gutterBottom>
              公開時URL: {projectName ? `${projectName}.lp.raksul.com` : 'プロジェクト名を入力してください'}
            </Typography>
            <FormControl fullWidth margin="normal" required>
              <InputLabel>ターゲットとなる業種</InputLabel>
              <Select value={industry} onChange={(e) => setIndustry(e.target.value)}>
                <MenuItem value="飲食業">飲食業</MenuItem>
                <MenuItem value="小売業">小売業</MenuItem>
                <MenuItem value="サービス業">サービス業</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="商品ジャンル"
              value={productGenre}
              onChange={(e) => setProductGenre(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="追加したいプロンプト"
              value={additionalPrompt}
              onChange={(e) => setAdditionalPrompt(e.target.value)}
              margin="normal"
              multiline
              rows={4}
            />
            <Box
              sx={{
                border: '2px dashed grey',
                borderRadius: 2,
                p: 2,
                mt: 2,
                textAlign: 'center',
              }}
            >
              <input accept=".csv" style={{ display: 'none' }} id="csv-file" type="file" />
              <label htmlFor="csv-file">
                <Button variant="contained" component="span" startIcon={<CloudUploadIcon />}>
                  商品CSVアップロード
                </Button>
              </label>
            </Box>
            <Button variant="outlined" sx={{ mt: 2 }}>
              CSVテンプレートダウンロード
            </Button>
            <Box sx={{ mt: 3 }}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                プロジェクトを作成
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default NewProject;
