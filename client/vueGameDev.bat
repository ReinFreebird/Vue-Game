@echo off
echo.




echo Environment variables are successfully added.
echo. 
echo. 
echo. 


CD /d D:
CD "\WebAppProjects\Vue-Game\client"
echo "%cd%"

echo Starting Project View Development Mode
echo. 
echo. 
echo.
set NodePackagesPath=D:\WebAppProjects\Vue-Game\client

set Path=%NodePackagesPath%\node_modules\.bin;%PATH%
set Path=%NodePackagesPath%;%PATH%

set NODE_PATH=%NodePackagesPath%\node_modules;%NODE_PATH%
set NODE_ENV=development;


npm run serve



pause