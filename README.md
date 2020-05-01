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
Example: 
``` typescript jsx
import * as React from 'react';
import { Fragment } from 'react';
import { Hidden } from '@theremjx01/megaman';

const Demo = () => (
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
Type: 

| Prop name     | Description   | Type | Default |
| ------------- |:-------------:| ----:|--------:|
| when | wrapped component will be removed when this value become true | `boolean` | `true`|
| children | wrapped component | `any` ||

#### `Flow Manager Reminder`

#### `MockBrowser`

### Higher-order Components
#### `withIncompleteFlow`

#### `withSetFlowStepHandlers`

