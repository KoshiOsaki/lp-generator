import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import {
  AppBar,
  Button,
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from '@mui/material';
import Link from 'next/link';

const ProjectList = () => {
  // ダミーデータ
  const projects = [
    {
      id: 1,
      name: 'ワイン梱包材LP',
      status: '公開',
      lastAccessed: '2024-08-18',
    },
    {
      id: 2,
      name: 'テニスラケット梱包材LP',
      status: '下書き',
      lastAccessed: '2024-08-17',
    },
  ];

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
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '20px',
          }}
        >
          <Button variant="contained" startIcon={<SettingsIcon />}>
            設定
          </Button>
          <Button variant="contained" color="primary" component={Link} href="/projects/new">
            + 新しいプロジェクト
          </Button>
        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>イメージ</TableCell>
                <TableCell>プロジェクト名</TableCell>
                <TableCell>公開ステータス</TableCell>
                <TableCell>最終アクセス</TableCell>
                <TableCell>操作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map((project) => (
                <TableRow
                  as={Link}
                  key={project.id}
                  sx={{
                    cursor: 'pointer',
                    '&:hover': { backgroundColor: '#f5f5f5' },
                  }}
                  href={`/projects/${project.id}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <TableCell>
                    <div
                      style={{
                        width: '50px',
                        height: '50px',
                        backgroundColor: '#ccc',
                      }}
                    ></div>
                  </TableCell>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>{project.status}</TableCell>
                  <TableCell>{project.lastAccessed}</TableCell>
                  <TableCell>
                    <IconButton aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default ProjectList;
