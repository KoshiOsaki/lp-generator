import { NextResponse } from 'next/server';
import { Storage } from '@google-cloud/storage'
export async function GET(req: Request): Promise<Response> {

  const { searchParams } = new URL(req.url);
  const fileName = searchParams.get('file')

  if (!fileName) {
    return NextResponse.json({ error: 'ファイル名が間違っています' }, { status: 400 });
  }

  const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  })

  const bucketName = 'lp-items' // 一旦ハードコーディング

  const bucket = storage.bucket(bucketName)
  const file = bucket.file(fileName)

  // Signed URLの生成
  const options = {
    version: 'v4' as const,
    action: "read" as const,
    expires: Date.now() + 10 * 60 * 1000, // 10分間有効
  }

  const [url] = await file.getSignedUrl(options)
  return NextResponse.json({ url, status: 'ok' })
}
