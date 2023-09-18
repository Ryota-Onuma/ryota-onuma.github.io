---
title: "Goで学ぶアルゴリズム"
date: 2023-08-15T18:38:14+09:00
draft: true
tags: [Golang,Test]
categories: [Programing]
description: "最近、アルゴリズムについてしっかり学ぼうと思う機会があったので、これを機にまとめることにしました。言語はGoを用いて学習しました。"
---

最近、アルゴリズムについてしっかり学ぼうと思う機会があったので、これを機にまとめることにしました。


# 計算量
アルゴリズムの性能の評価にはビッグ・オー表記法が用いられる。ビッグ・オー記法では、インプットが増えたときにアウトプットがどのくらい増えるかを

## `O(n)`

```go {name="main.go"}
package main

import "fmt"

func main() {
	test([]int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10})
}

func test(numbers []int) {
	fmt.Print(numbers[0])
	return
}

```

{{< details 上記を呼び出すと >}}

```
1
```

https://go.dev/play/p/hfF1jD7SiCP
{{< /details >}}


## `O(log(n))`

```go {name="main.go"}
package main

import "fmt"

func main() {
	test(10)
}

func test(n float64) {
	if n <= 1 {
		return
	} else {
		fmt.Println(n)
		test(n / 2)
	}
}
```

{{< details 上記を呼び出すと >}}

```
10
5
2.5
1.25
```

https://go.dev/play/p/PyNgRqwH3EC
{{< /details >}}


## `O(n)`

```go {name="main.go"}
package main

import "fmt"

func main() {
	test([]int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10})
}

func test(numbers []int) {
	for _, num := range numbers {
		fmt.Println(num)
	}
}

```

{{< details 上記を呼び出すと >}}

```
1
2
3
4
5
6
7
8
9
10
```
https://go.dev/play/p/qQUMhHNzp7H
{{< /details >}}

## `O(n * log(n))`

```go {name="main.go"}
package main

import "fmt"

func main() {
	test(10)
}

func test(n float64) {
	var i float64
    // n が増えると線形に以下forは計算量が増える
	for i = 0; i < n; i++ {
		fmt.Print(i)
	}
	fmt.Println("")
    
	if n <= 1 {
		return
	} 
    // 以下はO(log(n))
	test(n / 2)	
}
```

{{< details 上記を呼び出すと >}}

```
0123456789
01234
012
01
0
```

https://go.dev/play/p/BVhBIwf6IlR
{{< /details >}}

## `O(n**2)`

```go {name="main.go"}
package main

import "fmt"

func main() {
	test([]int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10})
}

func test(numbers []int) {
	for i := range numbers {
		for j := range numbers {
			fmt.Println(i, j)
		}
		fmt.Println("")
	}
}
```

{{< details 上記を呼び出すと >}}

```
0 0
0 1
0 2
0 3
0 4
0 5
0 6
0 7
0 8
0 9

1 0
1 1
1 2
1 3
1 4
1 5
1 6
1 7
1 8
1 9

2 0
2 1
2 2
2 3
2 4
2 5
2 6
2 7
2 8
2 9

3 0
3 1
3 2
3 3
3 4
3 5
3 6
3 7
3 8
3 9

4 0
4 1
4 2
4 3
4 4
4 5
4 6
4 7
4 8
4 9

5 0
5 1
5 2
5 3
5 4
5 5
5 6
5 7
5 8
5 9

6 0
6 1
6 2
6 3
6 4
6 5
6 6
6 7
6 8
6 9

7 0
7 1
7 2
7 3
7 4
7 5
7 6
7 7
7 8
7 9

8 0
8 1
8 2
8 3
8 4
8 5
8 6
8 7
8 8
8 9

9 0
9 1
9 2
9 3
9 4
9 5
9 6
9 7
9 8
9 9

```

https://go.dev/play/p/gnkZAyyI0eZ
{{< /details >}}



# ソート
## 安定ソートと不安定ソート
### 安定ソート
以下のように、{ID:Name}のキーバリューのペアの配列があったとして、
```
[{2,"Shin"},{1,"Emi"},{3,"Mike"},{4,"Green"},{3,"Judy"}]
```

IDでソートしたとき、以下のように同じIDのものは元の順序を保つようなソートは`安定ソート`
```
[{1,"Emi"},{2,"Shin"},{3,"Mike"},{3,"Judy"},{4,"Green"}]
```

### 不安定ソート
以下のように、{ID:Name}のキーバリューのペアの配列があったとして、
```
[{2,"Shin"},{1,"Emi"},{3,"Mike"},{4,"Green"},{3,"Judy"}]
```

