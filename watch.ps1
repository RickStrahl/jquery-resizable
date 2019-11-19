# This script launches a local Web Server that includes Live Reload functionality
# and navigates to the sample page.

# Requires the Dotnet Core 3.0+ SDK on Windows, Mac or Linux 
# To install:
#
# dotnet tool install -g LiveReloadServer  

Start-Process -FilePath 'http://localhost:5200/sample'

LiveReloadServer --OpenBrowser false