---
templateKey: blog-post
title: Migration from svn to git
date: 2012-10-04T03:36:00.000Z
description: Migration from svn to git
tags:
- Old posts
---

  

Create a users file (i.e. users.txt) for mapping SVN users to GIT:

user1 = First Last Name <email@address.com>
user2 = First Last Name <email@address.com>
...

SVN will stop if it finds a missing SVN user not in the file. But after that you can update the file and pick-up where you left off.

Now pull the SVN data from the repo:

git svn clone --stdlayout --no-metadata -A users.txt svn://hostname/path dest_dir-tmp

  
This command will create a new git repo in dest_dir-tmp and start pulling the SVN repo. Note that the "--stdlayout" flag implies you have the common "trunk/branches/tags" svn layout.

If a user name is not found, update your users.txt file then:

cd dest_dir-tmp
git svn fetch

When completed, git will checkout the SVN trunk into a new branch. Any other branches are setup as remotes. You can view the other SVN branches with:

git branch -r

If you want to keep other remote branches in your repo, you want to create a local branch for each one manually. If you don't do this, the branches won't get cloned in the final step.

git checkout -b local\_branch remote\_branch
\# it's ok if local\_branch and remote\_branch are the same name

Tags are imported as branches. You have to create a local branch, make a tag and delete the branch to have them as tags in git. To do it with tag "v1":

git checkout -b tag_v1 remotes/tags/v1
git checkout master
git tag v1 tag_v1
git branch -D tag_v1

Clone your GIT-SVN repo into a clean git repo:

git clone dest\_dir-tmp dest\_dir
rm -rf dest_dir-tmp

Finally, remove the remote from your clean git repo that points to the now deleted temp repo:

git remote rm origin

\+ plus [link](http://blokspeed.net/blog/2010/09/converting-from-subversion-to-git/)