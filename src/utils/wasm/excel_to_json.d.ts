/* tslint:disable */
/* eslint-disable */
/**
* @param {Uint8Array} excel_data
* @param {number} sheet_index
* @param {boolean} is_iso8601
* @returns {(object)[]}
*/
export function excel_to_json(excel_data: Uint8Array, sheet_index: number, is_iso8601: boolean): (object)[];
/**
* @param {Uint8Array} excel_data
* @param {boolean} is_iso8601
* @returns {any[]}
*/
export function all_excel_to_json(excel_data: Uint8Array, is_iso8601: boolean): any[];
/**
* @param {Uint8Array} csv_data
* @returns {(object)[]}
*/
export function csv_to_json(csv_data: Uint8Array): (object)[];

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly excel_to_json: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly all_excel_to_json: (a: number, b: number, c: number, d: number) => void;
  readonly csv_to_json: (a: number, b: number, c: number) => void;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
