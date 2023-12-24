---
title: 'Added KaTex support to my blog'
date: 2023-12-24T09:00:14+09:00
draft: false
tags: [Release Note]
categories: [Release Note]
isExternal: false
description: ''
katex: true
---

# I support KaTex in my blog to display math formula

As the subject says, I added [KaTex](https://katex.org/) system in my blog to show math formula.

According to [KaTex](https://katex.org/) and some articles on the Internet, it is a lirary based on Tex that enables your website to render fast without any dependency. 



# Steps for installation

I followed [Hugoで数式を書けるようにKaTexを導入する](https://blog.takanabe.tokyo/2023/02/08c885eb-04d0-468d-b710-ca1b6d0b3c92/). It was easy to understand and apply to my blog. Thanks!

# Try some formula with KaTex

It looks good for me.

$$
\int_{a}^{b} x^{100} dx
$$

$$
\boldsymbol{A}=
\begin{bmatrix}
   a & b & c \cr
   c & d & d
\end{bmatrix}
$$

$$
\begin{pmatrix} 
  a_{11} & a_{12} & \dots  & a_{1n} \cr
  a_{21} & a_{22} & \dots  & a_{2n} \cr
  \vdots & \vdots & \ddots & \vdots \cr
  a_{m1} & a_{m2} & \dots  & a_{mn}
\end{pmatrix}
$$

$$
f(x) = \sum_{n=0}^{\infty} \dfrac{f^{(n)}(a)}{n!}(x-a)^n
$$


# References

[Hugoで数式を書けるようにKaTexを導入する](https://blog.takanabe.tokyo/2023/02/08c885eb-04d0-468d-b710-ca1b6d0b3c92/)

[javascript で LaTeX : KaTeX がすごい](https://lesguillemets.github.io/blog/2014/09/18/katex0.html)

[数式を美しく表示するJSライブラリKaTeXの使い方](https://toach.biz/blog/getting-started-with-katex/)

[KaTeXの使い方](https://manabitimes.jp/katex)

[「TeX」の読み方はテフ、それともテック？](http://www.kksanshusha.jp/booklab/archives/1184)

