# restaurant-ikyu-clone

## 環境構築

### volta

nodejs and npmの管理に[volta](https://volta.sh/)を利用しています  
公式サイトに則ってインストールしてください

### repository

```zsh
git clone https://github.com/yourusername/restaurant-ikyu-clone.git
cd restaurant-ikyu-clone

# PJ共通のパッケージインストール
npm install

# core apiのローカル立ち上げ
cd packages/backend
npm install
npm run dev

# webのローカル立ち上げ
cd packages/backend
npm install
npm run dev
```

## lint and formatter

ルートパッケージに[biomejs](https://biomejs.dev/ja/)を利用して共通設定しています
よって個々のpackagesで追加設定は不要です
