import EventEmitter from "../utils/EventEmitter.js";

//
//  EventBus
//
const EventBus = new EventEmitter();

//
//  Events
//
const CATALOG_UPDATED = "catalog:updated";

export { CATALOG_UPDATED };
export default EventBus;
