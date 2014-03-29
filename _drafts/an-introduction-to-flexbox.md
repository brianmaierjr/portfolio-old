---
layout: post
title: An introduction to flexbox
class: post
color: #566069
---

Things change on the web with an incredible speed. Just like its predecessors (responsive design, icon fonts, web fonts) I have been hearing quite a bit about Flexbox. Let's see how flexible this box is.

>  In the flex layout model, the children of a flex container can be laid out in any direction, and can "flex" their sizes, either growing to fill unused space or shrinking to avoid overflowing the parent.

Already I'm liking this just by the above abstract statement. The most appealing part right off the bat is that this pertains to "flexing" horizontallly AND vertically. Yup, sold.

Before you get started there are some terms that you need to understand before getting started.

<img src="http://www.w3.org/TR/css-flexbox-1/images/flex-direction-terms.svg" alt="Flexbox Terminology">

They are somewhat self explanatory but for more information refer to the [http://www.w3.org/TR/css-flexbox-1/](CSS Flexible Box specs via W3C)

<h2 class="h3">Properties</h2>

<h3 class="h4">Flex Containers</h3>

To start out Flex containers use the '<code>flex</code>' and '<code>inline-flex</code>' '<code>display</code>' values.

{% highlight css %}
display: flex | inline-flex;
{% endhighlight %}

<code>flex</code><br>
causes an element to generate a block-level flex container box

<code>inline-flex</code><br>
causes an element to generate an inline-level flex container box

<h3 class="h4">Flex Items</h3>

Flex items are the in-flow boxes generated from the contents of the element that generated the <code>flex container</code>.




