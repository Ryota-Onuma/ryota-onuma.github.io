---
title: 'C++で10進数の自然数を桁数指定の2進数に変換して表示する'
date: 2024-01-01T18:00:14+09:00
draft: false
tags: [C++]
categories: [Programming]
isExternal: false
description: ''
---


# はじめに

与えられた10進数の自然数を2進数にするやり方を忘れないようにメモっておいたほうが良さそうなので記す。競プロをC++で始めることにしたので、C++で書いてみる。

# やりたいこと

与えられた10進数の自然数Nを、任意の桁数の2進数に変換して出力する。今回はマイナスは考慮しない。

なので、例えば10進数の13を8桁の2進数にしたら、`00001101`として表示する。


# 雑なやり方

愚直に筆算でやるやり方をC++でやってみた。与えられた10進数の自然数Nを、8桁の2進数に変換して出力する。

![筆算](/images/decimal-to-binary.png "筆算")


```cpp {linenos=false,name="main.cpp"}
#include <iostream>
#include <string>
using namespace std;

int main(){
    int N, target;
    cin >> N;
    target = N;
    
    const int strCount = 8; // 8桁で表示
    string resultTxt(strCount,'0'); // 00000000 の文字列

    for (int i = 1; i <= strCount; i++){  // 割り算を実施し、2^0の桁から順番に置き換えていく
        int rest = target % 2;
        int quotient =  target / 2;     
        resultTxt.replace(strCount - i, 1, to_string(rest));
        target = quotient;

        if (quotient == 0) break;
    }

    cout << resultTxt << endl;
    return 0;
}
```

上記を実行すると以下になる。期待する結果が出力できている。

![実行結果](/images/execute.png "実行結果")

# もう少しきれいなやり方

10進数表記の自然数を、2^n (n = 0, 1, 2 ...) で割った商を、更に2で割ったあまりがn+1桁目の値であるというもの。

```cpp {linenos=false,name="main.cpp"}
#include <iostream>
#include <string>
using namespace std;

int main(){
    int N;
    cin >> N;
    
    const int strCount = 8; // 8桁で表示

    for (int i = strCount - 1; i >=0; i--){
        int p = 1 << i;
        cout << (N / p) % 2; 
    }
    cout << endl;
    return 0;
}
```

問題なく動いた

![実行結果](/images/execute2.png "実行結果")

参考）[競技プログラミングの鉄則](https://amzn.asia/d/5HIKbgR)


# 参考
- [競技プログラミングの鉄則](https://amzn.asia/d/5HIKbgR)