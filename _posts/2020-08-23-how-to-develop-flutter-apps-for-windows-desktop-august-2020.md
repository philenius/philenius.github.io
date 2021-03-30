---
layout: post
title:  "How to develop Flutter apps for Windows desktop (August 2020)"
date:   2020-08-23 12:00:00 +0000
categories: [app-development]
tags: [Flutter, Dart, desktop, Windows]
---

Flutter is an awesome framework for developing native cross-platform apps with a single code-base for Android, iOS, Windows, Linux, and macOS. In this blog post, I'll explain how to set up your computer for developing Flutter apps which you can run on Windows desktop.

As recently [stated by Tim Sneath](https://medium.com/flutter/flutter-and-desktop-3a0dd0f8353e), the product manager for Flutter, support for Windows desktop _"remains in technical preview, and the APIs and tooling are not yet stable"_. Despite this, I was surprised how far Flutter's desktop support has come. Writing Flutter apps for desktop is not much different than doing so for Android / iOS. Build times are fast. Of course, you can use pre-existing widgets or implement your own. Only, there aren't many packages/plugins with desktop support, e.g. Flutter doesn't provide access to the Windows file picker for selecting files.

Without further ado, let's get started:

1. Download the [latest installation bundle for Flutter](https://flutter.dev/docs/get-started/install/windows).

2. Extract the zip file to your favorite destination. I'm going to choose `C:\bin\flutter`.

3. Add the Flutter installation directory to your PATH so that you can run Flutter commands from your favorite command line/shell. In my case, it's `C:\bin\flutter\bin`. Make sure that this directory contains the binaries `flutter` and `dart`.

4. Open a terminal/console and type `flutter doctor`. This command evaluates your installations and informs you about missing platform dependencies. The output should look similar to this:

    ```bash
    $ flutter doctor
    Doctor summary (to see all details, run flutter doctor -v):
    [√] Flutter (Channel stable, 1.20.2, on Microsoft Windows [Version 10.0.17763.107], locale en-DE)
    [X] Android toolchain - develop for Android devices
        X Unable to locate Android SDK.
        Install Android Studio from: https://developer.android.com/studio/index.html
        On first launch it will assist you in installing the Android SDK components.
        (or visit https://flutter.dev/docs/get-started/install/windows#android-setup for detailed instructions).
        If the Android SDK has been installed to a custom location, set ANDROID_SDK_ROOT to that location.
        You may also want to add it to your PATH environment variable.
    
    [!] Android Studio (not installed)
    [√] VS Code (version 1.48.1)
    [!] Connected device
        ! No devices available
    
    ! Doctor found issues in 3 categories.
    ```

    In this case, the output of `flutter doctor` shows three issues:
      * The missing Android toolchain is not of relevance as we want to develop a Flutter app for Microsoft Windows.
      * For developing Flutter apps, you can choose between Android Studio and Visual Studio Code. In my case, I have already installed the latter. I can highly recommend Visual Studio Code. So far, I have experienced no restrictions using VS Code for developing Flutter apps. More than that, VS Code is much more lightweight than Android Studio.
      * There are no connected devices available. We'll fix this issue later.

5. Install either Visual Studio Code or Android Studio. If you chose to install Visual Studio Code, then you'll need to install the Flutter plugin manually. For this purpose, open VS Code, go to the _Extensions_ tab and search for _Flutter_. This plugin brings support for Dart and starting/stopping/debugging Flutter applications.

6. As of August 2020, you need to be on the _master channel_ of Flutter, if you want to develop apps for Windows. Per default, the _stable_ channel is activated. Let's change this by running these two commands:
    ```bash
    flutter channel master
    flutter upgrade
    ```

7. Create your Flutter app and enable Windows desktop support:
    ```bash
    flutter create myapp
    cd myapp/
    flutter config --enable-windows-desktop
    ```
8. If you try to run the previously created app, Flutter will complain that there are no compatible devices. Run `flutter doctor` to find out why:
    ```bash
    $ flutter doctor
    Doctor summary (to see all details, run flutter doctor -v):
    [√] Flutter (Channel master, 1.22.0-2.0.pre.48, on Microsoft Windows [Version 10.0.17763.107], locale en-DE)
    [X] Android toolchain - develop for Android devices
        X Unable to locate Android SDK.
          Install Android Studio from: https://developer.android.com/studio/index.html
          On first launch it will assist you in installing the Android SDK components.
          (or visit https://flutter.dev/docs/get-started/install/windows#android-setup for detailed instructions).
          If the Android SDK has been installed to a custom location, set ANDROID_SDK_ROOT to that location.
          You may also want to add it to your PATH environment variable.
    
    [X] Visual Studio - develop for Windows
        X Visual Studio not installed; this is necessary for Windows development.
          Download at https://visualstudio.microsoft.com/downloads/.
          Please install the "Desktop development with C++" workload, including all of its default components
    [!] Android Studio (not installed)
    [√] VS Code (version 1.48.1)
    [√] Connected device (1 available)
    
    ! Doctor found issues in 3 categories.
    ```

    Oops, there's a new issue. Developing Flutter apps for Windows requires the installation of Visual Studio.

9. [Download and install Visual Studio](https://visualstudio.microsoft.com/downloads/) (the _Community_ edition is free to use). **Important:** as in the output of `flutter doctor` denoted, please install the _Desktop development with C++_ workload, including all of its default components. 

    <a class="img" href="/assets/2020-08-23/visualStudioInstallationWizard.png">
        ![](/assets/2020-08-23/visualStudioInstallationWizard.png)
    </a>

10. If you re-run `flutter doctor`, then there should be only two issues remaining:
    ```bash
    $ flutter doctor
    Doctor summary (to see all details, run flutter doctor -v):
    [√] Flutter (Channel master, 1.22.0-2.0.pre.48, on Microsoft Windows [Version 10.0.17763.107], locale en-DE)
    [X] Android toolchain - develop for Android devices
        X Unable to locate Android SDK.
          Install Android Studio from: https://developer.android.com/studio/index.html
          On first launch it will assist you in installing the Android SDK components.
          (or visit https://flutter.dev/docs/get-started/install/windows#android-setup for detailed instructions).
          If the Android SDK has been installed to a custom location, set ANDROID_SDK_ROOT to that location.
          You may also want to add it to your PATH environment variable.
    
    [√] Visual Studio - develop for Windows (Visual Studio Community 2019 16.7.2)
    [!] Android Studio (not installed)
    [√] VS Code (version 1.48.1)
    [√] Connected device (1 available)
    
    ! Doctor found issues in 2 categories.
    ```

    As stated before, the issues w.r.t. the Android toolchain and Android Studio can be ignored in our case.

11. Finally, we can run our Flutter app. You can do so in Visual Studio Code by opening one of the Dart files in `myapp/lib/` and pressing F5 on your keyboard. Alternatively, you can execute `flutter run` in the root directory of your app:

    ```bash
    $ flutter run
    Launching lib\main.dart on Windows in debug mode...
    Building Windows application...
    Waiting for Windows to report its views...                           2ms
    Syncing files to device Windows...                               1,030ms
    
    Flutter run key commands.
    r Hot reload.
    R Hot restart.
    h Repeat this help message.
    d Detach (terminate "flutter run" but leave application running).
    c Clear the screen
    q Quit (terminate the application on the device).
    An Observatory debugger and profiler on Windows is available at: http://127.0.0.1:51854/YXlEoTVxsOE=/
    ```

12. Congratulation, you successfully created your first Flutter app for Windows desktop!!! You should see the Flutter demo app:

<a class="img" href="/assets/2020-08-23/flutterDemoApp.png">
    ![](/assets/2020-08-23/flutterDemoApp.png)
</a>

<div style="height: 2rem"></div>

> Final notes: you can run `flutter build windows` to build an executable file without debug banner. The resulting EXE file can be found at `./build/windows/runner/Release/myapp.exe`. Further information on Flutter desktop shells can be found at [the Flutter wiki](https://github.com/flutter/flutter/wiki/Desktop-shells). Happy coding!

<div style="display: table; margin: 0rem auto">
    <div style="width: 100%">
        <iframe src="https://giphy.com/embed/LmNwrBhejkK9EFP504" width="100%" height="300px" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
    </div>
</div>