IDでソートしたとき、以下のように同じIDのものが元の順序を保たないソートは`不安定ソート`
```
[{1,"Emi"},{2,"Shin"},{3,"Judy"},{3,"Mike"},{4,"Green"}]
```

## ボゴソート

適当に並び替えるソート。非効率で有名らしい。
安定ソートではない。

| 計算量 |  |
| ---- | ---- |
| Average | O(n*n!)|
| Best | O(n) |
| Worst | ∞ |

`O(n*n!)`について
- 並び替えにn!、比較にn

```go {name="bogo_sort.go"}
package main

import (
	"fmt"
	"math/rand"
	"time"
)

// 順番通りに並んでいるか
func inOrder(numbers []int) bool {
	for i := 0; i < len(numbers)-1; i++ {
		if numbers[i] > numbers[i+1] {
			return false
		}
	}
	return true
}

func bogoSort(numbers []int) {
	rand.Seed(time.Now().UnixNano())
	rand.Shuffle(len(numbers), func(i, j int) {
		numbers[i], numbers[j] = numbers[j], numbers[i]
	})
}

func main() {
	numbers := []int{3, 1, 2, 5, 4}
	fmt.Println("元の配列:", numbers)
	count := 0
	for {
		count++
		bogoSort(numbers)
		if inOrder(numbers) {
			fmt.Printf("%d回目でソートできました\n", count)
			break
		}
	}
	fmt.Println("ソート後の配列:", numbers)
}
```

{{< details 上記を呼び出すと >}}
```
元の配列: [3 1 2 5 4]
44回目でソートできました
ソート後の配列: [1 2 3 4 5]
```
https://go.dev/play/p/p14jJJRdkWw

{{< /details >}}

## バブルソート
隣接する要素を比較して順序を交換し、大きな要素を徐々に配列の末尾に移動させてソートするアルゴリズム。
安定ソートである。

| 計算量 |  |
| ---- | ---- |
| Average | O(n*n)|
| Best | O(n) |
| Worst | O(n*n)|

具体的には以下のようなステップで実施する。
1. 配列の先頭から隣接する2つの要素を比較する。
2. 左側の要素が右側の要素より大きければ、それらの要素を交換する。
3. 配列の最後まで移動するまで、ステップ1と2を繰り返す。これにより、最大の要素が配列の最後に移動する。
4. 最大の要素が配列の最後に正しく配置されたら、次に2番目に大きな要素に同じ手順を適用する。
5. 配列全体がソートされるまで、ステップ3と4を繰り返す。

{{< youtube Dv4qLJcxus8 >}}


```go {name="main.go"}
package main

import (
	"fmt"
)

func bubbleSort(numbers []int) []int {
	// 各パスごとに一番大きい要素が配列の最後に寄る
	for i := 0; i < len(numbers); i++ {
		// パス内で順番に要素を比較して、必要に応じて並び替える
		for j := 0; j < len(numbers)-1-i; j++ {
			if numbers[j] > numbers[j+1] {
				numbers[j], numbers[j+1] = numbers[j+1], numbers[j]
			}
		}
	}
	return numbers
}

func main() {
	numbers := []int{3, 1, 2, 5, 4}
	fmt.Println("元の配列:", numbers)
	bubbleSort(numbers)
	fmt.Println("ソート後の配列:", numbers)
}
```

{{< details 上記を呼び出すと >}}
```
元の配列: [3 1 2 5 4]
ソート後の配列: [1 2 3 4 5]
```
https://go.dev/play/p/cqUqo74iwvh

{{< /details >}}


## 選択ソート
配列内の最小値を見つけて順番に並べ替えてソートするアルゴリズム。
安定ソートである。

| 計算量 |  |
| ---- | ---- |
| Average | O(n*n)|
| Best | O(n*n)|
| Worst | O(n*n)|



具体的には以下のようなステップで実施する。
1. 未整列部分から最小値を見つける
2. 最小値を未整列部分の先頭の要素と交換する
3. 未整列部分が空になるまで、上記の操作を繰り返す

```go {name="main.go"}
package main

import (
	"fmt"
)

func selectionSort(numbers []int) []int {
	for i := 0; i < len(numbers); i++ {
		min_index := i
		for j := i + 1; j < len(numbers); j++ {
			if numbers[min_index] > numbers[j] {
				min_index = j
			}
		}
		numbers[i], numbers[min_index] = numbers[min_index], numbers[i]
	}

	return numbers
}

func main() {
	numbers := []int{3, 1, 2, 5, 4}
	fmt.Println("元の配列:", numbers)
	selectionSort(numbers)
	fmt.Println("ソート後の配列:", numbers)
}
```

