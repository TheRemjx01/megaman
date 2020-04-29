# Challenge

Here is all the challenge I want to take note for me and everyone who interested in building your own UI library


### IDE cannot find correct declaration file
- Answer: Remove ".js" from "main": `"dist/index.js"` in `"package.json"`
- Reference: https://stackoverflow.com/questions/41292559/could-not-find-a-declaration-file-for-module-module-name-path-to-module-nam

### Cannot resolve module resolution (path) 
- Typescript don't automatically resolve path alias during compile. So in emitted code, we cannot resolve these source build
- Solution: using `tspath` after build to use it
- However, this solution has a trouble, trouble is tspath only resolve js source but not declaration file. ===> Still hard to jump to source using IDE (in my case it's Webstorm)


