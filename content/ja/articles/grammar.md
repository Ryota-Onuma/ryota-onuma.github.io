---
title: "マークダウン記法メモ"
date: 2023-08-15T18:38:14+09:00
draft: false
tags: [Markdown]
categories: [Programing]
description: "本ブログで使える記法メモ"
---

本ブログを書く上でのマークダウン記法のチートシートです。


# 見出し(h1)
## 見出し(h2)
### 見出し(h3)
#### 見出し(h4)
##### 見出し(h5)
###### 見出し(h6)


- 箇条書き1
    - 箇条書きネスト1
        - 箇条書きネストのネスト1
    - 箇条書きネスト2
        - 箇条書きネストのネスト2
    - 箇条書きネスト3
        - 箇条書きネストのネスト3
- 箇条書き2 
- 箇条書き3

~~打ち消し線~~

> 引用

{{< details ここをクリック >}}
折りたたみたい内容
- 箇条書き1
    - 箇条書きネスト1
        - 箇条書きネストのネスト1
    - 箇条書きネスト2
        - 箇条書きネストのネスト2
    - 箇条書きネスト3
        - 箇条書きネストのネスト3
- 箇条書き2 
- 箇条書き3

```go {name="main.go"}
package main

import "fmt"

func main() {
    fmt.Println("ハローワールド")
}
```
{{< /details >}}


# コードブロックのチェック
```diff
- console.log("Goodbye")
+ console.log("Hello World")
```
```go {linenos=false,hl_lines=[3,"5-7"],name="main.go"}
package main

import "fmt"

func main() {
    helloWorld()
}

func helloWorld() {
    fmt.Println("ハローワールド")
}
```

# 吹き出しチェック
{{<fukidashi position="left" path="doflamingo.png">}}
Shortcode で吹き出しを作ってみました。

Markdown を入れ子にすることができます。

#### 見出し(h4)
##### 見出し(h5)

- リスト1
  - リスト1.1
- リスト2

```diff
- console.log("Goodbye")
+ console.log("Hello World")
```

参考）https://catengineer.net/shortcode/#%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%81%AE%E7%BD%AE%E3%81%8D%E5%A0%B4%E6%89%80%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6
{{< /fukidashi >}}

{{<fukidashi position="right" path="ryota.png">}}
吹き出しを反対にした場合

~~打ち消し線~~
{{< /fukidashi >}}

{{<alert type="danger">}}
Dangerのテスト
{{</alert>}}

{{<alert type="warning">}}
Warningのテスト
{{</alert>}}

{{<alert type="notice">}}
Noticeのテスト
{{</alert>}}

{{<alert type="default">}}
Defaultのテスト
{{</alert>}}
