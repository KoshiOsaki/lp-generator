# lp-generator

LP 自動生成サービスです

## 開発環境のセットアップ

1. next-app ディレクトリに移動:

   ```
   cd next-app
   ```

2. .env.template をコピーして.env ファイルを作成:

   ```
   cp .env.template .env.local
   ```

3. 依存関係をインストール:

   ```
   npm install
   ```

4. 開発サーバーを起動:
   ```
   npm run dev
   ```

これで、ブラウザで `http://localhost:3000` を開くとアプリケーションにアクセスできます。

## Prismaのセットアップ
1. /dbに移動してdockerでmysqlを起動:
   ```
   docker-compose up -d
   ```
2. /next-app ディレクトリに移動してマイグレーション:
   ```
   npm run prisma:migrate
   ```
3. seedデータのセットアップ:
   ```
   npm run prisma:seed
   ```

## DBスキーマ変更時
1. schema.jsonに変更を加える（docs: https://www.prisma.io/docs/orm/prisma-schema/data-model/models ）
2. マイグレーション:
   ```
   npm run prisma:migrate
   ```
3. Prisma Clientを生成（Tsの型定義ファイルなど）
   ```
   npm run prisma:generate
   ```

※これらのPrisma関連のコマンドはpackage.jsonを参照してください
