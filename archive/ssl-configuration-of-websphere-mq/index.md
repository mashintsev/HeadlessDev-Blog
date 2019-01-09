---
templateKey: blog-post
title: SSL configuration of the Websphere MQ Java/JMS client
date: 2014-05-30T09:25:00.000Z
description: SSL configuration of the Websphere MQ Java/JMS client
tags:
- Old posts
---

## Introduction

This article shows you how to configure an Secure Sockets Layer (SSL) connection from a Java™/JMS client to an IBM® WebSphere® MQ Queue Manager. It covers the creation of test certificates but does not cover any MQ configuration information. It is purely a Java/JMS client guide and requires an IBM SDK.

Steps 1, 3, and 4 below are required to configure an SSL connection. Do Step 2 only if you wish to configure client authentication. To reduce complexity and simplify debugging of any potential problems, I recommend that you not use client authentication initially. After you have a basic SSL connection, you can move up to client authentication.

If you experience configuration problems, it may help to specify the debug flag: -Djavax.net.debug=true.  

## 1\. Create trustStore

As its name suggests, the trustStore holds the certificate of a signing CA for a Queue Manager you trust. What this means in terms of the Java/JMS client is that when a connection is made to a Queue Manager, it will send its certificate to us as part of the initial SSL handshake. The JSSE, which handles all SSL communication, will look in the trustStore to validate the certificate it has just been sent. If it cannot validate the certificate, the connection will be terminated.

To create a trustStore and import a certificate, you can use the IBM Key Management tool, which is part of Websphere MQ V6:

1.  In the start bar, select **Programs => IBM Websphere MQ => IBM Key Management**.
2.  When IBM Key Management starts, click **New** and set the following values:
    
    Key database typeJKSFile nametrustStoreLocationLocation of your choice
    
