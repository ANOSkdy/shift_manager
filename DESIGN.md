# DESIGN.md — shift_manager SmartHR-style Mock UI

## Purpose
- TASさま向けシフト管理モックを、信頼感・明快さ・高密度な業務UIとして統一する。

## Visual theme
- クリーン
- 信頼感
- 業務アプリ向け
- 情報密度高め
- ウォームグレー基調

## Color tokens
- Brand: `#00c4cc`（アクセント・チャート用。小さいUIテキストには使わない）
- Product Main: `#0077c7`
- Link: `#0071c1`
- Text: `#23221e`
- Text Secondary: `#706d65`
- Text Disabled: `#c1bdb7`
- Background: `#f8f7f6`
- Surface: `#ffffff`
- Head/Table Header: `#edebe8`
- Border: `#d6d3d0`
- Over Background: `#f2f1f0`
- Danger: `#e01e5a`
- Warning: `#ffcc17`
- Orange Accent: `#ff9900`

## Typography
- `@font-face` で `AdjustedYuGothic` を定義する
  - 400: `local("Yu Gothic Medium")`
  - 700: `local("Yu Gothic Bold")`
- Font family:
  - `AdjustedYuGothic, "Yu Gothic", YuGothic, "Hiragino Sans", sans-serif`
- Base font size: `16px`
- Base line-height: `1.5`
- Headings line-height: `1.25`

## Spacing
- 8pxベーススケール
- 4 / 8 / 16 / 24 / 32 / 40 px

## Components
- Primary button
  - Background: `#0077c7`
  - Text: white
  - Radius: `6px`
  - Padding: `8px 16px`
  - Font weight: `700`
- Secondary / chip
  - Background: white or transparent
  - Active: `#0077c7` のborder/text（必要時は反転で白文字）
- Table
  - Header: `#edebe8`
  - Alternating row: `#f8f7f6`
  - Border: `#d6d3d0`
- Card
  - White surface
  - Subtle border
  - Minimal shadow

## Responsive
- SP: `<= 599px`
- Tablet: `600px - 959px`
- Desktop: `>= 960px`
- Touch target: 最低 `44px`

## Do / Don't
### Do
- Product Main を主要コントロールに使用する
- Stone/warm neutral パレットを基調にする
- テーブル可読性を最優先にする
- 過剰なシャドウ/装飾を避ける

### Don't
- `#00c4cc` を小さいテキストや主要コントロールに使わない
- `#000000` の純黒を使わない
- 外部フォントファイルを追加しない
