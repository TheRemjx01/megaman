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

#### `MockBrowser`
This component simulate browser ui. Especially helpful on test - in my case, I'm using it in my story book

Props: 
```typescript
export type WithSetUrlProps = {
	setUrl: (url: string) => void;
};

export type MockBrowserProps = {
	domain?: string;
	initialUrl?: string;
	QuickAccess?: React.FC<WithSetUrlProps>;
	style?: object;
	Routes: Route[];
};
```

### Higher-order Components
#### `withIncompleteFlow`

#### `withSetFlowStepHandlers`

