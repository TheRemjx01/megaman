import enhance from './enhance';
import Hidden from './Hidden';
import {HiddenHOC} from "./types";

const EnhancedHidden: HiddenHOC = enhance(Hidden);

export default EnhancedHidden;