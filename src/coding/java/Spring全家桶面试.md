---
title: Spring全家桶面试
createTime: 2024/11/25 15:01:46
permalink: /coding/java/87ws893e/
tags:
  - Spring
  - Java
---
# Spring全家桶面试

文章来源：[面试重灾区——Spring全家桶：Spring/SpringBoot/SpringCloud/MVC/SpringCloudAlibaba，肝完就跳槽【马士兵】](https://www.bilibili.com/video/BV1kf421v7Ja)

## 0、答题技巧引入

充分利用总分的思路答题，首先总结中指出当前问题要回答的是哪些点，然后再分开阐述每一个点（如果有不清楚的点，可以考虑直接忽略过去），面试过程中不可能每一个字都让别人听清楚，所以只需要在回答中尽可能地提及到重要的关键字，让别人能和你继续聊下去（关键字也可以尽可能地往自己擅长的领域靠），突出一些技术名词（核心概念、接口、类、关键方法）。

1. 谈谈SpringIOC的理解、原理与实现。

   关键字：控制反转、容器

   **控制反转:** 理论思想，使用Spring之前，对象由使用者手动控制，使用Spring后，可以把对象交给Spring进行管理（延伸：依赖注入[DI]，把对应属性的值注入到具体的对象中，`@Autowired`、`populateBean`等完成属性值的注入。

   **容器:** 使用Map结构来存储具体管理的对象，在Spring中一般存在三级缓存，`singletonObjects`存放完整的bean对象，整个bean生命周期，从创建到使用再到销毁都是由容器来管理。（这里带出来两个衍生问题，一个是三级缓存，另一个是bean的生命周期）

2. 谈一下SpringIOC的底层实现。

3. 描述一下bean的生命周期。

4. Spring是如何解决循环依赖问题的？

5. Bean Factory与FactoryBean有什么区别？

6. Spring中用到的设计模式有哪些？

7. SpringAOP的底层实现原理？

8. Spring的事务是如何回滚的？

9. 谈一下Spring事务传播。

## 1、Spring

## 2、SpringMVC

## 3、SpringBoot

## 4、SpringCloud

## 5、SpringCloudAlibaba
