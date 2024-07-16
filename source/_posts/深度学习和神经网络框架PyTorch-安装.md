---
title: 深度学习和神经网络框架PyTorch 安装
date: 2023-07-16 10:24:04
tags:
---

### 安装遇到的问题
``` bash
pip3 install torch torchvision 
# 执行会遇到问题，提示
This environment is externally managed
╰─> To install Python packages system-wide, try brew install
    xyz, where xyz is the package you are trying to
    install.
If you wish to install a non-brew-packaged Python package,
create a virtual environment using python3 -m venv path/to/venv.
Then use path/to/venv/bin/python and path/to/venv/bin/pip.

If you wish to install a non-brew packaged Python application,
it may be easiest to use pipx install xyz, which will manage a
virtual environment for you. Make sure you have pipx installed.

# 大致意思就是需要一个外部环境来承载这些，不能直接装进系统里面

python3 -m venv path/to/venv
cd path/to/venv/bin

# 接下来就是重点，需要使用 path/to/venv/bin 文件下面的程序去安装
./pip3 install torch torchvision 

# 使用时也需要引用 外部环境的python去运行
../../../path/to/venv/bin/python3 test.py

```

### RuntimeError: Numpy is not available
这种就是Python 与 Numpy 包版本不兼容问题，只需要安装 制定 Numpy 版本即可
下面是 Numpy 与 Python 版本兼容文档
https://numpy.org/news/

我的是 Python 3.12.0 需要安装 NumPy 1.26.0

```bash
./pip uninstall numpy  
./pip install numpy==1.26.0   

```
