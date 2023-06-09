@echo ============================
@echo Running nest.js api
@echo ============================
@echo off
cd back
call yarn > nul
start "" cmd /c yarn start
@echo Completed successfully
cd ..

@echo ============================
@echo Running Angular application
@echo ============================
@echo off
cd front
call yarn > nul
start "" cmd /c yarn start
@echo Completed successfully