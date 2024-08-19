// Reference: https://github.com/googleapis/nodejs-storage/blob/main/samples/generateV4UploadSignedUrl.js

import { NextResponse } from 'next/server';
import { getStorageConfig } from "@/gcp/storageConfig";

export async function POST(req: Request): Promise<Response> {
  const formData = await req.formData();
  const file = formData.get('file') as File
  const fileName = file.name

  if (!fileName) {
    return NextResponse.json({ error: 'ファイル名が間違っています' }, { status: 400 });
  }

  const storage = getStorageConfig();
  const bucketName = 'lp-items'; // 一旦ハードコーディング

  const bucket = storage.bucket(bucketName);
  const uploadFile = bucket.file(fileName)

  const options = {
    version: 'v4' as const,
    action: "write" as const,
    expires: Date.now() + 15 * 60 * 1000, // 15分間有効
  }
  const [response] = await uploadFile.generateSignedPostPolicyV4(options)
  return NextResponse.json({ response, status: 'ok' });
}
