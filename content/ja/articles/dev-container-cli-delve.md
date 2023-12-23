---
title: 'Dev Container CLIとdelveでdocker compose管理のGoコンテナをデバッグできるようにする'
date: 2023-10-05T21:00:14+09:00
draft: false
tags: [Go]
categories: [Programming]
isExternal: false
description: 'Dev Container CLIとdelveでGoコンテナをデバッグできるようにするやり方をまとめました。ローカル開発では複数コンテナと合わせてdocker composeを用いて開発することが多いかと思いますので、今回はdocker composeで動いているGoコンテナに対してdelveでデバッグできるようにするやり方を紹介したいと思います。'
---

# はじめに

[Dev Container CLI](https://github.com/devcontainers/cli)と[delve](https://github.com/go-delve/delve)でGoコンテナをデバッグできるようにするやり方をまとめました。
ローカル開発では複数コンテナと合わせてdocker composeを用いて開発することが多いかと思いますので、今回はdocker composeで動いているGoコンテナに対してdelveでデバッグできるようにするやり方を紹介したいと思います。



# Dev Container CLIとは？

Dev Container CLIとは[こちら](https://github.com/devcontainers/cli)にも書いてあるように、`devcontainer.json`から開発用のコンテナを立ち上げることができるツールです。既存のコンテナに対して追加でデバッグツールが入れることができるため、チーム管理をしているDockerコンテナのconfiguration fileを汚さずに自分好みの開発ツールを追加で入れることができます。

# delveとは？

delveはGoのプログラムをデバッグできるツールです。Goのデバッガーでググるとだいたい上のほうにでてきます。



# やり方
## 前提

今回のディレクトリ構成は最終的に以下のようになります。
```bash
├── Dockerfile
├── docker-compose.yml
├── go.mod
├── go.sum
├── main.go
├── main_test.go
├── .devcontainer
│   ├── devcontainer.json
│   └── scripts
│       └── post-start-command.sh
```

また、今回の例では以下のような`docker-compose.yml`が定義されているものとします。
```yaml{name="docker-compose.yml"}
version: "3.8"
services:
  go-server:
    build: 
      context: .
      dockerfile: ./Dockerfile
    tty: true 
    ports:
      - 3000:3000
    command: sleep infinity
    volumes:
      - .:/go/src/
```
`Dockerfile`の中身は以下としておきます。
```dockerfile{name="Dockerfile"}
FROM golang:1.21.1-bullseye

WORKDIR /go/src/

COPY ./go.mod ./go.sum  ./

RUN go mod download

COPY . .

RUN useradd -m test-user

USER test-user

CMD ["go", "run", "main.go"]
```

完成後のサンプルは[こちら](https://github.com/Ryota-Onuma/delve-sample)に置いてあります。

## 手順

### Dev Container CLIをインストールする

https://github.com/devcontainers/cli　を参考にCLIをインストールします。

```bash
$ npm install -g @devcontainers/cli
$ devcontainer --version
0.51.3
```

### devcontainer.jsonを作成する

`.devcontainer`ディレクトリを作成し、中に`devcontainer.json`を作成します。

今回は`docker-compose.yaml`で定義した`go-server`サービスに、後述する`devcontainer exec`コマンドを用いてアクセスさせるようにします。

中身は以下のようにします。

```json {name="devcontainer.json"}
{
    "name": "go-server",
    "dockerComposeFile": ["../docker-compose.yml"],
    "service": "go-server", 
    "remoteUser": "test-user",
    "workspaceFolder": "/home/test-user/workspace",
    "mounts": [
        { 
            "source": ".devcontainer/scripts/post-start-command.sh",
            "target": "/home/test-user/workspace/.devcontainer/scripts/post-start-command.sh",
            "type": "bind" 
        }
    ],
    "postStartCommand": "bash .devcontainer/scripts/post-start-command.sh"
}
```

`devcontainer.json`では`postStartCommand`というフックを利用できます。コンテナがスタートした直後に任意のスクリプトを実行することができます。今回は次のステップにてdelveをインストールするようにします。
`devcontainer.json`には他にもいくつかフックがあるので、ライフサイクルの中で任意の処理をはさみたいときは利用することが可能です。
詳しくは[こちら](https://containers.dev/implementors/json_reference/#lifecycle-scripts)をご覧ください。

### delveをGoコンテナにインストールする設定追加

今回の例では、`.devcontainer`ディレクトリに`scripts`ディレクトリを作成し、中に`post-start-command.sh`を作成します。

```bash {name="post-start-command.sh"}
#!/bin/bash

go install github.com/go-delve/delve/cmd/dlv@latest

dlv version
```

このスクリプトを`postStartCommand`のフックで呼び出すことで、既存のGoコンテナ内にdelveがインストールされます。

### devcontainerを動かしてみる
`docker-compose.yaml`が存在するディレクトリにて、以下を実行することで、`devcontainer.json`の設定を反映した状態で`docker compose up`が実行されます。`--workspace-folder .` がないと動かないので注意してください。

```bash
$ devcontainer up --workspace-folder .
```

upした後は、以下コマンドでコンテナ内部に入ります。

```bash
$ devcontainer exec --workspace-folder . bash
```

また、2023年10月時点ではDevcontainer CLIはstopやdownを提供していないので、コンテナを止めたり削除したいときは明示的に`docker compose stop`や`docker compose down`してあげる必要があります。（[将来的に対応する可能性はありそうです](https://github.com/devcontainers/cli#context)）

![使えるコマンド](/images/devcontainer-help.png "使えるコマンド")



### delveを動かしてみる

実際にdelveを動かしてみます。

まずは、きちんとdelveが入っているかを確認してみます。

![まずは、きちんとdelveが入っているかを確認してみます。](/images/dlv-installed.png "delveが入っていること")


入っていることが確認できたので、`main.go`を作成し、break pointを設定してみます。

```go  {name="main.go"}
package main

import (
	"fmt"
)

func main() {
	hoge := 1
	fmt.Println(hoge)  //  ここにbreak pointを設定する予定
	hoge = 2
	fmt.Println(hoge)
	fmt.Println("Hello World")
}
```

実行してみます。

![実行してみる](/images/dlv-try.png "実行してみる")

動くことが確認できました！

きちんとステップ実行していることがわかります。

続いて、testも実行できることを確認してみます。

`main_test.go`を作成します。
```go  {name="main_test.go"}
package main

import (
	"testing"
)

func TestRun(t *testing.T) {
	hoge := struct {
		fuga bool
	}{
		fuga: false,  //  ここにbreak pointを設定する予定
	}

	if !hoge.fuga {
		t.Errorf("fuga is not true")
	}
}
```
delveを実行してみます。

![実行してみる](/images/dlv-try-test.png "実行してみる")

動くことが確認できました！
値を途中で上書いて実行できることがわかります。

delveでは他にも様々なことができるので、詳しくは以下のような記事を読んでみてください。

[Golangのデバッガdelveの使い方](https://qiita.com/minamijoyo/items/4da68467c1c5d94c8cd7)



# 参考記事
- [delveによるデバッグ方法(実行中プロセスのデバッグなど)](https://www.wakuwakubank.com/posts/870-go-delve-debug/)
- [Dev Container が VSCode から CLI にもやって来た](https://zenn.dev/hankei6km/articles/devcontainers-in-cli-ci)
- [Golangのデバッガdelveの使い方](https://qiita.com/minamijoyo/items/4da68467c1c5d94c8cd7)
- https://containers.dev/implementors/json_reference/
