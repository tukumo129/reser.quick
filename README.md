# reser.quick
予約管理アプリ

dockerdesctopをインストール
gitをインストール

ssh 接続
ターミナル
sshキー作成
ssh-keygen -t ed25519 -C "test@gamail.com"　（途中でコマンドが止まった場合はエンター）
公開鍵をコピー
cat .ssh/id_ed25519.pub

github
githubでsshキーを設定
github -> settings -> SSH and GPG keys -> new SSH key
title: 任意の名前(local-sshなど)
key:ターミナルでコピーした公開鍵を入力
ADD SSH key

ターミナル
ssh -T git@github.com　途中で止まった場合はyesで続行

環境変数を設定
cd reser.quick/laravel
cp .env.example .env
laravelディレクトリ内にある.envを編集
APP_ENV=local
DB_PASSWORD=123456

docker-compose.ymlと同一のディレクトリに.envを作成し下記を追加
DB_PASSWORD=123456

docker起動
docker compose up -d --build

dockerコンテナでコマンド実行
docker compose exec app bash
cd laravel
composer i
php artisan key:generate
php artisan migrate
cd ../react
npm i
npm run build