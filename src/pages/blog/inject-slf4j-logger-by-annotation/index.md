---
templateKey: blog-post
title: Inject SLF4J Logger by Annotation
date: 2012-10-18T06:07:00.000Z
description: Inject SLF4J Logger by Annotation
tags:
- Old posts
---

Предлагается несложный способ заинжектить создание логгера с использованием Spring Framework.

  

Главной идеей является использование интерфейса BeanPostProcessors.  
Класс инджектор будет получать SLF4J логгер и и присваивать его к полю класса. Чтобы определить в какому именно полю будет присвоен логгер. Создадим аннотацию Loggable.  
  
  

@Retention(RetentionPolicy.RUNTIME) 
@Target(ElementType.FIELD) 
@Documented 
public @interface Loggable {
 //for slf4j
}

  

Реализация класса инджектора:  
  

@Component
public class LoggableInjector implements BeanPostProcessor {       
 public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException { 
  return bean; 
 } 
       
 public Object postProcessBeforeInitialization(final Object bean, String beanName) throws BeansException { 
  ReflectionUtils.doWithFields(bean.getClass(), new FieldCallback() { 
   public void doWith(Field field) throws IllegalArgumentException, IllegalAccessException { 
    // make the field accessible if defined private 
    ReflectionUtils.makeAccessible(field); 
    if (field.getAnnotation(Loggable.class) != null) {
     Logger log = LoggerFactory.getLogger(bean.getClass());     
     field.set(bean, log); 
    } 
   } 
  }); 
  return bean; 
 } 
}

  
И пример использования этой аннотации:  
  

@Service
public class ReportServiceImpl {
 
 @Loggable
 private Logger logger;
  
}

  
Все хорошо, но таким образом не получится определить поле logger как final.  
  

Оригинал [тут](http://java.dzone.com/articles/inject-slf4j-logger-annotation).