{{< details 上記を呼び出すと >}}
```
元の配列: [3 1 2 5 4]
ソート後の配列: [1 2 3 4 5]
```
https://go.dev/play/p/N8Es61F49t7

{{< /details >}}



## 挿入ソート
配列を整列済みの部分と未整列の部分に分割し、未整列の部分から要素を取り出して、適切な位置に挿入していくことで、配列をソートするアルゴリズム。
安定ソートである。

| 計算量 |  |
| ---- | ---- |
| Average | O(n*n)|
| Best | O(n)|
| Worst | O(n*n)|


1. 配列を未整列部分と整列済み部分に分割する。最初は最初の要素だけが整列済み。
2. 未整列部分から1つの要素を取り出し、整列済み部分の適切な位置に挿入する。これにより、整列済み部分の要素数が1つ増える。
3. 未整列部分から要素を取り出して挿入し続け、全ての要素が整列済み部分に含まれるまで繰り返す。

```go {name="main.go"}
package main

import "fmt"

func insertionSort(numbers []int) {
	for i := 1; i < len(numbers); i++ {
		tmp := numbers[i]

		j := i - 1
		// 配列を右から順番に見ていって、隣り合う要素を交換していく
		// tmpがnumbers[j]より小さくなる直前が、tmpの要素があるべき場所
		for j >= 0 && numbers[j] > tmp {
			numbers[j+1], numbers[j] = numbers[j], numbers[j+1]
			j--
		}
		numbers[j+1] = tmp
	}
}

func main() {
	numbers := []int{3, 1, 2, 5, 4}
	fmt.Println("元の配列:", numbers)
	insertionSort(numbers)
	fmt.Println("ソート後の配列:", numbers)
}

```

{{< details 上記を呼び出すと >}}
```
元の配列: [3 1 2 5 4]
ソート後の配列: [1 2 3 4 5]
```
https://go.dev/play/p/Ncm2_mtrIb7

{{< /details >}}

## シェルソート
シェルソートは、挿入ソートの改良版で、配列内の要素をグループごとに挿入ソートを行うことで、データを部分的に整列させ、最終的に配列全体をソートするアルゴリズム。
安定ソートではない

| 計算量 |  |
| ---- | ---- |
| Average | Gap次第 |
| Best | O(n * log(n))|
| Worst | O(n*n)|


1. グループ間隔を決定する。この間隔によって、配列内の要素が複数のグループに分割される。
2. 各グループごとに挿入ソートを行う。つまり、グループ内でのソートを行う。
3. グループ間隔を狭めていき、再度グループごとに挿入ソートを行う。間隔を狭めることで、整列が進む。
4. 最終的に間隔が1になるまで繰り返し、最後に通常の挿入ソートを行う。

```go {name="main.go"}

```

## クイックソート
クイックソートは、分割統治法を用いてデータを整列するアルゴリズムで、平均的には非常に高速なソート方法。
安定ソートではない。

| 計算量 |  |
| ---- | ---- |
| Average | O(n * log(n)) |
| Best | O(n * log(n))|
| Worst | O(n*n)|

1. ピボット要素を選択する。通常は配列の中央などから選ぶ。
2. ピボットより小さい要素をピボットの左に、大きい要素を右に分割する。これを「分割」または「パーティション」と呼ぶ。
3. 左側と右側の部分配列に対して再帰的に同じ操作を行う。
4. 各部分配列が小さくなり、最終的には個々の要素が整列される。


## ヒープソート
ヒープソートは、最大ヒープまたは最小ヒープと呼ばれる特別なデータ構造を使用してデータを整列するアルゴリズム。
安定ソートである。

| 計算量 |  |
| ---- | ---- |
| Average | O(n * log(n)) |
| Best | O(n * log(n))|
| Worst | O(n * log(n)) |

1. 全体のデータを最大ヒープ（最大値が親ノードにくる形）に変換する。
2. ヒープの最大値（または最小値）を取り出し、未整列部分の末尾と交換する。これにより、最大値が正しい位置に移動する。
3. ヒープの再構築を行い、再び最大値を取り出し、交換する。これを繰り返し行うことで、要素が昇順に整列される。

# 参考
- https://builtin.com/software-engineering-perspectives/nlogn
- https://qiita.com/Nabetani/items/a019b4a2175a3d3c3ac6
-