3.  Click **OK** to continue.
    
    ##### Figure 1
    
    ![Set values](/img/http://www.ibm.com/developerworks/websphere/library/techarticles/0510_fehners/images/image001.jpg)
4.  You will now be prompted to enter a password of your choice. The password is required to open the trustStore only if you wish to add certificates to it. The JSSE does not require a password if it is only being used as a trustStore. For this example, enter a password.
5.  Click **OK** to continue. You should now have a trustStore in which you can import certificates of trusted CAs.
6.  Select the drop-down box under the label **Key database content**.
7.  Select **Signer Certificates**.
    
    ##### Figure 2
    
    ![Select Signer Certificates](/img/http://www.ibm.com/developerworks/websphere/library/techarticles/0510_fehners/images/image002.jpg)
8.  Click **Add**. You will be prompted for the location of the certificate you wish to add. This certificate will either be the Queue Managers certificate if you are using self-sign certificates for testing, or the certificate of the CA, which issued your Queue Managers certificate. For information on configuring the Queue Manager for SSL, see the MQ Security manual, Chapter 13.
9.  Enter the following data:
    
    Data typeBinary DER dataCertificate file nameLocation
    
10.  Click **OK**. You will be prompted for a label, which should be in the form <ibmwebspheremq<qmname lowercase>.
11.  Click **OK** to add the certificate.

## 2\. Create keyStore

Complete this section only if you wish to have client authentication when a connection is made to a Queue Manager. If client authentication has not been specified on the channel, you do not need to complete this section.

The keyStore is essentially the same as a trustStore, except that it holds the client's personal certificate, and the JSSE requires a password for access. You can in fact add your personal certificate to the trustStore created earlier and it will act as both trustStore and keyStore, but the password that was not required before will now need to be passed to the JSSE in order for it to access your personal certificate.

To create a KeyStore, follow the steps in Section 1, replacing trustStore with keyStore, up to the point of adding a CAs certificate. At that point, complete these steps:

1.  Select the drop-down box under the label **Key database content**.
2.  Select **Personal Certificates**:
    
    ##### Figure 3
    
    ![Select Personal Certificates](/img/http://www.ibm.com/developerworks/websphere/library/techarticles/0510_fehners/images/image004.jpg)
3.  Click **New Self-Signed**. This will create a test certificate for yourself.
4.  If you already have a certificate issued to you, click **Receive** to add it:
    
    ##### Figure 4
    
    ![Receive](/img/http://www.ibm.com/developerworks/websphere/library/techarticles/0510_fehners/images/image005.jpg)
    
    Unlike creating a Queue Manager personal Certificate, there is no restriction on the Key Label that must be used.
    
5.  Enter the details as shown above.
6.  Click **OK** to finish.

The last part of setting up the keyStore is to add your certificate or your CAs certificate to the Queue Managers key repository, so that when the client sends its certificate, the Queue Manager can validate it. Here is how to extract your certificate from the keyStore so that you can add it to the Queue Managers key repository:

1.  Select the drop-down box under the label **Key database content**.
2.  Select **Personal Certificates**.
3.  Select your certificate.
4.  Click **Extract Certificate**.
    
    ##### Figure 5
    
    ![Click Extract Certificate](/img/http://www.ibm.com/developerworks/websphere/library/techarticles/0510_fehners/images/image006.jpg)
5.  Enter name for certificate.
6.  Specify a location.
7.  Click **OK** to finish.

Once you have completed this task, all you need to do is to add it to your Queue Managers repository.

## 3\. Assign trustStore and keyStore to application

You can pass the location of the trustStore and KeyStore to the JSSE using either system properties set within the application, or the -D flag on the command line. To set them within the application, use the code below. The location of the trustStore and the keyStore can point to the same file:

         System.setProperty("javax.net.ssl.trustStore","<location of trustStore>");
         System.setProperty("javax.net.ssl.keyStore","<location of keyStore>");
         System.setProperty("javax.net.ssl.keyStorePassword","<password>");

To use the the -D flag:

java     -Djavax.net.ssl.trustStore=<location of trustStore>
         -Djavax.net.ssl.keyStore=<location of keyStore>
         -Djavax.net.ssl.keyStorePassword=<password><app>

## 4\. Configure CipherSuite

The Channel you wish to connect to should have a CipherSpec defined. Within the Java/JMS application a CipherSuite needs to be specified that matches the CipherSpec. The following table will help you do this:

CipherSpecs and CipherSuites  

NULL_MD5

SSL\_RSA\_WITH\_NULL\_MD5

NULL_SHA

SSL\_RSA\_WITH\_NULL\_SHA

RC4\_MD5\_EXPORT

SSL\_RSA\_EXPORT\_WITH\_RC4\_40\_MD5

RC4\_MD5\_US

SSL\_RSA\_WITH\_RC4\_128_MD5

RC4\_SHA\_US

SSL\_RSA\_WITH\_RC4\_128_SHA

RC2\_MD5\_EXPORT

SSL\_RSA\_EXPORT\_WITH\_RC2\_CBC\_40_MD5

DES\_SHA\_EXPORT

SSL\_RSA\_WITH\_DES\_CBC_SHA

RC4\_56\_SHA_EXPORT1024

SSL\_RSA\_EXPORT1024\_WITH\_RC4\_56\_SHA

DES\_SHA\_EXPORT1024

SSL\_RSA\_EXPORT1024\_WITH\_DES\_CBC\_SHA

TRIPLE\_DES\_SHA_US

SSL\_RSA\_WITH\_3DES\_EDE\_CBC\_SHA

TLS\_RSA\_WITH\_AES\_128\_CBC\_SHA

SSL\_RSA\_WITH\_AES\_128\_CBC\_SHA

TLS\_RSA\_WITH\_AES\_256\_CBC\_SHA

SSL\_RSA\_WITH\_AES\_256\_CBC\_SHA

AES\_SHA\_US

TLS\_RSA\_WITH\_DES\_CBC_SHA

SSL\_RSA\_WITH\_DES\_CBC_SHA

TLS\_RSA\_WITH\_3DES\_EDE\_CBC\_SHA

SSL\_RSA\_WITH\_3DES\_EDE\_CBC\_SHA

FIPS\_WITH\_DES\_CBC\_SHA

SSL\_RSA\_FIPS\_WITH\_DES\_CBC\_SHA

FIPS\_WITH\_3DES\_EDE\_CBC_SHA

SSL\_RSA\_FIPS\_WITH\_3DES\_EDE\_CBC_SHA

CipherSpec

CipherSuite

You can specify the CipherSuite in a number of places.

If you are using the MQ Java Client, you can specify the String in MQEnvironment.SSLCipherSuite:

MQEnvironment.sslCipherSuite = "SSL\_RSA\_WITH\_NULL\_MD5";

You can also pass the String within a Hashtable using the key MQC.SSL\_CIPHER\_SUITE_PROPERTY to the QueueManager constructor or theMQEnvironment.properties Hashtable:

MQEnvironment.properties.put(MQC.SSL\_CIPHER\_SUITE\_PROPERTY, "SSL\_RSA\_WITH\_NULL_MD5");

Or:

Hashtable properties = new Hashtable();
properties.put(MQC.SSL\_CIPHER\_SUITE\_PROPERTY, "SSL\_RSA\_WITH\_NULL_MD5");
MQQueueManager myQM = new MQQueueManager("MyQMgr", properties);

If you are using the MQ JMS client, you can set the CipherSuite on the connection factory using the setSSLCipherSuite() method:

MQConnectionFactory factory = new MQConnectionFactory();
factory.setTransportType(JMSC.MQJMS\_TP\_CLIENT\_MQ\_TCPIP);
factory.setQueueManager("MyQMgr");
factory.setSSLCipherSuite("SSL\_RSA\_WITH\_NULL\_MD5");
factory.setPort(1414);
factory.setHostName("127.0.0.1");
MQConnection connection = factory.createConnection();

## Conclusion

This article has shown you how to:

*   Create a TrustStore and import the Queue Managers certificate into it.
*   Create a KeyStore in which to hold the test certificate you have created.
*   Assign these to your application and configure the Websphere MQ JMS client to use them.

