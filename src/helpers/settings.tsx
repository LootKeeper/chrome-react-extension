export async function getRowsCountSetting(): Promise<number> {
    return new Promise(resolve => {
        chrome.storage.sync.get(['rows'], (value) => {
            if (value && value.rows) {
                resolve(value.rows);
            } else {
                resolve(10);
            }
        })
    })
}

export function setRowsCountSetting(rows: number){
    chrome.storage.sync.set({rows: rows});
} 