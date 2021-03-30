---
layout: post
title:  "Installing Spin Model Checker including iSpin on Ubuntu 19.04"
date:   2020-04-09 09:00:00 +0200
categories: [software quality]
tags: [spin, ispin, model checker, software quality, verification]
---

For the lecture _Advanced Software Quality_ at Aalen University, I had to demonstrate the usage of Spin model checker for the verification of software models. iSpin represents a graphical interface for editing and executing models and for analyzing the results. iSpin invokes Spin commands in the background and graphically presents the results.

<a class="img" href="/assets/2020-04-09/ispin.png">
   ![](/assets/2020-04-09/ispin.png)
</a>

Following these steps, I managed to run Spin model checker on Ubuntu:

1. Download the Spin binary from Github and extract it to your favorite installation directory:
   ```bash
   INSTALL_DIR=/opt
   cd $INSTALL_DIR

   wget https://github.com/nimble-code/Spin/archive/version-6.5.2.tar.gz
   tar xfz version-6.5.2.tar.gz
   ```

2. Build the Spin binary:
   ```bash
   sudo apt-get install -y build-essential byacc flex graphviz
   cd $INSTALL_DIR/Spin-version-*/Src
   make
   sudo cp spin /usr/bin/
   ```

3. This is how you can execute a simple model written in [Promela](http://spinroot.com/spin/Man/Quick.html), the modeling language for Spin, from the command line:
   ```bash
   spin $INSTALL_DIR/Spin-version-*/Examples/hello.pml
   ```

4. The usage of iSpin requires the installation of _tk_, a graphical user interface toolkit:
   ```bash
   sudo apt-get install -y tk
   cd $INSTALL_DIR/Spin-version-*/optional_gui/
   ./ispin.tcl
   ```
