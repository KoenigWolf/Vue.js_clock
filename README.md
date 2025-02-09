# Vue.js Digital Clock

Vue.js 3で実装されたモダンなデジタル時計アプリケーションです。
Composition APIを活用し、効率的な状態管理と再利用可能なロジックを実現しています。

## 主要機能

- リアルタイムでの時刻表示
- 12時間形式での時刻表示
- スムーズな時刻更新（requestAnimationFrame使用）
- レスポンシブデザイン対応

## 技術スタック

- **Vue.js 3:** モダンなリアクティブシステムとComposition APIを活用するため
- **requestAnimationFrame:** パフォーマンスを考慮した滑らかな時刻更新を実現するため
- **CSS Variables:** 一貫性のあるスタイリングとテーマ管理を実現するため

## システムアーキテクチャ

### コンポーネント構成

```
App.vue
└── DigitalClock.vue
    └── ClockDisplay.vue
```

- **App.vue:** アプリケーションのルートコンポーネント
- **DigitalClock.vue:** 時計のロジックとアニメーション制御を担当
- **ClockDisplay.vue:** 時刻の表示を担当

### Composables

- **useTimeFormat.js:** 時刻のフォーマット処理を担当する再利用可能なロジック

## ディレクトリ構成

```
src/
├── components/
│   └── clock/
│       ├── ClockDisplay.vue  # 時刻表示コンポーネント
│       └── DigitalClock.vue  # メイン時計コンポーネント
├── composables/
│   └── useTimeFormat.js      # 時刻フォーマットロジック
├── styles/
│   └── variables.css         # グローバルCSS変数
├── App.vue                   # ルートコンポーネント
└── main.js                   # アプリケーションエントリーポイント
```

## セットアップと実行

### 環境要件

- Node.js 12.x以上
- npm 6.x以上

### インストール

```bash
npm install
```

### 開発サーバーの起動

```bash
npm run serve
```

### プロダクションビルド

```bash
npm run build
```

## 設計思想と実装方針

1. **コンポーネントの責務分離**
   - 表示とロジックの分離
   - 再利用可能なコンポーネント設計

2. **Composition APIの活用**
   - ロジックの再利用性を高める
   - コードの見通しを改善

3. **パフォーマンス最適化**
   - requestAnimationFrameによる効率的な更新
   - 不要な再レンダリングの防止

4. **保守性の向上**
   - CSS変数によるテーマ管理
   - 明確なコンポーネント階層

## 開発時の注意点とベストプラクティス

1. **コンポーネントの修正**
   - 各コンポーネントの単一責任の原則を維持
   - propsとemitを適切に使用した親子関係の維持

2. **スタイリング**
   - variables.cssの変数を活用
   - scoped stylesの使用を推奨

3. **パフォーマンス**
   - 重い処理は避け、アニメーションの滑らかさを維持
   - 不要なstate更新を防止

## ライセンス

MIT License

## コントリビューションガイドライン

1. Issueを作成して変更内容を提案
2. フォークしてブランチを作成
3. コードスタイルに従ってコードを修正
4. テストを追加または更新
5. プルリクエストを作成

### コーディング規約

- ESLint設定に従ったコード作成
- コンポーネントはPascalCase命名
- composablesはuse接頭辞を使用
- プロパティとメソッドはcamelCase命名
