import {createAction} from 'redux-actions';

export const imageSearchInit = createAction("imageSearch/init");
export const imageSearchUpdateDisplayMode = createAction("imageSearch/updateDisplayMode");
export const imageSearchSortBy = createAction("imageSearch/updateSortBy");
export const imageSearchSoryByOrder = createAction("imageSearch/updateSortByOrder");