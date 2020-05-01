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

* [Components](#Components)
    + [`Hidden`](#hidden)
    + [`FlowManagerReminder`](#FlowManagerReminder)
    + [`MockBrowser`](#MockBrowser)
* [Higher-order Components](#higher-order-Components)
    + [`flowManager.withIncompleteFlow`](#withIncompleteFlow)
    + [`flowManager.withSetFlowStepHandlers`](#withSetFlowStepHandlers)

### Components    
#### `Hidden`
Hidden access

```typescript jsx
import * as React from 'react';
import ReactDOM from 'react-dom';
import {Hidden} from '@theremjx01/megaman';

ReactDOM.render(
  <Hidden when={boolean | (): boolean}>
    <div></div>
</Hidden>,
document
)

```

#### `Flow Manager Reminder`

#### `MockBrowser`

### Higher-order Components
#### `withIncompleteFlow`

#### `withSetFlowStepHandlers`


Please go to this link to view how to use the component in this package:
[Megaman story-book](https://theremjx01.github.io/megaman/index.html)