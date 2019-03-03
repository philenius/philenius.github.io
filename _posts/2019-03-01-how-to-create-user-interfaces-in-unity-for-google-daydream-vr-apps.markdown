---
layout: post
title:  "How to create user interfaces in Unity for Google Daydream VR apps"
date:   2019-03-01 23:41:04 +0000
categories: [virtual-reality]
tags: [Google Daydream, Unity, VR, virtual reality]
---

In the last two months, I've been experimenting with _Google Daydream View_ and I created a few demo applications in Unity. Throughout my experiments, I stumbled upon the difficulty to create user interfaces in VR. In this blog post, I'll describe how you can create UIs for your VR app build with the [Google VR SDK for Unity](https://github.com/googlevr/gvr-unity-sdk).

## Types of UI

In general, you can differentiate between two different kinds of user interfaces.

### Non-diegetic
Non-diegetic UIs are typically used to display the player's health or score. This kind of UI is often referred to as HUD (Heads Up Display). The UI sticks to the user's view by following the head movement of the user.

![](/assets/2019-03-01_nonDiegeticUserInterfaceVirtualRealityDaydream.gif)

### Spatial UI
Spatial UIs are user interfaces that are placed somewhere in the 3D environment of your scene. They stick to a certain position in the world so that the user has to move its head in order to see it.

![](/assets/2019-03-01_spatialUserInterfaceVirtualRealityDaydream.gif)

## Steps for creating a user interface

At this point, I assume that you have already setup a scene in Unity that contains all game objects required for Daydream.

![](/assets/2019-03-01_unityBasicSetupDaydreamScene.png)

Now, to create a user interface follow these steps:

1. Add a canvas to the hierarchy of game objects.
   * If you want to create a non-diegetic UI, then add the canvas as a child of your main camera like so:  
     ![](/assets/2019-03-01_unitySceneHierarchyNonDiegeticUI.png)
   * If you want to create a spatial UI, then place the canvas as a sibling to the player's game object like so:  
     ![](/assets/2019-03-01_unitySceneHierarchySpatialUI.png)

2. Select the canvas and set the `Render Mode` in the inspector tab to `World Space`.

3. Resize the canvas until it fits the player's view.

4. Add the script `GvrPointerGraphicRaycaster` to the canvas. If you have multiple canvas' in your scene, then you must add this script to each canvas.

5. Remove the script `Graphic Raycaster` from the canvas. Otherwise, your main camera will draw a second raycast on your UI and will interfer with the raycasts send by your controller / laser.

6. Select the main camera and add the script `GvrPointerPhysicsRaycaster`.

7. Now, you can add a button or any other UI control to your canvas. The player can automatically interact with the UI elements with the Daydream controller.