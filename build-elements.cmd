@echo Building app-list element app
@echo off
cd ./elements/app-list
call yarn
call yarn element
cd ../..
@echo Building app-one element app
@echo off
cd ./elements/app-one
call yarn
call yarn element
cd ../..
@echo Building app-three element app
@echo off
cd ./elements/app-three
call yarn
call yarn element
cd ../..
@echo Building app-four element app
@echo off
cd ./elements/app-four
call yarn
call yarn element
cd ../..
@echo Building element apps from MultipleProjects workspace
@echo off
cd ./elements/multiple-projects
call yarn
call yarn element:one
call yarn element:two
cd ../..

