# 予約管理アプリ

# 環境構築方法
## Docker Desktopをインストール
- https://www.docker.com/ja-jp/products/docker-desktop/

## gitをインストール
``` sh
sudo apt update
sudo apt-get install git
```

## githubへsshで接続する
### sshキーを作成し、公開鍵をコピー
``` sh
ssh-keygen -t ed25519 -C "test@gamail.com"  
#（途中でコマンドが止まった場合はエンター）
cat .ssh/id_ed25519.pub
```

### githubでsshキーを設定
- github -> settings -> SSH and GPG keys -> new SSH key
- 設定値は下記の通り
  - title: 任意の名前(local-sshなど)
  - key:ターミナルでコピーした公開鍵を入力
  - ADD SSH key

### gitgubとの接続を確認
``` sh
ssh -T git@github.com
# (途中で止まった場合はyesで続行)
```  

## 環境変数を設定
### .env.exampleを.envにコピー
``` sh
cd reser.quick/laravel
cp .env.example .env
```
### laravelディレクトリ内にある.envを編集
```env
APP_ENV=local
DB_PASSWORD=123456
```

## docker起動
```
docker compose up -d --build
```

## dockerコンテナでコマンド実行
``` sh
docker compose exec app bash
cd laravel
composer i
php artisan key:generate
php artisan migrate
cd ../react
npm i
npm run build
```

## dnsを登録
ターミナルを管理者として実行
``` sh
notepad C:\Windows\System32\drivers\etc\hosts
# 最下段に下記を追加
127.0.0.1 reser.quick
```

# サーバーデプロイ方法

## サーバー起動
- AWSの管理画面へログイン
- EC2画面でインスタンス起動
- ElasticIPを割り当て
- route53でAレコード作成（IP部分のみ入力）

## 変更の反映
- SSH接続
- 下記コマンドを実行
``` sh
cd reser.quick
docker compose up -d --build
docker compose exec app bash
cd laravel
composer i
php artisan migrate
cd ../react
npm i
npm run build
# (必要な場合envを更新)
```