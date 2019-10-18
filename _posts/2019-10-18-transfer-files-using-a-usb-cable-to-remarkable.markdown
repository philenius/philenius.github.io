---
layout: post
title:  "Transfer files using a USB cable to the reMarkable"
date:   2019-10-18 18:00:00 +0000
categories: [devices]
tags: [e-ink, table, digital notepad, file transfer, sync, reMarkable]
---

I decided to try out a so called _digital notepad_ for university so that I can take notes on my lecture manuscripts. I ended up buying the [reMarkable](https://remarkable.com/) because it seemed to be the most complete concept (there are a lot of hacks available on Github to fix some of the _reMarkable_'s flaws).

![reMarkable Note](/assets/2019-10-18/reMarkableNote.jpg)

One flaw of the _reMarkable_ is the file synchronization between your computer and the _reMarkable_. You cannot connect your _reMarkable_ to Dropbox, Google Drive, OneDrive, ownCloud, Nextcloud, etc. There are only two ways to sync your files:

1. Use the _reMarkable_ app (no Linux support) for synchronization through their cloud service.

2. Experimental feature: transfer files over USB.

In this blog post, I will briefly share my experiences with the file sync over USB to help people with their decision whether the _reMarkable_ fits their needs.

# Steps

1. Turn on your _reMarkable_.

2. Go to the device settings, select the tab `Storage` and make sure that `Enable USB web interface (Beta)` is turned on:
    ![](/assets/2019-10-18/reMarkableEnableWebInterface.jpg){: .image-margin }

3. Connect your _reMarkable_ to your computer using the micro USB cable.
    ![](/assets/2019-10-18/gretaMeme.jpg){: .center-image }

4. Open your favourite browser and navigate to `http://10.11.99.1/`:
    ![](/assets/2019-10-18/reMarkableWebUiScreenshot.png){: .center-image }

5. You can now download and upload PDF and EPUB files:
    <video width="100%" src="/assets/2019-10-18/screencaptureUploadDownload.mp4" loop autoplay controls></video>

# Observations

* You can only upload files through drag-and-drop.
* You must refresh the website in your browser to check whether the file was successfully uploaded.
* You can only download files through a righ click on a file and then through selecting the context menu entry `Download`.
* Depending on the file size and the amount of annotations & notes in your file, it might take a few seconds until the download starts.
* Folders that have been created on the _reMarkable_ are visualized on this website. You can navigate this folder structure and upload / download documents to each specific folder.

> **Good news:  
> downloaded PDF files from the _reMarkable_ automatically contain all annotations, notes, drawings & sketches.**

# Special gift: PDF file size

I created a dummy PDF file with images and a total of 5 pages. I uploaded this file to the _reMarkable_, added a lot of notes and sketches on it and then downloaded it again. The file size increased by about 50 % (from 0.886 MB to 1.3 MB). This observation contrasts with several [comments on Reddit](https://www.reddit.com/r/RemarkableTablet/comments/8ihqbs/massive_problem_when_exporting_notespdfs_from/) about exploding file sizes after exporting PDF files from the _reMarkable_.

To form your own opinion, have a look at the [original PDF file](/assets/2019-10-18/loremIpsum.pdf) and the [edited PDF file](/assets/2019-10-18/loremIpsumEdited.pdf).


For further details, see the [official documentation](https://support.remarkable.com/hc/en-us/articles/360002661337-Transferring-files-using-a-USB-cable) for file sync over USB.

> Write down in the comments below, if you have any questions. I'd be happy to help you.
