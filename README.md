# react-detachable-window
ReactDetachableWindow wraps a portion of the DOM or a group of react components and make it detachable from current window frame into a new window
it takes care to copy the stylesheets and title from the original frame into the new window or you can define your own

this project is work-in-progress at this time

## Install:

```bash
npm i react-detachable-window
```


## Use:

```javascript
import ReactDetachableWindow from 'react-detachable-window'
```

```javascript
<ReactDetachableWindow title='I am detached!' windowOptions={{width: 800, height: 600}}>
    <!-- dom elements defined here will be detached to a new popup window -->
</ReactDetachableWindow>
```

[See a live example](https://eetay.github.io/react-detachable-window)

## Component properties
* _windowOptions_ - Optional: A hash of options passed to the ```window.open(URL, name, specs, replace)``` 'specs' parameter
* _title_ - Optional: A string title for the new window
* _reattachButton_ - Optional: A jsx element which, when clicked, closes the popup window
* _detachButton_ - Optional: A jsx element which, when clicked, opens the popup window

## TODO List
* add property to define the buttons for detaching and re-attaching
* copy complete set of attributes from original window into the new popup
* allow property to define a containing DOM for the new popup

