---
templateKey: blog-post
title: Using p4merge in GIt
date: 2012-11-06T12:11:00.000Z
description: Using p4merge in GIt
tags:
- Old posts
---

Invariably when working on files, you'll edit a file, and wonder how it differs from what you've previously committed, or staged to commit with a "git add." You can discover these differences with the "git diff" command.

"git diff" shows the difference between what's in your working directory, what your currently working on, and what's in your index staged to be committed next, or is already committed.  It will look at the same files in each place and show you the differences in the files.  To test this out change a file that you already have committed and then run "git diff."

When more than one developer is working on a project a three way difference may occur between the two developers working on a file, and the previously committed version of a file.  These conflicts arise when you try to merge two branches together with a "git merge," or a recent "git pull" from another repository may produce a merge conflict.

  

The problem with both diff and merge is sometimes there are multiple differences in the files, and changes can be extensive.  Its difficult to rectify any conflicts from the command line, besides a Window GUI is nicer for this type of conflict resolution. The diff/merge is typically done in an editor specifically designed to show files side by side with changes highlighted.

Git has two commands that will launch the diff/merge editor full screen from the command line, "git difftool" and "git mergetool."   Which ever file comparison editor you use, it needs to be configured in Git so the "git difftool" and "git mergetool" command will bring up the editor with the correct files loaded.

There is one caveat, in order to run "git difftool' or "git mergetool" you have to first run "git diff" or "git merge" and have a difference or conflict.  The editor will then launch with the correct files ready for editing.

Two questions come to mind. Which tool should I use? How do I configure it to run when you type "git difftool" or "git mergetool" in git?

There are several valid Git merge tools listed in the Git documentation: kdiff3, tkdiff, meld, xxdiff, emerge, vimdiff, gvimdiff, ecmerge, diffuse, tortoisemerge, opendiff, P4merge and Araxis.

Download p4merge from [here](http://www.perforce.com/downloads/complete_list).  
  
For Windows:  
  
Installation:  
Install only p4merge visual client. Then try to check correct installation. Run "cmd" and type p4merge. If program didn't run, add path to folder with p4merge to system environment.  
  
Git configuration:  
  
Edit file ".gitconfig". It is usually in home directory of user. You must put this in your file:  
  
  
\[diff\]  
    tool = p4merge  
\[difftool "p4merge"\]  
    cmd = "p4merge.exe $LOCAL $REMOTE"  
\[merge\]  
    tool = p4merge  
\[mergetool "p4merge"\]  
    cmd = "p4merge.exe $BASE $LOCAL $REMOTE $MERGED"  
    trustExitCode = true  
    keepBackup = false  
  
  
For Mac:  
  
  

## Download and Install P4V

Download the free Perforce Visual Client [dmg](http://www.perforce.com/downloads/perforce/r08.2/bin.macosx104x86/P4V.dmg) from [here](http://www.perforce.com/perforce/downloads/index.html). Once it’s downloaded, copy p4merge from the disk image to your /Applications directory.

## Write some simple shell scripts

### p4merge*

Create a new text file in /usr/local/bin called p4merge and add the following lines:

#!/bin/sh
/Applications/p4merge.app/Contents/MacOS/p4merge $*

Make the script executable by entering this command:

chmod +x p4merge

### p4diff*

Create a new text file in /usr/local/bin called p4diff and add the following lines:

#!/bin/sh
\[ $# -eq 7 \] && /usr/local/bin/p4merge "$2" "$5"

Make the script executable by entering this command:

chmod +x p4diff

## Configure Git to use the scripts

Open your git configuration file (probably ~/.gitconig) and add these lines:

\[merge\]
 keepBackup = false;
 tool = p4merge
\[mergetool "p4merge"\]
 cmd = p4merge "$BASE" "$LOCAL" "$REMOTE" "$MERGED"
 keepTemporaries = false
 trustExitCode = false
 keepBackup = false
\[diff\]
 external = p4diff

## Use it!

That’s it. Now when you run git-mergetool or git-diff the visual Perforce merge tool will launch with the files you want to merge or diff. Hope this helps!