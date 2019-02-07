---
title: Build NSIS for CentOS 7
description: >
  To build Windows installer on Linux based system I using NSIS. 
  The Nullsoft Scriptable Install System (NSIS) is an open-source tool for building "setup.exe" for Windows that install your application.
category: "HowTo"
cover: centos7.png
author: Ivan Mashintsev
---
![CentOS 7](centos7.png)


To build Windows installer on Linux based system I using NSIS. Now I you how configure it on CentOS 7
and create simple installer.

The Nullsoft Scriptable Install System (NSIS) is an open-source tool for building "setup.exe" for Windows that install your application. 
In addition to installing files into their proper locations, NSIS is scriptable and can be used to implement logic during the installation process.

NSIS has two components: a compiler that you run on your build host, and also many smaller stubs which are integrated together to form the installer program. 
The stubs are Windows code, and therefore need a Windows compiler or cross-compiler. 
An easier way to install it is described at [http://nsis.sourceforge.net/Docs/AppendixG.html](http://nsis.sourceforge.net/Docs/AppendixG.html), 
which is to compile the compiler on Linux, but just extract the stubs from the regular downloadable binary of NSIS for Windows.

Let's start configure NSIS:

```
su - root

# Install libs and packages to build NSIS
yum install zlib-devel -y
wget http://download-ib01.fedoraproject.org/pub/epel/7/x86_64/Packages/p/python2-scons-3.0.1-5.el7.noarch.rpm
rpm -Uvh python2-scons-3.0.1-5.el7.noarch.rpm

# Download NSIS source and binaries
wget https://vorboss.dl.sourceforge.net/project/nsis/NSIS%203/3.04/nsis-3.04-src.tar.bz2
wget https://vorboss.dl.sourceforge.net/project/nsis/NSIS%203/3.04/nsis-3.04.zip

# Unzip bin and src into usr/local
cd /usr/local
unzip /root/nsis-3.04.zip
cd /usr/local/src
tar xjvf /root/nsis-3.04-src.tar.bz2

# Build NSIS from source and link to /usr/local/bin/makensis
cd nsis-3.04-src
scons SKIPSTUBS=all SKIPPLUGINS=all SKIPUTILS=all SKIPMISC=all NSIS_CONFIG_CONST_DATA_PATH=no PREFIX=/usr/local/nsis-3.04/bin install-compiler
ln -s /usr/local/nsis-3.04/bin/makensis /usr/local/bin/makensis

# Now you can compile NSIS script
makensis install.nsis
```
