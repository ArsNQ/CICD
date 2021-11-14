import { createStore } from 'redux';
import router, {RouterType} from "./routerReducer";

const store = createStore(router);

export default store;
