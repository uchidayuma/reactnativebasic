# reactnativebasic
このブランチは「ReactNativeとSQLiteで作るTapDiaryクローン」のソースコードです。

iOS, Androidストアでリリースしている「TapDiary」初期Verのクローンを開発しながらReactNativeを学んでいただくコースです。

[打田のメモはこちらから](https://uchidalink.notion.site/ReactNativeBasic-70c5065ebc2d4237980fe568fc792065)

## ブランチ対応表
各レクチャーごとにブランチを切っているため、適宜ブランチを切り替えながら確認したいソースコードを御覧ください。

| レクチャー名        |  ブランチ名  |
|--------------|-----------|
| 完成版 | basic-master |
| SQLiteのインストール | installexposqlite  |
| SQLiteでサンプルSQLを流す | sqlitesample  |
| 【Section】日記作成機能の開発 |  |
| diariesテーブルの作成 | create-diaries-table |
| firebaseの準備 | firebase-init |
| firebaseから絵文字を取得 | get-emoji |
| 絵文字を表示 | render-emoji |
| 日記本文入力フォームを作成する | input-button-form |
| 日記本文を記入できるようにする | body-usestate |
| 絵文字をタップした際の動きを作る | emojitap |
| テンプレートをタップした際の動きを作る | template-tap |
| インサート文の解説 | insert-sqlite |
| SQLiteに日記内容を保存する | save-diary |
| 【Section】タブメニューを改良 |  |
| タブの名前とアイコンを変更 | bottom-navigation |
| 共通ヘッダーの開発 | share-header |
| 【Section】HOME画面の開発 |  |
| Viewで枠組みを作る | home-init |
| useEffectで日記一覧を取得 | get-diaries |
| 日記一覧を表示 | home-render-diaries |
| 日記作成画面に移動するボタンを設置 | navigate-create |
| 日記作成が完了したらホーム画面に戻す | return-home |
| 引っ張って更新を実装 | pull-refresh |
| 時刻関係の機能を実装 | home-dayjs |
| Webviewを実装 | home-webview |
| 【Section】ダークモードに対応したCSSの仕組みを作ろう |  |
| カラー定義を変更 | constants-color |
| Appbarのカラーを変更 | appbar-color |
| 共通CSSの作成 | global-css |


## バージョン情報
- ReactNative: 0.70.6
- React: 18.1.0
- Expo: 47.0.8

## 日記テンプレート
[GoogleDocument](https://docs.google.com/document/d/1MUIIvxelnd1Tjt65r8Qfi1Ap2HReMlvnbpTkYzlRWYw/edit?usp=sharing)