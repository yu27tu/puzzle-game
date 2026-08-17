# Puzzle Game

## 概要

Spring Boot と MySQL を使用して開発した、ログイン機能・スコア保存・ランキング機能を備えたWebパズルゲームです。
バックエンドのAPI処理からデータベースへの永続化、フロントエンドのゲーム処理まで一通り実装しています。

## 使用技術

- Java
- Spring Boot
- Spring Security
- Spring Data JPA
- MySQL
- Maven
- HTML / CSS / JavaScript

## 主な機能

- ユーザー登録・ログイン
- パスワードのハッシュ化
- ログイン状態の管理
- パズルゲーム
- スコア保存
- ランキング取得

## システム構成

ブラウザからJavaScriptでゲームを操作し、Spring BootのController / Service / Repositoryを経由してMySQLへデータを保存します。

## DB設計

ユーザー情報とゲームスコアをMySQLで管理しています。
SQLの初期スキーマは `SQL/schema.sql` にまとめています。

## 工夫した点

- Controller / Service / Repositoryを分離し、責務を整理
- Spring Data JPAを利用してDBアクセスを実装
- Spring Securityを利用した認証処理を実装
- DB接続情報をソースコードへ直接記載せず、環境変数から取得する構成にした

## 苦労した点・解決方法

ゲーム画面の操作とサーバー側のスコア保存を連携させる部分に苦労しました。
フロントエンドとバックエンドの責務を分け、API経由でスコアを送受信する構成に整理しました。

## 今後の改善

- テストコードの追加
- 入力値検証・エラーハンドリングの強化
- ランキング表示UIの改善
- Dockerによる実行環境の統一
- CI/CDの導入
- クラウドへのデプロイ

## 起動方法

1. MySQLで `puzzle_game` データベースを用意する
2. `DB_USERNAME` と `DB_PASSWORD` を環境変数に設定する
3. MavenでSpring Bootアプリケーションを起動する
4. ブラウザからアプリケーションへアクセスする

※ `application.properties` はローカル設定のためGitHubには公開しません。
