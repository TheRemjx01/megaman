# megaman
Megaman is a collection of some cool React component that simplify logic handling in your code.

## Install
```npm
npm i @theremjx01/megaman
```
or with yarn:
```npm
yarn add @theremjx01/megaman
```

## Collection

See [Megaman story-book](https://theremjx01.github.io/megaman/index.html) for live documentation and interaction

* [Components](#Components)
    + [`Hidden`](#hidden)
    + [`FlowManagerReminder`](#FlowManagerReminder)
    + [`MockBrowser`](#MockBrowser)
* [Higher-order Components](#higher-order-Components)
    + [`flowManager.withIncompleteFlow`](#withIncompleteFlow)
    + [`flowManager.withSetFlowStepHandlers`](#withSetFlowStepHandlers)

### Components    
#### `Hidden`
This component help you to control visible of component without manual control.

Example:
 
``` typescript jsx
import * as React from 'react';
import { Fragment } from 'react';
import { Hidden } from '@theremjx01/megaman';

const WithoutHidden = () => (
  <Fragment>
   {true && 'This block will always be hidden'}
   {false && 'This block will always be visible'}
  </Fragment>
)

const WithHidden = () => (
  <Fragment>
      <Hidden when={true}>
        This block will always be hidden
      </Hidden>
      <Hidden when={false}>
        This block will always be visible
      </Hidden>
  </Fragment>
)
```

Props:

```typescript
type HiddenProps = {
	when?: boolean | (props?: object) => boolean; // children component will visible only when "when" is false or "when" func return false 
	children: React.ReactElement | React.ReactElement[] | string;
};
```

#### `FlowManagerReminder`
This component help you to show a modal-like automatically when has incompleteFlow stored in flowManager in localStorage.

Props: 

```typescript
export type ReminderComponent = (props: {
  incompleteFlow: {currentStep: string, extraProps: object, currentUrl: string}, // data of incomplete flow
  resetFlow: () => void,// a func that will reset current state of the flow
  confirmRestoreIncompleteFlow: (navigateFunc) => void // a func that will call navigateFunc with the `currentUrl` of incomplete flow when being called
  // ... extraReminderProps will be passed through 
}) => React.ReactNode;

export interface FlowManagerReminderProps {
	flowKey: string;
	Reminder: ReminderComponent; // allow you to customize UI/UXReminder component by yourself. Parent component will pass [incompleteFlow, resetFlow, restoreFlow] then let you to make decision by yourself
	extraReminderProps?: any;
	getEntityId: (props?: object) => id: string | number;
}
```

#### `MockBrowser`
This component simulate browser ui. Especially helpful on test - in my case, I'm using it in my story book. Go to [Megaman's StoryBook](#collection) to see the interact demo

Props: 

```typescript
export type WithSetUrlProps = {
	setUrl: (url: string) => void;
};

export type Route = {
	url: string;
	component: any;
};

export type MockBrowserProps = {
	domain?: string; // domain url that you want to display on address bar
	initialUrl?: string; // initial url that display, ie: index.html
	QuickAccess?: React.FC<WithSetUrlProps>; // area next to the address bar that you can custom yourself - <usually some link or button>. Access setUrl as props to let you navigate between
	style?: object; // customized style of browser
	Routes: Route[]; // defined {url, component} so when the mockBrowser url hit the route url, the component will be displayed 
};
```

### Higher-order Components
#### `withIncompleteFlow`
A higher-order component that let your component access to incompleteFlow data which identified by flowKey.

```
export type WithIncompleteFlow = (
	params: {
       flowKey: string; // key that identify flow 
       getEntityId: (props?: object); => string | number, // a func that help to get id of entity, can access to all props of component
}) => (Component: React.Component) => any;
```

Example:

```typescript jsx
import {flowManager} from '@theremjx01/megaman';

const EnhancedComponent =  flowManager.withIncompleteFlow({
		flowKey: 'check-in',
		getEntityId: (props) => props.match.params.id,
	})(({incompleteFlow}) => {
      return (
        <p>{JSON.stringify(incompleteFlow)}</p>
      )  
	}
	);
```



#### `withSetFlowStepHandlers`
A higher-order component that help you to save flow state, step to localStorage, then you can go to it later.
