// Reference: https://github.com/googleapis/nodejs-storage/blob/main/samples/generateV4ReadSignedUrl.js
import { NextResponse } from 'next/server';
import { getStorageConfig } from '../../../gcp/storageConfig'
export async function GET(req: Request): Promise<Response> {

  const { searchParams } = new URL(req.url);
  const fileName = searchParams.get('file')

  if (!fileName) {
    return NextResponse.json({ error: 'ファイル名が間違っています' }, { status: 400 });
  }

  const storage = getStorageConfig()
  const bucketName = 'lp-items' // 一旦ハードコーディング

  const bucket = storage.bucket(bucketName)
  const file = bucket.file(fileName)

  // Signed URLの生成
  const options = {
    version: 'v4' as const,
    action: "read" as const,
    expires: Date.now() + 15 * 60 * 1000, // 15分間有効
  }

  const [url] = await file.getSignedUrl(options)
  return NextResponse.json({ url, status: 'ok' })
}
