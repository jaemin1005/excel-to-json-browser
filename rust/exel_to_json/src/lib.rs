use wasm_bindgen::prelude::*;
use calamine::{open_workbook, Reader, Xlsx};
use std::io::Cursor;
use serde_json::json;

#[wasm_bindgen]
pub fn excel_to_json(excel_data: &[u8]) -> String {

    //* Cursor는 데이터를 메모리에 버퍼로 저장하고, 이를 파일처럼 읽고 쓸 수 있도록 해줌 */
    let cursor = Cursor::new(excel_data);
    
    //* 파일처럼 만들어진 curosr를 이용해 엑셀파일처럼 연다. */
    let mut workbook = Xlsx::new(cursor).unwrap();

    let mut sheet_json = vec![];

    for sheet_name in workbook.sheet_names().to_owned() {
        if let Ok(range) = workbook.worksheet_range(&sheet_name){
            let mut rows_json = vec![];

            for row in range.rows() {
                //* ROW의 Cell 데이터들 match를 이용해 변환 */
                let row_json: Vec<_> = row.iter().map(|cell| match cell {
                    calamine::Data::Empty => json!(null),
                    calamine::Data::Bool(b) => json!(b),
                    calamine::Data::Float(f) => json!(f),
                    calamine::Data::Int(i) => json!(i),
                    calamine::Data::String(s) => json!(s),
                    _ => json!(null)
                }).collect();

                rows_json.push(json!(row_json));
            }

            sheet_json.push(rows_json);
        }
    }

    json!(sheet_json).to_string()
}