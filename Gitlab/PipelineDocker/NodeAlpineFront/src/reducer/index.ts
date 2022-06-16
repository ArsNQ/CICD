import { combineReducers,CombinedState, AnyAction, Reducer, Store } from 'redux'
import map, {mapType} from "./mapReducer";
import router, {RouterType} from "./routerReducer";

interface storeType {
    map: mapType,
    router: RouterType
}

const rootReducer : Reducer = combineReducers<CombinedState<storeType>>({
    map,
    router
});

export default rootReducer;
