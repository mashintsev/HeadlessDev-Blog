---
templateKey: blog-post
title: Java program to determine Type of object at runtime
date: 2012-10-02T04:46:00.000Z
description: Java program to determine Type of object at runtime
tags:
- Old posts
---

  

/**  
 * **Java program to determine type of Object at runtime in Java**.  
 \* you can identify type of any object by three ways i..e by using instanceof,  
 \* getClass() and isInstance() method of java.lang.Class.  
 \* Java does have capability to find out type of object but its not called  
 \* as RTTI (Runtime type Identification) in C++.  
 *  
 \* @author Javarevisited  
 */

  
  
**public** **class** RuntimeTypeIdentificationTest {  
  
  
    **public** **static** **void** main(**String** args\[\]) {  
        _//creating instance of sub class and storing into type of superclass_  
        Rule simpleRule = **new** BusinessRule();  
     
        _//determining type of object in Java using instanceof keyword_  
        **System**.out.println("Checking type of object in Java using instanceof ==>");  
        if(simpleRule **instanceof** Rule){  
            **System**.out.println("System rule is instance of Rule");  
        }  
        if(simpleRule **instanceof** SystemRule){  
            **System**.out.println("System rule is instance of SystemRule");  
        }  
        if(simpleRule **instanceof** BusinessRule){  
            **System**.out.println("System rule is instance of BusinessRule");  
        }  
     
        _//determining type of object in Java using getClass() method_  
        **System**.out.println("Checking type of object in Java using  getClass() ==>");  
        if(simpleRule.getClass() == Rule.**class**){  
            **System**.out.println("System rule is instance of Rule");  
        }  
        if(simpleRule.getClass() == SystemRule.**class**){  
            **System**.out.println("System rule is instance of SystemRule");  
        }  
        if(simpleRule.getClass() == BusinessRule.**class**){  
            **System**.out.println("System rule is instance of BusinessRule");  
        }  
     
        _//determining type of object in Java using isInstance() method_  
        _//isInstance() is similar to instanceof operator and returns true even_  
        _//if object belongs to sub class._  
        **System**.out.println("Checking type of object in Java using  isInstance() ==>");  
        if(Rule.**class**.isInstance(simpleRule)){  
            **System**.out.println("SystemRule is instance of Rule");  
        }  
        if(SystemRule.**class**.isInstance(simpleRule)){  
            **System**.out.println("SystemRule is instance of SystemRule");  
        }  
        if(BusinessRule.**class**.isInstance(simpleRule)){  
            **System**.out.println("SystemRule is instance of BusinessRule");  
        }  
    }  
  
}  
  
**class** Rule{  
    **public** **void** process(){  
        **System**.out.println("process method of Rule");  
    }  
}  
  
**class** SystemRule **extends** Rule{  
  
    @**Override**  
    **public** **void** process(){  
        **System**.out.println("process method of SystemRule class");  
    }  
}  
  
**class** BusinessRule **extends** Rule{  
  
    @**Override**  
    **public** **void** process(){  
        **System**.out.println("process method of Business Rule class");  
    }  
}  
  
**Output:**  
Checking type of object in Java using **instanceof** ==>  
SystemRule is instance of Rule  
SystemRule is instance of BusinessRule

  
Checking type of object in Java using  getClass() ==>  
SystemRule is instance of BusinessRule

  
Checking type of object in Java using  isInstance() ==>  
SystemRule is instance of Rule  
SystemRule is instance of BusinessRule