---
title: "Markdown cheat sheet for this blog"
date: 2023-08-15T18:38:14+09:00
draft: false
tags: [Markdown]
categories: [Programing]
description: "This is my cheet sheet to write my blog."
---

This is my markdown cheet sheet to create articles in my blog.

# Heading(h1)
## Heading(h2)
### Heading(h3)
#### Heading(h4)
##### Heading(h5)
###### Heading(h6)

- Bullet point 1
    - Nested bullet point 1
        - Nested nested bullet point 1
    - Nested bullet point 2
        - Nested nested bullet point 2
    - Nested bullet point 3
        - Nested nested bullet point 3
- Bullet point 2
- Bullet point 3

~~Strikethrough~~

> Quotation

{{< details Click here >}}
Folded contents are below.
- Bullet point 1
    - Nested bullet point 1
        - Nested nested bullet point 1
    - Nested bullet point 2
        - Nested nested bullet point 2
    - Nested bullet point 3
- Bullet point 2
- Bullet point 3

```go {name="main.go"}
package main

import "fmt"

func main() {
    fmt.Println("hello world")
}
```
{{< /details >}}


# Code block
```diff
- console.log("Goodbye")
+ console.log("Hello World")
```
```go {linenos=false,hl_lines=[3,"5-7"],name="main.go"}
package main

import "fmt"

func main() {
    fmt.Println("hello world")
}
```

# Speech bubbles
{{<fukidashi position="left" path="doflamingo.png">}}
I created speech bubbles system with short code. 
I can write markdown contents in it.

### Heading(h3)
#### Heading(h4)

- List 1
  - List 1.1
- List 2

```diff
- console.log("Goodbye")
+ console.log("Hello World")
```

references）https://catengineer.net/shortcode/#%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%81%AE%E7%BD%AE%E3%81%8D%E5%A0%B4%E6%89%80%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6
{{< /fukidashi >}}

{{<fukidashi position="right" path="ryota.png">}}
Reversed version of speech bubbles.

~~Strikethrough~~
{{< /fukidashi >}}

{{<alert type="danger">}}
This is "danger" test.
{{</alert>}}

{{<alert type="warning">}}
This is "warning" test.
{{</alert>}}

{{<alert type="notice">}}
This is "notice" test.
{{</alert>}}

{{<alert type="default">}}
This is "default" test.
{{</alert>}}
