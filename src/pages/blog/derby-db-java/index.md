---
templateKey: blog-post
title: Derby DB. Настройка соединения из Java
date: 2011-08-03T05:12:00.000Z
description: Derby DB. Настройка соединения из Java
tags:
- Old posts
---

Derby DB представляет собой очень маленькую базу данных и размещается в файловой системе. Ее можно использовать для небольших проектов. БД очень проста в администрировании и настройке. Тем самым ее использование позволит разрабатывать быстрее несложные проекты.  
  
В пакет JDK 1.6.0_26 не входить библиотеки для работы с Derby DB. Так что работы с БД нужно их [скачать](http://db.apache.org/derby/derby_downloads.html). Также Derby DB входить в среду NetBeans 7.0.  

В данной статье будет рассмотрен случай работы с Derby DB, который входит в NetBeans 7.

На вкладке "Службы" в листе "Databases" уже есть настроенное соединение к базе "sample".

[![](/img//img/9d071d8e-7900-4d90-b42f-ae80c1dca620.jpg)](http://1.bp.blogspot.com/-TApm35nkamY/Tjj_qobLpDI/AAAAAAAADzE/cCPhk3-Y-b8/s1600/DerbyDB1.png)

  

Раскрыв узел с соединения, можно увидеть список схем, таблиц и названия колонок. Также возможно выполнять sql-команды.

Для соединения к базе данных из java кода необходимо к существующему проекту добавить jdbc классы.

[![](/img/fdd286d3-ba92-482c-8437-282dbba71751.png)](http://3.bp.blogspot.com/--tu-yQJUtK4/TjkBbp6bd3I/AAAAAAAADzQ/1olQHy0_tyw/s1600/DerbyDB2.png)

  

Далее создать Global library под названием "Derby" и "DerbyClient" и выбрать соответствующие jar файлы derby.jar и derbyclient.jar. Первая будет использоваться для соединения к БД напрямую, а вторая через сеть(даже если БД размещена на локальной машине). Jar файлы можно найти в папке 

C:Program Filesglassfish-3.1javadblib.

Теперь можно перейти к написанию кода. Собственно код для соединения к базе выглядит так:

  

package ru.mashintsev.db.derby;

  

import java.sql.Connection;

import java.sql.DriverManager;

import java.sql.ResultSet;

import java.sql.Statement;

import java.util.Properties;

  

/**

 *

 \* @author MIV

 */

public class TestDerby {

  

    public void connectAndSelect() {

        Connection connection = null;

        Statement statement = null;

        try {

            String driverDerby = "org.apache.derby.jdbc.ClientDriver";

            Class.forName(driverDerby).newInstance();

            Properties props = new Properties();

            props.setProperty("user", "app");

            props.setProperty("password", "app");

            connection = DriverManager.getConnection("jdbc:derby://localhost:1527/sample", props);

            statement = connection.createStatement();

            ResultSet resultSet = statement.executeQuery("select * from customer");

            while (resultSet.next()) {

                System.out.println(resultSet.getString("name"));

            }

        } catch (Exception e) {

            e.printStackTrace(System.out);

        } finally {

            try {

                if (statement != null) {

                    statement.close();

                }

                if (connection != null) {

                    connection.close();

                }

            } catch (Exception e) {

                e.printStackTrace(System.out);

            }

        }

    }

}