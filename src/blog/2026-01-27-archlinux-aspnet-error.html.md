---
title: Fixing "Prune Package data not found" in ASP.NET Core 10
date: 2026-1-27
tags: ["dotnet", "csharp"]
---

# Fixing "Prune Package data not found" in ASP.NET Core 10

Recently ASP.NET Core 10 released. And with that I decided to try it out! But
when I installed it on my [Arch Linux system](https://github.com/viktorPopp/dotfiles)
showed this warning:

```plaintext
/usr/share/dotnet/sdk/10.0.100/Sdks/Microsoft.NET.Sdk/targets/Microsoft.NET.Sdk.FrameworkReferenceResolution.targets(66,5):
error NETSDK1226: Prune Package data not found .NETCoreApp 10.0 Microsoft.AspNetCore.App.%20
To ignore this error, set the AllowMissingPrunePackageData to true.
```

And I thought that was kind of odd. So I looked through a [GitHub issue](https://github.com/dotnet/sdk/issues/52058)
and found the solution. You basically just need to install the
`aspnet-targeting-pack` package from the `extra` repository.
