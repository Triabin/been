---
title: Java基础
order: 1
createTime: 2024/11/25 15:01:05
permalink: /coding/java/s86ymjua/
tags:
  - Java
  - 面试
---
# Java基础

## 基础概念

1. 解释Java中的多线程以及如何实现它。

   在Java中，多线程是指在一个程序中同时执行多个线程的能力。每个线程可以执行不同的任务，这样可以提高程序的执行效率，因为程序的不同部分可以并行执行。

   Java提供了几种实现多线程的方法：

   ① 继承Thread类，并重写`run()`方法，这个方法体就是线程要执行的代码，然后创建这个类，调用其`start()`方法启动线程。

   ```java
   package com.triabin.ideasy_server;
   
   import org.junit.Test;
   
   /**
    * 类描述：我的测试类
    *
    * @author Triabin
    * @date 2024-07-10 03:33:22
    */
   public class MyTest {
   
       class MyThread extends Thread {
           @Override
           public void run() {
               System.out.println("Mythread " + Thread.currentThread().getName() + " started");
           }
       }
   
       @Test
       public void test() {
           MyThread mt1 = new MyThread();
           MyThread mt2 = new MyThread();
           MyThread mt3 = new MyThread();
           mt1.start(); //Mythread Thread-0 started
           mt2.start(); //Mythread Thread-1 started
           mt3.start(); //Mythread Thread-2 started
       }
   }
   ```

   ② 实现Runnable接口，重写`run()`方法，同样地，这个方法体就是此线程要执行的代码。

   ```java
   package com.triabin.ideasy_server;
   
   import org.junit.Test;
   
   /**
    * 类描述：我的测试类
    *
    * @author Triabin
    * @date 2024-07-10 03:33:22
    */
   public class MyTest {
   
       @Test
       public void test() {
           Runnable myRunnable = () -> System.out.println("我的线程：" + Thread.currentThread().getName());
           Thread t1 = new Thread(myRunnable);
           Thread t2 = new Thread(myRunnable);
           Thread t3 = new Thread(myRunnable);
   
           t1.start(); // 我的线程：Thread-0
           t2.start(); // 我的线程：Thread-1
           t3.start(); // 我的线程：Thread-2
       }
   }
   ```

   ③ 使用线程池，可以通过`ExcutorService`来管理线程池，这样可以避免频繁创建和销毁线程所带来的开销，使用线程池可以更有效地管理系统资源。

   ```java
   package com.triabin.ideasy_server;
   
   import org.junit.Test;
   
   import java.util.concurrent.ExecutorService;
   import java.util.concurrent.Executors;
   
   /**
    * 类描述：我的测试类
    *
    * @author Triabin
    * @date 2024-07-10 03:33:22
    */
   public class MyTest {
   
       @Test
       public void test() {
           ExecutorService executor = Executors.newFixedThreadPool(10);
           for (int i = 0; i < 3; i++) {
               int finalI = i;
               executor.submit(() -> System.out.println("任务" + finalI + Thread.currentThread().getName()));
           }
           executor.shutdown();
       }
   }
   // 任务1pool-1-thread-2
   // 任务2pool-1-thread-3
   // 任务0pool-1-thread-1
   ```

2. 描述Java内存模型，特别是堆和栈的区别。

   Java内存模型中，程序中的所有变量都存储在不同的存储区域中，主要包括两个区域：堆（heap）和栈（stack）。

   * 堆（heap）：堆是Java程序运行时动态分配的内存区域，所有类的实例和数组都在堆上创建。对象的生命周期由垃圾回收（GC）算法管理了。堆内存中的对象可以被多个线程共享，通过共享对象，线程之间可以进行通信。
   * 栈（stack）：栈是Java程序中用于存储方法调用的信息区域。每当一个方法被调用时，JVM会在栈上创建一个相应的栈帧（Stack Frame），用于存储该方法的局部变量和操作数。栈内存中的数据仅限于方法内部使用，方法一旦返回，其对应的栈帧就会被销毁，内存被回收。

3. 什么事Java中的接口和抽象类，它们之间的区别是什么？

4. 解释Java中的异常处理机制，并给出一个实际应用的例子。

## 集合框架

