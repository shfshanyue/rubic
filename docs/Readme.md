# 使用 CSS 3D 画一个魔方

![](https://oss.xiange.tech/blog/rubic.gif)

> 合抱之木，生于毫末；九层之台，起于累土. 

当我们遇到一个较难问题的时候，把它逐步分解，转化为我们熟悉的内容，问题就很容易得到解决。

我们现在的目标是做一个 3D 效果的魔方，我们找到它的本质，对它解构？

## 3D 相关 CSS 属性及函数

在 3D 空间中转换最重要几个形态的是平移，旋转与缩放，接下来将会介绍与制作一个 3D 效果立方体相关的 CSS 属性及函数。

+ `transform-style`
+ `perspective`
+ `backface-visibility`

## 3D 空间

一个立方体，必然存在于一个 3D 空间，首先需要使用 CSS 指明该立方体处于 3D 空间中。

``` css
.cube {
  transform-style: preserve-3d;
}
```

通过 CSS 的属性值 `transform-style: preserve-3d` 可以设置该元素的所有子元素都处于 3D 空间。

在科幻小说三体中，云天明讲了三个故事，其中讲到有一个深水王子，无论你在远处看还是近处看，他都一般高，不会受距离增减的影响，不符合我们现实中**近大远小**的透视规律。

正是有了透视距离，现实世界的事物才会有层次感，而在 CSS 的 3D 世界里，也有一个属性代表透视距离。

``` css
.cube {
  perspective: 800px;
  // 观察者眼睛位于上边看的全面
  perspective-origin: 150% -150%;
}
```

与二维平面不同，在 3D 空间中多了一个 `Z 轴`，而与 `Z 轴` 垂直的平面构成了 Z 平面，即我们在 2D 方向上能够看到的这个平面。

`perspective` 定义了观察者眼睛与 `Z=0` 平面(即投影面)的距离，来制造一种空间感。

![](https://drafts.csswg.org/css-transforms-2/images/perspective_distance.png)

`perspective` 最小可设置为 1px，当它值越小时，物体在投影面上越大。如下图所示

![](https://oss.xiange.tech/blog/perspective.png)

`perspective-origin` 代表观察者眼睛的位置，默认居中

![](https://drafts.csswg.org/css-transforms-2/images/perspective_origin.png)


## 平移与坐标系: translate3d()

``` css
.cube {
  transform: translate3d(x, y, z);
}
```

`translate3d(x, y, z)` 定义了元素在 3D 空间沿坐标系的平移，而如果只在单轴上平移，则可以使用独立的 API。

+ `translateX(x)`: `translate3d(x, 0, 0)`
+ `translateY(y)`: `translate3d(0, y, 0)`
+ `translateZ(z)`: `translate3d(0, 0, z)`

当作 Z 轴方向平移时，正值代表离用户越来越近，即在视觉效果上它会越来越大。负值则相反。具体视觉效果可参考 MDN 文档。

一种他们在三维坐标系下的正方向如下所示：

![](https://drafts.csswg.org/css-transforms-2/images/coordinates.svg)

[translateZ | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translateZ)

## 旋转与原点: rotate3d() 与 transform-origin

``` css
.cube {
  transform: rotate3d(x, y, z, a);
}
```

`rotate3d` 定义了元素在 3D 空间的旋转，旋转相比平移来说，它要多一个指标：**旋转轴，它根据从原点出发的向量 `[x, y, z]` 来确定旋转轴。**

`[x, y, z]` 坐标自然由 `rotate3d(x, y, z, a)` 来指定，那如何确定原点呢？

原点坐标由属性 `transform-origin` 来指定，如果只有前两个值代表在 2D 平面，如果有三个值代表在 3D 空间。

> 你可以通过围绕各个坐标轴旋转180度，来确定原点坐标

``` css
.cube {
  transform-origin: 100px 100px 100px;
}
```

可以通过对一个立方体的旋转对 `rotate3d` 有直观的了解

### 正常放置

在正常状态下，各面数字如下

![](https://oss.xiange.tech/blog/normal.jpg)

### `rotateX(180deg)`

沿X轴旋转180度后，位面2面对用户

![](https://oss.xiange.tech/blog/rotateX.jpg)

### `rotateZ(180deg)`

沿Z轴旋转180度后，位面1面对用户，但是翻转了过来

![](https://oss.xiange.tech/blog/rotateZ.jpg)

通过 MDN 文档也可以对各个转换有更直观的了解

+ [rotateX | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotateX)
+ [rotateY | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotateY)
+ [rotateZ | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotateZ)
+ [transform-origin | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin)

## 一个立方体

对 CSS 3D 方面的属性及值进行熟悉之后，就能够很容易地画出一个立方体。

一个立方体由六个面组成，分别使用 `Up`，`Down`，`Left`，`Right`，`Front`，`Back` 的首字母进行表示。使用 `html` 描述它的结构如下

``` html
<div class="cube-container">
  <div class="cube">
    <div class="face face-up">U</div>
    <div class="face face-down">D</div>
    <div class="face face-left">L</div>
    <div class="face face-right">R</div>
    <div class="face face-front">F</div>
    <div class="face face-back">B</div>
  </div>
</div>

```

+ `.cube-container`: 为立方体提供布局，使之处于屏幕中心位置
+ `.cube`: 表示该立方体容器
+ `.face`: 表示该立方体的六个面

在 `.cube` 选择器中声明一个 3D 空间，指定 `perspective` 与 `transform-style` 属性

``` css
.cube {
  perspective: 1500px;
  transform-style: preserve-3d;
}
```

为了立方体的美观，优雅及调试方便，对立方体加入一些 3D 无关的样式: 关于布局，显示及色彩

为立方体提供一个 `100px/100px` 大小的容器，并处于屏幕正中，并且立方体每一面的字也垂直居中

``` css
$ width: 100px;

.cube-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
}

.cube {
  width: $width;
  height: $width;
  margin: $width;
}

.face {
  background: #f60;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
  color: #fff;
}
```

接下来对六个面做绝对定位，并且根据目标位置做适当的平移与旋转即可组成立方体。

``` scss
$width: 100px;

.face {
  width: $width;
  height: $width;
  position: absolute;
  
  &.face-up {
    transform: rotateX(90deg) translateZ($width / 2);
  }

  &.face-down {
    transform: rotateX(-90deg) translateZ($width / 2);
  }

  &.face-left {
    transform: rotateY(-90deg) translateZ($width / 2);
  }

  &.face-right {
    transform: rotateY(90deg) translateZ($width / 2);
  }

  &.face-front {
    transform: translateZ($width / 2);
  }

  &.face-back {
    transform: rotateX(180deg) translateZ($width / 2);
  }
}
```

效果图如下

![](https://oss.xiange.tech/blog/cube.jpg)

全部代码如下

[codepen](https://codepen.io/shanyue/pen/QWNqqwm)

## 让立方体动起来

此时 3D 空间的立方体已经成形，为了更加形象，我决定给它一个动画。

下列 CSS 动画使它绕着向量 `[1, 1, 0]` 永无停歇地旋转。

``` css
@keyframes rotate {
  0% {
    transform: rotate3d(0, 0, 0, 0);
  }
  100% {
    transform: rotate3d(1, 1, 0, 360deg);
  }
}

.cube {
  animation: rotate 2s linear reverse infinite;
}
```

效果图如下所示

![](https://oss.xiange.tech/blog/cube.gif)


## 来画一个魔方

魔方由 27 个小块组成，通过 `translate3d` 对27个小立方块进行位移，即可得到一个魔方，代码如下所示

``` scss
mixin coordinate() {
  @for $x from 1 through 3 {
    @for $y from 1 through 3 {
      @for $z from 1 through 3 {
        .cube-#{$x}-#{$y}-#{$z} {
          transform: translate3d(($x - 2) * $width, ($y - 2) * $width, ($z - 2) * $width);
        }
      }
    }
  }
}

@include coordinate();
```

![](https://oss.xiange.tech/blog/rubic.gif)

最后成型的代码及演示如下所示:

+ 魔方项目：<https://github.com/shfshanyue/react-rubic>
+ 魔方演示地址: <https://shfshanyue.github.io/react-rubic/>