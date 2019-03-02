---
layout: post
title:  "How to create a UI in your Daydream app using the Google VR SDK for Unity"
date:   2019-03-01 23:41:04 +0000
categories: [virtual-reality]
tags: [Google Daydream, Unity, VR]
---

In the last two months, I've been experimenting with _Google Daydream View_ and I created a few demo applications in Unity. Throughout my experiments, I stumbled upon the difficulty to create user interfaces in VR. In this blog post, I'll describe how you can create UIs for your VR app build with the [Google VR SDK for Unity](https://github.com/googlevr/gvr-unity-sdk).

In general, you can differentiate between two different kinds of user interfaces:
* UIs that stick to the user's view by following the head movement of the user. For creating this kind of UI simply add the canvas as a child of your main camera.
* UIs that stick to a certain position in the 3D space of your scene. To create such a UI you need to place the canvas apart from your player's game object and the main camera object.

At this point, I assume that you have already setup a scene in Unity that contains all game objects required for Daydream. To create a user interface follow these steps:

1. Add a canvas to the hierarchy of game objects.

2. Select the canvas and set the `Render Mode` in the inspector tab to `World Space`.

3. Resize the canvas until it appears in the player's view.

4. Add the script `GvrPointerGraphicRaycaster` to the canvas. If you have several canvas in your scene, then you must add this script to each canvas.

5. Remove the script `Graphic Raycaster` from the canvas. Otherwise, your main camera will draw a second raycast on your UI and will interfer with the raycasts send by your controller / laser.

6. Select the main camera and add the script `GvrPointerPhysicsRaycaster`.

7. Now, you can add a button or any other UI control to your canvas. The player can automatically interact with the UI elements through its controller.