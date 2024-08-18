'use client';
// Cloud Storageの
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';

export default function Images() {
  const [image, setImage] = useState<string | null>(null);
  // prismaからfetchした値を使って画像を取得する
  const fileName = 'wine/293_1.jpg';

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/getImage?file=${fileName}`);
      const jsonRes = await res.json();
      setImage(jsonRes.url);
    };
    fetchData();
  }, []);

  return (
    <>
      {image && (
        <Box
          component="img"
          src={image}
          alt="Image"
          sx={{ maxWidth: '100%' }}
        />
      )}
    </>
  );
}