1. 详细解释ArrayList和LinkedList的数据结构以及性能差异。
2. 如何实现HashMap的自定义排序？
3. 解释迭代器（Iterator）和列表迭代器（ListIterator）的区别。

## 泛型与类型擦除

1. 泛型的好处是什么？
2. Java中的泛型是完全类型安全的吗？为什么？

## 并发与多线程

1. 什么是死锁？如何避免死锁？
2. 解释并比较synchronized关键字与Lock接口的使用。
3. Java中的volatile关键字的作用是什么？它与synchronized的区别在哪里？

## JVM与性能优化

1. 简述JVM的内存区域划分。
2. 如何通过JVM参数进行性能调优？
3. 什么事垃圾回收（GC），并简述几种常见的GC算法。

## 设计模式

1. 解释单例模式并用Java实现。
2. 举例说明工厂模式和抽象工厂模式的应用场景及实现。

## 数据库与JDBC

1. JDBC的基本操作流程是什么？如何处理SQLException？
2. 解释PreparedStatement与Statement的区别，并指出哪个更安全、性能更好。

## 框架与库

1. Spring框架的核心特性有哪些？
2. 解释依赖注入（DI）和控制反转（IoC）的概念。

## SpringMVC的理解

**概念：** SpringMVC是一种基于Java语言开发，实现了Web MVC设计模式，请求驱动类型的轻量级Web框架。<br/>采用了MVC架构模式的思想，通过吧Model，View，Controller分离，将Web层进行职责解耦从而把复杂的Web应用分成逻辑清晰的几个组件，在SpriingMVC中有9大重要的组件：

1. MultipartResolver文件处理器

   对应的初始化方法是`initMultipartResolver(context)`，用于处理上传请求。

2. LocaleResolver当前换将处理器

   对应的初始化方法是``initLocaleResolver(context)`，SpringMVC主要有两个地方用到了Locale，一个是ViewResolver视图解析的时候；二是用到国际化资源或者主题的时候。

3. ThemeResolver主热处理器

   其对应的初始化方法是`initThemeResolver(context)`，用于解析主题，也就是解析样式、图片及它们所形成的显示效果的集合。

4. HandlerMapping处理器映射器

   其对应的初始化方法是`initHandlerMappings(context)`，在SpringMVC中会有很多请求，每个请求都需要一个Handler处理，HandlerMapping的作用便是找到请求响应的处理器Handler和Interceptor。

5. HandlerAdapter处理器适配器

   对应的初始化方法是`initHandlerAdapers(context)`，从名字上看，它就是一个适配器，HandlerAdapters主要做的事情就是如何让固定的Servlet处理方法调用灵活的Handler来进行处理。

6. HandlerExceptionResolver异常处理器

   它对应的初始化方法是`initHandlerExceptionResolvers(context)`，它的主要作用是处理其他组件产生的异常情况。

7. RequestToViewNameTranslator视图名称翻译器

   其对应的初始化方法是`initRequestToViewNameTranslator(context)`，它的作用是从请求中获取ViewName，有的Handler处理完后并没有设置View，也没有设置ViewName，这时就需要从request中获取，而RequestToViewTranslator就是为request提供狭取ViewName的实现。

8. ViewResolvers页面洁染处理器

   其对应的初始化方法是`initViewResolvers(context)`，ViewResolvers的主要作用是将String类型的视图名和Locale解析为View类型的视图。

9. FlashMapManager参数传递管理器

   其对应的初始化方法是`initFlashMapManager(context)`，在实际应用中，为了避免重复提交，我们可以在处理完post请求后重定向到另一个get请求，这个get请求可以用来返回页面青染需要的信息，FlashMap就是用于这种请求重定向场景中的参数传递。

**请求工作流程：** 在SpringMVC的九大组件中，涉及请求处理响应的核心组件分别是HandlerMapping、HandlerAdapter、ViewResolver。下图为一次完整的请求中，SpringMVC的完整工作流程：

![image-20240731233316947](https://gitee.com/triabin/img_bed/raw/master/2024/07/31/9739e6074b0852fb322829a82833097b-image-20240731233316947.png)

HandlerMapping回调用HandlerAdapter，HandlerAdapter会返回ModelAndView，ModelAndView根据用户传入的参数封装为View，交给引擎进行清染。

> 注意：ModelAndView和View不属于SpringMVC九大组件。
