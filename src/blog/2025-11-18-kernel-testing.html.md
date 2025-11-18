---
title: How I Test My Kernel
date: 2025-11-18
tags: ["osdev"]
---

# How I Test My Kernel

Every project no matter big or small every project benefits from testing, and
kernel development is no exception. While testing userspace applications
is familiar territory, testing in kernels presents its own challenges, and
oppertunities. In this post we'll explore building a testing framework
inside the kernel, so it becomes easier to maintain.
