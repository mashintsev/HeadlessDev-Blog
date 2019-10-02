---
title: How to Mount SMB Shares on CentOS 7
description: >
  In this tutorial, you will learn how to mount SMB shares on CentOS 7. You will be guided through the process for both desktop and server installations of the operating system.
category: "HowTo, Linux"
cover: cover.jpg
author: Ivan Mashintsev
---

# How to Mount SMB Shares on CentOS 7

1) Install the cifs-utils package from the default CentOS yum repository.
```
    sudo yum install cifs-utils
```

2) Next, we need an account on the CentOS server that will map to the Windows account granted permission to the SMB share, _share_library_core. We’ll create a service account named svc_library_core with a user id (UID) of 5000.
We also want a group on the CentOS server that will map to the share. This group will contain all of the Linux accounts that will need access to the share. Our account will be called share_library_core and it will have a group id (gid) of 6000.
Finally, add any Linux accounts that require access to the SMB share to the newly created Linux group. I have an existing account named user1 that I will add to the share_library_core group.
```
    sudo useradd -u 5000 flink_smb_user
    sudo groupadd -g 6000 smb_users
    sudo usermod -G smb_users -a mashintsev
    sudo usermod -G smb_users -a parsersapp
```
3) Create a directory to mount the SMB share into. We’ll mount the share in a directory called lib_core.
```
    sudo mkdir /mnt/vmcollector2
```
4) Using the mount.cifs command, mount the SMB share into lib_core using the Active Directory user account _share_library_core. We need to map the UID of our svc_library_core account (5000) and the gid of our share_library_core group (6000) to the SMB share.
```
    sudo mount.cifs \\\\VMCOLLECTOR2\\DataIn /mnt/vmcollector2 -o user=i.mashintsev-adm,pass="",uid=5000,gid=6000
```
5) Create a credentials file in Root’s home directory. I typically create this file in a sub-directory in Root’s home, for organizational reasons. But for this example, I will place it in /root.
```
    sudo touch /root/creds_vmcollector2
```
6) Modify the file’s permissions so that only the Root account is granted read permissions. No groups or other users should have access to the file.
```
    sudo chmod 0600 /root/creds_vmcollector2
```
7) Open the file in a text editor. I like using VI, but you can use whichever you prefer.
```
    sudo vi /root/creds_vmcollector2
```
8) Mount the SMB share. However, instead of using the user and pass options, we instead use the credentials option and point to our credentials file.
```
    sudo mount.cifs \\\\VMCOLLECTOR2\\DataIn /mnt/vmcollector2 -o credentials=/root/creds_vmcollector2,uid=5000,gid=6000
```
9) Open /etc/fstab into a text editor.
```
    vi /etc/fstab
```
10) Add the following line to your fstab. Remember to replace the values with those that match your environment.
```
    //VMCOLLECTOR2/DataIn /mnt/vmcollector2    cifs    credentials=/root/creds_vmcollector2,uid=5000,gid=6000 0 0
```
11) The SMB share will mount the next time the CentOS server is rebooted. To mount the share immediately, use the mount command.
```
    mount -a
```
