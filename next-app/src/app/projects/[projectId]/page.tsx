'use client';

import CodeIcon from '@mui/icons-material/Code';
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
import { useEffect, useRef, useState } from 'react';

const LPEditPreviewPage = () => {
  const [mode, setMode] = useState('edit');
  const [rightTab, setRightTab] = useState('prompt');
  const [selectedImage, setSelectedImage] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  const shadowRootRef = useRef(null);

  useEffect(() => {
    setHtmlContent(MockHTMLString);
  }, []);

  useEffect(() => {
    if (mode === 'edit' && shadowRootRef.current) {
      const shadowRoot = shadowRootRef.current.shadowRoot || shadowRootRef.current.attachShadow({ mode: 'open' });

      // Extract body content from HTML string
      const bodyContent = htmlContent.match(/<body[^>]*>([\s\S]*)<\/body>/i)?.[1] || '';

      // Extract style content from HTML string
      const styleContent = htmlContent.match(/<style[^>]*>([\s\S]*)<\/style>/i)?.[1] || '';

      shadowRoot.innerHTML = `
        <style>
          ${styleContent}
          [contenteditable] {
            outline: 1px dashed #ccc;
          }
          [contenteditable]:hover {
            outline: 1px dashed #999;
          }
        </style>
        <div id="lp-content">${bodyContent}</div>
      `;

      // テキスト編集可能にする
      makeTextEditable(shadowRoot);

      // 画像クリックイベントを追加
      addImageClickEvents(shadowRoot);
    }
  }, [mode, htmlContent]);

  const makeTextEditable = (root) => {
    const editableElements = root.querySelectorAll('h1, h2, h3, h4, h5, h6, p');
    editableElements.forEach((el) => {
      el.contentEditable = true;
      el.addEventListener('blur', () => {
        updateHtmlContent(root);
      });
    });
  };

  const addImageClickEvents = (root) => {
    const images = root.querySelectorAll('img');
    images.forEach((img) => {
      img.style.cursor = 'pointer';
      img.addEventListener('click', () => {
        setSelectedImage(img.src);
        setRightTab('image');
      });
    });
  };

  const handleModeChange = (event, newMode) => {
    if (newMode !== null) {
      setMode(newMode);
    }
  };

  const handleRightTabChange = (event, newValue) => {
    setRightTab(newValue);
  };

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
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

  const renderEditableContent = () => {
    return <div ref={shadowRootRef} style={{ width: '100%', height: '100%' }}></div>;
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
          </Typography>{' '}
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
              <Box sx={{ mt: 2, height: '70vh', border: '1px solid #ccc', overflow: 'auto' }}>
                {mode === 'edit' ? (
                  renderEditableContent()
                ) : (
                  <iframe
                    srcDoc={htmlContent}
                    style={{ width: '100%', height: '100%', border: 'none' }}
                    title="LP Preview"
                  />
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
                      HTML Code
                    </Typography>
                    <TextField
                      fullWidth
                      multiline
                      rows={20}
                      variant="outlined"
                      value={htmlContent}
                      onChange={(e) => setHtmlContent(e.target.value)}
                    />
                  </>
                )}
                {rightTab === 'image' && (
                  <>
                    <Typography variant="body1" sx={{ mt: 2, mb: 2 }}>
                      Image Generation
                    </Typography>
                    {/* Image generation UI goes here */}
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

const MockHTMLString = `
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ワイン向け梱包資材特集 - 大切なワインを守る最高の選択</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;700&display=swap');
        
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        body {
            font-family: 'Noto Sans JP', sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f0e6ff;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        header {
            background-color: #6a4c93;
            color: #fff;
            padding: 10px 0;
        }
        nav ul {
            display: flex;
            justify-content: flex-end;
            list-style-type: none;
        }
        nav ul li {
            margin-left: 20px;
        }
        nav ul li a {
            color: #fff;
            text-decoration: none;
            font-size: 0.9rem;
        }
        .banner {
            background: linear-gradient(135deg, #8a5adc, #6a4c93);
            color: #fff;
            padding: 40px 20px;
            text-align: center;
            border-radius: 10px;
            margin: 20px 0;
        }
        .banner h2 {
            font-size: 2rem;
            margin-bottom: 10px;
        }
        .banner p {
            font-size: 1.2rem;
        }
        .section-title {
            font-size: 2rem;
            text-align: center;
            margin: 40px 0 30px;
            color: #6a4c93;
        }
        .products {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 30px;
            margin-top: 40px;
        }
        .product {
            background-color: #fff;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .product:hover {
            transform: translateY(-10px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
        }
        .product img {
            width: 100%;
            height: 200px;
            object-fit: cover;
        }
        .product-info {
            padding: 20px;
        }
        .product h3 {
            font-size: 1.3rem;
            margin-bottom: 10px;
            color: #6a4c93;
        }
        .product p {
            font-size: 0.9rem;
            color: #666;
            margin-bottom: 15px;
        }
        .product-cta {
            display: inline-block;
            background-color: #6a4c93;
            color: #fff;
            padding: 8px 15px;
            text-decoration: none;
            font-size: 0.9rem;
            border-radius: 5px;
            transition: background-color 0.3s ease;
        }
        .product-cta:hover {
            background-color: #8a5adc;
        }
        .features {
            margin-top: 80px;
            text-align: center;
            background-color: #fff;
            padding: 60px 0;
            border-radius: 10px;
        }
        .feature-list {
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
        }
        .feature {
            flex-basis: calc(33.333% - 30px);
            margin-bottom: 40px;
            padding: 20px;
            background-color: #f0e6ff;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            transition: transform 0.3s ease;
        }
        .feature:hover {
            transform: translateY(-5px);
        }
        .feature img {
            max-width: 80px;
            margin-bottom: 15px;
        }
        .feature h3 {
            font-size: 1.3rem;
            margin-bottom: 10px;
            color: #6a4c93;
        }
        .feature p {
            font-size: 0.9rem;
            color: #666;
        }
        footer {
            background-color: #6a4c93;
            color: #fff;
            text-align: center;
            padding: 20px 0;
            margin-top: 80px;
        }
        @media (max-width: 768px) {
            .feature {
                flex-basis: 100%;
            }
        }
    </style>
</head>
<body>
    <header>
        <nav class="container">
            <ul>
                <li><a href="#products">商品一覧</a></li>
                <li><a href="#features">特徴</a></li>
            </ul>
        </nav>
    </header>

    <main class="container">
        <div class="banner">
            <h2>ワイン向け梱包資材特集</h2>
            <p>人気商品をピックアップ</p>
        </div>

        <h2 id="products" class="section-title">商品ラインナップ</h2>
        <section class="products">
            <div class="product">
                <img src="https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="ワイン4本用 宅配段ボール" style="width:100%;height:200px;object-fit:cover;">
                <div class="product-info">
                    <h3>ワイン4本用 宅配段ボール</h3>
                    <p>4本のワインを安全に配送できる専用設計。丈夫な構造で大切なワインを守ります。</p>
                    <a href="#product-detail-1" class="product-cta">詳細を見る</a>
                </div>
            </div>
            <div class="product">
                <img src="https://images.unsplash.com/photo-1598306442928-4d90f32c6866?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="ワイン1本用 発泡スチロール" style="width:100%;height:200px;object-fit:cover;">
                <div class="product-info">
                    <h3>ワイン1本用 発泡スチロール</h3>
                    <p>1本のワインを確実に保護する高性能クッション材。温度変化にも強い設計です。</p>
                    <a href="#product-detail-2" class="product-cta">詳細を見る</a>
                </div>
            </div>
            <div class="product">
                <img src="https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="ワインボトル用 エアークッション" style="width:100%;height:200px;object-fit:cover;">
                <div class="product-info">
                    <h3>ワインボトル用 エアークッション</h3>
                    <p>柔軟性と保護性を兼ね備えたエアークッション。様々な形状のボトルに対応します。</p>
                    <a href="#product-detail-3" class="product-cta">詳細を見る</a>
                </div>
            </div>
            <div class="product">
                <img src="https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="ワイン2本用 ギフトボックス" style="width:100%;height:200px;object-fit:cover;">
                <div class="product-info">
                    <h3>ワイン2本用 ギフトボックス</h3>
                    <p>贈答用に最適な高級感あるデザイン。大切な方への贈り物を格調高く演出します。</p>
                    <a href="#product-detail-4" class="product-cta">詳細を見る</a>
                </div>
            </div>
        </section>

        <section id="features" class="features">
            <h2 class="section-title">商品の特徴</h2>
            <div class="feature-list">
                <div class="feature">
                    <div style="background-color: #6a4c93; width: 80px; height: 80px; margin: 0 auto 15px; border-radius: 50%;"></div>
                    <h3>最高レベルの安全性</h3>
                    <p>衝撃から大切なワインを守る高度な設計。輸送時のストレスを最小限に抑えます。</p>
                </div>
                <div class="feature">
                    <div style="background-color: #6a4c93; width: 80px; height: 80px; margin: 0 auto 15px; border-radius: 50%;"></div>
                    <h3>優れたコスト効率</h3>
                    <p>適切な素材選択と最適化された設計により、送料とコストを抑制します。</p>
                </div>
                <div class="feature">
                    <div style="background-color: #6a4c93; width: 80px; height: 80px; margin: 0 auto 15px; border-radius: 50%;"></div>
                    <h3>環境への深い配慮</h3>
                    <p>リサイクル可能な素材を使用し、環境負荷を最小限に抑えた製品です。</p>
                </div>
            </div>
        </section>
    </main>

    <footer>
        <p>&copy; 2024 ワイン向け梱包資材特集. All rights reserved.</p>
    </footer>
</body>
</html>
`;
