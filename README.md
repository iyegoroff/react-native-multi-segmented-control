${PODS_ROOT}/../../node_modules/react-native-multi-segmented-control/ios/react-native-multi-segmented-control-Bridging-Header.h

# react-native-multi-segmented-control

## Getting started

`$ npm install react-native-multi-segmented-control --save`

### Mostly automatic installation

`$ react-native link react-native-multi-segmented-control`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-multi-segmented-control` and add `RNMultiSegmentedControl.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNMultiSegmentedControl.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import iyegoroff.RNMultiSegmentedControlPackage;` to the imports at the top of the file
  - Add `new RNMultiSegmentedControlPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-multi-segmented-control'
  	project(':react-native-multi-segmented-control').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-multi-segmented-control/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-multi-segmented-control')
  	```


## Usage
```javascript
import RNMultiSegmentedControl from 'react-native-multi-segmented-control';

// TODO: What to do with the module?
RNMultiSegmentedControl;
```
